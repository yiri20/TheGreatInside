/**
 * ROSTER 9 — roster-1000 session 18 (3 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster9.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use -- here each rationale also
 * cites the specific frozen evidence-ledger episode id(s) it traces back
 * to (e.g. "Session 18 evidence LP-E14"), full text preserved in
 * `src/dev/roster1000/production/session18/<slug>/evidenceLedger.json`.
 *
 * Session 18 was the first PROSPECTIVE production pilot after sessions
 * 13-17's retrospective diagnostic work: a fresh 5-person cohort
 * researched and scored under one explicit, evidence-preserving protocol
 * (source record -> raw notes -> trait-blind evidence ledger -> evidence
 * lock -> scoring -> scoring lock -> eligibility_v2 run once), with every
 * stage preserved separately in
 * `src/dev/roster1000/production/session18/`. 3 of 5 cleared every gate
 * cleanly: louis-pasteur (26 rows, coverage 0.769), fyodor-dostoevsky (24
 * rows, coverage 0.717), louis-armstrong (21 rows, coverage 0.623). The
 * other 2 (indira-gandhi, william-wilberforce) each failed ONLY the
 * coverage gate by a narrow margin while clearing the scored-attribute-
 * count and high-confidence gates -- genuine near-misses, not rescued or
 * padded. See `docs/roster-1000-checkpoint.md` §84 for the full record.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_fyodor_dostoevsky",
    slug: "fyodor-dostoevsky",
    canonicalName: "Fyodor Dostoevsky",
    aliases: ["Fyodor Dostoyevsky", "Fyodor Mikhailovich Dostoevsky"],
    birthYear: 1821,
    deathYear: 1881,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["RU"],
    regionCode: "central_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature", "philosophy"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["endured_imprisonment", "overcame_adversity", "prolific", "nonconformist"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q991" },
    sources: [{ id: "src_dostoevsky_frank", kind: "biography", title: "Joseph Frank -- five-volume definitive scholarly biography of Dostoevsky (Princeton University Press, 1976-2002)" }, { id: "src_dostoevsky_annadiary", kind: "archive", title: "Anna Grigoryevna Dostoevskaya -- shorthand diary of 1867 (published 1923) and Reminiscences (published 1925)" }, { id: "src_dostoevsky_encyc", kind: "press", title: "Encyclopedia.com -- \"Fyodor Mikhailovich Dostoevsky\" (Encyclopedia of World Biography)", url: "https://www.encyclopedia.com/people/literature-and-arts/russian-and-eastern-european-literature-biographies/fyodor-mikhailovich-dostoevsky" }, { id: "src_dostoevsky_yale", kind: "institution", title: "Yale University course-page biography of Dostoevsky", url: "https://meek.yalepages.org/dostoevsky_bio.html" }, { id: "src_dostoevsky_ubcwiki", kind: "institution", title: "\"The Mock-execution of Fyodor Dostoevsky\", University of British Columbia Wiki", url: "https://wiki.ubc.ca/The_Mock-execution_of_Fyodor_Dostoevsky" }, { id: "src_dostoevsky_russianlife", kind: "press", title: "\"Dostoyevsky's Brilliant Wife Anna\", Russian Life magazine", url: "https://russianlife.com/the-russia-file/dostoyevskys-brilliant-wife-anna/" }],
    rows: {
      // Sustained deep, self-directed interest in literature (Schiller, Homer) throughout his military-engineering academy years, diverging from the assigned technical curriculum -- a single documented instance. Session 18 evidence FD-E2.
      curiosity: [65, 0.42, "i", "A"],
      // Developed a fully worked-out anti-rationalist philosophical position through fiction rather than argument alone, and repeatedly converted disparate real-world events into unified literary/thematic material across decades. Session 18 evidence FD-E13, FD-E23.
      intuitive_synthesis: [78, 0.55, "s", "A"],
      // Continued experimenting across genres against critical consensus after a public failure; explicitly revised his own prior moral categories from direct observation rather than retaining doctrine; sustained ideological opposition to the dominant liberal intellectual consensus over decades. Session 18 evidence FD-E4, FD-E10, FD-E21.
      independent_thinking: [80, 0.65, "s", "A"],
      // Explicitly revised his own prior binary moral categories after direct field observation in the labor camp, and underwent a full, well-documented ideological reversal from youthful radicalism to mature conservatism across his adult life. Session 18 evidence FD-E10, FD-E21.
      belief_updating: [82, 0.62, "s", "A"],
      // Developed a fully original anti-rationalist philosophical position in Notes from Underground, and originated a sustained pattern of directly converting real contemporary events into major fiction across his career. Session 18 evidence FD-E13, FD-E23.
      creative_originality: [88, 0.6, "s", "A"],
      // After a public critical failure, rapidly experimented across markedly different literary genres and forms in succession (social tales, Gothic fiction, sentimental romance) rather than retreating to a previously successful mode -- one strong, specific documented instance. Session 18 evidence FD-E4.
      experimentation: [78, 0.65, "d", "A"],
      // Sustained major long-form creative work in direct parallel with acute personal crisis, and independently wrote, edited, and published a personal periodical largely alone for years. Session 18 evidence FD-E18, FD-E20.
      discipline: [82, 0.55, "s", "A"],
      // Kept ongoing observational notes under restrictive imprisonment conditions, and sustained years of largely solitary editorial/writing work on his own periodical. Session 18 evidence FD-E9, FD-E20.
      deep_focus: [68, 0.5, "s", "A"],
      // Facing forfeiture of all publishing rights, dictated an entire novel to a stenographer and filed it roughly two hours before a punitive deadline -- one strong, specific documented instance. Session 18 evidence FD-E14.
      execution_speed: [85, 0.62, "d", "A"],
      // Voluntarily assumed a large, ongoing family financial obligation without apparent long-term provision for it, ultimately declaring personal bankruptcy -- a documented pattern of financial decision-making with limited forward planning. Session 18 evidence FD-E12.
      planning_orientation: [32, 0.45, "i", "D"],
      // Continued producing new work across genres after a public critical collapse; sustained intellectual habits (active note-taking) through years of hard labor; sustained major creative output through a decade-long personal financial and addiction crisis. Session 18 evidence FD-E4, FD-E8, FD-E18.
      persistence: [80, 0.6, "s", "A"],
      // Adapted to sustained social hostility within an already coercive prison environment; revised his own moral framework based on new direct experience; underwent an abrupt, durable behavior change (quitting gambling) after roughly a decade of relapse. Session 18 evidence FD-E8, FD-E10, FD-E17.
      adaptability: [75, 0.58, "s", "A"],
      // Voluntarily joined a politically dangerous discussion group under an autocratic regime, and repeatedly gambled with money he did not have across roughly a decade -- risk-taking that manifested both as principled conviction and as genuinely destructive addiction. Session 18 evidence FD-E5, FD-E16.
      risk_tolerance: [78, 0.62, "s", "D"],
      // Voluntarily retired from a stable government post to pursue writing full-time before any publication track record existed -- a single documented instance. Session 18 evidence FD-E1.
      decisiveness: [65, 0.42, "i", "A"],
      // Co-founded and jointly managed two successive literary journals with his brother; accepted a stenographer-collaborator's practical suggestion under acute deadline pressure; progressively ceded real financial and business authority to his wife over a decade, explicitly stating his trust in her judgment. Session 18 evidence FD-E11, FD-E14, FD-E19.
      collaboration: [78, 0.65, "s", "A"],
      // Co-led two successive literary/political journals with editorial and business responsibility, and independently ran his own periodical largely alone for years. Session 18 evidence FD-E11, FD-E20.
      leadership_drive: [68, 0.5, "s", "N"],
      // Delivered a major public speech reportedly moving the audience to tears and briefly reconciling rival ideological factions in the room -- one strong, specific documented instance. Session 18 evidence FD-E22.
      persuasiveness: [75, 0.6, "d", "A"],
      // A repeating pattern of sharp marital quarrels followed by quick reconciliation, documented by an eyewitness who observed it daily; sustained a years-long public feud with a fellow novelist including mutual public mockery. Session 18 evidence FD-E15, FD-E21.
      conflict_tolerance: [78, 0.62, "s", "D"],
      // Sustained deep, self-directed literary interest and self-teaching throughout his formal military-academy years, ahead of any formal literary training. Session 18 evidence FD-E2.
      mastery_orientation: [65, 0.42, "i", "A"],
      // Sustained a years-long public feud with a rival novelist including mutual public mockery over ideological differences -- a single documented episode family. Session 18 evidence FD-E21.
      competitiveness: [62, 0.42, "i", "N"],
      // Voluntarily left a stable, secure career path for an uncertain one before any track record existed, and worked largely alone on his own independent periodical for years. Session 18 evidence FD-E1, FD-E20.
      autonomy_need: [72, 0.5, "s", "A"],
      // Sustained direct correspondence with lay readers through his own periodical, and delivered a major public speech explicitly aimed at national-scale reconciliation and influence. Session 18 evidence FD-E20, FD-E22.
      impact_motivation: [70, 0.5, "s", "A"],
      // Facing an impossible publishing deadline, found and executed a practical workaround (dictation to a stenographer, then notarized filing when the publisher's office was unexpectedly closed) -- a single, clean, specific instance. Session 18 evidence FD-E14.
      resourcefulness: [78, 0.48, "i", "A"],
      // Voluntarily left a stable career for an uncertain one before any publication track record, and voluntarily joined a politically dangerous group under an autocratic regime. Session 18 evidence FD-E1, FD-E5.
      proactive_agency: [75, 0.5, "s", "A"],
    },
  },
  {
    id: "p_louis_armstrong",
    slug: "louis-armstrong",
    canonicalName: "Louis Armstrong",
    birthYear: 1901,
    deathYear: 1971,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["singer", "composer"],
    fieldIds: ["music", "jazz"],
    impactDomains: ["cultural", "artistic"],
    tagIds: ["prolific", "overcame_adversity", "innovator", "self_taught"],
    archetypeIds: ["creative_creator", "competitive_performer"],
    externalIdentity: { wikidataId: "Q1779" },
    sources: [{ id: "src_armstrong_hmbio", kind: "institution", title: "Louis Armstrong House Museum -- official Biography page" }, { id: "src_armstrong_hmcivil", kind: "institution", title: "Louis Armstrong House Museum -- \"I'm Still Louis Armstrong-Colored\" civil-rights virtual exhibit" }, { id: "src_armstrong_teachout", kind: "biography", title: "Terry Teachout -- Pops: A Life of Louis Armstrong" }, { id: "src_armstrong_nation", kind: "press", title: "The Nation -- \"Louis Armstrong Gets the Last Word on Louis Armstrong\"" }, { id: "src_armstrong_gage", kind: "press", title: "Jerry Jazz Musician -- \"Louis Armstrong and 'Gage'\"" }],
    rows: {
      // Archive material shows deliberate written notations on his own performance scores and substantive personal edits to his own arrangements -- a technically precise, craft-conscious relationship to his material rather than pure instinct alone. Session 18 evidence LA-E27.
      analytical_rigor: [68, 0.42, "i", "A"],
      // Publicly disagreed with a prominent peer's protest strategy and articulated his own distinct rationale; sustained his own preferred artistic style against years of peer criticism; refused to let his own manager's softened public narrative stand. Session 18 evidence LA-E16, LA-E19, LA-E21.
      independent_thinking: [82, 0.65, "s", "A"],
      // Never incorporated a major new stylistic movement into his own playing despite, per his biographer, understanding it technically and eventually reconciling personally with its leading practitioners -- a documented instance of sustained artistic non-revision rather than adoption. Session 18 evidence LA-E21.
      belief_updating: [35, 0.42, "i", "D"],
      // Widely credited across all sources with transforming a genre from ensemble-centered to soloist-centered and popularizing a new vocal technique, alongside a documented deliberate, hands-on craft engagement with his own material. Session 18 evidence LA-E27.
      creative_originality: [85, 0.5, "s", "A"],
      // Archive material shows a deliberate, craft-conscious relationship to his own musical material -- specific written notations and substantive personal edits, not incidental production. Session 18 evidence LA-E27.
      aesthetic_sensitivity: [78, 0.42, "i", "A"],
      // Built a professional reputation over years of steady work before being summoned to a major city; practiced daily so consistently, even against explicit medical advice after hospitalization, that his own neighbors would notice and call his wife if he skipped several days. Session 18 evidence LA-E5, LA-E24.
      discipline: [88, 0.65, "s", "A"],
      // Maintained a daily practice routine against explicit medical advice, and sustained a decades-long, self-driven personal archival/self-documentation project alongside his performing career. Session 18 evidence LA-E24, LA-E26.
      deep_focus: [80, 0.58, "s", "A"],
      // Archive material shows deliberate written notations and specific personal lyric edits on his own performance material -- a single documented instance. Session 18 evidence LA-E27.
      detail_orientation: [72, 0.42, "i", "A"],
      // Deliberately arranged a specific, structured long-term business-delegation agreement so he could focus purely on performing -- a single documented instance. Session 18 evidence LA-E13.
      planning_orientation: [65, 0.42, "i", "A"],
      // Went straight back to work performing the same night he was released from a nine-day jail stay; continued performing and practicing through repeated serious health crises against direct medical advice; sustained decades of continuous international touring. Session 18 evidence LA-E11, LA-E23, LA-E24.
      persistence: [90, 0.72, "d", "A"],
      // Left an unsatisfying professional arrangement and returned to a better one rather than persisting in it, and complied with real social pressure to change a lyric despite personal frustration. Session 18 evidence LA-E8, LA-E15.
      adaptability: [68, 0.5, "s", "A"],
      // Continued a legally risky personal habit for the rest of his life after a real arrest, and departed sharply from his own usual apolitical public persona with a career-risking political statement condemning a sitting US president. Session 18 evidence LA-E11, LA-E12, LA-E18.
      risk_tolerance: [78, 0.62, "s", "D"],
      // Immediately and directly contradicted his own manager's public attempt to soften a controversial statement, rather than letting the framing stand or deliberating over a response. Session 18 evidence LA-E19.
      decisiveness: [70, 0.42, "i", "A"],
      // Delivered a strikingly blunt public political statement directly to a reporter, departing from his usual reticence, and directly, immediately corrected a rival musician's public claim for his own archive's record. Session 18 evidence LA-E18, LA-E28.
      social_assertiveness: [75, 0.5, "s", "A"],
      // His marriage to a fellow professional musician directly shaped and advanced his career trajectory; deliberately delegated essentially all business control to a trusted manager; formed his own ensemble incorporating other musicians. Session 18 evidence LA-E6, LA-E9, LA-E13.
      collaboration: [72, 0.55, "s", "A"],
      // Formed and led his own recording ensemble after leaving a mentor's band, and later formed and led a new integrated ensemble with explicit social intent. Session 18 evidence LA-E9, LA-E14.
      leadership_drive: [78, 0.58, "s", "A"],
      // Sustained real underlying competitive tension with a mentor while maintaining the relationship; publicly disagreed with a prominent peer's tactics; entered direct conflict with his own manager over a public statement; sustained a years-long public feud with a rival generation of musicians. Session 18 evidence LA-E7, LA-E16, LA-E19, LA-E21.
      conflict_tolerance: [85, 0.68, "d", "A"],
      // Deliberately chose refining and perfecting his own established musical language over reinvention in his later career, and maintained an ongoing, deliberate, craft-conscious relationship to his own material throughout. Session 18 evidence LA-E22, LA-E27.
      mastery_orientation: [82, 0.58, "s", "A"],
      // Left a professional arrangement that constrained his independence, and formed his own independent recording outfit rather than remaining a sideman indefinitely. Session 18 evidence LA-E8, LA-E9.
      autonomy_need: [72, 0.5, "s", "A"],
      // Explicitly framed his own integrated ensemble as active social work rather than an incidental choice, and made a deliberate, unprompted public political statement specifically to have national-scale impact. Session 18 evidence LA-E14, LA-E18.
      impact_motivation: [78, 0.55, "s", "A"],
      // Proactively formed his own independent recording career and ensemble; made an unprompted, career-risking public political statement; proactively chose and defended his own preferred mode of civil-rights contribution rather than deferring to a more visible norm. Session 18 evidence LA-E9, LA-E18, LA-E20.
      proactive_agency: [80, 0.6, "s", "A"],
    },
  },
  {
    id: "p_louis_pasteur",
    slug: "louis-pasteur",
    canonicalName: "Louis Pasteur",
    birthYear: 1822,
    deathYear: 1895,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["FR"],
    regionCode: "western_europe",
    occupationIds: ["chemist", "scientist"],
    fieldIds: ["chemistry", "microbiology", "medicine"],
    impactDomains: ["scientific", "medical"],
    tagIds: ["career_changer", "innovator", "founder", "overcame_adversity"],
    archetypeIds: ["scientific_explorer", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q529" },
    sources: [{ id: "src_pasteur_shi", kind: "institution", title: "Science History Institute -- Louis Pasteur biography", url: "https://www.sciencehistory.org/education/scientific-biographies/louis-pasteur/" }, { id: "src_pasteur_iphist", kind: "institution", title: "Institut Pasteur -- official History page", url: "https://www.pasteur.fr/en/institut-pasteur/history" }, { id: "src_pasteur_iprabies", kind: "institution", title: "Institut Pasteur research journal -- First rabies vaccination, 1885" }, { id: "src_pasteur_gavi", kind: "press", title: "Gavi.org -- \"Scrutiny or public spectacle?\" (the Pouilly-le-Fort anthrax trial)" }, { id: "src_pasteur_hov", kind: "institution", title: "History of Vaccines (College of Physicians of Philadelphia) -- \"The Other Side of Louis Pasteur's Discoveries\"" }, { id: "src_pasteur_geison", kind: "biography", title: "Gerald Geison, The Private Science of Louis Pasteur (Princeton University Press, 1995)" }, { id: "src_pasteur_debre", kind: "biography", title: "Patrice Debre, Louis Pasteur (Johns Hopkins University Press)" }, { id: "src_pasteur_acadsilk", kind: "archive", title: "Academie des Sciences (Comptes Rendus Chimie) -- peer-reviewed article on Pasteur's silkworm-disease period" }, { id: "src_pasteur_pouchet", kind: "archive", title: "History and Philosophy of the Life Sciences (Springer) -- peer-reviewed article on the Pouchet spontaneous-generation controversy" }],
    rows: {
      // Sustained investigation across widely differing domains he had to learn essentially from scratch -- crystallography, fermentation microbiology, silkworm pathology, immunology -- each a genuine new-field commitment, not a single flash of interest. Session 18 evidence LP-E2, LP-E8.
      curiosity: [85, 0.72, "d", "A"],
      // Genuinely rigorous, meticulous empirical method in the laboratory (hand-separating crystal forms under magnification, revising a working hypothesis as evidence came in), but documented as prioritizing confident public rhetoric over acknowledging real methodological uncertainty in the Pouchet dispute -- a real, sourced tension, not resolved toward either extreme. Session 18 evidence LP-E2, LP-E4, LP-E5, LP-E9.
      analytical_rigor: [68, 0.55, "s", "D"],
      // Advanced and sustained a minority scientific position (living-microorganism fermentation) against the dominant contemporary view, and engaged combatively rather than conceding under later methodological attack from Koch. Session 18 evidence LP-E3, LP-E19.
      independent_thinking: [82, 0.68, "d", "A"],
      // Early in the silkworm-disease investigation believed the visible "corpuscles" were symptoms rather than cause, and revised the view as evidence accumulated rather than defending the initial hypothesis -- a single, clean documented instance, not corroborated by a second. Session 18 evidence LP-E9.
      belief_updating: [62, 0.42, "i", "A"],
      // Productively noticed and capitalized on an unplanned experimental outcome (weakened cholera cultures producing immunity) rather than discarding it, and deliberately designed a bold, adversarial-witness open-field trial structure for the anthrax vaccine. Session 18 evidence LP-E14, LP-E16.
      experimentation: [88, 0.72, "d", "A"],
      // Genuinely crossed from crystallographic chemistry into fermentation microbiology, then into silkworm-disease entomology/pathology at government request with no prior background, described by historians as an "epistemological rupture" converting him from chemist to biologist. Session 18 evidence LP-E2, LP-E3, LP-E8.
      cross_domain_range: [90, 0.72, "d", "A"],
      // Painstaking, repetitive manual crystal-separation work sustained over years; continued directing laboratory work after a paralyzing stroke; maintained a lifelong personal, methodical notebook practice. Session 18 evidence LP-E2, LP-E11, LP-E25.
      discipline: [85, 0.68, "d", "A"],
      // Sustained years of concentrated attention on the tartrate-crystal problem and, later, five full years on an unfamiliar silkworm-disease problem at government request. Session 18 evidence LP-E2, LP-E8.
      deep_focus: [82, 0.6, "s", "A"],
      // Identified tiny asymmetric facets on crystals visible only under magnification, and designed a meticulous, precisely-counted, precisely-dated public trial protocol (24 sheep, 1 goat, 6 cows vaccinated on named dates, matched controls). Session 18 evidence LP-E2, LP-E16.
      detail_orientation: [85, 0.62, "s", "A"],
      // Deliberately designed the Pouilly-le-Fort trial's exact protocol (dosing dates, group sizes, control group, built-in adversarial oversight) -- one specific, concrete, well-corroborated documented episode. Session 18 evidence LP-E16.
      planning_orientation: [70, 0.6, "d", "A"],
      // Committed five years to an unfamiliar field at government request; continued directing research after a paralyzing stroke; sustained multiple career-spanning priority disputes across decades. Session 18 evidence LP-E8, LP-E11, LP-E19, LP-E20.
      persistence: [90, 0.78, "d", "A"],
      // Converted from chemist to biologist under a government mandate; revised an incorrect working hypothesis on new evidence; adapted his own working method after a stroke by relying more heavily on trusted assistants. Session 18 evidence LP-E8, LP-E9, LP-E11.
      adaptability: [82, 0.68, "d", "A"],
      // Built his own chief public skeptic into the oversight of his career-defining public trial; decided, holding no medical license and describing "acute and harrowing anxiety," to treat a dying child with an experimental, previously animal-only treatment. Session 18 evidence LP-E16, LP-E21, LP-E22.
      risk_tolerance: [82, 0.7, "d", "A"],
      // Committed years to a field with genuine open uncertainty about outcome, and made a human-treatment decision under real, acknowledged scientific uncertainty about efficacy. Session 18 evidence LP-E8, LP-E21.
      ambiguity_tolerance: [75, 0.58, "s", "A"],
      // Decisively capitalized on an accidental experimental finding, but the Meister treatment decision itself is documented as anguished and made only after real internal deliberation -- decisive but not impulsive. Session 18 evidence LP-E14, LP-E21.
      decisiveness: [68, 0.5, "s", "N"],
      // Directly addressed a large public crowd of politicians, journalists, and farmers in a deliberately accessible tone and "charmed" them; replied assertively and publicly to Koch's methodological attacks rather than disengaging. Session 18 evidence LP-E16, LP-E19.
      social_assertiveness: [78, 0.6, "s", "A"],
      // Genuinely shared formal credit with assistants, deferred to a collaborator's professional refusal on the Meister case, and welcomed a scientific rival with a competing theory onto his own staff -- yet also ordered a technical substitution kept quiet from the very assistant who executed it, and never permitted assistants to keep independent research notes. Session 18 evidence LP-E11, LP-E17, LP-E18, LP-E22, LP-E24, LP-E25.
      collaboration: [62, 0.55, "s", "D"],
      // Ran ENS student discipline in a documented inflexible, authoritarian manner that eventually cost him the post, while also building and leading a genuinely capable, semi-independent research team (the "five musketeers") at the Institute. Session 18 evidence LP-E6, LP-E7, LP-E24.
      leadership_drive: [72, 0.6, "s", "D"],
      // Delivered a rhetorically effective, historically influential public lecture against spontaneous generation, and reportedly "charmed" a skeptical public audience at Pouilly-le-Fort. Session 18 evidence LP-E4, LP-E16.
      persuasiveness: [78, 0.55, "s", "A"],
      // Held a rigid disciplinary position to the point of a mass student walkout and loss of his own post, and sustained three separate, long-running personal/professional priority disputes (Toussaint, Koch, Bechamp) across decades. Session 18 evidence LP-E7, LP-E15, LP-E19, LP-E20.
      conflict_tolerance: [88, 0.72, "d", "D"],
      // Painstaking, near-obsessive craft investment in the original crystallography work, and a lifelong personal monopoly over the documented research record reflecting deep personal identification with the work. Session 18 evidence LP-E2, LP-E25.
      mastery_orientation: [85, 0.62, "s", "A"],
      // Contested a rival's earlier priority claim explicitly documented as motivated "on grounds of jealousy," replied dismissively to methodological attacks rather than conceding, and sustained a separate lifelong priority dispute with a third rival. Session 18 evidence LP-E15, LP-E19, LP-E20.
      competitiveness: [82, 0.68, "d", "D"],
      // Ran his own institutional domain in an inflexible, personally-controlled manner and maintained a lifelong personal monopoly over his own research notebooks, never permitting assistants independent notes of their own. Session 18 evidence LP-E6, LP-E25.
      autonomy_need: [78, 0.55, "s", "D"],
      // Explicitly framed his new institute's mission in humanitarian, universalist terms, and chose to treat a dying child despite real personal legal risk rather than withhold an unproven but potentially life-saving treatment. Session 18 evidence LP-E21, LP-E26.
      impact_motivation: [82, 0.6, "s", "A"],
      // Recognized and acted on the significance of an accidental experimental outcome (weakened cholera cultures) rather than discarding it as a failed batch -- a single, clean, on-point instance. Session 18 evidence LP-E14.
      opportunity_sensing: [75, 0.48, "i", "A"],
      // Responded to an early academic failure by self-directed additional preparation rather than waiting or redirecting, and advanced a minority scientific position proactively rather than deferring to consensus. Session 18 evidence LP-E1, LP-E3.
      proactive_agency: [75, 0.5, "s", "A"],
    },
  },
];

export const ROSTER_9: readonly Person[] = seeds.map(build);
