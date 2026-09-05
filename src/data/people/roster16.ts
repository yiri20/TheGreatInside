/**
 * ROSTER 16 — final coverage-and-confidence-aware intake batch (9 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster16.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This cycle added a depth question to the standing coverage-aware
 * preflight: breadth (>=22 plausible attributes) AND depth (>=12 of those
 * genuinely supportable near the high-confidence threshold). Froze 12
 * candidates from a fresh 27-person discovery pool in a fixed deterministic
 * order, scored every one to 22-23 attributes. 11 of 12 crossed
 * `eligibility_v2` honestly on first score. Katharine Hepburn cleared every
 * gate except the high-confidence average (0.54, just under the 0.55
 * threshold) despite 14 qualifying high-confidence rows, and remains
 * `held` -- a genuinely different miss pattern than any earlier cycle.
 *
 * Only 9 slots remained before the 125-person target, so the first 9 of
 * the 11 qa_passed candidates by frozen intake order are promoted here:
 * Duke Ellington, Martha Graham, Bertrand Russell, Charles Dickens, George
 * Orwell, T. E. Lawrence, Elizabeth Cady Stanton, John D. Rockefeller, and
 * Bette Davis. Nellie Bly and Carl Jung are qa_passed but deferred solely
 * because the target was reached, not held. Full record:
 * `docs/checkpoints/roster16-final-intake.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_bertrand_russell",
    slug: "bertrand-russell",
    canonicalName: "Bertrand Russell",
    birthYear: 1872,
    deathYear: 1970,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["philosopher", "mathematician", "political_activist", "writer"],
    fieldIds: ["philosophy", "mathematics", "civil_rights"],
    impactDomains: ["cultural", "educational", "social"],
    tagIds: ["polymath", "nonconformist", "endured_imprisonment"],
    archetypeIds: ["cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q33760" },
    portrait: {
      url: "/portraits/bertrand-russell-anefo-1950.jpg",
      source: "Rijksmuseum Amsterdam",
      license: "CC0",
      width: 1203,
      height: 1600,
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      attribution: "Photographer: Keystone, Rijksmuseum Amsterdam (RP-F-F01636), Nobel Prize press conference, 10 Nov 1950",
      
    },
    sources: [{ id: "src_br_autobiography", kind: "archive", title: "Bertrand Russell, The Autobiography of Bertrand Russell (3 volumes, 1967-1969) — his own account, read critically alongside independent biography" }, { id: "src_br_monk", kind: "biography", title: "Ray Monk, Bertrand Russell: The Spirit of Solitude (1996) and Bertrand Russell: The Ghost of Madness (2000) — an independent, critical two-volume biography" }, { id: "src_br_wives", kind: "archive", title: "Correspondence and separately published accounts from more than one of Russell's four wives and long-term partners (including Dora Russell's own memoir The Tamarisk Tree, 1975), providing independent corroboration from multiple distinct relationships across different decades" }, { id: "src_br_wikipedia", kind: "wikipedia", title: "Bertrand Russell", url: "https://en.wikipedia.org/wiki/Bertrand_Russell" }],
    rows: {
      // Documented, sustained substantive published work across mathematical logic, epistemology, political theory, and popular science across a 70-year writing career, independently corroborated by the breadth of his own bibliography rather than reputation alone.
      curiosity: [82, 0.68, "d", "A"],
      // Principia Mathematica (with Whitehead, 1910-1913) is documented by mathematicians and logicians as a foundational, rigorously systematic attempt to derive mathematics from logical axioms, independently corroborated by its continued citation in the field, not self-claimed.
      analytical_rigor: [88, 0.78, "d", "A"],
      // Documented as publicly opposing both World War I (resulting in his 1918 imprisonment) and later Cold War nuclear armament (founding the Campaign for Nuclear Disarmament in 1958) against the prevailing establishment position of his own country in both cases, decades apart.
      independent_thinking: [80, 0.68, "d", "A"],
      // Documented, sustained productive writing output across seven decades including during his imprisonment (he wrote Introduction to Mathematical Philosophy while jailed in 1918), corroborated by the dated bibliography of published work spanning this period without major gaps.
      discipline: [72, 0.55, "s", "A"],
      // Continued anti-nuclear activism into his nineties, including a documented 1961 arrest and brief imprisonment at age 89 for civil disobedience, sustained decades after his initial WWI-era pacifist activism first cost him his Trinity College fellowship in 1916.
      persistence: [75, 0.6, "d", "A"],
      // Publicly opposed WWI knowing it would cost him his Cambridge fellowship (it did, in 1916) and later result in a six-month prison sentence (1918), both specific, documented, accepted professional and personal costs for a public position.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Documented as continuing philosophical and political work through sustained public unpopularity during both World War I and the early Cold War period without resolution in sight, inferred tolerance for that prolonged social and professional uncertainty.
      ambiguity_tolerance: [65, 0.48, "s", "A"],
      // Documented as changing philosophical positions substantially more than once across his career (logicism, then later skepticism about some of his own earlier logicist claims), suggesting a documented pattern of revision more than rapid final commitment, inferred rather than directly evidenced as decisiveness specifically.
      decisiveness: [58, 0.42, "i", "N"],
      // Documented, independently corroborated across multiple of his own wives' and partners' separate published accounts as dominating conversation and holding forth confidently in company, a consistent pattern attested from more than one relationship across different decades.
      social_assertiveness: [75, 0.6, "s", "D"],
      // Founded and led the Campaign for Nuclear Disarmament (1958) and later the more confrontational Committee of 100, documented as personally directing strategy for both organizations rather than serving as a figurehead.
      leadership_drive: [65, 0.48, "s", "A"],
      // His popular philosophical writing (A History of Western Philosophy, 1945) is documented as directly responsible for bringing philosophy to a mass general readership and for his 1950 Nobel Prize in Literature, an independently attributed persuasive/communicative achievement distinct from his technical work.
      persuasiveness: [78, 0.62, "d", "A"],
      // Sustained direct public conflict with the British government and public opinion across two separate historical periods (WWI pacifism, Cold War disarmament), each resulting in real documented consequences (dismissal, imprisonment) he accepted rather than moderated his position to avoid.
      conflict_tolerance: [82, 0.68, "d", "D"],
      // Documented, sustained specialist depth in mathematical logic maintained across a decade of collaborative work with Whitehead on Principia Mathematica, corroborated independently by the technical complexity of the finished work as reviewed by subsequent logicians.
      mastery_orientation: [78, 0.62, "d", "A"],
      // Documented as continuing to publish and campaign into his late nineties rather than retiring after his Nobel Prize and international reputation were secured, corroborated by the dated record of late-career activism and publication.
      achievement_drive: [68, 0.5, "s", "A"],
      // Documented as repeatedly taking public positions against his own institution's and country's prevailing view (Cambridge, the British state) at direct professional cost, a sustained pattern of independent judgment over institutional belonging.
      autonomy_need: [70, 0.52, "s", "A"],
      // His sustained, decades-long anti-war and anti-nuclear activism, undertaken at real personal cost across two different historical periods, reflects a documented motivation toward broad social consequence beyond his own academic career or comfort.
      impact_motivation: [72, 0.55, "s", "A"],
      // Sustained substantive, non-dabbling output across mathematical logic, epistemology, political activism, and popular science writing across his career, each with real documented achievement (Principia Mathematica, the Nobel Prize in Literature, CND's founding) rather than superficial involvement.
      cross_domain_range: [82, 0.68, "d", "A"],
      // Self-initiated the founding of the Campaign for Nuclear Disarmament and the earlier 1920s founding of an experimental school (Beacon Hill School, with Dora Russell) as his own projects rather than roles assigned to him.
      proactive_agency: [72, 0.55, "s", "A"],
      // Documented, corroborated from multiple of his own wives' independent accounts across different marriages as personally difficult in sustained close relationships, with three of his four marriages ending in documented estrangement or divorce — a repeated pattern across separate relationships, not one account.
      collaboration: [45, 0.48, "s", "R"],
      // Documented occasional sharp intellectual disputes with contemporaries (G. E. Moore, later Wittgenstein) but no sustained, well-corroborated personal rivalry pattern beyond ordinary academic disagreement — scored at the safe default.
      competitiveness: [60, 0.42, "i", "N"],
      // Documented as substantially revising his own earlier logicist confidence later in life (acknowledging Gödel's incompleteness results undermined the Principia Mathematica project's original ambition), a specific, corroborated instance of publicly revising a foundational earlier position.
      belief_updating: [68, 0.52, "s", "A"],
      // Documented as positioning his popular philosophical writing to reach a mass audience at a time few academic philosophers wrote for general readers, inferred as market/opportunity recognition from the documented commercial and critical success of A History of Western Philosophy.
      opportunity_sensing: [58, 0.42, "i", "A"],
    },
  },
  {
    id: "p_bette_davis",
    slug: "bette-davis",
    canonicalName: "Bette Davis",
    birthYear: 1908,
    deathYear: 1989,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["actor"],
    fieldIds: ["film"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["nonconformist", "sustained_excellence", "competitor"],
    archetypeIds: ["competitive_performer"],
    externalIdentity: { wikidataId: "Q71206" },
    portrait: {
      url: "/portraits/bette-davis-studio-1935.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 435,
      height: 521,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:BetteDavis1935.jpg",
      attribution: "Studio publicity photo, 1935 (public domain, published in the US 1931-1977 without copyright notice)",
      
    },
    sources: [{ id: "src_bd_own_memoir", kind: "archive", title: "Bette Davis, The Lonely Life (1962) — her own memoir, read critically alongside independent biography" }, { id: "src_bd_spada", kind: "biography", title: "James Spada, More Than a Woman: An Intimate Biography of Bette Davis (1993)" }, { id: "src_bd_crawford_side", kind: "archive", title: "Independent accounts from Joan Crawford's own side of their documented decades-long rivalry (Crawford's own interviews and biographers, e.g. Shaun Considine's Bette and Joan: The Divine Feud, 1989, which draws on both women's separate contemporaries and studio records)" }, { id: "src_bd_wikipedia", kind: "wikipedia", title: "Bette Davis", url: "https://en.wikipedia.org/wiki/Bette_Davis" }],
    rows: {
      // Documented, sustained work rate across a nearly 60-year film career (over 100 films), corroborated by studio production records of her output pace and by multiple directors' independent accounts of her exacting preparation for roles.
      discipline: [78, 0.6, "d", "A"],
      // Documented as suing Warner Bros. in 1936 UK courts to break a contract she considered exploitative — a case she lost, forcing her back under contract on worse financial terms — yet continued working and eventually won greater creative control through repeated subsequent negotiation, independently corroborated by court records of the case.
      persistence: [80, 0.65, "d", "A"],
      // Documented as suing her own studio (a nearly unprecedented act for a contracted star in 1936) despite the severe risk of career-ending blacklist, an outcome independently corroborated by contemporary press coverage of the trial and its industry shockwaves.
      risk_tolerance: [75, 0.58, "d", "R"],
      // Documented, independently corroborated across multiple directors' and co-stars' separate accounts as blunt, outspoken, and willing to publicly criticize scripts, directors, and studio executives throughout her career, a consistent pattern attested from more than one working relationship.
      social_assertiveness: [78, 0.62, "d", "D"],
      // Documented as becoming the first woman elected president of the Academy of Motion Picture Arts and Sciences in 1941 (though she resigned within two months over disagreements with the board), a specific, corroborated instance of seeking and briefly holding formal institutional authority.
      leadership_drive: [68, 0.5, "s", "A"],
      // Documented as successfully pressuring Warner Bros. into offering her more substantial, better-written roles following the publicity of her lawsuit, inferred persuasive leverage from the documented change in her subsequent casting.
      persuasiveness: [62, 0.45, "i", "A"],
      // Sustained a documented, mutually corroborated professional rivalry with Joan Crawford across more than three decades, attested from both sides — contemporaries' accounts, studio records, and Crawford's own separate interviews describing specific incidents (Crawford campaigning against Davis's 1962 Oscar nomination) — not one-sided reporting.
      conflict_tolerance: [85, 0.7, "d", "D"],
      // Documented as taking on physically and technically demanding roles requiring specific skill preparation (aging makeup and posture work for Baby Jane) later in her career, inferred deliberate craft development from this sustained pattern of choosing technically challenging parts.
      mastery_orientation: [65, 0.48, "s", "A"],
      // Documented as continuing to actively seek challenging, sometimes financially risky roles into her seventies (What Ever Happened to Baby Jane?, 1962, revived her career after years of decline), a sustained achievement orientation independently corroborated by the dated record of her late-career choices.
      achievement_drive: [75, 0.58, "s", "A"],
      // Documented as the only major contracted star of her era to sue her own studio over creative control, a specific, extreme, independently corroborated act of asserting independence against the entire studio-system structure.
      autonomy_need: [78, 0.62, "d", "A"],
      // Thin direct evidence of motivation toward broader social impact beyond her own career and craft; scored at the safe default.
      impact_motivation: [50, 0.38, "i", "N"],
      // Career substantively concentrated in film acting; scored at the safe default rather than extended without evidence.
      cross_domain_range: [45, 0.35, "i", "N"],
      // Self-initiated the 1936 lawsuit against Warner Bros. rather than accepting the contract terms, and later personally sought out and championed the Baby Jane project when no studio was proposing it to her, both documented as self-directed rather than assigned opportunities.
      proactive_agency: [78, 0.62, "d", "A"],
      // Documented, corroborated from Crawford's own independent side of the rivalry (not only Davis's account) as sustaining severe, decades-long personal conflict with a specific named colleague across multiple film and public occasions -- including During the filming of Whatever Happened to Baby Jane?, both women documented as behaving antagonistically on set, corroborated by crew accounts from that production independent of either star.
      collaboration: [42, 0.5, "s", "R"],
      // Sustained, mutually corroborated multi-decade rivalry with Joan Crawford documented from both sides across specific dated incidents (competing for the same roles, Crawford's 1963 Oscar campaign against Davis's nomination), an unusually well-attested personal competitive pattern.
      competitiveness: [85, 0.68, "d", "D"],
      // Documented as shifting from glamorous ingenue roles toward embracing unflattering, age-appropriate character work later in career (Baby Jane), inferred evolving professional judgment from the documented shift in role choices.
      belief_updating: [55, 0.4, "i", "N"],
      // Documented meticulous attention to costume and makeup choices for specific roles per multiple directors' accounts, though the broader evidentiary base is thinner, hence inference-level.
      detail_orientation: [62, 0.45, "i", "A"],
      // Documented, independently corroborated by industry accounts of the production, as personally recognizing Baby Jane's commercial potential as a comeback vehicle for aging female stars when studios considered such projects too risky, securing the project herself.
      opportunity_sensing: [68, 0.5, "s", "A"],
      // Documented as accepting a reduced salary against a percentage of profits to get Baby Jane made when studio financing was reluctant, a specific, corroborated deal structure, though the broader resourcefulness pattern is thinner, hence inference-level.
      resourcefulness: [62, 0.45, "i", "A"],
      // Thin direct evidence of aesthetic sensitivity beyond her performing craft itself; scored at the safe default.
      aesthetic_sensitivity: [55, 0.4, "i", "N"],
      // Documented as making the specific, dated decision to file the 1936 lawsuit against strong advice from her own representatives that it would end her career, a sustained, decisive commitment to a high-risk course of action independently corroborated by contemporary accounts of the advice she received and rejected.
      decisiveness: [70, 0.52, "s", "A"],
      // Documented as the only major contracted star of the studio era to publicly challenge the entire studio-contract system in court, a specific, independently corroborated act against the near-universal industry practice of her peers accepting such contracts without legal challenge.
      independent_thinking: [72, 0.52, "s", "A"],
    },
  },
  {
    id: "p_charles_dickens",
    slug: "charles-dickens",
    canonicalName: "Charles Dickens",
    birthYear: 1812,
    deathYear: 1870,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer", "editor"],
    fieldIds: ["literature", "social_reform"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["prolific", "overcame_adversity", "self_taught"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q5686" },
    portrait: {
      url: "/portraits/charles-dickens-loc-1867.jpg",
      source: "Library of Congress (Prints and Photographs Division)",
      license: "Public domain",
      width: 1303,
      height: 1536,
      licenseUrl: "https://www.loc.gov/item/2002736497/",
      attribution: "Library of Congress, photographic print, 1867",
      
    },
    sources: [{ id: "src_cd_letters", kind: "archive", title: "The Pilgrim Edition of the Letters of Charles Dickens (12 volumes, Oxford, 1965-2002) — his own extensive correspondence" }, { id: "src_cd_tomalin", kind: "biography", title: "Claire Tomalin, Charles Dickens: A Life (2011)" }, { id: "src_cd_wife_and_staff", kind: "archive", title: "Catherine Dickens's own family's later accounts of the 1858 separation, and independent accounts from Urania Cottage staff and the home's own case records (a philanthropic institution Dickens personally ran with Angela Burdett-Coutts) — sources independent of Dickens's own self-presentation" }, { id: "src_cd_wikipedia", kind: "wikipedia", title: "Charles Dickens", url: "https://en.wikipedia.org/wiki/Charles_Dickens" }],
    rows: {
      // Documented, sustained personal investigation of London's social institutions (workhouses, prisons, slums) as direct research for his fiction and journalism, corroborated by his own letters describing specific site visits and by Tomalin's independent account of these research trips.
      curiosity: [68, 0.5, "s", "A"],
      // Documented by literary historians as pioneering the serialized novel format's narrative techniques (cliffhanger chapter endings tuned to monthly publication) as a deliberate craft response to the format, independently corroborated by the format's subsequent wide adoption by other novelists.
      creative_originality: [82, 0.68, "d", "A"],
      // Documented, sustained output of a fixed daily word count and walking regimen (up to 20 miles) maintained across decades while simultaneously editing magazines and touring as a public reader, corroborated by his own letters and by staff/publisher records of his schedule.
      discipline: [82, 0.68, "d", "A"],
      // Documented as working in a blacking factory as a child after his father's imprisonment for debt, an experience he rarely discussed but which biographers (via his own fragmentary autobiographical notes given to Forster) trace directly to his later relentless work ethic and fear of poverty.
      persistence: [72, 0.55, "s", "A"],
      // Documented shift from serialized comic sketches (Pickwick Papers) to darker, more structurally complex social novels (Bleak House, Great Expectations) over his career, inferred as a deliberate adaptation from the documented change in style and subject.
      adaptability: [62, 0.45, "i", "N"],
      // Documented as touring extensively as a public reader in his final years against his doctor's explicit warnings about his declining health, a specific but singularly-documented risk rather than a sustained pattern, hence inference-level.
      risk_tolerance: [62, 0.45, "i", "N"],
      // Documented, independently corroborated by contemporary press accounts and by surviving box-office records as commanding sold-out public reading tours across Britain and the US through sheer personal performance skill, distinct from his written work.
      social_assertiveness: [80, 0.65, "d", "A"],
      // Personally edited and directed multiple successive literary magazines (Household Words, All the Year Round) for over 20 years, documented as retaining final editorial authority over content and contributors throughout.
      leadership_drive: [68, 0.5, "s", "A"],
      // Documented as directly influencing specific public debate and legislation-adjacent sentiment on child labor and workhouse conditions through Oliver Twist and later works, corroborated by contemporary reviewers' and social reformers' own citations of his fiction's effect on public opinion.
      persuasiveness: [75, 0.58, "s", "A"],
      // Documented as maintaining several public feuds with critics and rival authors via published letters, but the pattern is more episodic than sustained, hence inference-level rather than a stronger score.
      conflict_tolerance: [55, 0.42, "i", "D"],
      // Documented, sustained self-taught progression from unpaid legal-clerk shorthand study to parliamentary reporter to novelist, corroborated by his own account and by Tomalin's independent review of his early career trajectory.
      mastery_orientation: [65, 0.48, "s", "A"],
      // Documented, explicit lifelong drive traced by biographers directly to his childhood poverty and his father's imprisonment for debt, sustained across an unusually prolific 35-year career producing 15 major novels alongside continuous journalism.
      achievement_drive: [72, 0.55, "s", "A"],
      // Documented as retaining personal ownership and editorial control of his magazines rather than working purely as a contracted author for publishers, inferred autonomy preference from this sustained business arrangement.
      autonomy_need: [62, 0.45, "i", "N"],
      // Personally co-founded and ran Urania Cottage, a home for homeless and formerly incarcerated women, for over a decade with Angela Burdett-Coutts, documented via the home's own surviving case records as directly involved in individual admissions decisions, not a passive patron.
      impact_motivation: [75, 0.6, "s", "A"],
      // Documented, sustained personal involvement in the illustration and visual presentation of his serialized novels, corroborated by his surviving correspondence with illustrators (Phiz, Cruikshank) directing specific visual details.
      aesthetic_sensitivity: [68, 0.5, "s", "A"],
      // Sustained substantive activity across novel-writing, magazine editing, public performance, and philanthropic institution-running (Urania Cottage) — genuine range with real documented output in each, though concentrated within literary/social domains.
      cross_domain_range: [65, 0.48, "s", "A"],
      // Self-initiated Urania Cottage's founding by directly approaching Burdett-Coutts with the proposal, and self-initiated the public reading tours as his own career venture beyond writing, both documented as his own instigation rather than others' proposals to him.
      proactive_agency: [70, 0.52, "s", "A"],
      // Documented, corroborated from sources independent of Dickens's own self-presentation (his wife Catherine's family's later accounts, contemporaries' letters) as conducting a public, damaging separation from his wife of 22 years in 1858 and publishing a self-justifying public statement about it — a specific, well-documented instance of severe interpersonal breakdown handled in a way independent observers criticized at the time.
      collaboration: [40, 0.5, "s", "R"],
      // Documented awareness of and occasional public sparring with rival serialized novelists (Thackeray) for readership, though the evidentiary base for a sustained rivalry pattern is thinner than for other rows, hence inference-level.
      competitiveness: [62, 0.45, "i", "N"],
      // Documented as personally verifying specific factual details (legal procedure, workhouse regulations) for his fiction via site visits and correspondence with officials, though the broader evidentiary base for a general detail-oriented disposition is thinner, hence inference-level.
      detail_orientation: [62, 0.45, "i", "A"],
      // Documented as recognizing the commercial potential of monthly serialization early in his career (Pickwick Papers) when the format was still a marginal publishing experiment, inferred from the documented timing and outcome.
      opportunity_sensing: [62, 0.45, "i", "A"],
      // Documented as growing more pessimistic and structurally complex in his social critique over his career (from Pickwick Papers's comic tone to Bleak House's systemic indictment of institutions), inferred as evolving conviction from the documented stylistic and thematic shift.
      belief_updating: [58, 0.4, "i", "N"],
    },
  },
  {
    id: "p_duke_ellington",
    slug: "duke-ellington",
    canonicalName: "Duke Ellington",
    birthYear: 1899,
    deathYear: 1974,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["composer", "entertainer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["prolific", "sustained_excellence", "generalist"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q4030" },
    portrait: {
      url: "/portraits/duke-ellington-publicity.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1049,
      height: 1279,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Duke_Ellington_-_publicity.JPG",
      attribution: "Unknown photographer, publicity photo (public domain, published in the US 1931-1977 without copyright notice)",
      
    },
    sources: [{ id: "src_de_own_book", kind: "archive", title: "Duke Ellington, Music Is My Mistress (1973) — his own memoir, read critically alongside independent accounts" }, { id: "src_de_hasse", kind: "biography", title: "John Edward Hasse, Beyond Category: The Life and Genius of Duke Ellington (1993)" }, { id: "src_de_strayhorn_bandmembers", kind: "biography", title: "David Hajdu, Lush Life: A Biography of Billy Strayhorn (1996) — independent account of the Ellington-Strayhorn collaboration from Strayhorn's side; corroborated further by memoirs of band members (Barney Bigard, Rex Stewart, Mercer Ellington)" }, { id: "src_de_wikipedia", kind: "wikipedia", title: "Duke Ellington", url: "https://en.wikipedia.org/wiki/Duke_Ellington" }],
    rows: {
      // Documented sustained interest beyond jazz idiom into extended concert-length works, sacred music (the Sacred Concerts, 1965-1973), and film scoring — genuine range attested by the catalogued body of work across these distinct forms.
      curiosity: [65, 0.48, "s", "A"],
      // Documented by multiple independent jazz historians as the first composer to treat the big band itself as a compositional palette, writing specific parts for named musicians' individual tonal qualities rather than generic sections — corroborated by Hasse's independent biography and by the surviving scores themselves.
      creative_originality: [88, 0.78, "d", "A"],
      // Documented, sustained composing practice on tour buses, trains, and hotel rooms across roughly 50 years of near-continuous touring, corroborated independently by multiple band members' memoirs (Bigard, Stewart) describing him composing under exactly these conditions, not merely his own claim.
      discipline: [82, 0.72, "d", "A"],
      // Sustained one continuously operating big band for approximately 50 years through the big-band era's commercial decline in the 1950s when nearly every peer's orchestra disbanded, documented independently by music historians as a unique survival in the genre.
      persistence: [78, 0.68, "d", "A"],
      // Documented as successfully repositioning the band multiple times across changing eras — swing to bebop-adjacent experimentation to the 1956 Newport Jazz Festival comeback performance that revived his commercial standing — each a specific, dated career inflection independently corroborated by contemporary press coverage.
      adaptability: [72, 0.58, "s", "A"],
      // Continued paying and maintaining a full big band through the 1950s decline in commercial demand for the format at ongoing financial cost, an inferred risk from the sustained financial commitment rather than a directly documented single decision.
      risk_tolerance: [60, 0.45, "i", "N"],
      // Documented as maintaining the band through the uncertain years of the format's commercial decline without a clear indication recovery was coming, per multiple band members' accounts of continuing to tour on uncertain bookings through the leanest years.
      ambiguity_tolerance: [68, 0.52, "s", "A"],
      // Documented by multiple band members as an indirect, non-confrontational leader who rarely gave direct orders, preferring to let musical decisions emerge in rehearsal — a specific, corroborated leadership style, though this reflects a documented preference rather than a measure of decisiveness under pressure specifically, hence inference-level.
      decisiveness: [55, 0.4, "i", "N"],
      // Documented, consistently corroborated across decades of press coverage and band members' accounts as a polished, charming public persona ("the Duke") deployed deliberately in front of audiences and the press, distinct from his more private working style with the band.
      social_assertiveness: [72, 0.58, "s", "A"],
      // Personally led and financially carried the same organization for approximately 50 years, documented as making the final call on personnel and material even while delegating arranging work extensively to Strayhorn — a sustained, corroborated pattern of ultimate authority.
      leadership_drive: [72, 0.58, "s", "A"],
      // Documented as retaining several of his most important musicians (Johnny Hodges, Harry Carney) for multiple decades despite better-paying offers elsewhere, per band members' own accounts of why they stayed — inferred persuasive/relational skill from the retention pattern.
      persuasiveness: [65, 0.48, "s", "A"],
      // Documented, consistently corroborated across multiple band members' independent memoirs as actively avoiding direct personal confrontation with musicians, even in cases of serious ongoing friction, preferring indirect resolution — a specific, repeated pattern attested from more than one source.
      conflict_tolerance: [45, 0.42, "s", "D"],
      // Documented, sustained self-directed harmonic and orchestrational experimentation across a 50-year composing career, corroborated by musicologists' analysis of the catalog's increasing structural complexity over time, not a fixed early style repeated.
      mastery_orientation: [75, 0.6, "s", "A"],
      // Documented as continuing to compose ambitious extended works (the Far East Suite, the Sacred Concerts) into his sixties and seventies rather than relying on earlier hits, corroborated by the dated catalog of late-career output.
      achievement_drive: [68, 0.5, "s", "A"],
      // Maintained his own independent band rather than working as a sideman or under another leader for his entire career after early success, though direct evidence of an explicit autonomy motivation (versus simply successful early independence) is thinner, hence inference-level.
      autonomy_need: [62, 0.45, "i", "N"],
      // The Sacred Concerts (1965-1973) are documented as an explicit later-career attempt to bring jazz into a devotional, socially significant context beyond entertainment, per his own stated intent in interviews of the period.
      impact_motivation: [60, 0.45, "i", "A"],
      // Documented, extensively analyzed formal control over orchestral color and harmony specific to named musicians' individual timbres, attested by decades of independent musicological study of his scores as a deliberate compositional method, not incidental arranging.
      aesthetic_sensitivity: [85, 0.7, "d", "A"],
      // Career substantively concentrated in music across genuinely distinct forms (dance-band jazz, sacred concert works, film scoring), but not extending to fully unrelated fields — scored near center rather than inflated.
      cross_domain_range: [58, 0.42, "i", "N"],
      // Self-initiated the Sacred Concerts and the extended-suite format (Black, Brown and Beige, 1943) as his own artistic projects outside commercial expectation, documented as personally driven rather than commissioned.
      proactive_agency: [70, 0.52, "s", "A"],
      // Sustained a creative partnership with Billy Strayhorn for nearly 30 years, independently documented from Strayhorn's own side (Hajdu's biography, drawing on Strayhorn's letters and colleagues' accounts) as a genuine, mutually valued collaboration, not merely an employer-employee arrangement.
      collaboration: [78, 0.65, "d", "A"],
      // Documented as recognizing the 1956 Newport Jazz Festival performance's importance in the moment (extending Paul Gonsalves's solo far beyond the planned length as the crowd response built) and using it to relaunch his commercial standing — inferred as opportunity recognition from the documented outcome.
      opportunity_sensing: [62, 0.45, "i", "A"],
      // Documented as sustaining the band's payroll through lean years using his own composing/publishing royalties and touring income creatively reallocated, inferred from the financial pattern rather than one documented resourceful act.
      resourcefulness: [60, 0.42, "i", "A"],
    },
  },
  {
    id: "p_elizabeth_cady_stanton",
    slug: "elizabeth-cady-stanton",
    canonicalName: "Elizabeth Cady Stanton",
    birthYear: 1815,
    deathYear: 1902,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_activist", "writer"],
    fieldIds: ["civil_rights", "social_reform"],
    impactDomains: ["social", "historical"],
    tagIds: ["founder", "nonconformist", "grassroots_organizer"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q465335" },
    portrait: {
      url: "/portraits/elizabeth-cady-stanton-loc.jpg",
      source: "Library of Congress (Prints and Photographs Division)",
      license: "Public domain",
      width: 1110,
      height: 1536,
      licenseUrl: "https://www.loc.gov/item/2004670381/",
      attribution: "Library of Congress, photographic print",
      
    },
    sources: [{ id: "src_ecs_letters", kind: "archive", title: "Elizabeth Cady Stanton, Susan B. Anthony: Correspondence, Writings, Speeches (ed. Ellen Carol DuBois) — her own extensive surviving correspondence, mostly with Susan B. Anthony over 50 years" }, { id: "src_ecs_griffith", kind: "biography", title: "Elisabeth Griffith, In Her Own Right: The Life of Elizabeth Cady Stanton (1984)" }, { id: "src_ecs_anthony_side", kind: "archive", title: "Susan B. Anthony's own separate correspondence and diaries documenting the 50-year working partnership from her own side, independent of Stanton's self-presentation" }, { id: "src_ecs_wikipedia", kind: "wikipedia", title: "Elizabeth Cady Stanton", url: "https://en.wikipedia.org/wiki/Elizabeth_Cady_Stanton" }],
    rows: {
      // Documented as pursuing self-directed legal and theological study specifically to research the specific statutes she later campaigned against (married women's property law, biblical justifications for female subordination), inferred sustained intellectual engagement from this documented research pattern.
      curiosity: [62, 0.45, "i", "A"],
      // The Declaration of Sentiments (1848), which she personally drafted, is documented as a structurally precise point-by-point legal and rhetorical argument modeled deliberately on the Declaration of Independence, independently analyzed by historians as a rigorously constructed document, not an emotional appeal.
      analytical_rigor: [68, 0.5, "s", "A"],
      // Documented as insisting on including a demand for women's suffrage in the 1848 Declaration of Sentiments against the explicit objection of several of her own co-organizers (including Lucretia Mott), who considered it too radical for the moment — a specific, dated instance of holding a minority position within her own movement.
      independent_thinking: [78, 0.6, "d", "A"],
      // Documented, sustained co-authorship of the multi-volume History of Woman Suffrage across two decades while raising seven children, corroborated by the dated publication record and by her own correspondence describing writing sessions fit around domestic responsibilities.
      discipline: [65, 0.48, "s", "A"],
      // Documented as continuing suffrage and women's rights advocacy for over 50 years from the 1848 Seneca Falls Convention until her death in 1902, never seeing the goal achieved in her lifetime (the 19th Amendment passed in 1920), sustained across a documented multi-decade campaign with no resolution during her life.
      persistence: [75, 0.58, "s", "A"],
      // Documented as shifting emphasis over her career from a broad range of women's legal rights toward increasing focus on suffrage specifically as the movement matured, inferred as strategic adaptation from the documented shift in her public writing's emphasis over time.
      adaptability: [58, 0.42, "i", "N"],
      // Documented as publishing The Woman's Bible (1895), a direct critique of religious justifications for women's subordination, despite this being condemned even by many within her own suffrage movement (the National American Woman Suffrage Association formally censured it) — a specific, dated instance of accepting internal movement backlash for a position she judged correct.
      risk_tolerance: [68, 0.5, "s", "R"],
      // Sustained decades of activism toward a goal with no clear timeline or guarantee of success within her lifetime, inferred tolerance for that prolonged uncertainty from the documented decades-long commitment.
      ambiguity_tolerance: [60, 0.42, "i", "A"],
      // The decision to include the suffrage demand in the 1848 Declaration despite co-organizer objection is a specific, documented instance of firm commitment, though the broader pattern is thinner, hence inference-level.
      decisiveness: [62, 0.45, "i", "N"],
      // Documented as a prominent public speaker and convention organizer across five decades, corroborated independently by contemporary press coverage of her speeches and by Anthony's own correspondence describing her as the movement's most effective public voice in its early decades.
      social_assertiveness: [72, 0.55, "s", "A"],
      // Co-founded and served as president of the National Woman Suffrage Association for over 20 years, documented as retaining significant influence over movement strategy and public messaging throughout, corroborated by organizational records of the period.
      leadership_drive: [72, 0.55, "s", "A"],
      // The Declaration of Sentiments is documented by historians as directly effective in framing the emerging women's rights movement's core arguments for decades afterward, an attributable rhetorical achievement independent of the movement's eventual, later success.
      persuasiveness: [70, 0.52, "s", "A"],
      // Documented as sustaining public disagreement with her own movement's leadership over The Woman's Bible and over strategic priorities (opposing the 15th Amendment's passage without simultaneous women's suffrage, a position that split the movement and estranged some former allies) — evidenced across more than one internal conflict, not one dispute.
      conflict_tolerance: [70, 0.52, "s", "D"],
      // Documented self-directed study of law and theology specifically to build arguments against specific statutes and religious doctrines, inferred sustained skill-building from this documented, purposeful research pattern.
      mastery_orientation: [62, 0.45, "i", "A"],
      // Documented sustained pursuit of movement goals across decades, though direct evidence of personal status-seeking as distinct from commitment to the cause is thinner, hence inference-level.
      achievement_drive: [62, 0.45, "i", "N"],
      // Documented as publishing The Woman's Bible and pursuing the suffrage demand against her own movement's collective preference on more than one occasion, a sustained pattern of independent judgment over deference to consensus.
      autonomy_need: [70, 0.52, "s", "A"],
      // The Declaration of Sentiments itself is a directly self-authored, explicit statement of intended durable legal and social change, and she is documented as continuing this same explicit mission across the entire remainder of her public life.
      impact_motivation: [78, 0.6, "d", "A"],
      // Career substantively concentrated in activism, organizing, and writing within the women's rights movement, not extending to fully unrelated fields — scored near center.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Personally organized the 1848 Seneca Falls Convention with Lucretia Mott and drafted the Declaration of Sentiments herself, documented as self-initiated organizing rather than joining an existing movement structure, since none yet existed for this specific cause.
      proactive_agency: [75, 0.58, "s", "A"],
      // Sustained a documented, mutually corroborated 50-year working partnership with Susan B. Anthony, attested from both sides — Stanton's own letters and Anthony's own separate correspondence and diaries — describing a genuine, durable collaborative division of labor (Stanton as writer/theorist, Anthony as organizer), not a one-sided account.
      collaboration: [78, 0.62, "d", "A"],
      // Documented as growing more religiously skeptical and more singularly focused on suffrage over her career, inferred belief evolution from the documented change in her public writing's emphasis and content over five decades.
      belief_updating: [55, 0.4, "i", "N"],
      // The Declaration of Sentiments' point-by-point legal structure documents careful, specific argument construction, though the broader evidentiary base for a general detail-oriented disposition is thinner, hence inference-level.
      detail_orientation: [60, 0.42, "i", "A"],
      // Documented as timing the Seneca Falls Convention to follow directly from her own frustration at being excluded from full participation at the 1840 World Anti-Slavery Convention in London, inferred as recognizing and acting on a specific grievance-driven opportunity.
      opportunity_sensing: [58, 0.4, "i", "A"],
    },
  },
  {
    id: "p_george_orwell",
    slug: "george-orwell",
    canonicalName: "George Orwell",
    aliases: ["Eric Arthur Blair"],
    birthYear: 1903,
    deathYear: 1950,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["overcame_adversity", "self_taught", "nonconformist"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q3335" },
    portrait: {
      url: "/portraits/george-orwell-bnuj-1943.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1176,
      height: 1594,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:George_Orwell_press_photo.jpg",
      attribution: "Branch of the National Union of Journalists (BNUJ) press card photograph, 1943",
      
    },
    sources: [{ id: "src_go_orwell_diaries", kind: "archive", title: "George Orwell's own diaries (Complete Works of George Orwell, ed. Peter Davison, 20 volumes) — including the Spanish Civil War and wartime diaries" }, { id: "src_go_taylor", kind: "biography", title: "D. J. Taylor, Orwell: The Life (2003)" }, { id: "src_go_ilp_comrades", kind: "archive", title: "Independent accounts from fellow militia members in the Independent Labour Party contingent Orwell served with in Spain (documented in Homage to Catalonia's own text and corroborated by other militia veterans' separate later accounts collected by historians of the Spanish Civil War)" }, { id: "src_go_wikipedia", kind: "wikipedia", title: "George Orwell", url: "https://en.wikipedia.org/wiki/George_Orwell" }],
    rows: {
      // Documented, sustained direct investigative engagement across three separate immersions — coal mining communities (The Road to Wigan Pier), Parisian kitchen labor and London vagrancy (Down and Out in Paris and London), and Spanish Civil War militia service — each involving extended, firsthand participation rather than secondhand research, corroborated across multiple independent published accounts of each period.
      curiosity: [65, 0.52, "s", "A"],
      // Documented, sustained systematic argument-building in his political essays ("Politics and the English Language," his Spanish Civil War analysis) independently cited by later scholars as methodically precise in tracing specific causal claims, not impressionistic commentary.
      analytical_rigor: [72, 0.55, "s", "A"],
      // Documented as writing Nineteen Eighty-Four to completion while severely ill with tuberculosis on the remote island of Jura, corroborated by his own letters describing the sustained daily writing schedule maintained despite his declining health in his final years.
      discipline: [70, 0.52, "s", "A"],
      // Documented as continuing to write and publish through years of commercial failure (his early novels sold poorly) and severe, chronic respiratory illness that worsened across his adult life, sustained until his final completed major work.
      persistence: [68, 0.5, "s", "A"],
      // Documented career shift from imperial police officer in Burma to deliberately impoverished writer in Paris and London (chronicled in Down and Out in Paris and London) to war correspondent/militiaman, inferred as adaptability from the documented sequence of genuinely different roles.
      adaptability: [62, 0.45, "i", "N"],
      // Volunteered to fight with the POUM militia in the Spanish Civil War and was shot through the throat at the front (documented in Homage to Catalonia and corroborated by fellow militia members' independent accounts), then had to flee Spain when the POUM was suppressed by Communist-aligned forces — a specific, severe, well-corroborated risk.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Documented as continuing frontline militia service for months under the genuinely uncertain and shifting political conditions of the Spanish Civil War's internal factional conflicts, inferred tolerance for that specific sustained uncertainty.
      ambiguity_tolerance: [60, 0.42, "i", "N"],
      // Documented as making the specific decision to volunteer for a lesser-known militia faction (POUM) rather than the more prominent International Brigades, per his own account of choosing it somewhat by circumstance of his contacts rather than extensive prior deliberation — a real but singularly-documented decision, hence inference-level.
      decisiveness: [62, 0.45, "i", "N"],
      // Documented as publicly breaking from the pro-Soviet consensus common among British leftist intellectuals of his era after witnessing Communist-aligned suppression of the POUM firsthand in Spain, a specific, well-documented ideological break made against his own political milieu's prevailing view.
      independent_thinking: [82, 0.68, "d", "A"],
      // Documented, independently corroborated by literary historians' account of the book's reception, as publishing Homage to Catalonia's account of Communist suppression of the POUM despite this alienating much of the pro-Soviet British left he had previously been associated with, sustained across the book's poor initial sales and continued public criticism from former allies for years afterward.
      conflict_tolerance: [65, 0.52, "s", "D"],
      // Documented as deliberately living among tramps and the urban poor in London, and separately taking manual kitchen work in Paris, both specifically to write about those conditions with direct authority rather than secondhand study — two separate, independently documented immersive research episodes, not one.
      mastery_orientation: [65, 0.52, "s", "A"],
      // Documented as continuing to write ambitious political fiction despite years of modest commercial success before Animal Farm's breakthrough, though direct evidence of an explicit status-seeking ambition (versus persistence in his chosen subject matter) is thinner, hence inference-level.
      achievement_drive: [62, 0.45, "i", "N"],
      // Resigned his secure position in the Indian Imperial Police in Burma specifically to become a writer with no guaranteed income, and later chose the less institutionally-backed POUM militia over the more prominent Soviet-aligned International Brigades — both documented, sustained choices for independence over institutional backing.
      autonomy_need: [68, 0.5, "s", "A"],
      // His own essay "Why I Write" explicitly states that everything he wrote after 1936 was written, directly or indirectly, against totalitarianism and for democratic socialism — a specific, self-authored statement of purpose corroborated by the consistent thematic direction of his subsequent published work.
      impact_motivation: [78, 0.62, "d", "A"],
      // Sustained substantive activity across colonial police service, immersive social journalism, militia combat, and political fiction — genuine range, though concentrated around the shared theme of firsthand social observation, scored moderately rather than inflated.
      cross_domain_range: [60, 0.42, "i", "N"],
      // Self-initiated his resignation from the Imperial Police, his deliberate period of poverty in Paris and London, and his volunteering for Spain — each a documented, self-directed choice to seek out a specific experience rather than have it assigned to him.
      proactive_agency: [75, 0.58, "s", "A"],
      // Thin direct evidence of deliberate opportunity-timing; scored at the safe default rather than inferred from his literary success generally, which is a separate question from personal opportunism.
      opportunity_sensing: [55, 0.4, "i", "A"],
      // Documented as supporting himself through a patchwork of teaching, bookshop clerking, and freelance journalism during his lean early writing years before commercial success, inferred resourcefulness from the sustained pattern of finding income while continuing to write.
      resourcefulness: [60, 0.42, "i", "A"],
      // Documented, precise firsthand reporting of specific conditions (exact wages, physical conditions in mines and slums) in The Road to Wigan Pier, independently corroborated by labor historians as substantially accurate for the period rather than impressionistic.
      detail_orientation: [68, 0.5, "s", "A"],
      // Documented, deliberate attention to plain, precise prose style articulated explicitly in his own essay "Politics and the English Language," a specific stated craft principle, though evidence for broader aesthetic sensitivity beyond prose style is thinner, hence inference-level.
      aesthetic_sensitivity: [62, 0.45, "i", "A"],
      // Documented as forming genuine, sustained bonds with fellow militia members in Spain, corroborated both by his own account in Homage to Catalonia and independently by other veterans' separately recorded recollections of the same unit — two distinct source lines agreeing on the same pattern.
      collaboration: [62, 0.5, "s", "A"],
      // Documented, specific, sustained revision of his political alignment after direct firsthand experience of Communist-aligned suppression of the POUM in Spain, corroborated by the clear before/after documented in his own writing (his earlier and later essays on the Spanish Civil War and Soviet communism).
      belief_updating: [72, 0.55, "s", "A"],
    },
  },
  {
    id: "p_john_d_rockefeller",
    slug: "john-d-rockefeller",
    canonicalName: "John D. Rockefeller",
    birthYear: 1839,
    deathYear: 1937,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur", "executive"],
    fieldIds: ["business"],
    impactDomains: ["industrial", "entrepreneurial", "wealth_creation"],
    tagIds: ["founder", "strategist", "systematic_thinker"],
    archetypeIds: ["entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q160278" },
    portrait: {
      url: "/portraits/john-d-rockefeller-edmondson-1911.jpg",
      source: "Digital Public Library of America",
      license: "Public domain",
      width: 1279,
      height: 1600,
      licenseUrl: "https://dp.la/",
      attribution: "George Mountain Edmondson (1866-1948), 1911",
      
    },
    sources: [{ id: "src_jdr_chernow", kind: "biography", title: "Ron Chernow, Titan: The Life of John D. Rockefeller, Sr. (1998) — an independent, extensively archive-sourced biography" }, { id: "src_jdr_own_reminiscences", kind: "archive", title: "John D. Rockefeller, Random Reminiscences of Men and Events (1909) — his own account, read critically alongside independent biography" }, { id: "src_jdr_business_rivals", kind: "archive", title: "Ida Tarbell, The History of the Standard Oil Company (1904) — a contemporary investigative journalist's independent, adversarial account based on court records and competitors' testimony, corroborating specific business practices from outside Rockefeller's own circle" }, { id: "src_jdr_wikipedia", kind: "wikipedia", title: "John D. Rockefeller", url: "https://en.wikipedia.org/wiki/John_D._Rockefeller" }],
    rows: {
      // Documented, sustained personal practice of reviewing detailed cost-accounting ledgers down to fractions of a cent per barrel across Standard Oil's operations, independently corroborated by Chernow's review of surviving company records, not merely his own claimed frugality.
      analytical_rigor: [82, 0.68, "d", "A"],
      // Documented, sustained daily practice of detailed personal bookkeeping beginning at age 16 and continuing throughout his life (his own ledger books survive and are held in archives), corroborated independently by Chernow's direct examination of these records.
      discipline: [78, 0.65, "d", "A"],
      // Documented as rebuilding Standard Oil's public standing and his own health across a decade-long retirement following a severe stress-induced illness (alopecia and digestive collapse in his fifties, independently documented by Chernow), redirecting sustained energy into systematic philanthropy for the following 40 years.
      persistence: [78, 0.62, "d", "A"],
      // Documented as borrowing heavily and reinvesting nearly all profits into refinery expansion during the volatile early oil industry's frequent price crashes, a specific pattern of sustained capital risk independently corroborated by business historians' review of Standard Oil's early financial records.
      risk_tolerance: [68, 0.5, "s", "R"],
      // Documented as sustaining major capital commitments through the genuinely volatile and unregulated early oil industry's boom-bust cycles across two decades, inferred tolerance for that sustained market uncertainty from the documented investment pattern.
      ambiguity_tolerance: [62, 0.45, "i", "A"],
      // Documented as executing the 1872 "Cleveland Massacre" (rapidly acquiring 22 of 26 Cleveland-area competitor refineries within about six weeks), a specific, dated, rapidly executed consolidation independently corroborated by contemporary business records and by Tarbell's adversarial account of the same events.
      decisiveness: [68, 0.5, "s", "A"],
      // Documented and independently corroborated across multiple business associates' accounts (collected by Chernow) as personally soft-spoken and unassuming in direct manner, notably at odds with his public reputation for ruthlessness — a specific, repeated observation from people who negotiated with him directly.
      social_assertiveness: [45, 0.42, "s", "N"],
      // Documented as retaining controlling operational authority over Standard Oil for nearly 30 years as it grew into the dominant force in the American oil industry, independently corroborated by corporate records and by Tarbell's adversarial account of his direct involvement in strategic decisions.
      leadership_drive: [75, 0.6, "d", "A"],
      // Documented as personally negotiating the majority of Standard Oil's competitor buyouts directly and privately rather than through intermediaries, corroborated by multiple acquired competitors' own later accounts (some hostile, some grateful) of these one-on-one negotiations.
      persuasiveness: [68, 0.5, "s", "A"],
      // Documented as sustaining decades of public vilification, congressional investigation, and eventually a 1911 Supreme Court-ordered breakup of Standard Oil under antitrust law, continuing operations and public philanthropy throughout rather than withdrawing from public life.
      conflict_tolerance: [72, 0.55, "s", "D"],
      // Documented as personally studying and mastering oil refining's technical and logistical detail (transportation costs, byproduct utilization) well beyond what a purely financial executive would need, corroborated by Chernow's review of his direct technical correspondence with refinery managers.
      mastery_orientation: [68, 0.5, "s", "A"],
      // Documented, explicit lifelong ambition recorded in his own early diary entries ("I was afraid I would not be a rich man") sustained across a nearly 70-year business and philanthropic career, corroborated independently by the scale and duration of Standard Oil's expansion under his direction.
      achievement_drive: [78, 0.62, "d", "A"],
      // Documented as consistently maneuvering to secure controlling ownership stakes rather than accept a minority position in ventures he led, a sustained pattern independently corroborated by corporate ownership records across Standard Oil's formation and growth.
      autonomy_need: [68, 0.5, "s", "A"],
      // Documented as personally directing systematic, professionally-staffed philanthropy (founding the Rockefeller Foundation and the General Education Board) for over 40 years after retirement, explicitly modeled on the same rigorous cost-efficiency principles he applied to business — a documented, sustained later-life reorientation.
      impact_motivation: [70, 0.52, "s", "D"],
      // Career substantively concentrated in oil-industry business and, later, philanthropic administration — real but modest range, scored at the safe default.
      cross_domain_range: [50, 0.38, "i", "N"],
      // Self-initiated his first refinery investment at 24 with borrowed capital and no family wealth behind him, and later personally initiated the systematic philanthropic institutions rather than simply donating to existing charities — both documented as self-directed undertakings.
      proactive_agency: [72, 0.55, "s", "A"],
      // Documented as recognizing oil refining's consolidation potential earlier than most competitors, using the 1872 South Improvement Company railroad-rebate scheme to gain a decisive cost advantage before rivals organized a response, independently corroborated by business historians' analysis of the episode's timing.
      opportunity_sensing: [72, 0.55, "s", "A"],
      // Documented as developing byproduct-utilization methods (finding commercial uses for refining waste products) to reduce costs below competitors' reach, independently corroborated by industry historians as a specific, attested cost-engineering innovation.
      resourcefulness: [70, 0.52, "s", "A"],
      // Documented as substantially shifting from an intensely private, business-focused public posture toward large-scale, publicly visible systematic philanthropy following the public relations crisis of the Ludlow Massacre and Tarbell's exposé, a specific, dated reorientation in response to public criticism.
      belief_updating: [65, 0.48, "s", "A"],
      // Documented, sustained pattern of systematically outcompeting and acquiring rival refiners across decades, independently corroborated by Tarbell's adversarial contemporary account naming specific competitors driven out or bought out through calculated pressure tactics.
      competitiveness: [75, 0.58, "s", "D"],
      // Documented, extensively corroborated personal attention to fractional-cent cost accounting across Standard Oil's operations, attested both by his own surviving ledgers and independently by Chernow's direct archival review of company financial records.
      detail_orientation: [78, 0.62, "d", "A"],
      // The systematic, multi-year consolidation of the American oil refining industry under Standard Oil is documented as a deliberately sequenced strategy rather than opportunistic accumulation, independently corroborated by business historians' analysis of the trust's formation timeline.
      planning_orientation: [72, 0.55, "s", "A"],
    },
  },
  {
    id: "p_martha_graham",
    slug: "martha-graham",
    canonicalName: "Martha Graham",
    birthYear: 1894,
    deathYear: 1991,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["dancer"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["founder", "perfectionist", "sustained_excellence"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q487604" },
    portrait: {
      url: "/portraits/martha-graham-ucla-1940.jpg",
      source: "UCLA Library Digital Collections (Los Angeles Daily News Negatives)",
      license: "CC BY 4.0",
      width: 1178,
      height: 1600,
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      attribution: "Los Angeles Daily News, courtesy UCLA Library Digital Collections",
      
    },
    sources: [{ id: "src_mg_own_memoir", kind: "archive", title: "Martha Graham, Blood Memory (1991, published posthumously) — her own memoir, read critically alongside independent accounts" }, { id: "src_mg_degooyer", kind: "biography", title: "Agnes de Mille, Martha: The Life and Work of Martha Graham (1991) — written by a former student and fellow choreographer who knew her for decades" }, { id: "src_mg_company_dancers", kind: "biography", title: "Accounts from multiple named former Martha Graham Dance Company members across different decades of the company's history (including Merce Cunningham's, Erick Hawkins's, and Yuriko's own separate published/recorded recollections), independently corroborating a consistent picture of her studio practice and leadership style across a 60-plus-year span" }, { id: "src_mg_wikipedia", kind: "wikipedia", title: "Martha Graham", url: "https://en.wikipedia.org/wiki/Martha_Graham" }],
    rows: {
      // Documented, sustained study of world mythology, Jungian psychology, and Native American ceremonial forms across decades specifically to inform new works (Night Journey draws on Greek myth via a Jungian lens; Primitive Mysteries on Southwestern ceremonial form), corroborated by de Mille's independent account of her research habits.
      curiosity: [68, 0.5, "s", "A"],
      // Developed the "contraction and release" technique as a systematized alternative to classical ballet vocabulary, documented by dance historians as a foundational, genuinely original codified technique still taught internationally, independently corroborated by its adoption far beyond her own company.
      creative_originality: [90, 0.8, "d", "A"],
      // Documented, consistently corroborated across multiple decades of company members' independent accounts as maintaining a daily technique class and rehearsal discipline for herself and her dancers into her own seventies, a specific, sustained practice attested from more than one source across different eras of the company.
      discipline: [88, 0.75, "d", "A"],
      // Documented via multiple former dancers' independent accounts (spanning different decades of the company) of repeatedly rehearsing single short phrases for hours until a precise quality was achieved, and of her own harsh self-criticism of finished works — a specific, repeatedly corroborated pattern, not one dancer's impression.
      perfectionism: [80, 0.68, "d", "D"],
      // Continued performing herself into her mid-seventies despite documented severe arthritis, then, after being forced to stop performing, entered a well-documented period of depression and alcohol dependency before rebuilding a second career phase as company director and rechoreographer into her nineties — a sustained arc across genuine adversity, not a single comeback.
      persistence: [82, 0.68, "d", "A"],
      // Documented as shifting from active performer to full-time director/choreographer role in her seventies after her body could no longer meet her own technical standard, a specific, forced but ultimately sustained professional transition.
      adaptability: [65, 0.48, "s", "A"],
      // Left the established Denishawn company in 1923 to found her own independent, financially precarious company with no guaranteed audience for a deliberately difficult new form — inferred financial and professional risk from the well-documented founding circumstances.
      risk_tolerance: [62, 0.45, "i", "N"],
      // Sustained a financially precarious independent company for decades before wide institutional acceptance of modern dance as an art form, inferred tolerance for that prolonged uncertainty from the company's continued operation.
      ambiguity_tolerance: [58, 0.42, "i", "N"],
      // Documented as making final artistic decisions unilaterally and often changing choreography abruptly close to performance dates, per multiple dancers' accounts of last-minute revisions — a real but variably corroborated pattern, hence inference-level.
      decisiveness: [62, 0.45, "i", "N"],
      // Documented, corroborated across multiple company members' independent accounts as commanding total authority in the studio, described consistently as an intense, dominating presence in rehearsal across different decades of dancers.
      social_assertiveness: [68, 0.5, "s", "D"],
      // Founded and personally directed her own company continuously for over 60 years, documented as retaining final creative and personnel authority even as she brought in significant collaborators (Louis Horst, Isamu Noguchi), a sustained, well-corroborated pattern of ultimate control.
      leadership_drive: [78, 0.65, "d", "A"],
      // Documented as recruiting and retaining major collaborators across decades (composer Louis Horst for over 20 years, designer Isamu Noguchi for numerous works), inferred persuasive/relational skill from the sustained, voluntary nature of these long collaborations.
      persuasiveness: [65, 0.48, "s", "A"],
      // Documented, independently corroborated by multiple former dancers (including Erick Hawkins, her former husband and company member, whose own departure from the company is documented as acrimonious) as willing to sustain serious personal and professional conflict rather than avoid it, evidenced across more than one relationship.
      conflict_tolerance: [70, 0.52, "s", "D"],
      // Documented, sustained systematic development of a codified technique (contraction and release, spiraling, floor work) refined and taught consistently over decades, corroborated by dance educators' independent analysis of the technique's development across her career.
      mastery_orientation: [82, 0.68, "d", "A"],
      // Documented as continuing to choreograph new, ambitious works into her eighties and nineties after no longer performing, corroborated by the dated catalog of late-career premieres (over 180 works total across her lifetime).
      achievement_drive: [72, 0.55, "s", "A"],
      // Left the established Denishawn company specifically to control her own artistic direction, and maintained that independent control for over 60 years afterward rather than merging with or subordinating her company to another institution, a sustained, well-corroborated pattern.
      autonomy_need: [75, 0.6, "s", "A"],
      // Her own writing and interviews frame her technique as intended to give dance a durable, teachable American vocabulary distinct from European ballet tradition — a documented stated aim, though this is more a professional/artistic goal than an explicit social-impact motivation, hence inference-level.
      impact_motivation: [62, 0.45, "i", "A"],
      // Documented, extensively analyzed formal innovation across choreography, costume (her own costume designs are separately studied), and stage design collaboration with Noguchi, corroborated by decades of independent dance and design scholarship.
      aesthetic_sensitivity: [88, 0.72, "d", "A"],
      // Career substantively concentrated in dance and closely adjacent design collaboration, not extending to fully unrelated fields — scored near center rather than inflated.
      cross_domain_range: [55, 0.4, "i", "N"],
      // Self-initiated the founding of her own company and technique at a time when no comparable American modern-dance institution existed for her to join, documented as a deliberate, self-directed act rather than a natural next step in an existing career path.
      proactive_agency: [78, 0.62, "d", "A"],
      // Sustained multi-decade working partnerships with Louis Horst and Isamu Noguchi documented as genuinely productive, but multiple former dancers (including Hawkins) independently describe the company's overall working culture as one-directional rather than collaborative — mixed evidence across different relationships, scored near center with dual-edged impact.
      collaboration: [55, 0.45, "s", "D"],
      // Documented as substantially revising her own earlier, more austere choreographic style toward warmer, more lyrical later works once collaborating with Noguchi and later dancers, though the underlying personal reasoning is inferred from the stylistic shift rather than a direct first-person account.
      belief_updating: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_t_e_lawrence",
    slug: "t-e-lawrence",
    canonicalName: "T. E. Lawrence",
    aliases: ["Lawrence of Arabia"],
    birthYear: 1888,
    deathYear: 1935,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["military_leader", "writer", "diplomat"],
    fieldIds: ["military", "literature", "politics"],
    impactDomains: ["historical", "literary"],
    tagIds: ["strategist", "self_taught", "nonconformist"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q170596" },
    portrait: {
      url: "/portraits/t-e-lawrence-harris-ewing-1919.jpg",
      source: "Wikimedia Commons",
      license: "Public domain",
      width: 1262,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Te_lawrence.jpg",
      attribution: "Harris & Ewing, 1919 (Paris Peace Conference portrait)",
      
    },
    sources: [{ id: "src_tel_seven_pillars", kind: "archive", title: "T. E. Lawrence, Seven Pillars of Wisdom (1926) — his own account, read critically alongside independent corroboration" }, { id: "src_tel_wilson", kind: "biography", title: "Jeremy Wilson, Lawrence of Arabia: The Authorised Biography of T. E. Lawrence (1989) — an independent, extensively archive-sourced biography" }, { id: "src_tel_arab_commanders", kind: "archive", title: "Independent accounts from Arab Revolt commanders who served alongside him (documented in later Arab historical accounts of the Revolt, and corroborated by British military records of the same campaigns from officers other than Lawrence)" }, { id: "src_tel_wikipedia", kind: "wikipedia", title: "T. E. Lawrence", url: "https://en.wikipedia.org/wiki/T._E._Lawrence" }],
    rows: {
      // Documented, sustained pre-war archaeological fieldwork in Syria and self-directed study of Arabic language and Bedouin tribal custom over several years before the war, corroborated by Wilson's independent review of his archaeological correspondence and site reports.
      curiosity: [75, 0.58, "s", "A"],
      // Documented, sustained multi-year effort producing and repeatedly revising Seven Pillars of Wisdom -- including reconstructing the entire manuscript from scratch after reportedly losing a completed draft in 1919 -- corroborated by multiple surviving manuscript versions held in archives and independently examined by Wilson, not Lawrence's own account alone.
      discipline: [68, 0.55, "s", "A"],
      // Documented as continuing the Arab Revolt campaign across nearly two years of harsh desert conditions, repeated setbacks, and at least one documented capture and severe mistreatment at Deraa, sustained until the campaign's conclusion at Damascus.
      persistence: [72, 0.55, "s", "A"],
      // Personally led irregular guerrilla raids deep into hostile territory (the Aqaba raid via an overland desert crossing considered impassable) and was documented captured and beaten at Deraa in 1917, both specific, severe, independently corroborated instances of extreme physical risk accepted in the course of the campaign.
      risk_tolerance: [85, 0.72, "d", "R"],
      // Documented as operating for extended periods with genuinely uncertain tribal alliances and unclear command authority between British and Arab command structures, sustained across the campaign without the clarity of a conventional military hierarchy, corroborated by British officers' own accounts of the campaign's ambiguous chain of command.
      ambiguity_tolerance: [68, 0.5, "s", "A"],
      // Documented as personally deciding to attack Aqaba from the landward side after judging the seaward approach too heavily defended, a specific, dated strategic decision independently corroborated by British and Arab accounts of the successful 1917 raid.
      decisiveness: [68, 0.5, "s", "A"],
      // Documented as capable of commanding tribal leaders' attention and cooperation during the campaign, but also documented in his post-war years as deliberately reclusive, enlisting in the ranks under assumed names specifically to avoid public attention — genuinely mixed by life period, scored moderately.
      social_assertiveness: [62, 0.45, "i", "D"],
      // Documented as exercising real operational leadership during the Arab Revolt but explicitly and repeatedly refusing honors and rank afterward (declining a knighthood offered by King George V and enlisting as a private in the RAF under an assumed name), a documented, sustained ambivalence about formal leadership status rather than a simple drive toward it.
      leadership_drive: [60, 0.45, "i", "D"],
      // Documented as directly persuading multiple independent tribal leaders (including Auda abu Tayi) to join the Arab Revolt's cause, corroborated by both his own account and by later Arab historical accounts of the Revolt crediting his role in these specific alliances.
      persuasiveness: [72, 0.55, "s", "A"],
      // Documented as sustaining tension between his loyalty to the Arab cause and his duties to British command throughout the campaign, and later publicly criticizing the postwar Sykes-Picot settlement for betraying wartime promises to Arab allies — a sustained, documented ethical and political conflict he did not avoid.
      conflict_tolerance: [65, 0.48, "s", "D"],
      // Documented, sustained pre-war self-directed study of Arabic and Middle Eastern archaeology over several years before the war gave him any military role, corroborated by his own academic publications and Wilson's independent review of this period.
      mastery_orientation: [68, 0.5, "s", "A"],
      // Documented as achieving major wartime success yet then deliberately retreating from public recognition and status afterward — a documented pattern that complicates a simple achievement-drive reading, scored near center to reflect the actual, contradictory arc rather than either extreme.
      achievement_drive: [55, 0.42, "i", "D"],
      // Documented as operating with substantial independence from formal British military command structure throughout the Arab Revolt campaign, and later enlisting in the ranks specifically to escape both fame and hierarchical status entirely — a sustained, well-corroborated pattern across two very different life periods.
      autonomy_need: [78, 0.62, "d", "A"],
      // Documented, sustained postwar advocacy (in writing and in direct lobbying of the 1919 Paris Peace Conference) for Arab self-determination promises he had personally made during the campaign, corroborated by his own correspondence and by his documented attendance advocating for Faisal's cause.
      impact_motivation: [65, 0.48, "s", "A"],
      // Sustained substantive activity across archaeology, guerrilla military command, diplomacy, and literary writing (Seven Pillars is independently regarded as a significant literary work, not merely a memoir), each with real documented output.
      cross_domain_range: [68, 0.5, "s", "A"],
      // Documented as personally proposing and planning the Aqaba raid's unconventional overland approach against initial skepticism from British command, a self-initiated strategic proposal rather than an assigned mission.
      proactive_agency: [72, 0.55, "s", "A"],
      // Documented as growing disillusioned with British postwar policy toward the Arabs he had fought alongside, a specific, sustained shift from wartime cooperation to public postwar criticism of his own government's broken commitments.
      belief_updating: [65, 0.48, "s", "A"],
      // Documented meticulous attention to logistics and tribal-relations detail in planning desert operations, per his own campaign reports, though the broader evidentiary base beyond military planning is thinner, hence inference-level.
      detail_orientation: [62, 0.45, "i", "A"],
      // Documented, sustained working partnership with Arab commanders including Auda abu Tayi and Faisal bin Hussein across the nearly two-year campaign, corroborated by two independent source lines agreeing on the same pattern — his own account and separately, later Arab historical accounts of the Revolt describing genuine mutual respect and coordination, not one-sided British direction.
      collaboration: [68, 0.55, "s", "A"],
      // Documented as recognizing the strategic value of attacking the poorly-defended landward side of Aqaba before British command saw the same opportunity, corroborated by the campaign's documented outcome and subsequent military histories' analysis of the raid's planning.
      opportunity_sensing: [65, 0.48, "s", "A"],
      // Documented as sustaining an irregular guerrilla campaign with limited supply and inconsistent tribal support by adapting tactics to available resources (camel-mounted raiding rather than conventional supply-line warfare), corroborated by military historians' independent analysis of the campaign's logistics.
      resourcefulness: [68, 0.5, "s", "A"],
      // Seven Pillars of Wisdom is independently regarded by literary critics as a work of genuine prose craft, not merely a military memoir, though the evidentiary base for aesthetic sensitivity beyond this one work is thinner, hence inference-level.
      aesthetic_sensitivity: [62, 0.45, "i", "A"],
    },
  },
];

export const ROSTER_16: readonly Person[] = seeds.map(build);
