/**
 * ROSTER 26 — ten-person fast production batch, third real use of the
 * profile-publication / match-eligibility separation architecture
 * (10 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster26.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. Che Guevara
 * is pre-existing `qa_passed`/match-eligible; the other nine are
 * `evidence_approved`/non-match-eligible by design. Every score's
 * rationale is preserved as the inline comment above its Row. Full
 * record: `docs/checkpoints/roster26-ten-person-fast-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_che_guevara",
    slug: "che-guevara",
    canonicalName: "Che Guevara",
    aliases: ["Ernesto Guevara"],
    birthYear: 1928,
    deathYear: 1967,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["AR", "CU"],
    regionCode: "latin_america",
    occupationIds: ["political_activist", "physician", "military_leader"],
    fieldIds: ["politics", "military", "medicine"],
    impactDomains: ["social", "historical"],
    tagIds: ["overcame_adversity", "strategist", "career_changer"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q5809" },
    portrait: {
      url: "/portraits/che-guevara-burri-1963.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (published in the US 1931-1963 without copyright renewal)",
      width: 1280,
      height: 858,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Che_Guevara.jpg",
      attribution: "Photograph by René Burri, 1963 — Che Guevara at his office as Minister of Industry, Havana",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_che_motorcycle", kind: "archive", title: "Ernesto Guevara, The Motorcycle Diaries (Notas de viaje) — his own memoir of the 1951-52 journey across South America" }, { id: "src_che_congo_diary", kind: "archive", title: "Ernesto Guevara, Congo Diary (Pasajes de la guerra revolucionaria: Congo) — his own day-by-day account of the failed 1965 Congo campaign, including self-critical assessment" }, { id: "src_che_bolivian_diary", kind: "archive", title: "Ernesto Guevara, The Bolivian Diary — kept until days before his October 1967 capture and execution; published posthumously" }, { id: "src_che_farewell_letter", kind: "archive", title: "Guevara's 1965 farewell letter to Fidel Castro, read publicly by Castro, renouncing his Cuban government positions and citizenship" }, { id: "src_che_anderson", kind: "biography", title: "Jon Lee Anderson, Che Guevara: A Revolutionary Life (1997) — the standard scholarly biography, drawing on Cuban archives and family papers" }, { id: "src_che_wikipedia", kind: "wikipedia", title: "Che Guevara", url: "https://en.wikipedia.org/wiki/Che_Guevara" }],
    rows: {
      // Repeatedly chose extreme physical and political danger across decades and independent episodes: the 1952 motorcycle trip through remote, poorly mapped terrain on an unreliable machine; the 1956-59 Cuban guerrilla campaign; and, after voluntarily relinquishing a senior government position, the 1965 Congo and 1966-67 Bolivia campaigns, the last of which killed him. Multiple independent, well-documented instances across his whole adult life.
      risk_tolerance: [90, 0.8, "d", "R"],
      // Moved between medical student, guerrilla fighter, senior government administrator (National Bank president, Minister of Industry), and guerrilla fighter again across three different countries and political contexts, each documented by specific dated roles.
      adaptability: [72, 0.6, "d", "A"],
      // Completed full medical training (University of Buenos Aires), authored a substantive military-strategy manual (La Guerra de Guerrillas, 1961), and served as a functioning economic administrator (National Bank, Ministry of Industry) — three genuinely distinct domains with real documented output in each, not dabbling.
      cross_domain_range: [76, 0.65, "d", "A"],
      // After the 1965 Congo campaign's documented failure, moved directly into planning and launching the Bolivia campaign rather than retiring from armed struggle — a specific, dated continuation despite recent, self-acknowledged defeat.
      persistence: [78, 0.62, "d", "A"],
      // Sustained years of armed conflict across three countries and personally oversaw harsh, contested disciplinary and judicial actions (including executions at La Cabaña fortress in 1959) — a documented pattern with real, lasting historical and reputational cost to him.
      conflict_tolerance: [75, 0.65, "d", "R"],
      // His 1965 farewell letter to Castro explicitly renounces his senior government position and material comforts to continue the revolutionary struggle elsewhere — a specific, dated, directly documented statement of motivation over material security.
      impact_motivation: [80, 0.7, "d", "A"],
      // Voluntarily relinquished senior Cuban government office and citizenship in 1965 to pursue an independent path rather than remain in an established position of power — a specific, dated, well-documented act, not an inferred preference.
      autonomy_need: [78, 0.68, "d", "A"],
      // Both the Congo and Bolivia campaigns were self-initiated rather than assigned by any higher authority — the entire post-1965 phase of his life was self-directed, documented via his own diaries and the farewell letter.
      proactive_agency: [75, 0.62, "d", "A"],
      // Led decisive battlefield actions during the Cuban revolutionary campaign, including command at the Battle of Santa Clara, a well-documented turning point, though most of the surviving record describes outcomes more than his specific decision process.
      decisiveness: [68, 0.5, "s", "A"],
      // Commanded significant guerrilla forces and held senior government office, but the documented pattern of voluntarily relinquishing that office (autonomy_need) suggests the underlying motivation read as ideological rather than personal-power-seeking, distinguishing this from raw dominance drive.
      leadership_drive: [65, 0.55, "d", "A"],
      // Enforced strict discipline within his own guerrilla units, including documented executions of deserters, and sustained rigorous physical activity throughout despite severe lifelong asthma — a real, consequential pattern with genuine costs to those under his command, not an unqualified virtue.
      discipline: [74, 0.62, "d", "D"],
      // The documented record centers on ideological/collective revolutionary goals rather than personal achievement or recognition-seeking specifically, so this is inferred rather than directly evidenced.
      achievement_drive: [58, 0.4, "i", "N"],
      // Developed and published his own "foco" theory of guerrilla revolution (a small vanguard group igniting broader uprising), a specific documented theoretical departure from orthodox Marxist-Leninist party-building doctrine of the period.
      independent_thinking: [72, 0.6, "d", "A"],
      // His writings, including the widely circulated essay "Man and Socialism in Cuba," had substantial documented influence on revolutionary movements internationally, though this is inferred from reception and reach rather than a single cited persuasive episode.
      persuasiveness: [65, 0.5, "s", "A"],
      // The Congo Diary explicitly and repeatedly documents his own uncertainty and doubt about the campaign's viability while he continued to operate under those conditions for months — an unusually direct, self-authored record of sustained operation under acknowledged doubt.
      ambiguity_tolerance: [70, 0.58, "d", "A"],
      // Worked closely and effectively with Castro's core group during the Cuban campaign, but his own Congo Diary documents real friction with his Congolese allies, attributing some of the campaign's failure to communication and coordination breakdowns he was part of.
      collaboration: [55, 0.5, "d", "D"],
      // Authored a systematic strategic manual, La Guerra de Guerrillas (1961), setting out guerrilla warfare doctrine in structured form — a specific, documented strategic output rather than an inferred planning tendency.
      planning_orientation: [70, 0.58, "d", "A"],
      // Completed full medical training to the point of qualification before changing fields, then developed genuine, applied military-strategic expertise afterward — a documented credential plus a documented second competence, not a claimed reputation.
      mastery_orientation: [65, 0.55, "d", "A"],
      // Maintained detailed day-by-day diaries through both the Congo and Bolivia campaigns, continuing the Bolivian diary until days before his capture — a sustained documentary habit evidenced by the surviving texts themselves.
      detail_orientation: [60, 0.45, "s", "N"],
      // At a leper colony in San Pablo, Peru, during the 1952 journey, he insisted on shaking hands with patients without gloves against prevailing protocol, a specific documented act recorded in his own Motorcycle Diaries.
      social_assertiveness: [62, 0.5, "d", "A"],
      // Chose to undertake an extended, largely unplanned motorcycle journey across an entire continent as a medical student rather than complete his studies on a conventional timeline, documented in detail in his own memoir of the trip.
      curiosity: [68, 0.55, "d", "A"],
    },
  },
  {
    id: "p_corazon_aquino",
    slug: "corazon-aquino",
    canonicalName: "Corazon Aquino",
    birthYear: 1933,
    deathYear: 2009,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["PH"],
    regionCode: "south_asia",
    occupationIds: ["political_leader"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q1480" },
    portrait: {
      url: "/portraits/corazon-aquino-andrews-afb-1986.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (US federal government work — US Air Force official photograph)",
      width: 894,
      height: 1192,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Corazon_Aquino_1986.jpg",
      attribution: "Photograph by Airman Gerald B. Johnson, 1986 — US National Archives",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ca_press", kind: "press", title: "International press coverage of the 1983 assassination of Ninoy Aquino, the 1986 People Power (EDSA) Revolution, and Aquino's 1986-1992 presidency, including seven documented coup attempts against her" }, { id: "src_ca_constitution", kind: "institution", title: "1987 Philippine Constitution, restoring democratic constitutional government after the Marcos dictatorship" }, { id: "src_ca_wikipedia", kind: "wikipedia", title: "Corazon Aquino", url: "https://en.wikipedia.org/wiki/Corazon_Aquino" }],
    rows: {
      // Transformed from a self-described "plain housewife" with no prior political office into a national revolutionary leader and president within a few years of her husband's 1983 assassination — a dramatic, well-documented transition.
      adaptability: [74, 0.62, "d", "A"],
      // Sustained the presidency through seven separate documented coup attempts (1986-1992), continuing to govern rather than yielding to any of them.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Continued the political struggle against the Marcos government after her husband's assassination rather than withdrawing from public life, a sustained path that led to the presidency three years later.
      persistence: [74, 0.6, "d", "A"],
      // Personally led the political campaign against Marcos following her husband's death, a self-directed political emergence from private life rather than one arranged by a party apparatus.
      proactive_agency: [70, 0.58, "d", "A"],
      // Voluntarily stepped down after her constitutional term ended rather than seeking to extend her rule — a specific, documented adherence to term limits notable given the dictatorship that had just preceded her.
      autonomy_need: [72, 0.6, "d", "A"],
      // Sustained functioning leadership through seven coup attempts and severe political instability across a single term, documented by the continuity of her government through each crisis.
      ambiguity_tolerance: [72, 0.6, "d", "A"],
      // Responded to each of seven separate coup attempts with specific public actions, including broadcasts and calls to loyal military units, inferred from the documented pattern of her government surviving each one.
      decisiveness: [65, 0.5, "s", "A"],
      // Sustained direct confrontation with entrenched Marcos-era interests and repeated military factions across her term, documented by the sustained frequency of attempted coups.
      conflict_tolerance: [68, 0.55, "d", "R"],
      // Sustained public commitment to restoring democratic constitutional government, documented directly in the 1987 Constitution enacted under her administration.
      impact_motivation: [65, 0.52, "d", "A"],
      // Widely documented as a reluctant political figure who took on leadership from circumstance following her husband's assassination rather than from prior personal political ambition, scored honestly as modest rather than inferred as high from her ultimate office.
      achievement_drive: [50, 0.45, "d", "N"],
      // Directly and publicly led the massive EDSA People Power demonstrations, a documented public leadership role at the center of a mass movement.
      social_assertiveness: [68, 0.55, "d", "A"],
      // Documented as having been thrust into a leadership role by circumstance rather than having sought power for its own sake, scored honestly as modest rather than assumed high from the presidency she ultimately held.
      leadership_drive: [52, 0.45, "d", "N"],
      // The People Power movement she came to lead was a broad, documented coalition of the Catholic Church, military reformists, and civil society groups, not a movement she built alone.
      collaboration: [65, 0.52, "d", "A"],
      // Successfully rallied millions to the EDSA demonstrations and secured broad international support against an entrenched dictatorship, a documented mobilizing and persuasive achievement.
      persuasiveness: [68, 0.55, "d", "A"],
      // Transitioned from private family life to revolutionary leader to head of state within a compressed period, a documented range of roles concentrated in a short span rather than developed over a long career.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Pursued a genuinely non-violent resistance strategy specifically as an alternative to the armed rebellion some opposition factions favored, a documented distinct strategic choice.
      independent_thinking: [58, 0.45, "d", "A"],
      // Maintained sustained daily religious practice, documented as a personal source of stability throughout the crises of her presidency, including public prayer rallies during coup attempts.
      discipline: [55, 0.42, "d", "N"],
      // Completed college studies in political science before her marriage interrupted further legal studies — a modest, documented educational credential preceding her later political role.
      mastery_orientation: [50, 0.38, "d", "N"],
    },
  },
  {
    id: "p_fidel_castro",
    slug: "fidel-castro",
    canonicalName: "Fidel Castro",
    birthYear: 1926,
    deathYear: 2016,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["CU"],
    regionCode: "latin_america",
    occupationIds: ["political_leader", "military_leader", "political_activist"],
    fieldIds: ["politics", "military"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q11256" },
    portrait: {
      url: "/portraits/fidel-castro-loc-gotfryd-1979.jpg",
      source: "Wikimedia Commons",
      license: "No known copyright restrictions (Library of Congress, Bernard Gotfryd collection)",
      width: 1201,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Fidel_Castro,_Prime_Minister_of_Cuba._Castro_at_the_United_Nations,_New_York_(3x4_cropped).jpg",
      attribution: "Photograph by Bernard Gotfryd, 1979 — Library of Congress, Prints and Photographs Division",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_fc_ramonet", kind: "archive", title: "Ignacio Ramonet, Fidel Castro: My Life (2006) — an extensive book-length personal interview" }, { id: "src_fc_history_absolve", kind: "archive", title: "Fidel Castro, History Will Absolve Me (1953/1961) — his own trial defense speech after the Moncada Barracks attack, later reconstructed and published" }, { id: "src_fc_press", kind: "press", title: "International press coverage across six decades, including the 1956 Granma landing, the 1961 Bay of Pigs invasion, and the 1962 Cuban Missile Crisis" }, { id: "src_fc_church_committee", kind: "institution", title: "US Senate Church Committee records documenting multiple CIA assassination plots against him" }, { id: "src_fc_wikipedia", kind: "wikipedia", title: "Fidel Castro", url: "https://en.wikipedia.org/wiki/Fidel_Castro" }],
    rows: {
      // RUBRIC_CORRECTION (roster26 fast-batch audit, 2026-09; score-band correction only): after his invasion force was nearly annihilated at Alegría de Pío in 1956 (only around 20 of 82 men survived), rebuilt a guerrilla campaign from the Sierra Maestra mountains over two years to eventual victory in 1959 — a well-corroborated recovery from near-total failure. Originally scored 85/documented; corrected to 80 because scoring_rubric_v1 Section 4 reserves the 85+ band for MULTIPLE independent documented instances, and this rests on one continuous instance (a single recovery arc), however well corroborated across independent historical accounts and however long its duration — the score is capped to the 71-84 'clear, well-evidenced pattern' band regardless of corroboration depth. This is a score-band correction only: the evidence remains squarely `documented` (a specific, attributable, well-sourced account of a concrete recovery), and confidence 0.72 already sits in Section 3's 0.65-0.84 band for 'one strong documented instance' — so evidenceType and confidence are unchanged. Only the score moved.
      persistence: [80, 0.72, "d", "A"],
      // Personally led the 1953 Moncada Barracks attack, the 1956 Granma landing, and the subsequent guerrilla campaign, each under severe, sustained, well-documented personal danger across multiple years and independent episodes.
      risk_tolerance: [85, 0.72, "d", "R"],
      // His "History Will Absolve Me" trial defense speech transformed a legal defeat into a lasting political rallying document, later reconstructed and widely disseminated by his own effort — a specific, documented rhetorical achievement.
      persuasiveness: [76, 0.62, "d", "A"],
      // Made specific, documented, high-stakes decisions during both the 1961 Bay of Pigs invasion and the 1962 Cuban Missile Crisis, two of the most scrutinized crisis episodes of the 20th century.
      decisiveness: [72, 0.6, "d", "A"],
      // Sustained personal rule of Cuba for 49 years (1959-2008), among the longest tenures of any 20th-century head of state.
      leadership_drive: [78, 0.65, "d", "A"],
      // Sustained decades of direct conflict with the United States and survived multiple documented CIA assassination plots (per the Church Committee record), a sustained pattern across his entire rule.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Personally initiated both the Moncada attack and the Granma expedition from a position with no formal backing or resources — self-directed, high-risk actions rather than responses to external pressure.
      proactive_agency: [76, 0.62, "d", "A"],
      // Sustained a consistent, documented ideological commitment across nearly five decades of rule, evidenced by his own extensive interviews and consistent policy — alongside a well-documented record of suppressing internal political dissent, a real tension rather than a simple positive motivation.
      impact_motivation: [65, 0.52, "d", "D"],
      // Repeatedly adapted guerrilla tactics during the Sierra Maestra campaign in response to setbacks, and decades later navigated the collapse of Soviet support in the 1990s "Special Period" without losing power — documented adaptability under two, decades-apart, existential threats.
      adaptability: [74, 0.6, "d", "A"],
      // Sustained pursuit of revolutionary victory over years despite catastrophic early setbacks, then sustained the resulting state for nearly five decades — a documented, consistent long-term goal-directed pattern.
      achievement_drive: [72, 0.58, "d", "A"],
      // Governed through the Cuban Missile Crisis, one of history's closest approaches to nuclear war, and through the post-Soviet economic collapse of the 1990s — sustained functioning leadership through both, documented independently.
      ambiguity_tolerance: [68, 0.55, "d", "A"],
      // The multi-year guerrilla campaign strategy — rural-based insurgency combined with alliance-building among rebel factions — shows real, sustained, documented strategic planning rather than improvisation.
      planning_orientation: [68, 0.55, "d", "A"],
      // Did not publicly declare Marxism-Leninism until after the revolution's military success, a documented and debated strategic sequencing distinct from simply importing an existing external template.
      independent_thinking: [62, 0.5, "d", "A"],
      // Trained and qualified as a lawyer before his revolutionary career, a specific documented credential, and later developed substantial self-taught expertise in military strategy and state governance.
      mastery_orientation: [60, 0.5, "d", "A"],
      // Sustained a rigorous guerrilla campaign under extremely difficult mountain conditions for over two years, inferred from the documented duration and outcome of that campaign.
      discipline: [65, 0.5, "s", "A"],
      // Sustained direct, prolonged public confrontation with the US government and international bodies across decades, including some of the longest speeches on record at the UN General Assembly.
      social_assertiveness: [65, 0.52, "d", "A"],
      // Built real, documented alliances with other Cuban rebel factions (the Directorio Revolucionario) and internationally with the Soviet Union, though also documented friction and rivalry with some allied factions and, at points, with Soviet leadership itself.
      collaboration: [58, 0.48, "d", "D"],
      // Maintained documented instances of independent Cuban positioning even while allied with and dependent on the Soviet Union, including friction with Soviet leadership over specific policy choices in the aftermath of the Missile Crisis.
      autonomy_need: [62, 0.5, "d", "A"],
      // His extensive interviews (the Ramonet book in particular) document wide-ranging, self-directed reading and intellectual engagement across his life, inferred from that documented breadth rather than a single cited instance.
      curiosity: [55, 0.4, "i", "N"],
      // Functioned with real, documented substantive engagement as a trained lawyer, a guerrilla military commander, and a head of state — three genuinely distinct domains.
      cross_domain_range: [62, 0.5, "d", "A"],
    },
  },
  {
    id: "p_ho_chi_minh",
    slug: "ho-chi-minh",
    canonicalName: "Ho Chi Minh",
    birthYear: 1890,
    deathYear: 1969,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["VN"],
    regionCode: "south_asia",
    occupationIds: ["political_leader", "political_activist", "writer"],
    fieldIds: ["politics", "literature"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q36014" },
    portrait: {
      url: "/portraits/ho-chi-minh-1946-portrait.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in Vietnam (published more than 75 years ago) and in the US (simultaneously published without US copyright compliance, term expired)",
      width: 1138,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_-_1946_Portrait_(cropped).jpg",
      attribution: "Unknown photographer, c. 1947",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hcm_prison_diary", kind: "archive", title: "Ho Chi Minh, Nhật ký trong tù (Diary in Prison) — his own classical-style poems written during his 1942-43 imprisonment in China" }, { id: "src_hcm_surete", kind: "institution", title: "French colonial intelligence (Sûreté générale indochinoise) surveillance records tracking him across decades under dozens of documented aliases" }, { id: "src_hcm_independence_speech", kind: "archive", title: "Ho Chi Minh's Declaration of Independence speech, 2 September 1945, Hanoi" }, { id: "src_hcm_wikipedia", kind: "wikipedia", title: "Ho Chi Minh", url: "https://en.wikipedia.org/wiki/Ho_Chi_Minh" }],
    rows: {
      // Traveled and worked in numerous countries under numerous documented aliases and occupations — including as a ship's galley hand and a photo retoucher in Paris — for decades before returning to lead Vietnam, an extraordinary documented range of adaptation.
      adaptability: [76, 0.62, "d", "A"],
      // Sustained the Vietnamese independence movement across nearly five decades, from early exile activism through leading North Vietnam in war until his death, without abandoning the cause.
      persistence: [78, 0.65, "d", "A"],
      // Sustained decades of clandestine revolutionary activity under dozens of documented aliases, facing imprisonment by both British authorities in Hong Kong (1931-33) and Chinese Nationalist authorities (1942-43).
      risk_tolerance: [74, 0.6, "d", "R"],
      // Maintained sustained operational security across decades using dozens of documented aliases, evading capture by French colonial intelligence for most of his career despite active, sustained surveillance.
      discipline: [70, 0.58, "d", "A"],
      // Co-founded the French Communist Party in 1920 and self-initiated decades of independent organizing before ever returning to lead in Vietnam, a self-directed rather than assigned path.
      proactive_agency: [68, 0.55, "d", "A"],
      // Wrote a substantial body of classical-style Chinese poetry during his 1942-43 imprisonment, a specific, genuine literary output produced under direct confinement.
      creative_originality: [62, 0.52, "d", "A"],
      // His own prison diary poems document sustained psychological endurance and even aesthetic and philosophical reflection during actual imprisonment — direct self-report evidence of tolerating extreme uncertainty.
      ambiguity_tolerance: [68, 0.55, "d", "A"],
      // Sustained a consistent, documented lifelong commitment to Vietnamese independence across nearly five decades regardless of personal cost, including repeated imprisonment and decades of exile.
      impact_motivation: [74, 0.62, "d", "A"],
      // Sustained leadership of the Vietnamese independence and revolutionary movement for decades, through both the First Indochina War and the early Vietnam War.
      leadership_drive: [70, 0.58, "d", "A"],
      // Sustained decades-long clandestine organizational building — founding and leading the Viet Minh and coordinating with the Comintern — documented, sustained strategic planning rather than opportunistic action.
      planning_orientation: [68, 0.55, "d", "A"],
      // His 1945 independence declaration explicitly and strategically invoked the language of the US Declaration of Independence, a specific, documented rhetorical choice aimed at securing international legitimacy.
      persuasiveness: [65, 0.52, "d", "A"],
      // Sustained pursuit of Vietnamese independence and unification across his entire life, a goal not fully realized until 1975, six years after his 1969 death — a documented pursuit larger than his own lifespan.
      achievement_drive: [65, 0.52, "d", "A"],
      // Learned multiple languages, including French, English, Chinese, and Russian, and worked in varied occupations across his itinerant years, documented sustained skill acquisition beyond his primary political role.
      mastery_orientation: [62, 0.5, "d", "A"],
      // Sustained decades of travel, varied occupations, and intellectual engagement with Comintern politics across many countries, inferred from that documented range of experience.
      curiosity: [60, 0.45, "s", "A"],
      // Sustained decades of armed conflict leadership, first against France and then against the US-backed South, as well as earlier decades of clandestine political conflict.
      conflict_tolerance: [72, 0.58, "d", "R"],
      // Documented by many visiting observers, including Western journalists, as maintaining a notably modest, understated personal style even as head of state — a real documented personal choice, distinct from (and not necessarily lower than) the more publicly flamboyant styles of some contemporary revolutionary leaders.
      social_assertiveness: [50, 0.45, "d", "N"],
      // Built and sustained the Viet Minh as a broad coalition of nationalists, communists, and other groups against French rule, a documented, sustained coalition-building achievement.
      collaboration: [62, 0.5, "d", "A"],
      // Developed a synthesis of Marxist-Leninist ideology specifically adapted to Vietnamese nationalist and agrarian conditions rather than importing an unmodified Soviet or Chinese template, a documented ideological adaptation.
      independent_thinking: [60, 0.48, "d", "A"],
    },
  },
  {
    id: "p_jawaharlal_nehru",
    slug: "jawaharlal-nehru",
    canonicalName: "Jawaharlal Nehru",
    birthYear: 1889,
    deathYear: 1964,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["political_leader", "writer", "statesman"],
    fieldIds: ["politics", "literature"],
    impactDomains: ["historical", "social", "literary"],
    tagIds: ["leader", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q1047" },
    portrait: {
      url: "/portraits/jawaharlal-nehru-netherlands-1957.jpg",
      source: "Wikimedia Commons",
      license: "CC0 1.0 Universal Public Domain Dedication",
      width: 1233,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nehru_in_the_Netherlands,_1957.jpg",
      attribution: "Photograph by Harry Pot, 1957 — Dutch National Archives (Nationaal Archief)",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_nehru_letters_daughter", kind: "archive", title: "Jawaharlal Nehru, Letters from a Father to His Daughter (1928) — his own letters to a young Indira Gandhi" }, { id: "src_nehru_glimpses", kind: "archive", title: "Jawaharlal Nehru, Glimpses of World History (1934) — letters to Indira written from prison, 1930-33" }, { id: "src_nehru_discovery", kind: "archive", title: "Jawaharlal Nehru, The Discovery of India (1946) — written substantially during his 1944 imprisonment" }, { id: "src_nehru_toward_freedom", kind: "archive", title: "Jawaharlal Nehru, Toward Freedom: The Autobiography of Jawaharlal Nehru (1936)" }, { id: "src_nehru_gopal", kind: "biography", title: "Sarvepalli Gopal, Jawaharlal Nehru: A Biography (three volumes) — drawing on extensive personal and government archives" }, { id: "src_nehru_wikipedia", kind: "wikipedia", title: "Jawaharlal Nehru", url: "https://en.wikipedia.org/wiki/Jawaharlal_Nehru" }],
    rows: {
      // The Discovery of India and Glimpses of World History both show sustained, genuinely wide-ranging engagement across history, philosophy, science, and culture, written as personal exploration rather than a commissioned reference work.
      curiosity: [74, 0.62, "d", "A"],
      // Accumulated roughly nine years of imprisonment across multiple specific, dated terms between 1921 and 1945 for independence-movement activity, continuing the same activity after each release rather than withdrawing.
      persistence: [80, 0.7, "d", "A"],
      // Repeatedly led and participated in civil disobedience campaigns with imprisonment as the near-certain, well-understood consequence, across multiple separate documented campaigns over two decades.
      risk_tolerance: [74, 0.62, "d", "R"],
      // Maintained real, documented philosophical differences with Gandhi over secularism, industrialization, and economic policy — recorded directly in their surviving correspondence — while remaining a close political ally, showing sustained independent judgment rather than deference.
      independent_thinking: [70, 0.6, "d", "A"],
      // Moved from Cambridge-educated lawyer to imprisoned independence activist to head of government of a newly partitioned, massive, diverse nation — documented, distinct role transitions.
      adaptability: [65, 0.55, "d", "A"],
      // His own autobiography documents choosing repeated imprisonment over a comfortable legal career as a specific, deliberate trade-off in favor of the independence movement, sustained across two decades.
      impact_motivation: [76, 0.65, "d", "A"],
      // Initiated and sustained India's Five-Year Plans as a systematic national economic planning framework — a specific, documented structural output, not an inferred tendency.
      planning_orientation: [68, 0.55, "d", "A"],
      // Co-founded the Non-Aligned Movement with Nasser and Tito, a self-initiated foreign-policy stance deliberately outside both Cold War blocs, rather than a default alignment inherited from either bloc's pressure.
      proactive_agency: [72, 0.6, "d", "A"],
      // Sustained a close, decades-long political partnership with Gandhi despite the documented, real ideological differences between them — evidence of genuine collaboration through disagreement rather than simple discipleship.
      collaboration: [68, 0.58, "d", "A"],
      // The 1962 Sino-Indian War is documented as exposing real weaknesses in his government's military preparedness and strategic decision-making — a specific, well-documented setback in this exact domain, scored honestly rather than omitted.
      decisiveness: [52, 0.5, "d", "D"],
      // Produced several substantial books, including The Discovery of India, written in roughly five months during his 1944 imprisonment without research-assistant support — a specific, documented instance of sustained deep output under real constraint.
      mastery_orientation: [72, 0.6, "d", "A"],
      // Functioned with genuine substantive output as a trained lawyer, a published historian/writer, and a head of government — three distinct domains, each documented by surviving work or record, not superficial involvement.
      cross_domain_range: [70, 0.58, "d", "A"],
      // Became the dominant political figure of the independence movement's governing wing and served as Prime Minister for seventeen years (1947-1964) — a sustained, documented leadership role, not a brief tenure.
      leadership_drive: [70, 0.58, "d", "A"],
      // His advocacy was a founding influence in drawing a large number of newly independent nations toward the Non-Aligned Movement, inferred from that movement's documented reach rather than a single persuasive episode.
      persuasiveness: [65, 0.5, "s", "A"],
      // Governed a newly independent nation through partition violence, the integration of hundreds of princely states, and sustained Cold War pressure for seventeen years, evidenced by the continuity of functioning government across that whole uncertain period.
      ambiguity_tolerance: [64, 0.5, "s", "A"],
      // The volume and coherence of his prison-written work, produced under real physical and time constraints across multiple separate imprisonments, is direct evidence of sustained working discipline.
      discipline: [70, 0.58, "d", "A"],
      // Founding the Non-Aligned Movement specifically to avoid subordinating India's foreign policy to either Cold War superpower bloc is a specific, documented act of prioritizing independence at the national-policy level.
      autonomy_need: [65, 0.55, "d", "A"],
      // Sustained pursuit of both a substantial personal intellectual output and long-term national development goals across decades, inferred from the consistency of that dual output rather than a single stated ambition.
      achievement_drive: [62, 0.48, "s", "A"],
      // Repeatedly and publicly led direct civil-disobedience confrontations with British colonial authority, resulting in his own arrest on multiple specific, dated occasions.
      social_assertiveness: [68, 0.55, "d", "A"],
      // Sustained decades of direct confrontation with British colonial authority, accepting repeated imprisonment as a known, accepted consequence rather than seeking accommodation.
      conflict_tolerance: [70, 0.58, "d", "R"],
    },
  },
  {
    id: "p_king_hussein_jordan",
    slug: "king-hussein-jordan",
    canonicalName: "King Hussein of Jordan",
    birthYear: 1935,
    deathYear: 1999,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["JO"],
    regionCode: "west_asia",
    occupationIds: ["political_leader"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "reconciliation"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q146906" },
    portrait: {
      url: "/portraits/king-hussein-jordan-pentagon-1997.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (US federal government work — US Department of Defense official photograph)",
      width: 1173,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:HusseinJordanien.jpg",
      attribution: "Photograph by Helene C. Stikkel, 1997 — US Department of Defense",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_kh_uneasy_lies", kind: "archive", title: "King Hussein, Uneasy Lies the Head (1962) — his own early memoir" }, { id: "src_kh_state_dept", kind: "archive", title: "Declassified US State Department diplomatic records covering four decades of Jordanian foreign policy and the Israel-Jordan peace process" }, { id: "src_kh_press", kind: "press", title: "International press coverage across his 46-year reign (1952-1999), including the 1957 coup attempt, the 1970 Black September conflict, and the 1994 peace treaty with Israel" }, { id: "src_kh_wikipedia", kind: "wikipedia", title: "Hussein of Jordan", url: "https://en.wikipedia.org/wiki/Hussein_of_Jordan" }],
    rows: {
      // Survived multiple documented assassination attempts and coup plots across his reign, including personally going to a besieged loyalist army camp during the 1957 coup attempt rather than fleeing; also a licensed pilot who personally flew aircraft including on official duties — risk evidenced across distinct political and personal domains.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Made the specific, high-stakes decision to move militarily against PLO forces operating within Jordan during the September 1970 "Black September" crisis — decisive and consequential, with real, documented human cost that remains historically contested.
      decisiveness: [76, 0.62, "d", "D"],
      // Held the throne for 46 years (1953-1999) through multiple existential threats — coup attempts, regional wars, and Black September — a sustained, documented pattern rather than an uneventful reign.
      persistence: [78, 0.65, "d", "A"],
      // Navigated and survived Black September and multiple coup attempts, sustaining decades of regional conflict management under direct personal threat.
      conflict_tolerance: [74, 0.6, "d", "R"],
      // Maintained secret back-channel diplomatic contact with Israeli leaders for years before the 1994 peace treaty was signed, documented in later-declassified accounts and memoirs from both sides — sustained interpersonal diplomacy across a hostile political divide.
      persuasiveness: [74, 0.62, "d", "A"],
      // The decades-long secret diplomacy culminating in the 1994 peace treaty with Israel required sustained, careful strategic planning, evidenced by the documented multi-year back-channel effort preceding the formal agreement.
      planning_orientation: [72, 0.6, "d", "A"],
      // Pursued secret peace diplomacy with Israel years before such contact was broadly politically acceptable in the regional Arab context of the time — a documented, genuinely independent policy stance.
      independent_thinking: [70, 0.58, "d", "A"],
      // Personally initiated and sustained the Israel back-channel diplomacy, and, in his final weeks, personally returned from cancer treatment at the Mayo Clinic specifically to intervene in a succession dispute — both self-initiated interventions.
      proactive_agency: [72, 0.6, "d", "A"],
      // Navigated dramatically different regional political contexts across nearly five decades — Cold War-era regional politics, Black September, and the eventual peace process — evidenced by his sustained rule through each.
      adaptability: [65, 0.52, "d", "A"],
      // Became king at seventeen and sustained active, hands-on rule for 46 years — personally confronting coup attempts and personally negotiating peace — rather than functioning as a figurehead.
      leadership_drive: [68, 0.55, "d", "A"],
      // The 1994 peace treaty with Israel, the second such treaty by an Arab state, represents sustained, documented relationship-building with a former adversary over years, not a single signing ceremony.
      collaboration: [68, 0.58, "d", "A"],
      // Took a controversial, comparatively neutral stance toward Iraq during the 1990-91 Gulf War that strained relations with other Arab states and the US — a real, documented independent policy choice with genuine diplomatic cost at the time.
      autonomy_need: [60, 0.5, "d", "D"],
      // Sustained a decades-long pursuit of regional stability and peace culminating in the 1994 treaty, inferred from the consistency of that long-term goal across a reign otherwise marked by repeated crises.
      achievement_drive: [65, 0.5, "s", "A"],
      // Earned and maintained a pilot's license and personally flew a range of aircraft over decades, a specific, documented personal interest pursued seriously alongside his official role.
      curiosity: [58, 0.45, "d", "N"],
      // Sustained skill development in aviation to a licensed, practicing level over decades — a documented, specific competence maintained outside his primary political role.
      mastery_orientation: [60, 0.48, "d", "A"],
      // Sustaining a 46-year reign through repeated crises implies real personal discipline, but no single cited working-discipline episode survives independent of the broader reign record, hence inference-level.
      discipline: [55, 0.3, "i", "N"],
      // Sustained rule through decades of profound regional uncertainty — multiple Arab-Israeli wars, Cold War pressure, and the Gulf War — evidenced by the continuity of his rule across that whole period.
      ambiguity_tolerance: [62, 0.48, "s", "A"],
      // In his final weeks, chose to return from cancer treatment specifically to personally manage a succession dispute, prioritizing the state's stability over his own remaining time and comfort — a specific, documented, late-life act.
      impact_motivation: [68, 0.55, "d", "A"],
    },
  },
  {
    id: "p_muhammad_ali_jinnah",
    slug: "muhammad-ali-jinnah",
    canonicalName: "Muhammad Ali Jinnah",
    birthYear: 1876,
    deathYear: 1948,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["PK"],
    regionCode: "south_asia",
    occupationIds: ["political_leader", "lawyer"],
    fieldIds: ["politics", "law"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "founder"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q160554" },
    portrait: {
      url: "/portraits/muhammad-ali-jinnah-1945.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in Pakistan (copyright term expired) and in the US (published outside the US before 1 March 1989 without compliance, term expired)",
      width: 650,
      height: 853,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Jinnah1945c.jpg",
      attribution: "Unknown photographer, 1945",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_maj_wolpert", kind: "biography", title: "Stanley Wolpert, Jinnah of Pakistan (1984) — drawing on extensive archival research" }, { id: "src_maj_1947_speech", kind: "archive", title: "Jinnah's address to the Constituent Assembly of Pakistan, 11 August 1947" }, { id: "src_maj_press", kind: "press", title: "Contemporary accounts from Gandhi, Nehru, and British colonial officials documenting the Lahore Resolution (1940) and the 1947 partition negotiations" }, { id: "src_maj_wikipedia", kind: "wikipedia", title: "Muhammad Ali Jinnah", url: "https://en.wikipedia.org/wiki/Muhammad_Ali_Jinnah" }],
    rows: {
      // Built one of Bombay's most successful independent legal careers before ever entering politics, a specific, documented professional achievement preceding his political life entirely.
      achievement_drive: [68, 0.58, "d", "A"],
      // Shifted from an early, documented advocacy of Hindu-Muslim unity within the Congress movement to leading the movement for a separate Muslim state — a significant, well-documented ideological evolution based on his own reassessment, not inherited doctrine.
      independent_thinking: [68, 0.55, "d", "A"],
      // Led the Muslim League to the successful creation of Pakistan in 1947, a sustained, documented achievement of an extraordinarily difficult political goal against significant resistance.
      leadership_drive: [78, 0.65, "d", "A"],
      // Famously meticulous personal habits — formal dress and strict punctuality — are consistently documented by biographers and contemporaries across his entire life, not a single anecdote.
      discipline: [68, 0.58, "d", "A"],
      // Personally led the decades-long political campaign for Pakistan's creation, a self-directed undertaking rather than one assigned to him by an outside body.
      proactive_agency: [70, 0.58, "d", "A"],
      // Sustained the campaign for a separate Muslim state across decades of political negotiation and resistance from both the Congress and British authorities.
      persistence: [72, 0.6, "d", "A"],
      // Built genuine, documented professional legal mastery — one of the most successful barristers in Bombay — before his political career began.
      mastery_orientation: [65, 0.55, "d", "A"],
      // Concealed his terminal tuberculosis diagnosis throughout the final, intense 1947 independence negotiations, continuing to personally lead at severe physical cost — a specific, extraordinary, well-documented act confirmed by later medical and historical accounts.
      risk_tolerance: [74, 0.62, "d", "R"],
      // Concealing his illness specifically so it would not jeopardize the final negotiations for Pakistan's creation is a documented, specific act prioritizing the cause over his own health and self-interest.
      impact_motivation: [74, 0.6, "d", "A"],
      // Sustained a sophisticated, documented political and legal strategy — including the 1940 Lahore Resolution and systematic negotiation with both the British and Congress — over years, culminating in Pakistan's creation.
      planning_orientation: [68, 0.55, "d", "A"],
      // The shift toward advocating a separate state, and later his specific 1947 speech advocating secular, tolerant governance for the new nation, were both specific, documented, decisively stated positions.
      decisiveness: [62, 0.5, "d", "A"],
      // Successfully built and led a mass political movement (the Muslim League) to achieve an extraordinarily difficult political goal, a documented organizational and persuasive achievement.
      persuasiveness: [68, 0.55, "d", "A"],
      // Sustained direct political conflict with both British colonial authorities and Congress leadership, including Gandhi and Nehru, documented across decades of negotiation and dispute.
      conflict_tolerance: [65, 0.52, "d", "R"],
      // Pursued a distinct political path for Muslim self-determination even against the dominant Congress-led independence movement he had once been part of, a documented departure from his earlier institutional home.
      autonomy_need: [62, 0.5, "d", "A"],
      // Functioned with real, documented substantive achievement as both a highly successful lawyer and a political leader/statesman — two genuinely distinct domains.
      cross_domain_range: [62, 0.5, "d", "A"],
      // Navigated the extraordinarily uncertain, high-stakes partition negotiations of 1947 while personally terminally ill, documented by the sustained continuity of his leadership through that period.
      ambiguity_tolerance: [65, 0.52, "d", "A"],
      // His famously meticulous personal presentation and precise legal habits, noted by biographers as extending into his political conduct, suggest a sustained detail-oriented working style, inferred from that documented reputation.
      detail_orientation: [58, 0.4, "i", "N"],
      // Sustained public leadership through direct, formal political address, a documented public communication style distinct from more informal contemporaries, inferred from that pattern rather than a single cited episode.
      social_assertiveness: [55, 0.35, "i", "N"],
    },
  },
  {
    id: "p_nawal_el_saadawi",
    slug: "nawal-el-saadawi",
    canonicalName: "Nawal El Saadawi",
    birthYear: 1931,
    deathYear: 2021,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["EG"],
    regionCode: "north_africa",
    occupationIds: ["writer", "physician", "political_activist"],
    fieldIds: ["literature", "medicine", "civil_rights"],
    impactDomains: ["literary", "social", "medical"],
    tagIds: ["endured_imprisonment", "advocate", "nonconformist"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q238514" },
    portrait: {
      url: "/portraits/nawal-el-saadawi-tahrir-2012.jpg",
      source: "Wikimedia Commons",
      license: "CC BY 2.0",
      width: 1600,
      height: 1067,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nawal_el_Saadawi,_April_2012.jpg",
      attribution: "Photograph by Gigi Ibrahim, 2012 (via Flickr, CC BY 2.0)",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_nes_prison_memoirs", kind: "archive", title: "Nawal El Saadawi, Memoirs from the Women's Prison (1983) — written during her actual September 1981 imprisonment, using smuggled writing materials by her own account" }, { id: "src_nes_daughter_of_isis", kind: "archive", title: "Nawal El Saadawi, A Daughter of Isis and Walking Through Fire — her autobiographical volumes" }, { id: "src_nes_women_and_sex", kind: "archive", title: "Nawal El Saadawi, Women and Sex (1972) and its documented professional consequences (dismissal from the Ministry of Health)" }, { id: "src_nes_press", kind: "press", title: "International press coverage across five decades, including the 1991 banning of the Arab Women's Solidarity Association and 1990s death threats/exile" }, { id: "src_nes_wikipedia", kind: "wikipedia", title: "Nawal El Saadawi", url: "https://en.wikipedia.org/wiki/Nawal_El_Saadawi" }],
    rows: {
      // Continued publishing controversial work on women's health and sexuality despite documented professional dismissal (1972), imprisonment (1981), and death threats from Islamist groups in the 1990s — multiple independent, escalating documented consequences across decades, not a single instance.
      risk_tolerance: [82, 0.68, "d", "R"],
      // Continued writing and activism across a career spanning more than five decades despite dismissal, imprisonment, organizational bans, and exile, resuming work after each disruption rather than withdrawing.
      persistence: [80, 0.68, "d", "A"],
      // Wrote Memoirs from the Women's Prison during her own actual September 1981 imprisonment, using smuggled writing materials by her own account — a specific, self-initiated act of creative production under direct confinement, not resumed afterward but undertaken during it.
      proactive_agency: [82, 0.7, "d", "A"],
      // Sustained direct conflict with the Egyptian state under Sadat, religious authorities, and later Islamist groups across decades, documented through her dismissal, imprisonment, and the 1991 banning of her organization.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Developed and sustained a specific, controversial intellectual position on women's sexuality and health directly informed by her own clinical practice as a physician, distinct from prevailing social and religious norms of her context.
      independent_thinking: [74, 0.62, "d", "A"],
      // Founded the independent Arab Women's Solidarity Association (1982) rather than working solely within existing state institutions, and continued independent writing after losing her official government position in 1972.
      autonomy_need: [70, 0.6, "d", "A"],
      // Sustained a decades-long commitment to women's health and rights advocacy despite severe, escalating personal cost (job loss, imprisonment, exile, death threats), rather than moderating her public positions for safety.
      impact_motivation: [78, 0.65, "d", "A"],
      // Completed a full manuscript under actual prison conditions using smuggled materials (an eyebrow pencil and toilet paper, by her own account) — a specific, extraordinary, directly documented act of sustained working discipline.
      discipline: [76, 0.62, "d", "A"],
      // Sustained a prolific written output of dozens of books across decades alongside a medical career and organizational activism, a documented, sustained pattern of production.
      achievement_drive: [68, 0.55, "d", "A"],
      // Completed full medical training and practiced clinically before and alongside her writing career — a documented, credentialed second competence, not a claimed interest.
      mastery_orientation: [62, 0.52, "d", "A"],
      // Founded and led the Arab Women's Solidarity Association, a documented organizational leadership role that continued until the government banned the group in 1991.
      leadership_drive: [62, 0.52, "d", "A"],
      // Publicly and directly challenged government policy and religious authority through her writing and public statements, with documented direct consequences (dismissal, imprisonment) rather than working through indirect or anonymous channels.
      social_assertiveness: [72, 0.6, "d", "A"],
      // Functioned with genuine, documented substantive output as a physician, novelist, memoirist, and organizational activist — four distinct domains, not superficial involvement.
      cross_domain_range: [70, 0.58, "d", "A"],
      // Sustained activity under prolonged, direct, escalating threat and uncertainty — imprisonment, a documented death list, and exile — across decades, evidenced by the continuity of her output through each period.
      ambiguity_tolerance: [68, 0.55, "d", "A"],
      // Her medical training was directly extended into a broader socio-literary investigation of women's lives across her writing career, inferred from that documented cross-disciplinary body of work.
      curiosity: [60, 0.45, "s", "A"],
      // Ran for President of Egypt in 2004, a specific, documented political act, though she withdrew before the election itself, moderating the confidence of this as a completed decisive act.
      decisiveness: [55, 0.45, "d", "N"],
      // Founding the Arab Women's Solidarity Association required organizing with other activists, but the surviving record documents the organization's outcomes more than her specific collaborative process, hence inference-level.
      collaboration: [55, 0.35, "i", "N"],
      // Adapted across a documented medical career, a literary career, imprisonment, and a period of exile at Duke University, inferred from that range of life circumstances.
      adaptability: [60, 0.45, "s", "A"],
    },
  },
  {
    id: "p_puyi",
    slug: "puyi",
    canonicalName: "Puyi",
    aliases: ["Xuantong Emperor", "Henry Puyi"],
    birthYear: 1906,
    deathYear: 1967,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CN"],
    regionCode: "east_asia",
    occupationIds: ["political_leader"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q185152" },
    portrait: {
      url: "/portraits/puyi-manchukuo-period.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in China and Taiwan (photographic work, copyright term expired more than 50 years after publication)",
      width: 800,
      height: 1000,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Puyi,_Manchukuo_period_(cropped).jpg",
      attribution: "Unknown photographer, Manchukuo period (1932-1945)",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_py_autobiography", kind: "archive", title: "Puyi, From Emperor to Citizen (Wo De Qian Ban Sheng) — his own autobiography, written during and after Communist reeducation at the Fushun War Criminals Management Centre; a documented provenance risk given the political pressure to demonstrate reform, used here only where corroborated" }, { id: "src_py_johnston", kind: "archive", title: "Reginald Johnston, Twilight in the Forbidden City (1934) — independent firsthand memoir by his British tutor, 1919-1924" }, { id: "src_py_manchukuo_records", kind: "archive", title: "Japanese and Manchukuo administrative records, 1934-1945" }, { id: "src_py_wikipedia", kind: "wikipedia", title: "Puyi", url: "https://en.wikipedia.org/wiki/Puyi" }],
    rows: {
      // Moved through an extraordinary, well-documented sequence of entirely different life circumstances — child emperor, abdicated ceremonial figure, Japanese-installed puppet ruler, Soviet prisoner, Chinese prisoner, and finally ordinary citizen (gardener, then editor) — across six decades.
      adaptability: [78, 0.65, "d", "A"],
      // Documented eager embrace of Western ideas and technology under his tutor Reginald Johnston — learning English, wearing Western dress and glasses, and having the Forbidden City's thresholds physically cut down so he could ride a bicycle — specific, independently corroborated youthful curiosity against strong court tradition.
      curiosity: [70, 0.58, "d", "A"],
      // Specifically arranged for the Forbidden City's thresholds to be cut down to accommodate his bicycle — a small but specific, self-directed act of practical initiative against tradition, documented in Johnston's independent memoir.
      proactive_agency: [60, 0.5, "d", "A"],
      // Accepted the role of Japanese-installed ruler of Manchukuo in 1934, a decision with real, eventually realized personal risk — he was later held for years as a Soviet and then Chinese prisoner as a direct consequence.
      risk_tolerance: [62, 0.52, "d", "R"],
      // His acceptance of the Manchukuo throne is documented as driven substantially by a personal desire to reclaim imperial status and dignity after years of powerless ceremonial existence — an understandable personal motivation that also led to serious, documented complicity with Japanese imperial rule in China.
      impact_motivation: [55, 0.5, "d", "D"],
      // Survived and was eventually released from a combined fourteen years of Soviet (1945-1950) and Chinese (1950-1959) captivity, a specific, documented span of sustained endurance.
      persistence: [68, 0.55, "d", "A"],
      // Completed a substantial autobiographical manuscript during and after his reeducation process — a documented sustained effort, though scored at moderate confidence given the acknowledged political pressure on him to produce a narrative of reform at the time.
      discipline: [58, 0.45, "d", "N"],
      // His youthful embrace of Western customs against documented resistance from palace eunuchs and officials shows some independent-mindedness within severe institutional constraints, though his life was largely shaped by external actors (regents, Japanese handlers, Communist reeducators) rather than sustained independent political judgment.
      independent_thinking: [55, 0.45, "d", "N"],
      // Sustained personal continuity through an extraordinary, repeated sequence of status reversals — emperor to citizen, more than once — across six decades, documented by his survival through each transition.
      ambiguity_tolerance: [65, 0.52, "d", "A"],
      // Johnston's independent memoir documents a genuinely warm, sustained tutor-student relationship over five years (1919-1924), a specific, corroborated collaborative bond.
      collaboration: [62, 0.52, "d", "A"],
      // The decision to accept the Manchukuo throne was a specific, documented, high-stakes choice made with awareness of Chinese nationalist opposition, though it is better understood as circumstance-driven than as a demonstration of sustained independent decisiveness.
      decisiveness: [55, 0.45, "d", "D"],
      // Repeatedly sought to reclaim personal agency and status across his life, most notably by accepting the Manchukuo role specifically to regain some form of relevance after years of powerless ceremonial existence — a documented but genuinely complicated motivation.
      autonomy_need: [58, 0.48, "d", "D"],
      // Despite carrying the titles of emperor and later Manchukuo head of state, the documented record shows him functioning largely as a figurehead controlled by regents and then by Japanese handlers, not as a genuine independent commander — scored from the documented absence of real command, not from the title itself, per this rubric's explicit rule against inferring traits from office alone.
      leadership_drive: [35, 0.45, "s", "N"],
      // In his final years (after 1959) worked first as a gardener and then as an editor at a historical research institute, drawing on his unique personal knowledge of Qing history — a documented, if modest, late-life range of ordinary civic roles very different from his earlier circumstances.
      cross_domain_range: [55, 0.45, "d", "N"],
      // The documented record shows a figure largely acted upon by external forces (regents, Japanese handlers, Communist authorities) across most of his life rather than one who initiated direct public assertions of his own, an honest low score rather than an inferred passive-figure assumption from his circumstances alone.
      social_assertiveness: [40, 0.35, "i", "N"],
      // The pursuit of the Manchukuo role suggests some documented drive to reclaim status, but the broader record shows a life shaped more by external circumstance than sustained self-directed achievement-seeking, hence a modest, inference-level score.
      achievement_drive: [50, 0.35, "i", "N"],
      // His post-1959 work as an editor specifically on Qing-era historical research shows some sustained engagement building on his unique personal knowledge, a modest but documented late-life pattern.
      mastery_orientation: [52, 0.4, "d", "N"],
      // Accepting the Manchukuo role meant accepting intense, foreseeable Chinese nationalist opposition and eventual international condemnation, a specific documented instance of accepting serious conflict and controversy in pursuit of the role.
      conflict_tolerance: [50, 0.42, "d", "D"],
    },
  },
  {
    id: "p_salvador_allende",
    slug: "salvador-allende",
    canonicalName: "Salvador Allende",
    birthYear: 1908,
    deathYear: 1973,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CL"],
    regionCode: "latin_america",
    occupationIds: ["political_leader", "physician"],
    fieldIds: ["politics", "medicine"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q440" },
    portrait: {
      url: "/portraits/salvador-allende-bcn.jpg",
      source: "Wikimedia Commons",
      license: "CC BY 3.0 Chile",
      width: 325,
      height: 421,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Salvador_Allende_Gossens-.jpg",
      attribution: "Biblioteca del Congreso Nacional de Chile",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sa_final_speech", kind: "archive", title: "Salvador Allende's final radio address, broadcast live from La Moneda Palace, 11 September 1973, during the military coup" }, { id: "src_sa_un_speech", kind: "archive", title: "Allende's address to the UN General Assembly, 4 December 1972" }, { id: "src_sa_church_committee", kind: "institution", title: "US Senate Church Committee hearings and report, 1975 — declassified documentation of US covert action against Allende's government" }, { id: "src_sa_press", kind: "press", title: "International press coverage of his 1970-1973 presidency and the September 1973 coup" }, { id: "src_sa_wikipedia", kind: "wikipedia", title: "Salvador Allende", url: "https://en.wikipedia.org/wiki/Salvador_Allende" }],
    rows: {
      // Ran for the Chilean presidency unsuccessfully three times (1952, 1958, 1964) before finally winning in 1970 — a specific, extremely well-documented eighteen-year persistence pattern, not a single campaign.
      persistence: [82, 0.7, "d", "A"],
      // RUBRIC_CORRECTION (roster26 fast-batch audit, 2026-09; score-band correction only): remained in La Moneda Palace during the 11 September 1973 military coup rather than accepting safe passage into exile, delivering a final radio address refusing to resign as the palace was under military assault, and died there during the attack — a well-corroborated final act (his own broadcast survives directly; the coup and his death are independently documented in international press coverage). Originally scored 88/documented; corrected to 80 because scoring_rubric_v1 Section 4 reserves the 85+ band for MULTIPLE independent documented instances, and this rationale describes one instance -- a single, if extreme and multiply-sourced, act -- not a repeated pattern; the rubric's own text is explicit that 'a single quote or anecdote never justifies an 85+ ... score on its own, regardless of how vivid it is.' The score is capped to the 71-84 'clear, well-evidenced pattern' band. This is a score-band correction only: the evidence remains squarely `documented` (his own surviving broadcast plus independent press corroboration), and confidence 0.75 already sits in Section 3's 0.65-0.84 band for 'one strong documented instance' — so evidenceType and confidence are unchanged. Only the score moved.
      risk_tolerance: [80, 0.75, "d", "R"],
      // His decision to remain in the palace and refuse resignation was made explicitly and in real time, documented in the surviving broadcast recording of his own final address.
      decisiveness: [78, 0.65, "d", "A"],
      // Sustained direct political conflict with Chile's conservative establishment, the military, and documented US destabilization efforts (later detailed in the Church Committee's 1975 report) throughout his three-year presidency.
      conflict_tolerance: [74, 0.6, "d", "R"],
      // His final radio address explicitly frames his refusal to resign in terms of principle and the Chilean people's future rather than personal survival — a directly documented statement of motivation made at the moment of maximum personal stakes.
      impact_motivation: [82, 0.68, "d", "A"],
      // Sustained an eighteen-year, four-election campaign to reach the presidency on top of an earlier documented career as physician, public health reformer, and senator.
      achievement_drive: [72, 0.6, "d", "A"],
      // Earned a medical degree and wrote a specific documented thesis on the social and medical dimensions of mental illness and crime before his political career developed further.
      mastery_orientation: [62, 0.52, "d", "A"],
      // Functioned with real documented output as a physician, as Minister of Health implementing specific public-health reforms in the 1930s, as a senator, and as president — four genuinely distinct phases, not superficial involvement.
      cross_domain_range: [70, 0.58, "d", "A"],
      // Initiated and sustained his own repeated presidential campaigns across two decades despite three prior losses, rather than abandoning the goal after an early defeat.
      proactive_agency: [70, 0.58, "d", "A"],
      // Pursued a specifically Chilean, democratic "path to socialism" (la vía chilena al socialismo) explicitly distinct from the Soviet and Cuban models — a documented, deliberate strategic choice asserting independence from other socialist states' approaches.
      autonomy_need: [65, 0.55, "d", "A"],
      // The same "Chilean path to socialism" framework represents a genuinely original, documented theoretical departure from prevailing socialist models of the period, not an inherited doctrine applied unchanged.
      independent_thinking: [65, 0.55, "d", "A"],
      // Sustained pursuit of the presidency across two decades and, once elected, sustained active governance for three years under severe internal and external pressure.
      leadership_drive: [68, 0.55, "d", "A"],
      // Implemented substantial, systematic nationalization programs covering copper mining and banking, requiring documented policy planning rather than improvised measures.
      planning_orientation: [65, 0.52, "d", "A"],
      // Governed for three years under sustained, escalating internal political conflict and documented external destabilization pressure without abandoning his program, evidenced by the continuity of his policy agenda through that period.
      ambiguity_tolerance: [68, 0.55, "d", "A"],
      // Won the 1970 election and sustained the multi-party Unidad Popular governing coalition despite deep national polarization, inferred from that documented electoral and coalition outcome.
      persuasiveness: [65, 0.5, "s", "A"],
      // His December 1972 address to the UN General Assembly directly and publicly confronted documented US interference in Chilean affairs on an international stage, a specific high-profile assertive act.
      social_assertiveness: [68, 0.55, "d", "A"],
      // Sustained medical training, public-health reform work, and a twenty-year political campaign trajectory implies real sustained discipline, inferred from that overall arc rather than a single cited episode.
      discipline: [58, 0.4, "i", "N"],
      // Built and sustained the Unidad Popular coalition of multiple left-wing parties to achieve his 1970 election win, a specific, documented multi-party collaborative effort.
      collaboration: [60, 0.5, "d", "A"],
      // His early medical thesis addressing the social dimensions of mental illness and criminology suggests intellectual engagement beyond conventional clinical practice, though inferred from that one documented work rather than a broader pattern.
      curiosity: [55, 0.35, "i", "N"],
    },
  },
];

export const ROSTER_26: readonly Person[] = seeds.map(build);
