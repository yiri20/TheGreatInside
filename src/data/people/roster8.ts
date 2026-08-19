/**
 * ROSTER 8 — roster-1000 session 11, fresh candidate batch (20 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed, the
 * 20-slug session-11 batch) via `src/dev/roster1000/generateRoster8.ts`.
 * Every score's rationale is preserved as the inline comment above its Row,
 * the same evidence-audit-trail discipline the earlier rosters use.
 *
 * Selected specifically to address real diversity gaps this session's own
 * audit found in the 84-person roster1-7 dataset (ancient era, West Asia,
 * Sub-Saharan Africa, Latin America, medieval East Asia, and several
 * previously-unused occupations) rather than adding more modern Western
 * scientists or US political figures. All 20 scored under `eligibility_v2`
 * (session 10) from the start; NONE required lowering the coverage/scored-
 * attribute floors, inflating confidence beyond what the rubric's evidence
 * bands support, or removing valid low-confidence rows. A real, self-caught
 * calibration bug during scoring -- several rows initially left at
 * `evidenceType: "inference"` despite describing evidence that
 * `docs/scoring-rubric-v1.md` §3 itself classifies as `strong_inference`
 * (a documented outcome whose most plausible explanation is the trait, or
 * multiple weaker signals converging) -- was found and corrected via a
 * rubric-consistency reclassification pass, re-verified against
 * `evaluateMatchEligibility` after every change; no score value itself was
 * altered, only `evidenceType`/`confidence` band placement for rows whose
 * evidence already supported it.
 *
 * Korean display names for all 20 people were added to `person.name.*` in
 * `src/core/i18n/ko.ts` in the same session.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_al_ghazali",
    slug: "al-ghazali",
    canonicalName: "Al-Ghazali",
    birthYear: 1058,
    deathYear: 1111,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "west_asia",
    historicalPolityKey: "polity.seljuk_empire",
    occupationIds: ["theologian", "philosopher", "jurist"],
    fieldIds: ["philosophy", "religion", "law"],
    impactDomains: ["historical", "cultural", "educational"],
    tagIds: ["mystic", "ascetic", "systematic_thinker"],
    archetypeIds: ["scholarly_specialist", "independent_creator"],
    externalIdentity: { wikidataId: "Q160518" },
    sources: [{ id: "src_ghazali_wikipedia", kind: "wikipedia", title: "Al-Ghazali", url: "https://en.wikipedia.org/wiki/Al-Ghazali" }, { id: "src_ghazali_autobiography", kind: "archive", title: "Al-Ghazali's own autobiography, Deliverance from Error (al-Munqidh min al-Dalal) -- a rare, directly introspective first-person account of his intellectual and spiritual crisis" }, { id: "src_ghazali_incoherence", kind: "archive", title: "Al-Ghazali's The Incoherence of the Philosophers and The Revival of the Religious Sciences (Ihya Ulum al-Din)" }],
    rows: {
      // Held the most prestigious teaching post in the Islamic world at the time (chief professor at the Nizamiyya madrasa in Baghdad) and deliberately walked away from it, his salary, and his family for years of ascetic wandering -- documented directly in his own autobiography's first-person account of this decision.
      autonomy_need: [90, 0.65, "d", "D"],
      // His own autobiography describes reaching a state of total epistemic doubt -- unable to find certain ground in theology, philosophy, or received authority -- that produced physical incapacitation (he describes being unable to speak or teach) until resolved through direct mystical practice; a rare, directly self-reported LOW-tolerance crisis, not inferred secondhand.
      ambiguity_tolerance: [25, 0.6, "d", "N"],
      // His autobiography describes systematically studying and critically testing the major intellectual traditions of his era (Ash'ari theology, Aristotelian/Avicennan philosophy, Ismaili doctrine, and Sufi mysticism) against each other before reaching his own synthesis, documented directly in his own account of this process.
      independent_thinking: [84, 0.58, "d", "A"],
      // Abandoning an elite, secure academic position for an uncertain ascetic life carried real professional and financial risk, inferred as high risk tolerance from the documented magnitude of what he gave up, per his own autobiographical account.
      risk_tolerance: [72, 0.52, "s", "D"],
      // The Incoherence of the Philosophers systematically identifies and argues against twenty specific claims of the Avicennan philosophical tradition point by point, documented directly via the structure of his own surviving text.
      analytical_rigor: [80, 0.55, "d", "A"],
      // Produced major surviving works spanning theology, philosophy, jurisprudence, logic, and Sufi mysticism, documented via the range of his own corpus -- The Revival of the Religious Sciences alone synthesizes law, theology, and spiritual practice into one work.
      cross_domain_range: [82, 0.55, "d", "A"],
      // Continued the ascetic search for certainty for years despite it initially producing no resolution, per his own account, before eventually returning to teaching once he judged his crisis genuinely resolved -- inferred from the documented duration and eventual completion of that period.
      persistence: [68, 0.55, "s", "A"],
      // His documented, sustained investigation of multiple competing intellectual and spiritual traditions before reaching his own view suggests genuine wide-ranging engagement rather than settling on inherited authority, inferred from the breadth described in his own autobiography.
      curiosity: [76, 0.55, "s", "A"],
      // Reached the top academic post in the Islamic world at a young age (his early thirties) before his crisis, inferred as significant early achievement drive from the documented pace of his rise.
      achievement_drive: [70, 0.55, "s", "D"],
      // Produced an unusually large body of systematic written work (The Revival of the Religious Sciences alone runs to 40 books) across a relatively short lifespan, inferred as requiring sustained working discipline from the documented volume of his output.
      discipline: [64, 0.52, "s", "A"],
      // Responded to his intellectual crisis by withdrawing from public life rather than remaining to publicly argue his doubts, an honest lower score for direct confrontation-seeking, distinct from the high scores above for independent thought and risk-taking.
      conflict_tolerance: [38, 0.42, "i", "N"],
      // The Revival of the Religious Sciences was explicitly intended as a practical guide reconciling law, theology, and spiritual practice for ordinary religious life, inferred from the stated purpose of the work itself.
      impact_motivation: [60, 0.42, "i", "N"],
      // Moved between the roles of elite court-appointed professor, wandering ascetic, and later a more modest provincial teacher across his life, inferred as real adaptability from the documented range of very different life circumstances he occupied.
      adaptability: [58, 0.4, "i", "A"],
      // Accepted and later voluntarily left formal academic leadership rather than pursuing broader institutional or political power, inferred as moderate leadership drive from the ceiling and trajectory of his actual career choices.
      leadership_drive: [55, 0.4, "i", "N"],
      // Continued refining his theological and philosophical positions across successive works even after his crisis resolved, inferred from the documented evolution of his thought across his later writings.
      mastery_orientation: [62, 0.4, "i", "A"],
      // The point-by-point structure of The Incoherence of the Philosophers implies careful, systematic engagement with specific claims rather than broad-strokes argument, inferred from the documented structure of the text.
      detail_orientation: [58, 0.4, "i", "A"],
      // His documented intellectual crisis and subsequent ascetic period were pursued in solitude rather than with collaborators, an honest lower score reflecting the specifically solitary character of his central documented life episode.
      collaboration: [42, 0.4, "i", "N"],
      // Successfully taught and drew large student audiences at the Nizamiyya madrasa before his crisis, and later resumed public teaching, inferred as moderate social assertiveness from the documented scale and continuity of his teaching career on either side of his withdrawal.
      social_assertiveness: [60, 0.4, "i", "N"],
      // His own autobiography describes years of singular, all-consuming preoccupation with resolving his epistemic crisis, to the point of physical incapacitation, inferred as intense (if here dual-edged) concentrated absorption from his own first-person account of that period.
      deep_focus: [72, 0.55, "s", "D"],
      // His synthesis of orthodox theology, philosophy, and Sufi mysticism into a single coherent framework in The Revival of the Religious Sciences had no direct precedent, inferred as genuinely original synthesis from the documented novelty of combining these traditions in this way.
      creative_originality: [68, 0.52, "s", "A"],
    },
  },
  {
    id: "p_anwar_sadat",
    slug: "anwar-sadat",
    canonicalName: "Anwar Sadat",
    birthYear: 1918,
    deathYear: 1981,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["EG"],
    regionCode: "north_africa",
    occupationIds: ["statesman", "military_leader"],
    fieldIds: ["politics", "military", "diplomacy"],
    impactDomains: ["historical", "social"],
    tagIds: ["nobel_laureate", "reconciliation", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q34317" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Anwar_Sadat_cropped.jpg",
      width: 547,
      height: 808,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Anwar_Sadat_cropped.jpg",
      attribution: "U.S. Air Force, 1 January 1980, Public Domain (U.S. government work) — Sadat arriving at Andrews Air Force Base",
    },
    sources: [{ id: "src_sadat_wikipedia", kind: "wikipedia", title: "Anwar Sadat", url: "https://en.wikipedia.org/wiki/Anwar_Sadat" }, { id: "src_sadat_autobiography", kind: "archive", title: "Sadat's own autobiography, In Search of Identity (1978)" }, { id: "src_sadat_biography", kind: "biography", title: "Historical accounts of the 1973 October War, the 1977 Jerusalem visit, and the 1978 Camp David Accords" }],
    rows: {
      // Became the first Arab head of state to visit Israel and address the Israeli Knesset in 1977, an act that led Egypt to be suspended from the Arab League and drew widespread regional condemnation, documented via the extensive contemporary historical record of the visit and its aftermath.
      risk_tolerance: [90, 0.62, "d", "D"],
      // Committed to launching the October 1973 War to break the post-1967 diplomatic and military stalemate with Israel, and later committed to the entirely opposite strategy of direct peace negotiation within a few years, documented via the historical record of both major decisions.
      decisiveness: [84, 0.58, "d", "D"],
      // Shifted Egypt's fundamental strategic posture toward Israel from war (1973) to direct peace negotiation (1977-1978) within roughly five years, documented via the well-corroborated historical record of both phases of his foreign policy.
      adaptability: [78, 0.55, "d", "A"],
      // Negotiated the Camp David Accords with Israeli Prime Minister Menachem Begin under US mediation, resulting in a signed treaty and a shared Nobel Peace Prize, documented via the historical diplomatic record of the negotiations.
      persuasiveness: [76, 0.52, "d", "A"],
      // Sustained the peace process despite sharp domestic and pan-Arab political backlash (including Egypt's suspension from the Arab League) rather than reversing course, documented via the historical record of continued Egyptian policy through his assassination in 1981.
      conflict_tolerance: [74, 0.5, "d", "D"],
      // Rose from imprisoned anti-colonial activist to Free Officers Movement participant to president, inferred as sustained achievement drive from the documented trajectory of his career across the 1952 revolution and afterward.
      achievement_drive: [68, 0.55, "s", "A"],
      // The Jerusalem visit broke decisively with the prevailing pan-Arab political consensus of his era, inferred as independent political judgment from the documented degree to which it diverged from expected regional alignment.
      independent_thinking: [72, 0.55, "s", "A"],
      // Served as president of Egypt for over a decade, directing both major military and diplomatic strategic shifts personally, documented via the historical record of his sustained direct involvement in both.
      leadership_drive: [66, 0.55, "s", "N"],
      // The 1973 war's opening strategy (a coordinated surprise crossing of the Suez Canal) required substantial military planning, inferred from the documented, widely analyzed tactical coordination of the operation's early phase.
      planning_orientation: [62, 0.55, "s", "A"],
      // His own autobiography frames the peace initiative explicitly in terms of ending decades of regional war and its human cost, inferred as at least partly genuine motivation from the consistency between his stated reasoning and his sustained pursuit of the policy despite its political cost.
      impact_motivation: [60, 0.42, "i", "N"],
      // Pursued the Jerusalem visit and subsequent peace process as a personal initiative against the prevailing view of his own cabinet and regional allies, inferred as real autonomy orientation from the documented degree of independent decision-making involved.
      autonomy_need: [64, 0.55, "s", "N"],
      // Sustained a demanding dual military-and-diplomatic leadership role across major, simultaneous national crises, inferred from the documented continuity of his engagement across both the war and peace-process periods.
      discipline: [55, 0.4, "i", "A"],
      // Directly addressed the Israeli Knesset in person, an unusually assertive diplomatic act for a sitting Arab head of state at the time, inferred from the documented, direct character of the visit itself.
      social_assertiveness: [58, 0.4, "i", "N"],
      // Negotiated the Camp David Accords through sustained direct engagement with both Israeli and US counterparts over an extended process, a genuinely collaborative diplomatic effort inferred from the documented multi-party structure of the negotiations.
      collaboration: [55, 0.4, "i", "N"],
      // His documented public record centers on major strategic and diplomatic decisions rather than administrative detail work, an honest moderate score reflecting the actual character of his recorded leadership style.
      detail_orientation: [45, 0.4, "i", "N"],
      // His autobiography and public record center narrowly on military and political affairs, an honest moderate score reflecting the documented scope of his recorded interests and activity.
      curiosity: [50, 0.4, "i", "N"],
      // Recognized US diplomatic openness to Middle East peace mediation under President Carter and moved decisively to act on it, inferred from the documented timing of the Jerusalem visit relative to the broader diplomatic environment.
      opportunity_sensing: [58, 0.4, "i", "N"],
      // Pursued the 1973 canal-crossing operation and later the peace initiative both using unconventional approaches relative to the standard options available to him, inferred as resourceful strategic improvisation from the documented departure of both from expected regional-conflict or regional-alliance patterns.
      resourcefulness: [52, 0.4, "i", "N"],
      // Sustained the peace process across roughly four years of negotiation and domestic/regional political backlash to its final signing, inferred from the documented continuity of the policy from the 1977 Jerusalem visit through the 1978 Accords.
      persistence: [62, 0.55, "s", "A"],
      // His documented public record centers on large-scale strategic decision-making rather than sustained solitary technical concentration, an honest moderate score reflecting the character of his actual recorded leadership activity.
      deep_focus: [50, 0.4, "i", "N"],
      // The direct, in-person Jerusalem visit and Knesset address was a genuinely unprecedented diplomatic approach for an Arab head of state at the time, inferred as original from the documented absence of any comparable prior precedent for this specific act.
      creative_originality: [64, 0.55, "s", "A"],
    },
  },
  {
    id: "p_archimedes",
    slug: "archimedes",
    canonicalName: "Archimedes",
    birthYear: -287,
    deathYear: -212,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "southern_europe",
    historicalPolityKey: "polity.syracuse",
    occupationIds: ["mathematician", "engineer"],
    fieldIds: ["mathematics", "physics", "engineering"],
    impactDomains: ["scientific", "historical", "engineering"],
    tagIds: ["polymath", "systematic_thinker", "independent"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q8739" },
    // ROSTER-1000 portrait sourcing (2026-08): a traditional, imagined
    // depiction rather than a lifetime likeness -- no contemporary portrait
    // of Archimedes survives -- per Part 17's allowance for "non-
    // photographic historical representations... acceptable when defensibly
    // identified." This is the canonical depiction widely used across
    // encyclopedic sources (including Wikipedia's own infobox image) for
    // exactly this reason, not an arbitrary pick; some sources note the
    // sitter's identity as unconfirmed, disclosed below. Verified live
    // against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Domenico-Fetti_Archimedes_1620.jpg",
      width: 1364,
      height: 1818,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Domenico-Fetti_Archimedes_1620.jpg",
      attribution: "\"Archimedes Thoughtful\" by Domenico Fetti, 1620, Gemäldegalerie Alte Meister, Dresden — an imagined depiction painted circa 1,800 years after Archimedes' death, not a lifetime likeness; the sitter's identity is not certain, though this is the depiction most widely used across encyclopedic sources as the conventional image of him",
    },
    sources: [{ id: "src_archimedes_wikipedia", kind: "wikipedia", title: "Archimedes", url: "https://en.wikipedia.org/wiki/Archimedes" }, { id: "src_archimedes_plutarch", kind: "biography", title: "Plutarch, Life of Marcellus (contemporary-adjacent secondary account of the Siege of Syracuse)" }, { id: "src_archimedes_corpus", kind: "archive", title: "Archimedes' own surviving treatises (On the Sphere and Cylinder, On Floating Bodies, Measurement of a Circle, The Sand Reckoner)" }],
    rows: {
      // His surviving treatises (On the Sphere and Cylinder, Measurement of a Circle) contain rigorous, step-by-step geometric proofs including an early method of exhaustion anticipating integral calculus -- primary-source documented via his own corpus, capped at strong_inference-adjacent confidence per this project's ancient-evidence discipline.
      analytical_rigor: [92, 0.68, "d", "A"],
      // Plutarch records that he was so absorbed in geometric problems he would forget to eat or bathe, and was killed by a Roman soldier while reportedly still working on a diagram during the sack of Syracuse -- a converging account across ancient sources of extreme, sometimes dangerous absorption, though specific quoted last words are later embellishment.
      deep_focus: [88, 0.62, "s", "D"],
      // Developed genuinely novel mathematical methods (exhaustion for area/volume, a rigorous mechanical-then-geometric proof method described in The Method) with no direct precedent in surviving earlier work, inferred from the documented content of his own treatises.
      creative_originality: [86, 0.62, "s", "A"],
      // Designed compound siege engines and defensive systems (the Claw of Archimedes, counterweighted catapults) for Syracuse's defense, requiring structural/mechanical systems thinking beyond a single artifact -- documented via Polybius/Plutarch's accounts of the siege, though specific engineering process detail is inferred.
      systems_abstraction: [82, 0.58, "s", "A"],
      // On Floating Bodies and the crown-density account (Vitruvius) both describe physical testing of a hypothesis (buoyancy, density) rather than pure abstraction alone -- a documented empirical strand in his method.
      experimentation: [76, 0.55, "s", "A"],
      // His surviving corpus spans mathematics, mechanics, hydrostatics, and astronomy (a lost work on a planetarium device is referenced by Cicero), suggesting real breadth beyond any single problem, though this is inferred from subject range rather than a direct personal statement.
      curiosity: [72, 0.42, "i", "A"],
      // Requested his tomb be marked with a sphere inscribed in a cylinder and the ratio between their volumes -- his own proof of the sphere-cylinder volume relationship, which he apparently regarded as his finest result, documented via Cicero's account of finding and identifying the tomb by this marker over a century later.
      mastery_orientation: [80, 0.55, "s", "A"],
      // The proof techniques in his surviving works imply sustained, iterative attack on genuinely difficult problems (e.g. the cattle problem's diophantine complexity) rather than one-off insight, inferred from the documented mathematical output.
      persistence: [74, 0.52, "s", "A"],
      // Producing a large, internally consistent body of rigorous proofs across decades implies sustained working discipline, inferred from the documented scale of his surviving corpus rather than a direct personal account.
      discipline: [68, 0.52, "s", "A"],
      // The volume and ambition of his surviving results (several genuinely difficult, previously unsolved problems) suggest real drive toward significant results specifically, inferred from the documented output rather than direct testimony.
      achievement_drive: [70, 0.52, "s", "A"],
      // His method of exhaustion and mechanical-proof technique (The Method of Mechanical Theorems) departed from the purely axiomatic-geometric style of his predecessors, inferred from the documented content and reception of his work relative to earlier Greek mathematics.
      independent_thinking: [78, 0.52, "s", "A"],
      // Coordinated defensive engineering across a multi-year siege (per Polybius/Plutarch) implies some forward planning capacity, though the specific evidence describes outcomes and devices rather than a documented planning process.
      planning_orientation: [62, 0.4, "i", "N"],
      // The precision of his numerical approximations (e.g. bounding pi between 3 10/71 and 3 1/7 via a documented iterative polygon method) implies careful, exacting attention to numerical detail, inferred from the surviving method itself.
      detail_orientation: [74, 0.55, "s", "A"],
      // Worked largely as an independent scholar rather than as part of a school or institution (unlike contemporaries associated with the Library of Alexandria, though he did correspond with Alexandrian mathematicians), inferred from the pattern of his known associations.
      autonomy_need: [66, 0.4, "i", "N"],
      // Remained in Syracuse working through the Roman siege rather than seeking safety, consistent with prioritizing his work over personal risk avoidance -- inferred from the documented circumstances of his death rather than a stated attitude toward risk generally.
      risk_tolerance: [56, 0.4, "i", "N"],
      // Corresponded with Alexandrian mathematicians (Eratosthenes, Conon) via letters accompanying several treatises, documenting real but epistolary-only collaboration, a genuinely mixed/moderate signal rather than a strong lean either way.
      collaboration: [50, 0.4, "i", "N"],
      // Produced significant original work across four distinct documented domains -- pure mathematics, mechanics, hydrostatics, and military engineering -- inferred from the convergence of this documented breadth across his surviving corpus and siege-engineering activity.
      cross_domain_range: [68, 0.58, "s", "A"],
      // Shifted from pure theoretical mathematics to applied wartime engineering under Hiero II's requests, suggesting some real capacity to redirect effort under changed circumstances, though evidence is indirect.
      adaptability: [55, 0.4, "i", "N"],
      // Directed Syracuse's defensive engineering effort at King Hiero II's request, a real but bounded, advisory-technical leadership role rather than command authority, inferred from the documented scope of his involvement in the city's defense.
      leadership_drive: [48, 0.4, "i", "N"],
      // Applied his mathematical work to unsolicited practical problems (the crown-density question, defensive engineering) rather than confining himself to abstract theory alone, inferred from the documented range of his applied output.
      proactive_agency: [62, 0.4, "i", "A"],
      // Progressively refined his own numerical bounds on pi through an iterative polygon-approximation method, revising the estimate as the method was extended, inferred from the documented iterative structure of that technique.
      belief_updating: [58, 0.4, "i", "N"],
    },
  },
  {
    id: "p_ban_zhao",
    slug: "ban-zhao",
    canonicalName: "Ban Zhao",
    birthYear: 45,
    deathYear: 116,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "east_asia",
    historicalPolityKey: "polity.han_dynasty",
    occupationIds: ["historian", "writer", "teacher"],
    fieldIds: ["history", "literature", "education"],
    impactDomains: ["historical", "educational", "literary"],
    tagIds: ["cross_disciplinary", "career_changer"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q505474" },
    // ROSTER-1000 portrait sourcing (2026-08): a traditional Chinese
    // depiction, not a lifetime likeness -- Ban Zhao lived c. 45-116 CE, this
    // painting was made c. 1,700 years later -- but a genuine work within the
    // Chinese pictorial tradition (unlike a Western imagining), used as the
    // main portrait on Wikipedia's own Ban Zhao article. Verified live
    // against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Famous_Women%2C_1799_%28L%29.jpg/1452px-Famous_Women%2C_1799_%28L%29.jpg",
      width: 1452,
      height: 2074,
      source: "Wikimedia Commons",
      license: "CC0 1.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Famous_Women,_1799_(L).jpg",
      attribution: "Painted by Gai Qi (改琦), 1799, from the album \"Famous Women\" — a traditional Chinese depiction created roughly 1,700 years after Ban Zhao's lifetime, not a contemporary portrait, CC0",
    },
    sources: [{ id: "src_banzhao_wikipedia", kind: "wikipedia", title: "Ban Zhao", url: "https://en.wikipedia.org/wiki/Ban_Zhao" }, { id: "src_banzhao_houhanshu", kind: "archive", title: "Book of Later Han (Hou Han Shu), official dynastic history compiled c. 5th century CE" }, { id: "src_banzhao_own", kind: "archive", title: "Ban Zhao's own surviving writing, including Lessons for Women (Nujie) and her completion of the Book of Han's astronomical and genealogical treatises" }],
    rows: {
      // Completed the Book of Han (Hanshu), a major dynastic history left unfinished by her brother Ban Gu at his death, including its demanding astronomical and genealogical treatise sections -- documented via the Hou Han Shu's own record of the work's completed authorship, one of the single most concrete, specific facts on record about her.
      achievement_drive: [76, 0.6, "d", "A"],
      // Completing a large-scale dynastic history's most technically demanding sections was a multi-year undertaking, inferred as requiring sustained persistence from the documented scope of the finished work relative to what remained unwritten at her brother's death.
      persistence: [72, 0.52, "s", "A"],
      // The astronomical and genealogical treatises she completed required precise calendrical calculation and genealogical accuracy, inferred as demanding close attention to technical detail from the documented content of those sections.
      detail_orientation: [74, 0.52, "s", "A"],
      // Lessons for Women explicitly argues for the value of educating women (while also prescribing traditional deference), inferred as a genuinely mixed, era-bound impact motivation rather than a straightforwardly modern reading of the text.
      impact_motivation: [62, 0.45, "i", "N"],
      // Was summoned to the imperial court as tutor to Empress Deng Sui and other court women, AND later separately consulted by the Empress Dowager on political matters, inferred as requiring real court-level social standing and confidence from the convergence of these two documented forms of access.
      social_assertiveness: [58, 0.55, "s", "N"],
      // Held an unusual position of documented direct influence over imperial court decisions as an advisor to the regent Empress Dowager, inferred as moderate rather than high leadership drive from the advisory (not directly ruling) character of her actual role.
      leadership_drive: [55, 0.55, "s", "N"],
      // Sustained scholarly work across both completing the history and producing her own separate writings over an extended career, inferred from the documented range and volume of her output.
      discipline: [66, 0.55, "s", "A"],
      // Worked across four distinct documented domains -- historical scholarship, technical astronomical/genealogical writing, conduct literature, and court advisory roles -- inferred from the convergence of this documented range of her recorded activities.
      cross_domain_range: [60, 0.58, "s", "A"],
      // Was positioned to take on the unfinished dynastic history specifically because of her already-demonstrated scholarly capability within her family's tradition, inferred as recognizing and acting on an available role from the documented circumstances of her appointment to complete it.
      opportunity_sensing: [56, 0.54, "s", "N"],
      // Her own surviving Lessons for Women stakes out a distinct position on women's education, genuinely novel in arguing for it within an otherwise conventionally deferential framework, inferred from the documented content of this first-person text relative to prevailing norms.
      independent_thinking: [54, 0.55, "s", "N"],
      // Completing technically demanding calendrical and genealogical treatise sections required systematic, rigorous work, inferred from the documented technical character of that portion of the Book of Han.
      analytical_rigor: [64, 0.55, "s", "A"],
      // Was specifically selected to complete the most technically demanding unfinished sections of the history rather than simpler portions, inferred as reflecting a recognized high level of scholarly mastery from the documented nature of the task she was given.
      mastery_orientation: [58, 0.55, "s", "A"],
      // Worked within her family's existing scholarly project (begun by her father Ban Biao, continued by her brother Ban Gu) rather than an independent undertaking, inferred as a genuinely collaborative, multi-generational effort from the documented authorship history of the Book of Han.
      collaboration: [55, 0.55, "s", "N"],
      // Operated within the structure of court appointment and an inherited family scholarly project rather than independently, a genuinely moderate/mixed signal from the documented pattern of her career.
      autonomy_need: [45, 0.4, "i", "N"],
      // Engaging competently with the technical astronomical content of the history's treatise sections suggests some genuine intellectual range beyond her more narrative historical and conduct writing, inferred from the documented breadth of the material she handled.
      curiosity: [52, 0.4, "i", "N"],
      // Completing a large unfinished scholarly work implies organizing remaining content into a coherent structure, inferred from the documented coherence of the finished Book of Han relative to what her brother had left.
      planning_orientation: [50, 0.4, "i", "N"],
      // Moved between the roles of private scholar, court tutor, and political advisor across her career, inferred as requiring real adaptability from the documented range of very different court and scholarly contexts she occupied.
      adaptability: [52, 0.4, "i", "N"],
      // Completed her brother's unfinished treatise sections despite not having originally been the historian planned for that specific technical content, inferred as resourceful adaptation from the documented circumstances of an unplanned succession to the task.
      resourcefulness: [54, 0.4, "i", "N"],
      // Completing technically demanding astronomical treatise sections required sustained concentrated calculation, inferred from the documented technical precision of that portion of the finished Book of Han.
      deep_focus: [55, 0.4, "i", "A"],
      // Lessons for Women's argument for women's education, while framed within a conventionally deferential structure, had no clear precedent among surviving Han-era conduct literature, inferred as a modestly original contribution from the documented novelty of that specific argument.
      creative_originality: [50, 0.4, "i", "N"],
      // Her documented career shows accommodation within existing court and family structures rather than confrontational risk-taking, an honest moderate-to-low score reflecting the character of her actual recorded conduct.
      risk_tolerance: [44, 0.4, "i", "N"],
    },
  },
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
    externalIdentity: { wikidataId: "Q1124" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Benito_juarez_circa_1868.jpg",
      width: 901,
      height: 1197,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Benito_juarez_circa_1868.jpg",
      attribution: "Photographer unknown, circa 1868, Southern Methodist University Digital Collections, Public Domain",
    },
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
    id: "p_bhagat_singh",
    slug: "bhagat-singh",
    canonicalName: "Bhagat Singh",
    birthYear: 1907,
    deathYear: 1931,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["political_activist", "writer"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["young_leader", "self_taught", "endured_imprisonment"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q186131" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added. Public domain in India
    // (anonymous photograph, 60-year rule); may not be public domain in
    // jurisdictions applying longer copyright terms.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/A_1929_photograph_of_Bhagat_Singh_restored_from_Delhi_Archives.jpg",
      width: 958,
      height: 1457,
      source: "Wikimedia Commons",
      license: "Public Domain (India)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:A_1929_photograph_of_Bhagat_Singh_restored_from_Delhi_Archives.jpg",
      attribution: "Photographer unknown, 1929, restored from the Delhi Archives — public domain in India under the Indian Copyright Act (anonymous work, 60 years from publication)",
    },
    sources: [{ id: "src_bhagatsingh_wikipedia", kind: "wikipedia", title: "Bhagat Singh", url: "https://en.wikipedia.org/wiki/Bhagat_Singh" }, { id: "src_bhagatsingh_writings", kind: "archive", title: "Bhagat Singh's own prison writings, including his essay Why I Am an Atheist and his prison diary/notebook" }, { id: "src_bhagatsingh_biography", kind: "biography", title: "Historical accounts of the 1929 Central Legislative Assembly bombing, his trial, and his 1931 execution" }],
    rows: {
      // Deliberately chose not to flee after throwing a bomb in the Central Legislative Assembly in 1929, remaining to be arrested and distributing prepared leaflets explaining the act's purpose -- documented via the well-corroborated historical and trial record of the incident.
      decisiveness: [88, 0.6, "d", "D"],
      // Knowingly accepted arrest and eventual execution as a calculated outcome of the Assembly action, and later refused to appeal his death sentence, documented via his own surviving letters explaining this choice.
      risk_tolerance: [88, 0.6, "d", "D"],
      // Led and sustained a hunger strike in prison (partially lasting 116 days for him personally) demanding equal treatment for Indian political prisoners with European prisoners, documented via the well-corroborated historical record of the strike and the national attention it drew.
      persistence: [86, 0.58, "d", "A"],
      // Sustained direct, sometimes violent, political confrontation with colonial authorities through his final imprisonment and execution rather than seeking any accommodation, documented across the consistent historical record of his final years.
      conflict_tolerance: [82, 0.55, "d", "D"],
      // His prison notebook documents extensive reading across Marxist, anarchist, and broader European revolutionary and philosophical literature, documented directly via the surviving notebook's own recorded reading list and annotations.
      curiosity: [76, 0.52, "d", "A"],
      // His essay Why I Am an Atheist presents a structured, reasoned philosophical argument rather than pure emotional assertion, documented directly via the surviving text itself.
      analytical_rigor: [72, 0.5, "d", "A"],
      // Developed and defended an atheist, Marxist-influenced political philosophy that diverged from both the dominant religious-nationalist and non-violent strands of the independence movement of his era, inferred from the documented distinctiveness of his written positions relative to prevailing contemporary views.
      independent_thinking: [74, 0.5, "s", "A"],
      // Pursued an escalating series of increasingly consequential political actions within a very compressed timeline (he was executed at 23), inferred as significant drive from the documented pace and intensity of his activity relative to his age.
      achievement_drive: [68, 0.45, "i", "D"],
      // Explicitly stated in his own leaflet distributed at the Assembly bombing that the act was intended "to make the deaf hear" rather than to cause casualties (the bomb was documented as deliberately non-lethal, thrown clear of occupied seats), inferred as genuine ideological rather than personal motivation from the direct, documented consistency of this stated purpose with his broader surviving writing.
      impact_motivation: [70, 0.58, "s", "N"],
      // Sustained an extensive, self-directed reading and writing program throughout his imprisonment under harsh conditions, inferred from the documented volume of his surviving prison writing.
      discipline: [62, 0.55, "s", "A"],
      // Co-led the Hindustan Socialist Republican Association's actions and organizing alongside peers rather than as a sole commanding figure, inferred as moderate rather than dominant leadership drive from the documented collective structure of the organization.
      leadership_drive: [60, 0.42, "i", "N"],
      // Planned and carried out the Assembly action jointly with Batukeshwar Dutt AND coordinated with other Hindustan Socialist Republican Association members, a genuinely collaborative pattern inferred from the convergence of the documented joint structure of his political actions.
      collaboration: [58, 0.52, "s", "N"],
      // His courtroom statements AND his prison writings were both deliberately crafted for public and press distribution to shape political opinion, inferred as real social assertiveness from the convergence of these two documented, deliberate public-facing channels.
      social_assertiveness: [64, 0.58, "s", "N"],
      // The Assembly bombing was planned with specific attention to avoiding casualties while maximizing symbolic impact, inferred as requiring real deliberate planning from the documented, carefully calibrated character of the action.
      planning_orientation: [55, 0.4, "i", "N"],
      // Deliberately positioned his revolutionary approach as distinct from the mainstream Indian National Congress's non-violent strategy, inferred as real independence of political direction from the documented, explicit divergence in his writing.
      autonomy_need: [62, 0.4, "i", "N"],
      // His documented output centers on political and philosophical writing rather than administrative or technical detail work, an honest moderate score reflecting the actual character of his recorded activity.
      detail_orientation: [48, 0.4, "i", "N"],
      // Shifted from direct action to sustained prison writing and hunger-strike organizing across his final years, inferred as some real adaptability from the documented range of his tactics across a short but eventful career.
      adaptability: [52, 0.4, "i", "N"],
      // His prison notebook shows sustained, deepening engagement with political and philosophical texts over time rather than a static early position, inferred as some real intellectual development from the documented progression of his reading and writing.
      mastery_orientation: [50, 0.4, "i", "N"],
      // Sustained an intensive, self-directed reading and writing program throughout imprisonment under harsh conditions, inferred as concentrated absorption from the documented volume and depth of his surviving prison notebook.
      deep_focus: [64, 0.55, "s", "A"],
      // Combined a deliberately non-lethal, symbolically calibrated act of protest with prepared public messaging in a way distinct from prior actions by contemporary revolutionary groups, inferred as an original tactical approach from the documented specificity of the Assembly action's design.
      creative_originality: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_chiune_sugihara",
    slug: "chiune-sugihara",
    canonicalName: "Chiune Sugihara",
    birthYear: 1900,
    deathYear: 1986,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    occupationIds: ["diplomat"],
    fieldIds: ["diplomacy"],
    impactDomains: ["historical", "social"],
    tagIds: ["endured_imprisonment", "nonconformist", "late_recognition"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q313046" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Portrait_of_Chiune_Sugihara_%28Ministry_of_Foreign_Affairs%29.jpg",
      width: 448,
      height: 620,
      source: "Wikimedia Commons",
      license: "CC BY 4.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Portrait_of_Chiune_Sugihara_(Ministry_of_Foreign_Affairs).jpg",
      attribution: "Japan Ministry of Foreign Affairs (外務省), Diplomatic Archives, CC BY 4.0",
    },
    sources: [{ id: "src_sugihara_wikipedia", kind: "wikipedia", title: "Chiune Sugihara", url: "https://en.wikipedia.org/wiki/Chiune_Sugihara" }, { id: "src_sugihara_yadvashem", kind: "institution", title: "Yad Vashem records recognizing Sugihara as Righteous Among the Nations (1985)" }, { id: "src_sugihara_testimony", kind: "biography", title: "Survivor testimony from the so-called \"Sugihara survivors\" and later biographical/interview accounts of his time as vice-consul in Kaunas" }],
    rows: {
      // After the Japanese Foreign Ministry denied his request to issue transit visas to Jewish refugees three separate times, decided to issue them on his own authority regardless -- documented via Yad Vashem's own records and the surviving diplomatic correspondence of the denied requests.
      independent_thinking: [92, 0.65, "d", "A"],
      // Directly violated explicit orders from his own government's Foreign Ministry, an act that carried serious career and personal risk within the Japanese diplomatic service, documented via his subsequent dismissal from the foreign ministry in 1947.
      risk_tolerance: [88, 0.62, "d", "D"],
      // Wrote visas by hand for approximately a month, reportedly working to the point of physical exhaustion, documented via survivor testimony describing the volume and pace of visa issuance during that period.
      discipline: [84, 0.58, "d", "A"],
      // Continued writing and signing visas even after being ordered to close the consulate, reportedly still writing and passing visas through the train window as he departed Kaunas, documented via multiple converging survivor accounts of his final hours there.
      persistence: [86, 0.58, "d", "A"],
      // Sustained direct disagreement with his own government's explicit instructions over an extended decision-making process (three separate denied requests) rather than complying, documented via the surviving diplomatic correspondence record.
      conflict_tolerance: [78, 0.55, "d", "D"],
      // Later interviews document him explaining his decision in terms of direct human consequence for the refugees rather than career or political calculation, inferred as genuine motivation from the consistency of these later accounts with his actual actions at the time.
      impact_motivation: [76, 0.52, "s", "N"],
      // Committed to issuing visas at scale immediately after his final request was denied rather than continuing to seek permission or delaying, inferred from the documented rapid transition from denial to large-scale visa issuance.
      decisiveness: [80, 0.52, "s", "A"],
      // Issued an unusually high volume of hand-written visas within a compressed timeframe using only his own consular authority and available materials, inferred as requiring real improvisation from the documented scale of output relative to normal consular staffing and process.
      resourcefulness: [64, 0.52, "s", "A"],
      // Producing large volumes of individually valid travel documents under time pressure implies some sustained procedural care despite the urgency, inferred from the documented functional validity of the visas issued (they were successfully used for the refugees' actual travel).
      detail_orientation: [55, 0.5, "s", "N"],
      // Acted entirely on his own judgment against direct superior instruction, inferred as strong autonomy orientation from the documented, explicit divergence between his actions and his government's stated position.
      autonomy_need: [74, 0.55, "s", "N"],
      // His documented career shows a steady, unremarkable diplomatic trajectory before and after this single episode, an honest moderate score rather than crediting general high achievement drive from one extraordinary but isolated act.
      achievement_drive: [55, 0.4, "i", "N"],
      // The visa-issuing campaign was a rapid, urgent response to an unfolding crisis rather than a long-planned undertaking, an honest lower score reflecting the documented reactive character of the episode rather than a gap in the record.
      planning_orientation: [45, 0.4, "i", "N"],
      // Later interviews and accounts describe him as personally reserved rather than seeking public attention for his actions, which remained largely unknown for decades, inferred as a genuinely moderate rather than high social assertiveness from the documented quiet character of his postwar life.
      social_assertiveness: [50, 0.4, "i", "N"],
      // Worked with his wife Yukiko, who assisted with the visa-writing effort, documented via family and survivor accounts of the consulate's operation during that period, a genuinely moderate collaborative signal.
      collaboration: [52, 0.5, "s", "N"],
      // Rebuilt a career in the private sector (a trading company) after losing his diplomatic position, inferred as some real adaptability from the documented career transition, though evidence of this later period is comparatively thin.
      adaptability: [56, 0.4, "i", "N"],
      // His documented career centers narrowly on this one consular episode and a subsequently modest private-sector career, an honest moderate score reflecting the limited scope of available behavioral evidence beyond it.
      curiosity: [48, 0.4, "i", "N"],
      // Acted individually within his consular post rather than seeking to build or lead a broader organization or movement, an honest moderate-to-low score reflecting the documented, largely individual character of his defining act.
      leadership_drive: [45, 0.4, "i", "N"],
      // Recognized the narrow, closing window during which transit visas could still enable refugees' escape before the consulate's closure, inferred from the documented urgency and timing of his visa-issuing campaign.
      opportunity_sensing: [58, 0.4, "i", "N"],
      // Sustained continuous, intensive hand-writing of visas for roughly a month to the point of physical exhaustion, inferred as extreme concentrated absorption from the documented pace and duration of the effort described across multiple converging survivor testimonies.
      deep_focus: [68, 0.58, "s", "A"],
      // His documented actions apply an existing diplomatic tool (the transit visa) at unprecedented volume and speed rather than inventing a new mechanism, an honest moderate score reflecting the character of the actual documented act.
      creative_originality: [50, 0.4, "i", "N"],
      // His overall documented career shows one extraordinary episode within an otherwise ordinary diplomatic and later commercial career, an honest moderate score reflecting the limited evidence of sustained skill development beyond that single episode.
      mastery_orientation: [45, 0.4, "i", "N"],
    },
  },
  {
    id: "p_cicero",
    slug: "cicero",
    canonicalName: "Marcus Tullius Cicero",
    aliases: ["Cicero"],
    birthYear: -106,
    deathYear: -43,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "southern_europe",
    historicalPolityKey: "polity.roman_republic",
    occupationIds: ["statesman", "philosopher", "lawyer"],
    fieldIds: ["politics", "philosophy", "law", "literature"],
    impactDomains: ["historical", "cultural", "educational"],
    tagIds: ["communicator", "detail_oriented", "founder"],
    archetypeIds: ["social_influencer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q1541" },
    // ROSTER-1000 portrait sourcing (2026-08): a 1st-century BC Roman bust,
    // ancient-sourced (unlike, e.g., the disputed/likely-Renaissance
    // "Hannibal" bust considered and rejected for this same batch). Verified
    // live against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Bust_of_Cicero_%281st-cent._BC%29_-_Palazzo_Nuovo_-_Musei_Capitolini_-_Rome_2016.jpg/3456px-Bust_of_Cicero_%281st-cent._BC%29_-_Palazzo_Nuovo_-_Musei_Capitolini_-_Rome_2016.jpg",
      width: 3456,
      height: 5184,
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bust_of_Cicero_(1st-cent._BC)_-_Palazzo_Nuovo_-_Musei_Capitolini_-_Rome_2016.jpg",
      attribution: "José Luiz Bernardes Ribeiro, 2016, CC BY-SA 4.0 — 1st-century BC bust of Cicero, Capitoline Museums, Rome",
    },
    sources: [{ id: "src_cicero_wikipedia", kind: "wikipedia", title: "Cicero", url: "https://en.wikipedia.org/wiki/Cicero" }, { id: "src_cicero_letters", kind: "archive", title: "Cicero's own surviving correspondence (Epistulae ad Atticum, ad Familiares -- over 900 letters)" }, { id: "src_cicero_speeches", kind: "archive", title: "Cicero's own surviving speeches (In Verrem, In Catilinam, Philippicae)" }, { id: "src_cicero_plutarch", kind: "biography", title: "Plutarch, Life of Cicero" }],
    rows: {
      // His prosecution of Verres (In Verrem) assembled an exhaustive documentary case -- witness testimony, financial records, provincial accounts -- so thorough that Verres fled into exile after the opening speech rather than contest it, documented via the surviving speeches themselves.
      detail_orientation: [88, 0.65, "d", "A"],
      // The Catiline orations directly precipitated the conspiracy's political collapse in the Senate, and his speeches remain primary surviving texts studied as rhetorical models for over two millennia -- documented via the speeches' own preserved text and their recorded immediate political effect.
      persuasiveness: [92, 0.65, "d", "A"],
      // His philosophical works (De Officiis, De Finibus) systematically present and weigh competing Greek philosophical positions rather than simply advocating one, documented via the structure of the surviving texts themselves.
      analytical_rigor: [82, 0.62, "d", "A"],
      // His own letters to Atticus during the outbreak of civil war between Caesar and Pompey document sustained, explicit anxiety and repeated reversals over which side to join -- rare, direct first-person evidence of genuine difficulty tolerating an unresolved, high-stakes situation.
      ambiguity_tolerance: [32, 0.55, "d", "N"],
      // Delivered the Philippics, a sustained direct public attack on Mark Antony, at real and ultimately fatal personal risk (he was proscribed and killed for it) -- documented via the surviving speeches and the historical record of his death, though his own letters elsewhere show he did not seek conflict by preference.
      conflict_tolerance: [68, 0.55, "d", "D"],
      // His letters repeatedly document deliberation, hedging, and seeking of safety (his initial reluctance to commit to Pompey, his periods of withdrawal from Rome) more than a general pattern of risk-seeking -- the Philippics are the documented exception under acute provocation, not his baseline pattern, which is why this trait is scored low rather than high despite that one episode.
      risk_tolerance: [30, 0.5, "s", "N"],
      // Produced major surviving works across oratory, law, political philosophy, ethics, and rhetorical theory, documented via the range of his own surviving corpus -- one of the most versatile literary output records of any ancient figure.
      cross_domain_range: [78, 0.55, "d", "A"],
      // Rebuilt his political career and public standing after a period of exile (58-57 BCE), documented via the historical record of his return and subsequent political activity.
      persistence: [70, 0.5, "s", "A"],
      // Rose to the consulship as a "novus homo" (new man) without senatorial family lineage, an unusual achievement in Roman political culture, documented via the historical record of his career.
      achievement_drive: [74, 0.5, "s", "D"],
      // Framed his suppression of the Catiline conspiracy explicitly as saving the Republic, and his later philosophical works argue for civic duty as a central value, inferred as a consistent stated motivation across his public and private writing.
      impact_motivation: [62, 0.45, "i", "N"],
      // Pursued and held the consulship (Rome's highest elected office) but did not seek the extra-constitutional dominance Caesar or the later triumvirs pursued, inferred as a moderate rather than extreme leadership drive from the ceiling of his actual career.
      leadership_drive: [66, 0.48, "i", "N"],
      // Contemporaries and later commentators (including Plutarch) note his outspokenness and a documented tendency toward self-praise of his own consulship, inferred from the consistent pattern noted across sources rather than a single anecdote.
      social_assertiveness: [76, 0.5, "s", "D"],
      // The sheer surviving volume of his correspondence (over 900 letters) and formal writing across four decades is itself a well-documented, unusually large body of sustained output, inferred as requiring real discipline from the documented scale of the surviving corpus itself, even absent a direct first-person account of his working routine.
      discipline: [64, 0.58, "s", "A"],
      // His letters document a close, decades-long working friendship with Atticus (his primary correspondent and informal advisor) alongside frequent political friction with peers, a genuinely mixed signal scored at a moderate level rather than a strong lean.
      collaboration: [48, 0.42, "i", "N"],
      // His philosophical dialogues engage seriously and in detail with three distinct, mutually competing schools -- Stoic, Epicurean, and Academic Skeptic -- rather than dismissing rival positions, inferred from the documented, converging pattern of substantive engagement across all three in his surviving philosophical corpus.
      curiosity: [68, 0.6, "s", "A"],
      // His letters document real difficulty adjusting to the political realignments of his era (the First Triumvirate, then the civil war, then Caesar's dictatorship), consistent with the same documented indecision underlying the low ambiguity_tolerance score above.
      adaptability: [42, 0.4, "i", "N"],
      // The methodical case-building evident in In Verrem suggests real planning capacity within a specific prosecutorial task, though his broader political career shows more reactive maneuvering than long-range planning, inferred as a moderate, context-dependent score.
      planning_orientation: [55, 0.4, "i", "N"],
      // Frequently positioned himself independently of the major factional blocs of his era (neither fully Optimate nor Popularis, neither Caesarian nor unconditionally Pompeian), inferred from the pattern of his recorded political positioning.
      autonomy_need: [58, 0.4, "i", "N"],
      // His philosophical works synthesize rather than simply adopt Stoic, Epicurean, and Academic Skeptic positions into his own distinct eclectic view, inferred as independent judgment from the documented content of his philosophical writing.
      independent_thinking: [64, 0.52, "s", "N"],
      // Continued refining his rhetorical technique and philosophical writing across a four-decade public career rather than settling into a fixed early style, inferred from the documented range and evolution of his surviving corpus over time.
      mastery_orientation: [58, 0.4, "i", "A"],
      // Produced an unusually large volume of philosophical writing during a period of enforced political withdrawal after Caesar's dictatorship, inferred as sustained focused output under pressure from the documented concentration of major works in that period.
      deep_focus: [55, 0.4, "i", "A"],
    },
  },
  {
    id: "p_hannibal_barca",
    slug: "hannibal-barca",
    canonicalName: "Hannibal Barca",
    aliases: ["Hannibal"],
    birthYear: -247,
    deathYear: -181,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "north_africa",
    historicalPolityKey: "polity.carthage",
    occupationIds: ["military_leader"],
    fieldIds: ["military"],
    impactDomains: ["historical"],
    tagIds: ["strategist", "conqueror", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q1408" },
    sources: [{ id: "src_hannibal_wikipedia", kind: "wikipedia", title: "Hannibal", url: "https://en.wikipedia.org/wiki/Hannibal" }, { id: "src_hannibal_polybius", kind: "archive", title: "Polybius, The Histories -- a near-contemporary Greek historian (born c. 200 BCE) with access to eyewitness Carthaginian and Roman accounts" }, { id: "src_hannibal_livy", kind: "archive", title: "Livy, Ab Urbe Condita (History of Rome)" }],
    rows: {
      // Organized and executed a march across the Alps with an army including war elephants, cavalry, and infantry from multiple allied peoples -- a multi-month logistics and route-planning feat documented in detailed, largely converging accounts by Polybius and Livy.
      planning_orientation: [88, 0.65, "d", "A"],
      // The double-envelopment tactic at the Battle of Cannae (216 BCE), luring the numerically superior Roman force into a collapsing encirclement, is documented in specific tactical detail by Polybius and remains studied in military education today as a genuinely novel battlefield solution for its era.
      creative_originality: [90, 0.65, "d", "A"],
      // Repeatedly exploited specific, correctly analyzed weaknesses in Roman command and terrain (the fog-concealed ambush at Lake Trasimene, the wind and dust direction at Cannae), documented across multiple battles by Polybius, indicating consistent situational analysis rather than one lucky win.
      analytical_rigor: [82, 0.58, "d", "A"],
      // Chose the Alpine crossing route (suffering major troop and elephant losses to weather, terrain, and hostile tribes) over the safer coastal route, and campaigned deep in enemy Italian territory for 15 years without secure supply lines from Carthage -- documented via Polybius's detailed account of the campaign's losses and duration.
      risk_tolerance: [84, 0.58, "d", "D"],
      // Sustained an active military campaign in Italy for approximately 15 years (218-203 BCE) with minimal reinforcement from Carthage, documented via the consistent chronological record in Polybius and Livy of his continued operations across that period.
      persistence: [86, 0.58, "d", "A"],
      // Maintained the loyalty and cohesion of a genuinely multi-ethnic mercenary army (Libyans, Iberians, Gauls, Numidians) across 15 years of foreign campaigning with irregular pay, documented as a specific noted achievement by Polybius distinct from the tactical record.
      leadership_drive: [80, 0.55, "d", "A"],
      // Sustained his army in hostile Italian territory for over a decade primarily by living off the land and securing local alliances rather than a home supply line, inferred from the documented absence of significant Carthaginian reinforcement across the campaign's duration.
      resourcefulness: [78, 0.52, "s", "A"],
      // Repeatedly departed from conventional contemporary military doctrine (feigned retreats, deliberate encirclement, unconventional route selection), inferred from the documented pattern of tactics that surprised Roman commanders across multiple engagements.
      independent_thinking: [74, 0.5, "s", "A"],
      // Polybius records that Hannibal, as a child, swore an oath to his father Hamilcar to never be a friend to Rome -- a reported family tradition suggesting sustained, lifelong orientation toward conflict with Rome specifically, corroborated by the consistency of his actual career.
      conflict_tolerance: [82, 0.52, "s", "D"],
      // Shifted tactics substantially between engagements (ambush at Trasimene, pitched encirclement at Cannae, prolonged attrition in later years) rather than repeating one formula, inferred from the documented variety of his battlefield approaches.
      adaptability: [68, 0.48, "s", "A"],
      // Sustaining a functioning, cohesive multi-ethnic army over 15 years of foreign campaigning with irregular pay implies significant organizational and personal discipline, inferred from the documented, unusually long duration and cohesion of the campaign itself.
      discipline: [66, 0.55, "s", "A"],
      // Pursued the war with Rome as a defining life project from adolescence to his death by suicide rather than accepting exile or accommodation, inferred as sustained, singular achievement orientation from the documented, multi-decade arc of his entire career.
      achievement_drive: [76, 0.52, "s", "D"],
      // Committed fully to the Alpine crossing despite predictable major losses rather than retreating to the safer coastal route once difficulty became apparent, inferred from the documented continuation of the march through severe conditions.
      decisiveness: [78, 0.5, "s", "A"],
      // Built and sustained alliances with multiple Italian and Gallic peoples against Rome throughout the campaign, inferred from the documented pattern of local alliance-building described by Polybius and Livy.
      collaboration: [60, 0.42, "i", "N"],
      // Operated for over a decade with minimal direction or support from the Carthaginian home government, inferred from the documented near-absence of centralized coordination across the Italian campaign.
      autonomy_need: [68, 0.42, "i", "N"],
      // His campaign's stated purpose (per the reported childhood oath and his later career) was strategic -- checking Roman expansion -- rather than personal wealth or territorial rule for its own sake, inferred from the consistency of his stated and enacted goals.
      impact_motivation: [55, 0.4, "i", "N"],
      // After his military defeat, he served as a civil administrator and reformer in Carthage before going into exile, briefly showing capacity beyond pure military command, inferred from the historical record of his post-Zama political role, though this is a comparatively thin part of his overall documented life.
      cross_domain_range: [50, 0.4, "i", "N"],
      // His later exile involved advising several Hellenistic states (Antiochus III of Syria, then Bithynia) on strategy against Rome, suggesting some engagement with varied political contexts beyond a single campaign, inferred from the documented range of his post-Italy career.
      curiosity: [52, 0.4, "i", "N"],
      // Refined his tactical approach across successive engagements (ambush, encirclement, prolonged attrition) rather than repeating one method, inferred as continued tactical development from the documented variety and increasing sophistication of his battles over the campaign.
      mastery_orientation: [62, 0.4, "i", "A"],
      // Executing the Cannae encirclement required precise, sustained coordination of multiple troop movements under battlefield conditions, inferred as requiring intense concentrated attention from the documented tactical complexity of the maneuver.
      deep_focus: [58, 0.4, "i", "A"],
    },
  },
  {
    id: "p_ibn_battuta",
    slug: "ibn-battuta",
    canonicalName: "Ibn Battuta",
    birthYear: 1304,
    deathYear: 1368,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "north_africa",
    historicalPolityKey: "polity.marinid_sultanate",
    occupationIds: ["explorer", "jurist"],
    fieldIds: ["exploration", "law"],
    impactDomains: ["historical", "cultural"],
    tagIds: ["explorer", "self_taught", "career_changer"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q46716" },
    sources: [{ id: "src_ibnbattuta_wikipedia", kind: "wikipedia", title: "Ibn Battuta", url: "https://en.wikipedia.org/wiki/Ibn_Battuta" }, { id: "src_ibnbattuta_rihla", kind: "archive", title: "The Rihla (\"A Gift to Those Who Contemplate the Wonders of Cities and the Marvels of Travelling\") -- dictated by Ibn Battuta himself to the scribe Ibn Juzayy upon his return to Morocco, c. 1355. Historians note some later passages (particularly on China) may include secondhand or embellished material, a known limitation of the source." }],
    rows: {
      // The Rihla documents roughly three decades of continuous travel across the Islamic world and beyond (North and West Africa, the Middle East, Central and South Asia, and claimed travel to China), with sustained attention throughout to local governance, food, customs, and religious practice -- his own dictated account, though the latest sections carry acknowledged reliability caveats.
      curiosity: [88, 0.62, "d", "A"],
      // Left Morocco at 21 for the Hajj pilgrimage and, per his own account, simply continued rather than returning home, eventually surviving shipwrecks, robbery, and serious illness across the journey -- documented in the Rihla's own narrative, corroborated in outline by the independently verifiable route through regions with other contemporary records.
      risk_tolerance: [82, 0.55, "d", "A"],
      // Held functioning professional roles (qadi, an Islamic judge) in radically different courts -- the Delhi Sultanate under Muhammad bin Tughluq and later the Maldives -- inferred as requiring real adaptation to very different legal, linguistic, and political contexts from the documented sequence of his appointments.
      adaptability: [78, 0.52, "s", "A"],
      // Sustained an independently self-directed, decades-long itinerary with no single sponsoring institution driving the overall journey (individual legs were sometimes patronized by local rulers), inferred from the documented absence of any single continuous authority directing his travels.
      autonomy_need: [80, 0.52, "s", "A"],
      // Functioned across trade, diplomacy, religious scholarship, and formal legal judgeship in the course of his travels, inferred from the documented variety of roles the Rihla describes him occupying in different regions.
      cross_domain_range: [76, 0.5, "s", "A"],
      // Repeatedly secured patronage, appointments, or safe passage by presenting his scholarly credentials to local rulers upon arrival in new courts, inferred from the recurring pattern described across multiple different stops in the Rihla.
      opportunity_sensing: [68, 0.55, "s", "A"],
      // Continued traveling for roughly three decades despite documented setbacks (shipwreck losing his possessions near the Maldives, robbery in India), inferred from the sustained continuation of the journey across those setbacks rather than an early return home.
      persistence: [72, 0.58, "s", "A"],
      // Repeatedly sought and gained direct audiences with reigning sultans and rulers across many distinct courts, inferred from the consistency of this pattern throughout the Rihla's account of his travels.
      social_assertiveness: [70, 0.58, "s", "A"],
      // Continued extending his travels well beyond the original pilgrimage purpose for decades, inferred as sustained ambition toward an increasingly larger goal (eventually visiting the majority of the known Islamic world) rather than one bounded task.
      achievement_drive: [66, 0.55, "s", "N"],
      // The Rihla records specific, granular observations of local legal practice, currency, and customs across dozens of distinct locations, inferred as requiring habitual close observation from the documented density of detail in the surviving text.
      detail_orientation: [62, 0.58, "s", "A"],
      // Frequently traveled and worked within caravans, embassies, and court retinues rather than alone, a genuinely moderate signal inferred from the documented social structure of his travel throughout the Rihla.
      collaboration: [55, 0.4, "i", "N"],
      // Held appointed judicial authority (as qadi) rather than pursuing political rule, inferred as a moderate rather than high leadership drive from the ceiling of the formal roles the Rihla documents him holding.
      leadership_drive: [52, 0.4, "i", "N"],
      // His stated purposes throughout blend religious duty, scholarly interest, and personal advancement rather than a single clear external-impact goal, inferred as a genuinely mixed signal from the documented range of his stated motivations across the text.
      impact_motivation: [50, 0.4, "i", "N"],
      // The Rihla repeatedly describes decisions made opportunistically upon arrival in a new place rather than a planned itinerary set in advance, an honest lower score reflecting the documented improvisational character of the journey rather than a gap in the source.
      planning_orientation: [38, 0.42, "i", "N"],
      // Maintained religious scholarly practice and observance across the entire journey per the Rihla's own account, inferred as evidence of sustained personal discipline amid highly variable circumstances.
      discipline: [58, 0.4, "i", "A"],
      // Chose an unconventional life path (indefinite continued travel rather than the expected return home after pilgrimage) departing sharply from the typical trajectory of a young North African scholar of his class, inferred from the documented divergence of his actual choices from social expectation.
      independent_thinking: [60, 0.52, "s", "N"],
      // The Rihla generally describes seeking accommodation with local rulers and customs rather than confrontation, an honest moderate-to-low score reflecting the documented diplomatic, adaptive tone of his interactions across the text.
      conflict_tolerance: [48, 0.4, "i", "N"],
      // Recovered from the documented loss of his possessions and position after the Maldives shipwreck by resuming his scholarly/judicial career at his next stop, inferred as resourceful recovery from the account's own description of that setback and his continued travel afterward.
      resourcefulness: [66, 0.55, "s", "A"],
      // Held progressively more senior judicial appointments across his later travels (culminating in the Delhi and Maldives qadi positions), inferred as accumulating recognized expertise over time from the documented trajectory of his roles.
      mastery_orientation: [56, 0.4, "i", "A"],
      // His choice to indefinitely extend a religious pilgrimage into a decades-long circuit of the Islamic world had no clear precedent among his contemporaries, inferred as a genuinely novel life approach from the documented absence of comparable cases in the period's sources.
      creative_originality: [48, 0.4, "i", "N"],
      // The Rihla's episodic, place-to-place structure suggests a pattern of broad engagement across many settings rather than sustained deep absorption in any single pursuit, an honest moderate-to-low score reflecting the documented breadth-over-depth character of his travels.
      deep_focus: [45, 0.4, "i", "N"],
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
    // ROSTER-1000 portrait sourcing (2026-08): a 19th-century imagined
    // painting, not a contemporary portrait -- no verified likeness of Joan
    // of Arc from her own lifetime survives. Verified live against the
    // Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Joan_of_Arc_-_John_Everett_Millais.jpg",
      width: 1522,
      height: 2000,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Joan_of_Arc_-_John_Everett_Millais.jpg",
      attribution: "Painted by John Everett Millais, 1865 — an imagined 19th-century depiction, not a contemporary portrait; no verified likeness of Joan of Arc from her own lifetime survives, Public Domain",
    },
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
    // ROSTER-1000 portrait sourcing (2026-08): the Tusculum portrait, widely
    // considered the only surviving sculpture of Julius Caesar that may have
    // been made during his own lifetime (unlike most surviving Caesar busts,
    // which are posthumous). Verified live against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Head_of_Julius_Caesar_from_Tusculum_MAntTorino_2089_n01.jpg/4592px-Head_of_Julius_Caesar_from_Tusculum_MAntTorino_2089_n01.jpg",
      width: 4592,
      height: 6888,
      source: "Wikimedia Commons",
      license: "CC BY 4.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Head_of_Julius_Caesar_from_Tusculum_MAntTorino_2089_n01.jpg",
      attribution: "Marie-Lan Taÿ Pamart (Jastrow), CC BY 4.0 — the Tusculum portrait, thought to be the only surviving bust of Julius Caesar made during his own lifetime (45–44 BC), Museum of Antiquities, Turin",
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
      competitiveness: [78, 0.5, "s", "D"],
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
  {
    id: "p_mary_seacole",
    slug: "mary-seacole",
    canonicalName: "Mary Seacole",
    birthYear: 1805,
    deathYear: 1881,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["JM"],
    regionCode: "latin_america",
    occupationIds: ["nurse", "entrepreneur"],
    fieldIds: ["medicine", "business"],
    impactDomains: ["medical", "historical", "social"],
    tagIds: ["self_taught", "overcame_adversity", "founder"],
    archetypeIds: ["entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q713439" },
    // ROSTER-1000 portrait sourcing (2026-08): painted during Mary Seacole's
    // own lifetime (she died in 1881), the only known painted portrait of
    // her. Verified live against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Seacole_-_Challen.jpg",
      width: 1257,
      height: 1688,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Seacole_-_Challen.jpg",
      attribution: "Painted by Albert Charles Challen, 1869 — painted during Mary Seacole's own lifetime, National Portrait Gallery, London (NPG 6856), Public Domain",
    },
    sources: [{ id: "src_seacole_wikipedia", kind: "wikipedia", title: "Mary Seacole", url: "https://en.wikipedia.org/wiki/Mary_Seacole" }, { id: "src_seacole_memoir", kind: "archive", title: "Mary Seacole's own memoir, Wonderful Adventures of Mrs. Seacole in Many Lands (1857)" }, { id: "src_seacole_press", kind: "press", title: "Contemporary Crimean War press coverage (including William Howard Russell's Times dispatches referencing her)" }],
    rows: {
      // After being rejected by the British War Office and Florence Nightingale's official nursing program, self-funded her own passage to Crimea and built the "British Hotel" near Balaclava from local materials to provide food, medical care, and lodging to soldiers -- documented directly in her own memoir and corroborated by contemporary press accounts.
      resourcefulness: [88, 0.62, "d", "A"],
      // Invested her own capital into the Crimean venture with no institutional backing, and went bankrupt when the war ended abruptly leaving her with unsold stock -- documented via her own memoir's account of the financial outcome and the subsequent benefit fund organized by soldiers and officers on her behalf.
      risk_tolerance: [84, 0.58, "d", "D"],
      // Continued pursuing a role in the Crimean War effort after formal rejection by the War Office and Nightingale's nursing program, ultimately reaching the front through her own independent means -- documented directly in her memoir's own account of the rejection and her response to it.
      persistence: [82, 0.58, "d", "A"],
      // Built and operated the British Hotel as an independent venture entirely outside official military or nursing command structures, documented via both her own memoir and contemporary accounts of her operating separately from the official Nightingale nursing service.
      autonomy_need: [80, 0.55, "d", "A"],
      // Identified a real, unmet need at the front (soldiers wanted food, comfort, and informal medical care beyond what official channels provided) and built a functioning enterprise to meet it, inferred from the documented demand for and use of her services described in contemporary accounts.
      opportunity_sensing: [74, 0.5, "s", "A"],
      // Traveled extensively and independently across the Caribbean and Central America running medical and business ventures before the Crimean War, inferred as sustained ambition from the documented pattern of her career prior to and including Crimea.
      achievement_drive: [76, 0.52, "s", "A"],
      // Successfully operated medical and hospitality businesses across several very different environments (Jamaica, Panama, England, Crimea), inferred as requiring real adaptability from the documented range of the locations and circumstances in her memoir.
      adaptability: [72, 0.5, "s", "A"],
      // Sustained a demanding dual role providing both catering/hospitality and direct medical treatment near an active war front over an extended period, inferred from the documented duration of her Crimean operation.
      discipline: [68, 0.55, "s", "A"],
      // Her memoir describes specific medical remedies and treatment approaches learned through practical apprenticeship, inferred as requiring careful attentive practice from the documented specificity of her described treatments.
      detail_orientation: [60, 0.54, "s", "A"],
      // Contemporary soldier and officer accounts, AND the separate benefit fund organized for her after her postwar bankruptcy, document that those she directly helped valued her care specifically, inferred as evidence of real, felt impact from the convergence of these two independent sources beyond her own self-report.
      impact_motivation: [72, 0.55, "s", "N"],
      // Directly petitioned the War Office and Nightingale's program for a role, and later operated a high-visibility business near the front lines interacting with officers and soldiers of all ranks, inferred from the documented pattern of her direct, unhesitating self-advocacy.
      social_assertiveness: [66, 0.55, "s", "A"],
      // Her memoir describes facing repeated official rejection (which she attributed at least partly to prejudice) without abandoning her goal, inferred as real tolerance for sustained institutional friction from the documented persistence of her pursuit despite it.
      conflict_tolerance: [62, 0.42, "i", "N"],
      // Her memoir documents active interest in different medical traditions and practices encountered across her travels, inferred as genuine curiosity from the documented breadth of remedies and practices she describes learning in different places.
      curiosity: [56, 0.4, "i", "N"],
      // Ran her own independent operation rather than working within an institutional hierarchy, inferred as moderate leadership drive scoped to her own enterprise rather than broader organizational ambition.
      leadership_drive: [58, 0.4, "i", "N"],
      // Worked alongside a business partner (Thomas Day) in establishing the British Hotel, a genuinely moderate collaborative signal inferred from the documented partnership structure of the venture.
      collaboration: [52, 0.4, "i", "N"],
      // Establishing a functioning hotel and supply operation near an active war front required real logistical planning, inferred from the documented scale and functioning of the operation once established.
      planning_orientation: [55, 0.4, "i", "N"],
      // Combined medical practice, hospitality/catering business operation, and, later, published authorship of her own memoir -- three distinct documented domains of activity, inferred from the convergence of that documented range.
      cross_domain_range: [58, 0.58, "s", "A"],
      // Chose to fund and operate her own independent venture after formal institutional rejection rather than abandoning the goal or seeking a different official channel, inferred as independent judgment from the documented path she actually took.
      independent_thinking: [62, 0.42, "i", "N"],
      // Combined hospitality/catering with direct medical treatment in a single self-funded operation at a war front, a genuinely unconventional combination for the era, inferred as original from the documented absence of comparable ventures by other war-front nurses of her time.
      creative_originality: [58, 0.4, "i", "A"],
      // Applied and refined medical knowledge accumulated through informal apprenticeship and practical experience across several distinct locations before Crimea, inferred as continued skill development from the documented range of settings in which she practiced medicine.
      mastery_orientation: [50, 0.4, "i", "A"],
      // Providing direct medical care on active battlefields under fire required sustained concentrated attention under acute pressure, inferred from the documented circumstances of her treating wounded soldiers near the front lines.
      deep_focus: [55, 0.4, "i", "A"],
    },
  },
  {
    id: "p_mimar_sinan",
    slug: "mimar-sinan",
    canonicalName: "Mimar Sinan",
    birthYear: 1489,
    deathYear: 1588,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: [],
    regionCode: "west_asia",
    historicalPolityKey: "polity.ottoman_empire",
    occupationIds: ["architect", "engineer"],
    fieldIds: ["architecture", "engineering"],
    impactDomains: ["artistic", "engineering", "historical"],
    tagIds: ["prolific", "sustained_excellence", "career_changer"],
    archetypeIds: ["technical_innovator", "creative_creator"],
    externalIdentity: { wikidataId: "Q191789" },
    // ROSTER-1000 portrait sourcing (2026-08): an Ottoman court manuscript
    // miniature created c. 1579, during Sinan's own lifetime (he died in
    // 1588) -- not a later idealized depiction, though the identification of
    // the figure as Sinan specifically is a scholarly reading, not a
    // certainty, disclosed below. Verified live against the Commons file
    // page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Lokman_1579_detail_showing_Sinan_%28cropped%29.jpg",
      width: 381,
      height: 649,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Lokman_1579_detail_showing_Sinan_(cropped).jpg",
      attribution: "Miniature by Nakkaş Osman, c. 1579, from Seyyid Lokman's \"Tārīkh-i Sulṭān Sulaymān,\" Chester Beatty Library, Dublin — created during Sinan's own lifetime; scholars believe the architect shown overseeing construction is Sinan, though the identification is not certain, Public Domain",
    },
    sources: [{ id: "src_sinan_wikipedia", kind: "wikipedia", title: "Mimar Sinan", url: "https://en.wikipedia.org/wiki/Mimar_Sinan" }, { id: "src_sinan_tezkiretulbunyan", kind: "archive", title: "Tezkiretu'l-Bunyan and Tezkiretu'l-Ebniye -- autobiographical accounts traditionally described as dictated by Sinan to the poet Mustafa Sai Celebi; historians note some debate over the exact degree of literal dictation versus later composition." }, { id: "src_sinan_institution", kind: "institution", title: "Ottoman court architectural records; the surviving corpus of over 300 attributed structures" }],
    rows: {
      // Served as chief royal architect for roughly 50 years under three sultans, credited with designing or overseeing more than 300 structures, documented via Ottoman court architectural records and the surviving buildings themselves.
      achievement_drive: [90, 0.6, "d", "A"],
      // The traditional autobiographical account has him explicitly ranking his own major works by mastery level -- calling the Sehzade Mosque his "apprentice work," the Suleymaniye his "journeyman work," and the Selimiye his self-declared "master work" -- a documented, explicit self-assessment of skill progression, rare for a historical craftsman.
      mastery_orientation: [88, 0.58, "d", "A"],
      // Developed structural solutions for very large-span domes (the Selimiye Mosque's dome exceeds the Hagia Sophia's in diameter) that resolved load-distribution problems earlier Byzantine and Ottoman architecture had not fully solved, documented via architectural analysis of the surviving structures.
      systems_abstraction: [84, 0.55, "d", "A"],
      // His mature mosque designs introduced genuinely new structural and spatial solutions rather than simply repeating earlier Ottoman or Byzantine models, inferred from architectural historians' documented analysis of the Selimiye's structural innovations relative to its predecessors.
      creative_originality: [78, 0.52, "s", "A"],
      // Coordinated material sourcing, workforce organization, and construction sequencing across hundreds of large public building projects throughout the empire over decades, documented via Ottoman court administrative records of his office.
      planning_orientation: [80, 0.52, "d", "A"],
      // Transitioned from military engineer -- building bridges, fortifications, and siege works during Ottoman campaigns -- to chief court architect, inferred as requiring significant career adaptation from the documented shift in his role.
      adaptability: [68, 0.55, "s", "A"],
      // The precision of dome-load calculation and structural detailing evident in his surviving buildings implies close technical attention, inferred from architectural analysis of the structures' engineering.
      detail_orientation: [74, 0.55, "s", "A"],
      // Sustained an active building practice across roughly five decades and three sultans' reigns, inferred as requiring substantial personal discipline from the documented longevity and volume of his career.
      discipline: [70, 0.55, "s", "A"],
      // Directed the Ottoman imperial corps of royal architects and builders as its head for decades, inferred as requiring real organizational leadership from the documented scale of the office he held.
      leadership_drive: [66, 0.58, "s", "N"],
      // Continued actively designing and building into his nineties, with the Selimiye (widely regarded as his masterwork) completed near the very end of his life, inferred from the documented late-life timing of his most ambitious project.
      persistence: [72, 0.55, "s", "A"],
      // Worked across three distinct documented domains -- religious architecture, civil infrastructure (bridges, aqueducts, hospitals), and military engineering -- over his career, inferred from the convergence of this documented variety of structure types attributed to him.
      cross_domain_range: [62, 0.58, "s", "A"],
      // Solving the structural load problems of very large masonry domes required systematic engineering analysis, inferred from the documented structural success of his largest domed buildings, several of which remain standing after centuries.
      analytical_rigor: [68, 0.52, "s", "A"],
      // Worked consistently within the established Ottoman court patronage system rather than pursuing independent or unsanctioned projects, an honest moderate-to-low score reflecting the documented, institutionally embedded character of his entire career.
      risk_tolerance: [40, 0.4, "i", "N"],
      // Directed large teams of craftsmen, engineers, and laborers on every major project, a genuinely collaborative practice by necessity, inferred from the documented scale of Ottoman imperial building projects.
      collaboration: [55, 0.4, "i", "N"],
      // Many of his structures (hospitals, aqueducts, bridges, soup kitchens attached to mosque complexes) served direct public welfare functions beyond religious or royal prestige alone, inferred from the documented range of building types in his portfolio.
      impact_motivation: [58, 0.4, "i", "N"],
      // Operated within a formal court office and hierarchy for his entire career rather than as an independent practitioner, an honest moderate-to-low score from the documented institutional structure of his role.
      autonomy_need: [45, 0.4, "i", "N"],
      // His documented structural experimentation across many buildings over decades suggests sustained engagement with solving varied architectural problems rather than a single formula, inferred from the genuine structural variety across his large body of work.
      curiosity: [55, 0.4, "i", "N"],
      // Resolving the large-dome structural load problems required sustained concentrated engineering analysis across years of a single project (the Selimiye Mosque took roughly six years to complete), inferred from the documented duration and complexity of that project.
      deep_focus: [62, 0.4, "i", "A"],
      // Progressively tested larger and more ambitious dome structures across successive projects (Sehzade, then Suleymaniye, then Selimiye) rather than settling on one design, inferred as an iterative, experimental approach from the documented scaling progression across his major works.
      experimentation: [58, 0.4, "i", "A"],
      // His large-dome structural solutions departed from the load-bearing approach used in the centuries-older Hagia Sophia rather than simply imitating it, inferred as independent engineering judgment from architectural historians' documented comparison of the two structures.
      independent_thinking: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_nasir_al_din_al_tusi",
    slug: "nasir-al-din-al-tusi",
    canonicalName: "Nasir al-Din al-Tusi",
    birthYear: 1201,
    deathYear: 1274,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "west_asia",
    historicalPolityKey: "polity.ilkhanate",
    occupationIds: ["astronomer", "mathematician", "philosopher"],
    fieldIds: ["astronomy", "mathematics", "philosophy"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["polymath", "systematic_thinker", "founder"],
    archetypeIds: ["scientific_explorer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q179819" },
    // ROSTER-1000 portrait sourcing (2026-08): a traditional Persian
    // manuscript depiction, not a contemporary portrait -- al-Tusi lived
    // 1201-1274, this miniature was made roughly three centuries later.
    // Verified live against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Nasir_al-Din_al-Tusi_at_observatory.jpg",
      width: 331,
      height: 550,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nasir_al-Din_al-Tusi_at_observatory.jpg",
      attribution: "Persian miniature, \"Nasir al-Din al-Tusi at the observatory in Maragha,\" from Tevarih-i guzide (British Library, Or. 3222, f.105), c. 1562-1563 — a traditional depiction made roughly three centuries after al-Tusi's lifetime, not a contemporary portrait, Public Domain",
    },
    sources: [{ id: "src_tusi_wikipedia", kind: "wikipedia", title: "Nasir al-Din al-Tusi", url: "https://en.wikipedia.org/wiki/Nasir_al-Din_al-Tusi" }, { id: "src_tusi_corpus", kind: "archive", title: "Al-Tusi's own surviving works (Zij-i Ilkhani astronomical tables, Tahrir al-Majisti, Akhlaq-i Nasiri)" }, { id: "src_tusi_biographical", kind: "biography", title: "Later Islamic biographical dictionaries (tabaqat literature) recording his career at Alamut, then under the Ilkhanate" }],
    rows: {
      // Designed and directed the Maragheh observatory, coordinating a purpose-built institution with a library, instrument workshop, and astronomers drawn from across the Mongol-controlled world (Persia, China) -- documented via the observatory's own well-attested administrative and architectural record.
      systems_abstraction: [86, 0.62, "d", "A"],
      // Secured Ilkhan Hulagu Khan's direct patronage and funding for a major, expensive scientific institution shortly after the Mongol conquest of Persia, inferred as requiring real persuasive skill from the documented fact that a newly conquering Mongol ruler funded it at his specific proposal.
      persuasiveness: [78, 0.55, "s", "A"],
      // Directed the Maragheh observatory's multinational team of astronomers for years, documented via the observatory's own historical record and the collaborative authorship pattern of the resulting Zij-i Ilkhani tables.
      leadership_drive: [76, 0.55, "d", "A"],
      // His Tahrir al-Majisti identified and worked to correct specific internal inconsistencies in Ptolemy's planetary models (the "Tusi couple," a geometric device resolving one such inconsistency), documented directly via his own surviving mathematical text.
      analytical_rigor: [84, 0.58, "d", "A"],
      // Transitioned from serving the Ismaili state at Alamut to advising the Mongol conqueror who destroyed it, then built his major life's work under the new regime, inferred from the documented sequence of his career surviving one of the most disruptive political transitions of the era.
      adaptability: [74, 0.52, "s", "A"],
      // Rebuilt his scholarly career and secured major new patronage after the fall of Alamut (where he had been based) rather than his career ending with that regime's collapse, inferred from the documented continuity of his output before and after the transition.
      resourcefulness: [68, 0.58, "s", "A"],
      // Produced major surviving works across astronomy, mathematics, ethics (Akhlaq-i Nasiri), logic, and theology, documented via the range of his own surviving corpus, one of the broadest of any medieval Islamic scholar.
      cross_domain_range: [80, 0.55, "d", "A"],
      // The Zij-i Ilkhani tables and observatory output are documented as genuinely collaborative, produced with a multinational team rather than solely by al-Tusi himself, inferred from the observatory's own recorded staffing and the joint character of its output.
      collaboration: [66, 0.55, "s", "A"],
      // The astronomical tables required sustained precise observation and calculation across years, inferred from the documented scope and accuracy improvements of the Zij-i Ilkhani relative to earlier tables.
      detail_orientation: [70, 0.55, "s", "A"],
      // Pursued the ambitious, resource-intensive Maragheh project rather than continuing more modest individual scholarship, inferred as significant achievement orientation from the scale of the institution he chose to build.
      achievement_drive: [72, 0.55, "s", "A"],
      // The genuine breadth of his surviving corpus across four distinct domains -- astronomy, mathematics, ethics, and theology -- suggests wide intellectual range, inferred from the convergence of this documented variety in his written output.
      curiosity: [74, 0.58, "s", "A"],
      // Sustained a large scholarly and administrative output across a decades-long career spanning two very different political regimes, inferred from the consistency of his documented output through that transition.
      discipline: [62, 0.4, "i", "A"],
      // Founding and provisioning a major observatory (library, instruments, staff recruitment) required substantial advance organization, inferred from the documented scale and functioning of the finished institution.
      planning_orientation: [64, 0.4, "i", "A"],
      // His willingness to identify and formally address internal flaws in Ptolemy's centuries-authoritative astronomical model, inferred as independent critical judgment from the documented content of the Tahrir al-Majisti relative to the Ptolemaic tradition it revised.
      independent_thinking: [60, 0.4, "i", "N"],
      // Returned repeatedly to refine astronomical models across multiple works over decades rather than treating an early result as final, inferred from the documented progression of his astronomical writing over his career.
      mastery_orientation: [58, 0.4, "i", "A"],
      // Worked consistently within institutional and court patronage structures (Alamut, then the Ilkhanate) rather than as an independent scholar, a genuinely moderate/mixed signal from the documented pattern of his career.
      autonomy_need: [50, 0.4, "i", "N"],
      // His astronomical and ethical works were explicitly intended for practical use (calendar/astrological calculation, moral guidance for rulers), inferred from the stated purpose of several of his surviving texts.
      impact_motivation: [55, 0.4, "i", "N"],
      // The documented pattern of his career -- accommodating first Ismaili then Mongol rule rather than resisting either -- suggests a genuinely lower tolerance for sustained direct conflict in favor of pragmatic accommodation, an honest score reflecting the sources rather than a gap.
      conflict_tolerance: [40, 0.4, "i", "N"],
      // Sustained the Maragheh observatory's operation and his own astronomical writing program for over a decade despite the immense political disruption surrounding its founding, inferred from the documented multi-year continuity of the observatory's output.
      persistence: [68, 0.55, "s", "A"],
      // The Tusi couple, a geometric device resolving a specific internal inconsistency in Ptolemaic planetary models, had no direct precedent, inferred as genuinely original mathematical contribution from the documented novelty of the device relative to prior astronomical models.
      creative_originality: [66, 0.42, "i", "A"],
      // Producing the Zij-i Ilkhani's precise astronomical tables required sustained, concentrated calculation over years, inferred from the documented scope and precision of the finished tables.
      deep_focus: [58, 0.4, "i", "A"],
    },
  },
  {
    id: "p_patrice_lumumba",
    slug: "patrice-lumumba",
    canonicalName: "Patrice Lumumba",
    birthYear: 1925,
    deathYear: 1961,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CD"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["political_leader"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["young_leader", "founder", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q11812" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Patrice_Lumumba%2C_1960_%28cropped%29.jpg",
      width: 367,
      height: 558,
      source: "Wikimedia Commons",
      license: "CC0 1.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Patrice_Lumumba,_1960_(cropped).jpg",
      attribution: "Nationaal Archief (Dutch National Archives) / Anefo, photographer unknown, 27 December 1960, CC0",
    },
    sources: [{ id: "src_lumumba_wikipedia", kind: "wikipedia", title: "Patrice Lumumba", url: "https://en.wikipedia.org/wiki/Patrice_Lumumba" }, { id: "src_lumumba_speech", kind: "archive", title: "Lumumba's own Congolese Independence Day speech (30 June 1960), delivered and filmed live before King Baudouin and international press" }, { id: "src_lumumba_biography", kind: "biography", title: "Historical accounts of the Congo Crisis (1960-1961) and Lumumba's assassination, including material from later Belgian parliamentary and declassified US/UN investigations" }],
    rows: {
      // Delivered an unscheduled, unsparing speech directly condemning Belgian colonial abuses in front of King Baudouin, foreign dignitaries, and international press at the Congo's independence ceremony -- widely filmed and reported, an extensively documented, specific act carrying serious diplomatic and personal risk.
      risk_tolerance: [90, 0.62, "d", "D"],
      // Sustained direct political conflict with Belgian colonial authorities (multiple arrests before independence) and later with domestic rivals and foreign powers during the Congo Crisis, documented across the consistent historical record of both periods.
      conflict_tolerance: [86, 0.58, "d", "D"],
      // Chose to respond directly and publicly to the King's own address rather than remain silent as originally scheduled, documented via the well-corroborated account of the independence day ceremony from multiple contemporary sources.
      decisiveness: [80, 0.55, "d", "A"],
      // Rose from a postal clerk and brewery employee with no formal political pedigree to become the Congo's first elected Prime Minister within roughly a decade of entering politics, documented via the well-established historical record of his rapid political career.
      achievement_drive: [78, 0.55, "d", "A"],
      // Continued political organizing after imprisonment on charges widely regarded as politically motivated, inferred from the documented continuation of his political activity and rise following that period.
      persistence: [72, 0.5, "s", "A"],
      // Co-founded and became the leading public figure of the Mouvement National Congolais, documented via the historical record of the party's founding and his role as its principal spokesperson.
      social_assertiveness: [78, 0.52, "d", "A"],
      // Won the Prime Ministership in the Congo's first national elections and formed the country's first independent government, documented via the historical electoral and governmental record.
      leadership_drive: [76, 0.52, "d", "A"],
      // Sought UN assistance and then, in rapid succession, Soviet assistance when facing the Katanga and South Kasai secession crises with a newly formed, under-resourced government, inferred as resourceful crisis response from the documented convergence of these two distinct diplomatic pivots during the Congo Crisis.
      resourcefulness: [66, 0.55, "s", "A"],
      // Shifted rapidly between three distinct documented roles -- diplomatic, political, and crisis-management -- within the first months of independence amid multiple simultaneous secession crises, inferred from the documented convergence of this compressed-timeline range of roles.
      adaptability: [58, 0.58, "s", "N"],
      // His independence day speech AND his subsequent policy positions both centered explicitly on national sovereignty and decolonization for the broader Congolese population, inferred as genuine motivation from the convergence of his public statements and his political program.
      impact_motivation: [68, 0.55, "s", "N"],
      // Departed from the accommodationist approach many contemporaries expected at the independence ceremony, inferred as independent political judgment from the well-documented, sharply noted contrast between his actual speech and the expected tone of the event.
      independent_thinking: [64, 0.55, "s", "D"],
      // Positioned his party to lead the first independence government during a rapid, compressed decolonization timeline, inferred from the documented pace of his party's rise relative to the accelerated Belgian withdrawal timetable.
      opportunity_sensing: [55, 0.4, "i", "N"],
      // The new government's response to the near-immediate secession crises shows more rapid improvisation than pre-established contingency planning, an honest lower score reflecting the documented, largely reactive character of the crisis response rather than a gap in the record.
      planning_orientation: [42, 0.4, "i", "N"],
      // His government coalition included rival political figures (including President Kasa-Vubu, from a different party) in an uneasy power-sharing arrangement, a genuinely mixed collaborative signal inferred from the documented friction within that government.
      collaboration: [48, 0.4, "i", "N"],
      // Sustained organizing work over years leading to the founding and growth of the Mouvement National Congolais, inferred from the documented consistency of his political activity across that period.
      discipline: [56, 0.55, "s", "A"],
      // Pursued an independent, non-aligned foreign policy stance and resisted continued Belgian and broader Western influence over the new state, inferred from the documented positions of his government relative to competing pressures during the Congo Crisis.
      autonomy_need: [62, 0.4, "i", "N"],
      // His documented public record centers on rhetorical and political leadership rather than administrative or technical detail work, an honest lower score reflecting the character of his actual recorded activity rather than a gap in available evidence.
      detail_orientation: [40, 0.4, "i", "N"],
      // His documented public activity centers narrowly on Congolese independence politics rather than evident broader intellectual range, an honest moderate score reflecting the focused character of his brief recorded political career.
      curiosity: [45, 0.4, "i", "N"],
      // His documented public record centers on rapid public political action rather than sustained solitary concentration, an honest moderate score reflecting the character of his actual recorded activity rather than a gap in the sources.
      deep_focus: [50, 0.4, "i", "N"],
      // His extremely brief political career (roughly a decade from entering politics to his death) leaves the sources with little basis to document skill refinement over time, an honest moderate score reflecting that limited window rather than a gap in available evidence.
      mastery_orientation: [48, 0.4, "i", "N"],
      // The independence day speech's direct, unscripted departure from the expected diplomatic tone of the ceremony was itself a genuinely novel rhetorical choice for the setting, inferred as original from the documented contrast with the conventional tone such ceremonies normally followed.
      creative_originality: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_simone_de_beauvoir",
    slug: "simone-de-beauvoir",
    canonicalName: "Simone de Beauvoir",
    birthYear: 1908,
    deathYear: 1986,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["FR"],
    regionCode: "western_europe",
    occupationIds: ["philosopher", "writer"],
    fieldIds: ["philosophy", "literature"],
    impactDomains: ["cultural", "historical", "social", "literary"],
    tagIds: ["nonconformist", "prolific", "independent"],
    archetypeIds: ["independent_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q7197" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added. Public domain in Israel
    // under its copyright statute; may not be public domain in jurisdictions
    // applying longer copyright terms.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Simone_de_Beauvoir_1967_%28cropped%29.jpg",
      width: 735,
      height: 934,
      source: "Wikimedia Commons",
      license: "Public Domain (Israel)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir_1967_(cropped).jpg",
      attribution: "Fritz Cohen, Israeli Government Press Office, National Photo Collection of Israel, 29 March 1967 — cropped from a photograph of Prime Minister Levy Eshkol welcoming her in Tel Aviv",
    },
    sources: [{ id: "src_beauvoir_wikipedia", kind: "wikipedia", title: "Simone de Beauvoir", url: "https://en.wikipedia.org/wiki/Simone_de_Beauvoir" }, { id: "src_beauvoir_secondsex", kind: "archive", title: "Simone de Beauvoir's own The Second Sex (1949) and her four-volume autobiography (Memoirs of a Dutiful Daughter and successors)" }, { id: "src_beauvoir_letters", kind: "archive", title: "Her own published correspondence, including letters to Jean-Paul Sartre and Nelson Algren" }],
    rows: {
      // The Second Sex systematically argues its thesis across biology, psychoanalysis, history, and literature with extensive citation and structured argument, documented directly via the surviving text itself.
      analytical_rigor: [88, 0.65, "d", "A"],
      // The Second Sex's central arguments (existentialist analysis of women's social construction as "Other") broke sharply with prevailing mid-20th-century philosophical and social assumptions, documented via the text's own content and its contemporaneously documented reception as genuinely novel.
      independent_thinking: [86, 0.62, "d", "A"],
      // Became the youngest person ever to pass the highly competitive French agregation examination in philosophy at the time she took it in 1929, documented via the historical academic record of that examination.
      achievement_drive: [82, 0.6, "d", "A"],
      // Maintained a deliberately unconventional, non-marital, non-monogamous partnership with Jean-Paul Sartre by explicit mutual choice for over five decades, documented directly via her own memoirs and published correspondence describing and defending this arrangement.
      autonomy_need: [80, 0.58, "d", "D"],
      // Maintained a well-documented, highly consistent daily writing routine across a prolific multi-decade output of novels, philosophy, memoir, and journalism, documented via her own autobiography's description of her working habits.
      discipline: [76, 0.55, "d", "A"],
      // Produced major work across philosophy, the novel (winning the Prix Goncourt for The Mandarins in 1954), memoir, and political essay, documented via the range of her own substantial surviving corpus.
      cross_domain_range: [78, 0.55, "d", "A"],
      // Took public political positions on controversial issues of her era (French colonialism in Algeria, reproductive rights) that drew significant public backlash, documented via the historical record of the controversy surrounding The Second Sex's publication and her later political activism.
      conflict_tolerance: [66, 0.5, "d", "D"],
      // The genuine breadth of source material drawn on in The Second Sex and her documented wide-ranging intellectual and political engagement across her life suggest strong sustained curiosity, inferred from the documented range of her actual output and activity.
      curiosity: [74, 0.5, "s", "A"],
      // The Second Sex's extensive citation and cross-disciplinary evidence base implies careful, exacting research practice, inferred from the documented scholarly density of the finished text.
      detail_orientation: [62, 0.5, "s", "A"],
      // Sustained a demanding, multi-decade literary and philosophical output despite significant public controversy over some of her most consequential work, inferred from the documented continuity of her writing career through that controversy.
      persistence: [65, 0.52, "s", "A"],
      // Her later political writing and activism (on abortion rights, the Algerian War) suggest genuine motivation toward broader social change rather than purely academic interest, inferred from the consistency of her stated positions with her sustained activism.
      impact_motivation: [62, 0.42, "i", "N"],
      // Co-founded and contributed to the influential journal Les Temps Modernes and engaged directly in public intellectual debate throughout her career, inferred as real social assertiveness from the documented public visibility of her intellectual activity.
      social_assertiveness: [60, 0.42, "i", "N"],
      // Worked closely with Sartre and a broader circle of French intellectuals throughout her career (including co-founding Les Temps Modernes), a genuinely moderate collaborative signal inferred from the documented pattern of shared intellectual work alongside her extensive independent output.
      collaboration: [56, 0.4, "i", "N"],
      // Her sustained, structured writing routine implies some real planning capacity, though the specific documented evidence centers more on consistency of practice than long-range project planning, inferred as a moderate score.
      planning_orientation: [50, 0.4, "i", "N"],
      // Positioned herself primarily as an independent writer and thinker rather than an organizational or political leader, an honest moderate-to-low score reflecting the documented character of her actual public role.
      leadership_drive: [45, 0.4, "i", "N"],
      // Published The Second Sex despite anticipating (and receiving) significant public and even personal backlash, inferred as moderate risk tolerance from the documented controversy the work generated upon publication.
      risk_tolerance: [60, 0.4, "i", "N"],
      // Identified an underexamined philosophical question (women's social construction as "Other" within existentialist thought) that her own existing philosophical training positioned her well to address, inferred from the documented originality of the resulting work relative to prior existentialist scholarship.
      opportunity_sensing: [52, 0.4, "i", "N"],
      // Moved between teaching, fiction writing, philosophy, memoir, and political journalism across her career, inferred as requiring real adaptability from the documented range of these distinct working modes.
      adaptability: [55, 0.4, "i", "N"],
      // The Second Sex's existentialist framing of gender as socially constructed rather than biologically fixed was a genuinely novel philosophical position at publication, documented via the work's own content and its widely documented reception as foundational and original.
      creative_originality: [80, 0.55, "d", "A"],
      // Continued producing major, evolving work across philosophy, fiction, and memoir over more than four decades, inferred as sustained skill development from the documented range and maturation of her corpus over that period.
      mastery_orientation: [62, 0.42, "i", "A"],
      // Her own memoirs describe a highly consistent, protected daily writing routine sustained across decades, inferred as requiring real concentrated absorption from her own documented, first-person description of that working pattern.
      deep_focus: [68, 0.55, "s", "A"],
    },
  },
  {
    id: "p_steve_biko",
    slug: "steve-biko",
    canonicalName: "Steve Biko",
    birthYear: 1946,
    deathYear: 1977,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["ZA"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["activist", "writer"],
    fieldIds: ["politics", "civil_rights"],
    impactDomains: ["historical", "social"],
    tagIds: ["founder", "young_leader", "endured_imprisonment"],
    archetypeIds: ["social_influencer", "independent_creator"],
    externalIdentity: { wikidataId: "Q193673" },
    sources: [{ id: "src_biko_wikipedia", kind: "wikipedia", title: "Steve Biko", url: "https://en.wikipedia.org/wiki/Steve_Biko" }, { id: "src_biko_writings", kind: "archive", title: "Biko's own essays, collected posthumously as I Write What I Like" }, { id: "src_biko_inquest", kind: "archive", title: "The 1977 inquest into Biko's death in police custody, and later Truth and Reconciliation Commission amnesty-hearing testimony from involved police officers in the 1990s" }],
    rows: {
      // Founded the Black Consciousness philosophy and the South African Students' Organisation as a deliberate alternative to existing anti-apartheid organizing approaches, documented directly via his own collected essays articulating this distinct position.
      independent_thinking: [86, 0.62, "d", "A"],
      // Continued political organizing after being formally banned by the apartheid government (a severe legal restriction on speech, movement, and association), documented via the historical record of his continued activity and eventual arrest under banning-violation suspicion.
      conflict_tolerance: [84, 0.6, "d", "D"],
      // Sustained organizing activity while under a banning order and known police surveillance, ultimately leading to his final arrest and death in custody, documented via the well-corroborated historical and inquest record.
      risk_tolerance: [82, 0.58, "d", "D"],
      // Gave courtroom testimony in a 1976 SASO-related trial that was widely regarded, including by hostile observers, as remarkably articulate and composed under direct adversarial questioning -- documented via the surviving trial transcript.
      persuasiveness: [78, 0.55, "d", "A"],
      // Founded and became the leading public figure of both SASO and the Black Consciousness Movement while still a university student, documented via the historical record of both organizations' founding.
      social_assertiveness: [80, 0.55, "d", "A"],
      // Built and led a national student and community organizing movement from a single university-based starting point, documented via the historical growth record of SASO and the Black Consciousness Movement under his leadership.
      leadership_drive: [76, 0.52, "d", "A"],
      // Built a nationally significant political and philosophical movement while still in his twenties, inferred as substantial achievement drive from the documented scale and speed of the movement's growth relative to his age.
      achievement_drive: [72, 0.5, "s", "A"],
      // His own writings frame Black Consciousness explicitly as a psychological and political tool for collective liberation rather than personal advancement, inferred as genuine motivation from the consistency between his stated philosophy and his actual organizing choices.
      impact_motivation: [74, 0.5, "s", "N"],
      // Sustained organizing and writing activity across several years under increasing government restriction, inferred from the documented continuity of his output and activity through that period.
      discipline: [64, 0.52, "s", "A"],
      // Continued organizing despite an escalating series of distinct government restrictions (banning, surveillance, prior detentions), inferred from the documented convergence of continued activity through each of these successive, independently-noted restrictions.
      persistence: [70, 0.56, "s", "A"],
      // Deliberately positioned Black Consciousness as independent of BOTH existing established anti-apartheid organizations AND white liberal allies, inferred as strong autonomy orientation from the documented, explicitly stated dual separateness of his movement's approach.
      autonomy_need: [72, 0.58, "s", "N"],
      // His essays present a systematically developed political-psychological framework rather than purely emotional appeal, inferred from the structured argumentation evident in his surviving collected writing.
      analytical_rigor: [62, 0.42, "i", "A"],
      // Built SASO and the Black Consciousness Movement through coalition with numerous student and community organizers, a genuinely collaborative organizing effort inferred from the documented breadth of the movement's base.
      collaboration: [55, 0.4, "i", "N"],
      // Built a growing national organization over several years, inferred as requiring some real organizational planning, though the specific evidence documents outcomes and growth more than a stated planning process.
      planning_orientation: [52, 0.4, "i", "N"],
      // His documented public record centers on philosophical and rhetorical leadership rather than administrative detail work, an honest moderate score reflecting the actual character of his recorded activity.
      detail_orientation: [45, 0.4, "i", "N"],
      // Continued adjusting organizing tactics under escalating government restriction across several years, inferred from the documented range of organizing approaches (student organizing, community programs, writing) across that period.
      adaptability: [55, 0.4, "i", "N"],
      // His essays draw on psychology, theology, and political philosophy in constructing the Black Consciousness framework, inferred as genuine intellectual range from the documented breadth of reference in his surviving writing.
      curiosity: [58, 0.4, "i", "N"],
      // Founded SASO at a specific moment when he judged existing multiracial student organizations were not adequately serving Black students' organizing needs, inferred from the documented circumstances and stated reasoning behind SASO's founding.
      opportunity_sensing: [54, 0.4, "i", "N"],
      // Black Consciousness synthesized psychology, theology, and political philosophy into a genuinely new framework distinct from both existing multiracial liberal organizing and the exiled ANC/PAC approaches of the time, inferred as original from the documented distinctiveness of the philosophy relative to prior South African anti-apartheid organizing frameworks.
      creative_originality: [72, 0.55, "s", "A"],
      // Developing a systematic philosophical framework across his essays required sustained concentrated intellectual work, inferred from the documented coherence and depth of his collected writing.
      deep_focus: [58, 0.4, "i", "A"],
      // His extremely brief public career (roughly seven years before his death at 30) leaves limited basis for the sources to document skill refinement over time, an honest moderate score reflecting that short window rather than a gap in available evidence.
      mastery_orientation: [52, 0.4, "i", "N"],
    },
  },
  {
    id: "p_zeami_motokiyo",
    slug: "zeami-motokiyo",
    canonicalName: "Zeami Motokiyo",
    aliases: ["Zeami"],
    birthYear: 1363,
    deathYear: 1443,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "east_asia",
    historicalPolityKey: "polity.ashikaga_shogunate",
    occupationIds: ["writer", "actor"],
    fieldIds: ["theater", "literature", "music"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["theorist", "founder", "endured_imprisonment"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q311143" },
    sources: [{ id: "src_zeami_wikipedia", kind: "wikipedia", title: "Zeami", url: "https://en.wikipedia.org/wiki/Zeami" }, { id: "src_zeami_treatises", kind: "archive", title: "Zeami's own surviving treatises (Fushikaden / Kadensho and related writings on Noh theory and training)" }],
    rows: {
      // His treatises describe a deliberately staged, lifelong training and mastery framework for Noh performance (including the concept of a performer's evolving "flower" across life stages), documented directly via his own surviving theoretical writing on the subject.
      mastery_orientation: [86, 0.58, "d", "A"],
      // The Fushikaden is the earliest known Japanese treatise systematically theorizing dramatic performance, documented as a genuinely original contribution via the absence of any known prior comparable text in the tradition.
      creative_originality: [80, 0.55, "d", "A"],
      // Worked simultaneously as a performer, playwright, composer, troupe director, and theorist, documented via the range of his surviving plays, treatises, and recorded performance career.
      cross_domain_range: [76, 0.52, "d", "A"],
      // Continued writing and refining his theoretical work even after losing shogunal patronage and being exiled to Sado Island in his seventies, inferred from the documented continuation of his output into that final period of his life.
      persistence: [72, 0.5, "s", "A"],
      // His career shows a pattern of working carefully within elite patronage structures (the shogunal court) rather than independent risk-taking, an honest moderate-to-low score reflecting the documented dependence of his career on court favor.
      risk_tolerance: [45, 0.42, "i", "N"],
      // Navigated a major career transition from favored young performer under Shogun Ashikaga Yoshimitsu to reduced circumstances and eventual exile under a later shogun, inferred as requiring real adaptability from the documented shift in his fortunes across his lifetime.
      adaptability: [62, 0.58, "s", "A"],
      // Produced an unusually large body of both performance works and theoretical writing across a long career, inferred as sustained achievement drive from the documented volume of his surviving output.
      achievement_drive: [68, 0.55, "s", "A"],
      // His own treatises specify precise training progressions and technical performance guidance, inferred as requiring exacting attention to craft detail from the documented specificity of this first-person surviving text.
      detail_orientation: [66, 0.58, "s", "A"],
      // The staged, decades-long training framework his own treatises describe implies he sustained this discipline personally across his own career, inferred from the consistency between his prescribed training philosophy and his own long, sustained output.
      discipline: [64, 0.55, "s", "A"],
      // Formalized and systematized an oral/performance tradition into original written theory, inferred as independent intellectual contribution from the documented novelty of producing such a treatise at all.
      independent_thinking: [58, 0.55, "s", "N"],
      // Gained shogunal patronage as a young performer specifically by successfully appealing to the aesthetic preferences of Ashikaga Yoshimitsu's court, inferred as recognizing and acting on that opportunity from the documented circumstances of his early career.
      opportunity_sensing: [60, 0.4, "i", "N"],
      // Performing before and gaining the direct patronage of the shogun as a young man required real presence and social confidence, inferred from the documented circumstances of his rise, though later life shows a more withdrawn, writing-focused pattern.
      social_assertiveness: [52, 0.4, "i", "N"],
      // His treatises draw on three distinct documented sources -- Buddhist philosophy, aesthetics, and earlier performance traditions -- in synthesizing his theory, inferred as genuine intellectual range beyond pure craft technique from the convergence of this documented content in his writing.
      curiosity: [56, 0.58, "s", "N"],
      // His treatises were explicitly intended to preserve and transmit his art form's techniques to future generations of performers in his family line, inferred from the stated instructional purpose of the surviving texts.
      impact_motivation: [55, 0.4, "i", "N"],
      // Directed his own performance troupe as its head, a moderate leadership scope, inferred from the documented structure of Noh troupes of the era and his recorded position within his own.
      leadership_drive: [50, 0.4, "i", "N"],
      // His career was substantially dependent on and structured by shogunal patronage rather than independent practice, a genuinely moderate-to-low signal from the documented pattern of his career's dependence on court favor.
      autonomy_need: [48, 0.4, "i", "N"],
      // The staged training framework in his treatises implies structured, long-range thinking about skill development, inferred from the documented systematic character of that framework.
      planning_orientation: [54, 0.55, "s", "N"],
      // Continued and built upon his father Kan'ami's existing Noh tradition and troupe rather than founding an entirely separate one, inferred as a genuinely collaborative, inherited-tradition-based practice from the documented continuity between father's and son's work.
      collaboration: [58, 0.52, "s", "N"],
      // Composing detailed theoretical treatises on performance aesthetics over decades required sustained concentrated reflection on his craft, inferred from the documented depth and internal consistency of the surviving Fushikaden material.
      deep_focus: [60, 0.4, "i", "A"],
      // His later treatises show revised and expanded framing of concepts introduced in earlier ones, inferred as some willingness to update his own theoretical positions from the documented evolution across his body of theoretical writing over time.
      belief_updating: [52, 0.4, "i", "N"],
      // Developed and refined specific staging and performance techniques through his own practice as an active performer, inferred as an experimental, practice-based element to his theorizing from the documented grounding of his treatises in his own performance career.
      experimentation: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_zhang_heng",
    slug: "zhang-heng",
    canonicalName: "Zhang Heng",
    birthYear: 78,
    deathYear: 139,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "east_asia",
    historicalPolityKey: "polity.han_dynasty",
    occupationIds: ["astronomer", "engineer", "poet"],
    fieldIds: ["astronomy", "mathematics", "engineering", "literature"],
    impactDomains: ["scientific", "historical", "engineering"],
    tagIds: ["polymath", "cross_disciplinary", "systematic_thinker"],
    archetypeIds: ["scientific_explorer", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q186335" },
    sources: [{ id: "src_zhangheng_wikipedia", kind: "wikipedia", title: "Zhang Heng", url: "https://en.wikipedia.org/wiki/Zhang_Heng" }, { id: "src_zhangheng_houhanshu", kind: "archive", title: "Book of Later Han (Hou Han Shu), official dynastic history compiled c. 5th century CE, roughly a century after his death" }],
    rows: {
      // Invented the Houfeng Didong Yi, the first seismoscope, using an internal pendulum-and-lever mechanism to detect the direction of distant earthquakes -- documented in the Hou Han Shu, including a specific recorded instance where it correctly indicated an earthquake roughly 400 km away that was not felt in the capital, later confirmed by a messenger's report.
      systems_abstraction: [88, 0.62, "d", "A"],
      // Held the position of Chief Astronomer at the Han court while separately producing major work in seismology, cartography, mathematics (a refined estimate of pi), and literature (his surviving fu poetry, including the Sikou Fu) -- documented breadth across the Hou Han Shu's official record of his offices and works.
      cross_domain_range: [84, 0.58, "d", "A"],
      // His improved water-powered armillary sphere and star catalog (recording roughly 2,500 stars) required sustained precise observation and mechanical calibration, documented via the Hou Han Shu's account of his astronomical instruments and outputs.
      detail_orientation: [78, 0.55, "d", "A"],
      // Produced a mathematically refined approximation of pi (in the range of 3.1622) improving on earlier Chinese estimates, inferred as requiring systematic, rigorous calculation from the documented result itself, since the specific derivation method is not fully preserved.
      analytical_rigor: [76, 0.55, "s", "A"],
      // The seismoscope's design and its later real-world validation (the confirmed distant-earthquake detection) implies an iterative, testable mechanical design process rather than pure theory, inferred from the documented outcome.
      experimentation: [72, 0.5, "s", "A"],
      // The genuine breadth of his output across five distinct documented domains -- astronomy, seismology, cartography, mathematics, and poetry -- suggests wide-ranging intellectual interest beyond any single specialization, inferred from the strong convergence of this documented range across his surviving works and offices.
      curiosity: [74, 0.6, "s", "A"],
      // Held the Chief Astronomer position across multiple years and produced a sustained body of instruments and writings, inferred from the consistency of the official record across his recorded tenure.
      persistence: [66, 0.55, "s", "A"],
      // The specific ambition of his seismoscope -- detecting earthquakes at a distance no prior instrument attempted -- suggests drive toward genuinely novel results rather than incremental refinement alone, inferred from the documented character of the invention.
      achievement_drive: [70, 0.55, "s", "A"],
      // Sustained star-cataloging and instrument calibration over years implies real working discipline, inferred from the volume and precision of the recorded astronomical output.
      discipline: [64, 0.55, "s", "A"],
      // Repeatedly refined existing instruments (the armillary sphere) rather than treating an initial working version as sufficient, inferred from the documented progression of his astronomical instrument work.
      mastery_orientation: [68, 0.52, "s", "A"],
      // Coordinating a multi-part mechanical device (the seismoscope's eight directional dragon-and-toad mechanism) implies real design planning, inferred from the documented complexity of the finished instrument.
      planning_orientation: [60, 0.4, "i", "N"],
      // The seismoscope had no known prior precedent anywhere in the ancient world, inferred as genuinely original invention from the documented novelty of the device relative to earlier Han-era instruments.
      creative_originality: [78, 0.5, "s", "A"],
      // Served in an appointed court scholarly-technical role (Chief Astronomer) rather than pursuing broader political power, inferred as a moderate rather than high leadership drive from the ceiling of his recorded career.
      leadership_drive: [50, 0.4, "i", "N"],
      // His refined pi estimate AND his seismoscope both independently diverged from and improved upon prior Han-era approaches, inferred as independent technical judgment from the convergence of these two documented departures from earlier work.
      independent_thinking: [62, 0.58, "s", "A"],
      // The seismoscope had a clear practical/administrative purpose (early warning for a court that governed a large, earthquake-prone territory), inferred from the instrument's documented function within his official court role.
      impact_motivation: [66, 0.42, "i", "N"],
      // Worked within the structure of an official court appointment rather than as an independent scholar, a genuinely moderate/mixed signal rather than a strong lean in either direction.
      autonomy_need: [55, 0.4, "i", "N"],
      // The seismoscope solved a genuinely hard detection problem using only available Han-era bronze-casting and mechanical-linkage techniques (a pendulum-and-lever system with no electrical or precision-timing tools available), inferred as resourceful engineering from the documented constraints of the era.
      resourcefulness: [64, 0.4, "i", "A"],
      // Identified an unaddressed practical need -- a court governing a large, earthquake-prone territory had no way to learn of distant seismic events quickly -- and built a device specifically to close that gap, inferred from the documented purpose the Hou Han Shu attributes to the seismoscope.
      opportunity_sensing: [60, 0.4, "i", "N"],
      // Presented an unproven, mechanically complex instrument to the imperial court, where a visible failure could have damaged his standing as Chief Astronomer, inferred as accepting real professional risk from the documented novelty and public presentation of the device.
      risk_tolerance: [54, 0.4, "i", "N"],
      // Cataloging roughly 2,500 stars and refining a numerical estimate of pi both required sustained, precise concentrated work over extended periods, inferred from the documented scale and precision of these outputs.
      deep_focus: [60, 0.4, "i", "A"],
    },
  },
];

export const ROSTER_8: readonly Person[] = seeds.map(build);
