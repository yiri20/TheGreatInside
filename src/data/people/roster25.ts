/**
 * ROSTER 25 — fast production batch, second real use of the
 * profile-publication / match-eligibility separation architecture
 * (6 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster25.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. Nellie Bly
 * and Carl Jung are pre-existing `qa_passed`/match-eligible; Vera Rubin,
 * Subrahmanyan Chandrasekhar, Fridtjof Nansen, and Isabella Bird are
 * `evidence_approved`/non-match-eligible by design. Every score's
 * rationale is preserved as the inline comment above its Row. Full
 * record: `docs/checkpoints/roster25-fast-production-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_carl_jung",
    slug: "carl-jung",
    canonicalName: "Carl Jung",
    birthYear: 1875,
    deathYear: 1961,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CH"],
    regionCode: "western_europe",
    occupationIds: ["physician", "scientist"],
    fieldIds: ["medicine", "philosophy"],
    impactDomains: ["scientific", "cultural", "medical"],
    tagIds: ["theorist", "mystic", "polymath"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q41532" },
    portrait: {
      url: "/portraits/carl-jung-eth-bib-1935.jpg",
      source: "Wikimedia Commons",
      license: "Public Domain Mark 1.0, applied by the copyright holder (ETH-Bibliothek)",
      width: 1297,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:ETH-BIB-Jung,_Carl_Gustav_(1875-1961)-Portrait-Portr_14163_(cropped).tif",
      attribution: "Unknown photographer, c. 1935 — ETH-Bibliothek Zürich, Bildarchiv",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_cj_red_book", kind: "archive", title: "C. G. Jung, The Red Book (Liber Novus, written 1913-1930, published 2009) — his own private self-experimentation record, not intended for publication in his lifetime" }, { id: "src_cj_bair", kind: "biography", title: "Deirdre Bair, Jung: A Biography (2003) — an independent, extensively archive-sourced biography" }, { id: "src_cj_freud_correspondence", kind: "archive", title: "The Freud/Jung Letters (ed. William McGuire, 1974) — the surviving correspondence documenting the collaboration and rupture from both sides" }, { id: "src_cj_wikipedia", kind: "wikipedia", title: "Carl Jung", url: "https://en.wikipedia.org/wiki/Carl_Jung" }],
    rows: {
      // Documented, sustained personal investigation across psychiatry, comparative mythology, alchemy, and Eastern religious texts over decades, corroborated by the surviving breadth of his own research notes and correspondence with specialists in each field, not general reputation.
      curiosity: [78, 0.6, "d", "A"],
      // Documented as breaking definitively from Freud over the libido theory's exclusively sexual basis, a rupture independently corroborated by both sides' surviving correspondence (the Freud/Jung Letters), not Jung's account alone, and sustained despite the professional cost of losing Freud's designated successorship.
      independent_thinking: [82, 0.68, "d", "A"],
      // Documented, sustained personal practice of recording and illustrating his own inner experiences in the Red Book across roughly 16 years (1913-1930), corroborated by the surviving manuscript itself as an independently verifiable, dated body of work, not merely his own later claim.
      discipline: [68, 0.5, "s", "A"],
      // Documented as continuing his self-directed psychological exploration through a period biographers describe as a severe personal crisis following the Freud break (roughly 1913-1919), sustained until he began publishing new theoretical work again, corroborated by the dated gap and resumption in his publication record.
      persistence: [70, 0.52, "s", "A"],
      // Documented, corroborated from both sides of the surviving Freud/Jung correspondence, as breaking from Freud despite this ending his position as heir-apparent to the psychoanalytic movement and costing him most of his professional relationships within it -- a specific, well-attested professional risk accepted rather than avoided.
      risk_tolerance: [65, 0.52, "s", "R"],
      // Documented as continuing self-directed inner exploration for years without a clear theoretical resolution or public framework to present, inferred tolerance for that sustained personal and professional uncertainty.
      ambiguity_tolerance: [58, 0.42, "i", "A"],
      // The Freud break unfolded over an extended period of documented ambivalent correspondence before the final rupture, suggesting a gradual rather than sudden decisiveness — scored near center rather than assumed high.
      decisiveness: [55, 0.4, "i", "N"],
      // Documented as commanding authority within the circle of followers who gathered around him in Zurich, though Bair's independent biography also describes periods of documented withdrawal and social isolation, particularly during the post-Freud crisis years — genuinely mixed, scored near center.
      social_assertiveness: [62, 0.45, "i", "N"],
      // Founded and led his own analytical psychology movement and training institute (the C. G. Jung Institute, Zurich) after the Freud break, documented as retaining doctrinal authority over the movement's direction for decades.
      leadership_drive: [65, 0.48, "s", "A"],
      // Documented as building an international following for analytical psychology from a position of having lost the mainstream psychoanalytic movement's institutional backing, inferred persuasive/communicative skill from the movement's documented growth.
      persuasiveness: [62, 0.45, "i", "A"],
      // Documented, corroborated from both sides of the Freud/Jung correspondence, as sustaining an increasingly strained theoretical and personal disagreement over several years before the final, public break, rather than either resolving it quietly or ending the relationship abruptly.
      conflict_tolerance: [72, 0.55, "s", "D"],
      // Documented, sustained self-directed study of alchemical texts and comparative religion over decades specifically to develop his theory of archetypes and individuation, corroborated by the scholarly depth independently recognized in his later published work on alchemy.
      mastery_orientation: [72, 0.55, "s", "A"],
      // Documented sustained theoretical output across a long career, though direct evidence of explicit status-seeking as distinct from genuine intellectual conviction is thinner, hence inference-level.
      achievement_drive: [62, 0.45, "i", "N"],
      // Documented as deliberately forgoing the secure, prestigious position as Freud's designated successor to pursue his own independent theoretical direction, a specific, well-corroborated act of prioritizing intellectual independence over institutional security.
      autonomy_need: [80, 0.65, "d", "A"],
      // His own writing frames his psychological work primarily in terms of individual self-understanding (individuation) rather than explicit broad social reform, scored moderately rather than inflated toward a social-impact motivation the evidence doesn't directly support.
      impact_motivation: [55, 0.4, "i", "N"],
      // Sustained substantive, non-dabbling engagement across clinical psychiatry, comparative mythology, alchemy, and Eastern religious philosophy, each with real documented scholarly output (published books specifically on alchemical symbolism, on I Ching commentary) rather than superficial interest.
      cross_domain_range: [72, 0.55, "s", "A"],
      // Self-initiated the entire Red Book project as a private, self-directed practice with no external audience or professional requirement, and self-initiated the founding of his own training institute after the Freud break rather than seeking readmission to an existing institution.
      proactive_agency: [75, 0.58, "s", "A"],
      // Documented, corroborated from both sides of the surviving Freud/Jung correspondence, as ending his most significant professional collaboration in a rupture neither side fully repaired, and separately documented (Bair's biography) as having serially difficult relationships with several of his own students and followers over subsequent decades — a repeated pattern, not one relationship.
      collaboration: [42, 0.52, "s", "R"],
      // Documented as substantially revising his own earlier acceptance of Freudian libido theory after his personal crisis and independent research, a specific, corroborated instance of publicly revising a foundational earlier theoretical commitment rather than defending it indefinitely.
      belief_updating: [68, 0.5, "s", "A"],
      // Thin direct evidence of deliberate opportunity-timing distinct from his general career development; scored at the safe default.
      opportunity_sensing: [55, 0.4, "i", "A"],
      // Documented as rebuilding a viable clinical and theoretical career after losing the psychoanalytic movement's institutional backing, inferred resourcefulness from the documented recovery rather than one specific resourceful act.
      resourcefulness: [58, 0.42, "i", "A"],
      // Documented meticulous cross-referencing of alchemical and mythological source texts in his later scholarly work, per independent reviewers of his published research, though the broader evidentiary base is thinner, hence inference-level.
      detail_orientation: [62, 0.45, "i", "A"],
      // The Red Book's own extensive, elaborate illuminated illustrations (created entirely by Jung himself) are documented by art historians who have studied the manuscript as a genuine, sustained visual practice, not incidental doodling.
      aesthetic_sensitivity: [65, 0.48, "s", "A"],
    },
  },
  {
    id: "p_fridtjof_nansen",
    slug: "fridtjof-nansen",
    canonicalName: "Fridtjof Nansen",
    birthYear: 1861,
    deathYear: 1930,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["NO"],
    regionCode: "western_europe",
    occupationIds: ["explorer", "scientist", "diplomat"],
    fieldIds: ["exploration", "natural_science"],
    impactDomains: ["historical", "social"],
    tagIds: ["explorer"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q72292" },
    portrait: {
      url: "/portraits/fridtjof-nansen-loc-vanderweyde-1915.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in the US (published before January 1, 1931; Library of Congress George Grantham Bain Collection, digital ID ggbain.03377)",
      width: 1103,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Fridtjof_Nansen_LOC_03377u.jpg",
      attribution: "Henry van der Weyde, 1915 — Library of Congress, George Grantham Bain Collection",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_fn_farthestnorth", kind: "archive", title: "Fridtjof Nansen, Farthest North, Vol. I (his own account of the Fram expedition, 1893-1896)", url: "https://www.gutenberg.org/files/30197/30197-h/30197-h.htm" }, { id: "src_fn_bain", kind: "biography", title: "James Arthur Bain, Fridtjof Nansen: His Life and Explorations (1897) — independent contemporary biography", url: "https://archive.org/stream/fridtjofnansenhi00bainuoft/fridtjofnansenhi00bainuoft_djvu.txt" }, { id: "src_fn_wikipedia", kind: "wikipedia", title: "Fridtjof Nansen", url: "https://en.wikipedia.org/wiki/Fridtjof_Nansen" }],
    rows: {
      // His own account documents proceeding with the Fram expedition despite the Royal Geographical Society's Admiral M'Clintock calling it "the most adventurous programme ever brought under the notice" of the society — a directly self-authored account of sustaining an unconventional, expert-contested theory (ice drifts across the Pole) against establishment skepticism.
      independent_thinking: [68, 0.55, "d", "A"],
      // His own account documents staking the expedition on an unproven drift theory; the independent Bain biography separately documents a lifelong pattern of physically dangerous choices (crossing terrain locals refused at night, being "a reckless climber") and, critically, his decision during the 1888 Greenland crossing to deliberately eliminate retreat options ("broke off all means of retreat... it was death — or the west coast of Greenland") — two independent sources converging on the same sustained trait.
      risk_tolerance: [70, 0.55, "d", "D"],
      // His own account documents methodically compiling multiple independent lines of evidence (Jeannette wreckage found in Greenland, diatom analysis, Siberian driftwood patterns) before committing to the drift theory rather than resting the case on a single argument — a documented pattern of building a case from several distinct, named data sources.
      analytical_rigor: [62, 0.5, "s", "A"],
      // His own account documents roughly nine years of preparation before departure and an iterative ship-design process ("plan after plan," "model after another") with shipbuilder Colin Archer, a directly self-authored account of sustained, deliberate preparation rather than a rushed departure.
      planning_orientation: [65, 0.5, "d", "A"],
      // The same iterative ship-design process suggests an unwillingness to settle for a workable-but-imperfect design, but this is inferred from one described process rather than a second corroborating instance, hence inference.
      perfectionism: [58, 0.35, "i", "N"],
      // His own account documents personally covering funding shortfalls himself rather than compromising on ship quality ("I did not think it right to study the cost too much") — one self-authored, specific instance of self-initiated action to protect the expedition's integrity.
      proactive_agency: [60, 0.4, "i", "A"],
      // The same funding-shortfall episode implies strong personal investment in the expedition's success, but is a single, indirect signal rather than a clearly on-point achievement-drive instance.
      achievement_drive: [54, 0.3, "i", "N"],
      // The independent Bain biography documents Nansen as "a born leader of boys, as of men, and a rival he could not brook" from schooldays, and a specific episode of refusing a ski-race prize after seeing superior Telemarken peasant technique until he had mastered it himself — one independent source, internally corroborated by two related anecdotes within it.
      competitiveness: [60, 0.4, "i", "N"],
      // The independent Bain biography documents Nansen's childhood/student absent-mindedness from sustained absorption in problems, including family criticism ("you'll never come to any good, you're such a dawdler") for missing appointments while thinking — one independent source's account of a recurring pattern.
      deep_focus: [62, 0.4, "i", "A"],
      // The Bain biography's account of the 1888 Greenland crossing decision to deliberately cut off retreat routes is a specific, dated, high-stakes decision, but rests on this one independent secondary account of the moment rather than Nansen's own description of his reasoning in the material actually read this cycle.
      decisiveness: [64, 0.45, "i", "A"],
      // The Bain biography documents warm attachment from his Sami companion Balto ("his face shone in our eyes like those of the parents") and Greenlandic hosts at Godthaab — one independent source's account of positive relational impact on companions, not corroborated by Nansen's own words in the material read this cycle.
      collaboration: [55, 0.35, "i", "A"],
      // The same companion-attachment material is thin, indirect evidence for this specific row, kept near the unremarkable band.
      social_assertiveness: [52, 0.3, "i", "N"],
      // The Bain biography quotes Nansen's own reported answer to critics questioning the expedition's value ("Man wants to know; and when man no longer wants to know, he will no longer be man") and documents his converting a gold medal to its cash value to fund further travel rather than keeping it as an honor — one independent source's account, quoting Nansen directly but not independently verified against his own writing in the material read this cycle.
      impact_motivation: [60, 0.4, "i", "A"],
      // The same "man wants to know" statement and Bain's summary assessment ("intense curiosity... a resolution as hard as adamant") support a knowledge-for-its-own-sake orientation, but this is a single independent source's characterization rather than a richly corroborated pattern.
      mastery_orientation: [58, 0.35, "i", "A"],
    },
  },
  {
    id: "p_isabella_bird",
    slug: "isabella-bird",
    canonicalName: "Isabella Bird",
    birthYear: 1831,
    deathYear: 1904,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["explorer", "writer"],
    fieldIds: ["exploration", "literature"],
    impactDomains: ["historical", "cultural"],
    tagIds: ["explorer", "overcame_adversity"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q288210" },
    portrait: {
      url: "/portraits/isabella-bird-nypl-1899.jpg",
      source: "Wikimedia Commons",
      license: "Public domain in the US (published 1899, before January 1, 1931)",
      width: 1270,
      height: 1270,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Isabella_Bird_portrait.jpg",
      attribution: "Photographic portrait published in Isabella Bird, The Yangtze Valley and Beyond (G. P. Putnam's Sons, 1899) — New York Public Library Digital Collections",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ib_unbeaten_tracks", kind: "archive", title: "Isabella L. Bird, Unbeaten Tracks in Japan (1880) — her own travel letters to her sister", url: "https://www.gutenberg.org/files/2184/2184-h/2184-h.htm" }, { id: "src_ib_stoddart", kind: "biography", title: "Anna M. Stoddart, The Life of Isabella Bird (1906) — independent biography by a personal acquaintance, drawing on family letters and papers", url: "https://archive.org/stream/lifeofisabellabi00stoduoft/lifeofisabellabi00stoduoft_djvu.txt" }, { id: "src_ib_wikipedia", kind: "wikipedia", title: "Isabella Bird", url: "https://en.wikipedia.org/wiki/Isabella_Bird" }],
    rows: {
      // The independent Stoddart biography documents a lifelong childhood-onward pattern of continuing physical activity despite a chronic spinal/pain condition rather than resting; her own Japan letters separately document enduring a first night's collapsed travel-stretcher for three hours while "becoming more and more nervous every moment" rather than abandoning the arrangement — two independently-sourced instances of pushing through discomfort rather than stopping.
      persistence: [66, 0.55, "d", "A"],
      // The same childhood pattern (sustained outdoor activity maintained against doctor's expectations) suggests self-imposed routine, but is inferred from a general biographical characterization rather than one specific dated instance.
      discipline: [58, 0.4, "i", "A"],
      // The Stoddart biography documents that travel, prescribed as a treatment, unexpectedly energized rather than depleted her ("better in health, full of animation" after a seven-month 1854 voyage) — one independent source's account of an atypical positive response to changed circumstances.
      adaptability: [62, 0.45, "i", "A"],
      // The same unexpected travel-health discovery implies she revised her own assumptions about what she could tolerate, but this is inferred rather than a documented statement of changed belief.
      belief_updating: [55, 0.3, "i", "A"],
      // Her own letters document acute pre-departure fear before the Japan journey ("the fear of being frightened, of being rudely mobbed... I often wished to give up my project, but was ashamed of my cowardice") followed by proceeding anyway; the independent Stoddart biography separately documents a near-drowning on Lake Ontario after which she vowed never to cross it again, then sailed it again within days — two independently-sourced instances of acting despite (rather than absence of) fear.
      risk_tolerance: [64, 0.5, "d", "D"],
      // Her own letters document hiring a guide (Ito) she explicitly distrusted at the outset ("I suspected and disliked the boy") without references, out of practical necessity — one self-authored instance of proceeding under uncertainty about a working relationship.
      ambiguity_tolerance: [58, 0.4, "i", "A"],
      // Her own letters document deliberately packing minimal provisions against others' advice, reasoning through the interior's actual conditions herself ("bread, butter, milk, meat... are unattainable") rather than deferring to convention — one self-authored instance of independently-reasoned self-direction.
      autonomy_need: [58, 0.4, "i", "N"],
      // Her own letters document practical kit design choices (a 2.5-ounce Japanese hat instead of a heavier pith helmet, an elevated stretcher against fleas, a diplomatically-obtained unrestricted passport) — self-authored but a single cluster of related choices rather than an independently corroborated pattern.
      resourcefulness: [56, 0.35, "i", "A"],
      // The same kit-design cluster shows some forethought, but is a single self-authored account rather than a second corroborating instance, kept near the unremarkable band.
      planning_orientation: [54, 0.3, "i", "N"],
      // The independent Stoddart biography documents that despite publicly crediting others' judgment when first submitting a manuscript to publisher John Murray, she independently objected to his change of her book's title and argued against discounting books sold to remote Highland communities — one independent source's account of asserting her own judgment against her publisher's on two related points.
      independent_thinking: [60, 0.45, "i", "A"],
      // The same Murray dispute (arguing successfully enough that Stoddart records the objection as notable) is the only direct evidence for this row, hence inference-level.
      persuasiveness: [55, 0.35, "i", "A"],
      // The Stoddart biography documents her personally nursing her sister Henrietta through scarlet fever while separately tending their father, without contracting the illness herself — one independent source's account of sustained caregiving under a specific health risk.
      collaboration: [55, 0.35, "i", "A"],
      // The Stoddart biography documents that she used earnings from her first book to fund deep-sea fishing boats for impoverished Highland communities, tied to an inherited (her father's, via the Wilberforce family line) social conscience — one independent source's specific account of directing personal resources toward a cause.
      impact_motivation: [58, 0.4, "i", "A"],
      // The same fishing-boat philanthropy is a single self-initiated act documented only in the independent biography, not corroborated in her own letters read this cycle.
      proactive_agency: [56, 0.35, "i", "A"],
      // Her own letters document unusually detailed, sustained documentation of a temple's architecture and religious objects down to the worn condition of a specific statue ("has not much more of eyes, nose, and mouth than the Sphinx") — one self-authored instance of close, voluntary observation well beyond what a traveler's diary requires.
      curiosity: [60, 0.4, "i", "A"],
      // The same temple-documentation passage supports sustained attentiveness to specific physical detail, though it is a single self-authored instance.
      detail_orientation: [58, 0.35, "i", "A"],
      // Her own letters show a balanced, fact-checked social observation of local women's fashion (critical but fair: "hard to pronounce any unfavourable criticism on women who have so much kindly grace of manner") — a single, mild signal kept near the unremarkable band.
      analytical_rigor: [52, 0.3, "i", "N"],
    },
  },
  {
    id: "p_nellie_bly",
    slug: "nellie-bly",
    canonicalName: "Nellie Bly",
    aliases: ["Elizabeth Cochrane"],
    birthYear: 1864,
    deathYear: 1922,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer", "entrepreneur"],
    fieldIds: ["literature", "business"],
    impactDomains: ["literary", "social", "industrial"],
    tagIds: ["overcame_adversity", "innovator", "field_researcher"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q230299" },
    portrait: {
      url: "/portraits/nellie-bly-loc-myers-1890.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (life+70 or fewer; Library of Congress Prints and Photographs Division, digital ID cph.3b22819)",
      width: 926,
      height: 1396,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nellie_Bly_2.jpg",
      attribution: "H. J. Myers, c. 1890 — Library of Congress",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_nb_own_reporting", kind: "archive", title: "Nellie Bly, Ten Days in a Mad-House (1887) and Around the World in Seventy-Two Days (1890) — her own published investigative reporting" }, { id: "src_nb_kroeger", kind: "biography", title: "Brooke Kroeger, Nellie Bly: Daredevil, Reporter, Feminist (1994) — an independent, archive-sourced biography" }, { id: "src_nb_asylum_officials", kind: "institution", title: "Contemporary New York press coverage and the subsequent official grand jury investigation into Blackwell's Island asylum conditions, triggered directly by Bly's reporting and independently corroborating her account's specific claims" }, { id: "src_nb_wikipedia", kind: "wikipedia", title: "Nellie Bly", url: "https://en.wikipedia.org/wiki/Nellie_Bly" }],
    rows: {
      // Documented, sustained pursuit of direct, firsthand investigation across genuinely distinct subjects — asylum conditions, factory labor conditions, a solo round-the-world journey, and later manufacturing patents — corroborated by her own published record of each undertaking, not one investigation repeated.
      curiosity: [70, 0.52, "s", "A"],
      // Documented, independently corroborated by the newspaper's own published serial record of her dispatches as they arrived (not her own account alone), as filing telegraph dispatches on a strict daily schedule throughout her 72-day round-the-world trip under real time and logistical pressure.
      discipline: [68, 0.55, "s", "A"],
      // Documented as beginning her journalism career by writing an anonymous rebuttal to a Pittsburgh Dispatch column demeaning working women, then persisting through the newspaper's initial dismissal of her as a novice to become a staff reporter, corroborated by Kroeger's independent account of this origin.
      persistence: [72, 0.55, "s", "A"],
      // Documented career shift from investigative stunt journalism to war correspondent (covering the Eastern Front in WWI) to industrialist running her late husband's manufacturing company, inferred adaptability from the documented sequence of genuinely different roles.
      adaptability: [62, 0.45, "i", "A"],
      // Documented as feigning insanity to gain admission to the Blackwell's Island women's asylum for ten days, with no guaranteed way to prove her sanity and secure release once inside — a specific, severe, independently corroborated risk (the grand jury investigation her reporting triggered confirms the conditions and circumstances she described).
      risk_tolerance: [85, 0.7, "d", "R"],
      // Documented as sustaining the asylum assignment for ten days without a guaranteed exit mechanism, and later undertaking the round-the-world trip with a fixed public deadline and no margin for serious delay — both documented as sustained functioning under genuine, high-stakes uncertainty.
      ambiguity_tolerance: [65, 0.48, "s", "A"],
      // Documented as accepting her editor's around-the-world assignment and departing within days of the proposal, a specific, rapidly executed commitment corroborated by the newspaper's own contemporaneous account of the assignment's short lead time.
      decisiveness: [68, 0.5, "s", "A"],
      // Documented, independently corroborated by Kroeger's biography, as directly and repeatedly approaching newspaper editors as an unknown young woman to secure specific assignments (the asylum infiltration, the round-the-world trip) male reporters were preferentially given -- a repeated pattern across two separate, dated pitches, not one occasion.
      social_assertiveness: [65, 0.5, "s", "A"],
      // Documented as personally running the Iron Clad Manufacturing Company after her husband's death, holding patents in her own name and implementing employee welfare programs (gyms, libraries) independently corroborated by business records of the company during her ownership period.
      leadership_drive: [68, 0.5, "s", "A"],
      // Documented, independently corroborated by the newspaper's own account of the internal decision, as persuading a skeptical editor to fund the expensive, unproven round-the-world assignment for a young female reporter over more established male reporters who had also sought it.
      persuasiveness: [68, 0.52, "s", "A"],
      // Documented as publishing findings that directly contradicted institutional denials from asylum officials, resulting in a public grand jury investigation, inferred sustained willingness to accept institutional pushback from the documented public dispute that followed publication.
      conflict_tolerance: [62, 0.45, "i", "D"],
      // Thin direct evidence of deliberate skill-building distinct from her investigative practice itself; scored at the safe default.
      mastery_orientation: [55, 0.4, "i", "A"],
      // Documented, independently corroborated by contemporaneous newspaper records of her arrival, as deliberately setting out to beat the fictional 80-day record from Around the World in Eighty Days and completing the trip in a verified 72 days -- a specific, self-set, publicly documented and independently confirmed competitive benchmark she achieved.
      achievement_drive: [68, 0.55, "s", "A"],
      // Documented as traveling the entire round-the-world route alone with minimal luggage by her own choice, against the era's strong convention that a woman traveling internationally required a chaperone, a documented deliberate independence.
      autonomy_need: [65, 0.48, "s", "A"],
      // Her asylum exposé directly triggered a grand jury investigation and a documented subsequent increase of $1 million in the city's asylum budget, an independently corroborated, institutionally-confirmed social-impact outcome, not a claimed intention alone.
      impact_motivation: [72, 0.6, "d", "A"],
      // Sustained substantive activity across investigative journalism, war correspondence, and manufacturing business ownership (holding her own patents) — genuinely distinct domains with real documented output in each.
      cross_domain_range: [65, 0.48, "s", "A"],
      // Self-initiated her journalism career by writing an unsolicited rebuttal letter, and self-proposed the asylum infiltration assignment to her editor rather than being assigned it, both documented as her own initiative rather than others' proposals.
      proactive_agency: [78, 0.62, "d", "A"],
      // Documented as recognizing stunt/immersive journalism's commercial and reformist potential before it was an established genre, corroborated by press historians' account of her role in popularizing the form.
      opportunity_sensing: [65, 0.48, "s", "A"],
      // Documented as maintaining her round-the-world schedule despite transportation delays by improvising alternative routes and connections, corroborated by the newspaper's own published account of specific logistical adjustments made en route.
      resourcefulness: [68, 0.5, "s", "A"],
      // Thin direct evidence of belief revision distinct from her general career adaptation; scored at the safe default.
      belief_updating: [55, 0.4, "i", "N"],
      // Documented, specific, verifiable factual claims in her asylum reporting (staff names, meal contents, specific patient treatment) independently corroborated by the subsequent grand jury investigation's findings matching her account.
      detail_orientation: [65, 0.48, "s", "A"],
      // Documented as racing against both the fictional 80-day benchmark and a rival journalist (Elizabeth Bisland) sent by a competing publication on the same day in the opposite direction, though the direct personal rivalry framing was substantially a publicity narrative — scored at inference level.
      competitiveness: [62, 0.45, "i", "N"],
      // Thin direct evidence of aesthetic sensitivity distinct from her reporting craft; scored at the safe default.
      aesthetic_sensitivity: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_subrahmanyan_chandrasekhar",
    slug: "subrahmanyan-chandrasekhar",
    canonicalName: "Subrahmanyan Chandrasekhar",
    birthYear: 1910,
    deathYear: 1995,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN", "US"],
    regionCode: "south_asia",
    occupationIds: ["physicist", "astronomer"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: ["nobel_laureate"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q148109" },
    portrait: {
      url: "/portraits/subrahmanyan-chandrasekhar-aip.jpg",
      source: "Wikimedia Commons",
      license: "Free use with attribution, granted by the copyright holder (American Institute of Physics)",
      width: 1078,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Subrahmanyan_Chandrasekhar.jpg",
      attribution: "AIP Emilio Segrè Visual Archives, Gift of Kameshwar Wali",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sc_wikipedia", kind: "wikipedia", title: "Subrahmanyan Chandrasekhar", url: "https://en.wikipedia.org/wiki/Subrahmanyan_Chandrasekhar" }, { id: "src_sc_nas_memoir", kind: "biography", title: "Eugene N. Parker, \"Subrahmanyan Chandrasekhar 1910-1995\" -- National Academy of Sciences Biographical Memoir (1997)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/chandrasekhar-s.pdf" }, { id: "src_sc_wali_review", kind: "press", title: "Review of Kameshwar C. Wali, \"Chandra: A Biography of S. Chandrasekhar\" (University of Chicago Press, 1991) -- scholarly reviews by Freeman Dyson (Physics Today) and William McCrea (Times Higher Education Supplement), summarizing the biography's documented account of Chandrasekhar's navigation of Indian, British, and American scientific culture", url: "https://www.academia.edu/20607283/Kameshwar_C_Wali_Chandra_A_biography_of_S_Chandrasekhar_Chicago_The_University_of_Chicago_Press_1991_Rezension_" }],
    rows: {
      // Parker's NAS memoir documents that after Eddington's public 1935 denunciation effectively closed doors to him across Britain, Chandrasekhar deliberately shifted his career to a new field (stellar dynamics, then radiative transfer, then plasma physics, then general relativity) roughly once a decade for the next 50 years rather than continuing to contest the same ground -- a specific, sustained, multi-decade redirection documented across the whole memoir, not a single episode.
      persistence: [82, 0.58, "d", "A"],
      // Documented in extraordinary detail: at the January 1935 Royal Astronomical Society meeting, Eddington -- after weeks of silently watching Chandrasekhar's work without comment -- publicly declared his correct calculation must be wrong on the spot, and no senior physicist present (including Fowler and Russell, both 'intimidated by Eddington's preeminence') defended him; Russell later refused to let him respond at a 1935 Paris conference, and again at a 1939 Paris colloquium. Chandrasekhar did not retract or fight publicly, instead leaving the field -- a real, dated, named, multi-year humiliation, scored dual-edged for its lasting professional cost.
      conflict_tolerance: [75, 0.58, "d", "D"],
      // Documented systematically rebuilding his career after the Eddington affair closed his path in England: relocating to the University of Chicago via a special missionary visa (since no immigration quota existed for Indians), then, later, willingly leaving his own astronomy department after a 1952 curriculum dispute alienated him, joining Fermi's physics department instead -- two distinct, dated, forced professional pivots he converted into new opportunities.
      adaptability: [80, 0.56, "d", "A"],
      // RUBRIC_CORRECTION (roster25 audit, 2026-09): sustained pattern of producing one authoritative monograph per research phase across a nearly 60-year career (stellar structure, stellar dynamics, radiative transfer, hydrodynamic stability, ellipsoidal figures, black holes, and finally a critical commentary on Newton's Principia at age 84) -- an independently verifiable bibliographic record, not a general reputation for brilliance. Originally scored 85/documented; corrected to 78/strong_inference because this record is described by only one of the two sources (the NAS memoir; the Wali-biography review does not corroborate it), and scoring_rubric_v1 Section 4 requires multiple independent documented instances from more than one source for an 85+ score -- capped at 71-84 with evidenceType strong_inference given the single source.
      mastery_orientation: [78, 0.55, "s", "A"],
      // Documented as managing editor of the Astrophysical Journal from 1952 to 1971, personally handling production, refereeing, and community politics for two decades while maintaining an undiminished research and teaching output -- described in the memoir as 'an example of the extraordinary feats that can be accomplished through dedication and self-discipline to the exclusion of nearly everything else in one's life,' with his own admission that the burden went on longer than he ever intended.
      discipline: [82, 0.56, "d", "A"],
      // Documented declining Princeton's 1946 offer to succeed Henry Norris Russell -- a prestigious, double-salary position -- specifically because he judged his actual research conditions at Chicago to be no worse, a judgment he made independently of the honor attached to the Princeton chair (a dialogue with Chancellor Hutchins over the decision is recorded in direct quotes in the memoir).
      independent_thinking: [68, 0.5, "d", "A"],
      // Documented as personally running the Yerkes Observatory's weekly colloquium for decades (giving the lecture himself at every 100th session, passing 500 before relocating campuses) and supervising 46 known PhD students, several of whom he 'appeared at critical moments' in the career of -- including the memoir's own author, a specific, named, first-person acknowledgment.
      leadership_drive: [68, 0.5, "d", "A"],
      // Documented working out the relativistic degenerate-electron-gas calculation that became his signature discovery aboard the ship to England in 1930, using the unstructured travel time productively before formal graduate study had even begun -- a specific, dated instance of self-directed resourceful use of otherwise-dead time.
      resourcefulness: [62, 0.45, "d", "A"],
      // Documented as generally not personally confronting Eddington despite disagreeing, and as spending 'a lonely but productive year' at Cambridge -- the memoir explicitly frames him as navigating conflict through withdrawal and redirection rather than direct confrontation, scored moderately rather than assuming assertiveness from his eventual stature.
      social_assertiveness: [45, 0.4, "d", "N"],
      // Documented becoming a naturalized U.S. citizen in 1953 with Lalitha after concluding it was 'the only realistic choice' for their permanent life together, over his father's bitter and lasting objection that it was a betrayal of their cultural origins -- a specific, dated decision accepting real, sustained family estrangement as the cost of a considered life choice, scored dual-edged given that real cost.
      risk_tolerance: [62, 0.45, "d", "D"],
      // Inferred from his documented multi-decade collaboration with B. C. Xanthopoulos and V. Ferrari on general relativity, and his earlier partnership with J. H. D. Jensen's contemporaries at Copenhagen and Gottingen, though the memoir describes his research style as more solitary and self-directed than collaborative overall.
      collaboration: [55, 0.4, "s", "A"],
      // Inferred from his sustained institutional service transferring the Astrophysical Journal's ownership from a single-university private holding to a broader American Astronomical Society structure specifically because he recognized the 'unstable character' of concentrating the field's leading journal under one person -- a documented act of prioritizing the field's institutional health over his own accumulated authority.
      impact_motivation: [58, 0.42, "s", "A"],
      // Documented Nobel Prize in Physics 1983, awarded fifty years after the original 1930s work it recognized -- an independently verifiable, decades-delayed vindication of the exact theory Eddington had publicly denounced.
      achievement_drive: [78, 0.52, "d", "A"],
    },
  },
  {
    id: "p_vera_rubin",
    slug: "vera-rubin",
    canonicalName: "Vera Rubin",
    birthYear: 1928,
    deathYear: 2016,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["astronomer"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific"],
    tagIds: [],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q234888" },
    portrait: {
      url: "/portraits/vera-rubin-godfrey-aip-1985.jpg",
      source: "Wikimedia Commons",
      license: "Free use with attribution, granted by the copyright holder (American Institute of Physics)",
      width: 971,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Vera_Rubin_with_antique_globes.jpg",
      attribution: "Photograph by Mark Godfrey, c. 1985 — courtesy AIP Emilio Segrè Visual Archives, Gift of Vera Rubin",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_vr_wikipedia", kind: "wikipedia", title: "Vera Rubin", url: "https://en.wikipedia.org/wiki/Vera_Rubin" }, { id: "src_vr_nas_memoir", kind: "biography", title: "Neta A. Bahcall, \"Vera C. Rubin 1928-2016\" -- National Academy of Sciences Biographical Memoir (2021)", url: "https://www.nasonline.org/wp-content/uploads/2024/06/rubin-vera.pdf" }, { id: "src_vr_autobiography", kind: "archive", title: "Vera C. Rubin, \"An Interesting Voyage\" -- Annual Review of Astronomy and Astrophysics 49 (2011): 1-28", url: "https://www.sea-astronomia.es/sites/default/files/annurev-astro-081710-102545_ok_0.pdf" }],
    rows: {
      // RUBRIC_CORRECTION (roster25 audit, 2026-09): Rubin's own memoir documents a sustained childhood pattern of specific, unprompted physical questions (why the moon seemed to follow the car, how water knew which side of a rock to pass) that she says never diminished, still 'no less' 80 years later -- a specific, dated, self-described lifelong pattern, not a general reputation. Originally scored 88/documented; corrected to 78/strong_inference because this rests on a single source (her own autobiography) and scoring_rubric_v1 Section 4 requires multiple independent documented instances from more than one source for an 85+ score -- a single source's account, however sustained the described pattern, caps at the 71-84 band with evidenceType strong_inference or inference, not documented.
      curiosity: [78, 0.58, "s", "A"],
      // Documented, directly quoted: when her department chairman offered to give her 1950 conference talk under his own name because she had a new baby and was not an AAS member, she replied 'No. I can go' and did -- a specific, dated refusal to cede authorship of her own work.
      independent_thinking: [78, 0.58, "d", "A"],
      // Documented sitting through 'many angry sounding men' publicly disputing her first conference talk in 1950, and, separately, the 1965 Palomar incident where she papered a 'MEN' bathroom sign with a hand-cut skirt-shape reading 'Women' rather than simply enduring the restriction quietly -- two distinct, dated, sourced incidents of confronting rather than avoiding conflict.
      conflict_tolerance: [72, 0.55, "d", "A"],
      // Documented in her own memoir: when a journal editor said he would publish her 1962 paper but would not credit her student co-authors by name, she said 'Then I withdraw the paper,' and he relented -- a specific, dated, successful assertive act on behalf of others, not herself.
      social_assertiveness: [68, 0.52, "d", "A"],
      // Documented sustained observational career from 1965 to the 2000s producing the flat-rotation-curve evidence for dark matter, corroborated across both sources with a specific, dated publication record (1970 Andromeda paper, 1978 extended sample paper) rather than a single result.
      mastery_orientation: [82, 0.6, "d", "A"],
      // Documented specific working recipe with longtime collaborator Kent Ford ('Please give me the finding chart' / 'No, now it's my turn,' alternating every exposure for years) and separately her account of a roughly 50/50 authorship arrangement worked out with Margaret and Geoffrey Burbidge in La Jolla -- two distinct, dated collaborative patterns, not a general claim of being collegial.
      collaboration: [74, 0.55, "d", "A"],
      // Documented, quoted in full: her four-sentence 1972 letter of recommendation for Sandra Faber's first faculty position, explicitly predicting she 'may one day be the Director' of the observatory she was applying to (a prediction that came true) -- a specific, dated act of institutional sponsorship.
      leadership_drive: [65, 0.48, "d", "A"],
      // Documented sustained pattern (NAS memoir) of writing letters of recommendation that explicitly chastised astronomy departments for having no women faculty, and monitoring conference speaker lists to demand more women be invited -- described as continuous over decades, not a single letter.
      impact_motivation: [75, 0.55, "d", "A"],
      // Documented deliberate 1964 decision to give up a ten-year teaching position at Georgetown specifically because observing had become more important to her, then walking into an all-male department (DTM, no female staff since 1904) unannounced to ask for a job -- a specific, dated career pivot into an unwelcoming environment.
      adaptability: [65, 0.48, "d", "A"],
      // Documented specific technique she devised for loading photographic film in total darkness without error (cutting two identical pieces, using one as a light-safe tester before loading the real one) -- a concrete, dated procedural invention under real observational constraints, explained step by step in her own words.
      resourcefulness: [70, 0.5, "d", "A"],
      // Documented recognizing, within a single first night of observing, that the M31 rotation curve was unexpectedly flat rather than declining -- and, separately, requesting a two-dimensional measuring machine from her director before he 'expected' the request by a full year -- two distinct, dated instances of anticipating a need or result early.
      opportunity_sensing: [68, 0.5, "d", "A"],
      // Documented continuing to publish and pursue flat-rotation-curve results across the 1960s-70s despite the 'many' comments she received being 'negative and some very unpleasant' -- a specific, dated pattern of sustained publication against real professional pushback, scored dual-edged given the genuine social cost she describes.
      risk_tolerance: [60, 0.45, "d", "D"],
      // Documented walking into the Carnegie Institution's DTM in January 1965 and asking director Bernard Burke directly for a job with no prior application -- a specific, dated act of pursuing an institutional position through direct initiative rather than a formal process.
      autonomy_need: [62, 0.45, "d", "A"],
      // Documented specific incident of spending 'hours with each sheet' of Baade's M31 plates identifying emission regions, and a separate account of a research group finishing a paper 'long into the night' around her kitchen table -- concrete, dated instances of sustained concentrated work, not a general claim of diligence.
      deep_focus: [65, 0.46, "d", "A"],
      // Directly quoted, twice across four decades: in 2010, asked whether she would be disappointed if dark matter turned out not to exist, she said she would 'be delighted, since the non-Keplerian rotation curves are an empirical observation of hitherto not understood physics, and one needs to keep an open mind' -- a specific, sourced statement of comfort with her life's central finding remaining unresolved.
      ambiguity_tolerance: [62, 0.45, "d", "A"],
      // Inferred from the documented outcomes of her advocacy (departments hiring women faculty after her letters, conference organizers adding women speakers after her complaints, an observatory changing its bathroom policy) -- real, dated, verifiable results rather than an assumed trait, though the memoir describes the outcomes more than the persuasive process itself.
      persuasiveness: [55, 0.4, "s", "A"],
      // Inferred from documented substantive activity across observational galaxy dynamics, K-12 astronomy education outreach on Navajo/Hopi reservations described at length in her memoir (via her collaborator Deidre Hunter, whom she personally championed), and federal science policy (National Science Board, testifying before Congress) -- three genuinely distinct domains.
      cross_domain_range: [58, 0.42, "s", "A"],
      // Inferred from her own detailed 1985 day-by-day calendar reproduced in the memoir, showing a sustained, dense schedule of observing runs, committee meetings, and travel sustained across decades while also raising four children -- a specific, dated documentary record rather than an assumed work ethic.
      discipline: [58, 0.42, "s", "A"],
      // Documented as producing the observational evidence now credited as the clearest confirmation of dark matter, corroborated independently across both sources, alongside a specific, sourced editorial note that the Nobel Prize 'missed their opportunity' to recognize it -- an achievement record independently verified, not self-reported alone.
      achievement_drive: [80, 0.56, "d", "A"],
    },
  },
];

export const ROSTER_25: readonly Person[] = seeds.map(build);
