/**
 * ROSTER 33 -- new-candidate roster-expansion cycle (14 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster33.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate -- NOT `toPersonSeed()`
 * directly -- and never checks `computedEligibility.eligible`. All are
 * `evidence_approved` and non-match-eligible by design; none were rescued
 * toward eligibility. Every score's rationale is preserved as the inline
 * comment above its Row. Full record: `docs/checkpoints/roster33.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_alexander_fleming",
    slug: "alexander-fleming",
    canonicalName: "Alexander Fleming",
    birthYear: 1881,
    deathYear: 1955,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["biologist", "medical_researcher"],
    fieldIds: ["medicine", "biology"],
    impactDomains: ["scientific", "medical"],
    tagIds: ["nobel_laureate"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q37064" },
    portrait: {
      url: "/portraits/alexander-fleming-1945.jpg",
      source: "Nobel Foundation, via Wikimedia Commons",
      license: "Public Domain",
      width: 280,
      height: 396,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Alexander_Fleming_1945.jpg",
      attribution: "Nobel Foundation, 1945",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_fleming_wikipedia", kind: "wikipedia", title: "Alexander Fleming", url: "https://en.wikipedia.org/wiki/Alexander_Fleming" }, { id: "src_fleming_acs", kind: "institution", title: "American Chemical Society, \"Alexander Fleming: Discovery and Development of Penicillin\" (National Historic Chemical Landmark account)", url: "https://www.acs.org/education/whatischemistry/landmarks/flemingpenicillin.html" }, { id: "src_fleming_pmc", kind: "archive", title: "\"The Discovery of Penicillin -- New Insights After More Than 75 Years of Clinical Use\" -- PMC (NIH), including his assistant V.D. Allison's independent account" }],
    rows: {
      // Upon returning from vacation in September 1928 and noticing a zone of dead bacteria around an accidental fungal contaminant on a culture plate he could easily have discarded, chose instead to investigate the anomaly -- his own later account and his assistant V.D. Allison's independent corroboration both describe this specific, dated moment of pursuing an unplanned observation.
      curiosity: [78, 0.58, "d", "A"],
      // Pursued the observation of bacterial lysis around the Penicillium mold as a substance worth isolating and studying, rather than treating the contaminated plate as a failed experiment to discard, a documented departure from the routine handling of a contaminated culture.
      independent_thinking: [62, 0.48, "s", "A"],
      // Per his assistant V.D. Allison's independent account, specifically observed that bacteria nearest the mold patch were "translucent, colorless and dead" -- a precise, specific observation of the zone of inhibition, not a general noticing of contamination.
      detail_orientation: [55, 0.42, "s", "A"],
    },
  },
  {
    id: "p_alfred_hitchcock",
    slug: "alfred-hitchcock",
    canonicalName: "Alfred Hitchcock",
    birthYear: 1899,
    deathYear: 1980,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB", "US"],
    regionCode: "western_europe",
    occupationIds: ["film_director", "producer"],
    fieldIds: ["film"],
    impactDomains: ["cultural", "artistic"],
    tagIds: ["perfectionist"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q7374" },
    portrait: {
      url: "/portraits/alfred-hitchcock-1956.jpg",
      source: "Library of Congress, New York World-Telegram and the Sun Newspaper Photograph Collection, via Wikimedia Commons",
      license: "Public Domain (NYWTS collection, no known copyright restrictions)",
      width: 1920,
      height: 2481,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Alfred_Hitchcock_NYWTS.jpg",
      attribution: "Fred Palumbo, 1956",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hitchcock_wikipedia", kind: "wikipedia", title: "Alfred Hitchcock", url: "https://en.wikipedia.org/wiki/Alfred_Hitchcock" }, { id: "src_hitchcock_truffaut", kind: "archive", title: "Francois Truffaut, Hitchcock/Truffaut (1966/1983) -- a week-long, fifty-hour recorded interview, his own extensive direct testimony" }, { id: "src_hitchcock_bfi_shower_scene", kind: "institution", title: "Oliver Lunn, \"10 things you (probably) never knew about the shower scene in Psycho,\" BFI (British Film Institute), bfi.org.uk -- independent institutional account, opened and read in full, carrying concrete production facts and named-collaborator testimony (editor John Venzon on the frame-level trick behind a jump-cut; documentarian Alexandre O. Philippe on Hitchcock making Janet Leigh repeat the spinning-eye shot 26 times; body double Marli Renfro on the practical blood effect): 78 camera setups and 52 cuts for 45 seconds of screen time, shot over a full week -- a third of the film's total schedule. Non-self, behavioral, independent of Hitchcock's own testimony.", url: "https://www.bfi.org.uk/interviews/psycho-shower-scene-alfred-hitchcock" }],
    rows: {
      // In his own words to Truffaut, described a working method of shot-by-shot storyboarding every film before production began, a specific, self-described, sustained method across his 54-film career, not an inferred trait from the films' finished quality.
      planning_orientation: [90, 0.62, "d", "A"],
      // In his own words: "I like everything around me to be clear as crystal and completely calm," directly connecting a personal need for order to his meticulous, storyboard-driven filmmaking approach -- a self-described, not inferred, connection.
      detail_orientation: [85, 0.58, "d", "D"],
      // In his own words, described submitted story properties as routinely failing to "measure up to Hitchcock standards" -- a specific, self-articulated, applied editorial standard, not a general reputation for quality.
      perfectionism: [80, 0.55, "d", "D"],
      // Discussed his own methods with Truffaut in technical, procedural terms rather than adopting prevailing studio-system explanations of directing, reflecting a self-directed, idiosyncratic working philosophy documented across the full interview.
      independent_thinking: [68, 0.5, "s", "A"],
      // His documented insistence on personally storyboarding every shot before a script reached the studio reflects a sustained preference for retaining creative control over the industry-standard collaborative development process.
      autonomy_need: [62, 0.48, "s", "A"],
    },
  },
  {
    id: "p_bill_gates",
    slug: "bill-gates",
    canonicalName: "Bill Gates",
    birthYear: 1955,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur", "business_executive", "philanthropist"],
    fieldIds: ["technology", "business"],
    impactDomains: ["technological", "entrepreneurial", "social"],
    tagIds: ["founder"],
    archetypeIds: ["entrepreneurial_builder", "technical_innovator"],
    externalIdentity: { wikidataId: "Q5284" },
    portrait: {
      url: "/portraits/bill-gates-2018.jpg",
      source: "U.S. Department of Health and Human Services, via Wikimedia Commons",
      license: "Public Domain (US federal government work)",
      width: 701,
      height: 879,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bill_Gates_2018.jpg",
      attribution: "U.S. Department of Health and Human Services, 2018",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_gates_wikipedia", kind: "wikipedia", title: "Bill Gates", url: "https://en.wikipedia.org/wiki/Bill_Gates" }, { id: "src_gates_insidebillsbrain", kind: "press", title: "\"Inside Bill's Brain: Decoding Bill Gates\" (Netflix documentary, 2019) -- extensive on-camera interviews with Gates and named former colleagues" }, { id: "src_gates_cnbc_compilation", kind: "press", title: "CNBC's reporting on early Microsoft work habits, drawing on Gates's own recollections and named former-employee accounts" }],
    rows: {
      // Documented working 36-hour stretches during early Microsoft, collapsing for roughly ten hours, then resuming -- a specific, sustained, self- and colleague-reported work pattern rather than a general "hard worker" characterization.
      deep_focus: [88, 0.58, "d", "D"],
      // By his own account, did not take weekends or vacations during Microsoft's early years, and tracked which employees left early or stayed late by observing the company parking lot -- a specific, sustained, self-described work standard he later said he regretted applying to others.
      discipline: [82, 0.55, "d", "D"],
      // Personally read and rewrote colleagues' code at early Microsoft until he had to consciously stop himself from over-revising others' work -- a specific, self-described pattern of hands-on technical review.
      detail_orientation: [80, 0.55, "d", "D"],
      // Sent direct, sharply critical messages to employees -- documented as opening at least one with "This is the stupidest piece of code ever written" -- a specific, sourced pattern of blunt, confrontational technical criticism, per multiple named former-employee accounts.
      conflict_tolerance: [78, 0.55, "d", "D"],
      // Personally tracked individual employees' working hours via their license plates in the company parking lot to gauge commitment, a specific, documented monitoring practice reflecting a demanding, closely-involved leadership style.
      leadership_drive: [75, 0.52, "s", "D"],
      // Co-founded Microsoft rather than pursuing a conventional academic or corporate path, dropping out of Harvard to do so, a specific, documented, self-directed choice against the more conventional expectation for someone of his academic standing.
      autonomy_need: [65, 0.48, "s", "N"],
    },
  },
  {
    id: "p_bob_dylan",
    slug: "bob-dylan",
    canonicalName: "Bob Dylan",
    birthYear: 1941,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["musician", "songwriter", "writer"],
    fieldIds: ["music", "literature"],
    impactDomains: ["cultural", "artistic"],
    tagIds: ["nobel_laureate"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q392" },
    portrait: {
      url: "/portraits/bob-dylan-1963.jpg",
      source: "Wikimedia Commons",
      license: "Public Domain",
      width: 1000,
      height: 1276,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bob_Dylan_1963.jpg",
      attribution: "Associated Press wirephoto, March 1963",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_dylan_wikipedia", kind: "wikipedia", title: "Bob Dylan", url: "https://en.wikipedia.org/wiki/Bob_Dylan" }, { id: "src_dylan_chronicles", kind: "biography", title: "Bob Dylan, Chronicles: Volume One (2004) -- his own memoir" }, { id: "src_dylan_newport_press", kind: "press", title: "Independent journalism on the July 25, 1965 Newport Folk Festival electric set and its aftermath" }],
    rows: {
      // At the July 25, 1965 Newport Folk Festival, performed an electric rock set against the folk-purist expectations of his own core audience, provoking substantial audience booing -- a specific, dated, career-risking artistic decision, independently documented by multiple outlets and confirmed in his own later account of the audience reaction.
      risk_tolerance: [82, 0.58, "d", "R"],
      // Rather than retreating after the Newport booing, returned to the stage with an acoustic guitar and performed "Mr. Tambourine Man" and "It's All Over Now, Baby Blue" -- choosing songs about change and departure -- a specific, immediate, defiant response rather than a conciliatory one, per his own later press-conference account: "I did this very crazy thing. I didn't know what was going to happen."
      decisiveness: [78, 0.55, "d", "D"],
      // In his own words in Chronicles, described his approach as breaking away from convention by taking "simple folk changes" and combining them with new imagery and "a new set of ordinances that evolved into something different that had not been heard before" -- a self-articulated, deliberate departure from the prevailing folk songwriting convention of his own scene.
      independent_thinking: [75, 0.55, "d", "A"],
      // Continued performing the Newport set and the subsequent electric tour despite sustained, vocal audience backlash across multiple shows, a documented pattern of sustained engagement with real, direct audience conflict rather than reverting to the earlier acoustic format.
      conflict_tolerance: [68, 0.5, "d", "D"],
      // Moved to Minneapolis in 1959 specifically to pursue folk music, by his own account trading his electric guitar for an acoustic one at that time because it no longer suited his aims -- and later reversed that instrument choice again at Newport when his artistic aims changed once more, a documented pattern of following his own evolving standard over an external one.
      autonomy_need: [70, 0.5, "s", "A"],
    },
  },
  {
    id: "p_carl_sagan",
    slug: "carl-sagan",
    canonicalName: "Carl Sagan",
    birthYear: 1934,
    deathYear: 1996,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["astronomer", "science_communicator"],
    fieldIds: ["natural_science", "physics"],
    impactDomains: ["scientific", "cultural"],
    tagIds: [],
    archetypeIds: ["scientific_explorer", "social_influencer"],
    externalIdentity: { wikidataId: "Q410" },
    portrait: {
      url: "/portraits/carl-sagan-1980.jpg",
      source: "NASA/JPL, via Wikimedia Commons",
      license: "Public Domain",
      width: 328,
      height: 448,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Carl_Sagan_Planetary_Society.JPG",
      attribution: "NASA/JPL, 1980",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sagan_wikipedia", kind: "wikipedia", title: "Carl Sagan", url: "https://en.wikipedia.org/wiki/Carl_Sagan" }, { id: "src_sagan_ttaps", kind: "archive", title: "Turco, Toon, Ackerman, Pollack, Sagan, \"Nuclear Winter: Global Consequences of Multiple Nuclear Explosions\", Science, 1983 (TTAPS paper)" }, { id: "src_sagan_nyt_arrest", kind: "press", title: "Independent contemporary press coverage of the Fall 1986 Nevada Test Site civil-disobedience arrest (Sagan among 138 protesters)" }],
    rows: {
      // Co-authored the 1983 TTAPS paper modeling the climatic consequences of nuclear war ("nuclear winter") and then deliberately carried the finding beyond the scientific literature into a widely-read Parade magazine article aimed at the general public -- a specific, documented choice to prioritize public risk communication over remaining within the academic venue alone.
      impact_motivation: [75, 0.55, "d", "A"],
      // In Fall 1986, was arrested alongside 138 other demonstrators for trespassing at the Nevada Test Site during a civil-disobedience protest against continued nuclear testing -- a specific, dated, independently reported act accepting direct legal consequence for a position, scored dual-edged given the real professional and reputational risk to a working scientist of a public arrest.
      conflict_tolerance: [68, 0.5, "d", "D"],
      // The TTAPS nuclear-winter finding's translation into sustained public and policy attention through Sagan's own popular-press writing on the subject is a documented instance of translating a technical scientific result into a widely-accessible public argument, though the two sources consulted describe the outcome and the article's existence more than the persuasive craft itself.
      persuasiveness: [62, 0.45, "s", "A"],
    },
  },
  {
    id: "p_dmitri_mendeleev",
    slug: "dmitri-mendeleev",
    canonicalName: "Dmitri Mendeleev",
    birthYear: 1834,
    deathYear: 1907,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["RU"],
    regionCode: "central_europe",
    occupationIds: ["chemist"],
    fieldIds: ["chemistry"],
    impactDomains: ["scientific"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q9106" },
    portrait: {
      url: "/portraits/dmitri-mendeleev-1891.jpg",
      source: "American Institute of Physics Emilio Segre Visual Archives, via Wikimedia Commons",
      license: "Public Domain",
      width: 1920,
      height: 2499,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Mendeleev-9.jpg",
      attribution: "Photograph, 1891",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_mendeleev_wikipedia", kind: "wikipedia", title: "Dmitri Mendeleev", url: "https://en.wikipedia.org/wiki/Dmitri_Mendeleev" }, { id: "src_mendeleev_rsc", kind: "institution", title: "Royal Society of Chemistry, historical account of Mendeleev's periodic table development, including his own quoted account of the 1869 \"dream\"", url: "https://www.rsc.org/periodic-table/history/about" }, { id: "src_mendeleev_acs", kind: "institution", title: "American Chemical Society / Science History Institute biographical account of Mendeleev's element-card method and the 1869 breakthrough" }],
    rows: {
      // By his own later account, worked for three days and nights with little sleep, arranging and rearranging cards each labeled with an element and its properties, searching for an organizing pattern -- a specific, self-described sustained period of intense, singular focus on one unsolved problem.
      deep_focus: [82, 0.55, "d", "A"],
      // Continued the element-card sorting exercise across repeated, documented failed arrangements over the three-day period before the final pattern emerged, per his own and institutional historical accounts, rather than abandoning the problem after early unsuccessful groupings.
      persistence: [75, 0.5, "d", "A"],
      // Published his 1869 periodic table with deliberate gaps for elements not yet discovered and specific predicted properties for them, a documented, falsifiable public commitment that could have been decisively wrong -- later vindicated when gallium, scandium, and germanium were discovered matching his predictions.
      risk_tolerance: [68, 0.48, "d", "A"],
      // Arranged elements by atomic weight and chemical property in a way that broke from several competing contemporary classification schemes, and by his own account arrived at the final ordering through a specific personal method (the card-sorting exercise) rather than a method borrowed from another chemist.
      independent_thinking: [65, 0.45, "s", "A"],
    },
  },
  {
    id: "p_ferdinand_magellan",
    slug: "ferdinand-magellan",
    canonicalName: "Ferdinand Magellan",
    birthYear: 1480,
    deathYear: 1521,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["PT"],
    regionCode: "western_europe",
    occupationIds: ["navigator", "explorer"],
    fieldIds: ["exploration"],
    impactDomains: ["historical", "scientific"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q1496" },
    portrait: {
      url: "/portraits/ferdinand-magellan-posthumous.jpg",
      source: "The Mariner's Museum Collection, via Wikimedia Commons",
      license: "Public Domain",
      width: 562,
      height: 693,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ferdinand_Magellan.jpg",
      attribution: "Unknown artist, posthumous portrait, c. 1550-1625",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_magellan_wikipedia", kind: "wikipedia", title: "Ferdinand Magellan", url: "https://en.wikipedia.org/wiki/Ferdinand_Magellan" }, { id: "src_magellan_pigafetta", kind: "archive", title: "Antonio Pigafetta, Relazione del primo viaggio intorno al mondo (Report on the First Voyage Around the World, c. 1524-25) -- eyewitness chronicle by a participant on the voyage" }, { id: "src_magellan_history", kind: "press", title: "Independent historical accounts of the 1520 Easter Mutiny at Puerto San Julian" }],
    rows: {
      // In April 1520, when three of his five ships' captains (Juan de Cartagena, Gaspar de Quesada, and pilot Juan Sebastian Elcano) attempted to seize control of the fleet, moved immediately and decisively against them: one mutineer was killed in the retaking of a ship, Quesada was executed, and Cartagena was marooned -- a specific, dated, high-stakes act of command under direct challenge, per Pigafetta's eyewitness chronicle and independent historical accounts.
      decisiveness: [85, 0.6, "d", "D"],
      // Led a fleet of five ships and roughly 270 men westward across unmapped ocean in search of a passage to Asia, a voyage from which only one ship and 18 men would return -- a specific, sustained undertaking of extreme, realized physical risk, documented in Pigafetta's own eyewitness account.
      risk_tolerance: [90, 0.6, "d", "R"],
      // Directly confronted and suppressed a mutiny by three of his own captains at Puerto San Julian in April 1520 rather than negotiating a settlement, a specific, sustained instance of real, high-stakes interpersonal and command conflict.
      conflict_tolerance: [80, 0.55, "d", "D"],
      // Continued the expedition west after the mutiny, a mid-voyage supply crisis, and the loss of a ship (the Santiago, wrecked in a scouting mission), rather than turning back -- a specific, documented pattern of continuing under sustained, compounding setbacks, per Pigafetta's chronicle.
      persistence: [75, 0.52, "d", "A"],
      // Maintained command authority over a multinational, multi-ship fleet through a mutiny, a fatal skirmish, and severe supply shortages across more than a year at sea, documented via Pigafetta's sustained firsthand account of the voyage's command structure.
      leadership_drive: [70, 0.5, "s", "D"],
    },
  },
  {
    id: "p_freddie_mercury",
    slug: "freddie-mercury",
    canonicalName: "Freddie Mercury",
    birthYear: 1946,
    deathYear: 1991,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["musician", "singer", "songwriter"],
    fieldIds: ["music"],
    impactDomains: ["cultural", "artistic"],
    tagIds: [],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q15869" },
    portrait: {
      url: "/portraits/freddie-mercury-1977.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0",
      width: 1920,
      height: 2849,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Freddie_Mercury_performing_in_New_Haven,_CT,_November_1977.jpg",
      attribution: "Carl Lender, November 16, 1977",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_mercury_wikipedia", kind: "wikipedia", title: "Freddie Mercury", url: "https://en.wikipedia.org/wiki/Freddie_Mercury" }, { id: "src_mercury_liveaid_press", kind: "press", title: "Independent journalism and named-bandmate (Brian May) accounts of Queen's 1985 Live Aid performance" }, { id: "src_mercury_ownwords", kind: "press", title: "Freddie Mercury's own contemporaneous quoted statements on Queen's touring/recording routine" }],
    rows: {
      // Performed Queen's 20-minute Live Aid set on July 13, 1985 against his own doctor's explicit advice not to perform, following pre-show vocal complications -- a specific, dated instance of prioritizing a commitment over direct medical caution, corroborated by named bandmate accounts.
      risk_tolerance: [75, 0.55, "d", "R"],
      // In his own words, described wanting to break out of what he called a "rut" of the repetitive album-tour-album cycle -- a specific, self-articulated dissatisfaction that led to a deliberate change in how the band approached its work rather than continuing the established pattern by default.
      decisiveness: [65, 0.5, "d", "A"],
      // Commanded the Live Aid Wembley crowd of roughly 72,000 (and a global television audience) through an extended, unaccompanied vocal call-and-response exchange, a specific, dated, widely-documented instance of live crowd command, independently corroborated by named bandmate accounts and contemporary press.
      social_assertiveness: [85, 0.55, "d", "A"],
      // His own stated dissatisfaction with the band's repetitive touring/recording cycle documents a specific, self-aware recognition of a pattern he wanted to change, reflected in the band's subsequent shift in approach.
      adaptability: [55, 0.45, "s", "A"],
    },
  },
  {
    id: "p_jacques_cousteau",
    slug: "jacques-cousteau",
    canonicalName: "Jacques Cousteau",
    birthYear: 1910,
    deathYear: 1997,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["FR"],
    regionCode: "western_europe",
    occupationIds: ["explorer", "oceanographer", "filmmaker", "inventor"],
    fieldIds: ["exploration", "film"],
    impactDomains: ["scientific", "cultural"],
    tagIds: [],
    archetypeIds: ["scientific_explorer", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q83233" },
    portrait: {
      url: "/portraits/jacques-cousteau-1972.jpg",
      source: "Nationaal Archief / Anefo, via Wikimedia Commons",
      license: "CC0",
      width: 755,
      height: 1060,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Cousteau1972_(cropped).jpg",
      attribution: "Hans Peters for Anefo, March 30, 1972",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_cousteau_wikipedia", kind: "wikipedia", title: "Jacques Cousteau", url: "https://en.wikipedia.org/wiki/Jacques_Cousteau" }, { id: "src_cousteau_society", kind: "institution", title: "The Cousteau Society's own account of the Aqua-Lung invention and the Antarctic expeditions", url: "https://www.cousteau.org/know/inventions/aqua-lung/" }, { id: "src_cousteau_dailybeast", kind: "press", title: "\"Explorer, Eco-Warrior, Spy: The Battles of Jacques Cousteau\" -- independent journalism" }],
    rows: {
      // During WWII fuel shortages, adapted engineer Emile Gagnan's cooking-gas demand regulator for underwater breathing, co-inventing the Aqua-Lung in the winter of 1942-43 -- a specific, dated instance of repurposing an unrelated existing technology under real wartime material constraint.
      resourcefulness: [78, 0.58, "d", "A"],
      // In his own words, described testing the new Aqua-Lung with loops, somersaults, and barrel rolls, standing upside down on one finger -- a specific, self-described exploratory, experimental first use of his own invention.
      curiosity: [70, 0.52, "d", "A"],
      // Led the Calypso through a 1972-73 Antarctic expedition during which the ship was struck twice by ice floes in a sudden blizzard (winds rising from 0 to 65 mph in five minutes), holing the hull and breaking a propeller shaft, and during which crew member Michel Laval died in a fall -- a specific, dated expedition undertaken with real, realized physical danger.
      risk_tolerance: [72, 0.55, "d", "R"],
      // Shifted over his career from a naval officer and inventor to a documentary filmmaker and, later, an outspoken environmental advocate after observing pollution and contamination even in Antarctica's ostensibly pristine waters -- a documented change in professional focus driven by his own direct field observations.
      adaptability: [62, 0.48, "s", "A"],
      // His own environmental observations from the Antarctic expedition -- finding evidence of insecticides and heavy metals in wildlife in the least-polluted region on Earth -- documented as a direct catalyst for his subsequent conservation advocacy work.
      impact_motivation: [65, 0.48, "s", "A"],
    },
  },
  {
    id: "p_jonas_salk",
    slug: "jonas-salk",
    canonicalName: "Jonas Salk",
    birthYear: 1914,
    deathYear: 1995,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["medical_researcher", "virologist"],
    fieldIds: ["medicine"],
    impactDomains: ["scientific", "medical"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q200101" },
    portrait: {
      url: "/portraits/jonas-salk-cdc-1988.jpg",
      source: "Centers for Disease Control and Prevention (CDC) Public Health Image Library, via Wikimedia Commons",
      license: "Public Domain (US federal government work)",
      width: 1280,
      height: 1523,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Jonas_Salk_1988.jpg",
      attribution: "CDC, 1988",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_js_wikipedia", kind: "wikipedia", title: "Jonas Salk", url: "https://en.wikipedia.org/wiki/Jonas_Salk" }, { id: "src_js_pmc", kind: "archive", title: "\"Jonas Salk (1914-1995): A vaccine against polio\" -- PMC (NIH)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6351694/" }, { id: "src_js_jacobs_biography_review", kind: "press", title: "Reviews and coverage of Charlotte DeCroes Jacobs, \"Jonas Salk: A Life\" (Oxford University Press, 2015), quoting Salk's own late-life remarks on the Sabin rivalry and his research assistant's assessment of it", url: "https://www.dallasnews.com/arts-entertainment/books/2015/06/06/biography-review-jonas-salk-a-life-by-charlotte-decroes-jacobs/" }, { id: "src_js_sabin_feud_history", kind: "press", title: "Independent historical accounts of the specific documented Salk-Sabin conflicts (the formalin-inactivation challenge, the 1953 public information leak, and Sabin's Congressional testimony) -- Pulitzer Center, Hektoen International, and university library archive coverage" }],
    rows: {
      // Documented administering his own experimental vaccine to himself, his wife, and their three children before wider human trials -- a specific, dated act of personal risk-taking to demonstrate confidence in an unproven medical intervention, scored dual-edged given the real safety uncertainty at the time.
      risk_tolerance: [68, 0.52, "d", "D"],
      // [NEW_EVIDENCE, Roster33] Sustained a specific, multi-front documented rivalry with Albert Sabin over vaccine approach: withstood a public challenge to his formalin-inactivation technique at an American Public Health Association meeting, a 1953 leak of his unpublished results, and Sabin's own Congressional testimony recommending his vaccine's use be suspended -- a sustained pattern of real professional conflict, not a single incident. Separately documented as never having been elected to the National Academy of Sciences despite curing polio, a snub multiple named colleagues attributed to jealousy or to his violation of the era's scientific-conduct norms via extensive press coverage of his results.
      conflict_tolerance: [65, 0.5, "d", "D"],
      // Documented declining to patent the polio vaccine, later explaining he saw no more reason to patent it than to patent the sun -- an independently verifiable, dated decision that forwent substantial personal wealth in favor of unrestricted public distribution.
      impact_motivation: [78, 0.55, "d", "A"],
      // Documented as leading the 1954 field trial enrolling over one million pediatric subjects -- at the time the largest medical experiment in history -- with results announced April 12, 1955, an independently verifiable, specific, dated achievement.
      achievement_drive: [75, 0.52, "d", "A"],
      // Documented, per his own research assistant's later account, as never having been heard to make a derogatory comment about his rival Albert Sabin even when Sabin sent him a copy of a critical letter -- a specific, sourced pattern of declining direct confrontation, scored moderately rather than assuming assertiveness from his public prominence.
      social_assertiveness: [42, 0.38, "d", "N"],
      // Inferred from his documented success in securing philanthropic and public support to found the Salk Institute for Biological Studies in 1965, though the two sources consulted describe the outcome more than the persuasive process.
      persuasiveness: [55, 0.4, "i", "N"],
      // Inferred from his documented pivot in later life from vaccine research to founding and directing an interdisciplinary research institute, though neither source gives a specific dated incident of the transition itself.
      adaptability: [52, 0.38, "i", "N"],
      // [NEW_EVIDENCE, Roster33] Pursued a killed-virus vaccine approach specifically while Sabin and much of the field favored a live-attenuated approach, sustaining that methodological disagreement through direct public and institutional challenges rather than converging on the field's preferred method.
      independent_thinking: [68, 0.5, "d", "A"],
    },
  },
  {
    id: "p_josephine_baker",
    slug: "josephine-baker",
    canonicalName: "Josephine Baker",
    birthYear: 1906,
    deathYear: 1975,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US", "FR"],
    regionCode: "north_america",
    occupationIds: ["entertainer", "activist"],
    fieldIds: ["dance", "music"],
    impactDomains: ["cultural", "historical", "social"],
    tagIds: ["reconciliation"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q151972" },
    portrait: {
      url: "/portraits/josephine-baker-1950.jpg",
      source: "Wikimedia Commons",
      license: "Public Domain (published 1931-1977 without a copyright notice; also public domain in Cuba as a photograph used more than 25 years ago)",
      width: 325,
      height: 450,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Josephine_Baker_1950.jpg",
      attribution: "Rudolf Suroch, Havana, 1950",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_baker_wikipedia", kind: "wikipedia", title: "Josephine Baker", url: "https://en.wikipedia.org/wiki/Josephine_Baker" }, { id: "src_baker_ww2museum", kind: "institution", title: "\"Siren of the Resistance: The Artistry and Espionage of Josephine Baker\" (The National WWII Museum)", url: "https://www.nationalww2museum.org/war/articles/siren-resistance-artistry-and-espionage-josephine-baker" }, { id: "src_baker_cardiff", kind: "institution", title: "Cardiff University historian's research on Baker's WWII espionage contribution", url: "https://www.cardiff.ac.uk/news/view/2908692-from-famed-performer-to-undercover-spy-historian-reveals-full-extent-of-josephine-bakers-contribution-to-fighting-nazism-and-defending-france-during-the-second-world-war" }, { id: "src_baker_womenshistory", kind: "institution", title: "National Women's History Museum biography of Josephine Baker", url: "https://www.womenshistory.org/education-resources/biographies/josephine-baker" }, { id: "src_baker_france24", kind: "press", title: "\"Dancer, singer, activist, spy: the extraordinary life of Josephine Baker\" (FRANCE 24) -- documents the 1964-1969 financial collapse and 1973 comeback", url: "https://webdoc.france24.com/josephine-baker-paris-pantheon/" }],
    rows: {
      // Two independent, extreme, well-documented high-stakes instances: became an active wartime intelligence agent for the French Resistance after the fall of Paris, physically smuggling intelligence in invisible ink on her own sheet music and hidden on her body, deliberately relying on her fame to avoid thorough searches -- a role carrying real mortal danger under Nazi occupation; and, separately, sailed to Paris at 19 with no guarantee of success to pursue a stage career.
      risk_tolerance: [90, 0.75, "d", "R"],
      // Two independent, extreme, well-documented instances of rebuilding from total loss: ran away from an extremely poor and dangerous childhood at 13 and built a sustained, escalating performance career from nothing; and, after total financial and material collapse -- her estate auctioned off and she had to be forced from the building after barricading herself inside in 1969 -- staged a full professional comeback at age 67, culminating in four sold-out performances at Carnegie Hall.
      persistence: [86, 0.68, "d", "A"],
      // Adopted twelve children of different ethnic, national, and religious backgrounds specifically and deliberately to publicly demonstrate that racial and cultural harmony was possible, calling them her "Rainbow Tribe" and touring publicly with them -- a sustained, real, long-term family-building and advocacy commitment, not a symbolic gesture.
      impact_motivation: [82, 0.65, "d", "A"],
      // Quit school and left home at 12-13, living on the streets and scavenging for food rather than remaining in her circumstances, a single but extreme, early documented act of self-directed departure from her family situation.
      autonomy_need: [78, 0.6, "d", "A"],
      // Sustained a public refusal to perform for segregated audiences throughout her career at real professional and economic cost, and was the only woman to speak at the 1963 March on Washington, taking the microphone directly after Martin Luther King's "I Have a Dream" speech.
      conflict_tolerance: [76, 0.58, "d", "A"],
      // Her wartime espionage role was accepted well beyond any obligation her celebrity status carried, and her sustained civil-rights activism (refusing segregated venues, the March on Washington appearance) was similarly self-directed beyond her professional entertainment career, not required by any external role.
      proactive_agency: [74, 0.55, "d", "A"],
      // Devised a specific, creative operational method for wartime intelligence smuggling -- writing in invisible ink on her own sheet music and pinning notes inside her underwear -- deliberately exploiting her celebrity status as cover, a single but very concrete, ingenious documented instance.
      resourcefulness: [68, 0.5, "d", "A"],
    },
  },
  {
    id: "p_neil_armstrong",
    slug: "neil-armstrong",
    canonicalName: "Neil Armstrong",
    birthYear: 1930,
    deathYear: 2012,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["astronaut", "engineer", "test_pilot"],
    fieldIds: ["exploration", "engineering"],
    impactDomains: ["scientific", "historical", "cultural"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q1615" },
    portrait: {
      url: "/portraits/neil-armstrong-nasa-1969.jpg",
      source: "NASA, via Wikimedia Commons",
      license: "Public Domain (NASA work)",
      width: 1280,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Neil_Armstrong_pose.jpg",
      attribution: "NASA, 1969",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_armstrong_wikipedia", kind: "wikipedia", title: "Neil Armstrong", url: "https://en.wikipedia.org/wiki/Neil_Armstrong" }, { id: "src_armstrong_hansen", kind: "biography", title: "James R. Hansen, First Man: The Life of Neil Armstrong (2005) -- authorized independent biography" }, { id: "src_armstrong_nasa_transcript", kind: "institution", title: "NASA's own technical account and mission transcripts of the Apollo 11 lunar descent" }, { id: "src_armstrong_colleagues", kind: "press", title: "Direct, named colleague accounts (Michael Collins, Frank Borman, Buzz Aldrin) on Armstrong's working style and temperament" }],
    rows: {
      // During the Apollo 11 descent, took over manual attitude control at roughly 5,000 feet after computer overload alarms (1201/1202), then made the further, unplanned real-time decision to fly past a boulder-strewn crater at around 600 feet to a safer landing spot, touching down with roughly 25 seconds of fuel remaining -- a specific, dated, high-stakes sequence of real-time judgment calls, per NASA's own mission transcripts and technical account.
      decisiveness: [88, 0.65, "d", "A"],
      // Continued the manual landing sequence past the point where an abort was a live option, accepting the fuel-margin risk rather than aborting, per NASA's own account of the descent.
      risk_tolerance: [80, 0.58, "d", "R"],
      // Colleagues, including Michael Collins and Buzz Aldrin, independently describe him as quiet and non-confrontational -- Collins described his relationship with fellow astronauts as "neutral strangers," and Aldrin called him "reserved" and someone who avoided saying anything that "had the potential of being challenged later" -- a specific, sourced pattern of conflict avoidance, not a general reputation claim.
      conflict_tolerance: [40, 0.5, "d", "N"],
      // Multiple named colleagues (via Hansen's authorized biography) independently describe him as letting others do the talking in meetings and being "terse" and economical in interviews, never wasting an adjective or adverb -- a specific, sourced communication pattern.
      social_assertiveness: [30, 0.52, "d", "N"],
      // Largely withdrew from public life after Apollo 11 to shield his family's privacy, declining to commercially capitalize on his fame -- a specific, sustained, documented choice, not merely an absence of publicity.
      autonomy_need: [72, 0.55, "d", "A"],
      // Sustained, methodical training as a test pilot and astronaut, and a well-documented pattern of "preternaturally calm and deliberate" thinking and action under pressure, per colleagues who worked with him closely (Hansen's biography).
      discipline: [75, 0.52, "s", "A"],
      // His decision to fly past the planned landing zone rather than accept a rockier site reflects independent, real-time judgment overriding the pre-planned trajectory, per NASA's own account.
      independent_thinking: [60, 0.48, "s", "A"],
    },
  },
  {
    id: "p_steve_wozniak",
    slug: "steve-wozniak",
    canonicalName: "Steve Wozniak",
    birthYear: 1950,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["engineer", "entrepreneur", "inventor"],
    fieldIds: ["technology", "engineering"],
    impactDomains: ["technological", "entrepreneurial", "cultural"],
    tagIds: [],
    archetypeIds: ["technical_innovator"],
    externalIdentity: { wikidataId: "Q483382" },
    portrait: {
      url: "/portraits/steve-wozniak-2017.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0",
      width: 1920,
      height: 2566,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Steve_Wozniak_by_Gage_Skidmore.jpg",
      attribution: "Gage Skidmore, 2017",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_wozniak_wikipedia", kind: "wikipedia", title: "Steve Wozniak", url: "https://en.wikipedia.org/wiki/Steve_Wozniak" }, { id: "src_wozniak_iwoz", kind: "biography", title: "Steve Wozniak with Gina Smith, iWoz: Computer Geek to Cult Icon (2006) -- his own memoir" }, { id: "src_wozniak_smithsonian", kind: "press", title: "Smithsonian Magazine, \"Steve Wozniak's Apple I Booted Up a Tech Revolution\" -- independent journalism" }],
    rows: {
      // In his own words, designed the digital Blue Box in 1972 as "a set of parts that could do three jobs at once instead of two" -- a specific, self-described engineering standard of doing more with fewer components, and a lifelong stated engineering philosophy: "I still believe engineers are among the key people in this world... I have dedicated my whole life to engineering."
      mastery_orientation: [85, 0.62, "d", "A"],
      // Read the 1971 Esquire article "Secrets of the Little Blue Box" and, per his own account, immediately called his friend Steve Jobs to read it to him, then set out to build a working phone-phreaking device -- a specific, dated instance of pursuing a technical curiosity into a real, working artifact.
      curiosity: [78, 0.55, "d", "A"],
      // Built and, with Jobs, personally sold an illegal device (the Blue Box, used to defraud phone companies of long-distance charges) door-to-door in dorms around Berkeley in 1972-73, a specific, real legal and reputational risk taken for an engineering/entrepreneurial thrill rather than for financial need.
      risk_tolerance: [55, 0.5, "d", "D"],
      // His documented open-architecture design philosophy for the Apple II -- deliberately making the machine's internals accessible and expandable rather than closed -- ran against the more common industry instinct toward proprietary, closed hardware at the time.
      independent_thinking: [68, 0.5, "s", "A"],
      // In his own account, his later career included founding and teaching a hands-on computer/technology curriculum for elementary-school students (5th graders) for several years, unpaid, after leaving day-to-day Apple work -- a specific, sustained, self-directed teaching commitment distinct from his engineering career.
      impact_motivation: [72, 0.52, "s", "A"],
      // Left full-time engineering work at Apple in 1985 to pursue teaching and other independent projects, a documented, deliberate career redirection away from the company he co-founded.
      autonomy_need: [60, 0.48, "s", "N"],
    },
  },
  {
    id: "p_tim_berners_lee",
    slug: "tim-berners-lee",
    canonicalName: "Tim Berners-Lee",
    birthYear: 1955,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["computer_scientist", "inventor"],
    fieldIds: ["technology", "engineering"],
    impactDomains: ["technological", "cultural", "social"],
    tagIds: [],
    archetypeIds: ["technical_innovator"],
    externalIdentity: { wikidataId: "Q80" },
    portrait: {
      url: "/portraits/tim-berners-lee-2014.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0",
      width: 1280,
      height: 853,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sir_Tim_Berners-Lee.jpg",
      attribution: "Paul Clarke, September 24, 2014",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_btl_wikipedia", kind: "wikipedia", title: "Tim Berners-Lee", url: "https://en.wikipedia.org/wiki/Tim_Berners-Lee" }, { id: "src_btl_cern", kind: "institution", title: "CERN's own institutional account of the Web's invention (\"The birth of the Web\")", url: "https://home.cern/science/computing/the-birth-of-the-web/" }, { id: "src_btl_guardian_essay", kind: "press", title: "Tim Berners-Lee, own essay in The Guardian on the decision not to patent the Web" }],
    rows: {
      // In March 1989, wrote and submitted an unsolicited proposal at CERN for a distributed hypertext information system to solve a problem he had personally observed (different, incompatible information systems on different computers) -- his own supervisor's contemporaneous assessment called it "vague but exciting," and it was not initially accepted.
      proactive_agency: [80, 0.58, "d", "A"],
      // In 1993, personally pushed CERN to release the Web's source code into the public domain, royalty-free, and declined to patent it himself, in his own words trading a "product" for "infrastructure" -- a specific, dated decision against his own direct financial interest.
      autonomy_need: [78, 0.58, "d", "A"],
      // In his own words, conceived of the Web from the start as being about "sharing, not exploitation" -- an explicit, self-articulated value orientation that directly shaped the 1993 royalty-free release decision, not a retrospective reframing.
      impact_motivation: [82, 0.6, "d", "A"],
      // After his initial 1989 proposal was not accepted, continued refining it with colleague Robert Cailliau until his supervisor allocated time to the project in 1990, then built the first browser/editor and server software by Christmas 1990 -- a documented, sustained multi-year effort from an initially unaccepted proposal to a working system.
      persistence: [65, 0.5, "d", "A"],
      // Refined his original proposal together with Robert Cailliau at CERN before it was accepted, a documented, specific instance of real technical partnership at the project's formative stage.
      collaboration: [58, 0.48, "s", "A"],
    },
  },
];

export const ROSTER_33: readonly Person[] = seeds.map(build);
