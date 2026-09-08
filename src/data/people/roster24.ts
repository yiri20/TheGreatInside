/**
 * ROSTER 24 — first production use of the profile-publication / match-
 * eligibility separation architecture (2 people).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: evidence_approved)
 * via `src/dev/roster1000/generateRoster24.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. Both people
 * below honestly fail `eligibility_v2` (unchanged, unremediated) and are
 * published + directory-visible + non-match-eligible by design. Every
 * score's rationale is preserved as the inline comment above its Row, same
 * as every earlier roster batch. Full record:
 * `docs/checkpoints/roster24-evidence-approved-publications.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_anton_chekhov",
    slug: "anton-chekhov",
    canonicalName: "Anton Chekhov",
    birthYear: 1860,
    deathYear: 1904,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["RU"],
    regionCode: "central_europe",
    occupationIds: ["writer", "physician"],
    fieldIds: ["literature", "medicine"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["overcame_adversity"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q5685" },
    portrait: {
      url: "/portraits/anton-chekhov-literaturnoe-nasledstvo-1903.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (published in the former Russian Empire before 7 November 1917, no Berne-Convention country of origin; also PD in the US as published before January 1, 1931)",
      width: 1096,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Chekhov_1903.jpg",
      attribution: "Unknown photographer, 1903 or 1904 — reproduced in Литературное наследство (Literaturnoye Nasledstvo), vol. 68",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ac_letters", kind: "archive", title: "Anton Chekhov, Letters of Anton Chekhov to His Family and Friends (trans. Constance Garnett, 1920) — his own correspondence, spanning 1875-1904", url: "https://www.gutenberg.org/files/6408/6408-h/6408-h.htm" }, { id: "src_ac_reminiscences", kind: "biography", title: "Maxim Gorky, Alexander Kuprin, and I. A. Bunin, Reminiscences of Anton Chekhov (trans. S. S. Koteliansky and Leonard Woolf) — three separately-authored independent memoirs by close friends/fellow writers", url: "https://www.gutenberg.org/files/37129/37129-h/37129-h.htm" }, { id: "src_ac_gerhardi", kind: "biography", title: "William Gerhardi, Anton Chehov: A Critical Study (1923) — independent scholarly study, used only for one directly biographical (non-literary-critical) passage on his family origins", url: "https://archive.org/stream/in.ernet.dli.2015.178467/2015.178467.Anton-Chehov-A-Critical-Study_djvu.txt" }, { id: "src_ac_wikipedia", kind: "wikipedia", title: "Anton Chekhov", url: "https://en.wikipedia.org/wiki/Anton_Chekhov" }],
    rows: {
      // Three independent sources converge on a sustained pattern of concealed self-control under serious illness across different periods: his own 1894 letters document hiding hemorrhaging from his family ('Don't tell Masha and Mother') while continuing his medical and literary work; Kuprin's independent memoir documents that he bore his final illness 'with manly simplicity and patience, without irritation, without complaints, almost in silence'; Bunin's independent memoir separately documents that for 15 years he suffered 'an exhausting illness... but his readers never knew it,' deflecting concern with 'Oh, it's nothing.' Three genuinely distinct authors, separate observations, same sustained pattern.
      discipline: [78, 0.7, "d", "A"],
      // Three independent sources converge on sustained, generous investment in others across different episodes: his own 1900 letters to Gorky document warm, sustained mentorship correspondence sharing his health and creative process candidly; Gorky's own independent memoir documents him gently redirecting an aspiring writer's pretentious philosophizing back toward authentic experience; Kuprin's independent memoir documents him requiring a struggling young writer to work in his own house each morning specifically so he could look after him ('you will write downstairs, and I upstairs... you will have dinner with me').
      collaboration: [68, 0.62, "d", "A"],
      // Two independent sources converge on a documented reserve about his own private process: Kuprin's memoir notes 'nobody ever managed to find him writing: in this respect he was extraordinarily reserved and shy'; Bunin's memoir separately states 'the reserve... never disappeared even when we were most intimate. He was reserved about everything.' Two distinct authors, same underlying temperament, different specific observations.
      autonomy_need: [62, 0.55, "s", "N"],
      // His own 1898 letters document two distinct facts on the Dreyfus Affair: a detailed, morally engaged defense of Dreyfus's dignity against a hostile press and antisemitic reaction, and a considered, independently-reasoned position that a writer's duty is to 'champion even the guilty' rather than align with state power ('Let Dreyfus be guilty, and Zola is still right'). Self-authored only, but two independently-verifiable distinct facts from the same source, meeting this project's single-perspective strong_inference criterion.
      independent_thinking: [66, 0.55, "s", "A"],
      // His own November 1896 letters document two distinct facts around the disastrous premiere of The Seagull: his private devastation and shame at the hostile reception ('vexed and ashamed... if kind-hearted people thought it necessary to comfort me, it meant I was in a bad way'), and his own account of recovering emotional equilibrium specifically after a friend's reassuring letter ('My mind is at rest now, and I can think of the play... without loathing'). Self-authored only, two distinct facts (the reaction and the specific recovery mechanism).
      adaptability: [58, 0.5, "s", "D"],
      // His own 1885-86 letters document two distinct facts about his medical practice: charging modest fees ('three or five roubles') while treating half his patients for free, and personally absorbing significant daily travel costs ('more than a rouble on cabs') to visit patients, often uncompensated. Self-authored only, two distinct facts supporting a genuine other-oriented motivation in his medical work.
      impact_motivation: [64, 0.52, "s", "A"],
      // Two independent sources converge on a specific social skill, from different episodes: Gorky's memoir documents him deflecting three pretentious society ladies' political posturing by redirecting them to a trivial topic (candied fruits), after which 'all three began to talk with vivacity'; Kuprin's memoir separately documents his extraordinary patience managing 'constant rings on the telephone' and a perpetual stream of visitors seeking favors, including one who faked needing a medical consultation solely for an autograph.
      social_assertiveness: [58, 0.52, "s", "A"],
      // His own letters document defending his story 'Mire' against Madame Kiselyov's charge of moral degradation, arguing 'a writer is not a confectioner... he must conquer his squeamishness' and refusing to sanitize human experience for readers' comfort. Single self-authored episode, hence inference.
      conflict_tolerance: [60, 0.4, "i", "A"],
      // The same defense of 'Mire' also documents him explicitly framing his own working method as objective and clinical, comparing a writer to 'a chemist' who must remain dispassionate about his subject matter rather than moralize — a distinct dimension (method) from the conflict_tolerance row above (willingness to defend the position against criticism), though drawn from the same underlying quote, disclosed transparently. Single episode, hence inference.
      analytical_rigor: [58, 0.35, "i", "A"],
      // His own letters document self-initiated civic work near Melihovo beyond his medical/literary work: elected to the Zemstvo, active in the local cholera campaign, and personally responsible for building a road from the Lopasnya station and schools at three named villages. Single self-authored account, hence inference.
      proactive_agency: [60, 0.35, "i", "A"],
      // His own 1886 letter to his troubled brother Nikolay delivers structured, frank moral advice (respect for others' personhood, honoring debts, sincerity) rather than a vague scolding — a specific persuasive attempt to change his brother's conduct. Single self-authored episode, hence inference.
      persuasiveness: [58, 0.32, "i", "A"],
      // Bunin's independent memoir quotes his own stern maxim to an aspiring writer: 'One must work... without sparing oneself... all one's life.' A single independent source's quoted statement, hence inference despite being non-self-authored.
      persistence: [62, 0.3, "i", "A"],
      // Bunin's independent memoir separately quotes his specific craft advice to the same aspiring writer: 'When one has written a story one ought to strike out both the beginning and the end. That is where we novelists are most inclined to lie.' A distinct fact from the persistence row above (specific editorial method vs. general work ethic), from the same source, hence still inference-level given it is a single quoted instance.
      detail_orientation: [56, 0.3, "i", "A"],
      // His own letters document that Grigorovich's 1886 encouragement transformed his approach to writing, from admittedly careless ('mechanically, half-unconsciously... in the bathing-shed') to serious craft. Single self-authored episode, hence inference.
      belief_updating: [60, 0.3, "i", "A"],
    },
  },
  {
    id: "p_giuseppe_garibaldi",
    slug: "giuseppe-garibaldi",
    canonicalName: "Giuseppe Garibaldi",
    birthYear: 1807,
    deathYear: 1882,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["IT"],
    regionCode: "southern_europe",
    occupationIds: ["military_leader", "political_leader"],
    fieldIds: ["military", "politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "overcame_adversity"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q539" },
    portrait: {
      url: "/portraits/giuseppe-garibaldi-alinari-1866.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (PD-old, life+100 or fewer; also PD in the US as published before January 1, 1931)",
      width: 1307,
      height: 1600,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Garibaldi_(1866).jpg",
      attribution: "Fratelli Alinari, c. 1866-67 — Archivi Alinari, Firenze",
      kind: "likeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_gg_autobiography", kind: "archive", title: "Giuseppe Garibaldi, Autobiography of Giuseppe Garibaldi (English translation, Google Books scan) — his own memoir, covering childhood through the 1870s", url: "https://archive.org/stream/autobiographygi00garigoog/autobiographygi00garigoog_djvu.txt" }, { id: "src_gg_dwight", kind: "archive", title: "Theodore Dwight (trans./ed.), The Life of General Garibaldi — the first ~210 pages are a literal translation of Garibaldi's own private manuscript (same self-perspective as the Autobiography, an earlier/different translation); a distinct provenance is NOT claimed for this source beyond Garibaldi's own voice", url: "https://www.gutenberg.org/files/50544/50544-h/50544-h.htm" }, { id: "src_gg_trevelyan_rome", kind: "biography", title: "G. M. Trevelyan, Garibaldi's Defence of the Roman Republic (1907) — independent scholarly biography, first volume of his Garibaldi trilogy", url: "https://archive.org/stream/garibaldisde00trev/garibaldisde00trev_djvu.txt" }, { id: "src_gg_trevelyan_making", kind: "biography", title: "G. M. Trevelyan, Garibaldi and the Making of Italy (1911) — independent scholarly biography, third volume of his Garibaldi trilogy, covering the 1860 campaign and the Teano meeting with Victor Emmanuel", url: "https://archive.org/stream/garibaldimakingo00trevuoft/garibaldimakingo00trevuoft_djvu.txt" }, { id: "src_gg_fuller", kind: "archive", title: "Margaret Fuller, At Home and Abroad (1856) — her own eyewitness dispatches as an American journalist present in Rome during the 1849 siege, an independent contemporaneous witness to Garibaldi's conduct", url: "https://www.gutenberg.org/files/16327/16327-h/16327-h.htm" }, { id: "src_gg_wikipedia", kind: "wikipedia", title: "Giuseppe Garibaldi", url: "https://en.wikipedia.org/wiki/Giuseppe_Garibaldi" }],
    rows: {
      // Three genuinely independent, actually-read sources converge on separate episodes across his whole life: his own autobiography documents jumping into a ditch to save a drowning woman without hesitation and personally fighting off ~150 attackers with 13 men at Charginada; Trevelyan's independent scholarly biography credits him with 'courage and endurance without limit'; Margaret Fuller's own eyewitness dispatches document that he deliberately wore a highly visible red tunic marking him as an enemy target throughout his career ('he has always done it'), and led his men out of Rome in 1849 without a guarantee of safe passage from the besieging French. Central to how he is understood historically, hence the high score; dual_edged because this same trait produced repeated wounds and, at Aspromonte, a catastrophic clash with his own government's army.
      risk_tolerance: [85, 0.75, "d", "D"],
      // Three independent sources converge on separate episodes: his own autobiography documents rallying 13 men to hold off ~150 attackers at Charginada; Trevelyan's independent biography credits him with filling men 'with ardour by his presence' and stirring them 'by his voice to great deeds' rather than through formal training; Margaret Fuller's own eyewitness account documents that men from other regiments defected specifically to follow him during the 1849 retreat, 'captivated' by his courage, with no promise of safety.
      leadership_drive: [80, 0.72, "d", "A"],
      // Two independent sources converge on the same real-world outcome from different angles: Trevelyan's biography attributes his charismatic pull to presence and voice rather than method; Margaret Fuller's own eyewitness dispatch documents the concrete behavioral result — soldiers from separate regiments actually leaving their own units to join his column during the fall of Rome.
      persuasiveness: [70, 0.62, "d", "A"],
      // Three independent sources converge on separate episodes: his own autobiography documents ordering an immediate change of position to defensible high ground when his own government's army attacked him at Aspromonte in 1862; Trevelyan's biography characterizes his decision-making as driven by 'passion' rather than calculation, his 'native hue of resolution' never 'sicklied o'er with the pale cast of thought'; Margaret Fuller's eyewitness account documents him calmly surveying the only viable escape route with a spy-glass before choosing it, amid the final collapse of Rome. Dual_edged because Trevelyan explicitly frames the same trait as a documented weakness (insufficient calculation) alongside its clear operational value.
      decisiveness: [76, 0.68, "d", "D"],
      // Two independent sources converge on a sustained pattern across different life periods: his own autobiography documents open strategic disagreement with Mazzini (believing he lacked 'practical capacity' in warfare), resentment at being placed under Rosselli's command, and — most starkly — personally leading his volunteers into a defensive position when attacked by his own newly-unified Italian government's army at Aspromonte in 1862, being treated 'as if we had been brigands'; Trevelyan's independent biography separately documents 'bitter quarrels' that repeatedly divided him from Mazzini despite their ideological alignment. Dual_edged: sustained his independence, but also fractured alliances he needed.
      conflict_tolerance: [64, 0.58, "d", "D"],
      // Two independent sources converge: his own autobiography documents that desertions among his officers caused him more distress than enemy action, revealing how deeply he measured his own experience by the cause's progress rather than personal safety; Trevelyan's independent biography quotes him responding to a companion's (Bandi's) complaint about irregular pay during the 1860 campaign with 'What do you want with pay? When a patriot has eaten his bowl of soup and when the affairs of the country are going well, what more can any one want?' — a directly quoted statement valuing the collective cause over personal material reward.
      impact_motivation: [68, 0.55, "s", "A"],
      // Two independent sources converge on separate episodes: his own autobiography documents resenting subordination to Rosselli's command despite believing his own judgment was sound; Margaret Fuller's own eyewitness account documents that he led his column out of Rome in 1849 after Oudinot explicitly refused to guarantee his safe departure — proceeding on his own judgment rather than waiting for terms.
      autonomy_need: [66, 0.52, "s", "A"],
      // Two independent sources converge on a caring, relationally-invested pattern, from different episodes: his own autobiography documents that his partner Anita insisted on accompanying him through a life-threatening 1849 retreat despite his objections, and that the loss of officers (Masina, Manara, Mameli) grieved him more than any tactical setback; Margaret Fuller's own eyewitness account independently documents that when his best officers (including Manara) died at the Janiculum in the final defense of Rome, he personally went to tell the Assembly further resistance was futile — corroborating the same underlying bond with his men from an outside witness, not merely his own telling of it.
      collaboration: [60, 0.52, "s", "A"],
      // His own autobiography documents two distinct, dated instances of holding to his own judgment against allied pressure: disagreeing with Mazzini's military strategy regarding the Naples campaign, and — during the 1867 Mentana campaign — recognizing and crediting Mazzini's own private admission of doubt (quoted directly in a letter dated Feb. 11, 1870) while still distinguishing that honesty from the recklessness of Mazzini's followers, who caused mass desertion. Self-authored only (not independently corroborated by Trevelyan or Fuller for these specific episodes), so kept at strong_inference rather than documented, per this project's confidence-band discipline.
      independent_thinking: [62, 0.5, "s", "A"],
      // His own autobiography documents that after being rejected for shipboard work during his American exile, he 'swallowed my vexation, and returned to work at the tallow' rather than abandoning the effort to rebuild his livelihood. A single self-authored episode, not independently corroborated this cycle, hence inference-level.
      persistence: [60, 0.35, "i", "A"],
      // His own autobiography documents jumping into a ditch to save a drowning woman without being asked or expecting reward — a self-initiated act. This is the same underlying episode used for risk_tolerance; it is scored here as a genuinely distinct dimension (initiative without prompting, rather than acceptance of danger), disclosed transparently rather than treated as fresh corroboration, hence capped at inference given it rests on one shared episode.
      proactive_agency: [58, 0.32, "i", "A"],
      // His own autobiography documents that despite a lifelong republican, anti-monarchist orientation, he readily accepted Cavour's 1859 summons to ally with the Sardinian monarchy for the war on Austria ('certainly found me very ready to fall in with his idea') — a specific, self-authored instance of revising a prior political commitment when it served the larger unification goal. Single episode, not independently corroborated, hence inference.
      belief_updating: [56, 0.32, "i", "A"],
      // His own autobiography documents a five-year period (1854-1859) voluntarily spent in quiet retirement cultivating a small property on Caprera after decades of continuous military/political activity, followed by an immediate return to active political life once summoned. A single self-authored account of this life-period transition, not independently corroborated, hence inference.
      adaptability: [54, 0.3, "i", "N"],
      // His own autobiography documents that when his volunteers were cut off and starving at Aspromonte in 1862, they collected and ate unripe potatoes raw at first, then baked once time allowed — a specific, self-authored account of practical improvisation under acute physical constraint. Single episode, inference-level.
      resourcefulness: [56, 0.3, "i", "A"],
      // Trevelyan's independent biography reproduces a direct quote (via his companion Jessie White Mario's own account, cited within Trevelyan's text) of Garibaldi's reaction on learning, immediately after the 1860 Teano meeting, that Victor Emmanuel's royal army was taking over all further military operations and his volunteers were no longer required: 'melancholy sweetness,' then a wry, undramatic remark to Mario ('they have sent us to the rear') rather than protest. A single source (Trevelyan, containing an internally-quoted eyewitness passage — Mario's own book was not itself opened this cycle, so this is not counted as a fourth independent perspective), hence inference-level.
      ambiguity_tolerance: [58, 0.3, "i", "A"],
      // A genuine, honestly-scored weakness, not a strength assumed by halo effect: Trevelyan's independent biography explicitly characterizes him as having a 'child-like simplicity that often degenerated into folly,' suggesting his romantic idealism repeatedly overrode calculated preparation. Single source, hence inference; scored low and impact 'risk' because Trevelyan frames this as a real cost to his effectiveness, not a neutral trait.
      planning_orientation: [30, 0.35, "i", "R"],
      // Another honestly-scored weakness: Trevelyan's independent biography states he received only 'guerilla training,' lacked 'diplomatic or political education,' and 'never understood' the workings of civilized administrative life, though he 'moved it profoundly.' Single source, single fact, hence inference; scored low with impact 'risk' since this documented gap is presented as a real limitation on his later political effectiveness, not scored from occupational stereotype.
      analytical_rigor: [32, 0.32, "i", "R"],
    },
  },
];

export const ROSTER_24: readonly Person[] = seeds.map(build);
