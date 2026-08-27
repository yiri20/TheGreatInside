/**
 * ROSTER 4 — roster-1000 session 4, second real expansion batch (16 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed, the
 * 16-slug session-4 batch) via `src/dev/roster1000/generateRoster4.ts` — see
 * that script and `docs/roster-1000-checkpoint.md` for the full pipeline.
 * Every score's rationale is preserved as the inline comment immediately
 * above its Row, the same evidence-audit-trail discipline `seed.ts`/
 * `roster2.ts`/`roster3.ts` already use. Follows `docs/scoring-rubric-v1.md`
 * throughout. 14 of 30 researched candidates this session were held rather
 * than force-accepted — see the checkpoint for the full disposition and the
 * honest holdReason recorded on each held candidate file.
 *
 * Korean display names for these 16 people were added to `person.name.*`
 * in `src/core/i18n/ko.ts` in the same batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_benjamin_banneker",
    slug: "benjamin-banneker",
    canonicalName: "Benjamin Banneker",
    birthYear: 1731,
    deathYear: 1806,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["mathematician", "astronomer"],
    fieldIds: ["mathematics", "natural_science"],
    impactDomains: ["scientific", "historical"],
    tagIds: ["self_taught", "independent", "prolific"],
    archetypeIds: ["scholarly_specialist", "independent_creator"],
    externalIdentity: { wikidataId: "Q557600" },
    sources: [{ id: "src_banneker_wikipedia", kind: "wikipedia", title: "Benjamin Banneker", url: "https://en.wikipedia.org/wiki/Benjamin_Banneker" }, { id: "src_banneker_jefferson", kind: "archive", title: "Correspondence between Benjamin Banneker and Thomas Jefferson (1791)" }, { id: "src_banneker_bedini", kind: "biography", title: "Silvio A. Bedini, The Life of Benjamin Banneker (1972)" }],
    rows: {
      // Documented (Bedini) to have taught himself advanced astronomy and mathematics as an adult from borrowed books and instruments with no formal schooling beyond a brief rural education, then built his own working wooden clock from studying a borrowed pocket watch.
      curiosity: [88, 0.72, "d", "A"],
      // Wrote directly to Thomas Jefferson in 1791 challenging him personally on the contradiction between his stated Enlightenment ideals and his ownership of enslaved people, enclosing his own astronomical almanac as proof of Black intellectual capability — a specific, documented, surviving letter.
      independent_thinking: [82, 0.68, "d", "A"],
      // Independently calculated complex astronomical ephemerides for his published almanacs (1792-1797), a documented, technically demanding, verifiable mathematical achievement.
      analytical_rigor: [84, 0.68, "d", "A"],
      // The 1791 letter to Jefferson directly and publicly confronted a sitting Secretary of State on slavery — a documented, real social and political risk for a free Black man in that era.
      risk_tolerance: [76, 0.6, "d", "A"],
      // Sustained annual astronomical calculation and almanac publication across multiple years, documented via the surviving published almanacs themselves.
      discipline: [82, 0.65, "d", "A"],
      // Built a functioning wooden striking clock from studying a borrowed pocket watch, with no formal training in clockmaking — a specific, well-corroborated instance of self-taught technical improvisation.
      resourcefulness: [78, 0.62, "d", "A"],
      // Continued advancing from self-taught arithmetic to complex astronomical calculation over decades with no external institutional support or requirement.
      mastery_orientation: [76, 0.6, "s", "A"],
      // Sustained self-directed scientific study across his adult life while also managing a farm, documented via Bedini's account of his working routine.
      persistence: [74, 0.58, "s", "A"],
      // Self-initiated the Jefferson correspondence and the almanac publication project without institutional sponsorship, both documented via the surviving letters and publication record.
      proactive_agency: [78, 0.62, "d", "A"],
      // Directly addressed a sitting federal official on a politically fraught personal challenge, a specific, documented instance of public assertion.
      social_assertiveness: [70, 0.55, "d", "A"],
      // Documented real achievement across astronomy/mathematics (the almanacs), horology (the clock), and — per Bedini — assisting with the initial 1791 boundary survey of the future District of Columbia.
      cross_domain_range: [65, 0.5, "d", "A"],
      // The sustained multi-year almanac project, each edition requiring fresh calculation, evidences real ongoing ambition beyond a single completed proof of capability.
      achievement_drive: [62, 0.48, "i", "N"],
      // Ephemeris calculation for published almanacs requires precise, verifiable numerical accuracy, directly evidenced by the surviving published tables.
      detail_orientation: [72, 0.55, "s", "A"],
      // The Jefferson letter explicitly frames his own achievement as evidence intended to advance the broader case against slavery and racial prejudice, documented directly in the letter's own text.
      impact_motivation: [74, 0.58, "d", "A"],
      // Pursued his scientific work entirely independently, without a patron, institution, or formal mentor, documented across his working life.
      autonomy_need: [68, 0.52, "s", "A"],
      // Annual almanac production on a fixed publication schedule required real advance calculation and planning, though the specific working method is only moderately documented.
      planning_orientation: [60, 0.46, "i", "N"],
      // His self-taught astronomical calculations for his published almanacs required building a working understanding of celestial mechanics from limited available resources, documented via the surviving almanacs themselves.
      systems_abstraction: [66, 0.52, "d", "A"],
      // Built one of the first fully American-made striking clocks, carving nearly every part from wood after having only briefly examined a pocket watch, a specific, well-corroborated historical feat.
      creative_originality: [74, 0.6, "d", "A"],
      // Produced annual almanacs with original astronomical calculations for years, requiring sustained precise computation, documented via the surviving published almanacs themselves.
      deep_focus: [72, 0.58, "d", "A"],
      // The direct Jefferson challenge risked real personal and political friction, though it was a single documented letter rather than a sustained pattern of confrontation.
      conflict_tolerance: [60, 0.46, "i", "N"],
    },
  },
  {
    id: "p_chinua_achebe",
    slug: "chinua-achebe",
    canonicalName: "Chinua Achebe",
    birthYear: 1930,
    deathYear: 2013,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["NG"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["founder", "nonconformist", "independent"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q155845" },
    sources: [{ id: "src_achebe_wikipedia", kind: "wikipedia", title: "Chinua Achebe", url: "https://en.wikipedia.org/wiki/Chinua_Achebe" }, { id: "src_achebe_conrad", kind: "archive", title: "Chinua Achebe, 'An Image of Africa: Racism in Conrad's Heart of Darkness' (1975 lecture)" }, { id: "src_achebe_ezenwa", kind: "biography", title: "Ezenwa-Ohaeto, Chinua Achebe: A Biography (1997)" }],
    rows: {
      // Things Fall Apart (1958) pioneered blending Igbo oral narrative tradition with the English-language novel form — documented via the work's own structure and its recognized place as a founding text of modern African literature.
      creative_originality: [88, 0.75, "d", "A"],
      // Publicly and directly critiqued Joseph Conrad's Heart of Darkness as racist in a 1975 lecture, a specific, documented, deliberately contrarian position against then-dominant literary-critical consensus.
      independent_thinking: [86, 0.72, "d", "A"],
      // The Conrad critique directly and durably shifted academic discourse on the novel, documented via its sustained citation and debate in literary scholarship for decades afterward.
      persuasiveness: [78, 0.65, "d", "A"],
      // Sustained a literary career spanning novels, essays, and poetry across more than five decades.
      discipline: [72, 0.58, "s", "A"],
      // The Conrad critique directly challenged a revered figure in the Western literary canon, a documented, career-exposing position at the time.
      risk_tolerance: [74, 0.6, "d", "R"],
      // Served as a diplomatic envoy for Biafra during the Nigerian Civil War, a documented instance of direct public political engagement beyond his literary work.
      social_assertiveness: [76, 0.6, "d", "A"],
      // Maintained the Conrad critique despite decades of significant academic pushback and controversy, documented via the sustained scholarly debate it generated.
      conflict_tolerance: [78, 0.62, "d", "R"],
      // Helped establish and edit the African Writers Series, a documented, sustained institution-building effort supporting other African authors' publication.
      leadership_drive: [68, 0.52, "s", "A"],
      // Continued writing across multiple forms (novels, essays, poetry) over five decades, evidencing sustained craft engagement beyond his initial breakthrough novel.
      mastery_orientation: [65, 0.5, "i", "A"],
      // Self-initiated his diplomatic role advocating for Biafra during the civil war, a documented, self-directed political action beyond his literary career.
      proactive_agency: [80, 0.65, "d", "A"],
      // Real, sustained output across fiction, literary-critical essays, poetry, and direct political/diplomatic engagement — genuine range with real output in each.
      cross_domain_range: [72, 0.55, "s", "A"],
      // Co-founded and edited a literary series supporting other African writers' publication, a real but moderately documented collaborative institutional role.
      collaboration: [60, 0.46, "i", "N"],
      // Explicitly and repeatedly stated his purpose as correcting Western literary misrepresentation of Africa and establishing an independent African literary voice, documented via his own essays and interviews.
      impact_motivation: [82, 0.65, "d", "A"],
      // The Conrad critique is a structured, textually-grounded literary argument, not a general complaint — directly observable in the lecture's own surviving text.
      analytical_rigor: [74, 0.58, "d", "A"],
      // Incorporated Igbo proverbs and oral-storytelling structure directly into the English-language novel form, a documented deliberate technical choice rather than conventional narration.
      experimentation: [64, 0.5, "s", "A"],
      // Continued a full academic and literary career from a wheelchair after a 1990 car accident left him paralyzed, documented via his subsequent decades of continued published work and university teaching.
      adaptability: [78, 0.6, "d", "A"],
      // Pursued the broader goal of establishing African literature as a legitimate global tradition across his whole career, not only personal literary success.
      achievement_drive: [68, 0.52, "s", "A"],
      // Sustained a multi-decade literary and critical career across novels, essays, and teaching, documented via his complete bibliography.
      deep_focus: [68, 0.52, "s", "A"],
      // Engaged across fiction, literary criticism, and later political essays and academic teaching, evidencing real intellectual range beyond a single genre.
      curiosity: [62, 0.48, "s", "A"],
      // Continued writing and public literary engagement for over two decades after the 1990 accident that left him paralyzed, documented via his post-accident published output.
      persistence: [76, 0.6, "d", "A"],
    },
  },
  {
    id: "p_emmy_noether",
    slug: "emmy-noether",
    canonicalName: "Emmy Noether",
    birthYear: 1882,
    deathYear: 1935,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["DE"],
    regionCode: "western_europe",
    occupationIds: ["mathematician"],
    fieldIds: ["mathematics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["overcame_adversity", "founder", "self_taught"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q7099" },
    sources: [{ id: "src_noether_wikipedia", kind: "wikipedia", title: "Emmy Noether", url: "https://en.wikipedia.org/wiki/Emmy_Noether" }, { id: "src_noether_einstein", kind: "press", title: "Albert Einstein, letter to The New York Times on Emmy Noether's death (1935)" }],
    // Verified 2026-08 via a direct fetch of the Commons file page:
    // photographer unknown, before 1910. Public domain (published before
    // 1931; life+70 years expired).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Noether_retusche_nachcoloriert.jpg",
      width: 464,
      height: 658,
      source: "Wikimedia Commons",
      license: "Public Domain (published before 1931)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Noether_retusche_nachcoloriert.jpg",
      attribution: "Photographer unknown, before 1910",
    },
    rows: {
      // Noether's theorem, linking every differentiable symmetry to a conservation law, is documented as a foundational, rigorously proven result in theoretical physics and abstract algebra, still in standard use.
      analytical_rigor: [90, 0.75, "d", "A"],
      // Worked unpaid or under-titled for years at Göttingen (lecturing officially under David Hilbert's name for a period since women could not formally hold lecturing positions there) before finally receiving a formal academic appointment — a specific, well-documented institutional barrier she worked around rather than abandoning her research.
      persistence: [84, 0.68, "d", "A"],
      // The arrangement of lecturing under Hilbert's name to bypass the formal prohibition on women lecturers is a specific, well-corroborated instance of working around an institutional obstacle rather than being blocked by it.
      resourcefulness: [78, 0.62, "d", "A"],
      // Developed foundational abstract algebra concepts (now called Noetherian rings) that restructured how the field itself was approached, documented via the sustained influence of her work on 20th-century mathematics.
      creative_originality: [86, 0.7, "d", "A"],
      // Her abstract-algebraic approach deliberately generalized specific results into structural theorems applicable across many mathematical contexts, documented via the mathematical content of her published work.
      systems_abstraction: [84, 0.68, "d", "A"],
      // Continued pursuing an academic mathematics career despite documented, sustained institutional resistance to women holding formal positions — a real risk of career-long marginalization, though this reflects sustained persistence more than a single high-stakes choice.
      risk_tolerance: [62, 0.48, "i", "N"],
      // Sustained prolific mathematical output across roughly three decades despite working for much of her career without formal academic standing or salary commensurate with her male colleagues.
      discipline: [78, 0.6, "s", "A"],
      // Continued developing increasingly abstract and general mathematical frameworks throughout her career rather than resting on Noether's theorem's early impact.
      mastery_orientation: [76, 0.58, "s", "A"],
      // Worked closely with a documented circle of students and colleagues at Göttingen who became known as the 'Noether boys,' a real, if institutionally informal, collaborative and mentoring pattern.
      collaboration: [62, 0.46, "i", "N"],
      // Continued producing foundational mathematical work across a career spent largely without the institutional recognition or compensation typically accompanying work of this significance.
      achievement_drive: [68, 0.5, "s", "A"],
      // Pursued an abstract, structural approach to algebra that departed from the more computational conventions of the field at the time, documented via the mathematical-historical assessment of her work's influence.
      independent_thinking: [70, 0.52, "s", "A"],
      // Sustained engagement across pure mathematics and mathematical physics (Noether's theorem itself bridges both) suggests real breadth of interest beyond a single narrow specialty.
      curiosity: [64, 0.46, "i", "N"],
      // Rigorous mathematical proof requires real precision, though her documented working and teaching style (per contemporary accounts) was noted more for conceptual, structural thinking than granular computational detail.
      detail_orientation: [60, 0.44, "i", "N"],
      // Noether's theorem itself bridges pure mathematics and theoretical physics, linking symmetry to conservation laws, documented via its foundational, sustained use in both fields.
      cross_domain_range: [72, 0.6, "d", "A"],
      // Sustained development of increasingly abstract algebraic frameworks over decades, documented via her mathematical publication record and its sustained structural coherence.
      deep_focus: [76, 0.58, "d", "A"],
      // Informally led a lively circle of students, the 'Noether boys,' through open, engaged mathematical discussion, documented via multiple contemporary accounts of her teaching style.
      social_assertiveness: [60, 0.46, "s", "N"],
      // Sustained her own independent research program for years without formal institutional recognition or salary commensurate with her male colleagues.
      autonomy_need: [66, 0.5, "s", "A"],
      // Adjusted her research focus and rebuilt her career as she moved from Erlangen to Göttingen and, in 1933, fled Nazi Germany for Bryn Mawr College in the United States — a documented career transition made under real duress.
      adaptability: [62, 0.5, "d", "A"],
      // Consistently framed her research around building lasting structural mathematical frameworks useful to the broader field, and continued mentoring students even without formal compensation.
      impact_motivation: [58, 0.44, "s", "A"],
      // Emigrated to and rebuilt her career at Bryn Mawr College after fleeing Nazi Germany in 1933, a self-directed response to an existential threat, well documented via the historical record of her emigration.
      proactive_agency: [64, 0.52, "d", "A"],
    },
  },
  {
    id: "p_fela_kuti",
    slug: "fela-kuti",
    canonicalName: "Fela Kuti",
    aliases: ["Fela Anikulapo-Kuti"],
    birthYear: 1938,
    deathYear: 1997,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["NG"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["composer", "political_activist"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["innovator", "nonconformist", "founder"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q313868" },
    sources: [{ id: "src_fela_wikipedia", kind: "wikipedia", title: "Fela Kuti", url: "https://en.wikipedia.org/wiki/Fela_Kuti" }, { id: "src_fela_veal", kind: "biography", title: "Michael E. Veal, Fela: The Life and Times of an African Musical Icon (2000)" }],
    rows: {
      // Created Afrobeat by fusing Yoruba music, jazz, highlife, and funk into a distinct new genre, documented via the musicological analysis of his recorded output (Veal).
      creative_originality: [86, 0.7, "d", "A"],
      // Declared his compound 'Kalakuta Republic' independent from the Nigerian state in 1970 — a specific, extensively documented, real act of political defiance.
      independent_thinking: [82, 0.65, "d", "A"],
      // Sustained direct musical and political criticism of Nigeria's military government despite documented, repeated violent government raids on his compound, including a 1977 raid that resulted in serious injury to his mother.
      risk_tolerance: [88, 0.72, "d", "R"],
      // Continued releasing directly critical political music and maintaining the Kalakuta Republic's independence claim for years despite repeated, documented violent government retaliation.
      conflict_tolerance: [84, 0.68, "d", "R"],
      // Ran for the Nigerian presidency in 1979 and sustained a public political persona alongside his music career, documented via the electoral and press record of the period.
      social_assertiveness: [82, 0.65, "d", "A"],
      // His music directly and durably shaped Nigerian and pan-African political consciousness, documented via the sustained cultural and political influence of songs like 'Zombie' (a direct critique of the military).
      persuasiveness: [76, 0.58, "d", "A"],
      // Founded and led the Kalakuta Republic as a self-governing community and led a large band (Africa 70/Egypt 80) over decades, documented institutional and musical leadership.
      leadership_drive: [74, 0.58, "d", "A"],
      // Self-initiated both the Kalakuta Republic declaration and his direct political candidacy, rather than working within existing structures.
      proactive_agency: [78, 0.62, "d", "A"],
      // Continued musical and political activity across roughly three decades despite repeated documented government suppression, imprisonment, and violence directed at him and his community.
      persistence: [76, 0.58, "d", "A"],
      // Continued expanding both his musical output and political ambitions (culminating in the 1979 presidential run) rather than settling for musical success alone.
      achievement_drive: [62, 0.46, "i", "N"],
      // Sustained a demanding recording and touring career across roughly three decades alongside running the Kalakuta Republic, documented via his prolific discography.
      discipline: [66, 0.5, "s", "A"],
      // Continued evolving the Afrobeat sound across his catalog, incorporating new musical and lyrical approaches rather than repeating an early formula, documented via the stylistic range across his discography.
      experimentation: [68, 0.52, "s", "A"],
      // Real, sustained activity across music composition/performance and direct electoral politics, not music alone.
      cross_domain_range: [64, 0.48, "s", "A"],
      // Explicitly framed his music and the Kalakuta Republic project as directed at Nigerian political and social conditions rather than personal artistic expression alone, documented via his own public statements and song lyrics.
      impact_motivation: [78, 0.6, "d", "A"],
      // Afrobeat's dense, multi-layered arrangements suggest real compositional attention to detail, though the specific working method behind them is only moderately documented.
      detail_orientation: [58, 0.42, "i", "N"],
      // Continued refining the Afrobeat sound and expanding his band's arrangements across a multi-decade catalog, suggesting sustained craft development.
      mastery_orientation: [62, 0.45, "i", "N"],
      // Founded and sustained organized long-term institutional projects — the Kalakuta Republic commune and the Afrika Shrine performance venue — documented via the well-recorded history of both institutions.
      planning_orientation: [60, 0.5, "s", "A"],
      // Sustained Afrobeat musical innovation and a prolific recorded output across dozens of albums over a multi-decade career, documented via his discography.
      deep_focus: [66, 0.5, "s", "A"],
      // Engaged across music, Pan-Africanist political philosophy, and direct activism over his career, documented via biographical accounts of his intellectual and political development.
      curiosity: [58, 0.44, "i", "N"],
      // Navigated shifting political conditions and repeated institutional attacks across his career, suggesting some real adaptive capacity, though the specific evidence is thinner than for the risk_tolerance/conflict_tolerance findings above.
      adaptability: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_florence_nightingale",
    slug: "florence-nightingale",
    canonicalName: "Florence Nightingale",
    birthYear: 1820,
    deathYear: 1910,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["scientist"],
    fieldIds: ["medicine"],
    impactDomains: ["medical", "scientific", "historical"],
    tagIds: ["founder", "systematic_thinker", "independent"],
    archetypeIds: ["scholarly_specialist", "organizational_leader"],
    externalIdentity: { wikidataId: "Q37103" },
    sources: [{ id: "src_nightingale_wikipedia", kind: "wikipedia", title: "Florence Nightingale", url: "https://en.wikipedia.org/wiki/Florence_Nightingale" }, { id: "src_nightingale_mcdonald", kind: "archive", title: "Lynn McDonald (ed.), The Collected Works of Florence Nightingale" }, { id: "src_nightingale_smallbio", kind: "biography", title: "Mark Bostridge, Florence Nightingale: The Woman and Her Legend (2008)" }],
    rows: {
      // Developed and used polar-area diagrams (the 'coxcomb' chart) to statistically demonstrate that poor sanitation, not combat, caused most Crimean War deaths — a documented, specific, methodologically original statistical analysis, corroborated by the surviving charts and reports themselves.
      analytical_rigor: [88, 0.75, "d", "A"],
      // Rejected her family's expectation of a conventional upper-class marriage to pursue nursing, which was considered a disreputable profession for a woman of her class at the time — documented via her own letters and Bostridge's biography.
      independent_thinking: [78, 0.62, "d", "A"],
      // Traveled to the Crimean War front in 1854 to manage field hospital conditions directly, a documented real personal risk given the disease and conditions in the war zone.
      risk_tolerance: [68, 0.55, "d", "A"],
      // Developed a general statistical framework linking sanitation to mortality applicable beyond the specific Crimean case, later used to reform British Army and civilian hospital practice broadly — documented via her subsequent reform reports.
      systems_abstraction: [82, 0.65, "d", "A"],
      // Sustained detailed statistical analysis of Crimean War mortality data over an extended period, pioneering the polar area diagram to influence policy, documented via her own published statistical reports.
      deep_focus: [78, 0.6, "d", "A"],
      // Engaged deeply with statistics, sanitation science, and hospital administration reform beyond nursing practice itself, documented via her published works spanning these domains.
      curiosity: [62, 0.48, "s", "A"],
      // Founded the Nightingale Training School for Nurses in 1860 and led sustained institutional reform of British military and civilian healthcare, documented via the school's founding records and her subsequent decades of policy influence.
      leadership_drive: [80, 0.65, "d", "A"],
      // Continued statistical and reform work for decades, much of it as a bedridden invalid after the Crimean War (a documented, long-term illness), producing an extensive body of reports and correspondence from her sickbed.
      discipline: [82, 0.65, "d", "A"],
      // Sustained health-reform advocacy across roughly five decades despite chronic illness that largely confined her to her bed from the late 1850s onward, documented via her continued prolific correspondence and reports throughout this period.
      persistence: [84, 0.68, "d", "A"],
      // Her statistical reports involved exhaustive, precise data collection on hospital mortality causes, directly evidenced by the surviving reports' own level of granularity.
      detail_orientation: [78, 0.6, "d", "A"],
      // Her statistical presentations directly and successfully persuaded British military and government officials to implement sanitary reforms, documented via the subsequent Royal Commission and policy changes her reports prompted.
      persuasiveness: [74, 0.58, "d", "A"],
      // Self-organized her own party of nurses to travel to Crimea rather than waiting to be officially deployed, documented via the historical record of her 1854 departure.
      proactive_agency: [76, 0.6, "d", "A"],
      // Continued developing statistical methodology and health-system expertise across decades of reform work well beyond the initial Crimean crisis.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Continued pursuing progressively broader reform goals (from Crimean field hospitals to the entire British Army medical system to Indian public health) across her career rather than stopping after the initial crisis was addressed.
      achievement_drive: [65, 0.48, "i", "N"],
      // Documented to have had real, sustained institutional friction with military medical authorities during and after the Crimean War, though her preferred approach (per Bostridge) leaned toward persistent documentation and lobbying over direct confrontation.
      conflict_tolerance: [62, 0.48, "i", "N"],
      // Her rejection of a conventional marriage path to pursue an independent professional vocation suggests real autonomy preference, the same underlying evidence as independent_thinking viewed from the preference-for-self-direction angle.
      autonomy_need: [60, 0.45, "i", "N"],
      // Worked with statisticians and government commissions on her reform reports, a real but moderately documented collaborative pattern given her later career was largely conducted via correspondence from her sickbed.
      collaboration: [55, 0.42, "i", "N"],
      // Sustained influential, detailed policy work for decades while largely confined to her bed by chronic illness, suggesting real adaptive resourcefulness in her working method, though the specific mechanisms are only moderately documented.
      resourcefulness: [58, 0.42, "i", "N"],
      // Real combined output across nursing practice, statistics, and health-policy writing — genuine but concentrated range within the broader public-health domain.
      cross_domain_range: [55, 0.42, "i", "N"],
      // The novel application of statistical visualization to health policy was itself methodologically innovative, though this is inferred from the outcome (the coxcomb chart) rather than a documented account of an exploratory process.
      experimentation: [52, 0.4, "i", "N"],
    },
  },
  {
    id: "p_grace_hopper",
    slug: "grace-hopper",
    canonicalName: "Grace Hopper",
    birthYear: 1906,
    deathYear: 1992,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["computer_scientist"],
    fieldIds: ["computing"],
    impactDomains: ["technological", "innovation", "educational"],
    tagIds: ["early_computing", "innovator", "founder"],
    archetypeIds: ["technical_innovator"],
    externalIdentity: { wikidataId: "Q11641" },
    sources: [{ id: "src_hopper_wikipedia", kind: "wikipedia", title: "Grace Hopper", url: "https://en.wikipedia.org/wiki/Grace_Hopper" }, { id: "src_hopper_beyer", kind: "biography", title: "Kurt W. Beyer, Grace Hopper and the Invention of the Information Age (2009)" }],
    rows: {
      // Led development of the first compiler (A-0) and the concept of machine-independent programming languages, directly leading to COBOL — documented via the patent and publication record of these specific technical contributions.
      creative_originality: [86, 0.72, "d", "A"],
      // Championed machine-independent, English-like programming languages against significant contemporary skepticism that computers could 'understand' English-like commands at all, documented via Beyer's account of the resistance she faced.
      independent_thinking: [78, 0.62, "d", "A"],
      // Documented to have spent years actively persuading both technical peers and military/corporate leadership to adopt compiler-based programming, ultimately succeeding in making it industry standard.
      persuasiveness: [80, 0.65, "d", "A"],
      // Sustained a demanding dual career in the U.S. Navy and computing research across five decades, documented via her service and professional record.
      discipline: [78, 0.6, "s", "A"],
      // Led compiler development teams and later served as a rear admiral directing standardization efforts for COBOL across the Navy, a documented sustained leadership role.
      leadership_drive: [76, 0.6, "d", "A"],
      // Pursued and publicly advocated for a programming approach many contemporary computer scientists considered technically implausible, a real professional risk documented via the contemporary skepticism Beyer describes.
      risk_tolerance: [68, 0.52, "s", "A"],
      // Continued advocating for compiler-based, standardized programming languages across years of institutional resistance before COBOL became widely adopted.
      persistence: [76, 0.58, "d", "A"],
      // Continued active involvement in computing standards and education into her 70s and 80s, well past conventional retirement, documented via her continued Navy service and lecturing.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Real output combining military service, mathematics teaching, and computer science research — genuine range, though concentrated within a broadly consistent computing/technical domain.
      cross_domain_range: [60, 0.46, "i", "N"],
      // Became a widely sought-after public lecturer on computing standardization, documented via her extensive later-career speaking record.
      social_assertiveness: [74, 0.58, "d", "A"],
      // Self-initiated the compiler concept and its advocacy without being assigned the project by a superior, documented via Beyer's account of the A-0 system's origin.
      proactive_agency: [76, 0.58, "d", "A"],
      // Compiler and language-standardization work required exacting technical precision, directly evidenced by the surviving specifications and code she and her teams produced.
      detail_orientation: [68, 0.52, "s", "A"],
      // Sustained advocacy against real, documented contemporary technical skepticism over multiple years rather than abandoning the position.
      conflict_tolerance: [62, 0.48, "i", "N"],
      // Continued pursuing progressively larger standardization goals (from a working compiler to an industry-wide standard language) rather than stopping once the initial technical proof was achieved.
      achievement_drive: [65, 0.48, "i", "N"],
      // Led team-based compiler development and later multi-organization standardization committees, a real but moderately documented collaborative pattern.
      collaboration: [60, 0.45, "i", "N"],
      // Designed and implemented the rigorous logical framework underlying the first compiler and later COBOL, documented via the well-established technical history of her work.
      analytical_rigor: [76, 0.6, "d", "A"],
      // Sustained detailed, technically demanding work developing the first compiler (A-0) and later leading COBOL's development, requiring extended concentrated technical effort, documented via the well-established history of her compiler work.
      deep_focus: [74, 0.58, "d", "A"],
      // Consistently framed the compiler concept around making programming accessible beyond a small circle of specialists, documented via her own interviews and the historical record of her stated motivation.
      impact_motivation: [64, 0.5, "s", "A"],
      // Continued pursuing new technical directions (from mathematics to programming to standardization) across a five-decade career, suggesting sustained intellectual engagement beyond any single specialty.
      curiosity: [64, 0.48, "i", "N"],
      // The compiler project itself was an iterative technical experiment testing whether machine-independent instruction translation was feasible at all, documented via its multi-version development history (A-0, A-1, A-2).
      experimentation: [66, 0.48, "s", "A"],
      // The core compiler concept — abstracting machine-specific instructions into a portable, higher-level symbolic system — is itself a documented act of systems-level abstraction, directly evidenced by the technology's own design.
      systems_abstraction: [72, 0.55, "d", "A"],
    },
  },
  {
    id: "p_immanuel_kant",
    slug: "immanuel-kant",
    canonicalName: "Immanuel Kant",
    birthYear: 1724,
    deathYear: 1804,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["DE"],
    regionCode: "western_europe",
    occupationIds: ["philosopher"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational"],
    tagIds: ["systematic_thinker", "independent"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q9312" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Immanuel_Kant_portrait_c1790.jpg",
      width: 1617,
      height: 1802,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Immanuel_Kant_portrait_c1790.jpg",
      attribution: "Unknown painter, possibly Elisabeth von Stägemann (Anton Graff school), circa 1790, Public Domain",
    },
    sources: [{ id: "src_kant_wikipedia", kind: "wikipedia", title: "Immanuel Kant", url: "https://en.wikipedia.org/wiki/Immanuel_Kant" }, { id: "src_kant_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Immanuel Kant" }, { id: "src_kant_kuehn", kind: "biography", title: "Manfred Kuehn, Kant: A Biography (2001)" }],
    rows: {
      // The Critique of Pure Reason builds an extraordinarily systematic, tightly argued philosophical framework, directly observable in the text's own structure and widely regarded by the Stanford Encyclopedia of Philosophy as among the most rigorous in the Western canon.
      analytical_rigor: [92, 0.78, "d", "A"],
      // Developed a unified philosophical system spanning epistemology (Critique of Pure Reason), ethics (Critique of Practical Reason), and aesthetics (Critique of Judgment) under one coherent framework — documented via the three Critiques' own explicit interconnection.
      systems_abstraction: [90, 0.75, "d", "A"],
      // Famously maintained such a precise, unvarying daily routine (including his walks) that Königsberg residents reportedly set their clocks by it — widely corroborated across multiple contemporary and biographical accounts (Kuehn), not a single anecdote.
      discipline: [90, 0.78, "d", "A"],
      // Delayed publishing his mature philosophical system until his late 50s, continuing to revise his framework privately for over a decade before the Critique of Pure Reason's 1781 publication, documented via Kuehn's account of this 'silent decade.'
      perfectionism: [76, 0.6, "s", "D"],
      // The three Critiques' deliberate, sequential architecture — each addressing a distinct domain of the same overall system — evidences advance structural planning directly observable in the works' own design.
      planning_orientation: [84, 0.68, "d", "A"],
      // Continued developing and refining his philosophical system across the 'silent decade' before publication and for decades afterward, documented via his sustained output into old age.
      persistence: [80, 0.65, "d", "A"],
      // Continued extending his system into new domains (aesthetics, politics, religion) well after his initial major work was complete and his reputation secure.
      mastery_orientation: [78, 0.62, "s", "A"],
      // Never married and structured his entire life around his own independent scholarly routine, documented across multiple biographical accounts of his domestic arrangements.
      autonomy_need: [68, 0.52, "s", "A"],
      // Engaged in real, documented philosophical disputes with contemporaries, though generally through formal written argument rather than sustained personal confrontation — a moderate, not extreme, documented pattern.
      conflict_tolerance: [55, 0.42, "i", "N"],
      // The critical philosophy directly departed from and sought to reconcile the era's dominant rationalist and empiricist traditions with a genuinely original synthesis, documented via the Critique's own stated project.
      independent_thinking: [78, 0.6, "d", "A"],
      // The Critiques' famously dense, precisely defined technical vocabulary and argument structure evidence sustained attention to conceptual precision.
      detail_orientation: [72, 0.55, "s", "A"],
      // Documented (Kuehn) to have led an unusually quiet, routine-bound personal and social life centered on his hometown of Königsberg, which he reportedly never left — a real, evidence-based lower score rather than an assumption from his philosophical stature.
      social_assertiveness: [42, 0.45, "s", "N"],
      // His later work on religion (Religion within the Bounds of Bare Reason) drew formal censure from Prussian royal censors, a real documented consequence of a published position, though his overall career pattern was otherwise institutionally cautious.
      risk_tolerance: [60, 0.45, "i", "N"],
      // Continued producing major systematic work into his 70s, evidencing sustained ambition well past the point his reputation was already secure.
      achievement_drive: [68, 0.5, "s", "A"],
      // His moral philosophy (the categorical imperative) was explicitly framed around universal ethical duty applicable to all rational beings, documented via the Groundwork of the Metaphysics of Morals' own stated purpose.
      impact_motivation: [70, 0.58, "d", "A"],
      // Lectured and wrote across epistemology, ethics, aesthetics, politics, geography, and anthropology, documented via his full body of published and lectured work.
      cross_domain_range: [62, 0.5, "d", "A"],
      // The critical philosophy's synthesis of the era's dominant rationalist and empiricist traditions into a genuinely original framework is documented via the Critique's own stated project and its lasting influence per the Stanford Encyclopedia of Philosophy.
      creative_originality: [84, 0.65, "d", "A"],
      // Maintained an extraordinarily disciplined, unbroken daily routine centered on sustained philosophical work for decades, documented across multiple contemporary and biographical accounts (Kuehn).
      deep_focus: [82, 0.65, "d", "A"],
      // Revised and extended elements of his critical framework across the three Critiques as he applied it to new domains (ethics, aesthetics), documented via the works' own progressive development.
      adaptability: [55, 0.42, "i", "N"],
      // Lectured on and wrote about an unusually wide range of subjects (including geography and anthropology) alongside his core philosophy, suggesting real intellectual range, though this is secondary to his primary, deeply focused systematic project.
      curiosity: [62, 0.46, "i", "N"],
    },
  },
  {
    id: "p_malcolm_x",
    slug: "malcolm-x",
    canonicalName: "Malcolm X",
    aliases: ["El-Hajj Malik El-Shabazz"],
    birthYear: 1925,
    deathYear: 1965,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_activist"],
    fieldIds: ["social_reform"],
    impactDomains: ["social", "historical", "cultural"],
    tagIds: ["overcame_adversity", "self_taught", "endured_imprisonment"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q43303" },
    sources: [{ id: "src_malcolmx_wikipedia", kind: "wikipedia", title: "Malcolm X", url: "https://en.wikipedia.org/wiki/Malcolm_X" }, { id: "src_malcolmx_autobiography", kind: "archive", title: "Alex Haley, The Autobiography of Malcolm X (1965, as told to Haley)" }],
    rows: {
      // Became one of the most prominent, widely broadcast public speakers of the American civil rights era, documented through extensive surviving footage, transcribed speeches, and press coverage of his public appearances.
      social_assertiveness: [90, 0.75, "d", "A"],
      // Publicly and substantively revised his own worldview after his 1964 Hajj pilgrimage, breaking from the Nation of Islam's separatist theology in favor of a broader orthodox Islamic and pan-Africanist framework — a documented, specific instance of updating a deeply held public position under new firsthand experience, not merely a general trait claim.
      independent_thinking: [86, 0.7, "d", "A"],
      // Sustained direct, public confrontation with the political establishment and with figures within his own movement (his split from the Nation of Islam and Elijah Muhammad) across a period documented to have involved credible, ultimately fatal threats against him.
      conflict_tolerance: [84, 0.68, "d", "R"],
      // Continued public speaking and organizing after his home was firebombed and after receiving documented, credible death threats in the weeks before his 1965 assassination — a specific, extensively corroborated pattern of continuing under known extreme personal danger.
      risk_tolerance: [88, 0.72, "d", "R"],
      // Rebuilt his public organizing work (founding Muslim Mosque, Inc. and the Organization of Afro-American Unity) essentially from scratch after his very public break from the Nation of Islam, within the final year of his life.
      persistence: [82, 0.65, "d", "A"],
      // His own autobiography documents a specific, extensively self-narrated revision of his worldview following the 1964 Hajj pilgrimage — moving from the Nation of Islam's separatist theology toward a broader orthodox Islamic and pan-Africanist framework after direct firsthand experience contradicted his prior assumptions, a well-corroborated first-person account of updating a deeply held position, not secondhand characterization.
      belief_updating: [85, 0.68, "d", "A"],
      // Rose from incarceration to becoming a nationally prominent public figure within roughly a decade, documented via the well-established public timeline of his life.
      achievement_drive: [74, 0.58, "s", "A"],
      // Built and led national organizational structures (as the Nation of Islam's national spokesperson, then his own two organizations), documented via the institutional record of his public role.
      leadership_drive: [78, 0.6, "d", "A"],
      // Substantively revised his political and religious framework following direct new firsthand experience (the Hajj), a documented, specific instance of updating rather than defending an established position under new information.
      adaptability: [72, 0.55, "d", "A"],
      // His post-Hajj speeches and writings show a documented shift toward more systematically reasoned political and theological analysis, per his own autobiography's account of this period.
      analytical_rigor: [60, 0.46, "s", "A"],
      // Engaged across religious study, domestic political organizing, and international diplomacy during his final year, documented via his autobiography and travel record.
      cross_domain_range: [58, 0.44, "s", "A"],
      // His own autobiography documents an intense, sustained self-directed prison education program (systematically copying the dictionary by hand over an extended period), a specific, well-corroborated instance of prolonged focused effort.
      deep_focus: [74, 0.58, "d", "A"],
      // Continued developing his political and theological understanding across his life, from Nation of Islam spokesperson to orthodox Sunni Muslim and pan-Africanist organizer, documented via the well-established timeline of his public evolution.
      mastery_orientation: [68, 0.55, "d", "A"],
      // Pursued sustained self-education across history, religion, and politics during and after incarceration, documented via his autobiography's own account of his reading and study.
      curiosity: [62, 0.5, "d", "A"],
      // Self-initiated his own break from the Nation of Islam and founded two new organizations within the final year of his life, documented via the well-established public record.
      proactive_agency: [78, 0.6, "d", "A"],
      // Worked with civil rights leaders and met with African heads of state during his final year, documented via his autobiography and the public record of his international travel.
      collaboration: [60, 0.48, "s", "N"],
      // Deliberately founded independent organizations after leaving the Nation of Islam rather than joining an existing group, documented via the historical record of his final year.
      autonomy_need: [64, 0.5, "s", "A"],
      // The surviving public record documents his rhetorical and organizational activity far more thoroughly than any granular working method, so this is scored conservatively near center rather than assumed from his broader intensity.
      detail_orientation: [55, 0.4, "i", "N"],
      // His own autobiography documents a sustained, self-directed prison education program (extensively reading and copying dictionary entries by hand) that he credited directly for his later intellectual development.
      discipline: [68, 0.5, "s", "A"],
      // Explicitly and repeatedly framed his public work around Black American civil rights and self-determination rather than personal advancement, documented via his own speeches and writing.
      impact_motivation: [80, 0.62, "d", "A"],
    },
  },
  {
    id: "p_muhammad_ali",
    slug: "muhammad-ali",
    canonicalName: "Muhammad Ali",
    aliases: ["Cassius Clay"],
    birthYear: 1942,
    deathYear: 2016,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["athlete", "political_activist"],
    fieldIds: ["sport", "civil_rights"],
    impactDomains: ["athletic", "social", "cultural"],
    tagIds: ["sustained_excellence", "nonconformist", "advocate"],
    archetypeIds: ["competitive_performer", "social_influencer"],
    externalIdentity: { wikidataId: "Q36107" },
    sources: [{ id: "src_ali_wikipedia", kind: "wikipedia", title: "Muhammad Ali", url: "https://en.wikipedia.org/wiki/Muhammad_Ali" }, { id: "src_ali_autobiography", kind: "archive", title: "Muhammad Ali (with Richard Durham), The Greatest: My Own Story (1975)" }, { id: "src_ali_center", kind: "institution", title: "Muhammad Ali Center — biography and archives" }],
    rows: {
      // Publicly refused induction into the U.S. military in 1967 on religious grounds, resulting in the documented loss of his boxing license and heavyweight title, and a felony conviction (later overturned), at the height of his athletic career.
      risk_tolerance: [88, 0.72, "d", "R"],
      // Converted to Islam and changed his name from Cassius Clay in 1964, and took the draft-refusal position against near-unanimous public and media condemnation at the time — both specific, documented, sustained personal stances.
      independent_thinking: [84, 0.7, "d", "A"],
      // Extensively documented pattern of direct, public, often deliberately provocative self-promotion and political statement across his entire career, corroborated by decades of recorded interviews and press conferences.
      social_assertiveness: [90, 0.75, "d", "A"],
      // Sustained the draft-refusal position through a multi-year legal battle and a three-and-a-half-year ban from boxing rather than reversing course, documented via the full legal and career record.
      conflict_tolerance: [82, 0.68, "d", "R"],
      // Widely documented for pre-fight verbal psychological tactics against opponents and for building sustained public support for his political positions over time, corroborated across extensive recorded media.
      persuasiveness: [80, 0.65, "d", "A"],
      // Returned to boxing after the three-and-a-half-year ban and reclaimed the heavyweight title twice more, documented via his full professional record.
      persistence: [84, 0.68, "d", "A"],
      // A three-time heavyweight champion who repeatedly sought rematches against top rivals (Frazier, Foreman) rather than avoiding difficult opponents, documented via his full fight record.
      competitiveness: [86, 0.7, "d", "A"],
      // Self-initiated both the religious conversion and the draft-refusal stance as his own decisions rather than positions urged on him by his management team, documented via his own account and contemporary reporting.
      proactive_agency: [78, 0.6, "d", "A"],
      // Explicitly framed his later-career activism and public statements around broader civil rights and religious identity, not personal athletic legacy alone, documented via his own extensive public statements.
      impact_motivation: [74, 0.58, "d", "A"],
      // Adjusted his in-ring fighting style significantly across his career (from early speed-based boxing to the 'rope-a-dope' strategy against Foreman as he aged), documented via boxing-historical analysis of his fights.
      adaptability: [68, 0.52, "s", "A"],
      // Pursued and achieved the heavyweight title three separate times across different career phases, evidencing sustained ambition beyond a single peak.
      achievement_drive: [78, 0.6, "d", "A"],
      // Sustained elite-level training across a multi-decade career including a full comeback from an extended ban, documented via his competitive longevity.
      discipline: [68, 0.52, "s", "A"],
      // Primarily documented as an individual athlete and public figure rather than in a formal organizational-leadership role — a real, honestly moderate rather than extreme score.
      leadership_drive: [55, 0.42, "i", "N"],
      // Made the independent decision to refuse induction into the U.S. military draft despite severe professional and legal cost (stripped of his title, banned from boxing for over three years), documented via the well-recorded history of that decision.
      autonomy_need: [74, 0.58, "d", "A"],
      // Sustained intense training discipline to reach and maintain world championship level across multiple career phases, including his documented return to top form after a 3.5-year boxing ban for refusing induction into the Vietnam War draft.
      deep_focus: [76, 0.58, "d", "A"],
      // Continued refining and adapting his boxing style across a nearly 20-year career, including reinventing his approach after his return from the ban, documented via boxing-historical accounts.
      mastery_orientation: [64, 0.5, "s", "A"],
      // Engaged in public commentary, religious study (his conversion to the Nation of Islam and later orthodox Sunni Islam), and social activism beyond boxing, documented via his public record.
      curiosity: [55, 0.42, "i", "N"],
      // Rebuilt his career and finances after the multi-year ban with no guaranteed path back to the title, suggesting real resourcefulness, though the specific mechanisms are only moderately documented.
      resourcefulness: [60, 0.45, "i", "N"],
      // Boxing strategy required real tactical preparation, though the surviving record documents his public persona and results far more than a specific detailed training methodology.
      detail_orientation: [52, 0.4, "i", "N"],
      // Worked with a consistent training team (notably Angelo Dundee) across much of his career, a real but individually-focused-sport-typical collaborative pattern, not scored as extreme.
      collaboration: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_niels_bohr",
    slug: "niels-bohr",
    canonicalName: "Niels Bohr",
    birthYear: 1885,
    deathYear: 1962,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["DK"],
    regionCode: "western_europe",
    occupationIds: ["scientist"],
    fieldIds: ["physics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["founder", "nobel_laureate", "innovator"],
    archetypeIds: ["scholarly_specialist", "visionary_pioneer"],
    externalIdentity: { wikidataId: "Q7085" },
    // Portrait Sourcing Batch 1 (2026-08): verified live via a direct fetch
    // of the Commons file page. George Grantham Bain Collection, restored by
    // a Commons contributor; a featured picture on English Wikipedia.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Niels_Bohr_-_LOC_-_ggbain_-_35303.jpg",
      width: 3415,
      height: 4723,
      source: "Wikimedia Commons",
      license: "Public Domain (no known copyright restrictions — Library of Congress, Bain News Service)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Niels_Bohr_-_LOC_-_ggbain_-_35303.jpg",
      attribution: "Bain News Service, c. 1910 — George Grantham Bain Collection, Library of Congress Prints and Photographs Division",
    },
    sources: [{ id: "src_bohr_wikipedia", kind: "wikipedia", title: "Niels Bohr", url: "https://en.wikipedia.org/wiki/Niels_Bohr" }, { id: "src_bohr_nobel", kind: "award_body", title: "The Nobel Prize — Niels Bohr, Physics 1922" }, { id: "src_bohr_pais", kind: "biography", title: "Abraham Pais, Niels Bohr's Times (1991)" }],
    rows: {
      // The Bohr model of the atom and the later Copenhagen interpretation of quantum mechanics required building a coherent conceptual framework that reconciled classical and quantum phenomena, documented via his Nobel-cited work and Pais's detailed intellectual biography.
      systems_abstraction: [88, 0.72, "d", "A"],
      // Founded and led the Institute for Theoretical Physics in Copenhagen (now the Niels Bohr Institute), which became a hub drawing physicists including Heisenberg, Pauli, and Dirac for extended, genuinely collaborative visits — documented via the Institute's own well-recorded history.
      collaboration: [85, 0.7, "d", "A"],
      // Widely documented (Pais's biography and the accounts of the physicists themselves) for a distinctive Socratic guidance style — extended one-on-one dialogue that led a generation of visiting physicists (Heisenberg, Pauli, Landau among others) toward their own insights rather than direct instruction, a specific, corroborated pattern of persuasive intellectual influence.
      persuasiveness: [78, 0.6, "d", "A"],
      // Engaged in a sustained, well-documented series of direct scientific debates with Einstein over the interpretation of quantum mechanics across decades, continuing the disagreement through respectful but genuine, sustained intellectual conflict.
      conflict_tolerance: [76, 0.6, "d", "A"],
      // Fled Nazi-occupied Denmark in 1943 via a documented escape route through Sweden after being warned of imminent arrest (his mother was Jewish), later working on the Manhattan Project — a specific, corroborated period of real personal danger.
      risk_tolerance: [74, 0.58, "d", "R"],
      // The Bohr model's proposal of quantized electron orbits was a genuinely novel departure from classical physics at the time, documented via its Nobel citation and lasting influence on atomic theory's development.
      creative_originality: [82, 0.65, "d", "A"],
      // After the war, documented to have advocated publicly and repeatedly for international cooperation and openness around nuclear science, including a direct 1944 memorandum to Churchill and Roosevelt on the dangers of a nuclear arms race, per Pais's biography.
      impact_motivation: [70, 0.55, "d", "A"],
      // The Copenhagen interpretation's probabilistic account of quantum measurement departed from the deterministic intuitions many contemporaries (including Einstein) held, and he maintained this position through sustained public debate.
      independent_thinking: [72, 0.55, "d", "A"],
      // Sustained a highly productive research and institute-leadership career across roughly five decades, documented via his continuous publication and institutional record.
      discipline: [68, 0.5, "s", "A"],
      // Continued major scientific and institutional work well past his 1922 Nobel Prize, including his postwar advocacy work, evidencing sustained ambition beyond a single early achievement.
      achievement_drive: [62, 0.46, "i", "N"],
      // Built and sustained direction of a major international research institute over decades, a real, documented institutional leadership role distinct from purely individual research contribution.
      leadership_drive: [68, 0.52, "s", "A"],
      // His documented, extremely careful and iterative writing process (colleagues noted he would revise papers many times) suggests real attentiveness to precision, though this is secondary to his primarily conceptual, big-picture contributions.
      detail_orientation: [60, 0.44, "i", "N"],
      // Engaged directly in postwar nuclear-policy diplomacy, including a specific, dated 1944 memorandum to Churchill and Roosevelt urging international openness on nuclear science, documented via Pais's biography.
      social_assertiveness: [62, 0.58, "d", "A"],
      // Developed and rigorously defended the Bohr model and the Copenhagen interpretation through sustained mathematical and conceptual argument, documented via Pais's biography and the Nobel citation.
      analytical_rigor: [82, 0.65, "d", "A"],
      // Engaged across theoretical physics, institutional science leadership, and postwar political advocacy, documented via the breadth of his public record.
      cross_domain_range: [60, 0.46, "s", "A"],
      // Sustained detailed theoretical work developing and defending the Copenhagen interpretation across decades of debate with Einstein and others, documented via Pais's biography.
      deep_focus: [76, 0.58, "d", "A"],
      // Continued refining and defending his interpretive framework across decades of sustained challenge from Einstein and other contemporaries, documented via Pais's biography.
      persistence: [72, 0.55, "d", "A"],
      // Continued extending his physics work and institute leadership across more than four decades, from the 1913 atomic model through postwar nuclear-policy advocacy.
      mastery_orientation: [66, 0.52, "s", "A"],
      // Engaged across theoretical physics, institutional science leadership, and postwar political advocacy on nuclear policy, documented via the breadth of his public record.
      curiosity: [58, 0.44, "s", "A"],
      // Founded and structured the Institute for Theoretical Physics as a deliberate long-term hub for international physics collaboration, documented via the Institute's own institutional history.
      planning_orientation: [64, 0.5, "s", "A"],
      // Revised his own atomic model and interpretive framework substantially as new experimental evidence emerged across his career, evidencing real openness to updating an established position.
      adaptability: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_rachel_carson",
    slug: "rachel-carson",
    canonicalName: "Rachel Carson",
    birthYear: 1907,
    deathYear: 1964,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["scientist", "writer"],
    fieldIds: ["biology", "environmental_science"],
    impactDomains: ["scientific", "social", "historical"],
    tagIds: ["founder", "cross_disciplinary", "advocate"],
    archetypeIds: ["scholarly_specialist", "social_influencer"],
    externalIdentity: { wikidataId: "Q100948" },
    sources: [{ id: "src_carson_wikipedia", kind: "wikipedia", title: "Rachel Carson", url: "https://en.wikipedia.org/wiki/Rachel_Carson" }, { id: "src_carson_lear", kind: "biography", title: "Linda Lear, Rachel Carson: Witness for Nature (1997)" }],
    rows: {
      // Published Silent Spring (1962) knowing it would provoke direct, sustained attack from the chemical industry — documented via Lear's biography detailing the well-funded public campaign against her personally and professionally that followed, which she continued to publicly defend her work through despite it.
      conflict_tolerance: [84, 0.68, "d", "R"],
      // Continued the Silent Spring project and its public defense while managing a private, undisclosed terminal cancer diagnosis, documented via Lear's biography — a specific, corroborated instance of sustained public risk-taking under severe personal circumstance.
      risk_tolerance: [80, 0.65, "d", "R"],
      // Silent Spring synthesized and cross-checked a large body of existing scientific literature on pesticide effects into a rigorously sourced argument, documented via the book's own extensive endnotes and its lasting scientific credibility.
      analytical_rigor: [84, 0.68, "d", "A"],
      // Sustained a career spanning marine biology research, government science writing (at the U.S. Bureau of Fisheries), and popular science writing (The Sea Around Us, Silent Spring), documented via her full bibliography and career record.
      cross_domain_range: [78, 0.62, "d", "A"],
      // Explicitly framed Silent Spring around public and ecological welfare rather than scientific credit or personal advancement, documented via her own stated purpose in the book and subsequent congressional testimony.
      impact_motivation: [80, 0.65, "d", "A"],
      // Took a position directly opposed to the prevailing agricultural-chemical industry consensus of the period, sustained through a well-documented public campaign against her, rather than retracting or softening her position.
      independent_thinking: [76, 0.6, "d", "A"],
      // Sustained a multi-year research and writing process for Silent Spring while working a full-time government science career and managing family caregiving responsibilities, documented via Lear's biography.
      discipline: [74, 0.58, "s", "A"],
      // Silent Spring's extensive, precisely cited scientific documentation (over 50 pages of source notes) evidences sustained attention to factual precision under public scrutiny.
      detail_orientation: [76, 0.58, "d", "A"],
      // Distinctively combined rigorous scientific argument with accessible, literary prose style, documented via critical assessment of her work's lasting influence on science writing as a genre.
      creative_originality: [68, 0.52, "s", "A"],
      // Continued public advocacy and testimony (including before a Senate subcommittee) defending Silent Spring's findings through the sustained industry campaign against her, up until her death shortly after publication.
      persistence: [72, 0.55, "d", "A"],
      // Silent Spring synthesized ecology, chemistry, and public health into one coherent systemic argument about ecosystem-wide pesticide effects, documented via the book's own analytical structure.
      systems_abstraction: [78, 0.62, "d", "A"],
      // Silent Spring is widely credited with catalyzing the modern environmental movement and directly influencing U.S. pesticide policy, including the eventual domestic DDT ban, documented via the well-established historical record of its policy impact.
      persuasiveness: [74, 0.6, "d", "A"],
      // Left her stable government position to pursue independent writing once her book royalties allowed, documented via Lear's biography.
      autonomy_need: [60, 0.46, "s", "A"],
      // Recognized the emerging public-health significance of pesticide accumulation before it was a mainstream concern, synthesizing scattered scientific findings into a coherent public argument, documented via Silent Spring's own content and reception.
      opportunity_sensing: [64, 0.5, "d", "A"],
      // Sustained years of research synthesis for Silent Spring, cross-referencing an extensive scientific literature while managing a full-time government science career, documented via Lear's biography.
      deep_focus: [78, 0.6, "d", "A"],
      // Developed her craft across marine biology research, government science writing, and popular science writing (The Sea Around Us, Silent Spring) over her career.
      mastery_orientation: [62, 0.48, "s", "A"],
      // Silent Spring's multi-year research and writing process required sustained advance organization of a large body of scientific evidence, documented via Lear's biography.
      planning_orientation: [68, 0.54, "d", "A"],
      // Worked closely with government scientist colleagues and correspondents while researching Silent Spring, documented via Lear's biography.
      collaboration: [55, 0.44, "s", "N"],
      // Transitioned from a government marine-biology career to full-time independent writing as her book royalties allowed, documented via Lear's biography.
      adaptability: [58, 0.46, "s", "A"],
      // Sustained a demanding, multi-decade science-writing and research career while also serving as primary caregiver to family members across much of her adult life, evidencing real long-term ambition balanced against significant competing responsibility.
      achievement_drive: [62, 0.46, "i", "N"],
      // Documented by Lear as personally reserved and more comfortable with solitary research and writing than public confrontation, though she did testify publicly when the situation required it — an honestly moderate-low score rather than an assumption of extroversion from her public impact.
      social_assertiveness: [45, 0.42, "s", "N"],
      // Her sustained cross-disciplinary synthesis (chemistry, ecology, ornithology, public health) across Silent Spring suggests real intellectual range beyond her core marine-biology training.
      curiosity: [58, 0.44, "i", "N"],
    },
  },
  {
    id: "p_simon_bolivar",
    slug: "simon-bolivar",
    canonicalName: "Simón Bolívar",
    birthYear: 1783,
    deathYear: 1830,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["VE"],
    regionCode: "latin_america",
    occupationIds: ["military_leader", "political_leader"],
    fieldIds: ["military", "politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "strategist", "young_leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q8605" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Sim%C3%B3n_Bol%C3%ADvar_by_Jos%C3%A9_Gil_de_Castro.jpg",
      width: 1920,
      height: 2528,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sim%C3%B3n_Bol%C3%ADvar_by_Jos%C3%A9_Gil_de_Castro.jpg",
      attribution: "Painted by José Gil de Castro, circa 1823-1825, Lima Art Museum, Public Domain",
    },
    sources: [{ id: "src_bolivar_wikipedia", kind: "wikipedia", title: "Simón Bolívar", url: "https://en.wikipedia.org/wiki/Sim%C3%B3n_Bol%C3%ADvar" }, { id: "src_bolivar_lynch", kind: "biography", title: "John Lynch, Simón Bolívar: A Life (2006)" }],
    rows: {
      // Led independence campaigns across present-day Venezuela, Colombia, Ecuador, Peru, and Bolivia and served as President of Gran Colombia — documented across the extensive military and political record of the era.
      leadership_drive: [92, 0.72, "d", "A"],
      // Survived multiple exiles and at least one documented assassination attempt while continuing military campaigns against Spanish colonial forces.
      risk_tolerance: [85, 0.68, "d", "A"],
      // Continued the independence struggle across roughly two decades despite repeated documented setbacks, including being forced into exile more than once and having to rebuild his campaign from very little each time.
      persistence: [88, 0.72, "d", "A"],
      // Adapted military and political strategy across genuinely different terrains and political contexts (Venezuela, Colombia, the Andes, Peru), documented via Lynch's account of the successive campaigns.
      adaptability: [80, 0.65, "d", "A"],
      // Rallied diverse regional military and political leaders under a unified independence banner across multiple countries, documented via the coalition-building record of the campaigns.
      persuasiveness: [78, 0.62, "d", "A"],
      // Coordinated complex, multi-year, multi-national military and political campaigns, documented via the sustained coordination the independence wars required.
      planning_orientation: [76, 0.6, "s", "A"],
      // Authored substantial political-theoretical writings (the Jamaica Letter, the Angostura Address) presenting systematic argument about governance, documented via the surviving texts themselves.
      analytical_rigor: [68, 0.55, "d", "A"],
      // Developed his own distinct political vision for Latin American unity and governance, documented as diverging from other contemporary independence leaders' models.
      independent_thinking: [72, 0.55, "s", "A"],
      // The 1819 crossing of the flooded Andes to reach and win the Battle of Boyacá by surprise is a specific, well-documented, high-stakes strategic decision.
      decisiveness: [82, 0.65, "d", "A"],
      // Sustained a two-decade military and political campaign across multiple countries, evidencing consistent long-term commitment.
      discipline: [74, 0.58, "s", "A"],
      // Self-initiated much of the independence movement's strategic direction across multiple countries rather than following an existing plan.
      proactive_agency: [76, 0.6, "d", "A"],
      // Sustained armed conflict against Spanish colonial forces across roughly two decades rather than seeking early accommodation.
      conflict_tolerance: [78, 0.62, "d", "R"],
      // Documented real strategic and personal rivalry with fellow independence leader José de San Martín over the future governance of the liberated territories — a real but moderately-evidenced pattern.
      competitiveness: [62, 0.48, "i", "N"],
      // Worked with numerous regional military and political leaders across the campaigns, though also documented real friction and rivalry with several of them (including San Martín) — genuinely mixed, scored toward the center.
      collaboration: [58, 0.46, "i", "D"],
      // Real output spanning military command, political theory/writing, and nation-building administration, not military leadership alone.
      cross_domain_range: [68, 0.52, "s", "A"],
      // Developed a coherent political ideology (what later became known as Bolivarianism) for continental governance, documented via his own political writings.
      systems_abstraction: [65, 0.5, "s", "A"],
      // Documented to have proposed a unified Latin American confederation beyond his own personal rule (ultimately unrealized), suggesting real motivation toward structural change — though he also held substantial personal power, keeping this scored moderately rather than at the extreme.
      impact_motivation: [62, 0.48, "i", "N"],
      // Sustained the military and political campaign for South American independence across roughly two decades despite repeated setbacks and reversals, documented via the well-recorded campaign history.
      deep_focus: [72, 0.55, "d", "A"],
      // Developed both military command and political/administrative governance capability across his campaigns, documented via the historical record of his expanding roles from military commander to head of state of Gran Colombia.
      mastery_orientation: [64, 0.5, "s", "A"],
      // Pursued the liberation of multiple South American nations across two decades (present-day Venezuela, Colombia, Ecuador, Peru, and Bolivia, the last named after him), documented via the well-recorded military and political history of his campaigns.
      achievement_drive: [72, 0.55, "d", "A"],
      // Funded and organized military campaigns across resource-poor and logistically difficult terrain for two decades, documented via the campaigns' own logistical history.
      resourcefulness: [70, 0.55, "s", "A"],
    },
  },
  {
    id: "p_sojourner_truth",
    slug: "sojourner-truth",
    canonicalName: "Sojourner Truth",
    aliases: ["Isabella Baumfree"],
    birthYear: 1797,
    deathYear: 1883,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_activist"],
    fieldIds: ["civil_rights"],
    impactDomains: ["social", "historical"],
    tagIds: ["overcame_adversity", "advocate", "self_taught"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q105180" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/94/Sojourner_Truth%2C_1870_%28cropped%2C_restored%29.jpg",
      width: 3035,
      height: 4210,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sojourner_Truth,_1870_(cropped,_restored).jpg",
      attribution: "Randall Studio, circa 1870, National Portrait Gallery, Smithsonian Institution (NPG.79.220), Public Domain",
    },
    sources: [{ id: "src_truth_wikipedia", kind: "wikipedia", title: "Sojourner Truth", url: "https://en.wikipedia.org/wiki/Sojourner_Truth" }, { id: "src_truth_narrative", kind: "archive", title: "Narrative of Sojourner Truth (dictated to Olive Gilbert, 1850)" }, { id: "src_truth_painter", kind: "biography", title: "Nell Irvin Painter, Sojourner Truth: A Life, A Symbol (1996)" }],
    rows: {
      // Became a nationally sought-after extemporaneous speaker across the abolitionist and suffrage circuits for decades; multiple independent eyewitness accounts corroborate her powerful oratory, even though the exact wording of her most famous speech is separately disputed among historians (Painter) — the fact of the sustained speaking career is documented, not the disputed transcript.
      persuasiveness: [88, 0.72, "d", "A"],
      // In 1828, sued a white man in court to recover her illegally sold son and won — a specific, legally recorded case, extraordinarily rare for a Black woman in that era.
      social_assertiveness: [90, 0.78, "d", "A"],
      // The 1828 custody lawsuit itself carried severe real risk in that legal and social context, documented via the surviving court record.
      risk_tolerance: [85, 0.7, "d", "A"],
      // Chose to rename herself from Isabella Baumfree to Sojourner Truth in 1843, explicitly framing it as her own chosen spiritual and political mission rather than an inherited identity.
      independent_thinking: [78, 0.62, "d", "A"],
      // Became a prominent organizing figure across both the abolitionist and women's suffrage movements over several decades, documented via convention records of the period.
      leadership_drive: [74, 0.58, "s", "A"],
      // Continued touring and speaking into her 80s, decades after emancipation had already been achieved, documented via her later-life speaking itinerary.
      persistence: [82, 0.65, "d", "A"],
      // Documented friction within the suffrage movement over the prioritization of Black versus women's suffrage, a real, sustained point of tension she remained engaged with rather than withdrawing from.
      conflict_tolerance: [68, 0.52, "s", "R"],
      // Self-initiated both the 1828 legal case and her subsequent touring speaking career, rather than being recruited into either by an existing organization.
      proactive_agency: [80, 0.65, "d", "A"],
      // Chose her own name and an itinerant, self-directed preaching and speaking life rather than settling into a fixed conventional role after gaining her freedom.
      autonomy_need: [72, 0.55, "d", "A"],
      // Real activity across legal action, dictated memoir (Narrative of Sojourner Truth), religious preaching, and organized political activism — genuine range, though concentrated within a broadly consistent activist identity.
      cross_domain_range: [62, 0.48, "s", "N"],
      // Sustained an itinerant touring and speaking lifestyle for decades, evidencing consistent long-term commitment beyond any single campaign.
      discipline: [68, 0.52, "s", "A"],
      // Worked within and alongside organized abolitionist and suffrage societies for decades, documented via convention and organizational records.
      collaboration: [62, 0.48, "s", "A"],
      // Her sustained, decades-long activism spanned two distinct causes (abolition, then women's suffrage) well past the point personal necessity would have required, evidencing motivation toward broad structural change.
      impact_motivation: [78, 0.6, "d", "A"],
      // Pursued goal-directed activism across two distinct, sequential causes rather than settling after the first was substantially achieved.
      achievement_drive: [65, 0.5, "s", "A"],
      // Documented transitions from enslaved laborer to legal claimant to preacher to nationally recognized activist and memoirist — genuinely distinct roles across her lifetime.
      adaptability: [70, 0.55, "s", "A"],
      // Documented to have made a specific, dated decision to walk away from her enslaver to freedom with her infant daughter in 1826, and separately to pursue the 1828 legal case rather than accept the loss of her son — both specific, corroborated decisive actions.
      decisiveness: [78, 0.6, "d", "A"],
      // Became a renowned public orator despite no formal education, continuously refining her rhetorical approach across decades of lecturing on abolition and women's rights.
      mastery_orientation: [62, 0.5, "s", "A"],
      // Successfully sued to recover her illegally sold son in an 1828 Ulster County court case — a specific, documented instance of recognizing and using a legal avenue few in her position would have pursued, becoming one of the first Black women to win such a case against a white man in a U.S. court.
      opportunity_sensing: [68, 0.58, "d", "A"],
      // Sustained decades of lecture-circuit engagement on abolition and women's rights without formal institutional backing, documented via her dictated Narrative and the well-recorded history of her public career.
      deep_focus: [60, 0.5, "s", "A"],
      // Documented to have engaged in sustained direct dialogue and debate with audiences, adapting her arguments across different settings, suggesting real intellectual engagement beyond a fixed rehearsed message.
      curiosity: [55, 0.46, "s", "N"],
      // Sold cartes de visite of her own portrait, captioned 'I Sell the Shadow to Support the Substance,' as a documented, specific, self-devised method of funding her activism — a real, concrete resourceful strategy, not a general inference.
      resourcefulness: [72, 0.55, "d", "A"],
    },
  },
  {
    id: "p_sor_juana_ines_de_la_cruz",
    slug: "sor-juana-ines-de-la-cruz",
    canonicalName: "Sor Juana Inés de la Cruz",
    birthYear: 1648,
    deathYear: 1695,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["MX"],
    regionCode: "latin_america",
    historicalPolityKey: "polity.new_spain",
    occupationIds: ["poet", "writer", "philosopher"],
    fieldIds: ["literature", "philosophy"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["self_taught", "nonconformist", "polymath"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q183074" },
    sources: [{ id: "src_sorjuana_wikipedia", kind: "wikipedia", title: "Sor Juana Inés de la Cruz", url: "https://en.wikipedia.org/wiki/Sor_Juana_In%C3%A9s_de_la_Cruz" }, { id: "src_sorjuana_respuesta", kind: "archive", title: "La Respuesta a Sor Filotea de la Cruz (1691)" }, { id: "src_sorjuana_paz", kind: "biography", title: "Octavio Paz, Sor Juana, or, The Traps of Faith (1988)" }],
    rows: {
      // Documented (including in her own account) to have taught herself to read as a small child, learned Latin in a small number of lessons, and assembled one of the largest private libraries in colonial Spanish America (~4,000 volumes).
      curiosity: [92, 0.75, "d", "A"],
      // Wrote La Respuesta a Sor Filotea de la Cruz as a direct, reasoned defense of women's right to intellectual life, addressed specifically to a bishop who had publicly criticized her — the surviving text itself is the documented evidence.
      independent_thinking: [88, 0.72, "d", "A"],
      // A substantial body of poetry and drama widely regarded by literary scholarship as among the most original of the Spanish Golden Age, documented via the surviving corpus and its critical reception.
      creative_originality: [84, 0.68, "d", "A"],
      // The Respuesta builds a systematic, point-by-point theological and philosophical argument rather than a purely emotional appeal, directly observable in the surviving text.
      analytical_rigor: [82, 0.68, "d", "A"],
      // Publicly defended her intellectual pursuits against direct criticism from Church authority, a documented real risk in her context — she was eventually pressured into giving up her library and writing near the end of her life.
      risk_tolerance: [78, 0.62, "d", "R"],
      // The Respuesta is regarded by literary-critical consensus (Paz) as a rhetorically sophisticated, deliberately persuasive defense, not merely a personal statement.
      persuasiveness: [74, 0.58, "d", "A"],
      // Documented to have entered convent life specifically as a deliberate strategic choice to secure the time and autonomy for sustained study, which marriage would not have afforded a woman of her era.
      discipline: [78, 0.62, "d", "A"],
      // The same documented convent decision is a specific, concrete instance of finding an unconventional path to a goal (scholarly life) that was not directly available to her.
      resourcefulness: [76, 0.6, "d", "A"],
      // Recognized convent life as the one realistically available path to sustained intellectual work for a woman in colonial Mexico, documented via her own and biographers' accounts of the decision.
      opportunity_sensing: [74, 0.58, "d", "A"],
      // Continued assembling her library and producing scholarly and literary work across decades, well beyond what any single patron or purpose required.
      mastery_orientation: [82, 0.65, "d", "A"],
      // Real, documented output across poetry, theatrical drama, and theological/philosophical argument (the Respuesta), not one genre alone.
      cross_domain_range: [78, 0.62, "d", "A"],
      // Sustained direct disagreement with Church authority over her intellectual pursuits for years before eventually being pressured to cease, documented via the surviving correspondence and later biographical record.
      conflict_tolerance: [72, 0.55, "d", "R"],
      // The convent decision was explicitly, by her own documented account, motivated by the pursuit of intellectual autonomy unavailable through marriage.
      autonomy_need: [76, 0.6, "d", "A"],
      // Documented to have been examined as a teenager by a panel of scholars at the viceregal court and to have impressed them with her knowledge — a specific, corroborated instance of direct public intellectual engagement before entering the convent.
      social_assertiveness: [68, 0.52, "d", "A"],
      // Continued scholarly and literary work for decades within the convent despite recurring institutional pressure to conform to more conventional religious duties.
      persistence: [80, 0.62, "d", "A"],
      // Self-initiated both her own early self-education and the strategic choice of convent life, rather than following a path set by family or institution.
      proactive_agency: [76, 0.6, "d", "A"],
      // The Respuesta builds a general framework defending women's right to knowledge as a category, not only her own individual case — a structural argument, distinct from the analytical rigor of any single point within it.
      systems_abstraction: [66, 0.5, "s", "A"],
      // Pursued an extensive self-directed intellectual education and accumulated one of colonial Mexico's largest private libraries, documented via well-corroborated historical accounts of her scholarly output and library.
      achievement_drive: [66, 0.52, "d", "A"],
      // Her famous "Respuesta a Sor Filotea" explicitly defended women's right to education and intellectual life, a document framed around a broader social purpose, well documented via the surviving text itself.
      impact_motivation: [68, 0.55, "d", "A"],
      // Sustained scholarly and literary output across decades within convent life suggests real sustained engagement, though the surviving record documents output more than her specific daily working method.
      deep_focus: [64, 0.48, "i", "A"],
    },
  },
  {
    id: "p_toussaint_louverture",
    slug: "toussaint-louverture",
    canonicalName: "Toussaint Louverture",
    birthYear: 1743,
    deathYear: 1803,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["HT"],
    regionCode: "latin_america",
    occupationIds: ["military_leader", "political_leader"],
    fieldIds: ["military", "politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["overcame_adversity", "leader", "strategist"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q205783" },
    sources: [{ id: "src_toussaint_wikipedia", kind: "wikipedia", title: "Toussaint Louverture", url: "https://en.wikipedia.org/wiki/Toussaint_Louverture" }, { id: "src_toussaint_dubois", kind: "biography", title: "Laurent Dubois, Avengers of the New World: The Story of the Haitian Revolution (2004)" }],
    rows: {
      // Rose from enslaved coachman to Commander-in-Chief and Governor-General of Saint-Domingue, documented via the extensive military and administrative record of the Haitian Revolution.
      leadership_drive: [90, 0.72, "d", "A"],
      // Employed documented sophisticated guerrilla and conventional tactics adapted to fighting Spanish, French, and British forces in succession, per Dubois's military account of the campaigns.
      analytical_rigor: [78, 0.6, "s", "A"],
      // Led an armed uprising of enslaved people against colonial military powers — a specific, documented, extreme risk given the near-universal historical consequence of failed slave rebellions.
      risk_tolerance: [88, 0.72, "d", "A"],
      // Coordinated multi-front military and political campaigns across roughly a decade, documented via the surviving campaign record.
      planning_orientation: [76, 0.6, "s", "A"],
      // Switched allegiance from Spain to France in 1794 based on his own strategic assessment of which side would better serve abolition, a documented, consequential judgment against his existing alliance.
      independent_thinking: [80, 0.65, "d", "A"],
      // Shifted alliances (initially Spanish-aligned, then French) as circumstances changed, and adapted tactics against successively different colonial opponents — documented across the full campaign.
      adaptability: [82, 0.68, "d", "A"],
      // Negotiated alliances and rallied a formerly enslaved population into an organized military and political force, documented via the revolution's own organizational history.
      persuasiveness: [72, 0.55, "s", "A"],
      // The 1794 switch from Spanish to French allegiance was a specific, dated, high-stakes decision documented in the historical record.
      decisiveness: [78, 0.6, "d", "A"],
      // Sustained the revolutionary struggle across roughly a decade (1791-1802) against a sequence of different opponents.
      persistence: [84, 0.68, "d", "A"],
      // Organized and trained a functioning, disciplined military force from formerly enslaved people with limited resources, documented via Dubois's account of the army's development.
      discipline: [76, 0.6, "s", "A"],
      // Initiated and led the movement's military and political direction rather than serving as one participant among many, documented via his rise to sole command.
      proactive_agency: [78, 0.62, "d", "A"],
      // Sustained armed conflict against multiple colonial powers across roughly a decade rather than seeking early accommodation.
      conflict_tolerance: [80, 0.65, "d", "R"],
      // Increasingly governed Saint-Domingue with growing practical autonomy from French colonial authority, documented via his later administrative actions.
      autonomy_need: [68, 0.52, "s", "A"],
      // Worked alongside other revolutionary leaders (Dessalines, Christophe), though the historical record also documents real strategic friction with some of them — a genuinely mixed pattern, scored toward the center.
      collaboration: [55, 0.45, "i", "D"],
      // Rose from slavery to become de facto ruler of Saint-Domingue and drafted its 1801 constitution, documented via the well-recorded political history of the Haitian Revolution.
      achievement_drive: [74, 0.56, "d", "A"],
      // Built a functioning military and administrative structure from severely limited resources amid ongoing war, documented via the revolution's logistical history.
      resourcefulness: [74, 0.58, "s", "A"],
      // Real output in both military command and political governance (drafting Saint-Domingue's 1801 constitution), not military leadership alone.
      cross_domain_range: [66, 0.52, "s", "A"],
      // Drafted a formal constitution for Saint-Domingue in 1801, a documented, genuinely systematic governance framework rather than ad hoc rule.
      systems_abstraction: [62, 0.48, "s", "A"],
      // Sustained a multi-year military and political campaign (the Haitian Revolution) requiring continuous strategic attention across shifting alliances and battles, documented via the well-recorded campaign history.
      deep_focus: [74, 0.56, "d", "A"],
      // Developed from a formerly enslaved plantation worker into a self-taught military commander and eventually governor-general, a documented trajectory of expanding capability across his life.
      mastery_orientation: [66, 0.52, "d", "A"],
      // Recognized and used the political instability created by the French Revolution as a strategic opening to advance the uprising's cause, documented via the timing of his key strategic moves.
      opportunity_sensing: [70, 0.55, "s", "A"],
    },
  },
  {
    id: "p_wole_soyinka",
    slug: "wole-soyinka",
    canonicalName: "Wole Soyinka",
    birthYear: 1934,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["NG"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["writer", "political_activist"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["independent", "nonconformist", "advocate"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q41488" },
    sources: [{ id: "src_soyinka_wikipedia", kind: "wikipedia", title: "Wole Soyinka", url: "https://en.wikipedia.org/wiki/Wole_Soyinka" }, { id: "src_soyinka_nobel", kind: "award_body", title: "The Nobel Prize — Wole Soyinka, Literature 1986" }, { id: "src_soyinka_memoir", kind: "archive", title: "Wole Soyinka, The Man Died: Prison Notes (1972 memoir)" }],
    rows: {
      // Was imprisoned for roughly two years (1967-1969), much of it in solitary confinement, after publicly attempting to broker a ceasefire during the Nigerian Civil War — a specific, documented, extreme personal risk taken for a political cause outside any formal role.
      risk_tolerance: [84, 0.68, "d", "R"],
      // The 1967 ceasefire attempt was a self-directed intervention outside any official capacity, and his sustained literary and political criticism of successive Nigerian governments across decades is documented via his continuous published output.
      independent_thinking: [80, 0.65, "d", "A"],
      // The first sub-Saharan African writer to win the Nobel Prize in Literature (1986), documented via the Nobel citation recognizing his distinctive fusion of Yoruba traditional drama with modern Western theatrical form.
      creative_originality: [82, 0.65, "d", "A"],
      // Sustained direct public criticism of Nigerian military governments across decades, including further documented exile under threat of execution in the 1990s under Sani Abacha's regime.
      conflict_tolerance: [82, 0.65, "d", "R"],
      // Maintained a sustained public political voice across six decades of Nigerian and international politics, documented via his extensive published essays, interviews, and public statements.
      social_assertiveness: [78, 0.62, "d", "A"],
      // Self-initiated the 1967 ceasefire attempt without official authorization or backing, documented via his own memoir account of the episode's origin.
      proactive_agency: [78, 0.62, "d", "A"],
      // His Nobel citation and the sustained international reception of his political writing credit him with shaping outside opinion on Nigerian governance, documented via the Nobel Committee's own framing.
      persuasiveness: [70, 0.6, "d", "A"],
      // His fusion of traditional Yoruba ritual dramatic form with modern Western theatrical structure is a documented, distinctive aesthetic achievement explicitly noted in his Nobel Prize citation.
      aesthetic_sensitivity: [74, 0.65, "d", "A"],
      // Maintained an independent political and literary voice across successive Nigerian governments, refusing affiliation with any single political faction, documented via his sustained public record.
      autonomy_need: [62, 0.5, "s", "A"],
      // Continued producing and staging work despite repeated imprisonment and exile, finding ways to publish and perform under severe constraint — his Prison Notes were smuggled out of custody, a specific documented instance.
      resourcefulness: [66, 0.52, "d", "A"],
      // Sustained a prolific output of plays, poetry, and prose across six decades despite repeated imprisonment and exile, documented via his complete bibliography.
      deep_focus: [68, 0.52, "s", "A"],
      // Engaged across drama, poetry, memoir, literary criticism, and direct political theory over his career, documented via the range of his bibliography.
      curiosity: [60, 0.44, "s", "A"],
      // Worked within and helped found Nigerian theater companies and literary institutions across his career, documented via the institutional record of his theatrical work.
      collaboration: [58, 0.46, "s", "N"],
      // The 1967 ceasefire attempt required real advance coordination and planning despite occurring outside any official role, documented via his own memoir account.
      planning_orientation: [62, 0.5, "s", "A"],
      // Sustained a prolific literary output across plays, poetry, essays, and memoir spanning over six decades.
      discipline: [70, 0.55, "s", "A"],
      // Continued writing during his imprisonment (documented via smuggled notes later published as Prison Notes) and resumed public political engagement after each period of exile or imprisonment rather than withdrawing.
      persistence: [76, 0.58, "d", "A"],
      // Real, sustained output across drama, poetry, memoir, literary criticism, and direct political activism, documented via his full bibliography and public record.
      cross_domain_range: [68, 0.52, "d", "A"],
      // Explicitly and repeatedly framed both his literary and political work around Nigerian and pan-African social conditions rather than personal literary achievement alone, documented via his own essays and public statements.
      impact_motivation: [74, 0.58, "d", "A"],
      // Primarily documented as an individual writer and public intellectual rather than a formal organizational leader, an honestly moderate rather than extreme score.
      leadership_drive: [60, 0.46, "i", "N"],
      // Sustained major creative and political output across six decades despite repeated imprisonment and exile, evidencing real long-term ambition.
      achievement_drive: [64, 0.48, "i", "N"],
      // His plays' structural complexity blending Yoruba ritual form with Western dramatic convention suggests real formal precision, though the surviving record documents his political engagement more extensively than his specific compositional method.
      detail_orientation: [55, 0.42, "i", "N"],
      // Continued producing work across drama, poetry, and prose over six decades, suggesting sustained craft development rather than reliance on a single early success.
      mastery_orientation: [62, 0.46, "i", "N"],
    },
  },
];

export const ROSTER_4: readonly Person[] = seeds.map(build);
