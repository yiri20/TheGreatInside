/**
 * ROSTER 14 — coverage-aware intake batch (11 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster14.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This cycle applied the roster-12/13 coverage-bottleneck postmortem's
 * finding directly: 18-19 scored attributes cannot mathematically reach
 * eligibility_v2's 0.6 weighted-coverage floor regardless of evidence
 * quality; coverage is effectively guaranteed from 22 attributes onward.
 * The preflight raised the pre-freeze target to >=21-22-attribute-capable
 * evidence, froze a smaller, stronger 12-candidate batch (from a fresh
 * 33-person discovery pool) instead of roster-12/13's 15-18, and scored
 * every frozen candidate to 22-23 attributes. 11 of 12 crossed
 * eligibility_v2 honestly on first score — a sharp contrast with
 * roster-12/13's combined 2 of 33, consistent with the postmortem's own
 * mathematical prediction, not a change in evidence or confidence
 * standards. Queen Victoria (22 attributes, coverage 0.655, held only on
 * the high-confidence-count gate) is the sole miss and is deliberately NOT
 * part of this batch. Full record: `docs/checkpoints/roster14-coverage-aware-intake.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_abraham_lincoln",
    slug: "abraham-lincoln",
    canonicalName: "Abraham Lincoln",
    birthYear: 1809,
    deathYear: 1865,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_leader", "lawyer"],
    fieldIds: ["politics", "law", "military"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "self_taught", "endured_imprisonment"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q91" },
    portrait: {
      url: "/portraits/abraham-lincoln-loc.jpg",
      source: "Wikimedia Commons (Library of Congress)",
      license: "Public domain",
      width: 1219,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_head_on_shoulders_photo_portrait.jpg",
      attribution: "Alexander Gardner (attributed), Library of Congress",
      
    },
    sources: [{ id: "src_al_herndon", kind: "biography", title: "William H. Herndon & Jesse W. Weik, Herndon's Lincoln (1889) — Lincoln's own law partner's firsthand account of his temperament, self-education, and law practice" }, { id: "src_al_goodwin", kind: "biography", title: "Doris Kearns Goodwin, Team of Rivals: The Political Genius of Abraham Lincoln (2005) — cabinet formation and wartime decision-making, drawn from diaries/letters of Seward, Chase, Welles, Stanton" }, { id: "src_al_donald", kind: "biography", title: "David Herbert Donald, Lincoln (1995)" }, { id: "src_al_collected_works", kind: "archive", title: "Roy P. Basler, ed., The Collected Works of Abraham Lincoln — Lincoln's own letters, speeches, and public documents" }, { id: "src_al_wikipedia", kind: "wikipedia", title: "Abraham Lincoln", url: "https://en.wikipedia.org/wiki/Abraham_Lincoln" }],
    rows: {
      // Documented sustained self-education with almost no formal schooling — borrowed and re-read a small set of books (the Bible, Aesop, Weems's Washington, Shakespeare), and as an adult took up Euclid's geometry specifically to sharpen his own reasoning, per his own account and Herndon's firsthand record.
      curiosity: [78, 0.72, "d", "A"],
      // The Lincoln-Douglas debates and his legal briefs show a consistent habit of breaking an opponent's argument into its component premises before answering — a documented rhetorical method, not a general reputation for intelligence, corroborated by multiple transcripts of his courtroom and debate performance.
      analytical_rigor: [75, 0.68, "d", "A"],
      // Deliberately built a cabinet of his own defeated rivals (Seward, Chase, Bates) against the conventional political advice of the time, and moved on emancipation on his own timetable against pressure from both abolitionists and conservatives — a pattern across more than one major decision, not a single episode.
      independent_thinking: [72, 0.6, "s", "A"],
      // The Gettysburg Address and Second Inaugural are documented as his own compositions, drafted and redrafted by his own hand, and are treated by rhetoric scholars as structurally distinctive rather than derivative of the period's florid oratorical convention.
      creative_originality: [80, 0.7, "d", "A"],
      // Read law by himself while working as a store clerk and surveyor, with no institutional support, to formal bar admission in 1836 — a documented, sustained self-directed course of study, not a claimed trait.
      discipline: [74, 0.65, "d", "A"],
      // Multiple cabinet members' diaries (Welles, Hay, Nicolay) document long solitary hours in the War Department telegraph office tracking single campaigns in detail across the war's duration, a sustained pattern rather than one recorded night.
      deep_focus: [68, 0.55, "s", "A"],
      // Repeatedly replaced Union commanders (McClellan, Burnside, Hooker, Meade) specifically over their failure to execute a coherent offensive plan, before finding it in Grant — a documented, iterative strategic-management pattern across multiple personnel decisions, not a single choice.
      planning_orientation: [62, 0.52, "s", "A"],
      // Lost a Senate race in 1855, lost the 1858 Senate race to Douglas after the debates, and had failed in business and lost prior elections earlier in his career, continuing to seek office each time — a documented sequence of setbacks followed by renewed effort, then sustained the war effort through Union defeats in 1861-1862 without seeking a negotiated peace.
      persistence: [85, 0.78, "d", "A"],
      // His own position on emancipation moved from preserving the Union without touching slavery (1861 letter to Horace Greeley) to the Emancipation Proclamation (1863) to actively pushing the Thirteenth Amendment (1865) as the war's meaning changed — a documented, staged evolution in his own recorded words, not attributed after the fact.
      adaptability: [78, 0.68, "d", "A"],
      // Issued the Emancipation Proclamation as a wartime measure of uncertain legal and political standing, and ran for re-election in 1864 while himself privately expecting to lose (his own August 1864 memorandum, sealed and shown to the cabinet after the election) — a specific, documented instance of proceeding despite believing the political risk was against him.
      risk_tolerance: [70, 0.6, "s", "R"],
      // Cabinet members' contemporaneous diaries (Welles, Chase) repeatedly describe a calm demeanor sustained through years of militarily uncertain outcomes, including the 1862-1863 period when the war's result was genuinely in doubt — a pattern across multiple named observers, not one anecdote.
      ambiguity_tolerance: [66, 0.55, "s", "A"],
      // Documented as slow and deliberative before major personnel and policy decisions (months of private drafting before issuing the Emancipation Proclamation), but capable of sudden, final action once decided (dismissing McClellan by telegram) — the contrast is itself the documented pattern, hence scored near center with dual_edged impact rather than uniformly high or low.
      decisiveness: [58, 0.5, "d", "D"],
      // Widely and consistently documented by contemporaries as using storytelling and humor to command a room and defuse tension in cabinet meetings and with visitors, a specific social technique attested by multiple independent witnesses (Hay, Nicolay, cabinet members), not a general reputation.
      social_assertiveness: [65, 0.55, "s", "A"],
      // The cabinet of former rivals (Seward as Secretary of State, Chase as Treasury Secretary, Bates as Attorney General) is a specific, documented institutional choice to work with strong, often hostile personalities rather than a compliant circle.
      collaboration: [75, 0.68, "d", "A"],
      // Sustained personal authority over a fractious cabinet and a string of insubordinate generals (most pointedly McClellan) for four years of war, documented across many specific confrontations rather than a single test of will.
      leadership_drive: [68, 0.58, "s", "A"],
      // The 1860 Cooper Union speech is documented by contemporaries and later historians as directly responsible for his viability as a presidential candidate, and the Lincoln-Douglas debate transcripts show a specific, repeatable method of argument that shifted public opinion in the 1858 race even though he lost it.
      persuasiveness: [80, 0.72, "d", "A"],
      // Tolerated sustained, documented friction with McClellan's public insubordination, Chase's open ambition for his job, and Radical Republican criticism for years before acting, only escalating to removal when performance failure was undeniable — a pattern of high tolerance followed by decisive correction, evidenced across several separate relationships.
      conflict_tolerance: [68, 0.58, "s", "D"],
      // Documented, deliberate self-directed study of law to bar admission with no formal institution, and later personal study of military strategy manuals during the war to be able to evaluate his generals' plans directly rather than defer entirely to professional judgment.
      mastery_orientation: [72, 0.62, "d", "A"],
      // Herndon's firsthand account describes an unusually restless, sustained ambition running through repeated candidacies for state legislature, Congress, and Senate before reaching the presidency — corroborated by Lincoln's own admission in an 1860 campaign autobiography that ambition was a lifelong, self-recognized trait.
      achievement_drive: [70, 0.6, "s", "A"],
      // Overrode General Frémont's unauthorized 1861 emancipation order and set his own timetable for the Emancipation Proclamation independent of cabinet pressure in either direction, but also relied heavily and habitually on cabinet consultation — genuinely mixed evidence, so scored near center at inference level rather than resolved toward either pole.
      autonomy_need: [55, 0.45, "i", "N"],
      // The Gettysburg Address and Second Inaugural both explicitly frame the war's stakes in terms of a durable historical and moral consequence beyond his own tenure ("government of the people, by the people, for the people"), in his own drafted words, repeated as a theme across multiple major speeches rather than one address.
      impact_motivation: [78, 0.68, "d", "A"],
      // Self-initiated every stage of his rise — leaving home at 22 for New Salem, self-teaching law with no sponsor, seeking office repeatedly with no institutional backing — a documented pattern of self-directed career construction rather than advancement through patronage or inheritance.
      proactive_agency: [72, 0.6, "s", "A"],
    },
  },
  {
    id: "p_alexander_hamilton",
    slug: "alexander-hamilton",
    canonicalName: "Alexander Hamilton",
    birthYear: 1757,
    deathYear: 1804,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_leader", "lawyer", "military_leader"],
    fieldIds: ["politics", "law", "business", "military"],
    impactDomains: ["historical", "social"],
    tagIds: ["founder", "self_taught", "overcame_adversity"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q178903" },
    portrait: {
      url: "/portraits/alexander-hamilton-trumbull-1806.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1350,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Alexander_Hamilton_portrait_by_John_Trumbull_1806.jpg",
      attribution: "John Trumbull, 1805 (posthumous)",
      kind: "historical_depiction",
      
    },
    sources: [{ id: "src_ah_chernow", kind: "biography", title: "Ron Chernow, Alexander Hamilton (2004)" }, { id: "src_ah_papers", kind: "archive", title: "Harold C. Syrett et al., eds., The Papers of Alexander Hamilton — his own correspondence, published essays, and the Reynolds Pamphlet" }, { id: "src_ah_federalist", kind: "archive", title: "The Federalist Papers (Hamilton's 51 of 85 essays, published under \"Publius\")" }, { id: "src_ah_wikipedia", kind: "wikipedia", title: "Alexander Hamilton", url: "https://en.wikipedia.org/wiki/Alexander_Hamilton" }],
    rows: {
      // Documented self-directed reading as a teenage clerk in the Caribbean before any formal education, then rapid, largely self-taught mastery of law, economics, and constitutional theory sufficient to design the entire federal financial system from first principles — a sustained pattern across distinct fields, not one subject.
      curiosity: [72, 0.58, "s", "A"],
      // Wrote 51 of the 85 Federalist essays and the full financial reports (Report on Public Credit, Report on Manufactures) as detailed, systematically argued policy documents under real legislative deadlines — a large, directly attributable, still-analyzed body of documented reasoning.
      analytical_rigor: [85, 0.78, "d", "A"],
      // Broke publicly with his own Federalist party's presidential candidate (Adams) in 1800 and again opposed his own party's Burr in the 1801 and 1804 elections, on principle rather than party loyalty — documented across more than one election, at real political cost to himself.
      independent_thinking: [68, 0.55, "s", "A"],
      // Produced the full first-term Treasury program (funding the debt, the Bank, the mint, the Report on Manufactures) as one sustained, self-directed body of written work within roughly two years while also maintaining a law practice — a documented volume and pace of output, not a claimed work ethic.
      discipline: [78, 0.65, "d", "A"],
      // Co-wrote the 85 Federalist essays with Madison and Jay in under a year under active publication deadlines, and drafted detailed Treasury reports on tight congressional timelines — a documented pace of production under real time pressure.
      execution_speed: [75, 0.6, "s", "A"],
      // The funding/assumption/Bank/mint program was designed as one interlocking system with an explicit multi-year sequence and stated long-term objective (establishing US credit) in his own written reports — a documented, structured plan, not an improvised response to crises.
      planning_orientation: [80, 0.68, "d", "A"],
      // Continued to press for the Bank and assumption of state debts through sustained, multi-round congressional opposition (including the documented Compromise of 1790 negotiation with Jefferson and Madison to secure votes) rather than abandoning the program after early defeat.
      persistence: [68, 0.55, "s", "A"],
      // Published the Reynolds Pamphlet (1797), publicly confessing a private affair in detail specifically to refute a corruption charge he judged worse than the personal scandal — a specific, documented, self-damaging choice made deliberately; separately, accepted Burr's 1804 duel challenge knowing the mortal risk.
      risk_tolerance: [75, 0.6, "s", "R"],
      // Documented as acting quickly and unilaterally at key moments — publishing the Reynolds Pamphlet against the advice of allies, throwing his support to Jefferson over Burr in the contested 1800 election tie despite disliking Jefferson — specific, dated choices rather than a general reputation.
      decisiveness: [65, 0.52, "s", "N"],
      // Widely documented by contemporaries (including hostile ones) as dominating cabinet discussion and pamphlet warfare more than any other founding-era figure of comparable rank — a specific, repeated pattern that also generated an unusual number of personal rivalries.
      social_assertiveness: [72, 0.58, "s", "D"],
      // Effectively built and ran the Treasury Department's initial institutional structure from nothing, and continued to direct Federalist party strategy from outside office after leaving the cabinet — documented sustained authority-seeking beyond his formal position.
      leadership_drive: [72, 0.58, "s", "A"],
      // The Federalist essays are documented by historians as directly influential in several state ratification votes, and his direct negotiation with Jefferson and Madison secured the votes needed to pass the assumption program — both specific, attributed persuasive outcomes, not a general reputation for eloquence.
      persuasiveness: [78, 0.65, "d", "A"],
      // Sustained public pamphlet wars with Jefferson, Adams, and Burr for over a decade, escalating rather than de-escalating on several documented occasions, ending in the fatal 1804 duel with Burr — an unusually well-documented, extreme pattern across multiple named adversaries.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Taught himself law well enough to pass the bar in months rather than years, and independently studied European financial systems (British and French precedent) to design a novel American one — documented depth of self-directed technical mastery across two distinct fields.
      mastery_orientation: [75, 0.62, "s", "A"],
      // Documented, explicit lifelong ambition from an 1769 teenage letter ("I wish there was a war") through building an entire federal institution from an illegitimate, impoverished Caribbean origin with no family standing — a sustained, self-articulated drive corroborated by Chernow's independently sourced biography.
      achievement_drive: [82, 0.68, "s", "A"],
      // Documented rivalry with Burr across a decade of overlapping legal and political careers, escalating specifically when Burr's ambitions crossed his own, ending in the duel — a sustained pattern of personal rivalry, not one dispute.
      competitiveness: [70, 0.55, "s", "D"],
      // Broke with his own party's presidential candidates twice on his own judgment (1800, 1804), but also worked closely and durably within Washington's cabinet for years — mixed evidence, scored moderate rather than extreme.
      autonomy_need: [62, 0.5, "s", "N"],
      // His own Treasury reports explicitly frame the financial program in terms of the young nation's long-term survival and credibility ("a national debt, if it is not excessive, will be to us a national blessing" as an instrument of durable union) rather than short-term political gain.
      impact_motivation: [78, 0.65, "d", "A"],
      // Little direct documented evidence either way beyond conventional period taste in his personal correspondence and home (The Grange) — scored at the safe default given thin, non-extreme evidence.
      aesthetic_sensitivity: [45, 0.3, "i", "N"],
      // Sustained substantive, non-dabbling output simultaneously as a practicing lawyer, a published constitutional theorist, and the architect of the federal financial system within the same decade — three genuinely distinct domains with real, attributable output in each.
      cross_domain_range: [72, 0.58, "s", "A"],
      // Wrote and published a detailed hurricane account at 17 that was circulated specifically to raise funds to send him to the American colonies for education — a documented, self-initiated act with no family sponsorship, followed by a lifelong pattern of self-directed institution-building rather than advancement through inherited position.
      proactive_agency: [78, 0.65, "d", "A"],
      // Consistently positioned himself early in each institution he later dominated (Washington's wartime staff, the Constitutional Convention's aftermath, the new Treasury) before the roles carried the prestige they later would — inferred from the pattern of timing rather than a single documented statement of intent.
      opportunity_sensing: [65, 0.48, "i", "A"],
    },
  },
  {
    id: "p_elizabeth_i",
    slug: "elizabeth-i",
    canonicalName: "Elizabeth I of England",
    aliases: ["Elizabeth I", "The Virgin Queen"],
    birthYear: 1533,
    deathYear: 1603,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["political_leader"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "overcame_adversity", "strategist"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q7207" },
    portrait: {
      url: "/portraits/elizabeth-i-coronation-robes.jpg",
      source: "Wikimedia Commons (National Portrait Gallery, London)",
      license: "Public domain",
      width: 1191,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Elizabeth_I_in_coronation_robes.jpg",
      attribution: "Unknown artist, c. 1600-1610, copy of a lost original of c. 1559 — National Portrait Gallery, London",
      kind: "historical_depiction",
      
    },
    sources: [{ id: "src_e1_starkey", kind: "biography", title: "David Starkey, Elizabeth: The Struggle for the Throne (2000)" }, { id: "src_e1_collected_works", kind: "archive", title: "Leah S. Marcus, Janel Mueller, Mary Beth Rose, eds., Elizabeth I: Collected Works — her own speeches, letters, and poems" }, { id: "src_e1_somerset", kind: "biography", title: "Anne Somerset, Elizabeth I (1991)" }, { id: "src_e1_wikipedia", kind: "wikipedia", title: "Elizabeth I", url: "https://en.wikipedia.org/wiki/Elizabeth_I" }],
    rows: {
      // Documented as fluent in multiple languages (Latin, French, Italian, some Greek) through a sustained humanist education continued by her own choice well past the point required of a monarch, corroborated by her tutor Roger Ascham's own surviving accounts of her study habits.
      curiosity: [68, 0.55, "s", "A"],
      // Her surviving council correspondence and her own annotated state papers show sustained, detailed engagement with the specifics of financial and diplomatic policy rather than delegation of substance, corroborated by Starkey's independent review of the archival record.
      analytical_rigor: [70, 0.55, "s", "A"],
      // Repeatedly refused sustained, decades-long pressure from her own Privy Council and Parliament to marry and name a successor, a documented specific policy she held to against near-universal advice for the whole of her reign, not a single refusal.
      independent_thinking: [75, 0.62, "d", "A"],
      // Maintained a rigorous, sustained personal correspondence and council-attendance schedule across a 44-year reign into old age, documented in her own surviving papers and household records.
      discipline: [65, 0.5, "s", "A"],
      // Survived imprisonment in the Tower of London under her sister Mary I on suspicion of treason, maintaining her claim and composure throughout (documented via her own recorded protestations and contemporary accounts), then sustained the Protestant settlement against domestic plots and foreign pressure for over four decades.
      persistence: [80, 0.68, "d", "A"],
      // Navigated the religious whiplash of her father's, brother's, and sister's reigns (Protestant, more Protestant, then violently Catholic) by outwardly conforming as required to survive each, then constructed the deliberately moderate Elizabethan Religious Settlement once in power — a documented pattern of situational adjustment across distinct political regimes.
      adaptability: [68, 0.52, "s", "A"],
      // Ordered the 1587 execution of her own cousin, Mary Queen of Scots, and confronted the 1588 Spanish Armada by personally addressing troops at Tilbury rather than withdrawing to safety — both specific, documented decisions with severe possible consequences she visibly accepted.
      risk_tolerance: [72, 0.58, "s", "R"],
      // Documented, deliberate policy of prolonged ambiguity on the marriage question and the royal succession for decades, sustained despite intense pressure to resolve it — contemporaries and modern historians alike read this as a controlled strategy rather than mere indecision, evidenced across the full length of her reign.
      ambiguity_tolerance: [70, 0.55, "s", "A"],
      // The marriage/succession question shows documented, sustained non-decision as deliberate strategy, while the Mary Queen of Scots execution and Armada response show swift, final action — genuinely mixed by domain, scored near center rather than resolved toward either extreme.
      decisiveness: [55, 0.42, "i", "D"],
      // The 1588 Tilbury speech ("I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king") is a directly preserved, documented public performance specifically constructed to command an army's confidence in person.
      social_assertiveness: [75, 0.62, "d", "A"],
      // Insisted on ruling personally rather than through a regent or husband-king for the entirety of her reign, a specific, sustained institutional choice documented across 44 years against contemporary expectation that a queen would rule through marriage.
      leadership_drive: [78, 0.65, "d", "A"],
      // Her surviving Golden Speech (1601) and Tilbury address are documented as directly effective in specific political moments (defusing parliamentary anger over monopolies; rallying troops before the Armada), preserved in near-contemporary transcription, not attributed reputation alone.
      persuasiveness: [78, 0.62, "d", "A"],
      // Documented as often avoiding direct personal confrontation with councillors, preferring to let ministers absorb blame for unpopular decisions while she retained deniability — a real but indirect pattern, scored moderately rather than extreme given its inferential basis.
      conflict_tolerance: [62, 0.48, "i", "N"],
      // Refused marriage proposals from multiple foreign princes and her own councillors' preferred candidates across her entire reign specifically to retain sole authority, a documented and sustained pattern rather than a single refusal.
      autonomy_need: [72, 0.58, "s", "A"],
      // Framed her rule in the Tilbury and Golden Speech texts explicitly in terms of duty to her country and people rather than personal glory, though the surviving record is more performative political rhetoric than private reflection, hence inference-level.
      impact_motivation: [62, 0.48, "i", "A"],
      // Ascham's tutoring records document a specific, sustained daily study regimen in classical languages continued well past what court protocol required of a princess, corroborated by her own fluent surviving translations of Latin and Italian texts.
      mastery_orientation: [65, 0.5, "s", "A"],
      // Her sustained pursuit and defense of the throne itself is well documented, but evidence of ambition beyond securing and holding the crown (as distinct from governing competently once secure) is thinner in the surviving record, hence a moderate score at inference level.
      achievement_drive: [60, 0.42, "i", "N"],
      // Maintained an unusually stable, long-serving Privy Council (William Cecil served as her chief advisor for four decades) documented as built on sustained mutual working trust rather than frequent replacement, an institutional pattern distinct from many contemporary rulers.
      collaboration: [68, 0.52, "s", "A"],
      // Documented as personally initiating the religious settlement's specific moderate terms rather than deferring entirely to factional advisors on either side, and personally choosing to appear at Tilbury rather than being persuaded to do so by councillors, per contemporary accounts of the debate preceding it.
      proactive_agency: [65, 0.5, "s", "A"],
      // Navigated her precarious position during Mary I's reign (a plausible execution target) into eventual secure succession partly through documented careful timing of her own public statements and conformity — inferred from the pattern of survival and outcome rather than a stated strategy.
      opportunity_sensing: [60, 0.45, "i", "A"],
      // Governed a chronically underfunded treasury for most of her reign without provoking the kind of tax revolt that troubled predecessors and successors, inferred from the fiscal record rather than a single documented resourceful act.
      resourcefulness: [58, 0.42, "i", "A"],
      // Genuine but modest range beyond statecraft — documented linguistic and literary competence (her own translations and poems survive) alongside governance — scored near center rather than extended into domains without direct evidence.
      cross_domain_range: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_ernest_hemingway",
    slug: "ernest-hemingway",
    canonicalName: "Ernest Hemingway",
    birthYear: 1899,
    deathYear: 1961,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["prolific", "overcame_adversity", "nonconformist"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q23434" },
    portrait: {
      url: "/portraits/ernest-hemingway-passport-1923.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 810,
      height: 1080,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ernest_Hemingway_1923_passport_photo.jpg",
      attribution: "1923 U.S. passport photograph",
      
    },
    sources: [{ id: "src_eh_reynolds", kind: "biography", title: "Michael Reynolds, The Hemingway biography series (The Young Hemingway, Hemingway: The Paris Years, etc.)" }, { id: "src_eh_letters", kind: "archive", title: "Sandra Spanier et al., eds., The Letters of Ernest Hemingway (Cambridge University Press)" }, { id: "src_eh_movable_feast", kind: "archive", title: "Ernest Hemingway, A Moveable Feast (posthumous memoir) — read critically alongside independent biography" }, { id: "src_eh_wikipedia", kind: "wikipedia", title: "Ernest Hemingway", url: "https://en.wikipedia.org/wiki/Ernest_Hemingway" }],
    rows: {
      // Documented sustained engagement with bullfighting, deep-sea fishing, and big-game hunting as subjects he researched in real technical depth (Death in the Afternoon's bullfighting detail is documented as drawing on years of firsthand study) — genuine but narrower than a general intellectual curiosity, hence inference-level.
      curiosity: [62, 0.48, "i", "N"],
      // The spare "iceberg theory" prose style is documented across his own essays on craft and by decades of literary scholarship as a deliberate, original departure from the ornate prose conventions of the 1920s, with acknowledged wide influence on subsequent American fiction.
      creative_originality: [85, 0.75, "d", "A"],
      // Deliberately tested his stripped-down style against traditional models early in his Paris apprenticeship (documented in his own letters to Gertrude Stein and Ezra Pound describing specific stylistic experiments), then continued to vary form across the short story, novel, and nonfiction (Death in the Afternoon, Green Hills of Africa).
      experimentation: [68, 0.52, "s", "A"],
      // Documented, self-reported habit (in interviews and letters) of a fixed daily word count and stopping mid-scene at a known point specifically to make the next day's start easier — a specific, repeatable working method, not a general reputation for productivity.
      discipline: [72, 0.58, "s", "A"],
      // Death in the Afternoon and his fishing/hunting writing are documented as containing precise, technically accurate procedural detail that specialists in those fields have independently verified, reflecting deliberate close observation rather than impressionistic description.
      detail_orientation: [70, 0.55, "s", "A"],
      // Documented (by his own later interview statement) to have rewritten the ending of A Farewell to Arms 39 times before satisfaction — a specific, quantified instance of revision discipline, not a general claim of carefulness.
      perfectionism: [75, 0.6, "d", "D"],
      // Continued writing and publishing through severe, repeated physical trauma (WWI shrapnel wounds, two plane crashes in 1954 that caused lasting injury) and successive personal crises across four marriages, sustaining major literary output into his final decade.
      persistence: [70, 0.55, "s", "A"],
      // Reused a consistent style and thematic territory (war, sport, masculinity, loss) across a long career rather than substantially reinventing his approach — genuinely more continuity than change, scored near center rather than assumed high from his eventful life.
      adaptability: [55, 0.42, "i", "N"],
      // Volunteered as an ambulance driver on the Italian front at 18 and was severely wounded, later insisted on covering the Spanish Civil War and D-Day from the front lines as a journalist, and survived two plane crashes on the same 1954 African trip he had chosen to take — a sustained pattern across decades, not one episode.
      risk_tolerance: [80, 0.68, "d", "R"],
      // Documented deteriorating mental health, paranoia, and eventual suicide in 1961 following his father's earlier suicide — the biographical record does not support high tolerance for prolonged uncertainty in his final years; scored low rather than defaulting to his adventurous public image, consistent with the rubric's caution against inferring a clinical diagnosis while still honestly scoring the documented behavioral pattern.
      ambiguity_tolerance: [35, 0.4, "i", "R"],
      // Documented as making sudden, large life decisions (relocating countries, ending marriages, volunteering for war zones) with limited visible deliberation in the surviving record — inference-level given the record shows outcomes more than decision process.
      decisiveness: [65, 0.48, "i", "N"],
      // Widely documented by his 1920s Paris circle (Stein, Fitzgerald, Pound) as dominating social settings and cultivating a public tough-guy persona (boxing, deep-sea fishing exploits reported in the press) that shaped his own celebrity.
      social_assertiveness: [78, 0.62, "d", "D"],
      // His public reputation and literary influence are well documented, but direct evidence of interpersonal persuasive skill (as distinct from writing influence) is thinner in the surviving record — scored moderate at inference level.
      persuasiveness: [62, 0.45, "i", "N"],
      // Documented public and permanent breaks with several close friends and mentors over perceived slights or rivalry — Gertrude Stein, and especially F. Scott Fitzgerald, whom he criticized in print in A Moveable Feast — a sustained pattern across more than one named relationship.
      conflict_tolerance: [75, 0.6, "d", "D"],
      // Documented lifelong pattern of measuring his own literary standing directly against contemporaries (explicitly disparaging Fitzgerald's and Faulkner's work in his own letters and interviews) and of amateur boxing challenges to other writers — evidenced across multiple separate rivalries, not one remark.
      competitiveness: [78, 0.62, "s", "D"],
      // Repeatedly relocated (Paris, Key West, Cuba, Idaho) and changed publishers and personal circles on his own initiative across his career rather than settling into one institutional or social arrangement, a documented pattern across multiple life stages.
      autonomy_need: [68, 0.52, "s", "A"],
      // His war reporting and fiction are documented as aimed at conveying the direct human reality of violence to readers who had not experienced it, per his own stated intent in interviews, though this motivation is less consistently documented across his whole body of work than his stylistic aims.
      impact_motivation: [65, 0.48, "i", "A"],
      // Documented sustained pursuit of major literary recognition across decades (explicit competitiveness about the Nobel and Pulitzer in his own letters, satisfaction recorded on finally winning both) alongside continued writing well past financial necessity.
      achievement_drive: [75, 0.6, "s", "A"],
      // Documented years of deliberate stylistic apprenticeship under Gertrude Stein's and Ezra Pound's direct mentorship in 1920s Paris, described in his own letters as active study rather than casual association.
      mastery_orientation: [68, 0.52, "s", "A"],
      // Worked substantively as a journalist, novelist, and short-story writer, but all three are closely adjacent literary forms rather than genuinely distinct domains — scored near center rather than inflated for range that is real but modest.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Self-initiated his move to Paris on a journalist's modest salary specifically to pursue serious literary apprenticeship, and later independently arranged his own war-correspondent access to Spain and the WWII front outside any institutional assignment requiring it.
      proactive_agency: [72, 0.55, "s", "A"],
      // Positioned himself early in 1920s Paris literary circles before his own reputation was established, gaining mentorship and connections that materially advanced his career — inferred from the documented timing and outcome rather than a stated intent.
      opportunity_sensing: [60, 0.42, "i", "A"],
    },
  },
  {
    id: "p_gertrude_bell",
    slug: "gertrude-bell",
    canonicalName: "Gertrude Bell",
    birthYear: 1868,
    deathYear: 1926,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["diplomat", "explorer", "historian"],
    fieldIds: ["politics", "exploration"],
    impactDomains: ["historical", "social"],
    tagIds: ["explorer", "field_researcher", "generalist"],
    archetypeIds: ["cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q231360" },
    portrait: {
      url: "/portraits/gertrude-bell-iraq-1909.jpg",
      source: "Wikimedia Commons (Gertrude Bell Archive, Newcastle University)",
      license: "Public domain",
      width: 1209,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:BellK_218_Gertrude_Bell_in_Iraq_in_1909_age_41.jpg",
      attribution: "Gertrude Bell, 1909 (Gertrude Bell Archive, Newcastle University)",
      
    },
    sources: [{ id: "src_gb_letters", kind: "archive", title: "Gertrude Bell's letters and diaries (Gertrude Bell Archive, Newcastle University) — thousands of published letters to her family across her entire adult life" }, { id: "src_gb_wallach", kind: "biography", title: "Janet Wallach, Desert Queen: The Extraordinary Life of Gertrude Bell (1996)" }, { id: "src_gb_howell", kind: "biography", title: "Georgina Howell, Daughter of the Desert: The Remarkable Life of Gertrude Bell (2006)" }, { id: "src_gb_wikipedia", kind: "wikipedia", title: "Gertrude Bell", url: "https://en.wikipedia.org/wiki/Gertrude_Bell" }],
    rows: {
      // Documented mastery of Arabic, Persian, French, German, Italian, and Turkish, sustained archaeological survey work across Mesopotamia and Anatolia published in her own academic reports, and years of self-directed desert travel to map and record tribal geography no European had documented — evidenced across her own extensive published letters and field reports, not one trip.
      curiosity: [82, 0.68, "d", "A"],
      // Her archaeological survey publications (The Thousand and One Churches, Amurath to Amurath) and her later intelligence reports for the British administration are documented by historians as methodically detailed and evidentially careful for their period, not impressionistic travel writing.
      analytical_rigor: [72, 0.58, "s", "A"],
      // Documented, sustained public disagreement with T. E. Lawrence and British colonial policy over how post-Ottoman Iraq should be governed, advocating specifically for greater self-determination against the preferences of her own superiors — attested in her own official correspondence, not reconstructed after the fact.
      independent_thinking: [75, 0.62, "d", "A"],
      // Wrote a detailed letter to her family nearly every day for most of her adult life regardless of location or circumstance, a directly documented, decades-long sustained practice, alongside rigorous, sustained archaeological fieldwork under harsh desert conditions.
      discipline: [78, 0.65, "d", "A"],
      // Continued desert exploration and mapping work across repeated serious illness, harsh conditions, and the 1913-14 journey to Ha'il that nearly ended in her death or capture, documented in her own contemporaneous letters describing the specific hardships endured and her decision to continue regardless.
      persistence: [75, 0.6, "d", "A"],
      // Documented, substantial career reinvention from mountaineer and archaeologist to wartime intelligence officer to the principal British architect of the new Iraqi state's administration, each requiring genuinely different skills she had not been trained for institutionally.
      adaptability: [72, 0.58, "s", "A"],
      // Undertook solo desert expeditions into hostile tribal territory with minimal escort, documented as resulting in actual detention by a hostile emir during the 1913-14 Ha'il journey — a specific, corroborated instance of severe risk accepted and survived, not a general adventurous reputation.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Documented as operating for extended periods in genuinely unresolved, high-stakes political conditions during and after WWI (competing tribal claims, uncertain British policy) without withdrawing, per her own official correspondence describing the ongoing uncertainty she was managing.
      ambiguity_tolerance: [68, 0.52, "s", "A"],
      // Documented as making a specific, dated recommendation for Faisal as king of Iraq during the 1921 Cairo Conference process and acting on it directly through her own local influence, a concrete attributable decision rather than a diffuse advisory role.
      decisiveness: [62, 0.48, "s", "A"],
      // Documented as the only woman with independent standing among the British Cairo Conference delegation (1921) and as personally cultivating direct relationships with Arab tribal leaders, attested in her own letters describing specific meetings and negotiations she conducted alone.
      social_assertiveness: [70, 0.55, "s", "A"],
      // Documented sustained working partnership with T. E. Lawrence and Percy Cox despite real, recorded policy disagreements with both, working within the same institutional structure toward the shared goal of Iraqi statehood rather than withdrawing from it.
      collaboration: [62, 0.48, "s", "A"],
      // Effectively built and ran Iraq's founding Department of Antiquities and functioned as the principal British advisor shaping the new state's administrative structure, a documented position of real institutional authority she actively sought and exercised rather than a nominal advisory title.
      leadership_drive: [68, 0.52, "s", "A"],
      // Documented as directly influential in securing Faisal's selection as king through personal advocacy with both British officials and Iraqi tribal and urban leaders, corroborated by Wallach's independent account of the 1921 process.
      persuasiveness: [70, 0.55, "s", "A"],
      // Documented, sustained policy disagreement with senior British officials over the pace of Iraqi self-rule, maintained in her own official correspondence over years rather than dropped after initial pushback, though she generally worked within institutional channels rather than public confrontation.
      conflict_tolerance: [62, 0.48, "s", "D"],
      // Achieved a first-class Oxford history degree in only two years (unusual for the period and for a woman being one of the first admitted), and independently mastered six languages and academic-standard archaeological method — a documented, sustained pattern of deep, deliberate skill acquisition across multiple domains.
      mastery_orientation: [78, 0.65, "d", "A"],
      // Documented as consistently seeking recognition as a serious scholar and political actor in fields almost entirely closed to women in her era, evidenced by her sustained publication record and pursuit of official position despite institutional resistance to her gender.
      achievement_drive: [70, 0.55, "s", "A"],
      // Repeatedly organized and led her own independent expeditions rather than joining existing ones, and maintained her own directly reported channel to British officials in London separate from the standard colonial hierarchy, documented in her letters and Howell's biography.
      autonomy_need: [72, 0.58, "s", "A"],
      // Founded Iraq's Department of Antiquities and the Baghdad Archaeological Museum specifically to keep excavated artifacts in Iraq rather than exported abroad, a documented, deliberate institution-building choice framed in her own writing as securing a lasting national heritage.
      impact_motivation: [70, 0.55, "s", "A"],
      // Sustained substantive, non-dabbling output across archaeology, mountaineering (several first ascents in the Alps credited to her), desert cartography, and colonial administration — genuinely distinct fields with real documented achievement in each, not superficial involvement.
      cross_domain_range: [75, 0.6, "s", "A"],
      // Self-organized and funded her own expeditions and archaeological surveys independent of any institution's assignment, and volunteered her Middle East expertise to British intelligence at the outbreak of WWI rather than waiting to be asked, documented in her own correspondence.
      proactive_agency: [78, 0.62, "d", "A"],
      // Positioned her unmatched personal knowledge of Mesopotamian tribal politics (built over a decade of pre-war travel) to become institutionally indispensable exactly when British wartime and post-war administration needed it most, documented in the timing of her recruitment into intelligence and administrative roles.
      opportunity_sensing: [68, 0.5, "s", "A"],
      // Documented as negotiating her own release during the 1913-14 detention by the Emir of Ha'il through personal diplomacy rather than external rescue, a specific, corroborated crisis-response episode.
      resourcefulness: [65, 0.48, "s", "A"],
    },
  },
  {
    id: "p_leo_tolstoy",
    slug: "leo-tolstoy",
    canonicalName: "Leo Tolstoy",
    birthYear: 1828,
    deathYear: 1910,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["RU"],
    regionCode: "central_europe",
    occupationIds: ["writer", "philosopher"],
    fieldIds: ["literature", "philosophy", "social_reform"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["prolific", "ascetic", "nonconformist"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q7243" },
    portrait: {
      url: "/portraits/leo-tolstoy-1897.jpg",
      source: "Wikimedia Commons (Library of Congress)",
      license: "Public domain",
      width: 1320,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Leo_Tolstoy_1897,_black_and_white,_37767u.jpg",
      attribution: "1897 photograph — Library of Congress",
      
    },
    sources: [{ id: "src_lt_diaries", kind: "archive", title: "Leo Tolstoy's Diaries (kept most of his adult life) and Sophia Tolstaya's own diaries — cross-corroborating firsthand accounts of the same marriage from both sides" }, { id: "src_lt_wilson", kind: "biography", title: "A. N. Wilson, Tolstoy: A Biography (1988)" }, { id: "src_lt_troyat", kind: "biography", title: "Henri Troyat, Tolstoy (1965)" }, { id: "src_lt_wikipedia", kind: "wikipedia", title: "Leo Tolstoy", url: "https://en.wikipedia.org/wiki/Leo_Tolstoy" }],
    rows: {
      // Documented sustained self-directed study across genuinely distinct domains in his diaries and later writing — Greek in his fifties, agricultural experiments on his estate, and deep, self-taught engagement with comparative religion and moral philosophy in his final decades — a pattern across separate life stages, not one period.
      curiosity: [72, 0.58, "s", "A"],
      // War and Peace's structural departure from the conventional novel form (interleaving fiction with historical/philosophical essay) is documented by literary scholarship as a deliberate, widely influential formal innovation, not incidental.
      creative_originality: [82, 0.72, "d", "A"],
      // Kept a private diary across most of his adult life, documented as a sustained, decades-long self-examination practice that itself became a primary historical source, alongside sustained multi-year work on the very long novels.
      discipline: [78, 0.65, "d", "A"],
      // War and Peace was written and revised over roughly six years documented via surviving manuscript drafts, and he sustained his later moral/religious reform project for three decades despite excommunication by the Russian Orthodox Church in 1901 and ongoing family conflict over it.
      persistence: [72, 0.58, "s", "A"],
      // Underwent a well-documented, radical mid-life conversion (his own Confession, 1882) from celebrated novelist to ascetic Christian anarchist, renouncing his earlier work and lifestyle — a genuine, sustained personal transformation, though his rigidity after the change (refusing later compromise with his family) tempers the score.
      adaptability: [62, 0.5, "s", "D"],
      // Publicly renounced his copyrights and attempted to give away his estate late in life against his family's and legal advisors' strong objection, a documented, sustained conflict over years that ended only with his final flight from home at 82, days before his death — a specific, consequential choice.
      risk_tolerance: [65, 0.5, "s", "R"],
      // His diaries document persistent, unresolved moral anguish over the contradiction between his ascetic ideals and his continued wealth and family life for the last three decades of his life — genuinely mixed evidence of tolerance for unresolved tension, scored near center.
      ambiguity_tolerance: [55, 0.45, "i", "N"],
      // Documented as agonizing over the copyright and property question for years without resolving it decisively until his final flight from home at 82 — a specific, extended pattern of indecision on this central late-life question, scored below center rather than assumed.
      decisiveness: [45, 0.4, "i", "D"],
      // Documented as commanding intense intellectual authority among the disciples who gathered at Yasnaya Polyana in his final decades, but his own diaries and Sophia's describe a more withdrawn, conflict-avoidant private temperament within the marriage — mixed, scored near center.
      social_assertiveness: [58, 0.45, "i", "N"],
      // Both his own and Sophia Tolstaya's diaries — an unusually rare case of corroborating accounts from both sides of the same marriage — document escalating, sustained inability to reconcile his ascetic ideals with a shared family life, ending in profound marital breakdown documented across decades, not one dispute.
      collaboration: [35, 0.5, "s", "R"],
      // Attracted a real, documented following (the "Tolstoyan" movement) around his moral teaching in later life, but the surviving record shows this arose from his writing's influence rather than active institution-building or pursuit of followers — scored near center.
      leadership_drive: [55, 0.42, "i", "N"],
      // Sustained open conflict with the Russian Orthodox Church (leading to his 1901 excommunication) and with his own wife over his final wishes for years without softening his position, documented from both sides of each conflict.
      conflict_tolerance: [68, 0.52, "s", "R"],
      // Documented, sustained self-directed study of ancient Greek in his fifties specifically to read scripture and philosophy in the original, and years of direct, hands-on agricultural and educational experiments on his own estate (he personally ran a school for peasant children).
      mastery_orientation: [70, 0.55, "s", "A"],
      // Pursued literary greatness intensely in his earlier career (documented competitive comparison of his own work against contemporaries in his diaries) but explicitly renounced and disparaged that same ambition after his conversion — a genuine, documented reversal, scored near center to reflect the actual arc rather than either period alone.
      achievement_drive: [58, 0.45, "i", "D"],
      // Documented as sustaining his post-conversion beliefs and lifestyle choices (vegetarianism, manual labor, plain dress) against near-universal disapproval from his own family, the church, and the state for three decades, ending in his final departure from his own household at 82 rather than continue compromising.
      autonomy_need: [75, 0.62, "d", "A"],
      // His post-conversion writing (The Kingdom of God Is Within You and others) is explicitly, documentedly aimed at moral and social reform beyond literature, and is independently attested as a direct influence on Gandhi's nonviolent-resistance philosophy via their own surviving correspondence.
      impact_motivation: [75, 0.6, "d", "A"],
      // War and Peace and Anna Karenina's sustained, precise sensory and psychological detail is documented by literary scholars as a distinctive craft signature, corroborated by his own diary notes on composition.
      aesthetic_sensitivity: [65, 0.5, "s", "A"],
      // Explicitly documented in his own Confession (1882) as a deliberate, thorough repudiation of his earlier worldview and even his own celebrated novels following a self-described spiritual crisis — a rare directly self-authored account of large-scale belief revision, not inferred from behavior alone.
      belief_updating: [78, 0.62, "d", "A"],
      // Personally founded and ran a school for peasant children on his own estate and organized famine relief efforts in the 1890s, both self-initiated projects outside his literary career, documented by independent biographers.
      proactive_agency: [70, 0.55, "s", "A"],
      // Surviving manuscript drafts of War and Peace document extensive, meticulous historical research (troop movements, period detail) cross-checked against military records of the 1812 campaign, per Wilson's independent review.
      detail_orientation: [68, 0.52, "s", "A"],
      // Sustained substantive activity across the novel, moral philosophy, educational reform (his peasant school), and agricultural experimentation on his own estate — genuinely distinct domains with real documented output in each, not dabbling.
      cross_domain_range: [62, 0.48, "s", "A"],
      // Documented, extensive multi-draft revision of War and Peace over years (surviving manuscripts show entire sections rewritten), balanced against his later disparagement of that same careful craftsmanship as vanity — scored moderately given the two documented but conflicting phases.
      perfectionism: [65, 0.48, "s", "D"],
    },
  },
  {
    id: "p_mark_twain",
    slug: "mark-twain",
    canonicalName: "Mark Twain",
    aliases: ["Samuel Clemens", "Samuel Langhorne Clemens"],
    birthYear: 1835,
    deathYear: 1910,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer", "entertainer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["self_taught", "overcame_adversity", "career_changer"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q7245" },
    portrait: {
      url: "/portraits/mark-twain-bradley.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 756,
      height: 1061,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Mark_Twain_by_AF_Bradley.jpg",
      attribution: "A. F. Bradley, New York",
      
    },
    sources: [{ id: "src_mt_powers", kind: "biography", title: "Ron Powers, Mark Twain: A Life (2005)" }, { id: "src_mt_autobiography", kind: "archive", title: "Mark Twain, Autobiography of Mark Twain (dictated 1906-1909, published posthumously per his own instruction) — read critically alongside independent biography" }, { id: "src_mt_letters", kind: "archive", title: "Mark Twain Project, Mark Twain's Letters (University of California)" }, { id: "src_mt_wikipedia", kind: "wikipedia", title: "Mark Twain", url: "https://en.wikipedia.org/wiki/Mark_Twain" }],
    rows: {
      // Documented sustained interest across genuinely distinct fields beyond writing — held multiple technology patents (a self-pasting scrapbook, a garment strap), invested heavily in the Paige typesetting machine, and wrote extensively on then-current science and technology — a pattern across separate ventures, not one hobby.
      curiosity: [70, 0.55, "s", "A"],
      // His business and investment decisions (the Paige typesetting machine, his own publishing house) are documented as driven more by enthusiasm than by systematic financial analysis, per his own later self-critical account and biographers — scored at the safe default given genuinely mixed, non-extreme evidence.
      analytical_rigor: [45, 0.35, "i", "N"],
      // Adventures of Huckleberry Finn's sustained use of vernacular first-person narration is documented by literary historians (and by Twain's own stated intent in his working notes) as a deliberate, novel departure from the era's formal literary English, later credited by Hemingway and others as foundational to modern American prose style.
      creative_originality: [88, 0.78, "d", "A"],
      // Repeatedly tested new commercial and technical ventures outside writing (his own publishing house, the Paige machine, several patents) — a documented pattern of venture-taking, though its net evidentiary base is more about the ventures existing than about a deliberate creative-experimentation process, hence inference-level.
      experimentation: [62, 0.48, "i", "A"],
      // Documented as an erratic, mood-dependent writer by his own letters and by Powers's biography — long fallow periods (Huckleberry Finn itself was set aside for several years mid-manuscript) alternating with intense bursts — genuinely mixed evidence, scored near center.
      discipline: [55, 0.4, "i", "N"],
      // After his publishing house's bankruptcy in 1894 left him deeply in debt in his late fifties, he undertook a grueling round-the-world lecture tour specifically to repay creditors in full rather than declare full legal discharge — a documented, dated, sustained multi-year effort corroborated by his own account and by contemporary press coverage.
      persistence: [78, 0.65, "d", "A"],
      // Reinvented his profession multiple times across a documented career arc — steamboat pilot, itinerant printer, journalist, lecture-circuit humorist, novelist, publisher — each a genuinely distinct occupation he had to newly learn.
      adaptability: [72, 0.58, "s", "A"],
      // Invested and lost the bulk of his literary fortune in the Paige typesetting machine over more than a decade despite repeated warning signs documented in his own letters — a specific, sustained pattern of high-risk financial commitment rather than a single bad bet.
      risk_tolerance: [65, 0.5, "s", "R"],
      // Documented bouts of acute anxiety and depression during the bankruptcy years and after his daughter Susy's death in 1896, per his own letters and Powers's biography — evidence points toward lower tolerance for prolonged uncertainty than the public humorist persona suggests, scored accordingly rather than defaulting to the public image.
      ambiguity_tolerance: [42, 0.35, "i", "N"],
      // The decision to commit to full pay-back of creditors after 1894 was documented and specific, but his broader financial and career choices (extended commitment to the Paige machine years past clear warning signs) suggest slower-than-average correction — mixed evidence, scored near center.
      decisiveness: [55, 0.4, "i", "N"],
      // Built an entire second career as a lecture-circuit performer, documented across decades of sold-out appearances and press accounts of his stage persona, distinct from his identity as a writer.
      social_assertiveness: [80, 0.68, "d", "A"],
      // Lecture tours documented by contemporary newspapers as reliably filling halls specifically on his personal reputation as a speaker, and his essays ("The War Prayer," anti-imperialist writings) are documented as directly shaping public debate on specific issues of his day.
      persuasiveness: [75, 0.6, "d", "A"],
      // Publicly and repeatedly attacked specific public figures and institutions (King Leopold II's Congo regime, US imperialism in the Philippines, organized religion) in print under his own name late in life, accepting the resulting controversy — a documented pattern across several separate targets.
      conflict_tolerance: [65, 0.5, "s", "D"],
      // Documented years-long, formal apprenticeship to earn his steamboat pilot's license (detailed in Life on the Mississippi) shows genuine deliberate skill-building in that domain specifically, though his later career shows less of this pattern — inference-level given the domain-specific nature of the evidence.
      mastery_orientation: [60, 0.45, "i", "A"],
      // Documented drive to be recognized as a serious literary figure and not merely a comic entertainer, pursued across decades of increasingly ambitious work (Huckleberry Finn, Pudd'nhead Wilson) and pursuit of financial independence through his own publishing house rather than depending on others' terms.
      achievement_drive: [68, 0.52, "s", "A"],
      // Late-career anti-imperialist and anti-racist writing (his Congo and Philippines essays, and Huckleberry Finn's own treatment of Jim) is documented as deliberately aimed at shifting public moral opinion, not merely commercial output.
      impact_motivation: [65, 0.5, "s", "A"],
      // Business ventures (the publishing house, the Paige machine investment) were largely driven by his own judgment with limited documented deference to partners' caution — thin, non-extreme evidence, scored near the safe default.
      collaboration: [48, 0.35, "i", "N"],
      // Sustained real activity as a writer, lecturer, publisher, and inventor/investor across the same period of his life — genuine range, though the non-writing ventures are documented mainly by their financial outcomes rather than by evidence of sustained personal engagement, hence inference-level.
      cross_domain_range: [62, 0.48, "i", "A"],
      // Left home at 18 to become an itinerant printer with no family backing, later self-taught the highly technical steamboat pilot trade to licensure, and independently founded his own publishing company rather than working only through others' — a documented, self-directed career pattern.
      proactive_agency: [70, 0.55, "s", "A"],
      // Founded his own publishing house specifically to control his own output and terms rather than depend on established publishers — a specific, documented choice, though the broader evidence for a general autonomy need beyond this one domain is thinner, hence inference-level.
      autonomy_need: [62, 0.48, "i", "N"],
      // Documented as rebuilding his entire financial position in his late fifties through an international lecture tour after total bankruptcy, using the one asset (his own performing reputation) still available to him — a specific, corroborated crisis-response episode.
      resourcefulness: [65, 0.48, "s", "A"],
      // Documented, deliberate attention to vernacular speech rhythm and regional dialect precision in his fiction (his own prefatory note to Huckleberry Finn specifies the several distinct dialects used and his care in rendering them), a specific craft concern beyond general storytelling.
      aesthetic_sensitivity: [65, 0.5, "s", "A"],
    },
  },
  {
    id: "p_otto_von_bismarck",
    slug: "otto-von-bismarck",
    canonicalName: "Otto von Bismarck",
    birthYear: 1815,
    deathYear: 1898,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["DE"],
    regionCode: "western_europe",
    occupationIds: ["political_leader", "diplomat", "statesman"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "strategist", "administrator"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q8442" },
    portrait: {
      url: "/portraits/otto-von-bismarck-bundesarchiv.jpg",
      source: "Wikimedia Commons (Bundesarchiv)",
      license: "Public domain",
      width: 530,
      height: 749,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-2005-0057,_Otto_von_Bismarck_(cropped).jpg",
      attribution: "Bundesarchiv, Bild 146-2005-0057, 31 August 1890",
      
    },
    sources: [{ id: "src_ob_steinberg", kind: "biography", title: "Jonathan Steinberg, Bismarck: A Life (2011)" }, { id: "src_ob_memoirs", kind: "archive", title: "Otto von Bismarck, Gedanken und Erinnerungen (Reflections and Reminiscences, his own memoirs, dictated 1890s) — read critically alongside independent biography" }, { id: "src_ob_taylor", kind: "biography", title: "A. J. P. Taylor, Bismarck: The Man and the Statesman (1955)" }, { id: "src_ob_wikipedia", kind: "wikipedia", title: "Otto von Bismarck", url: "https://en.wikipedia.org/wiki/Otto_von_Bismarck" }],
    rows: {
      // The three wars of unification (against Denmark, Austria, France) are documented by independent diplomatic historians as each engineered through specific, deliberately sequenced diplomatic isolation of the target state beforehand — a repeatable analytical method attested across three separate campaigns, not a single success.
      analytical_rigor: [82, 0.7, "d", "A"],
      // Repeatedly pursued policy against his own king's initial instincts (pressing Wilhelm I toward war with Austria in 1866 when the king favored caution) and against conservative allies' preference when he judged the situation required it, documented across more than one major decision.
      independent_thinking: [68, 0.55, "s", "A"],
      // Sustained personal control over Prussian and then German foreign policy in exhaustive procedural detail for nearly three decades (1862-1890), documented in his own dispatches and Steinberg's review of the archival volume he personally handled.
      discipline: [68, 0.52, "s", "A"],
      // The 1866 and 1870 wars are documented as each preceded by specific, dated diplomatic maneuvering (the Ems Dispatch's calculated editing before the Franco-Prussian War is directly attested in his own later account and independently corroborated) designed to secure a particular desired outcome before the first shot was fired.
      planning_orientation: [80, 0.68, "d", "A"],
      // Pursued German unification across multiple setbacks and over a decade (from his 1862 appointment through 1871), and later sustained the Kulturkampf and anti-socialist campaigns for years despite incomplete success, documented across separate multi-year policy programs.
      persistence: [65, 0.5, "s", "A"],
      // Shifted from confrontational unification-era diplomacy to the explicitly stabilizing, alliance-balancing "honest broker" role after 1871 once his objective changed from creating the German state to preserving it — a documented strategic pivot attested by diplomatic historians.
      adaptability: [62, 0.48, "s", "A"],
      // Deliberately provoked war with Austria in 1866 and edited the Ems Dispatch specifically to provoke France into declaring war in 1870, both documented instances of manufacturing a high-stakes confrontation rather than avoiding one, when he judged the odds favored Prussia.
      risk_tolerance: [70, 0.55, "s", "R"],
      // The Ems Dispatch edit was a same-day, specific documented act that decisively escalated a diplomatic incident into a declared war within days — attested by his own later account of the episode.
      decisiveness: [72, 0.58, "s", "A"],
      // Documented across diplomatic accounts and parliamentary records as dominating negotiations and cabinet discussion through sheer personal forcefulness, including his 1862 "Blood and Iron" speech to the Prussian legislature, a specific and famous instance of confrontational public assertion.
      social_assertiveness: [78, 0.62, "d", "D"],
      // Held and personally directed the office of Chancellor for the entirety of the new German Empire's first 19 years, documented as resisting delegation of core foreign-policy authority even to the Kaiser's court until his 1890 dismissal by Wilhelm II.
      leadership_drive: [78, 0.62, "d", "A"],
      // Documented as personally securing the cooperation of the southern German states into the new Empire through direct negotiation rather than coercion alone, and sustaining the Congress of Berlin's (1878) outcome through his own chairing and personal diplomacy, per independent diplomatic-history accounts.
      persuasiveness: [72, 0.58, "s", "A"],
      // Sustained direct, prolonged institutional conflict with the Catholic Church (the Kulturkampf) and with the socialist movement for years despite significant domestic opposition, and provoked three separate wars rather than avoiding confrontation — a well-documented pattern across multiple named adversaries.
      conflict_tolerance: [75, 0.6, "d", "D"],
      // Documented rivalry with Austria specifically for leadership of the German-speaking states, pursued deliberately to Austria's exclusion from the new Empire (the 1866 war's explicit aim) rather than accommodation — a specific, dated strategic choice.
      competitiveness: [68, 0.5, "s", "D"],
      // Documented as resisting sustained pressure from the new, more assertive Kaiser Wilhelm II to share foreign-policy authority in the late 1880s, a conflict that led directly to his 1890 dismissal rather than his own choice to step back — evidenced by the dismissal itself as much as by his resistance to it.
      autonomy_need: [70, 0.55, "s", "A"],
      // His own memoirs and the post-1871 "honest broker" alliance system are documented as explicitly aimed at securing a durable, decades-long European peace rather than further conquest, a specific articulated long-horizon aim distinct from the earlier unification wars' objectives.
      impact_motivation: [65, 0.5, "s", "A"],
      // Documented as personally studying and directing the fine detail of treaty language and diplomatic correspondence across decades rather than delegating substance to career diplomats, per Steinberg's review of his working papers.
      mastery_orientation: [62, 0.48, "s", "A"],
      // Documented sustained pursuit of German unification under Prussian leadership across nearly a decade of setbacks and incremental steps (the Danish war, the Austrian war, the French war) before achieving it, corroborated by his own later account of the strategy's deliberate staging.
      achievement_drive: [75, 0.6, "s", "A"],
      // Documented as repeatedly timing each war to exploit a specific, temporary window of diplomatic isolation of the target power (Austria's isolation before 1866, France's before 1870) rather than acting opportunistically without preparation — a pattern attested across separate campaigns.
      opportunity_sensing: [68, 0.5, "s", "A"],
      // The Ems Dispatch episode documents a specific, improvised use of a minor diplomatic incident, edited on the spot, to achieve a major strategic outcome — a concrete, attested instance of resourceful use of an available situation.
      resourcefulness: [70, 0.52, "s", "A"],
      // Documented as personally initiating and driving the unification strategy from his own appointment as Minister President rather than executing a plan set by the king, per Taylor's independent account of his early tenure.
      proactive_agency: [72, 0.55, "s", "A"],
      // His surviving diplomatic correspondence documents close personal attention to specific treaty wording and protocol detail rather than only strategic generalities, corroborated by archival review.
      detail_orientation: [65, 0.48, "s", "A"],
      // Shifted from a younger, more rigidly conservative political outlook to the pragmatic, alliance-building realism of his chancellorship, documented across his career's arc though the underlying reasoning is inferred from the change in behavior rather than a stated reversal.
      belief_updating: [60, 0.45, "i", "A"],
      // Almost entirely concentrated in statecraft and diplomacy across his career, with comparatively little documented substantive activity outside it — scored near center rather than extended without evidence.
      cross_domain_range: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_pablo_picasso",
    slug: "pablo-picasso",
    canonicalName: "Pablo Picasso",
    birthYear: 1881,
    deathYear: 1973,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["ES", "FR"],
    regionCode: "southern_europe",
    occupationIds: ["artist"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["prolific", "innovator", "prodigy"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q5593" },
    portrait: {
      url: "/portraits/pablo-picasso-canals-1904.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 830,
      height: 970,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Pablo_Picasso,_1904,_Paris,_photograph_by_Ricard_Canals_i_Llamb%C3%AD_cut_restored.jpg",
      attribution: "Ricard Canals, 1904, Paris",
      
    },
    sources: [{ id: "src_pp_richardson", kind: "biography", title: "John Richardson, A Life of Picasso (4 volumes, 1991-2021)" }, { id: "src_pp_gilot", kind: "biography", title: "Françoise Gilot & Carlton Lake, Life with Picasso (1964) — a former partner's own firsthand account" }, { id: "src_pp_stein", kind: "archive", title: "Gertrude Stein, correspondence and memoir accounts of Picasso during the early Cubist period" }, { id: "src_pp_wikipedia", kind: "wikipedia", title: "Pablo Picasso", url: "https://en.wikipedia.org/wiki/Pablo_Picasso" }],
    rows: {
      // Documented sustained engagement with African and Iberian sculpture, printmaking, ceramics, and stage design across his career (not only painting), each a genuinely new technical domain he took up seriously and produced substantial work in, per Richardson's documented catalogue of his output.
      curiosity: [72, 0.58, "s", "A"],
      // Co-developed Cubism (with Braque) as a documented, dated, verifiable break from prior representational convention around 1907-1909, independently corroborated by contemporary critics' and later art historians' consistent account of its originality, not self-claimed.
      creative_originality: [92, 0.82, "d", "A"],
      // Documented, repeated deliberate shifts across distinct stylistic periods (Blue, Rose, Analytic Cubism, Synthetic Cubism, Neoclassicism, Surrealist-adjacent work, late expressive style) across six decades, each a verifiable, dated departure rather than a single innovation repeated.
      experimentation: [85, 0.72, "d", "A"],
      // Produced a documented, catalogued output of roughly 50,000 works across paintings, sculptures, prints, and ceramics over a working life of more than 75 years — an independently verifiable, sustained volume of production, not a claimed work ethic.
      discipline: [75, 0.62, "d", "A"],
      // Documented (by studio visitors and photographers, notably the filmed 1956 documentary Le Mystère Picasso) as completing large, complex compositions in single extended sessions, a specific attested working method rather than general prolific reputation.
      execution_speed: [78, 0.6, "s", "A"],
      // Les Demoiselles d'Avignon (1907) was documented as shocking and alienating even his own close circle (Braque and Matisse's initial reactions are recorded as hostile) before Cubism gained any acceptance — a specific instance of pursuing a direction against immediate peer judgment.
      risk_tolerance: [72, 0.58, "s", "R"],
      // Documented, repeated, successful reinvention of his own style roughly once per decade across a 75-year career, each shift independently catalogued and dated by art historians rather than a single early breakthrough coasted on.
      adaptability: [80, 0.68, "d", "A"],
      // Documented across multiple partners' and contemporaries' accounts (Gilot's memoir most directly) as dominating personal and professional relationships and social settings through sheer personal force, a specific, sustained interpersonal pattern rather than general fame.
      social_assertiveness: [78, 0.62, "d", "D"],
      // Documented as the acknowledged, deliberately dominant figure of the Cubist circle he co-founded with Braque, with contemporaries' accounts describing him as setting direction rather than following it, though the movement was genuinely a two-person collaboration at its origin.
      leadership_drive: [68, 0.52, "s", "A"],
      // His dealer relationships (Kahnweiler) and ability to sustain sequential major relationships with intelligent, accomplished partners are documented, but direct evidence of persuasive skill as distinct from fame and charisma is thinner — scored at inference level.
      persuasiveness: [65, 0.48, "i", "A"],
      // Documented pattern (Gilot's account, corroborated by other partners' and biographers' records) of deliberately provoking rivalry and tension among people close to him, and of abrupt, permanent ruptures with former partners and some friends — evidenced across more than one relationship.
      conflict_tolerance: [65, 0.48, "s", "D"],
      // Documented lifelong rivalry with Matisse, described by both artists' own contemporaries and later scholarship as a sustained, productive competitive dynamic that each artist referenced directly in relation to the other's work across decades.
      competitiveness: [75, 0.6, "s", "D"],
      // Documented as controlling his own market and representation unusually tightly for an artist of his era (dictating terms to dealers rather than the reverse, per Richardson), and repeatedly changing personal and professional circles on his own initiative.
      autonomy_need: [68, 0.52, "s", "A"],
      // Guernica (1937) is documented as a deliberate political statement responding to a specific atrocity, evidence of motivation beyond aesthetics or personal ambition in at least this instance, though this is less consistently documented across his wider body of largely apolitical work.
      impact_motivation: [62, 0.48, "i", "A"],
      // Sustained an unusually high level of productive output and public relevance for over 70 years past his initial success, continuing to seek new stylistic ground into his nineties — documented via the catalogued body of late work, not merely coasting on early reputation.
      achievement_drive: [80, 0.65, "d", "A"],
      // Documented, rigorous formal academic training from childhood (his father was a drawing instructor; he was admitted to advanced classes years ahead of his age), producing technically accomplished academic work before he began breaking from it deliberately.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Sustained substantive, non-dabbling output across painting, sculpture, ceramics, printmaking, and stage/costume design (his Ballets Russes collaborations with Diaghilev) — genuinely distinct media with real catalogued output in each, not one medium repeated.
      cross_domain_range: [72, 0.58, "s", "A"],
      // Documented, extensively catalogued formal control across radically different visual languages (academic realism, Cubist fragmentation, Neoclassical line, late expressive gesture), attested by decades of independent art-historical analysis of his technique.
      aesthetic_sensitivity: [82, 0.68, "s", "A"],
      // Self-initiated the move from Barcelona to Paris as a young, unknown artist with no institutional backing, and personally drove the Cubist break with Braque rather than working within an existing school's direction — documented pattern of self-directed artistic risk.
      proactive_agency: [75, 0.6, "s", "A"],
      // Documented as building relationships early with dealers (Kahnweiler) and collectors (the Steins) before his reputation was established, positioning himself for the market's later development — inferred from timing and outcome.
      opportunity_sensing: [62, 0.45, "i", "A"],
      // His academic-period work documents strong technical precision, though his mature style deliberately favored expressive gesture over fine finish — genuinely mixed by period, scored near center.
      detail_orientation: [60, 0.42, "i", "N"],
      // Documented (Le Mystère Picasso footage, studio accounts) as often completing work rapidly and moving on rather than extensively revising — genuinely lower than a perfectionist pattern for most of his output, scored at the safe default given some documented exceptions (Guernica's extensively revised preparatory studies).
      perfectionism: [48, 0.35, "i", "N"],
    },
  },
  {
    id: "p_sigmund_freud",
    slug: "sigmund-freud",
    canonicalName: "Sigmund Freud",
    birthYear: 1856,
    deathYear: 1939,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["AT"],
    regionCode: "western_europe",
    occupationIds: ["physician", "scientist"],
    fieldIds: ["medicine", "philosophy"],
    impactDomains: ["scientific", "cultural", "medical"],
    tagIds: ["founder", "theorist", "prolific"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q9215" },
    portrait: {
      url: "/portraits/sigmund-freud-schmutzer-1926.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1067,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Sigmund_Freud_1926.jpg",
      attribution: "Ferdinand Schmutzer, 1926",
      
    },
    sources: [{ id: "src_sf_gay", kind: "biography", title: "Peter Gay, Freud: A Life for Our Time (1988)" }, { id: "src_sf_fliess", kind: "archive", title: "Jeffrey Moussaieff Masson, ed., The Complete Letters of Sigmund Freud to Wilhelm Fliess" }, { id: "src_sf_jones", kind: "biography", title: "Ernest Jones, The Life and Work of Sigmund Freud (1953-57) — written by a close colleague, read critically alongside later independent biography" }, { id: "src_sf_wikipedia", kind: "wikipedia", title: "Sigmund Freud", url: "https://en.wikipedia.org/wiki/Sigmund_Freud" }],
    rows: {
      // Documented sustained, self-directed investigation across neurology, cocaine's clinical effects, hypnosis, and eventually his own dreams and childhood memories as primary data — his own Fliess letters show a working scientist actively pursuing new lines of inquiry across two decades, not settled doctrine from the start.
      curiosity: [78, 0.65, "d", "A"],
      // Constructed detailed, internally systematic theoretical models (the topographic and later structural models of mind) from clinical case material, though the case-based method itself is documented by historians of science as methodologically looser than his own claims of scientific rigor — scored moderately rather than at either extreme.
      analytical_rigor: [65, 0.5, "s", "N"],
      // Documented, repeated willingness to break from influential mentors and collaborators once he judged them wrong — from Josef Breuer (over the sexual etiology of neurosis) to Carl Jung and Alfred Adler (over the libido theory) — a sustained pattern across multiple named, costly professional ruptures.
      independent_thinking: [80, 0.68, "d", "A"],
      // The Interpretation of Dreams (1899) is documented as a genuinely novel theoretical synthesis at the time of publication, independently attested by the scale of the field (psychoanalysis) that developed directly from it, not merely his own claim of originality.
      creative_originality: [82, 0.7, "d", "A"],
      // Conducted his own systematic self-analysis via daily dream recording over several years (documented in the Fliess letters) while simultaneously maintaining a full clinical practice and prolific writing output — a sustained, self-imposed practice, not a claimed habit.
      discipline: [72, 0.58, "s", "A"],
      // The Interpretation of Dreams sold poorly for years after publication and psychoanalysis was widely dismissed by the medical establishment for over a decade before gaining acceptance, documented in his own correspondence describing sustained isolation and continued work regardless.
      persistence: [75, 0.62, "d", "A"],
      // Revised his own theoretical models substantially over his career (moving from the seduction theory to the drive theory, and later adding the structural id/ego/superego model), but documented as doing so slowly and often only after sustained internal resistance — scored near center rather than assumed high.
      adaptability: [55, 0.42, "i", "N"],
      // Published sexually explicit case material and theory in a conservative Viennese medical establishment specifically knowing it would provoke professional censure, documented in his own letters anticipating exactly that reaction before publication.
      risk_tolerance: [68, 0.52, "s", "R"],
      // Sustained years of professional isolation and uncertain reception of his core theory before any validation, documented in his own correspondence as a deliberately endured period rather than one he abandoned the work to escape.
      ambiguity_tolerance: [62, 0.48, "s", "A"],
      // Documented as ending the Jung and Adler collaborations at specific, dated points once he judged the theoretical differences irreconcilable, though his own letters show these decisions followed extended, documented ambivalence beforehand — scored moderately.
      decisiveness: [62, 0.48, "s", "N"],
      // Documented as commanding intense authority within his own founded institutions (the Vienna Psychoanalytic Society, the Wednesday Psychological Society) though colleagues' accounts (including Jung's own later reflections) describe a more reserved, controlling style than an extroverted one — scored moderately.
      social_assertiveness: [62, 0.48, "s", "N"],
      // Documented pattern of serial ruptures with his closest collaborators and intended successors — Breuer, Adler, Jung, and later others — each ending in permanent estrangement rather than working accommodation of disagreement, evidenced across multiple named, independently documented relationships, not one falling-out.
      collaboration: [38, 0.55, "s", "R"],
      // Personally founded and controlled the Vienna Psychoanalytic Society and the broader international psychoanalytic movement's doctrinal boundaries for decades, documented as actively vetting who could be considered orthodox, not a passive figurehead role.
      leadership_drive: [70, 0.55, "s", "A"],
      // Built an international movement of practicing followers from a position of initial medical-establishment rejection, documented as substantially achieved through his own writing and personal training of early adherents (Jung, Ferenczi, Jones) rather than institutional backing.
      persuasiveness: [68, 0.52, "s", "A"],
      // Sustained public theoretical disputes with the Vienna medical establishment for over a decade and later with his own former disciples for years, documented across multiple separate, named, extended conflicts rather than one dispute avoided or resolved quickly.
      conflict_tolerance: [72, 0.58, "d", "R"],
      // Repeatedly broke from collaborators specifically when they proposed modifications to core theory he had not authorized, documented as prioritizing theoretical control over preserving the collaboration itself in more than one instance.
      autonomy_need: [72, 0.58, "s", "A"],
      // Continued writing and refining theory even after his 1923 cancer diagnosis and through 33 subsequent operations, and fled Nazi-annexed Vienna for London in 1938 specifically to continue his work and protect his papers and daughter Anna, documented via his own and his physician's accounts.
      impact_motivation: [68, 0.52, "s", "A"],
      // Documented years of serious neurological research (his early work on cerebral palsy and aphasia was independently respected before psychoanalysis) before shifting fields, showing sustained deliberate depth rather than an untrained leap.
      mastery_orientation: [70, 0.55, "s", "A"],
      // His own Fliess letters document explicit, sustained ambition to establish a durable, named scientific theory (not merely clinical practice), pursued despite the financial security a purely clinical career would have offered.
      achievement_drive: [72, 0.55, "s", "A"],
      // Documented sensitivity to priority disputes over specific concepts (with Janet, with early rivals over the unconscious) in his own correspondence, though this is narrower than a general competitive drive — scored moderately at inference level.
      competitiveness: [62, 0.45, "i", "D"],
      // Moved from neurology to psychology/psychoanalysis but remained within medicine and mind-science broadly rather than genuinely disparate fields — scored near center rather than inflated for a domain shift that, while real, is not extremely wide.
      cross_domain_range: [55, 0.42, "i", "N"],
      // Self-initiated the entire theoretical and institutional apparatus of psychoanalysis (the Wednesday society, the journal, the training standards) with no prior institution to build from, documented as his own sustained personal project from the outset.
      proactive_agency: [75, 0.6, "d", "A"],
      // Did substantially revise core theory more than once (abandoning the seduction theory, later adding the death-drive concept), but documented as doing so reluctantly and after long internal resistance rather than readily — scored near center rather than either extreme.
      belief_updating: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_theodore_roosevelt",
    slug: "theodore-roosevelt",
    canonicalName: "Theodore Roosevelt",
    birthYear: 1858,
    deathYear: 1919,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_leader", "writer", "explorer", "naturalist"],
    fieldIds: ["politics", "exploration", "environmental_science", "military"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "overcame_adversity", "polymath"],
    archetypeIds: ["cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q33866" },
    portrait: {
      url: "/portraits/theodore-roosevelt-pach-bros.jpg",
      source: "Wikimedia Commons (Library of Congress)",
      license: "Public domain",
      width: 1341,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Theodore_Roosevelt_by_the_Pach_Bros.jpg",
      attribution: "Pach Bros., New York — Library of Congress",
      
    },
    sources: [{ id: "src_tr_morris_rise", kind: "biography", title: "Edmund Morris, The Rise of Theodore Roosevelt (1979)" }, { id: "src_tr_morris_tr", kind: "biography", title: "Edmund Morris, Theodore Rex (2001)" }, { id: "src_tr_autobiography", kind: "archive", title: "Theodore Roosevelt, An Autobiography (1913) — his own account, read critically alongside independent biography" }, { id: "src_tr_letters", kind: "archive", title: "Elting E. Morison, ed., The Letters of Theodore Roosevelt" }, { id: "src_tr_wikipedia", kind: "wikipedia", title: "Theodore Roosevelt", url: "https://en.wikipedia.org/wiki/Theodore_Roosevelt" }],
    rows: {
      // Kept detailed naturalist field journals from childhood through his final African and Amazon expeditions, personally collected and catalogued specimens for the Smithsonian, and authored serious ornithological notes alongside his political writing — a documented, lifelong pattern, not a single interest.
      curiosity: [85, 0.75, "d", "A"],
      // His naval history The Naval War of 1812 (written at 23) is still cited by historians for its use of primary tactical sources, but his general public rhetoric was often impressionistic rather than systematic — scored moderate, reflecting real but domain-specific rigor rather than a uniform trait.
      analytical_rigor: [62, 0.5, "s", "N"],
      // Broke from the Republican party he had led to run a third-party 1912 Progressive ("Bull Moose") campaign against his own hand-picked successor Taft — a specific, documented, costly institutional break rather than a rhetorical claim of independence.
      independent_thinking: [75, 0.65, "d", "A"],
      // Prolific and wide-ranging as a writer (natural history, history, memoir), but his own genres were largely conventional for the period rather than formally innovative — inference-level, scored near center rather than extreme.
      creative_originality: [58, 0.45, "i", "N"],
      // Documented self-directed physical rebuilding of a severely asthmatic, frail childhood body through a sustained boxing/exercise regimen his father set him on, which he continued as an adult ranching and hunting regimen — corroborated by his own account and by Morris's independent biography.
      discipline: [72, 0.62, "d", "A"],
      // Contemporaries (including his own family) describe an almost frenetic breadth of simultaneous activity rather than prolonged single-subject absorption; scored near center as a genuine, if less-documented, dimension rather than inferred from his general energy.
      deep_focus: [55, 0.45, "i", "N"],
      // Repeatedly moved into entirely new domains and tested himself directly in them rather than staying in one lane — ranching in the Dakota Badlands, commanding cavalry in Cuba, undertaking the near-fatal 1913-14 Amazon River of Doubt expedition — a documented pattern across separate ventures.
      experimentation: [65, 0.5, "s", "A"],
      // Continued the near-fatal 1913-14 Amazon expedition (malaria, a leg infection that nearly killed him, starvation rationing) to its completion rather than turning back, and rebuilt his political career after being effectively pushed out of the New York political machine in the 1880s.
      persistence: [75, 0.65, "d", "A"],
      // Documented, repeated reinvention across genuinely distinct roles — police commissioner, Assistant Secretary of the Navy, cavalry commander, governor, vice president, president, explorer — each requiring different skills he had not previously exercised professionally.
      adaptability: [78, 0.68, "d", "A"],
      // Personally led the charge up Kettle Hill in Cuba under fire (documented by multiple soldiers present, not only his own account) and undertook the 1913-14 Amazon expedition despite being told by the Royal Geographical Society it was reckless at his age and condition — both specific, corroborated instances of accepting severe physical risk.
      risk_tolerance: [82, 0.7, "d", "R"],
      // Made the snap decision to resign his Navy post and raise the Rough Riders regiment within days of the war declaration, and unilaterally ordered the fleet to the Philippines while Acting Secretary of the Navy before formal authorization — both specific, dated, documented actions taken without prolonged deliberation.
      decisiveness: [68, 0.55, "s", "A"],
      // Extensively and consistently documented across his entire public life as commanding a room through sheer physical and verbal energy — a specific, repeatable public persona attested by journalists, political allies, and rivals alike, not a single performance.
      social_assertiveness: [85, 0.75, "d", "A"],
      // Actively sought and accepted command at every level available to him — regiment, city police board, state, nation — and after leaving the presidency mounted the 1912 third-party campaign specifically to regain it, a documented sustained drive rather than reluctant duty.
      leadership_drive: [82, 0.72, "d", "A"],
      // Credited by contemporary political historians with personally building and sustaining public support for trust-busting and conservation policy against entrenched business interests through direct "bully pulpit" speechmaking — a specific documented use of the presidency's rhetorical reach that he himself named.
      persuasiveness: [78, 0.65, "d", "A"],
      // Sustained direct, public confrontation with major trusts (Northern Securities case), his own former ally Taft, and the Senate over conservation policy across his career — a documented willingness to escalate conflict rather than avoid it, cutting both ways for his political alliances.
      conflict_tolerance: [72, 0.6, "s", "D"],
      // Produced a scholarly naval history at 23 still cited by later historians, and maintained detailed original ornithological field records across decades — documented sustained depth in specific domains alongside his generalism, not dabbling.
      mastery_orientation: [70, 0.58, "s", "A"],
      // Documented across his entire life by both his own letters and independent biography as needing constant new projects and honors to pursue — his own family privately joked he wanted to be "the bride at every wedding" — corroborated by the sheer number of simultaneous professional tracks he pursued.
      achievement_drive: [82, 0.7, "d", "A"],
      // Documented lifelong pattern of measuring himself directly against others — boxing and wrestling into his White House years, insisting on leading (not just joining) the Rough Riders' charge, running specifically to defeat his own former protégé in 1912 — evidenced across multiple separate episodes.
      competitiveness: [75, 0.62, "s", "D"],
      // Repeatedly acted unilaterally ahead of formal authorization (the Philippine fleet order) or against his own party's establishment (1912) rather than waiting for institutional consensus — a documented pattern across distinct institutional contexts.
      autonomy_need: [68, 0.55, "s", "A"],
      // Used the presidency specifically to create the national conservation system (over 230 million acres protected) framed explicitly in his own speeches as a duty to future generations beyond his own term — a specific documented policy program with an articulated long-horizon rationale.
      impact_motivation: [75, 0.62, "s", "A"],
      // Documented pattern of moving decisively into openings as they appeared — resigning a safe Navy post to raise a volunteer regiment when war was declared, accepting the vice-presidential nomination when it was offered as a way back into national politics after being sidelined in New York — evidenced across separate career turns.
      opportunity_sensing: [70, 0.52, "s", "A"],
      // Self-initiated the Rough Riders regiment, the Amazon expedition, and the 1912 campaign — none assigned to him, all self-directed undertakings he sought out and organized personally, documented across his entire adult life.
      proactive_agency: [80, 0.68, "d", "A"],
      // During the Amazon expedition, documented as personally organizing rationing, navigation, and morale under starvation conditions after the expedition's food and boats were lost to rapids — a specific, corroborated crisis-response episode, not a general reputation for capability.
      resourcefulness: [68, 0.5, "s", "A"],
    },
  },
];

export const ROSTER_14: readonly Person[] = seeds.map(build);
