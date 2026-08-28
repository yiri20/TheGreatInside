/**
 * ROSTER 3 — first roster-1000 real expansion batch (16 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster3.ts` — see that script and
 * `docs/roster-1000-checkpoint.md` for the full pipeline. Every score's
 * rationale is preserved as the inline comment immediately above its Row,
 * the same evidence-audit-trail discipline `seed.ts`/`roster2.ts` already
 * use. Follows `docs/scoring-rubric-v1.md` throughout — see each entry's
 * own comments for the evidence basis of every score.
 *
 * Korean display names for these 16 people were added to `person.name.*`
 * in `src/core/i18n/ko.ts` in the same batch — see that file's roster-1000
 * section.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_albert_einstein",
    slug: "albert-einstein",
    canonicalName: "Albert Einstein",
    birthYear: 1879,
    deathYear: 1955,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["DE", "CH", "US"],
    regionCode: "western_europe",
    occupationIds: ["physicist"],
    fieldIds: ["physics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["independent", "theorist", "nonconformist"],
    archetypeIds: ["scientific_explorer", "independent_creator"],
    externalIdentity: { wikidataId: "Q937" },
    sources: [{ id: "src_einstein_wikipedia", kind: "wikipedia", title: "Albert Einstein", url: "https://en.wikipedia.org/wiki/Albert_Einstein" }, { id: "src_einstein_isaacson", kind: "biography", title: "Walter Isaacson, Einstein: His Life and Universe (2007)" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: Underwood
    // & Underwood, New York, April 1921. Public domain (published before
    // 1931, no renewal).
    portrait: {
      url: "/portraits/albert-einstein-1921.jpg",
      width: 600,
      height: 969,
      source: "Wikimedia Commons",
      license: "Public Domain (published before 1931)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Albert_Einstein_photo_1921.jpg",
      attribution: "Underwood & Underwood, New York, April 1921",
    },
    rows: {
      // His own autobiographical notes describe being struck as a child by a compass needle always pointing the same direction — a specific, cited origin he himself repeatedly credited for his later scientific curiosity.
      curiosity: [88, 0.75, "d", "A"],
      // General relativity's field equations required rigorous tensor mathematics developed over roughly a decade — documented via the surviving working papers Isaacson traces in detail.
      analytical_rigor: [90, 0.8, "d", "A"],
      // Documented thought experiments (imagining riding alongside a light beam) that he himself described as the intuitive seed of special relativity, later formalized mathematically — a well-corroborated pattern across multiple of his own accounts.
      intuitive_synthesis: [94, 0.82, "d", "A"],
      // Special and general relativity unify space, time, and gravitation into one mathematical framework — documented via the theories themselves and their reception.
      systems_abstraction: [92, 0.8, "d", "A"],
      // Developed special relativity in 1905 while working as a patent clerk, outside any university research position or established physics community — documented, unusual circumstance corroborated by multiple biographies.
      independent_thinking: [86, 0.72, "d", "A"],
      // Maintained sustained, public objection to quantum mechanics' probabilistic interpretation for the rest of his life ('God does not play dice'), continuing to press the EPR paradox against Bohr's counterarguments even as the mainstream physics community moved on — a well-documented, decades-long instance of not revising a position under repeated challenge.
      belief_updating: [26, 0.72, "d", "R"],
      // Special and general relativity, and the light-quantum hypothesis explaining the photoelectric effect, are each independently original theoretical contributions, not incremental extensions — documented via their reception as genuine breaks from prior physics.
      creative_originality: [90, 0.78, "d", "A"],
      // Primarily a theorist rather than an experimentalist throughout his career — he proposed tests (e.g. the 1919 gravitational-lensing eclipse observation) but did not personally conduct them. Scored moderately-low rather than assumed high, avoiding the halo-effect trap of inferring experimental skill from overall scientific reputation.
      experimentation: [42, 0.5, "i", "N"],
      // Work concentrated almost entirely within physics; later political engagement (nuclear policy, civil rights) is real but is activism rather than a second domain of technical output, so scored moderately rather than high.
      cross_domain_range: [55, 0.45, "i", "N"],
      // Maintained full-time patent-office employment while producing four major physics papers in 1905 (the 'miracle year') in his own time — documented via dated publication records.
      discipline: [85, 0.7, "d", "A"],
      // The decade-long, iterative development of general relativity (1905-1915), including multiple documented false starts and abandoned approaches Isaacson traces from his notebooks, evidences sustained single-problem engagement.
      deep_focus: [82, 0.68, "d", "A"],
      // Produced four separate groundbreaking papers (special relativity, the photoelectric effect, Brownian motion, mass-energy equivalence) within calendar year 1905 alone — a specific, well-documented, unusually fast output.
      execution_speed: [88, 0.75, "d", "A"],
      // The systematic, iterative mathematical development of general relativity over a decade suggests real structural effort, though the historical record (multiple abandoned approaches) also shows meaningful trial-and-error rather than a single clean plan — scored moderately rather than high.
      planning_orientation: [65, 0.52, "s", "N"],
      // Continued refining general relativity through multiple documented dead ends across roughly ten years (1905-1915) before reaching the final field equations.
      persistence: [88, 0.72, "d", "A"],
      // Published theoretically radical, career-unproven ideas as an unknown outside academia rather than pursuing a safer conventional research path — a real but moderately-evidenced pattern.
      risk_tolerance: [68, 0.52, "s", "A"],
      // Later-life public political statements (nuclear policy letters, civil rights advocacy alongside Paul Robeson) evidence a real, if not extreme, willingness toward public assertion beyond his scientific work.
      social_assertiveness: [62, 0.5, "s", "N"],
      // Worked closely with mathematician Marcel Grossmann on the tensor calculus underlying general relativity, but core theoretical insights were predominantly solo — a genuinely mixed pattern, scored toward the center rather than forced to one pole.
      collaboration: [55, 0.45, "i", "N"],
      // The 1939 Einstein-Szilard letter to President Roosevelt is documented to have directly contributed to launching the Manhattan Project — a specific, historically significant instance of persuasive influence, though a single (if major) event.
      persuasiveness: [68, 0.55, "d", "A"],
      // Sustained the public Bohr-Einstein debates over quantum mechanics' foundations across decades and multiple international conferences, continuing even as his position became a minority one — documented, willing engagement rather than withdrawal.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Pursued an unsuccessful unified field theory for the last several decades of his life, well after his reputation was secure and as mainstream physics moved toward quantum field theory instead — documented pursuit with no external reward or peer validation, strong evidence against a fame-driven or outcome-driven reading.
      mastery_orientation: [82, 0.65, "d", "A"],
      // Both the 1905 papers and much of the unified-field-theory period were pursued largely independently of any research group or institutional direction.
      autonomy_need: [70, 0.55, "s", "A"],
      // Sustained public political engagement in his later decades (nuclear disarmament advocacy, civil rights statements) beyond his scientific work evidences motivation toward broader real-world effect, documented via his own public letters and statements.
      impact_motivation: [70, 0.55, "d", "A"],
      // Self-initiated the 1939 letter to Roosevelt warning of nuclear weapons potential without being asked by any government body — a specific, well-corroborated, self-initiated action, capped at this band as a single (if major) instance rather than a repeated pattern.
      proactive_agency: [74, 0.58, "d", "A"],
    },
  },
  {
    id: "p_charles_darwin",
    slug: "charles-darwin",
    canonicalName: "Charles Darwin",
    birthYear: 1809,
    deathYear: 1882,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["naturalist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["patient", "systematic_thinker", "cross_disciplinary"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q1035" },
    sources: [{ id: "src_darwin_wikipedia", kind: "wikipedia", title: "Charles Darwin", url: "https://en.wikipedia.org/wiki/Charles_Darwin" }, { id: "src_darwin_correspondence", kind: "archive", title: "Darwin Correspondence Project" }, { id: "src_darwin_browne", kind: "biography", title: "Janet Browne, Charles Darwin: A Biography (1995-2002)" }],
    // Verified 2026-08 via a direct fetch of the Commons file page:
    // photograph by Julia Margaret Cameron, 1869. Public domain (artist
    // died 1879).
    // Portrait Reliability Localization Batch 2 (2026-08): the largest
    // remaining remote source file among the 39 (4.6MB) -- selected for
    // preventive weight reduction, not a confirmed ORB failure. Re-hosted
    // locally at public/portraits/charles-darwin-cameron-1869.jpg --
    // resized to a 1600px longest side + mozjpeg quality-85 re-encode
    // (lanczos3, no sharpening/upscale/crop/AI processing): 3256x4183/
    // 4.6MB -> 1245x1600/145KB (96.8% smaller). licenseUrl still points
    // to the live Commons file page.
    portrait: {
      url: "/portraits/charles-darwin-cameron-1869.jpg",
      width: 1245,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain (artist died 1879)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Charles_Darwin_01.jpg",
      attribution: "Julia Margaret Cameron, 1869",
    },
    rows: {
      // Five-year HMS Beagle voyage collecting specimens across multiple continents, followed by decades of independent follow-up investigation (barnacles, orchids, earthworms) with no external requirement to continue — documented, sustained, multi-decade.
      curiosity: [92, 0.85, "d", "A"],
      // On the Origin of Species builds its case through systematic, chapter-by-chapter accumulation of independent lines of evidence (breeding, geographic distribution, the fossil record) rather than a single argument.
      analytical_rigor: [84, 0.72, "d", "A"],
      // Synthesized Malthusian population theory with his own variation observations into natural selection — a documented synthesis across previously separate bodies of evidence, though the exact moment is better understood as gradual refinement over years than a single flash, hence strong_inference.
      intuitive_synthesis: [76, 0.62, "s", "A"],
      // Natural selection is a general explanatory framework applied across geology, botany, and zoology in Origin, not a domain-specific finding.
      systems_abstraction: [88, 0.75, "d", "A"],
      // Developed a theory that directly contradicted the dominant religious and scientific consensus of his time, independently of needing prior validation — documented via the content and reception of Origin itself.
      independent_thinking: [78, 0.65, "s", "A"],
      // Substantively revised On the Origin of Species across six editions in direct response to specific criticisms (e.g. St. George Mivart's objections) — a documented, unusually clear positive case, in contrast to more defensive contemporaries.
      belief_updating: [78, 0.68, "d", "A"],
      // Natural selection as a mechanism was a genuinely original theoretical contribution, independently and near-simultaneously arrived at by only one other person (Wallace) working separately — documented via the historical record of the joint 1858 presentation.
      creative_originality: [84, 0.7, "d", "A"],
      // Conducted specific, cited experiments at Down House — testing seed survival after prolonged seawater immersion to test dispersal theories, and controlled orchid-pollination studies — not merely observational natural history.
      experimentation: [82, 0.68, "d", "A"],
      // Serious, published work spanning geology (coral reef formation), zoology (barnacles — an 8-year monograph), botany (orchids, climbing plants), and psychology (The Expression of the Emotions) — documented range with real output in each, not dabbling.
      cross_domain_range: [86, 0.7, "d", "A"],
      // Accumulated evidence for roughly 20 years before publishing Origin, by his own documented account, specifically to build an exhaustive rather than merely sufficient case.
      discipline: [88, 0.75, "d", "A"],
      // The 8-year barnacle monograph and the decades-long earthworm study (his final book) both evidence sustained single-subject absorption well past ordinary requirements.
      deep_focus: [80, 0.65, "s", "A"],
      // Continued the earthworm research into his final years, decades after Origin had already secured his reputation, driven by the same evidence-gathering habit rather than external necessity.
      persistence: [88, 0.75, "d", "A"],
      // Documented in his own letters (describing publishing his theory as feeling 'like confessing a murder') — delayed publication for roughly 20 years substantially out of anxiety about religious and social backlash, only publishing when Wallace's independent letter forced the issue. A genuine, evidenced LOW score, not assumed from his eventual fame.
      risk_tolerance: [32, 0.62, "d", "R"],
      // Origin's case-by-case accumulation of independent evidence lines, built up methodically over two decades, evidences deliberate structural planning of the argument itself.
      planning_orientation: [76, 0.62, "s", "A"],
      // Revised his working theory's presentation and emphasis across editions in response to specific new objections — distinct from belief_updating in that this is about adjusting approach/argument structure rather than the core scientific claim itself.
      adaptability: [68, 0.55, "s", "A"],
      // Origin includes a chapter titled 'Difficulties on Theory' openly cataloguing the theory's own unresolved weaknesses (the sparse fossil record, complex organs like the eye) rather than omitting or minimizing them — a documented, unusual willingness to publish alongside acknowledged open problems.
      ambiguity_tolerance: [80, 0.65, "d", "A"],
      // Did not personally attend or participate in the famous 1860 Oxford evolution debate, letting Thomas Huxley argue publicly on his behalf — a specific, well-documented instance consistent with his broader, chronic-illness-linked avoidance of public confrontation.
      social_assertiveness: [32, 0.55, "d", "N"],
      // Maintained a correspondence network of thousands of letters exchanging specimens, observations, and data with naturalists worldwide (documented and archived by the Darwin Correspondence Project) — a genuinely large-scale, sustained collaborative practice.
      collaboration: [82, 0.7, "d", "A"],
      // Same Oxford-debate absence, plus broader documented pattern (Browne) of avoiding direct public confrontation over his theory, delegating that role to Huxley and others — a real, evidenced low score, not merely thin evidence defaulting to 50.
      conflict_tolerance: [30, 0.55, "d", "R"],
      // Wrote a dedicated book on earthworms as his final major work, decades after his reputation was already secure, purely from continued interest in the subject.
      mastery_orientation: [85, 0.7, "d", "A"],
      // Worked primarily from home at Down House for most of his career, a real but moderate pattern given his simultaneously extensive collaborative correspondence — scored toward the center given the genuinely mixed solitary-work/wide-network evidence.
      autonomy_need: [58, 0.48, "i", "N"],
      // Ran pigeon-breeding and plant-growth experiments with home-built, modest equipment at Down House rather than institutional laboratory resources — a real but singular, moderately-documented pattern.
      resourcefulness: [62, 0.48, "i", "N"],
      // When Alfred Russel Wallace independently arrived at a similar theory, Darwin's colleagues arranged a joint 1858 presentation crediting both, rather than Darwin moving to claim sole priority — a documented, genuinely low-competitiveness instance, in real contrast to the Newton/Galileo priority disputes.
      competitiveness: [28, 0.55, "d", "A"],
    },
  },
  {
    id: "p_ernest_shackleton",
    slug: "ernest-shackleton",
    canonicalName: "Ernest Shackleton",
    birthYear: 1874,
    deathYear: 1922,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["IE", "GB"],
    regionCode: "western_europe",
    occupationIds: ["explorer"],
    fieldIds: ["exploration"],
    impactDomains: ["historical", "educational"],
    tagIds: ["explorer", "leader", "overcame_adversity"],
    archetypeIds: ["organizational_leader", "independent_creator"],
    externalIdentity: { wikidataId: "Q957543" },
    // Portrait Sourcing Batch 1 (2026-08): the Commons original is a scan of
    // the entire mounted print (tan card mount plus Shackleton's own
    // handwritten signature beneath the photo), which reads poorly at both
    // Profile hero and PersonCard sizes — face small, pushed toward the top
    // edge, dominated by dead mount-board space. No pre-cropped derivative
    // exists on Commons (checked). Hosted locally at
    // public/portraits/ernest-shackleton-hurley-1916-cropped.jpg: a plain
    // non-destructive rectangular crop isolating the photographic image
    // itself (no facial content altered, no AI enhancement) — see
    // licenseUrl for the unmodified original. Underlying photograph remains
    // Public Domain; a mechanical crop creates no new copyright.
    portrait: {
      url: "/portraits/ernest-shackleton-hurley-1916-cropped.jpg",
      width: 850,
      height: 1136,
      source: "Wikimedia Commons (cropped for this app from the original scan)",
      license: "Public Domain (life+70 or fewer)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Shakleton_by_Hurley,_1916.jpg",
      attribution: "Frank Hurley, 1916 — the expedition's own official photographer; cropped by this project from the full mounted print to remove the card mount and signature",
    },
    sources: [{ id: "src_shackleton_wikipedia", kind: "wikipedia", title: "Ernest Shackleton", url: "https://en.wikipedia.org/wiki/Ernest_Shackleton" }, { id: "src_shackleton_lansing", kind: "biography", title: "Alfred Lansing, Endurance: Shackleton's Incredible Voyage (1959)" }],
    rows: {
      // Led the 1914-1917 Imperial Trans-Antarctic Expedition, keeping all 28 crew members alive for nearly two years after their ship Endurance was crushed by pack ice — one of the most extensively documented leadership case studies in exploration history, corroborated by multiple crew members' own diaries.
      leadership_drive: [94, 0.85, "d", "A"],
      // Sustained the crew through ice-camp survival, then an 800-mile open-boat journey to South Georgia, then an unprecedented overland crossing of South Georgia's mountains — a documented, multi-stage ordeal lasting nearly two years without giving up on any stage.
      persistence: [92, 0.8, "d", "A"],
      // Undertook Antarctic exploration in an era when prior expeditions (including Scott's, in the same period) had resulted in death; personally led the extremely hazardous 800-mile open-boat journey rather than remaining with the main party — though this is tempered by his separately documented 1909 decision to turn back 97 miles from the South Pole specifically to preserve his team's survival, suggesting calculated rather than reckless risk-taking.
      risk_tolerance: [76, 0.62, "d", "A"],
      // The 1909 decision to turn back within 97 miles of the South Pole, and the later decision to abandon the crushed Endurance and establish an ice camp rather than delay, are both specific, well-documented, high-stakes decisions made under direct time pressure.
      decisiveness: [85, 0.7, "d", "A"],
      // The original expedition goal (crossing Antarctica overland) became entirely impossible once Endurance was lost; the entire survival plan that followed was improvised in response to changing conditions across nearly two years, documented in detail by Lansing from surviving crew diaries.
      adaptability: [90, 0.78, "d", "A"],
      // Maintained crew cohesion and morale through nearly two years of extreme hardship with zero fatalities — a documented outcome directly attributed by multiple surviving crew members' own accounts to his deliberate efforts at maintaining group cohesion.
      collaboration: [82, 0.68, "d", "A"],
      // Personally undertook the 800-mile open-boat journey to South Georgia with five companions rather than waiting passively for rescue — a specific, self-initiated, extraordinarily dangerous action, well documented.
      proactive_agency: [88, 0.72, "d", "A"],
      // The original Trans-Antarctic Expedition plan failed entirely once the ship was lost — his documented strength was adaptive improvisation under crisis rather than the advance planning itself, scored moderately rather than assumed high from his overall leadership reputation.
      planning_orientation: [52, 0.48, "i", "N"],
      // Documented to have maintained strict daily routines (mealtimes, watch schedules, tasks) for the crew during the ice-camp period specifically to preserve structure and morale during an indefinite wait.
      discipline: [78, 0.6, "d", "A"],
      // Sustained crew loyalty and continued cooperation through extreme, prolonged hardship, corroborated after the fact by multiple crew members' own accounts praising his leadership specifically — real persuasive influence under duress, not merely formal authority.
      persuasiveness: [70, 0.55, "s", "A"],
      // Documented (Lansing) to have deliberately kept a crew member who was reportedly more critical of him in closer proximity during the ordeal, specifically to monitor and manage potential dissent rather than avoid the tension.
      conflict_tolerance: [62, 0.5, "s", "A"],
      // The crew repaired lifeboats, improvised navigation across open ocean using minimal instruments to hit the small target of South Georgia, and adapted salvaged materials for survival throughout — extensively documented, sustained improvisation, not a single instance.
      resourcefulness: [90, 0.75, "d", "A"],
      // Correctly assessed Elephant Island and then South Georgia as the most viable rescue targets from among the limited real options available during the crisis.
      opportunity_sensing: [68, 0.52, "s", "A"],
      // Pursued the Trans-Antarctic crossing specifically because the South Pole itself had already been reached by Amundsen and Scott — a real but moderately-evidenced next-achievement orientation.
      competitiveness: [55, 0.45, "i", "N"],
      // Chose survival strategies during the ordeal (e.g. marching toward open water rather than waiting in place) that departed from some conventional polar-expedition wisdom of the era.
      independent_thinking: [65, 0.5, "s", "A"],
      // Moved quickly to abandon ship and establish an ice camp once it became clear Endurance could not be saved, rather than delaying the decision.
      execution_speed: [68, 0.52, "s", "A"],
      // Ship's log and crew accounts document careful rationing and tracking of dwindling supplies throughout the ordeal.
      detail_orientation: [60, 0.48, "i", "A"],
      // His documented achievement is concentrated entirely within polar exploration and expedition leadership — a genuinely low, honestly-scored range, not a scholar or scientist across multiple domains.
      cross_domain_range: [28, 0.5, "i", "N"],
      // Lansing documents his deliberate practice of personally engaging each crew member individually to maintain morale and cohesion throughout the ordeal, rather than leading only at a distance — a specific, sustained pattern corroborated across multiple crew members' own diaries.
      social_assertiveness: [84, 0.68, "d", "A"],
      // The improvised survival solutions across the ordeal (converting lifeboats for an open-ocean crossing, navigating without standard instruments) required genuinely original problem-solving under crisis, beyond routine resourcefulness in applying known methods.
      creative_originality: [65, 0.52, "s", "A"],
      // The documented emphasis on improvisation and adaptive problem-solving under crisis, rather than insistence on an ideal solution, suggests a moderate-to-low rather than high perfectionism — scored honestly rather than assumed high from his overall competence.
      perfectionism: [45, 0.42, "i", "N"],
    },
  },
  {
    id: "p_frederick_douglass",
    slug: "frederick-douglass",
    canonicalName: "Frederick Douglass",
    birthYear: 1818,
    deathYear: 1895,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer", "political_activist", "statesman"],
    fieldIds: ["civil_rights", "politics", "literature"],
    impactDomains: ["social", "historical", "literary"],
    tagIds: ["self_taught", "overcame_adversity", "advocate"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q215562" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB in the roster-wide reliability audit. Root
    // cause resolved via the MediaWiki API (imageinfo): Wikimedia's storage
    // hash-path for this file changed since it was first sourced (old path
    // 7/72/, current c/c5/) -- the stored URL was pointing at a stale path
    // that now 404s from Wikimedia's own Swift storage, not a deleted or
    // replaced file. Identity verified via the API before downloading:
    // same file title/page, same 2089x3000 source dimensions. Re-hosted
    // locally at public/portraits/frederick-douglass-circa-1879.jpg --
    // resized to a 1600px longest side + mozjpeg quality-85 re-encode
    // (lanczos3, no sharpening/upscale/crop/AI processing): 2089x3000/
    // 1.2MB -> 1114x1600/242KB (79.3% smaller). licenseUrl still points to
    // the live Commons file page.
    portrait: {
      url: "/portraits/frederick-douglass-circa-1879.jpg",
      width: 1114,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Frederick_Douglass_(circa_1879).jpg",
      attribution: "George Kendall Warren, circa 1879, US National Archives (NAID 558770), Public Domain",
    },
    sources: [{ id: "src_douglass_wikipedia", kind: "wikipedia", title: "Frederick Douglass", url: "https://en.wikipedia.org/wiki/Frederick_Douglass" }, { id: "src_douglass_narrative", kind: "archive", title: "Frederick Douglass, Narrative of the Life of Frederick Douglass, an American Slave (1845)" }, { id: "src_douglass_blight", kind: "biography", title: "David Blight, Frederick Douglass: Prophet of Freedom (2018)" }],
    rows: {
      // Documented in his own narrative: taught himself to read as an enslaved child by trading bread for reading lessons from poor white children and by studying discarded newspapers, in direct defiance of laws prohibiting it.
      curiosity: [88, 0.78, "d", "A"],
      // Publicly broke with William Lloyd Garrison's abolitionist faction over whether the U.S. Constitution should be read as pro- or anti-slavery, a documented and consequential split within the movement he had long been part of.
      independent_thinking: [82, 0.7, "d", "A"],
      // Became one of the most sought-after orators of his era on both sides of the Atlantic, and his 1845 Narrative was an immediate bestseller — documented, sustained public rhetorical effect, not a single speech.
      persuasiveness: [92, 0.82, "d", "A"],
      // Escaped slavery in 1838 using a borrowed sailor's protection papers, a documented action carrying severe, well-known legal and physical consequences if recaptured.
      risk_tolerance: [90, 0.78, "d", "A"],
      // Continued public speaking and writing across decades despite documented instances of mob violence at his lectures, including a specific 1843 incident in Pendleton, Indiana, where he was beaten by a mob.
      persistence: [85, 0.72, "d", "A"],
      // Engineered his own escape using a borrowed sailor's identification papers and disguise, a specific, well-corroborated historical method — capped below the extreme band as a single (if major) documented instance.
      resourcefulness: [80, 0.65, "d", "A"],
      // Documented account of practicing writing by copying letters from timber markings at a shipyard and from a young boy's used copybooks, sustained over an extended period while enslaved.
      discipline: [82, 0.68, "d", "A"],
      // Met directly with President Lincoln on two documented occasions to advocate for equal pay and treatment of Black Union soldiers — a specific, corroborated instance of direct engagement with the highest levels of power.
      social_assertiveness: [84, 0.7, "d", "A"],
      // Founded and edited the abolitionist newspaper The North Star and later held federal appointments (Recorder of Deeds for D.C., Minister Resident to Haiti) — documented, sustained institutional leadership across multiple roles.
      leadership_drive: [85, 0.72, "d", "A"],
      // Sustained a public, years-long disagreement with Garrison and later with women's suffrage allies over the prioritization of Black male suffrage in the 15th Amendment debate — documented willingness to remain in prolonged public disagreement with former allies.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Worked closely with Susan B. Anthony and Elizabeth Cady Stanton on women's suffrage, attending the 1848 Seneca Falls Convention, but this same alliance later fractured over the 15th Amendment priority dispute — genuinely mixed, documented evidence in both directions, scored moderately rather than forced to one pole.
      collaboration: [62, 0.52, "s", "D"],
      // Documented reinvention across markedly different roles over his lifetime — fugitive, newspaper publisher, internationally touring orator, federal officeholder, and diplomat — each requiring genuinely different skills.
      adaptability: [80, 0.65, "d", "A"],
      // Real, sustained output across journalism (The North Star), autobiography (three separate published autobiographies across his life), oratory, and formal diplomacy — documented range with real output in each.
      cross_domain_range: [78, 0.62, "d", "A"],
      // His escape from slavery was explicitly, by his own repeated written account, driven by the pursuit of self-determination — directly documented in his own words across all three autobiographies.
      autonomy_need: [82, 0.68, "d", "A"],
      // Actively recruited Black soldiers for the Union Army (including his own sons) and initiated direct meetings with Lincoln to advocate for their equal treatment, rather than waiting to be consulted — documented, self-initiated action.
      proactive_agency: [84, 0.7, "d", "A"],
      // Recognized the Civil War as a strategic opening to advance emancipation and actively lobbied Lincoln's administration accordingly, rather than treating the war as separate from the abolitionist cause.
      opportunity_sensing: [68, 0.52, "s", "A"],
      // Continued refining his oratorical and written craft across decades and three successive autobiographies, each substantially rewritten rather than simply reissued, evidencing ongoing self-improvement beyond what any single publication required.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Originally held Garrison's view that the Constitution was inherently pro-slavery, then documented publicly revised this position (influenced by Lysander Spooner's legal arguments) to conclude it could be read as an anti-slavery document and used as a political tool — a specific, well-documented instance of a substantial, reasoned position change.
      belief_updating: [74, 0.62, "d", "A"],
      // His narrative writing style and rhetorical approach were influential on the slave-narrative genre, though this is a more modest, secondary claim relative to his primary documented strengths in oratory and advocacy.
      creative_originality: [62, 0.5, "s", "A"],
      // His 1838 escape was documented to involve deliberate preparation — securing borrowed sailor's protection papers in advance and timing the journey around a specific train and boat schedule — rather than an impulsive flight.
      planning_orientation: [78, 0.62, "d", "A"],
      // His own narrative documents a pivotal, specific physical confrontation with the slave-breaker Edward Covey, which he described as a deliberate decision to resist and prevail rather than submit — a well-corroborated, central episode across his own three autobiographies, not a single unverified anecdote.
      competitiveness: [62, 0.5, "d", "A"],
    },
  },
  {
    id: "p_galileo_galilei",
    slug: "galileo-galilei",
    canonicalName: "Galileo Galilei",
    birthYear: 1564,
    deathYear: 1642,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["IT"],
    regionCode: "southern_europe",
    occupationIds: ["astronomer", "physicist"],
    fieldIds: ["physics", "natural_science"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["nonconformist", "self_taught", "innovator"],
    archetypeIds: ["scientific_explorer", "independent_creator"],
    externalIdentity: { wikidataId: "Q307" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB (HTTP 400) in the roster-wide reliability
    // audit. The stored URL was a /thumb/ rendition path (2500px-wide
    // derivative), which the MediaWiki API's imageinfo resolved to a
    // simpler, more stable full-original path (d/d4/) -- same file title/
    // page, same 2500x3176 source dimensions, verified before downloading.
    // Re-hosted locally at public/portraits/galileo-galilei-sustermans-1636.jpg
    // -- resized to a 1600px longest side + mozjpeg quality-85 re-encode
    // (lanczos3, no sharpening/upscale/crop/AI processing): 2500x3176/
    // 785KB -> 1259x1600/351KB (55.3% smaller). licenseUrl still points to
    // the live Commons file page.
    portrait: {
      url: "/portraits/galileo-galilei-sustermans-1636.jpg",
      width: 1259,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Justus_Sustermans_-_Portrait_of_Galileo_Galilei,_1636.jpg",
      attribution: "Painted by Justus Sustermans, 1636, National Maritime Museum, Greenwich, Public Domain",
    },
    sources: [{ id: "src_galileo_wikipedia", kind: "wikipedia", title: "Galileo Galilei", url: "https://en.wikipedia.org/wiki/Galileo_Galilei" }, { id: "src_galileo_drake", kind: "biography", title: "Stillman Drake, Galileo at Work: His Scientific Biography (1978)" }],
    rows: {
      // On hearing secondhand reports of a Dutch spyglass, built and improved his own within months and immediately turned it skyward rather than only toward the terrestrial/military uses it was marketed for — documented, specific instance.
      curiosity: [88, 0.75, "d", "A"],
      // Inclined-plane and pendulum experiments produced quantitative, repeatable measurements of motion (Drake), a documented quantitative methodology distinct from qualitative Aristotelian physics.
      analytical_rigor: [82, 0.68, "d", "A"],
      // Connected independent telescopic observations (Jupiter's moons, Venus's phases) into a single coherent argument for heliocentrism in Sidereus Nuncius and the Dialogue — documented synthesis across separate observational threads.
      intuitive_synthesis: [78, 0.65, "d", "A"],
      // Continued publicly advocating heliocentrism after the Church's explicit 1616 injunction against teaching it, leading directly to his 1633 trial — an extraordinarily well-documented, sustained instance of holding a position against direct authority.
      independent_thinking: [90, 0.8, "d", "R"],
      // Documented resistance to Kepler's elliptical-orbit model even after Kepler published supporting evidence, continuing to favor circular orbits — a specific, corroborated instance of not revising a view under new evidence.
      belief_updating: [38, 0.55, "s", "N"],
      // Applying a novel instrument (the improved telescope) systematically to astronomical observation, rather than only the marketed military/nautical use, was a genuinely original methodological move, though it built on an existing invention rather than inventing from nothing.
      creative_originality: [72, 0.58, "s", "A"],
      // Inclined-plane experiments measuring falling-body acceleration are specific, documented, and repeated across Drake's reconstruction of his notebooks.
      experimentation: [85, 0.72, "d", "A"],
      // Worked across astronomy, kinematics, and applied instrument-making (the military/geometric compass he sold), a real but more modest range than some peers — moderate band, not extreme.
      cross_domain_range: [60, 0.5, "s", "N"],
      // Sustained, systematic nightly observation logs underlying Sidereus Nuncius (1610), published within months of first observing — evidences a disciplined observational routine.
      discipline: [74, 0.58, "s", "A"],
      // Same sustained observational campaign; documented but a single (if extended) instance rather than a lifelong pattern verified across multiple independent episodes.
      deep_focus: [70, 0.55, "s", "A"],
      // Published the Dialogue Concerning the Two Chief World Systems (1632) after an explicit prior warning, with the direct, documented consequence of trial and house arrest — among the best-documented risk-taking instances in the history of science.
      risk_tolerance: [88, 0.8, "d", "R"],
      // Continued advocating and publishing heliocentric arguments across decades despite escalating institutional pressure, up to the point of formal trial.
      persistence: [80, 0.68, "d", "A"],
      // Sustained public disputes with Church authorities and rival astronomers (the Grassi comet dispute, the sunspot-priority dispute with Christoph Scheiner) — documented pattern of engaging rather than avoiding conflict.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Wrote the Dialogue in vernacular Italian rather than scholarly Latin specifically to reach a wider public, and structured it as a pointed rhetorical dialogue including a character widely read as mocking a prior Church-aligned position — a documented, deliberately provocative communication choice.
      social_assertiveness: [76, 0.6, "s", "R"],
      // The Dialogue's accessible, dialogue-format structure was a deliberate rhetorical strategy to persuade a lay audience, documented via his own prefatory remarks and its wide contemporary readership.
      persuasiveness: [72, 0.55, "s", "A"],
      // Continued refining observational technique and instrument quality well beyond what any single publication required, documented across his working notebooks.
      mastery_orientation: [78, 0.6, "s", "A"],
      // The public priority dispute with Scheiner over sunspot observations, and his rush to publish Sidereus Nuncius before others could claim the same telescopic discoveries, show real priority-consciousness — a moderate, not extreme, documented pattern.
      competitiveness: [66, 0.52, "s", "N"],
      // Documented letters show him actively petitioning the Medici court for a position specifically to escape university teaching obligations and gain more independent research time.
      autonomy_need: [68, 0.55, "s", "A"],
      // Reconstructed and substantially improved the telescope from only secondhand description of the Dutch design, without access to an actual example — a specific, well-documented instance of resourceful technical improvisation.
      resourcefulness: [80, 0.65, "d", "A"],
      // Recognized the telescope's scientific (not just military/nautical) potential immediately on hearing of it secondhand, and acted within months — a clear, documented, fast recognition-and-action instance.
      opportunity_sensing: [82, 0.65, "d", "A"],
      // Self-initiated the Medici court petition and the rapid telescope-improvement effort without being asked by any patron or institution — documented via his own correspondence.
      proactive_agency: [70, 0.55, "s", "A"],
      // Built an improved telescope within months of hearing about the concept and published Sidereus Nuncius within about a year of first observations — a documented, fast turnaround.
      execution_speed: [78, 0.6, "d", "A"],
    },
  },
  {
    id: "p_hildegard_of_bingen",
    slug: "hildegard-of-bingen",
    canonicalName: "Hildegard of Bingen",
    aliases: ["Hildegard von Bingen"],
    birthYear: 1098,
    deathYear: 1179,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["DE"],
    regionCode: "western_europe",
    historicalPolityKey: "polity.holy_roman_empire",
    occupationIds: ["composer", "theologian", "naturalist"],
    fieldIds: ["music", "philosophy", "natural_science"],
    impactDomains: ["artistic", "cultural", "historical", "medical"],
    tagIds: ["polymath", "mystic", "nonconformist"],
    archetypeIds: ["creative_creator", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q70991" },
    // ROSTER-1000 portrait sourcing (2026-08): a traditional manuscript
    // depiction, not a lifetime likeness, per Part 17's allowance for
    // "non-photographic historical representations... acceptable when
    // defensibly identified" (the same Confucius/Tang-Dynasty precedent).
    // Verified live against the Commons file page.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB in the roster-wide reliability audit. Root
    // cause resolved via the MediaWiki API (imageinfo): Wikimedia's storage
    // hash-path for this file changed since it was first sourced (old path
    // 9/9c/, current b/ba/) -- the stored URL was pointing at a stale path
    // that now 404s from Wikimedia's own Swift storage, not a deleted or
    // replaced file. Identity verified via the API before downloading:
    // same file title/page, same 1354x1980 source dimensions. Re-hosted
    // locally at public/portraits/hildegard-of-bingen-rupertsberg-codex.jpg
    // -- resized to a 1600px longest side + mozjpeg quality-85 re-encode
    // (lanczos3, no sharpening/upscale/crop/AI processing): 1354x1980/
    // 1.1MB -> 1094x1600/687KB (36.1% smaller — a lower ratio than the
    // rest of this batch since the source illumination's fine linework/
    // color detail compresses less than a photograph; visually inspected
    // directly, no artifacts). licenseUrl still points to the live Commons
    // file page. Depiction caveat unchanged: not a lifetime likeness.
    portrait: {
      url: "/portraits/hildegard-of-bingen-rupertsberg-codex.jpg",
      width: 1094,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Hildegard_von_Bingen.jpg",
      attribution: "Illumination from the Rupertsberg Codex of the Liber Scivias, c. 1175 — a traditional depiction, not a lifetime likeness, showing Hildegard receiving a vision and dictating to her scribe Volmar, Public Domain",
    },
    sources: [{ id: "src_hildegard_wikipedia", kind: "wikipedia", title: "Hildegard of Bingen", url: "https://en.wikipedia.org/wiki/Hildegard_of_Bingen" }, { id: "src_hildegard_correspondence", kind: "archive", title: "The Letters of Hildegard of Bingen (surviving correspondence with popes, emperors, and bishops)" }, { id: "src_hildegard_worldhistory", kind: "institution", title: "World History Encyclopedia — Hildegard of Bingen" }],
    rows: {
      // Authored Physica and Causae et Curae, systematic surviving texts cataloguing plants, animals, stones, and their medicinal uses — the works themselves are the direct documented evidence.
      curiosity: [78, 0.6, "d", "A"],
      // Composed Ordo Virtutum, a surviving original liturgical musical drama unusual in form for its era, plus an independent visionary theological work (Scivias) — both survive as direct documented output, not attributed secondhand.
      creative_originality: [84, 0.65, "d", "A"],
      // Physica organizes natural-historical knowledge into a structured reference format rather than a loose collection, per its surviving text's own organization.
      systems_abstraction: [68, 0.52, "s", "A"],
      // Received a rare Church-sanctioned exception to preach publicly as a woman in the 12th century, and surviving correspondence documents her sending unsolicited moral admonishment directly to Pope Eugenius III and Emperor Frederick Barbarossa.
      independent_thinking: [80, 0.62, "d", "A"],
      // Surviving letters to major political and religious figures of her era, urging specific moral correction, are directly preserved primary documents, not secondhand characterization.
      persuasiveness: [76, 0.58, "d", "A"],
      // The same surviving correspondence shows direct, unprompted engagement with the most powerful political and religious figures of her time.
      social_assertiveness: [78, 0.6, "d", "A"],
      // Founded and led two monastic communities (Rupertsberg and later Eibingen), documented via monastic records of the era.
      leadership_drive: [74, 0.58, "d", "A"],
      // Sustained output across music, theology, medicine, and natural history over several decades, evidencing consistent long-term productivity beyond a single burst of work.
      discipline: [72, 0.55, "s", "A"],
      // Continued preaching tours into old age; her final years included a sustained, documented dispute over an ecclesiastical interdict (below), which she did not quickly abandon.
      persistence: [68, 0.52, "s", "A"],
      // Her monastery was placed under interdict (a severe ecclesiastical penalty) over a disputed burial in its cemetery; documented accounts describe her refusing compliance and directly petitioning church authorities until the interdict was lifted shortly before her death.
      conflict_tolerance: [76, 0.58, "d", "R"],
      // Defying an active ecclesiastical interdict carried real institutional risk in the period; scored distinctly from conflict_tolerance above (willingness to sustain the dispute) as the separate question of accepting the exposure itself.
      risk_tolerance: [65, 0.5, "i", "N"],
      // Real, surviving output across music composition, visionary theology, natural history, and medicine — an unusually wide documented range for any figure of this period.
      cross_domain_range: [82, 0.6, "d", "A"],
      // Documented dispute with her own monastery's abbot over her wish to relocate her community to found the independent Rupertsberg monastery, which she ultimately achieved against his initial resistance.
      autonomy_need: [72, 0.55, "d", "A"],
      // Initiated correspondence with popes and emperors unprompted, rather than only responding to inquiries directed at her — documented via the surviving letters themselves.
      proactive_agency: [74, 0.58, "d", "A"],
      // Physica catalogs an extensive, specific range of individual plants and their particular applications rather than general remedies — a documented level of specificity in the surviving text.
      detail_orientation: [68, 0.5, "s", "A"],
      // Her surviving musical compositions are noted by musicologists for an unusually wide vocal range and distinctive melodic style for the period, evidencing a deliberate aesthetic approach rather than formulaic liturgical composition.
      aesthetic_sensitivity: [72, 0.52, "s", "A"],
      // Worked with a secretary monk, Volmar, over decades in producing her written works — a real, sustained working relationship, though the sources describe more about the output than the collaborative dynamic itself.
      collaboration: [60, 0.48, "i", "N"],
      // Negotiating and executing the relocation of her monastic community to found the independent Rupertsberg monastery required real advance logistical and financial planning, per surviving monastic records of the era.
      planning_orientation: [64, 0.48, "i", "A"],
      // Scivias directly documents her synthesizing reported visionary experience into a structured theological framework spanning cosmology, salvation history, and ethics — the surviving text itself is the evidence for the synthesis having occurred, independent of any question about the nature of the visions themselves.
      intuitive_synthesis: [72, 0.56, "s", "A"],
      // Documented pattern of pursuing progressively larger undertakings across her life — from an initially small religious community to founding an independent monastery, to increasingly ambitious composed works and international correspondence — evidencing sustained escalation rather than settling once initial recognition was achieved.
      achievement_drive: [68, 0.55, "s", "A"],
      // Causae et Curae is noted by modern medieval scholarship for unusually direct, detailed descriptions of human anatomy and reproduction for a 12th-century monastic author, evidencing sustained, careful engagement with the subject well beyond a devotional gloss.
      mastery_orientation: [68, 0.54, "s", "A"],
    },
  },
  {
    id: "p_ibn_sina",
    slug: "ibn-sina",
    canonicalName: "Ibn Sina",
    aliases: ["Avicenna", "이븐 시나"],
    birthYear: 980,
    deathYear: 1037,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "central_asia",
    historicalPolityKey: "polity.samanid_empire",
    occupationIds: ["physician", "philosopher"],
    fieldIds: ["philosophy", "natural_science"],
    impactDomains: ["scientific", "medical", "historical"],
    tagIds: ["polymath", "prolific", "systematic_thinker"],
    archetypeIds: ["scholarly_specialist", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q8011" },
    // Verified 2026-08 via a direct fetch of the Commons file page. NOT a
    // lifetime likeness — no contemporary depiction of Ibn Sina survives; a
    // modern sculptural bust (1952, National Library of Medicine), tagged
    // "no known copyright restrictions."
    // Portrait Reliability Localization Batch 2 (2026-08): near-oversized
    // (915KB), plus a data-hygiene correction flagged by the prior
    // reliability audit. The Commons file title/our own prior attribution
    // both said "bust", which reads as a sculpture -- but a direct visual
    // check of the actual downloaded file (not just its metadata) shows a
    // painted/hand-tinted profile portrait (halftone color reproduction),
    // not a photograph of a 3-D bust. Commons' own extmetadata confirms:
    // "Format: Still image... Technique: halftone, color", credited to
    // the National Library of Medicine, categorized "Portraits of
    // Avicenna" -- "bust" here is Commons' own portrait-composition
    // terminology (head-and-shoulders framing), not a sculpture claim,
    // but our attribution text read ambiguously, so it's corrected to
    // describe what's actually shown. Identity/license/source unaffected
    // -- same file, same URL, verified via the MediaWiki API before
    // downloading. Depiction caveat (not a lifetime likeness) preserved.
    // Resized to a 1600px longest side + mozjpeg quality-85 re-encode
    // (lanczos3, no sharpening/upscale/crop/AI processing), re-hosted at
    // public/portraits/ibn-sina-profile-portrait-nlm.jpg: 2294x2957/915KB
    // -> 1241x1600/335KB (63.4% smaller). licenseUrl still points to the
    // live Commons file page.
    portrait: {
      url: "/portraits/ibn-sina-profile-portrait-nlm.jpg",
      width: 1241,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "No known copyright restrictions",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Avicenna_Bust,_left_profile_(cropped).jpg",
      attribution: "U.S. National Library of Medicine — painted profile portrait, colorized halftone reproduction dated 1952 (not a lifetime likeness)",
    },
    sources: [{ id: "src_ibnsina_wikipedia", kind: "wikipedia", title: "Avicenna", url: "https://en.wikipedia.org/wiki/Avicenna" }, { id: "src_ibnsina_autobiography", kind: "archive", title: "Ibn Sina's autobiography (dictated to his student al-Juzjani)" }, { id: "src_ibnsina_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Ibn Sina" }],
    rows: {
      // His own dictated autobiography describes mastering logic, physics, mathematics, and medicine in sequence as a teenager, unprompted, before beginning formal study of Aristotelian metaphysics — a self-reported but historically treated-as-reliable primary account; medieval sourcing caps confidence.
      curiosity: [82, 0.62, "s", "A"],
      // The Canon of Medicine systematically classifies diseases, causes, and treatments in a structured taxonomy that survives intact and was used as a standard medical reference for centuries — the work itself is the documented evidence.
      analytical_rigor: [80, 0.65, "d", "A"],
      // The Canon organizes the full scope of then-known medical knowledge into one coherent structural framework rather than a loose compilation — documented directly from the surviving text's own organization.
      systems_abstraction: [85, 0.65, "d", "A"],
      // Synthesized Aristotelian philosophy, Galenic medicine, and his own framework into original positions rather than pure commentary, per the Stanford Encyclopedia of Philosophy's account of his departures from strict Peripatetic orthodoxy.
      independent_thinking: [68, 0.55, "s", "A"],
      // The Canon's organizational structure represented a genuine reworking rather than a restatement of prior Galenic medicine, per medical-history assessments of the text's originality.
      creative_originality: [66, 0.52, "s", "A"],
      // Documented substantial written output across medicine, philosophy, logic, astronomy, and poetry, alongside a separate career as a court physician and vizier (senior political administrator) — real output in multiple domains, not dabbling.
      cross_domain_range: [84, 0.65, "d", "A"],
      // His autobiography describes struggling with Aristotle's Metaphysics for an extended period, rereading it some forty times by his own account, before a breakthrough via al-Farabi's commentary — a specific, if self-reported, instance of sustained effort.
      discipline: [72, 0.55, "s", "A"],
      // Continued producing philosophical and scientific work throughout a demanding political career as vizier, evidencing pursuit of understanding beyond what his administrative role required.
      mastery_orientation: [78, 0.6, "s", "A"],
      // A documented bibliography of over 240 attributed works is a real behavioral pattern of sustained output, though the exact count and attribution have some historical uncertainty, keeping confidence at inference level.
      achievement_drive: [68, 0.5, "i", "N"],
      // Chronicled accounts document him serving multiple rulers across several cities over his lifetime, relocating under political pressure more than once while continuing to produce major work — a real, if not exhaustively corroborated, pattern.
      adaptability: [74, 0.55, "s", "A"],
      // Historical accounts describe him escaping an imprisonment in disguise — a single vivid anecdote, capped per the rubric at a moderate-high rather than extreme score and inference-level confidence.
      resourcefulness: [70, 0.48, "i", "A"],
      // Serving as a court physician and vizier during a politically unstable period, including a documented period of imprisonment, suggests real exposure to risk, though the degree of voluntary risk-seeking versus circumstance is not clearly separable from the sources available.
      risk_tolerance: [62, 0.48, "i", "N"],
      // Held the position of vizier (senior political administrator) under at least one ruler, a documented senior institutional role, though the surviving sources say more about his scholarly output than his administrative conduct specifically.
      leadership_drive: [65, 0.5, "s", "N"],
      // The Canon's exhaustive, systematic cataloguing of diseases, drugs, and their interactions (used as a reference for centuries) evidences sustained attention to comprehensive detail beyond a summary treatment.
      detail_orientation: [72, 0.52, "s", "A"],
      // His autobiography's account of rereading Aristotle's Metaphysics some forty times without full comprehension before finally succeeding via al-Farabi's commentary evidences not giving up on a specific difficult problem — a distinct claim from the general working-discipline evidence above, though drawn from the same single self-reported source, hence inference-level.
      persistence: [68, 0.5, "i", "A"],
      // Serving directly as vizier under a ruler required sustained, direct engagement with political authority, though the surviving sources describe the role more than specific instances of his personal conduct within it.
      social_assertiveness: [62, 0.46, "i", "N"],
      // His autobiography describes successfully treating the Samanid ruler Nuh ibn Mansur as a young physician, which he specifically used to gain access to the ruler's extensive royal library — a specific, named, dated episode rather than a general characterization, hence somewhat higher confidence than the more diffuse entries above.
      opportunity_sensing: [68, 0.56, "s", "A"],
      // Both the Canon of Medicine and the separate philosophical encyclopedia Kitab al-Shifa (The Book of Healing, covering logic, physics, mathematics, and metaphysics) are organized into deliberate, structured book-and-section hierarchies — directly observable from the surviving texts' own organization, not inferred from reputation.
      planning_orientation: [74, 0.58, "d", "A"],
      // His autobiography specifically states he began practicing medicine and being consulted by established physicians around age 16-18, an unusually young age for such responsibility — a specific, dated claim from the primary autobiographical source rather than a vague characterization.
      proactive_agency: [70, 0.56, "s", "A"],
      // Worked closely with his student and secretary al-Juzjani over an extended period, who both assisted in his later work and directly preserved his dictated autobiography — a sustained, documented working relationship rather than solitary authorship alone.
      collaboration: [62, 0.56, "s", "A"],
    },
  },
  {
    id: "p_isaac_newton",
    slug: "isaac-newton",
    canonicalName: "Isaac Newton",
    aliases: ["Sir Isaac Newton"],
    birthYear: 1643,
    deathYear: 1727,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["physicist", "mathematician"],
    fieldIds: ["physics", "mathematics"],
    impactDomains: ["scientific", "engineering", "historical"],
    tagIds: ["polymath", "systematic_thinker", "prolific"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q935" },
    sources: [{ id: "src_newton_wikipedia", kind: "wikipedia", title: "Isaac Newton", url: "https://en.wikipedia.org/wiki/Isaac_Newton" }, { id: "src_newton_westfall", kind: "biography", title: "Richard S. Westfall, Never at Rest: A Biography of Isaac Newton (1980)" }, { id: "src_newton_royalsociety", kind: "institution", title: "The Royal Society — Isaac Newton biography" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: Godfrey
    // Kneller, 1702, National Portrait Gallery London (NPG 2881). Public
    // domain (artist died 1723).
    portrait: {
      url: "/portraits/isaac-newton-kneller-1702.jpg",
      width: 1245,
      height: 1600,
      source: "Wikimedia Commons",
      license: "Public Domain (artist died 1723)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sir_Isaac_Newton_by_Sir_Godfrey_Kneller,_Bt_(cropped).jpg",
      attribution: "Godfrey Kneller, 1702 — National Portrait Gallery, London",
    },
    rows: {
      // Sustained, self-directed investigation across optics, mathematics, alchemy, and theology for decades with no external prompting, well past what any single role required (Westfall). Documented, multiple domains, converging evidence — 85+ band.
      curiosity: [92, 0.88, "d", "A"],
      // Principia Mathematica's geometric proofs are the defining documented instance — rigorous derivation from first principles, not intuition alone. Multiple independent documented works (Principia, Opticks) converge.
      analytical_rigor: [96, 0.9, "d", "A"],
      // Documented unification of terrestrial and celestial mechanics under one law of gravitation (Principia, Book III) — not the apocryphal apple story, but the actual mathematical unification, which is the real documented achievement.
      intuitive_synthesis: [85, 0.75, "d", "A"],
      // Developed calculus as a general mathematical framework and organized Principia into a systematic axiomatic structure (laws of motion, then derivations) — documented, structural evidence, not a single instance.
      systems_abstraction: [94, 0.85, "d", "A"],
      // Developed calculus, the theory of colors, and early gravitation theory during the 1665-1667 plague years working alone at Woolsthorpe, before any external validation existed (documented in his own notebooks and later corroborated by Westfall).
      independent_thinking: [88, 0.78, "d", "A"],
      // Documented, decades-long resistance to revising positions under challenge: maintained his corpuscular theory of light against Hooke's and Huygens's wave-theory objections, and pursued the calculus-priority dispute with Leibniz for years rather than reconciling competing claims. Multiple converging instances, strong_inference since no single quote settles it.
      belief_updating: [34, 0.62, "s", "R"],
      // Independent invention of calculus (documented, corroborated by dated manuscripts) is a clear, singular instance of genuinely original formal invention, not incremental extension of existing work.
      creative_originality: [90, 0.8, "d", "A"],
      // Documented prism experiments splitting white light into a spectrum and recombining it (Opticks) — a specific, cited, repeatable experimental program, not a single anecdote.
      experimentation: [84, 0.72, "d", "A"],
      // Sustained, serious (not dabbling) engagement across physics, mathematics, alchemy, theology, and later monetary administration (Royal Mint) — documented across multiple independent biographical sources, though no single quote frames this as deliberate range-seeking.
      cross_domain_range: [74, 0.6, "s", "A"],
      // His assistant Humphrey Newton documented him working for weeks at a stretch, frequently forgetting meals, during the writing of Principia — a specific, cited, sustained pattern.
      discipline: [90, 0.8, "d", "A"],
      // Same Humphrey Newton household account: extended single-problem absorption to the point of neglecting food and sleep, corroborated across multiple biographies.
      deep_focus: [92, 0.8, "d", "A"],
      // The precision of Principia's geometric proofs and repeated revision across three editions over decades supports meticulous attention, though this overlaps substantially with analytical_rigor rather than being independently documented.
      detail_orientation: [78, 0.62, "s", "A"],
      // Delayed publishing calculus and optical work for years/decades — plausibly perfectionism, but the better-documented explanation (Westfall) is dispute-avoidance and secrecy rather than dissatisfaction with the work itself, so scored moderately with inference-level confidence rather than higher.
      perfectionism: [62, 0.5, "i", "D"],
      // The 1665-1667 'annus mirabilis' produced the basis of calculus, optics, and gravitation within about 18 months once he began in earnest — fast once engaged, though this contrasts with his separately-documented decades-long delay in publishing, which is a distinct, temperament-driven pattern (see perfectionism).
      execution_speed: [72, 0.58, "s", "N"],
      // Principia's deliberate three-book structure, building axiomatically from definitions and laws to derived results, suggests real structural planning rather than ad hoc composition.
      planning_orientation: [68, 0.55, "s", "A"],
      // Returned to lunar-theory and calendar problems across decades without resolution, and pursued alchemical investigation for over 20 years without public results — documented via his surviving notebooks (Westfall).
      persistence: [90, 0.78, "d", "A"],
      // In his mid-50s, took on the Wardenship then Mastership of the Royal Mint — an entirely different domain (finance and law enforcement) — and by documented account excelled, personally investigating counterfeiters. Genuinely in tension with the belief_updating finding above, which is about revising his own theoretical convictions specifically, not adjusting to a new institutional role — both are separately well-supported, not smoothed into a fake middle.
      adaptability: [66, 0.55, "s", "A"],
      // Widely documented as reclusive in daily life (never married, few close friends, described by contemporaries as withdrawn) — the dominant pattern across his life, even though he could be forcefully assertive within Royal Society politics specifically (see conflict_tolerance).
      social_assertiveness: [38, 0.5, "s", "N"],
      // Documented, sustained refusal to share credit and active suppression of rival claims — the Leibniz calculus dispute and the Flamsteed star-catalogue dispute (where Newton published Flamsteed's unfinished data without full consent) are both specific, cited, well-corroborated instances.
      collaboration: [22, 0.75, "d", "R"],
      // Served as President of the Royal Society for 24 years (1703-1727) and Master of the Royal Mint — documented, sustained institutional leadership roles, not honorary positions.
      leadership_drive: [78, 0.68, "d", "A"],
      // Sustained, active engagement in bitter priority disputes with Hooke, Leibniz, and Flamsteed across decades, including secretly chairing a supposedly impartial Royal Society committee that ruled in his own favor against Leibniz — documented willingness to prolong conflict rather than avoid it.
      conflict_tolerance: [82, 0.7, "d", "R"],
      // Pursued alchemical and theological investigation for decades with no public output or external reward — documented via his own extensive private manuscripts, evidencing pursuit for its own sake.
      mastery_orientation: [88, 0.72, "d", "A"],
      // The Leibniz calculus-priority campaign is a specific, well-documented, sustained effort to be recognized as first, including orchestrating a biased Royal Society ruling in his own favor.
      competitiveness: [85, 0.78, "d", "R"],
      // Consistent documented pattern of working alone for extended periods and resisting collaboration even when it would have accelerated publication (e.g. delaying calculus disclosure for years).
      autonomy_need: [82, 0.68, "s", "A"],
      // Personally designed and built a working reflecting telescope to solve chromatic-aberration problems existing instruments had — a specific, documented technical improvisation, though a single instance.
      resourcefulness: [68, 0.55, "s", "A"],
      // As Warden of the Mint, personally went undercover to gather evidence against counterfeiters rather than delegating the investigation — documented, self-initiated action beyond the role's formal expectations.
      proactive_agency: [76, 0.6, "s", "A"],
    },
  },
  {
    id: "p_jane_austen",
    slug: "jane-austen",
    canonicalName: "Jane Austen",
    birthYear: 1775,
    deathYear: 1817,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["independent", "detail_oriented", "late_recognition"],
    archetypeIds: ["creative_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q36322" },
    // ROSTER-1000 portrait sourcing (2026-08): the only surviving portrait
    // of Jane Austen made during her own lifetime showing her face,
    // sketched by her sister. Verified live against the Commons file page.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB (HTTP 400) in the roster-wide reliability
    // audit. The stored URL was a /thumb/ rendition path, which the
    // MediaWiki API's imageinfo resolved to a stable full-original path
    // (1/18/) -- same file title/page, same 800x850 source dimensions,
    // verified before downloading. Already well within a reasonable
    // display size, so NOT resized -- re-hosted locally at
    // public/portraits/jane-austen-cassandra-sketch-c1810.jpg via a
    // mozjpeg quality-85 re-encode only (no crop/upscale/AI processing):
    // 800x850/305KB -> 800x850/83KB (72.7% smaller). licenseUrl still
    // points to the live Commons file page.
    portrait: {
      url: "/portraits/jane-austen-cassandra-sketch-c1810.jpg",
      width: 800,
      height: 850,
      source: "Wikimedia Commons (hosted locally by this app as a recompressed derivative; see licenseUrl for the original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Cassandra_Austen-Jane_Austen(c.1810).jpg",
      attribution: "Watercolor and pencil sketch by Cassandra Austen, c. 1810 — the only surviving portrait of Jane Austen made during her own lifetime showing her face, National Portrait Gallery, London (NPG 3630), Public Domain",
    },
    sources: [{ id: "src_austen_wikipedia", kind: "wikipedia", title: "Jane Austen", url: "https://en.wikipedia.org/wiki/Jane_Austen" }, { id: "src_austen_letters", kind: "archive", title: "Jane Austen's Letters, ed. Deirdre Le Faye" }, { id: "src_austen_tomalin", kind: "biography", title: "Claire Tomalin, Jane Austen: A Life (1997)" }],
    rows: {
      // Widely credited by literary scholarship with an early, sustained use of free indirect discourse (narrating through a character's internal perspective without direct first-person voice) — a documented, specific stylistic technique visible across her novels, not a single instance.
      creative_originality: [82, 0.68, "d", "A"],
      // Her novels' tightly interlocking subplots and precisely-timed plot resolutions evidence deliberate structural construction rather than loose composition, per literary-critical consensus.
      analytical_rigor: [68, 0.52, "s", "A"],
      // Sustained critical consensus regarding her prose precision and control, corroborated by her own surviving letters discussing specific stylistic choices with her sister and niece.
      aesthetic_sensitivity: [86, 0.7, "d", "A"],
      // Pride and Prejudice was originally drafted around 1797 (as 'First Impressions') and not published until 1813 after extensive revision — a documented 16-year gap evidencing sustained work on the same material rather than a single quick draft.
      persistence: [78, 0.62, "d", "A"],
      // Documented to have accepted a marriage proposal from Harris Bigg-Wither in 1802, then withdrawn her acceptance the following morning — a specific, corroborated instance of prioritizing her own judgment against real social and economic pressure to marry.
      independent_thinking: [68, 0.58, "d", "A"],
      // Produced six major novels with extensive documented revision cycles within a relatively compressed adult writing career, evidencing sustained working habits.
      discipline: [68, 0.52, "s", "A"],
      // Precise, specific social and behavioral observation is a hallmark noted consistently across literary-critical assessment of her work, corroborated by the texts themselves.
      detail_orientation: [80, 0.62, "d", "A"],
      // Published anonymously ('By a Lady') throughout her lifetime and, per Tomalin, deliberately avoided public literary fame or self-promotion — a documented preference for privacy over public assertion, a genuine low score rather than an assumption from her eventual renown.
      social_assertiveness: [32, 0.52, "d", "N"],
      // The withdrawn 1802 engagement is read by biographers as motivated substantially by a wish to preserve her own independence, though her financial circumstances complicate a purely autonomy-driven reading — scored with moderate rather than high confidence to reflect this.
      autonomy_need: [65, 0.52, "s", "A"],
      // Her documented output is concentrated almost entirely within the novel form — a genuinely low, honestly-scored range rather than inflated from her overall literary reputation.
      cross_domain_range: [30, 0.5, "i", "N"],
      // Extensive, repeated revision cycles across multiple novels (documented via surviving manuscript and correspondence evidence) show continued craft refinement beyond what a single publishable draft would require.
      mastery_orientation: [74, 0.58, "s", "A"],
      // The precisely-timed convergence of subplots in novels like Pride and Prejudice and Emma evidences deliberate advance construction rather than improvisation.
      planning_orientation: [70, 0.55, "s", "A"],
      // Varied narrative technique meaningfully across her novels (the free indirect discourse noted above develops further across successive works), suggesting active technical exploration rather than a single fixed method.
      experimentation: [62, 0.48, "i", "A"],
      // Continued pursuing publication after an early manuscript (the draft that became Pride and Prejudice) was reportedly rejected without being read in 1797, rather than abandoning the pursuit of publication.
      proactive_agency: [62, 0.48, "s", "A"],
      // The multi-year, multi-draft revision history of individual novels suggests sustained engagement with single works over extended periods, though the domestic, interrupted nature of her documented writing routine (fitting writing around household demands, per Tomalin) tempers this somewhat.
      deep_focus: [65, 0.48, "i", "A"],
      // The precision and range of social observation across her novels evidences sustained close attention to the behavior and motivations of the people around her, beyond what casual observation would produce.
      curiosity: [66, 0.5, "s", "A"],
      // Literary-critical consensus notes her ironic narrative voice as deliberately guiding reader judgment toward specific conclusions about characters' moral standing. Corroborated further by her surviving letters to her niece Anna Austen, then also attempting novel-writing, which give specific, detailed craft advice about plot construction and character consistency — a documented, concrete instance of articulating her own literary judgment to another person, not only a critical reading of her published work.
      persuasiveness: [70, 0.6, "d", "A"],
      // The roughly 16-year gap between the original draft of Pride and Prejudice and its eventual 1813 publication, spent in extensive revision, directly evidences a slow, deliberate working pace rather than fast output — a genuine, evidence-based low score.
      execution_speed: [32, 0.5, "d", "N"],
      // Sustained literary-critical consensus credits her with distilling close social observation into broader, generalizable insight about character and social behavior across her novels — a well-established critical assessment, not a speculative reading.
      intuitive_synthesis: [74, 0.58, "s", "A"],
      // Documented to have reversed her acceptance of Harris Bigg-Wither's 1802 marriage proposal the very next morning — a specific, dated instance of quickly and clearly acting on reconsidered judgment rather than remaining in prolonged indecision, distinct from the independent_thinking claim above which addresses the judgment itself rather than the speed of acting on it.
      decisiveness: [68, 0.55, "d", "A"],
      // Her substantial surviving correspondence with her sister Cassandra documents sustained editorial exchange and feedback across her writing career — a real, well-corroborated collaborative relationship, not a single instance.
      collaboration: [60, 0.55, "d", "A"],
    },
  },
  {
    id: "p_martin_luther_king_jr",
    slug: "martin-luther-king-jr",
    canonicalName: "Martin Luther King Jr.",
    birthYear: 1929,
    deathYear: 1968,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_activist", "theologian"],
    fieldIds: ["civil_rights", "philosophy"],
    impactDomains: ["social", "historical", "cultural"],
    tagIds: ["nonviolence", "grassroots_organizer", "advocate"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q8027" },
    sources: [{ id: "src_mlk_wikipedia", kind: "wikipedia", title: "Martin Luther King Jr.", url: "https://en.wikipedia.org/wiki/Martin_Luther_King_Jr." }, { id: "src_mlk_institute", kind: "institution", title: "The Martin Luther King, Jr. Research and Education Institute, Stanford University" }, { id: "src_mlk_branch", kind: "biography", title: "Taylor Branch, Parting the Waters: America in the King Years 1954-63 (1988)" }],
    rows: {
      // The 1963 'I Have a Dream' address and sustained public oratory across a 13-year public career are among the most extensively documented rhetorical achievements of the 20th century, corroborated across independent archives.
      persuasiveness: [94, 0.82, "d", "A"],
      // Led the 1955-56 Montgomery Bus Boycott, co-founded and led the Southern Christian Leadership Conference, and organized the Birmingham and Selma campaigns — documented, sustained institutional leadership across more than a decade.
      leadership_drive: [90, 0.8, "d", "A"],
      // Was arrested repeatedly (including the 1963 Birmingham jailing during which he wrote 'Letter from Birmingham Jail') and continued organizing despite documented, credible assassination threats throughout the 1960s.
      risk_tolerance: [88, 0.75, "d", "R"],
      // Sustained the civil rights campaign across 13 years (1955-1968) through repeated arrests, violent opposition, and organizational setbacks, documented across the full span of his public career.
      persistence: [88, 0.75, "d", "A"],
      // The Birmingham campaign was deliberately designed (documented as 'Project C' for confrontation) to provoke a visible, media-covered response from segregationist authorities — a strategic, intentional use of confrontation rather than avoidance.
      conflict_tolerance: [80, 0.68, "d", "A"],
      // Personally led marches directly into confrontation with segregationist state authorities (Selma, Birmingham) — documented, repeated pattern of direct public assertion.
      social_assertiveness: [82, 0.68, "d", "A"],
      // Committed to strategic nonviolence even against pressure from more confrontational contemporaries and criticism from some fellow clergy over the pace of change (documented directly in 'Letter from Birmingham Jail,' addressed to critics urging patience).
      independent_thinking: [70, 0.58, "s", "A"],
      // Worked within and across multiple civil rights organizations (SCLC, alliances with the NAACP and, at times, SNCC), though documented tension existed with SNCC over strategy and pace — genuinely mixed, scored toward the center.
      collaboration: [65, 0.52, "s", "D"],
      // The Birmingham campaign was documented as a deliberately staged sequence of escalating actions specifically designed to generate a particular public and media response, not an improvised protest.
      planning_orientation: [78, 0.62, "d", "A"],
      // Broadened his public focus over his career from segregation specifically to economic justice (the Poor People's Campaign) and, in the 1967 Riverside Church address, to opposition to the Vietnam War — a documented expansion that drew criticism even from some prior allies, evidencing a real, costly position shift rather than a comfortable one.
      belief_updating: [68, 0.55, "s", "A"],
      // Pursued formal theological doctoral study and specifically studied Gandhian nonviolent method in depth before applying it, evidencing deliberate skill development in the strategy he would use for the rest of his career.
      mastery_orientation: [68, 0.52, "s", "A"],
      // Sustained day-to-day organizational leadership of SCLC campaigns across more than a decade, documented through the organization's own campaign records.
      discipline: [74, 0.58, "s", "A"],
      // Personally initiated the Birmingham campaign and later the Poor People's Campaign as self-directed strategic choices rather than responses to being asked, documented in SCLC's own planning records.
      proactive_agency: [84, 0.68, "d", "A"],
      // Documented strategic choice of Birmingham specifically because its police force's response to protest was expected to be severe and visible enough to generate national attention — a deliberate recognition and use of a specific political opening.
      opportunity_sensing: [76, 0.6, "d", "A"],
      // Adapted Gandhian nonviolent resistance theory into a specific strategic framework for the American civil rights context — a real synthesis, though built on an existing methodology rather than invented from nothing.
      creative_originality: [62, 0.5, "s", "A"],
      // Formal theological training combined with civil rights organizing and, later, economic-policy and anti-war advocacy — real range but concentrated within a broadly consistent moral-philosophy and social-justice domain rather than spanning unrelated fields.
      cross_domain_range: [60, 0.48, "i", "N"],
      // Expanded strategy and focus from localized segregation campaigns to national economic-justice organizing (the Poor People's Campaign) in his final years — real but modestly evidenced beyond the belief_updating finding above, which covers the same underlying shift from a different angle.
      adaptability: [62, 0.48, "i", "N"],
      // Campaigns were explicitly organized around securing specific, concrete legislative and policy outcomes (documented public framing around the Civil Rights Act of 1964 and Voting Rights Act of 1965 as direct goals), not activism for its own sake.
      achievement_drive: [72, 0.55, "s", "A"],
      // Explicitly and repeatedly framed his work, including in his final campaign (the Poor People's Campaign), around broad structural change for others rather than personal or in-group gain, documented across his public speeches and writing.
      impact_motivation: [85, 0.7, "d", "A"],
      // 'Letter from Birmingham Jail' directly and systematically rebuts specific published criticisms from fellow clergy point by point — a documented, structured written argument, not merely a rhetorical appeal.
      analytical_rigor: [78, 0.62, "d", "A"],
      // Once a campaign was decided upon (e.g. the 1965 Selma march), mobilization and public action followed within a defined, relatively short timeframe rather than prolonged deliberation.
      execution_speed: [65, 0.5, "s", "N"],
    },
  },
  {
    id: "p_rabindranath_tagore",
    slug: "rabindranath-tagore",
    canonicalName: "Rabindranath Tagore",
    birthYear: 1861,
    deathYear: 1941,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    historicalPolityKey: "polity.british_raj",
    occupationIds: ["poet", "writer", "composer", "philosopher"],
    fieldIds: ["literature", "music", "education", "philosophy"],
    impactDomains: ["literary", "artistic", "cultural", "educational"],
    tagIds: ["polymath", "nonconformist", "founder"],
    archetypeIds: ["cross_disciplinary_generalist", "creative_creator"],
    externalIdentity: { wikidataId: "Q7241" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB in the roster-wide reliability audit. Root
    // cause resolved via the MediaWiki API (imageinfo): Wikimedia's storage
    // hash-path for this file changed since it was first sourced (old path
    // 9/9e/, current 9/91/) -- the stored URL was pointing at a stale path
    // that now 404s from Wikimedia's own Swift storage, not a deleted or
    // replaced file. Identity verified via the API before downloading:
    // same file title/page, same 1071x1500 source dimensions. Re-hosted
    // locally at public/portraits/rabindranath-tagore-1909.jpg as the
    // literal downloaded original -- a mozjpeg quality-85 re-encode was
    // tried and made the file LARGER (132KB -> 156KB, since the original
    // was already efficiently encoded), so per "recompress only when
    // materially useful" the original bytes were kept unchanged instead.
    // Only the delivery path changed. licenseUrl still points to the live
    // Commons file page.
    portrait: {
      url: "/portraits/rabindranath-tagore-1909.jpg",
      width: 1071,
      height: 1500,
      source: "Wikimedia Commons (hosted locally by this app; byte-identical to the original — recompression was tested and found counterproductive here — see licenseUrl for the original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Rabindranath_Tagore_in_1909.jpg",
      attribution: "Generalstabens litografiska anstalt, 1909, published in Les Prix Nobel 1913 (1914), Public Domain",
    },
    sources: [{ id: "src_tagore_wikipedia", kind: "wikipedia", title: "Rabindranath Tagore", url: "https://en.wikipedia.org/wiki/Rabindranath_Tagore" }, { id: "src_tagore_nobel", kind: "award_body", title: "The Nobel Prize — Rabindranath Tagore, Literature 1913" }],
    rows: {
      // Produced thousands of poems and songs, novels, plays, and (later in life) paintings — the 1913 Nobel Prize in Literature for Gitanjali is a documented, independently-verified recognition of a specific body of original work.
      creative_originality: [90, 0.78, "d", "A"],
      // The Nobel Prize citation and sustained international critical reception of Gitanjali directly document recognition of his aesthetic craft, not merely his output volume.
      aesthetic_sensitivity: [88, 0.75, "d", "A"],
      // Real, sustained output across poetry, prose fiction, musical composition (he composed both India's and Bangladesh's national anthems, a documented, unusual fact), and, from his sixties onward, painting — genuine achievement in each, not dabbling.
      cross_domain_range: [90, 0.78, "d", "A"],
      // Publicly renounced his British knighthood in 1919 in protest of the Jallianwala Bagh massacre — a specific, well-documented, high-profile act of dissent against colonial authority.
      independent_thinking: [84, 0.7, "d", "A"],
      // The same knighthood renunciation carried real social and political risk within the colonial establishment he was a prominent, honored member of.
      risk_tolerance: [78, 0.62, "d", "R"],
      // Founded Visva-Bharati University at Santiniketan as an alternative, humanistic educational institution — a documented, sustained institution-building effort beyond his literary work.
      leadership_drive: [76, 0.6, "d", "A"],
      // Self-initiated the founding of Visva-Bharati rather than working within an existing institution, documented via the university's own founding history.
      proactive_agency: [78, 0.62, "d", "A"],
      // Took up painting seriously as a new art form only in his sixties, well after his literary reputation was fully established, purely from continued creative interest rather than any external need.
      mastery_orientation: [80, 0.65, "d", "A"],
      // The same late-life adoption of painting as an entirely new medium evidences willingness to experiment outside his already-successful domain.
      experimentation: [72, 0.55, "s", "A"],
      // Sustained an extraordinarily prolific output across nearly six decades of active writing and composition, evidencing consistent long-term productivity.
      discipline: [74, 0.58, "s", "A"],
      // Conducted extensive international lecture tours as a public intellectual, documented via records of his travels across Europe, the Americas, and East Asia.
      persuasiveness: [68, 0.52, "s", "A"],
      // The public knighthood renunciation, combined with sustained international public lecturing, evidences real willingness toward public assertion of his views.
      social_assertiveness: [74, 0.58, "d", "A"],
      // The knighthood renunciation was itself a direct, public confrontation with British colonial authority, documented as a deliberate and consequential choice rather than a private grievance.
      conflict_tolerance: [76, 0.6, "d", "R"],
      // Sustained engagement across an unusually wide range of creative and intellectual forms throughout his life evidences genuine exploratory drive beyond what mastery of any single form would require.
      curiosity: [78, 0.6, "s", "A"],
      // Successfully took up an entirely new creative medium (painting) late in life after decades of established success in literature — a genuine, documented instance of adapting to a new domain rather than remaining within an already-proven one.
      adaptability: [76, 0.58, "s", "A"],
      // Founded Visva-Bharati specifically as an alternative, humanistic model of education distinct from colonial-era schooling, documented via his own stated educational philosophy — motivation toward broader structural impact, not only personal literary achievement.
      impact_motivation: [72, 0.55, "s", "A"],
      // Sustained output at this volume across nearly six decades implies real sustained engagement, though the specific surviving record documents output more than working method in detail.
      deep_focus: [62, 0.48, "i", "A"],
      // Visva-Bharati's deliberately designed curriculum and campus, built around a specific alternative educational philosophy, evidences real advance planning, though scored moderately given limited detail on his personal day-to-day working habits.
      planning_orientation: [60, 0.46, "i", "N"],
      // Documented to have personally, substantially revised his own Bengali poems when self-translating Gitanjali into English rather than producing a literal translation — a specific, corroborated instance of sustained revision toward his own standard.
      perfectionism: [64, 0.48, "s", "N"],
      // Visva-Bharati was built as a collaborative artistic and educational community bringing together musicians, artists, and scholars, though the surviving record documents the institution more than his specific personal collaborative behavior within it.
      collaboration: [60, 0.45, "i", "A"],
      // A documented output of over 2,000 songs and dozens of books and plays across his lifetime evidences a genuinely fast working pace when engaged, beyond what occasional composition would produce.
      execution_speed: [68, 0.52, "s", "A"],
    },
  },
  {
    id: "p_thomas_aquinas",
    slug: "thomas-aquinas",
    canonicalName: "Thomas Aquinas",
    birthYear: 1225,
    deathYear: 1274,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["IT"],
    regionCode: "southern_europe",
    occupationIds: ["theologian", "philosopher", "teacher"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational", "cultural"],
    tagIds: ["systematic_thinker", "prolific", "philosopher"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q9438" },
    // No-Portrait Fill Batch 1 (2026-08): historical-ceiling case -- Aquinas
    // died in 1274, no lifetime likeness exists. This is Carlo Crivelli's
    // 1476 devotional panel (National Gallery, London, NG788.9), the
    // standard, widely-reproduced depiction -- painted roughly two centuries
    // after his death. Idealized/devotional convention (halo, symbolic
    // objects), explicitly NOT a lifetime likeness. Resized derivative,
    // uncropped. Verified live against the Commons file page.
    portrait: {
      url: "/portraits/thomas-aquinas-crivelli-1476.jpg",
      width: 1065,
      height: 1600,
      source: "Wikimedia Commons (resized derivative)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Saint_Thomas_Aquinas_(Crivelli,_15th-century).jpg",
      attribution: "Carlo Crivelli, Saint Thomas Aquinas, 1476, National Gallery, London (NG788.9) — a later idealized/devotional depiction, painted approximately two centuries after Aquinas's death, not a lifetime likeness",
    },
    sources: [{ id: "src_aquinas_wikipedia", kind: "wikipedia", title: "Thomas Aquinas", url: "https://en.wikipedia.org/wiki/Thomas_Aquinas" }, { id: "src_aquinas_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Thomas Aquinas" }],
    rows: {
      // The Summa Theologica's question-objection-response structure, applied across thousands of individual articles, is directly documented in the surviving text's own organization — a specific, sustained methodology, not a single instance.
      analytical_rigor: [92, 0.8, "d", "A"],
      // Attempted to organize the whole of Christian theology and Aristotelian philosophy into one coherent structural framework — documented directly from the Summa's scope and organization.
      systems_abstraction: [90, 0.75, "d", "A"],
      // Deeply engaged with newly-translated Aristotelian texts that were controversial in Church circles at the time, rather than avoiding them, per Stanford Encyclopedia of Philosophy's account of his intellectual context.
      curiosity: [68, 0.52, "s", "A"],
      // Integrated 'pagan' Aristotelian philosophy into Christian theology despite resistance from some Church authorities; several Thomistic propositions were formally condemned by the Bishop of Paris in 1277, a few years after his death — documented controversy directly tied to his positions.
      independent_thinking: [78, 0.62, "d", "R"],
      // Produced an extraordinary documented volume of work (the Summa alone spans thousands of articles) within a working life of roughly two decades while also teaching and traveling, using a documented method of dictating to multiple secretaries simultaneously.
      discipline: [84, 0.68, "d", "A"],
      // A widely repeated account describes him becoming so absorbed in thought at a royal dinner that he struck the table, oblivious to the company, having resolved a theological problem — a specific, well-known anecdote, capped per the rubric below the extreme band since it rests on a single (if often-cited) story.
      deep_focus: [68, 0.5, "i", "A"],
      // Continued refining and extending his theological system up to his death, leaving the Summa unfinished rather than treating an earlier version as sufficient.
      mastery_orientation: [74, 0.58, "s", "A"],
      // The Summa's deliberate hierarchical structure (parts, treatises, questions, articles, each logically sequenced) is directly observable in the surviving text.
      planning_orientation: [82, 0.65, "d", "A"],
      // Sustained a single, unusually large systematic project across roughly two decades of concurrent teaching and travel obligations.
      persistence: [78, 0.6, "s", "A"],
      // Wrote substantial commentaries on Aristotle's physics and biology in addition to core theology and philosophy — real range, though concentrated within a broadly Aristotelian intellectual framework rather than spanning unrelated fields.
      cross_domain_range: [62, 0.5, "s", "N"],
      // Used multiple secretaries for simultaneous dictation, a real working arrangement, but remained the sole intellectual author of the resulting system — a modest, mixed pattern scored toward the center.
      collaboration: [55, 0.45, "i", "N"],
      // Sustained intellectual disputes on two fronts — against Latin Averroist readings of Aristotle and against more conservative theologians resistant to any Aristotelian integration — documented via the historical record of 13th-century Parisian theological debate.
      conflict_tolerance: [70, 0.55, "s", "R"],
      // Held a prestigious teaching chair at the University of Paris, a real institutional position, though the surviving record documents his written output far more than any distinct leadership or administrative activity.
      leadership_drive: [58, 0.48, "i", "N"],
      // The Summa's method of addressing every anticipated objection point-by-point before responding is directly observable in the text's own structure across thousands of articles.
      detail_orientation: [76, 0.58, "d", "A"],
      // The Summa was explicitly composed as a teaching text for students, structured for pedagogical clarity rather than only personal theological exploration, per its own stated purpose.
      persuasiveness: [64, 0.5, "s", "A"],
      // The specific synthesis of Aristotelian philosophy with Christian theology was a genuinely novel intellectual contribution for its context, even though built substantially on existing traditions rather than invented from nothing.
      creative_originality: [70, 0.55, "s", "A"],
      // Committing publicly to the controversial Aristotelian integration, later leading to posthumous condemnation of some of his propositions, evidences real willingness to hold an exposed intellectual position.
      risk_tolerance: [62, 0.48, "i", "N"],
      // Widely documented to have been nicknamed 'the Dumb Ox' by fellow students for his quiet, reserved manner — a specific, historically well-corroborated characterization (reportedly defended by his teacher Albert the Great, who predicted his eventual renown), not a single throwaway remark.
      social_assertiveness: [32, 0.48, "s", "N"],
      // The documented method of dictating to multiple secretaries on different works simultaneously was specifically a means of increasing output speed, distinct from the general discipline/volume claim above — a deliberate working-method choice aimed at pace.
      execution_speed: [72, 0.55, "d", "A"],
      // Sustained a real intellectual rivalry with Latin Averroist readings of Aristotle, seeking to establish his own synthesis as the dominant interpretation within Christian theology — a real but moderately-evidenced priority-seeking pattern.
      competitiveness: [58, 0.46, "i", "N"],
      // Documented to have held teaching posts across multiple institutional contexts over his career (Paris, Cologne under Albert the Great, Naples, and papal court positions in Italy), each with real differences in institutional and political environment.
      adaptability: [62, 0.48, "s", "A"],
    },
  },
  {
    id: "p_thomas_edison",
    slug: "thomas-edison",
    canonicalName: "Thomas Edison",
    aliases: ["Thomas Alva Edison"],
    birthYear: 1847,
    deathYear: 1931,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["inventor", "entrepreneur"],
    fieldIds: ["technology", "engineering", "business"],
    impactDomains: ["technological", "industrial", "innovation"],
    tagIds: ["prolific", "innovator", "founder"],
    archetypeIds: ["technical_innovator", "entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q8743" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB in the roster-wide reliability audit. Root
    // cause resolved via the MediaWiki API (imageinfo): Wikimedia's storage
    // hash-path for this file changed since it was first sourced (old path
    // 6/6b/, current 9/9f/) -- the stored URL was pointing at a stale path
    // that now 404s from Wikimedia's own Swift storage, not a deleted or
    // replaced file. Identity verified via the API before downloading:
    // same file title/page, same 496x717 source dimensions. Already a
    // small source, so NOT resized -- re-hosted locally at
    // public/portraits/thomas-edison-c1878.jpg via a mozjpeg quality-85
    // re-encode only (no crop/upscale/AI processing): 496x717/57KB ->
    // 496x717/47KB (18.3% smaller). licenseUrl still points to the live
    // Commons file page.
    portrait: {
      url: "/portraits/thomas-edison-c1878.jpg",
      width: 496,
      height: 717,
      source: "Wikimedia Commons (hosted locally by this app as a recompressed derivative; see licenseUrl for the original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Thomas_Alva_Edison,_c._1878.jpg",
      attribution: "Photographer unknown, circa 1878, Public Domain (published before 1931)",
    },
    sources: [{ id: "src_edison_wikipedia", kind: "wikipedia", title: "Thomas Edison", url: "https://en.wikipedia.org/wiki/Thomas_Edison" }, { id: "src_edison_israel", kind: "biography", title: "Paul Israel, Edison: A Life of Invention (1998)" }],
    rows: {
      // Documented extensive, systematic testing of a very large number of filament materials before arriving at a commercially viable design for the incandescent light bulb — corroborated across independent biographical accounts (Israel), not a single anecdote.
      experimentation: [90, 0.78, "d", "A"],
      // The multi-year filament-testing program continued through extensive documented failure before commercial success, corroborated by Menlo Park's own laboratory records.
      persistence: [86, 0.72, "d", "A"],
      // Did not invent the incandescent bulb concept from nothing — took existing, commercially impractical incandescent-lighting concepts and improved materials and design to make them viable, documented via the patent record and Israel's account.
      resourcefulness: [82, 0.65, "d", "A"],
      // Scored moderately rather than at the extreme: much credited 'Edison' work was practical improvement of existing concepts (the light bulb) rather than pure invention, though the phonograph is a more genuinely original case, documented as the first device to both record and reproduce sound.
      creative_originality: [62, 0.5, "s", "N"],
      // Built not only the light bulb but the full supporting electrical generation and distribution system (the Pearl Street Station) needed to make it commercially usable — a documented, genuinely systemic achievement beyond a single device.
      systems_abstraction: [84, 0.68, "d", "A"],
      // Established Menlo Park as one of the first organized industrial research laboratories, deliberately structuring invention as a systematic, resourced process rather than individual ad hoc tinkering — documented via the lab's own organizational history.
      planning_orientation: [78, 0.62, "d", "A"],
      // Directed a substantial team of researchers and engineers at Menlo Park rather than working as a lone inventor, documented via the laboratory's staffing records.
      leadership_drive: [76, 0.6, "d", "A"],
      // Led a real research team, but multiple historians (Israel included) document that a number of 'Edison' patents involved substantial uncredited or under-credited contributions from employees such as Lewis Latimer and Francis Jehl — a genuinely mixed, documented pattern, not scored as pure collaborative strength.
      collaboration: [48, 0.5, "s", "D"],
      // Waged a sustained public campaign (the 'War of Currents') against Westinghouse and Tesla's AC power system, including documented, ethically questionable tactics such as funding public electrocution demonstrations to discredit AC — a specific, well-corroborated, aggressive pattern scored as risk rather than pure advantage.
      competitiveness: [82, 0.68, "d", "R"],
      // Widely documented, corroborated across multiple biographies, to have worked extended hours with minimal sleep during intensive development periods.
      discipline: [80, 0.65, "d", "A"],
      // Personally invested heavily in ventures that documentedly failed commercially, notably an iron-ore-mining enterprise that cost him substantial personal losses — real evidence of risk-taking that did not always pay off, not cherry-picked from only his successes.
      risk_tolerance: [62, 0.52, "d", "D"],
      // Moved across genuinely distinct invention domains over his career — sound recording, electric lighting/power distribution, motion pictures, and battery technology — each documented with real commercial output.
      adaptability: [78, 0.62, "d", "A"],
      // Same evidence as adaptability: substantial, commercially real output across phonography, electric power, motion pictures, and batteries — documented range with genuine achievement in each, not dabbling.
      cross_domain_range: [84, 0.68, "d", "A"],
      // Continued directing invention work into old age across new domains, though this is harder to separate cleanly from ordinary commercial motivation given his business-driven career, hence inference-level rather than higher.
      mastery_orientation: [65, 0.5, "i", "N"],
      // His laboratory notebooks, comprising thousands of surviving pages of detailed experimental records, are a well-documented primary historical resource evidencing meticulous record-keeping.
      detail_orientation: [80, 0.65, "d", "A"],
      // Self-initiated the Menlo Park laboratory as a new organizational model for invention, rather than working within an existing institutional structure.
      proactive_agency: [72, 0.55, "d", "A"],
      // Sustained the multi-year public 'War of Currents' campaign against Westinghouse and Tesla rather than conceding the commercial argument for AC power — the same documented pattern as competitiveness above, viewed from willingness to sustain public conflict.
      conflict_tolerance: [76, 0.6, "d", "R"],
      // Cultivated a well-documented public image as 'The Wizard of Menlo Park' and used press relationships deliberately to build commercial and public support for his inventions.
      persuasiveness: [68, 0.52, "s", "A"],
      // Gave frequent, deliberately staged public demonstrations and press interviews to promote his inventions, a documented and sustained pattern of active public engagement rather than working in obscurity.
      social_assertiveness: [70, 0.55, "s", "A"],
      // Menlo Park was organized around a self-stated production target of a minor invention roughly every ten days and a major one every few months, commonly cited by historians as his own working goal for the lab — a real, if not independently verified beyond this attribution, indicator of a deliberately fast invention pace.
      execution_speed: [68, 0.5, "s", "A"],
      // The systematic, methodical structure of the filament-testing program (tracking materials and outcomes across a large number of trials) evidences a real analytical approach to narrowing the search space, documented via the surviving Menlo Park laboratory notebooks.
      analytical_rigor: [70, 0.55, "s", "A"],
    },
  },
  {
    id: "p_umm_kulthum",
    slug: "umm-kulthum",
    canonicalName: "Umm Kulthum",
    birthYear: 1904,
    deathYear: 1975,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["EG"],
    regionCode: "north_africa",
    occupationIds: ["singer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["sustained_excellence", "independent", "self_taught"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q1110560" },
    sources: [{ id: "src_ummkulthum_wikipedia", kind: "wikipedia", title: "Umm Kulthum", url: "https://en.wikipedia.org/wiki/Umm_Kulthum" }, { id: "src_ummkulthum_britannica", kind: "institution", title: "Encyclopaedia Britannica — Umm Kulthum" }],
    rows: {
      // Documented rigorous vocal training from childhood (initially disguised as a boy to perform religious recitations, per multiple biographical accounts), continuing to refine technique across a roughly 50-year performing career.
      mastery_orientation: [92, 0.78, "d", "A"],
      // Widely documented mastery of tarab (the classical Arabic vocal-ornamentation tradition), corroborated by musicological analysis of her recorded performances across decades.
      aesthetic_sensitivity: [94, 0.8, "d", "A"],
      // Maintained a well-documented monthly performance tradition (first-Thursday-of-the-month radio concerts) consistently for decades, a specific, sustained, corroborated pattern.
      discipline: [85, 0.72, "d", "A"],
      // Continued performing at the highest professional level across roughly five decades despite documented health difficulties in her later years.
      persistence: [82, 0.65, "d", "A"],
      // Documented practice of repeating a single line of a song many times within one performance, each time with different vocal ornamentation, until reaching a desired emotional effect with the audience — a specific, well-corroborated performance technique, not a single anecdote.
      experimentation: [84, 0.68, "d", "A"],
      // The same documented practice of extended, hours-long performances built around sustained improvisation evidences deep, sustained engagement within a single performance.
      deep_focus: [78, 0.6, "s", "A"],
      // Exercised documented creative direction over her own orchestra and repertoire selection, an unusual degree of control for a performer of her era.
      leadership_drive: [70, 0.55, "s", "A"],
      // Toured extensively giving concerts to raise funds for Egypt following the 1967 Arab-Israeli war defeat — a documented, large-scale, real instance of using her public influence to mobilize concrete support.
      persuasiveness: [82, 0.65, "d", "A"],
      // Maintained unusual creative and business independence over her own repertoire and collaborators for a woman performer in her era and industry, documented across multiple biographical accounts.
      autonomy_need: [68, 0.52, "s", "A"],
      // Worked in sustained, selective creative partnership with leading composers of her era (notably Riad Al Sunbati) over decades, documented via the shared body of recorded work.
      collaboration: [66, 0.52, "s", "A"],
      // Documented meticulous attention to the selection and treatment of poetic texts set to music, though the surviving record describes this more generally than via specific cited instances.
      detail_orientation: [62, 0.48, "i", "A"],
      // Self-initiated the 1967 war-effort fundraising tours rather than being asked by the government to do so, per historical accounts of the period.
      proactive_agency: [76, 0.6, "d", "A"],
      // The same 1967 fundraising campaign evidences motivation toward broad national impact beyond personal career interests, documented via the historical record of the tours' explicit purpose.
      impact_motivation: [78, 0.6, "d", "A"],
      // Appeared in several films during the 1930s-40s in addition to her singing career — a real but modest secondary domain, scored moderately rather than high since singing remained overwhelmingly her primary documented achievement.
      cross_domain_range: [50, 0.42, "i", "N"],
      // Her interpretive approach to setting classical Arabic poetry to music is documented by musicologists as having set new standards within the tradition, a real if evolutionary rather than radical originality.
      creative_originality: [72, 0.55, "s", "A"],
      // Maintained unusual creative and business control over her own career rather than deferring to industry convention of her era — the same underlying evidence as autonomy_need, viewed from the judgment/decision-making angle rather than the preference-for-independence angle.
      independent_thinking: [65, 0.5, "s", "A"],
      // Documented pattern of pursuing progressively larger venues and more prestigious collaborations across her career rather than settling once initial success was reached.
      achievement_drive: [68, 0.52, "s", "A"],
      // Documented practice of extending individual songs across many minutes or hours through repeated improvised variation is the opposite of fast delivery — a genuine, evidence-based low score rather than an assumption that mastery implies speed.
      execution_speed: [32, 0.48, "s", "N"],
      // The sustained monthly public radio concert tradition was itself a deliberate, sustained public presence maintained across decades, documented via broadcast records of the period.
      social_assertiveness: [74, 0.58, "d", "A"],
      // Selective, deliberate choice of composers and poetic material across her career suggests real strategic career planning, though the surviving record documents her choices more than the planning process behind them.
      planning_orientation: [62, 0.46, "i", "A"],
      // Documented to have negotiated firmly with radio and recording institutions over artistic control and compensation across her career, evidencing willingness to sustain disagreement rather than accept terms passively.
      conflict_tolerance: [60, 0.46, "i", "N"],
    },
  },
  {
    id: "p_vincent_van_gogh",
    slug: "vincent-van-gogh",
    canonicalName: "Vincent van Gogh",
    birthYear: 1853,
    deathYear: 1890,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["NL"],
    regionCode: "western_europe",
    occupationIds: ["painter"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["late_recognition", "self_taught", "prolific"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q5582" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB in the roster-wide reliability audit. Root
    // cause resolved via the MediaWiki API (imageinfo): Wikimedia's storage
    // hash-path for this file changed since it was first sourced (old path
    // 1/16/, current b/b2/) -- the stored URL was pointing at a stale path
    // that now 404s from Wikimedia's own Swift storage, not a deleted or
    // replaced file. Identity verified via the API before downloading:
    // same file title/page, same 3142x3820 source dimensions. Re-hosted
    // locally at public/portraits/vincent-van-gogh-self-portrait-1889.jpg
    // -- resized to a 1600px longest side + mozjpeg quality-85 re-encode
    // (lanczos3, no sharpening/upscale/crop/AI processing): 3142x3820/
    // 3.9MB -> 1316x1600/446KB (88.4% smaller). licenseUrl still points to
    // the live Commons file page.
    portrait: {
      url: "/portraits/vincent-van-gogh-self-portrait-1889.jpg",
      width: 1316,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
      attribution: "Vincent van Gogh, self-portrait, 1889, Musée d'Orsay, Paris, Public Domain",
    },
    sources: [{ id: "src_vangogh_wikipedia", kind: "wikipedia", title: "Vincent van Gogh", url: "https://en.wikipedia.org/wiki/Vincent_van_Gogh" }, { id: "src_vangogh_letters", kind: "archive", title: "Van Gogh Museum — Vincent van Gogh: The Letters (complete surviving correspondence)" }, { id: "src_vangogh_naifeh", kind: "biography", title: "Steven Naifeh and Gregory White Smith, Van Gogh: The Life (2011)" }],
    rows: {
      // Nearly 900 surviving letters, mostly to his brother Theo, directly document his deliberate reasoning about color relationships, composition, and technique alongside a body of over 2,000 surviving works — an unusually direct, first-person documentary record.
      aesthetic_sensitivity: [94, 0.85, "d", "A"],
      // Developed a distinctive personal style (thick impasto, expressive color choices departing from observed reality) that departed clearly from the academic and Impressionist conventions of his time, documented via the surviving body of work itself.
      creative_originality: [90, 0.78, "d", "A"],
      // Letters document deliberate experimentation with complementary color pairings and paint application technique, describing specific choices and their intended effects rather than working purely intuitively.
      experimentation: [82, 0.68, "d", "A"],
      // Produced roughly 200 paintings during his final approximately 15 months in Arles and Saint-Rémy alone — a documented, dated body of work evidencing sustained, intense working periods.
      deep_focus: [88, 0.75, "d", "A"],
      // Multiple documented accounts and dated works show individual paintings completed within a single sitting or day during his most productive periods.
      execution_speed: [84, 0.68, "d", "A"],
      // Continued producing work at a high rate for roughly a decade despite documented, near-total absence of commercial success in his lifetime (he sold only one or two paintings while alive) — strong evidence against a success-driven or externally-rewarded reading of his output.
      persistence: [88, 0.75, "d", "A"],
      // Same lack of commercial or critical validation during his lifetime, combined with sustained technical development documented across his letters, evidences pursuit of the craft itself rather than external reward.
      mastery_orientation: [85, 0.7, "d", "A"],
      // Rejected the more polished academic and Impressionist conventions favored by contemporary critics in favor of his own developing style, documented via critical reception at the time and his own letters defending his choices.
      independent_thinking: [76, 0.6, "d", "A"],
      // The sheer volume of dated output evidences real working discipline during productive periods, though this was documented to be interrupted by periods of hospitalization — scored moderately rather than at the extreme to reflect the genuinely uneven, not uniformly sustained, pattern.
      discipline: [62, 0.5, "s", "D"],
      // His documented two-month attempt at a shared studio arrangement with Paul Gauguin in Arles (the 'Yellow House' period) ended in a well-corroborated breakdown; scored from the documented outcome of this specific collaborative arrangement, not from any diagnostic reading of the underlying cause.
      collaboration: [35, 0.58, "d", "R"],
      // Left prior, more conventional career paths (art dealing, lay preaching) to pursue painting full-time with no proven ability and reliance on his brother's financial support — a documented, real career risk taken relatively late (age 27).
      risk_tolerance: [68, 0.55, "d", "A"],
      // Moved to Arles specifically seeking his own independent studio space, documented in his letters as a deliberate choice for creative independence.
      autonomy_need: [70, 0.55, "s", "A"],
      // Multiple contemporaries' accounts and his own letters describe him as socially isolated and difficult to form lasting relationships with — scored strictly from this documented behavioral pattern, not from any retrospective diagnostic characterization.
      social_assertiveness: [34, 0.48, "i", "N"],
      // The documented breakdown of the Gauguin collaboration involved real interpersonal conflict, though the surviving record does not clearly establish whether this reflects a general pattern versus a specific, singular relationship dynamic — scored toward the center given genuine uncertainty.
      conflict_tolerance: [45, 0.45, "i", "N"],
      // Held several distinct earlier roles (art dealer, teacher, lay preacher) before settling into painting in his late twenties — real but modest range, and these earlier roles are documented more as unsuccessful precursors than as domains of real achievement in their own right.
      cross_domain_range: [42, 0.45, "i", "N"],
      // Changed career direction multiple times (art dealing, theology, preaching, painting) before finding his eventual path — genuinely readable either as adaptability or as prolonged instability, scored toward the center rather than forced to either pole.
      adaptability: [55, 0.45, "i", "D"],
      // Documented in his letters as having actively organized and invited Gauguin to Arles to establish a shared artists' colony, a self-initiated project rather than joining an existing one.
      proactive_agency: [65, 0.52, "d", "A"],
      // Biographical accounts (Naifeh and Smith) generally describe his working method as intuitive and reactive to immediate subject and mood rather than methodically planned in advance — a real, if moderately-evidenced, contrast with more structured figures in this batch.
      planning_orientation: [38, 0.42, "i", "N"],
      // His letters document deliberate, reasoned application of complementary-color theory to specific compositions, describing intended effects in advance rather than working from instinct alone.
      analytical_rigor: [62, 0.48, "s", "A"],
      // Documented via his letters to have reworked or abandoned specific canvases he judged unsuccessful, evidencing a real internal standard, scored moderately given this is not the dominant documented theme of his rapid overall output.
      perfectionism: [58, 0.45, "s", "D"],
      // Documented to have studied and collected Japanese ukiyo-e prints extensively, directly incorporating their compositional influence into his own work — a specific, corroborated interest beyond his immediate painting practice.
      curiosity: [68, 0.52, "d", "A"],
    },
  },
  {
    id: "p_wilbur_wright",
    slug: "wilbur-wright",
    canonicalName: "Wilbur Wright",
    birthYear: 1867,
    deathYear: 1912,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["inventor", "engineer"],
    fieldIds: ["engineering", "technology"],
    impactDomains: ["technological", "engineering", "innovation"],
    tagIds: ["innovator", "systematic_thinker", "self_taught"],
    archetypeIds: ["technical_innovator", "independent_creator"],
    externalIdentity: { wikidataId: "Q1396131" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    // Portrait Reliability Localization Batch 1 (2026-08): confirmed
    // net::ERR_BLOCKED_BY_ORB in the roster-wide reliability audit. Root
    // cause resolved via the MediaWiki API (imageinfo): Wikimedia's storage
    // hash-path for this file changed since it was first sourced (old path
    // 2/2b/, current 3/38/) -- the stored URL was pointing at a stale path
    // that now 404s from Wikimedia's own Swift storage, not a deleted or
    // replaced file. Identity verified via the API before downloading:
    // same file title/page, same 3284x4105 source dimensions. Re-hosted
    // locally at public/portraits/wilbur-wright-loc-1905.jpg -- resized to
    // a 1600px longest side + mozjpeg quality-85 re-encode (lanczos3, no
    // sharpening/upscale/crop/AI processing): 3284x4105/6.2MB ->
    // 1280x1600/135KB (97.8% smaller). licenseUrl still points to the live
    // Commons file page.
    portrait: {
      url: "/portraits/wilbur-wright-loc-1905.jpg",
      width: 1280,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Wilbur_Wright-crop.jpg",
      attribution: "Library of Congress, Prints and Photographs Division, 1905, Public Domain",
    },
    sources: [{ id: "src_wright_wikipedia", kind: "wikipedia", title: "Wilbur Wright", url: "https://en.wikipedia.org/wiki/Wilbur_Wright" }, { id: "src_wright_mccullough", kind: "biography", title: "David McCullough, The Wright Brothers (2015)" }],
    rows: {
      // Identified specific, quantified errors in Otto Lilienthal's previously-published aerodynamic lift tables through their own systematic testing, and corrected them — documented via the brothers' own technical notes and correspondence.
      analytical_rigor: [84, 0.7, "d", "A"],
      // Conducted extensive, iterative glider testing across multiple seasons at Kitty Hawk (1900-1902) before the first powered flight, systematically varying wing shape and control surfaces — documented in detail across dated flight logs.
      experimentation: [92, 0.8, "d", "A"],
      // Sustained years of repeated glider failures and redesigns from 1900 through the successful 1903 powered flight, well documented via McCullough's account of the full multi-season testing program.
      persistence: [86, 0.72, "d", "A"],
      // Rejected existing published aerodynamic data once their own testing contradicted it, rather than assuming their own results were wrong — a documented, specific instance of trusting first-hand evidence over established authority.
      independent_thinking: [78, 0.62, "d", "A"],
      // Maintained a systematic, staged testing program (wind-tunnel data collection, then unpowered gliders, then powered flight) across several years, documented via their own technical notebooks.
      discipline: [82, 0.68, "d", "A"],
      // Worked in an unusually close, sustained partnership with his brother Orville throughout the entire development process, extensively documented via their joint correspondence and shared credit — a distinctive, well-corroborated collaborative case.
      collaboration: [88, 0.75, "d", "A"],
      // Personally piloted early, unproven glider and powered-aircraft prototypes themselves rather than delegating the physical risk to others.
      risk_tolerance: [70, 0.55, "d", "A"],
      // The staged program — building their own wind tunnel to generate reliable data before ever attempting a full glider, then gliders before power — evidences deliberate sequencing rather than ad hoc experimentation.
      planning_orientation: [80, 0.65, "d", "A"],
      // Applied mechanical skills from their existing bicycle-manufacturing business to aeronautics — a real but modest cross-domain transfer rather than broad achievement across unrelated fields.
      cross_domain_range: [52, 0.48, "i", "N"],
      // Built their own wind tunnel specifically to generate more reliable aerodynamic data once they found the published data to be wrong — a specific, well-documented instance of building a needed tool rather than working around the gap.
      resourcefulness: [82, 0.68, "d", "A"],
      // Pursued powered flight in active competition with other inventors of the era (notably Samuel Langley), and subsequently pursued years of aggressive patent litigation against rivals including Glenn Curtiss — a documented, real pattern that protected their invention but is also credited by some historians with slowing broader U.S. aviation development, hence dual_edged rather than a pure advantage.
      competitiveness: [68, 0.55, "d", "D"],
      // Precise, quantified data collection methodology (documented via their own wind-tunnel test records) evidences careful attention to measurement accuracy.
      detail_orientation: [78, 0.6, "s", "A"],
      // Sustained multi-year, single-problem engineering focus on flight control specifically, documented across the full testing program's timeline.
      deep_focus: [76, 0.58, "s", "A"],
      // Self-initiated building their own wind tunnel rather than accepting the limitations of existing published data — a specific, documented, self-directed action.
      proactive_agency: [74, 0.58, "d", "A"],
      // Continued refining aircraft control systems for several years after the initial 1903 success, evidencing pursuit of a fully solved problem rather than stopping at 'good enough.'
      mastery_orientation: [68, 0.52, "s", "A"],
      // Sustained multi-year patent litigation against rival aviation developers rather than settling quickly — the same documented pattern as the competitiveness finding above, viewed from the willingness-to-sustain-conflict angle.
      conflict_tolerance: [65, 0.5, "s", "R"],
      // The three-axis control system (pitch, roll, and yaw, via wing-warping and a movable rudder) was a genuinely original engineering solution to the flight-control problem that other contemporary inventors had not solved — documented via the patent record and aviation-history assessment.
      creative_originality: [82, 0.65, "d", "A"],
      // Treated flight control as one unified three-axis problem rather than solving lift, propulsion, and steering as separate, unrelated problems — a structural framing evident in their own technical approach.
      systems_abstraction: [70, 0.55, "s", "A"],
      // After years of public skepticism toward their unverified flight claims, organized specific public demonstration flights in 1908 that directly and successfully convinced the press and government observers — a documented, deliberate persuasive action, not passive achievement.
      persuasiveness: [68, 0.52, "d", "A"],
      // Documented (McCullough) to have deliberately avoided publicity and press engagement for years after their first flights, prioritizing secrecy to protect their unpatented invention over public recognition — a real, evidence-based low score.
      social_assertiveness: [30, 0.52, "d", "N"],
      // Documented (McCullough) to have taken primary responsibility for the partnership's patent correspondence and international licensing negotiations, evidencing a real, if shared-with-Orville, leadership role within the enterprise.
      leadership_drive: [65, 0.5, "s", "A"],
    },
  },
];

export const ROSTER_3: readonly Person[] = seeds.map(build);
