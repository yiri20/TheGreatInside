/**
 * ROSTER 10 — roster-1000 session 19 (5 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster10.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use -- here each rationale also
 * cites the specific frozen evidence-ledger episode id(s) it traces back
 * to, full text preserved in
 * `src/dev/roster1000/production/session19/<slug>/evidenceLedger.json`.
 *
 * Session 19 was the first normal Launch Roster Expansion production
 * batch under session 18's frozen Roster Research & Scoring Protocol v1:
 * a fresh 5-person cohort selected to close real regional/domain gaps
 * (mustafa-kemal-ataturk closes West Asia's single-medieval-person gap;
 * anna-pavlova and oscar-niemeyer close zero-representation dance and
 * architecture domain gaps; akio-morita closes the entrepreneurial-
 * outside-North-America/Western-Europe gap; aung-san-suu-kyi adds a
 * contemporary, morally complex political figure). All 5 cleared every
 * `eligibility_v2` gate cleanly -- a clean 5/5 batch, not a near-miss
 * pattern. See `docs/roster-1000-checkpoint.md` for the full record.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_akio_morita",
    slug: "akio-morita",
    canonicalName: "Akio Morita",
    birthYear: 1921,
    deathYear: 1999,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    occupationIds: ["entrepreneur", "executive"],
    fieldIds: ["business", "electronics", "technology"],
    impactDomains: ["entrepreneurial", "technological", "industrial"],
    tagIds: ["founder", "innovator", "product_leader"],
    archetypeIds: ["entrepreneurial_builder", "technical_innovator"],
    externalIdentity: { wikidataId: "Q310845" },
    sources: [{ id: "src_morita_encyc", kind: "archive", title: "Encyclopedia.com — \"Akio Morita\" (Business Leader Profiles for Students)", url: "https://www.encyclopedia.com/people/social-sciences-and-law/business-leaders/akio-morita" }, { id: "src_morita_ebsco", kind: "archive", title: "EBSCO Research Starters — \"Akio Morita\"", url: "https://www.ebsco.com/research-starters/history/akio-morita" }, { id: "src_morita_ces", kind: "institution", title: "CES.tech (Consumer Technology Association) — \"Akio Morita, Sony and the Power of Inventive Leadership\"", url: "https://www.ces.tech/articles/akio-morita-sony-and-the-power-of-inventive-leadership/" }, { id: "src_morita_commoncog", kind: "press", title: "Commoncog — \"The Sony Walkman\" (Case Library)", url: "https://commoncog.com/c/cases/sony-walkman/" }, { id: "src_morita_time", kind: "press", title: "Time (magazine archive) — \"Akio Morita & Masaru Ibuka\"", url: "https://time.com/archive/6679021/akio-morita-masaru-ibuka/" }, { id: "src_morita_memoir", kind: "biography", title: "Akio Morita (with Edwin M. Reingold and Mitsuko Shimomura), Made in Japan: Akio Morita and Sony (Dutton, 1986)" }, { id: "src_morita_nathan", kind: "biography", title: "John Nathan, Sony: The Private Life (Houghton Mifflin, 1999)" }, { id: "src_morita_springer", kind: "archive", title: "Springer Nature — \"Masaru Ibuka, Akio Morita, Soichiro Honda, and Takeo Fujisawa\" (business-history case-study chapter)" }],
    rows: {
      // Explicitly rejected market-research-led product development in favor of his own anticipatory judgment ("The public does not know what is possible, but we do"), and recognized a hostile letter-writer's genuine ear for sound quality rather than reading it only as an insult. Session 19 evidence AM-E8, AM-E19.
      intuitive_synthesis: [75, 0.52, "s", "A"],
      // Chose physics over his family's 300-year sake-brewing business against his father's explicit expectation, committed the company to an exclusive Betamax branding strategy against the licensing norm his rivals followed, and publicly argued against Japan's own social convention on academic credentials. Session 19 evidence AM-E1, AM-E17, AM-E22.
      independent_thinking: [82, 0.65, "d", "A"],
      // After his own controversial book chapters caused unexpected backlash in the United States, had them removed from the authorized English edition and later publicly moderated his earlier confrontational trade-policy position as circumstances changed. Session 19 evidence AM-E24.
      belief_updating: [65, 0.5, "s", "A"],
      // The company's earliest products (including a clever-but-unreliable electric rice cooker) reflect working largely by trial and error outside the founders' actual competency, and product features were added and then quietly dropped (a second headphone jack, a talk-through button) once real consumer use proved the underlying assumption wrong. Session 19 evidence AM-E6, AM-E20.
      experimentation: [78, 0.58, "d", "A"],
      // Moved from a physics degree and wartime engineering research into international brand-building, direct sales/marketing, corporate management, and public political authorship — genuinely distinct domains beyond the original technical training. Session 19 evidence AM-E1, AM-E13, AM-E22.
      cross_domain_range: [75, 0.55, "d", "A"],
      // After a period of neglecting schoolwork for a consuming amateur-radio hobby as a teenager, deliberately disciplined himself to refocus on his studies for roughly a year before entering an elite physics program. Session 19 evidence AM-E2.
      discipline: [65, 0.45, "i", "A"],
      // Attended closely enough to how a product would be perceived by a buyer to have sales staff wear specially tailored shirts so a slightly-oversized radio would visually read as pocket-sized. Session 19 evidence AM-E11.
      detail_orientation: [62, 0.42, "i", "N"],
      // Relocated his family to the United States specifically to learn the market and build corporate confidence before committing further resources, an explicit, stated sequencing strategy rather than directing foreign operations remotely. Session 19 evidence AM-E14.
      planning_orientation: [72, 0.52, "s", "A"],
      // Sustained a loss-making US operation for roughly a decade on the belief that direct market presence would eventually pay off, and continued exercising real institutional judgment even after a stroke left him severely physically diminished. Session 19 evidence AM-E13, AM-E27.
      persistence: [75, 0.55, "d", "A"],
      // Redirected a commercially failing consumer product toward an institutional market himself once general sales stalled, deliberately blended Japanese and American management practices rather than exporting one model unchanged, and retracted his own public position once it produced serious backlash. Session 19 evidence AM-E7, AM-E16, AM-E24.
      adaptability: [80, 0.62, "d", "A"],
      // Committed a large, largely non-recoverable licensing fee to an unproven consumer application of a new technology, staked his own position on a product his own market research, sales, marketing, and engineering departments all opposed — but the same pattern of decisive, personally-backed bets also produced the costly Betamax exclusivity misjudgment and the Columbia Pictures acquisition, both documented as real strategic failures. Session 19 evidence AM-E9, AM-E17, AM-E18, AM-E26.
      risk_tolerance: [88, 0.72, "d", "D"],
      // Committed his company's capital and a public four-month deadline to a product category with no existing market data and near-unanimous internal skepticism about its viability. Session 19 evidence AM-E18.
      ambiguity_tolerance: [68, 0.45, "i", "A"],
      // Personally told Sony's board he would resign if the Walkman failed rather than delay or dilute the decision under internal opposition, and responded to a hostile critical letter by recruiting its author rather than deliberating at length. Session 19 evidence AM-E8, AM-E18.
      decisiveness: [80, 0.6, "d", "A"],
      // Personally demonstrated products directly to institutional buyers, delivered a public address to a major business-school audience criticizing prevailing economic thinking, and became an outspoken public voice in international trade-policy debate. Session 19 evidence AM-E7, AM-E25.
      social_assertiveness: [75, 0.55, "d", "A"],
      // Sustained a four-decade complementary partnership with his co-founder described as unusually close, and responded to a stranger's sharp public criticism of the company's own product by recruiting him into the company rather than dismissing him — a critic who went on to lead the company himself. Session 19 evidence AM-E4, AM-E8.
      collaboration: [85, 0.62, "d", "A"],
      // Co-founded a company from a bombed-out postwar ruin and personally led its transformation into a global conglomerate over five decades, holding the presidency, chairmanship, and CEO roles in succession. Session 19 evidence AM-E5, AM-E13.
      leadership_drive: [88, 0.68, "d", "A"],
      // Personally convinced institutional buyers to adopt a commercially failing consumer product through direct demonstration, and staked his own board position to win internal approval for a product every specialist department had rejected. Session 19 evidence AM-E7, AM-E18.
      persuasiveness: [78, 0.58, "d", "A"],
      // Pushed a major product forward against the near-unanimous, specific objections of every relevant internal department — but also publicly retracted a separate, controversial position once real external backlash materialized, showing this tolerance for conflict is not unconditional. Session 19 evidence AM-E18, AM-E24.
      conflict_tolerance: [68, 0.5, "s", "D"],
      // Maintained close, hands-on personal engagement with specific product engineering and craft problems throughout his career rather than operating purely at a strategic remove. Session 19 evidence AM-E6, AM-E11.
      mastery_orientation: [60, 0.4, "i", "A"],
      // Built a twenty-employee postwar startup into a global electronics and entertainment conglomerate, receiving sustained real-time international recognition throughout his career, not only posthumously. Session 19 evidence AM-E5, AM-E13.
      achievement_drive: [85, 0.62, "d", "A"],
      // Pursued an exclusive-branding strategy for a new format specifically to control its market position against a rival format, a decision later acknowledged as having narrowed the format's own ecosystem growth. Session 19 evidence AM-E17.
      competitiveness: [62, 0.42, "i", "D"],
      // Rejected outside offers to market the company's products under established American brand names, insisting on building an independent identity abroad from the very start rather than working through existing intermediaries. Session 19 evidence AM-E13.
      autonomy_need: [75, 0.55, "d", "A"],
      // Operated under and sustained a founding charter oriented toward cultural and technological contribution rather than profit alone, and became a public advocate for manufacturing's broader societal importance well beyond his own company's commercial interest. Session 19 evidence AM-E5, AM-E25.
      impact_motivation: [75, 0.52, "s", "A"],
      // Redirected a commercially failing product toward an institutional buyer himself once the intended consumer market did not respond, recognized real talent inside a hostile critical letter rather than dismissing it, and backed a wholly new product category against near-unanimous internal skepticism. Session 19 evidence AM-E7, AM-E8, AM-E18.
      opportunity_sensing: [82, 0.62, "d", "A"],
      // Solved a product's visual-impression problem with a low-cost tailoring fix rather than a redesign, and converted a commercially failing consumer product into a successful institutional one through his own direct outreach. Session 19 evidence AM-E7, AM-E11.
      resourcefulness: [78, 0.58, "d", "A"],
      // Personally sought out and re-established a wartime professional connection on his own initiative once peacetime circumstances made a joint venture conceivable, and repeatedly overrode organizational resistance himself rather than deferring to specialist departments' objections. Session 19 evidence AM-E4, AM-E18.
      proactive_agency: [82, 0.6, "d", "A"],
    },
  },
  {
    id: "p_anna_pavlova",
    slug: "anna-pavlova",
    canonicalName: "Anna Pavlova",
    birthYear: 1881,
    deathYear: 1931,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["RU"],
    regionCode: "central_europe",
    occupationIds: ["dancer"],
    fieldIds: ["dance", "performing_arts"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["founder", "craft_focused", "sustained_excellence", "overcame_adversity"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q151874" },
    sources: [{ id: "src_pavlova_enc1", kind: "archive", title: "Encyclopedia.com — \"Anna Matveyevna Pavlova\" (aggregating UXL Encyclopedia of World Biography / Encyclopedia of Modern Europe / Encyclopedia of Russian History / World Encyclopedia)", url: "https://www.encyclopedia.com/people/literature-and-arts/dance-biographies/anna-matveyevna-pavlova" }, { id: "src_pavlova_enc2", kind: "archive", title: "Encyclopedia.com — \"Pavlova, Anna (1881–1931)\" (Women in World History: A Biographical Encyclopedia)", url: "https://www.encyclopedia.com/women/encyclopedias-almanacs-transcripts-and-maps/pavlova-anna-1881-1931" }, { id: "src_pavlova_hh", kind: "press", title: "History Hit — \"Anna Pavlova: The Most Influential Ballerina In History\"", url: "https://www.historyhit.com/culture/who-was-famed-ballerina-anna-pavlova/" }, { id: "src_pavlova_nwe", kind: "archive", title: "New World Encyclopedia — \"Anna Pavlova\"", url: "https://www.newworldencyclopedia.org/entry/Anna_Pavlova" }, { id: "src_pavlova_ebsco", kind: "archive", title: "EBSCO Research Starters — \"Anna Pavlova\"", url: "https://www.ebsco.com/research-starters/biography/anna-pavlova" }, { id: "src_pavlova_saha", kind: "press", title: "Sahapedia — \"Anna Pavlova\"", url: "https://www.sahapedia.org/anna-pavlova" }, { id: "src_pavlova_vam", kind: "institution", title: "Victoria and Albert Museum Collections — \"Anna Pavlova: The Immortal Swan\" poster record", url: "https://collections.vam.ac.uk/item/O1257131/anna-pavlova-the-immortal-swan-poster-unknown/" }, { id: "src_pavlova_ausd", kind: "institution", title: "Ausdance (Australian Dance Advocacy) — \"Pavlova's 1929 Australian Tour\"" }],
    rows: {
      // Learned dance forms entirely outside her own classical training (Mexican, Japanese, East Indian) from local teachers during her travels, engaged deeply enough with Indian culture to commission an original work inspired by cave frescoes, and personally experimented with new recording/film technology across several countries. Session 19 evidence AP-E20, AP-E27.
      curiosity: [70, 0.5, "s", "A"],
      // Rejected the lead role in a historically landmark new ballet because she could not reconcile herself with its avant-garde score, refused to return to a prestigious touring company for a second season on artistic grounds, and revised assigned choreography herself to suit her own body without seeking permission first. Session 19 evidence AP-E6, AP-E10, AP-E11.
      independent_thinking: [78, 0.58, "d", "A"],
      // Self-choreographed and performed her own original solo work in costume of her own design, studied a real animal's movements over time to deepen the authenticity of her signature role, and staged an original production inspired directly by cave frescoes she had personally seen. Session 19 evidence AP-E8, AP-E9, AP-E21.
      creative_originality: [78, 0.55, "d", "A"],
      // Learned and performed entirely unfamiliar dance forms from local teachers during her travels, devised and tested a practical modification to her own pointe shoes that went on to influence standard construction, and personally conducted recording-technology experiments across several countries to test film as a means of preserving technique. Session 19 evidence AP-E20, AP-E25, AP-E27.
      experimentation: [78, 0.55, "d", "A"],
      // Beyond classical ballet performance itself, built and ran an international touring operation, engaged directly with film/recording technology, and worked across several distinct non-Western dance traditions during her travels — real breadth, though concentrated around one central craft rather than spanning unrelated professional domains. Session 19 evidence AP-E18, AP-E20, AP-E27.
      cross_domain_range: [58, 0.42, "i", "N"],
      // Widely and specifically praised by critics and collaborators for an ability to "appear actually to become" whatever she portrayed rather than merely perform steps accurately, with a fellow artist's testimony singling out her "exceptionally expressive hands and feet" and the unique "plasticity" of her movement. Session 19 evidence AP-E7, AP-E9.
      aesthetic_sensitivity: [88, 0.62, "d", "A"],
      // Sustained five to six hours of daily rehearsal during training, continued seeking refresher instruction from a master teacher even after graduating and after extended tours, and personally appeared on stage twice daily for the first decade of running her own company. Session 19 evidence AP-E5, AP-E15.
      discipline: [88, 0.72, "d", "A"],
      // Described as showing "no interest in anything but her next performance" and as having nothing in her life that did not contribute to perfecting her dancing — an intensity of single-domain focus with a real, sourced cost to broader personal range, not an unambiguous strength. Session 19 evidence AP-E28.
      deep_focus: [82, 0.55, "s", "D"],
      // Articulated her own philosophy that talent alone is never sufficient and only sustained work produces genius, continued technical refinement long after reaching the top of her profession, and was documented as vain enough about a footwear modification's appearance that she had it retouched out of published photographs. Session 19 evidence AP-E3, AP-E25.
      perfectionism: [85, 0.6, "d", "D"],
      // Personally devised a specific technical modification to her own pointe shoes to solve a recurring physical problem, an innovation precise enough to later influence standard construction. Session 19 evidence AP-E25.
      detail_orientation: [68, 0.45, "i", "A"],
      // Continued seeking additional master instruction long after formal training ended, danced every one of 120 performances over four months at age 48 on a demanding international tour, and kept performing almost without interruption to the final weeks of her life. Session 19 evidence AP-E5, AP-E19, AP-E30.
      persistence: [90, 0.75, "d", "A"],
      // Revised choreography herself when it did not suit her own physical limitations, learned entirely unfamiliar dance idioms during her travels, and adjusted a touring itinerary on the fly when a planned port of entry became unavailable. Session 19 evidence AP-E6, AP-E19, AP-E20.
      adaptability: [78, 0.6, "d", "A"],
      // Left the security and prestige of an elite state institution for a financially riskier independent touring career, continued fulfilling tour commitments against her doctor's explicit objections while seriously ill, and ultimately refused a survival-conditional operation specifically because it would have ended her ability to dance. Session 19 evidence AP-E14, AP-E30, AP-E31.
      risk_tolerance: [88, 0.72, "d", "D"],
      // Firmly rejected a career-defining lead role over an unreconcilable artistic disagreement, and made a clear, final, explicitly stated choice at the actual moment of a life-or-death medical decision rather than deferring it. Session 19 evidence AP-E10, AP-E31.
      decisiveness: [78, 0.58, "d", "A"],
      // Built genuine, durable creative partnerships (recruiting and personally training her own company's dancers, launching a young collaborator's career) but her management style is independently described as alternating tantrums, refusals to perform, and sudden dismissals, and she is documented as having physically slapped her own dance partner over a perceived applause slight. Session 19 evidence AP-E12, AP-E16, AP-E17.
      collaboration: [45, 0.55, "d", "D"],
      // Founded and personally led her own international touring company for roughly eighteen years, directing repertoire, training, and operations rather than continuing as an interpreter within someone else's institution. Session 19 evidence AP-E14, AP-E17.
      leadership_drive: [82, 0.62, "d", "A"],
      // Physically slapped her own dance partner during a curtain call over a perceived applause imbalance, and is separately documented as alternating volatile confrontations (tantrums, sudden dismissals) with her company. Session 19 evidence AP-E12, AP-E16.
      conflict_tolerance: [72, 0.55, "d", "D"],
      // Pursued additional instruction under a sequence of master teachers well past the point of already being an accomplished graduate, continued seeking refresher training after extended tours throughout her career, and explicitly articulated that talent alone never suffices without sustained work. Session 19 evidence AP-E3, AP-E5.
      mastery_orientation: [90, 0.72, "d", "A"],
      // Rose from a physically rejected, sickly child to the highest rank in the world's most prestigious ballet institution, then built and personally led an independent global touring operation spanning six continents. Session 19 evidence AP-E1, AP-E14, AP-E18.
      achievement_drive: [88, 0.68, "d", "A"],
      // Physically slapped her own dance partner during a curtain call specifically because she believed he was receiving more audience applause than she was — a vivid, specific, single documented instance of open competitive jealousy toward a close collaborator. Session 19 evidence AP-E12.
      competitiveness: [65, 0.45, "i", "D"],
      // Left a secure, prestigious institutional position to found and run her own company, revised assigned choreography to her own preference without prior approval, and refused to follow the artistic direction of a company she had performed with. Session 19 evidence AP-E6, AP-E11, AP-E14.
      autonomy_need: [85, 0.65, "d", "A"],
      // Believed strongly that recorded film could preserve and teach her art form for future generations rather than viewing it as beneath live performance, and deliberately toured to remote regions with no prior exposure to Western theatrical dance rather than only performing in established cultural capitals. Session 19 evidence AP-E18, AP-E27.
      impact_motivation: [78, 0.55, "d", "A"],
      // Recognized and acted on an unplanned introduction to a young art student during a single tour stop, directly launching his career as a professional dancer/choreographer, and turned a footwear problem into a lasting technical improvement. Session 19 evidence AP-E22, AP-E25.
      opportunity_sensing: [72, 0.5, "s", "A"],
      // Improvised a full touring itinerary when a planned port of entry became unavailable, devised a practical fix to a recurring footwear problem herself, and adapted assigned choreography to work around her own physical limitations. Session 19 evidence AP-E6, AP-E19, AP-E25.
      resourcefulness: [75, 0.55, "d", "A"],
      // Self-choreographed and staged her own original work rather than waiting to be assigned one, revised assigned choreography on her own initiative, and personally attempted to initiate an ambitious creative collaboration even though it ultimately did not materialize. Session 19 evidence AP-E6, AP-E8, AP-E24.
      proactive_agency: [78, 0.55, "d", "A"],
    },
  },
  {
    id: "p_aung_san_suu_kyi",
    slug: "aung-san-suu-kyi",
    canonicalName: "Aung San Suu Kyi",
    birthYear: 1945,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["MM"],
    regionCode: "south_asia",
    occupationIds: ["political_leader", "political_activist"],
    fieldIds: ["politics", "human_rights", "law"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "nonviolence", "endured_imprisonment", "founder"],
    archetypeIds: ["organizational_leader", "social_influencer"],
    externalIdentity: { wikidataId: "Q36740" },
    sources: [{ id: "src_assk_hrw", kind: "institution", title: "Human Rights Watch — \"Burma: Chronology of Aung San Suu Kyi's Detention\"", url: "https://www.hrw.org/news/2010/11/13/burma-chronology-aung-san-suu-kyis-detention" }, { id: "src_assk_aj_trouble", kind: "press", title: "Al Jazeera — \"The trouble with Aung San Suu Kyi\" (2017)", url: "https://www.aljazeera.com/features/2017/5/12/the-trouble-with-aung-san-suu-kyi" }, { id: "src_assk_jod", kind: "archive", title: "Journal of Democracy — \"Burma: Suu Kyi's Missteps\"", url: "https://www.journalofdemocracy.org/articles/burma-suu-kyis-missteps/" }, { id: "src_assk_aj_icj", kind: "press", title: "Al Jazeera — \"Transcript: Aung San Suu Kyi's speech at the ICJ in full\" (2019)", url: "https://www.aljazeera.com/news/2019/12/12/transcript-aung-san-suu-kyis-speech-at-the-icj-in-full" }, { id: "src_assk_time", kind: "press", title: "TIME Magazine — Aung San Suu Kyi profile (May 2009)", url: "https://time.com/archive/6946675/aung-san-suu-kyi-2/" }, { id: "src_assk_popham", kind: "biography", title: "Peter Popham, The Lady and the Peacock: The Life of Aung San Suu Kyi (Rider/Random House, 2011)" }, { id: "src_assk_own_writing", kind: "archive", title: "Aung San Suu Kyi's own writings and speeches — Freedom from Fear, Letters from Burma, the 1988 Shwedagon Pagoda speech, the Nobel Peace Prize lecture" }, { id: "src_assk_asiatimes", kind: "press", title: "Asia Times — \"The unavoidable prisoner: Aung San Suu Kyi at 81\" (June 2026)", url: "https://asiatimes.com/2026/06/the-unavoidable-prisoner-aung-san-suu-kyi-at-81/" }],
    rows: {
      // At the International Court of Justice, carefully distinguished between different legal categories under real scrutiny — not entirely ruling out disproportionate force as a legal matter while flatly denying the much higher bar of genocidal intent, and invoking a specific doctrine (complementarity) rather than a general denial. Session 19 evidence ASSK-E41.
      analytical_rigor: [68, 0.48, "s", "A"],
      // Sustained a nationwide speech tour in direct defiance of a government ban, explicitly reframed her own nonviolent strategy as a calculated political choice rather than a moral absolute, and personally maintained a legal defense of Myanmar at the ICJ against overwhelming international consensus. Session 19 evidence ASSK-E6, ASSK-E7, ASSK-E39.
      independent_thinking: [82, 0.65, "d", "A"],
      // Maintained a strategic linkage between ethnic peace and constitutional reform for years despite it being foreseeably self-defeating and producing no new agreement signatories, did not replace ministers whose unaccredited credentials drew sustained public ridicule, and maintained public denial of well-documented military conduct throughout the Rohingya crisis rather than revising her public position as evidence accumulated. Session 19 evidence ASSK-E30, ASSK-E33, ASSK-E36.
      belief_updating: [22, 0.6, "d", "R"],
      // Maintained a consistent daily routine of pre-dawn meditation, extensive structured reading, and disciplined household/information routines across roughly 15 of 21 years under house arrest. Session 19 evidence ASSK-E25.
      discipline: [75, 0.55, "d", "A"],
      // Sustained singular, unbroken political commitment across decades of detention with limited outside stimulation, maintaining structured study and information-gathering routines throughout. Session 19 evidence ASSK-E25, ASSK-E26.
      deep_focus: [68, 0.48, "s", "A"],
      // Drew a precise legal distinction at the ICJ between disproportionate-force concerns and the specific, higher legal bar of genocidal intent, rather than responding to the charge in general terms. Session 19 evidence ASSK-E41.
      detail_orientation: [62, 0.42, "i", "A"],
      // Her government did not issue a coherent economic policy statement until roughly four months after taking office and did not prioritize rural electrification until over a year into her term despite two-thirds of the country lacking access; colleagues and a former US ambassador separately described her decision-making style as producing consistent gridlock. Session 19 evidence ASSK-E29, ASSK-E35.
      execution_speed: [30, 0.55, "d", "R"],
      // Constructed a deliberate, structured legal strategy at the ICJ built on a specific named doctrine, and sustained a long-horizon political strategy of refusing exile-conditioned release for decades to preserve her future standing — though the same long-horizon linkage strategy on ethnic peace proved a real planning failure (see belief_updating), so this is scored as a real but mixed capability. Session 19 evidence ASSK-E10, ASSK-E41.
      planning_orientation: [65, 0.42, "i", "N"],
      // Spent roughly 15 of 21 years (1989–2010) under house arrest, repeatedly refusing release offers conditioned on leaving the country across multiple separate detention periods, sustaining a single political commitment across more than three decades. Session 19 evidence ASSK-E10, ASSK-E25.
      persistence: [92, 0.78, "d", "A"],
      // Pivoted quickly and directly to diplomatic engagement with reforming government figures and foreign leaders once genuine reform signals appeared in 2011, despite having spent decades opposing that same governing system. Session 19 evidence ASSK-E27.
      adaptability: [62, 0.48, "s", "A"],
      // Walked directly toward soldiers under orders to fire rather than retreat, undertook a twelve-day hunger strike risking her own health on behalf of detained colleagues, made an unscheduled public appearance during the Saffron Revolution while under house-arrest restriction, and personally led Myanmar's legal defense at the ICJ despite the severe reputational risk. Session 19 evidence ASSK-E8, ASSK-E9, ASSK-E22, ASSK-E39.
      risk_tolerance: [92, 0.78, "d", "A"],
      // Sustained political commitment across multiple detention periods with no fixed release date or guaranteed resolution, maintaining a consistent daily structure despite genuinely open-ended uncertainty about her own future. Session 19 evidence ASSK-E10, ASSK-E25.
      ambiguity_tolerance: [72, 0.5, "s", "A"],
      // Continued walking toward levelled rifles rather than negotiate or retreat, and personally chose to lead her own legal defense at the ICJ rather than delegate it entirely to lawyers or subordinate officials. Session 19 evidence ASSK-E8, ASSK-E39.
      decisiveness: [78, 0.58, "d", "A"],
      // Addressed a half-million-person rally within months of returning to the country, sustained a nationwide speech tour in defiance of a government ban, and maintained a regular practice of directly addressing supporters at her own gate. Session 19 evidence ASSK-E4, ASSK-E6, ASSK-E14.
      social_assertiveness: [80, 0.6, "d", "A"],
      // As State Counsellor, required even routine parliamentary questions to be cleared through party leadership, ran NLD candidates in ethnic-minority regions without consulting local ethnic leaders and overrode locally-elected preferences via constitutional provisions, and was independently described by colleagues and a former US ambassador as running her party in a top-down manner that did not accept advice — a documented, repeated pattern of centralization rather than genuine power-sharing, distinct from her earlier coalition-founding role. Session 19 evidence ASSK-E29, ASSK-E31, ASSK-E32.
      collaboration: [32, 0.65, "d", "R"],
      // Built and led a national mass movement from private citizen within months, founded and led a political party for over three decades, personally dominated decision-making at every level of that party without a succession plan, and served as her country's de facto civilian head of government. Session 19 evidence ASSK-E5, ASSK-E28, ASSK-E31.
      leadership_drive: [90, 0.72, "d", "A"],
      // Rallied a half-million-person crowd to call publicly for democratic government, and delivered a measured, controlled legal argument to the International Court of Justice under intense international scrutiny. Session 19 evidence ASSK-E4, ASSK-E41.
      persuasiveness: [75, 0.58, "d", "A"],
      // Sustained decades of direct confrontation with a ruling military junta, walking toward levelled rifles rather than retreat — the same underlying willingness to hold an unpopular position under sustained conflict later applied to personally defending her own military against international genocide allegations at the world's highest court. Session 19 evidence ASSK-E8, ASSK-E39, ASSK-E42.
      conflict_tolerance: [90, 0.72, "d", "D"],
      // Maintained an unusually structured, sustained program of reading and study throughout years of confinement rather than treating detention as pure loss of productive time. Session 19 evidence ASSK-E25.
      mastery_orientation: [62, 0.4, "i", "A"],
      // Moved from private citizen to national opposition leader within months, led her party to three landslide election victories over three decades, and rose to become her country's de facto civilian head of government after fifteen years of imprisonment. Session 19 evidence ASSK-E4, ASSK-E11, ASSK-E28.
      achievement_drive: [85, 0.65, "d", "A"],
      // Personally dominated decision-making at every level of her own party for decades and chose to argue her country's highest-profile international legal case herself rather than delegate it — but the same pattern left no successor arrangement in place despite her advanced age, a real institutional cost of the same trait. Session 19 evidence ASSK-E31, ASSK-E39.
      autonomy_need: [80, 0.6, "d", "D"],
      // Explicitly grounded her entry into public life in a stated sense of obligation not to remain indifferent, and directed the full monetary value of her Nobel Peace Prize into a public health and education trust rather than personal use. Session 19 evidence ASSK-E4, ASSK-E13.
      impact_motivation: [82, 0.62, "d", "A"],
      // Recognized and rapidly acted on the political opening created by a national uprising while in the country for an unrelated personal reason, moving from private citizen to national rally speaker within six months. Session 19 evidence ASSK-E4.
      opportunity_sensing: [75, 0.55, "d", "A"],
      // Sustained a functioning daily information and study routine for years under detention with no telephone, computer, or internet access, adapting activities (e.g., abandoning piano practice only once the instrument itself was ruined by humidity) to real physical constraints. Session 19 evidence ASSK-E25, ASSK-E26.
      resourcefulness: [60, 0.42, "i", "A"],
      // Initiated a nationwide speech tour beyond what any formal role required of her, and personally chose to lead her country's legal defense at the ICJ rather than leave it to career diplomats or lawyers. Session 19 evidence ASSK-E6, ASSK-E39.
      proactive_agency: [78, 0.55, "d", "A"],
    },
  },
  {
    id: "p_mustafa_kemal_ataturk",
    slug: "mustafa-kemal-ataturk",
    canonicalName: "Mustafa Kemal Atatürk",
    birthYear: 1881,
    deathYear: 1938,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["TR"],
    regionCode: "west_asia",
    occupationIds: ["political_leader", "military_leader", "statesman"],
    fieldIds: ["politics", "military", "law"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "founder", "strategist", "nonconformist"],
    archetypeIds: ["organizational_leader", "social_influencer"],
    externalIdentity: { wikidataId: "Q5152" },
    sources: [{ id: "src_ataturk_belleten_caliphate", kind: "archive", title: "Belleten (Turkish Historical Society journal) — \"The Caliphate and Atatürk's İnkılâb\"", url: "https://belleten.gov.tr/tam-metin/1733/eng" }, { id: "src_ataturk_ajc", kind: "archive", title: "Anatolian Journal of Cardiology — \"The Hidden Burden of Premature Cardiovascular Disease in a National Leader: Mustafa Kemal Atatürk's Familial Risk, Lifestyle, and Occupational Stress\"", url: "https://anatoljcardiol.com/article/AJC-31035" }, { id: "src_ataturk_newlines", kind: "press", title: "New Lines Magazine — \"How Turkey Replaced the Ottoman Language\"", url: "https://newlinesmag.com/essays/how-turkey-replaced-the-ottoman-language/" }, { id: "src_ataturk_executed", kind: "press", title: "Executed Today — \"1926: Ziya Hursit and others for a plot against Ataturk\" (cites contemporaneous London Times reporting)", url: "https://www.executedtoday.com/2010/07/14/1926-ziya-hursit-mustafa-kemal-ataturk/" }, { id: "src_ataturk_mango", kind: "biography", title: "Andrew Mango, Atatürk: The Biography of the Founder of Modern Turkey (John Murray, 1999)" }, { id: "src_ataturk_hanioglu", kind: "biography", title: "M. Şükrü Hanioğlu, Atatürk: An Intellectual Biography (Princeton University Press, 2011)" }, { id: "src_ataturk_kinross", kind: "biography", title: "Patrick Kinross, Atatürk: The Rebirth of a Nation (Weidenfeld & Nicolson, 1964)" }, { id: "src_ataturk_nutuk", kind: "archive", title: "Nutuk (\"The Great Speech\"), delivered by Mustafa Kemal Atatürk, 15–20 October 1927 — primary source" }, { id: "src_ataturk_belleten_libya", kind: "archive", title: "Belleten — \"Beginnings of Leadership: Mustafa Kemal's First Visit to Libya, 1908\"" }],
    rows: {
      // Sequenced the Caliphate abolition through explicit political calculation (delaying until public support waned, timing the move to specific trigger events, pre-building a loyal coalition and a legal deterrent) and personally overruled his own alphabet commission's plan with an explicit behavioral argument about long deadlines. Session 19 evidence MKA-E13, MKA-E14, MKA-E15, MKA-E17, MKA-E23.
      analytical_rigor: [78, 0.62, "d", "A"],
      // A biographer credits his Gallipoli performance to an "uncanny ability to predict where the attack would occur," likened to a chess player's anticipatory reasoning — a single biographer's characterization tied to one specific, well-documented instance, not independently corroborated elsewhere. Session 19 evidence MKA-E5, MKA-E7.
      intuitive_synthesis: [65, 0.45, "s", "A"],
      // Deliberately drew his legal-code reform across multiple distinct foreign legal traditions (German commercial, Italian criminal, Swiss civil) rather than adopting one wholesale, and reframed military doctrine from a fixed defensive line to a diffuse "field of defense" covering the entire homeland. Session 19 evidence MKA-E10, MKA-E27.
      systems_abstraction: [72, 0.52, "s", "A"],
      // Co-founded a secret opposition society as a junior officer, resigned all formal Ottoman authority rather than comply with an order to stand down and continued organizing anyway, and personally overruled his own appointed commission's cautious reform timeline. Session 19 evidence MKA-E2, MKA-E8, MKA-E9, MKA-E23.
      independent_thinking: [85, 0.7, "d", "A"],
      // After judging his own language-purification reform had overshot its intent and left the country's vocabulary impoverished, privately acknowledged the problem to a subordinate and course-corrected via a face-saving intellectual justification rather than simply persisting or reversing outright — one clean, direct instance. Session 19 evidence MKA-E25.
      belief_updating: [60, 0.48, "s", "A"],
      // Achieved at the top level across genuinely distinct domains within roughly fifteen years: field military command, diplomatic/political state-founding, comparative legal codification, and personally-delivered language/education reform. Session 19 evidence MKA-E5, MKA-E10, MKA-E17, MKA-E23, MKA-E24, MKA-E27.
      cross_domain_range: [76, 0.6, "d", "A"],
      // Sustained an uninterrupted, multi-stage elite military education and work sessions "sometimes exceeding 30 hours without rest" across his presidency — but the same period's quantified heavy smoking/drinking/caffeine pattern reflects a genuine absence of self-control in the health domain, a real, sourced tension rather than pure discipline. Session 19 evidence MKA-E1, MKA-E34.
      discipline: [75, 0.58, "d", "D"],
      // Personally delivered a single continuous 36-hour, six-day address (the Nutuk) covering an entire eight-year historical period in his own words, and sustained intense multi-year reform campaigns requiring extended, undivided personal attention. Session 19 evidence MKA-E34, MKA-E38.
      deep_focus: [75, 0.55, "d", "A"],
      // Pre-built a specific named inner circle and a legal deterrent in advance of a single contested political move, and deliberately drew precise elements from several distinct named foreign legal codes — suggestive of close attention to specific mechanism, though not corroborated by a second independent instance at this granularity. Session 19 evidence MKA-E15, MKA-E27.
      detail_orientation: [66, 0.42, "i", "A"],
      // Ordered an immediate counterattack at Gallipoli before his own regiment had even arrived, and personally compressed an alphabet-reform commission's proposed multi-year rollout into three months once he decided to act. Session 19 evidence MKA-E5, MKA-E23.
      execution_speed: [80, 0.6, "d", "A"],
      // Executed the Caliphate abolition as a deliberately staged, multi-step campaign: delaying until public sentiment shifted, personally touring to build support, pre-organizing a loyal coalition, and securing a legal deterrent in advance of the final legislative move. Session 19 evidence MKA-E13, MKA-E14, MKA-E15, MKA-E17.
      planning_orientation: [82, 0.65, "d", "A"],
      // Progressed without interruption through the empire's most selective military-education track, continued organizing a national movement after being stripped of all formal authority, and sustained a decade-long reform program against real, sometimes violent domestic resistance. Session 19 evidence MKA-E1, MKA-E9, MKA-E21, MKA-E22.
      persistence: [85, 0.68, "d", "A"],
      // Recognized his own language-purification reform had overshot its intent and adjusted course via a constructed intellectual rationale rather than persisting unchanged — one clear documented instance of course-correction under his own initiative. Session 19 evidence MKA-E25.
      adaptability: [62, 0.45, "s", "A"],
      // Volunteered for a materially disadvantaged combat theater, ordered an outnumbered regiment into a near-certain-death holding action, and resigned his own formal military commission to continue organizing resistance — an act carrying real risk of prosecution as treason had the movement failed. Session 19 evidence MKA-E3, MKA-E5, MKA-E9, MKA-E21.
      risk_tolerance: [90, 0.75, "d", "A"],
      // Operated and made high-stakes command decisions at Gallipoli and at Sakarya under genuine, unresolved battlefield uncertainty, credited by a biographer with an anticipatory reasoning style suited to exactly this kind of unresolved situation. Session 19 evidence MKA-E7, MKA-E10.
      ambiguity_tolerance: [70, 0.5, "s", "A"],
      // Ordered immediate engagement at Gallipoli before his own regiment had arrived, and instantly overruled his own commission's considered multi-year alphabet-reform timeline in favor of a three-month deadline. Session 19 evidence MKA-E5, MKA-E23.
      decisiveness: [82, 0.6, "d", "A"],
      // Personally presented a symbolically loaded reform to a hostile crowd of religious notables in the most resistant setting available, toured the country for months teaching a new alphabet himself at a blackboard, and directly, wittily engaged foreign press mockery rather than avoiding it. Session 19 evidence MKA-E21, MKA-E24, MKA-E36.
      social_assertiveness: [80, 0.6, "d", "A"],
      // Delegated the single most consequential diplomatic negotiation of the founding period entirely to a trusted subordinate and retained genuine working partnerships with several senior officers — but that same founding-generation inner circle split into open opposition within a year, and he responded by eliminating their party rather than continuing to share power with them. Session 19 evidence MKA-E11, MKA-E18, MKA-E19.
      collaboration: [55, 0.55, "s", "D"],
      // Built and led a national resistance movement from an unauthorized position, assumed direct field command at the war's most decisive engagement, and personally directed a sweeping multi-domain reform program as head of state for the following fifteen years. Session 19 evidence MKA-E5, MKA-E10, MKA-E21, MKA-E24.
      leadership_drive: [90, 0.75, "d", "A"],
      // Publicly justified a major secularizing reform in terms his religious audience could accept even while pursuing a further-reaching goal, rallied troops with galvanizing battlefield rhetoric, and toured the country personally to build support for reforms in advance of enacting them. Session 19 evidence MKA-E10, MKA-E14, MKA-E16.
      persuasiveness: [78, 0.58, "d", "A"],
      // Repeatedly and sustainedly engaged conflict with former comrades, an armed regional rebellion, and an assassination plot — responding in each case with escalating institutional force (party closure, special tribunals, mass executions) rather than avoidance or compromise, a pattern that secured the state but at real, documented human cost. Session 19 evidence MKA-E18, MKA-E19, MKA-E20, MKA-E22, MKA-E32, MKA-E33.
      conflict_tolerance: [88, 0.7, "d", "D"],
      // Progressed through the empire's most selective military-education track without interruption, and personally invested months touring the country to teach a new alphabet in granular, hands-on detail rather than treating the reform as complete once decreed. Session 19 evidence MKA-E1, MKA-E24.
      mastery_orientation: [68, 0.48, "s", "A"],
      // Delivered decisive military victory, founded a new state, abolished a six-century dynasty and a globally recognized Caliphate, and enacted a legal and cultural modernization program touching family law, the alphabet, and women's suffrage — all within roughly fifteen years. Session 19 evidence MKA-E10, MKA-E17, MKA-E23, MKA-E26, MKA-E27.
      achievement_drive: [88, 0.65, "d", "A"],
      // Drove a decisive military campaign to rout a numerically comparable opposing army, and is documented in ongoing rivalry dynamics with former comrades who challenged his standing. Session 19 evidence MKA-E10, MKA-E18.
      competitiveness: [68, 0.48, "s", "A"],
      // Repeatedly organized and acted outside or directly against official authority structures — a secret officer society, resignation from formal command, and overruling his own appointed commission's plan — rather than working within existing institutional constraints. Session 19 evidence MKA-E2, MKA-E9, MKA-E23.
      autonomy_need: [82, 0.62, "d", "A"],
      // Pursued a deliberately civilizational-scale program (new state, new legal codes, new alphabet, new social order) rather than a narrower political or military goal, reflected consistently across the full scope of the reform agenda. Session 19 evidence MKA-E17, MKA-E23, MKA-E26, MKA-E27.
      impact_motivation: [80, 0.55, "s", "A"],
      // Recognized and used an officially-assigned demobilization mandate as the platform to organize the opposite of its intended purpose, and treated two specific, converging developments as the decisive signal to finally act on the long-deferred Caliphate abolition. Session 19 evidence MKA-E8, MKA-E17.
      opportunity_sensing: [78, 0.55, "d", "A"],
      // Repurposed an assigned government role for an unauthorized organizing purpose, and built a coalition of allies specifically to manage a politically constrained, resource-limited moment rather than acting without preparation. Session 19 evidence MKA-E8, MKA-E15.
      resourcefulness: [68, 0.45, "i", "A"],
      // Repeatedly initiated significant action beyond his own formal mandate or authority — founding a secret society as a junior officer, continuing to organize a national movement after formal authority was stripped, and personally touring the country to teach reforms himself rather than waiting for institutions to implement them. Session 19 evidence MKA-E2, MKA-E9, MKA-E24.
      proactive_agency: [85, 0.65, "d", "A"],
    },
  },
  {
    id: "p_oscar_niemeyer",
    slug: "oscar-niemeyer",
    canonicalName: "Oscar Niemeyer",
    birthYear: 1907,
    deathYear: 2012,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["BR"],
    regionCode: "latin_america",
    occupationIds: ["architect"],
    fieldIds: ["architecture", "urban_design"],
    impactDomains: ["artistic", "engineering", "cultural"],
    tagIds: ["innovator", "nonconformist", "sustained_excellence"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q134165" },
    sources: [{ id: "src_niemeyer_vice", kind: "press", title: "Vice Magazine — \"Oscar Niemeyer: The 101-Year-Old Man Who Invented Brazil's Capital\"", url: "https://www.vice.com/en/article/oscar-niemeyer-856-v16n5/" }, { id: "src_niemeyer_parisupdate", kind: "press", title: "Paris Update — \"Oscar Niemeyer in France: Creative Exile\"", url: "https://www.parisupdate.com/oscar-niemeyer-in-france/" }, { id: "src_niemeyer_wr", kind: "press", title: "Whipple Russell Architects — \"The Genius of Oscar Niemeyer\" (Parts I & II)", url: "https://whipplerussell.com/blog/the-genius-of-oscar-niemeyer-part-1" }, { id: "src_niemeyer_pritzker", kind: "award_body", title: "The Pritzker Architecture Prize — 1988 Laureate page and Jury Citation" }, { id: "src_niemeyer_un", kind: "institution", title: "UN Archives (official United Nations archival record) — \"Oscar Niemeyer and the United Nations Headquarters\"", url: "https://archives.un.org/en/node/245" }, { id: "src_niemeyer_philippou", kind: "biography", title: "Styliane Philippou, Oscar Niemeyer: Curves of Irreverence (Yale University Press, 2008)" }, { id: "src_niemeyer_wapo", kind: "press", title: "The Washington Post — Oscar Niemeyer obituary (December 2012)" }, { id: "src_niemeyer_nyt", kind: "press", title: "The New York Times — Nicolai Ouroussoff, obituary and prior critical coverage" }, { id: "src_niemeyer_riba", kind: "award_body", title: "RIBA Royal Gold Medal (1998) — Architects' Journal coverage" }, { id: "src_niemeyer_domus", kind: "press", title: "Domus (Domus Web archive) — \"Oscar Niemeyer: the French Communist Party headquarters in Paris\"" }],
    rows: {
      // Structurally unified wall and roof into a single curved concrete shell, abandoning the conventional pillar-beam-slab approach, and later described his forms as emerging from spatial and structural calculation rather than pure decoration. Session 19 evidence ON-E4, ON-E26.
      analytical_rigor: [62, 0.42, "i", "A"],
      // Designed a structurally unorthodox curved church that Church authorities refused to consecrate for sixteen years rather than compromise the form, publicly rejected the Bauhaus/rationalist premise that architecture's value lies purely in functionalism, and sustained a costly political affiliation despite direct professional consequences. Session 19 evidence ON-E4, ON-E7, ON-E25.
      independent_thinking: [85, 0.68, "d", "A"],
      // Originated a structurally novel curved-shell architectural form that abandoned conventional wall/roof separation entirely, sustained a signature, instantly recognizable curve-based aesthetic across a 78-year career, and explicitly framed beauty itself as architecture's central justification. Session 19 evidence ON-E4, ON-E25.
      creative_originality: [92, 0.75, "d", "A"],
      // Embedded an untested egalitarian housing ideology directly into a purpose-built capital city's design, revised his own working method and stated philosophy in direct response to public criticism, and described continuously exploring concrete's sculptural potential throughout his working life. Session 19 evidence ON-E9, ON-E11, ON-E24.
      experimentation: [75, 0.55, "d", "A"],
      // Extended his creative practice into furniture design with a family collaborator, took on sustained formal political-organizational leadership of a national party, and maintained an internationally distributed practice spanning several distinct cultural and political contexts. Session 19 evidence ON-E14, ON-E19.
      cross_domain_range: [68, 0.5, "s", "A"],
      // Explicitly stated that architecture "has to be pretty" and "has to amaze to be a masterpiece," sustaining a signature curve-based aesthetic vision across nearly eight decades that critics specifically credited with reconciling the sensual and the rational in built form. Session 19 evidence ON-E25.
      aesthetic_sensitivity: [90, 0.7, "d", "A"],
      // Maintained a daily drawing practice from early childhood through the end of his life, and at nearly 100 years old still climbed the stairs each morning to a full day of active design work rather than treating advanced age as grounds for retirement. Session 19 evidence ON-E1, ON-E24.
      discipline: [82, 0.62, "d", "A"],
      // Sustained an unbroken daily creative practice from early childhood, continuing to design actively into his eleventh decade with a desk full of ongoing projects. Session 19 evidence ON-E1, ON-E24.
      deep_focus: [80, 0.58, "d", "A"],
      // Worked without pay specifically to learn from an established mentor, pushed his way onto a high-profile project team after being initially excluded, and sustained an internationally distributed architectural practice across two decades of political exile and into extreme old age. Session 19 evidence ON-E2, ON-E3, ON-E19, ON-E21.
      persistence: [88, 0.68, "d", "A"],
      // Publicly revised his own design philosophy and working method after direct professional criticism, and rebuilt an entirely new, internationally distributed client base across several countries after losing his Brazilian practice to political persecution. Session 19 evidence ON-E9, ON-E19.
      adaptability: [80, 0.62, "d", "A"],
      // Sustained a costly political party affiliation that directly blocked major career opportunities and ultimately triggered a raided office and lost clients, then collectively resigned from an academic institution in protest rather than continue working quietly under a government he opposed. Session 19 evidence ON-E7, ON-E16, ON-E17.
      risk_tolerance: [82, 0.62, "d", "A"],
      // Declined to compromise a structurally unorthodox design despite the prospect of prolonged institutional rejection, and responded to public professional criticism with a direct, substantive counter-argument rather than delay or silence. Session 19 evidence ON-E4, ON-E8.
      decisiveness: [70, 0.5, "s", "A"],
      // Engaged directly and publicly in a professional dispute with a prominent critic rather than remaining silent, and continued giving direct public statements about his own philosophy and working method into his second century of life. Session 19 evidence ON-E8, ON-E24.
      social_assertiveness: [72, 0.52, "s", "A"],
      // Yielded ground to a senior colleague's pressure for a merged design submission even after his own scheme had already won the design board's preference, and sustained a decades-long working partnership with the same mentor-turned-collaborator across two of his largest career commissions. Session 19 evidence ON-E6.
      collaboration: [68, 0.55, "d", "A"],
      // Led his own architectural practice across a 78-year career and separately took on formal presidential leadership of a national political party in his mid-eighties. Session 19 evidence ON-E14.
      leadership_drive: [75, 0.55, "d", "A"],
      // Earned expanded design authority on a major early commission through the persuasive quality of his own work after being initially excluded, and mounted a substantive public counter-argument against a prominent critic's published attack. Session 19 evidence ON-E3, ON-E8.
      persuasiveness: [70, 0.5, "s", "A"],
      // Sustained a structurally unorthodox design through sixteen years of institutional rejection rather than compromise, and maintained a costly political commitment despite direct professional consequences — though the same record shows him yielding ground to a senior colleague's pressure in at least one high-profile case, so this tolerance was not unconditional. Session 19 evidence ON-E4, ON-E6, ON-E7.
      conflict_tolerance: [82, 0.62, "d", "D"],
      // Sustained a self-directed daily drawing practice from early childhood through the end of his life, and continued deep, hands-on engagement with his own craft's technical possibilities across a 78-year career rather than shifting to a purely supervisory role. Session 19 evidence ON-E1, ON-E24.
      mastery_orientation: [85, 0.65, "d", "A"],
      // Designed approximately 600 projects across a 78-year working career, continuing major international commissions into his eleventh decade of life. Session 19 evidence ON-E19, ON-E21.
      achievement_drive: [90, 0.7, "d", "A"],
      // Pushed his way onto a major project team he had been formally excluded from, and maintained an independent artistic and political direction across a career that continued producing major commissions into his second century of life. Session 19 evidence ON-E3, ON-E21.
      autonomy_need: [78, 0.58, "d", "A"],
      // Donated architectural plans for a political party's headquarters specifically out of ideological commitment rather than fee, and directly acknowledged rather than denied the tension between his stated political values and his career of building for the wealthy and the state, reframing architecture's purpose around improving human life rather than profit. Session 19 evidence ON-E15, ON-E18.
      impact_motivation: [80, 0.6, "d", "A"],
      // Rebuilt an entirely new, substantial international client base across several countries once political exile closed off his original Brazilian practice, rather than treating the loss as career-ending. Session 19 evidence ON-E19.
      opportunity_sensing: [65, 0.42, "i", "A"],
      // Reconstructed a functioning, internationally distributed architectural practice from a foreign base after his original office was raided and his domestic client base disappeared. Session 19 evidence ON-E17, ON-E19.
      resourcefulness: [65, 0.42, "i", "A"],
      // Pushed his way onto a high-profile project after being formally excluded from it, sheltered political dissidents at his own office on his own initiative, and continued personally initiating major design projects into extreme old age rather than allowing his advancing years to end his active output. Session 19 evidence ON-E3, ON-E12, ON-E21.
      proactive_agency: [85, 0.65, "d", "A"],
    },
  },
];

export const ROSTER_10: readonly Person[] = seeds.map(build);
