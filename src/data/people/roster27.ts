/**
 * ROSTER 27 — twelve-person fast production batch, fourth real use of the
 * profile-publication / match-eligibility separation architecture
 * (12 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster27.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. All twelve
 * are `evidence_approved`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * `docs/checkpoints/roster27-twelve-person-fast-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_al_biruni",
    slug: "al-biruni",
    canonicalName: "Al-Biruni",
    aliases: ["Abu Rayhan al-Biruni"],
    birthYear: 973,
    deathYear: 1048,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "central_asia",
    historicalPolityKey: "polity.ghaznavid_empire",
    occupationIds: ["scientist", "astronomer"],
    fieldIds: ["natural_science", "mathematics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["polymath", "cross_disciplinary", "systematic_thinker"],
    archetypeIds: ["cross_disciplinary_generalist", "scientific_explorer"],
    externalIdentity: { wikidataId: "Q11826" },
    portrait: {
      url: "/portraits/al-biruni-ussr-stamp-1973.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (official Soviet government work, exempt from copyright under Russian Civil Code Art. 1259)",
      width: 728,
      height: 1001,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Biruni-russian.jpg",
      attribution: "USSR commemorative postage stamp, 1973 (1000th anniversary of his birth)",
      kind: "editorial_nonlikeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_albiruni_wikipedia", kind: "wikipedia", title: "Al-Biruni", url: "https://en.wikipedia.org/wiki/Al-Biruni" }, { id: "src_albiruni_britannica", kind: "institution", title: "Britannica — Al-Biruni" }, { id: "src_albiruni_india", kind: "archive", title: "Al-Biruni, Kitab al-Hind (Book of India, c. 1030)" }, { id: "src_albiruni_ibnsina_correspondence", kind: "archive", title: "The Ibn Sina-Al-Biruni Correspondence -- an actual surviving epistolary exchange (c. 998, when Al-Biruni was ~25 and Ibn Sina ~18), 10 questions on Aristotle's De Caelo and 8 on the Physics, with Al-Biruni's own recorded dissatisfaction with most of Ibn Sina's replies -- a direct, firsthand, interpersonal source, distinct in kind from his solo-authored works" }, { id: "src_albiruni_ghazni_capture", kind: "institution", title: "Scholarly accounts (MacTutor History of Mathematics; Syed Nomanul Haq, \"Al-Biruni in chains\") of the 1017 Ghaznavid conquest of Khwarazm, during which Al-Biruni was taken to Mahmud of Ghazni's court -- by several accounts literally in chains as a war-captive -- yet was subsequently given scholarly resources and produced major work there" }],
    rows: {
      // Produced substantive original work across astronomy, mathematics, geography, geodesy, mineralogy, history, and comparative religion/anthropology (Kitab al-Hind), documented via his surviving bibliography of roughly 146 known works across these genuinely distinct fields.
      cross_domain_range: [92, 0.68, "d", "A"],
      // RUBRIC_CORRECTION (roster27 fast-batch audit, 2026-09; score-band correction only): Kitab al-Hind documents systematic, direct investigation of Indian religion, science, and customs, including learning Sanskrit specifically to access primary sources — a specific, well-corroborated instance of sustained cross-cultural inquiry. Originally scored 88/documented; corrected to 80 because this rests on one sustained project (a single major work), not multiple independent instances, per Section 4's 85+ requirement. Score-band correction only: evidenceType and confidence unchanged.
      curiosity: [80, 0.65, "d", "A"],
      // Calculated Earth's radius with a documented, methodologically rigorous technique (measuring the dip of the horizon from a known mountain height), a specific method still cited in the history of geodesy.
      analytical_rigor: [82, 0.65, "d", "A"],
      // Kitab al-Hind systematically compares Indian and Greek/Islamic scientific and philosophical frameworks side by side, documented via the work's own comparative structure.
      systems_abstraction: [78, 0.65, "d", "A"],
      // [NEW_EVIDENCE, this session] A second, independent, genuinely interpersonal instance now corroborates the Kitab al-Hind editorial-stance evidence: his real, surviving correspondence with Ibn Sina (c. 998) shows him taking and sustaining an independent Democritean-leaning position against the dominant Aristotelian/Peripatetic physics Ibn Sina defended, recorded as dissatisfied with most of Ibn Sina's responses rather than deferring to the era's other great authority. Two independent documented instances, one solo-authored and one direct dialectical exchange, meets this rubric's top confidence band.
      independent_thinking: [80, 0.78, "d", "A"],
      // His astronomical and geodetic works involved precise numerical measurement (e.g. the horizon-dip Earth-radius calculation), documented via the surviving technical content of those works.
      detail_orientation: [74, 0.65, "d", "A"],
      // Learned Sanskrit specifically to access Indian primary sources directly rather than relying on translation, a specific, documented instance of overcoming a real access constraint through direct personal effort.
      resourcefulness: [68, 0.65, "d", "A"],
      // Sustained an unusually large documented body of work (roughly 146 known titles) across a multi-decade career under several different patron courts.
      discipline: [66, 0.46, "s", "A"],
      // Recognized and pursued the scholarly opportunity presented by extended access to India following Mahmud of Ghazni's campaigns, using the circumstance to conduct sustained direct research rather than treating it as incidental.
      opportunity_sensing: [62, 0.46, "s", "A"],
      // [NEW_EVIDENCE, this session] A specific, well-corroborated documented episode now replaces the previous generic 'changed patron courts' framing: multiple scholarly accounts (MacTutor; Syed Nomanul Haq's "Al-Biruni in chains") describe him being brought to Mahmud of Ghazni's court in 1017 as a literal war-captive following the Ghaznavid conquest of Khwarazm, yet subsequently given scholarly resources and producing major work (including Kitab al-Hind) under the very court that had captured him. Marked dual_edged -- this was coerced circumstance, not a freely chosen adaptation, and the same episode is a real, documented instance of both severe constraint and genuine resilience within it.
      adaptability: [66, 0.62, "d", "D"],
      // Sustained an unusually prolific scholarly output across a long career, evidencing real long-term ambition beyond any single achievement.
      achievement_drive: [58, 0.42, "i", "N"],
      // Continued producing substantial new work across multiple fields well into his later career, documented via the chronological spread of his bibliography.
      mastery_orientation: [62, 0.44, "s", "A"],
      // Kitab al-Hind's explicit stated purpose was to build genuine mutual understanding between Islamic and Indian intellectual traditions, documented via the work's own preface.
      impact_motivation: [58, 0.42, "i", "A"],
      // The precision required for his astronomical and geodetic calculations evidences sustained concentrated technical work.
      deep_focus: [60, 0.42, "i", "N"],
      // The systematic, comparative structure of Kitab al-Hind evidences real advance organizational planning in how the research and text were structured.
      planning_orientation: [58, 0.42, "i", "N"],
      // Sustained scholarly output across political upheaval and multiple changes of patron court suggests real persistence through difficult circumstances.
      persistence: [60, 0.42, "i", "N"],
      // Worked within multiple royal courts' scholarly circles across his career, suggesting real capacity to function within collaborative institutional settings.
      collaboration: [55, 0.4, "i", "N"],
      // Continued sober, even-handed scholarly work under the patronage of Mahmud of Ghazni, whose India campaigns he did not celebrate uncritically in his own writing, a real if modest documented independence from patron expectations.
      risk_tolerance: [55, 0.4, "i", "N"],
      // Kitab al-Hind's comparative-anthropological method, describing Indian religion and science even-handedly and largely from primary Sanskrit sources rather than through a polemical or conversionary lens, was a genuinely novel scholarly approach for its era, documented via the work's own distinctive stated methodology.
      creative_originality: [72, 0.65, "d", "A"],
      // Revised his own earlier astronomical positions across his career as further observation accumulated, documented via the internal development visible across his roughly 146 known works spanning decades.
      belief_updating: [62, 0.46, "s", "A"],
      // His Earth-radius calculation via horizon-dip measurement from a mountain was a direct empirical test of a geometric prediction, evidencing a genuinely experimental orientation toward verifying theoretical claims.
      experimentation: [64, 0.46, "s", "A"],
      // [NEW ROW, NEW_EVIDENCE, this session] The surviving Ibn Sina correspondence documents sustained intellectual disagreement, not a single exchanged pleasantry -- across two rounds of pointed objections, he is recorded as dissatisfied with most of Ibn Sina's replies, continuing to press an independent position against the era's other towering intellect rather than deferring or dropping the matter. A specific, textually-preserved instance of sustained (if purely intellectual, not physical or political) conflict tolerance.
      conflict_tolerance: [62, 0.5, "s", "N"],
    },
  },
  {
    id: "p_amelia_earhart",
    slug: "amelia-earhart",
    canonicalName: "Amelia Earhart",
    birthYear: 1897,
    deathYear: 1937,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["explorer"],
    fieldIds: ["aviation"],
    impactDomains: ["historical", "cultural"],
    tagIds: ["founder", "overcame_adversity"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q3355" },
    portrait: {
      url: "/portraits/amelia-earhart-smithsonian-1937.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (published in the US 1931-1977 without copyright notice)",
      width: 689,
      height: 926,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra,_small_(cropped).jpg",
      attribution: "Underwood & Underwood, 1937 — National Portrait Gallery, Smithsonian Institution",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_earhart_wikipedia", kind: "wikipedia", title: "Amelia Earhart", url: "https://en.wikipedia.org/wiki/Amelia_Earhart" }, { id: "src_earhart_smithsonian", kind: "institution", title: "Smithsonian National Air and Space Museum — Amelia Earhart" }],
    rows: {
      // Undertook multiple long-distance solo and pioneering flights (the 1932 solo transatlantic crossing, the 1935 solo Hawaii-to-California flight) using period aviation technology with well-documented, substantial fatality rates among contemporaries attempting similar routes, culminating in her disappearance during the 1937 round-the-world attempt.
      risk_tolerance: [90, 0.75, "d", "R"],
      // Set a documented, sustained sequence of specific aviation distance/speed/altitude records across roughly a decade, corroborated via the Smithsonian's own record of her flight log and achievements.
      achievement_drive: [82, 0.65, "d", "A"],
      // Pursued a professional aviation career at a time when the field was overwhelmingly closed to women, and co-founded the Ninety-Nines organization to support other women aviators, documented via the organization's own institutional history.
      independent_thinking: [74, 0.58, "d", "A"],
      // Self-initiated and organized her own record-attempt flights, including securing sponsorship and technical support for the 1937 round-the-world attempt, documented via the well-recorded planning history of that flight.
      proactive_agency: [76, 0.6, "d", "A"],
      // Co-founded and served as the first president of the Ninety-Nines, an organization for women pilots that persisted well beyond her own career, documented via the organization's institutional record.
      leadership_drive: [68, 0.52, "d", "A"],
      // Sustained a demanding schedule of flight training, record attempts, and public lecturing/writing to fund her aviation career across roughly a decade.
      discipline: [66, 0.5, "s", "A"],
      // Explicitly and repeatedly framed her flying achievements around expanding opportunities for women in aviation, documented via her own public writing and lectures, rather than personal record-seeking alone.
      impact_motivation: [64, 0.48, "s", "A"],
      // Sustained a substantial public speaking, writing, and media career alongside her flying, documented via her published books and extensive contemporary press coverage.
      social_assertiveness: [68, 0.5, "d", "A"],
      // Period aviation required real, sustained technical and situational adjustment to frequently changing aircraft and weather conditions, though the surviving record documents her achievements more than granular in-flight decision-making.
      adaptability: [58, 0.44, "i", "N"],
      // Continued pursuing increasingly ambitious flights after an earlier failed 1937 round-the-world attempt (a takeoff crash in Hawaii) rather than abandoning the project, documented via the well-recorded timeline of two separate 1937 attempts.
      persistence: [64, 0.46, "s", "A"],
      // Flight navigation and planning at this technological period required real precision, though the surviving public record documents her public achievements and advocacy more thoroughly than her specific technical working methods.
      detail_orientation: [55, 0.42, "i", "N"],
      // The 1937 round-the-world attempt required extensive advance logistical planning (aircraft modification, fuel stops, navigator coordination), documented via the well-recorded preparation history of that flight.
      planning_orientation: [62, 0.46, "s", "A"],
      // Engaged beyond flying itself in writing, public lecturing, and a practical clothing line she designed for active women, documented via her own business ventures and bibliography.
      curiosity: [58, 0.44, "s", "N"],
      // Recognized and seized the 1928 opportunity to be the first woman to cross the Atlantic by air (initially as a passenger), leveraging the resulting publicity into her own independent solo flying career, documented via the well-recorded history of her career's origin.
      opportunity_sensing: [66, 0.5, "d", "A"],
      // Repeatedly pursued being specifically first or fastest on a given route (first woman to fly solo across the Atlantic, first person to solo Hawaii-to-California), documented via the Smithsonian's own framing of her record sequence as deliberately comparative achievements.
      competitiveness: [72, 0.54, "d", "A"],
      // Several of her records were explicitly speed records over a fixed route, documented via the Smithsonian's flight-log data, though the surviving record documents outcomes more than her decision-making pace generally.
      execution_speed: [60, 0.44, "s", "N"],
      // The 1937 attempt required sustained coordination with navigator Fred Noonan and a ground logistics/sponsorship team, documented via the well-recorded planning history, though this reflects necessary operational partnership more than a broader collaborative disposition.
      collaboration: [58, 0.42, "s", "N"],
      // Secured sponsorship, media contracts, and public backing for successive record attempts across her career, documented via the well-recorded commercial and promotional history of her flights.
      persuasiveness: [64, 0.46, "s", "A"],
      // Sustained parallel work across flying, public lecturing, and published writing (her books '20 Hrs., 40 Min.' and 'The Fun of It'), documented via her own bibliography.
      cross_domain_range: [60, 0.44, "d", "A"],
      // Continued pursuing progressively more technically demanding flights (Atlantic solo, then Pacific solo, then round-the-world) across roughly a decade rather than repeating an early success.
      mastery_orientation: [58, 0.42, "s", "N"],
    },
  },
  {
    id: "p_bob_marley",
    slug: "bob-marley",
    canonicalName: "Bob Marley",
    aliases: ["Robert Nesta Marley"],
    birthYear: 1945,
    deathYear: 1981,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["JM"],
    regionCode: "latin_america",
    occupationIds: ["musician", "composer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural", "social", "historical"],
    tagIds: ["innovator", "overcame_adversity"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q409" },
    portrait: {
      url: "/portraits/bob-marley-nyamsterdamnews-1976.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (published in the US 1931-1977 without copyright notice)",
      width: 1200,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bob_Marley_circa_1976_(cropped).jpg",
      attribution: "New York Amsterdam News, August 14, 1976",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_marley_wikipedia", kind: "wikipedia", title: "Bob Marley", url: "https://en.wikipedia.org/wiki/Bob_Marley" }, { id: "src_marley_white", kind: "biography", title: "Timothy White, Catch a Fire: The Life of Bob Marley (1983, rev. ed.) -- the standard biography" }, { id: "src_marley_press", kind: "press", title: "Contemporary press coverage of the December 1976 assassination attempt and the April 1978 One Love Peace Concert" }],
    rows: {
      // RUBRIC_CORRECTION (roster27 fast-batch audit, 2026-09; score-band correction only): continued performing at the December 1976 'Smile Jamaica' peace concert two days after surviving an assassination attempt at his home that wounded him, his wife, and his manager -- a specific, extensively documented act of continuing under direct, recently-realized physical danger. Originally scored 88/documented; corrected to 80 because scoring_rubric_v1 Section 4 reserves the 85+ band for MULTIPLE independent documented instances, and this rationale describes one instance -- a single, if extreme and well-documented, act -- not a repeated pattern. The score is capped to the 71-84 'clear, well-evidenced pattern' band. This is a score-band correction only: the evidence remains squarely documented, and confidence is unchanged -- only the score moved.
      risk_tolerance: [80, 0.62, "d", "R"],
      // RUBRIC_CORRECTION (roster27 fast-batch audit, 2026-09; score-band correction only): continued touring and recording at a demanding pace through 1980 despite a 1977 melanoma diagnosis, documented via the continuity of his performance and recording schedule across this period. Originally scored 85/documented; corrected to 78 because this rests on one continuous multi-year instance (sustained work through illness), not multiple independent instances, per Section 4's 85+ requirement. Score-band correction only: evidenceType and confidence unchanged.
      persistence: [78, 0.6, "d", "A"],
      // At the April 1978 One Love Peace Concert, brought rival Jamaican political leaders Michael Manley and Edward Seaga on stage and joined their hands above his head while performing -- a specific, documented, deliberate act of using his platform for political reconciliation rather than only entertainment.
      impact_motivation: [82, 0.58, "d", "A"],
      // Initially declined recommended amputation of a cancerous toe in 1977 for reasons documented as tied to his religious beliefs, continuing to perform and tour on his own terms until the cancer had spread significantly. Marked dual_edged: a documented instance of personal/religious autonomy asserted against medical advice, with a severe eventual health cost.
      autonomy_need: [70, 0.5, "s", "D"],
      // Credited with a substantial, sustained original songwriting catalogue (Catch a Fire, Natty Dread, Exodus, and others) within roughly a decade of major-label output, documented via the sustained critical and commercial reception of this body of work.
      creative_originality: [85, 0.58, "d", "A"],
      // Sustained a demanding songwriting, recording, and touring schedule across the final decade of his life, including while managing his illness, documented via the continuity and volume of his output in this period.
      discipline: [70, 0.48, "s", "A"],
      // Continued public political commentary and peace-oriented activism in a documented climate of real Jamaican political violence, including the direct attempt on his own life, rather than withdrawing from public political engagement afterward.
      conflict_tolerance: [65, 0.44, "s", "N"],
      // Credited with substantially building global mainstream audience acceptance of reggae as a genre from a Jamaican regional style, documented via the sustained international commercial and critical reception of his catalogue.
      persuasiveness: [78, 0.52, "s", "A"],
      // Directly and publicly orchestrated the reconciliatory handshake moment between Manley and Seaga on stage at the 1978 concert, a specific documented act of direct social intervention rather than passive performance.
      social_assertiveness: [72, 0.48, "s", "N"],
      // Documented to have specifically agreed to perform the 'Smile Jamaica' concert as a deliberate act to ease political violence, a self-initiated act of using his own concert platform for a stated peace purpose.
      proactive_agency: [68, 0.44, "s", "A"],
      // Adapted his musical style and international touring strategy over his career to build a genuinely global (not only Jamaican or diaspora) audience, inferred from the documented breadth of his international commercial reach.
      adaptability: [60, 0.42, "i", "N"],
      // Sustained public commitment to Rastafari beliefs and associated lifestyle practices throughout his career despite these being a minority, sometimes stigmatized position even within Jamaica at the time, documented via the well-established record of his public religious identity.
      independent_thinking: [65, 0.42, "i", "N"],
      // Sustained an ambitious, expanding international touring and recording program across a relatively short career (roughly 1973-1980 as a major-label artist), inferred from the documented pace and scope of his output.
      achievement_drive: [65, 0.42, "i", "N"],
      // Sustained a long-running core creative partnership with his backing band, The Wailers, across most of his recording career, documented via the credited continuity of this collaboration.
      collaboration: [58, 0.4, "i", "N"],
      // Incorporated a range of musical influences (ska, rocksteady, American soul and R&B) into his developing reggae style, inferred from the documented stylistic evolution of his catalogue.
      curiosity: [55, 0.38, "i", "N"],
      // Served as the primary bandleader and creative director of The Wailers across most of his career, documented via the credited structure of the group.
      leadership_drive: [55, 0.38, "i", "N"],
      // Limited direct evidence of personal working method beyond his general songwriting/recording output was identified in the sources reviewed this pass; scored conservatively rather than inflated.
      detail_orientation: [52, 0.36, "i", "N"],
      // Continued developing his songwriting and vocal style across his catalogue's decade-long arc rather than repeating an early formula, inferred from the documented stylistic development of his work.
      mastery_orientation: [58, 0.4, "i", "N"],
    },
  },
  {
    id: "p_hedy_lamarr",
    slug: "hedy-lamarr",
    canonicalName: "Hedy Lamarr",
    birthYear: 1914,
    deathYear: 2000,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["AT", "US"],
    regionCode: "western_europe",
    occupationIds: ["actor", "inventor"],
    fieldIds: ["film", "technology"],
    impactDomains: ["artistic", "technological", "innovation"],
    tagIds: ["career_changer", "late_recognition", "self_taught"],
    archetypeIds: ["cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q49034" },
    portrait: {
      url: "/portraits/hedy-lamarr-extase-1933.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (anonymous author, EU copyright term expired)",
      width: 1036,
      height: 618,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Hedy_Kiesler_1933.jpg",
      attribution: "Still from Extase (Czechoslovakia, 1933), anonymous photographer — Czech National Digital Library",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_lamarr_wikipedia", kind: "wikipedia", title: "Hedy Lamarr", url: "https://en.wikipedia.org/wiki/Hedy_Lamarr" }, { id: "src_lamarr_smithsonian", kind: "institution", title: "Smithsonian Institution — Hedy Lamarr, Golden Age Film Star and Important Inventor" }],
    rows: {
      // Sustained a major Hollywood acting career while independently co-developing a frequency-hopping spread-spectrum communication system with composer George Antheil, patented in 1942 — documented via both her well-established film career and the surviving patent record, genuinely distinct fields pursued simultaneously.
      cross_domain_range: [88, 0.65, "d", "A"],
      // Co-invented a frequency-hopping technique (using a player-piano-inspired mechanism) intended to make torpedo guidance systems resistant to jamming, a genuinely original technical concept that later became foundational to spread-spectrum technology underlying Wi-Fi, GPS, and Bluetooth — documented via the surviving 1942 patent and its acknowledged later technical legacy.
      creative_originality: [82, 0.65, "d", "A"],
      // Pursued self-directed technical invention as a personal hobby alongside her acting career with no formal engineering training, documented via her own described lifelong interest in tinkering and problem-solving.
      curiosity: [74, 0.65, "d", "A"],
      // Developed and patented a working technical invention without formal engineering training, drawing on an unconventional inspiration (a synchronized player-piano mechanism) via collaboration with composer George Antheil, documented via the well-established, specific origin story of the patent.
      resourcefulness: [76, 0.65, "d", "A"],
      // Pursued serious technical invention work as a famous film actress at a time when this combination was virtually unprecedented and not taken seriously by the military patent office that received it, documented via the well-established, initially dismissive reception of her 1942 patent.
      independent_thinking: [70, 0.65, "d", "A"],
      // Self-initiated the frequency-hopping invention project and personally sought out George Antheil as a collaborator, then submitted the patent to the U.S. Navy unprompted, documented via the well-established independent origin of the project during World War II.
      proactive_agency: [68, 0.65, "d", "A"],
      // Fled an abusive first marriage in Austria to rebuild a completely new career in Hollywood, and later moved between acting and independent technical invention across her life, documented via the well-established account of her early career transition.
      adaptability: [66, 0.65, "d", "A"],
      // Sustained both a major film career and independent technical work simultaneously over years, evidencing real ambition across two genuinely demanding, unrelated pursuits.
      achievement_drive: [62, 0.46, "s", "A"],
      // Left an early, reportedly controlling marriage and fled Austria as war approached to rebuild her career and life abroad, documented via the well-established account of this major life decision.
      risk_tolerance: [64, 0.46, "s", "N"],
      // The technical specificity of the frequency-hopping patent's mechanism (synchronized piano-roll-style switching) suggests real careful attention to implementation detail beyond a purely conceptual idea.
      detail_orientation: [58, 0.42, "i", "N"],
      // Worked closely with composer George Antheil to develop the frequency-hopping mechanism, documented via the well-established joint patent record.
      collaboration: [58, 0.42, "i", "N"],
      // Developed the technical invention through iterative conceptual experimentation drawing on an unconventional analogy (player-piano synchronization), suggesting a genuinely exploratory approach to the problem.
      experimentation: [62, 0.44, "s", "A"],
      // Continued pursuing serious technical invention despite the U.S. Navy's initial dismissive reception of her patent, suggesting some real tolerance for institutional skepticism.
      conflict_tolerance: [55, 0.4, "i", "N"],
      // Pursued independent technical invention entirely outside her primary, publicly recognized acting career, suggesting a real independent intellectual life not defined by her public professional identity.
      autonomy_need: [60, 0.44, "s", "A"],
      // Developed the frequency-hopping patent specifically as a wartime contribution intended to help protect Allied torpedo guidance from jamming, documented via the well-established stated purpose behind the invention.
      impact_motivation: [66, 0.48, "s", "A"],
      // Sustained ongoing personal interest in invention and technical problem-solving throughout her life beyond the single well-known patent, per her own later interviews.
      mastery_orientation: [55, 0.4, "i", "N"],
      // The frequency-hopping patent's specific multi-component mechanism required deliberate advance technical design, documented via the surviving patent's own detailed specification.
      planning_orientation: [58, 0.42, "s", "N"],
      // Sustained concentrated technical problem-solving to develop a working invention mechanism alongside a demanding full-time acting schedule, evidencing real sustained effort outside her primary professional commitment.
      deep_focus: [60, 0.44, "s", "A"],
      // Sustained the frequency-hopping invention project to a completed, patented technical result despite having no formal engineering background or institutional support.
      persistence: [60, 0.44, "s", "A"],
      // Sustained a demanding film career while also pursuing independent technical invention work as a parallel, self-directed track over years.
      discipline: [58, 0.42, "i", "N"],
      // Directed her own independent technical project (recruiting Antheil as a specific collaborator) rather than working within an institutional research team, suggesting a modest but real self-directing capacity.
      leadership_drive: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_jean_jacques_rousseau",
    slug: "jean-jacques-rousseau",
    canonicalName: "Jean-Jacques Rousseau",
    birthYear: 1712,
    deathYear: 1778,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["CH"],
    regionCode: "western_europe",
    occupationIds: ["philosopher", "writer"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "cultural", "educational"],
    tagIds: ["nonconformist", "self_taught", "independent"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q6527" },
    portrait: {
      url: "/portraits/jean-jacques-rousseau-latour-1753.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (painted from life, 1753; artist died 1788)",
      width: 988,
      height: 1252,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Maurice_Quentin_de_La_Tour_-_Portrait_of_Jean-Jacques_Rousseau_-_adjusted.jpg",
      attribution: "Maurice Quentin de La Tour, 1753 — Musée d'art et d'histoire de Genève",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_rousseau_wikipedia", kind: "wikipedia", title: "Jean-Jacques Rousseau", url: "https://en.wikipedia.org/wiki/Jean-Jacques_Rousseau" }, { id: "src_rousseau_confessions", kind: "archive", title: "Jean-Jacques Rousseau, Confessions (written 1765-1770, published posthumously 1782/1789)" }, { id: "src_rousseau_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau" }],
    rows: {
      // The Social Contract and Discourse on Inequality directly challenged prevailing Enlightenment assumptions about civilization and progress, arguing society itself corrupts natural human goodness — a documented, sustained, contrarian philosophical position for its era.
      independent_thinking: [86, 0.72, "d", "A"],
      // The Confessions is widely credited by literary and philosophical scholarship as one of the first true modern autobiographies, documented via its recognized place in the history of the genre (Stanford Encyclopedia of Philosophy).
      creative_originality: [84, 0.7, "d", "A"],
      // Emile and The Social Contract were both banned and publicly burned, and Rousseau was forced to flee France and later Switzerland under threat of arrest — a documented, severe, direct consequence of his published positions.
      risk_tolerance: [78, 0.62, "d", "R"],
      // Sustained a public falling-out and prolonged personal dispute with several major Enlightenment contemporaries (including Voltaire and Diderot), documented via their surviving correspondence and public exchanges.
      conflict_tolerance: [74, 0.58, "d", "R"],
      // Largely self-taught across philosophy, music theory (he also composed and wrote on musical theory), and botany later in life — documented breadth of self-directed learning outside any formal education.
      curiosity: [72, 0.55, "d", "A"],
      // Documented, sustained public intellectual disputes with prominent contemporaries evidence real willingness toward direct, public confrontation of ideas.
      social_assertiveness: [68, 0.52, "s", "R"],
      // Real documented output spanning political philosophy, education theory (Emile), autobiography, and music (he composed an opera and wrote a music-theory treatise).
      cross_domain_range: [68, 0.52, "d", "A"],
      // Sustained a prolific, influential body of work across multiple genres despite significant personal instability and periods of poverty, evidencing real ongoing ambition.
      achievement_drive: [60, 0.45, "i", "N"],
      // His systematic philosophical arguments suggest real structural care, though his own documented working style (per the Confessions) is more often described as intense and emotionally driven than methodically precise.
      detail_orientation: [52, 0.42, "i", "N"],
      // Repeatedly relocated across multiple countries in response to persecution and personal instability, a real but circumstance-driven pattern rather than a clearly voluntary adaptive choice.
      adaptability: [58, 0.44, "i", "N"],
      // Primarily documented as defending consistent core philosophical positions across his career despite sustained criticism, rather than revising them — a genuine, moderately low score rather than a forced middle.
      belief_updating: [42, 0.4, "i", "N"],
      // Produced a substantial body of major work despite documented periods of personal instability and financial hardship, though his own account (the Confessions) describes an inconsistent, often disorganized working and living pattern — scored moderately rather than assumed high from output volume alone.
      discipline: [55, 0.42, "i", "N"],
      // The Social Contract's ideas directly and durably influenced subsequent political movements (documented influence on Enlightenment and revolutionary political thought), evidencing real persuasive reach beyond his own lifetime.
      persuasiveness: [66, 0.48, "s", "A"],
      // The Social Contract develops a systematic theory of political legitimacy and the general will, documented via the work's own coherent theoretical structure and its lasting influence on political philosophy.
      systems_abstraction: [70, 0.55, "d", "A"],
      // Emile's staged theory of child development required careful systematic organization across the work's structure, documented via the text's own progressive design.
      planning_orientation: [62, 0.48, "s", "A"],
      // Continued philosophical and literary output despite being formally banned and forced into exile across multiple countries (France, Switzerland) after The Social Contract and Emile were condemned and burned, documented via the well-recorded history of his exile.
      persistence: [76, 0.58, "d", "A"],
      // Wrote the Confessions as an unprecedented, sustained work of psychological self-examination, a genuinely novel literary undertaking documented via the work's own scope and its lasting influence on autobiographical writing.
      deep_focus: [72, 0.55, "d", "A"],
      // Developed distinct major works across political philosophy (The Social Contract), education theory (Emile), and autobiography (Confessions), evidencing genuine range and depth across his career.
      mastery_orientation: [64, 0.48, "s", "A"],
      // Explicitly framed The Social Contract around the public good and the conditions for legitimate government, documented via the work's own stated purpose.
      impact_motivation: [66, 0.5, "s", "A"],
      // Documented to have repeatedly rejected patronage arrangements and conventional employment in favor of independent intellectual work, though this pattern also contributed to his ongoing financial instability.
      autonomy_need: [64, 0.46, "i", "N"],
    },
  },
  {
    id: "p_jorge_luis_borges",
    slug: "jorge-luis-borges",
    canonicalName: "Jorge Luis Borges",
    birthYear: 1899,
    deathYear: 1986,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["AR"],
    regionCode: "latin_america",
    occupationIds: ["writer", "poet"],
    fieldIds: ["literature", "philosophy"],
    impactDomains: ["cultural", "literary", "historical"],
    tagIds: ["polymath", "innovator", "prolific"],
    archetypeIds: ["independent_creator", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q909" },
    portrait: {
      url: "/portraits/jorge-luis-borges-stern-1951.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in Argentina (photograph copyright expired, Law 11.723) and in the US",
      width: 1192,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Jorge_Luis_Borges_1951,_by_Grete_Stern_(full).jpg",
      attribution: "Photograph by Grete Stern, 1951",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_borges_wikipedia", kind: "wikipedia", title: "Jorge Luis Borges", url: "https://en.wikipedia.org/wiki/Jorge_Luis_Borges" }, { id: "src_borges_paris_review", kind: "archive", title: "The Art of Fiction No. 39 (Paris Review, 1966) -- interview conducted at his National Library office documenting his daily dictation/revision routine", url: "https://www.theparisreview.org/interviews/4331/the-art-of-fiction-no-39-jorge-luis-borges" }, { id: "src_borges_infobae_dictadura", kind: "press", title: "Infobae -- \"Borges y la dictadura: del almuerzo con Videla a la reunion con las Madres y la condena a los militares\" (2019), documenting the dated 1976-1985 political-reversal sequence", url: "https://www.infobae.com/sociedad/2019/07/13/borges-y-la-dictadura-del-almuerzo-con-videla-a-la-reunion-con-las-madres-y-la-condena-a-los-militares-en-tiempos-de-sangre-y-plomo/" }, { id: "src_borges_biography", kind: "biography", title: "Biographical accounts of his 1938 accident/recovery, his Miguel Cane and National Library library work, and his collaboration with Adolfo Bioy Casares" }],
    rows: {
      // Three independently dated, documented instances of holding or reversing a position against strong institutional/social pressure: refused a direct police order to display Peron's portrait at the writers' society he led (1952), which led to the society's forced closure and his own surveillance; resigned the National Library directorship the instant Peron returned to power (1973); and, after initially praising the 1976 military junta, publicly repudiated that position after the 1983 democratic elections, writing that democracy had "refuted me splendidly" (Infobae, 2019, citing his own published letter).
      independent_thinking: [88, 0.85, "d", "A"],
      // A fully dated, multi-step, independently corroborated political reversal: praised dictator Videla as "quite a gentleman" at a May 1976 lunch and similarly praised Pinochet months later; declined a second Pinochet invitation in 1977 after learning his public image was being used for propaganda; signed a public solidarity petition in August 1980 after two Mothers of the Plaza de Mayo visited his home and described their experiences directly; publicly retracted his earlier position after the October 1983 elections; and attended the 1985 Trial of the Juntas in person, later writing that the military had replaced the civil code with "kidnapping, torture, and clandestine execution" (Infobae, 2019).
      belief_updating: [85, 0.85, "d", "A"],
      // Two independent documented facts: catalogued more than 100 books per day at the Miguel Cane Municipal Library, fast enough to leave little remaining work for other staff (Wikipedia, citing biographical sources on his 1938-1946 library employment); and maintained a sustained daily dictation-and-revision ritual at the National Library, documented directly by an interviewer present in his office (Paris Review, 1966).
      discipline: [76, 0.68, "d", "A"],
      // Two independent documented facts: revised each poem through two to four full retyped drafts before expressing satisfaction, observed directly by a Paris Review interviewer in his working office (1966); and later attempted to purchase and destroy all known copies of his own early published pamphlets once he judged them unsatisfactory (Wikipedia).
      perfectionism: [74, 0.65, "d", "A"],
      // Continued producing major new work -- including a documented shift into the stylistic direction that produced "Pierre Menard, Author of the Quixote" -- after nearly dying from a severe head injury and subsequent sepsis on Christmas Eve 1938, then sustained a prolific literary career for roughly three more decades after becoming completely blind by the late 1950s, never learning Braille and requiring dictation for every subsequent work (Wikipedia).
      persistence: [76, 0.65, "d", "A"],
      // Documented, specific restructuring of his entire working method after total blindness: shifted toward poetry, whose meter and compactness were easier to hold in memory than prose; dictated letters and poems to an assistant who read them back for revision; and relied on an assistant/secretary as reader rather than reading directly (Wikipedia; corroborated by the Paris Review interviewer's first-hand description of this exact working method in 1966).
      adaptability: [74, 0.65, "d", "A"],
      // Two independent, long-duration documented collaborative relationships: a five-decade joint-pseudonym literary partnership with Adolfo Bioy Casares (from 1932) producing detective fiction, screenplays, and fantastic-literature anthologies under the name "H. Bustos Domecq"; and a separate, deliberate five-year translation collaboration with Norman Thomas di Giovanni (from 1967) specifically undertaken to reach English-language readers (Wikipedia).
      collaboration: [72, 0.62, "d", "A"],
      // A repeated pattern across three separate decades of walking away from institutional position rather than compromising: resigned immediately rather than accept a punitive "promotion" to poultry-and-rabbit inspector under Peron (1946); refused a direct police order under active surveillance (1952); and resigned the National Library directorship the moment Peron returned to power (1973) (Wikipedia).
      autonomy_need: [74, 0.65, "d", "A"],
      // Sustained major documented output across poetry, short fiction, literary essay, and two-way literary translation, plus public lecturing (the Charles Eliot Norton Lectures at Harvard, 1967), built on a self-taught command of French and German acquired as a teenager in Geneva specifically to access philosophy in the original language, on top of a bilingual Spanish/English upbringing -- inferred as genuine cross-domain range from the convergence of these independently documented facts, not a single dominant mode repeated.
      cross_domain_range: [72, 0.58, "s", "A"],
      // Repeatedly built fabricated scholarly apparatus -- invented authors, fictional taxonomies ("The Analytical Language of John Wilkins"), and forged "translations" of nonexistent source texts -- as a structural device across multiple distinct works spanning more than two decades, beginning with A Universal History of Infamy (1935), inferred as a genuine, repeated methodological signature from this documented recurrence across many separate works rather than a single story's device.
      systems_abstraction: [78, 0.6, "s", "A"],
      // Originated a narrative device with no direct precedent in prior literature -- fictional criticism and review of nonexistent books, most famously "Pierre Menard, Author of the Quixote" (1939) -- documented via its well-corroborated critical reception and its continued citation as a foundational, widely imitated innovation in later 20th-century fiction.
      creative_originality: [82, 0.7, "d", "A"],
      // Repeatedly built entire stories around embracing unresolved paradox and infinite regress as subject matter itself, not merely as form -- e.g. "The Library of Babel" and "The Garden of Forking Paths" -- inferred as genuine comfort with irreducible ambiguity from this documented, recurring thematic choice across dozens of distinct works spanning decades, rather than a single work's device.
      ambiguity_tolerance: [76, 0.58, "s", "A"],
      // Sustained major-scale creative output across roughly five decades despite total blindness for the final third of his career, converging with external institutional validation across independent bodies -- the inaugural 1961 International Formentor Prize (shared with Samuel Beckett), the 1967 Norton Lectures at Harvard, and a 1964 British honorary knighthood -- inferred as sustained high achievement drive from this documented convergence rather than from fame alone.
      achievement_drive: [74, 0.55, "s", "A"],
      // Both his 1946 and 1973 institutional resignations are specifically documented as immediate, not deliberated-over acts, inferred as a real tendency toward rapid, direct decision-making at clear choice points from this documented pattern -- treated cautiously since these same underlying episodes are the primary basis for the autonomy_need row above, so this row is scored conservatively rather than at the same confidence.
      decisiveness: [66, 0.42, "i", "A"],
      // Publicly defied a direct order from an authoritarian government while under active police surveillance (1952), at real professional and personal cost (the closure of the organization he led) -- a single clearly documented instance, scored cautiously per this project's standard for single-fact evidence rather than treated as an extreme or defining trait.
      risk_tolerance: [60, 0.4, "i", "R"],
      // When left without steady employment and with his eyesight failing simultaneously in the mid-1940s, began a new public-lecturing career as an alternate way to sustain himself as a writer, a single documented instance of recognizing and acting on a new avenue under constraint (Wikipedia), scored cautiously as a single-fact case.
      opportunity_sensing: [62, 0.42, "i", "N"],
    },
  },
  {
    id: "p_ken_saro_wiwa",
    slug: "ken-saro-wiwa",
    canonicalName: "Ken Saro-Wiwa",
    birthYear: 1941,
    deathYear: 1995,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["NG"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["writer", "activist", "environmentalist"],
    fieldIds: ["literature", "civil_rights", "environmental_science"],
    impactDomains: ["literary", "social", "historical"],
    tagIds: ["endured_imprisonment", "advocate"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q316292" },
    portrait: {
      url: "/portraits/ken-saro-wiwa-memorial-sculpture.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 2.0 (Flickr-reviewed)",
      width: 1600,
      height: 1376,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bus_Memorial_to_Ken_Saro-Wiwa_(5927206987).jpg",
      attribution: "Photograph by Alan Stanton, 2011, of Sokari Douglas-Camp's 'Bus Memorial to Ken Saro-Wiwa' sculpture, Bernie Grant Arts Centre, Tottenham",
      kind: "editorial_nonlikeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ksw_detention_diary", kind: "archive", title: "Ken Saro-Wiwa, A Month and a Day: A Detention Diary (1995) — his own account of an earlier detention period" }, { id: "src_ksw_sozaboy", kind: "archive", title: "Ken Saro-Wiwa, Sozaboy (1985) — his own novel, evidence of sustained literary output before his activism career" }, { id: "src_ksw_mosop", kind: "institution", title: "Movement for the Survival of the Ogoni People (MOSOP) founding documents and the Ogoni Bill of Rights (1990)" }, { id: "src_ksw_press", kind: "press", title: "International press and human rights organization coverage (including Amnesty International) of the January 1993 Ogoni demonstration, his 1995 trial, and execution" }, { id: "src_ksw_wikipedia", kind: "wikipedia", title: "Ken Saro-Wiwa", url: "https://en.wikipedia.org/wiki/Ken_Saro-Wiwa" }],
    rows: {
      // Founded MOSOP specifically to campaign for Ogoni environmental and political rights and sustained that campaign for its final five years despite escalating personal danger; his documented final words before execution affirmed continued commitment to "the struggle."
      impact_motivation: [82, 0.7, "d", "A"],
      // Continued organizing and leading MOSOP through multiple documented arrests and escalating government pressure, up to and through a widely-regarded-as-politically-motivated trial and his 1995 execution — multiple independent documented instances across five years, meeting this rubric's top confidence band.
      risk_tolerance: [85, 0.72, "d", "R"],
      // Sustained the Ogoni rights campaign from MOSOP's 1990 founding through repeated arrests and escalating government crackdowns until his 1995 execution, without abandoning the movement.
      persistence: [78, 0.65, "d", "A"],
      // Personally founded MOSOP and organized the January 1993 mass demonstration — both self-initiated undertakings, not actions assigned or requested by any outside body.
      proactive_agency: [76, 0.62, "d", "A"],
      // Organized and mobilized an estimated 300,000 people to a single peaceful demonstration in January 1993 — a specific, extremely well-documented mass-mobilization outcome, not inferred from general reputation.
      persuasiveness: [78, 0.65, "d", "A"],
      // Sustained direct, simultaneous confrontation with both the Nigerian military government and Shell Oil, a powerful multinational corporation, across a documented multi-year campaign.
      conflict_tolerance: [76, 0.62, "d", "R"],
      // Built a successful career as a published novelist and as creator/producer of the popular Nigerian television series Basi and Company before turning to activism — genuine, documented achievement in a distinct domain preceding his political career.
      cross_domain_range: [74, 0.62, "d", "A"],
      // Founded and led MOSOP as its central organizing figure from 1990 to his 1995 execution, a documented, sustained organizational leadership role.
      leadership_drive: [68, 0.55, "d", "A"],
      // Continued organizing under an increasingly dangerous, uncertain political climate for years, evidenced by the documented escalation of government crackdowns across that period without the campaign stopping.
      ambiguity_tolerance: [62, 0.48, "s", "A"],
      // The decision to organize the January 1993 mass demonstration was a specific, dated, high-stakes organizational choice with foreseeable government retaliation.
      decisiveness: [65, 0.52, "d", "A"],
      // Sustained a successful literary and television production career, evidenced by published, credited work, before shifting focus to full-time activism.
      mastery_orientation: [65, 0.52, "d", "A"],
      // Framed Ogoni rights specifically around environmental damage and corporate accountability alongside indigenous political rights, a framing that was comparatively uncommon in Nigerian activist discourse of the period.
      independent_thinking: [60, 0.45, "s", "A"],
      // Sustained a productive writing and television-production career while simultaneously building and leading a political movement, evidenced by the documented dual output across those years.
      discipline: [62, 0.48, "s", "A"],
      // Sustained pursuit of recognition and success across literary, television, and activist domains, evidenced by the documented range of accomplishment rather than a single stated ambition.
      achievement_drive: [60, 0.45, "s", "A"],
      // Sustained direct, public confrontation of both government and corporate power through organizing and public statements rather than working only through quieter channels.
      social_assertiveness: [68, 0.55, "d", "A"],
      // Organizing a demonstration of an estimated 300,000 people required real, sustained logistical and organizational planning, inferred from that documented scale.
      planning_orientation: [65, 0.48, "s", "A"],
      // Building MOSOP as a coalition required working with Ogoni traditional and community leaders, but the surviving record documents the movement's outcomes more than his specific collaborative process, hence inference-level.
      collaboration: [58, 0.35, "i", "N"],
      // Transitioned from a successful entertainment and business career to full-time political activism in his later years, a documented life-stage shift, though the specific adaptive process is inferred rather than directly recorded.
      adaptability: [60, 0.35, "i", "N"],
    },
  },
  {
    id: "p_lu_xun",
    slug: "lu-xun",
    canonicalName: "Lu Xun",
    birthYear: 1881,
    deathYear: 1936,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CN"],
    regionCode: "east_asia",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["career_changer", "nonconformist"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q23114" },
    portrait: {
      url: "/portraits/lu-xun-1930.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in China (photographic work, copyright term expired)",
      width: 1199,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:LuXun1930.jpg",
      attribution: "Unknown photographer, 1930, Shanghai",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_lx_diary_madman", kind: "archive", title: "Lu Xun, \"Diary of a Madman\" (1918) and \"The True Story of Ah Q\" (1921-22) — his own major fiction" }, { id: "src_lx_zawen", kind: "archive", title: "Lu Xun's own extensive personal essays (zawen) and letters, including his account of the slide-show episode that led him to abandon medicine for literature" }, { id: "src_lx_biography", kind: "biography", title: "Julia Lovell's translations and critical introductions to Lu Xun's collected fiction, drawing on his correspondence" }, { id: "src_lx_wikipedia", kind: "wikipedia", title: "Lu Xun", url: "https://en.wikipedia.org/wiki/Lu_Xun" }],
    rows: {
      // In his own account, abandoned medical training in Japan after witnessing a slide show depicting a Chinese man about to be executed as a spy while Chinese onlookers watched apathetically — he concluded that curing his countrymen's "spiritual" apathy mattered more than curing physical ailments, a specific, self-reported, well-documented turning point.
      impact_motivation: [78, 0.65, "d", "A"],
      // Self-initiated a complete career change from medicine to literature based on his own philosophical conclusion, not external pressure or circumstance.
      proactive_agency: [74, 0.62, "d", "A"],
      // Developed a distinct, sometimes controversial critical stance on Chinese culture and tradition, embodied in the character Ah Q as satire of national character — a documented, original literary and social critique, not an inherited position.
      independent_thinking: [72, 0.6, "d", "A"],
      // Sustained numerous, well-documented public literary and political feuds with contemporaries throughout his career, evidenced by his own polemical essays and others' accounts.
      conflict_tolerance: [68, 0.55, "d", "R"],
      // Completed medical training in Japan before switching fields, then developed genuine, historically significant literary mastery — Diary of a Madman is documented as the first major work of modern vernacular Chinese literature.
      mastery_orientation: [70, 0.58, "d", "A"],
      // Diary of a Madman is documented and historically verified as the first major work of modern vernacular Chinese literature, a specific, objectively assessable originality claim.
      creative_originality: [78, 0.65, "d", "A"],
      // Maintained a documented, prolific writing schedule despite chronic tuberculosis in his later years, sustaining output until close to his death.
      discipline: [70, 0.58, "d", "A"],
      // Sustained direct public confrontation with rival intellectual and political figures through published polemical essays, a documented, consistent pattern across his career.
      social_assertiveness: [68, 0.55, "d", "A"],
      // Specifically declined informal Nobel Prize consideration, stating that no Chinese writer of the time — including himself — deserved it yet, a documented act of independent, self-critical judgment against the pull of prestige.
      autonomy_need: [65, 0.55, "d", "A"],
      // Sustained prolific output across multiple genres — fiction, essays, and translation — over a career cut short by illness, a documented, sustained pattern of production.
      achievement_drive: [62, 0.5, "d", "A"],
      // Studied medicine, then shifted to literature, and extensively translated foreign literary works into Chinese — a documented, genuinely broad intellectual engagement across distinct fields.
      curiosity: [65, 0.52, "d", "A"],
      // Functioned with real documented output as a trained physician, a fiction writer, an essayist, and a translator — four genuinely distinct domains, not superficial involvement.
      cross_domain_range: [65, 0.52, "d", "A"],
      // Sustained a demanding literary and critical career despite chronic illness through the final years of his life, documented by his continued publication until close to his death.
      persistence: [62, 0.5, "d", "A"],
      // Sustained public criticism of powerful political and cultural figures within the volatile political climate of Republican China, inferred as carrying real personal danger given that context.
      risk_tolerance: [60, 0.45, "s", "R"],
      // Became a documented central intellectual influence on the League of Left-Wing Writers, though the record shows him functioning more as an influential figure than a formal organizational leader, hence a modest, inference-level score.
      leadership_drive: [55, 0.4, "i", "N"],
      // His essays had extensive, well-documented influence on a generation of Chinese writers and political thought, inferred from that documented reach rather than a single persuasive episode.
      persuasiveness: [65, 0.48, "s", "A"],
      // The career switch from medicine to literature followed directly and swiftly from the slide-show episode, a specific, documented, decisive turning point rather than a gradual drift.
      decisiveness: [65, 0.52, "d", "A"],
      // Supported and was associated with the League of Left-Wing Writers alongside other literary figures, but the surviving record documents the League's activity more than his specific collaborative process, hence inference-level.
      collaboration: [55, 0.35, "i", "N"],
    },
  },
  {
    id: "p_marie_tharp",
    slug: "marie-tharp",
    canonicalName: "Marie Tharp",
    birthYear: 1920,
    deathYear: 2006,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["scientist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "historical"],
    tagIds: ["founder", "late_recognition", "detail_oriented"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q538786" },
    portrait: {
      url: "/portraits/marie-tharp-aip-1968.jpg",
      source: "Wikimedia Commons",
      license: "CC0 1.0 Universal Public Domain Dedication",
      width: 1561,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bruce_Heezen_and_Marie_Tharp_working_with_fathometer_record.jpg",
      attribution: "AIP Emilio Segrè Visual Archives, Gift of Bill Woodward, USNS Kane Collection, 1968",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_tharp_wikipedia", kind: "wikipedia", title: "Marie Tharp", url: "https://en.wikipedia.org/wiki/Marie_Tharp" }, { id: "src_tharp_britannica", kind: "institution", title: "Britannica — Marie Tharp" }],
    rows: {
      // RUBRIC_CORRECTION (roster27 fast-batch audit, 2026-09; score-band correction only): hand-plotted tens of thousands of individual sonar depth soundings into detailed physiographic maps of the ocean floor over years, documented via the well-established scale and precision of her mapping work with Bruce Heezen. Originally scored 90/documented; corrected to 80 because this describes one continuous multi-year cartographic project, not multiple independent instances, per Section 4's 85+ requirement. Score-band correction only: evidenceType and confidence unchanged.
      detail_orientation: [80, 0.68, "d", "A"],
      // Identified a rift valley running down the center of the Mid-Atlantic Ridge from her own map data and proposed this as direct evidence for continental drift/seafloor spreading — a theory her own research partner initially dismissed as 'girl talk' before independently corroborating evidence proved her correct, documented via the well-established history of this specific scientific dispute.
      independent_thinking: [84, 0.65, "d", "A"],
      // Correctly cross-referenced separate depth-profile and earthquake-epicenter datasets to confirm the rift valley's location and significance, documented via the well-established methodological account of her verification process.
      analytical_rigor: [82, 0.65, "d", "A"],
      // Continued advocating for and refining her seafloor-spreading interpretation despite initial dismissal from her own research collaborator and the wider geological community, documented via the well-established multi-year timeline before the theory gained acceptance.
      persistence: [76, 0.65, "d", "A"],
      // Was barred by US Navy regulations from joining the research ships collecting the sonar data she analyzed (women were excluded from the vessels at the time), and instead built her groundbreaking maps entirely from data relayed to her onshore, a specific, well-documented instance of major scientific achievement despite direct institutional exclusion.
      resourcefulness: [68, 0.65, "d", "A"],
      // Proposed an interpretation (continental drift via seafloor spreading) that directly contradicted the geological establishment's dominant view at the time, carrying real professional risk to advance, documented via the well-established scientific controversy her interpretation initially provoked.
      risk_tolerance: [62, 0.46, "s", "N"],
      // Sustained the painstaking, detailed cartographic work of hand-plotting ocean-floor topography across decades, documented via the well-established scale of her total mapping output over her career.
      discipline: [72, 0.65, "d", "A"],
      // Continued the systematic global ocean-floor mapping project across decades, ultimately co-producing the first comprehensive world ocean-floor map, evidencing sustained long-term ambition.
      achievement_drive: [68, 0.5, "s", "A"],
      // The hand-plotting of tens of thousands of individual data points into coherent physiographic maps required sustained, exacting concentrated work over extended periods, documented via the well-established scope of her cartographic technique.
      deep_focus: [74, 0.65, "d", "A"],
      // Synthesized disparate depth-sounding and seismic datasets into one coherent structural interpretation of global plate tectonics, documented via the well-established scientific significance of her rift-valley identification.
      systems_abstraction: [66, 0.48, "s", "A"],
      // Sustained her scientific interpretation despite direct initial dismissal from her own close research collaborator, documented via the well-established account of that specific professional disagreement.
      conflict_tolerance: [60, 0.44, "s", "N"],
      // Continued refining her cartographic technique and geological interpretation across decades, culminating in the comprehensive World Ocean Floor Panorama map late in her career.
      mastery_orientation: [62, 0.44, "s", "A"],
      // Continued developing and defending her own scientific interpretation of the data despite her research partner's initial rejection, suggesting real confidence in her own independent analysis.
      autonomy_need: [58, 0.42, "i", "N"],
      // Sustained investigation of the ocean floor's structure across her career, moving from initial mapping to broader theoretical interpretation about Earth's geological processes.
      curiosity: [60, 0.44, "s", "A"],
      // Sustained a decades-long working research partnership with Bruce Heezen despite their initial major disagreement, documented via the well-established, extensive joint body of work they produced together.
      collaboration: [62, 0.65, "d", "A"],
      // Her sustained work building comprehensive, publicly usable ocean-floor maps rather than narrower proprietary data suggests real orientation toward broadly useful scientific contribution.
      impact_motivation: [58, 0.42, "i", "N"],
      // Systematically organizing tens of thousands of individual data points into a coherent, navigable map series evidences real advance organizational planning in how the cartographic project was structured.
      planning_orientation: [58, 0.42, "i", "N"],
      // Worked around a real institutional barrier (exclusion from research vessels) by developing an effective onshore data-analysis role instead, suggesting real flexibility in adapting her working method to actual constraints.
      adaptability: [56, 0.4, "i", "N"],
      // Directed the detailed cartographic mapping methodology for the joint project with Bruce Heezen, suggesting some real technical direction-setting within their partnership.
      leadership_drive: [52, 0.4, "i", "N"],
      // Her specific technique of cross-referencing depth-profile and earthquake data to reveal the mid-ocean rift valley was a genuinely original analytical approach, documented via its foundational role in confirming plate tectonics.
      creative_originality: [74, 0.65, "d", "A"],
    },
  },
  {
    id: "p_norman_borlaug",
    slug: "norman-borlaug",
    canonicalName: "Norman Borlaug",
    birthYear: 1914,
    deathYear: 2009,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["scientist", "agronomist"],
    fieldIds: ["natural_science", "agriculture"],
    impactDomains: ["scientific", "social"],
    tagIds: ["nobel_laureate", "prolific"],
    archetypeIds: ["scientific_explorer", "entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q154824" },
    portrait: {
      url: "/portraits/norman-borlaug-usaid-2004.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (US federal government work — USAID official photograph)",
      width: 571,
      height: 809,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Norman_Borlaug,_2004_(cropped).jpg",
      attribution: "Photograph by Ben Zinner, USAID, 2004",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_nb_wikipedia", kind: "wikipedia", title: "Norman Borlaug", url: "https://en.wikipedia.org/wiki/Norman_Borlaug" }, { id: "src_nb_nas_memoir", kind: "biography", title: "Ronald L. Phillips, \"Norman E. Borlaug 1914-2009\" -- National Academy of Sciences Biographical Memoir (2013)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/borlaug-norman.pdf" }, { id: "src_nb_encyclopedia", kind: "biography", title: "\"Norman Ernest Borlaug\" -- Encyclopedia.com", url: "https://www.encyclopedia.com/people/science-and-technology/agriculture-biographies/norman-ernest-borlaug" }],
    rows: {
      // RUBRIC_CORRECTION (roster27 fast-batch audit, 2026-09; score-band correction only): Phillips's NAS memoir documents Borlaug persisting with the 'shuttle breeding' technique across two Mexican sites despite colleagues believing the approach could not work, because it let him double breeding cycles per year -- a specific, dated methodological persistence that paid off unexpectedly (discovery of daylength insensitivity). Originally scored 90/documented; corrected to 80 because this rests on one continuous methodological choice, not multiple independent instances, per Section 4's 85+ requirement. Score-band correction only: evidenceType and confidence unchanged.
      persistence: [80, 0.68, "d", "A"],
      // RUBRIC_CORRECTION (roster27 fast-batch audit, 2026-09; score-band correction only): documented working the field from before daylight until after dusk breeding thousands of wheat lines (NAS memoir, direct quote from a colleague who worked with him at Minnesota), sustained across decades, corroborated by the encyclopedia's account of the shuttle-breeding program reducing development time from a decade to five years. Originally scored 92/documented; corrected to 80 because this describes one continuous work pattern (corroborated by two sources describing the same pattern, not separate instances), per Section 4's 85+ requirement for multiple independent instances. Score-band correction only: evidenceType and confidence unchanged.
      achievement_drive: [80, 0.65, "d", "A"],
      // Directly quoted response to environmentalist critics in the encyclopedia entry: 'Many of them are elitists. They've never experienced the physical sensation of hunger...If they lived just one month amid the misery of the developing world...they'd be crying out for tractors and fertilizer' -- a specific, sustained, public confrontation with a real and organized opposing camp, not a vague reputation for bluntness.
      conflict_tolerance: [72, 0.55, "d", "A"],
      // NAS memoir documents Borlaug personally intervening when a wheat shipment to Pakistan was stalled by trucks caught in the Watts riots en route to the Los Angeles port, requiring 'several imaginative steps' to get the wheat onto ships -- a specific, dated, resourceful act under real logistical crisis.
      resourcefulness: [78, 0.52, "d", "A"],
      // Directly quoted Nobel lecture text in the NAS memoir ('There can be no permanent progress in the battle against hunger until...') and his own mural inscription ('I cannot live comfortably in the midst of abject hunger') -- explicit, sourced statements of motivation tied to a lifetime of matching action.
      impact_motivation: [88, 0.58, "d", "A"],
      // Documented training of hundreds of 'hunger fighters' -- students personally recruited and directed toward making thousands of wheat crosses -- and, at age 91, personally threatening to sever ties with CIMMYT unless it acted faster on Kenyan stem rust, which produced results (NAS memoir).
      leadership_drive: [70, 0.5, "d", "A"],
      // Inferred from his sustained pursuit of the unconventional shuttle-breeding method against contemporaries' belief it could not work, though the memoir frames this more as methodological confidence than personal risk-taking.
      risk_tolerance: [55, 0.42, "s", "N"],
      // Inferred from the systematic, multi-decade wheat-breeding program structure described in the NAS memoir, though the memoir emphasizes field persistence over documented planning process specifically.
      planning_orientation: [50, 0.4, "i", "N"],
      // Documented working roughly half the year at the Ciudad Obregon experiment station and the other half near Mexico City for decades, to the point his wife told a colleague he 'had been home for only four' of their sixty married years (NAS memoir, direct quote) -- a sustained, dated pattern with a real personal cost the memoir does not hide.
      discipline: [82, 0.55, "d", "A"],
      // Inferred from his documented preference for field work and results over administrative reporting, including the quoted remark 'Do you want paper, or wheat?' (NAS memoir).
      autonomy_need: [60, 0.42, "i", "N"],
      // Inferred from producing at least 40 documented wheat varieties over four decades (NAS memoir Table 1) and continuing to personally direct rust-resistance research into his 90s.
      mastery_orientation: [75, 0.5, "s", "A"],
      // Documented personally lobbying government leaders in multiple countries to adopt his wheat varieties despite bureaucratic resistance, and personally lobbying the Nobel Foundation (unsuccessfully) to create an agriculture prize, which led him to found the World Food Prize instead (NAS memoir).
      social_assertiveness: [68, 0.45, "d", "A"],
      // Documented pivot from a DuPont bactericide research role to wartime adhesive research after Pearl Harbor, and his later documented shift from initial skepticism of biotechnology to full advocacy for it once he saw its applications (NAS memoir, named source: Chris Doswell).
      adaptability: [62, 0.45, "d", "A"],
      // Inferred from his sustained cross-disciplinary work spanning plant pathology, genetics, and international policy, though neither source documents a specific curiosity-driven incident.
      curiosity: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_rosa_parks",
    slug: "rosa-parks",
    canonicalName: "Rosa Parks",
    birthYear: 1913,
    deathYear: 2005,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_activist"],
    fieldIds: ["social_reform"],
    impactDomains: ["social", "historical"],
    tagIds: ["overcame_adversity", "grassroots_organizer"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q41921" },
    portrait: {
      url: "/portraits/rosa-parks-loc-1956.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (published in the US 1931-1963, copyright not renewed)",
      width: 1056,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Rosa_Parks,_November_1956_(cropped).jpg",
      attribution: "Rosa Parks papers, Library of Congress, November 1956",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_parks_wikipedia", kind: "wikipedia", title: "Rosa Parks", url: "https://en.wikipedia.org/wiki/Rosa_Parks" }, { id: "src_parks_autobiography", kind: "archive", title: "Rosa Parks with Jim Haskins, Rosa Parks: My Story (1992)" }, { id: "src_parks_womenshistory", kind: "institution", title: "National Women's History Museum -- Biography: Rosa Parks", url: "https://www.womenshistory.org/education-resources/biographies/rosa-parks" }],
    rows: {
      // Refused to give up her bus seat to a white passenger in segregated Montgomery, Alabama in 1955, resulting in her arrest, a specific, extensively documented act carrying real, realized personal legal and social risk.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Sustained direct confrontation with the segregated bus system and the resulting public and legal consequences of her arrest, documented via the well-established account of the incident and its aftermath, including job loss and death threats that followed.
      conflict_tolerance: [70, 0.65, "d", "R"],
      // Served for over a decade as secretary of the Montgomery NAACP chapter before her 1955 arrest, sustained documented civil-rights organizing work well before the bus incident that made her nationally known, per her own autobiography.
      discipline: [68, 0.65, "d", "A"],
      // Continued civil-rights activism for decades after 1955, including co-founding the Rosa and Raymond Parks Institute for Self Development in 1987, documented via the well-established extended timeline of her later activism.
      persistence: [68, 0.65, "d", "A"],
      // Sustained decades of civil-rights organizing work both before and after the 1955 arrest that made her nationally known, documented via her own autobiography's account of her long involvement with the NAACP.
      impact_motivation: [72, 0.65, "d", "A"],
      // Her own autobiography documents that her refusal was a considered decision in the moment rather than physical exhaustion (the popularized 'tired feet' narrative), stating she was 'tired of giving in' — a specific, directly self-documented account of deliberate action.
      proactive_agency: [62, 0.65, "d", "A"],
      // Undertaking sensitive, personally dangerous investigative work (the Recy Taylor case) in the Jim Crow South as an individual NAACP representative required real personal self-direction, though the surviving record documents the investigation's occurrence more thoroughly than her specific individual working style within it.
      autonomy_need: [58, 0.5, "s", "N"],
      // Sustained a decades-long commitment to civil-rights organizing work, both in a formal secretarial/organizational capacity and later through her own institute, suggesting real sustained purpose beyond the single well-known incident.
      achievement_drive: [55, 0.4, "i", "N"],
      // Served in an organizational, behind-the-scenes secretarial role for the Montgomery NAACP for years before the 1955 incident, suggesting a genuinely more understated, less publicly assertive working style than the historical prominence she later gained, distinct from more overtly public-speaking-oriented contemporaries.
      social_assertiveness: [52, 0.4, "i", "N"],
      // Served for fourteen years (1943-1957) as secretary to NAACP Montgomery chapter president E.D. Nixon and as the chapter's youth leader, sustained institutional civil-rights work within an organization well before the 1955 bus incident, documented in her own autobiography (Rosa Parks: My Story, 1992) and NAACP records.
      collaboration: [58, 0.65, "d", "N"],
      // Personally conducted the NAACP's investigation into the gang rape of Recy Taylor in 1944, a specific, documented fact-finding investigation into a violent crime (extensively covered in civil-rights historiography, e.g. Danielle McGuire's At the Dark End of the Street), distinct from her later, better-known activism.
      detail_orientation: [55, 0.65, "d", "N"],
      // Served as youth leader of the NAACP Montgomery chapter for over a decade before the bus boycott, a specific, documented role directly leading younger organizers, distinct from and prior to the fame that followed her own 1955 arrest.
      leadership_drive: [55, 0.65, "d", "N"],
      // Her considered refusal to comply with segregation on that specific day, distinct from a spontaneous emotional reaction, reflects a real independent judgment against the era's dominant social norm, documented via her own autobiographical account.
      independent_thinking: [62, 0.44, "s", "A"],
      // Her documented fourteen-year progression from general NAACP membership to chapter secretary and youth leader suggests sustained development of organizational/institutional skill over time, though this is an inference from role progression rather than a single squarely on-point documented instance.
      mastery_orientation: [52, 0.48, "s", "N"],
      // Continued her activism after relocating from Montgomery to Detroit following the loss of employment and continued threats, adjusting her platform and approach across this major life disruption.
      adaptability: [55, 0.4, "i", "N"],
      // Rebuilt her career and continued activism in Detroit after losing her Montgomery employment and facing sustained threats, suggesting real capacity to continue under significant material and personal disruption.
      resourcefulness: [55, 0.4, "i", "N"],
      // Her sustained, decades-long engagement with organizing work across changing civil-rights strategies and later self-development education work suggests some real ongoing interest beyond a single fixed role.
      curiosity: [48, 0.4, "i", "N"],
      // Her sustained NAACP secretarial work over a decade required organizing meetings, records, and case documentation, evidencing real administrative planning capacity ahead of the 1955 incident.
      planning_orientation: [55, 0.4, "i", "N"],
      // Her sustained secretarial and organizational NAACP work over a decade required real concentrated administrative attention.
      deep_focus: [52, 0.4, "i", "N"],
      // Her later work founding an institute for structured self-development education suggests some real capacity for organizing a coherent programmatic framework.
      systems_abstraction: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_zaha_hadid",
    slug: "zaha-hadid",
    canonicalName: "Zaha Hadid",
    birthYear: 1950,
    deathYear: 2016,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["IQ", "GB"],
    regionCode: "west_asia",
    occupationIds: ["architect"],
    fieldIds: ["architecture", "design"],
    impactDomains: ["artistic", "engineering", "innovation"],
    tagIds: ["founder", "perfectionist", "innovator"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q47780" },
    portrait: {
      url: "/portraits/zaha-hadid-baku-2013.jpg",
      source: "Wikimedia Commons",
      license: "Free use, copyright holder permission verified by Wikimedia VRT (ticket #2018022210006826)",
      width: 1268,
      height: 1238,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Zaha_Hadid_in_Heydar_Aliyev_Cultural_center_in_Baku_nov_2013.jpg",
      attribution: "Photograph by Dmitry Ternovoy, 2013",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hadid_wikipedia", kind: "wikipedia", title: "Zaha Hadid", url: "https://en.wikipedia.org/wiki/Zaha_Hadid" }, { id: "src_hadid_pritzker", kind: "award_body", title: "The Pritzker Architecture Prize — Zaha Hadid, 2004" }],
    rows: {
      // Developed a distinctive deconstructivist/parametric architectural style characterized by dramatic curved, fluid forms with no direct precedent, becoming the first woman to win the Pritzker Architecture Prize (2004), documented via the prize citation's own explicit recognition of her stylistic originality.
      creative_originality: [90, 0.68, "d", "A"],
      // Spent roughly the first decade of her career with almost no built work realized, widely known within the profession primarily through unbuilt competition-winning designs, before her first major building was completed — documented via the well-established, unusually long gap between her design reputation and built portfolio.
      persistence: [82, 0.65, "d", "A"],
      // Sustained a design practice built on structurally and technically ambitious forms that many contemporary engineers and builders initially considered impractical or unbuildable, documented via the well-established professional skepticism her early designs faced before building technology caught up.
      risk_tolerance: [74, 0.65, "d", "N"],
      // Pursued a genuinely distinctive design philosophy that departed substantially from the dominant rectilinear modernist and postmodernist architectural conventions of her early career, documented via critical assessment of her work's departure from contemporaries.
      independent_thinking: [78, 0.65, "d", "A"],
      // Widely documented via multiple professional accounts and interviews for an exacting, demanding standard applied to both her own design work and her firm's execution, reflected in the technical precision required to realize her complex geometric forms.
      perfectionism: [78, 0.65, "d", "D"],
      // Sustained an ambitious international architectural practice across a career spanning four decades, ultimately producing major built works on nearly every continent, documented via the well-established scale of her firm's realized portfolio.
      achievement_drive: [78, 0.65, "d", "A"],
      // Founded and led Zaha Hadid Architects into a major international firm, documented via the well-established institutional scale and continued operation of that practice.
      leadership_drive: [74, 0.65, "d", "A"],
      // Her complex, structurally ambitious geometric forms required exhaustive technical precision to realize as actual buildings, evidenced by the well-documented technical complexity of major realized projects like the Guangzhou Opera House.
      detail_orientation: [66, 0.48, "s", "A"],
      // Developed and applied parametric design principles integrating structural, spatial, and aesthetic considerations into unified computational design systems, documented via the well-established methodological approach of her later career work.
      systems_abstraction: [68, 0.65, "d", "A"],
      // Sustained her distinctive design approach despite years of professional skepticism and unrealized competition wins, documented via the well-established decade-long gap between her design reputation and built portfolio.
      conflict_tolerance: [62, 0.46, "s", "N"],
      // Founded and maintained her own independent architectural practice rather than working within an established firm, sustaining this even through the difficult early decade with minimal built work, documented via the well-established independent trajectory of her career.
      autonomy_need: [66, 0.48, "s", "A"],
      // Sustained a demanding international design practice across four decades, evidenced by the scale and technical complexity of her firm's realized portfolio.
      discipline: [62, 0.44, "s", "A"],
      // Sustained engagement across architecture, interior design, furniture, and product design over her career, evidencing real range within design broadly construed.
      curiosity: [60, 0.44, "s", "A"],
      // Continued developing and refining her parametric design approach across an evolving body of increasingly technically ambitious built work over her career.
      mastery_orientation: [60, 0.44, "s", "A"],
      // Realizing structurally complex, large-scale built projects requires extensive advance technical and logistical planning, evidenced by the well-documented multi-year development timelines of her major buildings.
      planning_orientation: [58, 0.42, "i", "N"],
      // Led a large international architectural firm requiring sustained collaborative work with engineers, contractors, and clients across major projects, suggesting real capacity for structured professional collaboration despite her strong individual design vision.
      collaboration: [55, 0.4, "i", "N"],
      // Consistently framed her architectural philosophy around reimagining how people experience and move through public and civic space, documented via her own stated design philosophy across interviews and the Pritzker citation's framing.
      impact_motivation: [60, 0.44, "s", "A"],
      // Continued entering and winning international design competitions on her own initiative throughout her decade with minimal built work, self-directed pursuit of her design vision without institutional backing, documented via the well-established record of her competition-heavy early career.
      proactive_agency: [64, 0.65, "d", "A"],
      // Realizing structurally complex, technically ambitious building forms required sustained concentrated design and engineering-coordination effort per project.
      deep_focus: [60, 0.42, "i", "N"],
      // Developing and applying parametric design principles required real systematic technical and structural analysis underlying the visually expressive final forms.
      analytical_rigor: [58, 0.42, "i", "N"],
    },
  },
];

export const ROSTER_27: readonly Person[] = seeds.map(build);
