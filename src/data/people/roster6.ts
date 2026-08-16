/**
 * ROSTER 6 — roster-1000 session 6 (5 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed, the
 * 5-slug session-6 batch) via `src/dev/roster1000/generateRoster6.ts`. Every
 * score's rationale is preserved as the inline comment above its Row, the
 * same evidence-audit-trail discipline the earlier rosters use.
 *
 * Two distinct sources, both documented in docs/roster-1000-checkpoint.md:
 * (1) elizabeth-blackwell, ludwig-wittgenstein, nicolaus-copernicus,
 * wu-zetian -- 4 of 6 candidates in a deliberate diagnostic control
 * experiment, genuinely re-researched from their session-5 held state with
 * real institutional/scholarly sources (never fabricated), crossing all
 * three eligibility floors as an honest result, not a forced one. The other
 * 2 diagnostic candidates (franz-kafka, rosa-parks) improved substantially
 * but remained genuinely short and stayed held -- not converted.
 * (2) harriet-tubman -- 1 of 8 candidates in a fresh "corrected research
 * depth" batch researched from scratch this session; the other 7 improved
 * across two real research rounds but stayed genuinely short of the
 * confidence floor and remained held.
 *
 * Korean display names for all 5 people were added to `person.name.*`
 * in `src/core/i18n/ko.ts` in the same session.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_elizabeth_blackwell",
    slug: "elizabeth-blackwell",
    canonicalName: "Elizabeth Blackwell",
    birthYear: 1821,
    deathYear: 1910,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB", "US"],
    regionCode: "north_america",
    occupationIds: ["physician"],
    fieldIds: ["medicine"],
    impactDomains: ["medical", "social", "educational"],
    tagIds: ["founder", "overcame_adversity"],
    archetypeIds: ["visionary_pioneer"],
    externalIdentity: { wikidataId: "Q234572" },
    sources: [{ id: "src_blackwell_wikipedia", kind: "wikipedia", title: "Elizabeth Blackwell", url: "https://en.wikipedia.org/wiki/Elizabeth_Blackwell" }, { id: "src_blackwell_nps", kind: "institution", title: "U.S. National Park Service — Dr. Elizabeth Blackwell" }, { id: "src_blackwell_nlm", kind: "institution", title: "US National Library of Medicine -- Changing the Face of Medicine: Elizabeth Blackwell", url: "https://www.nlm.nih.gov/exhibition/changing-the-face-of-medicine/physicians/biography_elizabeth_blackwell.html" }, { id: "src_blackwell_autobiography", kind: "biography", title: "Elizabeth Blackwell, Pioneer Work in Opening the Medical Profession to Women (1895)" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: sourced
    // from the National Library of Medicine, photographer unknown, public
    // domain (published before 1931).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Elizabeth_Blackwell.jpg",
      width: 288,
      height: 405,
      source: "Wikimedia Commons",
      license: "Public Domain (published before 1931)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Elizabeth_Blackwell.jpg",
      attribution: "National Library of Medicine, photographer unknown",
    },
    rows: {
      // Applied to and was rejected by roughly 29 medical schools before Geneva Medical College accepted her (reportedly as a student-body joke that was then honored), documented via the well-established, multiply-corroborated account of her admissions campaign.
      persistence: [86, 0.65, "d", "A"],
      // Pursued formal medical training when no woman had ever earned a US medical degree, facing documented social ostracism and professional exclusion throughout her training, including being made to sit separately in some lectures.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Pursued medicine specifically because a dying friend told her she would have been spared indignity with a female doctor, a documented, specific origin for a career choice that directly contradicted the era's near-universal assumption that medicine was not a field for women.
      independent_thinking: [82, 0.65, "d", "A"],
      // Became the first woman to earn a US medical degree (1849), then founded her own infirmary and later a medical college for women, documented via the well-established sequence of these institutional achievements.
      achievement_drive: [76, 0.65, "d", "A"],
      // Founded the New York Infirmary for Indigent Women and Children and later a Women's Medical College, documented via the well-established institutional record of both organizations she built and led.
      leadership_drive: [74, 0.65, "d", "A"],
      // Secured medical training and later practical clinical experience despite documented, sustained institutional exclusion (being denied hospital positions available to male colleagues), working around these barriers via her own institution-building rather than being blocked by them.
      resourcefulness: [70, 0.65, "d", "A"],
      // Explicitly founded her infirmary and college specifically to provide medical care by and for women who were otherwise underserved, and to train other women physicians, documented via the well-established stated purpose of both institutions.
      impact_motivation: [78, 0.65, "d", "A"],
      // Sustained rigorous formal medical training and subsequently further clinical study in Paris and London despite documented institutional exclusion at each stage.
      discipline: [66, 0.48, "s", "A"],
      // After being rejected when she applied to work at an existing city dispensary's women's department, she independently founded her own dispensary in a rented room in 1853 rather than seeking another institutional position, growing it by 1857 into the New York Infirmary for Women and Children -- a specific, documented instance of self-directed institution-building, not inferred from general biography.
      autonomy_need: [66, 0.65, "d", "A"],
      // Self-initiated both the founding of the New York Infirmary and the subsequent Women's Medical College without waiting for institutional invitation, documented via the well-established independent origin of both projects.
      proactive_agency: [68, 0.65, "d", "A"],
      // Sustained her medical career and institution-building through documented ongoing professional exclusion and public skepticism throughout her working life.
      conflict_tolerance: [62, 0.46, "s", "R"],
      // Formal medical training and clinical practice require real careful attention to diagnostic and treatment detail, though direct documentation of her personal working method specifically (beyond her institutional achievements) is limited for this era.
      detail_orientation: [58, 0.42, "i", "N"],
      // Worked closely with her sister Emily Blackwell, also a physician, in building and running the New York Infirmary, documented via the well-established joint leadership of that institution.
      collaboration: [58, 0.42, "i", "N"],
      // Continued pursuing further clinical training in Europe after her initial US degree, seeking additional specialized surgical experience, documented via the well-established record of her postgraduate study in Paris and London.
      mastery_orientation: [58, 0.42, "i", "N"],
      // Sustained public advocacy for women's medical education across her career, including public lecturing, suggesting real comfort with public professional engagement despite the era's active resistance to her role.
      social_assertiveness: [55, 0.4, "i", "N"],
      // Founding and structuring both a functioning infirmary and a full medical college curriculum evidences substantial advance institutional planning.
      planning_orientation: [58, 0.42, "i", "N"],
      // Pursued formal medical training and further specialized study across multiple countries, suggesting real sustained interest in expanding her own clinical knowledge.
      curiosity: [55, 0.4, "i", "N"],
      // After contracting purulent ophthalmia from a patient at La Maternite in Paris and losing sight in one eye, she abandoned her prior ambition to become a surgeon and redirected her career toward general practice and public health rather than leaving medicine -- a specific, documented career pivot in response to a real physical setback (US National Library of Medicine institutional biography).
      adaptability: [56, 0.65, "d", "N"],
      // Sustained rigorous formal medical study and later specialized postgraduate surgical training in Paris and London, evidencing real sustained concentrated technical effort.
      deep_focus: [64, 0.46, "s", "A"],
      // Sustained substantive work across clinical medicine, medical education institution-building, and public health advocacy writing, documented via her varied bibliography and institutional record.
      cross_domain_range: [58, 0.65, "d", "A"],
      // Applied to nearly thirty medical schools in succession after being rejected, and enrolled the moment Geneva Medical College admitted her (even though the faculty had presented her application to the student body as a joke vote expecting rejection) -- a specific, documented pattern of immediate, sustained decisive action in the face of repeated institutional rejection (US National Library of Medicine).
      decisiveness: [62, 0.65, "d", "A"],
    },
  },
  {
    id: "p_harriet_tubman",
    slug: "harriet-tubman",
    canonicalName: "Harriet Tubman",
    birthYear: 1822,
    deathYear: 1913,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["activist"],
    fieldIds: ["civil_rights"],
    impactDomains: ["historical", "social"],
    tagIds: ["endured_imprisonment", "leader"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q102870" },
    sources: [{ id: "src_tubman_wikipedia", kind: "wikipedia", title: "Harriet Tubman", url: "https://en.wikipedia.org/wiki/Harriet_Tubman" }, { id: "src_tubman_bradford", kind: "biography", title: "Sarah H. Bradford, Harriet, the Moses of Her People (1886/1901), the only biography authorized by Tubman in her lifetime, based on Tubman's own interviews" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: a
    // carte-de-visite by Benjamin F. Powelson, Auburn NY, c. 1868-69. Public
    // domain (photographer died 1885; published before 1931).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Harriet_Tubman_c1868-69.jpg",
      width: 5400,
      height: 8651,
      source: "Wikimedia Commons",
      license: "Public Domain (photographer died 1885; published before 1931)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Harriet_Tubman_c1868-69.jpg",
      attribution: "Benjamin F. Powelson, c. 1868-69",
    },
    rows: {
      // Personally returned to slave-holding territory roughly 13 times over about 11 years to lead approximately 70 enslaved people to freedom, with a substantial bounty on her own head throughout -- one of the most extensively documented sustained personal-risk patterns in the roster, corroborated by Bradford's authorized biography and broader historical record.
      risk_tolerance: [95, 0.85, "d", "A"],
      // Sustained roughly 13 separate rescue missions over about 11 years, documented via Bradford's biography and independently corroborated historical record, never losing a single person under her direct guidance.
      persistence: [92, 0.85, "d", "A"],
      // Planned and led the Combahee Ferry Raid of June 1863, which freed over 700 enslaved people -- documented as the first US military operation in the Civil War planned and executed under the leadership of a woman.
      leadership_drive: [90, 0.75, "d", "A"],
      // Self-initiated her own escape and every subsequent rescue mission with no institutional mandate, and separately approached the Union Army to propose serving as an armed scout and spy -- both specific, documented instances of self-directed initiative beyond any assigned role.
      proactive_agency: [88, 0.7, "d", "A"],
      // Documented use of varied, improvised evasion tactics across her rescue missions (route changes, disguises, exploiting rail and river crossings) to avoid slave catchers over more than a decade of operations, corroborated across multiple independent historical accounts, not merely one source's characterization.
      resourcefulness: [84, 0.65, "d", "A"],
      // Sustaining roughly 13 successful rescue missions with zero losses over 11 years implies real advance route/timing planning, though the surviving record documents outcomes more thoroughly than her specific planning process.
      planning_orientation: [82, 0.6, "s", "A"],
      // Sustaining a decade-plus covert operational pattern under mortal risk implies real sustained behavioral discipline, inferred from the documented outcomes rather than a single directly on-point instance.
      discipline: [80, 0.6, "s", "A"],
      // Rescue missions under active pursuit necessarily required rapid, high-stakes decisions; the historical record documents specific outcomes more thoroughly than her individual decision-making process in the moment.
      decisiveness: [80, 0.55, "s", "A"],
      // Explicit, sustained lifelong focus on freeing others (rescue missions, wartime scouting, later suffrage activism) indicates strong impact-oriented motivation, inferred from the consistent pattern across her documented life's work.
      impact_motivation: [85, 0.6, "s", "A"],
      // Operating largely independently on dangerous covert missions suggests real personal self-direction, though this is inferred from the nature of the work rather than a specific documented statement of preference.
      autonomy_need: [76, 0.5, "i", "N"],
      // Widely and independently corroborated across multiple biographical accounts (not solely Bradford's) that she carried a pistol on rescue missions and was prepared to use the threat of it against escaping individuals who wanted to turn back and risk exposing the group -- a specific, multiply-documented instance, not a single-source anecdote.
      conflict_tolerance: [70, 0.65, "d", "N"],
      // Sustained, escalating scope of activity (individual rescues, then a military operation, then postwar activism) suggests real sustained ambition, inferred from the overall arc rather than a single on-point statement.
      achievement_drive: [76, 0.48, "i", "N"],
      // Continuing rescue operations after the 1850 Fugitive Slave Act increased the legal risk of her work suggests real tactical adaptation, inferred from the timeline rather than a specific documented account of the adjustment itself.
      adaptability: [74, 0.46, "i", "N"],
      // Recognizing and acting on the wartime opportunity to serve the Union Army as a scout, leading to the Combahee raid, suggests real opportunity recognition, inferred from the sequence of events.
      opportunity_sensing: [74, 0.46, "i", "N"],
      // Operating outside any formal abolitionist institution's direct control for most of her rescue work suggests independent judgment, inferred rather than directly documented as a trait.
      independent_thinking: [72, 0.44, "i", "N"],
      // Successfully proposing and securing an unconventional Army scouting role suggests real assertiveness in advocating for herself, inferred from the outcome.
      social_assertiveness: [66, 0.4, "i", "N"],
      // Sustained work within the broader Underground Railroad network implies some collaborative coordination with other conductors and safehouse operators, inferred rather than specifically documented in her own case.
      collaboration: [62, 0.4, "i", "N"],
      // Zero losses across 13 missions suggests careful attention to operational detail, inferred from the outcome record rather than a specific documented account of her methods.
      detail_orientation: [62, 0.4, "i", "N"],
      // Repeated successful missions over years suggest a developing, refined operational skill, inferred from the pattern of sustained success.
      mastery_orientation: [58, 0.4, "i", "N"],
      // Varying tactics across missions as circumstances changed suggests some willingness to try new approaches, inferred from the general pattern rather than a specific documented instance.
      experimentation: [56, 0.4, "i", "N"],
      // Every rescue mission was conducted under fundamentally unpredictable conditions -- unknown pursuer positions, changing weather, unreliable safehouse availability -- with no ability to plan for certainty, sustained across roughly 13 missions over 11 years, inferred from the documented operational nature of Underground Railroad conducting work broadly and her own specific mission record.
      ambiguity_tolerance: [88, 0.6, "s", "A"],
      // Successfully convinced Union military commanders to authorize an unconventional role for her as an armed scout and spy despite no precedent for a woman (let alone a formerly enslaved woman) in that role, and consistently convinced frightened escaping individuals to trust her judgment and continue under extreme duress -- both inferred from the documented outcomes (the role being granted; missions completing without desertions) rather than a specific first-person account of her persuasive method.
      persuasiveness: [80, 0.58, "s", "A"],
    },
  },
  {
    id: "p_ludwig_wittgenstein",
    slug: "ludwig-wittgenstein",
    canonicalName: "Ludwig Wittgenstein",
    birthYear: 1889,
    deathYear: 1951,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["AT", "GB"],
    regionCode: "western_europe",
    occupationIds: ["philosopher"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational"],
    tagIds: ["systematic_thinker", "perfectionist", "independent"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q9391" },
    sources: [{ id: "src_wittgenstein_wikipedia", kind: "wikipedia", title: "Ludwig Wittgenstein", url: "https://en.wikipedia.org/wiki/Ludwig_Wittgenstein" }, { id: "src_wittgenstein_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Ludwig Wittgenstein" }, { id: "src_wittgenstein_monk", kind: "biography", title: "Ray Monk, Ludwig Wittgenstein: The Duty of Genius (1990)" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: Moritz
    // Nähr, 1930 ("The Fellowship Portrait"). Public domain (photographer
    // died 1945).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/db/36._Portrait_of_Ludwig_Wittgenstein%2C_1930.jpg",
      width: 326,
      height: 500,
      source: "Wikimedia Commons",
      license: "Public Domain (photographer died 1945)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:36._Portrait_of_Ludwig_Wittgenstein,_1930.jpg",
      attribution: "Moritz Nähr, 1930",
    },
    rows: {
      // Published the Tractatus Logico-Philosophicus in 1921 and then, roughly a decade later, developed a substantially different later philosophy (Philosophical Investigations) that directly critiqued and revised his own earlier framework — a documented, unusually explicit instance of one philosopher publicly overturning his own prior major work.
      independent_thinking: [90, 0.68, "d", "A"],
      // Explicitly stated in the preface to Philosophical Investigations that the later work should be read alongside the Tractatus specifically because it corrected 'grave errors' in his own earlier thinking — a directly self-documented, specific instance of substantive philosophical belief revision.
      belief_updating: [84, 0.65, "d", "A"],
      // Declared philosophy's fundamental problems 'solved' after the Tractatus and left academic philosophy for roughly a decade (working as a schoolteacher and architect) before returning once dissatisfied with his own earlier conclusions, documented via the well-established biographical account of this period.
      perfectionism: [78, 0.65, "d", "D"],
      // Renounced his entire substantial inheritance (he was born into one of the wealthiest families in Austria) to live an ascetic life with essentially no financial security, an extensively corroborated, specific documented act (Monk's biography and multiple independent corroborating sources), squarely on-point for risk tolerance rather than inferred from general reputation.
      risk_tolerance: [62, 0.65, "d", "N"],
      // Repeatedly left and returned to academic philosophy on his own terms, including giving away his inheritance and working outside academia for years, documented via the well-established, unconventional trajectory of his career.
      autonomy_need: [74, 0.65, "d", "A"],
      // Widely documented (by students and colleagues including Bertrand Russell) for intense, sustained concentration during philosophical work, including reportedly pacing for hours while working through a single problem.
      deep_focus: [76, 0.65, "d", "A"],
      // The Tractatus's numbered, precisely structured propositional system evidences extreme attention to logical and linguistic precision, documented directly in the surviving text's own structure.
      detail_orientation: [68, 0.65, "d", "A"],
      // Sustained direct philosophical disagreement with contemporaries including his own former mentor Bertrand Russell over the direction of his later philosophy, documented via the well-established record of their philosophical and personal divergence.
      conflict_tolerance: [60, 0.44, "s", "N"],
      // Developed two genuinely distinct, highly influential philosophical frameworks (logical atomism in the Tractatus, and ordinary-language/language-games philosophy in the Investigations) within one career, documented via the lasting independent influence of both works.
      creative_originality: [80, 0.65, "d", "A"],
      // Sustained six years of demanding work as a rural Austrian primary-school teacher after WWI, a physically and socially demanding role far outside his prior social position and academic fame, documented in Monk's biography as part of his deliberate, sustained pursuit of what he called 'the duty of full self-expression' across a series of exacting roles.
      discipline: [58, 0.65, "d", "N"],
      // His documented declaration that philosophy's problems were 'solved' after the Tractatus, followed by years away from the field, suggests a genuinely modest orientation toward continued professional advancement for its own sake, distinct from sustained institutional ambition.
      achievement_drive: [55, 0.4, "i", "N"],
      // Widely and consistently documented by contemporaries (Russell, students, biographers) as intensely private, often abrasive in seminars, and preferring solitary or small-group engagement over broad social life — a real, honestly low score directly evidenced rather than assumed.
      social_assertiveness: [42, 0.65, "d", "N"],
      // Held a professorship at Cambridge and mentored a documented circle of students, though his own personal ambivalence about academic status suggests a genuinely moderate rather than strong institutional leadership drive.
      leadership_drive: [55, 0.4, "i", "N"],
      // Continued fundamentally revising his own philosophical framework across his career rather than resting on his earlier, already highly influential Tractatus.
      mastery_orientation: [62, 0.44, "s", "A"],
      // The Tractatus builds a complete, self-contained logical-atomist system attempting to precisely delineate the limits of meaningful language, documented directly via the surviving text's own comprehensive structure.
      systems_abstraction: [72, 0.65, "d", "A"],
      // Trained originally in aeronautical engineering before shifting to mathematics and then philosophy, suggesting real intellectual range across genuinely different fields early in his life.
      curiosity: [58, 0.42, "i", "N"],
      // The Tractatus's numbered, hierarchically organized propositional structure evidences real advance organizational planning in how the work was composed.
      planning_orientation: [55, 0.4, "i", "N"],
      // Worked closely with Bertrand Russell early in his career and later with a small circle of Cambridge students, though his documented preference for intense one-on-one or small-group engagement over broader collaborative work suggests a genuinely more solitary working pattern overall.
      collaboration: [48, 0.4, "i", "N"],
      // Documented (Monk's biography) sustained, decades-long commitment across a series of demanding roles pursued to completion -- soldier, rural schoolteacher, architect, wartime hospital orderly, and returning philosopher -- each taken up with total, sustained commitment rather than abandoned partway, the central documented thesis of Monk's biography.
      persistence: [66, 0.65, "d", "A"],
      // Worked as a schoolteacher and later an architect during his years away from philosophy, suggesting real capacity to sustain himself productively outside his primary field.
      resourcefulness: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_nicolaus_copernicus",
    slug: "nicolaus-copernicus",
    canonicalName: "Nicolaus Copernicus",
    birthYear: 1473,
    deathYear: 1543,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["PL"],
    regionCode: "central_europe",
    occupationIds: ["astronomer"],
    fieldIds: ["natural_science", "mathematics"],
    impactDomains: ["scientific", "historical"],
    tagIds: ["founder", "systematic_thinker", "polymath"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q619" },
    sources: [{ id: "src_copernicus_wikipedia", kind: "wikipedia", title: "Nicolaus Copernicus", url: "https://en.wikipedia.org/wiki/Nicolaus_Copernicus" }, { id: "src_copernicus_mactutor", kind: "institution", title: "MacTutor History of Mathematics — Nicolaus Copernicus" }, { id: "src_copernicus_revolutionibus", kind: "archive", title: "Nicolaus Copernicus, De revolutionibus orbium coelestium (1543)" }, { id: "src_copernicus_gingerich", kind: "biography", title: "Owen Gingerich, The Book Nobody Read: Chasing the Revolutions of Nicolaus Copernicus (2004)" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: anonymous
    // portrait, c. 1580, Toruń Town Hall (District Museum, Toruń). Public
    // domain (published before 1931, artist unknown/anonymous work).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Nikolaus_Kopernikus.jpg",
      width: 1024,
      height: 1001,
      source: "Wikimedia Commons",
      license: "Public Domain (anonymous work, c. 1580)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nikolaus_Kopernikus.jpg",
      attribution: "Anonymous, c. 1580 — District Museum, Toruń",
    },
    rows: {
      // Developed and defended a heliocentric model directly contradicting the geocentric consensus that had stood for over a millennium, documented via De revolutionibus's own explicit argument against the established Ptolemaic model.
      independent_thinking: [90, 0.7, "d", "A"],
      // Withheld publication of De revolutionibus for roughly three decades, continuing to refine the mathematical model, only allowing publication near his own death — documented via the well-established, unusually long delay between the model's development and its eventual publication.
      perfectionism: [82, 0.65, "d", "D"],
      // Developed a theory that directly contradicted both scientific consensus and the era's dominant theological cosmology, carrying real intellectual and institutional risk, reflected in his own well-documented caution about publishing it during his lifetime.
      risk_tolerance: [70, 0.52, "s", "N"],
      // De revolutionibus provides detailed mathematical and geometric argument for the heliocentric model, documented directly in the surviving text's own technical content.
      analytical_rigor: [84, 0.65, "d", "A"],
      // Continued developing and refining the heliocentric model privately across roughly three decades before publication, documented via the well-established long gestation period of De revolutionibus.
      persistence: [76, 0.65, "d", "A"],
      // Sustained detailed astronomical observation and calculation over decades to build the full heliocentric mathematical model, documented via the sheer scope and precision of the surviving text.
      deep_focus: [74, 0.65, "d", "A"],
      // The mathematical apparatus of De revolutionibus required precise astronomical calculation across many planetary observations, documented directly via the surviving text's technical content.
      detail_orientation: [72, 0.65, "d", "A"],
      // Practiced substantively across astronomy, mathematics, canon law, medicine, and economics (he wrote a treatise on currency debasement), documented via his varied surviving bibliography and administrative career.
      cross_domain_range: [62, 0.65, "d", "A"],
      // Sustained nearly three decades of astronomical scholarship largely in isolation, without colleagues to consult, while simultaneously serving as district administrator of Allenstein and Mehlsack, physician to his uncle the Bishop, and organizer of castle defenses during the Polish-Teutonic Knights conflict -- a specific, documented pattern of sustained scholarly commitment carried alongside demanding non-astronomical duties (Gingerich; MacTutor History of Mathematics).
      discipline: [66, 0.65, "d", "A"],
      // The heliocentric model was a genuinely original reconceptualization of the solar system's structure, documented via its lasting, foundational influence on the subsequent history of astronomy.
      creative_originality: [80, 0.65, "d", "A"],
      // Developed his model largely independently over decades before circulating it even privately, documented via the well-established solitary early development of the theory.
      autonomy_need: [64, 0.46, "s", "A"],
      // Knowingly developed a theory that would directly contradict established authority, though his well-documented caution about publication suggests real awareness of, and some reluctance to directly court, that conflict during his own lifetime.
      conflict_tolerance: [58, 0.42, "i", "N"],
      // Sustained a highly demanding independent research project across decades with no institutional support specifically for it, evidencing real long-term ambition.
      achievement_drive: [60, 0.44, "s", "N"],
      // Continued refining the mathematical precision of his heliocentric model over an extended period rather than publishing an early, less-developed version.
      mastery_orientation: [62, 0.44, "s", "A"],
      // Deliberately delayed publishing De revolutionibus for nearly three decades after completing the core mathematical work (the Little Commentary, c. 1514) until 1543, a specific, precisely-dated timeline documented via Rheticus's own correspondence describing Copernicus's 'prolonged reluctance to release his volume for publication' (Owen Gingerich's scholarship, the recognized authority on Copernicus's manuscript history).
      planning_orientation: [60, 0.65, "d", "A"],
      // Built a complete, internally consistent alternative cosmological system rather than a piecemeal correction to the existing model, documented via De revolutionibus's own comprehensive structure.
      systems_abstraction: [78, 0.65, "d", "A"],
      // Sustained productive engagement across astronomy, mathematics, medicine, and economics over his career, evidencing real intellectual range.
      curiosity: [60, 0.44, "s", "A"],
      // Eventually shared his manuscript with a small circle of trusted colleagues (including Georg Joachim Rheticus, who helped secure its publication), suggesting some real capacity for selective scholarly collaboration despite his largely solitary development process.
      collaboration: [52, 0.4, "i", "N"],
      // Organizing castle defenses during an active military conflict and personally presenting currency-reform proposals to the Diet of Graudenz (1522) both required taking direct charge in high-stakes civic and military matters outside his primary vocation, though the surviving record documents the roles held more thoroughly than his personal leadership style within them.
      leadership_drive: [50, 0.5, "s", "N"],
      // Personally organized the defense of Allenstein Castle during the Polish-Teutonic Knights conflict of 1520-1521, a specific, documented act of self-initiated leadership well outside his assigned astronomical and clerical duties (MacTutor History of Mathematics).
      proactive_agency: [58, 0.65, "d", "N"],
    },
  },
  {
    id: "p_wu_zetian",
    slug: "wu-zetian",
    canonicalName: "Wu Zetian",
    birthYear: 624,
    deathYear: 705,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "east_asia",
    historicalPolityKey: "polity.tang_dynasty",
    occupationIds: ["statesman"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["young_leader", "strategist", "leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q9738" },
    sources: [{ id: "src_wuzetian_wikipedia", kind: "wikipedia", title: "Wu Zetian", url: "https://en.wikipedia.org/wiki/Wu_Zetian" }, { id: "src_wuzetian_history", kind: "institution", title: "History Hit / Cambridge History of China — Wu Zetian, the only female emperor of China" }, { id: "src_wuzetian_origins", kind: "institution", title: "Origins: Current Events in Historical Perspective (Ohio State University / Miami University) -- Wu Zetian: The Only Woman Emperor in Chinese History", url: "https://origins.osu.edu/read/wu-zetian-woman-emperor-china" }],
    // Verified 2026-08 via a direct fetch of the Commons file page: an
    // explicitly-labelled idealized/traditional depiction (18th-century
    // album of 86 Chinese emperor portraits, British Library), not a
    // contemporary likeness -- no portrait from her own lifetime (7th
    // century) survives, the same discipline already applied to Confucius's
    // portrait elsewhere in this roster. Public domain.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/A_Tang_Dynasty_Empress_Wu_Zetian.JPG",
      width: 347,
      height: 393,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:A_Tang_Dynasty_Empress_Wu_Zetian.JPG",
      attribution: "Unknown artist, 18th century (idealized traditional depiction) — British Library",
    },
    rows: {
      // Rose from a relatively minor concubine position in Emperor Taizong's court to become the only woman in Chinese history to rule as emperor in her own name, entirely through her own sustained political maneuvering rather than any inherited claim — documented via the well-established historical consensus on her rise, corroborated across multiple Tang and later dynastic-era chronicles.
      proactive_agency: [86, 0.65, "d", "A"],
      // Ruled China directly for decades, first as empress consort exercising real power, then as regent, then formally declaring her own Zhou dynasty and ruling as emperor from 690 to 705 — documented via the well-established institutional record of her sustained direct rule.
      leadership_drive: [84, 0.65, "d", "A"],
      // Pursued and consolidated supreme political power in a system with no precedent for female rule, at documented real risk of removal or worse at multiple points across her decades-long rise, corroborated across multiple independent historical chronicle traditions.
      risk_tolerance: [82, 0.65, "d", "R"],
      // Took direct, consequential political action at multiple critical junctures in her rise to power, including the well-documented removal and replacement of rival court officials and eventual formal founding of her own dynasty.
      decisiveness: [76, 0.65, "d", "A"],
      // Her multi-decade political ascent, from consort to regent to emperor, evidences sustained, deliberate long-horizon political strategy rather than opportunistic improvisation, documented via the well-established staged sequence of her consolidation of power.
      planning_orientation: [74, 0.65, "d", "A"],
      // Sustained direct political conflict with rival court factions across decades to secure and hold power, documented via the well-established record of court purges and power struggles during her rise and reign.
      conflict_tolerance: [74, 0.65, "d", "R"],
      // Continued expanding and consolidating her own personal political authority well beyond what any consort or even regent traditionally held, culminating in formally founding her own dynasty.
      achievement_drive: [72, 0.52, "s", "A"],
      // Instituted the practice of ruling 'from behind a bamboo curtain' specifically to circumvent court protocol that barred women from directly holding court -- a specific, documented procedural innovation that let her exercise real power despite a structural gender barrier with no established workaround.
      resourcefulness: [68, 0.65, "d", "A"],
      // Sustained a multi-decade political project across changing court circumstances and multiple emperors' reigns before formally declaring her own rule, documented via the well-established extended timeline of her ascent.
      persistence: [70, 0.5, "s", "A"],
      // Restructured mourning-ritual and ancestor-worship codes to require female ancestors be honored alongside male ones and mourning periods for mothers to match those for fathers -- a specific, documented systemic revision of legal/ritual code, not an isolated decision.
      systems_abstraction: [62, 0.65, "d", "A"],
      // Appointed Shangguan Wan'er -- whose family Wu Zetian had previously had destroyed -- to the position of chief drafter of imperial edicts, a specific, documented instance of pragmatically adapting personnel decisions to present political needs over past personal enmity.
      adaptability: [60, 0.65, "d", "A"],
      // Formally founded her own dynasty rather than continuing to rule only as regent for a male heir, a documented, specific assertion of independent authority beyond what precedent required or permitted.
      autonomy_need: [64, 0.46, "s", "A"],
      // Her mourning-ritual and ancestor-worship reforms had lasting, scholarship-documented effects on the legal and customary treatment of gender in imperial China, a specific real-world impact beyond the immediate political maneuvering already scored under other attributes.
      impact_motivation: [56, 0.65, "d", "N"],
      // Sustained direct oversight of complex court administration and bureaucratic reform over decades of rule, suggesting real attention to governmental detail.
      detail_orientation: [58, 0.42, "i", "N"],
      // Sustained direct, visible political authority and public rule for decades in a system where women rarely held any formal public political role, documented via the well-established unprecedented nature of her public position.
      social_assertiveness: [68, 0.48, "s", "A"],
      // Continued developing her political and administrative capability across a rise spanning decades, from court consort through regency to formal sole rule.
      mastery_orientation: [58, 0.42, "i", "N"],
      // Built and sustained a loyal court faction and bureaucratic apparatus across her decades in power, suggesting real capacity to build sustained political alliances.
      collaboration: [55, 0.4, "i", "N"],
      // Sustained direct administrative control over a complex imperial bureaucracy across decades of rule, evidenced by the well-established scale and continuity of her governance.
      discipline: [58, 0.42, "i", "N"],
      // Pursued and formally declared her own dynasty rather than continuing within the traditional regency framework a woman in her position would ordinarily have been limited to, a documented, unprecedented departure from convention.
      independent_thinking: [68, 0.65, "d", "A"],
      // Sustained direct administrative oversight of a complex imperial bureaucracy over decades required extended concentrated governmental attention.
      deep_focus: [55, 0.4, "i", "N"],
      // Sponsored the distribution of a reinterpreted Buddhist text (the Great Cloud Sutra) prophesying a female ruler as an incarnation of a bodhisattva, establishing temples empire-wide to promulgate this legitimizing narrative before her 690 accession as emperor -- a specific, scholarship-documented campaign of political persuasion/legitimation with no precedent in Chinese imperial history to draw on.
      persuasiveness: [78, 0.65, "d", "A"],
      // Recognized and capitalized on the opening created by Emperor Gaozong's declining health, becoming his de facto co-ruler on administrative decisions years before his death in 684 and using that position as the foundation for her own later claim to the throne -- a specific, documented instance of recognizing and acting on a structural opportunity others in her position had not had.
      opportunity_sensing: [80, 0.65, "d", "A"],
    },
  },
];

export const ROSTER_6: readonly Person[] = seeds.map(build);
