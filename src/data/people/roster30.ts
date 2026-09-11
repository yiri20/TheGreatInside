/**
 * ROSTER 30 — twenty-person zero-politics fast production batch, seventh
 * real use of the profile-publication / match-eligibility separation
 * architecture (19 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster30.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. All twenty
 * are `evidence_approved`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * `docs/checkpoints/roster30-twenty-person-zero-politics-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_al_khwarizmi",
    slug: "al-khwarizmi",
    canonicalName: "Al-Khwarizmi",
    aliases: ["Muhammad ibn Musa al-Khwarizmi"],
    birthYear: 780,
    deathYear: 850,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "west_asia",
    historicalPolityKey: "polity.abbasid_caliphate",
    occupationIds: ["mathematician", "astronomer"],
    fieldIds: ["mathematics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["founder", "systematic_thinker"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q9038" },
    portrait: {
      url: "/portraits/al-khwarizmi-saleh.jpg",
      source: "Wikimedia Commons (Expo 2020 Dubai)",
      license: "CC BY-SA 4.0 (VRT-confirmed artist permission)",
      width: 1280,
      height: 1793,
      attribution: "Muntadher Saleh, 2022",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_alkhwarizmi_wikipedia", kind: "wikipedia", title: "Al-Khwarizmi", url: "https://en.wikipedia.org/wiki/Al-Khwarizmi" }, { id: "src_alkhwarizmi_mactutor", kind: "institution", title: "MacTutor History of Mathematics — Al-Khwarizmi" }, { id: "src_alkhwarizmi_kitab", kind: "archive", title: "Al-Khwarizmi, The Compendious Book on Calculation by Completion and Balancing (Al-Jabr, c. 820 CE)" }],
    rows: {
      // Al-Jabr systematically classified and solved general categories of equations rather than isolated problems — the first systematic treatment of algebra as a general method, documented via the surviving text's own structural approach and its lasting influence (the word 'algebra' derives directly from its title).
      systems_abstraction: [88, 0.68, "d", "A"],
      // Was the first to treat algebra as a systematic discipline distinct from arithmetic and geometry -- per the historical record, 'the first person to treat algebra as an independent discipline' -- a genuinely original methodological framework, documented via the work's own novel approach and Western Europe's later direct adoption of it (his Latinized name 'Algorithmi' gives us the word 'algorithm').
      creative_originality: [85, 0.65, "d", "A"],
      // Al-Jabr's systematic proof-by-geometric-construction method for solving quadratic equations is documented directly in the surviving text.
      analytical_rigor: [80, 0.65, "d", "A"],
      // Produced substantive original work across algebra, astronomy (astronomical tables), and geography (a corrected world map/coordinates text), documented via his surviving bibliography.
      cross_domain_range: [66, 0.65, "d", "A"],
      // Al-Jabr's stated purpose (per its own preface) was to solve practical problems of inheritance, trade, and land measurement, evidencing an applied, service-oriented motivation.
      impact_motivation: [65, 0.5, "s", "A"],
      // Sustained productive work across multiple mathematical/scientific domains during his tenure at the House of Wisdom in Baghdad, documented via his multi-decade bibliography.
      mastery_orientation: [62, 0.46, "s", "A"],
      // Producing several substantial, methodically organized treatises across mathematics, astronomy, and geography suggests sustained systematic working habits.
      discipline: [60, 0.44, "i", "N"],
      // His astronomical tables (zij) required precise, exhaustive numerical computation, documented via the surviving tables' own detailed content.
      detail_orientation: [64, 0.46, "s", "A"],
      // Worked within the House of Wisdom, a major documented collaborative scholarly institution under Caliph al-Ma'mun, suggesting real engagement with a broader scholarly community.
      collaboration: [58, 0.42, "i", "N"],
      // Al-Jabr's methodical, category-by-category organization of equation types evidences real advance structural planning in how the work was composed.
      planning_orientation: [60, 0.44, "s", "A"],
      // Reportedly headed the House of Wisdom's library under al-Ma'mun per some historical accounts, though this specific leadership role is less firmly corroborated than his authored works themselves.
      leadership_drive: [55, 0.4, "i", "N"],
      // Al-Jabr's systematic, exhaustive treatment of every category of linear and quadratic equation evidences sustained concentrated technical work, documented via the completeness of the surviving text's own coverage.
      deep_focus: [66, 0.46, "s", "A"],
      // Synthesized Greek geometric method, Indian positional numerals, and Babylonian algebraic technique into one coherent new system, documented via the demonstrable influence of all three traditions on his surviving texts.
      resourcefulness: [68, 0.65, "d", "A"],
      // Recognized and wrote a dedicated treatise (On the Calculation with Hindu Numerals) advocating the practical superiority of the positional Hindu-Arabic numeral system before it was established in the Islamic world, documented via that text's own role in the system's later spread to Europe.
      opportunity_sensing: [70, 0.65, "d", "A"],
      // Sustained productive output across mathematics, astronomy, and geography over an extended career at the House of Wisdom.
      persistence: [58, 0.42, "i", "N"],
      // Presented algebra as a general, self-contained method for solving equation categories rather than embedding it within the existing Greek geometric tradition alone, documented via Al-Jabr's own distinct methodological approach.
      independent_thinking: [62, 0.44, "s", "A"],
      // Being first to treat algebra as an entirely new, systematic mathematical discipline distinct from centuries of purely geometric problem-solving, with lasting global adoption (the terms 'algebra' and 'algorithm' both derive directly from his work), documented via that sustained historical influence.
      achievement_drive: [68, 0.65, "d", "A"],
      // Sustained productive investigation across algebra, astronomy, and geography over his career at the House of Wisdom, evidencing real intellectual range.
      curiosity: [65, 0.5, "s", "A"],
    },
  },
  {
    id: "p_andrew_carnegie",
    slug: "andrew-carnegie",
    canonicalName: "Andrew Carnegie",
    birthYear: 1835,
    deathYear: 1919,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB", "US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur", "industrialist"],
    fieldIds: ["business"],
    impactDomains: ["wealth_creation", "historical", "educational"],
    tagIds: ["founder", "self_taught"],
    archetypeIds: ["entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q484265" },
    portrait: {
      url: "/portraits/andrew-carnegie-1895.jpg",
      source: "Dedication Souvenir of the Carnegie Library, Pittsburgh (Historic Pittsburgh)",
      license: "PD-anon-expired (published pre-1931)",
      width: 1280,
      height: 1923,
      attribution: "Unknown artist, 1895",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_carnegie_wikipedia", kind: "wikipedia", title: "Andrew Carnegie", url: "https://en.wikipedia.org/wiki/Andrew_Carnegie" }, { id: "src_carnegie_gilder", kind: "biography", title: "\"The Lives of Andrew Carnegie\" (Gilder Lehrman Institute of American History)", url: "https://www.gilderlehrman.org/history-resources/essays/lives-andrew-carnegie" }, { id: "src_carnegie_homestead", kind: "press", title: "History.com and Britannica's accounts of the 1892 Homestead Strike" }, { id: "src_carnegie_gospel", kind: "archive", title: "Carnegie's own \"Gospel of Wealth\" (1889)", url: "https://en.wikipedia.org/wiki/The_Gospel_of_Wealth" }],
    rows: {
      // Rose from a $2.50-a-week telegraph messenger at age 14 to superintendent of the Pennsylvania Railroad's Pittsburgh division by age 24, then built one of the largest steel enterprises in the world -- an extreme, quantified, rapid career trajectory documented across multiple independent sources.
      achievement_drive: [86, 0.68, "d", "A"],
      // Personally funded roughly 2,500 public libraries worldwide (1,679 in the US alone) and gave away roughly 90% of his fortune, over $350 million, during his own lifetime, with an explicit, articulated philosophy favoring institutions that "help people help themselves" over direct handouts -- a specific, sustained, quantified, strategically-designed giving program.
      impact_motivation: [82, 0.62, "d", "A"],
      // Published "Gospel of Wealth" (1889), articulating the unusual, explicit position that the wealthy are merely "trustees" of their fortune with a moral obligation to give it away during their own lifetime rather than to heirs -- a genuinely counter-cultural stance for a man of his era and class, published years before most of his own giving occurred.
      independent_thinking: [78, 0.6, "d", "A"],
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: the exact casualty count ('12 people were killed') is stated with more precision than reputable sources agree on -- e.g. Wikipedia's own account of the July 6 confrontation states 10 killed (seven strikers, three Pinkerton agents). The unnecessary precision is removed rather than asserting a specific figure sources don't agree on; the negative, dual-edged context is preserved, not sanitized.] Personally authorized his operations manager, Henry Clay Frick, to break the steelworkers' union at the Homestead plant ahead of the workers' contract expiration in 1892 -- backing a strategy that led to a lockout of 3,800 workers and a deadly armed confrontation, followed by a documented multi-year reduction in wages and increase in working hours for the remaining workforce -- scored as a real, high-stakes, harmful documented consequence of a deliberate business decision, not framed as a positive trait.
      conflict_tolerance: [72, 0.55, "d", "R"],
      // Two independent documented instances: taught himself telegraph operation on his own initiative, which directly led to his first major promotion, and sustained his entire education through a philanthropically-provided library for working boys rather than formal schooling.
      resourcefulness: [70, 0.55, "d", "A"],
    },
  },
  {
    id: "p_antoni_gaudi",
    slug: "antoni-gaudi",
    canonicalName: "Antoni Gaudi",
    birthYear: 1852,
    deathYear: 1926,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["ES"],
    regionCode: "southern_europe",
    occupationIds: ["architect"],
    fieldIds: ["architecture"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["founder", "innovator", "ascetic"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q25328" },
    portrait: {
      url: "/portraits/antoni-gaudi-1878.jpg",
      source: "Gaudí and Barcelona Club (Wikimedia Commons)",
      license: "PD-old-100-expired (photographer d. 1918)",
      width: 1280,
      height: 1741,
      attribution: "Pau Audouard Deglaire, 1878",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_gaudi_wikipedia", kind: "wikipedia", title: "Antoni Gaudi", url: "https://en.wikipedia.org/wiki/Antoni_Gaud%C3%AD" }, { id: "src_gaudi_sagradafamilia", kind: "institution", title: "Sagrada Familia's own account of Gaudi's spirituality and 40-year devotion to the project", url: "https://sagradafamilia.org/en/antoni-gaudi-humanism-and-spirituality" }, { id: "src_gaudi_catenary", kind: "press", title: "\"Gaudi, Nature, and the Catenary Arch\" -- documents his structural method and physical string-and-weight models" }, { id: "src_gaudi_guell", kind: "institution", title: "Antonio Gaudi Foundation's account of the Eusebi Guell patronage relationship (1883 onward)", url: "https://en.fundacionantoniogaudi.org/eusebi-guell-and-gaudi/" }],
    rows: {
      // Sustained singular devotion to a single project, the Sagrada Familia, for forty years (from 1883 until his death in 1926), with the final twelve years exclusively devoted to it and every other project abandoned -- an extremely long, singular, well-documented commitment.
      persistence: [88, 0.72, "d", "A"],
      // Pioneered the catenary arch as a primary architectural device at a time when virtually all contemporary architects avoided the form as aesthetically unacceptable, and was documented as the first architect in history to combine complex ruled surfaces, catenary vaults, and branched pillars into one coherent structural system.
      creative_originality: [88, 0.72, "d", "A"],
      // Two independent documented instances: maintained a sustained, specific daily ascetic practice over years (daily Mass and prayer, dietary restriction, simple dress), and used physical inverted string-and-weight models as a systematic, methodical working technique to study structure and form before construction.
      discipline: [82, 0.65, "d", "A"],
      // Deliberately built his architecture around a structural form, the catenary arch, that the prevailing architectural consensus of his era considered ugly and avoided, based on his own independent judgment of its mechanical efficiency and natural origin rather than contemporary taste.
      independent_thinking: [78, 0.6, "d", "A"],
      // Personally built schools for the children of workers and parishioners at the Sagrada Familia construction site, a concrete, documented act of social benefit distinct from and alongside the architectural project itself.
      impact_motivation: [66, 0.5, "d", "A"],
      // Gave away most of his possessions and eventually moved to live inside the Sagrada Familia's own workshop, inferred as a genuine prioritization of vocational principle over material comfort or conventional living arrangements from this documented lifestyle choice.
      autonomy_need: [58, 0.4, "i", "N"],
    },
  },
  {
    id: "p_barbara_mcclintock",
    slug: "barbara-mcclintock",
    canonicalName: "Barbara McClintock",
    birthYear: 1902,
    deathYear: 1992,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["scientist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: ["nobel_laureate", "specialist", "late_recognition"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q199654" },
    portrait: {
      url: "/portraits/barbara-mcclintock-gotfryd-1981.jpg",
      source: "Library of Congress, Prints and Photographs Division",
      license: "No known restrictions on publication",
      width: 1280,
      height: 1898,
      attribution: "Bernard Gotfryd, 1981",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_mcclintock_wikipedia", kind: "wikipedia", title: "Barbara McClintock", url: "https://en.wikipedia.org/wiki/Barbara_McClintock" }, { id: "src_mcclintock_keller", kind: "biography", title: "Evelyn Fox Keller, A Feeling for the Organism: The Life and Work of Barbara McClintock (1983), based on extensive interviews with McClintock and her colleagues" }],
    rows: {
      // Proposed the existence of mobile genetic elements ('jumping genes', 1940s-50s) in direct contradiction to the field's prevailing model of a fixed, stable genome, documented in Keller's biography as receiving substantial skepticism and even ridicule from the mainstream genetics community for decades before general acceptance.
      independent_thinking: [92, 0.75, "d", "A"],
      // Continued pursuing and publishing on transposable elements for roughly three decades (1940s-1970s) despite the concept's poor initial reception, documented in Keller's biography, until the field caught up and she received the 1983 Nobel Prize -- more than 30 years after her initial description of the phenomenon.
      persistence: [90, 0.72, "d", "A"],
      // Sustaining and continuing to publish a theory that drew sustained professional skepticism for decades implies real tolerance for prolonged intellectual conflict with her field, inferred from the documented multi-decade reception history in Keller's biography.
      conflict_tolerance: [78, 0.58, "s", "N"],
      // After the poor reception of her 1951 presentation on transposable elements, she largely stopped publishing on the topic in mainstream venues for years while continuing the research independently, documented in Keller's biography -- a specific pattern of self-directed continuation despite lack of institutional validation.
      autonomy_need: [84, 0.55, "s", "A"],
      // Sustained, highly detailed cytogenetic mapping of maize chromosomes over decades at Cold Spring Harbor, documented via her extensive publication record, implies exceptional sustained concentration on a single research system.
      deep_focus: [88, 0.55, "s", "A"],
      // Sustained rigorous original research for over three decades without the reinforcement of mainstream acceptance implies strong internally-driven achievement motivation, inferred from the documented career pattern.
      achievement_drive: [82, 0.5, "s", "A"],
      // Documented reputation (Keller's biography) as possessing an unusually deep, almost intuitive technical mastery of maize cytogenetics specifically, developed over decades of sustained work with a single research organism.
      mastery_orientation: [88, 0.5, "s", "A"],
      // [RUBRIC_CORRECTION, roster30 row audit: the prior rationale inferred rigor from the theory's eventual Nobel-era vindication -- an outcome-based inference this project's own scoring discipline (trait scores derive from documented behavior, never from how things later turned out, per the same 'success/outcome != trait' principle already applied elsewhere in this file's own risk_tolerance row) does not support. Narrowed to a modest, process-grounded basis instead.] The sustained, fine-grained cytogenetic mapping needed to track chromosome-breakage patterns across successive maize generations implies real analytical care in method, inferred from the documented technical nature of the research itself rather than from its later reception.
      analytical_rigor: [65, 0.4, "i", "N"],
      // Keller's biography documents that she pursued an anomalous, unexplained pattern in maize chromosome breakage (rather than dismissing it as experimental noise, the more common response) specifically because the pattern itself intrigued her -- a specific documented account of the discovery's origin, not a general inference about scientific curiosity.
      curiosity: [80, 0.65, "d", "N"],
      // Keller's biography documents that McClintock herself anticipated her 1951 Cold Spring Harbor presentation on transposable elements would be poorly received by the genetics establishment, and presented it anyway rather than withholding the finding -- a specific, documented instance of deliberate professional risk-taking, not an inferred general disposition.
      risk_tolerance: [70, 0.65, "d", "N"],
      // Decades of detailed, labor-intensive cytogenetic mapping work implies sustained behavioral discipline, inferred from the nature and duration of the research program.
      discipline: [78, 0.42, "i", "N"],
      // Fine-grained chromosome mapping work requires close attention to detail, inferred from the technical nature of her documented research method.
      detail_orientation: [82, 0.42, "i", "A"],
      // Keller's biography documents her as more comfortable with direct research than self-promotion, but she DID continue to present and publish her findings through multiple scientific venues over decades despite the poor initial reception, suggesting real, if reluctant, capacity for public scientific assertion.
      social_assertiveness: [50, 0.5, "s", "N"],
      // Much of her defining research is documented as substantially solitary work at Cold Spring Harbor, suggesting a lower collaboration orientation relative to more team-structured contemporaries.
      collaboration: [48, 0.4, "i", "N"],
      // Shifting research emphasis and communication strategy after the 1951 reception suggests some tactical adaptability, inferred from the documented change in her publication pattern.
      adaptability: [62, 0.4, "i", "N"],
      // Developing novel cytogenetic staining and mapping techniques specific to maize chromosomes suggests real experimental innovation in method, inferred from the technical nature of her documented contributions.
      experimentation: [74, 0.4, "i", "N"],
      // Sustained, systematic multi-generation maize breeding experiments imply real long-horizon experimental planning, inferred from the nature of the research design.
      planning_orientation: [60, 0.4, "i", "N"],
      // No strong documented evidence of institutional leadership ambition; her career is consistently documented as individual-research-focused rather than administratively oriented.
      leadership_drive: [45, 0.4, "i", "N"],
      // Recognizing the broader significance of an initially anomalous chromosome-behavior observation suggests real opportunity/pattern recognition, inferred from the documented origin of her key discovery.
      opportunity_sensing: [65, 0.4, "i", "N"],
      // Keller's biography documents her motivation as oriented primarily toward understanding the organism itself rather than toward broader external impact or recognition, a documented characterization used here at moderate, not high, confidence.
      impact_motivation: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_baruch_spinoza",
    slug: "baruch-spinoza",
    canonicalName: "Baruch Spinoza",
    aliases: ["Benedictus de Spinoza", "Benedict de Spinoza"],
    birthYear: 1632,
    deathYear: 1677,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["NL"],
    regionCode: "western_europe",
    historicalPolityKey: "polity.dutch_republic",
    occupationIds: ["philosopher"],
    fieldIds: ["philosophy"],
    impactDomains: ["cultural", "historical", "educational"],
    tagIds: ["nonconformist", "independent", "philosopher"],
    archetypeIds: ["independent_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q35802" },
    portrait: {
      url: "/portraits/baruch-spinoza-1665.jpg",
      source: "Herzog August Bibliothek, Wolfenbüttel",
      license: "PD-Art (PD-old-100-expired)",
      width: 1280,
      height: 1487,
      attribution: "Unknown artist, circa 1665",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_spinoza_wikipedia", kind: "wikipedia", title: "Baruch Spinoza", url: "https://en.wikipedia.org/wiki/Baruch_Spinoza" }, { id: "src_spinoza_herem", kind: "institution", title: "The 1656 herem (writ of excommunication) against Spinoza, preserved in the Amsterdam Portuguese-Jewish community's own Livro dos Acordos de Nacao e Ascamot -- an institutional record, not an anecdote. The document itself does not specify his particular offense." }, { id: "src_spinoza_correspondence", kind: "archive", title: "Spinoza's own published Epistolae, specifically his 1663 exchange with Simon de Vries (Letters XXVI-XXVIII), his 1664-1665 exchange with Willem van Blijenbergh (8 letters), and his 1673 reply to Johann Ludwig Fabricius declining the Heidelberg professorship" }, { id: "src_spinoza_ttp_ban", kind: "institution", title: "The 1670 anonymous publication of the Tractatus Theologico-Politicus and its formal banning by the States of Holland in 1674 -- a matter of public record, independent of any single biographer" }, { id: "src_spinoza_ultimibarbarorum", kind: "biography", title: "The 'ultimi barbarorum' 1672 anecdote (Spinoza restrained by his landlord from publicly protesting the lynching of the de Witt brothers) -- traced in this pass only to Freudenthal's 1899 scholarly compilation (as cited by the Stanford Encyclopedia of Philosophy); a verified near-contemporary source for the episode was not established this session, so it is used at low confidence only" }],
    rows: {
      // Excommunicated (herem) by the Amsterdam Portuguese-Jewish community in July 1656 via an unusually severe, permanent writ of banishment -- a documented institutional consequence for positions the community's own leadership found irreconcilable, preserved in the community's own Book of Ordinances. The surviving document does not specify his exact offense, so only the severity and permanence of the community's response is documented here, not the specific content of the heresy.
      independent_thinking: [90, 0.65, "d", "A"],
      // Repeatedly declined direct financial gifts and a full inheritance offer from his friend Simon de Vries (1663), negotiating instead for only a modest, sufficient annuity; separately and independently, declined an offered professorship at Heidelberg University (1673) in his own surviving reply letter to Johann Ludwig Fabricius, citing a wish to preserve his philosophical independence from institutional constraint. Two independent documented instances across different domains (financial security, institutional career position) meets this rubric's top confidence band.
      autonomy_need: [85, 0.68, "d", "A"],
      // Sustained an eight-letter philosophical correspondence with Willem van Blijenbergh (Dec 1664-June 1665, including an in-person visit) engaging repeated theological objections to his determinism, before directly and explicitly asking Blijenbergh to stop writing once he judged further exchange futile -- his own quoted words survive: 'I can hardly think that we can derive any mutual instruction from further correspondence.' Marked dual_edged: sustained engagement for months, but a deliberate, self-aware limit once he judged the disagreement irreconcilable, not indefinite openness.
      conflict_tolerance: [78, 0.55, "s", "D"],
      // Published the Theological-Political Treatise (1670) anonymously and without a named printer specifically because of its politically and religiously dangerous content -- a deliberate, documented risk-management act; the book was formally banned by the States of Holland in 1674, a matter of public record. Kept distinct from the more cautiously-sourced 1672 'ultimi barbarorum' anecdote, which is not used to inflate this score.
      risk_tolerance: [72, 0.55, "s", "A"],
      // The same repeated pattern of declining more money than he judged necessary, sustained across multiple separate financial offers from de Vries over time, suggests real habitual self-regulation around material consumption rather than a single one-off refusal.
      discipline: [68, 0.46, "s", "N"],
      // Published the Theological-Political Treatise anticipating (and receiving) severe backlash specifically to advance an argument for freedom of philosophical and religious thought as a public good, inferred from the documented stated aims and reception of the work.
      impact_motivation: [60, 0.42, "i", "N"],
      // Maintained a wide correspondence network (Oldenburg, Leibniz, de Vries, Blijenbergh, Jelles, and others) sustained over years on technical philosophical matters, inferred as requiring real capacity to engage and hold serious interlocutors' attention on difficult material.
      persuasiveness: [60, 0.44, "i", "N"],
      // Earned his living for years through the exacting, methodical craft of lens-grinding alongside his philosophical writing, suggesting some real capacity for sustained, precise practical work, though direct documentation of his personal working method is limited in the sources reviewed this pass.
      planning_orientation: [52, 0.4, "i", "N"],
      // Supported himself financially through lens-grinding and self-limited gifts/annuities rather than a stable institutional position (he separately declined the Heidelberg professorship), suggesting real capacity to sustain himself outside conventional institutional support.
      resourcefulness: [60, 0.4, "i", "N"],
      // Sustained an unusually wide-ranging correspondence covering optics, theology, politics, and metaphysics with a diverse set of interlocutors across several countries, inferred from the documented range of his surviving correspondence topics.
      curiosity: [72, 0.42, "i", "N"],
      // His professional craft of precision lens-grinding, sustained as his primary livelihood for years, suggests real sustained attention to exacting technical detail.
      detail_orientation: [65, 0.4, "i", "N"],
      // Continued producing major philosophical work (the Ethics, left unpublished at his death for safety, and other treatises) across a shortened working life while supporting himself through manual craft work, suggesting sustained ambition despite modest material circumstances.
      achievement_drive: [60, 0.38, "i", "N"],
      // Continued his philosophical project across the disruption of excommunication, relocation, and sustained religious/political hostility (including the risky 1670 publication of the Theological-Political Treatise), suggesting real sustained persistence through adversity.
      persistence: [62, 0.4, "i", "N"],
      // Engaged directly and substantively with prominent contemporaries -- Leibniz visited him in person in 1676; Henry Oldenburg corresponded with him for years as secretary of the Royal Society -- suggesting some real capacity for direct intellectual engagement with prominent figures despite his generally reclusive reputation.
      social_assertiveness: [55, 0.38, "i", "N"],
      // Sustained correspondence relationships with a genuine circle of friends and intellectual contacts (Jelles, Oldenburg, de Vries, Meyer) over many years, a moderate signal of real capacity for sustained collegial relationship alongside his largely solitary working life.
      collaboration: [50, 0.38, "i", "N"],
      // Relocated multiple times after the 1656 excommunication (Amsterdam to Rijnsburg to Voorburg to The Hague) while sustaining his philosophical work and craft livelihood across each move, suggesting some real capacity to rebuild a stable working life after major social rupture.
      adaptability: [52, 0.38, "i", "N"],
      // Continued refining and expanding his philosophical system across multiple major works (the Short Treatise, the Theological-Political Treatise, the Ethics) over roughly two decades rather than resting on an early formulation, inferred from the documented development across his corpus.
      mastery_orientation: [58, 0.38, "i", "N"],
      // Pursued an independent philosophical program and craft livelihood self-directedly after the 1656 excommunication severed his position within his birth community, rather than seeking reintegration or an alternative institutional home, inferred from the documented trajectory of his post-excommunication life.
      proactive_agency: [58, 0.4, "i", "N"],
    },
  },
  {
    id: "p_chien_shiung_wu",
    slug: "chien-shiung-wu",
    canonicalName: "Chien-Shiung Wu",
    birthYear: 1912,
    deathYear: 1997,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CN", "US"],
    regionCode: "east_asia",
    occupationIds: ["physicist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: ["specialist", "overcame_adversity"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q450317" },
    portrait: {
      url: "/portraits/chien-shiung-wu-1963.jpg",
      source: "Smithsonian Institution Archives",
      license: "No known copyright restrictions",
      width: 1280,
      height: 1633,
      attribution: "Smithsonian Institution Archives, 1963",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_wu_wikipedia", kind: "wikipedia", title: "Chien-Shiung Wu", url: "https://en.wikipedia.org/wiki/Chien-Shiung_Wu" }, { id: "src_wu_ahf", kind: "institution", title: "Atomic Heritage Foundation -- Chien-Shiung Wu", url: "https://ahf.nuclearmuseum.org/ahf/profile/chien-shiung-wu/" }, { id: "src_wu_mit1964", kind: "institution", title: "Stanford Physics 241 course page and multiple independent secondary accounts documenting her 1964 MIT symposium address on \"American Women in Science\" (alongside Lillian Gilbreth), including her own quoted remarks" }, { id: "src_wu_michigan_berkeley", kind: "press", title: "Biographical accounts (The Matilda Project; Eileen McGinnis) of her decision to attend Berkeley rather than the University of Michigan specifically after learning women were barred from the Michigan student union's front door" }],
    rows: {
      // Designed and executed the 1956 cobalt-60 beta-decay experiment (at near-absolute-zero temperatures) that definitively disproved the assumed conservation of parity, a specific, precisely dated, technically demanding experimental achievement documented via the Atomic Heritage Foundation and the broader physics-history record, later winning Lee and Yang the 1957 Nobel Prize based directly on her experimental confirmation.
      analytical_rigor: [94, 0.68, "d", "A"],
      // Recognized specifically for her expertise in beta-decay experimentation -- the reason Lee and Yang sought her out by name in 1956 to test their theory -- a documented, specific instance of recognized technical mastery in a defined subfield, not a general reputation.
      mastery_orientation: [90, 0.6, "d", "A"],
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: 'identifying the specific cause' overstated a team effort; the already-cited Atomic Heritage Foundation account says Wu 'helped identify' the poisoning, not that she alone identified it. Corrected below.] Documented contributions during the Manhattan Project (developing improved Geiger counter methods, helping identify xenon-135 poisoning as the cause of the Hanford B Reactor's plutonium-production shutdown) show a sustained pattern of solving concrete experimental/technical problems, inferred from the documented range of her wartime contributions.
      experimentation: [88, 0.55, "s", "A"],
      // Designing an experiment sensitive enough to detect a subtle asymmetry at near-absolute-zero temperatures required exceptional experimental precision, inferred from the technical demands of the documented parity experiment.
      detail_orientation: [86, 0.5, "s", "A"],
      // Sustaining a demanding experimental physics career across the Manhattan Project, the parity experiment, and subsequent decades of beta-decay research implies real persistence, inferred from the documented span of her research career.
      persistence: [82, 0.46, "i", "A"],
      // Continuing her research career and later repeatedly, publicly advocating for recognition of her uncredited role in the parity-violation discovery (for which Lee and Yang alone received the 1957 Nobel Prize) suggests sustained tolerance for a specific, ongoing professional grievance, inferred from the documented pattern of her later advocacy.
      conflict_tolerance: [65, 0.55, "s", "N"],
      // Sustained pursuit of technically demanding experimental physics across a career spanning the Manhattan Project through major independent beta-decay research implies strong achievement drive, inferred from the documented range and difficulty of her research program.
      achievement_drive: [84, 0.44, "i", "A"],
      // The parity experiment's technical demands (maintaining near-absolute-zero conditions for precise measurement) imply real sustained experimental discipline, inferred from the documented difficulty of the method.
      discipline: [80, 0.42, "i", "N"],
      // Agreeing to design and personally execute an experiment intended to test -- and potentially overturn -- a long-assumed fundamental symmetry of physics carried real professional risk if the experiment had failed or been ambiguous, inferred from the documented stakes and technical difficulty of the 1956 parity experiment.
      risk_tolerance: [60, 0.55, "s", "N"],
      // Willingness to take on a technically novel experimental challenge outside her established beta-decay work suggests real underlying scientific curiosity, inferred from the documented circumstances of being asked to design the parity experiment.
      curiosity: [78, 0.4, "i", "N"],
      // Designing and independently executing the specific technical approach for the parity experiment, rather than following a prescribed method, suggests real self-direction, inferred from the documented account of the experiment's design.
      autonomy_need: [62, 0.4, "i", "N"],
      // Working directly with theoretical physicists Lee and Yang to translate their theoretical prediction into a testable experiment implies real collaborative capacity across the theory/experiment divide, inferred from the documented working relationship.
      collaboration: [68, 0.4, "i", "N"],
      // [NEW_EVIDENCE, this session] A second, independent, differently-motivated instance now corroborates the Nobel-credit advocacy: at a 1964 MIT symposium on "American Women in Science," she is directly quoted publicly challenging the exclusion of women from science generally ("I wonder whether the tiny atoms and nuclei... have any preference for either masculine or feminine treatment") -- public advocacy for systemic change, not only her own personal recognition. Two independent documented instances in different motivational domains meets this rubric's strong_inference standard.
      social_assertiveness: [64, 0.55, "s", "A"],
      // Successfully transitioning from Manhattan Project engineering-adjacent problem-solving to fundamental-physics experimental design suggests real adaptability across different types of technical work.
      adaptability: [64, 0.4, "i", "N"],
      // Sustained, precise experimental work at extreme temperature conditions implies real sustained concentration, inferred from the technical demands of the documented experiment.
      deep_focus: [76, 0.4, "i", "N"],
      // Designing a novel experimental apparatus to test a specific theoretical prediction implies real methodical planning, inferred from the documented technical complexity of the parity experiment's design.
      planning_orientation: [66, 0.4, "i", "N"],
      // [NEW_EVIDENCE, this session] A second, independent-domain instance now corroborates the Hanford episode: as a student, upon learning women were barred from the University of Michigan student union's main entrance, she made a specific, documented decision to attend Berkeley instead -- a concrete, self-directed career/institutional choice made in direct response to a specific discriminatory signal, not a passive reaction.
      proactive_agency: [70, 0.52, "s", "A"],
      // Being specifically sought out by Lee and Yang due to her recognized specialized expertise suggests she had built a reputation others recognized as uniquely positioned to solve the problem, inferred from the documented reason she was approached.
      opportunity_sensing: [60, 0.4, "i", "N"],
      // Biographical accounts document her career as primarily focused on her own experimental research rather than institutional administrative leadership, though she later held named professorships.
      leadership_drive: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_frederick_sanger",
    slug: "frederick-sanger",
    canonicalName: "Frederick Sanger",
    birthYear: 1918,
    deathYear: 2013,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["scientist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "medical"],
    tagIds: ["nobel_laureate", "specialist"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q151564" },
    portrait: {
      url: "/portraits/frederick-sanger-nlm.jpg",
      source: "U.S. National Library of Medicine (NIH)",
      license: "PD-USGov",
      width: 897,
      height: 1196,
      attribution: "U.S. National Library of Medicine",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sanger_wikipedia", kind: "wikipedia", title: "Frederick Sanger", url: "https://en.wikipedia.org/wiki/Frederick_Sanger" }, { id: "src_sanger_royalsociety", kind: "institution", title: "George G. Brownlee, Frederick Sanger CBE CH OM, Biographical Memoirs of Fellows of the Royal Society 61 (2015)", url: "https://royalsocietypublishing.org/rsbm/article/61/1/437/63868/Frederick-Sanger-CBE-CH-OM-13-August-1918-19" }],
    rows: {
      // [ERROR_CORRECTION, roster30 factual gate: re-opening en.wikipedia.org/wiki/Frederick_Sanger found he is 'one of only three people to have won multiple Nobel Prizes in the same category' alongside John Bardeen (physics) and Karl Barry Sharpless (chemistry, 2001 and 2022) -- 'the only person' to win Chemistry twice is no longer accurate now that Sharpless has also done so; narrowed to 'one of only two'.] One of only two people to have won the Nobel Prize in Chemistry twice (1958 for protein sequencing, 1980 for nucleic-acid sequencing), documented in the Royal Society's own biographical memoir -- a specific, precisely dated, doubly-verified record of sustained top-tier technical achievement across two distinct methodological breakthroughs decades apart.
      mastery_orientation: [92, 0.7, "d", "A"],
      // Sustained, methodologically distinct sequencing research across more than three decades of his career (protein sequencing methods developed through the 1950s, nucleic-acid sequencing developed through the 1970s), documented in the Royal Society memoir, rather than resting on a single early breakthrough.
      persistence: [88, 0.62, "d", "A"],
      // [RUBRIC_CORRECTION, roster30 row audit: the prior rationale inferred rigor from the two methods' later Nobel recognitions -- an outcome-based inference this project's own scoring discipline (trait scores derive from documented behavior, never from how things later turned out) does not support. Narrowed to a modest, process-grounded basis instead.] Developing two methodologically distinct, multi-step sequencing techniques (protein, then nucleic acid) implies real analytical care in method design, inferred from the documented technical structure of the two methods themselves rather than from their later reception.
      analytical_rigor: [65, 0.4, "i", "N"],
      // Spending his entire academic career at Cambridge focused on sequencing methodology specifically, documented in the Royal Society memoir, implies sustained deep focus on a coherent research problem across decades rather than broad, scattered interests.
      deep_focus: [86, 0.52, "s", "A"],
      // Independently developing two methodologically distinct sequencing techniques (protein, then nucleic acid) rather than only refining his first method implies real experimental range and willingness to develop genuinely new approaches, inferred from the documented dual achievement.
      experimentation: [85, 0.5, "s", "A"],
      // Sustained, methodical laboratory work across decades on technically demanding sequencing problems implies real behavioral discipline, inferred from the documented career pattern.
      discipline: [82, 0.46, "i", "N"],
      // Protein and nucleic-acid sequencing both require exceptionally precise, granular technical work, implying strong attention to detail, inferred from the technical nature of the documented achievements.
      detail_orientation: [86, 0.46, "i", "A"],
      // Developing two separate methods each precise and reliable enough to become field-standard techniques suggests real perfectionism in method development, inferred from the documented rigor required for both to be adopted broadly.
      perfectionism: [76, 0.44, "i", "N"],
      // Moving into a substantially different technical domain (nucleic acids rather than proteins) after already achieving the field's highest recognition, rather than remaining within his established area of expertise, suggests strong underlying scientific curiosity beyond career incentive, inferred from the documented shift.
      curiosity: [78, 0.55, "s", "N"],
      // Developing sequencing methods that were not straightforward extensions of prevailing techniques suggests independent technical judgment, inferred from the documented novelty of both breakthroughs.
      independent_thinking: [74, 0.42, "i", "N"],
      // Sustained work on self-directed long-term methodology development, documented as his career-long focus at Cambridge, suggests moderate autonomy orientation.
      autonomy_need: [62, 0.4, "i", "N"],
      // Successfully shifting his technical focus from protein to nucleic-acid sequencing across his career suggests real adaptability, inferred from the documented career transition.
      adaptability: [66, 0.4, "i", "N"],
      // Pursuing and achieving a second, methodologically independent Nobel-recognized breakthrough after the first suggests sustained internally-driven achievement motivation rather than resting on established success, a stronger inference than a single documented statement but grounded directly in the documented dual-Nobel record itself.
      achievement_drive: [78, 0.55, "s", "N"],
      // The Royal Society memoir documents a research career centered on his own laboratory's technical development rather than large-scale collaborative projects, suggesting a moderate, not high, collaboration orientation for his defining work.
      collaboration: [58, 0.4, "i", "N"],
      // Developing complex multi-step sequencing methodologies implies real systematic planning of technical approach, inferred from the nature of the documented methods.
      planning_orientation: [64, 0.4, "i", "N"],
      // Developing a generalizable sequencing methodology (rather than a one-off solution for a specific molecule) implies real structural/systematic thinking, inferred from the broad subsequent applicability of his documented methods.
      systems_abstraction: [72, 0.4, "i", "N"],
      // The Royal Society memoir and other biographical accounts consistently describe him as notably modest and reserved rather than self-promoting, a documented characterization used here at moderate confidence.
      social_assertiveness: [42, 0.4, "i", "N"],
      // Deliberately shifting his research focus to nucleic-acid sequencing after already achieving major recognition (and a Nobel Prize) in protein sequencing -- a technically distinct and initially uncertain domain -- risked his established reputation on an unproven new direction, inferred from the documented career pivot rather than a specific first-person account of the decision.
      risk_tolerance: [55, 0.55, "s", "N"],
      // Biographical accounts document him as primarily bench-research-focused throughout his career rather than pursuing senior administrative or institutional leadership roles.
      leadership_drive: [45, 0.4, "i", "N"],
      // Recognizing nucleic-acid sequencing as the next major open technical problem after his protein-sequencing success suggests real opportunity recognition, inferred from the documented career progression.
      opportunity_sensing: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_georgia_okeeffe",
    slug: "georgia-okeeffe",
    canonicalName: "Georgia O'Keeffe",
    birthYear: 1887,
    deathYear: 1986,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["artist"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["innovator"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q46408" },
    portrait: {
      url: "/portraits/georgia-okeeffe-vanvechten-1950.jpg",
      source: "Library of Congress, Van Vechten Collection",
      license: "No known copyright restrictions (restrictions expired 1986)",
      width: 1280,
      height: 1593,
      attribution: "Carl Van Vechten, 1950",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_okeeffe_wikipedia", kind: "wikipedia", title: "Georgia O'Keeffe", url: "https://en.wikipedia.org/wiki/Georgia_O%27Keeffe" }, { id: "src_okeeffe_met", kind: "institution", title: "The Metropolitan Museum of Art's essay on Georgia O'Keeffe (1887-1986)", url: "https://www.metmuseum.org/essays/georgia-okeeffe-1887-1986" }, { id: "src_okeeffe_artnews", kind: "press", title: "\"Georgia O'Keeffe Made These Works After Going Blind\" (ARTnews) -- documents her post-1972 adaptation to macular degeneration", url: "https://www.artnews.com/art-in-america/features/georgia-okeeffe-blind-moma-1234668702/" }, { id: "src_okeeffe_smithsonian", kind: "press", title: "\"Newly Public Letters Show Georgia O'Keeffe's Quest for Independence\" (Smithsonian)", url: "https://www.smithsonianmag.com/smart-news/newly-public-letters-show-georgia-okeeffes-quest-independence-180971784/" }],
    rows: {
      // Repeatedly, across two decades (1929-1946), chose to spend her summers working independently in New Mexico, documented as often against her husband Alfred Stieglitz's wishes, then permanently relocated there after his death rather than remaining in New York -- a sustained, multi-decade documented pattern of prioritizing personal and artistic independence.
      autonomy_need: [82, 0.65, "d", "A"],
      // Multiple independent, well-documented adaptations across roughly two decades: after losing the ability to paint unassisted oils (1972) due to progressive macular degeneration, continued working in pencil and charcoal for over a decade; then learned an entirely new medium, clay and sculpture, from an assistant; and produced a further major series of watercolors in her late 80s despite near-total blindness.
      adaptability: [84, 0.68, "d", "A"],
      // Publicly and directly pushed back against gendered and sexualized critical readings of her work, documented via her own 1922 quoted rejection of critics who portrayed her as an "unearthly" creature, sustained across her career against a persistent critical framing of her work through her body.
      conflict_tolerance: [70, 0.55, "d", "A"],
      // Two independent documented stylistic innovations across different career periods: her radically abstract compositions of 1915-1916 are recognized as a defining, original contribution to American modernism, and she later developed an entirely distinct regional visual vocabulary following her relocation to New Mexico.
      creative_originality: [78, 0.6, "d", "A"],
      // Sustained formal art training across four distinct institutions over more than a decade (1905-1916) while also supporting herself through a parallel multi-year teaching career across three different states (Virginia, Texas, South Carolina, 1911-1918) before establishing herself as a professional artist.
      persistence: [68, 0.5, "d", "A"],
    },
  },
  {
    id: "p_hypatia",
    slug: "hypatia",
    canonicalName: "Hypatia",
    aliases: ["Hypatia of Alexandria"],
    birthYear: 350,
    deathYear: 415,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "north_africa",
    historicalPolityKey: "polity.roman_empire",
    occupationIds: ["mathematician", "philosopher"],
    fieldIds: ["mathematics", "philosophy", "natural_science"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["independent", "philosopher", "nonconformist"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q11903" },
    portrait: {
      url: "/portraits/hypatia-engraving-1850.jpg",
      source: "Wikimedia Commons",
      license: "PD-Art (PD-old-100)",
      width: 695,
      height: 1000,
      attribution: "Unknown engraver, circa 1850",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hypatia_wikipedia", kind: "wikipedia", title: "Hypatia", url: "https://en.wikipedia.org/wiki/Hypatia" }, { id: "src_hypatia_synesius", kind: "archive", title: "The surviving letters of Synesius of Cyrene to Hypatia" }, { id: "src_hypatia_socratesscholasticus", kind: "archive", title: "Socrates Scholasticus, Ecclesiastical History (early 5th century, near-contemporary account)" }],
    rows: {
      // Taught advanced mathematics and astronomy at Alexandria, corroborated by the surviving letters of her student Synesius of Cyrene, a genuine near-contemporary primary source rather than later legend.
      analytical_rigor: [74, 0.58, "s", "A"],
      // Documented (via Synesius's letters and Socrates Scholasticus) to have taught across mathematics, astronomy, and Neoplatonist philosophy simultaneously, evidencing real breadth of engagement.
      curiosity: [70, 0.52, "s", "A"],
      // Headed the Neoplatonist school in Alexandria and trained students who went on to prominent positions, including Synesius, who later became a bishop — corroborated by his own surviving correspondence with her.
      leadership_drive: [72, 0.55, "s", "A"],
      // Synesius's letters describe her as a highly respected, actively sought-after teacher and advisor, a specific documented characterization from a former student rather than secondhand legend.
      persuasiveness: [68, 0.52, "s", "A"],
      // Socrates Scholasticus, a near-contemporary historian, documents her as a public advisor to the Roman prefect Orestes — a notable public political role for a woman in this period.
      social_assertiveness: [65, 0.5, "s", "A"],
      // Continued teaching and publicly practicing Neoplatonist philosophy in an increasingly Christianized Alexandria, maintaining her position rather than abandoning it under mounting religious and political pressure.
      independent_thinking: [70, 0.52, "s", "A"],
      // Continued her public teaching and advisory role despite escalating religious-political tension in Alexandria in the years before her death — scored from the documented behavior of continuing amid known tension, not from the outcome of her murder itself, which the rubric's 'success/outcome != trait score' principle applies to symmetrically.
      risk_tolerance: [66, 0.48, "i", "R"],
      // Credited (with some scholarly uncertainty around exact attribution) with commentaries on Diophantus's Arithmetica and Apollonius's Conics — real, if imperfectly corroborated, sustained mathematical scholarship.
      mastery_orientation: [62, 0.45, "i", "A"],
      // The sustained correspondence with Synesius documents a real, ongoing mentoring relationship extending well beyond his formal period of study under her.
      collaboration: [60, 0.48, "s", "A"],
      // Documented to have continued advising Orestes despite his well-attested fraught political relationship with Bishop Cyril of Alexandria — a real, if not extensively detailed, willingness to remain embedded in a known point of tension.
      conflict_tolerance: [58, 0.45, "i", "R"],
      // Documented teaching across mathematics, astronomy, and philosophy simultaneously, corroborated by Synesius's letters describing instruction in more than one of these areas.
      cross_domain_range: [68, 0.5, "s", "A"],
      // Later scholarly assessment holds that her mathematical commentaries extended and clarified the original texts rather than merely restating them, though this rests on largely-lost primary work and secondhand scholarly reconstruction, hence modest confidence.
      creative_originality: [58, 0.42, "i", "N"],
      // Synesius's surviving letters reference correspondence with her related to constructing scientific instruments (an astrolabe and a hydrometer are both mentioned) — real but thin documentary detail about the instruments' design or her specific role in it.
      experimentation: [55, 0.4, "i", "N"],
      // Mathematical commentary work of this kind (as later scholarship characterizes it) typically involves reorganizing and clarifying an existing complex system for students, though this is inferred from the genre rather than a specific documented instance.
      systems_abstraction: [60, 0.45, "i", "A"],
      // Maintained her teaching and advisory role over an extended period despite the same rising political and religious tension noted under risk_tolerance.
      persistence: [60, 0.45, "i", "A"],
      // Documented by Socrates Scholasticus to have never married and to have maintained an independent scholarly career and household throughout her life — a specific, if brief, documented biographical detail.
      autonomy_need: [62, 0.46, "s", "A"],
      // Sustaining a combined teaching, scholarly, and public-advisory role over an extended career suggests real sustained effort, though the surviving sources describe the roles more than the day-to-day working pattern behind them.
      discipline: [58, 0.42, "i", "A"],
      // Mathematical commentary work of the kind attributed to her typically requires close technical textual work, though this is inferred from the nature of the genre rather than a specific surviving example of her own detailed technique.
      detail_orientation: [52, 0.4, "i", "N"],
      // Sustaining a structured, multi-year course of philosophical and mathematical instruction for students (evidenced by the sustained correspondence with Synesius spanning his years of study and after) implies real organized pedagogical planning.
      planning_orientation: [60, 0.44, "i", "A"],
      // The scholarly-commentary genre attributed to her typically involves close, careful textual refinement, though this is inferred from the genre rather than from a specific surviving example of her revision process.
      perfectionism: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_jean_francois_champollion",
    slug: "jean-francois-champollion",
    canonicalName: "Jean-Francois Champollion",
    birthYear: 1790,
    deathYear: 1832,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["FR"],
    regionCode: "western_europe",
    occupationIds: ["historian"],
    fieldIds: ["linguistics"],
    impactDomains: ["scientific", "educational", "historical"],
    tagIds: ["founder", "specialist"],
    archetypeIds: ["scholarly_specialist", "scientific_explorer"],
    externalIdentity: { wikidataId: "Q260" },
    portrait: {
      url: "/portraits/jean-francois-champollion-cogniet-1831.jpg",
      source: "Musée du Louvre",
      license: "PD-Art (artist d. 1880, published pre-1931)",
      width: 1280,
      height: 1572,
      attribution: "Léon Cogniet, 1831",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_champollion_wikipedia", kind: "wikipedia", title: "Jean-Francois Champollion", url: "https://en.wikipedia.org/wiki/Jean-Fran%C3%A7ois_Champollion" }, { id: "src_champollion_britannica", kind: "institution", title: "Encyclopaedia Britannica -- Jean-Francois Champollion", url: "https://www.britannica.com/biography/Jean-Francois-Champollion" }, { id: "src_champollion_britannica2", kind: "institution", title: "JSTOR Daily -- Jean-Francois Champollion Deciphers the Rosetta Stone", url: "https://daily.jstor.org/jean-francois-champollion-deciphers-the-rosetta-stone/" }],
    rows: {
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: the original rationale claimed six languages 'mastered... by age 12' as a single precisely-dated documented fact; re-opening the cited Wikipedia article found the languages were acquired progressively from around age 11 into his mid-teens (Latin and Greek first, then Hebrew and other Semitic languages including Arabic, Syriac, and Chaldean during the same school years, with Coptic and Chinese added around 1805-1806), not a single 'mastered by 12' milestone -- the article explicitly describes an ongoing 'progression', not a completed fact at that age. Score and confidence narrowed accordingly: the age-12 precision that justified the original near-maximal 'documented' score is not itself supported, though the underlying pattern of exceptional early language study is well documented.] From childhood into his teens, Champollion pursued an unusually intensive, self-directed study of classical and Oriental languages -- including Latin, Greek, Hebrew, Arabic, Syriac, Chaldean, and later Coptic and Chinese -- a documented pattern of sustained language acquisition well beyond any institutional requirement of the time.
      mastery_orientation: [82, 0.55, "s", "A"],
      // His 27 September 1822 presentation to the Academie des Inscriptions et Belles-Lettres, correctly identifying that Egyptian hieroglyphs combined alphabetic, syllabic, and determinative signs (rather than being purely symbolic, the prevailing assumption), is a specific, precisely-dated, extensively documented analytical breakthrough.
      analytical_rigor: [94, 0.68, "d", "A"],
      // The decipherment took from the Rosetta Stone's 1799 discovery to his 1822 announcement -- 23 years, though Champollion's own intensive work is concentrated in the final years -- implying sustained multi-year focus on a single unsolved problem, inferred from the documented timeline.
      persistence: [88, 0.6, "s", "A"],
      // Pursuing the specific goal of founding what became the field of scientific Egyptology, in direct competition with established rival scholar Thomas Young, implies strong achievement drive, inferred from the documented competitive context of the decipherment race.
      achievement_drive: [85, 0.55, "s", "A"],
      // His decisive September 27, 1822 presentation to the Academie des Inscriptions et Belles-Lettres was made with his chief rival, English polymath Thomas Young, present in the audience -- a specific, precisely documented instance of a direct, public, high-stakes scholarly competition, not a general reputational claim.
      competitiveness: [78, 0.65, "d", "N"],
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: corrected the 'six languages by age 12' framing -- see mastery_orientation's own rationale for the source detail.] Independently pursuing this breadth of language study across his childhood and teens, well beyond any institutional requirement of the time, implies exceptional underlying intellectual curiosity, inferred from the documented pattern of self-directed language acquisition.
      curiosity: [80, 0.46, "s", "A"],
      // Rejecting the field's prevailing assumption that hieroglyphs were purely symbolic/pictographic, in favor of a phonetic-component theory, suggests independent analytical judgment against consensus, inferred from the documented content of his breakthrough.
      independent_thinking: [82, 0.48, "i", "A"],
      // Sustained, detailed comparative analysis across Greek, Demotic, and hieroglyphic scripts on the Rosetta Stone implies real sustained concentration, inferred from the technical nature of the documented decipherment work.
      deep_focus: [84, 0.46, "i", "A"],
      // Systematic, sustained language study from early childhood implies real behavioral discipline, inferred from the documented pattern of his early education.
      discipline: [78, 0.44, "i", "N"],
      // Precise sign-by-sign comparative analysis across three parallel scripts implies close attention to detail, inferred from the technical nature of the decipherment task.
      detail_orientation: [80, 0.42, "i", "A"],
      // Testing and revising successive hypotheses about the sign system over years before arriving at the correct model implies real iterative experimentation, inferred from the documented multi-year process.
      experimentation: [72, 0.42, "i", "N"],
      // Recognizing that hieroglyphs combined multiple sign-types into one coherent structural system, rather than treating them as an undifferentiated symbol set, implies strong structural/systems thinking, inferred from the nature of the breakthrough.
      systems_abstraction: [82, 0.42, "i", "A"],
      // Pursuing an independent, non-consensus theory against the field's prevailing assumptions suggests real self-direction, inferred from the documented content of his work.
      autonomy_need: [68, 0.4, "i", "N"],
      // Publicly presenting a theory that directly contradicted the field's prevailing symbolic-only reading of hieroglyphs, in a venue including his direct rival, carried real professional risk if his analysis had proven wrong, inferred from the documented stakes of the presentation.
      risk_tolerance: [60, 0.55, "s", "N"],
      // Presenting a field-redefining finding directly to a rival scholar and a formal academic body, rather than through indirect publication, suggests real assertiveness in a high-stakes professional confrontation, inferred from the documented circumstances of the presentation.
      social_assertiveness: [64, 0.55, "s", "N"],
      // Systematic comparison across three scripts on the Rosetta Stone implies some methodical planning of the analytical approach, inferred from the structured nature of the documented method.
      planning_orientation: [58, 0.4, "i", "N"],
      // Recognizing the Rosetta Stone's trilingual structure as the specific key to decipherment, rather than treating it as merely one artifact among many, suggests real opportunity recognition.
      opportunity_sensing: [62, 0.4, "i", "N"],
      // The decipherment is consistently documented as substantially Champollion's own individual analytical achievement rather than a collaborative team effort, suggesting a lower collaboration orientation for this defining work.
      collaboration: [45, 0.4, "i", "N"],
      // Later founding and directing the discipline of Egyptology, including academic posts at the College de France and the Louvre, suggests some institutional leadership orientation, inferred from his later documented career.
      leadership_drive: [55, 0.4, "i", "N"],
      // Revising his own working hypotheses about the sign system multiple times over years before the correct model emerged suggests real willingness to abandon a failing approach, inferred from the documented iterative process.
      adaptability: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_jesse_owens",
    slug: "jesse-owens",
    canonicalName: "Jesse Owens",
    birthYear: 1913,
    deathYear: 1980,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["athlete"],
    fieldIds: ["sport"],
    impactDomains: ["athletic", "historical", "social"],
    tagIds: ["overcame_adversity", "sustained_excellence"],
    archetypeIds: ["competitive_performer"],
    externalIdentity: { wikidataId: "Q52651" },
    portrait: {
      url: "/portraits/jesse-owens-1936.jpg",
      source: "Wikimedia Commons (International News Photos)",
      license: "PD-scan (PD-US-not-renewed)",
      width: 1280,
      height: 1409,
      attribution: "International News Photos, 1936",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_owens_wikipedia", kind: "wikipedia", title: "Jesse Owens", url: "https://en.wikipedia.org/wiki/Jesse_Owens" }, { id: "src_owens_olympedia", kind: "institution", title: "Ohio State University — Jesse Owens biography" }],
    rows: {
      // Sustained a rigorous multi-event training regimen under coach Larry Snyder at Ohio State while also working part-time jobs to support himself, since he was not offered the same athletic scholarship support as white contemporaries — a real, documented pattern of sustained effort.
      discipline: [76, 0.58, "s", "A"],
      // Set or tied six world records in under an hour at the 1935 Big Ten Championships (a specific, officially documented competitive result, not an anecdote), and his long-jump record stood for 25 years — real, sustained excellence across events.
      mastery_orientation: [80, 0.62, "d", "A"],
      // Continued training and competing at the elite level through documented segregation-era hardships (including being required to use separate travel and lodging from white teammates at some meets) without disengaging from competition.
      persistence: [74, 0.55, "s", "A"],
      // Trained and competed simultaneously across multiple distinct events (100m, 200m, long jump, relay) at a world-class level, evidencing sustained multi-event goal pursuit rather than success in a single narrow specialty.
      achievement_drive: [70, 0.52, "s", "A"],
      // Competed across several track and field events, but these remain within one broad sport rather than genuinely unrelated domains — scored moderately rather than assumed high, since 'cross-domain' here is really 'multi-event within athletics.'
      cross_domain_range: [45, 0.42, "i", "N"],
      // The 1935 Big Ten Championships performance (six records/ties in roughly 45 minutes) is a specific, officially documented competitive result reflecting real, sustained competitive drive under pressure.
      competitiveness: [78, 0.58, "d", "A"],
      // Took on an extended post-competition career as a public speaker and goodwill ambassador, a real but only moderately corroborated pattern of self-directed activity beyond his athletic career.
      proactive_agency: [55, 0.42, "i", "N"],
      // Worked multiple part-time jobs while training at an elite level due to being denied the athletic-scholarship support given to white contemporaries — a real but thinly-documented specific behavioral pattern beyond the general fact of the hardship itself.
      resourcefulness: [58, 0.42, "i", "N"],
      // Became a public lecture-circuit speaker for decades after retiring from competition — real public engagement, though the surviving record documents the fact of the career more than specific behavioral instances within it.
      social_assertiveness: [55, 0.4, "i", "N"],
      // Transitioned from world-class competitive athlete to public speaker and later business ventures — a real career transition, but with only moderate independent corroboration of the transition's specifics.
      adaptability: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_jrr_tolkien",
    slug: "jrr-tolkien",
    canonicalName: "J. R. R. Tolkien",
    aliases: ["John Ronald Reuel Tolkien"],
    birthYear: 1892,
    deathYear: 1973,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer", "scholar", "philosopher"],
    fieldIds: ["literature", "education"],
    impactDomains: ["artistic", "cultural", "educational"],
    tagIds: ["perfectionist", "prolific", "self_taught", "generalist"],
    archetypeIds: ["creative_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q892" },
    portrait: {
      url: "/portraits/jrr-tolkien-1911.jpg",
      source: "The Morgan Library & Museum",
      license: "PD (published pre-1931)",
      width: 654,
      height: 1000,
      attribution: "H.J. Whitlock & Sons Ltd., 1911",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_jrrt_wikipedia", kind: "wikipedia", title: "J. R. R. Tolkien", url: "https://en.wikipedia.org/wiki/J._R._R._Tolkien" }, { id: "src_jrrt_wikidata", kind: "wikidata", title: "J. R. R. Tolkien (Q892)", url: "https://www.wikidata.org/wiki/Q892" }, { id: "src_jrrt_letters", kind: "archive", title: "The Letters of J.R.R. Tolkien (ed. Carpenter, 1981) -- his own words across decades" }, { id: "src_jrrt_carpenter", kind: "biography", title: "Humphrey Carpenter, J.R.R. Tolkien: A Biography (1977), the authorized biography" }],
    rows: {
      // Documented, sustained invented-language and legendarium construction beginning well before The Hobbit's 1937 publication and continuing through The Lord of the Rings' 1948 completion -- attested by the surviving draft record held at the Bodleian, not only by his popularity.
      creative_originality: [90, 0.72, "d", "A"],
      // Documented construction of complete invented languages with internal grammar and history as scaffolding for the fiction, corroborated by the philological rigor of his day-job scholarship (his 1936 'Beowulf: The Monsters and the Critics' lecture, independently recognized as transformative to the field).
      detail_orientation: [88, 0.68, "d", "A"],
      // Inferred from the documented decade-plus gap between starting The Lord of the Rings and its 1948 completion while holding a full Oxford teaching post -- scored dual-edged since this same trait is well known (via publisher correspondence in the Letters) to have caused real, repeated delivery delays.
      perfectionism: [78, 0.55, "s", "D"],
      // Documented sustained output of a full academic scholarly career (Leeds, then two successive Oxford chairs, 1920-1959) in parallel with a decades-long creative project -- inferred discipline from maintaining both simultaneously over so long a period.
      discipline: [70, 0.5, "s", "A"],
      // Documented as treating Beowulf as a unified poetic work worth reading on its own artistic terms rather than only as philological source material -- a specific, dated (1936) scholarly position that ran against the field's prevailing approach at the time.
      independent_thinking: [72, 0.5, "s", "A"],
      // Inferred from the sustained, internally-consistent invented mythology, languages, and geography built as an aesthetic and philological project in its own right, independent of the later commercial success of the novels built on top of it.
      aesthetic_sensitivity: [82, 0.55, "s", "A"],
      // Documented as returning to and completing the Middle-earth legendarium project across decades and through the disruption of WWI service and a full academic career, corroborated by dated correspondence in the Letters spanning that period.
      persistence: [80, 0.58, "s", "A"],
      // Documented sustained participation in the Inklings, a informal literary discussion group meeting regularly at Oxford (1930-1950) that included C. S. Lewis, corroborated independently by Lewis's own well-documented account of Tolkien's influence on his religious conversion.
      collaboration: [68, 0.52, "s", "A"],
      // Served as a Second Lieutenant at the Battle of the Somme (July-October 1916), including the assault on the Schwaben Redoubt, before contracting trench fever -- direct documented wartime service, scored moderate/neutral since evidence describes duty performed under conscription-era norms of his cohort, not a personally chosen risk beyond that.
      risk_tolerance: [55, 0.5, "d", "N"],
      // Inferred from the documented career move from wartime service to lexicographical work on the Oxford English Dictionary (from 1918) to academic posts at Leeds then Oxford -- a real but not unusual professional path for the evidence available this cycle.
      adaptability: [62, 0.45, "i", "N"],
      // Inferred narrowly from his own documented influence on, and by, C. S. Lewis's religious views over their friendship -- thinner evidence base than other rows, kept at inference level.
      belief_updating: [60, 0.45, "i", "N"],
      // Inferred from reaching a genuinely foundational level of expertise in Old English and Germanic philology (evidenced by his named professorships and the still-cited 1936 Beowulf lecture) in parallel with equally deep invented-language construction.
      mastery_orientation: [85, 0.58, "s", "A"],
      // Documented substantive output across academic philology, invented-language construction, and long-form fiction -- narrower range than a true polymath profile, kept moderate.
      cross_domain_range: [68, 0.48, "i", "A"],
      // Inferred from sustained decades-long completion of a self-directed creative project alongside a full academic career, without stronger direct evidence of drive toward external recognition specifically.
      achievement_drive: [65, 0.45, "i", "N"],
    },
  },
  {
    id: "p_madam_cj_walker",
    slug: "madam-cj-walker",
    canonicalName: "Madam C.J. Walker",
    birthYear: 1867,
    deathYear: 1919,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur"],
    fieldIds: ["business"],
    impactDomains: ["historical", "social", "wealth_creation"],
    tagIds: ["founder", "self_taught"],
    archetypeIds: ["entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q447716" },
    portrait: {
      url: "/portraits/madam-cj-walker-scurlock-1914.jpg",
      source: "National Portrait Gallery, Smithsonian Institution",
      license: "PD-US-expired (published pre-1931)",
      width: 1280,
      height: 1886,
      attribution: "Addison N. Scurlock, circa 1914",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_walker_wikipedia", kind: "wikipedia", title: "Madam C. J. Walker", url: "https://en.wikipedia.org/wiki/Madam_C._J._Walker" }, { id: "src_walker_blackpast", kind: "biography", title: "BlackPast.org biography of Madam C.J. Walker (1867-1919)", url: "https://blackpast.org/african-american-history/walker-madam-c-j-1867-1919/" }, { id: "src_walker_smithsonian", kind: "institution", title: "Smithsonian: \"How Business Executive Madam C. J. Walker Became a Powerful Influencer of the Early 20th Century\"", url: "https://www.smithsonianmag.com/smithsonian-institution/how-business-executive-madam-c-j-walker-became-powerful-influencer-early-20th-century-180971628/" }, { id: "src_walker_gilder", kind: "institution", title: "Gilder Lehrman Institute of American History: \"Madam C. J. Walker: A Life of Reinvention\"", url: "https://www.gilderlehrman.org/history-resources/essays/madam-c-j-walker-life-reinvention" }, { id: "src_walker_loc", kind: "institution", title: "Library of Congress: \"Beauty Entrepreneur: Madam C. J. Walker Born\"", url: "https://guides.loc.gov/this-month-in-business-history/december/madam-cj-walker-born" }],
    rows: {
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: the original rationale claimed the operation employed 'roughly 40,000 people' as direct employees; the Library of Congress's own figure is 'over 20,000 agents' -- door-to-door sales agents, not payroll employees -- across the same three regions. Narrowed to the accurately-scoped, source-supported figure below; 'agents' is not converted into 'employees'.] Grew from working as a washerwoman earning $1.50 a day to building a national manufacturing and sales operation whose network included more than 20,000 agents across the United States, Central America, and the Caribbean by 1916, documented via the well-corroborated historical record of this specific, quantified career trajectory.
      achievement_drive: [84, 0.65, "d", "A"],
      // Two independent documented instances: developed her hair-care formula from direct personal experience of the exact hair-loss problem she was solving, and built her entire distribution model around door-to-door sales through African American community networks and advertising in Black-owned newspapers -- a channel mainstream retail of the era entirely ignored.
      resourcefulness: [82, 0.65, "d", "A"],
      // Built and formalized a national sales-agent training system (the "Walker Method"), operating from a purpose-built Indianapolis factory, and personally organized her thousands of sales agents into structured local and national clubs -- sustained, deliberate organizational leadership beyond her own individual business success.
      leadership_drive: [78, 0.6, "d", "A"],
      // Deliberately used her own national sales-agent convention in Philadelphia (1917, one of the first national gatherings of businesswomen in the US) to explicitly encourage political activism among her agents -- anti-lynching work and support for Black soldiers in World War I -- rather than treating it as a purely commercial event.
      impact_motivation: [76, 0.58, "d", "A"],
      // Sustained a continuous working path from washerwoman supporting her daughter's education on $1.50 a day, through developing her own product from personal struggle, to building a national manufacturing operation -- a single long, documented arc from extreme hardship to major business success.
      persistence: [74, 0.55, "d", "A"],
    },
  },
  {
    id: "p_mary_anning",
    slug: "mary-anning",
    canonicalName: "Mary Anning",
    birthYear: 1799,
    deathYear: 1847,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["scientist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: ["self_taught", "late_recognition"],
    archetypeIds: ["scientific_explorer", "independent_creator"],
    externalIdentity: { wikidataId: "Q230491" },
    portrait: {
      url: "/portraits/mary-anning-painting.jpg",
      source: "Natural History Museum, London",
      license: "PD-Art (PD-old-auto)",
      width: 1280,
      height: 1655,
      attribution: "Unknown artist (credited to \"Mr. Grey\"), before 1842",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_anning_wikipedia", kind: "wikipedia", title: "Mary Anning", url: "https://en.wikipedia.org/wiki/Mary_Anning" }, { id: "src_anning_nhm", kind: "institution", title: "Natural History Museum, London -- Mary Anning: the unsung hero of fossil discovery", url: "https://www.nhm.ac.uk/discover/mary-anning-unsung-hero.html" }],
    rows: {
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: the dated sequence originally read '1811 ichthyosaur, 1821 plesiosaur, 1828 pterosaur'; re-opening the cited Natural History Museum account found the ichthyosaur skull was found by her brother Joseph in autumn 1811 with Mary excavating the rest in 1812, and that 1821 was the year the Plesiosaurus genus was named from a different, partial specimen -- Mary's own first complete Plesiosaurus skeleton dates to December 1823. Corrected below.] Sustained fossil-hunting work along the dangerous, landslide-prone Lyme Regis cliffs across her entire working life (from childhood until her death), documented via the Natural History Museum and corroborated by the specific, dated sequence of her major finds (1811-1812 ichthyosaur, 1823 first complete plesiosaur, 1828 pterosaur).
      persistence: [88, 0.62, "d", "A"],
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: her father Richard Anning died in 1810, not 1811 as originally stated; also softened 'primary income source' to match what the cited source actually establishes (see proactive_agency's own rationale for the fuller correction).] Self-taught fossil identification, preparation, and cataloguing skills sufficient to be consulted by professional geologists, sustained as a growing source of her family's income after her father's death in 1810, implies strong resourcefulness under real economic constraint, inferred from the documented circumstances.
      resourcefulness: [84, 0.55, "s", "A"],
      // Documented (Natural History Museum) pattern of male scientists purchasing, publishing, and receiving credit for fossils she found, cleaned, and identified without acknowledging her -- and her continuing the work regardless over decades -- suggests sustained tolerance for a specific, ongoing professional injustice.
      conflict_tolerance: [72, 0.52, "s", "N"],
      // Identifying and correctly distinguishing genuinely novel fossil species (including the first pterosaur found outside Germany) required precise anatomical comparison, inferred from the documented specificity and correctness of her identifications, later confirmed by professional scientists.
      detail_orientation: [82, 0.5, "s", "A"],
      // Developing genuine expertise and correct anatomical judgments entirely outside formal scientific institutions (which barred her as a woman) suggests strong independent capability, inferred from her documented self-taught path.
      independent_thinking: [76, 0.48, "i", "N"],
      // Sustained, physically demanding, weather-dependent fossil-hunting work as a primary livelihood across decades implies real behavioral discipline, inferred from the documented duration and consistency of her work.
      discipline: [74, 0.46, "i", "N"],
      // Sustained work along the unstable, landslide-prone Lyme Regis cliffs -- a documented cause of real injury and death in the area, including to Anning's own dog while working alongside her -- across her entire career suggests real sustained physical risk tolerance, inferred from the documented working conditions.
      risk_tolerance: [68, 0.55, "s", "N"],
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: corrected dates -- see persistence's own rationale for the source detail on the ichthyosaur/plesiosaur dating.] The escalating scientific significance of her finds over her career (1811-1812 ichthyosaur, 1823 first complete plesiosaur, 1828 first pterosaur outside Germany) suggests sustained underlying achievement drive rather than settling into routine commercial fossil trading, inferred from this documented progression.
      achievement_drive: [72, 0.5, "s", "N"],
      // Developing genuine comparative-anatomy expertise well beyond what selling fossils commercially would have required suggests real underlying scientific curiosity, inferred from the depth of her documented self-taught knowledge.
      curiosity: [78, 0.42, "i", "N"],
      // Correctly distinguishing and identifying novel species that professional geologists later confirmed suggests real analytical rigor in her identification process, inferred from the documented correctness of her work.
      analytical_rigor: [74, 0.42, "i", "N"],
      // Operating as an independent fossil dealer and identifier rather than solely as an assistant to institutional scientists suggests real self-direction, inferred from her documented working arrangement.
      autonomy_need: [66, 0.4, "i", "N"],
      // Sustaining her work and reputation despite being formally barred from the Geological Society and repeatedly denied credit suggests real adaptive resilience, inferred from the documented pattern of continuing regardless.
      adaptability: [62, 0.4, "i", "N"],
      // Increasing sophistication and significance of her identifications over a multi-decade career (culminating in being the first to find a pterosaur outside Germany) suggests developing mastery, inferred from the documented career arc.
      mastery_orientation: [76, 0.4, "i", "N"],
      // Developing her own fossil preparation and cleaning techniques, absent formal training, suggests some methodological experimentation, inferred from her self-taught path.
      experimentation: [58, 0.4, "i", "N"],
      // Directly corresponding with and being consulted by professional geologists of the era, despite her exclusion from formal scientific institutions, suggests some capacity for professional self-advocacy, inferred from the documented pattern of her being sought out.
      social_assertiveness: [55, 0.4, "i", "N"],
      // Regular correspondence and specimen exchange with professional geologists, despite the era's institutional barriers, suggests some real working collaboration, inferred from the documented pattern of these professional relationships.
      collaboration: [52, 0.4, "i", "N"],
      // [ERROR_CORRECTION, roster30 post-PR audit, 2026-09: the original rationale claimed Mary 'took over as the family's primary fossil-collecting practitioner... immediately after her father's death in 1811' -- both the year (Richard Anning died in 1810) and the 'immediate sole takeover' framing overstate what the cited Natural History Museum account establishes. The family's fossil-selling trade continued as a shared endeavor after his death; Mary's own role grew over time rather than transferring to her alone in one moment. Score, confidence, and evidenceType narrowed from documented to strong_inference accordingly.] In the years following her father's death in 1810, which left the family without its main income, Mary's role in the family's fossil-collecting trade grew substantially -- including, at about twelve, the ichthyosaur skull her brother Joseph found in autumn 1811, the rest of which she herself excavated the following year -- without any formal transition or institutional support. This is a real, documented pattern of growing responsibility-taking under family economic pressure, inferred from the documented timeline rather than a single precisely-dated handover.
      proactive_agency: [58, 0.5, "s", "N"],
      // Recognizing the scientific (not merely commercial) significance of unusual finds suggests some capacity to sense broader opportunity beyond the immediate fossil-trading transaction, inferred from the documented trajectory from trade to recognized contribution.
      opportunity_sensing: [60, 0.4, "i", "N"],
      // Careful, methodical excavation and preparation of delicate fossil specimens implies sustained close attention, inferred from the technical nature of the documented work.
      deep_focus: [64, 0.4, "i", "N"],
    },
  },
  {
    id: "p_mary_shelley",
    slug: "mary-shelley",
    canonicalName: "Mary Shelley",
    aliases: ["Mary Wollstonecraft Shelley"],
    birthYear: 1797,
    deathYear: 1851,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["founder", "prodigy"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q47152" },
    portrait: {
      url: "/portraits/mary-shelley-rothwell-1840.jpg",
      source: "National Portrait Gallery, London",
      license: "PD-Art (artist d. 1868, published pre-1931)",
      width: 1228,
      height: 1496,
      attribution: "Richard Rothwell, exhibited 1840",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_shelley_wikipedia", kind: "wikipedia", title: "Mary Shelley", url: "https://en.wikipedia.org/wiki/Mary_Shelley" }, { id: "src_shelley_journals", kind: "archive", title: "Mary Shelley's journals and letters (published posthumously)" }],
    rows: {
      // Wrote Frankenstein at age 18-19, widely credited as foundational to modern science fiction as a genre, documented via the work's own lasting critical and genre-historical recognition.
      creative_originality: [88, 0.65, "d", "A"],
      // Frankenstein directly engaged with and complicated contemporary scientific and philosophical debates (galvanism, the nature of creation and responsibility) rather than offering a simple morality tale, documented via sustained critical analysis of the novel's genuinely ambiguous treatment of its themes.
      independent_thinking: [74, 0.65, "d", "A"],
      // Frankenstein's engagement with contemporary galvanism experiments and natural philosophy debates evidences real documented engagement with the scientific discourse of her time, beyond purely literary influences.
      curiosity: [72, 0.65, "d", "A"],
      // Continued a demanding writing career across significant personal loss (the deaths of three of her four children and her husband Percy Shelley), documented via her sustained subsequent literary output including later novels and extensive editorial work on her husband's poetry.
      persistence: [68, 0.65, "d", "A"],
      // Sustained a documented, prolific writing and editorial career across decades following Frankenstein, including several further novels and extensive scholarly editing work.
      discipline: [62, 0.46, "s", "A"],
      // Continued producing new literary work throughout her life despite Frankenstein's outsized fame potentially overshadowing her later output, evidencing sustained personal ambition beyond her early success.
      achievement_drive: [60, 0.44, "s", "N"],
      // Her extensive, careful posthumous editorial work compiling and annotating Percy Shelley's poetry evidences real capacity for detailed scholarly attention.
      detail_orientation: [60, 0.44, "s", "A"],
      // Eloped with the already-married Percy Shelley at age 16, a documented major personal decision carrying real social risk in the context of her era.
      risk_tolerance: [58, 0.42, "i", "N"],
      // Produced work across the novel form, travel writing, biography, and extensive editorial/scholarly work, evidencing some real range within literary and scholarly work.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Rebuilt her literary career and financial independence after Percy Shelley's death, shifting from co-writing/editorial support to sole-authored professional writing to support herself and her surviving child.
      adaptability: [58, 0.42, "i", "N"],
      // Sustained an independent professional writing career as a widow supporting herself and her son financially through her own literary work, documented via the well-established biographical account of her later-life financial independence.
      autonomy_need: [60, 0.44, "s", "A"],
      // Writing Frankenstein as a teenager during the famous 1816 Geneva ghost-story competition, then substantially expanding it into a full novel, evidences real sustained concentrated creative effort.
      deep_focus: [58, 0.42, "i", "N"],
      // Continued developing her craft across multiple subsequent novels and extensive editorial work following her early success with Frankenstein.
      mastery_orientation: [55, 0.4, "i", "N"],
      // Sustained literary and social connections within the Romantic-era literary circle (Byron, Percy Shelley, and their circle), though direct evidence of her own personal public manner beyond this circle is comparatively thin.
      social_assertiveness: [52, 0.4, "i", "N"],
      // Her sustained editorial work preserving and publishing Percy Shelley's poetry after his death suggests real orientation toward literary/cultural preservation beyond her own personal output.
      impact_motivation: [55, 0.4, "i", "N"],
      // Frankenstein originated within the collaborative 1816 Geneva ghost-story-writing challenge among the Byron-Shelley circle, suggesting real capacity for creative work within a shared social/intellectual environment.
      collaboration: [55, 0.4, "i", "N"],
      // Sustained an unconventional personal life (elopement, later widowhood as an independent professional writer) against significant social disapproval of her era, suggesting some real tolerance for social friction.
      conflict_tolerance: [50, 0.4, "i", "N"],
      // Rebuilt her financial independence as a widow supporting herself and her surviving son entirely through her own professional writing and editorial work, documented via the well-established biographical account of her post-widowhood career.
      resourcefulness: [58, 0.65, "d", "A"],
      // Worked largely as an individual writer rather than building or leading a formal institution, an honestly modest score reflecting the surviving record's own emphasis on her solo literary work.
      leadership_drive: [45, 0.4, "i", "N"],
      // Frankenstein's structured frame-narrative (nested first-person accounts) evidences real capacity for deliberate narrative architecture beyond a simple linear plot.
      systems_abstraction: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_omar_khayyam",
    slug: "omar-khayyam",
    canonicalName: "Omar Khayyam",
    birthYear: 1048,
    deathYear: 1131,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "west_asia",
    historicalPolityKey: "polity.seljuk_empire",
    occupationIds: ["mathematician", "astronomer", "writer"],
    fieldIds: ["mathematics", "literature"],
    impactDomains: ["scientific", "literary", "historical"],
    tagIds: ["polymath", "systematic_thinker"],
    archetypeIds: ["cross_disciplinary_generalist", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q35900" },
    portrait: {
      url: "/portraits/omar-khayyam-venediktov.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0 Unported / GFDL",
      width: 990,
      height: 1464,
      attribution: "A. Venediktov",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_khayyam_wikipedia", kind: "wikipedia", title: "Omar Khayyam", url: "https://en.wikipedia.org/wiki/Omar_Khayyam" }, { id: "src_khayyam_mactutor", kind: "institution", title: "MacTutor History of Mathematics — Omar Khayyam" }, { id: "src_khayyam_algebra", kind: "archive", title: "Omar Khayyam, Treatise on Demonstration of Problems of Algebra (c. 1070)" }],
    rows: {
      // Produced substantive original work across algebra (cubic equation classification), astronomy (calendar reform), and poetry (the Rubaiyat), documented via his surviving bibliography across genuinely distinct fields.
      cross_domain_range: [84, 0.65, "d", "A"],
      // His Treatise on Demonstration of Problems of Algebra systematically classified cubic equations by type and solved them via geometric construction — documented via the surviving text's own comprehensive classification method.
      systems_abstraction: [82, 0.65, "d", "A"],
      // Provided rigorous geometric proofs for cubic equation solutions using conic sections, documented directly in the surviving algebra treatise.
      analytical_rigor: [78, 0.65, "d", "A"],
      // His geometric approach to solving cubic equations via intersecting conic sections was a genuinely original mathematical method for its era, documented via its lasting recognition in the history of algebra.
      creative_originality: [76, 0.65, "d", "A"],
      // The Jalali calendar he helped devise required precise astronomical measurement and calculation, documented via its historically noted accuracy (more precise than the Gregorian calendar developed five centuries later).
      detail_orientation: [72, 0.65, "d", "A"],
      // His calendar-reform work was commissioned to serve the Seljuk state's practical administrative needs, documented via the well-established historical context of the Jalali calendar project.
      impact_motivation: [62, 0.44, "s", "A"],
      // Sustained productive engagement across mathematics, astronomy, and poetry over his career suggests real breadth of intellectual interest.
      curiosity: [68, 0.48, "s", "A"],
      // The Rubaiyat's skeptical, questioning treatment of religious orthodoxy and fate was a genuinely distinctive intellectual stance for its era, documented via the poems' own content, though translation/attribution debates add some uncertainty.
      independent_thinking: [66, 0.46, "s", "A"],
      // Sustained mathematical and astronomical work across decades, extending from early algebraic treatises to the mature calendar-reform project.
      mastery_orientation: [64, 0.45, "s", "A"],
      // Producing substantial, methodically organized mathematical treatises alongside a demanding astronomical commission suggests sustained systematic working habits.
      discipline: [58, 0.42, "i", "N"],
      // Sustained productive scholarly output across mathematics and astronomy over an extended career suggests real long-term ambition.
      achievement_drive: [55, 0.4, "i", "N"],
      // The Jalali calendar was developed as part of a documented team of astronomers commissioned by the Seljuk sultan Malik-Shah I, evidencing real collaborative scientific work.
      collaboration: [58, 0.42, "i", "N"],
      // Documented to have led the observatory-based calendar-reform project at Isfahan, a specific institutional leadership role within the Seljuk court's astronomical program.
      leadership_drive: [58, 0.42, "i", "N"],
      // The sustained precision required for the Jalali calendar's astronomical observations evidences real concentrated technical work over an extended period.
      deep_focus: [60, 0.42, "i", "N"],
      // The systematic, category-by-category structure of his algebra treatise and the multi-year astronomical observation program behind the calendar reform both evidence real advance planning.
      planning_orientation: [60, 0.44, "s", "A"],
      // The Rubaiyat's skeptical treatment of religious orthodoxy carried real potential social risk in his era, though the poems' own attribution and dating remain scholarly-debated.
      risk_tolerance: [55, 0.4, "i", "N"],
      // Working productively across mathematics, astronomy, and poetry — genuinely distinct modes of intellectual work — suggests real flexibility in working approach.
      adaptability: [56, 0.4, "i", "N"],
      // The Rubaiyat's questioning of religious certainty, if genuinely his, implies willingness to hold a position at odds with the era's dominant religious framework.
      conflict_tolerance: [54, 0.4, "i", "N"],
      // Securing and leading the Seljuk court's calendar-reform commission suggests real recognition of an institutional opportunity to apply his mathematical expertise at scale.
      opportunity_sensing: [60, 0.42, "i", "A"],
      // Sustained the multi-year Jalali calendar observation project to completion despite its real technical and logistical demands.
      persistence: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_paul_erdos",
    slug: "paul-erdos",
    canonicalName: "Paul Erdős",
    birthYear: 1913,
    deathYear: 1996,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["HU"],
    regionCode: "central_europe",
    occupationIds: ["mathematician"],
    fieldIds: ["mathematics"],
    impactDomains: ["scientific"],
    tagIds: ["nonconformist", "prolific", "generalist", "poor_business_sense"],
    archetypeIds: ["scholarly_specialist", "technical_innovator"],
    externalIdentity: { wikidataId: "Q173746" },
    portrait: {
      url: "/portraits/paul-erdos-1992.jpg",
      source: "Wikimedia Commons",
      license: "CC BY 3.0 Unported / GFDL",
      width: 308,
      height: 411,
      attribution: "Kmhkmh, 1992",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_pe_wikipedia", kind: "wikipedia", title: "Paul Erdős", url: "https://en.wikipedia.org/wiki/Paul_Erd%C5%91s" }, { id: "src_pe_wikidata", kind: "wikidata", title: "Paul Erdős (Q173746)", url: "https://www.wikidata.org/wiki/Q173746" }, { id: "src_pe_hoffman", kind: "biography", title: "Paul Hoffman, The Man Who Loved Only Numbers (1998) -- based on extensive interviews with Erdős's collaborators" }, { id: "src_pe_schechter", kind: "biography", title: "Bruce Schechter, My Brain Is Open (1998)" }],
    rows: {
      // Documented lifetime output of approximately 1,525 mathematical papers, unsurpassed as of the most recent count -- a specific, independently verifiable bibliographic record, not a reputation claim.
      achievement_drive: [95, 0.75, "d", "A"],
      // Documented 511 distinct co-authors across his career, the direct basis for the well-known 'Erdős number' phenomenon -- an unusually large, independently countable collaborative footprint.
      collaboration: [96, 0.78, "d", "A"],
      // Documented as calculating, at age 5, the number of seconds a person had lived given their age, and being introduced to infinite series and set theory by his father at 16, proving Bertrand's postulate at 20 -- a specific, dated, escalating early-childhood pattern.
      curiosity: [92, 0.68, "s", "A"],
      // Documented as never holding a permanent academic position, refusing a permanent offer from Notre Dame in 1952, and living out of a suitcase traveling continuously between collaborators for most of his adult life -- an unusual, sustained, well-documented lifestyle choice.
      autonomy_need: [90, 0.68, "d", "A"],
      // Documented pattern of arriving at a collaborator's home expecting lodging, meals, laundry, and transportation to be arranged so he could work immediately -- inferred resourcefulness in sustaining a working, homeless-by-choice lifestyle for decades.
      resourcefulness: [70, 0.5, "s", "A"],
      // Documented sustained amphetamine and Ritalin use to extend working hours, including losing a $500 bet with Ron Graham that he could quit for a month, then resuming immediately afterward, remarking 'you've set mathematics back a month' -- a specific, dated, named-source incident scored dual-edged given the real health risk involved.
      risk_tolerance: [55, 0.5, "d", "D"],
      // Documented as devoting waking hours to mathematics into his 80s, dying at a mathematics conference in Warsaw at age 83 rather than in retirement -- a sustained, lifelong pattern rather than a single incident.
      persistence: [88, 0.62, "s", "A"],
      // Documented as giving away most of the money he earned from lecturing and the $50,000 1983/84 Wolf Prize to help students or as problem-solving prize money -- inferred impact motivation over personal accumulation from this specific, sourced pattern.
      impact_motivation: [78, 0.52, "s", "A"],
      // Inferred from his documented invention of an entire private, idiosyncratic vocabulary for everyday concepts (children as 'epsilons', the US as 'Samland', God as the 'Supreme Fascist') -- a real, sourced, unusual pattern, though it speaks more to eccentricity than mathematical originality specifically, kept at moderate confidence.
      creative_originality: [65, 0.45, "i", "N"],
      // Inferred from his documented practice of arriving unannounced at colleagues' homes and immediately directing the household toward supporting his work -- a real but narrow behavioral data point.
      social_assertiveness: [60, 0.45, "i", "N"],
      // Documented as renouncing an honorary degree from the University of Waterloo shortly before his death specifically over its treatment of a colleague, Adrian Bondy -- a concrete, dated act of taking a costly stand on principle at the very end of his life.
      conflict_tolerance: [75, 0.55, "d", "A"],
      // Inferred from the documented breadth and depth of his output across number theory, combinatorics, graph theory, and set theory, corroborated by membership in scientific academies of at least 8 countries.
      mastery_orientation: [85, 0.58, "s", "A"],
      // Inferred from his documented navigation of a decade-long U.S. re-entry ban during McCarthyism (1954-1963), during which he worked from Israel instead, and resumed his prior working pattern once the visa was reinstated.
      adaptability: [62, 0.48, "i", "A"],
    },
  },
  {
    id: "p_roald_amundsen",
    slug: "roald-amundsen",
    canonicalName: "Roald Amundsen",
    birthYear: 1872,
    deathYear: 1928,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["NO"],
    regionCode: "western_europe",
    occupationIds: ["explorer"],
    fieldIds: ["exploration"],
    impactDomains: ["historical", "scientific"],
    tagIds: ["founder"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q926" },
    portrait: {
      url: "/portraits/roald-amundsen-1913.jpg",
      source: "Library of Congress",
      license: "PD-old-70-expired (published pre-1931)",
      width: 1280,
      height: 1574,
      attribution: "Library of Congress, 1913",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_amundsen_wikipedia", kind: "wikipedia", title: "Roald Amundsen", url: "https://en.wikipedia.org/wiki/Roald_Amundsen" }, { id: "src_amundsen_inuit", kind: "press", title: "\"Lessons from the Northwest Passage: Roald Amundsen's experiences in the Canadian Arctic\" (Canadian Geographic)", url: "https://canadiangeographic.ca/articles/lessons-from-the-northwest-passage-roald-amundsens-experiences-in-the-canadian-arctic/" }, { id: "src_amundsen_secrecy", kind: "press", title: "\"Roald Amundsen - Conqueror of the South Pole\" (Biographics) -- documents the secret South Pole plan change and creditor pressure", url: "https://biographics.org/roald-amundsen-conqueror-of-the-south-pole/" }, { id: "src_amundsen_southpole_wiki", kind: "archive", title: "\"Amundsen's South Pole expedition\" -- detailed account of the dog-sled planning strategy" }],
    rows: {
      // Two independent, decades-spanning documented instances: deliberately built expertise over years before major expeditions (a commercial sealing voyage in 1894, the Belgica polar expedition in 1896, then two full winters directly learning survival skills from Netsilik Inuit communities during the 1903-1906 Northwest Passage voyage); and specifically planned a dog-sled provisioning strategy for the South Pole attempt, including using dogs as a deliberate food-supply-extension measure along the route.
      planning_orientation: [88, 0.72, "d", "A"],
      // Deliberately learned and adopted multiple specific Inuit survival techniques -- animal-skin clothing in place of heavy wool, dog-sled travel, icing sledge runners for better sliding, and efficient igloo construction -- rather than relying on conventional European polar-expedition methods, then directly transferred these techniques to his later, higher-stakes South Pole expedition.
      resourcefulness: [84, 0.68, "d", "A"],
      // Two independent, historically first-ever achievements: became the first person to successfully navigate the Northwest Passage (1903-1906), and reached the South Pole (December 14, 1911) a full month ahead of a competing expedition.
      achievement_drive: [80, 0.6, "d", "A"],
      // Secretly redirected a fully-funded, publicly-announced North Pole expedition toward the South Pole instead after rival explorers' 1909 North Pole claims, keeping the true objective hidden from almost everyone including his own crew and financial backers, with real, documented personal financial ruin at stake if the gambit failed to deliver a result his creditors would accept.
      risk_tolerance: [78, 0.6, "d", "R"],
      // Made a unilateral, secretive strategic pivot away from his original, publicly-committed goal specifically because he judged it no longer worth pursuing, holding this judgment against the simultaneous expectations of his government sponsor, the ship's owner, and his creditors.
      independent_thinking: [74, 0.55, "d", "A"],
    },
  },
  {
    id: "p_sebastiao_salgado",
    slug: "sebastiao-salgado",
    canonicalName: "Sebastiao Salgado",
    aliases: ["Sebastião Ribeiro Salgado Júnior"],
    birthYear: 1944,
    deathYear: 2025,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["BR", "FR"],
    regionCode: "latin_america",
    occupationIds: ["photographer"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "social", "historical"],
    tagIds: ["field_researcher", "overcame_adversity"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q358158" },
    portrait: {
      url: "/portraits/sebastiao-salgado-2016.jpg",
      source: "Agência Brasil",
      license: "CC BY 3.0 Brazil",
      width: 980,
      height: 1361,
      attribution: "Fernando Frazão/Agência Brasil, 2016",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_salgado_wikipedia", kind: "wikipedia", title: "Sebastiao Salgado", url: "https://en.wikipedia.org/wiki/Sebasti%C3%A3o_Salgado" }, { id: "src_salgado_saltoftheearth", kind: "archive", title: "The Salt of the Earth (2014 documentary, dir. Juliano Ribeiro Salgado and Wim Wenders) -- extensive first-person, on-camera interview material" }, { id: "src_salgado_institutoterra", kind: "institution", title: "Instituto Terra -- the reforestation institution he co-founded with his wife Lelia Wanick Salgado on his family's former cattle ranch in Minas Gerais, Brazil" }, { id: "src_salgado_death_press", kind: "press", title: "CNN, Washington Post, and PBS obituary coverage confirming his death on 23 May 2025 in Paris, age 81" }],
    rows: {
      // Trained and worked as an economist (including doctoral-level work for the International Coffee Organization) before entirely abandoning that career in his early 30s to become a photographer, and later, after a severe personal crisis following his 1994 Rwandan genocide-aftermath reporting, shifted his life's focus again toward large-scale ecological restoration (co-founding Instituto Terra) before eventually returning to photography -- two independent, well-documented major life-direction changes, not a single pivot.
      adaptability: [88, 0.62, "d", "A"],
      // Sustained multi-year, deeply embedded field projects (Workers, Migrations, Genesis) requiring months of continuous difficult fieldwork per project across several decades, documented via the well-established scale and duration of these projects and his own account of the working method in The Salt of the Earth.
      discipline: [85, 0.6, "d", "A"],
      // Sustained embedded documentary work in active conflict zones, disease-affected regions, and physically hazardous industrial/mining sites across his career, documented via the specific locations and conditions described in his major projects.
      risk_tolerance: [78, 0.55, "s", "A"],
      // Documented, in his own on-camera account (The Salt of the Earth), to have suffered a severe personal crisis of purpose after photographing the 1994 Rwandan genocide aftermath, to the point of stepping back from photography entirely -- and subsequently redirected that same motivation into founding Instituto Terra with his wife Lelia, a specific, documented redirection of purpose rather than a static, unchanging motivation.
      impact_motivation: [82, 0.58, "d", "A"],
      // Sustained a decades-long creative and institutional partnership with his wife Lelia Wanick Salgado, documented as co-founder of Instituto Terra and as the designer/curator of his major photographic books and exhibitions -- a specific, named, sustained collaborative relationship, not a general inference from marriage alone.
      collaboration: [78, 0.55, "d", "A"],
      // Sustained a multi-decade reforestation project (Instituto Terra, founded in the late 1990s) restoring his family's severely degraded former cattle ranch to viable Atlantic Forest, planting millions of trees over more than two decades, documented via the project's own long-term institutional record.
      persistence: [80, 0.55, "s", "A"],
      // Left an established economics career to become a self-directed independent photographer, and later stepped away from commercial photographic assignment work to pursue his own long-form, self-funded projects, documented via the well-established career trajectory of his work.
      autonomy_need: [68, 0.46, "s", "N"],
      // Sustained embedded, long-form documentary attention across radically different subject domains (industrial labor, human migration, unspoiled wilderness) across his career, documented via the range of his major project subjects.
      curiosity: [70, 0.46, "s", "A"],
      // Self-initiated and self-funded his major long-form documentary projects over years each, rather than working only on assigned commercial commissions, documented via the well-established independent-project structure of his career.
      proactive_agency: [72, 0.48, "s", "A"],
      // His large-format black-and-white documentary photography is widely noted for its exacting technical and compositional precision, inferred from the well-established critical regard for this aspect of his work.
      detail_orientation: [65, 0.42, "i", "N"],
      // Sustained an ambitious, expanding scope of long-form projects (from single-country labor documentation to the global-scale Migrations and Genesis projects) across four decades.
      achievement_drive: [68, 0.44, "s", "N"],
      // Sustained embedded fieldwork in resource-poor and logistically difficult locations across his career, inferred as requiring real capacity to operate under material constraint.
      resourcefulness: [62, 0.42, "i", "N"],
      // Sustained singular embedded attention to individual multi-year projects (Genesis alone took eight years) rather than working across many shorter assignments simultaneously, documented via the well-established project timelines of his major work.
      deep_focus: [70, 0.46, "s", "A"],
      // Sustained direct, extended personal engagement with subjects in difficult and sometimes dangerous field conditions over months at a time, inferred as requiring real capacity for direct interpersonal engagement across cultural and language barriers.
      social_assertiveness: [55, 0.4, "i", "N"],
      // Maintained a deliberately unfashionable commitment to black-and-white large-format documentary photography across a career in which color and digital methods became increasingly dominant, inferred from the well-established, distinctive stylistic consistency of his work.
      independent_thinking: [60, 0.4, "i", "N"],
      // Multi-year projects spanning dozens of countries (Migrations, Genesis) required sustained advance logistical planning, inferred from the documented scale and geographic scope of these projects.
      planning_orientation: [58, 0.4, "i", "N"],
      // Continued developing his documentary method and technical approach across five decades of work rather than repeating an early formula, inferred from the documented evolution of his major project styles.
      mastery_orientation: [60, 0.4, "i", "N"],
      // Sustained substantive prior work as a trained economist before his photography career, and later as a co-founder/director of an ecological-restoration institution, inferred from the documented range of his professional life beyond photography alone.
      cross_domain_range: [55, 0.38, "i", "N"],
    },
  },
];

export const ROSTER_30: readonly Person[] = seeds.map(build);
