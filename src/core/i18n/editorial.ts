/**
 * Person editorial content — achievements, revealing moments, turning
 * points. Deliberately OUTSIDE the closed `MessageKey`/`t()` system, same
 * precedent as `legal.ts`: long-form narrative prose keyed per person, not
 * a reusable UI atom.
 *
 * `editorialText()` is intentionally NOT `tOptional()`. `tOptional` falls
 * back to English whenever a locale's bundle is missing a key — correct for
 * UI chrome (a missing Korean button label should still show something),
 * but wrong here: an editorial item without a Korean translation must be
 * OMITTED from the Korean page, never rendered untranslated. `editorialText`
 * looks up ONLY the requested locale's own dictionary and returns
 * `undefined` on any miss, with no cross-locale fallback at all (including
 * en-US falling back to itself trivially, since `EN` IS its own dictionary).
 *
 * Keys are free-form strings, namespaced `{slug}.{category}.{n}`
 * (e.g. `"marie-curie.achievement.1"`), never part of the closed
 * `MessageKey` union — the same reason `person.name.{slug}` uses
 * `tOptional` instead of `t()`.
 */
import type { Locale } from "../types.js";

/* eslint-disable */

export const EDITORIAL_EN: Record<string, string> = {
  /* ---------------------------------------------------------- da Vinci */
  "leonardo-da-vinci.achievement.1":
    "Left behind thousands of notebook pages combining anatomical dissection studies, engineering designs, and observations of water and flight — most never published or seen by anyone else in his lifetime.",
  "leonardo-da-vinci.achievement.2":
    "Painted the Mona Lisa and The Last Supper, developing sfumato — soft, smoke-like transitions between tones — as a technical solution to make painted faces read as alive rather than outlined.",
  "leonardo-da-vinci.achievement.3":
    "Performed his own human dissections to study anatomy for his art, producing drawings of muscles, organs, and the heart's structure that anticipated details published medical texts would not catch up to for centuries.",
  "leonardo-da-vinci.moment.1":
    "In an undated letter seeking work from Ludovico Sforza, Duke of Milan, he introduced himself primarily as a military and civil engineer — bridges, armored vehicles, catapults — and mentioned painting only near the end of the letter.",
  "leonardo-da-vinci.moment.2":
    "Carried the Mona Lisa with him for years after it was commissioned, continuing to adjust it rather than delivering a finished work to the person who had paid for it.",
  "leonardo-da-vinci.turning_point.1":
    "Conducted dissections in secret, at hospitals at night, in an era when the practice was legally and religiously fraught — and revised his own earlier anatomical drawings more than once as later dissections contradicted what he had first assumed.",
  "leonardo-da-vinci.interpretation.moment.1":
    "This is consistent with the profile's high opportunity_sensing score: the letter reads the patron's actual priorities rather than leading with the work he is remembered for today — a specific-situation read, not a general claim about what he valued most.",
  "leonardo-da-vinci.interpretation.turning_point.1":
    "This helps explain the profile's moderate belief_updating score: a willingness to revise an established drawing once observation contradicted it, though the surviving evidence for this is closer to a documented pattern of practice than an explicit written reversal.",

  /* ----------------------------------------------------------- M. Curie */
  "marie-curie.achievement.1":
    "The first person to win Nobel Prizes in two different sciences — Physics in 1903 and Chemistry in 1911 — for work that named and established the field of radioactivity.",
  "marie-curie.achievement.2":
    "Discovered the elements polonium and radium, isolating them from tons of raw ore years before either could be produced any other way.",
  "marie-curie.achievement.3":
    "During the First World War, developed mobile X-ray units nicknamed \"petites Curies\" and personally drove them to the front lines to help surgeons locate shrapnel and treat wounded soldiers.",
  "marie-curie.moment.1":
    "Processed several tons of pitchblende ore by hand over roughly four years in a converted shed with a leaking glass roof and no proper ventilation, using improvised equipment, to isolate a fraction of a gram of pure radium.",
  "marie-curie.moment.2":
    "Continued working directly with radioactive material for years without protective measures that were not yet understood to be necessary — her notebooks are still radioactive enough today that they are stored in lead-lined boxes.",
  "marie-curie.turning_point.1":
    "After her husband and research partner Pierre was killed in a street accident in 1906, she took over his professorship at the Sorbonne — becoming its first female professor — and continued the research programme alone rather than stepping back from it.",
  "marie-curie.interpretation.moment.1":
    "This is consistent with the profile's very high discipline and persistence scores — years of unglamorous, physically demanding labor with no guarantee the ore would yield anything at all.",
  "marie-curie.interpretation.turning_point.1":
    "This helps explain the profile's high autonomy_need score: choosing to carry a shared research program forward alone, in public, rather than let it end with her collaborator.",

  /* ---------------------------------------------------------- A. Lovelace */
  "ada-lovelace.achievement.1":
    "Her 1843 \"Notes\" on Charles Babbage's proposed Analytical Engine include what is widely considered the first published algorithm written for a machine — a method for computing Bernoulli numbers.",
  "ada-lovelace.achievement.2":
    "Recognized that the Analytical Engine could operate on more than numbers — she wrote that it could, in principle, compose music — a conceptual leap toward general-purpose computing that went beyond how Babbage himself described his own invention.",
  "ada-lovelace.moment.1":
    "She was assigned to translate a French academic's article about the Analytical Engine into English; her own appended \"Notes\" ended up roughly three times longer than the original article, turning a translation task into original analysis.",
  "ada-lovelace.moment.2":
    "As a teenager, she was steered toward rigorous study of mathematics and science by her mother, partly as a deliberate counterweight to the volatile temperament of her father, the poet Lord Byron, whom she never knew.",
  "ada-lovelace.turning_point.1":
    "Meeting Charles Babbage as a seventeen-year-old and seeing his prototype Difference Engine set the direction of the mathematical work she pursued for the rest of her short life — work she returned to a decade later, when a routine translation assignment about Babbage's newer Analytical Engine became the occasion for her own extensive, original \"Notes.\"",
  "ada-lovelace.interpretation.achievement.2":
    "This shows the profile's high opportunity_sensing score in practice: noticing an implication of someone else's machine that its own inventor had not emphasized.",

  /* ----------------------------------------------------------- Yi Sun-sin */
  "yi-sun-sin.achievement.1":
    "Pushed for turtle-ship construction and coastal naval defenses in the years before Japan's 1592 invasion of Korea, while much of the wider Joseon court remained unprepared for the threat.",
  "yi-sun-sin.achievement.2":
    "Did not lose a single naval engagement across the seven-year Imjin War (1592–1598), commanding the Joseon navy against a much larger and better-resourced Japanese fleet.",
  "yi-sun-sin.achievement.3":
    "At the 1597 Battle of Myeongnyang, defeated a Japanese fleet of more than 100 ships using as few as 12–13 remaining ships, exploiting the strait's narrow currents rather than confronting the fleet head-on.",
  "yi-sun-sin.moment.1":
    "Kept a war diary, the Nanjung Ilgi, in his own hand throughout the campaigns — a rare surviving first-person account for a military commander of this era, rather than a version reconstructed later by others.",
  "yi-sun-sin.turning_point.1":
    "Acted on his own tactical judgment against a specific court order he assessed as a trap, and was demoted, imprisoned, and tortured for it. His replacement lost most of the fleet soon after; Yi was reinstated with what remained and went on to win Myeongnyang.",
  "yi-sun-sin.interpretation.turning_point.1":
    "This reflects the tension in the profile's dual-edged proactive_agency score: acting on his own tactical judgment against a direct court order carried a severe, immediate personal cost. The Myeongnyang victory that followed his reinstatement came from tactical skill with a nearly destroyed fleet, not from a further act of defiance — but it was the fleet's near-total loss under his replacement that ultimately vindicated the original judgment he had been punished for.",
  "yi-sun-sin.interpretation.achievement.3":
    "This offers one example of the profile's very high resourcefulness score: making decisive use of severely limited material means rather than waiting for reinforcement that was not coming.",

  /* ------------------------------------------------------------ F. Kahlo */
  "frida-kahlo.achievement.1":
    "Developed a distinctive painting style blending Mexican folk-art traditions with symbolic, often unflinching self-portraiture exploring pain, identity, and the body — work that only reached wide international recognition well after her death.",
  "frida-kahlo.moment.1":
    "After a near-fatal bus accident in 1925 left her bedridden for months, she began painting lying on her back using a specially mounted mirror and an easel her mother had arranged over the bed.",
  "frida-kahlo.moment.2":
    "Biographical accounts describe her, as an unknown young artist, approaching the already-famous muralist Diego Rivera directly and unprompted to ask for his honest opinion of her paintings.",
  "frida-kahlo.turning_point.1":
    "The 1925 accident, and the many operations and long convalescences that followed for the rest of her life, redirected her from an earlier ambition toward medicine into painting as her primary occupation.",
  "frida-kahlo.interpretation.moment.1":
    "This is a clear instance of the profile's high resourcefulness score: continuing creative work under a severe physical constraint by improvising the equipment that made it possible, rather than waiting for the constraint to lift.",

  /* --------------------------------------------------------- N. Mandela */
  "nelson-mandela.achievement.1":
    "Led the anti-apartheid movement, was imprisoned for 27 years — most of it on Robben Island — and became South Africa's first Black president in 1994 following a negotiated end to apartheid.",
  "nelson-mandela.achievement.2":
    "As president, established the Truth and Reconciliation Commission rather than pursuing retribution against the former apartheid government, choosing public accounting over prosecution as the country's primary transitional mechanism.",
  "nelson-mandela.moment.1":
    "On Robben Island, organized informal prisoner education using smuggled books and improvised study groups, turning the prison itself into what other inmates later called \"the university.\"",
  "nelson-mandela.moment.2":
    "Initiated secret negotiations with the apartheid government from within prison, at first without his own movement's full knowledge or authorization.",
  "nelson-mandela.turning_point.1":
    "After his release in 1990, chose to pursue negotiation over continued armed struggle — a controversial position within parts of his own movement at the time, and the path that led to the 1994 election.",
  "nelson-mandela.interpretation.moment.2":
    "This sits alongside the profile's dual-edged proactive_agency score: the same self-initiated act that later helped end apartheid carried real risk of being disowned by his own movement if it had gone differently.",
  "nelson-mandela.interpretation.moment.1":
    "This reflects the profile's high resourcefulness score: building a functioning institution out of almost nothing, inside conditions designed to prevent exactly that.",

  /* ---------------------------------------------------------- Einstein */
  "albert-einstein.achievement.1":
    "In 1905 — his \"miracle year\" — published four separate groundbreaking papers (special relativity, the photoelectric effect, Brownian motion, and mass–energy equivalence) in his own time while working full-time as a Swiss patent clerk, outside any university position.",
  "albert-einstein.achievement.2":
    "Developed general relativity over roughly a decade of iterative work, including multiple approaches he tried and abandoned before reaching the final 1915 field equations.",
  "albert-einstein.achievement.3":
    "In 1939, without being asked by any government body, signed a letter — drafted with physicist Leó Szilárd and sent to President Roosevelt — warning of the military potential of nuclear fission, lending it his authority; historians credit the letter with directly contributing to the decision to launch the Manhattan Project.",
  "albert-einstein.moment.1":
    "As a child, he was struck by the fact that a compass needle always pointed the same direction no matter how the compass was turned — an experience he himself repeatedly credited, later in life, as an early spark of his scientific curiosity.",
  "albert-einstein.turning_point.1":
    "Despite having helped found quantum theory himself — his 1905 light-quantum hypothesis and his 1924–25 work with Bose on quantum statistics were both foundational — he never accepted quantum mechanics' later probabilistic account of nature as complete, summarizing his objection as \"God does not play dice.\" He spent his last several decades pursuing an unsuccessful unified field theory, well after his reputation was already secure, while the mainstream of physics moved past the debate without him.",
  "albert-einstein.interpretation.turning_point.1":
    "This is consistent with the profile's low belief_updating score: the same conviction that let him defend a genuinely new theory against early skeptics also meant he never revised his view that quantum mechanics was incomplete — even though his own objections, especially the 1935 EPR paper he co-authored, became a foundational and still-influential part of the very field he continued to resist.",

  /* -------------------------------------------------------- Joan of Arc */
  "joan-of-arc.achievement.1":
    "As an unknown teenage peasant with no rank or family standing, convinced the Dauphin's court to grant her troops and equipment, and helped lift the English siege of Orléans in 1429.",
  "joan-of-arc.achievement.2":
    "Led French forces on the campaign that culminated in the Dauphin's coronation as Charles VII at Reims — the goal she had stated from the outset.",
  "joan-of-arc.moment.1":
    "When the Dauphin tried to test her by disguising himself among his courtiers and putting someone else on the throne, she identified him correctly and unprompted — an episode multiple witnesses who had been present described in testimony gathered at her 1455–56 Nullification Trial, a quarter-century after the fact.",
  "joan-of-arc.moment.2":
    "Wounded by a crossbow bolt during the assault on Orléans, she returned to the fighting after treatment rather than withdrawing from the field.",
  "joan-of-arc.moment.3":
    "At her trial, she sustained weeks of hostile theological interrogation by trained clergy without breaking — one of the few surviving cases of a medieval individual's own recorded first-person testimony, rather than a later reconstruction.",
  "joan-of-arc.turning_point.1":
    "She continued wearing male soldiers' clothing against direct clerical instruction to stop — a choice the trial record shows her defending as her own, repeated decision, and one of the central charges that led to her execution.",
  "joan-of-arc.interpretation.turning_point.1":
    "This illustrates the profile's dual-edged independent_thinking score: the same resistance to pressure to conform that let her withstand weeks of interrogation without breaking also showed up, in a different form, as the specific charge used to convict her.",

  /* ----------------------------------------------------------- Atatürk */
  "mustafa-kemal-ataturk.achievement.1":
    "As a relatively junior officer at Gallipoli in 1915, personally identified the strategic ridge Allied forces were advancing toward and committed an outnumbered regiment to hold it immediately: \"I do not order you to attack, I order you to die.\" The position held.",
  "mustafa-kemal-ataturk.achievement.2":
    "Led the Turkish National Movement after the First World War and founded the Republic of Turkey in 1923, then carried out sweeping legal and secularizing reforms in the years that followed.",
  "mustafa-kemal-ataturk.moment.1":
    "At Chunuk Bair in 1915, shrapnel struck his chest directly over his pocket watch, shattering it but sparing him serious injury; when an aide cried out in alarm believing him hit, he covered the aide's mouth with his own hand and said only, \"No such thing.\"",
  "mustafa-kemal-ataturk.moment.2":
    "In 1919, used an official Ottoman government assignment to disarm and demobilize remaining Anatolian forces as the platform to instead begin organizing national resistance — the opposite of what the assignment was for.",
  "mustafa-kemal-ataturk.turning_point.1":
    "After founding the Republic, he closed the country's only organized opposition party in 1925, and an Independence Tribunal — established that same year — executed dozens of people, including the leader of the Sheikh Said rebellion, within days of sentencing.",
  "mustafa-kemal-ataturk.interpretation.turning_point.1":
    "The Great Inside reads this as a contrast rather than a single throughline: the same decisiveness and conflict_tolerance the profile scores highly for his conduct at Gallipoli are also visible in how quickly and forcefully he moved against domestic political opposition years later. The shift from battlefield command to suppressing a nascent multi-party opposition involved state-building pressures, security concerns after the rebellion, and specific political calculation well beyond any one personal disposition — this profile does not claim his decisiveness alone explains it, only that the same trait is legible in both moments.",

  /* ---------------------------------------------------------- A. Pavlova */
  "anna-pavlova.achievement.1":
    "Rejected at her first audition to the Imperial Ballet School for being too young and physically frail, she was accepted a year later and rose to become the company's prima ballerina.",
  "anna-pavlova.achievement.2":
    "Left the security of the Imperial Ballet in 1913 to found and personally lead an independent touring company for roughly eighteen years, performing across six continents including many venues with no prior history of Western theatrical dance.",
  "anna-pavlova.achievement.3":
    "Devised a practical modification to her own pointe shoes to solve a recurring foot problem — an innovation that went on to influence standard pointe-shoe construction more broadly.",
  "anna-pavlova.moment.1":
    "Kept a pet swan and personally studied its real movements over time specifically to make her performance of her signature role, The Dying Swan, more authentic.",
  "anna-pavlova.moment.2":
    "In 1912, during a curtain call, she slapped her dance partner because she believed he was receiving more of the audience's applause than she was — despite the pair having shared a major professional triumph together not long before.",
  "anna-pavlova.turning_point.1":
    "Facing a diagnosis that survival required an operation that would end her ability to ever dance again, she refused the surgery, saying: \"If I can't dance, I'd rather be dead.\"",
  "anna-pavlova.interpretation.moment.2":
    "This is one expression of the profile's dual-edged competitiveness score: an intensity about her own standing that, in this moment, showed up as open jealousy toward a close collaborator rather than channeling into her performance.",
  "anna-pavlova.interpretation.turning_point.1":
    "This helps explain the profile's high risk_tolerance score, scored dual-edged for exactly this kind of moment — a willingness to accept the largest possible stakes rather than compromise on what mattered most to her.",

  /* ------------------------------------------------- Tier-B backfill batch 1 */

  /* ---------------------------------------------------------- I. Newton */
  "isaac-newton.achievement.1":
    "During the plague closures of 1665–1667, working alone at his family home in Woolsthorpe rather than at Cambridge, he laid the mathematical and experimental foundations of calculus, his theory of colors, and early gravitational theory — years before any of it reached print.",
  "isaac-newton.achievement.2":
    "Principia Mathematica (1687) unified terrestrial and celestial motion under a single law of gravitation, built axiomatically from a small set of definitions and laws of motion up through their derived consequences.",
  "isaac-newton.achievement.3":
    "Served as President of the Royal Society for 24 years (1703–1727) while also serving as Master of the Royal Mint — two sustained, demanding institutional leadership roles held simultaneously rather than in sequence.",
  "isaac-newton.moment.1":
    "To get around the chromatic-aberration problem that limited existing refracting telescopes, he designed and built his own reflecting telescope — a specific technical workaround rather than a wait for someone else to solve it.",
  "isaac-newton.moment.2":
    "When his priority dispute with Gottfried Leibniz over the invention of calculus reached the Royal Society, Newton anonymously chaired the Society's own committee investigating the claim — and it ruled in his favor.",
  "isaac-newton.turning_point.1":
    "In his mid-fifties, after roughly three decades as a reclusive Cambridge scholar, he accepted the Wardenship — and later Mastership — of the Royal Mint, moving to London to take on an administrative and law-enforcement role in an entirely different domain from his prior life, where by documented account he proved highly effective, personally investigating counterfeiters.",
  "isaac-newton.interpretation.moment.1":
    "This is consistent with the profile's resourcefulness score: solving an instrument-level problem himself rather than working within the limits of the equipment already available.",
  "isaac-newton.interpretation.moment.2":
    "This sits alongside the profile's very low collaboration score and high competitiveness score: settling a credit dispute by controlling the body meant to settle it impartially, rather than through open co-authorship or concession.",
  "isaac-newton.interpretation.turning_point.1":
    "The Great Inside reads this alongside the profile's much lower belief_updating score, not against it: adjusting to a demanding new institutional role is a different kind of change from revising an established theoretical conviction, and this profile treats the two as separate rather than in tension.",

  /* ---------------------------------------------------------- H. Tubman */
  "harriet-tubman.achievement.1":
    "Between roughly 1850 and 1860, personally returned to slave-holding territory about thirteen times, leading approximately seventy enslaved people to freedom along the Underground Railroad — every documented mission completed without a single person lost.",
  "harriet-tubman.achievement.2":
    "In June 1863, planned and led the Combahee Ferry Raid, which freed more than 700 enslaved people — documented as the first US military operation of the Civil War planned and led by a woman.",
  "harriet-tubman.moment.1":
    "She carried a pistol on her rescue missions, and multiple independent accounts describe her as prepared to use its threat against escaping people who wanted to turn back partway — because one person turning back risked exposing the entire group to slave catchers.",
  "harriet-tubman.moment.2":
    "She approached Union Army command directly to propose serving as an armed scout and spy — an unprecedented role for a woman, let alone a formerly enslaved woman — and the Army granted it, a position that led directly to her planning the Combahee raid.",
  "harriet-tubman.turning_point.1":
    "Her own escape from slavery in 1849 was solo, with no plan to return for anyone else. Within about a year she began going back into the same territory to lead others out, beginning a sustained pattern of missions that continued for the next decade.",
  "harriet-tubman.interpretation.moment.1":
    "This is consistent with the profile's conflict_tolerance score: a willingness to force a hard choice when the group's safety was at stake, not a general account of her temperament.",
  "harriet-tubman.interpretation.moment.2":
    "This helps explain the profile's very high proactive_agency score: creating an institutional opportunity for herself rather than waiting for one to be offered.",

  /* ---------------------------------------------------------- Wu Zetian */
  "wu-zetian.achievement.1":
    "Rose from a minor concubine position in Emperor Taizong's court to become the only woman in Chinese history to rule as emperor in her own name, founding her own Zhou dynasty in 690 and ruling directly until 705.",
  "wu-zetian.achievement.2":
    "Instituted the practice of ruling from behind a curtain specifically to work around court protocol that formally barred women from directly holding court — a procedural workaround that let her exercise real power despite a structural barrier with no established precedent to follow.",
  "wu-zetian.achievement.3":
    "In the years before her formal accession in 690, sponsored a reinterpreted Buddhist text prophesying a female ruler as a bodhisattva's incarnation, and had temples built empire-wide to spread the narrative — a sustained campaign of political legitimation with no precedent in Chinese imperial history to draw on.",
  "wu-zetian.moment.1":
    "She appointed Shangguan Wan'er — whose family Wu Zetian had previously had destroyed — to chief drafter of imperial edicts, one of the most sensitive positions at court.",
  "wu-zetian.moment.2":
    "She restructured mourning-ritual and ancestor-worship codes to require female ancestors be honored alongside male ones, and mourning periods for mothers to match those for fathers — changing the ritual and legal treatment of gender within the imperial system, not only exercising power within it unchanged.",
  "wu-zetian.turning_point.1":
    "Rather than continuing to rule only as regent for a male heir — the path traditionally available to a powerful court widow or mother — she formally founded her own dynasty and took the title of emperor herself in 690, a departure with no precedent to follow in Chinese history.",
  "wu-zetian.interpretation.moment.1":
    "This reflects the profile's adaptability score: a specific, pragmatic personnel decision that prioritized present political usefulness over past personal enmity, not a general claim about how she treated rivals.",
  "wu-zetian.interpretation.turning_point.1":
    "This helps explain the profile's autonomy_need score: choosing an unprecedented formal title over continuing to exercise the same real power through an existing, more conventional role.",

  /* ------------------------------------------------------------ Averroes */
  "averroes.achievement.1":
    "Produced systematic short, middle, and long commentaries on nearly the entire surviving corpus of Aristotle over roughly three decades — a body of work that later shaped how Aristotle was read in medieval Europe as much as in the Islamic world.",
  "averroes.achievement.2":
    "Wrote The Incoherence of the Incoherence, a direct, sustained rebuttal of the influential philosopher al-Ghazali's earlier critique of philosophy itself — engaging the leading contemporary challenge head-on rather than working around it.",
  "averroes.achievement.3":
    "Served simultaneously as a qadi — first in Seville, later chief qadi of Córdoba — and as a royal physician, while continuing his philosophical commentary project across a career combining serious professional practice in more than one demanding field.",
  "averroes.moment.1":
    "He was introduced to the Almohad Caliph Abu Yaqub Yusuf by the philosopher Ibn Tufail, who then personally commissioned Averroes's systematic Aristotle commentaries — the project that became his major life's work began under another scholar's referral and a ruler's patronage, not from isolated independent initiative.",
  "averroes.turning_point.1":
    "Late in his life, under Almohad authority, his philosophical works were formally condemned and burned and he was briefly exiled — following decades in which the same rulers had themselves commissioned and supported his commentary project. By most accounts he continued philosophical work in the time that remained to him rather than recanting the positions that had drawn the condemnation.",
  "averroes.interpretation.turning_point.1":
    "This is consistent with the profile's persistence score: continuing a body of work despite institutional retaliation against it, though the surviving record does not document how he personally regarded the reversal at the time.",

  /* -------------------------------------------------------- Julius Caesar */
  "julius-caesar.achievement.1":
    "In 49 BCE, crossed the Rubicon river into Italy at the head of his legion — an act illegal for a Roman general under arms and irreversible once taken, reportedly declaring \"alea iacta est\" (\"the die is cast\") — triggering the civil war that ended the Republic's existing political order.",
  "julius-caesar.achievement.2":
    "As dictator, replaced Rome's lunar calendar with a solar, 365.25-day calendar — the Julian calendar remained in use, with only minor later adjustment, for more than 1,500 years.",
  "julius-caesar.achievement.3":
    "Coordinated a multi-year military campaign across Gaul, managing supply lines, allied-tribe diplomacy, and seasonal timing across roughly eight years of continuous warfare, documented in detail in his own Commentarii de Bello Gallico.",
  "julius-caesar.moment.1":
    "As a young man, he was captured and held for ransom by pirates. Suetonius records that he considered the ransom demanded for him insultingly low and, after his release, personally raised a fleet, hunted down his former captors, and had them executed.",
  "julius-caesar.moment.2":
    "Suetonius quotes his own reported dispatch after the swift Battle of Zela — \"veni, vidi, vici\" (\"I came, I saw, I conquered\") — a tempo consistent with the compressed campaign timelines described throughout his own Commentarii.",
  "julius-caesar.turning_point.1":
    "For years, he maintained the First Triumvirate — an informal power-sharing alliance with Pompey and Crassus that had helped secure him the Gaul command — before it broke down into the civil war triggered by the Rubicon crossing, ending in conflict with the same ally who had once shared power with him.",
  "julius-caesar.interpretation.turning_point.1":
    "This lines up with the profile's moderate — not high — collaboration score: a real, sustained alliance that nonetheless ultimately failed, not a case of stable, ongoing cooperative partnership.",

  /* ----------------------------------------------------------- J. Austen */
  "jane-austen.achievement.1":
    "Literary scholarship widely credits her with an early, sustained use of free indirect discourse — narrating through a character's internal perspective without switching into the first person — a technique later foundational to the novel form.",
  "jane-austen.achievement.2":
    "Published all six of her novels anonymously, as \"By a Lady,\" and by her family's and biographers' account deliberately avoided seeking public literary fame during her lifetime — wide recognition came only after her death.",
  "jane-austen.moment.1":
    "In December 1802, she accepted a marriage proposal from Harris Bigg-Wither — a match that would have secured her family's financial position — then withdrew her acceptance the following morning.",
  "jane-austen.moment.2":
    "She corresponded regularly with her sister Cassandra throughout her writing career, exchanging detailed feedback on drafts — a sustained editorial relationship documented across her surviving letters.",
  "jane-austen.turning_point.1":
    "An early manuscript that eventually became Pride and Prejudice was reportedly rejected by a publisher without being read in 1797. She continued revising it and pursuing publication over the next sixteen years rather than abandoning it, and it became her best-known novel.",
  "jane-austen.interpretation.moment.1":
    "Biographers read this as motivated substantially by a wish to preserve her own independence, though her family's financial circumstances complicate a purely autonomy-driven reading — this profile treats it as one plausible factor among several, not the whole explanation.",

  /* --------------------------------------------------------- B. Juárez */
  "benito-juarez.achievement.1":
    "Born to a poor Zapotec family and orphaned young, he did not learn Spanish until around age twelve — and went on to train as a lawyer, serve as a state governor, and become Mexico's first Indigenous president.",
  "benito-juarez.achievement.2":
    "Led a Liberal government that continued operating and relocating under military pressure throughout the French intervention (1862–1867) rather than accepting exile or surrender, maintaining a functioning claim to legitimate government even without a fixed capital for years at a time.",
  "benito-juarez.achievement.3":
    "Championed the La Reforma laws — separating church and state, redistributing land, and establishing civil registry of births, marriages, and deaths — restructuring the legal basis of Mexican governance during his presidency.",
  "benito-juarez.moment.1":
    "After the Republic's victory over the French-backed empire, he insisted that captured Emperor Maximilian I receive a formal court-martial trial rather than summary execution, even while the country was still recovering from years of war.",
  "benito-juarez.turning_point.1":
    "Following the trial, he ordered Maximilian's execution despite extensive international pressure for clemency from the United States and European governments — a decision that closed off any negotiated restoration of the empire and set the terms on which the Republic was re-established.",
  "benito-juarez.interpretation.moment.1":
    "This tracks the profile's discipline score: a documented commitment to formal legal process even against a defeated adversary and even under pressure to act faster.",

  /* ------------------------------------------------------ E. Shackleton */
  "ernest-shackleton.achievement.1":
    "Led the 1914–1917 Imperial Trans-Antarctic Expedition, keeping all 28 crew members alive for nearly two years after their ship, Endurance, was crushed by pack ice and sank — a sustained survival effort with zero fatalities, corroborated by multiple crew members' own diaries.",
  "ernest-shackleton.achievement.2":
    "With five companions, undertook an 800-mile open-boat journey across the Southern Ocean to South Georgia to seek rescue — navigating without standard instruments to reach a small island target across open water, rather than waiting with the main party for a rescue that was not coming.",
  "ernest-shackleton.moment.1":
    "On an earlier expedition in 1909, he turned back only 97 miles from the South Pole — closer than any previous expedition had reached — judging the remaining distance too dangerous for his team's survival.",
  "ernest-shackleton.moment.2":
    "Alfred Lansing's account of the ice-camp period describes Shackleton deliberately keeping a crew member who was reportedly more openly critical of him in closer physical proximity — managing potential dissent directly rather than avoiding the tension.",
  "ernest-shackleton.turning_point.1":
    "The expedition's original goal — an overland crossing of Antarctica — became entirely impossible once Endurance was crushed and sank. What followed was an improvised, nearly two-year survival operation built and adjusted in response to changing conditions as they occurred, with no advance plan for any of it.",
  "ernest-shackleton.interpretation.moment.1":
    "The Great Inside reads this alongside the 800-mile boat journey seven years later as two data points about the same risk_tolerance score, not one fixed disposition: real willingness to accept extraordinary personal risk when the goal was survival itself, paired with an earlier readiness to give up a historic prize rather than gamble with his team's lives.",
  "ernest-shackleton.interpretation.turning_point.1":
    "Both the profile's high adaptability score and its more moderate planning_orientation score fit this moment: the plan that mattered here was not the original one, but the sequence of adjustments made after it failed.",

  /* ------------------------------------------------------- W. Soyinka */
  "wole-soyinka.achievement.1":
    "In 1986, became the first writer from sub-Saharan Africa to win the Nobel Prize in Literature — the citation specifically recognized his fusion of traditional Yoruba ritual drama with modern Western theatrical structure.",
  "wole-soyinka.achievement.2":
    "Continued writing and publishing across decades of repeated imprisonment and exile under Nigeria's successive governments — his prison memoir, The Man Died, was composed on notes smuggled out during his imprisonment and published after his release.",
  "wole-soyinka.moment.1":
    "During his 1967–1969 imprisonment, much of it in solitary confinement, he wrote in secret and had the notes smuggled out — later published as The Man Died.",
  "wole-soyinka.turning_point.1":
    "In 1967, with no official mandate, he personally attempted to broker a ceasefire in the early stages of the Nigerian Civil War — an unauthorized intervention that led directly to his imprisonment, much of it in solitary confinement, for roughly two years, and marked the point at which he became as widely known internationally for direct political confrontation with Nigeria's government as for his literary work.",
  "wole-soyinka.interpretation.moment.1":
    "This is one example of the profile's resourcefulness score: continuing his primary work under conditions specifically designed to prevent it.",
  "wole-soyinka.interpretation.turning_point.1":
    "This matches the profile's proactive_agency score: acting on his own initiative, entirely outside any official capacity, in a way that carried severe and immediate personal cost.",

  /* ----------------------------------------------------- E. Blackwell */
  "elizabeth-blackwell.achievement.1":
    "In 1849, became the first woman to earn a medical degree in the United States, after being rejected by roughly twenty-nine medical schools before Geneva Medical College admitted her — reportedly after the faculty put her application to a student vote as a joke, expecting it to be rejected, and the students voted to admit her instead.",
  "elizabeth-blackwell.achievement.2":
    "Later founded a Women's Medical College, training other women as physicians at a time when almost no formal medical institution in the country would admit them.",
  "elizabeth-blackwell.moment.1":
    "She began pursuing medicine specifically after a dying friend told her that she would have been spared some of her worst indignities with a female doctor to attend her — a specific origin for a career choice that ran directly against the era's near-universal assumption that medicine was not a field for women.",
  "elizabeth-blackwell.moment.2":
    "After being turned down for a position at an existing dispensary's women's department, she founded her own dispensary in a rented room in 1853, growing it by 1857 into the New York Infirmary for Women and Children.",
  "elizabeth-blackwell.turning_point.1":
    "While undertaking further clinical training in Paris, she contracted a severe eye infection from a patient and lost sight in one eye, ending her earlier ambition to become a surgeon. Rather than leaving medicine, she redirected her career toward general practice and public health — the fields in which she went on to found her infirmary and college.",
  "elizabeth-blackwell.interpretation.moment.2":
    "This offers a clear instance of the profile's autonomy_need score: building the institutional position that wasn't being offered to her, rather than continuing to seek an existing one.",
  "elizabeth-blackwell.interpretation.turning_point.1":
    "This fits the profile's adaptability score: redirecting toward a different form of medical practice after a career-ending setback in the one she had originally pursued, rather than leaving the field.",
};

export const EDITORIAL_KO: Record<string, string> = {
  /* ---------------------------------------------------------- da Vinci */
  "leonardo-da-vinci.achievement.1":
    "해부 연구, 공학 설계, 물과 비행에 대한 관찰을 한데 모은 수천 페이지의 노트를 남겼다 — 대부분은 생전에 출판되거나 다른 사람에게 보여진 적이 없었다.",
  "leonardo-da-vinci.achievement.2":
    "모나리자와 최후의 만찬을 그렸으며, 색조 사이를 연기처럼 부드럽게 이어주는 스푸마토 기법을 개발해 그려진 얼굴이 윤곽선이 아니라 살아있는 것처럼 보이게 만들었다.",
  "leonardo-da-vinci.achievement.3":
    "그림의 정확성을 위해 직접 인체를 해부하여 근육, 장기, 심장 구조에 대한 드로잉을 남겼는데, 이는 이후 수 세기 동안 출판된 의학 서적조차 따라가지 못한 수준이었다.",
  "leonardo-da-vinci.moment.1":
    "밀라노 공작 루도비코 스포르차에게 일자리를 구하며 보낸 편지에서, 그는 자신을 먼저 군사·토목 기술자(다리, 장갑 전차, 투석기 설계자)로 소개했고, 그림 이야기는 편지 끝부분에서야 짧게 언급했다.",
  "leonardo-da-vinci.moment.2":
    "의뢰받은 모나리자를 몇 년이나 곁에 두고 계속 손을 보았을 뿐, 값을 치른 의뢰인에게 완성작으로 넘기지 않았다.",
  "leonardo-da-vinci.turning_point.1":
    "해부가 법적·종교적으로 민감했던 시대에 병원에서 밤에 몰래 해부를 진행했고, 이후 관찰 결과가 처음의 가정과 어긋나자 자신이 이전에 그린 해부도를 여러 차례 수정했다.",
  "leonardo-da-vinci.interpretation.moment.1":
    "프로필의 높은 기회 포착(opportunity_sensing) 점수와 일치하는 대목이다 — 이 편지는 오늘날 그가 기억되는 모습이 아니라 후원자가 그 순간 실제로 필요로 하는 것을 먼저 읽어낸다. 그가 무엇을 가장 중요하게 여겼는지에 대한 일반적인 주장이 아니라, 그 특정 상황을 읽어낸 사례다.",
  "leonardo-da-vinci.interpretation.turning_point.1":
    "프로필의 중간 수준 입장 수정(belief_updating) 점수를 이해하는 데 도움이 된다 — 관찰이 이전 가정과 어긋나자 이미 완성해둔 그림조차 다시 손본 태도지만, 남아있는 근거는 명시적인 기록이라기보다 반복된 실천 패턴에 가깝다.",

  /* ----------------------------------------------------------- M. Curie */
  "marie-curie.achievement.1":
    "1903년 물리학상과 1911년 화학상으로, 서로 다른 두 과학 분야에서 노벨상을 받은 최초의 인물이 되었다 — 방사능이라는 분야 자체를 명명하고 정립한 연구였다.",
  "marie-curie.achievement.2":
    "폴로늄과 라듐이라는 원소를 발견했으며, 다른 어떤 방법으로도 얻을 수 없던 시절 수 톤의 원광에서 이를 직접 분리해냈다.",
  "marie-curie.achievement.3":
    "제1차 세계대전 중에는 '작은 퀴리'라는 별명이 붙은 이동식 X선 장비를 개발해 직접 전선까지 몰고 가, 외과의들이 파편의 위치를 찾아 부상병을 치료하도록 도왔다.",
  "marie-curie.moment.1":
    "유리 지붕이 새고 제대로 된 환기 시설도 없던 개조된 헛간에서, 순수한 라듐 1그램도 채 안 되는 양을 분리해내기 위해 약 4년에 걸쳐 수 톤의 피치블렌드 원광을 손수 처리했다.",
  "marie-curie.moment.2":
    "당시엔 아직 그 위험성이 알려지지 않았던 방사성 물질을 아무런 보호 장비 없이 여러 해 동안 계속 다루었다 — 그의 실험 노트는 오늘날에도 방사능이 남아 있어 납으로 된 상자에 보관되고 있다.",
  "marie-curie.turning_point.1":
    "1906년 남편이자 공동 연구자였던 피에르가 거리 사고로 세상을 떠난 뒤, 그의 소르본 교수직을 이어받아 최초의 여성 교수가 되었고, 연구를 중단하는 대신 혼자서 계속 이어갔다.",
  "marie-curie.interpretation.moment.1":
    "프로필의 매우 높은 성실성(discipline)과 끈기(persistence) 점수와 일치하는 대목이다 — 원광에서 무언가 얻어낼 수 있다는 보장도 없이, 몇 년에 걸친 고되고 화려할 것 없는 노동을 감수한 것이다.",
  "marie-curie.interpretation.turning_point.1":
    "프로필의 높은 자율성 욕구(autonomy_need) 점수를 이해하는 데 도움이 된다 — 함께 시작한 연구를 동료의 죽음과 함께 끝내는 대신, 홀로, 그것도 공개적으로 이어가기로 한 선택이다.",

  /* ---------------------------------------------------------- A. Lovelace */
  "ada-lovelace.achievement.1":
    "1843년에 쓴 '주석'에는 찰스 배비지가 구상한 해석기관을 위한, 기계를 위해 작성된 최초의 알고리즘으로 널리 인정받는 내용이 담겨 있다 — 베르누이 수를 계산하는 방법이었다.",
  "ada-lovelace.achievement.2":
    "해석기관이 숫자 이상의 것을 다룰 수 있다는 점을 알아챘다 — 그는 이 기계가 원리적으로 음악도 작곡할 수 있다고 썼는데, 이는 배비지 자신이 자기 발명품을 설명한 방식을 넘어서는, 범용 컴퓨팅을 향한 개념적 도약이었다.",
  "ada-lovelace.moment.1":
    "해석기관에 관한 프랑스 학자의 글을 영어로 번역하는 임무를 맡았는데, 정작 본인이 덧붙인 '주석'은 원문보다 세 배가량 길어져 번역 작업이 독자적인 분석으로 바뀌었다.",
  "ada-lovelace.moment.2":
    "십 대 시절, 어머니의 뜻에 따라 수학과 과학을 엄격히 공부하게 되었는데, 이는 한 번도 만난 적 없는 아버지인 시인 바이런 경의 변덕스러운 기질에 대한 일종의 견제이기도 했다.",
  "ada-lovelace.turning_point.1":
    "열일곱 살에 찰스 배비지를 만나 그의 차분기관 시제품을 본 일이, 그가 짧은 생애 내내 이어갈 수학 작업의 방향을 정했다 — 그는 십 년 뒤, 배비지의 새로운 해석기관에 관한 평범한 번역 의뢰를 계기로 그 작업으로 돌아왔고, 이 번역은 그 자신의 방대하고 독창적인 '주석'으로 이어졌다.",
  "ada-lovelace.interpretation.achievement.2":
    "프로필의 높은 기회 포착(opportunity_sensing) 점수가 실제로 드러나는 대목이다 — 다른 사람이 만든 기계에서, 그 발명가조차 강조하지 않았던 함의를 알아챈 것이다.",

  /* ----------------------------------------------------------- Yi Sun-sin */
  "yi-sun-sin.achievement.1":
    "1592년 일본의 조선 침략에 앞서, 조정 전체가 이 위협에 제대로 대비하지 못하고 있던 시기에 거북선 건조와 해안 방어 태세를 강력히 추진했다.",
  "yi-sun-sin.achievement.2":
    "7년에 걸친 임진왜란(1592–1598) 동안, 훨씬 더 크고 자원도 풍부했던 일본 수군을 상대하면서도 단 한 번의 해전도 패하지 않았다.",
  "yi-sun-sin.achievement.3":
    "1597년 명량해전에서는 단 12~13척의 남은 배로 100척이 넘는 일본 함대를 물리쳤는데, 함대와 정면으로 맞서는 대신 좁은 해협의 물살을 전략적으로 활용했다.",
  "yi-sun-sin.moment.1":
    "전쟁 기간 내내 직접 손으로 난중일기를 썼다 — 이 시대 군 지휘관으로서는 드물게, 후대에 재구성된 기록이 아니라 본인의 1인칭 기록이 그대로 남아 있는 경우다.",
  "yi-sun-sin.turning_point.1":
    "함정이라고 판단한 조정의 특정 명령을 따르지 않고 자신의 전술적 판단대로 행동했다가 파직·투옥·고문을 당했다. 그의 후임이 곧 함대 대부분을 잃자, 남은 병력으로 복귀해 명량해전에서 승리를 거두었다.",
  "yi-sun-sin.interpretation.turning_point.1":
    "프로필의 양면적인 선제적 행동력(proactive_agency) 점수가 지닌 긴장을 보여주는 대목이다 — 조정의 직접적인 명령을 거스르고 자신의 전술적 판단대로 행동한 것은 즉각적이고 큰 개인적 대가로 이어졌다. 복귀 이후의 명량 승리는 다시 명령을 거스른 결과가 아니라 거의 궤멸된 함대를 이끈 전술적 역량에서 나온 것이지만, 그를 벌하게 만들었던 애초의 판단이 옳았음을 결과적으로 증명한 것은 후임 지휘관 아래서 함대가 거의 전멸했다는 사실이었다.",
  "yi-sun-sin.interpretation.achievement.3":
    "프로필의 매우 높은 자원 활용 성향(resourcefulness) 점수를 보여주는 한 사례다 — 오지 않을 지원군을 기다리는 대신, 극도로 제한된 자원을 결정적으로 활용한 것이다.",

  /* ------------------------------------------------------------ F. Kahlo */
  "frida-kahlo.achievement.1":
    "멕시코 민속 예술의 전통과 고통·정체성·신체를 탐구하는 상징적이고 거침없는 자화상을 결합한 독자적인 화풍을 만들어냈다 — 국제적으로 폭넓게 인정받은 것은 사후 한참이 지난 뒤였다.",
  "frida-kahlo.moment.1":
    "1925년 거의 목숨을 잃을 뻔한 버스 사고로 몇 달간 몸져누운 뒤, 어머니가 침대 위에 마련해준 특수 거울과 이젤을 이용해 누운 채로 그림을 그리기 시작했다.",
  "frida-kahlo.moment.2":
    "전기적 기록에 따르면, 무명 화가였던 시절 이미 유명했던 벽화가 디에고 리베라를 직접 찾아가 자신의 그림에 대한 솔직한 평가를 청했다고 한다.",
  "frida-kahlo.turning_point.1":
    "1925년의 사고와 이후 평생에 걸쳐 이어진 수많은 수술과 긴 요양 기간은, 원래 의학을 꿈꾸던 그를 그림을 본업으로 삼는 방향으로 이끌었다.",
  "frida-kahlo.interpretation.moment.1":
    "프로필의 높은 자원 활용 성향(resourcefulness) 점수를 뚜렷이 보여주는 사례다 — 제약이 사라지길 기다리는 대신, 창작을 가능하게 할 도구를 즉석에서 만들어내며 심각한 신체적 제약 속에서도 작업을 이어간 것이다.",

  /* --------------------------------------------------------- N. Mandela */
  "nelson-mandela.achievement.1":
    "반아파르트헤이트 운동을 이끌었고, 27년간 — 대부분 로벤섬에서 — 수감되었으며, 협상을 통한 아파르트헤이트 종식 이후인 1994년 남아프리카공화국 최초의 흑인 대통령이 되었다.",
  "nelson-mandela.achievement.2":
    "대통령으로서 옛 아파르트헤이트 정부에 대한 보복 대신 진실화해위원회를 설립해, 처벌이 아닌 공개적인 규명을 이행기 전환의 중심 수단으로 선택했다.",
  "nelson-mandela.moment.1":
    "로벤섬에서 밀반입한 책과 즉석에서 꾸린 학습 모임으로 재소자 교육을 조직했고, 다른 수감자들은 훗날 이 감옥을 '대학'이라고 불렀다.",
  "nelson-mandela.moment.2":
    "옥중에서 자신이 속한 조직의 완전한 동의나 승인 없이, 아파르트헤이트 정부와의 비밀 협상을 스스로 시작했다.",
  "nelson-mandela.turning_point.1":
    "1990년 석방된 이후, 무장투쟁을 이어가는 대신 협상의 길을 선택했다 — 당시 자신이 속한 운동 내부에서도 논란이 되었던 노선이었고, 이는 1994년 선거로 이어진 길이었다.",
  "nelson-mandela.interpretation.moment.2":
    "프로필의 양면적인 선제적 행동력(proactive_agency) 점수와 나란히 놓고 볼 대목이다 — 훗날 아파르트헤이트 종식에 기여한 바로 그 자발적 행동은, 만약 상황이 달랐다면 자신이 속한 운동으로부터 부인당할 실제 위험을 안고 있었다.",
  "nelson-mandela.interpretation.moment.1":
    "프로필의 높은 자원 활용 성향(resourcefulness) 점수를 반영하는 대목이다 — 바로 그것을 막기 위해 설계된 환경 안에서, 거의 아무것도 없는 상태로부터 실제로 작동하는 하나의 제도를 만들어낸 것이다.",

  /* ---------------------------------------------------------- Einstein */
  "albert-einstein.achievement.1":
    "1905년 — 그의 '기적의 해' — 스위스 특허청에서 정규직으로 일하면서 남는 시간에 특수상대성이론, 광전효과, 브라운 운동, 질량-에너지 등가라는 네 편의 획기적인 논문을 대학 소속 없이 발표했다.",
  "albert-einstein.achievement.2":
    "일반상대성이론은 약 10년에 걸친 반복적인 연구 끝에 완성되었으며, 그 과정에는 시도했다가 포기한 여러 접근법이 있었고 마침내 1915년 최종 장방정식에 도달했다.",
  "albert-einstein.achievement.3":
    "1939년, 어느 정부 기관의 요청도 없이 물리학자 레오 실라르드와 함께 작성되어 루스벨트 대통령에게 보낸 편지에 서명함으로써 자신의 권위를 실어 핵분열의 군사적 잠재력을 경고했다 — 역사가들은 이 편지가 맨해튼 프로젝트 착수 결정에 직접적으로 기여했다고 본다.",
  "albert-einstein.moment.1":
    "어린 시절, 나침반을 아무리 돌려도 바늘이 항상 같은 방향을 가리킨다는 사실에 깊은 인상을 받았다 — 그는 훗날 이 경험을 자신의 과학적 호기심이 처음 싹튼 순간으로 여러 차례 언급했다.",
  "albert-einstein.turning_point.1":
    "그 자신이 양자론의 토대를 놓은 사람 중 하나였음에도 — 1905년의 광양자 가설과 1924~25년 보스와 함께한 양자 통계 연구 모두 그 토대의 일부였다 — 그는 훗날 양자역학이 제시한 확률적 자연관을 끝내 완전한 것으로 받아들이지 않았고, 이 반대 입장을 '신은 주사위 놀이를 하지 않는다'는 말로 요약했다. 이미 명성이 확고해진 뒤에도 남은 생애의 수십 년을 성과 없는 통일장 이론 연구에 쏟았으며, 그 사이 물리학계의 논의는 그를 남겨둔 채 앞으로 나아갔다.",
  "albert-einstein.interpretation.turning_point.1":
    "프로필의 낮은 입장 수정(belief_updating) 점수와 일치하는 대목이다 — 새로운 이론을 초기 회의론자들로부터 지켜낼 수 있게 해준 바로 그 확신이, 양자역학이 불완전하다는 그의 입장을 끝내 바꾸지 않게 만들기도 했다. 다만 그가 공동 집필한 1935년 EPR 논문을 비롯한 그의 반박 자체는, 그가 끝까지 저항했던 바로 그 분야에서 지금까지도 영향력 있는 토대의 일부로 남아 있다.",

  /* -------------------------------------------------------- Joan of Arc */
  "joan-of-arc.achievement.1":
    "아무런 신분도 가문의 배경도 없는 무명의 십 대 농민 소녀였음에도 도팽의 궁정을 설득해 병력과 물자를 얻어냈고, 1429년 영국군의 오를레앙 포위를 푸는 데 기여했다.",
  "joan-of-arc.achievement.2":
    "처음부터 자신이 밝혔던 목표였던 랭스에서의 도팽 대관식 — 이를 샤를 7세로 즉위시키는 데까지 이어진 원정에서 프랑스군을 이끌었다.",
  "joan-of-arc.moment.1":
    "도팽이 신하들 사이에 자신을 숨기고 다른 사람을 왕좌에 앉혀 그를 시험하려 하자, 그는 정확히, 그리고 누구의 도움도 없이 도팽을 알아보았다 — 사건으로부터 25년이 지난 1455~56년 명예회복재판에서, 그 자리에 있었던 여러 증인이 증언한 일화다.",
  "joan-of-arc.moment.2":
    "오를레앙 공격 중 석궁 화살에 부상을 입었지만, 물러나는 대신 치료를 받은 뒤 곧바로 전장으로 돌아갔다.",
  "joan-of-arc.moment.3":
    "재판에서 훈련된 성직자들의 적대적인 신학적 심문을 몇 주에 걸쳐 견뎌내며 무너지지 않았다 — 후대의 재구성이 아니라 중세 개인의 1인칭 진술이 그대로 남아 있는 몇 안 되는 사례 중 하나다.",
  "joan-of-arc.turning_point.1":
    "성직자들의 직접적인 지시를 거스르고 계속 남성 병사의 복장을 착용했다 — 재판 기록은 이것이 스스로 반복해서 내린 선택이었음을 그 자신이 인정했다고 전하며, 이는 그를 처형으로 이끈 핵심 혐의 중 하나가 되었다.",
  "joan-of-arc.interpretation.turning_point.1":
    "프로필의 양면적인 독립적 사고(independent_thinking) 점수를 보여주는 대목이다 — 몇 주간의 심문을 무너지지 않고 견디게 해준 바로 그, 순응 압력에 굴하지 않는 태도가, 다른 형태로는 그를 유죄로 이끈 구체적인 혐의가 되기도 했다.",

  /* ----------------------------------------------------------- Atatürk */
  "mustafa-kemal-ataturk.achievement.1":
    "1915년 갈리폴리에서 비교적 하급 장교였던 그는 연합군이 향하던 전략적 능선을 스스로 파악하고, 열세에 놓인 연대에 즉각 그 위치를 사수하라고 명령했다: \"나는 너희에게 공격하라 명령하지 않는다, 죽으라 명령한다.\" 그 능선은 지켜졌다.",
  "mustafa-kemal-ataturk.achievement.2":
    "제1차 세계대전 이후 터키 민족운동을 이끌었고 1923년 터키 공화국을 건국했으며, 이후 몇 년에 걸쳐 광범위한 법적·세속화 개혁을 단행했다.",
  "mustafa-kemal-ataturk.moment.1":
    "1915년 추누크 바이르에서, 포탄 파편이 회중시계 바로 위 가슴을 강타해 시계는 산산조각 났지만 그는 큰 부상을 면했다. 곁에 있던 부관이 그가 다친 줄 알고 놀라 소리치자, 그는 손으로 부관의 입을 막고 이렇게만 말했다. \"아무 일도 아니다.\"",
  "mustafa-kemal-ataturk.moment.2":
    "1919년, 아나톨리아 잔여 병력을 무장 해제하고 해산시키라는 오스만 정부의 공식 임무를 오히려 민족 저항을 조직하는 발판으로 삼았다 — 임무의 본래 목적과는 정반대의 행동이었다.",
  "mustafa-kemal-ataturk.turning_point.1":
    "공화국을 세운 뒤, 1925년 유일하게 조직된 야당을 해산시켰다. 같은 해 설치된 독립법정은 셰이흐 사이드 봉기의 지도자를 포함해 수십 명에게 판결 며칠 만에 사형을 집행했다.",
  "mustafa-kemal-ataturk.interpretation.turning_point.1":
    "더 그레이트 인사이드는 이 대목을 하나로 이어지는 인과관계가 아니라 하나의 대조로 읽는다 — 갈리폴리에서의 행동에서 프로필이 높게 평가한 바로 그 결단력과 갈등 감내가, 훗날 국내 정치적 반대 세력을 상대할 때도 신속하고 강압적인 방식으로 나타난다. 전장의 지휘에서 갓 태어난 다당제 반대 세력을 억누르는 데까지 이어진 이 변화에는 국가 건설의 압박, 봉기 이후의 안보 우려, 구체적인 정치적 판단 등 한 사람의 성향만으로는 설명할 수 없는 요인들이 함께 작용했다 — 이 프로필은 그의 결단력만으로 이를 설명할 수 있다고 주장하지 않으며, 다만 같은 성향이 두 순간 모두에서 읽힌다고 말할 뿐이다.",

  /* ---------------------------------------------------------- A. Pavlova */
  "anna-pavlova.achievement.1":
    "너무 어리고 몸이 약하다는 이유로 첫 제국발레학교 오디션에서 떨어졌지만, 1년 뒤 합격해 훗날 발레단의 수석 발레리나 자리에 올랐다.",
  "anna-pavlova.achievement.2":
    "1913년 제국발레단이라는 안정된 자리를 떠나 독립 순회 무용단을 직접 설립하고 약 18년간 이끌며, 서양 극장식 무용을 접해본 적 없는 곳을 포함해 여섯 개 대륙에서 공연했다.",
  "anna-pavlova.achievement.3":
    "고질적인 발 문제를 해결하기 위해 자신의 토슈즈를 직접 개조했는데, 이 개선안은 이후 표준 토슈즈 제작 방식 전반에 영향을 주었다.",
  "anna-pavlova.moment.1":
    "백조를 직접 길렀고, 대표작인 '빈사의 백조' 연기를 더 진짜처럼 보이게 하려고 오랜 시간 그 실제 움직임을 관찰했다.",
  "anna-pavlova.moment.2":
    "1912년 커튼콜 도중, 파트너가 자신보다 더 많은 박수를 받고 있다고 여겨 그를 때렸다 — 얼마 전 두 사람이 함께 큰 무대적 성공을 나눈 직후였는데도 그러했다.",
  "anna-pavlova.turning_point.1":
    "생존을 위해서는 다시는 춤출 수 없게 될 수술이 필요하다는 진단을 받자, 그는 수술을 거부하며 이렇게 말했다. \"춤출 수 없다면, 차라리 죽는 게 낫다.\"",
  "anna-pavlova.interpretation.moment.2":
    "프로필의 양면적인 경쟁심(competitiveness) 점수가 드러나는 한 장면이다 — 자신의 위치에 대한 강렬한 의식이, 이 순간에는 무대가 아니라 가까운 동료를 향한 노골적인 질투로 표출되었다.",
  "anna-pavlova.interpretation.turning_point.1":
    "프로필의 높은 위험 감수(risk_tolerance) 점수를 이해하는 데 도움이 된다 — 바로 이런 순간을 염두에 두고 양면적으로 평가된 점수다 — 자신에게 가장 중요한 것을 타협하느니 가장 큰 위험을 감수하려는 태도다.",

  /* ------------------------------------------------- Tier-B backfill batch 1 */

  /* ---------------------------------------------------------- I. Newton */
  "isaac-newton.achievement.1":
    "1665~1667년 흑사병으로 케임브리지가 문을 닫았던 시기, 그는 대학 대신 울즈소프의 본가에서 홀로 지내며 미적분학과 색채 이론, 초기 중력 이론의 수학적·실험적 토대를 마련했다 — 이 성과들이 실제로 출판되기까지는 그 후로도 몇 년이 더 걸렸다.",
  "isaac-newton.achievement.2":
    "『프린키피아』(1687)는 소수의 정의와 운동 법칙에서 출발해 그로부터 도출되는 결과들을 공리적으로 쌓아 올리는 방식으로, 지상의 운동과 천체의 운동을 하나의 중력 법칙 아래 통합했다.",
  "isaac-newton.achievement.3":
    "1703년부터 1727년까지 24년간 왕립학회장을 지내는 동시에 왕립조폐국장도 겸임했다 — 두 개의 부담스러운 기관장 직무를 순차적으로가 아니라 동시에 오랫동안 수행한 것이다.",
  "isaac-newton.moment.1":
    "당시 굴절 망원경의 한계였던 색수차 문제를 피하기 위해, 그는 직접 반사 망원경을 설계하고 제작했다 — 누군가 해결해주기를 기다리는 대신 스스로 구체적인 기술적 해법을 찾아낸 것이다.",
  "isaac-newton.moment.2":
    "미적분학 발명을 둘러싼 고트프리트 라이프니츠와의 우선권 다툼이 왕립학회로 넘어가자, 뉴턴은 이를 조사할 학회 위원회를 익명으로 직접 주재했다 — 그리고 그 위원회는 그의 손을 들어주었다.",
  "isaac-newton.turning_point.1":
    "50대 중반, 케임브리지에서 은둔에 가까운 학자 생활을 30년 가까이 보낸 그는 왕립조폐국의 조폐국 관리관 — 이후 조폐국장 — 직을 수락하고 런던으로 옮겨갔다. 이전의 삶과는 전혀 다른 행정·사법 집행 영역에서, 그는 위조범을 직접 조사하는 등 기록상 뛰어난 성과를 보였다.",
  "isaac-newton.interpretation.moment.1":
    "프로필의 자원 활용 성향(resourcefulness) 점수와 일치하는 대목이다 — 이미 있는 장비의 한계 안에서 타협하는 대신, 도구 자체의 문제를 직접 해결한 것이다.",
  "isaac-newton.interpretation.moment.2":
    "프로필의 매우 낮은 협업 성향(collaboration) 점수, 그리고 높은 경쟁 성향(competitiveness) 점수와 함께 놓고 볼 대목이다 — 공동 저작이나 양보를 통해서가 아니라, 공정하게 판단해야 할 기구 자체를 직접 통제함으로써 공로 다툼을 매듭지은 것이다.",
  "isaac-newton.interpretation.turning_point.1":
    "더 그레이트 인사이드는 이 대목을 프로필의 훨씬 낮은 입장 수정(belief_updating) 점수와 대립시키지 않고 나란히 읽는다 — 부담스러운 새 직무에 적응하는 것과 확립된 이론적 신념을 수정하는 것은 서로 다른 종류의 변화이며, 이 프로필은 둘을 긴장 관계가 아니라 별개의 것으로 다룬다.",

  /* ---------------------------------------------------------- H. Tubman */
  "harriet-tubman.achievement.1":
    "1850년경부터 1860년경까지, 그는 노예제가 시행되던 지역으로 직접 약 열세 차례 돌아가 '지하철도'를 통해 약 70명의 노예를 자유로 이끌었다 — 기록된 임무 가운데 단 한 명도 잃지 않고 완수했다.",
  "harriet-tubman.achievement.2":
    "1863년 6월, 컴바히강 습격 작전을 계획하고 지휘해 700명이 넘는 노예를 해방시켰다 — 남북전쟁 중 여성이 계획하고 지휘한 최초의 미군 군사작전으로 기록되어 있다.",
  "harriet-tubman.moment.1":
    "그는 구출 임무에 권총을 지니고 다녔으며, 여러 독립된 기록에 따르면 도중에 돌아가려는 도망자에게 그것을 겨눌 각오까지 되어 있었다고 한다 — 한 사람이라도 되돌아가면 노예 사냥꾼에게 일행 전체가 발각될 위험이 있었기 때문이다.",
  "harriet-tubman.moment.2":
    "그는 북군 지휘부에 직접 접근해 무장 정찰병 겸 첩보원으로 복무하겠다고 제안했다 — 여성으로서는, 더구나 전직 노예 출신 여성으로서는 전례 없는 역할이었다. 군은 이를 받아들였고, 이 자리는 훗날 그가 컴바히 습격을 계획하는 데로 직접 이어졌다.",
  "harriet-tubman.turning_point.1":
    "1849년 그가 노예 신분에서 탈출했을 때는 혼자였고, 다른 사람을 데리러 돌아갈 계획도 없었다. 그러나 약 1년 만에 그는 같은 지역으로 되돌아가 다른 사람들을 이끌어내기 시작했고, 이는 이후 10년 동안 이어질 임무의 시작이었다.",
  "harriet-tubman.interpretation.moment.1":
    "프로필의 갈등 감내(conflict_tolerance) 점수와 일치하는 대목이다 — 이는 그의 전반적인 성격에 대한 일반적 서술이 아니라, 집단의 안전이 걸린 순간 어려운 선택을 강행할 수 있었다는 뜻이다.",
  "harriet-tubman.interpretation.moment.2":
    "프로필의 매우 높은 선제적 행동력(proactive_agency) 점수를 이해하는 데 도움이 되는 대목이다 — 기회가 주어지기를 기다리는 대신, 스스로 제도적 기회를 만들어낸 것이다.",

  /* ---------------------------------------------------------- Wu Zetian */
  "wu-zetian.achievement.1":
    "당 태종의 후궁 가운데 하급 지위에서 시작해, 중국 역사상 유일하게 여성의 이름으로 황제 자리에 오른 인물이 되었다. 690년 스스로 무주(周)를 세우고 705년까지 직접 통치했다.",
  "wu-zetian.achievement.2":
    "여성이 직접 조정에 나서는 것을 공식적으로 금지한 궁정 예법을 우회하기 위해, 발을 드리우고 그 뒤에서 정사를 돌보는 방식을 도입했다 — 참고할 선례가 없는 구조적 장벽 속에서도 실질적인 권력을 행사할 수 있게 한 절차상의 우회로였다.",
  "wu-zetian.achievement.3":
    "690년 공식 즉위 이전 수년에 걸쳐, 여성 통치자를 보살의 화신으로 예언하는 불경을 새롭게 해석해 보급했고, 이 서사를 퍼뜨리기 위해 제국 전역에 사찰을 세우게 했다 — 중국 황실 역사상 참고할 전례가 전혀 없는, 지속적인 정치적 정당화 작업이었다.",
  "wu-zetian.moment.1":
    "그는 이전에 자신이 일족을 몰락시킨 상관완아를, 조정에서 가장 민감한 자리 가운데 하나인 조서 작성 총책임자로 임명했다.",
  "wu-zetian.moment.2":
    "그는 상례와 조상 제사에 관한 규범을 고쳐 여성 조상도 남성 조상과 함께 모시도록 했고, 어머니를 위한 상기(喪期)도 아버지와 같도록 맞췄다 — 기존 제국 체제 안에서 권력만 행사한 것이 아니라, 그 체제 안에서 성별을 다루는 방식 자체를 의례와 법 차원에서 바꾼 것이다.",
  "wu-zetian.turning_point.1":
    "권세 있는 황실의 과부나 태후에게 전통적으로 허용되던 길, 즉 남성 후계자의 섭정으로만 남는 대신, 그는 690년 스스로 새 왕조를 세우고 황제라는 칭호를 직접 취했다 — 중국 역사상 따를 선례가 전혀 없는 파격이었다.",
  "wu-zetian.interpretation.moment.1":
    "프로필의 적응력(adaptability) 점수를 반영하는 대목이다 — 이는 그가 정적을 대체로 어떻게 대했는지에 대한 일반적 서술이 아니라, 과거의 개인적 원한보다 현재의 정치적 쓸모를 앞세운 구체적이고 실용적인 인사 결정이었다는 뜻이다.",
  "wu-zetian.interpretation.turning_point.1":
    "프로필의 자율성 욕구(autonomy_need) 점수를 이해하는 데 도움이 되는 대목이다 — 기존의 더 관습적인 지위를 통해서도 같은 실권을 계속 행사할 수 있었음에도, 전례 없는 공식 칭호를 선택한 것이다.",

  /* ------------------------------------------------------------ Averroes */
  "averroes.achievement.1":
    "약 30년에 걸쳐, 현존하는 아리스토텔레스 저작 거의 전체에 대해 단편·중편·장편 주석을 체계적으로 작성했다 — 이 저작들은 이후 이슬람 세계뿐 아니라 중세 유럽에서 아리스토텔레스를 읽는 방식에도 큰 영향을 미쳤다.",
  "averroes.achievement.2":
    "『모순의 모순』을 저술해, 철학 자체를 비판했던 당대의 영향력 있는 철학자 알가잘리에게 직접적이고 지속적인 반박을 가했다 — 당대 최대의 도전을 피해가지 않고 정면으로 마주한 것이다.",
  "averroes.achievement.3":
    "세비야에서, 이후에는 코르도바의 수석 카디(재판관)로 재직하는 동시에 왕실 의사로도 활동하며 철학 주석 작업을 이어갔다 — 하나 이상의 까다로운 전문 분야에서 진지한 실무를 병행한 경력이었다.",
  "averroes.moment.1":
    "철학자 이븐 투파일의 소개로 알모하드 칼리프 아부 야쿠브 유수프를 만났고, 칼리프는 그에게 아리스토텔레스에 대한 체계적 주석 작업을 직접 위촉했다 — 그의 일생의 대작이 된 이 작업은 고립된 독자적 발의가 아니라 다른 학자의 소개와 통치자의 후원에서 시작된 것이었다.",
  "averroes.turning_point.1":
    "말년에 이르러 알모하드 정권 아래서 그의 철학 저작들은 공식적으로 단죄되어 불태워졌고, 그 자신도 잠시 추방당했다 — 바로 그 통치자들이 수십 년간 그의 주석 작업을 위촉하고 후원해왔던 뒤였다. 대체로 알려진 바에 따르면, 그는 단죄의 원인이 된 입장을 철회하기보다 남은 시간 동안 철학 작업을 계속한 것으로 보인다.",
  "averroes.interpretation.turning_point.1":
    "프로필의 끈기(persistence) 점수와 일치하는 대목이다 — 제도적 보복 속에서도 작업을 이어갔다는 뜻이지만, 그 반전을 그 자신이 당시 어떻게 받아들였는지는 남아있는 기록으로 확인되지 않는다.",

  /* -------------------------------------------------------- Julius Caesar */
  "julius-caesar.achievement.1":
    "기원전 49년, 그는 자신의 군단을 이끌고 루비콘강을 건너 이탈리아 본토로 진입했다 — 로마 장군이 무장한 채 국경을 넘는 것은 불법이었고, 한번 건너면 되돌릴 수 없는 행위였다. 그는 이때 \"주사위는 던져졌다\"고 말했다고 전해지며, 이는 공화정의 기존 정치 질서를 끝낸 내전의 시작이 되었다.",
  "julius-caesar.achievement.2":
    "독재관으로서 로마의 태음력을 365.25일의 태양력으로 교체했다 — 이 율리우스력은 이후 사소한 조정만 거친 채 1,500년 넘게 사용되었다.",
  "julius-caesar.achievement.3":
    "갈리아 전역에서 여러 해에 걸친 군사 작전을 지휘하며, 약 8년에 걸친 연속된 전쟁 기간 동안 보급선, 동맹 부족과의 외교, 계절에 따른 작전 시점을 조율했다 — 그 자신의 저서 『갈리아 전기』에 상세히 기록되어 있다.",
  "julius-caesar.moment.1":
    "젊은 시절, 그는 해적에게 붙잡혀 몸값을 요구받은 적이 있다. 수에토니우스의 기록에 따르면 그는 자신에게 매겨진 몸값이 모욕적으로 낮다고 여겼고, 풀려난 뒤에는 직접 함대를 꾸려 예전의 납치범들을 추적해 처형했다.",
  "julius-caesar.moment.2":
    "수에토니우스는 젤라 전투가 신속히 끝난 뒤 그가 보냈다고 전해지는 보고문을 인용한다 — \"왔노라, 보았노라, 이겼노라.\" 이 속도감은 그 자신의 『전기』 전반에 묘사된 압축적인 작전 일정과도 맞아떨어진다.",
  "julius-caesar.turning_point.1":
    "그는 수년간 제1차 삼두정치 — 폼페이우스, 크라수스와의 비공식적 권력 분점 동맹으로, 갈리아 지휘권을 얻는 데도 도움이 되었다 — 를 유지했다. 그러나 이 동맹은 결국 루비콘강 도하로 촉발된 내전으로 무너졌고, 한때 권력을 나누었던 바로 그 동맹자와의 충돌로 끝을 맺었다.",
  "julius-caesar.interpretation.turning_point.1":
    "프로필의 협업 성향(collaboration) 점수가 높지 않고 중간 수준에 머무는 것과 맞아떨어지는 대목이다 — 실제로 오래 유지된 동맹이었지만 결국 깨졌다는 것이지, 안정적으로 지속되는 협력 관계였다는 뜻은 아니다.",

  /* ----------------------------------------------------------- J. Austen */
  "jane-austen.achievement.1":
    "문학 연구자들은 대체로 그가 자유간접화법 — 1인칭으로 전환하지 않으면서 등장인물의 내면 시점으로 서술하는 기법 — 을 이른 시기부터 지속적으로 사용한 작가로 평가한다. 이 기법은 이후 소설 형식의 기초가 되었다.",
  "jane-austen.achievement.2":
    "여섯 편의 소설을 모두 \"어느 숙녀가\"라는 익명으로 발표했으며, 가족과 전기 작가들의 기록에 따르면 생전에는 공개적인 문학적 명성을 의도적으로 추구하지 않았다 — 폭넓은 인정은 사후에야 찾아왔다.",
  "jane-austen.moment.1":
    "1802년 12월, 그는 해리스 빅위더의 청혼을 수락했다 — 가족의 경제적 안정을 보장해줄 혼처였다 — 그러나 바로 다음 날 아침 그 수락을 철회했다.",
  "jane-austen.moment.2":
    "그는 작가 활동 내내 언니 카산드라와 꾸준히 편지를 주고받으며 초고에 대한 상세한 의견을 나누었다 — 남아있는 편지들에 걸쳐 확인되는, 지속적인 편집자적 관계였다.",
  "jane-austen.turning_point.1":
    "훗날 『오만과 편견』이 된 초기 원고는 1797년 한 출판사로부터 읽히지도 않은 채 거절당했다고 전해진다. 그는 이를 포기하지 않고 이후 16년에 걸쳐 계속 고쳐 쓰며 출판을 시도했고, 이는 결국 그의 가장 널리 알려진 소설이 되었다.",
  "jane-austen.interpretation.moment.1":
    "전기 작가들은 이를 상당 부분 자신의 독립성을 지키려는 바람에서 비롯된 행동으로 해석하지만, 가족의 경제적 상황을 고려하면 오직 자율성만으로 설명하기는 어렵다 — 이 프로필은 이를 여러 그럴듯한 요인 중 하나로 다룰 뿐, 전체 설명으로 취급하지 않는다.",

  /* --------------------------------------------------------- B. Juárez */
  "benito-juarez.achievement.1":
    "가난한 사포텍 가정에서 태어나 어려서 고아가 된 그는 열두 살 무렵까지 스페인어를 배우지 못했다 — 그러나 이후 변호사가 되고 주지사를 지냈으며, 멕시코 최초의 원주민 출신 대통령이 되었다.",
  "benito-juarez.achievement.2":
    "프랑스 개입기(1862~1867년) 내내 군사적 압박 속에서도 망명이나 항복을 받아들이지 않고, 근거지를 옮겨가며 계속 운영되는 자유주의 정부를 이끌었다 — 여러 해 동안 고정된 수도조차 없이도, 합법 정부로서의 실질적 기능을 유지한 것이다.",
  "benito-juarez.achievement.3":
    "정교분리, 토지 재분배, 출생·혼인·사망에 대한 민간 등록 제도 도입을 골자로 한 '라 레포르마' 법을 주도해, 재임 기간 멕시코 통치의 법적 기반 자체를 다시 세웠다.",
  "benito-juarez.moment.1":
    "공화국이 프랑스가 후원한 제국을 상대로 승리를 거둔 뒤, 그는 나라가 아직 오랜 전쟁의 상처에서 벗어나지 못한 상황에서도 포로가 된 막시밀리아노 1세 황제에게 즉결 처형이 아니라 정식 군사재판을 받게 해야 한다고 고집했다.",
  "benito-juarez.turning_point.1":
    "재판 이후, 그는 미국과 유럽 각국 정부의 광범위한 선처 요청에도 불구하고 막시밀리아노의 처형을 명령했다 — 이는 제국의 협상을 통한 부활 가능성을 완전히 닫아버리는 결정이었고, 공화국이 재건되는 조건을 그 스스로 결정지은 것이었다.",
  "benito-juarez.interpretation.moment.1":
    "프로필의 자기 규율(discipline) 점수와 맞닿아 있는 대목이다 — 패배한 적을 상대로도, 더 빨리 처리하라는 압박 속에서도 정식 법적 절차를 고수한 것이 기록으로 남아 있다.",

  /* ------------------------------------------------------ E. Shackleton */
  "ernest-shackleton.achievement.1":
    "1914~1917년 제국 남극 횡단 탐험대를 이끌었다. 탐험선 인듀어런스호가 유빙에 부서져 침몰한 뒤에도 28명의 대원 전원을 거의 2년 가까이 생존시켰다 — 단 한 명의 사망자도 없이 이어간 생존 노력이며, 여러 대원의 개인 일기로도 뒷받침된다.",
  "ernest-shackleton.achievement.2":
    "동료 다섯 명과 함께 구조를 요청하기 위해 남빙양을 가로질러 사우스조지아섬까지 800마일에 이르는 무개 보트 항해를 감행했다 — 표준 항해 장비도 없이 망망대해 위 작은 섬을 목표로 삼아 나아간 것으로, 오지 않을 구조를 본대와 함께 기다리는 대신 택한 길이었다.",
  "ernest-shackleton.moment.1":
    "그보다 앞선 1909년 탐험에서, 그는 남극점을 불과 97마일 앞두고 발길을 돌렸다 — 이전의 그 어떤 탐험대보다도 가까이 다가간 지점이었다. 남은 거리를 계속 가는 것은 대원들의 생존에 너무 위험하다고 판단했기 때문이다.",
  "ernest-shackleton.moment.2":
    "앨프리드 랜싱의 기록에 따르면, 빙상 야영 기간 동안 섀클턴은 자신에게 더 공공연히 비판적이었다고 전해지는 대원을 의도적으로 가까이 두었다고 한다 — 갈등을 피하기보다 잠재적인 불만을 직접 관리하려 한 것이다.",
  "ernest-shackleton.turning_point.1":
    "탐험의 원래 목표였던 남극 대륙 횡단은 인듀어런스호가 부서져 침몰한 순간 완전히 불가능해졌다. 그 뒤로 이어진 것은 사전 계획이 전혀 없던, 거의 2년에 걸쳐 상황이 변할 때마다 즉흥적으로 만들고 조정해나간 생존 작전이었다.",
  "ernest-shackleton.interpretation.moment.1":
    "더 그레이트 인사이드는 이 대목을 7년 뒤의 800마일 보트 항해와 나란히, 하나의 고정된 성향이 아니라 위험 감수(risk_tolerance) 점수에 대한 두 가지 사례로 읽는다 — 생존 그 자체가 목표일 때는 극단적인 개인적 위험도 기꺼이 감수했지만, 그보다 앞서 대원들의 생명을 걸고 도박하느니 역사적인 목표를 포기할 준비도 되어 있었다.",
  "ernest-shackleton.interpretation.turning_point.1":
    "프로필의 높은 적응력(adaptability) 점수와, 상대적으로 중간 수준에 머무는 계획 지향(planning_orientation) 점수 모두 이 순간과 맞아떨어진다 — 여기서 중요했던 계획은 원래의 계획이 아니라, 그것이 실패한 뒤 이어진 일련의 조정들이었다.",

  /* ------------------------------------------------------- W. Soyinka */
  "wole-soyinka.achievement.1":
    "1986년, 사하라 이남 아프리카 출신 작가로는 최초로 노벨 문학상을 수상했다 — 수상 이유에는 전통 요루바 의례극과 현대 서구 연극 구조를 융합한 점이 구체적으로 언급되었다.",
  "wole-soyinka.achievement.2":
    "나이지리아의 여러 정권 아래서 거듭된 투옥과 망명을 겪으면서도 수십 년간 집필과 출판을 이어갔다 — 옥중 회고록 『그 남자는 죽었다』는 수감 중 몰래 반출한 메모를 바탕으로 쓰였고, 석방 이후 출간되었다.",
  "wole-soyinka.moment.1":
    "1967년부터 1969년까지, 대부분을 독방에서 보낸 수감 기간 동안에도 그는 몰래 글을 썼고 그 메모를 밖으로 빼돌렸다 — 이는 훗날 『그 남자는 죽었다』로 출간되었다.",
  "wole-soyinka.turning_point.1":
    "1967년, 아무런 공식 위임도 없이 그는 나이지리아 내전 초기 휴전을 직접 중재하려 했다 — 이 승인받지 않은 개입은 곧바로 그를 대부분 독방에서 보낸 약 2년간의 수감으로 이어졌고, 이때부터 그는 문학 작품 못지않게 나이지리아 정부와의 직접적인 정치적 대립으로도 국제적으로 널리 알려지게 되었다.",
  "wole-soyinka.interpretation.moment.1":
    "프로필의 자원 활용 성향(resourcefulness) 점수를 보여주는 한 사례다 — 바로 그것을 막기 위해 설계된 조건 속에서도 자신의 본업을 이어간 것이다.",
  "wole-soyinka.interpretation.turning_point.1":
    "프로필의 선제적 행동력(proactive_agency) 점수와 맞아떨어지는 대목이다 — 어떤 공식적 지위도 없이 순전히 자신의 판단으로 행동했고, 그로 인해 즉각적이고 심각한 개인적 대가를 치렀다.",

  /* ----------------------------------------------------- E. Blackwell */
  "elizabeth-blackwell.achievement.1":
    "1849년, 미국에서 의학 학위를 받은 최초의 여성이 되었다. 그전까지 약 스물아홉 개 의과대학에서 거절당했으며, 제네바 의과대학에 입학할 수 있었던 것도 교수진이 거절될 것으로 예상하고 장난삼아 학생 투표에 부친 결과 학생들이 오히려 입학을 찬성했기 때문이라고 전해진다.",
  "elizabeth-blackwell.achievement.2":
    "이후 여성 의과대학을 설립해, 정식 의학 교육기관이 여성을 거의 받아주지 않던 시절에 다른 여성들을 의사로 양성했다.",
  "elizabeth-blackwell.moment.1":
    "그는 죽어가던 친구가 여의사가 있었다면 가장 힘든 수모 가운데 일부는 겪지 않았을 것이라고 말한 뒤 의학의 길을 걷기 시작했다 — 의학이 여성의 분야가 아니라는, 당시 거의 보편적이던 통념에 정면으로 맞선 진로 선택의 구체적인 계기였다.",
  "elizabeth-blackwell.moment.2":
    "기존 진료소의 여성 부서 자리에서 거절당한 뒤, 1853년 셋집 한 칸을 빌려 자신만의 진료소를 열었고, 1857년에는 이를 뉴욕 여성·아동 진료소로 성장시켰다.",
  "elizabeth-blackwell.turning_point.1":
    "파리에서 추가 임상 수련을 받던 중, 환자로부터 심각한 눈 감염을 얻어 한쪽 눈의 시력을 잃었고, 이는 외과의사가 되겠다는 이전의 목표를 접게 만들었다. 그러나 그는 의학을 떠나는 대신 일반 진료와 공중보건 쪽으로 방향을 돌렸고, 바로 이 분야에서 이후 자신의 진료소와 대학을 세우게 된다.",
  "elizabeth-blackwell.interpretation.moment.2":
    "프로필의 자율성 욕구(autonomy_need) 점수를 뚜렷이 보여주는 대목이다 — 주어지지 않는 자리를 계속 구하는 대신, 스스로 그 자리를 만들어낸 것이다.",
  "elizabeth-blackwell.interpretation.turning_point.1":
    "프로필의 적응력(adaptability) 점수와 맞아떨어지는 대목이다 — 원래 추구하던 진료 형태가 경력을 가로막는 좌절을 겪은 뒤, 그 분야를 아예 떠나는 대신 다른 형태의 의료 활동으로 방향을 돌린 것이다.",
};

const BUNDLES: Partial<Record<Locale, Record<string, string>>> = {
  "en-US": EDITORIAL_EN,
  "ko-KR": EDITORIAL_KO,
};

/**
 * Locale-STRICT lookup — never falls back to English. Returns `undefined`
 * when the current locale has no translation for this key, so the caller
 * can omit the item entirely rather than render it untranslated.
 */
export function editorialText(locale: Locale, key: string): string | undefined {
  return BUNDLES[locale]?.[key];
}

/** Every key actually authored, either locale — used by coverage tooling. */
export function allEditorialKeys(): string[] {
  return [...new Set([...Object.keys(EDITORIAL_EN), ...Object.keys(EDITORIAL_KO)])];
}
