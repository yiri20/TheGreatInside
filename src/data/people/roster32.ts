/**
 * ROSTER 32 -- evidence-deepening + match-pool-balance cycle, ninth real
 * use of the profile-publication / match-eligibility separation
 * architecture (7 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster32.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate -- NOT `toPersonSeed()`
 * directly -- and never checks `computedEligibility.eligible`. All seven
 * are `evidence_approved` and non-match-eligible by design; none were
 * rescued toward eligibility. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * `docs/checkpoints/roster32-evidence-deepening-balance-cycle.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_fahrelnissa_zeid",
    slug: "fahrelnissa-zeid",
    canonicalName: "Fahrelnissa Zeid",
    birthYear: 1901,
    deathYear: 1991,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["TR", "JO"],
    regionCode: "west_asia",
    occupationIds: ["artist"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["innovator", "founder", "late_recognition"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q3064473" },
    portrait: {
      url: "/portraits/fahrelnissa-zeid-family-1937.jpg",
      source: "Wikimedia Commons, from the archive of Prince Ra'ad Zeid Al-Hussein (her son), via Tate collection records",
      license: "Public Domain (PD-old)",
      width: 620,
      height: 864,
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      attribution: "Unknown photographer, Berlin, 1937",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:Princess_Fahrelnissa_Zeid_family_1937.jpg",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_zeid_wikipedia", kind: "wikipedia", title: "Princess Fahrelnissa Zeid", url: "https://en.wikipedia.org/wiki/Princess_Fahrelnissa_Zeid" }, { id: "src_zeid_tate", kind: "institution", title: "Tate's biographical account and \"four key works\" analysis of Fahrelnissa Zeid", url: "https://www.tate.org.uk/art/artists/fahrelnissa-zeid-22764" }, { id: "src_zeid_aware", kind: "institution", title: "AWARE (Archives of Women Artists, Research and Exhibitions) biographical entry on Fahrelnissa Zeid", url: "https://awarewomenartists.com/en/artiste/fahrelnissa-zeid/" }, { id: "src_zeid_estate", kind: "institution", title: "The Estate of Fahrelnissa Zeid's own biography", url: "https://www.fahrelnissazeid.org/bio" }, { id: "src_zeid_artnewspaper", kind: "press", title: "\"Fahrelnissa Zeid: the modern Turkish artist who walked on her canvases\", The Art Newspaper (Emily Sharpe, 2017)", url: "https://www.theartnewspaper.com/2017/06/11/fahrelnissa-zeid-the-modern-turkish-artist-who-walked-on-her-canvases" }, { id: "src_zeid_hyperallergic", kind: "press", title: "\"Once Forgotten, the Work of an Illustrious Princess Painter Returns to Istanbul\", Hyperallergic (Ayla Jean Yackley, 2018)", url: "https://hyperallergic.com/465170/once-forgotten-the-work-of-an-illustrious-princess-painter-returns-to-istanbul/" }, { id: "src_zeid_anothermag", kind: "press", title: "\"The Iraqi Princess Who Turned The Art World Upside Down\", AnOther Magazine (2017)", url: "https://www.anothermag.com/art-photography/9913/the-iraqi-princess-who-turned-the-art-world-upside-down" }, { id: "src_zeid_mathaf", kind: "institution", title: "Mathaf Encyclopedia of Modern Art and the Arab World -- Fahrelnissa Zeid biography", url: "https://mathaf.org.qa/en/encyclopedia/artists-biographies/fahrelnissa-zeid/" }, { id: "src_zeid_asianart", kind: "press", title: "\"Fahrelnissa Zeid\", Asian Art Newspaper (Juliet Highet, 2017)", url: "https://asianartnewspaper.com/fahrelnissa-zeid/" }, { id: "src_zeid_stambouline", kind: "archive", title: "\"Fahrelnissa Zeid's Lost Portrait of Donald Trump\", Stambouline research blog, citing Şirin Devrim's family memoir and Tate Modern archival research (Nergis Abıyeva, 2020)", url: "http://www.stambouline.info/2020/11/fahrelnissa-zeids-lost-portrait-of.html" }],
    rows: {
      // Three independent documented stylistic/scale developments: a deliberate pivot from prolific expressionist figurative painting to full abstraction in 1948, subsequent mural-sized kaleidoscopic-pattern paintings art historians describe as foreshadowing Op-art, and [NEW_EVIDENCE, Roster32] her 1954 ICA London canvas 'Towards a Sky', painted at a scale that required roughly a third of it to be rolled up to fit under the gallery's ceiling -- ambition of scale that outran available venues rather than being adjusted to fit them.
      creative_originality: [80, 0.68, "d", "A"],
      // Sustained an active exhibiting art career across at least four distinct countries within a compressed period (Berlin 1935, forced relocation to Baghdad after 1938, then Paris and London from the mid-1940s). [NEW_EVIDENCE, Roster32] After losing the family's Baghdad embassy residence and King Faisal II's 1958 assassination forced permanent exile to a modest rented London flat, she stopped painting for a period, then deliberately returned to work as a coping response, experimenting with new mixed media (including bone sculpture tied to a newly developed interest in cooking) rather than either replacing her lost materials outright or abandoning practice.
      adaptability: [74, 0.64, "d", "A"],
      // Sustained an active painting career across roughly five decades and multiple countries, including through a documented period of near-total erasure from mainstream Western post-war art history, before receiving major institutional recognition decades later (her first Western retrospective at Museum Ludwig in 1990, and a major Tate Modern retrospective in 2017).
      persistence: [68, 0.5, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Two independent, multi-source-corroborated instances of bypassing institutional gatekeeping to create her own opportunities, three decades apart: in 1945, frustrated by a lack of gallery interest, she cleared the parlor rooms of her own Istanbul apartment and staged an unsanctioned solo exhibition there herself (corroborated across Tate, Mathaf, and AnOther); in the mid-1970s she personally founded the Fahrelnissa Zeid Institute of Fine Arts in Amman, a self-initiated teaching institution with named students, culminating in a joint public exhibition in 1981.
      proactive_agency: [74, 0.75, "d", "A"],
      // Traveled extensively through Europe in the 1920s specifically to visit museums and make sketches, a single documented instance of self-directed artistic research.
      curiosity: [58, 0.35, "i", "N"],
      // [NEW_EVIDENCE, Roster32] Two independent accounts describe the same absorbed working state: a Tate conservator who treated her paintings reports she entered 'a trance-like state while painting, emerging hours later exhausted with no memory of what had occurred around her,' and, independently, her son recalled watching her execute the 5-metre 'Break of the Atom and Vegetal Life' at 'an amazing pace' while 'in a state of trance.'
      deep_focus: [78, 0.72, "d", "D"],
      // [NEW_EVIDENCE, Roster32] The same Tate conservator who treated her paintings assessed that she 'was not the most meticulous painter and did not always bother to finish things like other artists,' calling the work 'more spontaneous' -- and, independently, a curator's account of canvases tacked directly to walls and ceilings and walked over as party decor shows comparable unconcern for precious, careful finishing of completed work.
      perfectionism: [30, 0.6, "d", "N"],
      // [NEW_EVIDENCE, Roster32] In her mid-70s she founded and ran a home-based teaching institute in Amman for adult students who had mostly never painted before, built around a distinctive, self-articulated philosophy quoted identically across two independent publications: telling students to 'forget what you know... because what you do not know is what you really are' -- notably teaching abstraction even though her own late-career practice had returned to figurative portraiture.
      leadership_drive: [68, 0.68, "d", "A"],
      // [NEW_EVIDENCE, Roster32] As a teenager in the 1920s, before any formal art training, she sold hand-painted postcards to fund her own art materials -- early self-sufficiency pursued independently of her family's means.
      resourcefulness: [58, 0.45, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Commissioned around 1989-90 to paint a portrait of Donald Trump from a supplied photograph, she rendered it according to her own aesthetic instincts -- unconventional styling and prominent Arabic lettering of his name -- rather than accommodating the client's evident preferences; he objected in writing in March 1990. (One secondary account frames her, rather than him, as the one who proposed the portrait -- this detail is unresolved, but does not affect the core fact that the finished work reflected her own artistic choices over client deference.)
      autonomy_need: [60, 0.48, "d", "N"],
      // [NEW_EVIDENCE, Roster32] She described her first flight over Baghdad as physically reframing her entire visual sense -- seeing a whole city held in view at once -- as the specific experience she credited with turning her toward abstraction, a discrete sensory event she herself identified as conceptually causal for her later practice.
      intuitive_synthesis: [60, 0.4, "i", "A"],
    },
  },
  {
    id: "p_george_bernard_shaw",
    slug: "george-bernard-shaw",
    canonicalName: "George Bernard Shaw",
    birthYear: 1856,
    deathYear: 1950,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["IE", "GB"],
    regionCode: "western_europe",
    occupationIds: ["writer", "political_activist"],
    fieldIds: ["literature", "politics", "social_reform"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["self_taught", "prolific", "nonconformist", "nobel_laureate"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q19185" },
    portrait: {
      url: "/portraits/george-bernard-shaw-bain-1909.jpg",
      source: "Library of Congress, George Grantham Bain Collection (LCCN 2014683900, digital ID ggbain.03906), via Wikimedia Commons",
      license: "Public Domain (PD-Bain / PD-US-no-notice)",
      width: 4191,
      height: 5760,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:G.B._Shaw_LCCN2014683900.jpg",
      attribution: "Bain News Service, 1909",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:G.B._Shaw_LCCN2014683900.jpg",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_gbs_wikipedia", kind: "wikipedia", title: "George Bernard Shaw", url: "https://en.wikipedia.org/wiki/George_Bernard_Shaw" }, { id: "src_gbs_wikidata", kind: "wikidata", title: "George Bernard Shaw (Q19185)", url: "https://www.wikidata.org/wiki/Q19185" }, { id: "src_gbs_holroyd", kind: "biography", title: "Michael Holroyd, Bernard Shaw (4-volume definitive biography, 1988-1992)" }, { id: "src_gbs_nobel", kind: "award_body", title: "Nobel Prize in Literature 1925 citation" }, { id: "src_gbs_encyclopedia", kind: "biography", title: "Encyclopedia.com, \"Shaw, George Bernard (1856-1950)\"", url: "https://www.encyclopedia.com/international/encyclopedias-almanacs-transcripts-and-maps/shaw-george-bernard-1856-1950" }, { id: "src_gbs_jot101", kind: "archive", title: "Jot101, \"The manuscripts of George Bernard Shaw\", quoting Shaw's own description of his Pitman-shorthand composition process", url: "https://jot101.com/2017/12/the-manuscripts-of-george-bernard-shaw/" }, { id: "src_gbs_ivu", kind: "archive", title: "International Vegetarian Union, \"History of Vegetarianism -- George Bernard Shaw\"", url: "https://ivu.org/history/shaw/" }, { id: "src_gbs_prefaces", kind: "press", title: "Coverage of Shaw's play prefaces (e.g. the 67-page preface to the 29-page The Shewing-Up of Blanco Posnet) as systematic argumentative essays on marriage, poverty, vivisection, vaccination, and women's rights", url: "https://www.sfgate.com/performance/article/george-bernard-shaw-almost-seems-underrated-5109614.php" }],
    rows: {
      // Documented maintenance of a public pacifist stance during WWI severe enough that it caused 'the instant departure of many' from functions he attended -- a specific, dated, unpopular position held despite real social cost.
      independent_thinking: [88, 0.65, "d", "A"],
      // Documented self-education regime of spending most weekdays at the British Museum Reading Room after moving to London in 1876, sustained for years before achieving any income from writing. [NEW_EVIDENCE, Roster32] A second, independent, exceptionally long-duration instance: adopted vegetarianism in 1881 at age 25 and sustained it without exception for 66 years until his death in 1950, a lifelong dietary/ethical commitment he himself credited (citing Shelley's The Revolt of Islam as the trigger) rather than a fashion he drifted in and out of.
      discipline: [85, 0.72, "d", "A"],
      // Documented choice to forgo steady employment (leaving the Edison Telephone Company) and rely on his mother's support for four years to pursue writing on his own terms -- a specific, sourced, costly choice.
      autonomy_need: [82, 0.58, "s", "A"],
      // Documented, named contemporary account (Margaret Cole) that H. G. Wells was 'annihilated' by Shaw's 'trained and practised virtuosity' in public society debates -- a specific, independently attested incident, not a generic reputation for wit.
      persuasiveness: [85, 0.62, "d", "A"],
      // Documented, sustained combative public persona across decades of political and literary controversy, including the WWI pacifism episode above, without evident retreat from public life as a result.
      conflict_tolerance: [80, 0.58, "s", "A"],
      // Documented willingness to state unpopular positions (pacifism, vegetarianism as principle rather than fashion) at real cost to social standing -- scored dual-edged since the same documented WWI stance cost him real relationships and standing at the time.
      risk_tolerance: [65, 0.5, "s", "D"],
      // Inferred from a sustained decades-long public writing and political career culminating in the 1925 Nobel Prize in Literature and, in 1938, an Academy Award for the Pygmalion screenplay -- one of very few people to hold both, corroborated by the award bodies themselves.
      achievement_drive: [82, 0.55, "s", "A"],
      // Documented as the Fabian Society's most prominent voice and author of its first manifesto after joining in 1884, though the same record shows his direct political involvement (including a failed London County Council campaign) declining by the 1890s -- kept moderate rather than high given that documented decline.
      leadership_drive: [62, 0.48, "s", "A"],
      // Inferred narrowly from the sustained multi-year self-education plan at the British Museum before any writing income -- a real but singular data point, kept at inference level.
      planning_orientation: [55, 0.42, "i", "N"],
      // Inferred from the documented pivot from failed direct political campaigning to sustained influence through playwriting and criticism instead, after the 1890s decline in his electoral politics noted above.
      adaptability: [68, 0.48, "i", "A"],
      // Inferred from a Nobel Prize in Literature specifically citing work 'marked by both idealism and humanity' across a body of plays that combined social criticism with comedy -- a documented critical judgment, though the underlying originality itself is inferred rather than itemized incident by incident.
      creative_originality: [78, 0.52, "s", "A"],
      // Inferred narrowly from his own documented shift away from direct electoral politics toward literary influence after the 1890s campaign failure -- thin evidence base, kept at inference level.
      belief_updating: [60, 0.42, "i", "N"],
      // Inferred from the well-documented public debating persona described above; distinguished from persuasiveness by focusing on his documented ease commanding a room rather than the outcome of specific arguments.
      social_assertiveness: [78, 0.5, "s", "A"],
      // [NEW_EVIDENCE, Roster32] Wrote five novels between 1879 and 1883; every one was rejected by London publishers, some more than once, and none found a mainstream publisher until after he had separately established his reputation as a critic and playwright -- he continued writing new novels through this entire run of rejections rather than stopping after the first.
      persistence: [66, 0.55, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Maintained an unusual, highly specific personal composition system across his career, in his own words: 'I write for the Press in Pitman's phonetic script (without reporting contractions) which is then translettered on the typewriter by another hand and sent to the printer' -- and deliberately destroyed the shorthand draft pages after transcription, keeping only a handful for archival purposes (e.g. ten pages of Saint Joan).
      detail_orientation: [60, 0.5, "d", "N"],
      // [NEW_EVIDENCE, Roster32] Regularly wrote prefaces to his plays that were systematic argumentative essays exceeding the length of the plays themselves -- most concretely, a 67-page preface to the 29-page one-act The Shewing-Up of Blanco Posnet (1909) -- using each preface to construct an extended, structured argument on a general theme (marriage, poverty, vivisection, vaccination, women's rights) rather than commentary on the specific play alone.
      systems_abstraction: [70, 0.55, "d", "A"],
    },
  },
  {
    id: "p_james_baldwin",
    slug: "james-baldwin",
    canonicalName: "James Baldwin",
    birthYear: 1924,
    deathYear: 1987,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["cultural", "literary", "historical", "social"],
    tagIds: ["theorist", "self_taught"],
    archetypeIds: ["independent_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q273210" },
    portrait: {
      url: "/portraits/james-baldwin-vanvechten-1955.jpg",
      source: "Library of Congress, Carl Van Vechten Collection (Prints & Photographs Division, digital ID cph.3a42800), via Wikimedia Commons",
      license: "Public Domain (no known restrictions per the Library of Congress)",
      width: 3712,
      height: 5376,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Jamesbaldwin.jpg",
      attribution: "Carl Van Vechten, September 13, 1955",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:Jamesbaldwin.jpg",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_baldwin_wikipedia", kind: "wikipedia", title: "James Baldwin", url: "https://en.wikipedia.org/wiki/James_Baldwin" }, { id: "src_baldwin_nmaahc", kind: "institution", title: "National Museum of African American History and Culture's multi-part biographical account of James Baldwin", url: "https://nmaahc.si.edu/explore/stories/introduction-james-baldwin" }, { id: "src_baldwin_fbi_jstor", kind: "archive", title: "\"James Baldwin and the FBI\" (JSTOR Daily), documenting his 1,884-page FBI file and 1963 public accusation against Hoover", url: "https://daily.jstor.org/james-baldwin-and-the-fbi" }, { id: "src_baldwin_buckley_debate", kind: "press", title: "\"Still Burning: Remembering the James Baldwin and William F. Buckley Jr. Debate\" (Los Angeles Review of Books)", url: "https://lareviewofbooks.org/article/still-burning-remembering-the-james-baldwin-and-william-f-buckley-jr-debate/" }, { id: "src_baldwin_own_words", kind: "archive", title: "Baldwin's own documented statements on his writing process and his reasons for leaving the United States" }, { id: "src_baldwin_parisreview", kind: "press", title: "\"The Art of Fiction No. 78\", The Paris Review (1984 interview with Baldwin)", url: "https://www.theparisreview.org/interviews/2994/the-art-of-fiction-no-78-james-baldwin" }, { id: "src_baldwin_yale_wright", kind: "institution", title: "Yale University, \"American Literature in the World\" -- \"James Baldwin and Richard Wright: What quarrel?\"", url: "https://amlitintheworld.yale.edu/2013/08/07/james-baldwin-and-richard-wright-what-quarrel/" }, { id: "src_baldwin_ransomcenter", kind: "institution", title: "Harry Ransom Center / Hidden Histories at UT Austin -- Giovanni's Room rejection letter exhibit", url: "https://hiddenhistoriesut.org/exhibits/show/injustices-in-publishing/item/115" }, { id: "src_baldwin_birthmoviesdeath", kind: "press", title: "\"James Baldwin and the Autobiography of Malcolm X\", Birth.Movies.Death (Jeremy Smith, 2017), and Baldwin's own The Devil Finds Work (1976)", url: "https://birthmoviesdeath.com/2017/02/08/james-baldwin-and-the-autobiography-of-malcolm-x.html" }, { id: "src_baldwin_smithsonian_angelou", kind: "press", title: "Smithsonian Magazine, on the 1968 origins of Maya Angelou's I Know Why the Caged Bird Sings, quoting Angelou's own memoir", url: "https://www.smithsonianmag.com/arts-culture/published-50-years-ago-i-know-why-caged-bird-sings-launched-revolution-180973719/" }, { id: "src_baldwin_hyperallergic_delaney", kind: "press", title: "\"The Artist Who Taught James Baldwin to Write Like a Painter\", Hyperallergic (2025)", url: "https://hyperallergic.com/beauford-delaney-artist-who-taught-james-baldwin-to-write-like-a-painter/" }],
    rows: {
      // Two independent, high-conviction documented instances: underwent a religious conversion at 14 and served as a junior minister for three years, then gradually and independently came to question and abandon core tenets he had once preached; and directly, publicly charged in September 1963 that the FBI itself was "a hazard to the Civil Rights Movement," naming Hoover as effectively siding with segregationists.
      independent_thinking: [84, 0.68, "d", "A"],
      // Three independent, well-documented instances of continuing productive work through repeated loss or rejection: lost all four unpublished novel manuscripts he had written before relocating to Paris and did not stop writing; had a manuscript rejected by Harper's and simply set it aside to work on another project; and sustained a demanding personal revision practice across years for individual pieces. [NEW_EVIDENCE, Roster32] A fourth instance: when Knopf rejected Giovanni's Room in October 1955 (editor Henry Carlisle warning it would 'damage his reputation'), Baldwin kept the manuscript's content intact rather than sanitizing it and found another publisher (Dial Press, 1956) instead.
      persistence: [84, 0.72, "d", "A"],
      // Two independent, high-stakes documented instances: left the United States for Paris in November 1948 with only $40 and a bag of unfinished manuscripts; and continued public political writing and activism despite being the subject of the largest FBI file ever compiled on any African American artist of the Civil Rights era (1,884 pages, 1958-1974).
      risk_tolerance: [82, 0.65, "d", "R"],
      // Publicly debated a prominent ideological opponent, William F. Buckley Jr., at Cambridge University (1965) and won decisively, and separately made a direct, named public accusation against the FBI and its director in 1963 despite the real institutional power arrayed against him. [NEW_EVIDENCE, Roster32] A third independent instance: after Norman Mailer's Advertisements for Myself (1959) publicly disparaged his prose, Baldwin responded in a 1961 Esquire essay ('The Black Boy Looks at the White Boy') combining pointed counter-criticism with an unusual public admission that Mailer's earlier remarks had genuinely hurt him -- direct confrontation paired with candor rather than either silence or pure attack.
      conflict_tolerance: [80, 0.7, "d", "A"],
      // Developed and sustained a specific, demanding personal revision standard, sometimes spending years refining a single essay, articulated directly in his own words: "rewriting [is] very painful... you know it's finished when you can't do anything more to it."
      discipline: [78, 0.6, "d", "A"],
      // Won the 1965 Cambridge Union debate against William F. Buckley Jr. on the motion "Is the American Dream at the expense of the American Negro?" by a lopsided, quantified margin (544 votes to 164). [NEW_EVIDENCE, Roster32] A second, independent context: per Maya Angelou's own memoir, when she repeatedly refused a 1968 offer to write a memoir, Baldwin specifically coached the approaching editor (Robert Loomis) to tell her she couldn't do it -- a deliberate, successful use of interpersonal psychology to change someone else's mind, distinct in kind from formal public debate.
      persuasiveness: [76, 0.66, "d", "A"],
      // Found genuine refuge in reading at the public library from a young age as an alternative to a difficult home environment, and began writing across multiple forms (poems, short stories, plays) early, documented via the well-corroborated biographical record of his childhood.
      curiosity: [62, 0.45, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Two independent documented instances of prioritizing his own critical/creative judgment at high relational or material cost: in 1949 he publicly criticized Richard Wright's Native Son in print ("Everybody's Protest Novel") even though Wright had personally secured the fellowship funding his first novel -- the two reportedly never spoke again; and in 1969 he walked away from a well-funded Columbia Pictures screenplay adaptation of The Autobiography of Malcolm X rather than accept studio-directed changes he saw as an interpretive distortion, later writing he'd 'rather be horsewhipped... than repeat the adventure.'
      autonomy_need: [72, 0.68, "d", "A"],
      // [NEW_EVIDENCE, Roster32] At 15, sought out painter Beauford Delaney at his Greenwich Village studio specifically to learn from him; Delaney became a 38-year mentor who taught him visual perception directly. Baldwin credited this single relationship as formative twice, decades apart, in his own words: 'He taught me how to see, and how to trust what I saw' (1984), and, in 1985, that Delaney was 'the first walking, living proof... that a black man could be an artist.'
      mastery_orientation: [66, 0.58, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Described, in his own words, keeping several different works in progress at once on his desk -- a novel, a play, a film scenario, essays -- and specifically chose to draft in longhand on legal pads rather than his typewriter to achieve 'shorter declarative sentences,' a considered, self-justified craft choice.
      cross_domain_range: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_matsuo_basho",
    slug: "matsuo-basho",
    canonicalName: "Matsuo Basho",
    birthYear: 1644,
    deathYear: 1694,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: [],
    regionCode: "east_asia",
    historicalPolityKey: "polity.tokugawa_shogunate",
    occupationIds: ["poet", "writer"],
    fieldIds: ["literature"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["founder", "ascetic", "renaissance"],
    archetypeIds: ["creative_creator", "independent_creator"],
    externalIdentity: { wikidataId: "Q5676" },
    portrait: {
      url: "/portraits/matsuo-basho-kyoriku.jpg",
      source: "Wikimedia Commons, attributed to Morikawa Kyoriku (1656-1715)",
      license: "Public Domain (PD-old-100)",
      width: 512,
      height: 854,
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      attribution: "Attributed to Morikawa Kyoriku, 17th century",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:Basho_by_Morikawa_Kyoriku_(1656-1715).jpg",
      kind: "historical_depiction",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_basho_wikipedia", kind: "wikipedia", title: "Matsuo Basho", url: "https://en.wikipedia.org/wiki/Matsuo_Bash%C5%8D" }, { id: "src_basho_narrowroad", kind: "archive", title: "Basho's own travel journal, Oku no Hosomichi (\"The Narrow Road to the Deep North\"), combining haiku with prose travel narrative" }, { id: "src_basho_biography", kind: "biography", title: "Later Japanese literary-historical assessment of Basho's role in elevating haikai poetry to a serious literary art form, and biographical accounts of his several extended walking journeys across Japan" }, { id: "src_basho_kyoraisho", kind: "archive", title: "Kyoraisho (\"Conversations with Kyorai\"), disciple Mukai Kyorai's record of Basho's own teaching remarks, tr. in Donald Keene's Anthology of Japanese Literature", url: "https://en.wikisource.org/wiki/Anthology_of_Japanese_Literature/Conversations_with_Kyorai" }, { id: "src_basho_shirane", kind: "biography", title: "Haruo Shirane, Traces of Dreams (Stanford University Press, 1998), quoting Kyorai's account of the Shado episode" }, { id: "src_basho_soradiary", kind: "archive", title: "Sora's Diary -- companion Kawai Sora's contemporaneous travel diary, rediscovered 1943, compared against Basho's own Oku no Hosomichi", url: "https://en.wikipedia.org/wiki/Sora%27s_Diary" }, { id: "src_basho_worldhaikureview", kind: "biography", title: "World Haiku Review, Kyorai biographical summary, including Basho's own dated March 1686 letter to Kyorai", url: "https://sites.google.com/site/worldhaikureview2/january-2016-issue/kyorai-the-full-text" }],
    rows: {
      // Elevated the haikai/hokku poetic form from a comparatively minor, often comic genre into a serious literary art capable of profound spiritual and aesthetic depth, documented via the widely recognized later literary-historical assessment of his specific role in this transformation. [NEW_EVIDENCE, Roster32] A second, independent documented instance: companion Sora's own contemporaneous diary (rediscovered 1943) shows Basho altered dates, places, event order, and even poems themselves when writing Oku no Hosomichi -- most named Japanese scholars (Sugiura, Imoto, Abe) read this as deliberate literary reshaping in service of constructed meaning rather than factual travel record, though one scholar (Komiya) disputes intentionality; noted here as a genuine, unresolved scholarly disagreement rather than settled fact.
      creative_originality: [86, 0.64, "d", "A"],
      // Undertook several extended solo walking journeys across dangerous, poorly-maintained roads and remote regions of Japan in his forties, including the roughly 2,400-kilometer journey recorded in Oku no Hosomichi, documented directly via his own detailed travel account of the route, hardships, and hazards encountered.
      risk_tolerance: [78, 0.5, "d", "D"],
      // Deliberately left a stable, established position as a poetry teacher in Edo to live an ascetic, itinerant life as a wandering poet. [NEW_EVIDENCE, Roster32] Sharpened by two independent corroborating details: contemporary and near-contemporary accounts specifically tie his 1680 departure to dissatisfaction with the haikai establishment's 'debasement into frivolity' (not merely a vague ascetic impulse), and he trained in Zen under the priest Butcho while explicitly describing himself as occupying neither a monastic nor a fully secular identity ('I may look like a priest, but I am a layman, though my head is shaved') -- a second, independent instance of deliberately choosing a nonstandard, boundary-crossing life path.
      autonomy_need: [74, 0.58, "s", "N"],
      // His travel journals document sustained close attention to local landscapes, historical sites, and encounters with other poets and ordinary people across many distinct regions of Japan, inferred as genuine curiosity from the documented breadth and specificity of these recorded observations.
      curiosity: [72, 0.45, "i", "A"],
      // The extreme compression and precision required by the 17-syllable haiku form implies exacting attention to word choice and imagery, inferred from the documented formal density of his surviving poetic output.
      detail_orientation: [70, 0.42, "i", "A"],
      // Sustained a demanding itinerant traveling-and-writing practice across multiple extended journeys over roughly a decade, inferred from the documented continuity of this lifestyle and output across his later career.
      persistence: [65, 0.4, "i", "A"],
      // [NEW_EVIDENCE, Roster32; factual gate corrected the original draft of this row -- see note] Two independent documented instances from his disciple Kyorai's own teaching record (Kyoraisho), directly quoted and verified against the primary translated text: praised disciple Kikaku's poem about a flea bite in direct, unhedged terms ('he deals with trifling matters in a most eloquent way'), and laughed openly at a failed verse from Kyorai himself ('you still haven't got the idea!'). NOTE: an earlier draft of this row also cited Bashō 'confidently overruling critic Shohaku' and 'explaining in detail why a hunting-themed subject was a poor haiku choice' -- rereading the actual Kyoraisho text against the source found both misrepresented: the line dismissing Shohaku ('completely misses the mark') is spoken by Kyorai, not Bashō (whose own response was measured praise of Kyorai, moved to the collaboration row below instead); and the hunting-subject exchange shows Bashō pondering at length before a hedged, uncertain verdict ('I fear it's hopeless'), not a confident dismissal. Score and confidence lowered accordingly to reflect 2 solid instances rather than 4.
      social_assertiveness: [66, 0.52, "s", "A"],
      // [NEW_EVIDENCE, Roster32] Three independent documented instances of warmth/investment toward specific disciples, verified against primary/named-scholarly sources: publicly rebuked a group of disciples for mocking a mundane poem by disciple Shado, redirecting the group's attention to what the poem was actually doing well (Kyorai's account via Shirane, Traces of Dreams); sent a mourning poem when disciple Kyorai's sister died suddenly in 1688; and, per the Kyoraisho itself, responded to Kyorai's own defense of a poem against a critic's objection not with correction but with open pleasure and validation ('Kyorai, you are a person with whom I can talk about poetry... He was very pleased').
      collaboration: [68, 0.6, "s", "A"],
      // [NEW_EVIDENCE, Roster32] Two independent documented instances of holding to his own aesthetic judgment against contemporary consensus: in a dated March 1686 letter to Kyorai, defended an unfashionable disciple poem no contemporary would then select as good ('it would take another two or three years'), and continued reciting it privately for years afterward; and deliberately timed the first disclosure of his core fueki-ryuko ('unchanging vs. fashionable') doctrine to his disciples specifically to the winter immediately after completing the Oku no Hosomichi journey, treating the journey itself as generative of a theory he controlled the release of.
      independent_thinking: [74, 0.62, "d", "A"],
    },
  },
  {
    id: "p_pablo_neruda",
    slug: "pablo-neruda",
    canonicalName: "Pablo Neruda",
    birthYear: 1904,
    deathYear: 1973,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CL"],
    regionCode: "latin_america",
    occupationIds: ["writer", "diplomat"],
    fieldIds: ["literature", "politics"],
    impactDomains: ["literary", "cultural", "social"],
    tagIds: ["nobel_laureate", "prolific"],
    archetypeIds: ["creative_creator", "social_influencer"],
    externalIdentity: { wikidataId: "Q34189" },
    portrait: {
      url: "/portraits/pablo-neruda-loc-1966.jpg",
      source: "Library of Congress, Prints & Photographs Division (digital ID cph.3a49112), via Wikimedia Commons",
      license: "Public Domain (US federal government work)",
      width: 620,
      height: 488,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Pablo_Neruda_(1966).jpg",
      attribution: "Library of Congress, June 20, 1966",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:Pablo_Neruda_(1966).jpg",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_neruda_wikipedia", kind: "wikipedia", title: "Pablo Neruda", url: "https://en.wikipedia.org/wiki/Pablo_Neruda" }, { id: "src_neruda_nobel", kind: "award_body", title: "The Nobel Prize — Pablo Neruda, Literature 1971" }, { id: "src_neruda_memoir", kind: "archive", title: "Pablo Neruda, Confieso que he vivido (Memoirs, published posthumously 1974)" }, { id: "src_neruda_fundacion_lorca", kind: "institution", title: "Fundación Pablo Neruda, Portal Cultura -- \"García Lorca - Pablo Neruda: una de las más grandes amistades literarias del siglo XX\"", url: "https://cultura.fundacionneruda.org/2021/04/garcia-lorca-pablo-neruda-una-de-las-mas-grandes-amistades-literarias-del-siglo-xx/" }, { id: "src_neruda_islanegra", kind: "institution", title: "Fundación Pablo Neruda -- Isla Negra Museum House", url: "https://fundacionneruda.org/en/isla-negra-museum-house/" }, { id: "src_neruda_greenink", kind: "press", title: "\"Neruda, Poetry and Green Ink: The Colour of Hope\", ASK Rare Books", url: "https://askrarebooks.com/neruda-poetry-and-green-ink-the-colour-of-hope/" }],
    rows: {
      // [NEW_EVIDENCE, Roster32] A second, independent, specific instance beyond his career-spanning stylistic range: on 10 November 1933 at a Buenos Aires banquet honoring both him and Federico García Lorca, the two poets spontaneously delivered a jointly-improvised speech 'al alimón' -- named for a rare bullfighting technique where two matadors work one cape together -- standing simultaneously from opposite ends of the table and alternating lines, corroborated across the Fundación Pablo Neruda's own cultural portal and multiple independent Argentine press retrospectives. Produced work spanning radically different poetic modes across his career — from the surrealist Residencia en la tierra to the accessible political epic Canto General to the intimate Odas Elementales — documented via the well-noted stylistic range across his bibliography.
      creative_originality: [82, 0.7, "d", "A"],
      // Sustained parallel careers as a prolific poet and as a career diplomat (consular postings across Asia and Latin America, later senator and ambassador), documented via the well-established dual record of his professional life.
      cross_domain_range: [72, 0.65, "d", "A"],
      // Produced an unusually large body of published poetry (dozens of volumes) across a five-decade career while simultaneously sustaining a full diplomatic and political career, documented via his extensive bibliography.
      achievement_drive: [76, 0.65, "d", "A"],
      // Publicly denounced Chilean president González Videla in a 1948 Senate speech and was subsequently forced into hiding and exile for over a year, escaping Chile on horseback across the Andes — a specific, well-documented instance of real, realized personal risk taken for a political position.
      risk_tolerance: [74, 0.65, "d", "R"],
      // Canto General explicitly frames Latin American history and social struggle as its subject, and his sustained political career (Communist Party senator, later ambassador) documents a consistent orientation toward broader social and political purpose alongside his literary work.
      impact_motivation: [74, 0.65, "d", "A"],
      // Sustained a prominent public political and diplomatic career including elected office and international ambassadorial roles, documented via the well-established record of his public life.
      social_assertiveness: [72, 0.65, "d", "A"],
      // His poetry achieved unusually broad popular readership across Latin America and internationally during his own lifetime, documented via the well-established scale of his public reception, distinct from more narrowly literary-audience poets.
      persuasiveness: [68, 0.5, "s", "A"],
      // Sustained an unusually prolific poetic output across five decades while simultaneously maintaining a demanding diplomatic career, evidencing real disciplined effort across two concurrent demanding tracks.
      discipline: [64, 0.46, "s", "A"],
      // Sustained direct public political confrontation with the sitting Chilean government leading to his forced exile, documented via the well-established consequences of his own 1948 Senate denunciation.
      conflict_tolerance: [66, 0.48, "s", "R"],
      // Sustained productive work through multiple diplomatic postings across very different countries and cultural contexts (Burma, Ceylon, Argentina, Mexico, France) over his career, documented via the well-established record of his consular assignments.
      adaptability: [62, 0.46, "s", "A"],
      // His extensive diplomatic postings across Asia and the Americas and his poetry's engagement with everyday objects (the Odas Elementales) suggest real sustained intellectual and sensory curiosity about the world.
      curiosity: [62, 0.44, "s", "A"],
      // Continued pursuing his own political and poetic convictions despite the direct personal cost of exile, suggesting real preference for standing by his own position over institutional accommodation.
      autonomy_need: [58, 0.42, "i", "N"],
      // Escaped Chile on horseback across a mountain pass in the Andes with the help of a clandestine support network during his 1948-49 forced hiding, a specific, well-documented instance of resourceful action under real material and physical constraint.
      resourcefulness: [62, 0.65, "d", "A"],
      // Continued developing distinct poetic styles across his career (from surrealist to epic-political to intimate-domestic modes) rather than repeating one successful early approach.
      mastery_orientation: [60, 0.44, "s", "A"],
      // Held elected political office (Chilean Senate) and later served as a Communist Party presidential pre-candidate before withdrawing in favor of Salvador Allende, documented via the well-established record of his political career.
      leadership_drive: [58, 0.42, "i", "N"],
      // [NEW_EVIDENCE, Roster32] The Odas Elementales' close attention to everyday objects is now corroborated by a second, physically verifiable independent instance: his Isla Negra house, built and expanded from the late 1930s through the 1950s, contains an entire dedicated room ('Bajo el mar') housing an extensive, thematically organized shell and marine-curio collection (including ships in bottles, figureheads, and a narwhal tusk), with the house's whole nautical architecture -- low ceilings, narrow passageways, an anchor mooring it to the land -- built specifically around this collecting practice rather than the collection being incidental decoration.
      detail_orientation: [65, 0.6, "d", "N"],
      // Canto General's sweeping, multi-book historical scope covering the whole of Latin American history required extensive advance structural planning, documented via the work's own comprehensive organized structure.
      planning_orientation: [58, 0.42, "i", "N"],
      // Joined the Communist Party and sustained an openly declared political position that directly led to his forced exile, a genuinely independent and consequential political stance for a prominent public literary figure of his era.
      independent_thinking: [60, 0.44, "s", "A"],
      // Continued both his poetic and political careers across forced exile and subsequent return, documented via the well-established sustained record of his post-exile output and political re-engagement.
      persistence: [62, 0.46, "s", "A"],
      // Sustained an unusually large body of published poetry alongside a demanding diplomatic career, evidencing real sustained concentrated creative effort.
      deep_focus: [55, 0.4, "i", "N"],
      // [NEW_EVIDENCE, Roster32] Wrote consistently in green ink throughout his working life, a specific, sustained, self-explained aesthetic choice -- he described green as the color of hope -- corroborated across multiple independent accounts of his manuscripts and working habits, distinct from an incidental or unremarked preference.
      aesthetic_sensitivity: [62, 0.5, "d", "A"],
    },
  },
  {
    id: "p_pele",
    slug: "pele",
    canonicalName: "Pelé",
    aliases: ["Edson Arantes do Nascimento"],
    birthYear: 1940,
    deathYear: 2022,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["BR"],
    regionCode: "latin_america",
    occupationIds: ["athlete"],
    fieldIds: ["sport"],
    impactDomains: ["athletic", "historical", "cultural"],
    tagIds: ["sustained_excellence", "prodigy"],
    archetypeIds: [],
    externalIdentity: { wikidataId: "Q12897" },
    portrait: {
      url: "/portraits/pele-anefo-schiphol-1962.jpg",
      source: "Wikimedia Commons, via Nationaal Archief (Dutch National Archives) / Anefo, archive ref 914-4284",
      license: "CC0 1.0 Universal Public Domain Dedication",
      width: 1675,
      height: 2105,
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      attribution: "Joop van Bilsen / Anefo, 19 October 1962",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:Pele_Netherlands_1962_(cropped).jpg",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_pele_wikipedia", kind: "wikipedia", title: "Pelé", url: "https://en.wikipedia.org/wiki/Pel%C3%A9" }, { id: "src_pele_playerstribune", kind: "press", title: "Pelé, \"Letter to My Younger Self\", The Players' Tribune", url: "https://www.theplayerstribune.com/articles/pele-soccer-letter-to-my-younger-self" }, { id: "src_pele_fifamuseum", kind: "institution", title: "FIFA Museum, \"Pelé -- a life in his own words\"", url: "https://www.fifamuseum.com/en/explore/fifamuseumplus/blog/Pel--a-life-in-his-o" }, { id: "src_pele_ussoccerhistory", kind: "institution", title: "Society for American Soccer History, \"The Pursuit of Pelé\"", url: "https://www.ussoccerhistory.org/the-pursuit-of-pele/" }],
    rows: {
      // [NEW_EVIDENCE, Roster32] Beyond the three-World-Cup outcome pattern, a specific dated instance: at age 9-10, after watching his father weep over Brazil's 1950 World Cup final loss, he personally told him "I will win a World Cup for you" -- a self-set, explicitly stated long-term goal formed under emotional pressure, later fulfilled, rather than a goal assigned by a coach or club.
      achievement_drive: [66, 0.68, "d", "A"],
      // Sustained elite performance across three World Cup cycles evidences real competitive drive, though — as with achievement_drive's original basis — this remains inferred substantially from results rather than specific documented personal behavior.
      competitiveness: [62, 0.42, "i", "N"],
      // A multi-decade elite athletic career implies sustained training discipline, but sourcing documents match outcomes and statistics far more thoroughly than his personal working habits or routine.
      discipline: [55, 0.4, "i", "N"],
      // [NEW_EVIDENCE, Roster32] Two independent, self-reported documented instances of resourcefulness under material scarcity in childhood: making his own ball from stuffed newspapers and socks to play barefoot with a neighborhood group when too poor for real equipment, and cleaning senior teammates' boots for coins around age 13 specifically to save toward his first real football.
      resourcefulness: [74, 0.72, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Two independent documented instances of deliberate, prepared (not improvised) behavior across very different contexts: saving earned coins toward a specific future purchase as a boy, and, decades later, recognizing a specific rehearsed set-play mid-match in the 1970 World Cup final ('we had prepared that play... I realised the play was the same') before delivering the pass for Carlos Alberto's goal.
      planning_orientation: [65, 0.6, "s", "A"],
      // [NEW_EVIDENCE, Roster32] A specific, well-documented multi-month episode shows the opposite of quick decisiveness: he declined the New York Cosmos' offer in person on three separate occasions (July-Sept 1974) citing fear of Brazilian public reaction, wavered only after his adviser laid out structured pros/cons, verbally accepted in March 1975, then publicly reversed that acceptance before finally committing in May 1975. (His own later retrospective account frames the same decision as confidently strategic/educational rather than reluctant -- the two accounts differ on stated motive, but the documented multi-reversal behavioral pattern itself is not in dispute.)
      decisiveness: [34, 0.6, "d", "N"],
    },
  },
  {
    id: "p_virginia_woolf",
    slug: "virginia-woolf",
    canonicalName: "Virginia Woolf",
    birthYear: 1882,
    deathYear: 1941,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["cultural", "literary", "historical"],
    tagIds: ["founder", "innovator"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q40909" },
    portrait: {
      url: "/portraits/virginia-woolf-beresford-1902.jpg",
      source: "Wikimedia Commons, restoration of a George Charles Beresford studio photograph",
      license: "Public Domain (photographer d. 1938; published before 1931)",
      width: 2924,
      height: 3994,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg",
      attribution: "George Charles Beresford, 1902 (restoration by Adam Cuerden)",
      attributionUrl: "https://commons.wikimedia.org/wiki/File:George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_woolf_wikipedia", kind: "wikipedia", title: "Virginia Woolf", url: "https://en.wikipedia.org/wiki/Virginia_Woolf" }, { id: "src_woolf_hogarth", kind: "archive", title: "\"Hogarth Press\" -- Modernist Archives Publishing Project's documented account of the Woolfs' hand-printing operation", url: "https://www.modernistarchives.com/business/the-hogarth-press" }, { id: "src_woolf_room", kind: "archive", title: "A Room of One's Own (1929), based on Woolf's own October 1928 lectures at Newnham and Girton Colleges, Cambridge" }, { id: "src_woolf_writing_ritual", kind: "biography", title: "Documented account of Woolf's daily writing routine and diary-based output-tracking practice" }, { id: "src_woolf_lighthouse_diary", kind: "archive", title: "Woolf Online -- digital scholarly edition of the Berg Collection holograph notebooks and diary transcriptions for To the Lighthouse", url: "https://www.woolfonline.com" }, { id: "src_woolf_tunnelling", kind: "biography", title: "Woolf's 30 August 1923 diary entry describing her 'tunnelling' compositional method for Mrs Dalloway (The Diary of Virginia Woolf, Vol. 2), as quoted in secondary literary scholarship" }, { id: "src_woolf_tls_lrb", kind: "press", title: "Stefan Collini, \"Book Reviewing: On the TLS\", London Review of Books v42 n21", url: "https://www.lrb.co.uk" }, { id: "src_woolf_joyce_yale", kind: "institution", title: "Yale \"Modernism Lab\" -- Hogarth Press overview and \"Woolf's Reading of James Joyce's Ulysses, 1918-1941\"", url: "https://campuspress.yale.edu/modernismlab/" }, { id: "src_woolf_bennett_essay", kind: "wikipedia", title: "\"Mr. Bennett and Mrs. Brown\" (Woolf's 1923-24 essay and its publication history)", url: "https://en.wikipedia.org/wiki/Mr._Bennett_and_Mrs._Brown" }, { id: "src_woolf_mansfield_diary", kind: "biography", title: "Woolf's diary self-report of professional jealousy toward Katherine Mansfield's prose, as quoted in secondary literary scholarship (dating unresolved between sources, see provenance notes)" }, { id: "src_woolf_years_diary", kind: "biography", title: "Woolf's 1936-37 diary entries on the difficulty of revising The Years, via secondary scholarly compilation" }],
    rows: {
      // Two independent documented instances: maintained a strict, structured daily writing timetable (working roughly 9:30am to noon on fiction or reviews after breakfast and a morning bath), and used her own diary specifically to track her writing output and set herself targets, a sustained self-monitoring practice.
      discipline: [80, 0.62, "d", "A"],
      // Deliberately avoided traditional narrative and plot structures in her own fiction, corroborated by A Room of One's Own's independently recognized status as the first modernist feminist-critical text. [NEW_EVIDENCE, Roster32] Sharpened by a specific, dated, self-described mechanism: her 30 August 1923 diary entry names the deliberate 'tunnelling' method she used while writing Mrs Dalloway -- excavating each character's backstory separately so the strands would surface together at a single present-moment scene, explicitly to combine humanity, humor, and depth.
      creative_originality: [82, 0.72, "d", "A"],
      // Developed and delivered, via two public lectures at Cambridge women's colleges in October 1928, a genuinely original critical framework -- that financial independence and private space are preconditions for women's intellectual work -- later published as A Room of One's Own, documented via its well-corroborated originality and subsequent critical reception.
      independent_thinking: [76, 0.58, "d", "A"],
      // Co-founded the Hogarth Press with her husband in 1917, personally teaching herself hand-typesetting as a practical trade skill and setting the type for the press's early books herself, specifically to build independent publishing infrastructure free from external editorial constraint rather than working within existing publishing structures.
      resourcefulness: [66, 0.5, "d", "A"],
      // Made deliberate editorial decisions through the Hogarth Press to publish significant early work by other major modernist writers, including Katherine Mansfield's Prelude, T.S. Eliot's Poems, and works by Lytton Strachey, E.M. Forster, and Maynard Keynes -- a real curatorial and institutional role beyond her own writing.
      leadership_drive: [62, 0.45, "d", "A"],
      // The Hogarth Press's explicitly documented purpose was to let her publish her own writing free from the constraints of editors, inferred as a real, direct autonomy motivation from this stated purpose, scored cautiously given overlap with the resourcefulness row above.
      autonomy_need: [64, 0.4, "i", "A"],
      // [NEW_EVIDENCE, Roster32] Two independent documented instances of extensive, effortful manuscript revision a decade apart: her diary tracks To the Lighthouse (1926) through months of not knowing how to end it ('casting about for an end' as of 5 Sept 1926) followed by a full revision pass after a first provisional draft; a decade later she recorded The Years (1936-37) as so difficult she could sometimes manage only a single page before stopping to rest.
      perfectionism: [72, 0.68, "d", "A"],
      // [NEW_EVIDENCE, Roster32] A dated sequence of diary/letter entries across April-September 1922 documents her view of Joyce's Ulysses genuinely shifting more than once as she read it and encountered others' analysis -- from wary interest, to a harsher mid-read judgment, to a final mixed verdict granting real genius alongside overall reservations, to a further upward revision after reading a friend's critical analysis.
      belief_updating: [68, 0.65, "d", "A"],
      // [NEW_EVIDENCE, Roster32] After Arnold Bennett's March 1923 review argued her characters in Jacob's Room weren't 'real' enough to last, she did not let the criticism go privately -- she turned her rebuttal into a public essay, publishing successive reworked versions in December 1923, July 1924, and an expanded Hogarth Press pamphlet on 30 October 1924, sustaining the public argument for some nineteen months.
      conflict_tolerance: [65, 0.55, "d", "A"],
      // [NEW_EVIDENCE, Roster32] Began reviewing for the Times Literary Supplement in 1905 at age 23; when editor Bruce Richmond returned her third submission as needing more scholarly treatment, she continued regardless, producing roughly fifty further reviews for the same publication over the next three years.
      persistence: [62, 0.55, "d", "A"],
      // [NEW_EVIDENCE, Roster32] When Harriet Shaw Weaver brought the incomplete Ulysses manuscript to the Woolfs on 14 April 1918, Leonard and Virginia jointly declined to publish it, citing both the hand-press's limited capacity for its length and fear of an obscenity prosecution -- scored cautiously as inference given this was a joint decision with her husband, not a documented instance of her acting alone.
      risk_tolerance: [35, 0.4, "i", "N"],
      // [NEW_EVIDENCE, Roster32] Recorded in her diary that Katherine Mansfield's prose was the only other writer's work that had ever made her jealous, alongside sharply negative critical language about one specific Mansfield story -- scored cautiously as inference given the exact date could not be independently confirmed this cycle.
      competitiveness: [58, 0.4, "i", "N"],
    },
  },
];

export const ROSTER_32: readonly Person[] = seeds.map(build);
