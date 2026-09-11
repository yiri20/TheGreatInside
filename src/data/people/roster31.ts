/**
 * ROSTER 31 -- fourteen-person zero-politics production batch, eighth
 * real use of the profile-publication / match-eligibility separation
 * architecture (14 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster31.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate -- NOT `toPersonSeed()`
 * directly -- and never checks `computedEligibility.eligible`. All fourteen
 * are `evidence_approved`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * `docs/checkpoints/roster31-fifteen-person-zero-politics-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_ahmed_zewail",
    slug: "ahmed-zewail",
    canonicalName: "Ahmed Zewail",
    birthYear: 1946,
    deathYear: 2016,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["EG", "US"],
    regionCode: "north_africa",
    occupationIds: ["chemist", "scientist"],
    fieldIds: ["chemistry", "physics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["nobel_laureate", "innovator", "founder"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q106624" },
    portrait: {
      url: "/portraits/ahmed-zewail-sfu-2010.jpg",
      source: "Simon Fraser University - University Communications (via Flickr)",
      license: "CC BY 2.0",
      width: 960,
      height: 1448,
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      attribution: "Simon Fraser University - University Communications",
      attributionUrl: "https://www.flickr.com/photos/sfupamr/14339545885/",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_zewail_wikipedia", kind: "wikipedia", title: "Ahmed Zewail", url: "https://en.wikipedia.org/wiki/Ahmed_Zewail" }, { id: "src_zewail_nobel", kind: "award_body", title: "The Nobel Prize in Chemistry 1999 citation and Nobel lecture, for the development of femtochemistry" }, { id: "src_zewail_biography", kind: "biography", title: "Caltech institutional biography and Zewail's own memoir, Voyage Through Time: Walks of Life to the Nobel Prize" }, { id: "src_zewail_science_journal", kind: "press", title: "\"Founder's death unsettles Egypt's science city\" (Science, 2016) and related coverage of Zewail City of Science and Technology's founding, governance model, and funding structure" }, { id: "src_zewail_obama_whitehouse", kind: "institution", title: "Obama White House archive records of Zewail's appointment to the Council of Advisors on Science and Technology and as first US Science Envoy to the Middle East (2009)", url: "https://obamawhitehouse.archives.gov/blog/2016/08/05/dr-ahmed-zewail-1946-2016" }],
    rows: {
      // Developed femtosecond spectroscopy ("femtochemistry"), a genuinely new experimental technique enabling direct observation of the transition states of chemical reactions at the femtosecond timescale, documented directly via the 1999 Nobel Prize citation recognizing this as a foundational new method, not an incremental improvement on existing technique.
      creative_originality: [88, 0.58, "d", "A"],
      // The femtochemistry technique required precise engineering of ultrafast laser pulse sequences to resolve reaction dynamics at previously unobservable timescales, documented via the technical methodology described in his own Nobel lecture and the peer-reviewed research it summarizes.
      analytical_rigor: [84, 0.55, "d", "A"],
      // Two independent, very long-duration documented instances: sustained roughly 12 years of experimental development (from his first pioneering femtosecond experiments in the late 1980s to the 1999 Nobel recognition), and separately sustained the Zewail City of Science and Technology project through roughly 14 years of bureaucratic and political obstruction, from his 1999 proposal until the university finally began admitting students in 2013 (Science, 2016).
      persistence: [82, 0.65, "d", "A"],
      // Two independent, self-initiated documented instances: proposed and drove the founding of Zewail City of Science and Technology in 1999 entirely on his own initiative while still employed full-time at Caltech, with no institutional requirement to do so; and, during Egypt's 2011 revolution, actively returned to Egypt explicitly stating he came "as an Egyptian citizen to help my mother country," distinct from his formal US government roles.
      proactive_agency: [78, 0.6, "d", "A"],
      // Insisted that Zewail City be governed by an independent board of trustees with complete authority over hiring and admissions decisions, a specific, principled structural stance directly against Egypt's prevailing government-controlled university model -- a position that itself caused years of delay before the project could proceed (Science, 2016).
      independent_thinking: [72, 0.55, "d", "A"],
      // [NARROWED on factual gate review, this session] Converging institutional leadership signals across independent contexts: was the first Caltech faculty member named to the Linus Pauling Chair of Chemical Physics (1995), founded and drove an entire university-building project in Egypt over more than a decade, and served in formal US science-diplomacy leadership roles -- member of the Council of Advisors on Science and Technology and one of the first three US Science Envoys to the Muslim world, appointed alongside Elias Zerhouni and Bruce Alberts (both 2009). Narrowed from an earlier "first-ever named Linus Pauling Chair of Chemistry" (the chair's actual name is Chemical Physics, not Chemistry) and "first US Science Envoy to the Middle East" (he was one of three simultaneously-named inaugural envoys to the Muslim world, not the sole or first individual, per Wikipedia's own account of the program's January 2010 launch).
      leadership_drive: [68, 0.48, "s", "A"],
      // Established Zewail City of Science and Technology in Egypt specifically to build scientific research capacity in his country of origin, sustaining this goal for over a decade against significant bureaucratic and political obstruction and insisting on a specific, principled independent-governance structure rather than settling for the fastest available path, documented via the detailed historical record of the project's founding and struggles.
      impact_motivation: [74, 0.55, "d", "N"],
      // Sustained substantial, independently-verifiable engagement across three genuinely distinct domains: pure experimental chemistry research, university/institution-building in Egypt, and formal US government science-diplomacy roles, inferred as real cross-domain range from this documented convergence rather than a single dominant mode.
      cross_domain_range: [64, 0.45, "s", "A"],
      // Continued extending femtochemistry methodology across multiple distinct classes of chemical reactions over roughly a decade of research before the Nobel recognition, AND continued developing new imaging applications (four-dimensional electron microscopy) after the Nobel Prize rather than stopping, inferred as sustained skill development from the documented breadth and continuation of his research program across both periods.
      mastery_orientation: [74, 0.48, "s", "A"],
      // Emigrated from Egypt to the United States for doctoral study with limited resources and progressed to a full Caltech professorship and the Nobel Prize, inferred as sustained exceptional achievement drive from the documented arc of this career trajectory described in his own memoir and Caltech's institutional biography.
      achievement_drive: [78, 0.5, "s", "A"],
      // Extended his core femtochemistry methodology into new domains over his career (biological systems, electron microscopy) rather than remaining within a single narrow application, inferred as sustained intellectual range from the documented breadth of applications he pursued.
      curiosity: [66, 0.4, "i", "N"],
      // [NARROWED on factual gate review, this session] Secured a complex funding structure for Zewail City combining private philanthropic donations (including a documented 100-million-Egyptian-pound gift from businessman Samih Sawiris in 2015) with Egyptian state/government financing, a documented instance of accepting real financial and political risk for a civilian academic institution built during a period of national upheaval. Narrowed from an earlier, more specific "$80 million plus a 1-billion-Egyptian-pound Ministry of Defense loan" claim: those exact figures and the Ministry of Defense attribution could not be independently confirmed against the sources available this session, so the claim is kept to the well-documented mixed private/state funding structure without the unverified numbers.
      risk_tolerance: [60, 0.38, "i", "N"],
    },
  },
  {
    id: "p_dorothy_hodgkin",
    slug: "dorothy-hodgkin",
    canonicalName: "Dorothy Hodgkin",
    birthYear: 1910,
    deathYear: 1994,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["scientist", "chemist"],
    fieldIds: ["chemistry", "biochemistry"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["founder", "systematic_thinker"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q7487" },
    portrait: {
      url: "/portraits/dorothy-hodgkin-pragher-1970.jpg",
      source: "Landesarchiv Baden-Württemberg, Staatsarchiv Freiburg (Sammlung Willy Pragher)",
      license: "CC BY 4.0",
      width: 729,
      height: 1108,
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      attribution: "Landesarchiv Baden-Württemberg, Fotograf: Willy Pragher",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hodgkin_wikipedia", kind: "wikipedia", title: "Dorothy Hodgkin", url: "https://en.wikipedia.org/wiki/Dorothy_Hodgkin" }, { id: "src_hodgkin_nobel", kind: "award_body", title: "NobelPrize.org biographical account of Dorothy Crowfoot Hodgkin", url: "https://www.nobelprize.org/stories/women-who-changed-science/dorothy-hodgkin/" }, { id: "src_hodgkin_royal_society", kind: "institution", title: "Royal Society case study on Dorothy Hodgkin as a scientist with a disability", url: "https://royalsociety.org/about-us/who-we-are/diversity-inclusion/case-studies/scientists-with-disabilities/dorothy-hodgkin/" }, { id: "src_hodgkin_pugwash", kind: "press", title: "Britannica's account of Hodgkin's chairmanship of the Pugwash Conferences on Science and World Affairs (1976-1988)" }],
    rows: {
      // Two independent, very long-duration documented instances: pursued insulin's molecular structure for more than three decades, explicitly describing it as "impossibly complex," before finally resolving it in 1969; and continued active scientific work for decades despite progressively worsening rheumatoid arthritis, rather than retiring.
      persistence: [88, 0.72, "d", "A"],
      // Specifically modified her own laboratory equipment (had a longer lever made for the X-ray machine's main switch) to continue working as her hands deteriorated from rheumatoid arthritis, and adjusted her international conference-travel practices (using a wheelchair, bringing family assistance) rather than withdrawing from the scientific community, documented via the Royal Society's own case study of her career.
      adaptability: [80, 0.65, "d", "A"],
      // Two independent, sustained, formal international leadership roles: chaired the Pugwash Conferences on Science and World Affairs for twelve years (1976-1988), and was a founding figure in the International Union of Crystallography.
      leadership_drive: [78, 0.62, "d", "A"],
      // Solved the complex three-dimensional molecular structures of penicillin (in roughly four years, 17 atoms), insulin (over three decades), and vitamin B12 via X-ray crystallography, documented via the sole 1964 Nobel Prize in Chemistry recognizing this body of work.
      analytical_rigor: [86, 0.6, "d", "A"],
      // Insisted on including Chinese and Soviet scientists in the International Union of Crystallography during the Cold War, directly against the prevailing exclusionary political climate of the era in both the US and UK, documented via the well-corroborated historical record of this specific institutional stance.
      independent_thinking: [74, 0.58, "d", "A"],
      // Built and sustained a lab culture explicitly described by former students as encouraging independence and resisting hierarchy, mentoring numerous students who went on to distinguished independent careers of their own, documented via multiple corroborating accounts of her mentoring style.
      collaboration: [72, 0.55, "d", "A"],
      // Personally encouraged a former student, Margaret Thatcher, to visit the Soviet Union and build rapport with Mikhail Gorbachev in the late 1980s -- a single but very concrete, high-stakes documented instance of direct interpersonal political influence.
      persuasiveness: [66, 0.48, "d", "A"],
      // Deliberately paused her ongoing insulin research to take on penicillin's structure specifically because of its wartime urgency, a self-initiated pivot toward higher-impact work under real-world pressure, converging with her role helping found new international scientific infrastructure (the IUCr) rather than working only within existing institutions.
      proactive_agency: [68, 0.48, "s", "A"],
      // Sustained public political activism against the Vietnam War and nuclear weapons, and advocated for scientific engagement with Cold War adversary nations during a politically charged era, inferred as some real willingness to accept professional/political friction from this documented pattern, scored cautiously given overlap with the independent_thinking row above.
      risk_tolerance: [58, 0.38, "i", "N"],
    },
  },
  {
    id: "p_emilio_segre",
    slug: "emilio-segre",
    canonicalName: "Emilio Segrè",
    birthYear: 1905,
    deathYear: 1989,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IT", "US"],
    regionCode: "north_america",
    occupationIds: ["physicist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: ["nobel_laureate"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q173028" },
    portrait: {
      url: "/portraits/emilio-segre-nobel-1959.jpg",
      source: "Nobel Foundation (official 1959 Nobel Prize photograph)",
      license: "PD-Sweden",
      width: 960,
      height: 1344,
      attribution: "Nobel Foundation",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_es_wikipedia", kind: "wikipedia", title: "Emilio Segrè", url: "https://en.wikipedia.org/wiki/Emilio_Segr%C3%A8" }, { id: "src_es_nas_memoir", kind: "biography", title: "J. David Jackson, \"Emilio Gino Segrè 1905-1989\" -- National Academy of Sciences Biographical Memoir, Vol. 81 (2002)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/segr-emilio.pdf" }, { id: "src_es_encyclopedia", kind: "biography", title: "\"Emilio Segre\" -- Encyclopedia.com", url: "https://www.encyclopedia.com/people/history/historians-miscellaneous-biographies/emilio-segre" }],
    rows: {
      // Jackson's NAS memoir directly describes Segrè as "proud, aloof, and somewhat intimidating," with "an edge to his personality... and his tendency to criticize" that the memoir traces to feeling insufficiently recognized for the technetium discovery -- a specific, sourced, sustained personality pattern rather than a vague trait guess, corroborated by the encyclopedia entry's account of his son describing him as "often remote, preoccupied with work and critical rather than encouraging" and his early nickname "Basilisk" because "his glance made a deep, if not lethal, impression."
      conflict_tolerance: [78, 0.58, "d", "D"],
      // Documented co-discovery of two new chemical elements (technetium, astatine) and the antiproton, for which he shared the 1959 Nobel Prize -- an independently verifiable record across two decades and two different research programs.
      achievement_drive: [80, 0.58, "d", "A"],
      // Documented as speaking up decisively at a contentious 1970 Berkeley lab meeting over splitting the Livermore weapons lab from the pure-science lab -- against his own reputation for caution -- with the specific quoted line "Logic argues for separation... If funding suffers, so be it," which the memoir credits with carrying the vote -- a single, dated, high-stakes institutional decision.
      decisiveness: [75, 0.55, "d", "A"],
      // Documented as leading the Los Alamos group that measured plutonium's spontaneous fission rate (directly enabling the switch to implosion-bomb design) and later as the more "managerial" co-head of the Berkeley antiproton-discovery group, described in the memoir as comfortable delegating execution to trusted associates while retaining final scientific authority.
      leadership_drive: [65, 0.48, "d", "A"],
      // Inferred from his sustained institutional service (20 years editing the Annual Review of Nuclear Science, chairing Fermi's collected-papers editorial board, 30 PhD students trained) rather than from a single documented incident.
      impact_motivation: [55, 0.42, "s", "N"],
      // Documented emigrating from Italy in 1938 specifically because of rising anti-Semitism, arriving as "a visitor" and rebuilding an entire career from a temporary research-associate appointment to a full Berkeley professorship over eight years -- a specific, dated, forced life disruption he adapted to successfully.
      adaptability: [70, 0.5, "d", "A"],
      // Documented switching from an engineering track to physics in 1927 against his father's wishes, after "sneaking into" a physics conference in Como (encyclopedia.com) -- a specific, dated act of pursuing a discouraged path.
      risk_tolerance: [58, 0.42, "d", "N"],
      // Documented keeping notebooks of childhood experiments and reading the popular-science magazine La scienza per tutti as a boy (encyclopedia.com), a specific early data point corroborated by his sustained later career authoring popular histories of physics.
      curiosity: [65, 0.45, "d", "A"],
      // Documented persuading Ernest Lawrence in 1936 to let him take discarded, cyclotron-irradiated parts back to an under-resourced Palermo laboratory specifically to search for undiscovered activity in them -- the resourceful act that directly led to the technetium discovery.
      resourcefulness: [68, 0.45, "d", "A"],
      // Inferred from sustained multi-year pursuit of element 43 across two continents and two lab setups, though the memoir documents the outcome more than a specific persistence incident.
      persistence: [55, 0.4, "i", "N"],
      // Inferred from sustained depth of contribution within nuclear and particle physics across four decades (atomic spectroscopy, slow neutrons, transuranic chemistry, antiproton discovery), documented across both sources.
      mastery_orientation: [70, 0.48, "s", "A"],
    },
  },
  {
    id: "p_enrico_fermi",
    slug: "enrico-fermi",
    canonicalName: "Enrico Fermi",
    birthYear: 1901,
    deathYear: 1954,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IT", "US"],
    regionCode: "southern_europe",
    occupationIds: ["scientist", "physicist"],
    fieldIds: ["physics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["self_taught", "founder", "prodigy"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q8753" },
    portrait: {
      url: "/portraits/enrico-fermi-nara-1940s.jpg",
      source: "US National Archives and Records Administration",
      license: "Public Domain (U.S. federal government work)",
      width: 960,
      height: 1187,
      attribution: "National Archives and Records Administration",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_fermi_wikipedia", kind: "wikipedia", title: "Enrico Fermi", url: "https://en.wikipedia.org/wiki/Enrico_Fermi" }, { id: "src_fermi_cern", kind: "institution", title: "\"Enrico Fermi: genius and giant of science\" (CERN Courier)", url: "https://cerncourier.com/a/enrico-fermi-genius-and-giant-of-science/" }, { id: "src_fermi_trinity_paper", kind: "archive", title: "\"Fermi at Trinity\" (arXiv 2103.05784) and Fermi's own written observations, \"My observations during the explosion at Trinity\"", url: "https://arxiv.org/abs/2103.05784" }, { id: "src_fermi_physicstoday", kind: "press", title: "\"Enrico Fermi in America\" (Physics Today / AIP Publishing) -- documents the 1938 emigration", url: "https://physicstoday.aip.org/features/enrico-fermi-in-america" }, { id: "src_fermi_ahf", kind: "institution", title: "Atomic Heritage Foundation / Nuclear Museum profile of Enrico Fermi -- documents Los Alamos F Division and Chicago Pile-1" }],
    rows: {
      // At the Trinity nuclear test (July 16, 1945), produced a real-time scientific estimate of the bomb's explosive yield by dropping strips of paper into the blast wave and measuring their displacement -- with no instrumentation beyond a piece of paper, he calculated roughly 10 kilotons, within a factor of 2 of the true ~18.6 kiloton yield, documented via his own written observations and independent scholarly reconstruction.
      analytical_rigor: [88, 0.7, "d", "A"],
      // Two independent, major, formal institutional leadership roles: led the team that built and operated Chicago Pile-1, achieving the first controlled, self-sustaining nuclear chain reaction in history (December 2, 1942); and was appointed associate director of the Los Alamos laboratory (September 1944), personally heading one of its four divisions (F Division, named after him) with broad responsibility for nuclear and theoretical physics.
      leadership_drive: [84, 0.68, "d", "A"],
      // At age 10, together with a friend, found and self-taught himself mechanics and astronomy from a dusty 1840 Latin physics textbook, then continued acquiring secondhand physics and mathematics texts on his own initiative through his teens, reaching a thorough understanding of classical physics with no formal instruction by 17 -- documented, sustained, unprompted intellectual curiosity predating any career opportunity.
      curiosity: [82, 0.68, "d", "A"],
      // Worked through Pisa's Scuola Normale Superiore largely self-taught even within formal study, since no Italian-language material existed yet on relativity or quantum theory, requiring him to independently engage foreign-language primary sources rather than wait for instruction to catch up.
      independent_thinking: [78, 0.62, "d", "A"],
      // With his wife Laura threatened by Italy's newly enacted anti-Semitic Racial Laws (September 1938), deliberately used his own Nobel Prize ceremony in Stockholm as unobtrusive cover to permanently emigrate the entire family rather than returning to Italy as expected -- a real, high-stakes life decision made under genuine political danger.
      risk_tolerance: [62, 0.48, "d", "R"],
      // The 1938 emigration was a deliberate, planned use of an existing travel opportunity specifically engineered to avoid suspicion from Italian authorities, rather than a sudden or improvised departure, documented via the well-corroborated historical account of the timing and reasoning behind the trip.
      planning_orientation: [74, 0.55, "d", "A"],
      // Repeatedly and independently described across multiple scholarly retrospectives (CERN Courier, Physics World, a dedicated OSTI publication titled "Experimentalist and Theoretician") as one of the last major physicists to make equally significant contributions to both theoretical and experimental physics, inferred as genuine dual-mode range from this multiply-corroborated characterization, itself considered a rare trait in the field.
      cross_domain_range: [76, 0.55, "s", "A"],
      // Voluntarily agreed with several fellow physicists (Leo Szilard, Herbert Anderson, Walter Zinn) to jointly delay publication of sensitive nuclear-fission findings, a real, coordinated collective decision made under wartime pressure rather than a unilateral one.
      collaboration: [68, 0.5, "d", "A"],
      // Developed and sustained a distinctive pedagogical method (later called "Fermi problems") specifically designed to teach students a transferable reasoning process for estimation under uncertainty, rather than deliver lookup answers, inferred as genuine teaching-impact motivation from this documented, sustained practice.
      impact_motivation: [66, 0.48, "s", "A"],
      // At the tense Trinity test moments before detonation, publicly and jokingly offered colleagues a bet on "whether the atmosphere will be set on fire," directly responding to a real concern raised by Edward Teller -- a single documented instance of using humor to defuse tension in a high-stakes group setting.
      social_assertiveness: [58, 0.35, "i", "N"],
    },
  },
  {
    id: "p_gregor_mendel",
    slug: "gregor-mendel",
    canonicalName: "Gregor Mendel",
    birthYear: 1822,
    deathYear: 1884,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["AT"],
    regionCode: "central_europe",
    occupationIds: ["scientist"],
    fieldIds: ["biology", "genetics"],
    impactDomains: ["scientific", "historical"],
    tagIds: ["founder", "late_recognition", "systematic_thinker"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q37970" },
    portrait: {
      url: "/portraits/gregor-mendel-1862.jpg",
      source: "Wikimedia Commons (pre-1931 photograph, unknown author)",
      license: "PD-US (pre-1931 publication)",
      width: 1000,
      height: 1357,
      attribution: "Unknown photographer, c. 1862",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_mendel_wikipedia", kind: "wikipedia", title: "Gregor Mendel", url: "https://en.wikipedia.org/wiki/Gregor_Mendel" }, { id: "src_mendel_paper", kind: "archive", title: "Mendel's own 1866 paper, Versuche ueber Pflanzen-Hybriden (\"Experiments on Plant Hybridization\")" }, { id: "src_mendel_pnas", kind: "biography", title: "\"Gregor Johann Mendel: From peasant to priest, pedagogue, and prelate\" (PNAS/PMC, 2022) -- scholarly biographical account of his teaching failures, abbacy, and the taxation dispute", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9335201/" }, { id: "src_mendel_nageli_letters", kind: "archive", title: "Mendel's letters to Carl Nageli, 1866-1873, documenting the dismissive reception of his pea-hybridization results and the redirection to Hieracium experiments" }],
    rows: {
      // Designed and executed a controlled breeding experiment across roughly 28,000 pea plants over eight years, tracking seven distinct heritable traits and applying statistical/mathematical analysis to the resulting ratios to infer discrete units of heredity, documented directly via his own 1866 paper's detailed methodology and data.
      analytical_rigor: [92, 0.6, "d", "A"],
      // Systematically tracked and quantified the inheritance patterns of seven distinct pea-plant traits across multiple generations of tens of thousands of individual plants, documented directly via the granular numerical data presented in his own surviving paper.
      detail_orientation: [88, 0.55, "d", "A"],
      // Two independent, dated documented instances: failed teacher certification twice (1850, passing physics but failing zoology orally; 1856, unable to complete the written exam after falling ill), yet continued teaching in an uncertified capacity at the large Brunn Modern School for 13 years (1854-1867); and sustained an unproductive correspondence and redirected Hieracium experiments with Carl Nageli for seven years (1866-1873) despite discouraging results (PNAS/PMC, 2022).
      persistence: [82, 0.72, "d", "A"],
      // A decade-long (1874-1884), principled, materially costly dispute with civil tax authorities: refused, on constitutional grounds and against his own legal advice, the accounting workaround nearly every other monastery used to avoid a new tax on religious income; "stubbornly continued his protests, year after year" even after the state sequestered the monastery's estates in 1876 and after the dispute alienated friends and fellow friars, documented via his own quoted correspondence and the scholarly reconstruction of the dispute's timeline (PNAS/PMC, 2022).
      conflict_tolerance: [80, 0.72, "d", "A"],
      // Two independent documented instances: the same tax dispute (refusing standard institutional practice on principle, against his own legal advice) and his scientific proposal of discrete, particulate units of heredity departing sharply from the prevailing blending-inheritance assumptions of his era, documented via the novelty of this conceptual framework relative to contemporary biological thought.
      independent_thinking: [78, 0.68, "d", "A"],
      // Maintained meticulous meteorological measurements three times daily across multiple monastery locations, sustained over years, documented via his co-founding role in the Austrian Meteorological Society (1865) and the surviving record-keeping practice it required -- a distinct discipline episode from the pea-experiment record-keeping already captured under analytical_rigor/detail_orientation.
      discipline: [74, 0.62, "d", "A"],
      // Elected abbot of the Augustinian abbey at Old Brno in March 1868, a genuine formal leadership role carrying real administrative authority (committees on taxation, land management, agricultural subsidies, and library acquisitions), documented via the historical record of the election and subsequent duties -- moderate score since available sources do not show him actively campaigning for the role, only fully discharging its real responsibilities once elected.
      leadership_drive: [65, 0.55, "d", "N"],
      // Sustained two distinct, well-documented secondary intellectual pursuits alongside his primary botanical research over many years: co-founding the Austrian Meteorological Society and maintaining systematic weather records, and designing and building a custom-designed apiary (1871) specifically for beekeeping research that became, per contemporary accounts, a genuine research site in its own right -- inferred as real range of intellectual interest from this documented convergence of two independent pursuits.
      curiosity: [64, 0.48, "s", "A"],
      // Sustained several substantially different roles across his life -- teacher, ordained priest, experimental botanist, beekeeper, meteorologist, and monastery administrator -- inferred as some real adaptability from the documented breadth of these concurrent or sequential roles, though this is a single broad inference rather than a specific documented switching episode.
      adaptability: [62, 0.42, "i", "N"],
      // Corresponded with leading botanist Carl Nageli for seven years (1866-1873) about his results, a genuine sustained working relationship, but one where Mendel largely deferred to Nageli's redirection toward Hieracium experiments even as this undermined his own stronger original pea results -- a real but genuinely mixed case, not a clearly high-functioning peer collaboration, scored moderately with reduced confidence to reflect that mix.
      collaboration: [52, 0.35, "i", "N"],
      // Designed and had built a custom-designed apiary specifically for his beekeeping research (1871) rather than using an off-the-shelf arrangement, a single documented instance of deliberate advance design for a research purpose, scored cautiously as a single-fact case.
      planning_orientation: [58, 0.35, "i", "N"],
      // Was reassigned away from parish/sick-visitation duties (1847-1849) after a documented specific difficulty in that particular interpersonal context, and never held a comparable pastoral role again -- scored as a single, narrowly-scoped behavioral fact about one specific role, not a broader characterization of his temperament, which contemporary accounts otherwise describe as friendly and well liked.
      social_assertiveness: [40, 0.32, "i", "N"],
    },
  },
  {
    id: "p_homi_bhabha",
    slug: "homi-bhabha",
    canonicalName: "Homi J. Bhabha",
    birthYear: 1909,
    deathYear: 1966,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["physicist"],
    fieldIds: ["physics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["founder", "organizer", "prodigy"],
    archetypeIds: ["scientific_explorer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q325611" },
    portrait: {
      url: "/portraits/homi-bhabha-oberwolfach.jpg",
      source: "Oberwolfach Photo Collection",
      license: "CC BY-SA 2.0 DE",
      width: 288,
      height: 400,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/de/",
      attribution: "Konrad Jacobs, Erlangen / Oberwolfach Photo Collection",
      attributionUrl: "https://opc.mfo.de/detail?photo_id=332",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_bhabha_wikipedia", kind: "wikipedia", title: "Homi J. Bhabha", url: "https://en.wikipedia.org/wiki/Homi_J._Bhabha" }, { id: "src_bhabha_tifr", kind: "institution", title: "Tata Institute of Fundamental Research's own institutional history of its 1945 founding under Bhabha's direction" }, { id: "src_bhabha_biography", kind: "biography", title: "Historical accounts of Bhabha's role in founding India's nuclear energy program and the Atomic Energy Commission of India, and the circumstances of his death in the 1966 Air India Flight 101 crash" }],
    rows: {
      // Founded and directed the Tata Institute of Fundamental Research (1945) AND was appointed founding chairman of the Atomic Energy Commission of India (1948), documented via both institutions' own institutional records of their founding under his direct leadership.
      leadership_drive: [86, 0.55, "d", "A"],
      // Returned from a promising academic physics career in Britain to newly independent India specifically to build fundamental research capacity there, and persuaded industrialist J.R.D. Tata and the Indian government separately to fund the new research institute, inferred as recognizing and acting on a genuine institutional opportunity from the convergence of these two independently-documented events.
      opportunity_sensing: [78, 0.48, "s", "A"],
      // Built India's entire fundamental physics research and nuclear energy institutional infrastructure essentially from scratch within roughly two decades, inferred as exceptional achievement drive from the documented scale of these institution-building efforts relative to the short time available before his death in 1966.
      achievement_drive: [80, 0.5, "s", "A"],
      // Secured sustained private and government funding for a major new research institution in a newly independent country with limited existing resources, inferred as real persuasive skill from the documented success of these fundraising and advocacy efforts.
      persuasiveness: [74, 0.45, "i", "A"],
      // Published original theoretical physics work on cosmic ray showers and quantum electrodynamics (the Bhabha scattering process is named for him) before shifting primarily to institution-building, inferred from the documented technical content and continued citation of this early published research.
      analytical_rigor: [72, 0.42, "i", "A"],
      // Designed India's nuclear program around a specific, integrated three-stage strategic plan for long-term fuel self-sufficiency, inferred as strong systems-level planning from the documented structure of this long-range institutional strategy.
      systems_abstraction: [65, 0.4, "i", "A"],
      // Pursued serious painting and art collecting alongside his scientific and institutional career, personally curating art for the institutions he built, inferred as some real range of interest beyond physics from this documented parallel activity.
      curiosity: [55, 0.4, "i", "N"],
      // Worked directly with industrialist J.R.D. Tata to jointly secure private funding for TIFR's founding, documented via the well-corroborated institutional record of this specific funding partnership.
      collaboration: [58, 0.4, "d", "N"],
      // Designed India's nuclear program around an explicit, sequenced three-stage long-term plan spanning natural uranium, plutonium, and thorium fuel cycles, inferred as requiring substantial advance strategic planning from the documented, multi-decade structure of this program design.
      planning_orientation: [70, 0.4, "i", "A"],
    },
  },
  {
    id: "p_linus_pauling",
    slug: "linus-pauling",
    canonicalName: "Linus Pauling",
    birthYear: 1901,
    deathYear: 1994,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["chemist", "activist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "social"],
    tagIds: ["nobel_laureate", "generalist", "nonconformist"],
    archetypeIds: ["scientific_explorer", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q48983" },
    portrait: {
      url: "/portraits/linus-pauling-pragher-1977.jpg",
      source: "Landesarchiv Baden-Württemberg, Staatsarchiv Freiburg (Sammlung Willy Pragher)",
      license: "CC BY 3.0 DE",
      width: 662,
      height: 1000,
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/de/",
      attribution: "Landesarchiv Baden-Württemberg, Fotograf: Willy Pragher",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_lp_wikipedia", kind: "wikipedia", title: "Linus Pauling", url: "https://en.wikipedia.org/wiki/Linus_Pauling" }, { id: "src_lp_nas_memoir", kind: "biography", title: "Jack D. Dunitz, \"Linus Carl Pauling 1901-1994\" -- National Academy of Sciences Biographical Memoir (1997)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/pauling-linus.pdf" }, { id: "src_lp_encyclopedia", kind: "biography", title: "\"Linus Carl Pauling\" -- Encyclopedia.com (Complete Dictionary of Scientific Biography)", url: "https://www.encyclopedia.com/people/science-and-technology/chemistry-biographies/linus-carl-pauling" }],
    rows: {
      // Dunitz's NAS memoir documents formative contributions across quantum-chemistry bonding theory, protein structure, molecular-model-building as a laboratory tool, disease-as-molecular-process (sickle-cell anemia), and public political activism -- five genuinely distinct domains, not a reputation gloss.
      cross_domain_range: [92, 0.68, "d", "A"],
      // Documented origination of the resonance theory of the chemical bond and physical molecular models as a working scientific tool, corroborated independently by the encyclopedia entry's account of his formative role in five separate twentieth-century scientific developments.
      creative_originality: [88, 0.62, "d", "A"],
      // Inferred from sustained X-ray crystallography structure-determination work described in the NAS memoir; the same rigor is what let him recognize, and publicly retract, his own DNA triple-helix model once its flaws were pointed out.
      analytical_rigor: [82, 0.55, "s", "A"],
      // Documented moment of intellectual humility in the NAS memoir: on seeing Franklin and Wilkins's data disproving his DNA triple-helix model, Pauling reportedly said only that he had made a mistake -- real but narrow, and the DNA episode itself shows the cost of publishing under real uncertainty.
      ambiguity_tolerance: [55, 0.45, "d", "D"],
      // Documented sustained public advocacy of megadose vitamin C therapy against near-unanimous medical-establishment rejection for the rest of his career (Dunitz memoir), continuing well past the point of professional cost -- scored dual-edged given the therapy's contested/unproven status.
      risk_tolerance: [68, 0.55, "d", "D"],
      // Documented in the NAS memoir: dismissal of and subsequent lawsuits involving Arthur Robinson, a former collaborator, over the vitamin C research program -- a real, sustained interpersonal/legal conflict. The encyclopedia entry separately documents Pauling joining other Caltech faculty in denying employment or promotion to colleagues with religious affiliations in the 1930s-40s, a documented instance of the same willingness to act on conflict crossing into discriminatory conduct -- scored dual-edged, not simply advantage, to avoid rewarding this.
      conflict_tolerance: [60, 0.5, "d", "D"],
      // Documented refusal of Oppenheimer's 1943 invitation to join the Manhattan Project, remaining at Caltech instead (encyclopedia.com) -- a specific, dated, named decision to pursue his own research direction over the era's most prestigious wartime scientific appointment.
      independent_thinking: [78, 0.55, "d", "A"],
      // Documented childhood hardship: his father, a struggling druggist, died in 1910; his mother, chronically ill, ran a boardinghouse; all three children worked from an early age (encyclopedia.com). Pauling could not afford to continue past his sophomore year at Oregon Agricultural College until the department itself hired him to teach a course, at $100/month, so he could return.
      persistence: [80, 0.55, "d", "A"],
      // Directly documented: unable to afford tuition, Pauling secured a teaching appointment from his own department at the last minute specifically to fund his return to school -- a concrete, dated resourceful act under real financial constraint, not a general trait inference.
      resourcefulness: [72, 0.48, "d", "A"],
      // The only individual to receive two unshared Nobel Prizes (Chemistry 1954, Peace 1962), a specific and independently verifiable record cited in both sources.
      achievement_drive: [88, 0.6, "d", "A"],
      // Inferred from the sustained, decades-long depth of contribution within chemistry (bonding theory through protein structure) that the NAS memoir documents, rather than breadth alone.
      mastery_orientation: [80, 0.52, "s", "A"],
      // Inferred from the same documented Manhattan Project refusal and his sustained pursuit of the vitamin C program alone against consensus opposition -- a real but narrower data point than a fully independent second incident would give.
      autonomy_need: [65, 0.45, "s", "A"],
      // Inferred from his documented decades of public political activism and lecturing (both sources), which required a sustained public-facing posture, though neither source gives a specific interpersonal incident to score more confidently.
      social_assertiveness: [62, 0.42, "i", "N"],
      // Inferred from his documented invention of physical molecular-model-building as a working laboratory method (Dunitz memoir), though the memoir describes the outcome more than the iterative process itself.
      experimentation: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_luis_alvarez",
    slug: "luis-alvarez",
    canonicalName: "Luis Alvarez",
    birthYear: 1911,
    deathYear: 1988,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["physicist", "inventor"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "innovation"],
    tagIds: ["nobel_laureate", "generalist", "prolific"],
    archetypeIds: ["scientific_explorer", "technical_innovator"],
    externalIdentity: { wikidataId: "Q178344" },
    portrait: {
      url: "/portraits/luis-alvarez-lbnl-doe-1969.jpg",
      source: "US National Archives / Lawrence Berkeley National Laboratory / Department of Energy",
      license: "Public Domain (U.S. federal government work)",
      width: 960,
      height: 1243,
      attribution: "Lawrence Berkeley National Laboratory / Department of Energy",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_la_wikipedia", kind: "wikipedia", title: "Luis Walter Alvarez", url: "https://en.wikipedia.org/wiki/Luis_Walter_Alvarez" }, { id: "src_la_nas_memoir", kind: "biography", title: "W. Peter Trower, \"Luis Walter Alvarez 1911-1988\" -- National Academy of Sciences Biographical Memoir (2009)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/alvarez-luis-w.pdf" }, { id: "src_la_encyclopedia", kind: "biography", title: "\"Luis Walter Alvarez\" -- Encyclopedia.com (Complete Dictionary of Scientific Biography)", url: "https://www.encyclopedia.com/people/science-and-technology/physics-biographies/luis-walter-alvarez" }],
    rows: {
      // Trower's NAS memoir documents that on arriving at the Rad Lab "spectacularly unqualified" to contribute, Alvarez read every published nuclear-physics journal article in the physics library within a year, discovering that important papers could be spotted by the darkened, fingered edges of their pages -- a specific, dated, self-directed learning episode, corroborated independently by the encyclopedia entry's account of the same period.
      curiosity: [88, 0.62, "d", "A"],
      // Documented eidetic recall demonstrated when the memoir's author casually mentioned an obscure paper and Alvarez recounted its content, the page a key graph appeared on, and where on the page to find it -- a specific, witnessed incident, not a general reputation claim.
      mastery_orientation: [92, 0.68, "d", "A"],
      // Documented invention of Ground Control Approach radar landing, the Microwave Early Warning system, the VIXEN anti-submarine deception radar, the hydrogen bubble chamber design, and the extraterrestrial-impact explanation for the K-T mass extinction -- five separately documented, unrelated inventions across a five-decade career.
      creative_originality: [90, 0.62, "d", "A"],
      // Inferred from his repeated pursuit of speculative, likely-to-fail projects late in career (magnetic monopole search, pyramid-chamber search, balloon-borne antiparticle spectrometer that ultimately fell into the Pacific), documented in the NAS memoir as producing negative results more often than positive ones.
      risk_tolerance: [62, 0.48, "s", "D"],
      // Documented pivot from a stalled pre-war nuclear-physics research program (abandoned when the Materials Testing Accelerator project collapsed and left him "exhausted and dispirited") to becoming, within a few years and after his own students tutored him in an unfamiliar field, the leader of the bubble-chamber program that won him the Nobel Prize -- a specific, dated professional reinvention following a real documented setback.
      adaptability: [75, 0.55, "d", "A"],
      // Documented as having no commitment to intellectual consistency and readily abandoning yesterday's enthusiasm for a new one (memoir, direct quote from a colleague), which the memoir itself frames as the opposite of dogged persistence on any single idea -- scored moderately, not high, to reflect this documented pattern honestly rather than assuming persistence from his overall output.
      persistence: [58, 0.42, "d", "N"],
      // Documented publicly and personally demolishing colleagues' wrong results (e.g. Buford Price's magnetic monopole claim, Dewey McLean's volcanism explanation for the K-T extinction), and separately that his post-war falling-out with lab director McMillan directly caused his resignation as associate director -- two distinct, dated interpersonal-conflict incidents from the same source.
      conflict_tolerance: [65, 0.5, "d", "D"],
      // Documented building and directing a bubble-chamber research group of several hundred physicists, engineers, technicians, and programmers, while deliberately declining co-authorship credit he felt he had not earned -- a documented leadership style, not an assumed one.
      leadership_drive: [70, 0.5, "d", "A"],
      // Documented reluctance to be listed as a coauthor on papers even when he had contributed to the analysis, for fear of overshadowing junior colleagues -- a specific, sourced trait that complicates rather than confirms a simple high achievement-drive reading, scored accordingly.
      achievement_drive: [60, 0.42, "d", "N"],
      // Documented substantive work across cosmic-ray physics, wartime radar engineering, nuclear-weapon design at Los Alamos, particle-detector instrumentation, ophthalmic optics (a commercial autorefractor), forensic film analysis (the Zapruder film), Egyptology (pyramid muon scans), and paleontology (K-T extinction) -- an unusually verified breadth, all independently documented in the NAS memoir.
      cross_domain_range: [85, 0.58, "d", "A"],
      // Inferred from his documented practice of sitting with students and postdocs at lunch rather than senior staff, and being reachable by anyone with a complaint -- a real but narrow interpersonal data point.
      social_assertiveness: [55, 0.4, "i", "N"],
      // Documented immediately recognizing the significance of Don Glaser's bubble-chamber observation for physics research and specifying, on the spot, the three requirements (hydrogen liquid, large volume, automated analysis) that became the winning design -- a specific, dated recognition-of-opportunity incident.
      opportunity_sensing: [72, 0.48, "d", "A"],
      // Inferred from the documented pattern of vetting an idea quickly with trusted colleagues before either abandoning or fully committing to it, though this is described more as a testing habit than a single decisive act.
      decisiveness: [60, 0.42, "i", "N"],
    },
  },
  {
    id: "p_maria_goeppert_mayer",
    slug: "maria-goeppert-mayer",
    canonicalName: "Maria Goeppert Mayer",
    birthYear: 1906,
    deathYear: 1972,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["DE", "US"],
    regionCode: "north_america",
    occupationIds: ["physicist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: ["nobel_laureate"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q57100" },
    portrait: {
      url: "/portraits/maria-goeppert-mayer-nobel-1963.jpg",
      source: "Nobel Foundation (official 1963 Nobel Prize photograph)",
      license: "PD-Sweden",
      width: 280,
      height: 396,
      attribution: "Nobel Foundation",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_mgm_wikipedia", kind: "wikipedia", title: "Maria Goeppert Mayer", url: "https://en.wikipedia.org/wiki/Maria_Goeppert_Mayer" }, { id: "src_mgm_nas_memoir", kind: "biography", title: "Robert G. Sachs, \"Maria Goeppert Mayer 1906-1972\" -- National Academy of Sciences Biographical Memoir (1979)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/mayer-maria.pdf" }, { id: "src_mgm_encyclopedia", kind: "biography", title: "\"Maria Goeppert Mayer\" -- Encyclopedia.com", url: "https://www.encyclopedia.com/people/science-and-technology/physics-biographies/maria-goeppert-mayer" }],
    rows: {
      // Both sources document nine years without a regular academic appointment at Johns Hopkins, working under a nepotism rule that barred hiring her alongside her husband, sustained on a "very modest assistantship" with no title -- a specific, dated, prolonged institutional obstacle she worked through rather than around.
      persistence: [82, 0.58, "d", "A"],
      // Directly documented in the NAS memoir: when Fermi, on his way out of her office to take a phone call, asked whether there was any indication of spin-orbit coupling, she "immediately realized that was the answer," with Fermi himself surprised at how quickly she connected it -- a specific, witnessed, dated incident of rapid synthesis that led directly to the nuclear shell model.
      intuitive_synthesis: [88, 0.6, "d", "A"],
      // Documented quoted childhood remark, responding to her father's discouragement of domesticity: "I wasn't going to be just a woman" -- and her own account that he was "more interesting" than her mother "because he was a scientist" -- two specific, sourced early statements shaping her orientation toward science.
      curiosity: [65, 0.45, "d", "A"],
      // Documented pivot at Columbia's SAM Laboratory during WWII, described by the encyclopedia entry as "a turning point in her career" because she was for the first time working without her husband's emotional support and bore independent responsibility for supervising others -- a specific, dated professional shift under real personal pressure.
      adaptability: [78, 0.52, "d", "A"],
      // Documented mixed feelings about wartime uranium-isotope-separation work that "turned to distaste" over time (encyclopedia.com) -- a specific, sourced instance of continuing ethically uncomfortable work rather than stepping away from it, scored dual-edged rather than a simple advantage.
      risk_tolerance: [55, 0.42, "d", "D"],
      // Documented preference for matrix mechanics over the more commonly taught Schroedinger wave mechanics, and her own description of viewing physical theories "as tools for solving physics problems," unconcerned with their philosophical structure -- a specific, sourced intellectual stance distinct from her contemporaries.
      independent_thinking: [70, 0.48, "d", "A"],
      // Documented suffering a stroke shortly after finally receiving a full, regular professorship at UC San Diego in 1960, leaving an arm paralyzed, yet continuing to teach and publish (including a 1966 review article) until her death in 1972 -- a specific, dated setback she continued working through.
      discipline: [60, 0.42, "d", "A"],
      // Documented as the second woman to win the Nobel Prize in Physics, achieved from a voluntary/part-time appointment rather than a full professorship at the time of the discovery -- an independently verifiable, unusually constrained-circumstance achievement.
      achievement_drive: [75, 0.5, "d", "A"],
      // Inferred from her documented role directing thesis students and lecturing at the Institute for Nuclear Studies, though the memoir describes her lecturing style (dense, technical, little background context) more than interpersonal assertiveness specifically.
      social_assertiveness: [50, 0.38, "i", "N"],
      // Inferred from documented substantive contributions across double-photon quantum theory, chemical-physics lattice theory (with Max Born), wartime isotope-separation chemistry, and nuclear shell structure -- genuinely distinct subfields, though thinner in behavioral specificity than the shell-model episode itself.
      cross_domain_range: [62, 0.45, "s", "A"],
    },
  },
  {
    id: "p_michael_faraday",
    slug: "michael-faraday",
    canonicalName: "Michael Faraday",
    birthYear: 1791,
    deathYear: 1867,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["scientist"],
    fieldIds: ["physics", "chemistry"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["self_taught", "founder", "systematic_thinker"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q8750" },
    portrait: {
      url: "/portraits/michael-faraday-1850s.jpg",
      source: "Wikimedia Commons (UK photograph, author unknown)",
      license: "PD-UK-unknown",
      width: 960,
      height: 1269,
      attribution: "Unknown photographer, c. 1850s",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_faraday_wikipedia", kind: "wikipedia", title: "Michael Faraday", url: "https://en.wikipedia.org/wiki/Michael_Faraday" }, { id: "src_faraday_forgottenscience_plagiarism", kind: "press", title: "\"When Young Faraday's First Discovery Led to Charges of Plagiarism\" -- documents the 1821 electromagnetic-rotation dispute with Davy and Wollaston", url: "https://forgottenscience.org/view/when-young-faradays-first-discovery-led-to-charges-of-plagiarism" }, { id: "src_faraday_rigb", kind: "institution", title: "Royal Institution's own biography of Michael Faraday", url: "https://www.rigb.org/explore-science/explore/person/michael-faraday-1791-1867" }, { id: "src_faraday_illness_journal", kind: "biography", title: "\"Michael Faraday's loss of memory revisited\" (Journal of the History of the Neurosciences, 2020) -- documents his 1839-1844 illness-driven research interruption" }],
    rows: {
      // Maintained systematic, detailed laboratory notebooks and diaries across his entire experimental career, later published as seven volumes with an index, documented via the well-corroborated historical record of this sustained record-keeping practice.
      discipline: [84, 0.7, "d", "A"],
      // Two independent documented instances: worked through a full seven-year bookbinding apprenticeship, entirely unrelated to science, before breaking into the field at all; and returned to active scientific research (1844-1845) after a roughly three-year interruption following a documented 1839 illness, rather than retiring from science.
      persistence: [80, 0.65, "d", "A"],
      // Multiple independent documented instances of prioritizing personal principle over conventional institutional reward: declined the Presidency of the Royal Society on two separate occasions, and refused to profit from patents on his own inventions on religious/ethical grounds, sustained across decades.
      autonomy_need: [76, 0.62, "d", "A"],
      // Developed foundational experimental discoveries in electromagnetism with no formal mathematical training, relying on his own physical intuition and experimental method rather than the mathematically-formalized approach dominant among contemporary physicists, documented via the well-corroborated historical account of his working method and its later mathematical formalization by others (notably Maxwell).
      independent_thinking: [76, 0.58, "d", "A"],
      // After being publicly accused of plagiarism by his own mentor, Humphry Davy, within a week of his 1821 electromagnetic-rotation discovery -- with Davy then casting the sole vote against his Royal Society nomination -- Faraday deliberately withdrew from electromagnetism research for nearly a decade until Davy's death, documented via the well-corroborated historical record of both the dispute and the withdrawal. Scored on the low side deliberately: the documented response to sustained professional conflict here was withdrawal, not continued engagement.
      conflict_tolerance: [42, 0.55, "d", "D"],
      // Rose from an uneducated bookbinding apprentice to one of the most significant experimental scientists of his era, sustaining major discovery output across four decades (electromagnetic rotation 1821, electromagnetic induction 1831, continued research into the 1850s), inferred as sustained exceptional achievement drive from this documented career arc.
      achievement_drive: [78, 0.55, "s", "A"],
      // [NARROWED on factual gate review, this session] Personally founded the Royal Institution's Christmas Lectures and delivered a large number of them himself across multiple decades (1827-1861), specifically to make science accessible to young, non-specialist audiences, documented via the Royal Institution's own record of the series and its lecture list. Narrowed from an earlier, more specific "19 lectures, the most given by any single individual" claim: the exact total and the superlative comparison against every other lecturer in the series' 200-year history could not be independently confirmed against the sources available this session, so the claim is kept to what is well-documented -- a sustained, repeated, deliberate public-education commitment -- without the unverified count or superlative.
      impact_motivation: [74, 0.6, "d", "A"],
      // Taught himself the foundations of science by reading books brought to him for rebinding during his apprenticeship, with no formal schooling, then attended a public lecture series purely as an audience member and wrote up detailed illustrated notes on his own initiative before any relationship with Davy existed -- documented via the well-corroborated account of his path into science.
      curiosity: [68, 0.55, "d", "A"],
      // Sent Humphry Davy a meticulously illustrated, detailed set of notes from his lecture series, complete with his own drawings of the apparatus, as an unsolicited job application -- a single but very concrete documented instance that directly led to his hiring.
      detail_orientation: [66, 0.5, "d", "A"],
    },
  },
  {
    id: "p_robert_falcon_scott",
    slug: "robert-falcon-scott",
    canonicalName: "Robert Falcon Scott",
    birthYear: 1868,
    deathYear: 1912,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["explorer", "military_leader"],
    fieldIds: ["exploration", "military"],
    impactDomains: ["historical", "educational"],
    tagIds: ["explorer", "leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q102527" },
    portrait: {
      url: "/portraits/robert-falcon-scott-loc-bain-1900.jpg",
      source: "Library of Congress, George Grantham Bain collection (Bain News Service)",
      license: "No known restrictions on publication (LOC)",
      width: 960,
      height: 1307,
      attribution: "Bain News Service, Library of Congress",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_rfs_journal", kind: "archive", title: "Robert Falcon Scott, Scott's Last Expedition, Volume I (his own journals of the Terra Nova expedition, 1910-1912)", url: "https://www.gutenberg.org/cache/epub/11579/pg11579-images.html" }, { id: "src_rfs_cherrygarrard", kind: "biography", title: "Apsley Cherry-Garrard, The Worst Journey in the World (1922) — independent eyewitness memoir by a Terra Nova expedition member", url: "https://www.gutenberg.org/files/14363/14363-h/14363-h.htm" }, { id: "src_rfs_wikipedia", kind: "wikipedia", title: "Robert Falcon Scott", url: "https://en.wikipedia.org/wiki/Robert_Falcon_Scott" }],
    rows: {
      // When the ship's engine-room fires were flooded during a storm and the engineer declared himself beaten, Scott's own journal documents that he organized bucket brigades and ordered the bulkhead cut through to clear pump suctions rather than accept the engineer's assessment — one specific, dated crisis decision, directly self-authored.
      decisiveness: [66, 0.55, "d", "A"],
      // The same storm episode (bucket brigades, cutting the bulkhead) shows improvisation under a specific equipment failure, but this is a single episode without independent corroboration, so capped at inference rather than documented.
      resourcefulness: [60, 0.48, "i", "A"],
      // Cherry-Garrard's independent account credits Scott specifically with organizational leadership strength ("for a joint scientific and geographical piece of organization, give me Scott") as a comparative assessment against other polar leaders (Wilson, Amundsen), converging with Scott's own crisis-management journal entries — two independent sources on the same trait.
      leadership_drive: [58, 0.5, "s", "N"],
      // Scott's own journal documents deliberate patience under pack-ice delay, weighing coal consumption against pony welfare rather than forcing progress ("I should certainly contemplate waiting... if it weren't for the ponies"), and Cherry-Garrard independently documents Scott undertaking "a winter of drastic reorganization" of food/clothing/systems after the Discovery expedition's first chaotic season — two independently-sourced instances of considered, systematic planning.
      planning_orientation: [60, 0.5, "s", "A"],
      // Scott's own journal frankly admits uncertainty ("I really don't know what to think of the pack, or when to hope for open water") while continuing methodical observation — soundings, temperature readings, sketching — rather than treating the confusion as reason for paralysis or panic, a directly self-authored account.
      ambiguity_tolerance: [62, 0.5, "d", "A"],
      // The same pack-ice passage shows sustained systematic data-gathering (soundings, temperatures) under uncertainty, but this is a single documented episode without a second corroborating instance, so kept at inference level.
      analytical_rigor: [55, 0.42, "i", "A"],
      // Cherry-Garrard documents Scott's collaborative working relationship with the scientist Hooker during the Discovery voyage, noted as involving "occasional friction" alongside mutual respect — one independent account, not corroborated elsewhere this cycle, hence inference rather than strong_inference.
      collaboration: [55, 0.45, "i", "A"],
      // Scott's own journal records close, specific attention to crew morale during the storm (noting officers and men "singing chanties over their arduous work," that "not a single one has lost his good spirits") — a single self-authored observation of morale-monitoring, not independently corroborated, so scored at inference.
      social_assertiveness: [52, 0.4, "i", "N"],
      // The same Hooker relationship ("occasional friction" tolerated within an otherwise-collaborative partnership) is the only evidence for this row — thin, single-source, hence low confidence and the unremarkable-band default score rather than a directional lean.
      conflict_tolerance: [50, 0.35, "i", "N"],
      // Cherry-Garrard's account of the Discovery expedition's first season being organizationally chaotic ("food, clothing, everything was wrong, the whole system was bad"), followed by wholesale reorganization before the next season, documents a response to failure but rests on one biographer's narrative summary rather than a directly quoted decision, hence inference.
      adaptability: [58, 0.45, "i", "A"],
      // The same post-failure reorganization implies Scott revised his operating assumptions after the first season's results, but this is inferred from the outcome (a rebuilt system) rather than a documented account of the reasoning process itself.
      belief_updating: [56, 0.35, "i", "A"],
      // Cherry-Garrard characterizes the expedition's working ethos, which Scott set as commander, as "doing our jobs as well as we were able just because we wished to do them well" — a single biographer's characterization of a collective culture, credited to Scott's leadership but not a directly quoted statement of his own.
      mastery_orientation: [58, 0.4, "i", "A"],
      // The same professional-ethos characterization suggests a standards-driven orientation, but is a thin, single, indirect signal — kept near the unremarkable band rather than scored as a strong lean.
      achievement_drive: [52, 0.3, "i", "N"],
      // Widely corroborated historical record (Scott's final "Message to the Public" and diary, continuing to write until his death, and the decision to stand by Oates rather than abandon him for speed) supports sustained persistence under fatal conditions, but the specific final-days passages were located this cycle via secondary citation of the diary rather than a direct fetch of that exact passage from the primary text, so this row is capped at inference despite the underlying source being one already opened for other rows.
      persistence: [62, 0.3, "i", "A"],
    },
  },
  {
    id: "p_rosalyn_yalow",
    slug: "rosalyn-yalow",
    canonicalName: "Rosalyn Yalow",
    birthYear: 1921,
    deathYear: 2011,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["physicist", "medical_researcher"],
    fieldIds: ["natural_science", "medicine"],
    impactDomains: ["scientific", "medical"],
    tagIds: ["nobel_laureate"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q107402" },
    portrait: {
      url: "/portraits/rosalyn-yalow-usia-1977.jpg",
      source: "United States Information Agency",
      license: "Public Domain (U.S. federal government work)",
      width: 960,
      height: 639,
      attribution: "United States Information Agency",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ry_wikipedia", kind: "wikipedia", title: "Rosalyn Sussman Yalow", url: "https://en.wikipedia.org/wiki/Rosalyn_Sussman_Yalow" }, { id: "src_ry_pmc_madame_curie", kind: "press", title: "\"Rosalyn Yalow (1921-2011): Madame Curie from the Bronx\" -- PMC (NIH), reproducing an obituary/tribute drawing on her own autobiographical account", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6658655/" }, { id: "src_ry_encyclopedia", kind: "biography", title: "\"Rosalyn Sussman Yalow\" -- Encyclopedia.com", url: "https://www.encyclopedia.com/people/medicine/medicine-biographies/rosalyn-sussman-yalow" }],
    rows: {
      // Documented explicit, quoted rejections from graduate physics programs on the stated grounds "She is from New York. She is Jewish. She is a woman," and a department chair's dismissal of her near-perfect coursework record with "That A- confirms that women do not do well at laboratory work" (PMC source) -- two specific, dated, directly quoted discriminatory incidents she worked through rather than around.
      conflict_tolerance: [78, 0.58, "d", "A"],
      // Documented response to the same graduate-school rejections: rather than accept them, she enrolled in stenography courses and took secretarial work at Columbia specifically to stay adjacent to research until a graduate position opened at the University of Illinois -- a concrete, dated persistence strategy, not a general trait claim.
      persistence: [80, 0.58, "d", "A"],
      // Documented refusal to patent the radioimmunoassay technique she co-developed, quoted as saying "Patents are about keeping things away from people for the purpose of making money" (PMC source) -- a specific, dated act forgoing substantial personal financial gain on principle, scored dual-edged given the real cost.
      risk_tolerance: [72, 0.52, "d", "D"],
      // Documented declining the 1978 Ladies' Home Journal Woman of the Year award, writing to the editor that sex-restricted awards are "inconsistent and unwise" -- a specific, dated, named public stance against a form of recognition many would have simply accepted.
      independent_thinking: [75, 0.55, "d", "A"],
      // Documented as the first female physics graduate student at the University of Illinois in nearly 40 years, later the second woman to win the Nobel Prize in Physiology or Medicine, for a technique (radioimmunoassay) whose foundational paper was initially rejected by both Science and the Journal of Clinical Investigation before publication in 1959 -- an independently verifiable record of achievement against documented, specific resistance.
      achievement_drive: [78, 0.55, "d", "A"],
      // Documented 22-year research partnership with Solomon Berson until his death in 1972, described in the encyclopedia entry as explicitly complementary in skillset ("Berson wanted to be a physicist, and I wanted to be a medical doctor") -- a specific, sustained, named collaborative relationship.
      collaboration: [68, 0.48, "d", "A"],
      // Documented working as the sole female engineer/physicist in workplaces with hundreds of male colleagues at both the University of Illinois College of Engineering (400 professors) and the Federal Telecommunications Laboratory (encyclopedia.com) -- a specific, sustained, isolating professional environment she operated within for years.
      adaptability: [65, 0.45, "d", "A"],
      // Documented pivot into stenography/secretarial training specifically as a means of staying near research work after graduate programs rejected her -- the same incident scored above for persistence, also read as a resourceful workaround under real constraint.
      resourcefulness: [55, 0.4, "d", "A"],
      // Inferred from her documented refusal to patent radioimmunoassay specifically so it could be freely used across medicine, though the PMC source frames this primarily as a statement of principle rather than a fully developed motivational profile.
      impact_motivation: [60, 0.42, "i", "A"],
    },
  },
  {
    id: "p_sofia_kovalevskaya",
    slug: "sofia-kovalevskaya",
    canonicalName: "Sofia Kovalevskaya",
    birthYear: 1850,
    deathYear: 1891,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["RU", "SE"],
    regionCode: "central_europe",
    occupationIds: ["mathematician", "writer"],
    fieldIds: ["mathematics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["founder", "systematic_thinker"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q184535" },
    portrait: {
      url: "/portraits/sofia-kovalevskaya-1888.jpg",
      source: "Wikimedia Commons (likely Mittag-Leffler Institute collection)",
      license: "PD (life+70, author unknown)",
      width: 345,
      height: 420,
      attribution: "Unknown photographer, 1888",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_kovalevskaya_wikipedia", kind: "wikipedia", title: "Sofya Kovalevskaya", url: "https://en.wikipedia.org/wiki/Sofya_Kovalevskaya" }, { id: "src_kovalevskaya_mactutor", kind: "biography", title: "MacTutor History of Mathematics (University of St Andrews) biography of Sofia Kovalevskaya", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Kovalevskaya/" }, { id: "src_kovalevskaya_own_writing", kind: "archive", title: "Kovalevskaya's own memoir A Russian Childhood, her novel The Nihilist Girl, and her 1866 doctoral papers including the Cauchy-Kovalevskaya theorem" }],
    rows: {
      // Two independent, strong documented instances: solved a difficult test problem set by Karl Weierstrass within a week, directly changing his initial refusal to teach a woman into four years of private tutorship, and later discovered the "Kovalevskaya top" -- a genuinely new class of solvable rigid-body motion -- recognized by an independent prize committee (MacTutor, University of St Andrews).
      analytical_rigor: [88, 0.65, "d", "A"],
      // Entered a fictitious marriage (September 1868) specifically as a deliberate legal and social workaround to a real structural barrier -- Russian women could not travel or study abroad without a father's or husband's permission -- documented via the well-corroborated historical record of the arrangement and its stated purpose.
      resourcefulness: [78, 0.62, "d", "A"],
      // Multiple independent documented instances spanning roughly 15 years: overcame Weierstrass's initial refusal by solving his test problems; endured years of professional rejection in Russia after her doctorate, where the best position offered was teaching arithmetic to schoolgirls; and, after a documented six-year period without mathematical research or correspondence with Weierstrass, returned to the field and ultimately secured a professorship (MacTutor).
      persistence: [76, 0.65, "d", "A"],
      // Sustained a public academic career despite direct, publicly published contemporary hostility -- Swedish author August Strindberg denounced her Stockholm appointment in print as "a pernicious and unpleasant phenomenon" -- and despite the Imperial Academy of Sciences having to change its own admission rules specifically to elect her (1889), documented via the historical record of both episodes.
      conflict_tolerance: [72, 0.58, "d", "A"],
      // Converging institutional recognition across independent bodies within a short span -- the Prix Bordin from the French Academy of Sciences (1888), with the prize money specifically raised from 3,000 to 5,000 francs in recognition of the work's quality, and corresponding membership in the Imperial Academy of Sciences (1889) -- inferred as sustained high achievement drive from this documented convergence rather than from fame alone.
      achievement_drive: [74, 0.55, "s", "A"],
      // Sustained a substantial, independently-published second career in literature fully in parallel with active mathematics research and teaching -- a produced stage play (The Struggle for Happiness, 1887, co-written with Anne Charlotte Edgren-Leffler), a published novel (The Nihilist Girl), a memoir (A Russian Childhood), and ongoing newspaper articles -- inferred as genuine cross-domain range from this documented breadth.
      cross_domain_range: [68, 0.5, "s", "A"],
      // Two distinct, well-documented sustained collaborative relationships: a years-long active tutorial relationship with Karl Weierstrass involving extensive problem-solving and correspondence, and a genuine creative co-authorship producing a staged play with Anne Charlotte Edgren-Leffler (1887).
      collaboration: [68, 0.52, "d", "A"],
      // Left Russia for Germany as a very young woman via a socially unconventional legal arrangement, against strong contemporary social convention, inferred as real risk tolerance from this documented departure, scored cautiously as a single-episode case.
      risk_tolerance: [62, 0.38, "i", "A"],
      // Took on an editorial and liaison role at the newly founded journal Acta Mathematica, specifically connecting the Paris and Berlin mathematical communities, a single documented instance of recognizing and acting on an institutional-network opportunity beyond her own research (MacTutor).
      opportunity_sensing: [58, 0.35, "i", "N"],
      // Pursued sustained, independently-published literary writing across multiple forms (novel, memoir, stage play, newspaper articles) alongside an active mathematics career, inferred as genuine range of interest -- scored cautiously since this is drawn from the same underlying facts as the cross_domain_range row above, not independent evidence.
      curiosity: [55, 0.32, "i", "N"],
    },
  },
  {
    id: "p_taha_hussein",
    slug: "taha-hussein",
    canonicalName: "Taha Hussein",
    birthYear: 1889,
    deathYear: 1973,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["EG"],
    regionCode: "north_africa",
    occupationIds: ["writer", "scholar"],
    fieldIds: ["literature", "education"],
    impactDomains: ["cultural", "educational", "historical"],
    tagIds: ["overcame_adversity", "self_taught", "reconciliation"],
    archetypeIds: ["scholarly_specialist", "independent_creator"],
    externalIdentity: { wikidataId: "Q328765" },
    portrait: {
      url: "/portraits/taha-hussein-ahram.jpg",
      source: "Al-Ahram (Egypt) archive photograph, via Wikimedia Commons",
      license: "PD-Egypt (copyright expired)",
      width: 233,
      height: 300,
      attribution: "Al-Ahram",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hussein_wikipedia", kind: "wikipedia", title: "Taha Hussein", url: "https://en.wikipedia.org/wiki/Taha_Hussein" }, { id: "src_hussein_alayyam", kind: "archive", title: "Taha Hussein's own three-volume autobiography, Al-Ayyam (\"The Days\"), dictated due to his blindness" }, { id: "src_hussein_biography", kind: "biography", title: "Historical accounts of his role as Egypt's Minister of Education (1950-1952) and the controversy surrounding his 1926 book On Pre-Islamic Poetry" }],
    rows: {
      // Lost his sight to illness at around age three and, per his own autobiography, pursued formal education first at Al-Azhar and then at the newly founded Cairo University and later the Sorbonne despite his blindness and the absence of adapted educational infrastructure, documented directly via his own first-person account in Al-Ayyam.
      persistence: [90, 0.6, "d", "A"],
      // Published On Pre-Islamic Poetry (1926) applying critical-historical textual analysis to argue that some canonical pre-Islamic poetry was likely composed later, provoking major public and religious controversy and formal prosecution, documented via the well-corroborated historical record of the book's publication and its aftermath.
      independent_thinking: [85, 0.55, "d", "D"],
      // Continued publishing scholarly work applying Western critical methodology to Islamic religious tradition despite the 1926 controversy's real professional and personal consequences (he was prosecuted and lost his university position for a time), inferred as sustained risk tolerance from the documented continuation of his critical scholarly approach in later work.
      risk_tolerance: [78, 0.5, "s", "D"],
      // Progressed from a blind child in a rural Egyptian village to earning doctorates from both Cairo University and the Sorbonne and later serving as national Minister of Education, inferred as sustained, exceptional achievement drive from the documented arc of this trajectory across his own autobiography and the historical record of his later career.
      achievement_drive: [82, 0.52, "s", "A"],
      // His critical-historical analysis of pre-Islamic poetry required close textual and linguistic scrutiny to support its controversial conclusions, inferred as requiring real attention to textual detail from the documented methodological character of the work.
      detail_orientation: [74, 0.45, "i", "A"],
      // As Minister of Education, championed free public education as a national right AND wrote extensively on education as the path to Egypt's cultural renewal, inferred as genuine broader-impact motivation from the convergence of his documented policy actions and his separately-documented public writing on the same theme.
      impact_motivation: [76, 0.5, "s", "N"],
      // Adapted his entire method of scholarly work -- reading, research, and eventually writing -- around blindness from early childhood through dictation and other assistive practices, inferred as requiring sustained real adaptability from the documented, decades-long continuation of a high-output scholarly career under this constraint.
      adaptability: [65, 0.4, "i", "A"],
      // Sustained a documented decades-long working partnership with his French wife Suzanne Bresseau, who read and transcribed for him throughout his academic and literary career from their time together at the Sorbonne onward, documented via the well-corroborated biographical record of this specific, sustained working relationship.
      collaboration: [60, 0.4, "d", "N"],
      // Produced substantial work across literary criticism, fiction, autobiography, and Islamic intellectual history over his career, inferred as genuine intellectual range from the documented breadth of his surviving corpus across these distinct genres.
      curiosity: [68, 0.4, "i", "N"],
      // Pursued admission to the newly founded, non-traditional Cairo University at a time when Al-Azhar remained the conventional path for religious-educated students, inferred as recognizing and acting on a genuinely new institutional opportunity from the documented timing of his enrollment relative to the university's 1908 founding.
      opportunity_sensing: [58, 0.4, "i", "A"],
    },
  },
];

export const ROSTER_31: readonly Person[] = seeds.map(build);
