/**
 * ROSTER 7 — roster-1000 session 10, eligibility_v2 promotion (9 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed, the
 * 9-slug session-10 eligibility_v2 batch) via
 * `src/dev/roster1000/generateRoster7.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * Every one of these 9 people was originally scored and held under the
 * historical eligibility_v1 rule (a flat, unweighted confidence mean
 * across every scored attribute, floor 0.55) -- NONE were rescored for
 * this promotion. Session 8 (docs/roster-1000-checkpoint.md SS43-51)
 * diagnosed that flat mean as structurally different from how
 * `buildTerms` (matching.ts) actually weights confidence, and proposed a
 * fix; session 9 (SS52-62) found that specific proposal did not reproduce
 * and validated a revised hybrid design instead; session 10 implemented
 * that revised design as `eligibility_v2` (`src/core/matching/
 * similarity.ts`) -- coverage>=0.6 and scored>=18 UNCHANGED, the flat
 * confidence-mean gate REPLACED by a high-confidence-subset
 * (confidence>=0.5) count(>=12)+average(>=0.55) requirement -- and these
 * 9 candidates are exactly and only the ones that formula newly admits,
 * determined by the rule itself, never a hand-picked allowlist chosen to
 * hit a target count.
 *
 * Korean display names for all 9 people were added to `person.name.*`
 * in `src/core/i18n/ko.ts` in the same session.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_averroes",
    slug: "averroes",
    canonicalName: "Averroes",
    aliases: ["Ibn Rushd"],
    birthYear: 1126,
    deathYear: 1198,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["ES"],
    regionCode: "southern_europe",
    historicalPolityKey: "polity.almohad_caliphate",
    occupationIds: ["philosopher", "physician", "jurist"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational"],
    tagIds: ["polymath", "systematic_thinker", "nonconformist"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q39837" },
    // Verified 2026-08 via a direct fetch of the Commons file page. NOT a
    // lifetime likeness — a later traditional depiction: Andrea di
    // Bonaiuto's 1366 fresco "Apotheosis of St. Thomas Aquinas" (Basilica
    // of Santa Maria Novella, Florence), painted ~168 years after Averroes'
    // death.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Andrea_di_bonaiuto%2C_apoteosi_di_san_tommaso_d%27aquino%2C_11_averro%C3%A8.jpg",
      width: 1408,
      height: 1516,
      source: "Wikimedia Commons",
      license: "CC BY 3.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Andrea_di_bonaiuto,_apoteosi_di_san_tommaso_d%27aquino,_11_averro%C3%A8.jpg",
      attribution: "Andrea di Bonaiuto, fresco, 1366 (later traditional depiction, not a lifetime likeness)",
    },
    sources: [{ id: "src_averroes_wikipedia", kind: "wikipedia", title: "Averroes", url: "https://en.wikipedia.org/wiki/Averroes" }, { id: "src_averroes_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Ibn Rushd [Averroes]" }],
    rows: {
      // Produced systematic long, middle, and short commentaries on nearly the entire Aristotelian corpus, a documented, multi-tiered analytical methodology directly observable in the surviving texts.
      analytical_rigor: [84, 0.62, "d", "A"],
      // Organized commentary at three distinct levels of abstraction (short, middle, long) for the same source texts, a documented structural approach to explicating a body of philosophy systematically.
      systems_abstraction: [80, 0.6, "d", "A"],
      // Wrote The Incoherence of the Incoherence directly rebutting al-Ghazali's influential critique of philosophy, a documented, sustained intellectual counter-position against a dominant contemporary authority.
      independent_thinking: [76, 0.58, "d", "A"],
      // His works were formally condemned and burned under Almohad authority late in his life, and he was briefly exiled — documented institutional consequences directly tied to his sustained intellectual positions.
      conflict_tolerance: [74, 0.55, "d", "R"],
      // Continued producing philosophically controversial work despite the religio-political risk in the Almohad context, evidenced by the same condemnation and exile.
      risk_tolerance: [68, 0.52, "s", "R"],
      // Sustained engagement across philosophy, medicine (Kitab al-Kulliyat), astronomy, and jurisprudence over decades, per the Stanford Encyclopedia of Philosophy's account of his output.
      curiosity: [72, 0.52, "s", "A"],
      // Produced an extraordinarily large body of commentary and original work across a working life that also included serving as a qadi (judge) and royal physician, evidencing sustained output alongside demanding official duties.
      discipline: [74, 0.55, "s", "A"],
      // Documented substantial output across philosophy, medicine, and Islamic jurisprudence, with real professional practice (physician, judge) in more than one of these domains, not commentary alone.
      cross_domain_range: [76, 0.58, "d", "A"],
      // Continued refining and re-commenting on Aristotelian texts across multiple passes (the three tiers of commentary) rather than treating a single explication as sufficient.
      mastery_orientation: [70, 0.52, "s", "A"],
      // Continued philosophical work despite documented institutional condemnation and exile late in his life rather than abandoning his positions.
      persistence: [68, 0.5, "s", "A"],
      // The systematic three-tier commentary structure and the direct philosophical rebuttal of al-Ghazali represent real methodological and argumentative originality, though built substantially on existing Aristotelian and Islamic philosophical traditions rather than invented from nothing.
      creative_originality: [62, 0.48, "s", "A"],
      // The long-form commentaries' close, line-by-line engagement with Aristotle's original text evidences sustained attention to textual detail.
      detail_orientation: [66, 0.48, "s", "A"],
      // Served as chief qadi of Córdoba, a real senior institutional position, though the surviving record documents his written output far more than his conduct of that specific role.
      leadership_drive: [55, 0.42, "i", "N"],
      // The deliberate three-tier commentary structure applied consistently across many texts suggests real advance methodological planning rather than ad hoc composition.
      planning_orientation: [60, 0.45, "i", "A"],
      // The sheer scale and consistency of the commentary project across most of the Aristotelian corpus is a real behavioral pattern of sustained output, though inferred from volume rather than a specific stated goal.
      achievement_drive: [58, 0.42, "i", "N"],
      // Held distinct professional roles simultaneously (philosopher, physician, judge) across his career, though the surviving sources describe the roles more than his specific adjustment between them.
      adaptability: [55, 0.42, "i", "N"],
      // Primarily documented as defending and elaborating a consistent philosophical position (Aristotelian rationalism) across his career rather than revising it under challenge — scored near center given the absence of a specific documented reversal in either direction.
      belief_updating: [45, 0.4, "i", "N"],
      // The Decisive Treatise argued persuasively for reconciling philosophy with religious law, influencing centuries of subsequent Islamic and European philosophical debate, documented via the Stanford Encyclopedia of Philosophy's assessment of its lasting reception.
      persuasiveness: [68, 0.56, "d", "A"],
      // Produced systematic long, short, and middle commentaries on nearly the entire surviving Aristotelian corpus across roughly three decades — a sustained body of scholarly output documented via the full surviving corpus itself and corroborated across multiple independent medieval biographical accounts (Ibn al-Abbar, al-Marrakushi).
      deep_focus: [78, 0.58, "d", "A"],
      // Served as qadi (judge) of Seville and later chief qadi of Córdoba, and as court physician, applying his scholarship directly to public judicial and medical service, documented across multiple independent medieval biographical accounts of his official career.
      impact_motivation: [64, 0.56, "d", "A"],
      // Introduced to Caliph Abu Yaqub Yusuf by the philosopher Ibn Tufail, who then commissioned his systematic Aristotle commentaries — a specific, well-corroborated instance of productive scholarly patronage rather than isolated independent work.
      collaboration: [55, 0.52, "s", "N"],
      // His medical writing (Kitab al-Kulliyat) engages with clinical observation as part of standard medieval medical practice, though the surviving record does not document a specific experimental methodology distinct from the era's conventional approach.
      experimentation: [52, 0.4, "i", "N"],
    },
  },
  {
    id: "p_cv_raman",
    slug: "cv-raman",
    canonicalName: "C. V. Raman",
    aliases: ["Chandrasekhara Venkata Raman"],
    birthYear: 1888,
    deathYear: 1970,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    historicalPolityKey: "polity.british_raj",
    occupationIds: ["physicist"],
    fieldIds: ["physics"],
    impactDomains: ["scientific", "historical", "educational"],
    tagIds: ["nobel_laureate", "self_taught", "independent"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q60429" },
    // Portrait Sourcing Batch 1 (2026-08): verified live via a direct fetch
    // of the Commons file page.
    //
    // Portrait Reliability Closure (2026-08): re-hosted locally at
    // public/portraits/cv-raman-nobel-foundation-1930.jpg after real
    // Playwright/Chromium verification reproduced intermittent
    // net::ERR_BLOCKED_BY_ORB on upload.wikimedia.org hotlinks (the CDN
    // returning HTTP 429 + an HTML body during request bursts, which
    // Chromium then blocks as a non-image response — affected both new and
    // pre-existing portraits, an infrastructure issue, not a bad URL). The
    // exact same original file bytes as the URL below (992x1488,
    // unmodified, no crop/enhancement/upscale) — only the delivery path
    // changed. licenseUrl still points to the live Commons file page.
    portrait: {
      url: "/portraits/cv-raman-nobel-foundation-1930.jpg",
      width: 992,
      height: 1488,
      source: "Wikimedia Commons (hosted locally by this app; see licenseUrl for the original)",
      license: "Public Domain (published 1930)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sir_CV_Raman.JPG",
      attribution: "Nobel Lectures, Physics 1922–1941, Elsevier Publishing Company, Amsterdam, 1965 — © The Nobel Foundation, 1930",
    },
    sources: [{ id: "src_raman_wikipedia", kind: "wikipedia", title: "C. V. Raman", url: "https://en.wikipedia.org/wiki/C._V._Raman" }, { id: "src_raman_nobel", kind: "award_body", title: "The Nobel Prize — C.V. Raman, Physics 1930" }],
    rows: {
      // Documented to have pursued serious original physics research (on the physics of musical instruments) as a side interest while working full-time in the Indian Finance Department, before formally entering physics as a career — self-directed inquiry with no institutional requirement.
      curiosity: [84, 0.68, "d", "A"],
      // Discovered the Raman effect (inelastic scattering of light) working primarily with basic apparatus at an Indian research institute rather than following the era's dominant Western research infrastructure model, documented via the Nobel Prize record of the discovery.
      independent_thinking: [76, 0.6, "d", "A"],
      // The Raman effect was discovered through direct, hands-on optical experimentation using sunlight and simple filters, documented via the original 1928 experimental papers.
      experimentation: [82, 0.65, "d", "A"],
      // Conducted the discovery experiments with comparatively modest equipment relative to better-funded Western laboratories of the era, documented via accounts of the original experimental setup.
      resourcefulness: [74, 0.58, "d", "A"],
      // Left a stable, well-paid government finance position to pursue a lower-paid academic science career, a real documented career change, though the personal risk calculus is only moderately detailed in available sources.
      risk_tolerance: [60, 0.46, "i", "N"],
      // Sustained parallel serious scientific research alongside full-time government work for over a decade before formally transitioning to a physics career.
      discipline: [70, 0.55, "s", "A"],
      // Founded and directed the Raman Research Institute and served as director of the Indian Institute of Science, documented institutional leadership roles.
      leadership_drive: [68, 0.52, "s", "A"],
      // Continued active physics research across decades following the Nobel-winning discovery rather than resting on that single achievement.
      mastery_orientation: [66, 0.5, "s", "A"],
      // Self-initiated the founding of the Raman Research Institute rather than working solely within existing institutional structures.
      proactive_agency: [68, 0.52, "s", "A"],
      // Sustained self-directed physics research over roughly a decade alongside a full-time unrelated career before achieving formal recognition.
      persistence: [65, 0.48, "i", "N"],
      // Documented serious research spanning acoustics (his early musical-instrument physics work) and optics (the Raman effect) — real but moderate range within physics broadly.
      cross_domain_range: [55, 0.42, "i", "N"],
      // The career transition from finance to physics, followed by sustained research leading to a Nobel Prize, evidences real long-term ambition.
      achievement_drive: [62, 0.45, "i", "N"],
      // Pursued independent research outside the era's dominant institutional science structures, suggesting some real preference for self-directed inquiry.
      autonomy_need: [58, 0.42, "i", "N"],
      // Precise optical spectroscopy work of the kind that led to the Raman effect discovery required careful measurement, though the specific documented behavioral detail is limited relative to the discovery's outcome.
      detail_orientation: [60, 0.44, "i", "N"],
      // Developed a broader theoretical framework connecting light scattering to molecular structure, documented via the Nobel Prize citation's own framing of the Raman effect's explanatory scope.
      systems_abstraction: [74, 0.58, "d", "A"],
      // Publicly and assertively promoted Indian science on the world stage across his career, documented via his sustained institution-building and public advocacy record.
      social_assertiveness: [58, 0.44, "s", "N"],
      // Sustained years of experimental work on light scattering leading to the 1928 discovery of the Raman effect, documented via the Nobel Prize citation and the well-recorded experimental history.
      deep_focus: [80, 0.62, "d", "A"],
      // Founded and directed the Indian Institute of Science's physics department and later the Raman Research Institute, requiring sustained institutional planning, documented via the institutions' own history.
      planning_orientation: [68, 0.54, "d", "A"],
      // Explicitly worked to build Indian scientific institutions and mentor Indian physicists as part of a deliberate scientific-development project, documented via the historical record of his institution-building.
      impact_motivation: [64, 0.5, "s", "A"],
      // The identification and correct theoretical interpretation of the Raman effect required rigorous analysis distinguishing it from other known scattering phenomena, documented via the original published physics.
      analytical_rigor: [68, 0.5, "s", "A"],
    },
  },
  {
    id: "p_franz_kafka",
    slug: "franz-kafka",
    canonicalName: "Franz Kafka",
    birthYear: 1883,
    deathYear: 1924,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CZ"],
    regionCode: "central_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["perfectionist", "late_recognition", "independent"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q905" },
    // ROSTER-1000 portrait sourcing (2026-08): the last known photograph of
    // Franz Kafka. Verified live against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Franz_Kafka%2C_1923.jpg",
      width: 1992,
      height: 2656,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Franz_Kafka,_1923.jpg",
      attribution: "Photographer unknown, probably September 1923, Wertheim department store, Berlin — the last known photograph of Franz Kafka, Public Domain",
    },
    sources: [{ id: "src_kafka_wikipedia", kind: "wikipedia", title: "Franz Kafka", url: "https://en.wikipedia.org/wiki/Franz_Kafka" }, { id: "src_kafka_letters", kind: "archive", title: "Franz Kafka's letters and diaries (published posthumously)" }, { id: "src_kafka_museum", kind: "institution", title: "Kafka Museum, Prague -- The Workers' Accident Insurance Institute", url: "https://kafkamuseum.cz/en/the-workers-accident-insurance-institute" }],
    rows: {
      // Developed a genuinely distinctive narrative mode (bureaucratic surrealism, later termed 'Kafkaesque') with no direct precedent, documented via the lasting critical recognition and terminological legacy of his specific style.
      creative_originality: [88, 0.65, "d", "A"],
      // Left the majority of his major works (The Trial, The Castle, Amerika) unfinished and unpublished at his death, and famously instructed his friend Max Brod to burn his unpublished manuscripts — documented via his own surviving letters expressing sustained dissatisfaction with his work's completeness.
      perfectionism: [84, 0.65, "d", "D"],
      // His prose is widely noted for precise, exhaustively specific bureaucratic and procedural detail even within surreal scenarios, documented via close critical reading of the surviving texts' own style.
      detail_orientation: [74, 0.65, "d", "A"],
      // Sustained intensive nighttime writing sessions after full workdays at an insurance institute, documented via his own diaries and letters describing this demanding routine.
      deep_focus: [68, 0.65, "d", "A"],
      // His letters to Felice Bauer document sustained, explicit internal conflict between his desire for a conventional domestic life and his need for solitary writing time, ultimately ending both his engagements, a specific, well-corroborated pattern from his own primary correspondence.
      autonomy_need: [66, 0.65, "d", "A"],
      // His documented lifelong, unresolved conflict with his father (explored directly in his own Letter to His Father) suggests real difficulty with direct interpersonal confrontation rather than an active seeking of conflict.
      conflict_tolerance: [55, 0.42, "i", "N"],
      // Worked a full-time, demanding 14-year career (1908-1922) at the Workers' Accident Insurance Institute for the Kingdom of Bohemia, documented as 'a model official, precise and efficient' who rose to Senior Legal Secretary, while separately sustaining an intensive nightly private writing practice for the same period -- a specific, institutionally documented sustained dual commitment (Kafka Museum, Prague).
      discipline: [62, 0.65, "d", "A"],
      // Developed a narrative approach genuinely unlike the dominant realist and expressionist literary movements of his own period, documented via critical assessment of his work's distinctiveness relative to contemporaries.
      independent_thinking: [64, 0.46, "s", "A"],
      // Widely and consistently documented across his own letters and diaries, and by contemporaries including Max Brod, as socially anxious and self-doubting in personal relationships — a real, honestly low score directly evidenced rather than assumed from his literary reputation.
      social_assertiveness: [38, 0.65, "d", "N"],
      // Repeatedly delayed major life decisions (marriage, leaving his insurance job) documented via his own letters, suggesting a genuinely cautious approach to major personal risk, distinct from his willingness to write formally unconventional fiction.
      risk_tolerance: [50, 0.4, "i", "N"],
      // His documented wide personal reading and engagement with philosophy and contemporary literary movements suggests real intellectual range beyond his own writing.
      curiosity: [60, 0.42, "i", "N"],
      // Rose over 14 years from entry-level clerk to Senior Legal Secretary at an institution with severely restricted access for Jewish employees (2 of 263 employees in 1913) -- a specific, documented career achievement, distinct from and in addition to his separately-scored literary perfectionism.
      achievement_drive: [45, 0.65, "d", "N"],
      // Sustained both the demanding 14-year insurance career and an intensive nightly private writing practice concurrently for over a decade, extensively documented in his own published diaries and letters describing this dual life, rather than abandoning either commitment.
      persistence: [62, 0.65, "d", "A"],
      // His own letters document persistent difficulty adjusting to major life transitions (repeated broken engagements, sustained ambivalence about his career), suggesting genuinely limited flexibility in this specific domain.
      adaptability: [50, 0.4, "i", "N"],
      // Continued developing and refining his distinctive narrative style across his major works, evidenced by the stylistic consistency and depth visible across his surviving corpus.
      mastery_orientation: [58, 0.42, "i", "N"],
      // Maintained a sustained close friendship and working relationship with Max Brod, who he trusted with his manuscripts, suggesting real capacity for selective close collaboration despite his broader social reticence.
      collaboration: [55, 0.4, "i", "N"],
      // His fiction is widely noted for sustaining deliberate narrative ambiguity and unresolved situations (The Trial's protagonist never learns the charge against him) rather than providing resolution, documented via the surviving texts' own structural choices.
      ambiguity_tolerance: [72, 0.65, "d", "A"],
      // His safety-regulation and accident-risk-classification work at the Institute is documented as materially reducing industrial accidents in one of the most heavily industrialized regions of Europe during his 1908-1922 tenure -- a specific, institutionally documented real-world impact distinct from his literary reputation (Kafka Museum, Prague).
      impact_motivation: [52, 0.65, "d", "N"],
      // Documented across his own letters and by contemporaries as personally reserved and disinclined toward formal leadership roles, an honestly low score directly evidenced rather than assumed.
      leadership_drive: [40, 0.4, "i", "N"],
      // Designed the Institute's risk-categorization system for classifying companies by their level of industrial accident risk and drafted workplace safety regulations -- a specific, institutionally documented instance of applied structural/systematic thinking in his professional work, distinct from his literary output (Kafka Museum, Prague).
      systems_abstraction: [60, 0.65, "d", "N"],
      // His major unfinished novels (The Trial, The Castle) show a real underlying structural architecture even where left incomplete, suggesting some advance compositional planning.
      planning_orientation: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_katherine_johnson",
    slug: "katherine-johnson",
    canonicalName: "Katherine Johnson",
    birthYear: 1918,
    deathYear: 2020,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["mathematician"],
    fieldIds: ["mathematics", "engineering"],
    impactDomains: ["scientific", "engineering", "historical"],
    tagIds: ["overcame_adversity", "prodigy", "self_taught"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q11740" },
    // Verified live against the Commons file page (a Featured Picture):
    // NASA-created, public domain in the US as a work of the federal
    // government (Template:PD-USGov). Real pixel dimensions confirmed
    // from the original file, not the page description.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Katherine_Johnson_at_NASA%2C_in_1966.jpg",
      width: 3173,
      height: 4000,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Katherine_Johnson_at_NASA,_in_1966.jpg",
      attribution: "NASA, 1966; restored by Adam Cuerden",
    },
    sources: [{ id: "src_johnson_wikipedia", kind: "wikipedia", title: "Katherine Johnson", url: "https://en.wikipedia.org/wiki/Katherine_Johnson" }, { id: "src_johnson_nasa", kind: "institution", title: "NASA — Katherine Johnson biography and oral history" }, { id: "src_johnson_shetterly", kind: "biography", title: "Margot Lee Shetterly, Hidden Figures (2016)" }],
    rows: {
      // Hand-calculated the trajectory for Alan Shepard's 1961 flight and verified John Glenn's 1962 orbital trajectory by request of Glenn himself before he would fly — documented, specific, historically verified calculations with real mission consequences.
      analytical_rigor: [90, 0.75, "d", "A"],
      // Documented (NASA oral history) to have completed high school by 14 and college by 18, having advanced rapidly through West Virginia's segregated school system due to sustained early mathematical interest.
      curiosity: [82, 0.65, "d", "A"],
      // Documented to have proactively requested inclusion in previously male-only editorial meetings for the Flight Research Division, a specific instance of pushing past an existing institutional boundary.
      risk_tolerance: [70, 0.55, "d", "A"],
      // Self-initiated the request to join the all-male editorial meetings rather than waiting to be invited, documented via NASA's own oral history record and Shetterly's account.
      proactive_agency: [78, 0.62, "d", "A"],
      // Sustained a 33-year career at NACA/NASA (1953-1986) navigating a segregated and then integrating workplace, documented via her full employment record.
      persistence: [76, 0.6, "d", "A"],
      // The documented meeting-inclusion request and John Glenn's specific, direct request for her personal verification of his trajectory both evidence real professional assertiveness and earned trust.
      social_assertiveness: [68, 0.52, "s", "A"],
      // Orbital trajectory calculation of the precision NASA's missions required directly evidences sustained, exacting attention to numerical detail, corroborated by the specific, historically verified accuracy of her results.
      detail_orientation: [84, 0.68, "d", "A"],
      // Sustained precise, high-stakes mathematical work across a multi-decade NASA career spanning several major programs (Mercury, Apollo, Space Shuttle).
      discipline: [78, 0.6, "s", "A"],
      // Continued adapting her mathematical work as tools and mission requirements evolved across three decades, from early hand calculation through the introduction of electronic computers.
      mastery_orientation: [72, 0.55, "s", "A"],
      // Adapted her working methods across the transition from manual calculation to electronic computers during her career, documented via her sustained relevance across this technological shift.
      adaptability: [68, 0.52, "s", "A"],
      // Continued pursuing increasingly complex assignments (from early aeronautics work to orbital and later interplanetary trajectory calculations) across her career, evidencing sustained ambition.
      achievement_drive: [65, 0.48, "i", "N"],
      // The documented push to attend previously restricted meetings suggests a real willingness to act on her own judgment about what her role required, distinct from the assertiveness claim above in emphasizing the underlying judgment rather than the act itself.
      independent_thinking: [62, 0.46, "i", "N"],
      // Worked within large engineering teams across multiple NASA programs, a real but moderately documented collaborative pattern.
      collaboration: [58, 0.44, "i", "N"],
      // Sought inclusion in decision-relevant meetings rather than working purely as directed, suggesting some real preference for having direct input into her own work's context — moderately evidenced.
      autonomy_need: [55, 0.42, "i", "N"],
      // The meeting-inclusion request implicitly challenged an existing institutional norm, a real but singular documented instance rather than a sustained pattern of confrontation.
      conflict_tolerance: [58, 0.44, "i", "N"],
      // Documented output is concentrated within aerospace trajectory mathematics across her career — a genuinely more specialized, honestly lower-scored range than a polymath profile.
      cross_domain_range: [45, 0.4, "i", "N"],
      // Pioneered novel analytic geometry techniques for calculating orbital trajectories, adapting existing methods to a genuinely new spaceflight context, documented via NASA's own historical record of her contributions.
      creative_originality: [62, 0.5, "d", "A"],
      // Sustained detailed orbital trajectory calculations for NASA's Mercury and Apollo missions requiring intense precision over extended periods, documented via NASA's own historical record of her work, including John Glenn's specific documented request that she personally verify the electronic computer's trajectory numbers before his flight.
      deep_focus: [78, 0.6, "d", "A"],
      // Her trajectory calculations required precise advance planning for mission-critical orbital mechanics with no margin for error, documented via NASA's historical record of her work on the Mercury and Apollo missions.
      planning_orientation: [70, 0.55, "d", "A"],
      // Primarily documented as an individual technical contributor rather than in a formal team-leadership role for most of her career, a genuine, honestly-scored lower finding rather than an assumption from her overall renown.
      leadership_drive: [42, 0.4, "i", "N"],
    },
  },
  {
    id: "p_maimonides",
    slug: "maimonides",
    canonicalName: "Maimonides",
    aliases: ["Moses ben Maimon", "Rambam"],
    birthYear: 1138,
    deathYear: 1204,
    isLiving: false,
    era: "medieval",
    nationalityCodes: [],
    regionCode: "north_africa",
    historicalPolityKey: "polity.ayyubid_sultanate",
    occupationIds: ["philosopher", "physician"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational", "medical"],
    tagIds: ["polymath", "systematic_thinker", "prolific"],
    archetypeIds: ["scholarly_specialist", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q127398" },
    // Verified 2026-08 via a direct fetch of the Commons file page. NOT a
    // lifetime likeness — Maimonides predates portraiture of him by
    // centuries; this is a photograph of a modern statue, released CC0 by
    // its photographer.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Maimonides_crop1.jpg",
      width: 781,
      height: 853,
      source: "Wikimedia Commons",
      license: "CC0 1.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Maimonides_crop1.jpg",
      attribution: "Modern statue (not a lifetime likeness)",
    },
    sources: [{ id: "src_maimonides_wikipedia", kind: "wikipedia", title: "Maimonides", url: "https://en.wikipedia.org/wiki/Maimonides" }, { id: "src_maimonides_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Maimonides" }],
    rows: {
      // The Mishneh Torah systematically organizes the entire body of Jewish religious law into one coherent, topically structured code — a documented, unprecedented organizational undertaking directly observable in the surviving text.
      systems_abstraction: [88, 0.65, "d", "A"],
      // The Guide for the Perplexed builds a sustained, structured philosophical argument reconciling Aristotelian rationalism with Jewish theology, directly observable in the surviving text's own method.
      analytical_rigor: [82, 0.62, "d", "A"],
      // Documented substantial output and real professional practice across religious law (Mishneh Torah), philosophy (Guide for the Perplexed), and medicine (serving as court physician, with several surviving medical treatises) — genuine range with real achievement in each.
      cross_domain_range: [84, 0.65, "d", "A"],
      // Documented to have maintained a demanding daily medical practice at court while continuing major scholarly writing, per his own surviving letters describing his schedule.
      discipline: [80, 0.6, "d", "A"],
      // Continued producing major work across law, philosophy, and medicine throughout his career rather than resting on any single completed achievement.
      mastery_orientation: [76, 0.58, "s", "A"],
      // The Guide's project of reconciling Aristotelian philosophy with Jewish scripture was a genuinely contested position among his contemporaries, per the Stanford Encyclopedia of Philosophy's account of the controversy it generated.
      independent_thinking: [72, 0.55, "s", "A"],
      // The Mishneh Torah's deliberate topical organization across fourteen books, each further subdivided systematically, is directly observable in the text's own structure.
      planning_orientation: [78, 0.58, "d", "A"],
      // The Mishneh Torah alone represents a documented decade-long undertaking (widely dated to roughly 1170-1180), sustained alongside his ongoing medical and communal responsibilities.
      persistence: [72, 0.55, "s", "A"],
      // The Guide's philosophical positions generated real, documented controversy among later rabbinic authorities (some of his works were subject to formal bans in parts of Europe after his death), though the direct evidence of his own engagement with contemporary critics during his lifetime is thinner.
      conflict_tolerance: [62, 0.48, "i", "N"],
      // Served as a recognized leader (Nagid) of the Egyptian Jewish community in addition to his scholarly and medical work, a documented communal leadership role.
      leadership_drive: [68, 0.5, "s", "A"],
      // The Mishneh Torah's exhaustive, code-like coverage of legal minutiae across fourteen books evidences sustained attention to comprehensive detail.
      detail_orientation: [70, 0.52, "s", "A"],
      // The explicit scale of the Mishneh Torah project (aiming to make the entire legal tradition accessible without needing other sources) suggests real high ambition, inferred from the work's own stated purpose.
      achievement_drive: [65, 0.48, "i", "N"],
      // Sustained serious engagement across law, philosophy, and medicine simultaneously, evidencing real breadth of intellectual interest beyond what any single professional role required.
      curiosity: [68, 0.5, "s", "A"],
      // Documented to have rebuilt a scholarly and medical career after his family fled persecution in Almohad Spain, eventually reaching Fustat — a real but only moderately detailed resettlement account.
      resourcefulness: [58, 0.42, "i", "N"],
      // Successfully re-established himself professionally after relocating from Córdoba through Fez and Palestine before settling in Fustat, documented via the biographical record of his family's displacement.
      adaptability: [62, 0.45, "i", "N"],
      // Self-initiated the Mishneh Torah project without royal or communal commission, per Stanford Encyclopedia of Philosophy's account of the work's origin as his own undertaking.
      proactive_agency: [60, 0.44, "i", "N"],
      // His medical treatises reflect direct clinical practice and observation as court physician, consistent with the standard medieval medical methodology of the period, though no specific documented experimental instance survives distinctly.
      experimentation: [55, 0.4, "i", "N"],
      // Synthesized Aristotelian philosophy with Jewish theology in the Guide for the Perplexed, a genuinely original philosophical framework, documented via its lasting influence on both Jewish and broader medieval philosophy per historical-philosophical assessment.
      creative_originality: [78, 0.6, "d", "A"],
      // Sustained the systematic codification of the entire corpus of Jewish law into the 14-volume Mishneh Torah, a massive single undertaking documented via the work's own stated scope and organizing purpose.
      deep_focus: [76, 0.58, "d", "A"],
      // Served as physician to Saladin's vizier al-Qadi al-Fadil and as Nagid (leader) of the Fustat Jewish community, applying his scholarship directly to public medical and communal service, documented across independent historical accounts of his official roles.
      impact_motivation: [66, 0.56, "d", "A"],
      // Fled religious persecution under Almohad rule from Córdoba, eventually settling in Fustat, Egypt after years of displacement — a well-documented, multi-year period of real personal hardship and relocation.
      risk_tolerance: [62, 0.52, "s", "R"],
      // Primarily documented as building and defending a coherent, consistent philosophical-legal system across his career rather than publicly revising it — scored near center given no specific documented reversal.
      belief_updating: [50, 0.4, "i", "N"],
    },
  },
  {
    id: "p_mary_wollstonecraft",
    slug: "mary-wollstonecraft",
    canonicalName: "Mary Wollstonecraft",
    birthYear: 1759,
    deathYear: 1797,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer", "philosopher"],
    fieldIds: ["philosophy", "literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["nonconformist", "independent", "founder"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q101638" },
    sources: [{ id: "src_wollstonecraft_wikipedia", kind: "wikipedia", title: "Mary Wollstonecraft", url: "https://en.wikipedia.org/wiki/Mary_Wollstonecraft" }, { id: "src_wollstonecraft_sep", kind: "institution", title: "Stanford Encyclopedia of Philosophy — Mary Wollstonecraft" }, { id: "src_wollstonecraft_todd", kind: "biography", title: "Janet Todd, Mary Wollstonecraft: A Revolutionary Life (2000)" }],
    rows: {
      // A Vindication of the Rights of Woman (1792) directly argued against prevailing Enlightenment-era assumptions (including Rousseau's) about women's education and rationality — a documented, sustained, specifically-targeted philosophical rebuttal.
      independent_thinking: [88, 0.72, "d", "A"],
      // Published under her own name arguing positions widely considered radical and reputation-damaging for a woman in 1792, and lived independently, unmarried, and self-supporting as a professional writer at a time this was unusual and stigmatized — both documented via Todd's biography.
      risk_tolerance: [76, 0.6, "d", "A"],
      // The Vindication builds a structured philosophical argument directly engaging and rebutting specific claims in Rousseau's Emile, directly observable in the surviving text's own method.
      analytical_rigor: [78, 0.62, "d", "A"],
      // Established her own school and later supported herself entirely through professional writing at a time this path was not conventionally available to women, documented via her employment and publication history.
      proactive_agency: [78, 0.6, "d", "A"],
      // Documented to have deliberately chosen an independent, self-supporting professional and personal life over conventional dependence, corroborated across her own letters and Todd's biography.
      autonomy_need: [76, 0.6, "d", "A"],
      // Sustained a professional writing career producing novels, travel writing, educational treatises, and political philosophy across roughly a decade of prolific output.
      discipline: [70, 0.55, "s", "A"],
      // The Vindication's structured rebuttal aimed directly at persuading a specific intellectual audience, and its sustained influence on subsequent feminist thought is documented via its long publication and citation history.
      persuasiveness: [72, 0.55, "s", "A"],
      // Sustained a public intellectual position that drew significant contemporary criticism (including personal attacks after her death, following the posthumous publication of biographical details about her private life by her husband William Godwin), documented via the reception history of her work.
      conflict_tolerance: [68, 0.52, "s", "R"],
      // Real output across political philosophy (the Vindication), travel writing (Letters Written in Sweden), fiction, and educational theory, documented via her full bibliography.
      cross_domain_range: [66, 0.5, "s", "A"],
      // The Vindication's specific argument — that women's apparent intellectual inferiority was a product of denied education rather than inherent nature — was a genuinely original framing for its time, per Stanford Encyclopedia of Philosophy's account of its place in political philosophy.
      creative_originality: [68, 0.52, "s", "A"],
      // Sustained a productive, multi-genre professional writing career across a compressed roughly decade-long adult working life before her early death.
      achievement_drive: [60, 0.45, "i", "N"],
      // Moved within and directly engaged London's radical intellectual circles of the 1790s, documented via her associations with figures like Thomas Paine and William Godwin.
      social_assertiveness: [65, 0.48, "s", "A"],
      // Supported herself and her family through a combination of teaching, governess work, and writing before establishing a stable professional writing career, documented via her early employment history.
      resourcefulness: [62, 0.46, "i", "A"],
      // Her structured philosophical argumentation implies real attention to logical construction, though the surviving record documents her broader arguments more than granular textual revision process.
      detail_orientation: [50, 0.4, "i", "N"],
      // Explicitly framed A Vindication of the Rights of Woman around improving women's education for the benefit of society as a whole, documented via the work's own stated purpose.
      impact_motivation: [66, 0.52, "d", "A"],
      // Continued her writing and philosophical career despite significant social ostracism and personal hardship, documented via William Godwin's posthumously published memoir of her life and her sustained bibliography across genres.
      persistence: [74, 0.56, "d", "A"],
      // Developed her craft across philosophy, novels, travel writing, and education theory over a short but prolific career.
      mastery_orientation: [62, 0.46, "s", "A"],
      // Engaged with philosophy, politics, education theory, and travel writing across her career, evidencing real intellectual range.
      curiosity: [60, 0.44, "s", "A"],
      // A Vindication of the Rights of Woman was written in a documented, intense six-week period of sustained writing, per Godwin's account of her working process.
      deep_focus: [68, 0.5, "d", "A"],
      // Wrote across genuinely different literary forms (novel, travel narrative, philosophical treatise), suggesting willingness to work outside a single established form, though inferred from the range of output rather than a documented stated intent.
      experimentation: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_michelangelo",
    slug: "michelangelo",
    canonicalName: "Michelangelo",
    birthYear: 1475,
    deathYear: 1564,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["IT"],
    regionCode: "southern_europe",
    occupationIds: ["painter"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["generalist", "perfectionist"],
    archetypeIds: ["creative_creator", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q5592" },
    sources: [{ id: "src_michelangelo_wikipedia", kind: "wikipedia", title: "Michelangelo", url: "https://en.wikipedia.org/wiki/Michelangelo" }, { id: "src_michelangelo_vasari", kind: "biography", title: "Giorgio Vasari, Lives of the Most Excellent Painters, Sculptors, and Architects (1550/1568) -- the only artist Vasari included while still alive, the longest biography in the collection" }],
    rows: {
      // Vasari's biography (written and revised while Michelangelo was alive, with his direct knowledge) documents repeated, extensive reworking of major commissions -- e.g. abandoning and restarting multiple Pieta and tomb sculptures -- to standards he alone judged sufficient.
      perfectionism: [92, 0.7, "d", "A"],
      // Documented sustained, high-level output across sculpture (David, Pieta), painting (Sistine Chapel ceiling and Last Judgment), architecture (St. Peter's Basilica dome, Laurentian Library), and poetry (surviving sonnets) -- an unusually well-corroborated case of range across distinct disciplines, not merely dabbling.
      cross_domain_range: [95, 0.75, "d", "A"],
      // Vasari documents Michelangelo departing from established period conventions in the Sistine ceiling's composition and figure treatment, a specific, contemporaneously recorded instance of originality rather than a general reputational inference.
      creative_originality: [90, 0.65, "d", "A"],
      // Documented repeated conflicts with patrons (including Pope Julius II) over working conditions and creative control on major commissions suggest strong autonomy needs, inferred from the documented conflicts themselves rather than a direct statement of preference.
      autonomy_need: [82, 0.6, "s", "A"],
      // The same 1506 flight-from-Rome episode is a specific, well-documented instance of sustained, high-stakes conflict with the most powerful patron of his era, not resolved by simple concession.
      conflict_tolerance: [74, 0.65, "d", "N"],
      // Sustained pursuit of the largest, most prestigious commissions of his era across a nearly 70-year working life implies strong achievement drive, inferred from the documented pattern of his career choices.
      achievement_drive: [88, 0.6, "s", "A"],
      // The same documented working pattern (sustained, near-continuous work sessions without normal breaks for rest or hygiene during the Sistine ceiling commission) directly evidences sustained deep concentration.
      deep_focus: [85, 0.65, "d", "A"],
      // The anatomical and compositional precision of surviving works (David, the Sistine ceiling) implies close attention to detail, inferred from the finished work rather than a documented account of his working process at that granularity.
      detail_orientation: [80, 0.52, "s", "A"],
      // Departing from period convention in major commissions suggests independent artistic judgment, inferred from the work itself.
      independent_thinking: [78, 0.5, "i", "N"],
      // A nearly 70-year working career sustaining major physical and creative output into old age (the Rondanini Pieta was left unfinished at his death) suggests strong persistence, inferred from the career's length and continuity.
      persistence: [82, 0.5, "i", "A"],
      // Vasari documents that during intensive work periods (including the Sistine ceiling) he sometimes slept in his clothes and boots without undressing for extended periods to avoid interrupting his work -- a specific, famous, well-corroborated anecdote of sustained behavioral discipline.
      discipline: [76, 0.65, "d", "N"],
      // Universally regarded contemporaneously and since as possessing exceptional aesthetic judgment across multiple media, inferred from the consistent critical assessment of his surviving body of work rather than a single documented statement.
      aesthetic_sensitivity: [90, 0.55, "s", "A"],
      // In 1506, after a dispute with Pope Julius II over payment for the pope's tomb commission, Michelangelo fled Rome without permission and returned only after direct negotiation -- defying the Pope was an extraordinarily risky act for the era, extensively documented by Vasari and subsequent scholarship.
      risk_tolerance: [68, 0.65, "d", "N"],
      // Directly confronting Pope Julius II over commission terms, as documented by Vasari, suggests real assertiveness in high-stakes social situations.
      social_assertiveness: [64, 0.42, "i", "N"],
      // Sustained technical refinement visible across his body of work over decades suggests strong mastery orientation, inferred from the work itself.
      mastery_orientation: [84, 0.5, "i", "A"],
      // Documented anatomical study (including dissection) to improve figural accuracy suggests real investigative curiosity beyond immediate commission requirements.
      curiosity: [70, 0.42, "i", "N"],
      // Working across sculpture, painting, and architecture with technique adapted to each suggests willingness to experiment across media.
      experimentation: [68, 0.4, "i", "N"],
      // Large-scale commissions like the Sistine ceiling required real logistical planning, inferred from the scale of the undertaking rather than a documented planning process.
      planning_orientation: [62, 0.4, "i", "N"],
      // Managing workshop assistants on major commissions implies some direct leadership, though Vasari's account emphasizes his individual authorship over his management style.
      leadership_drive: [58, 0.4, "i", "N"],
      // Documented preference for working largely alone (dismissing assistants on the Sistine ceiling after initial help) suggests low collaboration orientation, inferred from Vasari's specific account of this choice.
      collaboration: [45, 0.4, "i", "N"],
      // In his seventies, decades into an established reputation as a painter and sculptor, he took on the chief architect role for St. Peter's Basilica and fundamentally redesigned its structural plan, including the dome -- a documented, late-career shift into a substantially different discipline (architecture/structural engineering) rather than remaining within his already-mastered domains, inferred from the documented scale and timing of this career transition.
      adaptability: [82, 0.6, "s", "A"],
    },
  },
  {
    id: "p_octavia_butler",
    slug: "octavia-butler",
    canonicalName: "Octavia Butler",
    aliases: ["Octavia E. Butler"],
    birthYear: 1947,
    deathYear: 2006,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["self_taught", "independent", "late_recognition"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q239739" },
    sources: [{ id: "src_butler_wikipedia", kind: "wikipedia", title: "Octavia E. Butler", url: "https://en.wikipedia.org/wiki/Octavia_E._Butler" }, { id: "src_butler_huntington", kind: "archive", title: "The Huntington Library — Octavia E. Butler Papers (notebooks, journals, correspondence)" }],
    rows: {
      // Her surviving personal notebooks, held at the Huntington Library, document a sustained daily writing routine maintained through years of rejection before her first sale, corroborated directly from her own archived working papers, not secondhand characterization.
      discipline: [86, 0.72, "d", "A"],
      // Continued submitting work through documented years of rejection before her first novel sale, and continued writing through periods of self-described writer's block later in her career, per her own interviews and notebooks.
      persistence: [84, 0.68, "d", "A"],
      // Wrote as one of very few Black women in science fiction in the 1970s-80s, deliberately centering Black protagonists and themes largely absent from the genre at the time, documented via critical analysis of her work's place in the field.
      independent_thinking: [80, 0.62, "d", "A"],
      // Developed distinctive thematic territory (genetic engineering, power and consent, Afrofuturist historical fiction in Kindred) not widely explored in science fiction at the time, documented via critical reception and her sustained influence on the genre.
      creative_originality: [82, 0.65, "d", "A"],
      // Documented to have worked a series of unrelated day jobs for years while sustaining her writing practice before she could support herself through fiction alone, per her own interviews.
      resourcefulness: [74, 0.58, "d", "A"],
      // Maintained an independent, self-directed writing practice and daily routine across decades of uncertain income, documented via her own notebooks and interviews describing her working life.
      autonomy_need: [68, 0.52, "s", "A"],
      // Her own notebooks include documented, dated personal affirmations about becoming a bestselling author written years before that outcome, a specific, corroborated instance of sustained goal-directed intent.
      achievement_drive: [70, 0.55, "d", "A"],
      // Her Xenogenesis and Parable series built internally consistent, systematic speculative frameworks (genetic engineering rules, emergent social/religious systems), documented via critical analysis of her worldbuilding.
      systems_abstraction: [64, 0.5, "s", "A"],
      // Her research spanned genetics, evolutionary biology, and history to inform her fiction, documented via her own research notes archived at the Huntington Library.
      cross_domain_range: [58, 0.46, "d", "A"],
      // Her surviving notebooks document sustained, disciplined daily writing sessions maintained across years, directly corroborated from her own archived working papers at the Huntington Library.
      deep_focus: [82, 0.65, "d", "A"],
      // Her surviving notebooks include detailed outlines and planning notes for her Parable and Xenogenesis series, documented via the Huntington Library's archived materials.
      planning_orientation: [66, 0.52, "d", "A"],
      // Repeatedly stated in interviews that she wrote to explore power, consent, and survival themes with direct relevance to real social conditions, documented via her own interviews.
      impact_motivation: [62, 0.5, "s", "A"],
      // Attended the Clarion Science Fiction Writers' Workshop early in her career, a documented, specific formative collaborative experience, and later engaged with and mentored younger writers.
      collaboration: [55, 0.48, "d", "N"],
      // Her fiction directly confronted uncomfortable themes (slavery in Kindred, power and consent in the Xenogenesis series) that some readers and critics found controversial, and she continued pursuing this material regardless.
      conflict_tolerance: [58, 0.44, "s", "N"],
      // Her extensively researched worldbuilding (particularly the historical detail in Kindred) suggests real careful attention to specifics, though the surviving public record documents outcomes more than her granular research process.
      detail_orientation: [62, 0.46, "i", "N"],
      // Continued developing craft and thematic range across multiple series and standalone novels over a roughly three-decade career, rather than repeating an early successful formula.
      mastery_orientation: [66, 0.5, "s", "A"],
      // Her novels' engagement with genetics, evolutionary biology, and historical research suggest sustained cross-disciplinary reading and inquiry beyond fiction craft alone.
      curiosity: [64, 0.48, "s", "A"],
      // Sustained a financially precarious writing career for years with no guarantee of success, documented via her own accounts of her day-job period, though this reflects sustained commitment more than a single high-stakes decision.
      risk_tolerance: [60, 0.45, "i", "N"],
      // Widely described in her own interviews and by biographers as introverted and more comfortable in solitary writing than public settings — a real, honestly low score rather than an assumption of extroversion from her later public prominence.
      social_assertiveness: [40, 0.45, "s", "N"],
      // Worked across genuinely different speculative-fiction subgenres (post-apocalyptic, historical time-travel, vampire fiction) rather than remaining within one established niche, suggesting real willingness to vary her approach.
      experimentation: [60, 0.44, "i", "N"],
    },
  },
  {
    id: "p_susan_b_anthony",
    slug: "susan-b-anthony",
    canonicalName: "Susan B. Anthony",
    birthYear: 1820,
    deathYear: 1906,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["activist"],
    fieldIds: ["civil_rights"],
    impactDomains: ["historical", "social"],
    tagIds: ["founder", "leader"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q192245" },
    // ROSTER-1000 portrait sourcing (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Susan_B._Anthony_by_Frances_Benjamin_Johnston.jpg",
      width: 1154,
      height: 1475,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Susan_B._Anthony_by_Frances_Benjamin_Johnston.jpg",
      attribution: "Frances Benjamin Johnston, circa 1900, Public Domain (published before 1931)",
    },
    sources: [{ id: "src_anthony_wikipedia", kind: "wikipedia", title: "Susan B. Anthony", url: "https://en.wikipedia.org/wiki/Susan_B._Anthony" }, { id: "src_anthony_nps", kind: "institution", title: "US National Park Service -- Susan B. Anthony", url: "https://www.nps.gov/people/susan-b-anthony.htm" }],
    rows: {
      // Deliberately registered to vote and cast an illegal ballot in the 1872 presidential election specifically to force a legal test case, resulting in her arrest and prosecution -- a specific, well-documented act of calculated legal risk-taking, not a spontaneous act.
      risk_tolerance: [85, 0.7, "d", "A"],
      // After being refused the chance to speak at a temperance meeting in 1852, she independently organized the Woman's New York State Temperance Society rather than seeking another platform -- a specific, documented instance of self-directed institution-founding in response to exclusion.
      proactive_agency: [88, 0.65, "d", "A"],
      // Co-founded the American Equal Rights Association (1866) and the National Woman Suffrage Association (1869), documented organizational leadership roles she held for decades, not honorary or nominal positions.
      leadership_drive: [88, 0.65, "d", "A"],
      // Continued public suffrage advocacy and organizing after her arrest, prosecution, and conviction for illegal voting in 1872 -- a specific documented instance of sustained public conflict with legal authority rather than withdrawal.
      conflict_tolerance: [80, 0.6, "d", "N"],
      // Sustained organizational and advocacy work from her 1852 temperance-meeting exclusion until her death in 1906 -- over 50 years -- implies exceptional persistence, inferred from the documented career span rather than a single on-point statement.
      persistence: [88, 0.6, "s", "A"],
      // Sustained escalation from local temperance organizing to national suffrage-movement leadership over decades implies strong achievement drive, inferred from the documented career trajectory.
      achievement_drive: [84, 0.55, "s", "A"],
      // Deliberately organizing a separate temperance society after being excluded from an existing platform, and later co-founding independent suffrage organizations, suggests strong self-direction, inferred from the pattern of institution-building rather than joining existing structures.
      autonomy_need: [76, 0.52, "s", "N"],
      // The 1872 decision to vote illegally as a deliberate test case, rather than pursuing only legislative advocacy, suggests real decisiveness in choosing confrontational tactics, inferred from the documented act itself.
      decisiveness: [80, 0.5, "s", "A"],
      // The same 1873 courtroom speech ('may it please the court...') is a specific, well-documented instance of sustained public assertiveness in one of the highest-stakes settings available to her.
      social_assertiveness: [78, 0.65, "d", "N"],
      // A documented lifelong, singular focus on structural political change (suffrage) rather than more personally rewarding pursuits suggests strong impact-oriented motivation, inferred from the sustained pattern of her life's work.
      impact_motivation: [82, 0.5, "s", "A"],
      // Coordinating a group voter-registration action in 1872 (herself, family members, and eleven others) suggests real advance planning, inferred from the coordinated nature of the documented event.
      planning_orientation: [74, 0.46, "i", "N"],
      // Sustained a documented working partnership with Elizabeth Cady Stanton across more than 50 years and multiple organizations (the American Equal Rights Association, National Woman Suffrage Association, and co-authorship of History of Woman Suffrage) -- an extensively corroborated, specific, long-duration collaborative record.
      collaboration: [70, 0.65, "d", "N"],
      // At her 1873 trial for illegal voting, the judge directed the jury to a guilty verdict without deliberation (a documented, widely-noted irregularity), and Anthony delivered a sustained, unrepentant courtroom speech refusing to recognize the court's authority over her -- a specific, extensively documented instance of independent judgment asserted directly against a formal legal authority.
      independent_thinking: [72, 0.65, "d", "N"],
      // Sustaining organizational leadership roles over multiple decades implies real behavioral discipline, inferred from the length of documented tenure.
      discipline: [68, 0.4, "i", "N"],
      // Co-editing the multi-volume documentary History of Woman Suffrage over decades required real sustained attention to documentary accuracy and detail, though the surviving record documents the project's scale more thoroughly than her individual editorial process.
      detail_orientation: [60, 0.55, "s", "N"],
      // Shifting tactics from temperance organizing to direct suffrage advocacy to legal test-case activism over her career suggests real tactical adaptation over time.
      adaptability: [64, 0.4, "i", "N"],
      // Sustained engagement across multiple reform movements (temperance, abolition, suffrage) suggests broad social/political curiosity, inferred from the range of causes documented in her activity.
      curiosity: [58, 0.4, "i", "N"],
      // Increasing organizational sophistication from a single local society to national multi-decade organizations suggests developing organizational mastery over time.
      mastery_orientation: [60, 0.4, "i", "N"],
      // Recognizing the 14th/15th Amendments' ambiguous wording as a legal opening for a test-case voting attempt suggests real opportunity recognition, inferred from the documented strategy itself.
      opportunity_sensing: [66, 0.4, "i", "N"],
      // Testing an untried legal strategy (voting then contesting the resulting prosecution) rather than relying solely on established advocacy methods suggests some willingness to try new approaches.
      experimentation: [55, 0.4, "i", "N"],
    },
  },
];

export const ROSTER_7: readonly Person[] = seeds.map(build);
