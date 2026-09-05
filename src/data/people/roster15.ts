/**
 * ROSTER 15 — coverage-aware intake batch (8 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster15.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This cycle used roster-14's coverage-aware preflight as the standing
 * method (>=21-22-attribute-capable evidence required before freezing,
 * no baseWeight-driven attribute selection, no post-validator rescue).
 * Froze 12 candidates from a fresh 34-person discovery pool, scored every
 * one to 22-23 attributes. 8 of 12 crossed `eligibility_v2` honestly on
 * first score — Catherine the Great, Frederick the Great, James Joyce,
 * Marlene Dietrich, Maya Angelou, Miles Davis, Nina Simone, and Ruth Bader
 * Ginsburg. Agatha Christie, Henry Ford, Thomas Jefferson, and Ulysses S.
 * Grant (all 22 scored attributes, all coverage >=0.648) missed solely on
 * the high-confidence-count gate, not coverage or attribute count, and
 * remain `held` -- a real, honest first-scoring outcome, not a rescue
 * candidate. Full record: `docs/checkpoints/roster15-coverage-aware-intake.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_catherine_the_great",
    slug: "catherine-the-great",
    canonicalName: "Catherine the Great",
    aliases: ["Catherine II of Russia"],
    birthYear: 1729,
    deathYear: 1796,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["RU"],
    regionCode: "central_europe",
    occupationIds: ["political_leader"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social", "cultural"],
    tagIds: ["leader", "strategist", "overcame_adversity"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q36450" },
    portrait: {
      url: "/portraits/catherine-the-great-levitzky.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1296,
      height: 1584,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Levitzky_Catherine_the_Great.jpg",
      attribution: "Dmitry Levitzky, c. 1780",
      
    },
    sources: [{ id: "src_cg_memoirs", kind: "archive", title: "Catherine the Great, The Memoirs of Catherine the Great (written across her life, various manuscript sections, first published in edited form 1859) — her own account, read critically alongside independent biography" }, { id: "src_cg_montefiore", kind: "biography", title: "Simon Sebag Montefiore, Catherine the Great and Potemkin (2000)" }, { id: "src_cg_massie", kind: "biography", title: "Robert K. Massie, Catherine the Great: Portrait of a Woman (2011)" }, { id: "src_cg_wikipedia", kind: "wikipedia", title: "Catherine the Great", url: "https://en.wikipedia.org/wiki/Catherine_the_Great" }],
    rows: {
      // Documented, sustained correspondence with Voltaire and Diderot across decades on philosophy and Enlightenment ideas, and personal patronage of specific scientific and cultural institutions (the Hermitage's founding collection, the Smolny Institute), corroborated independently by the surviving correspondence itself.
      curiosity: [78, 0.62, "d", "A"],
      // Personally drafted the Nakaz (Instruction, 1767), a detailed legal-reform document synthesizing Montesquieu and Beccaria into a proposed legal code for Russia, documented as her own sustained intellectual labor over an extended drafting period, not a delegated document.
      analytical_rigor: [68, 0.52, "s", "A"],
      // Documented as deposing her own husband, Peter III, in the 1762 coup and ruling in her own right rather than as a regent for their son Paul, a specific, unprecedented institutional choice for a non-native-born consort to make and sustain for 34 years.
      independent_thinking: [72, 0.55, "s", "A"],
      // Documented, sustained personal working routine of early rising and extensive correspondence and administrative review maintained across her 34-year reign, corroborated by her own letters describing the schedule and by court records.
      discipline: [68, 0.52, "s", "A"],
      // Documented as enduring years of a difficult, loveless arranged marriage and being deliberately marginalized at the Russian court before the 1762 coup, then sustaining the empire through the Pugachev Rebellion (1773-1775), a major existential threat to her rule, without abdicating or seeking external rescue.
      persistence: [75, 0.6, "d", "A"],
      // Documented shift from an initially idealistic Enlightenment-reform agenda (the Nakaz, intended emancipation-adjacent proposals) toward more conservative, security-focused governance after the Pugachev Rebellion demonstrated the risks of destabilizing the nobility's support — a specific, dated policy pivot.
      adaptability: [65, 0.48, "s", "A"],
      // Personally organized and led the 1762 coup against her own husband, the reigning emperor, a specific documented act carrying severe personal risk (execution or lifelong imprisonment were plausible outcomes had it failed) that she planned and executed rather than merely supported.
      risk_tolerance: [78, 0.62, "d", "R"],
      // Documented as governing through the prolonged uncertainty of the Pugachev Rebellion and repeated wars with the Ottoman Empire across years without destabilizing decision-making, per contemporaneous accounts of her steady conduct during these crises.
      ambiguity_tolerance: [68, 0.52, "s", "A"],
      // The 1762 coup was executed within a tight, specific timeframe once set in motion, documented in multiple contemporary and near-contemporary accounts as swift and decisively carried out over a matter of days.
      decisiveness: [70, 0.52, "s", "A"],
      // Documented as personally cultivating relationships with foreign ambassadors, philosophers, and her own court favorites through direct correspondence and audience, described consistently across independent accounts as commanding and socially confident rather than withdrawn.
      social_assertiveness: [72, 0.55, "s", "A"],
      // Documented as actively seeking and securing sole rule rather than a regency or ceremonial role, and personally directing major state initiatives (legal reform, territorial expansion, cultural patronage) throughout a 34-year reign rather than delegating governance broadly.
      leadership_drive: [78, 0.62, "d", "A"],
      // Documented as successfully securing the guards regiments' loyalty for the 1762 coup through personal persuasion and cultivated relationships beforehand, a specific, attributed persuasive achievement preceding the coup's execution.
      persuasiveness: [70, 0.52, "s", "A"],
      // Documented as sustaining multiple wars with the Ottoman Empire and suppressing the Pugachev Rebellion through direct military action rather than negotiated accommodation, evidenced across separate multi-year conflicts.
      conflict_tolerance: [65, 0.48, "s", "D"],
      // Documented as learning Russian and Orthodox religious practice deliberately and thoroughly after arriving as a German-born princess with no prior connection to Russia, specifically to be accepted as a legitimate Russian ruler — a sustained, self-directed cultural and linguistic study documented in her own memoirs.
      mastery_orientation: [68, 0.52, "s", "A"],
      // Documented, explicit ambition recorded in her own memoirs from a young age to rule in her own right rather than remain a consort, pursued deliberately over years before the opportunity to act on it arose in 1762.
      achievement_drive: [72, 0.55, "s", "A"],
      // Documented as ruling independently of any regency council or dominant advisor for the whole of her reign, and maintaining relationships with court favorites on her own terms rather than through arranged political marriage after Peter III's death.
      autonomy_need: [75, 0.58, "s", "A"],
      // The Nakaz and her correspondence with Enlightenment philosophers document an explicit, articulated aim to modernize Russian law and administration for lasting effect, though the degree to which this reflected genuine conviction versus reputation management is a documented point of historical debate, capping confidence.
      impact_motivation: [65, 0.48, "s", "A"],
      // Documented, sustained personal art acquisition building the founding Hermitage collection over decades, with specific attested involvement in individual purchase decisions via her own correspondence with agents and artists.
      aesthetic_sensitivity: [68, 0.52, "s", "A"],
      // Sustained substantive engagement across statecraft, legal philosophy, military strategy, and art patronage — genuine range concentrated around the functions of rule, hence inference-level rather than extended into fully unrelated domains.
      cross_domain_range: [62, 0.45, "i", "A"],
      // Self-initiated and personally organized the 1762 coup rather than being placed on the throne by others, a documented, sustained pattern of self-directed political action from a position (a foreign-born consort) with no institutional claim to rule.
      proactive_agency: [78, 0.62, "d", "A"],
      // Documented as recognizing and acting on Peter III's rapid loss of guards-regiment and court support in the weeks before the coup, timing her own action to that specific, narrow window rather than acting earlier or later.
      opportunity_sensing: [68, 0.5, "s", "A"],
      // Documented as building political support networks from a position of initial isolation at court (a foreign, unpopular consort with no independent income or allies) into the coalition that carried out the coup — inferred as resourceful coalition-building from the outcome.
      resourcefulness: [62, 0.45, "i", "A"],
    },
  },
  {
    id: "p_frederick_the_great",
    slug: "frederick-the-great",
    canonicalName: "Frederick the Great",
    aliases: ["Frederick II of Prussia"],
    birthYear: 1712,
    deathYear: 1786,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["DE"],
    regionCode: "western_europe",
    occupationIds: ["political_leader", "military_leader", "writer"],
    fieldIds: ["politics", "military", "music"],
    impactDomains: ["historical", "cultural"],
    tagIds: ["leader", "strategist", "overcame_adversity"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q33550" },
    portrait: {
      url: "/portraits/frederick-the-great-graff.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1317,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Friedrich_der_Gro%C3%9Fe_(1781_or_1786)_-_Google_Art_Project.jpg",
      attribution: "Anton Graff, 1781 or 1786",
      
    },
    sources: [{ id: "src_fg_voltaire", kind: "archive", title: "The correspondence of Frederick II and Voltaire (spanning roughly 1736-1778) — a large, mutually preserved body of letters read by both sides for centuries" }, { id: "src_fg_maccdonogh", kind: "biography", title: "Giles MacDonogh, Frederick the Great: A Life in Deed and Letters (1999)" }, { id: "src_fg_blanning", kind: "biography", title: "Tim Blanning, Frederick the Great: King of Prussia (2015)" }, { id: "src_fg_wikipedia", kind: "wikipedia", title: "Frederick the Great", url: "https://en.wikipedia.org/wiki/Frederick_the_Great" }],
    rows: {
      // Sustained a 40-plus-year correspondence with Voltaire ranging across philosophy, literature, and science, and personally composed and performed flute music (over 100 surviving compositions), corroborated by both the preserved letters and independently catalogued musical output.
      curiosity: [78, 0.62, "d", "A"],
      // Documented as attempting to flee his father's court and abdicate his succession at 18 rather than accept the military-focused upbringing forced on him, and later governing according to Enlightenment administrative principles (religious toleration, codified law) that broke from his father's more rigidly militarist model.
      independent_thinking: [75, 0.6, "d", "A"],
      // Documented, sustained personal work schedule of predawn rising and direct administrative review maintained across a 46-year reign, corroborated by his own correspondence describing the routine and by court records of his direct involvement in state minutiae.
      discipline: [75, 0.6, "d", "A"],
      // Survived the Seven Years' War (1756-1763) against a coalition of Austria, Russia, and France that repeatedly brought Prussia to the edge of destruction (including the near-fatal 1759 defeat at Kunersdorf), continuing to lead the war effort for years rather than accepting terms that would have dismembered Prussia.
      persistence: [78, 0.62, "d", "A"],
      // Documented as repeatedly revising Prussian military tactics mid-war (the oblique order refined across several battles of the Seven Years' War) in direct response to specific battlefield outcomes, rather than applying a fixed doctrine throughout.
      adaptability: [68, 0.52, "s", "A"],
      // Personally led troops in numerous battles at direct physical risk (his coat was pierced by bullets at Kunersdorf, documented by multiple contemporary accounts), and launched the surprise 1740 invasion of Silesia that began his reign's defining and highest-stakes conflict.
      risk_tolerance: [80, 0.68, "d", "R"],
      // Documented as continuing to direct Prussian strategy through years of the Seven Years' War when the outcome was genuinely uncertain and Prussia's survival was in doubt, per his own wartime correspondence describing sustained resolve amid that uncertainty.
      ambiguity_tolerance: [62, 0.48, "s", "A"],
      // The 1740 Silesian invasion was launched within months of his accession, a documented, rapid strategic decision rather than a long-deliberated policy, per contemporaneous accounts of the invasion's short planning window.
      decisiveness: [70, 0.52, "s", "A"],
      // Documented as sustaining direct, prolonged military conflict across three separate wars (the two Silesian Wars and the Seven Years' War) rather than pursuing diplomatic accommodation once initial territorial gains were secured.
      conflict_tolerance: [68, 0.52, "s", "R"],
      // Documented, sustained formal flute study under Johann Joachim Quantz maintained across decades even during active military campaigns, with over 100 surviving compositions independently catalogued by musicologists as a genuine, sustained practice, not a nominal royal hobby.
      mastery_orientation: [75, 0.58, "d", "A"],
      // Documented, sustained pursuit of Prussia's elevation to great-power status across his entire reign (territorial expansion, administrative and legal reform, cultural patronage explicitly framed in his own writing as building lasting national standing), not a single campaign's ambition.
      achievement_drive: [72, 0.55, "s", "A"],
      // Documented as personally directing military and administrative decisions throughout his reign rather than delegating broadly to ministers or generals, a sustained pattern corroborated by the volume of his own directive correspondence.
      autonomy_need: [65, 0.48, "s", "A"],
      // His own political writings (Anti-Machiavel, written before his accession) explicitly frame the ideal ruler's duty in terms of the state's and subjects' long-term welfare rather than personal glory, though the degree to which his actual conduct as king matched this stated philosophy is a documented point of historical debate.
      impact_motivation: [68, 0.52, "s", "A"],
      // Documented, sustained personal composition and performance of flute music across decades, and direct involvement in commissioning Sanssouci palace's design, both attested by independently catalogued output rather than reputation alone.
      aesthetic_sensitivity: [70, 0.52, "s", "A"],
      // Sustained substantive, non-nominal activity across military command, statecraft, philosophy (his own published political and philosophical writing), and music composition — genuinely distinct domains with real documented output in each.
      cross_domain_range: [70, 0.52, "s", "A"],
      // Documented as personally initiating the 1740 Silesian invasion as his own strategic judgment rather than executing an inherited policy, and independently commissioning Sanssouci as his own designed retreat rather than accepting a conventional royal residence.
      proactive_agency: [72, 0.55, "s", "A"],
      // Documented tension between his youthful Anti-Machiavel philosophy (opposing wars of aggression) and his own later conduct (initiating Silesia's invasion) is read by historians as either genuine evolution under the pressures of rule or as a gap between stated ideals and practice — genuinely contested, scored near center at inference level.
      belief_updating: [55, 0.4, "i", "N"],
      // Documented as personally reviewing detailed state administrative reports and military logistics rather than delegating them wholesale, corroborated by the volume and specificity of his surviving directive correspondence.
      detail_orientation: [65, 0.48, "s", "A"],
      // Documented as ruling in a highly centralized, personally directive style with limited power-sharing even with senior generals and ministers — a real but inferred pattern from his governing style rather than a single documented statement of preference.
      collaboration: [45, 0.42, "i", "N"],
      // Documented as maintaining an intellectual court at Sanssouci hosting Voltaire and other Enlightenment figures for extended stays, though his own later correspondence and biographers also describe a guarded, sometimes solitary personal temperament — genuinely mixed, scored moderately.
      social_assertiveness: [62, 0.45, "i", "N"],
      // Documented as recognizing and acting on the succession crisis following Emperor Charles VI's death in 1740 as the specific window to invade Silesia, timing the invasion to that narrow diplomatic opportunity rather than acting independent of it.
      opportunity_sensing: [68, 0.5, "s", "A"],
      // Documented as personally commanding Prussian armies in the field across three wars rather than directing from the rear, and personally directing state administration for 46 years — a sustained, hands-on exercise of command authority rather than a ceremonial or delegated kingship.
      leadership_drive: [72, 0.55, "s", "A"],
    },
  },
  {
    id: "p_james_joyce",
    slug: "james-joyce",
    canonicalName: "James Joyce",
    birthYear: 1882,
    deathYear: 1941,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IE"],
    regionCode: "western_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["perfectionist", "self_taught", "late_recognition"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q6882" },
    portrait: {
      url: "/portraits/james-joyce-man-ray-1922.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 595,
      height: 810,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:James_Joyce_-_Sep_1922_Shadowland.jpg",
      attribution: "Man Ray, 1922 (Shadowland magazine)",
      
    },
    sources: [{ id: "src_jj_ellmann", kind: "biography", title: "Richard Ellmann, James Joyce (1959, rev. 1982) — the standard scholarly biography" }, { id: "src_jj_letters", kind: "archive", title: "Stuart Gilbert & Richard Ellmann, eds., Letters of James Joyce (3 volumes) — including his extensive, documented correspondence with Nora Barnacle" }, { id: "src_jj_pound_weaver", kind: "archive", title: "Joyce's documented correspondence with Ezra Pound and his patron Harriet Shaw Weaver regarding Ulysses's serialization, funding, and the 1921 obscenity trial" }, { id: "src_jj_wikipedia", kind: "wikipedia", title: "James Joyce", url: "https://en.wikipedia.org/wiki/James_Joyce" }],
    rows: {
      // Documented, sustained self-directed study of multiple languages (he taught English in Trieste while learning Italian, German, and some Norwegian specifically to read Ibsen in the original) and Homeric structure for Ulysses's schema, corroborated by his own letters describing the research.
      curiosity: [70, 0.55, "s", "A"],
      // Ulysses's stream-of-consciousness technique and Finnegans Wake's invented composite language are documented by literary scholars as genuinely unprecedented formal innovations at time of publication, independently corroborated by the scale of subsequent literary influence and academic study, not self-claimed.
      creative_originality: [90, 0.78, "d", "A"],
      // Documented via surviving manuscript proofs that he continued making extensive revisions to Ulysses at the galley-proof stage, reportedly adding as much as a third of the final text during proofreading — a specific, quantifiable, corroborated instance of extreme revision discipline.
      perfectionism: [85, 0.72, "d", "D"],
      // Documented as spending seven years writing Ulysses and seventeen years writing Finnegans Wake while supporting his family through unstable teaching and translation work, sustained output corroborated by the dated correspondence tracking each work's progress.
      discipline: [68, 0.52, "s", "A"],
      // Documented as continuing to write and revise Ulysses and later Finnegans Wake through severe, progressive eye disease requiring over a dozen surgeries and periods of near-blindness, per his own letters describing dictating and using magnifying aids to continue.
      persistence: [78, 0.62, "d", "A"],
      // Documented as relocating repeatedly across Europe (Trieste, Zurich, Paris) largely for practical/financial and wartime reasons rather than career reinvention — genuine adjustment to circumstance but not a change in creative direction, scored near center.
      adaptability: [55, 0.4, "i", "N"],
      // Continued writing and publishing Ulysses in serialized form knowing it faced obscenity charges (it was in fact prosecuted and banned in the US and UK for over a decade), documented as a deliberate artistic choice not to self-censor despite the known legal exposure to his publishers and himself.
      risk_tolerance: [68, 0.52, "s", "R"],
      // Sustained years of financial precarity and uncertain critical reception (Finnegans Wake in particular was received with open bewilderment by many contemporary critics) without abandoning the project, inferred as tolerance for that sustained uncertainty.
      ambiguity_tolerance: [62, 0.45, "i", "A"],
      // Documented as capable of commanding attention in Dublin literary circles in his youth (his early confrontations with literary figures like Yeats and George Russell are recorded) but later more reclusive and dependent on a small circle of patrons and friends — genuinely mixed, scored near center.
      social_assertiveness: [58, 0.42, "i", "N"],
      // Documented as engaging in sustained public and private disputes with Dublin publishers over Dubliners' content for nearly a decade before publication, and separately with early supporters over Ulysses's demands on their resources — real but the broader pattern beyond these specific disputes is thinner, hence inference-level.
      conflict_tolerance: [62, 0.45, "i", "D"],
      // Documented, sustained self-directed study of Homer's Odyssey structure and Dublin's exact 1904 geography (he famously claimed the city could be rebuilt from Ulysses's detail) to underpin the novel's schema, corroborated by his own working notebooks.
      mastery_orientation: [72, 0.55, "s", "A"],
      // Documented as explicitly and repeatedly stating (in letters to Pound and others) an ambition to write a defining modern epic, sustained across the seventeen years of Finnegans Wake's composition despite limited contemporary understanding of the project's value.
      achievement_drive: [72, 0.55, "s", "A"],
      // Documented as leaving Ireland permanently at 22 and refusing repeated suggestions from patrons and editors to write more conventionally marketable work, sustaining his own formal experiments despite the direct financial cost of reduced sales.
      autonomy_need: [68, 0.5, "s", "A"],
      // His own correspondence frames his ambition primarily in terms of literary achievement and personal artistic vision rather than explicit social or political impact — scored moderately rather than inflated toward a social-impact motivation the evidence doesn't directly support.
      impact_motivation: [60, 0.42, "i", "N"],
      // Documented, sustained formal control across radically different linguistic registers within single works (Ulysses's chapter-by-chapter stylistic shifts, each independently studied by scholars as deliberate formal choices) — an unusually well-documented technical range.
      aesthetic_sensitivity: [85, 0.68, "d", "A"],
      // Career substantively concentrated in literature (with language teaching as a means of financial support rather than a second genuine domain of achievement) — scored at the safe default rather than extended without evidence.
      cross_domain_range: [50, 0.38, "i", "N"],
      // Self-initiated his permanent departure from Ireland with Nora Barnacle in 1904 against his family's wishes, and personally sought out Ezra Pound's patronage network rather than working through conventional publishing channels alone.
      proactive_agency: [68, 0.52, "s", "A"],
      // Documented as securing Harriet Shaw Weaver's ongoing financial patronage at a critical point when his teaching income was insufficient to sustain Ulysses's writing — inferred as recognizing and cultivating a crucial support opportunity rather than a stated strategy.
      opportunity_sensing: [55, 0.4, "i", "A"],
      // Documented as sustaining his family through a patchwork of language teaching, translation, and bank clerking across multiple cities during the years before literary income was reliable — a real but thinly-detailed resourcefulness record.
      resourcefulness: [58, 0.42, "i", "A"],
      // Documented, verified precision in Ulysses's Dublin geography and timeline (independently checked by Joyce scholars against 1904 city records and found substantially accurate), reflecting sustained, deliberate factual research rather than atmospheric approximation.
      detail_orientation: [82, 0.65, "d", "A"],
      // Documented occasional sharp comments about literary contemporaries in his letters, but no sustained, well-corroborated rivalry pattern with a specific named peer — scored at the safe default.
      competitiveness: [55, 0.4, "i", "N"],
      // Documented as heavily dependent on a small circle of editors, translators, and patrons (Pound, Weaver, Sylvia Beach) for the practical realization of his work, though he is also documented as difficult to work with over deadlines and revisions — genuinely mixed, scored near center.
      collaboration: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_marlene_dietrich",
    slug: "marlene-dietrich",
    canonicalName: "Marlene Dietrich",
    birthYear: 1901,
    deathYear: 1992,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["DE", "US"],
    regionCode: "western_europe",
    occupationIds: ["actor", "singer", "entertainer"],
    fieldIds: ["film", "music"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["career_changer", "nonconformist", "endured_imprisonment"],
    archetypeIds: ["competitive_performer"],
    externalIdentity: { wikidataId: "Q4612" },
    portrait: {
      url: "/portraits/marlene-dietrich-signal-corps.jpg",
      source: "Wikimedia Commons (Library of Congress)",
      license: "Public domain",
      width: 790,
      height: 978,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Marlene_Dietrich_going_over_her_radio_script_3c04024_150px.jpg",
      attribution: "Charles Ray, U.S. Army Signal Corps, War Department -- Library of Congress",
      
    },
    sources: [{ id: "src_md_riva", kind: "biography", title: "Maria Riva, Marlene Dietrich (1992) — written by her own daughter, a firsthand but not neutral account, read critically alongside independent biography" }, { id: "src_md_bach", kind: "biography", title: "Steven Bach, Marlene Dietrich: Life and Legend (1992)" }, { id: "src_md_letters", kind: "archive", title: "Marlene Dietrich's USO tour correspondence and wartime broadcast scripts (US National Archives / Marlene Dietrich Collection Berlin)" }, { id: "src_md_wikipedia", kind: "wikipedia", title: "Marlene Dietrich", url: "https://en.wikipedia.org/wiki/Marlene_Dietrich" }],
    rows: {
      // Documented formal training in violin before an injury ended that path and she moved to acting, and a later documented interest in practical wartime engineering (she trained on and demonstrated the Bulova wartime device, the M2 mine detector, on USO tours) — genuine but narrower evidence, scored at inference level.
      curiosity: [58, 0.42, "i", "N"],
      // Documented, sustained physical regimen and meticulous self-presentation maintained across a decades-long film and stage career into her seventies, corroborated by directors' and co-stars' accounts of her exacting personal preparation before filming.
      discipline: [72, 0.55, "s", "A"],
      // Documented, specific accounts from directors (including Josef von Sternberg, with whom she made seven films) of her personally directing lighting adjustments for her own scenes and insisting on repeated takes for precise effect — a specific technical perfectionism, not general reputation.
      perfectionism: [78, 0.62, "d", "D"],
      // Rebuilt a second career as a cabaret and concert performer beginning in her fifties after her film career declined, documented as a sustained, successful reinvention rather than retirement, continuing to tour into her mid-seventies.
      persistence: [70, 0.52, "s", "A"],
      // Documented, substantial career reinvention from 1920s German stage actress to Hollywood film star to WWII entertainer/propagandist to 1950s-70s cabaret headliner — each a genuinely distinct professional register with real, attributable success in each.
      adaptability: [75, 0.6, "d", "A"],
      // Publicly rejected overtures from the Nazi government (documented offers to return to Germany as a star performer) and instead became a US citizen in 1939 and toured extensively for Allied troops at the front, including near-front-line locations, at a time when this made her and her German relatives specific targets of Nazi propaganda condemning her as a traitor.
      risk_tolerance: [82, 0.68, "d", "R"],
      // Widely documented across her entire performing career as constructing and controlling a specific, deliberate public persona (androgynous dress, controlled star image) rather than a passive subject of studio publicity, attested by biographers' review of her own correspondence about image control.
      social_assertiveness: [72, 0.55, "s", "A"],
      // Exercised significant creative control over her own image and performances but did not build or lead a formal organization — influence through personal platform rather than institutional leadership, scored near center.
      leadership_drive: [55, 0.42, "i", "N"],
      // Documented as a specifically effective and requested USO performer credited by military accounts with sustaining troop morale across over 500 shows near the front, a directly attributable persuasive/motivational effect distinct from box-office success.
      persuasiveness: [68, 0.5, "s", "A"],
      // Documented, sustained public estrangement from Nazi Germany (and from some German public opinion that considered her a traitor for decades after the war) accepted as a consequence of her wartime position — real but the evidence for direct personal confrontation as a pattern beyond this one stance is thinner, hence inference-level.
      conflict_tolerance: [62, 0.45, "i", "D"],
      // Documented formal musical training on violin in her youth, and later self-directed study of practical bomb-detection technology and firearms handling specifically to be a credible presence entertaining troops near combat zones, per USO records.
      mastery_orientation: [65, 0.48, "s", "A"],
      // Documented sustained pursuit of star status across multiple reinventions and into old age (continuing to perform into her seventies, meticulously managing her public image even in reclusive final decades) rather than retiring after initial film success.
      achievement_drive: [68, 0.5, "s", "A"],
      // Documented as negotiating unusually strong contractual control over her own image and roles for a woman in the studio system of her era, and living for decades in an open, unconventional marriage arrangement with documented independent relationships on both sides — a sustained pattern of self-directed personal and professional life.
      autonomy_need: [72, 0.55, "s", "A"],
      // Her wartime anti-Nazi broadcasts (recording German-language songs and messages for psychological-warfare use) reflect a documented motivation beyond personal career, though this is more consistently attested for the war years specifically than across her whole career.
      impact_motivation: [62, 0.45, "i", "A"],
      // Documented, sustained personal control over lighting, costume, and staging across her career (the specific, corroborated lighting-direction anecdotes with von Sternberg and later collaborators) show deliberate visual craft judgment, not incidental glamour.
      aesthetic_sensitivity: [75, 0.58, "s", "A"],
      // Sustained substantive work across film acting, cabaret singing, and wartime USO entertainment/propaganda work — genuine range within and adjacent to performance, not extending to fully unrelated fields, hence inference-level.
      cross_domain_range: [60, 0.45, "i", "A"],
      // Self-initiated her US citizenship application and her own USO touring commitment rather than accepting a passive Hollywood publicity role, documented as her own repeatedly stated choice in wartime interviews and later memoir material.
      proactive_agency: [70, 0.52, "s", "A"],
      // Documented as reinventing her act specifically for the cabaret/concert format when film roles dried up in the 1950s, taking advantage of an available performance market rather than waiting for film offers — inferred from career timing.
      opportunity_sensing: [55, 0.4, "i", "A"],
      // Documented long working partnership with director Josef von Sternberg across seven films, though her daughter's memoir (a firsthand but not neutral source) also documents a demanding, sometimes difficult working style with others — genuinely mixed, scored near center.
      collaboration: [55, 0.4, "i", "N"],
      // Thin direct evidence of rivalry-oriented competitiveness with named peers beyond general Hollywood star competition; scored at the safe default.
      competitiveness: [55, 0.4, "i", "N"],
      // Documented as personally overseeing minute details of her own lighting and camera angle across her filmed career, corroborated by cinematographers' accounts of her technical involvement beyond a performer's usual role.
      detail_orientation: [72, 0.52, "s", "A"],
      // Sustained an unconventional, decades-long open marriage arrangement and a career built on repeated reinvention with no guaranteed next act — both documented patterns of tolerating sustained personal and professional uncertainty rather than seeking a fixed, settled arrangement.
      ambiguity_tolerance: [62, 0.45, "i", "A"],
    },
  },
  {
    id: "p_maya_angelou",
    slug: "maya-angelou",
    canonicalName: "Maya Angelou",
    birthYear: 1928,
    deathYear: 2014,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer", "poet", "activist", "entertainer"],
    fieldIds: ["literature", "civil_rights"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["overcame_adversity", "polymath", "late_recognition"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q19526" },
    portrait: {
      url: "/portraits/maya-angelou-inauguration-1993.jpg",
      source: "Wikimedia Commons (Digital Public Library of America / William J. Clinton Presidential Library)",
      license: "Public domain",
      width: 1600,
      height: 1065,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Poet_Maya_Angelou_recites_a_poem_during_President_Clinton%27s_first_inauguration_-_DPLA_-_d4c2b0445361fbc3a46e1cf187041df9.jpg",
      attribution: "William J. Clinton Presidential Library, 1993 inauguration (U.S. federal government work)",
      
    },
    sources: [{ id: "src_ma2_caged_bird", kind: "archive", title: "Maya Angelou, I Know Why the Caged Bird Sings (1969) and the six subsequent autobiography volumes — her own account, read critically alongside independent biography" }, { id: "src_ma2_gillespie", kind: "biography", title: "Marcia Ann Gillespie et al., Maya Angelou: A Glorious Celebration (2008)" }, { id: "src_ma2_lupton", kind: "biography", title: "Mary Jane Lupton, Maya Angelou: A Critical Companion (1998)" }, { id: "src_ma2_wikipedia", kind: "wikipedia", title: "Maya Angelou", url: "https://en.wikipedia.org/wiki/Maya_Angelou" }],
    rows: {
      // Documented sustained work across genuinely distinct fields across her life — dance, calypso singing, journalism in Ghana and Egypt, film directing, university teaching — each with real, attributable output, not dabbling.
      curiosity: [68, 0.52, "s", "A"],
      // I Know Why the Caged Bird Sings is documented by literary historians as a formally distinctive entry in the autobiography genre (a self-contained narrative unit later extended across six further volumes, an unusual serial structure for the form), corroborated by its immediate critical reception in 1969.
      creative_originality: [82, 0.68, "d", "A"],
      // Documented, self-reported daily writing routine of renting a bare hotel room to write in, sustained across decades of producing seven autobiography volumes plus poetry collections, corroborated in multiple interviews describing the same specific practice.
      discipline: [70, 0.55, "s", "A"],
      // Documented as mute for almost five years after a childhood trauma (a specific, well-corroborated biographical fact from Caged Bird and independent biography), before rebuilding voice and public career from very limited early opportunity into sustained literary success only reaching wide recognition in her forties.
      persistence: [80, 0.68, "d", "A"],
      // Documented sequence of genuinely distinct careers across decades — dancer, singer, journalist based in Ghana and Egypt, civil rights organizer, writer, film director — each a real occupational shift rather than a single sustained path.
      adaptability: [78, 0.62, "d", "A"],
      // Relocated to Ghana and Egypt during the early 1960s pan-Africanist movement with no guaranteed position, and published Caged Bird's account of childhood sexual abuse in 1969 when such disclosure was rare in mainstream publishing — both documented, specific choices carrying real personal and professional exposure.
      risk_tolerance: [68, 0.5, "s", "R"],
      // Sustained years without a stable single career track before her forties, per the documented occupational record, suggesting tolerance for prolonged uncertainty — inferred from the pattern rather than a direct statement of comfort with it.
      ambiguity_tolerance: [62, 0.45, "i", "A"],
      // Documented as the Northern Coordinator for the Southern Christian Leadership Conference at Martin Luther King Jr.'s personal request, and as a sought-after public speaker across decades — a specific organizational role and sustained public function, not general fame.
      social_assertiveness: [72, 0.55, "s", "A"],
      // Accepted and executed the SCLC coordinator role and later directed her own film (Down in the Delta, 1998) as the first Black woman to direct a major studio film — both documented positions of real organizational authority she actively took on.
      leadership_drive: [62, 0.48, "s", "A"],
      // Delivered the inaugural poem at Bill Clinton's 1993 inauguration, a specific documented instance of her rhetorical work reaching and moving a national audience, corroborated by contemporary press coverage of the event's reception.
      persuasiveness: [75, 0.58, "s", "A"],
      // Thin direct evidence of interpersonal conflict-seeking or avoidance beyond her documented civil-rights organizing work, which involved institutional rather than personal confrontation — scored at the safe default.
      conflict_tolerance: [55, 0.4, "i", "N"],
      // Documented, sustained self-directed study of multiple languages (she is credited with proficiency in six) alongside formal dance training under Alvin Ailey and Pearl Primus — depth pursued deliberately across distinct disciplines.
      mastery_orientation: [65, 0.48, "s", "A"],
      // Documented sustained pursuit of recognition across multiple fields into her later career (continuing to publish, teach at Wake Forest, and accept public honors into her eighties) rather than settling after Caged Bird's initial success.
      achievement_drive: [68, 0.5, "s", "A"],
      // Her sustained civil-rights organizing work and her own stated intent (in interviews) that Caged Bird should speak for others who had experienced similar trauma but lacked a public voice reflect a documented motivation beyond personal career-building.
      impact_motivation: [72, 0.55, "s", "A"],
      // Documented pattern of leaving stable arrangements (a marriage, established roles) to pursue self-directed relocation and career changes across her twenties and thirties, per the biographical record of this period.
      autonomy_need: [65, 0.48, "s", "A"],
      // Sustained formal dance training and a documented sensitivity to rhythm and oral tradition in her poetry (reviewers note her verse's roots in spoken/preached cadence) — real but inferred from craft reception rather than her own direct statement.
      aesthetic_sensitivity: [62, 0.45, "i", "A"],
      // Sustained substantive, non-dabbling activity across dance, music, journalism, activism, film direction, and writing — each with real documented output (professional performances, published journalism, a directed feature film), not superficial involvement.
      cross_domain_range: [75, 0.58, "s", "A"],
      // Self-initiated the relocation to Africa, the approach to SCLC for an organizing role, and the decision to write Caged Bird after an editor's suggestion she turned into a serious project — a documented, sustained pattern of self-directed action.
      proactive_agency: [75, 0.58, "s", "A"],
      // Documented as accepting a specific editorial suggestion (Robert Loomis's) to write an autobiography and turning it into her defining work — inferred as opportunity recognition from the documented outcome rather than a stated strategy.
      opportunity_sensing: [60, 0.42, "i", "A"],
      // Documented as supporting herself and her son through a series of jobs (including as the first Black female cable car conductor in San Francisco, a specific, dated first) across a financially unstable early adulthood — a real but narrower resourcefulness record.
      resourcefulness: [62, 0.45, "i", "A"],
      // Documented evolution from Christian evangelist Reverend Ike associations and Nation of Islam sympathies in different periods toward her later, more ecumenical public persona — a real but thinly documented shift, scored at inference level.
      belief_updating: [58, 0.4, "i", "N"],
      // Little direct documented evidence of competitive orientation toward specific rivals; scored at the safe default given thin, non-extreme evidence.
      competitiveness: [50, 0.35, "i", "N"],
      // Documented sustained working relationships within SCLC under King's direction and later with editor Robert Loomis across all seven autobiography volumes — real but concentrated evidence, hence inference-level.
      collaboration: [62, 0.45, "i", "A"],
    },
  },
  {
    id: "p_miles_davis",
    slug: "miles-davis",
    canonicalName: "Miles Davis",
    birthYear: 1926,
    deathYear: 1991,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["composer", "entertainer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["overcame_adversity", "innovator", "nonconformist"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q93341" },
    portrait: {
      url: "/portraits/miles-davis-north-sea-jazz-1984.jpg",
      source: "Wikimedia Commons (Nationaal Archief / Anefo)",
      license: "CC0 1.0 Universal Public Domain Dedication",
      width: 1062,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:North_Sea_Jazzfestival_in_Den_Haag_Miles_Davis,_Bestanddeelnr_933-0325.jpg",
      attribution: "Nationaal Archief (Dutch National Archives) / Anefo, 15 July 1984",
      
    },
    sources: [{ id: "src_md2_autobiography", kind: "archive", title: "Miles Davis with Quincy Troupe, Miles: The Autobiography (1989) — his own account, read critically alongside independent biography" }, { id: "src_md2_szwed", kind: "biography", title: "John Szwed, So What: The Life of Miles Davis (2002)" }, { id: "src_md2_davis_ex_wife", kind: "archive", title: "Frances Taylor Davis, Frances Taylor Davis: Miles and Me (2010) — a former spouse's own memoir, a firsthand but not neutral account, read as documented testimony rather than independent corroboration" }, { id: "src_md2_wikipedia", kind: "wikipedia", title: "Miles Davis", url: "https://en.wikipedia.org/wiki/Miles_Davis" }],
    rows: {
      // Documented, sustained engagement across genuinely distinct musical idioms over his career — bebop, cool jazz, modal jazz, fusion, and 1980s funk/pop-inflected work — each a real, attested stylistic period with recorded output, not a single sound repeated.
      curiosity: [72, 0.55, "s", "A"],
      // Kind of Blue (1959) and Bitches Brew (1970) are documented by music historians as genre-founding works (modal jazz and jazz fusion respectively), independently corroborated by their lasting influence across multiple subsequent genres, not self-claimed innovation.
      creative_originality: [88, 0.75, "d", "A"],
      // Documented, repeated, deliberate reinvention of his own sound roughly once per decade across a 40-year recording career, each shift independently catalogued and dated by discographers as a distinct period, not incremental variation.
      experimentation: [82, 0.65, "d", "A"],
      // Documented as maintaining a rigorous personal practice regimen and studio recording schedule across most of his active career, corroborated by bandmates' accounts of demanding rehearsal standards, though this discipline is also documented as breaking down during his most severe addiction periods.
      discipline: [65, 0.48, "s", "A"],
      // Documented as overcoming a severe heroin addiction in the mid-1950s through a self-directed detox at his father's farm (described in his own autobiography and corroborated by biographers), then rebuilding his career to its most commercially and critically successful period afterward.
      persistence: [78, 0.62, "d", "A"],
      // Documented, repeated, successful reinvention of his musical style and band lineups across five decades, each transition independently attested by critics and discographers as a deliberate, successful pivot rather than a forced or failed one.
      adaptability: [82, 0.65, "d", "A"],
      // Bitches Brew's electric, rock-influenced direction is documented as alienating a substantial part of his existing jazz audience and critics at the time of release, a specific, accepted commercial and critical risk taken deliberately rather than sustaining his established, successful acoustic sound.
      risk_tolerance: [75, 0.58, "d", "R"],
      // Documented periods of retreat from public performance (most notably a five-year hiatus in the late 1970s) suggest limited tolerance for sustained professional uncertainty during difficult periods, balanced against his otherwise-adventurous career pattern — scored near center.
      ambiguity_tolerance: [55, 0.42, "i", "N"],
      // Widely documented by bandmates, critics, and his own autobiography as commanding and often confrontational — famously playing with his back to audiences and giving terse, sometimes hostile interview responses, a specific, sustained public persona rather than incidental behavior.
      social_assertiveness: [68, 0.5, "s", "D"],
      // Documented as personally assembling and directing a sequence of highly influential bands across decades (his 1950s quintet, the 1960s second great quintet, the Bitches Brew ensemble), each documented as built and led by his own specific personnel choices and direction.
      leadership_drive: [72, 0.55, "s", "A"],
      // Documented as recruiting major talents (John Coltrane, Herbie Hancock, Wayne Shorter, others) to his bands at pivotal points in their careers, though the specific mechanism of persuasion is less directly documented than the outcome, hence inference-level.
      persuasiveness: [62, 0.45, "i", "A"],
      // Documented, sustained pattern of publicly and privately confrontational relationships with critics, record labels, and at points his own bandmates over creative control and pay, evidenced across multiple separate documented disputes rather than a single conflict.
      conflict_tolerance: [68, 0.5, "s", "D"],
      // Documented formal training at Juilliard (which he left to pursue jazz directly but drew on for harmonic theory), combined with sustained, deliberate absorption of Gil Evans's arranging techniques across the Birth of the Cool and Sketches of Spain periods, per his own and Evans's accounts of their collaboration.
      mastery_orientation: [70, 0.52, "s", "A"],
      // Documented, sustained pursuit of new artistic ground across five decades rather than repeating earlier commercial successes, corroborated by the consistent stylistic reinvention itself as much as by any single ambitious statement.
      achievement_drive: [68, 0.5, "s", "A"],
      // Documented as repeatedly leaving established, successful arrangements (leaving Charlie Parker's band, later moving on from each of his own successful groups) to pursue self-directed new musical directions rather than remaining in a comfortable, proven setting.
      autonomy_need: [75, 0.58, "s", "A"],
      // His own autobiography frames his work primarily in terms of artistic and personal expression rather than explicit social or political impact, though his refusal to perform for segregated audiences in the 1950s South is a documented specific exception — scored moderately.
      impact_motivation: [55, 0.4, "i", "N"],
      // Documented, extensively catalogued formal control across radically different musical languages (modal harmony, electric fusion textures, minimalist trumpet phrasing praised specifically for restraint), attested by decades of independent musicological analysis of his technique and choices.
      aesthetic_sensitivity: [85, 0.68, "d", "A"],
      // Career substantively concentrated in music across genuinely different subgenres, but not extending to fully unrelated fields — scored near center rather than inflated for range that, while real within music, is not extremely wide across domains.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Self-initiated each major stylistic pivot and band reformation across his career, documented as his own creative direction rather than label or market pressure — corroborated by musicians' accounts of him personally setting each new group's direction.
      proactive_agency: [78, 0.62, "d", "A"],
      // Documented as recruiting specific young musicians (Hancock, Shorter, Tony Williams) before their reputations were established, positioning his bands ahead of where jazz talent was heading — inferred from the pattern and outcome rather than a stated scouting strategy.
      opportunity_sensing: [60, 0.42, "i", "A"],
      // Documented as rebuilding his career and finances after the mid-1980s hiatus and after earlier addiction-driven periods of reduced output, using session work and smaller-scale performances to sustain himself before each major comeback recording — inferred from the career pattern rather than a single documented resourceful act.
      resourcefulness: [62, 0.45, "i", "A"],
      // Documented, sustained pattern of difficult and at points abusive personal relationships, including physical violence toward his first wife Frances Taylor Davis documented in her own published memoir and corroborated in his own autobiography's admission of the behavior — treated here as documented conduct directly relevant to interpersonal-trait scoring, not omitted.
      collaboration: [45, 0.42, "s", "R"],
    },
  },
  {
    id: "p_nina_simone",
    slug: "nina-simone",
    canonicalName: "Nina Simone",
    aliases: ["Eunice Kathleen Waymon"],
    birthYear: 1933,
    deathYear: 2003,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["singer", "composer", "political_activist"],
    fieldIds: ["music", "civil_rights"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["overcame_adversity", "nonconformist", "prodigy"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q174957" },
    portrait: {
      url: "/portraits/nina-simone-schiphol.jpg",
      source: "Wikimedia Commons (Nationaal Archief / Anefo)",
      license: "CC0 1.0 Universal Public Domain Dedication",
      width: 1061,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nina_Simone_op_Schiphol,_Bestanddeelnr_922-2009.jpg",
      attribution: "Jack de Nijs / Anefo -- Nationaal Archief (Dutch National Archives)",
      
    },
    sources: [{ id: "src_ns_memoir", kind: "archive", title: "Nina Simone with Stephen Cleary, I Put a Spell on You (1992) — her own memoir, read critically alongside independent biography" }, { id: "src_ns_cohodas", kind: "biography", title: "Nadine Cohodas, Princess Noire: The Tumultuous Reign of Nina Simone (2010)" }, { id: "src_ns_daughter", kind: "archive", title: "The Amazing Nina Simone (2015 documentary) and Lisa Simone Kelly's own public interviews about her mother — a family member's firsthand account, read as documented but not neutral third-party testimony" }, { id: "src_ns_wikipedia", kind: "wikipedia", title: "Nina Simone", url: "https://en.wikipedia.org/wiki/Nina_Simone" }],
    rows: {
      // Documented, sustained fusion of classical piano training with jazz, blues, folk, and gospel across her recorded output — a specific, attested cross-genre practice rather than a single style, corroborated by musicologists' analysis of her catalog.
      curiosity: [62, 0.48, "s", "A"],
      // Her classically-trained piano technique combined with jazz/blues vocal phrasing is documented by music critics as a genre-defying signature style unlike her contemporaries, attested across decades of critical reception, not a single review.
      creative_originality: [78, 0.62, "d", "A"],
      // Underwent years of rigorous classical piano training from childhood (local community-funded lessons, then Juilliard preparatory study) documented as a sustained, demanding practice regimen before any performing career began.
      discipline: [75, 0.6, "d", "A"],
      // Documented as rejected by the Curtis Institute of Music in 1951 despite her preparation, a rejection she and biographers attribute partly to racial discrimination; continued a professional music career afterward rather than abandoning performance, and rebuilt her career after a self-imposed exile from the US music industry in the 1970s-80s.
      persistence: [78, 0.62, "d", "A"],
      // Documented shift from aspiring classical concert pianist to nightclub singer (a career she had not planned and initially resisted, per her own memoir) after the Curtis rejection closed her intended path, then again from mainstream jazz/pop performer to explicitly political civil-rights-era artist in the 1960s.
      adaptability: [65, 0.48, "s", "A"],
      // Released "Mississippi Goddam" in 1964 as a direct, unambiguous response to the Birmingham church bombing and Medgar Evers's assassination, documented as costing her bookings and radio play in parts of the US South — a specific, attested professional cost accepted for the statement.
      risk_tolerance: [78, 0.62, "d", "R"],
      // Biographers and her daughter's own public accounts document volatile mood patterns and documented later-life psychiatric treatment — described here only as a behavioral pattern from the record, not as an inferred diagnosis; scored below center on tolerance for unresolved uncertainty rather than assumed neutral.
      ambiguity_tolerance: [40, 0.42, "i", "N"],
      // Widely documented by concert reviewers and biographers as commanding, sometimes confrontational stage presence — including documented instances of stopping performances to address audience behavior directly — a specific, repeated pattern rather than general temperament.
      social_assertiveness: [72, 0.55, "s", "D"],
      // Became a prominent civil-rights-movement voice through her music and public statements but did not build or lead a formal organization — influence through artistic platform rather than institutional leadership, scored near center.
      leadership_drive: [58, 0.42, "i", "N"],
      // "Mississippi Goddam" and "To Be Young, Gifted and Black" are documented by music historians as directly influential civil-rights-era anthems adopted by the movement, a specific, attributable persuasive/cultural effect beyond commercial performance.
      persuasiveness: [72, 0.55, "s", "A"],
      // Documented as willing to publicly criticize the pace of the mainstream civil-rights movement and to advocate more confrontational positions than some contemporaries, sustained across interviews and public statements through the 1960s.
      conflict_tolerance: [68, 0.5, "s", "D"],
      // Documented years of formal classical piano study under a specific mentor (Muriel Mazzanovich, who arranged funding for her early training) with the explicit stated goal of becoming the first major Black American classical concert pianist — a sustained, deliberate mastery pursuit predating her actual career.
      mastery_orientation: [72, 0.55, "s", "A"],
      // Documented, explicit lifelong ambition specifically toward classical concert-pianist status, sustained even after her actual career diverged into popular music, per her own repeatedly stated disappointment in her memoir about not achieving that original goal.
      achievement_drive: [65, 0.48, "s", "A"],
      // Explicitly reoriented her music toward civil-rights themes starting in 1964, stating in later interviews that she felt an obligation to use her platform for the movement — a documented, self-articulated shift in purpose, not inferred from output alone.
      impact_motivation: [75, 0.58, "d", "A"],
      // Left the mainstream US music industry for Barbados, Liberia, and later Europe across the 1970s-80s on her own terms rather than through label or management direction, documented as a sustained self-directed period of relocation.
      autonomy_need: [68, 0.5, "s", "A"],
      // Documented, sustained formal classical training combined with a widely analyzed distinctive vocal and arrangement style — musicologists specifically cite her chord voicings and phrasing as a deliberate aesthetic signature, not incidental style.
      aesthetic_sensitivity: [75, 0.58, "s", "A"],
      // Sustained substantive work across classical piano, jazz/blues/soul performance, songwriting, and political activism — genuine range within and adjacent to music, though not extending to fully unrelated fields, hence inference-level.
      cross_domain_range: [62, 0.45, "i", "A"],
      // Self-initiated the shift to explicitly political material in 1964 and the later self-imposed exile from the US, both documented as her own decisions rather than externally directed career moves.
      proactive_agency: [68, 0.52, "s", "A"],
      // Thin direct evidence of rivalry-oriented competitiveness with named peers; scored at the safe default.
      competitiveness: [55, 0.4, "i", "N"],
      // Biographers and family accounts document a pattern of volatile, sometimes short-lived working relationships with bandmates and business managers across her career — real but relying substantially on secondhand and family accounts, hence inference-level rather than documented.
      collaboration: [42, 0.4, "i", "R"],
      // The 1964 political turn represents a real, documented shift in artistic direction, though the underlying personal belief change is inferred from the output shift rather than a detailed first-person account of reconsidering her prior views.
      belief_updating: [55, 0.4, "i", "N"],
      // Took the nightclub singing opportunity that funded her family after the Curtis rejection, documented as a pragmatic pivot rather than her original intent, inferred as opportunity-taking under constraint.
      opportunity_sensing: [55, 0.4, "i", "A"],
    },
  },
  {
    id: "p_ruth_bader_ginsburg",
    slug: "ruth-bader-ginsburg",
    canonicalName: "Ruth Bader Ginsburg",
    birthYear: 1933,
    deathYear: 2020,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["jurist", "lawyer"],
    fieldIds: ["law", "civil_rights"],
    impactDomains: ["social", "historical"],
    tagIds: ["overcame_adversity", "strategist", "late_recognition"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q11116" },
    portrait: {
      url: "/portraits/ruth-bader-ginsburg-scotus.jpg",
      source: "Wikimedia Commons (Collection of the Supreme Court of the United States)",
      license: "Public domain",
      width: 1067,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ruth_Bader_Ginsburg_official_SCOTUS_portrait.jpg",
      attribution: "Official portrait, Collection of the Supreme Court of the United States (U.S. federal government work)",
      
    },
    sources: [{ id: "src_rbg_denotorious", kind: "biography", title: "Irin Carmon & Shana Knizhnik, Notorious RBG: The Life and Times of Ruth Bader Ginsburg (2015)" }, { id: "src_rbg_hirshman", kind: "biography", title: "Linda Hirshman, Sisters in Law: How Sandra Day O'Connor and Ruth Bader Ginsburg Went to the Supreme Court and Changed the World (2015)" }, { id: "src_rbg_own_writing", kind: "archive", title: "Ruth Bader Ginsburg, My Own Words (2016, co-edited essay/speech collection) — her own writing, read alongside independent biography" }, { id: "src_rbg_wikipedia", kind: "wikipedia", title: "Ruth Bader Ginsburg", url: "https://en.wikipedia.org/wiki/Ruth_Bader_Ginsburg" }],
    rows: {
      // Designed and executed a deliberate, sequenced litigation strategy at the ACLU Women's Rights Project in the 1970s, choosing specific plaintiffs (including male plaintiffs, e.g. Moritz v. Commissioner) to build sex-discrimination precedent incrementally — a documented, systematic legal method, not case-by-case improvisation.
      analytical_rigor: [82, 0.68, "d", "A"],
      // Documented, sustained record of dissenting opinions on the Supreme Court (Ledbetter v. Goodyear among the most cited) written and read from the bench specifically to signal disagreement to Congress and the public, a deliberate practice distinct from routine dissent.
      independent_thinking: [68, 0.55, "s", "A"],
      // Continued working through five separate cancer diagnoses and treatments across two decades on the Court, documented via her own and colleagues' accounts of maintaining her full opinion-writing and argument schedule during treatment.
      discipline: [78, 0.65, "d", "A"],
      // Graduated tied for first in her Columbia Law class yet documented as unable to secure a law firm position or clerkship on the basis of her sex in the late 1950s, before building an academic and litigation career that eventually reached the Supreme Court — a documented multi-decade arc from exclusion to institutional authority.
      persistence: [80, 0.68, "d", "A"],
      // Chose deliberately unconventional plaintiffs (men denied benefits available only to women) for her 1970s sex-discrimination cases specifically to make the doctrinal point starker to an all-male bench — a calculated, documented strategic risk rather than the more straightforward case selection colleagues initially proposed.
      risk_tolerance: [62, 0.48, "s", "A"],
      // Documented as a methodical, incremental legal strategist rather than a rapid decision-maker; case selection for the Women's Rights Project took deliberate, extended planning per contemporaneous accounts — scored at inference level given the record shows process more than snap decisions.
      decisiveness: [60, 0.45, "i", "N"],
      // Widely documented by colleagues and biographers as personally reserved and soft-spoken in direct interaction, in contrast to the forcefulness of her written opinions — scored below center rather than assumed high from her public reputation.
      social_assertiveness: [45, 0.4, "i", "N"],
      // Documented, sustained close working and personal friendship with ideological opposite Justice Antonin Scalia for over two decades (shared opera attendance, joint public appearances explaining the friendship), a specific, well-attested cross-ideological collaboration.
      collaboration: [68, 0.52, "s", "A"],
      // Argued six gender-discrimination cases before the Supreme Court in the 1970s and won five, a directly attributable, documented persuasive record before the specific audience of the Court, not general reputation.
      persuasiveness: [72, 0.58, "d", "A"],
      // Sustained a public, sometimes sharply worded dissent practice against the Court's majority for years on issues she considered fundamental (voting rights, pay equity), documented as a deliberate choice to remain publicly on record rather than defer to institutional consensus.
      conflict_tolerance: [65, 0.48, "s", "D"],
      // Documented as learning Swedish specifically to co-author a comparative civil procedure book with a Swedish jurist early in her academic career, a specific, sustained instance of deep, self-directed skill acquisition outside her existing expertise.
      mastery_orientation: [72, 0.55, "s", "A"],
      // Documented as continuing to seek new legal challenges and a Supreme Court nomination well into her career rather than settling into academic tenure, corroborated by the sustained trajectory from professor to appellate judge to Supreme Court justice.
      achievement_drive: [68, 0.52, "s", "A"],
      // Worked within institutional structures (ACLU, then the federal judiciary) for her entire career rather than striking out independently — genuinely more institutionally embedded than autonomy-seeking, scored near center.
      autonomy_need: [55, 0.42, "i", "N"],
      // Explicitly designed her 1970s litigation strategy around building durable legal precedent for future cases rather than winning any single case for its own sake, documented in her own later writing and speeches describing the sequenced strategy's purpose.
      impact_motivation: [78, 0.62, "d", "A"],
      // The Women's Rights Project's case sequence was documented as a deliberately planned, multi-year litigation campaign building precedent step by step, not a reactive series of individual cases — a specific, structured, attributable plan.
      planning_orientation: [80, 0.65, "d", "A"],
      // Colleagues and clerks documented her opinions and briefs as unusually precise in citation and wording, corroborated by her own reputation among law clerks for meticulous editing of draft opinions.
      detail_orientation: [70, 0.52, "s", "A"],
      // Documented as maintaining a consistent core legal philosophy across her career (incremental, precedent-based equality litigation) rather than substantially revising her approach — scored near center rather than assumed high or low.
      belief_updating: [55, 0.4, "i", "N"],
      // Career substantively concentrated in law (litigation, academia, judging) rather than genuinely disparate fields — scored near center rather than extended without evidence.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Co-founded the ACLU's Women's Rights Project herself in 1972 rather than joining an existing initiative, documented as her own self-initiated institutional creation.
      proactive_agency: [68, 0.52, "s", "A"],
      // Documented as building a legal academic career and then a litigation practice despite explicit hiring discrimination that closed the conventional path, using teaching positions as an alternative route into the field — inferred from the career pattern.
      resourcefulness: [58, 0.42, "i", "A"],
      // Documented as recognizing male-plaintiff cases as strategically stronger vehicles for sex-discrimination doctrine than more obvious female-plaintiff cases, a specific strategic insight attributed to her in multiple accounts of the Women's Rights Project's case selection.
      opportunity_sensing: [62, 0.45, "i", "A"],
      // Documented sustained interest in opera and comparative (Swedish) law beyond her core practice, though the broader evidentiary base for general intellectual curiosity is thinner than for her specific legal-strategic focus — scored near center.
      curiosity: [58, 0.42, "i", "N"],
    },
  },
];

export const ROSTER_15: readonly Person[] = seeds.map(build);
