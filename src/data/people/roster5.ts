/**
 * ROSTER 5 — roster-1000 session 5, third real expansion batch (3 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed, the
 * 3-slug session-5 batch) via `src/dev/roster1000/generateRoster5.ts`. Every
 * score's rationale is preserved as the inline comment above its Row, the
 * same evidence-audit-trail discipline the earlier rosters use. This batch's
 * acceptance rate (3 of 31 researched) is markedly lower than sessions 3-4
 * -- see docs/roster-1000-checkpoint.md for the honest reason (this batch's
 * initial confidence calibration ran lower than earlier batches; two
 * legitimate remediation rounds closed some of the gap but not all of it,
 * and a third round was deliberately not attempted per the session's own
 * instruction not to force wider margins).
 *
 * Korean display names for these 3 people were added to `person.name.*`
 * in `src/core/i18n/ko.ts` in the same batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_aristotle",
    slug: "aristotle",
    canonicalName: "Aristotle",
    birthYear: -384,
    deathYear: -322,
    isLiving: false,
    era: "ancient",
    nationalityCodes: ["GR"],
    regionCode: "southern_europe",
    occupationIds: ["philosopher"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational", "scientific"],
    tagIds: ["systematic_thinker", "polymath", "founder"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q868" },
    // Verified 2026-08 via a direct fetch of the Commons file page: photo of
    // a Roman-era (1st-2nd century CE) marble bust copying Lysippos's lost
    // bronze original (c. 330 BCE) -- an idealized/posthumous depiction, not
    // a lifetime likeness (impossible for a 4th-century BCE subject), same
    // "traditional depiction, explicitly labelled as such" discipline as
    // Confucius's existing portrait.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Aristotle_Altemps_Inv8575.jpg",
      width: 1700,
      height: 2275,
      source: "Wikimedia Commons",
      license: "Public Domain (released by the copyright holder)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg",
      attribution: "Roman marble bust (Palazzo Altemps), copy of a lost Greek bronze by Lysippos (c. 330 BCE); photograph by Jastrow, 2006",
    },
    sources: [{ id: "src_aristotle_wikipedia", kind: "wikipedia", title: "Aristotle", url: "https://en.wikipedia.org/wiki/Aristotle" }, { id: "src_aristotle_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Aristotle" }, { id: "src_aristotle_corpus", kind: "archive", title: "The surviving Aristotelian corpus (Physics, Metaphysics, Nicomachean Ethics, Politics, Poetics, biological treatises)" }],
    rows: {
      // Developed comprehensive, internally cross-referenced systems spanning logic, physics, metaphysics, ethics, politics, and biology — a documented, unparalleled scope of systematic categorization directly observable in the surviving corpus itself.
      systems_abstraction: [92, 0.78, "d", "A"],
      // Invented formal syllogistic logic (the Prior Analytics), a documented, foundational rigorous reasoning system still taught today, directly observable in the surviving text.
      analytical_rigor: [88, 0.75, "d", "A"],
      // Produced substantive original work across logic, physics, biology, psychology, ethics, politics, rhetoric, and poetics — documented via the surviving corpus's own breadth, not secondhand characterization.
      cross_domain_range: [90, 0.75, "d", "A"],
      // Conducted extensive empirical observation and dissection of marine animals to build his biological classification system, documented via the surviving zoological treatises' own detailed observational content.
      curiosity: [85, 0.68, "d", "A"],
      // Sustained systematic lecturing and treatise-writing across decades at the Lyceum, documented via the sheer surviving volume and organizational consistency of the corpus.
      discipline: [82, 0.65, "d", "A"],
      // Produced detailed, sustained treatises on narrow technical subjects (e.g. the specific anatomy of individual species in History of Animals), evidencing prolonged concentrated attention, documented via the surviving texts themselves.
      deep_focus: [80, 0.62, "d", "A"],
      // Founded formal logic and developed original metaphysical concepts (substance, causation's four types) with no direct precedent, documented via the surviving corpus's own novel terminology and framework.
      creative_originality: [78, 0.6, "d", "A"],
      // Departed substantially from his teacher Plato's theory of Forms, developing a competing empiricist framework, documented via the Metaphysics' own explicit critique of Platonic idealism.
      independent_thinking: [76, 0.58, "d", "A"],
      // Founded and led the Lyceum as a sustained teaching institution, documented via the well-established historical record of the school's operation after his return to Athens.
      leadership_drive: [68, 0.55, "d", "A"],
      // Continued refining and cross-referencing his own theoretical framework across ethics, politics, and metaphysics over decades, evidenced by internal cross-references within the surviving corpus.
      mastery_orientation: [72, 0.55, "s", "A"],
      // The corpus's systematic internal cross-referencing and structured progression (e.g. Organon's ordered logical treatises) evidences real advance organizational planning.
      planning_orientation: [66, 0.5, "s", "A"],
      // Sustained a multi-decade philosophical and scientific project across two exiles from Athens (once as a young man, once near the end of his life), continuing work throughout, documented via the well-established biographical record.
      persistence: [65, 0.48, "s", "A"],
      // Continued expanding his systematic project across new domains (biology, politics) well after his early logical/metaphysical work was already influential.
      achievement_drive: [64, 0.46, "s", "N"],
      // Explicitly framed the Nicomachean Ethics and Politics around the practical question of how to live and govern well, documented via those works' own stated purpose.
      impact_motivation: [62, 0.46, "s", "A"],
      // His biological classification work required exhaustive cataloguing of specific anatomical details across hundreds of species, documented via the surviving History of Animals.
      detail_orientation: [70, 0.52, "d", "A"],
      // Founded his own school with his own distinct philosophical direction after departing the Academy, documented via the well-established break from Platonic orthodoxy visible in the corpus.
      autonomy_need: [58, 0.48, "s", "N"],
      // Served as tutor to Alexander the Great, a specific, multiply-corroborated ancient biographical fact (Diogenes Laertius, Plutarch), and sustained a public teaching role at the Lyceum.
      social_assertiveness: [60, 0.55, "d", "N"],
      // Fled Athens a second time near the end of his life to avoid execution on charges of impiety (echoing Socrates's fate), documented via the well-established biographical record of his final year (Diogenes Laertius).
      risk_tolerance: [62, 0.52, "s", "N"],
      // His mature biological and physical works show real revision of earlier, more speculative metaphysical commitments in light of accumulated empirical observation, documented via the internal development visible across the corpus.
      belief_updating: [62, 0.52, "s", "A"],
      // His biological work involved direct dissection and observation as a method, a real if not fully modern-experimental approach to generating evidence.
      experimentation: [58, 0.46, "s", "N"],
    },
  },
  {
    id: "p_br_ambedkar",
    slug: "br-ambedkar",
    canonicalName: "B. R. Ambedkar",
    aliases: ["Bhimrao Ramji Ambedkar"],
    birthYear: 1891,
    deathYear: 1956,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["jurist", "political_activist"],
    fieldIds: ["law", "social_reform"],
    impactDomains: ["social", "historical", "educational"],
    tagIds: ["overcame_adversity", "founder", "advocate"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q231690" },
    // Verified 2026-08 via a direct fetch of the Commons file page: a real
    // lifetime photograph (28 June 1922), documented as taken when he
    // received his Bar-at-Law qualification from Gray's Inn, London.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Dr_B_R_Ambedkar_as_Barrister_in_1922.jpg",
      width: 640,
      height: 960,
      source: "Wikimedia Commons",
      license: "Public Domain (CC0 1.0 Universal)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Dr_B_R_Ambedkar_as_Barrister_in_1922.jpg",
      attribution: "B. R. Ambedkar as Barrister, 1922, photographer unknown",
    },
    sources: [{ id: "src_ambedkar_wikipedia", kind: "wikipedia", title: "B. R. Ambedkar", url: "https://en.wikipedia.org/wiki/B._R._Ambedkar" }, { id: "src_ambedkar_keer", kind: "biography", title: "Dhananjay Keer, Dr. Ambedkar: Life and Mission (1954)" }],
    rows: {
      // Broke publicly and decisively with Gandhi over the 1932 Communal Award/Poona Pact dispute regarding separate electorates for Dalits, a documented, high-profile instance of holding an independent political position against the era's dominant nationalist leadership.
      independent_thinking: [88, 0.68, "d", "A"],
      // Earned multiple doctoral degrees (Columbia University, London School of Economics) while born into a caste facing severe, documented educational discrimination, and went on to chair the committee drafting India's constitution — an extensively documented trajectory.
      achievement_drive: [86, 0.65, "d", "A"],
      // Sustained direct, public confrontation with the caste system's institutional defenders across his entire career, including organizing the 1927 Mahad Satyagraha (a public water-access protest) and burning the Manusmriti in protest, both extensively documented events.
      conflict_tolerance: [84, 0.65, "d", "A"],
      // Explicitly and consistently framed his entire legal and political career around the emancipation of Dalits and the abolition of untouchability, documented via his own extensive writing (Annihilation of Caste) and the well-established record of his public career.
      impact_motivation: [88, 0.68, "d", "A"],
      // Continued pursuing legal and political reform across decades despite documented, sustained discrimination throughout his own education and early career, including being denied access to basic amenities as a student.
      persistence: [80, 0.65, "d", "A"],
      // Chaired the Drafting Committee of the Indian Constitution and founded multiple political and social organizations (the Independent Labour Party, later the Scheduled Castes Federation), documented via the well-established institutional record of his roles.
      leadership_drive: [82, 0.65, "d", "A"],
      // His doctoral economics work (The Problem of the Rupee) and his systematic legal drafting of the Indian Constitution's fundamental rights provisions evidence rigorous, structured analytical work, documented via those surviving texts.
      analytical_rigor: [76, 0.65, "d", "A"],
      // As chair of the Drafting Committee, built a comprehensive constitutional framework integrating fundamental rights, federal structure, and social-reform provisions, documented via the Constitution's own structure and his leading role in it.
      systems_abstraction: [74, 0.65, "d", "A"],
      // Produced substantive work across economics (his doctoral dissertations), law (constitutional drafting), and social/religious reform (his conversion to Buddhism and writing on caste), documented via his full bibliography.
      cross_domain_range: [72, 0.65, "d", "A"],
      // Secured funding and access to elite international education (Columbia, LSE) despite starting from a caste facing severe documented institutional barriers to basic schooling, a specific, well-corroborated trajectory.
      resourcefulness: [70, 0.65, "d", "A"],
      // Sustained rigorous graduate-level academic work culminating in multiple doctorates while also engaged in active political organizing, evidencing real disciplined effort across simultaneous demanding tracks.
      discipline: [70, 0.5, "s", "A"],
      // Organized direct public protests (the Mahad Satyagraha, the Manusmriti burning) that carried real social and physical risk in the caste-hierarchical context of the period.
      risk_tolerance: [66, 0.48, "s", "R"],
      // Self-initiated the 1927 Mahad Satyagraha and the broader anti-caste movement without waiting for or deferring to the established Congress leadership's own agenda, documented via the well-established independent origin of these actions.
      proactive_agency: [68, 0.65, "d", "A"],
      // Maintained an independent political organization and platform distinct from the dominant Congress movement throughout his career, documented via the sustained separate institutional record of his own parties.
      autonomy_need: [66, 0.48, "s", "A"],
      // The Constitution's fundamental-rights and administrative provisions, which he was principally responsible for drafting, required precise, exhaustive legal specification, documented via the document's own detailed text.
      detail_orientation: [64, 0.46, "s", "A"],
      // The systematic, phased structure of the Indian Constitution's drafting process, which he chaired, evidences real advance organizational planning.
      planning_orientation: [62, 0.46, "s", "A"],
      // Continued developing expertise across economics, law, and political organizing throughout a multi-decade career, culminating in his most demanding role (constitutional drafting) late in his career.
      mastery_orientation: [62, 0.44, "s", "A"],
      // Sustained a prominent public political and legal career across decades, including serving as India's first Law Minister, documented via the well-established public record of his roles.
      social_assertiveness: [66, 0.48, "s", "A"],
      // Chaired a multi-member Drafting Committee and worked within India's broader constitutional assembly process, suggesting real capacity for structured institutional collaboration despite his frequent independent political stance.
      collaboration: [58, 0.42, "i", "N"],
      // Sustained doctoral-level research across economics, sociology, and law at multiple institutions (Columbia, LSE), evidencing real intellectual range across genuinely distinct fields.
      curiosity: [62, 0.46, "s", "A"],
      // His doctoral dissertations and the constitutional drafting work both required sustained, detailed technical concentration over extended periods, documented via the depth of those surviving works.
      deep_focus: [64, 0.46, "s", "A"],
    },
  },
  {
    id: "p_sequoyah",
    slug: "sequoyah",
    canonicalName: "Sequoyah",
    birthYear: 1770,
    deathYear: 1843,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: [],
    regionCode: "north_america",
    occupationIds: ["scholar"],
    fieldIds: ["linguistics"],
    impactDomains: ["historical", "educational", "cultural"],
    tagIds: ["self_taught", "founder", "innovator"],
    archetypeIds: ["independent_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q313595" },
    // Verified 2026-08 via a direct fetch of the Commons file page: Henry
    // Inman's c. 1830 portrait (copy of an original by Charles Bird King
    // destroyed in an 1865 Smithsonian fire), housed at the National
    // Portrait Gallery. Inman died in 1846, so this is public domain via
    // pre-1931 publication + life-plus-100 expiry.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Henry_Inman_-_Sequoyah_-_Google_Art_Project.jpg",
      width: 3869,
      height: 4644,
      source: "Wikimedia Commons",
      license: "Public Domain (published before 1931; artist died 1846)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Henry_Inman_-_Sequoyah_-_Google_Art_Project.jpg",
      attribution: "Henry Inman, c. 1830, after a lost original by Charles Bird King — National Portrait Gallery, Smithsonian Institution",
    },
    sources: [{ id: "src_sequoyah_wikipedia", kind: "wikipedia", title: "Sequoyah", url: "https://en.wikipedia.org/wiki/Sequoyah" }, { id: "src_sequoyah_cherokee_nation", kind: "institution", title: "Cherokee Nation — Sequoyah and the Cherokee Syllabary" }],
    rows: {
      // Single-handedly created the Cherokee syllabary (a complete 85-character writing system for the Cherokee language) despite being unable to read English or any other existing script, an extraordinarily well-documented and historically rare individual feat — one of very few instances in history of a single person independently devising a functional writing system.
      creative_originality: [92, 0.68, "d", "A"],
      // Worked on developing the syllabary for approximately 12 years, documented via the well-established historical account of his sustained effort, including working through skepticism and accusations of witchcraft from his own community during the process.
      persistence: [88, 0.65, "d", "A"],
      // Pursued the syllabary project without any formal linguistic training or literacy in any existing script, developing his own original methodology rather than adapting an existing alphabet, documented via the well-established historical account of his working process.
      independent_thinking: [84, 0.65, "d", "A"],
      // Pursued the syllabary project largely alone over more than a decade, including a documented period where his own community viewed the effort with suspicion, continuing independently of external validation.
      autonomy_need: [78, 0.65, "d", "A"],
      // Faced documented accusations of witchcraft from within his own community during the syllabary's development, a real social risk he continued working through.
      risk_tolerance: [66, 0.65, "d", "R"],
      // Developed the syllabary methodology through repeated iterative experimentation (reportedly including an early failed attempt at a full logographic system before settling on the syllabic approach), documented via the well-established historical account of his development process.
      resourcefulness: [72, 0.65, "d", "A"],
      // Correctly analyzed the Cherokee language's phonetic/syllabic structure to design a system of 85 characters that could represent it completely and efficiently, documented via the syllabary's own well-attested rapid, high success rate of adoption once completed.
      analytical_rigor: [76, 0.65, "d", "A"],
      // Explicitly pursued the syllabary to give the Cherokee people their own means of written communication and preserve their language, documented via the well-established historical account of his stated purpose and the syllabary's subsequent official adoption by the Cherokee Nation.
      impact_motivation: [74, 0.65, "d", "A"],
      // Iteratively tested and refined character forms and the overall system design over years before arriving at the final 85-symbol syllabary, documented via the well-established account of his multi-stage development process.
      experimentation: [70, 0.65, "d", "A"],
      // Sustained a demanding, self-directed intellectual project over roughly 12 years while also managing ordinary domestic and economic responsibilities, documented via the well-established timeline of the project.
      discipline: [68, 0.5, "s", "A"],
      // Continued pursuing an ambitious, unprecedented project despite no external institutional support or precedent for success, evidencing sustained long-term ambition.
      achievement_drive: [68, 0.5, "s", "A"],
      // Self-initiated the entire syllabary project without commission, request, or institutional backing from any authority, documented via the well-established account of the project's independent origin.
      proactive_agency: [72, 0.65, "d", "A"],
      // Shifted from an initial, unsuccessful attempt at a full logographic system to the successful syllabic approach, suggesting real willingness to revise a failing method.
      adaptability: [58, 0.42, "i", "N"],
      // The sustained, detailed character-design work required for the syllabary evidences real concentrated effort over an extended period.
      deep_focus: [66, 0.46, "s", "A"],
      // Designing 85 distinct, learnable characters that accurately represented Cherokee phonetics required precise, careful symbol design, evidenced by the system's own well-documented completeness and internal consistency.
      detail_orientation: [62, 0.44, "s", "A"],
      // Continued refining the syllabary's design over multiple iterations before arriving at the final version, suggesting sustained craft development toward the finished system.
      mastery_orientation: [60, 0.42, "i", "N"],
      // Pursuing an entirely novel linguistic project with no formal training suggests real underlying intellectual curiosity about language and written communication.
      curiosity: [58, 0.42, "i", "N"],
      // Recognized, reportedly after observing European settlers' use of writing, the transformative potential written language could have for the Cherokee people before any formal institutional effort toward Cherokee literacy existed, documented via the well-established account of the project's motivating observation.
      opportunity_sensing: [62, 0.44, "s", "A"],
      // Designing a complete 85-character system covering the Cherokee language's full phonetic range required real advance structural organization across categories of sound, documented via the well-established completeness and internal consistency of the finished syllabary.
      planning_orientation: [64, 0.5, "s", "A"],
      // The Cherokee Nation's formal adoption of the syllabary as an official writing system suggests real institutional influence, though he himself worked largely as an individual inventor rather than a formal organizational leader.
      leadership_drive: [55, 0.4, "i", "N"],
    },
  },
];

export const ROSTER_5: readonly Person[] = seeds.map(build);
