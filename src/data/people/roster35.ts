/**
 * ROSTER 35 -- first new-candidate expansion cycle after the 250-person
 * performance checkpoint (11 people: 9 freshly-researched
 * candidates plus 2 re-reviewed backlog reuses, John von Neumann and
 * Jocelyn Bell Burnell -- see docs/checkpoints/roster35.md).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster35.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate -- NOT `toPersonSeed()`
 * directly -- and never checks `computedEligibility.eligible`. All are
 * `evidence_approved` and non-match-eligible as an honest result of
 * evidence-grounded scoring -- none targeted eligibility_v2. Every score's
 * rationale is preserved as the inline comment above its Row.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_alexander_von_humboldt",
    slug: "alexander-von-humboldt",
    canonicalName: "Alexander von Humboldt",
    birthYear: 1769,
    deathYear: 1859,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["DE"],
    regionCode: "western_europe",
    occupationIds: ["naturalist", "explorer"],
    fieldIds: ["natural_science", "exploration"],
    impactDomains: ["scientific", "historical"],
    tagIds: [],
    archetypeIds: ["scientific_explorer", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q6694" },
    portrait: {
      url: "/portraits/alexander-von-humboldt-weitsch-1806.jpg",
      source: "Alte Nationalgalerie, Staatliche Museen zu Berlin, via Wikimedia Commons",
      license: "Public Domain (PD-old-100-expired; artist Friedrich Georg Weitsch died 1828)",
      width: 1157,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Alexander_von_Humboldt_by_Friedrich_Georg_Weitsch.jpg",
      attribution: "Friedrich Georg Weitsch, 1806",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_humboldt_wikipedia", kind: "wikipedia", title: "Alexander von Humboldt", url: "https://en.wikipedia.org/wiki/Alexander_von_Humboldt" }, { id: "src_humboldt_darwin_project", kind: "institution", title: "\"Alexander von Humboldt,\" Darwin Correspondence Project, University of Cambridge -- independent academic archive documenting Humboldt's own 1839 letter to a then-30-year-old Darwin and its content, opened and read in full", url: "https://www.darwinproject.ac.uk/alexander-von-humboldt" }, { id: "src_humboldt_literary_review_wilcken", kind: "press", title: "Patrick Wilcken, \"Conqueror of Chimborazo\" (review of Andrea Wulf's The Invention of Nature: Alexander von Humboldt's New World), Literary Review -- independent, non-hagiographic critical review naming specific documented incidents, opened and read in full", url: "https://literaryreview.co.uk/conqueror-of-chimborazo" }, { id: "src_humboldt_nybooks_rich", kind: "press", title: "Nathaniel Rich, \"The Very Great Alexander von Humboldt\" (review of Andrea Wulf's The Invention of Nature), The New York Review of Books, Oct 22 2015 -- independent review with specific dated/documented incidents, opened and read in full", url: "https://www.nybooks.com/articles/2015/10/22/very-great-alexander-von-humboldt/" }, { id: "src_humboldt_neh_gillis", kind: "institution", title: "Anna Maria Gillis, \"Humboldt in the New World,\" Humanities (National Endowment for the Humanities), Nov/Dec 2012 -- independent institutional account with specific dated incidents (passport, self-funding, Bonpland rescue, electric eel/curare), opened and read in full", url: "https://www.neh.gov/humanities/2012/novemberdecember/feature/humboldt-in-the-new-world" }, { id: "src_humboldt_kinesis_marenda", kind: "press", title: "Patrick Marenda, \"Humboldt and the origin of our ecological view of nature,\" Kinesis Magazine, Jan 28 2021 -- independent science-history account of his synthesizing method, opened and read in full", url: "https://kinesismagazine.com/2021/01/28/humboldt-and-the-origin-of-our-ecological-view-of-nature/" }],
    rows: {
      // Sustained, multi-domain observational habit documented across independent sources: carried and used roughly 42 instruments (barometers, thermometers, a cyanometer, magnetometers, sextants) throughout the entire 1799-1804 expedition, taking measurements of altitude, temperature, sky-blueness, magnetism and species distribution at nearly every stop (Wilcken/Literary Review; Rich/NYRB; Gillis/NEH). A documented, years-long pattern across three independent accounts, not a single anecdote -- one of the handful of things every serious account of Humboldt converges on, supporting the top band.
      curiosity: [87, 0.78, "d", "A"],
      // Documented self-experimentation in the field: took a deliberate electric-eel shock and separately nearly poisoned himself testing curare during the expedition (Gillis/NEH), corroborated independently by Wilcken's account of 'electric eel experiments on himself' (Literary Review). Two distinct documented instances from two independent sources support documented rather than mere inference, though capped below the 85+ band since this is a specific behavior pattern rather than established as one of the two or three things he is most defined by.
      experimentation: [78, 0.65, "d", "A"],
      // Wilcken (Literary Review) documents 'thousands of recordings' and instruments that 'smashed one by one' from continuous use; Rich (NYRB) independently corroborates constant temperature-taking and the cataloguing of roughly 60,000 collected botanical specimens. Two independent, converging documented accounts of sustained, granular recording discipline across the full expedition.
      detail_orientation: [84, 0.72, "d", "A"],
      // The measurement practice was not occasional but sustained without apparent lapse across a five-year, multi-country expedition (Venezuela, Ecuador, Peru, Mexico, Cuba), independently corroborated by Wilcken, Rich, and Gillis (NEH), each describing the same unbroken pattern of daily instrument use over years rather than a single burst of effort. Multiple independent documented instances support the upper end of the clear-pattern band.
      discipline: [84, 0.75, "d", "A"],
      // Rich (NYRB) documents a specific, dated pattern during Humboldt's later Paris writing period: he 'skipped meals and barely slept,' writing in page margins and reportedly carving thoughts into his own desk because his 'hand couldn't keep up with his brain.' A single strong documented account without independent corroboration on this specific behavior, so scored in the real-lean band rather than the extreme one; dual_edged because the same account frames it as costing him sleep and regular meals.
      deep_focus: [68, 0.58, "d", "D"],
      // Continued the Chimborazo ascent after altitude sickness, bleeding gums and vertigo (Wilcken; Rich), continued climbing after his boots disintegrated by going barefoot over knife-edged rock (Rich), and separately continued the broader expedition through repeated bouts of fever, dysentery and blood infections (Rich). Multiple independent documented instances of continuing in the face of physical breakdown, not a single anecdote.
      persistence: [82, 0.72, "d", "A"],
      // Set an altitude record on Chimborazo along what Rich (NYRB) describes as a 'two-inch-wide ridge,' bathed among crocodiles and jaguars in the Orinoco, sailed through a six-day hurricane with sharks circling the ship, and separately took a deliberate electric-eel shock and self-tested curare (Gillis/NEH; Wilcken). Multiple independent documented instances, from more than one source, of repeated, sustained physical risk-taking specifically in pursuit of data -- a defining, widely-converged-on characteristic, hence the top band; dual_edged because the same behavior nearly killed him more than once and is not framed as reckless generally, only in this specific pursuit.
      risk_tolerance: [87, 0.78, "d", "D"],
      // Documented pattern of connecting disparate observations into unified cross-domain patterns: the 1807 Naturgemaelde plotted vegetation type against altitude on Chimborazo and explicitly compared it to Mont Blanc, Vesuvius and Cotopaxi (Marenda/Kinesis; Wilcken); he identified the palm Mauritia flexuosa as what would later be called a keystone species roughly 170 years before that term existed, and rigorously cross-checked New World observations against what was known in Europe, Asia and Africa 'to create a global picture' (Marenda). Rich (NYRB) independently corroborates the same synthesizing method via his invention of isotherms and the observation that forests have a measurable cooling effect on climate. Multiple independent documented instances from more than one source support the top band; this cross-domain synthesis is one of the handful of things Humboldt is specifically remembered for, not a general halo from his fame.
      intuitive_synthesis: [88, 0.78, "d", "A"],
      // Substantive, sustained, non-dabbling work across astronomy, geomagnetism, meteorology, botany and geology within a single unbroken research program, evidenced by the instrument list itself (chronometers, barometers, magnetometers, dipping needles, sextants -- Gillis/NEH) and by independently documented real output in each domain (isotherms and climatology, vegetation-zone botany, volcanism and geology -- Rich; Marenda). Genuinely substantive parallel output in multiple fields over decades, not superficial breadth.
      cross_domain_range: [85, 0.75, "d", "A"],
      // After his mother's 1796 death and inheritance, Humboldt left his secure post in the Prussian Department of Mines specifically 'to pursue the traveling scientist's life,' then personally negotiated with the Spanish crown and financed the entire five-year expedition from his own inheritance rather than seeking a sponsored or institutional post (Gillis/NEH). A single well-documented, specific decision rather than a generalized reputation, so scored in the real-lean-to-clear-pattern band rather than the extreme one.
      autonomy_need: [72, 0.58, "d", "A"],
      // Secured an open-ended Spanish royal passport that Gillis (NEH) describes as 'a boon rarely awarded to foreigners,' then, when illness aboard the Pizarro forced an unplanned early disembarkation at Cumana rather than the originally intended Cuba landing, used the changed circumstance to explore the Orinoco and other waterways he had not originally planned to survey. Two distinct instances of recognizing and acting on an unplanned opening, both from the same source, so scored strong_inference rather than documented per this project's stricter multi-source standard for that label.
      opportunity_sensing: [68, 0.55, "s", "A"],
      // Traveled as a sustained working partner with botanist Aime Bonpland throughout the full five-year expedition, including one documented incident in which Bonpland pulled Humboldt (who could not swim) from drowning (Gillis/NEH); Wilcken (Literary Review) independently characterizes Humboldt as forming 'very close relationships with his male colleagues and travel companions.' Two independent sources converge on a real, sustained collaborative partnership, though neither documents specific joint working methods in enough detail to support a higher confidence.
      collaboration: [65, 0.5, "s", "A"],
      // Marenda (Kinesis) documents that rather than resting on isolated local observation, Humboldt 'would rigorously compare it to what was known about the natural world in Europe, Asia and Africa, to create a global picture' -- a specific, described comparative-verification method, not a general reputation for intelligence. Corroborated by the sheer measurement volume independently documented by Wilcken and Rich. One clear documented method plus corroborating volume evidence supports the higher end of the clear-pattern band.
      analytical_rigor: [80, 0.62, "d", "A"],
      // Wrote and received an estimated 50,000-plus letters over his lifetime (Wilcken) and, per the Darwin Correspondence Project's own independent account, wrote unprompted to a 30-year-old Darwin in 1839 specifically to encourage him ('You have an excellent future ahead of you'), while Rich (NYRB) documents broader influence reaching non-specialist readers and writers (Wordsworth, Coleridge, Goethe) well beyond a narrow scientific circle. A real, evidenced pattern of deliberately reaching and encouraging beyond his own immediate circle, though inferred from the correspondence pattern rather than a stated goal, hence strong_inference.
      impact_motivation: [62, 0.48, "s", "A"],
    },
  },
  {
    id: "p_carl_linnaeus",
    slug: "carl-linnaeus",
    canonicalName: "Carl Linnaeus",
    birthYear: 1707,
    deathYear: 1778,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["SE"],
    regionCode: "western_europe",
    occupationIds: ["biologist", "physician"],
    fieldIds: ["biology"],
    impactDomains: ["scientific", "historical"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q1043" },
    portrait: {
      url: "/portraits/carl-linnaeus-roslin-1775.jpg",
      source: "Nationalmuseum, Sweden (Gripsholm Castle collection), via Wikimedia Commons",
      license: "Public Domain (PD-old-100-expired; painting from 1775, artist died 1793)",
      width: 1324,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Carl_von_Linn%C3%A9.jpg",
      attribution: "Alexander Roslin, 1775",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_linnaeus_wikipedia", kind: "wikipedia", title: "Carl Linnaeus", url: "https://en.wikipedia.org/wiki/Carl_Linnaeus" }, { id: "src_linnaeus_linnean_society", kind: "institution", title: "The Linnean Society of London, \"His Career and Legacy\" -- independent institutional account (the learned society that today holds his purchased collections) describing his systematic application of the binomial system to name 'over 12,000 species throughout his career,' and describing him as 'a charismatic teacher' who 'surrounded himself with students, the most gifted of whom he sent on voyages of exploration' worldwide to collect specimens for his system, noting 'some of them died en route.'", url: "https://www.linnean.org/learning/who-was-linnaeus/career-and-legacy" }, { id: "src_linnaeus_koerner", kind: "biography", title: "Lisbet Koerner, Linnaeus: Nature and Nation (Harvard University Press, 1999) -- independent academic history-of-science monograph. Read via a published review/summary (not the full monograph text) actually opened and read for this research, which characterizes Koerner's argued portrait of Linnaeus as 'a complex man -- paternalistic, patriotic, self-important and slightly mendacious,' whose ambitious global collecting/classification project was motivated in part by 'jealous[y] of British colonial and scientific success.'", url: "https://2think.org/linnaeus.shtml" }],
    rows: {
      // The Linnean Society documents that he applied a single consistent binomial organizing system 'systematically' across his entire career, naming 'over 12,000 species' -- a specific, quantified, sustained practice, not a one-off insight. Scored from the institution's documentation of the practice's scale/consistency, not from the achievement of inventing the system itself. One independent source on this specific point, so kept in the 56-70 band rather than higher.
      systems_abstraction: [68, 0.6, "d", "A"],
      // Two independent sources document a large-scale, personally-driven enterprise beyond his own research: the Linnean Society describes him recruiting and dispatching his most talented students ('apostles') on global specimen-collecting expeditions explicitly to build out his classification system, and Koerner's independent academic study frames this ambition as partly fueled by rivalry with British colonial/scientific dominance. Two independent, on-point documented facts. Marked dual_edged rather than pure advantage: this same ambition had a genuine, well-attested human cost -- several of the students he dispatched did not return from their expeditions.
      achievement_drive: [76, 0.65, "d", "D"],
      // The same apostles program read for what it shows about directing others rather than personal ambition: the Linnean Society's 'charismatic teacher' framing describes him building and coordinating a devoted network of protege-explorers toward a shared project, each apostle sent out to specific ends. Strong_inference (kept below achievement_drive's confidence) since it draws on the same underlying fact set rather than fully independent evidence for this specific facet of the behavior.
      leadership_drive: [65, 0.5, "s", "A"],
      // Koerner's independent academic study characterizes Linnaeus as 'self-important' and describes his ambitions as driven in part by jealousy of British colonial and scientific success -- a documented biographer's argued characterization (not a bare adjective) but from a single source. Kept at strong_inference/moderate score rather than higher, per this rubric's caution against reading a single academic characterization as settling an extreme score.
      competitiveness: [62, 0.45, "s", "D"],
      // The Linnean Society documents sustained, hands-on institution-building alongside his professorship and medical practice: reconstructing and expanding Uppsala's Botanical Garden, running regular public botanizing excursions, and later personally building a museum for his library and collections. A specific, sustained, multi-decade practice from one independent institutional source.
      discipline: [70, 0.55, "d", "A"],
    },
  },
  {
    id: "p_ella_fitzgerald",
    slug: "ella-fitzgerald",
    canonicalName: "Ella Fitzgerald",
    birthYear: 1917,
    deathYear: 1996,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["singer", "musician"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural"],
    tagIds: [],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q1768" },
    portrait: {
      url: "/portraits/ella-fitzgerald-1946.jpg",
      source: "William P. Gottlieb Collection, Library of Congress, via Wikimedia Commons",
      license: "Public Domain (Gottlieb collection; no known copyright restrictions -- Gottlieb dedicated the collection to public use)",
      width: 1514,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ella_Fitzgerald_(Gottlieb_02871).jpg",
      attribution: "William P. Gottlieb, November 1946",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ella_wikipedia", kind: "wikipedia", title: "Ella Fitzgerald", url: "https://en.wikipedia.org/wiki/Ella_Fitzgerald" }, { id: "src_ella_granz_paulsmith", kind: "press", title: "\"Ella and Norman,\" JazzProfiles (2011) -- career retrospective on the Fitzgerald/Granz partnership, quoting Norman Granz's own account of managing and producing her and pianist Paul Smith's independent, decades-long account of accompanying her -- opened and read in full", url: "https://jazzprofiles.blogspot.com/2011/10/ella-and-norman.html" }, { id: "src_ella_tick_nation_review", kind: "press", title: "\"The Genius of Ella Fitzgerald,\" The Nation -- review of Judith Tick's 2024 biography \"Becoming Ella Fitzgerald,\" an independent, recent scholarly biography; describes her scat technique in detail and quotes a close friend on her private disposition -- opened and read in full", url: "https://www.thenation.com/article/culture/ella-fitzgerald-judith-tick-biography/" }, { id: "src_ella_jazzhistoryonline", kind: "press", title: "\"Ella at 100,\" Jazz History Online -- independent jazz-journalism retrospective with a specific named anecdote (singer Carmen Bradford) and documented characterization of her self-criticism and offstage disposition -- opened and read in full", url: "https://jazzhistoryonline.com/ella-at-100/" }],
    rows: {
      // Developed a specific, sustained scat-singing "syllabic vocabulary," not merely a famous voice. The Nation's review of Judith Tick's 2024 biography describes her spinning melodies into "a cyclone of free association," interpolating fragments of Chopin, Elvis and Armstrong into new vocal collages, tracing the technique to her own account of joining Chick Webb's after-hours jam sessions ("I felt out of place until Chick suggested I improvise on my voice"). Independently, Jazz History Online's retrospective documents a specific instance -- her "Blue Skies" recording -- where she scatted an unplanned multi-chorus solo "by her knowledge and instincts." Two independent, non-self accounts converging on the same documented technique, not scored from her fame as a singer.
      creative_originality: [82, 0.65, "d", "A"],
      // The same two independent accounts document her combining disparate musical material on the fly into a coherent improvisation rather than working it out analytically in advance -- interpolating classical, pop and jazz references into a single spontaneous vocal line (The Nation/Tick biography), and scatting an entire unrehearsed solo on "Blue Skies" by ear rather than from a prepared arrangement (Jazz History Online). Scored as a documented pattern of real-time synthesis under performance conditions, not from a general reputation for musicality.
      intuitive_synthesis: [76, 0.6, "d", "A"],
      // Pianist Paul Smith, her accompanist for decades, is quoted in JazzProfiles' "Ella and Norman" describing her as someone "for whom singing was her life" whose "home was the stage," who grew restless during breaks between engagements and asked why Granz was not booking her more. A single named, direct collaborator's account of a specific, recurring behavior pattern -- not inferred from her fame or record sales, hence held to a moderate rather than extreme score.
      mastery_orientation: [66, 0.5, "d", "A"],
      // Norman Granz, her manager/producer for roughly four decades, described their arrangement in his own words as running on "mutual love and respect" with no formal contract between them (JazzProfiles' "Ella and Norman"). Paul Smith's account in the same piece adds that although Granz selected the large majority of her recorded material, he did so "in concert with Fitzgerald's wishes." A specific, sustained, named professional partnership -- not inferred from her occupation.
      collaboration: [70, 0.52, "d", "A"],
      // Jazz History Online's retrospective recounts singer Carmen Bradford's backstage exchange with Fitzgerald, in which Fitzgerald confessed her own performances "didn't always go as well as she hoped" -- to Bradford's incredulity -- and separately documents her as "extremely self-critical" of her work. A single, specific, named, quoted incident: enough to support a real lean, per the rubric's single-anecdote cap, not an extreme score.
      perfectionism: [60, 0.52, "d", "D"],
      // Two independent sources converge on the same pattern: Jazz History Online documents that she "guarded many details of her private life" and would "push uncomfortable feelings into the background" rather than display them; The Nation's review of the Tick biography separately quotes a close friend describing her as someone who "kept a lot inside her head." Corroborated by her own public description of herself as shy away from people (self-testimony, treated as one supporting perspective, not the sole basis for the score). Scored low for the documented offstage pattern, distinct from her transformation once performing -- not from any inference about her fame or stage success.
      social_assertiveness: [26, 0.55, "s", "D"],
    },
  },
  {
    id: "p_ingmar_bergman",
    slug: "ingmar-bergman",
    canonicalName: "Ingmar Bergman",
    birthYear: 1918,
    deathYear: 2007,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["SE"],
    regionCode: "western_europe",
    occupationIds: ["film_director"],
    fieldIds: ["film"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["perfectionist"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q7546" },
    portrait: {
      url: "/portraits/ingmar-bergman-1966.jpg",
      source: "Nationaal Archief (Dutch National Archives) / Anefo, via Wikimedia Commons",
      license: "CC BY-SA 3.0",
      width: 786,
      height: 1050,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      attribution: "Joost Evers / Anefo, 10 October 1966",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_bergman_wikipedia", kind: "wikipedia", title: "Ingmar Bergman", url: "https://en.wikipedia.org/wiki/Ingmar_Bergman" }, { id: "src_bergman_asc_nykvist", kind: "institution", title: "\"Photographing the Films of Ingmar Bergman,\" American Society of Cinematographers -- independent trade-institution account carrying cinematographer Sven Nykvist's own detailed, technical, named-collaborator testimony on their three-decade planning, research and shooting method -- opened and read in full", url: "https://theasc.com/articles/photographing-the-films-of-ingmar-bergman" }, { id: "src_bergman_wmagazine", kind: "press", title: "\"The Private World of Ingmar Bergman,\" W Magazine -- independent account of his daily working routine on Faro, drawing on friend Hanns Rodell and daughter Linn Ullmann -- opened and read in full", url: "https://www.wmagazine.com/story/ingmar-bergman" }, { id: "src_bergman_artsfuse_peary", kind: "press", title: "Gerald Peary, review of Peter Cowie's \"God and the Devil: The Life and Work of Ingmar Bergman,\" Arts Fuse -- independent review corroborating his daily routine and directing reputation from a named biography -- opened and read in full", url: "https://artsfuse.org/293497/book-review-a-deep-dive-into-the-complex-world-of-ingmar-bergman/" }, { id: "src_bergman_lwlies_ullmann", kind: "press", title: "Liv Ullmann interview, Little White Lies -- her own account (independent of, i.e. non-self relative to, Bergman) of their roughly 45-year creative partnership and his directing method -- opened and read in full", url: "https://lwlies.com/interviews/liv-ullmann-ingmar-bergman" }, { id: "src_bergman_yahoo_andersson", kind: "press", title: "\"Bibi Andersson, the Great Swedish Actress ... Was a Sunflower Who Saw the Darkness,\" Yahoo Entertainment (Criterion-sourced) -- independent critical account of his directing approach to actresses -- opened and read in full", url: "https://www.yahoo.com/entertainment/bibi-andersson-great-swedish-actress-052252019.html" }],
    rows: {
      // Cinematographer Sven Nykvist, his director of photography across three decades, documented (American Society of Cinematographers) that before each production the two spent four intensive days analyzing the script line-by-line, calling it "careful and exacting planning" that saved "a tremendous lot of time and money." For "Winter Light," Nykvist independently researched roughly 30 churches around Lake Siljan, photographing their interior light at different times of day and pasting the prints into his script as lighting references. The same account documents that for "Through a Glass Darkly," ordinary shooting stopped daily at 3 P.M. so twilight scenes could be rehearsed for three hours ahead of a nightly 10-minute shooting window. Three independent, specific, named-collaborator-documented planning practices, not inferred from his reputation as an auteur.
      planning_orientation: [80, 0.6, "d", "A"],
      // The same Nykvist account documents granular technical preparation -- systematically photographing church interiors to study light patterns before deciding how to light "Winter Light" -- and a specific standard he and Nykvist held each other to, that "there would be no beauty effects," prioritizing realism over conventional cinematographic polish. A specific, named, documented working standard, not inferred from his films' finished visual reputation. Impact is dual_edged: it produced visually exacting, coherent results but imposed extraordinary preparation demands on his crew.
      detail_orientation: [76, 0.55, "d", "D"],
      // Two independent sources corroborate the same specific daily routine on Faro. W Magazine's profile (drawing on his friend Hanns Rodell and daughter Linn Ullmann) documents breakfast at 7 a.m., a walk, work through the morning, lunch at 1 p.m. sharp, and a fixed 3 p.m. film screening, with his own explanation: "When you're as chaotic as I am, you need a very firm structure in your life ... this is a way of keeping me sane." Gerald Peary's independent review of Peter Cowie's biography corroborates the same schedule (breakfast at 7, a walk, writing after lunch, a 3 p.m. 35mm screening) and adds his own summary of the philosophy behind it: "Only the truly efficient can be truly lazy." Two independent sources converging on the same specific, sustained, decades-long routine, with no contradicting evidence found -- one of the two or three things this person is best known for behaviorally.
      discipline: [86, 0.7, "d", "A"],
      // Liv Ullmann's own account (Little White Lies interview) documents a sustained roughly 45-year creative partnership: she acted in 10 of his films and later directed two of his screenplays herself. Independently, the ASC's Nykvist account documents a separate, also three-decade, collaboration with the same director as his cinematographer. Two independent, named, non-Bergman-authored accounts of sustained repeat collaboration with the same small ensemble, not inferred from his output volume or acclaim.
      collaboration: [78, 0.6, "d", "A"],
      // Liv Ullmann documents a specific instance of his insistence on controlling his own material: during "Autumn Sonata," he refused to alter his scripted dialogue despite Ingrid Bergman's resistance -- "They were his lines, and they had to be his lines." Corroborated by the independently documented pattern of his self-directed, tightly structured working life (his own private working spaces on Faro, a firm self-imposed schedule, and his own description of needing that structure). Impact is dual_edged: it enabled a singular directorial vision but produced documented friction with collaborators.
      autonomy_need: [72, 0.52, "d", "D"],
      // The same specific, named "Autumn Sonata" incident -- Bergman remaining in open disagreement with Ingrid Bergman over the script rather than compromising -- is documented evidence of tolerating rather than smoothing over conflict (Liv Ullmann, Little White Lies). A Yahoo/Criterion-sourced piece on Bibi Andersson independently corroborates a general pattern of demanding treatment of actors provoking pushback (Andersson's own reported reaction: "I will show him what dramatic talent I possess"), though this second source is a general characterization rather than an equally specific instance, so confidence is kept moderate and the score held to a real-lean band rather than an extreme one, consistent with the single-incident cap.
      conflict_tolerance: [62, 0.46, "d", "D"],
    },
  },
  {
    id: "p_jocelyn_bell_burnell",
    slug: "jocelyn-bell-burnell",
    canonicalName: "Jocelyn Bell Burnell",
    birthYear: 1943,
    isLiving: true,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["astrophysicist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q233974" },
    portrait: {
      url: "/portraits/jocelyn-bell-burnell-1967.jpg",
      source: "Roger W Haworth, via Flickr and Wikimedia Commons",
      license: "CC BY-SA 2.0",
      width: 1018,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Susan_Jocelyn_Bell_(Burnell),_1967.jpg",
      attribution: "Roger W Haworth, 1967",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_jbb_wikipedia", kind: "wikipedia", title: "Jocelyn Bell Burnell", url: "https://en.wikipedia.org/wiki/Jocelyn_Bell_Burnell" }, { id: "src_jbb_prospect", kind: "press", title: "\"Jocelyn Bell Burnell: 'Not getting the Nobel has been good for me'\" -- Prospect Magazine interview, her own words -- self-testimony, one perspective", url: "https://www.prospectmagazine.co.uk/views/people/60135/jocelyn-bell-burnell-not-getting-the-nobel-has-been-good-for-me" }, { id: "src_jbb_aps_cnbc", kind: "press", title: "Multiple independently-conducted press interviews (American Physical Society News, 'Don't Second-Guess Yourself,' 2024; CNBC science-prize coverage) in which Bell Burnell discusses the pulsar discovery in her own words -- self-testimony, one perspective", url: "https://www.aps.org/apsnews/2024/02/jocelyn-bell-burnell-discovery-pulsars" }, { id: "src_jbb_penny_seti", kind: "archive", title: "Alan Penny (School of Physics and Astronomy, University of St Andrews), \"The SETI Episode in the 1967 Discovery of Pulsars,\" European Physical Journal H (2013), arXiv:1302.0641 -- an independent historian-of-science's peer-reviewed account, built from contemporary documentation (Ryle/Hewish correspondence and archives, Bell's own 1968 thesis, Woolgar's 1975/1979 interview-based thesis) plus personal communications from named participants. Opened and read in full. Genuinely independent, non-self, behavioral: gives a dated, specific account of Bell's own sustained pattern-detection work across months (first noticing 'scruff' on Aug 6 1967, recognizing its sidereal-time recurrence in late August, finding a second pulsar source Dec 21, and a third and fourth source in mid-January) and quotes named colleague Craig Mackay, who 'had a desk next to Bell during the discovery,' independently describing the working atmosphere. Notably NOT hagiographic -- the paper explicitly records that Bell Burnell herself disputes parts of its analysis, a sign this is genuine independent scholarship, not a repackaging of her own narrative.", url: "https://arxiv.org/pdf/1302.0641" }],
    rows: {
      // Documented as the sole woman in her physics classes at Glasgow being 'jeered at by male students, who banged desks whenever she entered a lecture theatre' (Prospect interview) -- a specific, sourced, sustained hostile pattern, distinct from a general claim about historical sexism in science.
      conflict_tolerance: [62, 0.45, "d", "D"],
      // Documented directly quoted coping response to the desk-banging harassment: 'I learnt not to show weakness, not to show it was affecting me' -- and, separately, that her parents had to actively fight her school's refusal to let her study science rather than 'cooking and sewing,' a second, distinct, dated obstacle she and her family worked through. Independently corroborated (Penny 2013): his dated timeline shows her sustained, repeated pattern-detection work continuing over more than five months -- first noticing 'scruff' 6 August 1967, recognizing its recurrence in late August, then finding a second, third, and fourth pulsar source in December and mid-January -- an independently-documented pattern of sustained effort, not a single lucky observation.
      persistence: [68, 0.48, "d", "A"],
      // Documented as personally identifying the first pulsar signal by hand from analog chart paper, described in her own words as 'a very small anomaly...about 5 millimeters...out of half a kilometer' -- a specific, dated, self-described act of careful pattern-detection in an enormous volume of raw data. Independently corroborated (Penny 2013, an historian's peer-reviewed account built from contemporary correspondence/archives and named-participant interviews, not Bell Burnell's own retelling): confirms she personally noticed the anomalous 'scruff' pattern on 6 August 1967 while doing the chart-recording analysis herself, and independently records that she went on to personally find three more pulsar sources by mid-January 1968.
      achievement_drive: [65, 0.45, "d", "A"],
      // Documented publicly and repeatedly framing her own Nobel omission not as a grievance but as evidence of the era's institutional bias, stating 'times have changed and the Nobel Committee is much more alert to issues like unconscious bias' -- a specific, sourced reframing that departs from the expected narrative of resentment.
      independent_thinking: [60, 0.42, "d", "A"],
      // Documented donating the entirety of her 2018 $3 million Breakthrough Prize to fund physics graduate studentships for women, underrepresented ethnic-minority, and refugee students -- a specific, dated, independently verifiable act of redirecting personal financial reward.
      impact_motivation: [60, 0.42, "d", "A"],
      // Documented believing she 'had been a mistake' admitted to Cambridge and consequently working 'extra hard to postpone the day when...she would be found out' -- a specific, sourced account of adapting her working behavior directly in response to an internalized institutional doubt.
      adaptability: [55, 0.4, "d", "A"],
      // Inferred from her documented later career as a prominent public science communicator and former President of the Institute of Physics and the Royal Society of Edinburgh, though the sources consulted this cycle describe the roles more than specific assertive incidents.
      social_assertiveness: [45, 0.38, "i", "N"],
    },
  },
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
    directoryVisible: true,
    sources: [{ id: "src_jvn_wikipedia", kind: "wikipedia", title: "John von Neumann", url: "https://en.wikipedia.org/wiki/John_von_Neumann" }, { id: "src_jvn_wikidata", kind: "wikidata", title: "John von Neumann (Q17455)", url: "https://www.wikidata.org/wiki/Q17455" }, { id: "src_jvn_bochner_nas", kind: "institution", title: "S. Bochner, \"John von Neumann 1903-1957\", National Academy of Sciences Biographical Memoirs, vol. 32 (1958) -- written by a mathematician colleague shortly after von Neumann's death. Fully read in this cycle (PDF fetched directly from nasonline.org).", url: "https://www.nasonline.org/wp-content/uploads/2024/06/von-neumann-john.pdf" }, { id: "src_jvn_nathanson_2023", kind: "press", title: "Melvyn B. Nathanson, \"Three Questions About John von Neumann\", arXiv:2306.00741 (2023) -- a mathematician-historian's scholarly essay, itself quoting several primary/near-primary sources: von Neumann's own March 19, 1956 resignation letter to Oppenheimer, Klara von Neumann's firsthand account, Benoit Mandelbrot's firsthand account, Eugene Wigner's firsthand account, and the Atomic Energy Commission General Advisory Committee's October 30, 1949 memorandum. Fully read in this cycle (PDF fetched directly from arxiv.org). These embedded quotes are cited here AS QUOTED IN Nathanson, not as independently verified against Bhattacharya's 2021 biography or the IAS archives directly.", url: "https://arxiv.org/pdf/2306.00741" }],
    rows: {
      // EVIDENCE-INTEGRITY CORRECTION (2026-09): originally scored 90/0.7 citing 'Ulam's memoir' as independent corroboration for a specific claim (Ancient Greek historians in the original language, a 46-volume history series) that was never actually verified -- Ulam's own book/obituary could not be accessed this cycle. Rescored down to what an actually-read independent source supports: Bochner's 1958 NAS memoir states directly, as a colleague with personal knowledge, that he 'was also a great reader of books on history throughout his life, and in both science and history his retentive memory was most remarkable' -- though Bochner himself hedges the strongest version of this ('legend has it that he knew all the facts and dates from many volumes of standard histories by heart') as hearsay, not witnessed firsthand. Confidence lowered to reflect that hedge.
      curiosity: [78, 0.55, "s", "A"],
      // SUPPORTED_AS_WRITTEN, confidence raised. Now independently corroborated by two actually-read sources: Bochner's NAS memoir gives a detailed technical account of the 1925 axiomatic set theory thesis and the Hilbert-space operator-theory work ('the naturalness with which he axiomatized the Hilbert space... was breathtaking to specialist and nonspecialist alike'), and Nathanson's 2023 essay independently confirms the same body of work's foundational character. Rigor attested by the surviving technical record itself, described directly by a mathematician colleague, not by anecdote or reputation alone.
      analytical_rigor: [95, 0.85, "d", "A"],
      // SUPPORTED_AS_WRITTEN. Bochner's memoir gives a detailed, technical, independent account of the operator-algebra work (with F. J. Murray) and game theory's axiomatic development; Nathanson's essay independently confirms both as foundational contributions. Kept as a distinct dimension from cross_domain_range (this row concerns his mode of thought -- formal abstraction -- not the breadth of fields he applied it to).
      systems_abstraction: [90, 0.72, "d", "A"],
      // SUPPORTED_BUT_OVERSTATED in the original file (85/0.68, impact: advantage, no complicating evidence). Two independently-read sources reveal a genuine, repeated pattern complicating a flat 'originator' narrative: Bochner's memoir describes Elie Cartan immediately recognizing and publishing a more general version of von Neumann's 1929 Lie-group result days after Cartan saw it ('There is hardly a young mathematician today who realizes that this familiar general proposition was von Neumann's discovery originally'); Nathanson's essay independently describes Godel's 1931 incompleteness theorem superseding a line von Neumann had been pursuing, and Birkhoff's 1931 'more fundamental' individual ergodic theorem following close on von Neumann's own mean ergodic theorem. Real, repeated originality is still documented, but scored dual-edged and at reduced confidence rather than an uncomplicated advantage.
      creative_originality: [75, 0.6, "s", "D"],
      // SUPPORTED_AS_WRITTEN, now doubly-sourced. Bochner's memoir and Nathanson's essay both independently confirm substantive, technically deep work across pure mathematics, quantum mechanics, game theory/economics, computing, and nuclear-weapons engineering (Nathanson: 'he moved from pure mathematics to physics to economics to engineering').
      cross_domain_range: [94, 0.78, "d", "A"],
      // Retained as a distinct facet from cross_domain_range/systems_abstraction (comfort working with no established framework, rather than breadth or abstraction ability per se), grounded in the same independently-documented pattern of entering fields (game theory, computer architecture) with no precedent to follow. Confidence kept moderate since this is an interpretive angle on already-cited facts rather than a separately-observed incident.
      ambiguity_tolerance: [75, 0.52, "s", "A"],
      // SUPPORTED_BUT_OVERSTATED originally (90/0.68, advantage only). Retained as a distinct facet (depth within each field, not breadth across fields), but tempered to dual_edged and lower confidence for the same Cartan/Godel/Birkhoff pattern noted under creative_originality -- his depth was real but not always the final or dominant word in a field he helped found.
      mastery_orientation: [78, 0.5, "s", "D"],
      // SUPPORTED_BUT_OVERSTATED originally: the claim 'nearly one major paper per month' is not what the actual record shows. Nathanson's essay gives a precise, independently-sourced count: 45 papers on mathematics and mathematical physics between 1922 and 1932 -- a genuinely prolific rate (roughly 4-5 papers/year sustained for a decade) but well short of monthly. Corrected to the accurate figure.
      discipline: [78, 0.62, "s", "A"],
      // SUPPORTED_BUT_OVERSTATED originally (framed as pure output-volume drive). Nathanson's essay adds real, previously-missing evidence of mixed motivation: 'Von Neumann wanted to be rich. Money was important to him... he was most comfortable with people who were also from wealthy families,' and his later government consulting was partly to 'replenish his bank account.' Rescored dual-edged to reflect a genuinely more complex motivational picture (achievement AND status/financial motivation) rather than a flattering, single-cause drive narrative.
      achievement_drive: [80, 0.58, "s", "D"],
      // SUPPORTED_AS_WRITTEN, strengthened and upgraded from strong_inference to documented. Originally a vague 'hawkish Cold War positions' claim; Nathanson's essay supplies a specific, dated, directly-quoted 1950 remark advocating a preemptive strike on the USSR ('If you say why not bomb them tomorrow, I say why not today?'), and independently documents that the Atomic Energy Commission's own General Advisory Committee formally objected in writing (Oct. 30, 1949) that the hydrogen bomb's use 'would involve a decision to slaughter a vast number of civilians' -- a real, on-record moral objection from his own professional peers to the position he championed. Kept dual-edged; this is now the best-evidenced row in the file precisely because it does not flatter him.
      risk_tolerance: [72, 0.65, "d", "D"],
      // SUPPORTED_BUT_OVERSTATED originally (90/0.65). The specific 'Szego moved to tears' anecdote remains single-sourced (Wikipedia only -- neither Bochner nor Nathanson repeats it). However, Nathanson's essay independently confirms Szego was a real, documented childhood tutor ('His father hired private tutors, first Gabor Szego and then Michael Fekete'), lending real convergent support to the relationship even though the specific emotional anecdote is not independently corroborated. Score and confidence reduced to reflect partial, not full, independent corroboration.
      execution_speed: [78, 0.5, "s", "A"],
      // SUPPORTED_BUT_OVERSTATED originally, and REWRITTEN: the original 'attend parties until the early hours' claim was single-sourced (Wikipedia) and not corroborated. Bochner's memoir gives a different, independently-sourced, more nuanced account: 'nothing awkward about his manner in later life... courteous and could be quite jovial. In company he was an excellent raconteur... he never smoked, and would drink but rarely, although he would sometimes simulate gaiety as if he had imbibed.' Rescored around this actually-corroborated, more nuanced picture -- genuine social ease, but with a documented element of performance rather than substance-driven conviviality.
      social_assertiveness: [68, 0.55, "s", "N"],
      // SUPPORTED_AS_WRITTEN, strengthened. Bochner's memoir independently supplies a specific, named collaboration incident beyond the original's generic 'partnerships' claim: working with F. J. Murray on operator algebras from 1935, 'Murray's partnership was not a nominal one. There were many discussions between them with a brisk give-and-take throughout.'
      collaboration: [80, 0.6, "s", "A"],
      // SUPPORTED_BUT_OVERSTATED originally as a clean 'wanted real-world impact' narrative. Nathanson's essay reveals this was genuinely mixed with the financial/status motivation documented under achievement_drive -- his shift into applied defense/computing work cannot honestly be attributed to impact-seeking alone. Rescored down and to neutral impact to reflect that complexity rather than a single flattering motive.
      impact_motivation: [65, 0.48, "i", "N"],
      // NEW ROW -- this personality dimension was entirely absent from the original 23-row profile, which the evidence-integrity audit correctly flagged as containing no genuine conflict/setback/constraint evidence. Nathanson's essay, quoting multiple independent named firsthand witnesses, documents years of real professional and social ostracism at the Institute for Advanced Study over von Neumann's computer project: his own wife Klara von Neumann wrote his 1945-46 proposal 'was not received with applause, to say the least' and that colleagues were 'stunned, or even horrified'; mathematician Benoit Mandelbrot (present at Princeton) described him as 'under extreme pressure... from mathematicians, who were despising him for no longer being a mathematician; by the physicists, who were despising him for never having been a real physicist; and by everyone for having brought to Princeton this collection of low-class individuals called programmers... Von Neumann was simply being shunned.' Rather than retreating, he sustained his direction for roughly a decade, accepted an alternative UCLA position in 1954, and formally resigned via a letter to Oppenheimer (March 19, 1956) that -- despite the documented years of friction -- described his 22 years at the Institute as 'the most fruitful ones of my life and scientific career.' A real, sourced, multi-witness incident, not an inference from achievement.
      conflict_tolerance: [82, 0.68, "d", "A"],
      // NEW ROW. Nathanson's essay documents a specific, dated instance of revising a strongly-held position: von Neumann 'abandoned the effort to launch a pre-emptive strike [on the USSR] when it became obvious that the Soviet Union had enough nuclear weapons to retaliate' -- a concrete change of policy stance in direct response to changed strategic facts, distinct from the risk_tolerance row (which describes the original stance, not its revision).
      belief_updating: [70, 0.55, "s", "A"],
    },
  },
  {
    id: "p_larry_page",
    slug: "larry-page",
    canonicalName: "Larry Page",
    birthYear: 1973,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur", "computer_scientist"],
    fieldIds: ["technology", "computing"],
    impactDomains: ["entrepreneurial", "technological", "innovation"],
    tagIds: [],
    archetypeIds: ["entrepreneurial_builder", "technical_innovator"],
    externalIdentity: { wikidataId: "Q4934" },
    portrait: {
      url: "/portraits/larry-page-ep-2009.jpg",
      source: "Wikimedia Commons, own work by Marcin Mycielski, European Parliament",
      license: "Creative Commons Attribution-Share Alike 4.0 International",
      width: 1200,
      height: 1600,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      attribution: "Marcin Mycielski / European Parliament, June 17, 2009",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_page_wikipedia", kind: "wikipedia", title: "Larry Page", url: "https://en.wikipedia.org/wiki/Larry_Page" }, { id: "src_page_philsimon_googled_review", kind: "press", title: "Phil Simon, review of Ken Auletta's \"Googled: The End of the World As We Know It\" (2009), philsimon.com -- independent commentary/review, opened and read in full, quoting Auletta's book at length on a specific, dated (c. 2005-06) internal meeting where Page confronted AdWords engineering VP Sridhar Ramaswamy over an incremental proposal, and characterizing Google's culture under Page/Brin as one where 'marginal improvements are not acceptable.' Non-self, independent of Page's own testimony.", url: "https://www.philsimon.com/googled-by-ken-auletta/" }, { id: "src_page_fortune_elmer", kind: "press", title: "Vickie Elmer, \"What would Larry Page do? Leadership lessons from Google's doyen,\" Fortune, April 18, 2011 -- independent business journalism, opened and read in full, citing Steven Levy's independently-reported \"In the Plex\" on Page's requirement of ~60-word project updates, his trimming of middle-management layers, and a documented 8% stock decline tied to Page skipping a scheduled investor Q&A. Non-self reporting; Page's own book/interviews were not the source read.", url: "https://fortune.com/2011/04/18/what-would-larry-page-do-leadership-lessons-from-googles-doyen" }, { id: "src_page_aljazeera_alphabet", kind: "press", title: "\"Google creates new parent company\" [Alphabet restructuring], Al Jazeera, August 11, 2015 -- independent press reporting and analysis, opened and read in full, quoting Page's own announcement directly alongside Al Jazeera's own independent analysis of the restructuring's rationale (Wall Street financial-transparency demands).", url: "https://www.aljazeera.com/news/2015/08/google-parent-company-alphabet-restructuring-150811004443960.html" }, { id: "src_page_ethw_pagerank", kind: "institution", title: "\"Milestones: PageRank and the Birth of Google, 1996-1998,\" Engineering and Technology History Wiki (IEEE) -- independent institutional/historical account, opened and read in full, describing Page's specific technical contribution (interpreting hyperlinks as referrals/endorsements, recursively deriving ranking scores) and explicitly situating it within prior link-analysis research (Marchiori; Li and Rafsky; Kleinberg) rather than treating it as an unprecedented invention.", url: "https://ethw.org/Milestones:PageRank_and_the_Birth_of_Google,_1996-1998" }],
    rows: {
      // In a specific, dated (c. 2005-06) internal meeting about overhauling AdWords, independently reported and directly quoted in Ken Auletta's "Googled" (read via Phil Simon's detailed review, which quotes the book at length): Page told engineering VP Sridhar Ramaswamy, "I named this 3.0 for a reason. We wanted something big. Instead, you proposed something small." The same review documents the surrounding standard Page enforced as "At Google, marginal improvements are not acceptable" -- a specific, attributed instance of personally rejecting an incremental proposal from a named subordinate and demanding a categorically larger redesign of a core revenue product, not an inference drawn from Google's subsequent success. Held to the real-lean band (not higher) because it rests on one documented episode from one independently-read source, without a second, separately-sourced corroborating instance verified this session.
      achievement_drive: [62, 0.65, "d", "A"],
      // Fortune's Vickie Elmer (April 2011, read in full), drawing on Steven Levy's independently-reported "In the Plex," documents that Page required project updates of roughly 60 words and was actively trimming layers of middle management at Google -- a specific organizational practice, not an inferred management style. The same article quotes Levy's own assessment: "He has a problem with traditional management. He doesn't like it." Scored dual_edged rather than a flat advantage because the same, single, directly-read source ties this same preference to a concrete documented cost: skipping a scheduled investor Q&A session, which the article connects to an 8% stock decline -- the low-bureaucracy, low-external-process preference cutting against him in a specific instance, not a hypothetical downside.
      autonomy_need: [64, 0.6, "d", "D"],
      // On August 10, 2015, Page personally announced (quoted directly in Al Jazeera's independent reporting, read in full) the creation of a new holding-company structure, Alphabet, explicitly to make Google's core search/ads business "cleaner and more accountable" while letting divisions such as Nest and Calico "run things independently that aren't very related" -- a specific, dated, quoted decision to insert a new structural layer separating unrelated business lines, not an inference from how those businesses later performed. Al Jazeera's own independent analysis adds that the restructuring was also read by analysts as addressing Wall Street's demand for segment-level financial transparency -- an outside reading Page did not offer himself, corroborating the decision's structural logic from an independent journalistic perspective. Single-decision basis (however widely covered), so scored in the real-lean rather than extreme band.
      systems_abstraction: [65, 0.62, "d", "A"],
      // The IEEE Engineering and Technology History Wiki's independent "Milestones: PageRank and the Birth of Google" entry (read in full) documents that Page's specific technical contribution was to interpret hyperlinks as referrals/endorsements and recursively derive a page-quality ranking score from that graph structure -- applying citation-analysis-style reasoning to a new domain (the web's link graph). The same entry is explicit that this built on an existing research conversation (prior link-analysis work by Marchiori, Li and Rafsky, and Kleinberg), so this is scored modestly and at moderate confidence, as a specific documented technical synthesis rather than an unprecedented invention -- an honest read of one serious independent institutional source, not inflated by Google's later success.
      intuitive_synthesis: [56, 0.5, "d", "A"],
    },
  },
  {
    id: "p_michael_jordan",
    slug: "michael-jordan",
    canonicalName: "Michael Jordan",
    birthYear: 1963,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["athlete"],
    fieldIds: ["sport"],
    impactDomains: ["athletic", "cultural"],
    tagIds: ["competitor"],
    archetypeIds: ["competitive_performer"],
    externalIdentity: { wikidataId: "Q41421" },
    portrait: {
      url: "/portraits/michael-jordan-lipofsky-1997.jpg",
      source: "Wikimedia Commons (Steve Lipofsky / Basketballphoto.com)",
      license: "Dual-licensed: CC BY-SA 3.0 Unported and GNU Free Documentation License 1.2+; permission statement on file requires credit \"Lipofsky Basketballphoto.com\"",
      width: 1090,
      height: 1600,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      attribution: "Steve Lipofsky, Basketballphoto.com, 1997",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_jordan_wikipedia", kind: "wikipedia", title: "Michael Jordan", url: "https://en.wikipedia.org/wiki/Michael_Jordan" }, { id: "src_jordan_espn_friedell_lastdance", kind: "press", title: "Nick Friedell, \"Michael Jordan, in 'Last Dance,' calls harsh reputation price of winning, leadership\", ESPN, May 11, 2020 -- reports Jordan's own on-record words from 'The Last Dance' (ESPN/Netflix, 2020) alongside independently given, named-teammate reactions", url: "https://www.espn.com/nba/story/_/id/29159653/michael-jordan-calls-harsh-reputation-price-winning-leadership" }, { id: "src_jordan_cbs_perdue", kind: "press", title: "Colin Ward-Henninger, \"'Last Dance' documentary: Bulls' Will Perdue says Michael Jordan punched him, adding 'I wasn't the only one'\", CBS Sports, May 17, 2020 -- independent reporting quoting teammate Will Perdue directly, non-self behavioral testimony", url: "https://www.cbssports.com/nba/news/last-dance-documentary-bulls-will-perdue-says-michael-jordan-punched-him-adding-i-wasnt-the-only-one" }, { id: "src_jordan_espn_truehoop_highschool", kind: "press", title: "Henry Abbott, \"The man who cut Michael Jordan\", ESPN TrueHoop, citing Thomas Lake, Sports Illustrated (Jan 10, 2012) -- independent, fact-checked reporting including coach Clifton \"Pop\" Herring's own account of the JV/varsity decision", url: "https://www.espn.com/blog/truehoop/post/_/id/35291/the-man-who-cut-michael-jordan" }, { id: "src_jordan_espn_isaacson_practice", kind: "press", title: "Melissa Isaacson, \"Play hard, practice harder\", ESPN Chicago, Sep 10, 2009 -- independent reporting with direct, named-source testimony from Bulls assistant coach Johnny Bach and Chicago White Sox batting instructor Walt Hriniak describing Jordan's practice behavior in two different sports", url: "https://www.espn.com/chicago/columns/story?columnist=isaacson_melissa&id=4463664" }],
    rows: {
      // Multiple independent, named, non-self accounts spanning nearly three decades converge on a defining pattern of manufacturing and escalating competition even in low-stakes practice settings: Bulls assistant Johnny Bach's own account of Jordan setting up money-stakes shooting drills against weaker teammates ('I'm calling my pigeons up to shoot'); White Sox batting instructor Walt Hriniak's independent account of Jordan's bleeding-hands practice intensity during his 1994 baseball stint, a sport he was not gifted in, showing the pattern was not specific to basketball or to winning acclaim; and the well-documented 1995 training-camp practice altercation in which Jordan punched Steve Kerr, corroborated independently and consistently by Kerr himself (ESPN, 2020) and separately by teammate Will Perdue's own account of a similar incident ('He did, and I wasn't the only one. That's how competitive our practices were.' -- CBS Sports, 2020). No credible source disputes the underlying pattern; even Jordan's teammates who describe it as excessive agree it was real and sustained.
      competitiveness: [92, 0.82, "d", "D"],
      // Documented as sustaining years of direct interpersonal friction with teammates as a matter of course rather than avoiding it: the 1995 Kerr practice fight and a separate documented practice altercation with Will Perdue (Perdue's own 2020 account, corroborating the pattern rather than a single isolated event -- 'that's how competitive our practices were'), plus teammate B.J. Armstrong's independent account that Jordan 'couldn't have been nice... would be difficult to be around if you didn't truly love the game.' Jordan continued this behavior over multiple seasons rather than moderating it after backlash (including the 1991 publication of an unflattering teammate-sourced account of his conduct), consistent with a genuine, sustained tolerance for ongoing interpersonal conflict rather than a single flashpoint.
      conflict_tolerance: [74, 0.58, "d", "D"],
      // Independently documented across two different sports by two different named, non-self observers in the same account: Bulls assistant Johnny Bach describes Jordan engineering extra, self-initiated shooting repetition beyond required practice; Chicago White Sox instructor Walt Hriniak independently describes Jordan's daily practice sessions during his 1994 minor-league baseball year as so intense his hands bled, in a sport where Jordan had no prior skill or public expectation to perform -- evidence the drive to refine skill was not contingent on being the best or on public competition, which corroborates a genuine mastery orientation rather than pure competitiveness against others (scored separately above).
      mastery_orientation: [74, 0.58, "d", "A"],
      // Two independent named teammates describe Jordan personally driving teammates' standards up through direct, sustained behavior rather than formal authority: Scott Burrell's account of 'playing with a guy that has the highest standards of any basketball player ever... tough love,' and B.J. Armstrong's independent account of the same demanding-by-example dynamic. Jordan's own description ('I pulled people along when they didn't want to be pulled') is self-testimony and is treated here only as corroborating context, not as the basis for the score -- the score rests on the two independent teammate accounts of the behavior itself.
      leadership_drive: [66, 0.48, "s", "D"],
      // A specific, independently fact-checked incident (not merely Jordan's own retelling): as a sophomore he was assigned to junior varsity rather than varsity by coach Clifton 'Pop' Herring, a decision Herring himself later explained as roster/size strategy rather than a skill judgment (Sports Illustrated/ESPN TrueHoop, 2012). Jordan responded by playing sustained, standout junior-varsity basketball that same season. This is a single well-corroborated episode rather than a pattern across his life, so scored in the moderate band rather than higher -- per this rubric's rule that a single documented incident, however well corroborated, does not alone support an extreme score.
      persistence: [64, 0.42, "s", "A"],
    },
  },
  {
    id: "p_salvador_dali",
    slug: "salvador-dali",
    canonicalName: "Salvador Dalí",
    birthYear: 1904,
    deathYear: 1989,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["ES"],
    regionCode: "southern_europe",
    occupationIds: ["painter", "artist"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["nonconformist"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q5577" },
    portrait: {
      url: "/portraits/salvador-dali-gotfryd-1973.jpg",
      source: "Library of Congress (Bernard Gotfryd collection), via Wikimedia Commons",
      license: "Public Domain",
      width: 1081,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Salvador_Dali,_gtfy.01021.tif",
      attribution: "Bernard Gotfryd, 1973",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_dali_wikipedia", kind: "wikipedia", title: "Salvador Dalí", url: "https://en.wikipedia.org/wiki/Salvador_Dal%C3%AD" }, { id: "src_dali_halsman_sothebys", kind: "press", title: "Sotheby's, \"Collector's Item: How Philippe Halsman Befriended Salvador Dalí\" -- independent account (drawing on Halsman family testimony, incl. his daughter) of the 1948 \"Dalí Atomicus\" shoot: ~28 attempts, each requiring the photographer to run upstairs to develop and check a contact print before resetting the whole physical setup (thrown cats, tossed water, suspended furniture, Dalí airborne) and trying again. Describes a mutual, years-long (from 1941) creative partnership -- 'Dalí gave Philippe permission to go crazy and be experimental' -- not merely a single sitting. Non-self, behavioral, independent of Dalí's own testimony.", url: "https://www.sothebys.com/en/articles/collectors-item-how-philippe-halsman-befriended-salvador-dali" }, { id: "src_dali_fundacio_conservation", kind: "institution", title: "Fundació Gala-Salvador Dalí, \"Documenting the Painting Technique\" -- the Dalí foundation's own conservation department describing its technical study of his canvases: infrared reflectography reveals underlying preparatory graphite drawings and pentimenti (visible paint-layer corrections), examined under natural/raking/UV/infrared light and magnification to reconstruct his actual layering and brushwork process. Independent conservator/technical analysis, not self-testimony.", url: "https://www.salvador-dali.org/en/artwork/conservation-and-restoration/documenting-the-painting-technique/" }, { id: "src_dali_pmc_illusion", kind: "archive", title: "Martinez-Conde et al., \"Marvels of Illusion: Illusion and Perception in the Art of Salvador Dalí,\" Frontiers in Human Neuroscience (2015; PMC4586274) -- independent, peer-reviewed neuroscience/art-history analysis. Documents that Dalí 'experimented very carefully with sketching shapes, shading, edge details, and placement to set up the double images' across multiple named works (e.g. analyzing how his choice of hues/shading in The Three Ages leads the eye to group unrelated shapes into a face), i.e. a deliberate, systematic, sustained perceptual-engineering method (his own term: 'paranoiac-critical method'), not an incidental byproduct of talent.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4586274/" }, { id: "src_dali_hitchcock_openculture", kind: "press", title: "Open Culture, \"Alfred Hitchcock Recalls Working with Salvador Dalí on Spellbound\" -- reproduces Hitchcock's own 1962 recorded interview with Francois Truffaut recalling Dalí's proposed imagery for the 1945 dream sequence (a statue cracking open with ants crawling over a Bergman figure underneath; 15 dangling pianos), which studio/production realities ultimately could not accommodate. An independent third party's (Hitchcock's) firsthand account of Dalí's actual creative behavior on a specific project, not Dalí's own self-description.", url: "https://www.openculture.com/2017/05/alfred-hitchcock-remembers-working-with-salvador-dali-on-spellbound.html" }, { id: "src_dali_museum_gala", kind: "institution", title: "The Dalí Museum (St. Petersburg, FL), \"Gala Dalí\" -- independent institutional account describing Gala's role from 1937 on as his business manager, 'responsible for organizing the day-to-day details of life, allowing Dalí to paint,' including that she 'always insisted that he pay careful attention to his technique' and personally selected his paints/varnishes/brushes/frames. Institutional, non-self account of the practical structure around his studio practice.", url: "https://thedali.org/about-the-museum/gala/" }],
    rows: {
      // Two independent, non-self sources document a meticulous, technically exacting working method: the Fundació's own conservators find underlying preparatory graphite drawings and repeated pentimenti (paint-layer corrections) under infrared/UV examination, and the peer-reviewed Martinez-Conde et al. (2015) analysis documents that he 'experimented very carefully with sketching shapes, shading, edge details, and placement' to construct his double-image compositions. Two independent documented instances on-point for the trait -- not scored from his fame or reputation as a technician.
      detail_orientation: [78, 0.65, "d", "A"],
      // Martinez-Conde et al. document, across multiple named paintings (e.g. The Three Ages), his deliberate manipulation of hue, shading value, and spatial placement specifically to control how a viewer's perception groups visual elements -- a well-supported pattern of visually-engineered choices across distinct works from one independent peer-reviewed source, not a single anecdote. Kept at strong_inference (not documented) since it rests on one source's analysis, however detailed.
      aesthetic_sensitivity: [74, 0.58, "s", "A"],
      // Two independent documented instances of active technical experimentation beyond conventional painting: the Dalí Museum's own account of him dipping an actual octopus in paint and pressing its tentacles onto canvas for The Ecumenical Council, and the PMC analysis of his sustained, deliberate development of the double-image ('paranoiac-critical') technique across a body of work. Scored from the specific documented methods, not from 'he was a famous Surrealist' stereotype.
      experimentation: [74, 0.6, "d", "A"],
      // Two independent sources converge: the PMC analysis documents a systematic, career-spanning method purpose-built to generate genuinely novel double/ambiguous imagery, and Hitchcock's own firsthand account (via Truffaut) describes Dalí pitching imagery for Spellbound (ants covering a statue-encased Bergman, 15 dangling pianos) so extreme that the studio could not realize it as proposed. Marked dual_edged, not pure advantage: the same extremity that produced his most original ideas also created real friction -- producer Selznick reportedly demoted Dalí's sequence to production designer William Cameron Menzies, cutting a 20-minute vision to about 2 minutes.
      creative_originality: [80, 0.68, "d", "D"],
      // Halsman's own account (via Sotheby's) describes a genuine years-long (from 1941) creative partnership built on mutual idea exchange -- Halsman would bring Dalí his own 'crazy' ideas knowing Dalí would engage, and Dalí's own 'absurd' pitches were things Halsman 'tried to find a way to make work.' A sustained pattern across many photographs/years from one independent source, not a single sitting -- strong_inference rather than documented since it rests on one account's characterization of the relationship as a whole.
      collaboration: [68, 0.55, "s", "A"],
      // The 'Dalí Atomicus' shoot required roughly 28 discrete attempts, each requiring the entire physical setup (thrown cats, tossed water, suspended furniture, Dalí airborne) to be rebuilt after Halsman ran upstairs to develop and check a contact print. A single specific, well-documented episode from an independent account -- per this rubric's single-anecdote rule, capped in the 56-70 band rather than scored higher despite how vivid the anecdote is.
      persistence: [64, 0.55, "d", "A"],
      // Two independent sources converge on a pattern of protected, sustained studio attention: the Dalí Museum's institutional account of Gala 'organizing the day-to-day details of life, allowing Dalí to paint' (handling business, materials, and household matters specifically so his attention could stay on the canvas), corroborated by the conservation/PMC evidence of the minutely careful, multi-stage technical execution (underdrawing, corrections, deliberate perceptual engineering) his finished paintings actually required. Strong_inference: the sustained-focus trait itself is inferred from what the arrangement and the resulting work both point to, not from a single quote naming it directly.
      deep_focus: [72, 0.55, "s", "A"],
    },
  },
  {
    id: "p_sam_walton",
    slug: "sam-walton",
    canonicalName: "Sam Walton",
    birthYear: 1918,
    deathYear: 1992,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur"],
    fieldIds: ["business"],
    impactDomains: ["entrepreneurial", "wealth_creation"],
    tagIds: [],
    archetypeIds: ["entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q497827" },
    portrait: {
      url: "/portraits/sam-walton-bush41library-1992.jpg",
      source: "Wikimedia Commons, extracted from a George Bush Presidential Library and Museum photograph",
      license: "Public domain (U.S. federal government work, 17 U.S.C. § 105); also marked with the Creative Commons Public Domain Mark 1.0 on Commons",
      width: 768,
      height: 960,
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      attribution: "George Bush Presidential Library and Museum, March 17, 1992",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_walton_wikipedia", kind: "wikipedia", title: "Sam Walton", url: "https://en.wikipedia.org/wiki/Sam_Walton" }, { id: "src_walton_time_huey", kind: "press", title: "John Huey, \"Discounting Dynamo: Sam Walton\", TIME, Dec 7, 1998 -- independent business-journalism retrospective (Huey covered Walton for Fortune during his lifetime), third-person reporting rather than Walton's own memoir", url: "https://time.com/archive/6734187/discounting-dynamo-sam-walton/" }, { id: "src_walton_encyclopedia_arkansas", kind: "institution", title: "\"Samuel Moore Walton (1918-1992)\", Encyclopedia of Arkansas (Central Arkansas Library System) -- independent academic/institutional reference entry", url: "https://encyclopediaofarkansas.net/entries/samuel-moore-walton-1792/" }, { id: "src_walton_abhc_hoover", kind: "press", title: "Gary Hoover, \"How Curiosity and Humility Built the World's Largest Company: the Sam Walton Story\", American Business History Center -- independent business-history essay by a named author/organization, read for corroborating behavioral detail (not treated as a primary citation on its own, since it carries no footnotes)", url: "https://americanbusinesshistory.org/how-curiosity-and-humility-built-the-worlds-largest-company-the-sam-walton-story/" }],
    rows: {
      // Documented as a sustained, decades-long personal habit rather than a one-time behavior: as a young store manager he 'spent every lunch hour' inside a competitor's Sears and Younkers Brothers stores studying their operation, and independently, TIME's John Huey reports he was alerted to discount retailing's whole potential by personally observing Herb Gibson's competing discount stores. The habit continued essentially unchanged after Walmart became the country's largest retailer -- multiple independent accounts describe him personally walking competitor stores (Kmart and others) asking employees detailed operational questions well into his life as a billionaire, not merely in his early career when it might be explained by competitive necessity.
      curiosity: [80, 0.62, "d", "A"],
      // Documented, specific, granular personal review of operational data as a sustained ritual: he personally came in at 3 or 4 a.m. on Saturdays 'to study all the company's weekly numbers' before the Saturday morning manager meeting he had run since 1962. His competitor store visits are independently described as including recording specific prices and measuring display dimensions, not general impressions -- a specific, repeated, hands-on level of factual scrutiny rather than delegated summary review.
      detail_orientation: [76, 0.55, "s", "A"],
      // Independently reported (TIME/Huey) as recognizing discount retailing's commercial potential specifically by observing a competitor, Herb Gibson's stores, years before building Walmart around that model -- a documented, dated instance of spotting an external opportunity through direct personal observation rather than market research or delegated analysis. His own stated philosophy of treating every competitor visit as a source of 'one more good idea' corroborates this as a sustained practice rather than a single lucky insight, though the philosophy statement itself is self-testimony and is treated here as corroboration only, not primary evidence.
      opportunity_sensing: [72, 0.52, "s", "A"],
      // Documented as personally running the Saturday morning manager meeting every week from 1962 onward, including his own early-morning (3-4 a.m.) personal preparation beforehand -- a specific, sustained, decades-long ritual independently described (Encyclopedia of Arkansas; American Business History Center), not an occasional practice. Independently corroborated by his continuing, weekly, in-person store visits by private plane even after the chain had grown to a scale that would have made delegation the ordinary choice.
      discipline: [74, 0.55, "d", "A"],
      // Documented pattern of directly, personally investigating and acting rather than relying on subordinate reports: independently described as flying himself between stores to make unannounced visits, personally introducing himself to staff and customers over the store PA system rather than through management channels, and -- in a separate documented episode -- responding to losing his profitable Newport, Arkansas store lease in 1950 (his landlord declined to renew, wanting the location for his own son) by relocating and personally securing and reopening a new store in Bentonville within eight days (moved May 1, 1950; reopened May 9, 1950, per the Encyclopedia of Arkansas). The speed and directness of that recovery is a specific, dated, corroborated instance rather than a general characterization.
      proactive_agency: [72, 0.5, "s", "A"],
    },
  },
  {
    id: "p_tenzing_norgay",
    slug: "tenzing-norgay",
    canonicalName: "Tenzing Norgay",
    birthYear: 1914,
    deathYear: 1986,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["NP"],
    regionCode: "south_asia",
    occupationIds: ["explorer"],
    fieldIds: ["exploration"],
    impactDomains: ["historical", "athletic"],
    tagIds: ["explorer"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q80732" },
    portrait: {
      url: "/portraits/tenzing-norgay-1963.jpg",
      source: "National Library of Wales (Llyfrgell Genedlaethol Cymru), via Wikimedia Commons",
      license: "CC BY-SA 4.0",
      width: 1280,
      height: 1250,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sherpa_Tensing%27s_visit_to_Snowdonia_(1494240).jpg",
      attribution: "National Library of Wales, 25 April 1963 (\"Sherpa Tensing's visit to Snowdonia\")",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_tenzing_wikipedia", kind: "wikipedia", title: "Tenzing Norgay", url: "https://en.wikipedia.org/wiki/Tenzing_Norgay" }, { id: "src_tenzing_memoir", kind: "archive", title: "Tenzing Norgay with James Ramsey Ullman, Tiger of the Snows / Man of Everest (1955) -- Tenzing's own autobiography, dictated (he could speak several languages but could not read or write) and ghostwritten with Ullman; read in full via Internet Archive's OCR full text. Self-testimony -- one perspective, not sufficient alone, used only for specific, sustained self-described patterns and direct quotes, not as the sole basis for any row.", url: "https://archive.org/stream/dli.pahar.3048/1955%20Tiger%20of%20the%20Snows--the%20autobiography%20of%20Tenzing%20of%20Everest%20by%20Ullman%20s_djvu.txt" }, { id: "src_tenzing_aac_douglas_review", kind: "institution", title: "American Alpine Club Publications, review of Ed Douglas, Tenzing: Hero of Everest (2003) -- an independent, well-researched biography drawing on multiple interviews; read in full via the AAC's published review, which quotes the biography's specific documented facts directly (three major Everest attempts in one year; convergent testimony of multiple Western climbers on Tenzing's ambition; that he 'outlived many of those he began work with'). Non-self, independent perspective.", url: "http://publications.americanalpineclub.org/articles/12200444200/Tenzig-Hero-of-Everest" }, { id: "src_tenzing_jstor_daily", kind: "press", title: "Imogen Lepere, 'Tenzing Norgay: The Mountaineer Who Refused to Be Categorized,' JSTOR Daily (17 July 2023) -- independent journalism drawing on academic sources (Peter H. Hansen, 'Tenzing's Two Wrist-Watches,' Past & Present, 1997; a 1986 India International Centre Quarterly interview with Edmund Hillary; a 1986 Geographical Journal obituary). Non-self, behavioral, opened and read in full.", url: "https://daily.jstor.org/tenzing-norgay-the-mountaineer-who-refused-to-be-categorized" }, { id: "src_tenzing_nepalitimes", kind: "press", title: "Lisa Choegyal, 'Everest 70 years on,' Nepali Times (2023) -- independent journalistic account covering the Khumbu Icefall crevasse incident (Tenzing's rope-arrest of Hillary's fall) and an independent characterization of Tenzing's temperament. Non-self, behavioral, opened and read in full.", url: "https://nepalitimes.com/everest-70-years-on" }],
    rows: {
      // Ed Douglas's biography, quoted at length in the American Alpine Club's published review, documents that Tenzing 'had been the driving force behind three major Everest attempts in the space of a year' (the two 1952 Swiss expeditions plus the 1953 British expedition), and that 'European climbers were surprised to find such ambition among their hired help' -- Tenzing's drive, per multiple Western climbers quoted, 'could exceed their own.' Two or more distinct, independently-verifiable facts (the three-expeditions-in-a-year pattern, and the convergent testimony of multiple named Western climbers) from an independent, well-researched biography -- not self-testimony, not a single anecdote.
      achievement_drive: [82, 0.68, "d", "A"],
      // In his own memoir (Tiger of the Snows, read in full), Tenzing describes a lifelong, pre-1953 orientation toward the mountain itself: 'To climb Everest... is what I have wanted most of all in my life,' and of his early expeditions, 'When I am on Everest I can think of nothing else. I want only to go on, farther and farther.' Self-testimony describing a sustained, decades-long orientation (five prior expeditions/attempts before 1953, per Wikipedia orientation) rather than a single remembered feeling, scored documented per this project's existing convention for a specific, self-described, sustained pattern; not independently corroborated for this specific inner motivation, so held below the top confidence band.
      mastery_orientation: [78, 0.55, "d", "A"],
      // Multiple independent, distinct facts document sustained commitment across repeated danger and failure over roughly two decades: expeditions in 1935, 1936, and 1938 as a high-altitude porter (Wikipedia orientation, corroborated by the AAC's review of Douglas's biography), a failed illegal 1947 summit attempt with Earl Denman, two further Swiss expeditions in 1952, and Douglas's documented observation (via the AAC review) that Tenzing 'outlived many of those he began work with' on Everest, Nanga Parbat, and K2. An independently-verifiable pattern across more than two distinct episodes from more than one source, meeting the corpus-wide objective strong_inference bar.
      persistence: [84, 0.72, "s", "A"],
      // During the 1953 expedition, days before the summit push, Tenzing acted immediately when Hillary broke through ice into a crevasse in the Khumbu Icefall: per Lisa Choegyal's independent account (Nepali Times, 2023), 'Tenzing thrust his ice axe into the snow and wrapped the rope around it,' arresting the fall. A specific, single documented incident -- corroborated in substance across other independent retellings of the same episode -- so capped below the 85+ band per this project's single-incident rule, but a genuinely attributable, non-self, behavioral instance rather than a general reputation.
      decisiveness: [73, 0.55, "d", "A"],
      // Tenzing's own memoir documents his direct reaction to being pulled into the post-summit Nepal/India/Britain credit dispute -- 'Only politics mattered. And I was ashamed' -- alongside his deliberate refusal to take a side: 'Some people call me Nepali, some Indian... For me Indian and Nepali are the same.' Imogen Lepere's independent account (JSTOR Daily, 2023) corroborates that he deliberately avoided specifying flag order or religious details in his own autobiography to avoid inflaming the dispute, and that 'becoming a national hero was certainly not a motivating factor' for him. Scored dual_edged: the same refusal to escalate left him without an advocate in the parallel honors dispute (Hillary and Hunt were knighted; Tenzing received the lower-ranked George Medal).
      conflict_tolerance: [68, 0.58, "d", "D"],
      // Lisa Choegyal's independent account (Nepali Times) describes Tenzing, despite never learning to read or write, as having 'an enquiring mind' and being 'fluent in several languages' -- two distinct, independently-stated facts (the multilingualism itself, acquired without formal schooling, and the direct characterization of an enquiring mind) from a source other than Tenzing himself, supporting strong_inference rather than a bare inference from a single adjective.
      curiosity: [60, 0.45, "s", "A"],
    },
  },
];

export const ROSTER_35: readonly Person[] = seeds.map(build);
