/**
 * ROSTER 29 — fifteen-person fast production batch, sixth real use of the
 * profile-publication / match-eligibility separation architecture
 * (15 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster29.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. All fifteen
 * are `evidence_approved`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * `docs/checkpoints/roster29-fifteen-person-fast-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_desmond_tutu",
    slug: "desmond-tutu",
    canonicalName: "Desmond Tutu",
    birthYear: 1931,
    deathYear: 2021,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["ZA"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["religious_leader", "political_activist"],
    fieldIds: ["religion", "social_reform"],
    impactDomains: ["social", "historical", "cultural"],
    tagIds: ["reconciliation", "nonviolence", "leader"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q43033" },
    portrait: {
      url: "/portraits/desmond-tutu-gool.jpg",
      source: "Wikimedia Commons",
      license: "Public Domain (released by Tutu's office, 2004)",
      width: 1280,
      height: 1279,
      attribution: "Benny Gool; released for public use by Tutu's personal assistant Lavinia Browne, 2004",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_tutu_wikipedia", kind: "wikipedia", title: "Desmond Tutu", url: "https://en.wikipedia.org/wiki/Desmond_Tutu" }, { id: "src_tutu_nobel", kind: "award_body", title: "The Nobel Prize — Desmond Tutu, Peace 1984" }, { id: "src_tutu_memoir", kind: "archive", title: "Desmond Tutu, No Future Without Forgiveness (1999) — his own account of chairing the Truth and Reconciliation Commission" }, { id: "src_tutu_malgas_press", kind: "press", title: "IOL / SAHA Sunday Times Heritage Project — contemporary press accounts of the Singqokwana Ernest Malgas TRC testimony (April 1996)" }, { id: "src_tutu_news24_obit", kind: "press", title: "News24 obituary, \"Desmond Tutu: Tenacious, charismatic, and a thorn in the National Party and ANC's side\" (2021)" }],
    rows: {
      // Sustained direct, public criticism of the apartheid government across decades as a prominent Anglican church leader, including advocating international economic sanctions against South Africa, documented via the well-established, extensive historical record of his anti-apartheid activism.
      conflict_tolerance: [84, 0.65, "d", "R"],
      // Became the first Black Anglican Archbishop of Cape Town and later chaired South Africa's Truth and Reconciliation Commission, documented via the well-established institutional record of both major leadership roles.
      leadership_drive: [82, 0.65, "d", "A"],
      // Consistently framed his activism and later reconciliation work around restorative rather than purely punitive justice for South Africa, documented via his own extensive public writing and the explicit framework of the Truth and Reconciliation Commission he chaired.
      impact_motivation: [84, 0.65, "d", "A"],
      // Sustained public anti-apartheid advocacy under a government known to surveil, harass, and occasionally revoke the passports of prominent critics, documented via the well-established historical record of the risks faced by anti-apartheid church leaders of his era.
      risk_tolerance: [70, 0.65, "d", "R"],
      // Was widely credited with helping build sustained international public and diplomatic pressure (including advocating sanctions) that contributed to apartheid's end, documented via the 1984 Nobel Peace Prize citation's own framing of his contribution.
      persuasiveness: [74, 0.65, "d", "A"],
      // Sustained an unusually prominent international public role across decades, including extensive preaching, public commentary, and diplomatic engagement, documented via the well-established scale of his public career.
      social_assertiveness: [78, 0.65, "d", "A"],
      // Continued taking on major public leadership roles (archbishop, Truth and Reconciliation Commission chair, later global human-rights advocacy through The Elders) well past any single achievement, evidencing sustained long-term purpose.
      achievement_drive: [66, 0.48, "s", "A"],
      // Chaired a multi-member Truth and Reconciliation Commission requiring sustained collaborative institutional leadership across a genuinely difficult, contested national process, documented via the well-established institutional structure of that commission.
      collaboration: [64, 0.46, "s", "A"],
      // Sustained anti-apartheid advocacy across decades of setbacks before the system's end, and continued human-rights advocacy work for decades afterward, documented via the well-established extended timeline of his public career.
      persistence: [68, 0.5, "s", "A"],
      // [NEW_EVIDENCE, this session] A more specific, on-point instance replaces the prior generic duration-based inference: contemporary press accounts document that during the roughly two-year TRC hearing process — sustained exposure to graphic testimony of torture and killing — he was reported to have wept publicly only once, during the April 1996 testimony of Singqokwana Ernest Malgas, a guerrilla crippled by 30 years of police torture. A single documented departure from otherwise sustained composure across two years of extreme emotional material is itself real evidence of habitual self-regulation under sustained strain, not merely inferred from scale/duration alone.
      discipline: [60, 0.55, "s", "N"],
      // [NEW_EVIDENCE, this session] Two independent, temporally-distinct instances of the same pattern now converge: his well-documented post-1994 public criticism of the ANC government (already scored) is corroborated by a second, independent contemporary characterization — his 2021 obituary specifically frames his whole career, not just the post-apartheid period, as being 'a thorn in the National Party AND ANC's side,' i.e. maintaining critical independence from opponents and allies alike across decades, not only after 1994.
      autonomy_need: [62, 0.56, "s", "A"],
      // Self-initiated sustained public anti-apartheid commentary from his church position well before it became a mainstream international consensus position, documented via the well-established early timeline of his public activism.
      proactive_agency: [62, 0.46, "s", "A"],
      // The Truth and Reconciliation Commission's restorative-justice framework, which he helped shape and chair, evidences real capacity to build a coherent institutional and conceptual structure for addressing a complex national trauma.
      systems_abstraction: [58, 0.42, "i", "N"],
      // Shifted his public role from anti-apartheid church activism to formal reconciliation-commission leadership to global human-rights advocacy across different phases of his career.
      adaptability: [56, 0.4, "i", "N"],
      // Chairing the Truth and Reconciliation Commission's extensive hearing process required real sustained attention to individual case detail across thousands of testimonies.
      detail_orientation: [52, 0.4, "i", "N"],
      // Continued developing his public leadership capability across markedly different roles (church leader, commission chair, global elder statesman) over a multi-decade career.
      mastery_orientation: [55, 0.4, "i", "N"],
      // His sustained engagement with global human-rights issues beyond South Africa specifically (through The Elders organization) suggests some real intellectual range beyond his original national context.
      curiosity: [50, 0.4, "i", "N"],
      // The Truth and Reconciliation Commission's structured, phased hearing and reporting process, which he helped design and chair, evidences real advance institutional planning.
      planning_orientation: [58, 0.42, "i", "N"],
      // [NEW_EVIDENCE, this session] The documented post-1994 ANC criticism is now corroborated by an independent source characterizing this as a sustained, career-long pattern (not a single post-1994 episode) of maintaining independent judgment against both apartheid-era and post-apartheid political power alike.
      independent_thinking: [64, 0.54, "s", "A"],
      // Chairing the Truth and Reconciliation Commission's extensive multi-year hearing process required sustained concentrated engagement across thousands of individual testimonies.
      deep_focus: [58, 0.42, "i", "N"],
      // Sustained substantive public work across religious leadership, formal truth-and-reconciliation institution-building, and later global human-rights advocacy, evidencing real range beyond a single role.
      cross_domain_range: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_dorothea_lange",
    slug: "dorothea-lange",
    canonicalName: "Dorothea Lange",
    birthYear: 1895,
    deathYear: 1965,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["photographer"],
    fieldIds: ["art", "journalism"],
    impactDomains: ["artistic", "social", "historical"],
    tagIds: ["founder", "overcame_adversity"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q230673" },
    portrait: {
      url: "/portraits/dorothea-lange-1936.jpg",
      source: "Wikimedia Commons / Library of Congress (Farm Security Administration)",
      license: "Public Domain (PD-USGov)",
      width: 1280,
      height: 1280,
      attribution: "Rondal Partridge, February 1936 -- Library of Congress",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_lange_wikipedia", kind: "wikipedia", title: "Dorothea Lange", url: "https://en.wikipedia.org/wiki/Dorothea_Lange" }, { id: "src_lange_icp", kind: "institution", title: "International Center of Photography — Dorothea Lange" }],
    rows: {
      // Left a successful commercial portrait studio to document Great Depression breadlines and later migrant labor conditions for the Farm Security Administration, explicitly to bring public attention to social conditions, documented via the well-established career shift and her own stated purpose for the work.
      impact_motivation: [84, 0.65, "d", "A"],
      // Sustained documentary photography across Depression-era migrant labor, Japanese American internment, and postwar social conditions, evidencing real sustained investigative engagement across changing subject matter, documented via her extensive body of work.
      curiosity: [70, 0.65, "d", "A"],
      // Left a financially secure, established commercial portrait business during the Depression to pursue uncertain documentary work, and later photographed the Japanese American internment camps in a way that drew official military censorship, a documented real professional and institutional risk.
      risk_tolerance: [66, 0.48, "s", "N"],
      // Recorded detailed field notes alongside her photographs documenting subjects' specific circumstances and quotes (as with the 'Migrant Mother' image), documented via the well-established archival record of her field documentation practice.
      detail_orientation: [74, 0.65, "d", "A"],
      // Her Japanese American internment photographs were considered so critical of the camps' conditions that the US Army impounded many of them for decades, a specific, well-documented instance of sustained work that directly conflicted with an official institutional position.
      conflict_tolerance: [68, 0.65, "d", "R"],
      // Sustained a demanding documentary photography career across decades and changing social/political contexts, from the Depression through the postwar period, evidencing sustained long-term ambition.
      achievement_drive: [62, 0.46, "s", "A"],
      // Continued documentary field work despite her own significant physical disability (a childhood polio-related limp), which she later described as shaping her empathetic approach to subjects, documented via her own later interviews on this influence.
      resourcefulness: [62, 0.46, "s", "A"],
      // Photographed the Japanese American internment camps in a manner that documented harsh conditions rather than the more neutral or favorable images the commissioning War Relocation Authority expected, documented via the well-established censorship response to her work.
      independent_thinking: [62, 0.46, "s", "A"],
      // Sustained demanding, extensive field documentary work across difficult conditions (Depression-era rural travel, internment camps) over an extended career.
      discipline: [60, 0.44, "s", "A"],
      // Shifted from a successful commercial portrait studio to field documentary work as economic and social circumstances changed, and later continued adapting her subject matter across different government and independent commissions.
      adaptability: [58, 0.42, "i", "N"],
      // Sustained her documentary photography career across a physical disability and difficult field conditions over decades.
      persistence: [58, 0.42, "i", "N"],
      // Photographed subjects and conditions in a way that diverged from what the commissioning agencies expected or wanted, suggesting real independence in her creative and documentary approach despite working within institutional commissions.
      autonomy_need: [55, 0.4, "i", "N"],
      // Field documentary photography required direct, sustained engagement with subjects in difficult personal circumstances, suggesting real capacity for direct interpersonal engagement despite the documentary (not performative) nature of the work.
      social_assertiveness: [58, 0.42, "i", "N"],
      // Worked within the Farm Security Administration's coordinated documentary photography program alongside other photographers, suggesting real capacity for structured collaborative institutional work.
      collaboration: [55, 0.4, "i", "N"],
      // Sustained field documentary work required extended concentrated attention to both technical photographic craft and subject engagement over demanding travel conditions.
      deep_focus: [58, 0.42, "i", "N"],
      // Continued developing her documentary photographic approach across different subject matter and institutional contexts over a multi-decade career.
      mastery_orientation: [55, 0.4, "i", "N"],
      // Her Depression-era work, particularly 'Migrant Mother,' is widely credited with helping establish documentary photography's capacity to shape public policy and social awareness, documented via the work's lasting recognized cultural and historical influence.
      creative_originality: [68, 0.65, "d", "A"],
      // Self-initiated leaving her established, financially secure portrait studio business to photograph Depression-era breadlines and unemployment before receiving any government commission, documented via the well-established, self-directed origin of that career shift.
      proactive_agency: [62, 0.65, "d", "A"],
      // Worked as a senior photographer within the Farm Security Administration's documentary program, suggesting some real professional standing within that collaborative institutional structure.
      leadership_drive: [55, 0.4, "i", "N"],
      // Her sustained body of work builds a coherent visual documentary record of Depression-era and wartime social conditions across many individual images, suggesting real capacity to organize observation into a larger coherent project.
      systems_abstraction: [56, 0.4, "i", "N"],
      // Sustained field documentary assignments across multiple government commissions required real advance logistical and thematic planning.
      planning_orientation: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_gabriel_garcia_marquez",
    slug: "gabriel-garcia-marquez",
    canonicalName: "Gabriel García Márquez",
    birthYear: 1927,
    deathYear: 2014,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CO"],
    regionCode: "latin_america",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["prolific", "innovator", "late_recognition"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q5878" },
    portrait: {
      url: "/portraits/gabriel-garcia-marquez-2009.jpg",
      source: "Wikimedia Commons",
      license: "CC BY 2.0",
      width: 1268,
      height: 1600,
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      attribution: "Festival Internacional de Cine en Guadalajara, 19 March 2009",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_gabo_wikipedia", kind: "wikipedia", title: "Gabriel García Márquez", url: "https://en.wikipedia.org/wiki/Gabriel_Garc%C3%ADa_M%C3%A1rquez" }, { id: "src_gabo_memoir", kind: "archive", title: "Gabriel García Márquez, Living to Tell the Tale (2002 memoir)" }, { id: "src_gabo_nobel", kind: "award_body", title: "The Nobel Prize — Gabriel García Márquez, Literature 1982" }, { id: "src_gabo_nybooks", kind: "press", title: "Alma Guillermoprieto, \"Ghosts of Aracataca\", The New York Review of Books (2023) — on his childhood, grandparents, and the origins of his narrative voice" }, { id: "src_gabo_parisreview", kind: "press", title: "The Paris Review, coverage of Silvana Paternostro's Solitude & Company: An Oral Biography of Gabriel García Márquez — testimony from people who knew him, distinct from his own self-authored memoir" }],
    rows: {
      // [NEW_EVIDENCE, this session] Beyond the Nobel citation/reception evidence (about how the WORK was received), a second, independent, first-person documented instance about his own deliberate PROCESS now corroborates it: he directly stated "The tone that I eventually used in One Hundred Years of Solitude was based on the way my grandmother used to tell stories" — a specific, quoted, on-the-record account of consciously synthesizing his grandmother Tranquilina Iguaran's matter-of-fact oral storytelling style (recounting fantastical events with the same flat tone as everyday ones) into his signature literary technique. Multiple independent documented instances from more than one source (reception + his own stated process) meets this rubric's top confidence band.
      creative_originality: [90, 0.85, "d", "A"],
      // Documented (his own memoir) to have written One Hundred Years of Solitude in an intensive, sustained roughly 18-month period while in serious financial difficulty, working daily according to a fixed routine.
      discipline: [78, 0.62, "d", "A"],
      // Documented in his own memoir to have sold his car and pawned household goods to sustain his family while writing the novel with no guarantee of its success or publication.
      risk_tolerance: [68, 0.52, "d", "A"],
      // Worked as a journalist and struggling novelist for roughly two decades before One Hundred Years of Solitude's success, documented via his own account of his earlier career and unpublished or poorly-received earlier work.
      persistence: [74, 0.58, "d", "A"],
      // Sustained parallel careers in journalism and fiction across his life, documented via his substantial body of both journalistic and literary work.
      cross_domain_range: [68, 0.52, "d", "A"],
      // Maintained a documented public political friendship with Fidel Castro and engaged directly in Latin American political commentary throughout his career, a real public engagement beyond his fiction.
      social_assertiveness: [64, 0.48, "s", "A"],
      // Continued producing major literary work across five decades following his breakthrough novel, evidencing sustained craft engagement beyond a single success.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Sustained ambition across two decades of earlier, less successful work before his breakthrough, evidenced by his continued pursuit of a literary career despite limited earlier recognition.
      achievement_drive: [65, 0.48, "i", "N"],
      // His memoir describes meticulous attention to specific family and regional historical detail as source material for his fiction, though the description is retrospective and self-reported.
      detail_orientation: [62, 0.46, "i", "N"],
      // Sustained journalistic career alongside fiction writing suggests real ongoing engagement with current events and observation, documented via his substantial journalistic output.
      curiosity: [68, 0.5, "s", "A"],
      // His journalism and later political commentary suggest real motivation toward broader social and political engagement beyond personal literary achievement, though this is a secondary, moderately-evidenced claim relative to his primary documented strength in fiction.
      impact_motivation: [60, 0.44, "i", "N"],
      // Developed the specific narrative techniques of magical realism across earlier, less-successful works before the breakthrough novel, suggesting real sustained technical experimentation rather than a single lucky innovation.
      experimentation: [66, 0.48, "s", "A"],
      // Sustained his family financially through severe hardship during the writing of his breakthrough novel via pawning possessions, a real but singular documented instance.
      resourcefulness: [58, 0.44, "i", "N"],
      // One Hundred Years of Solitude's complex, multi-generational structure suggests real advance narrative planning, though inferred from the finished work rather than a documented outline or compositional method.
      planning_orientation: [55, 0.42, "i", "N"],
      // Founded and directed the Fundación Gabo journalism foundation to mentor young Latin American journalists, documented via the foundation's own institutional record.
      leadership_drive: [60, 0.48, "s", "A"],
      // Worked closely with editors across his career and collaborated on cultural and journalistic projects with other public figures, documented via his biography.
      collaboration: [55, 0.42, "i", "N"],
      // Wrote One Hundred Years of Solitude in an intense, sustained roughly 18-month writing period, during which he and his wife went into documented debt to sustain his uninterrupted writing time — a specific, well-corroborated biographical episode.
      deep_focus: [80, 0.62, "d", "A"],
      // Moved between journalism, screenwriting, and fiction across his career, adapting his prose style between magical realism and more direct political journalism, documented via his full bibliography.
      adaptability: [60, 0.46, "s", "A"],
      // Worked as an independent journalist for extended periods early in his career, notably self-funding aspects of his own reporting work before his fiction career provided financial stability.
      autonomy_need: [58, 0.44, "s", "A"],
      // Developed a distinctive literary style diverging from the dominant realist literary conventions of his early career, a real but moderately-evidenced departure.
      independent_thinking: [60, 0.44, "i", "N"],
      // [NEW ROW, NEW_EVIDENCE, this session] His own directly-quoted account describes deliberately taking an entirely informal, oral, familial storytelling mode (his grandmother's matter-of-fact narration of fantastical events) and synthesizing it into a formal literary technique that became his signature voice — a specific, named instance of cross-domain synthesis (oral folk tradition into modernist literary form), not a generic inference from general creative reputation. Kept at strong_inference (not documented) since it rests on one specific quote-based account, corroborated by scholarly/critical convergence on the same causal story but not by a second independent primary-source instance.
      intuitive_synthesis: [82, 0.55, "s", "A"],
      // [NEW ROW, NEW_EVIDENCE, this session] Documented account of his own early journalism career: a spontaneous, short editorial he wrote at editor Guillermo Cano's request for El Espectador impressed the staff enough to result in an unplanned ongoing editorialist role. A single specific documented episode, appropriately capped at inference tier per this rubric's own single-instance rule rather than treated as an established pattern.
      opportunity_sensing: [65, 0.35, "i", "N"],
    },
  },
  {
    id: "p_ibn_al_haytham",
    slug: "ibn-al-haytham",
    canonicalName: "Ibn al-Haytham",
    aliases: ["Alhazen"],
    birthYear: 965,
    deathYear: 1040,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "west_asia",
    historicalPolityKey: "polity.fatimid_caliphate",
    occupationIds: ["scientist", "mathematician"],
    fieldIds: ["physics", "mathematics"],
    impactDomains: ["scientific", "historical"],
    tagIds: ["founder", "systematic_thinker"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q11104" },
    portrait: {
      url: "/portraits/ibn-al-haytham-hevelius-1647.jpg",
      source: "Wikimedia Commons / National Library of Poland (Polona Digital Library)",
      license: "Public Domain (artist died 1687)",
      width: 1280,
      height: 1494,
      attribution: "Johannes Hevelius, 1647 engraving (Selenographia frontispiece) -- National Library of Poland",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_alhazen_wikipedia", kind: "wikipedia", title: "Ibn al-Haytham", url: "https://en.wikipedia.org/wiki/Ibn_al-Haytham" }, { id: "src_alhazen_mactutor", kind: "institution", title: "MacTutor History of Mathematics — Ibn al-Haytham" }, { id: "src_alhazen_optics", kind: "archive", title: "Ibn al-Haytham, Book of Optics (Kitab al-Manazir, c. 1021)" }],
    rows: {
      // The Book of Optics documents controlled experiments using a camera obscura and other purpose-built apparatus to test hypotheses about light and vision, widely credited as among the earliest systematic uses of the experimental method, documented via the surviving text's own described procedures.
      experimentation: [90, 0.68, "d", "A"],
      // Rejected the prevailing extramission theory of vision (that the eye emits rays) in favor of an evidence-based intromission theory, documented via the Book of Optics' own systematic argument and experimental support.
      analytical_rigor: [86, 0.65, "d", "A"],
      // Directly contradicted both Euclid's and Ptolemy's established extramission theories of vision, a documented departure from the dominant authorities of his field, defended via his own experimental evidence rather than appeal to precedent.
      independent_thinking: [82, 0.65, "d", "A"],
      // Developed the pinhole-camera (camera obscura) as a research instrument to study light propagation, a genuinely original application documented via the Book of Optics' own described use of it.
      creative_originality: [80, 0.65, "d", "A"],
      // The Book of Optics builds a comprehensive theoretical framework unifying geometrical optics, physiology of the eye, and psychology of visual perception, documented via the work's own integrated structure.
      systems_abstraction: [76, 0.65, "d", "A"],
      // Sustained investigation across optics, astronomy, and mathematics over his career, evidencing real breadth beyond a single narrow question.
      curiosity: [74, 0.52, "s", "A"],
      // The Book of Optics' exhaustive, methodical treatment of light, reflection, refraction, and vision across seven books evidences sustained concentrated technical work over an extended period.
      deep_focus: [78, 0.65, "d", "A"],
      // His documented experimental procedures required precise apparatus setup and observation recording, evidenced directly in the surviving text's described methodology.
      detail_orientation: [76, 0.65, "d", "A"],
      // Reportedly feigned madness for years while under house arrest after failing to deliver on a Nile-flood-control engineering promise made to the Fatimid caliph al-Hakim, a specific, widely-corroborated (if unusual) documented survival strategy under real personal danger.
      risk_tolerance: [64, 0.48, "s", "R"],
      // Continued substantial scientific work during his prolonged confinement, documented via the sustained productivity of this period in his biographical record.
      resourcefulness: [68, 0.5, "s", "A"],
      // Shifted from an ambitious engineering proposal (Nile flood control) to sustained theoretical and experimental optics work after the practical project proved unworkable, documented via the well-established sequence of his career.
      adaptability: [62, 0.46, "s", "A"],
      // Continued refining his optical theory and experimental method across an extended body of work, documented via the internal development visible across his surviving corpus.
      mastery_orientation: [64, 0.46, "s", "A"],
      // Sustained a large, productive body of scientific work across decades under difficult political circumstances, evidencing real long-term ambition.
      achievement_drive: [58, 0.42, "i", "N"],
      // The exhaustive, systematic structure of the Book of Optics evidences sustained methodical working habits over an extended composition period.
      discipline: [60, 0.42, "i", "N"],
      // Produced substantive work across optics, astronomy, and mathematics, evidencing real range within the physical sciences broadly construed.
      cross_domain_range: [58, 0.42, "i", "N"],
      // The Book of Optics' systematic seven-book structure, building from geometrical foundations to physiological and perceptual application, evidences real advance organizational planning.
      planning_orientation: [56, 0.4, "i", "N"],
      // His willingness to directly contradict both Euclid's and Ptolemy's established authority suggests a real preference for independently verified conclusions over deference to precedent.
      autonomy_need: [56, 0.4, "i", "N"],
      // Sustaining a position that directly contradicted the field's two most authoritative ancient sources implies real willingness to hold a genuinely contrarian scientific position.
      conflict_tolerance: [54, 0.4, "i", "N"],
      // Continued substantial scientific work through a prolonged period of confinement under Fatimid rule, documented via the sustained productivity of that period in his biographical record.
      persistence: [66, 0.48, "s", "A"],
      // Worked largely as an individual scholar rather than building or leading a formal institution, an honestly moderate rather than high score reflecting the surviving record's own emphasis.
      leadership_drive: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_indira_gandhi",
    slug: "indira-gandhi",
    canonicalName: "Indira Gandhi",
    birthYear: 1917,
    deathYear: 1984,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["political_leader", "statesman"],
    fieldIds: ["politics", "government"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "nonconformist", "overcame_adversity"],
    archetypeIds: ["organizational_leader", "competitive_performer"],
    externalIdentity: { wikidataId: "Q1149" },
    portrait: {
      url: "/portraits/indira-gandhi-official-1983.jpg",
      source: "Wikimedia Commons / Government of India, Prime Minister's Office",
      license: "Government Open Data License - India (GODL)",
      width: 1080,
      height: 1600,
      attribution: "Prime Minister's Office, Government of India, 1983",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_indiragandhi_frank", kind: "biography", title: "Katherine Frank -- Indira: The Life of Indira Nehru Gandhi" }, { id: "src_indiragandhi_jayakar", kind: "biography", title: "Pupul Jayakar -- Indira Gandhi: A Biography" }, { id: "src_indiragandhi_letters", kind: "archive", title: "Two Alone, Two Together -- letters between Jawaharlal Nehru and Indira Gandhi, ed. Sonia Gandhi" }, { id: "src_indiragandhi_brit", kind: "press", title: "Encyclopaedia Britannica -- Indira Gandhi biography" }, { id: "src_indiragandhi_fairobs", kind: "press", title: "Fair Observer -- Emergency (1975-77) timeline" }, { id: "src_indiragandhi_nhi", kind: "press", title: "National Herald India -- 1971 Bangladesh War diplomacy account" }, { id: "src_indiragandhi_lrb", kind: "press", title: "London Review of Books -- Pratinav Anil, \"Indira is India\"" }],
    rows: {
      // Deliberately delayed military action for months during the 1971 crisis, explicitly reasoning to Parliament about how premature action would let a rival frame the conflict unfavorably; recognized and acted on the strategic implications of a diplomat's visit that others might have taken at face value. Session 18 evidence IG-E9, IG-E10.
      analytical_rigor: [78, 0.6, "s", "A"],
      // Defied the expectations of the party establishment that installed her specifically to be a controllable figurehead, and pushed through a major policy over fierce internal opposition. Session 18 evidence IG-E7, IG-E8.
      independent_thinking: [80, 0.62, "s", "A"],
      // Reversed a previously rejected security-treaty position once new geopolitical circumstances made the earlier position untenable -- a single documented instance. Session 18 evidence IG-E10.
      belief_updating: [68, 0.42, "i", "A"],
      // Sustained a demanding, multi-month personal diplomatic campaign (touring several countries, holding a consistent negotiating position) in the run-up to the 1971 war. Session 18 evidence IG-E9, IG-E11.
      discipline: [65, 0.42, "i", "A"],
      // Moved from an adverse court ruling to a fully-drafted national Emergency declaration within days, informing even her own inner circle only after the fact -- a documented instance of extremely fast decision-to-action, in sharp contrast to the months-long deliberateness documented elsewhere in the same career. Session 18 evidence IG-E14.
      execution_speed: [72, 0.42, "i", "D"],
      // Sustained a deliberate, months-long diplomatic and military-timing strategy ahead of the 1971 war, including accepting expert military advice over political urgency on the timing question. Session 18 evidence IG-E9, IG-E11.
      planning_orientation: [82, 0.58, "s", "A"],
      // After a decisive electoral defeat and total loss of power, rebuilt and returned to Parliament within roughly 18 months, and to full power within about three years, via an active political comeback. Session 18 evidence IG-E19, IG-E21.
      persistence: [78, 0.6, "s", "A"],
      // Reversed a prior rejected treaty position once circumstances changed, and ended a 21-month authoritarian emergency to return to open electoral competition once she judged the moment right. Session 18 evidence IG-E10, IG-E19.
      adaptability: [75, 0.58, "s", "A"],
      // Pushed through a major policy risking a party split; declared a national Emergency, a genuinely high-risk authoritarian gamble; ordered a military assault on a highly sensitive religious site despite foreseeable severe backlash; continued public life despite a long, explicit history of threats and physical attacks. Session 18 evidence IG-E8, IG-E14, IG-E24, IG-E25.
      risk_tolerance: [88, 0.72, "d", "D"],
      // Operated for months under a genuinely uncertain, high-stakes geopolitical situation without acting prematurely, despite intense domestic pressure to do so. Session 18 evidence IG-E9.
      ambiguity_tolerance: [68, 0.42, "i", "A"],
      // Moved from an adverse court decision to a fully executed constitutional Emergency within days, and ordered a major military operation once negotiations broke down -- decisive action whose consequences proved catastrophic in at least one documented case. Session 18 evidence IG-E14, IG-E24.
      decisiveness: [80, 0.62, "s", "D"],
      // A biographer characterizes her as having ongoing sensitivity to criticism and a documented tendency to become withdrawn under open hostility from childhood into adulthood, in contrast to her public political dominance -- a genuine, sourced, contextual finding rather than a diagnosis. Session 18 evidence IG-E4.
      social_assertiveness: [35, 0.42, "i", "N"],
      // Accepted her Army Chief's professional military judgment over her own political urgency on a consequential timing decision, yet separately is documented as having enabled rather than checked her son's exercise of extra-constitutional authority during the Emergency. Session 18 evidence IG-E12, IG-E17.
      collaboration: [55, 0.5, "s", "D"],
      // Consolidated personal power and systematically removed the senior party figures who had installed her specifically expecting a controllable figurehead, and drove a defining national policy through by personal will over internal party opposition. Session 18 evidence IG-E7, IG-E8.
      leadership_drive: [88, 0.68, "d", "A"],
      // Actively persuaded a previously reluctant son with no political ambitions to enter politics -- a single documented instance. Session 18 evidence IG-E22.
      persuasiveness: [65, 0.42, "i", "A"],
      // Sustained direct conflict with her own party establishment to the point of a formal split, and personally held ultimate authority over a 21-month period of internationally condemned repression without curbing it. Session 18 evidence IG-E7, IG-E8, IG-E16.
      conflict_tolerance: [85, 0.68, "d", "D"],
      // Removed the senior rivals who had elevated her once they proved controllable rather than useful, and reportedly supported the rise of a rival political group's opponent specifically as a strategy to weaken that rival. Session 18 evidence IG-E7, IG-E23.
      competitiveness: [78, 0.6, "s", "D"],
      // Moved to assert independent personal authority against the very establishment that installed and expected to control her, and made her most consequential decision (the Emergency) unilaterally, informing even her own inner circle only after the fact. Session 18 evidence IG-E7, IG-E14.
      autonomy_need: [82, 0.62, "s", "D"],
      // Recognized and acted on a specific strategic opportunity created by shifting great-power alignment, reversing an earlier rejected position accordingly -- a single, clean, on-point instance. Session 18 evidence IG-E10.
      opportunity_sensing: [72, 0.45, "i", "A"],
      // Took a self-initiated symbolic political act at around age 5; actually led a real organizing operation as a child rather than only accepting an assigned role; proactively presented an already-made, unilateral major constitutional decision to the head of state. Session 18 evidence IG-E1, IG-E2, IG-E14.
      proactive_agency: [82, 0.62, "s", "A"],
    },
  },
  {
    id: "p_jean_piaget",
    slug: "jean-piaget",
    canonicalName: "Jean Piaget",
    birthYear: 1896,
    deathYear: 1980,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CH"],
    regionCode: "western_europe",
    occupationIds: ["scientist"],
    fieldIds: ["psychology"],
    impactDomains: ["scientific", "educational"],
    tagIds: ["founder", "systematic_thinker", "prolific"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q123190" },
    portrait: {
      url: "/portraits/jean-piaget-anefo-1972.jpg",
      source: "Wikimedia Commons / Nationaal Archief (Anefo)",
      license: "CC0 1.0",
      width: 620,
      height: 823,
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      attribution: "Fotograaf Onbekend / Anefo, 7 June 1972 (Erasmus Prize ceremony, Amsterdam) -- Nationaal Archief; cropped from a 2-person ceremony photo to isolate Piaget",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_piaget_wikipedia", kind: "wikipedia", title: "Jean Piaget", url: "https://en.wikipedia.org/wiki/Jean_Piaget" }, { id: "src_piaget_britannica", kind: "institution", title: "Britannica — Jean Piaget" }],
    rows: {
      // Developed a comprehensive stage theory of cognitive development (sensorimotor, preoperational, concrete operational, formal operational) integrating observations across decades into one coherent developmental framework, documented via the well-established scope of his theoretical corpus.
      systems_abstraction: [84, 0.65, "d", "A"],
      // [ERROR_CORRECTION, roster29 factual gate: the cited sources support 'as a youth,' not a specific age -- 'at age 11' was an unsupported precision, removed] Published an early scientific paper (on an albino sparrow) as a youth and sustained active naturalist/scientific interests before formally shifting to psychology, documented via his own well-established early publication record (Britannica).
      curiosity: [82, 0.65, "d", "A"],
      // His clinical-interview method involved detailed, systematic observation and questioning of individual children's reasoning across many documented case studies, evidenced directly in his published research method.
      detail_orientation: [76, 0.65, "d", "A"],
      // Sustained an extraordinarily prolific research and publication output (over 60 books and hundreds of articles) across a six-decade career, documented via his well-established bibliography.
      discipline: [78, 0.65, "d", "A"],
      // Developed the clinical interview method as a systematic, replicable technique for studying children's reasoning, documented via its lasting methodological influence on developmental psychology research.
      analytical_rigor: [74, 0.65, "d", "A"],
      // Developed a stage-based, biologically-grounded theory of cognitive development that departed from both behaviorist and purely nativist accounts dominant in his era, documented via the theory's own distinct framing relative to contemporaneous approaches.
      independent_thinking: [68, 0.65, "d", "A"],
      // Began his career in biology and malacology (mollusk studies) before shifting to developmental psychology and epistemology, documented via his own well-established academic career trajectory across these genuinely distinct fields.
      cross_domain_range: [72, 0.65, "d", "A"],
      // Sustained a prolific research and institution-building career (founding the International Centre for Genetic Epistemology) for six decades, evidencing sustained long-term ambition well beyond his early theoretical contributions.
      achievement_drive: [68, 0.5, "s", "A"],
      // The detailed, extended clinical-interview case studies underlying his stage theory evidence sustained concentrated observational work over extended periods.
      deep_focus: [70, 0.5, "s", "A"],
      // Continued refining and extending his developmental theory across decades of subsequent research and publication, documented via the internal development visible across his extensive bibliography.
      mastery_orientation: [64, 0.46, "s", "A"],
      // Founded and directed the International Centre for Genetic Epistemology in Geneva, documented via the well-established institutional record of that research center under his leadership.
      leadership_drive: [62, 0.46, "s", "A"],
      // The systematic, stage-by-stage structure of his developmental theory evidences real advance conceptual organization built up across an extended research program.
      planning_orientation: [60, 0.44, "s", "A"],
      // Shifted his primary research focus from biology to psychology to epistemology across his career, suggesting real flexibility in intellectual direction.
      adaptability: [56, 0.4, "i", "N"],
      // Built and directed a research center involving sustained collaboration with numerous other researchers over decades, suggesting real capacity for structured collaborative work.
      collaboration: [55, 0.4, "i", "N"],
      // His theory's sustained, explicit application to educational practice and curriculum design suggests real orientation toward broader applied usefulness, not only abstract theory.
      impact_motivation: [58, 0.42, "i", "A"],
      // His clinical-interview method involved presenting children with novel constructed scenarios and tasks to observe their reasoning directly, a genuinely experimental approach to studying cognition, documented via the well-established methodology of his research.
      experimentation: [62, 0.44, "s", "A"],
      // Sustained an active international academic and institutional public role across his career, including extensive lecturing and institution-building, suggesting real comfort with public professional engagement.
      social_assertiveness: [55, 0.4, "i", "N"],
      // Sustained an unusually prolific research output across a six-decade career, evidencing real long-term persistence in his research program.
      persistence: [58, 0.42, "i", "N"],
      // Developed a genuinely original stage-based theory of cognitive development that departed from both behaviorist and purely nativist accounts dominant in his era, documented via the theory's own lasting, distinct influence.
      creative_originality: [76, 0.65, "d", "A"],
      // Shifting his primary career focus from established biology credentials to the then-nascent field of developmental psychology carried some real professional risk.
      risk_tolerance: [55, 0.4, "i", "N"],
      // Developed the clinical-interview method specifically to work around the practical limitation that young children cannot reliably self-report abstract reasoning, a real methodological workaround.
      resourcefulness: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_katherine_dunham",
    slug: "katherine-dunham",
    canonicalName: "Katherine Dunham",
    birthYear: 1909,
    deathYear: 2006,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["dancer", "choreographer"],
    fieldIds: ["dance", "anthropology"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["founder", "cross_disciplinary", "prolific"],
    archetypeIds: ["creative_creator", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q272637" },
    portrait: {
      url: "/portraits/katherine-dunham-vanvechten-1940.jpg",
      source: "Wikimedia Commons / Library of Congress (Carl Van Vechten Collection)",
      license: "Public Domain (no known copyright restrictions)",
      width: 952,
      height: 1600,
      attribution: "Carl Van Vechten, 10 May 1940 -- Library of Congress",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_dunham_wikipedia", kind: "wikipedia", title: "Katherine Dunham", url: "https://en.wikipedia.org/wiki/Katherine_Dunham" }, { id: "src_dunham_loc", kind: "institution", title: "Library of Congress — Katherine Dunham: A Life in Dance" }],
    rows: {
      // Founded the Dunham Technique, a genuinely original dance methodology synthesizing Caribbean and African dance forms with Western ballet and modern dance, documented via the technique's own lasting institutional recognition and continued use in dance training today.
      creative_originality: [86, 0.65, "d", "A"],
      // Conducted formal anthropological fieldwork in Haiti and Jamaica on her own initiative to study Caribbean dance and ritual traditions, earning a degree in anthropology from the University of Chicago before applying this research directly to her choreography, documented via her own published fieldwork and academic record.
      curiosity: [82, 0.65, "d", "A"],
      // Sustained substantive work across professional dance performance, choreography, anthropological fieldwork and publication, and social/civil-rights activism throughout her career, documented via her full biographical record across these genuinely distinct domains.
      cross_domain_range: [84, 0.65, "d", "A"],
      // Publicly refused to perform for segregated audiences and gave a documented public speech condemning racial discrimination from the stage after learning a theater had denied entry to Black patrons, a specific, corroborated instance of direct confrontation with segregation at real professional cost.
      conflict_tolerance: [72, 0.65, "d", "R"],
      // Founded and led her own dance company and later the Katherine Dunham Centers for Arts and Humanities, documented via the well-established institutional record of both organizations under her direction.
      leadership_drive: [76, 0.65, "d", "A"],
      // Sustained an independent Black-led dance company through the segregation-era United States with real, documented touring and funding obstacles specific to that context.
      resourcefulness: [68, 0.65, "d", "A"],
      // Sustained parallel careers as a performer, choreographer, anthropologist, and later civil-rights and community activist across a career spanning seven decades, evidencing real long-term ambition across multiple demanding tracks.
      achievement_drive: [70, 0.52, "s", "A"],
      // Publicly and repeatedly refused segregated performance conditions at real professional and financial cost during an era when this was a genuine career risk for a touring company.
      risk_tolerance: [62, 0.46, "s", "R"],
      // Later in her career, founded community arts programs and undertook a widely reported 47-day hunger strike at age 82 protesting US immigration policy toward Haitian refugees, documented via the well-established account of that specific later-life action.
      impact_motivation: [68, 0.5, "s", "A"],
      // Founded and sustained her own independent dance company and technique rather than working within existing mainstream dance institutions, documented via the well-established independent origin of the Dunham Technique and company.
      autonomy_need: [62, 0.46, "s", "A"],
      // Sustained a demanding professional performance and choreography career across decades while also conducting formal academic research, evidencing real disciplined effort across simultaneous demanding tracks.
      discipline: [62, 0.44, "s", "A"],
      // Developing a codified dance technique required precise, systematic documentation of movement principles for teaching purposes, suggesting real attention to methodological detail.
      detail_orientation: [58, 0.42, "i", "N"],
      // Led a sustained dance company requiring close collaborative work with performers and choreographic staff over decades, documented via the well-established institutional structure of her company.
      collaboration: [60, 0.44, "s", "A"],
      // Codified her field research into a formal, teachable technique system (the Dunham Technique) rather than leaving her choreographic insights as individual works alone, documented via the technique's own well-established codified structure still taught today.
      systems_abstraction: [62, 0.44, "s", "A"],
      // Continued refining and teaching her technique across decades, extending it into formal educational institutions late in her career.
      mastery_orientation: [58, 0.42, "i", "N"],
      // Self-initiated her own anthropological fieldwork in the Caribbean and her later hunger-strike protest, both undertaken on her own initiative rather than as part of an institutional assignment.
      proactive_agency: [64, 0.46, "s", "A"],
      // Moved between performance, academic anthropology, and later social activism across different life phases, suggesting real flexibility in her mode of engagement over her career.
      adaptability: [55, 0.4, "i", "N"],
      // Sustained her company and technique development across real, documented financial difficulty and segregation-era touring obstacles over decades.
      persistence: [60, 0.44, "s", "A"],
      // Sustained fieldwork-based research and choreographic development requiring extended concentrated engagement with source material over years.
      deep_focus: [62, 0.44, "s", "A"],
      // Applied formal anthropological fieldwork methodology directly to concert dance choreography, a genuinely unconventional combination for her era, documented via the well-established distinctiveness of this approach relative to contemporary dance practice.
      independent_thinking: [66, 0.48, "s", "A"],
    },
  },
  {
    id: "p_murasaki_shikibu",
    slug: "murasaki-shikibu",
    canonicalName: "Murasaki Shikibu",
    birthYear: 973,
    deathYear: 1014,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    historicalPolityKey: "polity.heian_japan",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["self_taught", "prolific"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q81731" },
    portrait: {
      url: "/portraits/murasaki-shikibu-tosa-mitsuoki.jpg",
      source: "Wikimedia Commons",
      license: "Public Domain",
      width: 1600,
      height: 1284,
      attribution: "Tosa Mitsuoki (1617-1691), c. late 17th century (Ishiyama-dera tradition)",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_murasaki_wikipedia", kind: "wikipedia", title: "Murasaki Shikibu", url: "https://en.wikipedia.org/wiki/Murasaki_Shikibu" }, { id: "src_murasaki_diary", kind: "archive", title: "The Diary of Lady Murasaki (Murasaki Shikibu Nikki, c. 1010)" }, { id: "src_murasaki_genji", kind: "archive", title: "The Tale of Genji (c. 1000-1012)" }],
    rows: {
      // The Tale of Genji's psychological complexity and narrative structure are widely credited by literary scholarship as unprecedented for its era, sustaining its recognition as one of the earliest and most sophisticated long-form prose narratives — the surviving text is the direct documented evidence.
      creative_originality: [90, 0.68, "d", "A"],
      // The Genji's sustained, precise attention to court ritual, seasonal detail, and character psychology across its many chapters is directly observable in the surviving text.
      detail_orientation: [78, 0.58, "d", "A"],
      // Her own diary documents unusual, self-directed literacy in Chinese classics at a time when this was considered inappropriate for women of her class — a specific, corroborated instance of pursuing knowledge against social expectation.
      curiosity: [74, 0.55, "s", "A"],
      // Documented in her own diary to have deliberately concealed her Chinese-classics knowledge in public while continuing to study privately, a specific, self-described act of navigating social constraint on her own terms.
      independent_thinking: [68, 0.52, "d", "A"],
      // The Genji's length (54 chapters) and sustained narrative coherence across many years of composition evidence real long-term working discipline.
      discipline: [76, 0.58, "s", "A"],
      // Her own diary describes herself as reserved and reluctant to display her intellect openly at court, a specific, self-reported low score rather than an assumption from her literary reputation.
      social_assertiveness: [40, 0.48, "d", "N"],
      // Continued developing the Genji's narrative and characters across what scholarship estimates as a decade or more of composition, evidencing sustained craft engagement.
      mastery_orientation: [72, 0.52, "s", "A"],
      // The Genji's refined prose style and its sustained attention to the aesthetic and emotional texture of Heian court life is a hallmark noted consistently across literary-critical assessment and directly observable in the text.
      aesthetic_sensitivity: [82, 0.58, "d", "A"],
      // Sustained composition of an unusually long work across an extended period, per scholarly dating of the text's composition.
      persistence: [68, 0.5, "s", "A"],
      // The scale of the completed work suggests real sustained ambition, though inferred from the finished text's scope rather than a specific documented statement of purpose.
      achievement_drive: [55, 0.42, "i", "N"],
      // Served as a lady-in-waiting at court, a role involving real ongoing social and literary exchange with other court women documented in her diary, though the specifics of any direct creative collaboration on the Genji itself are not established.
      collaboration: [52, 0.4, "i", "N"],
      // Her diary documents a notably critical, sometimes sharp assessment of court rivals (including a well-known passage about a contemporary writer), suggesting she did not avoid registering disagreement, though this is a single genre of evidence (diary commentary) rather than direct confrontation.
      conflict_tolerance: [45, 0.4, "i", "N"],
      // The Genji is credited by literary historians with narrative techniques (extended third-person psychological interiority) not clearly established in earlier Japanese prose, suggesting real formal experimentation, though this is a scholarly inference about the text's place in a tradition rather than a documented statement of intent.
      experimentation: [58, 0.42, "i", "N"],
      // Primary documented output is concentrated in prose fiction and diary writing — real but modest range rather than broad achievement across unrelated domains.
      cross_domain_range: [50, 0.4, "i", "N"],
      // Documented preference for private, self-directed study over public display of her learning suggests a real, if moderately-evidenced, preference for autonomous intellectual pursuit.
      autonomy_need: [55, 0.4, "i", "N"],
      // The Tale of Genji's sophisticated interweaving of dozens of characters across generations with consistent psychological and social logic evidences a systematic narrative architecture, documented via literary-critical consensus on the work's structural achievement.
      systems_abstraction: [66, 0.52, "s", "A"],
      // Authored The Tale of Genji, a 54-chapter work of unprecedented scope and structural sophistication for its period, documented via the work's own scale and scholarly consensus on its composition.
      deep_focus: [76, 0.55, "d", "A"],
      // Genji Monogatari's sustained narrative architecture across multiple generations of characters evidences real advance structural planning, documented via literary-critical analysis of the work's design.
      planning_orientation: [66, 0.5, "s", "A"],
      // Her own diary (Murasaki Shikibu Nikki) documents an unusual, specific episode: tutoring Empress Shōshi in Chinese classics, a domain then considered male-restricted — a corroborated instance of applying her scholarship in direct court service.
      impact_motivation: [60, 0.54, "d", "A"],
      // Documented via her own diary to have pursued self-directed study of Chinese classical literature despite the era's restriction of that domain to men, finding a way to sustain intellectual work within a constrained court role.
      resourcefulness: [58, 0.5, "s", "A"],
      // The Genji's carefully structured, internally consistent portrayal of dozens of interconnected characters across decades of narrative time suggests real structural rigor, though inferred from the finished work rather than a documented compositional method.
      analytical_rigor: [60, 0.42, "i", "N"],
    },
  },
  {
    id: "p_ratan_tata",
    slug: "ratan-tata",
    canonicalName: "Ratan Tata",
    aliases: ["Ratan Naval Tata"],
    birthYear: 1937,
    deathYear: 2024,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["executive", "entrepreneur"],
    fieldIds: ["business"],
    impactDomains: ["entrepreneurial", "industrial", "historical"],
    tagIds: ["leader", "product_leader"],
    archetypeIds: ["entrepreneurial_builder", "organizational_leader"],
    externalIdentity: { wikidataId: "Q333460" },
    portrait: {
      url: "/portraits/ratan-tata-2024.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 2.0",
      width: 1179,
      height: 1390,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      attribution: "Sarvajanik Puralekh (via Flickr)",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_tata_wikipedia", kind: "wikipedia", title: "Ratan Tata", url: "https://en.wikipedia.org/wiki/Ratan_Tata" }, { id: "src_tata_press_acquisitions", kind: "press", title: "International press coverage of the Corus Steel (2007) and Jaguar Land Rover (2008) acquisitions and the Tata Nano project" }, { id: "src_tata_press_mistry", kind: "press", title: "Press and legal-record coverage of the October 2016 removal of Cyrus Mistry as Tata Sons chairman and the subsequent multi-year public dispute" }, { id: "src_tata_press_mumbai2008", kind: "press", title: "Contemporary press coverage of the November 2008 Mumbai terror attacks on the Taj Mahal Palace Hotel and Tata's documented personal role in the response" }],
    rows: {
      // Personally led the abrupt October 2016 removal of Cyrus Mistry as chairman of Tata Sons, a specific, documented, controversial corporate governance action that triggered a prolonged public legal battle; separately, personally directed the company's crisis response to the November 2008 Mumbai terror attacks on the Taj Mahal Palace Hotel, including its subsequent rebuilding. Marked dual_edged: decisive action in both cases, with the Mistry removal specifically remaining publicly contested.
      decisiveness: [82, 0.58, "d", "D"],
      // Personally directed the large, internationally scrutinized acquisitions of Corus Steel (2007) and Jaguar Land Rover (2008), both significantly larger than Tata's existing operations at the time, and championed the ambitious, ultimately commercially unsuccessful Tata Nano 'world's cheapest car' project aimed at affordable mobility -- documented, high-stakes decisions with mixed outcomes, not selectively reported successes only.
      risk_tolerance: [78, 0.55, "d", "A"],
      // Directed the Tata Nano project specifically toward affordable transportation access for lower-income families rather than only commercial return, and personally directed continued philanthropic control of the group via the Tata Trusts, documented via the stated aims and structure of both initiatives.
      impact_motivation: [75, 0.52, "s", "A"],
      // Documented to have begun his career working manual-labor floor rotations at Tata Steel and Tata Motors before advancing through the company's ranks, rather than entering directly into senior management, documented via the well-established biographical record of his early career.
      discipline: [65, 0.44, "s", "A"],
      // Continued pursuing the Tata Nano project through years of engineering and manufacturing setbacks (including a documented factory-relocation crisis in West Bengal) despite its ultimately limited commercial success, rather than abandoning it early.
      persistence: [70, 0.46, "s", "A"],
      // Sustained the prolonged, high-profile public and legal conflict with Cyrus Mistry following the 2016 boardroom removal, documented via the extensive press and legal record of this multi-year dispute.
      conflict_tolerance: [72, 0.48, "s", "D"],
      // Personally initiated the Tata Nano project and the Corus/Jaguar Land Rover acquisitions as his own strategic direction for the group, documented via the well-established account of his personal role in originating these initiatives.
      proactive_agency: [70, 0.46, "s", "A"],
      // Documented to have personally attended funerals and directly supported the families of Tata employees killed in the 2008 Mumbai terror attacks, a specific, direct personal act distinct from a purely corporate/institutional response.
      social_assertiveness: [62, 0.42, "i", "N"],
      // Continued directing an expanding, increasingly international scope of Tata Group activity across his roughly two-decade tenure as chairman (1991-2012), documented via the sustained scope of his strategic initiatives.
      achievement_drive: [68, 0.44, "s", "N"],
      // Led the Tata Group as chairman for over two decades and retained substantial influence as Chairman Emeritus afterward, including in the 2016 leadership crisis, documented via the well-established corporate-governance history of the group during and after his tenure.
      leadership_drive: [74, 0.48, "s", "A"],
      // Directed the Tata Nano's engineering toward an unusually low price target under significant material and manufacturing constraints, inferred as requiring real resourcefulness from the documented cost target of the project.
      resourcefulness: [60, 0.4, "i", "N"],
      // Maintained direct personal control over Tata Group's strategic direction throughout his tenure and after, including during the 2016 conflict, suggesting real preference for retaining direct influence rather than full delegation.
      autonomy_need: [58, 0.4, "i", "N"],
      // The large-scale, multi-year international acquisitions (Corus, Jaguar Land Rover) required sustained advance strategic and financial planning, inferred from the documented scale and complexity of these transactions.
      planning_orientation: [58, 0.4, "i", "N"],
      // Shifted Tata Group's strategy across his tenure from a primarily domestic Indian conglomerate toward a genuinely multinational one via major international acquisitions, documented via the well-established corporate history of this expansion.
      adaptability: [60, 0.4, "i", "N"],
      // Sustained working relationships with a rotating set of senior Tata Group executives across a two-decade tenure, a moderate signal given the also well-documented, more unilateral nature of the 2016 leadership decision.
      collaboration: [52, 0.38, "i", "N"],
      // Credited with sustaining investor and public confidence through several large, initially controversial acquisitions and the Nano project's setbacks, inferred from the documented continuity of Tata Group's market position across this period.
      persuasiveness: [60, 0.4, "i", "N"],
      // Continued directing group strategy across multiple industries and geographies over decades rather than remaining within a single early area of expertise, inferred from the documented breadth of his strategic direction.
      mastery_orientation: [55, 0.36, "i", "N"],
      // Limited direct evidence of personal day-to-day operational involvement beyond strategic-level decisions was identified in the sources reviewed this pass; scored conservatively.
      detail_orientation: [52, 0.36, "i", "N"],
    },
  },
  {
    id: "p_seneca",
    slug: "seneca",
    canonicalName: "Seneca",
    aliases: ["Seneca the Younger", "Lucius Annaeus Seneca"],
    birthYear: -4,
    deathYear: 65,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "southern_europe",
    occupationIds: ["philosopher", "statesman", "writer"],
    fieldIds: ["philosophy", "politics", "literature"],
    impactDomains: ["cultural", "historical", "literary"],
    tagIds: ["philosopher"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q2054" },
    portrait: {
      url: "/portraits/seneca-wawel.jpg",
      source: "Wikimedia Commons / Wawel Royal Castle Museum, Krakow",
      license: "CC BY-SA 4.0 (photograph) / Public Domain (underlying painting)",
      width: 1280,
      height: 1065,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      attribution: "Unknown artist -- Wawel Royal Castle Museum, Krakow; photographed by Wikimedia contributor Scotch Mist, 2024",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sen_letters", kind: "archive", title: "Seneca, Epistulae Morales ad Lucilium (Letters to Lucilius) — his own extended philosophical correspondence, written for eventual circulation" }, { id: "src_sen_essays", kind: "archive", title: "Seneca, De Ira, De Clementia, De Vita Beata, and Naturales Quaestiones — his own essays and natural-science treatise" }, { id: "src_sen_tacitus", kind: "archive", title: "Tacitus, Annals, Books 13-15 — near-contemporary Roman historian's account of Seneca's role at Nero's court and his death" }, { id: "src_sen_cassius_dio", kind: "archive", title: "Cassius Dio, Roman History, Book 61 — includes the British loan-recall allegation and a more hostile assessment of Seneca's wealth" }, { id: "src_sen_wikipedia", kind: "wikipedia", title: "Seneca the Younger", url: "https://en.wikipedia.org/wiki/Seneca_the_Younger" }],
    rows: {
      // Sustained substantive output across philosophy (letters, essays), tragedy, and natural science (Naturales Quaestiones) across decades — genuine breadth of engagement evidenced by surviving distinct bodies of work, not a single claim of curiosity.
      curiosity: [60, 0.55, "s", "A"],
      // Maintained a sustained, decades-long philosophical writing practice through exile, court service, and political turbulence — a well-supported pattern across his whole surviving corpus rather than one productive period.
      discipline: [70, 0.58, "s", "A"],
      // Survived eight years of exile on Corsica (41-49 CE, on adultery charges under Claudius) and rebuilt his career and influence to become one of Rome's most powerful advisors afterward — a specific, dated, well-documented episode.
      persistence: [68, 0.6, "d", "A"],
      // Remained at Nero's court for years after clear warning signs of danger — including publicly helping justify Nero's matricide of Agrippina to the Senate in 59 CE (Tacitus) — continuing to accept proximity to increasingly dangerous power in exchange for influence, a choice that ultimately cost him his life.
      risk_tolerance: [62, 0.55, "d", "D"],
      // Consistently sought accommodation with Nero over open confrontation for years, and when he finally broke with the court did so via a formal retirement request rather than public opposition — a documented pattern of conflict-avoidance rather than conflict-seeking.
      conflict_tolerance: [35, 0.5, "s", "N"],
      // Moved through exile, return to prominence, top court advisor, voluntary retirement, and finally forced suicide — a documented sequence of dramatic status changes across one life, each period producing real, adapted output.
      adaptability: [65, 0.5, "s", "A"],
      // Letters to Lucilius repeatedly and extensively grapples with mortality, uncertainty, and fear of death as a recurring theme across many separate letters, not a single reflection.
      ambiguity_tolerance: [68, 0.55, "s", "A"],
      // Tacitus's detailed near-contemporary account of his forced suicide (implicated in the 65 CE Pisonian conspiracy) describes him proceeding calmly and methodically — opening his veins, continuing philosophical instruction to those present, then taking further measures when bleeding proved too slow — one specific, richly documented episode from a reliable source.
      decisiveness: [72, 0.65, "d", "A"],
      // Formally requested retirement from Nero's court and offered to return his accumulated wealth (Tacitus records the request; Nero refused the wealth but granted the withdrawal) — a specific, dated act of seeking independence from an increasingly compromised position, after years of remaining engaged.
      autonomy_need: [58, 0.55, "d", "A"],
      // Letters to Lucilius were written for eventual circulation to instruct a broader readership in Stoic ethics, suggesting real motivation to influence others' conduct — tempered by the well-documented personal wealth-accumulation that sits in tension with that stated aim, so scored at inference rather than higher confidence.
      impact_motivation: [55, 0.4, "i", "D"],
      // Sustained decades-long output across philosophy, drama, and natural science, each representing genuine depth of engagement rather than dabbling, evidenced by the surviving corpus itself.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Produced substantial surviving work across four genuinely distinct domains — Stoic philosophy, tragic drama (Medea, Thyestes, and others, which later shaped European Renaissance theatre), natural science, and practical statecraft as Nero's advisor — an objectively verifiable range, not an inferred pattern.
      cross_domain_range: [78, 0.65, "d", "A"],
      // Functioned as Nero's speechwriter for several years early in the reign; a number of Nero's public addresses of that period are historically attributed to Seneca's composition — a specific, documented functional role.
      persuasiveness: [65, 0.55, "d", "A"],
      // A multi-decade career navigating exile, return, and shifting court favor implies some sustained planning, but no single cited planning episode survives — inferred from career trajectory rather than documented directly.
      planning_orientation: [55, 0.3, "i", "N"],
      // Held only an honorary consulship and functioned throughout his career as an advisor/tutor to Nero rather than pursuing higher magistracies or independent political power himself — a documented pattern of advisory rather than power-seeking orientation.
      leadership_drive: [45, 0.5, "s", "N"],
      // His preference for practical, letter-form ethical instruction over abstract systematic treatise represents a documented stylistic departure from earlier Stoic writers, though the underlying philosophical content remains within the existing Stoic tradition, so scored at inference.
      independent_thinking: [60, 0.4, "i", "A"],
      // Both the retirement request and the extensive unsolicited philosophical writing aimed at a broad readership were self-initiated rather than externally commissioned.
      proactive_agency: [62, 0.5, "s", "A"],
      // Accumulated wealth legendary even by Roman standards — Cassius Dio links a recall of Seneca's British loans to a contributing cause of the Boudican revolt — a documented material-accumulation pattern that sits in direct, well-known tension with his own philosophical writing against wealth-seeking; scored from the behavior, per the rubric, not the stated ideology.
      achievement_drive: [68, 0.55, "d", "D"],
      // Occupied one of the most influential advisory positions in the Roman world for over a decade, but the surviving record documents his institutional position more than specific assertive episodes, hence inference-level.
      social_assertiveness: [55, 0.3, "i", "N"],
    },
  },
  {
    id: "p_suleiman_the_magnificent",
    slug: "suleiman-the-magnificent",
    canonicalName: "Suleiman the Magnificent",
    birthYear: 1494,
    deathYear: 1566,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: [],
    regionCode: "west_asia",
    occupationIds: ["political_leader", "military_leader"],
    fieldIds: ["politics", "military", "law"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "strategist"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q8474" },
    portrait: {
      url: "/portraits/suleiman-the-magnificent-lorck-1562.jpg",
      source: "Wikimedia Commons / Statens Museum for Kunst (Denmark)",
      license: "Public Domain (artist died 1583)",
      width: 1153,
      height: 1600,
      attribution: "Melchior Lorck, 1562 engraving -- Statens Museum for Kunst, Copenhagen",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sm_bailo_dispatches", kind: "archive", title: "Venetian ambassador (bailo) dispatches to the Ottoman court, 1520s-1560s — decades of continuous, independent diplomatic reporting" }, { id: "src_sm_muhibbi_divan", kind: "archive", title: "Suleiman's own poetry, written under the pen name \"Muhibbi\" — a substantial surviving divan, including poems to Hürrem Sultan" }, { id: "src_sm_kanunname", kind: "archive", title: "The Kanunname (legal code) compiled under his reign, earning him the epithet \"Kanuni\" (the Lawgiver)" }, { id: "src_sm_wikipedia", kind: "wikipedia", title: "Suleiman the Magnificent", url: "https://en.wikipedia.org/wiki/Suleiman_the_Magnificent" }],
    rows: {
      // Ordered the execution of his own son, Şehzade Mustafa, in 1553 on suspicion of conspiracy — a swift, dramatic, well-documented decision, but one historians regard as likely based on false accusations engineered by court rivals, a real and lasting cost.
      decisiveness: [70, 0.58, "d", "D"],
      // Sustained decades of military campaigning across Europe, North Africa, and the Middle East (including the 1529 Siege of Vienna), documented across Ottoman chronicles and independent Venetian reports.
      conflict_tolerance: [74, 0.6, "d", "R"],
      // Personally led major military campaigns, including the 1529 Vienna siege, rather than directing them from the capital — a sustained pattern across a 46-year reign, not a single expedition.
      risk_tolerance: [70, 0.58, "d", "R"],
      // Compiled and sustained a comprehensive legal reform program (the Kanunname) across his reign, a specific documented legislative achievement earning him the epithet "Kanuni."
      achievement_drive: [74, 0.62, "d", "A"],
      // The legal reform program's aim at systematic, empire-wide governance improvement, sustained across decades, suggests motivation beyond personal enrichment or conquest alone.
      impact_motivation: [68, 0.52, "s", "A"],
      // Sustained an unusually close, documented governing partnership with Grand Vizier Ibrahim Pasha for over a decade, delegating extensive authority to him — before having him executed in 1536, a real, sustained collaboration that ended in betrayal-perceived rupture.
      collaboration: [62, 0.55, "d", "D"],
      // The willingness to eliminate even his closest, longest-serving ally (Ibrahim Pasha) and his own son (Mustafa) when he judged them a threat shows a documented capacity to prioritize his own judgment over personal loyalty or sentiment.
      autonomy_need: [65, 0.55, "d", "D"],
      // Venetian ambassadorial dispatches across decades describe him as a formidable, persuasive presence in diplomatic negotiation, inferred from the sustained pattern of favorable treaty outcomes those reports document.
      persuasiveness: [62, 0.48, "s", "A"],
      // Sustained personal command and legal authority over one of the era's largest empires for 46 years, documented across both Ottoman and independent Venetian sources.
      leadership_drive: [76, 0.62, "d", "A"],
      // The systematic Kanunname legal code is a specific, documented planning and systematizing achievement, not an inferred organizational tendency.
      planning_orientation: [72, 0.6, "d", "A"],
      // Sustained military campaigning and governance across a 46-year reign, documented continuously via Venetian dispatches spanning that whole period.
      persistence: [70, 0.58, "d", "A"],
      // Personally initiated the legal reform program and personally led major campaigns rather than delegating either entirely to subordinates.
      proactive_agency: [65, 0.52, "d", "A"],
      // Wrote a substantial surviving body of poetry under the pen name "Muhibbi" — one of the most extensive personal literary outputs of any Ottoman sultan, a genuine creative practice beyond his political role.
      creative_originality: [62, 0.52, "d", "A"],
      // Sustained patronage of architecture and scholarship across his reign (including the flourishing of chief architect Mimar Sinan's career) suggests genuine engagement beyond governance and war.
      curiosity: [58, 0.45, "s", "A"],
      // Venetian dispatches document a consistent pattern of personally receiving and negotiating with foreign ambassadors rather than delegating diplomacy entirely, though the specific instances are inferred from the pattern rather than individually cited here.
      social_assertiveness: [55, 0.35, "i", "N"],
      // Sustained a serious personal poetic practice across decades, evidenced by the surviving divan's scale, alongside his primary role as ruler.
      mastery_orientation: [65, 0.52, "d", "A"],
      // Sustained rule through constant multi-front military and political pressure across 46 years, evidenced by the continuity of his reign through that period.
      ambiguity_tolerance: [58, 0.42, "s", "A"],
      // Functioned with real, documented substantive output as military commander, legal reformer, and poet — three genuinely distinct domains, not superficial involvement in any.
      cross_domain_range: [68, 0.55, "d", "A"],
      // Sustaining a serious poetic practice and a systematic legal reform program alongside full governing responsibilities across decades implies real personal discipline, inferred from that dual output.
      discipline: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_ulysses_s_grant",
    slug: "ulysses-s-grant",
    canonicalName: "Ulysses S. Grant",
    birthYear: 1822,
    deathYear: 1885,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["military_leader", "political_leader"],
    fieldIds: ["military", "politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "overcame_adversity", "poor_business_sense"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q34836" },
    portrait: {
      url: "/portraits/ulysses-s-grant-1860.jpg",
      source: "Wikimedia Commons / Library of Congress",
      license: "Public Domain (pre-1931, no known restrictions)",
      width: 1280,
      height: 1587,
      attribution: "Library of Congress, 1860",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_usg_memoirs", kind: "archive", title: "Ulysses S. Grant, Personal Memoirs of U.S. Grant (dictated 1884-85 while dying of throat cancer, published 1885-86) — his own account, widely regarded by historians as unusually candid" }, { id: "src_usg_chernow", kind: "biography", title: "Ron Chernow, Grant (2017)" }, { id: "src_usg_white", kind: "biography", title: "Ronald C. White, American Ulysses: A Life of Ulysses S. Grant (2016)" }, { id: "src_usg_wikipedia", kind: "wikipedia", title: "Ulysses S. Grant", url: "https://en.wikipedia.org/wiki/Ulysses_S._Grant" }],
    rows: {
      // His Personal Memoirs are documented by military historians as unusually clear, logically structured campaign accounts, and his wartime dispatches are noted for their precise, unambiguous orders — a specific, attested clarity of reasoning under pressure, not general reputation.
      analytical_rigor: [72, 0.55, "s", "A"],
      // Dictated the entirety of his Personal Memoirs while dying of an extremely painful terminal throat cancer, racing to finish before death specifically to provide for his family's financial security — a documented, extreme instance of sustained disciplined output under severe physical hardship, completed days before he died.
      discipline: [78, 0.65, "d", "A"],
      // Documented as failing at multiple civilian careers (farming, real estate, a leather goods store where he was reduced to working as a clerk) and resigning from the peacetime army under a cloud before the Civil War gave him a path back to command, then continuing repeated costly offensives (the Overland Campaign's high casualties) rather than withdrawing when public and political pressure mounted.
      persistence: [85, 0.72, "d", "A"],
      // Documented as adjusting strategy repeatedly across the war (the Vicksburg campaign's unconventional approach of cutting loose from supply lines, later coordinated multi-front pressure as general-in-chief) in response to specific battlefield lessons rather than applying one fixed method throughout.
      adaptability: [68, 0.52, "s", "A"],
      // The Vicksburg campaign's decision to cut his army off from its own supply lines and live off the land in hostile territory is documented by military historians as an unusually bold gamble other Union generals had avoided, and he personally rode close to active engagement lines on multiple documented occasions.
      risk_tolerance: [75, 0.6, "d", "R"],
      // Documented as maintaining composure and continuing to issue clear orders during the chaotic, nearly-disastrous first day of the Battle of Shiloh, per multiple officers' contemporaneous accounts, rather than reacting to the uncertain, dangerous situation with paralysis.
      ambiguity_tolerance: [68, 0.5, "s", "A"],
      // Documented, specific instances of rapid, committed decision-making under pressure — continuing the attack at Shiloh's second day rather than retreating after the first day's near-defeat, and accepting Lee's surrender terms at Appomattox within a single meeting rather than prolonging negotiation.
      decisiveness: [78, 0.62, "d", "A"],
      // Widely and consistently documented by contemporaries and his own memoirs as personally quiet, unassuming, and uncomfortable with public ceremony, in sharp contrast to the more flamboyant public personas of several of his fellow generals (McClellan, Sherman).
      social_assertiveness: [42, 0.4, "s", "N"],
      // Documented as accepting escalating command responsibility (from a colonel of volunteers to general-in-chief of all Union armies to the presidency) each time it was offered rather than actively campaigning for promotion, per his own memoir's account of a career built on responding to circumstance rather than seeking advancement.
      leadership_drive: [62, 0.48, "s", "A"],
      // Documented as an effective writer of clear orders and later a commercially successful memoirist, but direct evidence of interpersonal persuasive skill is thinner and secondary to his documented preference for direct action over rhetoric — scored moderately.
      persuasiveness: [55, 0.42, "i", "N"],
      // Documented as sustaining an unpopular, costly strategy of continuous engagement against Lee's army (rather than the more cautious approach of predecessors) despite significant public and political criticism over casualties during the 1864 campaign.
      conflict_tolerance: [65, 0.48, "s", "D"],
      // Documented as a skilled horseman from youth (a specific, attested talent noted at West Point) and as developing genuine logistical and strategic expertise across the war years, though the evidentiary base for deliberate, sustained skill-building outside military command is thinner, hence inference-level.
      mastery_orientation: [60, 0.45, "i", "A"],
      // His own memoirs and contemporaries' accounts suggest a personality more oriented toward duty and problem-solving than status pursuit — he reportedly did not seek the presidency but accepted the nomination when it came — scored near center rather than assumed high.
      achievement_drive: [55, 0.4, "i", "N"],
      // Documented as working within the chain of command and deferring to civilian authority (Lincoln, then Johnson) throughout his military career rather than asserting independent political authority as general — scored near center.
      autonomy_need: [55, 0.4, "i", "N"],
      // As president, documented as personally directing federal enforcement against the Ku Klux Klan in the South (the Enforcement Acts, 1870-71) specifically to protect Black citizens' voting rights — a specific policy choice framed in his own statements as a matter of principle, though his broader presidency is also documented as marked by administration corruption scandals not of his own making but under his watch.
      impact_motivation: [62, 0.45, "i", "A"],
      // Career concentrated in military command and, later, politics, with documented but largely unsuccessful ventures into farming and business — genuine but narrow range, scored at the safe default rather than inflated.
      cross_domain_range: [50, 0.38, "i", "N"],
      // Documented, by his own account, as more often responding to assigned responsibility than self-initiating new ventures — the Vicksburg campaign's unconventional approach is a documented exception showing real initiative within an assigned command, hence inference-level rather than a sustained pattern.
      proactive_agency: [55, 0.4, "i", "N"],
      // Documented as returning to military service when the Civil War began after a string of civilian failures, a specific, dated instance of recognizing and acting on a career opportunity, though the broader pattern is thin, hence inference-level.
      opportunity_sensing: [55, 0.4, "i", "N"],
      // Documented as sustaining his army during the Vicksburg campaign by living off the countryside after deliberately cutting his own supply lines, a specific, corroborated logistical improvisation under self-imposed constraint.
      resourcefulness: [70, 0.52, "s", "A"],
      // His wartime dispatches are documented as precise and specific in logistical detail, though the broader evidentiary base for a general detail-oriented disposition beyond military orders is thinner, hence inference-level.
      detail_orientation: [62, 0.45, "i", "A"],
      // Documented, sustained close working partnership with William Tecumseh Sherman across the war, attested by their own extensive wartime correspondence and mutual public statements of trust and coordination on the multi-front 1864-65 strategy.
      collaboration: [68, 0.5, "s", "A"],
      // Documented as freeing the one enslaved person he personally owned (William Jones) in 1859 at his own financial cost during a period of hardship when selling him would have been more profitable, and later, as president, actively enforcing Reconstruction-era Black civil rights — a documented shift toward increasingly principled anti-slavery action over his lifetime.
      belief_updating: [62, 0.45, "s", "A"],
    },
  },
  {
    id: "p_william_wilberforce",
    slug: "william-wilberforce",
    canonicalName: "William Wilberforce",
    birthYear: 1759,
    deathYear: 1833,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["political_leader", "activist"],
    fieldIds: ["politics", "social_reform"],
    impactDomains: ["social", "historical"],
    tagIds: ["overcame_adversity", "founder", "sustained_excellence"],
    archetypeIds: ["organizational_leader", "independent_creator"],
    externalIdentity: { wikidataId: "Q207672" },
    portrait: {
      url: "/portraits/william-wilberforce-russell.jpg",
      source: "Wikimedia Commons / National Portrait Gallery, London",
      license: "Public Domain (PD-Art, artist died 1806)",
      width: 1280,
      height: 1549,
      attribution: "John Russell (d. 1806) -- National Portrait Gallery, London, NPG 759",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_wilberforce_hague", kind: "biography", title: "William Hague -- William Wilberforce: The Life of the Great Anti-Slave Trade Campaigner" }, { id: "src_wilberforce_sons", kind: "archive", title: "Robert Isaac & Samuel Wilberforce -- The Life of William Wilberforce (1838, 5 vols.)" }, { id: "src_wilberforce_regency", kind: "press", title: "Regency History -- William Wilberforce biography" }, { id: "src_wilberforce_hop", kind: "institution", title: "History of Parliament Online -- William Wilberforce entry" }, { id: "src_wilberforce_sojo", kind: "press", title: "Sojourners -- article on Wilberforce's opium use, citing John Pollock's biography" }, { id: "src_wilberforce_whm", kind: "institution", title: "Wilberforce House Museum / Hull Museums" }],
    rows: {
      // Deliberately maintained a lifelong, explicitly stated position of belonging to no political party, working with governments of either persuasion depending on the issue; continued introducing the same unpopular legislation year after year regardless of political headwinds. Session 18 evidence WW-E9, WW-E18.
      independent_thinking: [82, 0.62, "s", "A"],
      // Founded new social/organizational reform structures beyond his core cause late in his career, part of a lifelong pattern of founding, funding, or leading over sixty distinct philanthropic and reform organizations. Session 18 evidence WW-E23.
      creative_originality: [68, 0.4, "i", "A"],
      // Sustained a demanding double life of full parliamentary/campaign work plus a four-year personal writing project despite a chronic, painful illness. Session 18 evidence WW-E12.
      discipline: [78, 0.55, "s", "A"],
      // Sustained a four-year personal writing project to completion alongside his full political workload -- a single, concrete documented instance. Session 18 evidence WW-E12.
      deep_focus: [72, 0.45, "i", "A"],
      // Relayed a sudden, unexpected piece of major political news to a crowd immediately and unprompted, rather than deferring or waiting -- a single, thin instance. Session 18 evidence WW-E3.
      execution_speed: [65, 0.4, "i", "N"],
      // Deliberately pursued a strategically sequenced, incremental legislative victory (cutting off roughly three-quarters of the trade first) rather than holding out only for a complete all-or-nothing outcome. Session 18 evidence WW-E20.
      planning_orientation: [70, 0.45, "i", "A"],
      // Publicly committed, after his first major legislative defeat, to continue "till we have wiped away this scandal"; kept that commitment literally, reintroducing the same cause in nearly every subsequent session for roughly two decades; then continued campaigning for a second, larger goal for a further 26 years after the first partial victory. Session 18 evidence WW-E8, WW-E9, WW-E22.
      persistence: [95, 0.8, "d", "A"],
      // Reconsidered and ultimately reversed a major planned life decision after receiving trusted counsel, and accepted a deliberately incremental legislative strategy rather than insisting on his original all-or-nothing approach. Session 18 evidence WW-E6, WW-E20.
      adaptability: [75, 0.55, "s", "A"],
      // Financed and contested a major political campaign directly with his own money, and continued his public campaign despite documented direct threats to his physical safety and sustained pressure to abandon the cause. Session 18 evidence WW-E2, WW-E16.
      risk_tolerance: [72, 0.55, "s", "A"],
      // Continued introducing the same legislation across many years with no assurance it would ever succeed, sustaining the effort through genuinely uncertain, unresolved outcomes for roughly two decades. Session 18 evidence WW-E9.
      ambiguity_tolerance: [68, 0.42, "i", "A"],
      // Took charge on the spot at a mass public political meeting to relay major unexpected news himself, and publicly, assertively committed to an unpopular cause immediately after a major legislative defeat rather than retreating from view. Session 18 evidence WW-E3, WW-E8.
      social_assertiveness: [72, 0.5, "s", "A"],
      // Lived for years in a cohabiting, sustained collaborative organizing arrangement with a network of allied families as their acknowledged parliamentary leader; maintained a sustained working partnership with a non-MP field researcher showing a clear, mutually-acknowledged division of labor; worked with a new government to secure an incremental legislative win. Session 18 evidence WW-E13, WW-E14, WW-E20.
      collaboration: [85, 0.68, "d", "A"],
      // Was the acknowledged parliamentary leader of a sustained, cohabiting reform network, and supplied the parliamentary platform and leadership role his own non-MP field-research partner explicitly could not. Session 18 evidence WW-E13, WW-E14.
      leadership_drive: [80, 0.6, "s", "A"],
      // Faced direct physical threats, the loss of friendships, and sustained political pressure to abandon his cause and continued regardless; was the target of sustained, personalized published criticism across his career; experienced real strain with even his closest political friend over the issue. Session 18 evidence WW-E16, WW-E17, WW-E19.
      conflict_tolerance: [85, 0.68, "d", "A"],
      // Explicitly stated, by his own later account, a lifelong resolve "to attach himself to no party, but to be independent" -- a direct, on-point, well-corroborated first-person statement of principle sustained across his entire career. Session 18 evidence WW-E18.
      autonomy_need: [82, 0.68, "d", "A"],
      // Explicitly named a specific lifelong dual mission for his own public life in a diary entry multiple sources treat as career-defining, and went on to found, fund, or lead over sixty distinct philanthropic and reform organizations across his lifetime. Session 18 evidence WW-E7, WW-E23.
      impact_motivation: [90, 0.7, "d", "A"],
      // Recognized and acted on a new political opening when a change of government made his cause a governmental priority for the first time -- a single, clean, on-point instance. Session 18 evidence WW-E20.
      opportunity_sensing: [68, 0.42, "i", "A"],
      // Took the initiative to relay major political news to a crowd himself, unprompted, at a public meeting, and proactively founded organizations beyond his core cause rather than confining his efforts to a single campaign. Session 18 evidence WW-E3, WW-E23.
      proactive_agency: [78, 0.55, "s", "A"],
    },
  },
  {
    id: "p_wilma_rudolph",
    slug: "wilma-rudolph",
    canonicalName: "Wilma Rudolph",
    birthYear: 1940,
    deathYear: 1994,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["athlete"],
    fieldIds: ["sport"],
    impactDomains: ["athletic", "social", "cultural"],
    tagIds: ["overcame_adversity", "sustained_excellence"],
    archetypeIds: ["competitive_performer"],
    externalIdentity: { wikidataId: "Q31083" },
    portrait: {
      url: "/portraits/wilma-rudolph-1961.jpg",
      source: "Wikimedia Commons / Library of Congress (New York World-Telegram & Sun Collection)",
      license: "Public Domain (pre-1968 work-for-hire, instrument of gift)",
      width: 1280,
      height: 1215,
      attribution: "New York World-Telegram & Sun staff photographer, 1961 -- Library of Congress",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_rudolph_wikipedia", kind: "wikipedia", title: "Wilma Rudolph", url: "https://en.wikipedia.org/wiki/Wilma_Rudolph" }, { id: "src_rudolph_olympics", kind: "institution", title: "Team USA / Olympics.com — Wilma Rudolph" }],
    rows: {
      // Contracted polio at age 5 and wore a leg brace through much of her childhood, undergoing years of documented physical therapy before regaining the ability to walk unassisted and eventually becoming a world-class sprinter, an extensively corroborated childhood-to-Olympic trajectory.
      persistence: [88, 0.65, "d", "A"],
      // Became the first American woman to win three gold medals in a single Olympic Games (1960 Rome), documented via the well-established, multiply-corroborated record of that specific achievement.
      achievement_drive: [84, 0.65, "d", "A"],
      // Sustained a rigorous multi-year training regimen under coach Ed Temple at Tennessee State University, documented via the well-established account of her collegiate training program leading up to the 1960 Olympics.
      discipline: [78, 0.65, "d", "A"],
      // Overcame a childhood physical disability with limited medical resources available to her family at the time (regular long trips for treatment were required, documented via her own later interviews describing this period), working within real material constraints to regain full mobility.
      resourcefulness: [70, 0.65, "d", "A"],
      // Insisted her homecoming victory parade in segregated Clarksville, Tennessee be racially integrated — the first such integrated event in the city's history — a specific, well-documented instance of using her platform for a stated civil-rights purpose.
      impact_motivation: [68, 0.65, "d", "A"],
      // Insisting on desegregating her own homecoming celebration in the segregated American South of 1960 carried real social risk and required direct confrontation with local segregationist norms, documented via the well-established account of that specific event.
      conflict_tolerance: [64, 0.48, "s", "R"],
      // Continued elite competitive training and racing despite a documented, permanent childhood disability history that many assumed would preclude athletic competition at any level.
      risk_tolerance: [58, 0.44, "s", "N"],
      // Continued developing her sprinting technique and competitive capability across her collegiate and Olympic career, progressing from a raw talent to a world-record-setting competitor.
      mastery_orientation: [62, 0.46, "s", "A"],
      // Made her own explicit demand for an integrated homecoming celebration despite social pressure to accept the era's segregated conventions, suggesting real independent conviction.
      autonomy_need: [58, 0.42, "i", "N"],
      // Sustained a prominent public role after her competitive career, including coaching and public speaking on civil rights and athletics, documented via the well-established record of her post-Olympic public life.
      social_assertiveness: [62, 0.46, "s", "A"],
      // Later founded the Wilma Rudolph Foundation to support young athletes, documented via the well-established record of that organization's founding after her competitive career ended.
      leadership_drive: [58, 0.42, "i", "N"],
      // Transitioned from childhood physical disability to elite sprinting to a later career in coaching and public advocacy, evidencing real capacity to redirect her capability across markedly different life phases.
      adaptability: [60, 0.44, "s", "A"],
      // Elite sprint training requires real careful attention to technique refinement, though direct documentation of her personal training method specifically is limited beyond her coach's own general account.
      detail_orientation: [55, 0.4, "i", "N"],
      // Trained within and credited her collegiate team environment (the Tennessee State Tigerbelles) under coach Ed Temple, suggesting real capacity to develop within a structured team/coaching relationship.
      collaboration: [58, 0.42, "i", "N"],
      // Her later pursuit of coaching and broader civil-rights and youth-athletics advocacy suggests some real interest beyond competitive athletics itself.
      curiosity: [50, 0.4, "i", "N"],
      // Self-initiated the demand for an integrated homecoming celebration rather than accepting the segregated event organizers had originally planned, documented via the well-established account of this specific episode.
      proactive_agency: [62, 0.44, "s", "A"],
      // Founding and structuring the Wilma Rudolph Foundation for youth athletics after her competitive career evidences real advance organizational effort in her post-Olympic life.
      planning_orientation: [55, 0.4, "i", "N"],
      // Insisting on an integrated homecoming celebration against her event organizers' original segregated plan reflects a documented, specific instance of holding an independent position against local convention.
      independent_thinking: [60, 0.44, "s", "A"],
      // Elite sprint training and years of childhood physical therapy both required sustained concentrated physical effort over extended periods.
      deep_focus: [58, 0.42, "i", "N"],
      // Competitive sprinting at an elite level requires real technical self-analysis of form and performance, though direct documentation of her personal analytical method specifically is limited.
      analytical_rigor: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_zora_neale_hurston",
    slug: "zora-neale-hurston",
    canonicalName: "Zora Neale Hurston",
    birthYear: 1891,
    deathYear: 1960,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["independent", "late_recognition", "cross_disciplinary"],
    archetypeIds: ["creative_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q220480" },
    portrait: {
      url: "/portraits/zora-neale-hurston-vanvechten-1938.jpg",
      source: "Wikimedia Commons / Library of Congress (Carl Van Vechten Collection)",
      license: "Public Domain (no known copyright restrictions)",
      width: 1100,
      height: 1600,
      attribution: "Carl Van Vechten, 1938 -- Library of Congress",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hurston_wikipedia", kind: "wikipedia", title: "Zora Neale Hurston", url: "https://en.wikipedia.org/wiki/Zora_Neale_Hurston" }, { id: "src_hurston_boyd", kind: "biography", title: "Valerie Boyd, Wrapped in Rainbows: The Life of Zora Neale Hurston (2003)" }],
    rows: {
      // Trained formally in anthropology under Franz Boas at Barnard College and conducted extensive original ethnographic fieldwork collecting African American and Caribbean folklore, documented via her published field research (Mules and Men, Tell My Horse).
      curiosity: [84, 0.68, "d", "A"],
      // Real, sustained documented output across fiction (Their Eyes Were Watching God), academic anthropology and folklore collection, journalism, and playwriting.
      cross_domain_range: [82, 0.65, "d", "A"],
      // Took positions during the Harlem Renaissance that put her at odds with some contemporaries, including publicly rejecting the expectation that Black writers should write primarily as political representatives of racial struggle rather than pursuing her own artistic interests, documented via Boyd's biography.
      independent_thinking: [78, 0.6, "d", "A"],
      // Documented to have shaved years off her stated age to qualify for free public high school education as an adult, and later worked as a maid and other jobs to fund her education and fieldwork — specific, corroborated instances.
      resourcefulness: [72, 0.55, "d", "A"],
      // Conducted fieldwork alone in rural areas and in Haitian Vodou communities in the 1930s, documented via her own published accounts of the conditions and access challenges involved.
      risk_tolerance: [66, 0.5, "s", "A"],
      // Continued writing and publishing despite a documented late-career decline into poverty and obscurity, working as a maid again in her final years while continuing to write, per Boyd's biography.
      persistence: [74, 0.58, "d", "A"],
      // Her ethnographic field collections document precise, close attention to dialect, ritual detail, and oral-tradition specifics, directly observable in the surviving published fieldwork.
      detail_orientation: [76, 0.58, "d", "A"],
      // Her formal anthropological training under Franz Boas at Barnard College required and produced rigorous ethnographic methodology, documented via her academic training and published fieldwork.
      analytical_rigor: [64, 0.5, "d", "A"],
      // Worked closely with Franz Boas and other Harlem Renaissance figures on folklore collection and literary projects, documented via her academic and literary career record.
      collaboration: [55, 0.42, "s", "N"],
      // Conducted sustained, extended ethnographic fieldwork — months at a time in rural Southern communities and Haiti — requiring real concentrated attention, documented via her own published field accounts.
      deep_focus: [74, 0.58, "d", "A"],
      // Developed real craft range across fiction, ethnography, journalism, and playwriting over her career.
      mastery_orientation: [60, 0.46, "s", "A"],
      // Explicitly framed her folklore collection work as preserving African American and Caribbean cultural heritage that was otherwise undocumented, documented via her own stated purpose in Mules and Men's introduction.
      impact_motivation: [64, 0.52, "d", "A"],
      // Her fieldwork required real advance logistical planning (securing funding, arranging travel to rural Southern communities and Haiti), documented via Boyd's biography.
      planning_orientation: [55, 0.42, "i", "N"],
      // Sustained a public literary career and cultivated relationships within the Harlem Renaissance literary circle despite documented friction with some contemporaries over the proper role of Black literature.
      social_assertiveness: [58, 0.44, "s", "N"],
      // Moved between academic anthropology, fiction, journalism, and manual labor across her life as circumstances required, a real but largely necessity-driven pattern of adjustment.
      adaptability: [62, 0.46, "i", "N"],
      // Their Eyes Were Watching God's use of Black Southern dialect as a literary voice, rather than only as dialogue framed by standard narration, was a documented, distinctive stylistic choice noted by literary-critical assessment.
      creative_originality: [76, 0.58, "d", "A"],
      // Pursued her own artistic and scholarly interests even when they diverged from what was expected of her within the Harlem Renaissance literary movement, documented via the same independent_thinking evidence viewed from the preference-for-self-direction angle.
      autonomy_need: [65, 0.48, "s", "A"],
      // Pursued formal graduate-level anthropological training as an adult alongside an active writing career, evidencing sustained ambition across two demanding fields simultaneously.
      achievement_drive: [58, 0.44, "i", "N"],
      // Sustained fieldwork and writing output across a multi-decade career, though her own documented later-life financial instability suggests a less consistently secure working pattern than some peers — scored moderately rather than assumed uniformly high.
      discipline: [60, 0.44, "i", "N"],
      // Her documented public disagreement with contemporaries over the proper role of Black literature suggests real willingness to hold an unpopular position within her own literary community.
      conflict_tolerance: [58, 0.42, "i", "N"],
    },
  },
];

export const ROSTER_29: readonly Person[] = seeds.map(build);
