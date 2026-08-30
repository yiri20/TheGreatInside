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
  "leonardo-da-vinci.life_arc.1": "Born in Vinci, near Florence.",
  "leonardo-da-vinci.life_arc.2": "Apprenticed under the painter Andrea del Verrocchio in Florence.",
  "leonardo-da-vinci.life_arc.3":
    "Moved to Milan to work for Ludovico Sforza; kept notebooks of anatomy, engineering, and flight studies.",
  "leonardo-da-vinci.life_arc.4": "Began painting the Mona Lisa, continuing to adjust it for over a decade.",
  "leonardo-da-vinci.life_arc.5": "Entered the service of King Francis I of France.",
  "leonardo-da-vinci.life_arc.6": "Died at Clos Lucé, near Amboise.",

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
  "marie-curie.life_arc.1": "Born.",
  "marie-curie.life_arc.2": "Discovered the elements polonium and radium with Pierre Curie.",
  "marie-curie.life_arc.3": "Won the Nobel Prize in Physics — the first of two Nobel Prizes in different sciences.",
  "marie-curie.life_arc.4": "After Pierre died in an accident, took over his Sorbonne professorship — its first female professor.",
  "marie-curie.life_arc.5": "Won a second Nobel Prize, in Chemistry.",
  "marie-curie.life_arc.6": "Died.",

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
  "ada-lovelace.life_arc.1": "Born.",
  "ada-lovelace.life_arc.2": "Steered toward the study of mathematics and science by her mother.",
  "ada-lovelace.life_arc.3": "Met Charles Babbage as a teenager and saw his prototype Difference Engine.",
  "ada-lovelace.life_arc.4":
    "Published \"Notes\" on Babbage's Analytical Engine, including an algorithm for computing Bernoulli numbers.",
  "ada-lovelace.life_arc.5": "Also proposed the machine could go beyond numbers — for instance, composing music.",
  "ada-lovelace.life_arc.6": "Died.",

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
  "yi-sun-sin.life_arc.1": "Born.",
  "yi-sun-sin.life_arc.2": "Pushed for turtle-ship construction and coastal defenses ahead of Japan's invasion.",
  "yi-sun-sin.life_arc.3": "Commanded the Joseon navy through the Imjin War without losing a naval engagement.",
  "yi-sun-sin.life_arc.4": "Demoted, imprisoned, and tortured after defying a court order he judged a trap.",
  "yi-sun-sin.life_arc.5":
    "Reinstated with a small remaining fleet; won the Battle of Myeongnyang against overwhelming odds.",
  "yi-sun-sin.life_arc.6": "Died in the war's final battles.",

  /* ------------------------------------------------------------ F. Kahlo */
  "frida-kahlo.achievement.1":
    "Developed a distinctive painting style blending Mexican folk-art traditions with symbolic, often unflinching self-portraiture exploring pain, identity, and the body — work that only reached wide international recognition well after her death.",
  "frida-kahlo.moment.1":
    "After a near-fatal bus accident in 1925 left her bedridden for months, she began painting lying on her back using a specially mounted mirror and an easel her mother had arranged over the bed.",
  "frida-kahlo.moment.2":
    "Biographical accounts describe her, as an unknown young artist, approaching the already-famous muralist Diego Rivera directly and unprompted to ask for his honest opinion of her paintings.",
  "frida-kahlo.turning_point.1":
    "The 1925 accident, and the many operations and long convalescences that followed for the rest of her life, redirected her from an earlier ambition toward medicine into painting as her primary occupation.",
  "frida-kahlo.legacy":
    "Kahlo's international reputation was largely posthumous. Her work reached a wide audience beyond Mexico only after a 1982 retrospective at London's Whitechapel Gallery — the first exhibition of her work outside Mexico — and Hayden Herrera's 1983 biography Frida, which introduced her life and work to a broad English-language readership and was later adapted into the 2002 film Frida starring Salma Hayek. She is now widely read as a symbol of Mexican national identity and of the feminist art movements that took shape mostly after her death — a later reception distinct from her own paintings' declared subject matter of pain, identity, and the body. In November 2025, her 1940 painting El Sueño (La Cama) sold at auction for $54.7 million, the highest price ever paid at auction for a work by a female artist.",
  "frida-kahlo.interpretation.moment.1":
    "This is a clear instance of the profile's high resourcefulness score: continuing creative work under a severe physical constraint by improvising the equipment that made it possible, rather than waiting for the constraint to lift.",
  "frida-kahlo.life_arc.1": "Born.",
  "frida-kahlo.life_arc.2":
    "A near-fatal bus accident ended her plan to study medicine; she began painting during recovery.",
  "frida-kahlo.life_arc.3": "Approached the muralist Diego Rivera, unprompted, for his opinion of her paintings.",
  "frida-kahlo.life_arc.4": "Developed a distinctive style blending Mexican folk art with symbolic self-portraiture.",
  "frida-kahlo.life_arc.5": "Died.",

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
  "nelson-mandela.life_arc.1": "Born.",
  "nelson-mandela.life_arc.2": "Arrested; began 27 years in prison, most of it on Robben Island.",
  "nelson-mandela.life_arc.3": "Organized informal prisoner education — what other inmates called \"the university.\"",
  "nelson-mandela.life_arc.4": "Released; chose negotiation over continued armed struggle.",
  "nelson-mandela.life_arc.5":
    "Became South Africa's first Black president; established the Truth and Reconciliation Commission.",
  "nelson-mandela.life_arc.6": "Died.",

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
  "mustafa-kemal-ataturk.achievement.2":
    "Led the Turkish National Movement after the First World War and founded the Republic of Turkey in 1923, then carried out sweeping legal and secularizing reforms in the years that followed.",
  "mustafa-kemal-ataturk.achievement.3":
    "Between 1926 and 1934 he carried out a sweeping legal and social modernization program: a new civil code modeled on Switzerland's replaced Islamic sharia-based family law, ending legal polygamy and establishing equal inheritance rights, while a new penal code was adopted from Italy's. In 1928 he personally overruled his own alphabet-reform commission's cautious multi-year timeline for replacing the Ottoman Perso-Arabic script with a new Latin-based alphabet, then spent months touring the country himself, teaching the new letters in village squares and schools under the adopted title \"Head Teacher.\" Women gained the right to vote and stand in municipal elections in 1930 and full national suffrage in 1934 — years ahead of several Western European democracies of the same era.",
  "mustafa-kemal-ataturk.moment.1":
    "At Chunuk Bair in 1915, shrapnel struck his chest directly over his pocket watch, shattering it but sparing him serious injury; when an aide cried out in alarm believing him hit, he covered the aide's mouth with his own hand and said only, \"No such thing.\"",
  "mustafa-kemal-ataturk.moment.2":
    "In 1919, used an official Ottoman government assignment to disarm and demobilize remaining Anatolian forces as the platform to instead begin organizing national resistance — the opposite of what the assignment was for.",
  "mustafa-kemal-ataturk.turning_point.1":
    "After founding the Republic, he closed the country's only organized opposition party in 1925, and an Independence Tribunal — established that same year — executed dozens of people, including the leader of the Sheikh Said rebellion, within days of sentencing.",
  "mustafa-kemal-ataturk.turning_point.2":
    "As commander of the Ottoman 19th Division at Gallipoli on 25 April 1915, personally identified the strategic high ground the landing ANZAC forces were moving toward and ordered the troops present — the badly outnumbered 57th Regiment — to engage immediately, before his own full regiment had even arrived: \"I do not order you to attack, I order you to die.\" Most of the regiment were killed in the resulting engagement, but the assault held the ridge.",
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
  "julius-caesar.turning_point.2":
    "In 49 BCE, crossed the Rubicon river into Italy at the head of his legion — an act illegal for a Roman general under arms and irreversible once taken, reportedly declaring \"alea iacta est\" (\"the die is cast\") — triggering the civil war that ended the Republic's existing political order.",
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

  /* -------------------------------------------------- Batch 2: Darwin */
  "charles-darwin.achievement.1":
    "Darwin spent roughly twenty years gathering evidence — across selective breeding, the geographic distribution of species, and the fossil record — before publishing On the Origin of Species in 1859, building his case as an accumulation of independent lines of evidence rather than a single argument. He went on revising the book across six editions, incorporating direct responses to specific critics such as the naturalist St. George Mivart.",
  "charles-darwin.achievement.2":
    "Between 1846 and 1854, he produced an eight-year, multi-volume monograph cataloguing every known species of barnacle — an unglamorous, narrow subject he nonetheless saw through to exhaustive completion before returning to the theoretical work that became Origin.",
  "charles-darwin.achievement.3":
    "His published work spanned geology (a theory of coral reef formation), zoology (the barnacle monograph), botany (studies of orchid pollination and climbing plants), and psychology (The Expression of the Emotions in Man and Animals) — each a completed, serious body of work rather than a passing interest.",
  "charles-darwin.moment.1":
    "At the widely publicized 1860 Oxford debate over his theory, Darwin did not attend or speak in his own defense, leaving Thomas Huxley to argue publicly on his behalf.",
  "charles-darwin.moment.2":
    "Working from home at Down House rather than any institutional laboratory, he tested his ideas about seed dispersal by soaking seeds in seawater for weeks to see which still germinated, and ran controlled pollination experiments on orchids using ordinary garden equipment.",
  "charles-darwin.moment.3":
    "When the naturalist Alfred Russel Wallace independently arrived at a strikingly similar theory in 1858, Darwin's colleagues arranged a joint presentation to the Linnean Society crediting both men, rather than Darwin moving to assert sole priority over the idea.",
  "charles-darwin.turning_point.1":
    "Darwin held his theory of natural selection privately for roughly two decades, by his own account out of anxiety over its reception — in one letter comparing the prospect of publishing to 'confessing a murder.' He only moved to publish in 1858, after Wallace's letter describing an equivalent theory arrived and made further delay untenable.",
  "charles-darwin.interpretation.moment.1":
    "Set beside the broader pattern his correspondence and biographers describe — routing confrontation over the theory through allies rather than engaging it directly — this reads as one instance of a general operating mode, not an isolated act of nerves.",
  /* Profile V2 pilot (2026-08), control case: existing achievements/moments/
     turning point are already strong and deliberately left unrewritten --
     only Life Arc and Legacy added, both basic uncontested chronology
     already well within what this person's existing sources (Janet
     Browne's definitive two-volume biography, the Darwin Correspondence
     Project) support; re-verified live rather than assumed. */
  "charles-darwin.life_arc.1": "Born in Shrewsbury, England.",
  "charles-darwin.life_arc.2":
    "Sailed as ship's naturalist aboard HMS Beagle, gathering the observations that shaped his later theory.",
  "charles-darwin.life_arc.3":
    "Married his cousin Emma Wedgwood; the family later settled at Down House in Kent.",
  "charles-darwin.life_arc.4":
    "Alfred Russel Wallace's letter describing an equivalent theory prompted a joint presentation to the Linnean Society.",
  "charles-darwin.life_arc.5": "Published On the Origin of Species.",
  "charles-darwin.life_arc.6": "Died at Down House; buried at Westminster Abbey.",
  "charles-darwin.legacy":
    "Darwin's theory of evolution by natural selection became the unifying framework of modern biology, and On the Origin of Species remains one of the most consequential books in the history of science. His extensive notebooks and correspondence, preserved and studied for more than a century after his death, continue to shape how historians of science understand the development of his ideas.",
  "charles-darwin.interpretation.turning_point.1":
    "The profile's low risk-tolerance score is one plausible reading of that two-decade wait; professional caution or sheer thoroughness would explain some of the same delay, but Darwin's own description of the decision makes a temperamental reading hard to set aside entirely.",

  /* --------------------------------------------- Batch 2: Douglass */
  "frederick-douglass.achievement.1":
    "As an enslaved child, Douglass taught himself to read by trading bread for reading lessons from poor white children in his neighborhood and by studying discarded newspapers he came across — in direct defiance of laws that made teaching an enslaved person to read illegal. He later practiced writing by copying letters from timber markings at a shipyard and from a boy's used copybooks.",
  "frederick-douglass.achievement.2":
    "His 1845 autobiography, Narrative of the Life of Frederick Douglass, an American Slave, was an immediate bestseller, and he went on to become one of the most sought-after public speakers of his era on both sides of the Atlantic — a sustained, decades-long rhetorical career, not a single celebrated speech.",
  "frederick-douglass.achievement.3":
    "He founded and edited the abolitionist newspaper The North Star, and later held two federal appointments — Recorder of Deeds for the District of Columbia and Minister Resident to Haiti — sustained institutional leadership across markedly different roles.",
  "frederick-douglass.moment.1":
    "Douglass met directly with President Lincoln on two documented occasions to advocate for equal pay and equal treatment for Black Union soldiers, having already recruited soldiers for the Union Army himself, including his own sons.",
  "frederick-douglass.moment.2":
    "His 1838 escape from slavery was carefully prepared rather than impulsive: he secured a borrowed sailor's protection papers in advance and timed the journey around a specific train and boat schedule, carrying legal and physical risks that were severe and well understood if he were recaptured.",
  "frederick-douglass.turning_point.1":
    "Hired out to a man named Edward Covey, known locally for 'breaking' enslaved people who resisted, Douglass eventually made a deliberate decision to physically resist a beating rather than submit, and prevailed in the ensuing confrontation. He described this moment, across all three of his autobiographies, as the point after which he ceased to feel himself a slave in spirit, even though years of actual enslavement remained ahead of him.",
  "frederick-douglass.turning_point.2":
    "Douglass originally held William Lloyd Garrison's position that the U.S. Constitution was inherently a pro-slavery document. Influenced by the legal arguments of Lysander Spooner, he later publicly reversed this view, arguing the Constitution could be read as an anti-slavery text and used as a political tool — a reasoned position change that cost him his long alliance with Garrison's faction.",
  "frederick-douglass.interpretation.moment.1":
    "Read against the profile's proactive_agency score, this is the same pattern in a different arena: rather than waiting to see how Black soldiers' treatment would be decided, he sought out the country's most powerful office directly.",
  "frederick-douglass.interpretation.turning_point.1":
    "The profile's high autonomy_need score sits close to this account: Douglass frames the change not as a shift in legal status, which did not change that day, but as a shift in his own sense of who actually controlled him.",
  "frederick-douglass.interpretation.turning_point.2":
    "This is an unusually checkable case for the profile's belief_updating score: the position change is dated, reasoned, and openly acknowledged at the time, rather than something read back into his life from a later retelling.",

  /* -------------------------------------------------- Batch 2: Ibn Sina */
  "ibn-sina.achievement.1":
    "His Canon of Medicine organized then-known medical knowledge — diseases, their causes, and their treatments — into a single, structured taxonomy rather than a loose compilation of case notes, and the resulting text was used as a standard medical reference in both the Islamic world and Europe for several centuries.",
  "ibn-sina.achievement.2":
    "Alongside medicine, he produced a separate philosophical encyclopedia, Kitab al-Shifa (The Book of Healing), covering logic, physics, mathematics, and metaphysics in its own deliberate book-and-section structure — a second, independently organized body of work rather than a byproduct of his medical writing.",
  "ibn-sina.achievement.3":
    "A surviving bibliography attributes him with more than 240 works across medicine, philosophy, logic, astronomy, and poetry — sustained written output he produced alongside a separate, demanding career as a court physician and, later, as vizier to a ruling court.",
  "ibn-sina.moment.1":
    "By his own account, he successfully treated the Samanid ruler Nuh ibn Mansur as a young physician still in his teens, and used the resulting favor specifically to gain access to the ruler's extensive royal library — a named, dated episode rather than a general claim about early ambition.",
  "ibn-sina.moment.2":
    "Historical accounts describe him escaping a period of imprisonment in disguise during one of the political upheavals of his career — a single vivid episode, not part of a broader documented pattern of similar escapes.",
  "ibn-sina.moment.3":
    "For an extended period, he worked closely with his student and secretary al-Juzjani, who assisted with his later writing and personally preserved the autobiography Ibn Sina dictated — nearly everything known about his early life comes down to us through this one working relationship.",
  "ibn-sina.turning_point.1":
    "By his own account, he reread Aristotle's Metaphysics roughly forty times as a young man without fully grasping it, until a short commentary by al-Farabi, encountered almost by chance, gave him the key to understanding it. Only after that breakthrough did he move on to writing his own original philosophical work, rather than remaining stalled on someone else's text.",
  "ibn-sina.interpretation.moment.1":
    "The sequence is the interesting part for the profile's opportunity_sensing score: the medical success came first, and by his own account the library access was something he deliberately pursued using the goodwill it created, not a passive perk that simply followed from being a talented young physician.",
  "ibn-sina.interpretation.turning_point.1":
    "Worth reading as more than a simple persistence anecdote: forty readings show real staying power, but what actually broke the impasse was someone else's short commentary, not further repetition of his own approach — a reminder that a high persistence score describes effort sustained, not necessarily the method that finally works.",

  /* -------------------------------------------- Batch 2: MLK */
  "martin-luther-king-jr.achievement.1":
    "King led the 1955-56 Montgomery Bus Boycott, co-founded and led the Southern Christian Leadership Conference, and organized the Birmingham and Selma campaigns — sustained institutional civil-rights leadership across more than a decade, not a single high-profile moment.",
  "martin-luther-king-jr.achievement.2":
    "His speeches, most prominently the 1963 'I Have a Dream' address at the March on Washington, are among the most extensively documented and studied rhetorical performances of the 20th century, part of a public oratory career sustained across thirteen years.",
  "martin-luther-king-jr.achievement.3":
    "His campaigns were organized around securing specific, concrete legislative outcomes — publicly framed at the time around the Civil Rights Act of 1964 and the Voting Rights Act of 1965 — rather than protest for its own sake, and both pieces of legislation passed within that campaign period.",
  "martin-luther-king-jr.moment.1":
    "The 1963 Birmingham campaign, internally documented by organizers as 'Project C' for confrontation, was staged as a deliberately escalating sequence of actions, and the city was chosen specifically because its police response to protest was expected to be severe and visible enough to draw national media attention.",
  "martin-luther-king-jr.moment.2":
    "Written during his 1963 Birmingham jailing, 'Letter from Birmingham Jail' directly and systematically rebuts specific published criticisms from a group of fellow clergy point by point, addressing their argument that his campaign's timing was premature — a structured written rebuttal, not only a rhetorical appeal.",
  "martin-luther-king-jr.moment.3":
    "Before building the strategic framework he used in the American civil rights movement, he pursued formal theological doctoral study and specifically studied Gandhian nonviolent method in depth, adapting it rather than simply invoking it.",
  "martin-luther-king-jr.turning_point.1":
    "In his final years, King broadened his public focus from segregation specifically to economic justice — organizing the Poor People's Campaign — and, in his 1967 Riverside Church address, to public opposition to the Vietnam War. Both moves drew significant criticism, including from some longtime allies who saw them as a costly dilution of the civil rights message.",
  "martin-luther-king-jr.interpretation.moment.1":
    "The choice reads less like tolerating a conflict that happened to arise and more like locating, in advance, exactly where a confrontation would do the most strategic work — a pattern the profile's opportunity_sensing score also picks up on.",
  "martin-luther-king-jr.interpretation.moment.3":
    "Studying and adapting an existing method, rather than applying raw talent, is closer to what the profile's mastery_orientation score is picking up here: the approach he became known for was deliberately developed, not simply improvised.",
  "martin-luther-king-jr.interpretation.turning_point.1":
    "The profile's belief_updating score is easy to test against this specific record: this was a costly, publicly criticized expansion of position rather than a comfortable pivot, which is exactly the kind of evidence that should carry more weight than a change made under no real pressure at all.",

  /* -------------------------------------------- Batch 2: Rachel Carson */
  "rachel-carson.achievement.1":
    "Silent Spring (1962) synthesized and cross-checked a large body of existing scientific research on pesticide effects into a single, rigorously sourced argument, backed by more than fifty pages of source notes — a book built to hold up under scrutiny, not only to persuade.",
  "rachel-carson.achievement.2":
    "The book is widely credited with catalyzing the modern environmental movement and with directly influencing U.S. pesticide policy, including the eventual domestic ban on DDT — a documented, traceable policy impact, not only a broad cultural one.",
  "rachel-carson.achievement.3":
    "Her career spanned marine-biology research, government science writing at the U.S. Bureau of Fisheries, and popular science writing — The Sea Around Us and Silent Spring among them — sustained, serious output in each rather than a single late-career turn toward advocacy.",
  "rachel-carson.moment.1":
    "After Silent Spring's publication, she continued to publicly defend its findings, including testimony before a U.S. Senate subcommittee, sustaining that defense through a well-funded industry campaign against her personally and professionally, up until her death not long after the book appeared.",
  "rachel-carson.moment.2":
    "She carried out the final stages of the Silent Spring project, and its public defense afterward, while privately managing a diagnosis of terminal cancer that she chose not to disclose publicly at the time.",
  "rachel-carson.moment.3":
    "Once her book royalties made it possible, she left her stable government position at the Bureau of Fisheries to write independently full-time — a documented, deliberate exit from institutional security rather than a continuation of it.",
  "rachel-carson.turning_point.1":
    "Carson published Silent Spring anticipating, correctly, that it would provoke a direct and sustained attack from the chemical industry on both her science and her personal credibility. Rather than retracting or softening her position under that pressure, she continued publicly defending the book's findings for the rest of her life.",
  "rachel-carson.interpretation.moment.2":
    "The profile's risk_tolerance score is worth reading alongside the fuller context here: this was sustained public exposure to a professional attack campaign, carried out while she was also managing a serious personal medical circumstance she chose not to disclose — two separate kinds of strain held at once, not one explaining the other.",
  "rachel-carson.interpretation.turning_point.1":
    "This is about as clean a test of the profile's high conflict_tolerance score as the record offers: she chose to publish already knowing what would follow, which is a stronger claim than simply refusing to back down once criticism arrived unexpectedly.",

  /* -------------------------------------------- Batch 2: Hildegard of Bingen */
  "hildegard-of-bingen.achievement.1":
    "Hildegard authored Physica and Causae et Curae, systematic surviving texts cataloguing plants, animals, and minerals alongside their medicinal uses, with descriptions of human anatomy and reproduction that modern medieval scholars note as unusually direct and detailed for a 12th-century monastic author.",
  "hildegard-of-bingen.achievement.2":
    "She composed Ordo Virtutum, an original liturgical musical drama unusual in form for its era, and wrote Scivias, a visionary theological work organizing reported religious experience into a structured account of cosmology, salvation history, and ethics — both survive as her own direct output, not works attributed to her secondhand.",
  "hildegard-of-bingen.achievement.3":
    "She founded and led two monastic communities over her life, Rupertsberg and later Eibingen — sustained institutional leadership documented in the monastic records of the period.",
  "hildegard-of-bingen.moment.1":
    "Surviving letters show her sending unsolicited moral admonishment directly to Pope Eugenius III and to Emperor Frederick Barbarossa — she had also received a rare Church-sanctioned exception permitting her to preach publicly as a woman in the 12th century.",
  "hildegard-of-bingen.moment.2":
    "Founding the independent Rupertsberg monastery required first relocating her existing community, a move her own abbot initially resisted — a documented dispute she ultimately won, achieving the relocation against his resistance rather than deferring to it.",
  "hildegard-of-bingen.moment.3":
    "Her surviving musical compositions are noted by musicologists for an unusually wide vocal range and a distinctive melodic style for the period, evidence of a deliberate aesthetic approach rather than formulaic liturgical composition.",
  "hildegard-of-bingen.turning_point.1":
    "Late in her life, Hildegard's monastery was placed under a severe ecclesiastical penalty, an interdict, after she refused a church authority's demand to exhume and remove the body of a man buried in the community's cemetery whom the authority considered excommunicated. She refused to comply and directly petitioned church officials until the interdict — which barred her community from performing the liturgy and music central to its life — was lifted only shortly before her death.",
  "hildegard-of-bingen.interpretation.moment.1":
    "What matches the profile's independent_thinking score here is something more specific than general confidence: these were letters she initiated herself, addressed unprompted to the two most powerful offices of her world, not responses solicited from her.",
  "hildegard-of-bingen.interpretation.moment.2":
    "This sits well with the profile's autonomy_need score: the obstacle here was not a distant political power but her own monastic superior, which arguably makes the outcome a more direct test of the trait than the letters to popes and emperors.",
  "hildegard-of-bingen.interpretation.turning_point.1":
    "Both the profile's conflict_tolerance and risk_tolerance scores are live in this one episode, and worth separating: staying in the dispute rather than backing down is one thing, and accepting the real institutional exposure of defying an active interdict is a related but distinct one.",

  /* -------------------------------------------- Batch 2: Florence Nightingale */
  "florence-nightingale.achievement.1":
    "During the Crimean War, Nightingale developed the polar-area diagram — now known as the 'coxcomb' chart — to statistically demonstrate that poor sanitation, not combat wounds, was the leading cause of soldiers' deaths, a specific and methodologically original piece of statistical analysis rather than a general observation.",
  "florence-nightingale.achievement.2":
    "In 1860 she founded the Nightingale Training School for Nurses and went on to lead sustained institutional reform of British military and civilian healthcare over several decades.",
  "florence-nightingale.achievement.3":
    "Her statistical presentations directly persuaded British military and government officials to act, prompting a Royal Commission and a series of sanitary reforms that followed from her reports.",
  "florence-nightingale.moment.1":
    "In 1854, rather than waiting to be officially deployed, she organized her own party of nurses and traveled with them to the Crimean War front to manage field hospital conditions directly, at real personal risk from disease in the war zone.",
  "florence-nightingale.moment.2":
    "She rejected her family's expectation of a conventional upper-class marriage in order to pursue nursing, a profession considered disreputable for a woman of her social class at the time.",
  "florence-nightingale.turning_point.1":
    "After the Crimean War, Nightingale's health declined into a chronic illness that left her largely confined to her bed for most of the remaining five decades of her life. Rather than stepping back from reform work, she continued it entirely through statistical writing and correspondence — moving from British Army medical reform to public health in India — conducted almost entirely from her sickroom.",
  "florence-nightingale.interpretation.moment.1":
    "This is the profile's proactive_agency score in a fairly literal form: the party of nurses existed because she assembled it herself, not because a role was created and offered to her.",
  "florence-nightingale.interpretation.moment.2":
    "The profile's independent_thinking score isn't just about privately holding an unconventional view here — she gave up a specific, expected path in order to act on it, which is a stronger form of the same evidence.",
  "florence-nightingale.interpretation.turning_point.1":
    "The profile's high persistence score has to account for a real change in method here, not just continued effort: the work carried on, but the physically active field nurse of 1854 and the correspondence-driven reformer of the decades after were operating under very different constraints.",

  /* -------------------------------------------- Batch 2: Umm Kulthum */
  "umm-kulthum.achievement.1":
    "For decades, Umm Kulthum maintained a monthly performance tradition — a live radio concert broadcast on the first Thursday of each month — sustained consistently enough that much of Egypt and the wider Arab world organized parts of their evening around it.",
  "umm-kulthum.achievement.2":
    "Her performances are documented by musicologists as a mastery of tarab, the classical Arabic vocal-ornamentation tradition, analyzed across decades of surviving recordings rather than judged from a single celebrated performance.",
  "umm-kulthum.achievement.3":
    "She sustained a decades-long creative partnership with leading composers of her era, notably Riad Al Sunbati, and exercised an unusual degree of creative control over her own orchestra and repertoire selection for a performer of her time.",
  "umm-kulthum.moment.1":
    "As a child, she trained rigorously in vocal performance and was, per multiple biographical accounts, initially disguised as a boy so she could perform religious recitations in public — training that continued and deepened across a performing career that eventually spanned roughly fifty years.",
  "umm-kulthum.moment.2":
    "In performance, she would repeat a single line of a song many times in succession, varying the vocal ornamentation each time, extending it until she judged the emotional effect on the audience had landed — a documented, deliberate technique, not an occasional flourish.",
  "umm-kulthum.turning_point.1":
    "Following Egypt's defeat in the 1967 Arab-Israeli war, Umm Kulthum organized extensive fundraising concert tours on her own initiative, rather than in response to a government request, using her public standing to mobilize concrete financial support for the country.",
  "umm-kulthum.interpretation.moment.2":
    "This is closer to the profile's experimentation score than to simple repetition: each pass through the line was a variation being tested against the audience's response, not the same phrase repeated for effect.",
  "umm-kulthum.interpretation.turning_point.1":
    "The profile's impact_motivation score is worth reading against the specific timing here: this was a self-initiated expansion of her public role into a national one, arriving at a moment of genuine national crisis rather than as a routine extension of an existing charitable pattern.",

  /* -------------------------------------------- Batch 2: Sor Juana */
  "sor-juana-ines-de-la-cruz.achievement.1":
    "By her own account she taught herself to read as a small child, learned Latin in a small number of lessons, and went on to assemble one of the largest private libraries in colonial Spanish America — roughly 4,000 volumes.",
  "sor-juana-ines-de-la-cruz.achievement.2":
    "She produced a substantial body of poetry and theatrical drama that literary scholarship regards as among the most original writing of the Spanish Golden Age.",
  "sor-juana-ines-de-la-cruz.achievement.3":
    "In La Respuesta a Sor Filotea de la Cruz, written directly to a bishop who had publicly criticized her, she built a systematic, point-by-point theological and philosophical argument defending women's right to intellectual life as a general principle, not only a defense of her own individual case.",
  "sor-juana-ines-de-la-cruz.moment.1":
    "As a teenager, she was examined by a panel of scholars at the viceregal court and, by contemporary and later accounts, impressed them with the range of her knowledge — a specific, documented instance of direct public intellectual engagement before she entered convent life.",
  "sor-juana-ines-de-la-cruz.moment.2":
    "She entered convent life as a deliberate, strategic choice rather than a purely religious calling: by her own documented account, it secured the time and personal autonomy for sustained study that marriage would not have allowed a woman in her era.",
  "sor-juana-ines-de-la-cruz.turning_point.1":
    "Late in her life, after years of sustained disagreement with Church authorities over her intellectual pursuits, Sor Juana was pressured into giving up both her library and her writing. The scholarly and literary output that had continued for decades effectively ended there, not long before her death.",
  "sor-juana-ines-de-la-cruz.interpretation.moment.1":
    "This episode is worth separating from her later, more solitary convent scholarship: it shows the same intellectual range on direct public display, in a setting she did not control, rather than developed privately on her own terms.",
  "sor-juana-ines-de-la-cruz.interpretation.moment.2":
    "This reads less as resignation to circumstance and more as the profile's resourcefulness score in a specific, well-documented form: locating an unconventional route to a goal — sustained scholarly life — that had no direct path open to her.",
  "sor-juana-ines-de-la-cruz.interpretation.turning_point.1":
    "Worth stating plainly rather than smoothing over: the profile's high persistence and conflict_tolerance scores describe how long she sustained her position, not that she prevailed in the end — the record includes a real defeat, not only a long resistance.",

  /* -------------------------------------------- Batch 2: Emmy Noether */
  "emmy-noether.achievement.1":
    "Noether's theorem, proved in 1915, established that every differentiable symmetry of a physical system corresponds to a conservation law — a foundational result still in standard use across theoretical physics and mathematics.",
  "emmy-noether.achievement.2":
    "She developed the foundational abstract-algebra concepts now called Noetherian rings, restructuring how the field approached its core objects around general structural properties rather than case-by-case computation.",
  "emmy-noether.achievement.3":
    "She sustained roughly three decades of prolific mathematical output at Göttingen despite working for much of that career without a formal academic appointment or a salary commensurate with her male colleagues.",
  "emmy-noether.moment.1":
    "For years, formally barred from holding a lecturing position at Göttingen because she was a woman, she lectured under the university's official listing of David Hilbert's name instead — a specific, documented institutional workaround, not simply being blocked.",
  "emmy-noether.moment.2":
    "At Göttingen she informally led a lively circle of students who became known as the 'Noether boys,' working through mathematics with them in open, engaged discussion rather than through formal lecture alone.",
  "emmy-noether.turning_point.1":
    "In 1933, dismissed from her position under new Nazi racial laws, Noether fled Germany and rebuilt her career at Bryn Mawr College in the United States, teaching and continuing her research there until her death two years later.",
  "emmy-noether.interpretation.moment.1":
    "The barrier itself never moved; what changed is that she found a way to keep teaching and researching around it rather than through it — a fairly direct read on the profile's resourcefulness score.",
  "emmy-noether.interpretation.turning_point.1":
    "The profile's proactive_agency score is worth reading carefully here: leaving was not itself a choice under the actual circumstances, but where and how quickly she rebuilt a working research career afterward was.",

  /* -------------------------------------------------- Batch 3: F. Kafka */
  "franz-kafka.achievement.1":
    "Developed a distinctive narrative mode blending exacting bureaucratic procedure with surreal menace — a style later given his own name, \"Kafkaesque\" — with no direct precedent in the literature of his time, documented via its lasting critical recognition and terminological legacy.",
  "franz-kafka.achievement.2":
    "Over a 14-year career (1908–1922) at the Workers' Accident Insurance Institute for the Kingdom of Bohemia, he rose from entry-level clerk to Senior Legal Secretary — a demanding position he held as one of only two Jewish employees among 263 in 1913 — while sustaining an intensive nightly private writing practice for the same period.",
  "franz-kafka.achievement.3":
    "At the Institute, he designed a risk-categorization system for classifying companies by their level of industrial accident risk and drafted workplace safety regulations — professional work documented to have materially reduced industrial accidents in one of the most heavily industrialized regions of Europe, entirely separate from his literary output.",
  "franz-kafka.moment.1":
    "Kafka instructed his friend Max Brod to burn his unpublished manuscripts, including the novels The Trial, The Castle, and Amerika, after his death. Brod did not comply, and all three were published posthumously.",
  "franz-kafka.moment.2":
    "His letters to Felice Bauer document a sustained, explicit conflict between wanting a conventional domestic life and needing solitary time to write — a conflict that ultimately ended both of his engagements to her.",
  "franz-kafka.moment.3":
    "His own letters and diaries, corroborated by contemporaries including Max Brod, consistently describe him as socially anxious and self-doubting in his personal relationships — an honestly low trait score drawn directly from that documented pattern rather than inferred from his literary reputation.",
  "franz-kafka.interpretation.moment.1":
    "A milder pattern of ordinary revision doesn't quite cover this — wanting nearly all of it erased is closer to what the profile's dual-edged perfectionism score is describing.",
  "franz-kafka.interpretation.moment.2":
    "Read against the profile's autonomy_need score, this isn't cold feet about marriage in general — his own letters name the specific thing marriage would have cost him.",

  /* -------------------------------------------------- Batch 3: V. van Gogh */
  "vincent-van-gogh.achievement.1":
    "Left nearly 900 surviving letters, mostly to his brother Theo, directly documenting his deliberate reasoning about color relationships and composition alongside a body of more than 2,000 surviving works — a distinctive style built on thick impasto and expressive color choices that departed clearly from the academic and Impressionist conventions of his time.",
  "vincent-van-gogh.achievement.2":
    "During his final roughly fifteen months in Arles and Saint-Rémy alone, he produced around 200 paintings, with individual works documented to have sometimes been completed within a single sitting or day.",
  "vincent-van-gogh.achievement.3":
    "Continued producing work at a high rate for roughly a decade despite a documented, near-total absence of commercial success in his lifetime — he is recorded to have sold only one or two paintings while alive — evidence against a success- or reward-driven reading of his output.",
  "vincent-van-gogh.moment.1":
    "His attempt at a shared studio arrangement with the painter Paul Gauguin in Arles — the \"Yellow House\" period, which he had proactively invited Gauguin to join as the seed of a shared artists' colony — lasted only about two months before ending in a well-documented breakdown.",
  "vincent-van-gogh.moment.2":
    "He studied and collected Japanese ukiyo-e prints extensively, directly incorporating their flattened perspective and bold outlines into his own compositions — a documented interest that reached beyond his immediate painting practice.",
  "vincent-van-gogh.moment.3":
    "He moved to Arles specifically to secure his own independent studio space, which his letters describe as a deliberate choice for creative independence rather than a matter of circumstance.",
  "vincent-van-gogh.turning_point.1":
    "At 27, after leaving a series of earlier, more conventional paths — art dealing, teaching, lay preaching — with no proven ability as a painter, he committed to painting full-time, relying on his brother Theo's financial support to make the shift possible.",
  "vincent-van-gogh.interpretation.moment.1":
    "The profile's collaboration score is drawn narrowly from this one arrangement's documented outcome, not from a broader claim about how he got along with people.",
  "vincent-van-gogh.interpretation.moment.3":
    "Worth noting for the profile's autonomy_need score: the studio wasn't where he happened to end up, but a space his own letters describe seeking out deliberately.",
  "vincent-van-gogh.interpretation.turning_point.1":
    "The profile's risk_tolerance score is grounded in this one dated, comparatively late decision, not a general claim about risk running through his whole life.",
  "vincent-van-gogh.legacy":
    "Van Gogh died on 29 July 1890, two days after being shot in the chest in a wheat field near Auvers-sur-Oise; questioned by police, he said only, \"Do not accuse anybody, it is I that wished to commit suicide,\" and the Van Gogh Museum's own account of his death still describes it as self-inflicted. A 2011 biography by Steven Naifeh and Gregory White Smith, already cited elsewhere in this profile, argued instead that he was shot accidentally by two local teenagers and covered for them — a theory Van Gogh Museum researchers formally rebutted in 2013 and that has not been accepted by most scholars, but that means the manner of his death is not treated as fully settled across every account this profile draws on. His posthumous reputation diverged sharply from his lifetime obscurity: paintings that went almost entirely unsold while he lived are now among the most sought-after and expensive in the history of Western art.",

  /* -------------------------------------------------- Batch 3: T. Aquinas */
  "thomas-aquinas.achievement.1":
    "The Summa Theologica organizes the whole of Christian theology and Aristotelian philosophy into one coherent structural framework, applying a consistent question-objection-response method across thousands of individual articles — directly observable in the surviving text's own organization.",
  "thomas-aquinas.achievement.2":
    "Produced this extraordinary documented volume of work within a working life of roughly two decades, while also teaching and traveling, using a documented method of dictating to multiple secretaries on different works simultaneously.",
  "thomas-aquinas.achievement.3":
    "Integrated newly translated, controversial \"pagan\" Aristotelian philosophy into Christian theology despite resistance from some Church authorities; several Thomistic propositions were formally condemned by the Bishop of Paris in 1277, a few years after his death.",
  "thomas-aquinas.moment.1":
    "A widely repeated account describes him becoming so absorbed in thought at a royal dinner that he struck the table, oblivious to the company, having just resolved a theological problem — a specific, often-cited anecdote rather than one of several independently corroborated episodes.",
  "thomas-aquinas.moment.2":
    "He was widely known among fellow students by the nickname \"the Dumb Ox\" for his quiet, reserved manner — reportedly defended at the time by his teacher, Albert the Great, who predicted his eventual renown.",
  "thomas-aquinas.turning_point.1":
    "A widely documented account holds that following a mystical experience during Mass on 6 December 1273, he stopped writing, reportedly telling his secretary that everything he had written now seemed like straw to him next to what he had witnessed. He never resumed the Summa, which remained unfinished at his death roughly three months later.",
  "thomas-aquinas.interpretation.achievement.3":
    "The profile's independent_thinking score is worth reading through what it cost him — formal posthumous condemnation, not merely a private disagreement never voiced publicly.",
  "thomas-aquinas.interpretation.turning_point.1":
    "This complicates rather than confirms the profile's high mastery_orientation score: by his own reported account, the work didn't stop because it was finished, but because the whole undertaking had come to seem beside the point.",

  /* -------------------------------------------------- Batch 3: Maimonides */
  "maimonides.achievement.1":
    "The Mishneh Torah systematically organizes the entire body of Jewish religious law into one coherent, topically structured code across fourteen books — a documented, unprecedented organizational undertaking directly observable in the surviving text.",
  "maimonides.achievement.2":
    "Sustained genuine professional achievement across three distinct domains: religious law (the Mishneh Torah), philosophy (the Guide for the Perplexed, reconciling Aristotelian rationalism with Jewish theology), and medicine, where he served as a court physician and wrote several surviving treatises.",
  "maimonides.achievement.3":
    "Served as physician to Saladin's vizier al-Qadi al-Fadil and as Nagid — recognized leader — of the Fustat Jewish community, applying his scholarship directly to public medical and communal service.",
  "maimonides.moment.1":
    "By his own surviving letters describing his schedule, he maintained a demanding daily medical practice at court while continuing major scholarly writing.",
  "maimonides.moment.2":
    "He self-initiated the Mishneh Torah project without royal or communal commission — his own undertaking, per the Stanford Encyclopedia of Philosophy's account of the work's origin.",
  "maimonides.turning_point.1":
    "He fled religious persecution under Almohad rule from Córdoba, and after years of displacement through Fez and Palestine, eventually settled in Fustat, Egypt, where he rebuilt both his medical and scholarly career.",
  "maimonides.interpretation.moment.2":
    "Nobody commissioned this — which is close to exactly what the profile's proactive_agency score is picking up on.",
  "maimonides.interpretation.turning_point.1":
    "The profile's resourcefulness score fits this account reasonably well, though the surviving record documents where he ended up more fully than exactly how he got there.",

  /* -------------------------------------------------- Batch 3: Sequoyah */
  "sequoyah.achievement.1":
    "Single-handedly created the Cherokee syllabary — a complete 85-character writing system for the Cherokee language — despite being unable to read English or any other existing script, one of very few historically documented instances of a single person independently devising a functional writing system.",
  "sequoyah.achievement.2":
    "Worked on developing the syllabary for approximately 12 years, including working through skepticism and accusations of witchcraft from within his own community during the process.",
  "sequoyah.achievement.3":
    "Explicitly pursued the syllabary to give the Cherokee people their own means of written communication and preserve their language; the finished system was subsequently adopted as an official writing system by the Cherokee Nation.",
  "sequoyah.moment.1":
    "He faced documented accusations of witchcraft from within his own community during the syllabary's development — a real social risk he continued working through rather than abandoning the project.",
  "sequoyah.moment.2":
    "He developed the syllabary's methodology through iterative experimentation, including an early, unsuccessful attempt at a full logographic system before settling on the syllabic approach that ultimately succeeded.",
  "sequoyah.turning_point.1":
    "Reportedly after observing European settlers' use of writing, he recognized the transformative potential written language could have for the Cherokee people — before any formal institutional effort toward Cherokee literacy existed.",
  "sequoyah.interpretation.moment.2":
    "A narrower reading of the profile's adaptability score than his broader biography might suggest: revising one specific failing method, not a general flexibility.",
  "sequoyah.interpretation.turning_point.1":
    "The profile's opportunity_sensing score traces to this one observation, made well before any institutional Cherokee-literacy effort existed to prompt it.",

  /* -------------------------------------------------- Batch 3: Sojourner Truth */
  "sojourner-truth.achievement.1":
    "In 1828, she sued a white man in court to recover her illegally sold son and won — a specific, legally recorded case, extraordinarily rare for a Black woman in that era.",
  "sojourner-truth.achievement.2":
    "Became a nationally sought-after extemporaneous speaker across the abolitionist and suffrage circuits for decades; multiple independent eyewitness accounts corroborate her powerful oratory, even though the exact wording of her most famous speech is separately disputed among historians — the sustained speaking career itself, not any one disputed transcript, is what's documented here.",
  "sojourner-truth.achievement.3":
    "Continued touring and speaking into her 80s, decades after emancipation had already been achieved.",
  "sojourner-truth.moment.1":
    "In 1843, she chose to rename herself from Isabella Baumfree to Sojourner Truth, explicitly framing the new name as her own chosen spiritual and political mission rather than an inherited identity.",
  "sojourner-truth.moment.2":
    "She sold cartes de visite of her own portrait, captioned \"I Sell the Shadow to Support the Substance,\" as a documented, self-devised method of funding her activism.",
  "sojourner-truth.turning_point.1":
    "In 1826, she made a documented decision to walk away from her enslaver to freedom, taking her infant daughter with her rather than waiting for New York's gradual emancipation law to take effect the following year.",
  "sojourner-truth.interpretation.moment.1":
    "Choosing a new name is one thing; the profile's independent_thinking score is picking up on how explicitly she framed it as her own chosen mission rather than an inherited one.",
  "sojourner-truth.interpretation.turning_point.1":
    "The profile's decisiveness score is anchored in this one dated choice not to wait for the law to catch up, separate from the more familiar public career that followed.",

  /* -------------------------------------------------- Batch 3: B. R. Ambedkar */
  "br-ambedkar.achievement.1":
    "Earned multiple doctoral degrees, at Columbia University and the London School of Economics, while born into a caste facing severe documented educational discrimination, and went on to chair the committee that drafted India's constitution.",
  "br-ambedkar.achievement.2":
    "As chair of the Constitution's Drafting Committee, built a comprehensive framework integrating fundamental rights, federal structure, and social-reform provisions, and separately founded multiple political and social organizations, including the Independent Labour Party and the Scheduled Castes Federation.",
  "br-ambedkar.achievement.3":
    "Produced substantive work across economics (his doctoral dissertations, including The Problem of the Rupee), law (the constitutional drafting), and social and religious reform (his conversion to Buddhism and his writing on caste).",
  "br-ambedkar.moment.1":
    "He organized the 1927 Mahad Satyagraha, a public water-access protest, and later publicly burned the Manusmriti in protest — sustained, direct public confrontation with the caste system's institutional defenders across his career.",
  "br-ambedkar.moment.2":
    "He secured funding and access to elite international education at Columbia and the London School of Economics despite starting from a caste facing severe documented institutional barriers to basic schooling.",
  "br-ambedkar.turning_point.1":
    "In the 1932 Communal Award dispute, Ambedkar broke publicly and decisively with Gandhi over separate electorates for Dalits, ultimately negotiating the Poona Pact rather than accepting Gandhi's position unchanged — a documented rupture with the era's dominant nationalist leadership that reshaped his subsequent standing as an independent political voice for Dalit rights.",
  "br-ambedkar.interpretation.moment.1":
    "The profile's conflict_tolerance score describes a repeated strategy across specific, named incidents here, not a single isolated act of defiance.",
  "br-ambedkar.interpretation.turning_point.1":
    "Disagreeing with Gandhi's own stature carries more evidentiary weight for the profile's independent_thinking score than a lower-stakes dispute would.",

  /* -------------------------------------------------- Batch 3: K. Johnson */
  "katherine-johnson.achievement.1":
    "Hand-calculated the trajectory for Alan Shepard's 1961 flight, and personally verified John Glenn's 1962 orbital trajectory at Glenn's own request before he would fly — documented, specific calculations with real mission consequences.",
  "katherine-johnson.achievement.2":
    "Sustained a 33-year career at NACA/NASA (1953–1986), navigating a segregated and then integrating workplace across the Mercury, Apollo, and Space Shuttle programs.",
  "katherine-johnson.achievement.3":
    "Pioneered novel analytic geometry techniques for calculating orbital trajectories, adapting existing mathematical methods to a genuinely new spaceflight context.",
  "katherine-johnson.moment.1":
    "She proactively requested inclusion in previously male-only editorial meetings for the Flight Research Division, rather than waiting to be invited.",
  "katherine-johnson.moment.2":
    "She completed high school by 14 and college by 18, advancing rapidly through West Virginia's segregated school system on the strength of sustained early mathematical interest.",
  "katherine-johnson.moment.3":
    "She is documented primarily as an individual technical contributor across her NASA career rather than in a formal team-leadership role — an honestly lower, specifically-scored finding rather than an assumption drawn from her wider public renown.",
  "katherine-johnson.interpretation.moment.1":
    "The profile's proactive_agency score is a fairly literal match here: she wasn't invited into that room, she asked to be.",

  /* -------------------------------------------------- Batch 3: Muhammad Ali */
  "muhammad-ali.achievement.1":
    "A three-time heavyweight champion who repeatedly sought rematches against top rivals, including Joe Frazier and George Foreman, rather than avoiding difficult opponents, and who returned to boxing after a three-and-a-half-year ban to reclaim the title twice more.",
  "muhammad-ali.achievement.2":
    "Extensively documented across decades of recorded interviews and press conferences for direct, public, often deliberately provocative self-promotion and pre-fight psychological tactics against opponents.",
  "muhammad-ali.achievement.3":
    "Significantly adjusted his in-ring fighting style across his career — from early speed-based boxing to the \"rope-a-dope\" strategy against Foreman as he aged — documented via boxing-historical analysis of his fights.",
  "muhammad-ali.moment.1":
    "He converted to Islam and changed his name from Cassius Clay in 1964, and later took the position of refusing military induction, both against near-unanimous public and media condemnation at the time.",
  "muhammad-ali.moment.2":
    "He explicitly framed his later-career activism and public statements around broader civil rights and religious identity, not personal athletic legacy alone.",
  "muhammad-ali.turning_point.1":
    "In 1967, he publicly refused induction into the U.S. military on religious grounds, resulting in the loss of his boxing license and heavyweight title and a felony conviction, later overturned, at the height of his athletic career. He sustained the position through a multi-year legal battle and the full ban rather than reversing course.",
  "muhammad-ali.interpretation.moment.1":
    "Two separate, dated public stances taken against the era's dominant opinion carry more weight for the profile's independent_thinking score than either one alone would.",
  "muhammad-ali.interpretation.turning_point.1":
    "This is a real, dated cost, not a comfortable stance — losing his title and livelihood at his athletic peak is what the profile's risk_tolerance score is actually pricing in.",

  /* -------------------------------------------------- Batch 3: M. Wollstonecraft */
  "mary-wollstonecraft.achievement.1":
    "A Vindication of the Rights of Woman (1792) directly argued against prevailing Enlightenment-era assumptions about women's education and rationality, including Rousseau's, building a structured, sustained philosophical rebuttal rather than a general objection.",
  "mary-wollstonecraft.achievement.2":
    "Established her own school and later supported herself entirely through professional writing — a path not conventionally available to women at the time.",
  "mary-wollstonecraft.achievement.3":
    "Produced real output across political philosophy (the Vindication), travel writing (Letters Written in Sweden), fiction, and educational theory.",
  "mary-wollstonecraft.moment.1":
    "She published under her own name arguing positions widely considered radical and reputation-damaging for a woman in 1792, and lived independently, unmarried, and self-supporting as a professional writer — unusual and stigmatized for a woman at the time.",
  "mary-wollstonecraft.moment.2":
    "A Vindication of the Rights of Woman was written during a documented, intense six-week period of sustained writing, per William Godwin's account of her working process.",
  "mary-wollstonecraft.moment.3":
    "Her public intellectual position drew significant contemporary criticism, which intensified after her death, when her husband William Godwin's posthumously published memoir revealed private details of her life that scandalized many contemporary readers.",
  "mary-wollstonecraft.interpretation.achievement.1":
    "A structured, named rebuttal of specific Enlightenment authorities is what the profile's independent_thinking score is picking up on here, not a vaguer general dissatisfaction.",
  "mary-wollstonecraft.interpretation.moment.3":
    "Criticism that deepened after her death, not only pressure she withstood while still able to answer it, is the fuller shape of the profile's conflict_tolerance score here.",

  /* -------------------------------------------------- Batch 4: F. Dostoevsky */
  "fyodor-dostoevsky.achievement.1":
    "He wrote his most enduring novels — Crime and Punishment, The Idiot, The Possessed — in direct parallel with the most acute period of his own financial crisis and gambling addiction abroad, rather than after resolving either.",
  "fyodor-dostoevsky.achievement.2":
    "He repeatedly converted real, observed events into major fiction across four decades: a courier's roadside cruelty witnessed as a teenager reappeared in two later novels, a newspaper account of a seamstress's suicide became The Meek One within the same publication cycle, and the 1869 murder by a radical political circle became The Possessed.",
  "fyodor-dostoevsky.moment.1":
    "Facing a publishing contract that required delivering an entirely new novel within about a month or forfeiting his rights to existing and future work for nine years, he hired a stenographer and dictated The Gambler to the deadline, then filed the finished manuscript with a notary roughly two hours before the publisher's office would have closed.",
  "fyodor-dostoevsky.moment.2":
    "His second wife Anna's contemporaneous 1867 diary records a repeating pattern in their early marriage: sharp quarrels — he would \"get into a terrible rage\" over something as small as poor restaurant service — followed by quick reconciliation within the same day, a firsthand account from the person who observed it daily.",
  "fyodor-dostoevsky.turning_point.1":
    "In December 1849 he was led through a staged mock execution — blindfolded, tied to a post, facing a raised firing squad — before a last-minute reprieve that had, unknown to the prisoners, already been decided the day before as deliberate psychological terror. In a letter to his brother written hours later, he described not despair but an intensified will to live: \"Life is a gift, life is happiness... I am living again!\"",
  "fyodor-dostoevsky.turning_point.2":
    "From the early 1870s he progressively ceded real financial and business authority — contract negotiation, pricing, publishing operations — to Anna, writing to her in 1876 that \"everything is in your power alone... I so highly value and trust in your mind.\" It reversed the previous decade's pattern of exclusively self-directed financial decisions, the same pattern that had produced his bankruptcy.",
  "fyodor-dostoevsky.interpretation.achievement.1":
    "This pattern — output sustained through crisis rather than only after it — is consistent with the profile's high persistence score.",
  "fyodor-dostoevsky.interpretation.moment.1":
    "This single, specific episode is the clearest documented instance behind the profile's high execution_speed score.",
  "fyodor-dostoevsky.interpretation.turning_point.1":
    "This response to a near-death event, before it was later revealed to have been staged terror, is consistent with the profile's high belief_updating and adaptability scores — reframing an extreme, unchosen circumstance rather than being paralyzed by it.",
  "fyodor-dostoevsky.interpretation.turning_point.2":
    "Handing over financial control, after a decade of solitary decisions had produced bankruptcy, is one specific documented instance behind the profile's collaboration score.",

  /* ------------------------------------------------------ Batch 4: L. Pasteur */
  "louis-pasteur.achievement.1":
    "He founded the field of stereochemistry by hand-separating mirror-image forms of tartrate crystals under a microscope, sorting them one by one based on tiny asymmetric facets — a discovery built from unusually careful, repetitive manual observation rather than a single flash of insight.",
  "louis-pasteur.achievement.2":
    "Beginning in 1857, Pasteur demonstrated that fermentation was caused by living microorganisms rather than a purely chemical process — a minority scientific position he advanced against the dominant view of the time. He extended this into a direct public refutation of spontaneous generation, most decisively in an 1864 debate at the Académie des Sciences against Félix Pouchet, helping establish that microorganisms arise only from other microorganisms — a foundational premise of modern germ theory and microbiology.",
  "louis-pasteur.achievement.3":
    "In 1881, at a widely publicized public field trial at Pouilly-le-Fort, Pasteur demonstrated that vaccination could protect livestock against anthrax, convincing skeptical scientists and the wider agricultural public that vaccination worked against bacterial disease generally. Four years later, in July 1885, he administered an experimental rabies treatment to nine-year-old Joseph Meister — the first successful human rabies vaccination — and the resulting surge in demand for treatment directly led to the founding of the Institut Pasteur in 1887–88, which by 2014 had produced ten Nobel Prize laureates among its researchers.",
  "louis-pasteur.moment.1":
    "At the 1881 public field trial of his anthrax vaccine at Pouilly-le-Fort, he deliberately built his most vocal skeptic — a veterinarian who rejected germ theory outright — into the trial's own oversight structure, letting him select the animals and supervise the exposure, then addressed the assembled politicians, journalists, and farmers in a plain, familiar tone that reportedly charmed the crowd.",
  "louis-pasteur.turning_point.1":
    "Three of his five children died of typhoid fever within his lifetime, and the accumulated grief and overwork of this period is linked by multiple biographers to a stroke in 1868 that permanently paralyzed part of his left arm and leg. From that point he worked mainly through trusted assistants, directing the physical laboratory work rather than carrying it out himself.",
  "louis-pasteur.turning_point.2":
    "Facing a boy considered near-certain to die of rabies without intervention, he personally decided — despite holding no medical license, a real legal risk — to administer an experimental treatment previously tested only in animals; his own words describe the decision as made \"not without acute and harrowing anxiety.\" His most trusted collaborator initially refused to take part, believing it premature and unjust, and a second physician who did hold a license ultimately administered the injections.",
  "louis-pasteur.interpretation.turning_point.1":
    "Continuing to direct research while relying on others for the manual work is consistent with the profile's adaptability score — a real change in working method, not a change in ambition.",
  "louis-pasteur.interpretation.turning_point.2":
    "Proceeding under this much uncertainty, hedged by his own collaborator's initial refusal and his own admitted anxiety, is one of the more fully documented instances behind the profile's risk_tolerance score — not an act of simple confidence.",
  "louis-pasteur.turning_point.3":
    "At the French government's request, he spent five years investigating a silkworm disease in a field where he had essentially no prior background — a period historians describe as an \"epistemological rupture\" that converted him from a chemist into a biologist.",
  "louis-pasteur.complexities.1":
    "The vaccine actually administered at that public trial was not the method he had publicly implied — which had not reliably worked — but a chemically inactivated preparation developed by a rival he had publicly dismissed and refined by his own assistant. He ordered the substitution kept quiet, and it became known only when his private notebooks were published nearly a century later.",

  /* ----------------------------------------------------- Batch 4: L. Armstrong */
  "louis-armstrong.achievement.1":
    "Back in Chicago, he formed the Hot Five, and later the Hot Seven, under his own name — drawing several musicians directly from his former mentor's own band — and built a body of recordings that established him as a bandleader in his own right.",
  "louis-armstrong.achievement.2":
    "In the mid-to-late 1920s, his improvised solo playing on the records he made under his own name — the Hot Five and Hot Seven sessions — is credited with transforming jazz from a primarily ensemble-based music into a genre centered on the individual improvising soloist; his biographer Terry Teachout writes that he \"essentially created the idea of the jazz man as soloist.\" In the same period he also helped develop and popularize scat singing, wordless vocal improvisation that became a lasting technique in jazz vocal performance.",
  "louis-armstrong.moment.1":
    "Arrested for firing a pistol into the air on New Year's Eve 1912, the eleven-year-old Armstrong was sent to the Colored Waif's Home for Boys, where an instructor taught him proper cornet technique; he rose to lead the Home's own brass band before his release in 1914.",
  "louis-armstrong.moment.2":
    "Departing sharply from his usual public reticence about politics, he condemned the federal government's handling of the 1957 Little Rock school-desegregation crisis directly to a reporter, calling the president \"two-faced\" with \"no guts\" — and when his own manager later suggested publicly that he was \"sorry\" about the remarks, Armstrong immediately contradicted that framing and reaffirmed his position.",
  "louis-armstrong.moment.3":
    "He kept a self-driven practice of documenting his own life across five decades, entirely outside any publisher or ghostwriter — roughly 650 reel-to-reel tapes, 5,000 photographs, and 86 scrapbooks kept from 1926 onward, with hand-annotated mixtapes carrying his own collage artwork.",
  "louis-armstrong.turning_point.1":
    "In 1924 he married pianist Lil Hardin, a trained musician who pushed him to leave his mentor Joe Oliver's shadow rather than remain a sideman indefinitely. He tried Fletcher Henderson's New York orchestra the next year, found the year unsatisfying, and returned to Chicago — the point at which he began building a career under his own name instead of someone else's.",
  "louis-armstrong.interpretation.moment.2":
    "A rare public departure from an otherwise carefully maintained persona, made and then defended rather than walked back, is consistent with the profile's risk_tolerance score.",
  "louis-armstrong.interpretation.turning_point.1":
    "Leaving an established, secure position for one built on his own name is one specific documented instance behind the profile's autonomy_need and proactive_agency scores.",

  /* -------------------------------------------------------- Batch 4: A. Morita */
  "akio-morita.achievement.1":
    "In 1953 he committed his still-small company to a large, largely non-recoverable licensing fee for transistor technology from Western Electric, at a time when the wider electronics industry considered transistors suited mainly to hearing aids rather than the consumer electronics he intended to build.",
  "akio-morita.achievement.2":
    "He pushed the Walkman project forward in 1979 against near-unanimous internal opposition — market research predicted rejection, sales projected an unachievable volume target, marketing called the name embarrassing — and personally told Sony's board he would resign if it failed.",
  "akio-morita.moment.1":
    "When the new pocket transistor radio (1957) proved slightly too large for a standard shirt pocket, he had sales staff wear specially tailored shirts with enlarged pockets during demonstrations, so the product would visibly read as pocket-sized to buyers.",
  "akio-morita.moment.2":
    "After a young musician, Norio Ohga, wrote a sharply critical letter comparing the company's poor tape-recorder sound quality to a dancer needing an accurate mirror, Morita brought Ohga on as a paid consultant rather than dismiss the criticism — Ohga later became Sony's own CEO and chairman.",
  "akio-morita.moment.3":
    "After Japan's Ministry of International Trade and Industry delayed releasing the foreign currency needed to pay the transistor licensing fee for roughly six months, he later drew a blunt lesson from the episode: \"government often impedes innovative change and developments by excessive intervention.\"",
  "akio-morita.turning_point.1":
    "From 1960 he rejected offers to market the company's products under established American brand names, insisting on building an independent identity abroad, and personally relocated to the United States with his wife and children to learn the market firsthand before committing further — sustaining roughly a decade of unprofitable U.S. operations before the American business became a major contributor.",
  "akio-morita.interpretation.achievement.2":
    "Telling the board he would resign over a product almost everyone around him doubted is consistent with the profile's high decisiveness and risk_tolerance scores.",
  "akio-morita.interpretation.turning_point.1":
    "Choosing an unproven independent identity over an established one, backed by personally relocating to learn the market rather than delegating it, is one of the clearer documented instances behind the profile's risk_tolerance and adaptability scores.",

  /* ------------------------------------------------------ Batch 4: O. Niemeyer */
  "oscar-niemeyer.achievement.1":
    "He designed and built the entire government and civic core of Brasília — the presidential palace, national congress, cathedral, and supreme court — within four years, working alongside his own former mentor Lúcio Costa after being personally invited by President Kubitschek at Niemeyer's own home.",
  "oscar-niemeyer.achievement.2":
    "During two decades of exile from Brazil, he sustained an internationally distributed practice across France, Algeria, Italy, Portugal, and Lebanon — including two American commissions designed entirely by mail without ever visiting the sites — while collaborating with his daughter, Anna Maria, on furniture design.",
  "oscar-niemeyer.moment.1":
    "At 91 he won Britain's RIBA Royal Gold Medal but did not travel to London to accept it in person — reportedly because of a genuine fear of flying, a specific personal limit set against a career built substantially on remote and international commissions.",
  "oscar-niemeyer.moment.2":
    "At 101, when directly asked whether his signature curves referenced the female body — a claim repeated in coverage of his furniture designs and consistent with his own memoir's nature-derived language about curves — he flatly denied it: \"The form comes from nothing.\"",
  "oscar-niemeyer.moment.3":
    "At nearly 100 he described his continued daily work plainly rather than dramatizing it — \"I just did my work... I tried to do the things I liked to do\" — still climbing the stairs each morning to a full day of work in his penthouse office, and at 101 kept a fixed daily schedule of press meetings and design work rather than treating retirement as a live option.",
  "oscar-niemeyer.turning_point.1":
    "After the 1964 military coup, his office was raided and his clients disappeared; the following year he and roughly two hundred University of Brasília professors collectively resigned in protest of the government's treatment of the university. Facing direct professional persecution — one government minister reportedly said \"the place for a communist architect is Moscow\" — he left Brazil for exile in France in 1965 rather than moderate his politics to stay.",
  "oscar-niemeyer.interpretation.turning_point.1":
    "Accepting exile and lost commissions rather than disavowing a political commitment to preserve his career is consistent with the profile's independent_thinking and risk_tolerance scores.",

  /* --------------------------------------------------- Batch 4: A.S. Suu Kyi */
  /* Profile V2 pilot (2026-08), Complexities pilot: turning_point.2's Rohingya-era
     material is not really a personal-trajectory turning point in the sense
     turning_point.1 is -- it's later conduct that complicates an otherwise
     heroic reputation, exactly the shape Complexities exists for. Moved there
     verbatim (facts unchanged, already well-hedged: "international
     investigators characterized," her own words quoted for her defense
     rather than the profile asserting a verdict). Its old interpretation
     read both this period AND the 1988 return as one continuous expression
     of conflict_tolerance -- a forced-symmetry reading that risked morally
     flattening two very differently-valenced episodes into one neutral
     trait descriptor. Dropped rather than kept or rewritten: per the Writing
     Standard, not every item needs an interpretation, and this is exactly
     the case where adding one is riskier than leaving the facts to stand on
     their own. achievement.2 (the 2015 election / State Counsellor role) is
     new, giving the 2015 shift its own home as a genuine accomplishment
     distinct from the later Complexities material, sourced from this
     person's own existing citations (src_assk_jod, src_assk_time) --
     already on her record, re-verified for this specific claim rather than
     assumed to cover it. */
  "aung-san-suu-kyi.achievement.1":
    "In 1990 the National League for Democracy, which she co-founded and led, won a landslide election victory while she remained under house arrest and unable to campaign; the ruling military junta refused to recognize the result or transfer power. She was awarded the 1991 Nobel Peace Prize the following year, still unable to travel to accept it in person, and directed the full prize money — roughly $1.3 million — into a health and education trust for the Burmese people rather than keep it.",
  "aung-san-suu-kyi.achievement.2":
    "In November 2015, she led the National League for Democracy to a landslide election victory, forming Myanmar's first government led by her party after five decades of military-dominated rule. Barred from the presidency by a constitutional provision aimed specifically at her because her sons hold foreign citizenship, she took the newly created role of State Counsellor to lead the government in practice.",
  "aung-san-suu-kyi.moment.1":
    "Her father, independence leader Aung San, was assassinated by political rivals when she was two years old, and she was raised largely on his posthumous reputation while her mother became a prominent public figure in her own right, serving as Burma's ambassador to India and Nepal. In her own essay \"Freedom from Fear,\" she later held up her father's willingness \"to speak the truth, to stand by his word, to accept criticism, to admit his faults, to correct his mistakes, to respect the opposition\" as her model for confronting fear.",
  "aung-san-suu-kyi.moment.2":
    "Across roughly fifteen of the twenty-one years she spent under house arrest between 1989 and 2010, she kept a routine of pre-dawn meditation, extensive reading — including biographies of Gandhi, Nehru, and Mandela — and household chores, following outside news by BBC radio without a telephone, computer, or internet connection for most of the period. She practiced piano regularly in the earlier part of her detention, reportedly Mozart, until Burma's humidity permanently warped the instrument out of tune.",
  "aung-san-suu-kyi.turning_point.1":
    "She returned to Burma in March 1988 only to nurse her mother after a stroke, with no stated political intention. Within six months she had addressed a rally of roughly half a million people at the Shwedagon Pagoda calling for democratic government, later explaining the shift in her own words: \"I could not as my father's daughter remain indifferent to all that was going on.\"",
  "aung-san-suu-kyi.interpretation.turning_point.1":
    "This account, told in her own words years later, is consistent with the profile's proactive_agency score — a stated shift from a private, literary life to national political leadership within months, prompted by circumstance rather than long premeditation.",
  "aung-san-suu-kyi.complexities.1":
    "As State Counsellor from 2016, she led Myanmar's civilian government during a 2017 military campaign against Rohingya communities in Rakhine State. A UN Independent International Fact-Finding Mission later concluded there was sufficient evidence of \"genocidal intent\" to warrant prosecuting Myanmar's top military leadership for genocide, documenting mass killing, mass rape, and the burning of hundreds of villages; her government did not publicly criticize the military's conduct during this period. In December 2019 she personally represented Myanmar at the International Court of Justice, arguing in her own words that the country was \"dealing with an internal armed conflict\" to which its military \"responded,\" rather than a campaign against civilians. In February 2021, the same military arrested her in a coup that annulled her party's re-election; she remains in military custody as of this writing.",
  "aung-san-suu-kyi.life_arc.1":
    "Born in Rangoon, British Burma; her father, independence leader Aung San, was assassinated when she was two.",
  "aung-san-suu-kyi.life_arc.2":
    "Returned to Burma to nurse her mother, and within months became the leading figure of the pro-democracy movement.",
  "aung-san-suu-kyi.life_arc.3": "Spent most of two decades under house arrest imposed by the military government.",
  "aung-san-suu-kyi.life_arc.4": "Awarded the Nobel Peace Prize, unable to travel to accept it in person.",
  "aung-san-suu-kyi.life_arc.5":
    "Led her party to a landslide election victory and became State Counsellor, Myanmar's de facto civilian head of government.",
  "aung-san-suu-kyi.life_arc.6":
    "Arrested in a military coup that annulled her party's re-election; remains in custody as of this writing.",
  "aung-san-suu-kyi.legacy":
    "Aung San Suu Kyi became one of the most recognized symbols of nonviolent resistance to military rule in the late twentieth century, and her decades under house arrest drew sustained international attention to Myanmar's democracy movement. Her later record as head of Myanmar's civilian government, particularly its response to the 2017 Rohingya crisis, is judged far more critically, and she remains in military custody following the 2021 coup as of this writing.",

  /* --------------------------------------------------- Batch 4: L. Wittgenstein */
  "ludwig-wittgenstein.achievement.1":
    "He published the Tractatus Logico-Philosophicus in 1921, then declared philosophy's fundamental problems \"solved\" and left academic philosophy for roughly a decade — working as a rural Austrian schoolteacher and later an architect — before returning once dissatisfied with his own earlier conclusions.",
  "ludwig-wittgenstein.achievement.2":
    "In the preface to Philosophical Investigations, published after his death, he stated the later work should be read alongside the Tractatus specifically because it corrected \"grave errors\" in his own earlier thinking — one philosopher publicly and substantively overturning his own prior major work.",
  "ludwig-wittgenstein.moment.1":
    "He renounced his entire inheritance — he was born into one of the wealthiest families in Austria — to live an ascetic life with essentially no financial security, a specific documented act rather than a general reputation for austerity.",
  "ludwig-wittgenstein.moment.2":
    "Students and colleagues, including Bertrand Russell, documented him for intense, sustained concentration during philosophical work, including reportedly pacing for hours while working through a single problem.",
  "ludwig-wittgenstein.turning_point.1":
    "During the First World War's aftermath he sustained six years of demanding work as a rural Austrian primary-school teacher — a role, and social position, far outside his prior academic standing and family wealth — part of what his biography describes as a deliberate, sustained pursuit of what he called \"the duty of full self-expression\" across a series of exacting roles: soldier, schoolteacher, architect, wartime hospital orderly, and returning philosopher.",
  "ludwig-wittgenstein.interpretation.achievement.2":
    "This is one of the more direct, self-documented instances of belief_updating in the roster: not a private reconsideration, but a public statement naming his own earlier work's errors.",
  "ludwig-wittgenstein.interpretation.turning_point.1":
    "This sequence — each role taken up with total commitment and completed rather than abandoned partway — is the central documented thesis of his biography, and is consistent with the profile's persistence score.",

  /* -------------------------------------------------------- Batch 4: T. Edison */
  "thomas-edison.achievement.1":
    "He built not only a commercially viable incandescent light bulb but the full supporting electrical generation and distribution system needed to make it usable — the Pearl Street Station — a documented, genuinely systemic achievement beyond a single device.",
  "thomas-edison.achievement.2":
    "He established Menlo Park as one of the first organized industrial research laboratories, deliberately structuring invention as a systematic, resourced team process rather than individual, ad hoc tinkering, reportedly setting the lab a working goal of a minor invention roughly every ten days and a major one every few months.",
  "thomas-edison.moment.1":
    "His laboratory notebooks survive as thousands of pages documenting systematic testing of an unusually large number of filament materials before he arrived at a commercially viable design — corroborated across independent biographical accounts, not a single anecdote.",
  "thomas-edison.moment.2":
    "He waged a sustained public campaign — the \"War of Currents\" — against Westinghouse and Nikola Tesla's rival AC power system, including funding public electrocution demonstrations of animals specifically to discredit AC's safety record, a documented and, by most historical assessments, ethically questionable tactic within an otherwise commercially motivated dispute.",
  "thomas-edison.moment.3":
    "He personally invested heavily in ventures that documentedly failed, notably an iron-ore-mining enterprise that cost him substantial personal losses; multiple historians also document that a number of patents credited to him alone involved substantial uncredited or under-credited contributions from employees such as Lewis Latimer and Francis Jehl — a more mixed picture than the singular \"Wizard of Menlo Park\" image his own deliberately cultivated public persona and press relationships helped build.",
  "thomas-edison.interpretation.achievement.2":
    "This organizational choice — treating invention as a managed process with its own targets — is consistent with the profile's high planning_orientation and systems_abstraction scores, distinct from the popular image of a lone tinkerer.",

  /* ---------------------------------------------------- Batch 4: Michelangelo */
  "michelangelo.achievement.1":
    "Across a nearly seventy-year working life he sustained major output across sculpture (David, the Pietà), painting (the Sistine Chapel ceiling and Last Judgment), architecture (the dome of St. Peter's Basilica, the Laurentian Library), and poetry — an unusually well-corroborated case of range across genuinely distinct disciplines, not merely dabbling in each.",
  "michelangelo.achievement.2":
    "In his seventies, decades into an established reputation as a painter and sculptor, he took on the role of chief architect for St. Peter's Basilica and fundamentally redesigned its structural plan, including the dome — a late-career shift into a substantially different discipline rather than remaining within his already-mastered domains.",
  "michelangelo.moment.1":
    "Giorgio Vasari's biography — written and revised while Michelangelo was alive, with his direct knowledge — documents that during intensive periods of work, including the Sistine ceiling commission, he sometimes slept in his clothes and boots for extended periods without undressing, so as not to interrupt the work.",
  "michelangelo.moment.2":
    "Vasari's biography also documents Michelangelo repeatedly abandoning and restarting major commissions — including more than one Pietà and tomb sculpture — reworking them to standards only he judged sufficient, rather than delivering a version he considered less than complete.",
  "michelangelo.turning_point.1":
    "In 1506, after a dispute with Pope Julius II over payment for the pope's own tomb commission, Michelangelo fled Rome without permission — an extraordinarily risky act for the era against the most powerful patron in it — and returned only after direct negotiation restored the relationship.",
  "michelangelo.interpretation.moment.2":
    "This is the specific, named documented pattern behind the profile's perfectionism score, not a general reputation inferred after the fact.",
  "michelangelo.interpretation.turning_point.1":
    "Confronting the era's most powerful patron directly, rather than accepting the dispute quietly, is consistent with the profile's risk_tolerance and autonomy_need scores.",

  /* ------------------------------------------------------- Batch 4: Malcolm X */
  "malcolm-x.achievement.1":
    "Within roughly a decade of his release from incarceration, he became one of the most prominent, widely broadcast public speakers of the American civil rights era, a rise documented through extensive surviving footage, transcribed speeches, and press coverage.",
  "malcolm-x.achievement.2":
    "Within the final year of his life, after publicly breaking from the Nation of Islam, he founded two new organizations — Muslim Mosque, Inc. and the Organization of Afro-American Unity — rebuilding his public organizing work essentially from scratch rather than retiring from public life.",
  "malcolm-x.moment.1":
    "His autobiography documents an intense, self-directed prison education program: he systematically copied the dictionary by hand over an extended period, an effort he credited directly for his later intellectual development.",
  "malcolm-x.moment.2":
    "He continued public speaking and organizing after his home was firebombed and after receiving credible death threats in the weeks before his February 1965 assassination — a documented pattern of continuing under known, extreme personal danger rather than withdrawing from public life.",
  "malcolm-x.turning_point.1":
    "Following his 1964 pilgrimage to Mecca, he publicly and substantively revised his own worldview, breaking from the Nation of Islam's separatist theology toward a broader orthodox Islamic and pan-Africanist framework — a shift he narrated in detail in his own autobiography as a direct response to firsthand experience that contradicted his prior assumptions, not a change reported secondhand.",
  "malcolm-x.interpretation.moment.1":
    "This sustained, self-imposed program is the specific, self-narrated evidence behind the profile's deep_focus and discipline scores.",
  "malcolm-x.interpretation.turning_point.1":
    "This is among the more extensively self-documented instances of belief_updating in the roster: a first-person account of revising a deeply held public position after direct experience, not a characterization applied by others.",

  /* --------------------------------------------------- Batch 5: Wilbur Wright */
  "wilbur-wright.achievement.1":
    "Between 1900 and 1903, Wilbur and his brother Orville ran a staged, systematic research program at Kitty Hawk — building their own wind tunnel once they found existing published lift data unreliable, then testing unpowered gliders across multiple seasons before ever attempting powered flight — culminating in the first sustained, controlled, powered flight in December 1903.",
  "wilbur-wright.achievement.2":
    "Their three-axis control system — wing-warping for roll paired with a movable rudder for yaw, alongside pitch control — was a genuinely original engineering solution to the flight-control problem that other aviation inventors of the era had not solved, documented via the patent record and subsequent aviation-history assessment.",
  "wilbur-wright.moment.1":
    "When their own glider tests failed to match Otto Lilienthal's previously published aerodynamic lift tables, the Wrights concluded the published data itself was wrong rather than assuming their own testing was flawed, and built their own wind tunnel to generate more reliable figures.",
  "wilbur-wright.moment.2":
    "For several years after their first successful flights, Wilbur and Orville deliberately avoided public demonstrations and press coverage, prioritizing patent protection for their still-unpatented invention over public recognition — a documented, sustained choice, not a brief period of caution.",
  "wilbur-wright.moment.3":
    "In the years after their invention became public, the Wrights pursued years of aggressive patent litigation against rival aviation developers, including Glenn Curtiss — a documented pattern that protected their invention but that some aviation historians also credit with slowing the broader development of American aviation in the following decade.",
  "wilbur-wright.turning_point.1":
    "After years of guarding their invention from public view, Wilbur organized public demonstration flights in France in 1908 that directly and successfully convinced skeptical press and government observers who had previously doubted their flight claims — a deliberate shift from years of secrecy to public proof, not a change forced by outside pressure.",
  "wilbur-wright.interpretation.moment.1":
    "Trusting first-hand test results over an established authority's published figures, and then building the tool needed to confirm it, is consistent with the profile's independent_thinking and resourcefulness scores.",
  "wilbur-wright.interpretation.turning_point.1":
    "Choosing exactly when to end years of self-imposed secrecy, rather than being forced into the open, is consistent with the profile's persuasiveness score — a strategic decision, not a change in temperament.",

  /* ---------------------------------------------- Batch 5: Nicolaus Copernicus */
  "nicolaus-copernicus.achievement.1":
    "In De revolutionibus orbium coelestium, Copernicus built a complete, internally consistent heliocentric alternative to the geocentric model that had stood for over a millennium, developing detailed mathematical and geometric argument for a Sun-centered solar system directly within the text itself.",
  "nicolaus-copernicus.achievement.2":
    "Alongside his astronomical work, Copernicus wrote a treatise on currency debasement and personally presented monetary-reform proposals to the Diet of Graudenz in 1522 — a genuine second field of documented contribution, not incidental dabbling.",
  "nicolaus-copernicus.moment.1":
    "During the Polish–Teutonic Knights conflict of 1520–1521, Copernicus personally organized the defense of Allenstein Castle — a canon and astronomer taking direct, hands-on responsibility for a military defense well outside his scholarly and clerical duties, documented via the MacTutor History of Mathematics archive.",
  "nicolaus-copernicus.moment.2":
    "Copernicus completed the core mathematics of the heliocentric model by around 1514 but did not allow publication for nearly three decades; Georg Joachim Rheticus, the mathematician who eventually helped secure its release, described in his own correspondence Copernicus's \"prolonged reluctance to release his volume for publication\" (Gingerich).",
  "nicolaus-copernicus.turning_point.1":
    "Persuaded at last by Rheticus, Copernicus allowed De revolutionibus to be published in 1543, in the final weeks of his life — a model that had existed only as private, decades-long refinement became, almost overnight, the text that would reshape the following century of astronomy, largely without its author present to defend or extend it further.",
  "nicolaus-copernicus.interpretation.moment.1":
    "This documented episode, not his later astronomical reputation, is the concrete basis for the profile's proactive_agency score.",
  "nicolaus-copernicus.interpretation.turning_point.1":
    "The decades-long gap between finishing the mathematics and allowing it into the world is consistent with the profile's dual-edged perfectionism score — the same standard that produced an unusually developed model also delayed its influence for a generation.",

  /* ------------------------------------------------- Batch 5: Susan B. Anthony */
  "susan-b-anthony.achievement.1":
    "Anthony co-founded the American Equal Rights Association in 1866 and the National Woman Suffrage Association in 1869, and held leadership roles in both organizations for decades — documented, sustained institutional leadership, not honorary positions.",
  "susan-b-anthony.achievement.2":
    "She sustained a working partnership with Elizabeth Cady Stanton across more than fifty years and multiple organizations, including co-authorship of the multi-volume History of Woman Suffrage — an extensively corroborated, long-duration collaborative record.",
  "susan-b-anthony.moment.1":
    "In the 1872 presidential election, Anthony deliberately registered to vote and cast a ballot alongside a small group that included family members, specifically to force a legal test case of the newly ratified 14th and 15th Amendments — a calculated act, not a spontaneous one, that led directly to her arrest and prosecution.",
  "susan-b-anthony.moment.2":
    "At her 1873 trial, the presiding judge directed the jury to a guilty verdict without deliberation — a widely noted irregularity — and Anthony delivered a sustained courtroom speech (\"may it please the court...\") refusing to recognize the court's authority over her, rather than accept the outcome quietly.",
  "susan-b-anthony.turning_point.1":
    "In 1852, after being refused the chance to speak at a temperance meeting because she was a woman, Anthony did not seek another platform — she organized the Woman's New York State Temperance Society herself. The same response to exclusion, building a new institution rather than seeking entry to an existing one, recurred in her later co-founding of the American Equal Rights Association and the National Woman Suffrage Association.",
  "susan-b-anthony.interpretation.moment.2":
    "Refusing to concede legitimacy to the court that convicted her, in one of the highest-stakes settings available to her, is consistent with the profile's independent_thinking and social_assertiveness scores.",
  "susan-b-anthony.interpretation.turning_point.1":
    "That this pattern repeats across a career spanning decades, not just this one early episode, is consistent with the profile's proactive_agency and autonomy_need scores.",

  /* --------------------------------------------------- Batch 5: Galileo Galilei */
  "galileo-galilei.achievement.1":
    "On hearing secondhand reports of a Dutch spyglass in 1609, Galileo built and rapidly improved his own telescope within months, then turned it toward the sky rather than only the terrestrial and military uses it was marketed for — publishing Jupiter's moons and other findings in Sidereus Nuncius within about a year of his first observations.",
  "galileo-galilei.achievement.2":
    "His inclined-plane and pendulum experiments produced quantitative, repeatable measurements of falling-body motion — a documented, distinctly quantitative methodology apart from the qualitative physics that dominated the period, reconstructed in detail from his own notebooks by historian Stillman Drake.",
  "galileo-galilei.moment.1":
    "He wrote the 1632 Dialogue Concerning the Two Chief World Systems in vernacular Italian rather than scholarly Latin, deliberately reaching a wider lay readership, and structured it as a pointed dialogue that included a character widely read by contemporaries as mocking a Church-aligned position on cosmology.",
  "galileo-galilei.moment.2":
    "Despite Johannes Kepler's published evidence for elliptical planetary orbits, Galileo continued to favor circular orbits for the rest of his life — a specific, documented instance in which he did not revise a particular technical position after new evidence became available.",
  "galileo-galilei.turning_point.1":
    "In 1616 the Catholic Church formally prohibited Galileo from teaching or defending heliocentrism. He continued making the case for it regardless, including in the 1632 Dialogue, published after an explicit prior warning. In 1633 he was tried by the Roman Inquisition, forced to recant, and spent the remainder of his life under house arrest.",
  "galileo-galilei.interpretation.moment.2":
    "This is the concrete, source-grounded basis for the profile's comparatively low belief_updating score on this point — not a general claim about his openness to evidence elsewhere in his career, where the telescope itself shows the opposite pattern.",
  "galileo-galilei.interpretation.turning_point.1":
    "Continuing to argue a prohibited position rather than complying quietly is consistent with the profile's independent_thinking and risk_tolerance scores — though the consequence, house arrest until his death nine years later, was severe enough that this should not be read as a costless choice.",

  /* ------------------------------------------------------- Batch 5: Niels Bohr */
  "niels-bohr.achievement.1":
    "The Bohr model of the atom and the later Copenhagen interpretation of quantum mechanics built a coherent conceptual framework reconciling classical and quantum phenomena — a genuinely novel departure from classical physics at the time, documented via its 1922 Nobel Prize citation and Abraham Pais's detailed intellectual biography.",
  "niels-bohr.achievement.2":
    "He founded and led the Institute for Theoretical Physics in Copenhagen, now the Niels Bohr Institute, which became an international hub drawing physicists including Werner Heisenberg, Wolfgang Pauli, and Paul Dirac for extended, genuinely collaborative visits, documented via the Institute's own well-recorded history.",
  "niels-bohr.moment.1":
    "Pais's biography and the accounts of the physicists themselves describe a distinctive mentoring style: extended one-on-one dialogue that led a generation of visitors — Heisenberg, Pauli, and Lev Landau among others — toward their own insights rather than through direct instruction.",
  "niels-bohr.moment.2":
    "Warned of imminent arrest as Nazi occupation authorities moved against Danish Jews in 1943 — his mother was Jewish — Bohr fled Denmark for Sweden and eventually Britain and the United States, where he went on to work on the Manhattan Project.",
  "niels-bohr.turning_point.1":
    "After his wartime work on the Manhattan Project, Bohr shifted his public efforts toward restraint: in 1944 he sent a direct memorandum to both Winston Churchill and Franklin Roosevelt warning of the dangers of an unrestrained postwar nuclear arms race and arguing for international openness around nuclear science, advocacy he continued for the rest of his life.",
  "niels-bohr.interpretation.moment.1":
    "This is a distinctive form of persuasive influence in the profile — not direct instruction or public rhetoric, but guiding others toward conclusions they arrive at themselves, consistent with the profile's persuasiveness score.",
  "niels-bohr.interpretation.turning_point.1":
    "This shift, from wartime contributor to postwar advocate for openness, is consistent with the profile's impact_motivation score, and echoes the same willingness to argue an unpopular position directly to power already visible in his decades-long public debates with Einstein over quantum theory.",

  /* -------------------------------------------------- Batch 5: Immanuel Kant */
  "immanuel-kant.achievement.1":
    "Across the Critique of Pure Reason (1781), the Critique of Practical Reason, and the Critique of Judgment, Kant built a unified philosophical system spanning epistemology, ethics, and aesthetics under one coherent framework — work the Stanford Encyclopedia of Philosophy regards as among the most rigorous in the Western philosophical canon.",
  "immanuel-kant.achievement.2":
    "His moral philosophy, centered on the categorical imperative, was explicitly framed in the Groundwork of the Metaphysics of Morals as a standard of universal ethical duty applicable to all rational beings, not a code specific to any one place, tradition, or circumstance.",
  "immanuel-kant.moment.1":
    "Kant maintained such a precise, unvarying daily routine — including his afternoon walk — that residents of Königsberg reportedly set their clocks by it, a pattern corroborated across multiple contemporary and biographical accounts (Kuehn), not a single repeated anecdote.",
  "immanuel-kant.moment.2":
    "After early academic promise, Kant published comparatively little through his forties and early fifties while privately developing his mature philosophical system, releasing the Critique of Pure Reason only at 57 — a deliberate, extended period of private revision, according to Kuehn's biography, rather than a lack of activity.",
  "immanuel-kant.turning_point.1":
    "Kant's later work on religion, Religion within the Bounds of Bare Reason, drew formal censure from Prussian royal censors, who directed him not to write further on religious subjects — a real institutional consequence of a published position, in a career that Kuehn's biography otherwise describes as marked by institutional caution and an unusually careful, routine-bound public life.",
  "immanuel-kant.interpretation.moment.2":
    "The length of this private revision period, not merely its existence, is what grounds the profile's dual-edged perfectionism score — the same standard that produced a famously rigorous system also delayed it for over a decade.",
  "immanuel-kant.interpretation.turning_point.1":
    "This stands out precisely because it departs from the otherwise cautious pattern the rest of the profile describes — a considered risk taken within a careful life, not evidence of a broader pattern of confrontation.",

  /* ------------------------------------------------------ Batch 5: Octavia Butler */
  "octavia-butler.achievement.1":
    "Her novel Kindred and the Xenogenesis and Parable series built distinctive thematic territory — genetic engineering, power and consent, an Afrofuturist blend of slavery-era history and time travel — largely unexplored in science fiction at the time she was writing, and established her as one of very few Black women publishing in the genre in the 1970s and 1980s.",
  "octavia-butler.achievement.2":
    "By the mid-1990s her body of work had established her as one of the genre's most decorated writers: her novelette \"Bloodchild\" won both the Hugo and Nebula Awards in 1984–85, and Parable of the Talents won the 1999 Nebula Award for Best Novel. In 1995 she became the first science-fiction writer to receive a MacArthur Fellowship. The Foundation's own citation described her novels as \"transcendent fables, which have as much to do with the future as with the present and the past,\" pointing specifically to Kindred's introduction of a slavery narrative into science fiction through time travel and the Xenogenesis trilogy's treatment of prejudice, class conflict, and violence.",
  "octavia-butler.legacy":
    "Butler's influence continued to grow after her death in 2006: Kindred became a bestselling 2017 graphic novel and a 2022 FX television series, Parable of the Sower was adapted into a stage opera in 2015, and she is now widely situated in the vanguard of Afrofuturism, a movement whose name was coined only in 1993, after most of her major work had already been published. In 2021, NASA named the Mars Perseverance rover's landing site \"Octavia E. Butler Landing\" in her honor, and the Carl Brandon Society's Octavia E. Butler Memorial Scholarship, established the year she died, continues to fund writers of color attending the Clarion workshop she once attended herself as a student.",
  "octavia-butler.moment.1":
    "Her surviving personal notebooks, now archived at the Huntington Library, include dated personal affirmations about becoming a bestselling author, written years before that outcome — a documented record of goal-directed intent that precedes the success, not a claim reconstructed after the fact.",
  "octavia-butler.moment.2":
    "By her own account in interviews, she worked a series of unrelated day jobs for years while sustaining her writing practice, continuing to submit work through documented years of rejection before her first novel sale.",
  "octavia-butler.moment.3":
    "Early in her career she attended the Clarion Science Fiction Writers' Workshop, a documented formative collaborative experience — notable in a career that she and her biographers otherwise describe as more comfortable in solitary writing than in public or group settings.",
  "octavia-butler.interpretation.moment.1":
    "This kind of self-authored, dated evidence is unusually direct for grounding a trait score — most items in this profile rely on secondhand biographical description; this one rests on her own hand.",

  /* --------------------------------------------- Batch 5: Rabindranath Tagore */
  "rabindranath-tagore.achievement.1":
    "Tagore's 1913 Nobel Prize in Literature for Gitanjali was an internationally, independently verified recognition of a specific body of work: he had already produced thousands of poems and songs alongside novels and plays, and the Nobel citation and the collection's sustained international critical reception documented recognition of his aesthetic craft specifically, not only his volume of output.",
  "rabindranath-tagore.achievement.2":
    "He founded Visva-Bharati University at Santiniketan as an alternative, humanistic model of education distinct from colonial-era schooling — a self-initiated, sustained institution-building effort beyond his literary work, documented via the university's own founding history.",
  "rabindranath-tagore.moment.1":
    "Tagore composed both India's and Bangladesh's national anthems — a documented, unusual fact that reflects the reach of his creative output well beyond literature alone, into a form that would later become part of two nations' civic identity.",
  "rabindranath-tagore.moment.2":
    "He took up painting seriously only in his sixties, decades after his literary reputation was already internationally established, pursuing it purely from continued creative interest rather than any external need.",
  "rabindranath-tagore.turning_point.1":
    "In 1919, Tagore publicly renounced the British knighthood he had been awarded, in protest of the Jallianwala Bagh massacre in Amritsar — a high-profile act of dissent against the same colonial establishment that had honored him, carrying real social and political risk within it. In his own letter to the Viceroy explaining the decision, he wrote that he wished to \"stand, shorn of all special distinctions, by the side of my countrymen.\"",
  "rabindranath-tagore.interpretation.moment.2":
    "Beginning a new discipline from scratch well after mastery in another was already secure, and while there was nothing left to prove, is consistent with the profile's mastery_orientation score.",
  "rabindranath-tagore.interpretation.turning_point.1":
    "Giving up a formal honor already granted, rather than voicing private disapproval while keeping it, is consistent with the profile's independent_thinking and risk_tolerance scores.",

  /* ------------------------------------------------------------ Batch 6: Aristotle */
  "aristotle.achievement.1":
    "Aristotle's surviving works span logic, physics, metaphysics, ethics, politics, rhetoric, poetics, and biology — a documented breadth of original, cross-referenced work that the Stanford Encyclopedia of Philosophy describes as touching nearly every field of inquiry known in antiquity.",
  "aristotle.achievement.2":
    "In the Prior Analytics, Aristotle set out the first formal system of deductive reasoning, the syllogism — a structured account of valid inference that remained the standard framework for logic in the Western and Islamic philosophical traditions for roughly two thousand years.",
  "aristotle.moment.1":
    "His biological treatises, particularly the History of Animals, record detailed anatomical observations of marine animals — including, by his own account, direct dissection — built from firsthand fieldwork around the island of Lesbos rather than secondhand report.",
  "aristotle.moment.2":
    "Ancient biographical tradition — most fully preserved in Diogenes Laertius's and Plutarch's accounts, both written several centuries after Aristotle's death but corroborating one another — holds that Philip II of Macedon invited him to tutor his son, the future Alexander the Great, at the royal court at Mieza around 343 BCE.",
  "aristotle.turning_point.1":
    "After Alexander's death in 323 BCE, anti-Macedonian sentiment in Athens turned against Aristotle over his earlier ties to the Macedonian court, and in 322 BCE he was charged with impiety. According to a widely repeated ancient anecdote, he left Athens for his mother's family estate in Chalcis rather than stand trial, saying he would not let the city \"sin twice against philosophy\" — a reference to Socrates's earlier trial and execution. He died in Chalcis later that same year.",
  "aristotle.interpretation.moment.1":
    "Fieldwork like this is a distinct form of curiosity from purely theoretical inquiry — evidence gathered by going and looking, not only by reasoning from first principles.",
  "aristotle.interpretation.turning_point.1":
    "Leaving a position of established authority rather than contest a politically charged charge is a different kind of risk calculus than the direct confrontations more common elsewhere in this profile — the same risk tolerance showing up as strategic withdrawal rather than defiance.",

  /* ------------------------------------------------------- Batch 6: Simón Bolívar */
  "simon-bolivar.achievement.1":
    "Between 1813 and 1825, Bolívar led military campaigns that ended Spanish colonial rule across the territories that became Venezuela, Colombia, Ecuador, Panama, Peru, and Bolivia — the last named for him — and served as President of the short-lived confederation of Gran Colombia.",
  "simon-bolivar.achievement.2":
    "Written from exile in Jamaica in 1815, after a series of early military defeats, his \"Letter from Jamaica\" laid out a detailed political analysis of Spanish American society and argued for a specific vision of independent, unified governance — a systematic piece of political theory, not only a rallying call, according to Lynch's biography.",
  "simon-bolivar.moment.1":
    "In 1819, Bolívar led more than 2,000 soldiers across the flooded high plains and freezing mountain passes of the Andes into New Granada, a route Spanish royalist forces considered impassable during the rainy season. The surprise arrival let his army win the decisive Battle of Boyacá on August 7, 1819, opening the way to Bogotá.",
  "simon-bolivar.moment.2":
    "In July 1822, Bolívar met privately with fellow independence leader José de San Martín at Guayaquil to discuss the political future of the newly liberated territories. No record of what was said survives, but San Martín withdrew from public and military life shortly afterward, leaving Bolívar as the dominant remaining figure in the continental independence movement.",
  "simon-bolivar.turning_point.1":
    "By 1828, Gran Colombia was fracturing under regional resistance to centralized rule from Bogotá, and Bolívar assumed dictatorial powers in an attempt to hold the confederation together, surviving an assassination attempt that September. Unable to reverse the fragmentation, he resigned the presidency in April 1830, as Venezuela moved toward separation, and died of tuberculosis in Santa Marta that December — the union he had spent nearly two decades building coming apart in the same year he died.",
  "simon-bolivar.interpretation.moment.2":
    "The available record documents the outcome, not the disagreement itself, so this reading stays interpretive rather than settled — but it fits a wider pattern in the profile of real, working alliances that also carried real friction, not uncomplicated partnership.",
  "simon-bolivar.interpretation.turning_point.1":
    "How to read Bolívar's motives in this later period is genuinely contested ground — the same person who once proposed a confederation beyond his own rule also concentrated power in his own hands when that project came under strain, which is why this profile keeps his impact motivation score toward the middle rather than the extreme.",

  /* --------------------------------------------------------- Batch 6: Grace Hopper */
  "grace-hopper.achievement.1":
    "In the early 1950s, Hopper led the team at Remington Rand that built the A-0 System, generally credited as the first compiler — a program translating symbolic, English-like instructions into machine code — establishing the core idea that later made languages like COBOL possible, according to Beyer's history of her career.",
  "grace-hopper.achievement.2":
    "Beyer's account documents years of sustained argument, inside and outside her own organization, to convince both technical peers and military and corporate leadership that a computer could reliably execute instructions written in something resembling English — a claim many contemporaries in the early 1950s considered technically implausible — before compiler-based, standardized programming became industry practice.",
  "grace-hopper.moment.1":
    "In 1947, while Hopper was part of the Harvard Mark II computer team, her associates found a moth trapped in one of the machine's relays, causing a malfunction; the moth was taped into the operations logbook with the note \"First actual case of bug being found.\" The term \"bug\" for a technical fault already existed in engineering before this — Hopper did not coin it — but she is credited with popularizing it, and the logbook page survives today at the Smithsonian's National Museum of American History.",
  "grace-hopper.turning_point.1":
    "Hopper retired from the Naval Reserve at the mandatory age of 60 at the end of 1966, but was recalled to active duty in August 1967 to help standardize COBOL across the Navy; she retired again in 1971 and was recalled again the following year. She remained in service after that, finally retiring in 1986 at age 79 as a rear admiral and, at the time, the oldest active-duty commissioned officer in the United States Navy.",
  "grace-hopper.interpretation.turning_point.1":
    "Coming back to active duty not once but twice after mandatory retirement, and ultimately serving into her 80th year, fits a mastery orientation this profile places well above the achievement of any single milestone.",

  /* -------------------------------------------------------------- Batch 6: C. V. Raman */
  "cv-raman.achievement.1":
    "In 1928, Raman and K. S. Krishnan — a research associate who, according to several historical accounts, carried out much of the day-to-day experimental work — demonstrated that light changes wavelength when scattered by transparent matter, using apparatus that began with sunlight and a simple prism before a spectrograph of Raman's own design made precise measurement possible. The Nobel committee proposed only Raman's name for the 1930 Physics Prize; Krishnan was never nominated, a decision some historians of Indian science have since described as not fully reflecting his role in the discovery.",
  "cv-raman.achievement.2":
    "Beyond the discovery itself, Raman went on to found and direct the Raman Research Institute in Bangalore and served as director of the Indian Institute of Science, sustaining a decades-long project of building Indian scientific institutions and training a generation of Indian physicists.",
  "cv-raman.moment.1":
    "Raman spent over a decade pursuing serious physics research — beginning with the physics of Indian musical instruments — as a side interest while working full-time in the Indian Finance Department, before leaving that stable, well-paid civil-service position in 1917 to take an academic physics chair at Calcutta University at considerably lower pay.",
  "cv-raman.turning_point.1":
    "In September 1921, during a voyage home to India from England aboard the S.S. Narkunda, Raman studied the deep blue colour of the Mediterranean Sea with a pocket spectroscope, and published his findings in Nature that November, directly challenging Lord Rayleigh's prevailing 1910 explanation that the sea's colour simply reflected the sky. That line of research into light scattering in transparent media culminated seven years later in the discovery of the effect that bears his name.",
  "cv-raman.interpretation.turning_point.1":
    "Noticing something the accepted explanation didn't quite cover, and turning it into a published challenge within weeks of returning home, is the kind of evidence this profile's curiosity score is built on.",

  /* --------------------------------------------------- Batch 6: Benjamin Banneker */
  "benjamin-banneker.achievement.1":
    "Beginning in 1792, Banneker calculated and published a series of annual almanacs containing his own original astronomical ephemerides — the tables of projected sun, moon, and planet positions used for practical purposes such as tide prediction — entirely self-taught, with no formal schooling in astronomy or advanced mathematics, according to Bedini's biography.",
  "benjamin-banneker.achievement.2":
    "Around 1753, having studied the mechanism of a borrowed pocket watch, Banneker carved and built a functioning striking clock almost entirely from wood — a documented technical achievement, per Bedini, produced with no prior training in clockmaking or access to formal instruction.",
  "benjamin-banneker.moment.1":
    "In August 1791, Banneker sent Thomas Jefferson, then Secretary of State, a letter directly challenging the contradiction between Jefferson's stated Enlightenment ideals and his ownership of enslaved people, enclosing a manuscript copy of his forthcoming almanac as evidence of Black intellectual capability. Jefferson's reply, which survives alongside Banneker's letter, thanked him and noted he had forwarded the almanac to the Marquis de Condorcet in France — a polite acknowledgment that did not extend to any change in Jefferson's own practice of enslaving people.",
  "benjamin-banneker.interpretation.moment.1":
    "Addressing a sitting cabinet secretary directly and personally on slavery was a real risk for a free Black man in 1791 Maryland — what this profile's risk tolerance score is actually drawn from here, not any claim about how the exchange was received.",

  /* ----------------------------------------------------------- Batch 6: Fela Kuti */
  "fela-kuti.achievement.1":
    "Beginning in the late 1960s, Fela Kuti fused Yoruba music, jazz, highlife, and funk into a new genre he called Afrobeat — a distinct musical synthesis documented through musicological analysis of his recorded catalog (Veal).",
  "fela-kuti.achievement.2":
    "His 1976 album Zombie, a direct critique of the Nigerian military that portrayed soldiers as mindless automatons following orders, became one of the most widely known protest records in African music history and durably shaped Nigerian and pan-African political consciousness, according to Veal's account of the record's reception.",
  "fela-kuti.moment.1":
    "In 1970, Kuti declared his Lagos compound, which housed his band, recording studio, and extended community, the independent \"Kalakuta Republic,\" refusing entry to Nigerian police and asserting the compound operated outside the authority of the Nigerian state — a specific, extensively documented act of open defiance.",
  "fela-kuti.turning_point.1":
    "In February 1977, roughly 1,000 Nigerian soldiers raided the Kalakuta Republic and set it on fire; Kuti's mother, the activist Funmilayo Ransome-Kuti, was thrown from a window during the raid and died of her injuries the following year. Kuti responded by delivering her coffin to the gates of the military government's headquarters in Lagos and, in the years that followed, recorded the song \"Coffin for Head of State\" about the event — a shift from musical and rhetorical criticism of the regime to direct, personal confrontation with it.",
  "fela-kuti.interpretation.turning_point.1":
    "This marks a real escalation in how the confrontation with state power was expressed — from records and lyrics to a direct, physical act aimed at the government itself — which is the specific evidence behind this profile's conflict tolerance score, not a judgment on the underlying political conflict.",

  /* ------------------------------------------------- Batch 6: Toussaint Louverture */
  "toussaint-louverture.achievement.1":
    "Rising from an enslaved coachman and cattle-driver to Commander-in-Chief and Governor-General of Saint-Domingue, Toussaint Louverture built and trained a disciplined military force from formerly enslaved people with limited resources, employing tactics adapted successively against Spanish, French, and British forces over roughly a decade, according to Dubois's history of the revolution.",
  "toussaint-louverture.achievement.2":
    "In 1801, Louverture promulgated a constitution for Saint-Domingue that permanently abolished slavery in the colony — while also naming himself governor-for-life and requiring former plantation workers to remain on the land under a strict labor regime intended to rebuild the colony's devastated agricultural economy, a policy that drew criticism at the time and from later historians.",
  "toussaint-louverture.moment.1":
    "In 1794, after France's National Convention decreed the abolition of slavery in French territories, Louverture switched his forces' allegiance from Spain, which he had initially fought alongside, to France — a specific, dated strategic reversal based on his assessment of which side would more durably secure abolition, according to Dubois.",
  "toussaint-louverture.turning_point.1":
    "In June 1802, acting on orders from French expedition commander Charles Leclerc — dispatched by Napoleon Bonaparte to restore French control over the colony — General Jean-Baptiste Brunet lured Louverture into a meeting under false pretenses and had him arrested. He was deported to France and imprisoned at Fort de Joux in the Jura mountains, where he died in April 1803 — nine months before his former lieutenants declared Haiti's independence in January 1804.",
  "toussaint-louverture.interpretation.moment.1":
    "Reversing an existing alliance on the strength of one's own read of which side would better serve the actual goal, rather than loyalty to whichever side one started with, is the kind of evidence this profile's independent thinking score draws on.",

  /* ----------------------------------------------------------- Batch 6: Chinua Achebe */
  "chinua-achebe.achievement.1":
    "Published in 1958, Things Fall Apart wove Igbo oral narrative structures and proverbs directly into the form of the English-language novel, a deliberate technical choice rather than conventional Western narration, and is widely recognized as a founding text of modern African literature, according to Ezenwa-Ohaeto's biography.",
  "chinua-achebe.achievement.2":
    "In a 1975 lecture, later published as the essay \"An Image of Africa,\" Achebe argued that Joseph Conrad's Heart of Darkness — then a firmly canonical text in English literature — reduced Africa and African people to a backdrop for European psychological drama, a deliberately contrarian position against the dominant literary-critical consensus of the time that has been cited and debated in literary scholarship for decades since.",
  "chinua-achebe.moment.1":
    "During the Nigerian Civil War (1967–1970), Achebe served as a diplomatic envoy for the secessionist state of Biafra, traveling internationally to seek recognition and support for it — a period of direct political engagement separate from, and alongside, his literary career.",
  "chinua-achebe.turning_point.1":
    "In March 1990, a car accident in Nigeria left Achebe paralyzed from the waist down. He was flown to the United Kingdom for treatment and subsequently relocated to the United States, where he joined the faculty at Bard College and continued publishing essays, teaching, and speaking publicly for more than two decades until his death in 2013.",
  "chinua-achebe.interpretation.turning_point.1":
    "Rebuilding a full academic and literary career on a different continent, under permanently changed physical circumstances, is the specific kind of evidence this profile's adaptability score is built on.",

  /* ------------------------------------------- Batch 7 (exposure-priority): Alan Turing */
  /* CLOSURE PASS: achievements 1-2 deleted (unsupported by this person's roster rationale). moment.1 corrected to match the rationale's own quoted phrase and dropped an invented colleague count. Profile V2 pilot (2026-08): restored genuine Achievements, added a second Life Scene, a Turning Point, Life Arc and Legacy -- all newly researched and verified directly against src_turing_wikipedia (live fetch, not memory), not this person's roster-file rationale. See docs/editorial-content.md's "general knowledge consistent with cited sources" exception -- the closure pass had read that exception more narrowly than the doc itself states; this pilot applies it as written, against a source already on this person's own record. */
  "alan-turing.achievement.1":
    "In a 1936 paper, \"On Computable Numbers, with an Application to the Entscheidungsproblem,\" Turing introduced the concept of a universal computing machine capable of carrying out any computation expressible as an algorithm — a theoretical foundation later described as one of the most influential mathematics papers in history, and the conceptual basis of the modern computer, years before any such machine was physically built.",
  "alan-turing.achievement.2":
    "At Bletchley Park from 1939, Turing was the central figure behind the Bombe, an electromechanical machine that automated the search for the German military's Enigma cipher settings — sharing credit for its design with mathematician Gordon Welchman, whose \"diagonal board\" enhancement was critical to its success, and engineer Harold Keen. Official war historian Harry Hinsley later estimated that the codebreaking work this enabled shortened the war in Europe by more than two years.",
  "alan-turing.achievement.3":
    "In a 1950 paper, \"Computing Machinery and Intelligence,\" Turing proposed what became known as the Turing test — judging whether a machine could be considered to \"think\" by whether its conversation was indistinguishable from a human's — a framing that still structures debates about artificial intelligence more than seventy years later.",
  "alan-turing.moment.1":
    "In 1941, with the Bletchley Park codebreaking effort short on staff and equipment despite official channels not acting with urgency, Turing wrote directly to Winston Churchill with colleagues, bypassing the normal chain of command. Churchill's \"Action this day\" response, ordering that they be given what they needed, is documented.",
  "alan-turing.interpretation.moment.1":
    "This is consistent with the profile's high proactive_agency score: rather than escalate a resourcing problem through the ordinary channels available to him, he wrote directly to the one person positioned to act on it immediately.",
  "alan-turing.moment.2":
    "Turing's wartime codebreaking work was covered by the Official Secrets Act and remained classified for decades — he was never fully recognized for it during his own lifetime, when his public reputation rested almost entirely on his mathematical and computing work rather than on Bletchley Park.",
  "alan-turing.turning_point.1":
    "In January 1952, a burglary at Turing's home led to a police investigation during which he disclosed his relationship with another man, and he was prosecuted under British law for homosexual acts, then a criminal offense. He accepted a course of hormone treatment as an alternative to prison, lost the security clearance that had let him continue government cryptography work, and died of cyanide poisoning in June 1954; an inquest at the time ruled his death a suicide, though the evidence has since been noted to be also consistent with accidental poisoning. Queen Elizabeth II granted him a posthumous royal pardon in 2013.",
  "alan-turing.life_arc.1": "Born in London.",
  "alan-turing.life_arc.2": "Published \"On Computable Numbers,\" introducing the theoretical concept of a universal computing machine.",
  "alan-turing.life_arc.3": "Worked at Bletchley Park on the design of the Bombe, sharing credit with Gordon Welchman and Harold Keen, breaking German Enigma-coded messages.",
  "alan-turing.life_arc.4": "Published \"Computing Machinery and Intelligence,\" proposing the Turing test.",
  "alan-turing.life_arc.5": "Prosecuted for homosexuality and stripped of his security clearance.",
  "alan-turing.life_arc.6": "Died in Wilmslow, England, at age 41.",
  "alan-turing.legacy":
    "Turing is now widely regarded as a founding figure of both theoretical computer science and artificial intelligence, and Bletchley Park's codebreaking work — kept secret for decades after the war — is understood as a major contribution to the Allied victory. The 2013 royal pardon formally acknowledged the injustice of his 1952 prosecution, and his name is now attached to computing's highest honor, the ACM A.M. Turing Award.",

  /* ------------------------------------------ Batch 7 (exposure-priority): Warren Buffett */
  /* CLOSURE PASS (round 2 — re-verified against the roster file directly rather than from memory): achievement.1 also had an unsourced 1963 date and "reputation as a value investor" framing; narrowed further to the rationale's own "central to his identity" phrase. achievement.2 also had an unsourced "struggling textile manufacturer" characterization; removed. Profile V2 pilot (2026-08): the AmEx episode (originally achievement.1) is a single dated stock pick, not a career-level accomplishment -- moved to Life Scenes. The 1965 Berkshire acquisition (originally achievement.2) is a genuine before/after trajectory shift -- moved to Turning Points, now first chronologically. Two new Achievements added describing what Buffett actually built over five decades, researched and verified directly against src_buffett_wikipedia (live fetch, not memory). */
  "warren-buffett.achievement.1":
    "Beginning in 1965, Buffett transformed Berkshire Hathaway from a failing textile manufacturer he bought at $14.86 a share into a diversified holding company, closing its last textile mills in 1985. By his own company's account, in its 1998 letter to shareholders, Berkshire's per-share book value grew from $19 to $37,801 over the 34 years since he took control — a rate of 24.7% compounded annually, one of the most sustained investment track records on record.",
  "warren-buffett.achievement.2":
    "Rather than trading individual stocks, Buffett built much of Berkshire's scale by acquiring whole businesses and stakes outright and holding them for decades: a 1988 purchase of roughly 7% of Coca-Cola for $1.02 billion, still held today, and a 2009 acquisition of Burlington Northern Santa Fe for $34 billion, among the largest deals of his career.",
  "warren-buffett.moment.1":
    "Recognized mispriced opportunities before the wider market within his own analytical frame — notably American Express during the \"salad-oil scandal\" and GEICO — a skill central to his identity as an investor, extensively documented.",
  "warren-buffett.moment.2":
    "In 1951, as a 20-year-old graduate student, Buffett traveled to GEICO's Washington, D.C. headquarters on a Saturday and was received by Lorimer Davidson, one of the only executives on site, for a conversation about the insurance business that shaped his early investment thinking. Forty-five years later, on January 2, 1996, Berkshire paid $2.3 billion for the 49% of GEICO it did not already own, making it a wholly owned subsidiary.",
  "warren-buffett.turning_point.1":
    "In 1965, took control of Berkshire Hathaway by buying up shares after a dispute with its existing management, rather than waiting to be invited onto its board.",
  "warren-buffett.turning_point.2":
    "On Charlie Munger's influence, and using See's Candies as the specific evidence, shifted from Benjamin Graham's \"cigar-butt\" style of buying statistically cheap, mediocre businesses toward paying fair prices for \"wonderful companies\" — one of his most clearly self-articulated reversals.",
  "warren-buffett.interpretation.turning_point.2":
    "Buffett has described this shift himself, in shareholder letters and interviews, as one of the clearest reversals in his investing approach — consistent with the profile's high belief_updating score.",
  "warren-buffett.turning_point.3":
    "For decades, avoided investing in technology companies, citing an inability to reliably forecast their long-term economics under his own \"circle of competence\" principle. He has since acknowledged in shareholder letters that this caution came at a real cost, including missing years of gains in companies he eventually did invest in, such as Apple in 2016.",
  "warren-buffett.interpretation.turning_point.3":
    "This profile marks the trade-off dual-edged, matching the roster's own reasoning: the same narrow-frame discipline behind the tech-investing miss also protected Berkshire from the dot-com crash.",
  "warren-buffett.life_arc.1": "Born in Omaha, Nebraska.",
  "warren-buffett.life_arc.2": "Earned a master's degree in economics at Columbia University, studying under Benjamin Graham.",
  "warren-buffett.life_arc.3": "Worked as a securities analyst at Graham's firm, Graham-Newman Corporation, in New York.",
  "warren-buffett.life_arc.4":
    "Returned to Omaha and began managing investment partnerships, later merged into the single entity Buffett Partnership Ltd.",
  "warren-buffett.life_arc.5": "Took control of Berkshire Hathaway, then a struggling textile manufacturer.",
  "warren-buffett.life_arc.6": "Continues to serve as Berkshire Hathaway's chairman and CEO into his mid-nineties, one of the longest tenures of any public company leader.",
  "warren-buffett.legacy":
    "Buffett's decades-long track record at Berkshire Hathaway is among the most closely studied in investing history, and his annual shareholder letters have shaped how generations of investors think about value, patience, and capital allocation. Under his leadership, Berkshire grew from a failing textile mill into one of the largest companies in the world, and he built a public reputation — captured in the nickname \"the Oracle of Omaha\" — as one of the most consistently successful investors of his era.",

  /* --------------------------------------- Batch 7 (exposure-priority): Rosalind Franklin */
  /* CLOSURE PASS: achievement.1 (Photograph 51) and turning_point.1 (Watson-Crick credit dispute) deleted — neither is in this person's own roster rationale. moment.1 narrowed to drop an invented "King's College / DNA fibers" return detail not in that rationale either. Profile V2 pilot (2026-08): the closure pass left this profile with a single item and no sense of what Franklin actually did as a scientist. Repaired by researching and verifying, directly against src_rfranklin_wikipedia (live fetch), her coal research, her DNA/X-ray crystallography work, and her later virus-structure research at Birkbeck. achievement.1 states what she demonstrably did and found without asserting a resolution to the Watson/Crick credit question either way -- it says her data was used without her knowledge, and that her own paper ran alongside theirs, both directly supported facts, and stops there. */
  "rosalind-franklin.achievement.1":
    "At King's College London between 1951 and 1953, Franklin used X-ray diffraction to capture the sharpest images yet made of DNA fibers, including the image later known as Photograph 51, and was the first to establish that DNA existed in two distinct structural forms depending on humidity and that its phosphate backbone sat on the outside of the molecule. Colleague Maurice Wilkins showed Photograph 51 to James Watson without Franklin's permission, and Watson and Crick's April 1953 Nature paper announcing the double-helix model credited being \"stimulated by a general knowledge of Franklin and Wilkins' unpublished contribution\" in a single footnote; her own paper, presenting independently derived supporting evidence, was published alongside theirs in the same issue.",
  "rosalind-franklin.achievement.2":
    "Her PhD research on the physical chemistry of coal at the British Coal Utilisation Research Association (1942–1945) established relationships between coal's microstructure and its density and permeability that became part of the standard science of coal and carbon materials; her subsequent postdoctoral work in Paris (1947–1950) under Jacques Mering made her an accomplished X-ray crystallographer and produced the terms \"graphitizing\" and \"non-graphitizing\" carbon still used in the field today.",
  "rosalind-franklin.achievement.3":
    "At Birkbeck College from 1953 until her death in 1958, Franklin led X-ray studies of virus structure, establishing in 1955 that all tobacco mosaic virus particles were a uniform length — contradicting the prevailing view among virologists at the time — and secured the largest research grant Birkbeck had received to that point to study the structure of poliovirus, work left unfinished at her death.",
  "rosalind-franklin.moment.1":
    "After WWII, moved to Paris for several years specifically to learn X-ray diffraction crystallography, a technique not readily available to her in England at the time — an entirely self-directed piece of skill acquisition.",
  "rosalind-franklin.interpretation.moment.1":
    "Read against the profile's proactive_agency score, this is a case of going abroad to acquire a specific technical capability, rather than working only with the tools already close at hand.",
  "rosalind-franklin.moment.2":
    "At King's College, Franklin built and refined a specialized camera to precisely control the humidity of her DNA samples during X-ray exposure, reasoning that the fiber's structure changed measurably with moisture — a months-long technical refinement, not a single fortunate exposure, and what let her capture the unusually sharp Photograph 51.",
  "rosalind-franklin.turning_point.1":
    "In early 1953, after months of a difficult working relationship with colleague Maurice Wilkins at King's College — the two had been given conflicting understandings of her role, he expecting a supporting collaborator and she an independent researcher leading her own project — Franklin left DNA research and moved to Birkbeck College to lead an entirely new research program on virus structure.",
  "rosalind-franklin.life_arc.1": "Born in London.",
  "rosalind-franklin.life_arc.2": "Completed a PhD in physical chemistry at Cambridge, researching the porosity of coal.",
  "rosalind-franklin.life_arc.3": "Worked in Paris under Jacques Mering, becoming an expert X-ray crystallographer.",
  "rosalind-franklin.life_arc.4": "Researched DNA structure at King's College London, producing Photograph 51.",
  "rosalind-franklin.life_arc.5": "Led virus-structure research at Birkbeck College, including work on the tobacco mosaic virus and poliovirus.",
  "rosalind-franklin.life_arc.6": "Died of ovarian cancer in London, at age 37, with her poliovirus research unfinished.",
  "rosalind-franklin.legacy":
    "Franklin's X-ray data was essential evidence in determining the structure of DNA, and her later work on virus structure is recognized as foundational to structural virology; she died four years before the 1962 Nobel Prize that recognized Watson, Crick, and Wilkins for the DNA discovery, a prize not normally awarded posthumously. Her contribution has since been widely re-examined and credited: the Royal Society's Rosalind Franklin Award, established in 2003, recognizes outstanding contributions to STEM by women, and the European Space Agency's ExoMars rover is named in her honor.",

  /* -------------------------------------------- Batch 7 (exposure-priority): Jane Goodall */
  /* CLOSURE PASS: moment.1 narrowed to drop an invented "no university degree" claim and an invented "most established researchers... unconventional" characterization not in this person's own roster rationale. turning_point.1 narrowed to drop an invented 1986/conference detail. CLOSURE PASS round 2: achievement.1 and moment.1 also had an invented "1960" date (not in the rationale) and achievement.1 an invented "first documented case... in a non-human animal" superlative; both dropped. */
  "jane-goodall.achievement.1":
    "At Gombe in 1960, observed a chimpanzee stripping the leaves from a grass stalk and using it to fish termites out of a mound — direct evidence of both tool use and toolmaking in a non-human species. Her mentor Louis Leakey received the news by writing that scientists would now have to \"redefine man, redefine tool, or accept chimpanzees as human,\" since toolmaking had until then been treated as a defining line between humans and other animals.",
  "jane-goodall.achievement.2":
    "Over more than six decades of continuous field research at Gombe beginning in 1960, documented that chimpanzees have distinct individual personalities and complex emotional lives, and form family and social bonds that can last more than fifty years, alongside a capacity for organized violence, including hunting other primates — a body of findings that fundamentally reshaped scientific understanding of chimpanzee behavior and, by extension, of what separates humans from other animals.",
  "jane-goodall.moment.1":
    "Arrived at Gombe with minimal equipment and no formal scientific training, her fieldwork funded largely through Louis Leakey's efforts to find sponsors — extensively documented as under-resourced, with basic field conditions throughout.",
  "jane-goodall.interpretation.moment.1":
    "This sits alongside the profile's resourcefulness score: producing findings that reshaped the field from what amounted to a bare-minimum starting position.",
  "jane-goodall.turning_point.1":
    "After decades focused on research at Gombe, shifted her own work from primarily research toward conservation and advocacy — founding the Jane Goodall Institute and, later, the Roots & Shoots youth program, unprompted by any employer.",
  "jane-goodall.interpretation.turning_point.1":
    "This illustrates the profile's proactive_agency score: an unprompted, self-directed change in the shape of her own career, not a response to any employer's mandate.",
  "jane-goodall.life_arc.1": "Born.",
  "jane-goodall.life_arc.2": "Arrived at Gombe with no formal training; observed a chimpanzee making and using a tool.",
  "jane-goodall.life_arc.3":
    "Decades of continuous field research reshaped scientific understanding of chimpanzee behavior.",
  "jane-goodall.life_arc.4": "Founded the Jane Goodall Institute, shifting her focus from research toward conservation.",
  "jane-goodall.life_arc.5": "Founded the Roots & Shoots youth program.",
  "jane-goodall.life_arc.6": "Awarded the Presidential Medal of Freedom.",

  /* ---------------------------------------- Batch 7 (exposure-priority): Benjamin Franklin */
  /* CLOSURE PASS: achievement.1 narrowed to drop an invented "single council" mechanism (round 2: also dropped an invented "more than twenty years" figure — the rationale says only "decades"). achievement.2 narrowed to use this person's own rationale's exact institution name rather than an added "first in the colonies" superlative. moment.1 narrowed to drop an invented age/indenture detail. turning_point.1 narrowed to drop invented "Privy Council" / "Hutchinson letters" specifics not in the rationale (the Cockpit-hearing claim itself is retained — it is directly named there). */
  "benjamin-franklin.achievement.1":
    "In 1754, proposed the Albany Plan of Union — a framework for unified colonial governance that read a structural need others hadn't yet judged urgent — decades before independence became a live political question. It was rejected at the time, but has since been seen historically as prescient.",
  "benjamin-franklin.achievement.2":
    "Founded, on his own initiative rather than through any official appointment, a discussion club (the Junto), the Library Company of Philadelphia, a volunteer fire department, and the American Philosophical Society — a pattern of self-organized civic institution-building his own Autobiography returns to repeatedly.",
  "benjamin-franklin.achievement.3":
    "In June 1752, Franklin's kite experiment provided evidence that lightning and electricity were the same phenomenon — using a kite, a metal key, and a Leyden jar to draw a charge induced by a nearby storm cloud, rather than a direct lightning strike. The work led directly to his invention of the lightning rod, a practical safety device adopted on buildings across Europe and America, and made him a major figure of the American Enlightenment and in the history of physics.",
  "benjamin-franklin.achievement.4":
    "From 1776, Franklin represented the United States in France, where his diplomatic efforts helped secure the February 1778 Treaty of Alliance — French recognition of American independence and a formal military partnership that brought French troops, ships, and financing into the war. He went on to serve as United States Minister to France (1779–1785) and was among the American negotiators of the 1783 Treaty of Paris that ended the war; he remains the only person to have signed the Declaration of Independence, the Treaty of Paris, and the Constitution.",
  "benjamin-franklin.moment.1":
    "Arrived in Philadelphia essentially penniless after leaving his Boston apprenticeship, and built his own printing business from that starting position — an episode he recounts in his own Autobiography.",
  "benjamin-franklin.interpretation.moment.1":
    "This offers one example of the profile's resourcefulness score: a documented account, in his own words, of building a functioning business from close to nothing.",
  "benjamin-franklin.turning_point.1":
    "For years sought reconciliation between the colonies and Britain as a loyal subject of the Crown, but shifted decisively toward supporting independence after the 1774 \"Cockpit\" hearing humiliation — one of several failed reconciliation efforts that preceded the change in his position.",
  "benjamin-franklin.interpretation.turning_point.1":
    "This helps explain the profile's belief_updating score: a political reversal documented as a tracked change over time against accumulating evidence of British intransigence, not one dramatic conversion.",
  "benjamin-franklin.life_arc.1": "Born.",
  "benjamin-franklin.life_arc.2":
    "His kite experiment showed lightning was electrical, leading to his invention of the lightning rod.",
  "benjamin-franklin.life_arc.3":
    "Proposed the Albany Plan of Union, decades before independence became a live political question.",
  "benjamin-franklin.life_arc.4":
    "After the humiliating \"Cockpit\" hearing, shifted from seeking reconciliation with Britain toward independence.",
  "benjamin-franklin.life_arc.5":
    "Represented the United States in France; helped secure the Treaty of Alliance and the Treaty of Paris.",
  "benjamin-franklin.life_arc.6": "Died.",

  /* ------------------------------------- Batch 7 (exposure-priority): Srinivasa Ramanujan */
  /* CLOSURE PASS: moment.1 narrowed to drop an invented 1913 date and an invented Hardy-reaction/Cambridge-invitation outcome not in this person's own roster rationale. moment.2 (the taxicab-1729 anecdote) deleted outright — it is not in that rationale either. CLOSURE PASS round 2: achievement.1 narrowed — the rationale says "vast areas of mathematics," not "number theory" specifically, and gives the book only as "Carr's Synopsis," not its expanded title. */
  "srinivasa-ramanujan.achievement.1":
    "With no access to advanced mathematical literature in colonial-era India, reconstructed and extended vast areas of mathematics using essentially one outdated textbook, G. S. Carr's Synopsis — a severe resource constraint met by independent reconstruction from what little was available.",
  "srinivasa-ramanujan.achievement.2":
    "At Cambridge from 1914 to 1919, working with G. H. Hardy, Ramanujan produced results across number theory, including an asymptotic formula for the partition function developed jointly with Hardy, and, in the final year of his life, an entirely new class of objects he called \"mock theta functions.\" In May 1918 he was elected a Fellow of the Royal Society — one of the youngest in the Society's history, and only the second Indian ever admitted — and that October became the first Indian elected a Fellow of Trinity College, Cambridge. A notebook of his results, lost for decades and rediscovered by the mathematician George Andrews in 1976, caused what colleagues described as great excitement in the field; as late as 2012, mathematicians were still confirming that offhand remarks in his writings held genuine, previously unproven results.",
  "srinivasa-ramanujan.moment.1":
    "With no formal credentials or introduction, wrote directly to the Cambridge mathematician G. H. Hardy, enclosing pages of his own derived results — one of several mathematicians he had written to, most of whom had not replied.",
  "srinivasa-ramanujan.interpretation.moment.1":
    "This is consistent with the profile's proactive_agency score: rather than waiting to be found through institutional channels that were largely closed to him, he sent his own work directly to mathematicians positioned to recognize it.",
  "srinivasa-ramanujan.life_arc.1": "Born.",
  "srinivasa-ramanujan.life_arc.2":
    "With no access to advanced literature, reconstructed vast areas of mathematics from a single outdated textbook.",
  "srinivasa-ramanujan.life_arc.3": "Wrote directly to the Cambridge mathematician G. H. Hardy, enclosing his own derived results.",
  "srinivasa-ramanujan.life_arc.4":
    "Worked with Hardy at Cambridge, producing results across number theory and mock theta functions.",
  "srinivasa-ramanujan.life_arc.5": "Elected a Fellow of the Royal Society and of Trinity College, Cambridge.",
  "srinivasa-ramanujan.life_arc.6": "Died.",

  /* ----------------------------------------- Batch 7 (exposure-priority): Oprah Winfrey */
  "oprah-winfrey.achievement.1":
    "In 1986, founded Harpo Productions to own and control her own television show outright rather than remain a hired host for a network or syndicator — an unusually early move toward creator-owned media for the period, and the vehicle through which she would run her own career for decades afterward.",
  "oprah-winfrey.achievement.2":
    "The Oprah Winfrey Show ran in national syndication for 25 years, from 1986 to 2011, and became the highest-rated, most-watched daytime talk show in the United States for most of that run. Her 1993 interview with Michael Jackson drew an estimated 36.5 million viewers, making it one of the most-watched interviews in American television history. Beginning in 1996, her on-air book club recommendations routinely drove roughly a million additional copies in sales for the authors she selected, a documented effect on the publishing industry that became known as \"the Oprah Effect.\"",
  "oprah-winfrey.turning_point.1":
    "In the 1980s, while competing daytime talk shows moved toward sensationalist, tabloid-style formats, shifted her own show toward personal, empathetic, issue-driven conversation — a bet on a different direction than the rest of the genre was taking at the time.",
  "oprah-winfrey.interpretation.turning_point.1":
    "This illustrates the profile's opportunity_sensing score: reading a shift in what audiences actually wanted that ran counter to where competing shows were placing their own bets.",
  "oprah-winfrey.life_arc.1": "Born.",
  "oprah-winfrey.life_arc.2": "Founded Harpo Productions to own and control her own television show outright.",
  "oprah-winfrey.life_arc.3":
    "Shifted her show toward personal, empathetic conversation, against the genre's sensationalist trend.",
  "oprah-winfrey.life_arc.4": "Her interview with Michael Jackson drew an estimated 36.5 million viewers.",
  "oprah-winfrey.life_arc.5": "Ended The Oprah Winfrey Show's 25-year, highest-rated syndication run.",

  /* --------------------------------------- Batch 7 (exposure-priority): Wangari Maathai */
  /* CLOSURE PASS: moment.1 narrowed to drop an invented "tens of millions of trees" outcome. turning_point.1 narrowed to drop the 2004/Nobel Peace Prize claim entirely — this person's own roster rationale documents the government opposition/arrests but never mentions the Nobel Prize by name, date, or specific award rationale (only a bare `nobel_laureate` tag, which is not prose content this pipeline may narrate from). */
  "wangari-maathai.achievement.1":
    "In 1977, founded the Green Belt Movement, connecting the deforestation and soil erosion she observed in Kenya directly to the daily burden rural women faced fetching water and firewood — linking environmental restoration and grassroots welfare in a way that was not the standard environmentalist framing of the time.",
  "wangari-maathai.achievement.2":
    "In 2004, Maathai was awarded the Nobel Peace Prize \"for her contribution to sustainable development, democracy and peace\" — becoming the first African woman, and the first environmentalist, to receive the award. In 2006 she went on to spearhead the United Nations' Billion Tree Campaign, extending the reforestation and civic-education model she had built through the Green Belt Movement to a global initiative.",
  "wangari-maathai.moment.1":
    "In the movement's early years, organized rural women to plant tree seedlings using simple, low-cost local methods and without significant institutional funding.",
  "wangari-maathai.interpretation.moment.1":
    "This offers one example of the profile's resourcefulness score: building a large, lasting program on deliberately minimal material means.",
  "wangari-maathai.turning_point.1":
    "The Green Belt Movement's work regularly put her in direct conflict with the Kenyan government of the time, including multiple arrests and documented violence against her; she continued organizing through this opposition regardless of the personal cost.",
  "wangari-maathai.interpretation.turning_point.1":
    "This is consistent with the profile's proactive_agency score, marked dual-edged in this profile: the same self-initiated organizing that built the movement also brought direct personal and legal risk.",
  "wangari-maathai.life_arc.1": "Born.",
  "wangari-maathai.life_arc.2": "Founded the Green Belt Movement, linking reforestation to rural women's daily welfare.",
  "wangari-maathai.life_arc.3": "Organized rural women to plant tree seedlings using simple, low-cost local methods.",
  "wangari-maathai.life_arc.4":
    "Repeatedly arrested and faced violence for her organizing under the Kenyan government of the time.",
  "wangari-maathai.life_arc.5":
    "Awarded the Nobel Peace Prize — the first African woman and first environmentalist laureate.",
  "wangari-maathai.life_arc.6": "Died.",

  /* -------------------------------- Batch 7 (exposure-priority): Wolfgang Amadeus Mozart */
  /* CLOSURE PASS: achievement.1 (child-prodigy touring) deleted — not in this person's own roster rationale. turning_point.1 narrowed to drop an invented Archbishop's name and the invented "literal kick from a steward" anecdote; Vienna and the freelance-vs-fixed-position framing are retained since both are directly in that rationale. Profile V2 pilot (2026-08): the closure pass left this profile with a single turning point and nothing describing his actual musical output -- repaired with 2 Achievements, 2 Life Scenes (including the child-prodigy touring the closure pass had removed, restored here with real dates/venues rather than the earlier undated version), Life Arc, and Legacy, all researched and verified directly against src_mozart_wikipedia (live fetch, not memory). */
  "wolfgang-amadeus-mozart.achievement.1":
    "Across roughly three decades of composing, Mozart completed more than 800 works, catalogued by Köchel number from K. 1 (an early minuet from his childhood) to K. 626 (the unfinished Requiem) — an output spanning symphony (41 completed), concerto (27 for piano alone), opera, chamber music, and sacred music, each pursued as a sustained body of work rather than an occasional exercise.",
  "wolfgang-amadeus-mozart.achievement.2":
    "His mature operas with librettist Lorenzo Da Ponte — The Marriage of Figaro (1786) and Don Giovanni (1787) — combined comic and serious material in ways that departed from the conventions of opera buffa at the time, and remain core repertoire for opera companies today alongside his final opera, The Magic Flute (1791).",
  "wolfgang-amadeus-mozart.moment.1":
    "Beginning with a 1762 visit to the Imperial Court in Vienna, where he and his sister performed for Empress Maria Theresa, Mozart's father took the two children on a continuous tour of European courts from 1763 to 1766 — including a two-week stay at Versailles in December 1763 and an April 1764 performance before King George III and Queen Charlotte in London — years of public performance before his professional composing career had properly begun.",
  "wolfgang-amadeus-mozart.moment.2":
    "In the summer of 1788, Mozart completed his last three symphonies — No. 39 (26 June), No. 40 (25 July), and No. 41 (\"Jupiter,\" 10 August) — within about six weeks, one of the most concentrated productive stretches documented in his output; what specific occasion, if any, prompted the three works is not established.",
  "wolfgang-amadeus-mozart.turning_point.1":
    "In 1781, broke from his employment as a court musician to the Archbishop of Salzburg, actively pursuing an independent freelance career as a composer and performer in Vienna rather than continuing in an assigned court position — an unusual arrangement for a composer of his time.",
  "wolfgang-amadeus-mozart.interpretation.turning_point.1":
    "Read against the profile's dual-edged proactive_agency score, this secured him creative and professional independence rare for a composer of the period, but also left him financially precarious for the rest of his life, dependent on commissions, concerts, and teaching rather than a stable salary.",
  "wolfgang-amadeus-mozart.life_arc.1": "Born in Salzburg.",
  "wolfgang-amadeus-mozart.life_arc.2": "Toured European courts as a child prodigy performer with his father and sister.",
  "wolfgang-amadeus-mozart.life_arc.3": "Worked as a court musician for the Archbishop of Salzburg.",
  "wolfgang-amadeus-mozart.life_arc.4": "Broke from court employment and settled in Vienna as an independent composer.",
  "wolfgang-amadeus-mozart.life_arc.5":
    "Composed his most enduring operas and final symphonies, including The Marriage of Figaro, Don Giovanni, and The Magic Flute.",
  "wolfgang-amadeus-mozart.life_arc.6": "Died in Vienna at age 35, leaving the Requiem unfinished.",
  "wolfgang-amadeus-mozart.legacy":
    "Mozart's operas, symphonies, and chamber works have remained in continuous performance since his death, and he is regarded as one of the most significant composers in the Western classical tradition. His harmonic and structural innovations, and the sheer range of his output across nearly every musical form of his time, influenced generations of composers who followed him.",

  /* -------------------------------------- Batch 7 (exposure-priority): Mahatma Gandhi */
  /* CLOSURE PASS: achievement.1 narrowed to drop an invented "early 1900s" date and an invented "discriminatory laws targeting the Indian community" characterization — this person's own roster rationale describes only "local grievances in South Africa." CLOSURE PASS round 2: turning_point.1 also had an invented "Dandi" destination, "salt tax and monopoly" legal mechanism, and a "chosen specifically because..." motivation — none in the rationale, which names only "the Salt March... in deliberate defiance of British law"; narrowed to that. */
  "mahatma-gandhi.achievement.1":
    "Developed and first tested satyagraha — organized, disciplined civil disobedience against unjust law — in response to local grievances in South Africa, years before applying the same method at national scale in India.",
  "mahatma-gandhi.achievement.2":
    "Between 1920 and 1942, led three nationwide campaigns of organized civil disobedience against British rule — the Non-Cooperation Movement, the Salt Satyagraha (including the 1930 Salt March), and the Quit India Movement — each built around sustained, coordinated mass nonviolent resistance rather than armed struggle, and each met with mass arrests, including his own repeated imprisonment. He led these campaigns as one senior figure within a broader Indian National Congress and independence movement that included other leaders and regional campaigns already under way before his involvement; Britain granted India's independence in August 1947, months after his final imprisonment during Quit India, with the country partitioned into India and Pakistan.",
  "mahatma-gandhi.turning_point.1":
    "In 1930, personally organized and led the Salt March — a 24-day, 240-mile march in deliberate defiance of British law — a specific, self-initiated act of civil disobedience.",
  "mahatma-gandhi.interpretation.turning_point.1":
    "This tracks with the profile's high proactive_agency score, documented directly: a specific, planned act of civil disobedience he conceived and led himself, not a response to someone else's initiative.",
  "mahatma-gandhi.life_arc.1": "Born.",
  "mahatma-gandhi.life_arc.2": "Developed and first tested satyagraha, organized civil disobedience, against local grievances.",
  "mahatma-gandhi.life_arc.3": "Led three nationwide civil disobedience campaigns against British rule.",
  "mahatma-gandhi.life_arc.4":
    "Personally organized and led the Salt March, 240 miles in defiance of British law.",
  "mahatma-gandhi.life_arc.5":
    "India gained independence, months after his final imprisonment; the country was partitioned.",
  "mahatma-gandhi.life_arc.6": "Died.",

  /* -------------------------------- Remaining-19 Completion Batch 1 (2026-08) */
  /* Selection: exposure-ranked (top-1/top-3 quiz-simulation match frequency,
     N=10,000, plus Similar-People-rail in-degree), exposure weighted to
     dominate per this batch's brief. All facts below researched directly
     against this person's own already-cited src_*_wikipedia entry (a live
     fetch, not memory); every sourceId traces to that same fetch unless
     noted. Confucius and Ibn Khaldun (ancient/medieval) are held to the
     stricter chronology discipline the brief requires for premodern figures:
     later tradition is explicitly flagged as such, never presented as
     contemporary record. */

  /* --- Simone Biles --- */
  "simone-biles.achievement.1":
    "Across three Olympic Games (2016, 2020, 2024) and six World Championships, became the most decorated gymnast in history, male or female: 11 Olympic medals and 30 World Championship medals, 23 of them gold. At the 2018 World Championships in Doha, she became the first American and only the tenth gymnast from any country to win a medal on every event at a single World Championships.",
  "simone-biles.achievement.2":
    "Four distinct skills across vault, floor exercise, and balance beam have been given the difficulty-rated name \"the Biles\" after her, at gymnastics' highest difficulty ratings — skills rated so difficult that, years after each was introduced, few or no other competitors have repeated them in competition.",
  "simone-biles.moment.1":
    "On January 18, 2018, Biles publicly stated that former USA Gymnastics team physician Larry Nassar had sexually assaulted her and that USA Gymnastics had helped cover it up. She and other survivors were awarded the Arthur Ashe Courage Award later that year, and at the 2018 U.S. National Championships she wore a teal leotard in solidarity with other survivors of Nassar's abuse.",
  "simone-biles.moment.2":
    "At the 2018 World Championships in Doha, Biles went to an emergency room the night before qualifying with a kidney stone, then won the all-around final by 1.7 points despite falls on vault and balance beam, and won the first-ever world title on vault with a new skill later named after her.",
  "simone-biles.turning_point.1":
    "At the 2020 Tokyo Olympics, withdrew from most team and individual event finals after developing \"the twisties\" — a loss of spatial awareness while airborne that made completing her twisting skills unsafe — citing her mental health as the reason. The decision drew significant public criticism at the time from commentators who argued she owed her team a title defense regardless; it was more broadly reassessed within the following years as elite sport's institutions and press began discussing athlete mental health more openly. She returned to competition in 2023 and won Olympic all-around and vault gold again in 2024.",
  "simone-biles.interpretation.turning_point.1":
    "This is consistent with the profile's dual-edged proactive_agency score: a self-directed decision against strong institutional and public pressure to continue, whose reception shifted substantially between 2021 and her 2024 comeback.",
  "simone-biles.life_arc.1": "Born in Columbus, Ohio; later adopted, along with her younger sister, by her maternal grandfather and his wife after a period in foster care.",
  "simone-biles.life_arc.2": "Won her first world all-around title at age 16, the first Black woman to do so.",
  "simone-biles.life_arc.3": "Won a then-American-record four gold medals at the 2016 Rio Olympics.",
  "simone-biles.life_arc.4": "Publicly disclosed that USA Gymnastics team physician Larry Nassar had sexually assaulted her.",
  "simone-biles.life_arc.5": "Withdrew from most of her events at the Tokyo Olympics, citing her mental health.",
  "simone-biles.life_arc.6": "Returned to competition and won Olympic all-around and vault gold at the 2024 Paris Games.",
  "simone-biles.legacy":
    "Biles's technical difficulty redefined the sport's competitive ceiling — the skills bearing her name remain, years later, among the hardest attempted in competition — while her 2021 Tokyo withdrawal became a widely cited reference point in broader conversations about balancing athlete mental health against institutional and public expectations to compete through injury or distress.",

  /* --- Serena Williams --- */
  "serena-williams.achievement.1":
    "Won 23 Grand Slam singles titles across a professional career from 1995 to 2022, the most of any player in the Open Era, and completed a Career Golden Slam in both singles and doubles.",
  "serena-williams.achievement.2":
    "Held all four Grand Slam singles titles simultaneously on two separate occasions (2002–2003 and 2014–2015), a feat — informally called the \"Serena Slam\" — achieved only a handful of times in the sport's history.",
  "serena-williams.moment.1":
    "Her father, Richard Williams, moved the family to Compton, California, and began coaching Serena and her sister Venus there from early childhood, a training path he had deliberately planned before either daughter was born.",
  "serena-williams.moment.2":
    "Won the 2017 Australian Open, her 23rd major singles title, while approximately eight weeks pregnant, defeating her sister Venus in the final.",
  "serena-williams.turning_point.1":
    "After giving birth in September 2017, Williams developed a pulmonary embolism and related complications; she has said that medical staff did not initially act on her own account of her symptoms, drawn from her prior history of blood clots, until she insisted on the specific tests. In the years afterward, she became a prominent public advocate for Black maternal health and childbirth safety.",
  "serena-williams.interpretation.turning_point.1":
    "This is consistent with the profile's independent_thinking and proactive_agency scores: having to advocate for her own diagnosis against initial medical skepticism appears to have been the direct impetus for advocacy work she had not previously taken on.",
  "serena-williams.life_arc.1": "Born in Saginaw, Michigan; the family later moved to Compton, California, where her father began coaching her.",
  "serena-williams.life_arc.2": "Turned professional at age 14.",
  "serena-williams.life_arc.3": "Won her first Grand Slam singles title at the 1999 US Open.",
  "serena-williams.life_arc.4": "Held all four major titles at once for the first time, a run known as the \"Serena Slam.\"",
  "serena-williams.life_arc.5": "Won the 2017 Australian Open while pregnant, her 23rd major title, then faced serious childbirth complications later that year.",
  "serena-williams.life_arc.6": "Announced her retirement from professional tennis in 2022.",
  "serena-williams.legacy":
    "Williams's 23 Grand Slam singles titles and sustained dominance across nearly two decades reshaped expectations for longevity and power in women's tennis, and her public account of her own childbirth complications helped raise the profile of Black maternal health as a mainstream advocacy issue beyond sport.",

  /* --- Richard Feynman --- */
  "richard-feynman.achievement.1":
    "Developed, alongside Julian Schwinger and Sin-Itiro Tomonaga, the modern formulation of quantum electrodynamics — including the diagrammatic technique now called Feynman diagrams and a path-integral approach to quantum mechanics — for which the three shared the 1965 Nobel Prize in Physics.",
  "richard-feynman.achievement.2":
    "His undergraduate lecture course at Caltech (1961–1964) was transcribed and published as The Feynman Lectures on Physics, which has remained in wide use as a physics teaching resource for more than six decades.",
  "richard-feynman.moment.1":
    "During the Manhattan Project at Los Alamos, Feynman spent off-hours testing the combination locks on colleagues' filing cabinets, found many left at factory-default settings, and left notes inside as pranks — one of several anecdotes later collected in his memoir Surely You're Joking, Mr. Feynman!",
  "richard-feynman.moment.2":
    "While a visiting professor in Brazil from 1949 to 1952, Feynman learned to play the frigideira, a metal percussion instrument, and became an enthusiastic amateur bongo and conga player, later sitting in with pit orchestras for musicals — a hobby he kept alongside his physics career for the rest of his life.",
  "richard-feynman.turning_point.1":
    "At a 1986 Rogers Commission public hearing into the Space Shuttle Challenger disaster, Feynman placed a piece of the shuttle's O-ring material in a clamp and submerged it in a glass of ice water on live television, demonstrating that the material lost its resilience at low temperature — the specific mechanical failure investigators would identify as a cause of the disaster. It was his own initiative, conducted outside the commission's planned proceedings.",
  "richard-feynman.interpretation.turning_point.1":
    "This matches the profile's high proactive_agency score: a specific, unauthorized act that went around an official process he judged too slow, and one that shifted his public standing from a physicist known within his field to a nationally recognized figure.",
  "richard-feynman.life_arc.1": "Born in Queens, New York.",
  "richard-feynman.life_arc.2": "Worked on the Manhattan Project at Los Alamos in Hans Bethe's Theoretical Division, present at the July 1945 Trinity test.",
  "richard-feynman.life_arc.3": "Joined Caltech, where he developed his diagrammatic approach to quantum electrodynamics and delivered the lecture course later published as The Feynman Lectures on Physics.",
  "richard-feynman.life_arc.4": "Shared the 1965 Nobel Prize in Physics with Julian Schwinger and Sin-Itiro Tomonaga.",
  "richard-feynman.life_arc.5": "Served on the Rogers Commission investigating the 1986 Challenger disaster.",
  "richard-feynman.life_arc.6": "Died in Los Angeles.",
  "richard-feynman.complexities.1":
    "Feynman's own published writing about his personal life — most notably his memoir Surely You're Joking, Mr. Feynman! — recounts episodes of his own conduct toward women that later readers and commentators have increasingly scrutinized, including pretending to be an undergraduate to deceive younger women he wanted to date and holding some work-related meetings in strip clubs. These are his own accounts of his own behavior, not allegations from others, and they complicate a straightforwardly admiring modern reading of a figure otherwise remembered primarily for his scientific and teaching legacy.",
  "richard-feynman.legacy":
    "Feynman diagrams and the path-integral formulation remain standard tools throughout theoretical physics, and The Feynman Lectures on Physics is still assigned or consulted by physics students decades after it was recorded. His public role in identifying the Challenger disaster's cause also established a model, still cited today, of a working scientist communicating a technical finding directly and demonstrably to a general public audience.",

  /* --- Ibn Khaldun --- */
  /* Ancient/medieval discipline: every claim below traces to Ibn Khaldun's
     own autobiography (At-Ta'rif, as described in the Wikipedia article) or
     directly attested career record, not later legend — flagged inline
     where the article itself notes the source is his own account. */
  "ibn-khaldun.achievement.1":
    "Wrote the Muqaddimah (1377), the methodological introduction to a planned universal history, developing the concept of asabiyyah — group solidarity — as a driver of dynasties' rise and eventual decline. The work is widely credited as a founding text of historiography, sociology, and economic thought.",
  "ibn-khaldun.achievement.2":
    "Across a second career as a jurist in Cairo, was appointed Grand Qadi (chief judge) of the Maliki legal school six separate times between 1384 and his death in 1406 — repeatedly dismissed, and repeatedly reappointed, reflecting the Mamluk court's continued reliance on him as a legal authority even as his own attempts at judicial reform repeatedly put him at odds with the same court.",
  "ibn-khaldun.moment.1":
    "In 1401, while the Mongol conqueror Timur besieged Damascus, Ibn Khaldun was lowered by rope over the city walls to negotiate with him directly. According to his own autobiography, Timur questioned him in detail about the geography and politics of the Maghreb; Ibn Khaldun later wrote an extensive account of the meetings and prepared a separate report on Timur for the Marinid rulers of Fez.",
  "ibn-khaldun.moment.2":
    "In 1357, while serving the Marinid sultan in Fez, was imprisoned for 22 months following a political dispute — one of several imprisonments and abrupt dismissals across a career spent moving among rival courts in Tunis, Fez, Granada, and Béjaïa.",
  "ibn-khaldun.turning_point.1":
    "In 1375, after roughly two decades moving between rival North African and Andalusian courts, withdrew with his family to the remote fortress of Qal'at Ibn Salama for about three years to write, largely from memory rather than a working library. The Muqaddimah he completed there, not his preceding administrative career, became the basis of his lasting reputation.",
  "ibn-khaldun.interpretation.turning_point.1":
    "This profile scores the underlying pattern of self-directed career moves as dual-edged, and this episode illustrates why: a deliberate, self-initiated retreat from the same cycle of patronage and political instability his own career had followed, which produced his most enduring work.",
  "ibn-khaldun.life_arc.1": "Born in Tunis to an Andalusian family of scholars and officials.",
  "ibn-khaldun.life_arc.2": "Lost both parents to the Black Death plague at age 17.",
  "ibn-khaldun.life_arc.3": "Served in a series of administrative and diplomatic posts under rulers in Tunis, Fez, Granada, and Béjaïa, including a 22-month imprisonment in Fez.",
  "ibn-khaldun.life_arc.4": "Withdrew to the fortress of Qal'at Ibn Salama and wrote the Muqaddimah.",
  "ibn-khaldun.life_arc.5": "Settled in Cairo, where he was repeatedly appointed and dismissed as the city's Grand Qadi.",
  "ibn-khaldun.life_arc.6": "Negotiated directly with Timur outside besieged Damascus in 1401, then died in Cairo in 1406, one month after his sixth appointment as qadi.",
  "ibn-khaldun.legacy":
    "The Muqaddimah's theoretical framework — group solidarity as the engine of dynastic rise and decline, and a cyclical account of how conquering groups assimilate and are in turn displaced — is now recognized as a founding contribution to sociology, historiography, and economic thought, still studied by historians of ideas centuries after a career spent for the most part as a working jurist and administrator rather than a full-time scholar.",

  /* --- Confucius --- */
  /* Ancient discipline: life_arc and achievement below use only what this
     person's own Wikipedia article marks as well-attested; the Chen/Cai
     travel period and the "transmitter, not a maker" self-description are
     flagged as resting on the Analects, itself compiled by disciples after
     his death, not a contemporary record. Zero turning points: no single
     documented before/after break in the well-attested record — his own
     political program went unadopted in his lifetime and gained influence
     only posthumously, which is a sustained pattern, not a discrete pivot. */
  "confucius.achievement.1":
    "Pioneered a form of private teaching explicitly open beyond hereditary aristocratic status, organized around the traditional Six Arts, to students tradition puts in the thousands — a documented departure, in his own lifetime, from an ethos in which formal education had been reserved for the nobility.",
  "confucius.moment.1":
    "During a decade or more spent traveling among neighboring states after leaving Lu, tradition holds that he and his followers were once cut off from food between the states of Chen and Cai; later accounts describe Confucius treating the episode as a test of a follower's constancy rather than grounds to abandon his teaching, though the story is known mainly through retellings compiled well after his death rather than a contemporary record.",
  "confucius.moment.2":
    "According to the Analects — compiled by his disciples after his death, not during his lifetime — Confucius described his own role as \"a transmitter, not a maker,\" positioning himself as preserving inherited wisdom rather than originating new doctrine.",
  "confucius.life_arc.1": "Born c. 551 BCE in the state of Lu (present-day Qufu, Shandong); his father died when he was three, and he was raised in modest circumstances by his mother.",
  "confucius.life_arc.2": "Held a series of official posts in Lu, reportedly rising to Minister of Crime.",
  "confucius.life_arc.3": "Left Lu around 497 BCE after his political proposals went unadopted, beginning more than a decade traveling among neighboring states.",
  "confucius.life_arc.4": "Returned to Lu in his later years and devoted himself to teaching until his death, c. 479 BCE.",
  "confucius.life_arc.5": "After his death, his sayings were compiled by disciples as the Analects; from around 140 BCE, ideas developed under his name became the Han dynasty's official state philosophy.",
  "confucius.legacy":
    "Beginning under the Han dynasty and, with interruptions, continuing into the early twentieth century, ideas compiled and elaborated under Confucius's name — substantially the work of Han-dynasty compilers and later interpreters such as Zhu Xi, built on texts assembled long after his death — became imperial China's official state philosophy and the basis of its civil-service examination system, shaping social and political life across East Asia for two millennia. How much of that later tradition reflects Confucius's own recorded teaching, as opposed to subsequent political and philosophical elaboration, remains debated by historians, and the same institutionalized tradition was itself later blamed, notably during 20th-century China's Cultural Revolution, for entrenching rigid social hierarchy — a charge aimed at the later imperial institution built in his name, not at his own attested teaching directly. Whatever that distance, Confucius is credited with founding one of the most durable strands of ethical and political thought in world history.",

  /* --- Yayoi Kusama --- */
  "yayoi-kusama.achievement.1":
    "From the early 1960s, developed a body of immersive, participatory installation work — most enduringly the mirrored \"Infinity Mirror Room\" installations she began in 1965, alongside recurring polka-dot and pumpkin motifs — that helped establish a mode of installation art built around infinite, participatory visual space. A 2017 Hirshhorn Museum retrospective of six of these rooms drew record attendance and traveled to five more North American museums.",
  "yayoi-kusama.achievement.2":
    "Represented Japan at the 1993 Venice Biennale and, after roughly two decades of comparative international obscurity following her 1973 return to Japan, became one of the world's top-selling living artists at auction, ranked among the top 50 artists in Sotheby's 2023 market survey.",
  "yayoi-kusama.moment.1":
    "In 1957, after corresponding with the American painter Georgia O'Keeffe for advice, moved first to Seattle and then, in 1958, to New York with very limited money, supporting herself with odd jobs and by sewing her own clothes while working to establish herself in a country and an art scene where she had no prior standing.",
  "yayoi-kusama.moment.2":
    "After Kusama exhibited a soft sculpture covered in protruding forms at New York's Green Gallery in June 1963, fellow artist Claes Oldenburg began exhibiting visually similar sewn soft sculptures that September; an art historian's later scholarship on the period concluded Oldenburg was likely influenced by Kusama's work, and Kusama has said she found the episode depressing at the time. A similar pattern — Andy Warhol covering an exhibit space with repeated photographic imagery not long after Kusama had covered gallery walls with photographs in her own installation — has since been cited as a further example of her underrecognized influence on artists more widely credited for ideas she originated first.",
  "yayoi-kusama.turning_point.1":
    "In 1977, after a difficult reception on returning to Japan in 1973 and a period of declining health, Kusama took up residence, by her own choice, at a psychiatric hospital in Tokyo, continuing to work daily at a studio near the hospital for the rest of her life. She has said that making art was what allowed her to keep going through this period.",
  "yayoi-kusama.interpretation.turning_point.1":
    "This is consistent with the profile's high autonomy_need score: rather than stopping work, she restructured her entire living arrangement so that making art could continue on her own terms.",
  "yayoi-kusama.complexities.1":
    "In October 2023, ahead of a major U.S. museum retrospective, Kusama apologized after decades-old passages in her own published writing — including a 2003 memoir — describing Black people in derogatory and racially essentializing terms drew renewed public criticism. She said in a statement that she deeply regretted the language and that her work's message had always been about universal love and respect. The episode is now part of how critics and institutions discuss her work alongside her artistic influence.",
  "yayoi-kusama.life_arc.1": "Born in Matsumoto, Japan, into a family running a plant nursery and seed business.",
  "yayoi-kusama.life_arc.2": "Moved to the United States in 1957–1958 after corresponding with Georgia O'Keeffe, settling in New York.",
  "yayoi-kusama.life_arc.3": "Became part of New York's avant-garde art scene, developing her Infinity Net paintings, soft sculptures, and Infinity Mirror Rooms.",
  "yayoi-kusama.life_arc.4": "Returned to Japan in 1973.",
  "yayoi-kusama.life_arc.5": "Took up permanent, voluntary residence at a Tokyo psychiatric hospital in 1977, continuing to work at a nearby studio.",
  "yayoi-kusama.life_arc.6": "Represented Japan at the 1993 Venice Biennale; died in Tokyo in August 2026 at age 97.",
  "yayoi-kusama.legacy":
    "Kusama's Infinity Mirror Rooms and polka-dot motifs became among the most widely recognized and reproduced images in contemporary art, and by the 2010s she was regularly named among the world's most-exhibited and highest-selling artists — a striking reversal of the international obscurity she faced for roughly two decades after leaving New York in the 1970s.",

  /* --- Nikola Tesla --- */
  "nikola-tesla.achievement.1":
    "Patented an alternating-current induction motor in 1888 that avoided the sparking commutator design of earlier motors, then licensed it to George Westinghouse. The resulting Westinghouse AC system won the contract to power the 1893 World's Columbian Exposition in Chicago and to transmit power from Niagara Falls, establishing alternating current — over Thomas Edison's competing direct-current system — as the technical basis for long-distance electrical power transmission still in use today.",
  "nikola-tesla.achievement.2":
    "Held patents across power transmission and high-frequency, high-voltage devices, including the resonant transformer he introduced in 1891 and still known as the Tesla coil, work that fed directly into early 20th-century radio and electrical engineering.",
  "nikola-tesla.moment.1":
    "While working for Thomas Edison's manufacturing company in New York in 1884–1885, Tesla later said he had been promised a $50,000 bonus for redesigning the company's dynamos; when he asked to be paid after completing the work, he was told, by his own account, that the offer had been a joke. He resigned shortly afterward.",
  "nikola-tesla.moment.2":
    "In 1891, facing financial pressure on Westinghouse after the Panic of 1890, Tesla voluntarily released the company from its royalty contract with him — worth $2.50 per horsepower of AC equipment sold — to help keep it solvent, forgoing income that would likely have made him one of the wealthiest people of his era.",
  "nikola-tesla.turning_point.1":
    "After leaving Edison's company in 1885 over the disputed bonus, partnered with George Westinghouse to develop and commercialize alternating current — a direct technical and commercial challenge to his former employer's competing direct-current system.",
  "nikola-tesla.interpretation.turning_point.1":
    "This matches the profile's proactive_agency score: a shift from an employee executing an employer's plans to an independent inventor backing his own technical conviction against that same employer's competing standard.",
  "nikola-tesla.life_arc.1": "Born in Smiljan, in the Austrian Empire (present-day Croatia).",
  "nikola-tesla.life_arc.2": "Emigrated to the United States in 1884 and briefly worked for Thomas Edison's manufacturing company.",
  "nikola-tesla.life_arc.3": "Patented his AC induction motor and partnered with George Westinghouse.",
  "nikola-tesla.life_arc.4": "Westinghouse's AC system, built on Tesla's patents, powered the 1893 Chicago World's Fair and the Niagara Falls power project.",
  "nikola-tesla.life_arc.5": "Built the Wardenclyffe Tower on Long Island as a wireless transmission station; the project collapsed after financial backer J.P. Morgan withdrew support.",
  "nikola-tesla.life_arc.6": "Died in New York in 1943, in debt, having outlived most of his patents.",
  "nikola-tesla.legacy":
    "Tesla's alternating-current system remains the technical basis of long-distance electrical power transmission worldwide. His later-life financial collapse and the failure of Wardenclyffe also made him, in popular memory, a symbol of visionary invention undercut by business misfortune — a reputation genuinely reflected in the documented record, not only in legend.",

  /* --- Akira Kurosawa --- */
  "akira-kurosawa.achievement.1":
    "Rashomon's Golden Lion at the 1951 Venice Film Festival, and its subsequent commercial success in the United States, introduced postwar Japanese cinema to Western audiences at scale for the first time and touched off a decade of Western critical and commercial interest in Japanese film.",
  "akira-kurosawa.achievement.2":
    "Seven Samurai (1954), made over nearly a year of production including a 45-day screenplay retreat and 148 days of shooting, became one of the most influential films in cinema history — voted the best Japanese film ever made in a 1999 critics' poll and ranked 20th among all films worldwide in the 2022 Sight & Sound critics' poll — and its structure directly influenced later films including Star Wars (1977).",
  "akira-kurosawa.moment.1":
    "For The Most Beautiful (1944), Kurosawa had his cast live in a real factory during the shoot, eat the factory's food, and address each other only by their characters' names — an immersive production method he returned to, in various forms, throughout his career.",
  "akira-kurosawa.moment.2":
    "In 1968, three weeks into directing the American co-production Tora! Tora! Tora!, Kurosawa was fired from the film, officially attributed to fatigue — a specific professional setback that preceded a deeper career crisis over the following years.",
  "akira-kurosawa.turning_point.1":
    "After being fired from Tora! Tora! Tora! (1968) and then seeing his next film, Dodesukaden (1970), fail commercially, Kurosawa attempted suicide in December 1971; he survived, and his health recovered within months. He continued directing afterward: his next film, Dersu Uzala (1975), was funded not by a Japanese studio but by the Soviet agency Mosfilm and won the Academy Award for Best Foreign Language Film, and Kagemusha (1980, backed in part with help from American directors George Lucas and Francis Ford Coppola) and Ran (1985) followed, both financed internationally rather than by a Japanese studio.",
  "akira-kurosawa.life_arc.1": "Born in Tokyo.",
  "akira-kurosawa.life_arc.2": "Joined the P.C.L. film studio (later Toho) as an assistant director in 1936.",
  "akira-kurosawa.life_arc.3": "Directed his first feature, Sanshiro Sugata, in 1943.",
  "akira-kurosawa.life_arc.4": "Rashomon (1950) won the Golden Lion at Venice in 1951; Seven Samurai followed in 1954.",
  "akira-kurosawa.life_arc.5": "Fired from Tora! Tora! Tora! in 1968 and attempted suicide in 1971 after Dodesukaden's commercial failure, then rebuilt his career with the Soviet-funded Dersu Uzala (1975).",
  "akira-kurosawa.life_arc.6": "Returned to international acclaim with Kagemusha (1980) and Ran (1985); received an Academy Honorary Award in 1990 and died in Tokyo in 1998.",
  "akira-kurosawa.legacy":
    "Kurosawa is now widely regarded as one of the most influential filmmakers in cinema history, and directors including George Lucas, Francis Ford Coppola, and others who backed his later work have credited his influence on their own filmmaking. The arc of his own career — a postwar breakthrough, an acute domestic crisis in the early 1970s, and an internationally financed late-career renaissance — is itself often cited as emblematic of the difficulty Japanese studio-era auteurs faced sustaining backing through the industry's contraction in the 1960s and 1970s.",

  /* --- Ludwig van Beethoven --- */
  "ludwig-van-beethoven.achievement.1":
    "Composed nine symphonies, thirty-two piano sonatas, and numerous chamber and choral works across roughly three creative periods, including the Third (\"Eroica\") and Fifth Symphonies and the late Ninth Symphony (1824) — the last completed and premiered after he had lost nearly all of his hearing — output regarded as a central pivot between the Classical and Romantic eras of Western music.",
  "ludwig-van-beethoven.achievement.2":
    "His middle-period \"heroic\" works — including the Third Symphony (1803–04), Fifth Symphony (1808), and the opera Fidelio (premiered 1805) — expanded the emotional scale and formal ambition of instrumental music beyond the conventions he had inherited from Haydn and Mozart, and became a starting point later composers drew on for Romantic-era orchestral writing.",
  "ludwig-van-beethoven.moment.1":
    "On medical advice, secluded himself at Heiligenstadt, outside Vienna, from April to October 1802, where he composed a private letter to his brothers — never sent, discovered only after his death — recording his despair over his advancing deafness and thoughts of suicide, alongside his resolution to continue composing.",
  "ludwig-van-beethoven.moment.2":
    "In 1809, facing a court appointment offer from Napoleon's brother Jérôme Bonaparte that would have taken him from Vienna, personally negotiated an annual pension of 4,000 florins from three aristocratic patrons — Archduke Rudolph, Prince Kinsky, and Prince Lobkowitz — to remain in the city. The arrangement proved unreliable in practice (Kinsky died in 1812, Lobkowitz went bankrupt in 1811), and Beethoven had to pursue legal action to recover part of what he was owed.",
  "ludwig-van-beethoven.turning_point.1":
    "Beethoven's hearing loss, which he told a friend in 1815 had begun as early as 1798, progressed over roughly two decades until, by his own account, he could still distinguish only low tones and sudden loud sounds. He continued composing major works — completing and conducting the premiere of his Ninth Symphony in 1824 — through methods adapted to the loss, rather than by continuing to rely on hearing performances directly.",
  "ludwig-van-beethoven.interpretation.turning_point.1":
    "This is consistent with the profile's high resourcefulness score: a genuine constraint met by substituting his method of composing, not simply persistence despite adversity in the abstract.",
  "ludwig-van-beethoven.life_arc.1": "Born in Bonn.",
  "ludwig-van-beethoven.life_arc.2": "Moved permanently to Vienna in November 1792, shortly before learning of his father's death.",
  "ludwig-van-beethoven.life_arc.3": "Secluded himself at Heiligenstadt in 1802 and wrote the private letter later known as the Heiligenstadt Testament.",
  "ludwig-van-beethoven.life_arc.4": "Composed his middle-period \"heroic\" works, including the Third and Fifth Symphonies.",
  "ludwig-van-beethoven.life_arc.5": "Negotiated an annual pension from three aristocratic patrons in 1809 to remain in Vienna.",
  "ludwig-van-beethoven.life_arc.6": "Completed and premiered his Ninth Symphony in 1824, after losing nearly all his hearing; died in Vienna in 1827.",
  "ludwig-van-beethoven.legacy":
    "Beethoven's expansion of symphonic and chamber forms, sustained through the loss of the sense most central to his profession, is often cited as one of the most striking examples in Western art of work outlasting personal circumstance. His symphonies, sonatas, and quartets remain core orchestral and chamber repertoire two centuries later.",

  /* --- Hayao Miyazaki --- */
  "hayao-miyazaki.achievement.1":
    "Co-founded Studio Ghibli in 1985 with longtime collaborator Isao Takahata, following the success of Nausicaä of the Valley of the Wind (1984), adapted from his own manga. The studio became one of the most internationally acclaimed animation houses in the world, with Miyazaki directing or co-writing most of its landmark films over the following four decades.",
  "hayao-miyazaki.achievement.2":
    "Directed Spirited Away (2001), which became Japan's highest-grossing film at the time of release and won the Academy Award for Best Animated Feature, and The Boy and the Heron (2023), which won the same award more than two decades later — an unusually long span between two Academy Award-winning films by the same director.",
  "hayao-miyazaki.achievement.3":
    "Princess Mononoke (1997) became the first animated film to win the Japan Academy Film Prize for Picture of the Year and, at a budget of ¥2.35 billion, was the most expensive Japanese animated film made up to that time; it went on to become Japan's highest-grossing domestic film for several months after release.",
  "hayao-miyazaki.moment.1":
    "In 1964, as a young animator at Toei Doga, became chief secretary of the studio's labor union, forming a lifelong friendship and creative partnership with the union's vice-chairman, Isao Takahata, with whom he would later found Studio Ghibli.",
  "hayao-miyazaki.moment.2":
    "Announced his retirement from feature filmmaking in January 1998, but returned within days to direct Spirited Away after the sudden death, on January 21, 1998, of Yoshifumi Kondō, the director who had been slated to succeed him — one of several announced-then-reversed retirements across his career, the last reversed in 2016 to make The Boy and the Heron (2023).",
  "hayao-miyazaki.life_arc.1": "Born in Tokyo in 1941, the second of four sons; his father directed a company manufacturing aircraft parts during World War II.",
  "hayao-miyazaki.life_arc.2": "Evacuated during the war; among his earliest memories are of bombed-out cities.",
  "hayao-miyazaki.life_arc.3": "Joined the animation studio Toei Doga in 1963.",
  "hayao-miyazaki.life_arc.4": "Directed Nausicaä of the Valley of the Wind (1984), then co-founded Studio Ghibli with Isao Takahata in 1985.",
  "hayao-miyazaki.life_arc.5": "Directed Princess Mononoke (1997) and Spirited Away (2001), the latter winning the Academy Award for Best Animated Feature.",
  "hayao-miyazaki.life_arc.6": "Announced his retirement from feature films in 2013, then returned to direct The Boy and the Heron (2023), which won a second Academy Award for Best Animated Feature.",
  "hayao-miyazaki.legacy":
    "His combination of hand-drawn craft discipline, recurring environmentalist and anti-war themes, and strong female protagonists helped establish Studio Ghibli's films as some of the most internationally acclaimed animated work of the era. Spirited Away and The Boy and the Heron's Academy Awards, won more than twenty years apart, reflect a sustained international critical standing rare for any director working primarily in animation.",

  // Remaining-19 Editorial Completion Batch 2 (2026-08).
  "steve-jobs.achievement.1":
    "Co-founded Apple with Steve Wozniak (and Ronald Wayne) in 1976; the Apple II (1977) was among the first mass-produced microcomputers, and the 1984 Macintosh — the first mass-produced computer with a graphical user interface — launched the desktop-publishing industry alongside the Apple LaserWriter.",
  "steve-jobs.achievement.2":
    "After returning to Apple in 1997, directed its design and engineering teams through the iMac, iTunes and iPod, the iPhone (2007), the App Store, and the iPad — an integrated hardware-software-services model that became a template across much of the consumer technology industry.",
  "steve-jobs.achievement.3":
    "As Pixar's majority shareholder and chairman from 1986 to 2006, after buying Lucasfilm's Graphics Group for $10 million, backed the studio that released Toy Story (1995), the first feature-length computer-animated film; Disney's 2006 acquisition of Pixar for $7.4 billion made him Disney's largest individual shareholder.",
  "steve-jobs.moment.1":
    "On a 1979 visit to Xerox PARC, Jobs immediately recognized the transformative potential of the graphical user interface and mouse Xerox's own researchers had built but never turned into a product, and had Apple's engineers build the ideas into the Lisa and then the Macintosh.",
  "steve-jobs.interpretation.moment.1":
    "This matches the profile's high opportunity_sensing score: perceiving the significance of something another organization had already built but hadn't grasped the importance of.",
  "steve-jobs.moment.2":
    "At NeXT, Jobs pursued aesthetic perfection even where it strained the business — most visibly in the NeXTcube's costly magnesium case — and by 1993, after selling only about 50,000 machines, the company abandoned hardware and pivoted to software.",
  "steve-jobs.turning_point.1":
    "In September 1985, after a boardroom power struggle with CEO John Sculley over whether the Macintosh should remain a closed system or open like the Apple II, Jobs was removed from the Macintosh group and resigned from the company he had co-founded; five senior Apple employees left with him to start NeXT, and his newly bought Pixar lost money for years afterward.",
  "steve-jobs.turning_point.2":
    "Apple acquired NeXT for $400 million in a deal finalized in February 1997; when CEO Gil Amelio was ousted that July, Jobs became Apple's de facto leader, was named interim CEO that September, and dropped the \"interim\" title in March 2000 — canceling underperforming projects like Newton and ending Macintosh-clone licensing before the company's actual product turnaround, the 1998 iMac, arrived the following year.",
  "steve-jobs.interpretation.turning_point.2":
    "This matches the profile's high proactive_agency score: rather than simply being reinstated, Jobs maneuvered through the acquisition and its aftermath into direct control of the company that had removed him twelve years earlier.",
  "steve-jobs.life_arc.1": "Born in San Francisco.",
  "steve-jobs.life_arc.2": "Co-founded Apple with Steve Wozniak; the Apple II followed in 1977.",
  "steve-jobs.life_arc.3": "Directed the release of the Macintosh, the first mass-produced computer with a graphical user interface.",
  "steve-jobs.life_arc.4": "Forced out of Apple after a boardroom power struggle; founded NeXT and bought the company that became Pixar.",
  "steve-jobs.life_arc.5": "Returned to Apple through its acquisition of NeXT, became CEO by 2000, and later launched the iPhone in 2007.",
  "steve-jobs.life_arc.6": "Died of complications from a pancreatic neuroendocrine tumor first diagnosed in 2003.",
  "steve-jobs.complexities.1":
    "Jobs's own conduct in several documented episodes complicates a purely celebratory account. In a 1975 Atari deal, he told Steve Wozniak — who had done the actual circuit design — that a bonus was $750 when it was actually $5,000, splitting only the smaller figure with him; Wozniak learned the real amount only years later. He denied paternity of his daughter Lisa, born in 1978, until a court-ordered test found a 94.1% probability he was the father, and paid minimal support until his own Apple-IPO wealth made continued denial harder to sustain, though he later named the Apple Lisa computer for her. His biographer Walter Isaacson also documents a post-1997 management style staff described as rare but real \"summary executions\" of underperforming employees and projects — frequent enough that some reported dreading an encounter with him in an elevator.",
  "steve-jobs.legacy":
    "The integrated hardware-software-services model Jobs directed at Apple — building the device, its operating system, and the store or service around it as one designed whole — became a template much of the consumer technology industry has since followed, built in each case by large design and engineering teams under his direction rather than by his invention alone. Pixar's early features, released while he controlled the studio, helped establish computer animation as a mainstream medium. The iPhone he introduced in 2007 remains a category-defining product line more than a decade after his death.",

  "socrates.achievement.1":
    "Practiced the elenchus — sustained questioning that tests a claimed expert's own stated beliefs for internal contradiction — as an open, unpaid activity conducted across the whole of Athenian society, from elite discussion partners to ordinary craftsmen, unlike the professional Sophists of his time who charged fees for instruction.",
  "socrates.achievement.2":
    "His method and manner, preserved and developed above all by his student Plato, became the founding template for the philosophical dialogue form and much of subsequent Western philosophical method — though how much of what Plato wrote reflects the historical Socrates rather than Plato's own later thought remains genuinely debated by scholars, the so-called Socratic problem.",
  "socrates.moment.1":
    "According to Plato, Socrates served in and was noted for personal courage during three Athenian campaigns of the Peloponnesian War — Potidaea, Delium, and Amphipolis. A later tradition additionally credits him with saving the life of the young Alcibiades at Potidaea, though the article's own sourcing treats that specific detail as less certain than his service itself.",
  "socrates.moment.2":
    "In 404 BC, under the oligarchic regime known as the Thirty Tyrants, Socrates was ordered — along with several others — to help arrest a fellow Athenian, Leon of Salamis, so that he could be executed. Plato's Apology reports that Socrates alone refused to take part, risking the regime's own retribution rather than participate in what he judged a crime.",
  "socrates.interpretation.moment.2":
    "This matches the profile's proactive_agency score: an unassigned, self-initiated refusal under real personal risk, distinct from his general practice of questioning others' beliefs.",
  "socrates.turning_point.1":
    "In 399 BC, an Athenian jury of several hundred citizens tried Socrates on charges of impiety and corrupting the city's youth. Plato's Apology depicts him mounting a deliberately unconventional defense — including, once convicted, proposing free meals for life at public expense as his own penalty rather than exile or silence. The jury sentenced him to death instead, and he was executed the next morning by drinking hemlock, an event Plato's Phaedo describes in more detail than modern scholarship treats as strictly reliable. The trial ended his own active practice of public questioning and began his far larger influence as a figure known almost entirely through his students' writing about him.",
  "socrates.life_arc.1":
    "Born in the Athenian deme of Alopece to a stoneworker father and a midwife mother; inherited enough of the family estate to be free of serious financial need despite his later reputation for poverty.",
  "socrates.life_arc.2": "Served in the Peloponnesian War at Potidaea, Delium, and Amphipolis, according to Plato's account; married Xanthippe and had three sons.",
  "socrates.life_arc.3": "Had become a well-known, polarizing figure in Athens for publicly questioning politicians, poets, and craftsmen who claimed expertise.",
  "socrates.life_arc.4": "Refused an order from the ruling Thirty Tyrants to help arrest a fellow Athenian, Leon of Salamis, for execution.",
  "socrates.life_arc.5": "Tried and convicted by the restored Athenian democracy on charges of impiety and corrupting the youth.",
  "socrates.life_arc.6": "Executed by drinking hemlock, as described in Plato's Phaedo.",
  "socrates.legacy":
    "Nearly every major philosophical school active in the centuries after his death — Plato's Academy, Aristotle's Lyceum, the Cynics, the Stoics — traced its origins back to him in some form, and \"elenchus\" remains a working term for structured dialectical questioning today. Because Socrates left no writing of his own, this legacy runs almost entirely through Plato's dialogues, supplemented by Xenophon's more matter-of-fact portrait and Aristophanes's satirical one in The Clouds — a genuine, unresolved source problem rather than a settled biography. His insistence on questioning claimed authority, and his choice to accept death rather than abandon that practice, have made him a recurring reference point for later philosophers far removed from his own century, including Kierkegaard and Nietzsche.",

  "coco-chanel.achievement.1":
    "Founded her fashion house with a millinery boutique in Paris in 1910, expanding it into a couture, jewelry, handbag, and fragrance business that employed 4,000 people by 1935; her 1921 perfume, Chanel No. 5, became one of the best-known fragrances in the world.",
  "coco-chanel.achievement.2":
    "Introduced or popularized design elements that reshaped mainstream women's fashion, including jersey as a couture fabric, the 1926 \"little black dress,\" the tailored 1923 Chanel suit designed for freedom of movement rather than display, and the 1955 quilted 2.55 handbag.",
  "coco-chanel.moment.1":
    "After her mother's death, Chanel entered the Aubazine orphanage at age 11, where she learned to sew — the skill that eventually launched her career; she later worked as a seamstress and a cabaret singer in Moulins, where she acquired the nickname \"Coco.\"",
  "coco-chanel.moment.2":
    "In 1913, with financial backing from her lover Arthur \"Boy\" Capel, Chanel opened a boutique in Deauville selling casual clothing made from jersey and tricot — fabrics until then used mainly for undergarments and workwear. The business succeeded quickly enough that she repaid Capel's investment by 1916.",
  "coco-chanel.interpretation.moment.2":
    "This matches the profile's opportunity_sensing score: recognizing a shift toward practical, comfortable clothing for women, and an available cheap material suited to it, ahead of the mainstream fashion houses of the time.",
  "coco-chanel.turning_point.1":
    "Chanel closed her fashion house at the outbreak of World War II in 1939, putting roughly 4,000 employees out of work, and did not return to design for fifteen years. In 1954, at 70, financed again by Pierre Wertheimer, she reopened it to an initially skeptical American and British press; a March 1954 Vogue feature on her new suit reversed that reception, and orders poured in from the United States, restoring the house's standing.",
  "coco-chanel.complexities.1":
    "During the German occupation of Paris, Chanel resided at the Hôtel Ritz — also German military headquarters — and began a relationship with Baron Hans Günther von Dincklage, a German diplomat with intelligence ties. She separately petitioned German officials to gain sole control of Parfums Chanel by invoking Aryan property law against her Jewish business partners, the Wertheimer family, who had preemptively transferred nominal ownership to a non-Jewish associate. Historian Hal Vaughan's research into declassified French intelligence files found her listed under an agent number and described a wartime mission, later called \"Operation Modellhut,\" to carry a German peace feeler to Winston Churchill — a mission that collapsed when her own intermediary denounced her to British intelligence. What is documented: the Ritz residence, the Dincklage relationship, and the attempt on the Wertheimers' ownership. What remains disputed among historians is how far her active participation in German intelligence work went, versus a wartime relationship of convenience; French Nazi-hunter and historian Serge Klarsfeld has cautioned that \"having a spy number doesn't necessarily mean she was personally involved.\" She was interrogated after Paris's 1944 liberation but never charged, then lived in Switzerland for several years before her 1954 return to Paris.",
  "coco-chanel.life_arc.1":
    "Born in Saumur, France; after her mother's death, entered the Aubazine orphanage at 11, where she learned to sew.",
  "coco-chanel.life_arc.2": "Opened a millinery boutique in Paris in 1910, followed by a Deauville shop in 1913 financed by her then-lover, Arthur \"Boy\" Capel.",
  "coco-chanel.life_arc.3": "Introduced Chanel No. 5.",
  "coco-chanel.life_arc.4": "Closed her fashion house at the outbreak of World War II.",
  "coco-chanel.life_arc.5": "Returned to fashion at 70, financed again by Pierre Wertheimer.",
  "coco-chanel.life_arc.6": "Died in Paris.",
  "coco-chanel.legacy":
    "Chanel's move away from corsetry toward comfortable, practical clothing reshaped what mainstream Western fashion considered elegant for women, and elements she introduced or popularized — jersey as a couture fabric, the tailored suit, costume jewelry, the quilted shoulder bag — remain in wide use in fashion design today. Time magazine later named her the only fashion designer among the 100 most influential people of the 20th century, and the company she founded remains one of the world's most valuable luxury houses. Her own wartime conduct, documented above, complicates any account of her legacy that treats it as purely a design story.",

  "genghis-khan.achievement.1":
    "Unified the fragmented Mongol tribes and was proclaimed Genghis Khan at a 1206 kurultai, founding the Mongol Empire; restructured Mongol society into a military-administrative system organized by units of ten, a hundred, and a thousand rather than tribal loyalty — a change credited with keeping the empire from fragmenting along old tribal lines even after his death.",
  "genghis-khan.achievement.2":
    "His conquests, extending across Central Asia and into northern China, created the largest contiguous land empire in history and enabled an unprecedented volume of Eurasian trade, travel, and cultural exchange along routes including the Silk Road, alongside an explicit policy of religious tolerance across the Christian, Muslim, Buddhist, and shamanist faiths represented among his followers.",
  "genghis-khan.moment.1":
    "After his father Yesügei, a tribal chief, was poisoned by rival Tatars when Temüjin was about eight, his own clan renounced the family in favor of a rival branch, forcing his mother and siblings to survive by foraging roots and nuts, hunting small game, and fishing.",
  "genghis-khan.moment.2":
    "As a boy, Temüjin swore the anda (blood-brother) pact with a companion, Jamukha; the two later became rivals for dominance of the steppe. After Temüjin's 1204 victory over the Naimans, whom Jamukha had joined, Jamukha was betrayed by his own remaining followers and delivered to Temüjin, who had him executed — accounts differ on the manner of his death.",
  "genghis-khan.turning_point.1":
    "At a 1206 kurultai (assembly), Temüjin was proclaimed Genghis Khan, formally unifying the Mongol tribes under a single ruler and a new military-administrative structure that replaced the tribal loyalties his own family had once been abandoned under. It marked the shift from a fragmented steppe of competing tribes and lineages to a centralized state capable of the campaigns that followed.",
  "genghis-khan.interpretation.turning_point.1":
    "This matches the profile's high proactive_agency score: the unification was built, alliance by alliance, on his own initiative after his own clan had abandoned his family — not an inherited or assigned position.",
  "genghis-khan.turning_point.2":
    "In 1219, after the Khwarazmian governor of the city of Otrar executed a Mongol trade caravan and Shah Muhammad II executed or mutilated the envoys Genghis sent to demand redress, Genghis launched an invasion that toppled the Khwarazmian state and devastated the regions of Transoxiana and Khorasan, including the cities of Otrar, Bukhara, Samarkand, and Urgench. It shifted his campaigns from a posture oriented around trade relationships with neighboring states to one applying, at unprecedented scale, a doctrine that resistance meant destruction and submission meant comparative mercy.",
  "genghis-khan.life_arc.1":
    "Born Temüjin; his father Yesügei, a tribal chief, was poisoned by rival Tatars when he was about eight, after which his own clan abandoned the family.",
  "genghis-khan.life_arc.2": "Married Börte and rebuilt alliances among the fragmented Mongol and Turkic tribes despite his clan's earlier abandonment of his family.",
  "genghis-khan.life_arc.3": "Defeated the Naimans and the remaining coalition of his former blood-brother Jamukha, ending his last major rival on the steppe.",
  "genghis-khan.life_arc.4": "Proclaimed Genghis Khan at a kurultai formalizing the unification of the Mongol tribes.",
  "genghis-khan.life_arc.5": "Invaded and destroyed the Khwarazmian Empire after the killing of Mongol envoys at Otrar.",
  "genghis-khan.life_arc.6": "Died while campaigning against Western Xia; his burial site remains unknown.",
  "genghis-khan.complexities.1":
    "From at least the 1219 Khwarazmian campaign on, Genghis Khan's forces applied a consistent and explicit policy: cities and populations that resisted were subject to destruction as a deterrent to further resistance, while those that surrendered were typically spared comparable violence. Applied against Khwarazmian cities including Otrar, Bukhara, Samarkand, and Urgench, this produced enormous, historically significant loss of life and destruction. Reliable casualty figures are difficult to establish: the fullest surviving accounts come from Persian chroniclers writing under later, often hostile political circumstances, and modern scholarship treats their specific numbers as unreliable even while treating the broader pattern of deliberate large-scale destruction as well established — no specific casualty figure is asserted here for that reason. His own family's Secret History of the Mongols additionally records him killing his half-brother Behter to secure succession, an episode later official chronicles omitted. His reputation remains sharply divided by tradition: revered in Mongolia as the state's founding figure, remembered in some Russian and Arab historical memory principally as a destructive conqueror, with recent Western scholarship attempting a more documentary-based reassessment between those poles.",
  "genghis-khan.legacy":
    "His conquests created the largest contiguous land empire in history, and the relative security across it — often called the Pax Mongolica — enabled an unprecedented volume of trade, travel, and cultural and technological exchange along Eurasian routes including the Silk Road, even though that security was established through large-scale violence. His administrative reforms, especially replacing tribal loyalty with a unified military-administrative structure, kept the empire from fragmenting along old tribal lines even after his death. His reputation remains sharply divided by region and tradition to this day, as described above.",

  "malala-yousafzai.achievement.1":
    "Co-founded the Malala Fund with Shiza Shahid in 2013, a nonprofit focused on funding and advocating for girls' education, which has continued operating and expanding years after the initial period of attention that followed the attack on her.",
  "malala-yousafzai.achievement.2":
    "Co-authored the international bestseller I Am Malala (2013) and, in 2014, became the youngest Nobel Peace Prize laureate, sharing the award with Indian children's rights activist Kailash Satyarthi; graduated from Lady Margaret Hall, Oxford, in 2020 with a degree in Philosophy, Politics and Economics, continuing her advocacy work from within that platform.",
  "malala-yousafzai.moment.1":
    "Starting in January 2009, at age 11, Yousafzai wrote an anonymous blog for BBC Urdu under the pseudonym \"Gul Makai,\" describing daily life under Taliban rule in Pakistan's Swat Valley — a self-initiated act, encouraged but not directed by her education-activist father, undertaken well before any resulting attention.",
  "malala-yousafzai.interpretation.moment.1":
    "This matches the profile's dual-edged proactive_agency score: a specific, self-initiated act taken at real risk, which this profile's Turning Point shows led directly and severely to that risk materializing.",
  "malala-yousafzai.moment.2":
    "By September 2008, still under her own name and in public, 11-year-old Yousafzai was already delivering speeches on education rights, including asking publicly, \"How dare the Taliban take away my basic right to education?\" — a more exposed, named act than the anonymous blog that followed months later.",
  "malala-yousafzai.turning_point.1":
    "On October 9, 2012, while returning home on a school bus after an exam, Yousafzai was shot by a Taliban gunman in the Swat Valley; the bullet entered near her left eye and lodged in her shoulder, and two classmates were also wounded. She was airlifted to a military hospital in Peshawar for emergency surgery, then transferred to Queen Elizabeth Hospital in Birmingham, England, for further treatment including facial nerve reconstruction and a cochlear implant. The attack shifted her from a regional activist and blogger in Swat Valley to a global figure whose recovery and subsequent life have largely taken place in England; on July 12, 2013 — her 16th birthday — she addressed the United Nations in a speech that came to be known as \"Malala Day.\"",
  "malala-yousafzai.life_arc.1": "Born in Mingora, Swat Valley, Pakistan; her father, Ziauddin, ran a school and was himself an education activist.",
  "malala-yousafzai.life_arc.2": "Wrote an anonymous blog for BBC Urdu under the pseudonym \"Gul Makai,\" describing life under Taliban rule in Swat.",
  "malala-yousafzai.life_arc.3": "Shot by a Taliban gunman on her school bus on October 9; evacuated for treatment, eventually to Birmingham, England.",
  "malala-yousafzai.life_arc.4": "Co-founded the Malala Fund; addressed the United Nations on July 12.",
  "malala-yousafzai.life_arc.5": "Became the youngest Nobel Peace Prize laureate, sharing the award with Kailash Satyarthi.",
  "malala-yousafzai.life_arc.6": "Graduated from Lady Margaret Hall, Oxford, with a degree in Philosophy, Politics and Economics.",
  "malala-yousafzai.legacy":
    "The Malala Fund, and the international profile the 2012 attack and its aftermath gave her, have made her one of the most recognized advocates for girls' education worldwide, credited with helping keep the issue on international policy agendas well beyond the initial period of global attention. Her reception within Pakistan has been more divided: alongside wide admiration, she has also faced criticism from conservative and nationalist voices who frame her advocacy, Oxford education, and life in England as evidence of foreign alignment — Pakistan's All Private Schools Federation banned her autobiography in 2015. Her advocacy has since extended to Afghan girls' education and Rohingya refugees.",

  "bruce-lee.achievement.1":
    "Founded Jeet Kune Do, a hybrid martial-arts philosophy combining elements of Wing Chun, boxing, and fencing with Zen Buddhist and Taoist principles, built around practicality, directness, and adaptability rather than the fixed forms of traditional styles.",
  "bruce-lee.achievement.2":
    "Starred in and helped shape The Big Boss (1971), Fist of Fury (1972), Way of the Dragon (1972), and Enter the Dragon (1973), establishing himself as the first global Chinese film star and shifting martial-arts film choreography toward realistic, direct movement rather than fantastical staging.",
  "bruce-lee.moment.1":
    "Raised in Hong Kong from infancy, Lee took part in street fighting as a teenager and won the Hong Kong Crown Colony Cha-Cha Championship in 1958, before training in Wing Chun under Ip Man from 1953 to 1957 — a period marked, per the record, by tension over the traditional rule against teaching students of mixed or non-Chinese heritage.",
  "bruce-lee.moment.2":
    "In 1964, Lee took part in a private match with fellow martial artist Wong Jack-Man; the two sides describe it inconsistently — Lee's supporters say he won decisively in about three minutes, while Wong described a 20-25 minute inconclusive bout ending only when Lee tired. Whatever its precise course, the experience is reported to have prompted Lee to move away from rigid classical technique.",
  "bruce-lee.interpretation.moment.2":
    "This matches the profile's opportunity_sensing score: treating an unsatisfying real fight as evidence against classical form generally, ahead of most contemporaries, rather than as a one-off result.",
  "bruce-lee.turning_point.1":
    "Lee was reportedly passed over for the lead role in the Kung Fu television series — a concept he had pitched himself in 1971 — reportedly over ethnicity and accent concerns in Hollywood casting. On producer Fred Weintraub's advice to build his own showcase film instead, he returned to Hong Kong and starred in The Big Boss, Fist of Fury, and Way of the Dragon; that run of box-office success gave him the leverage for Enter the Dragon, the first US-Hong Kong co-production, which shifted his career from seeking roles inside the Hollywood studio system to building an international audience through his own films.",
  "bruce-lee.life_arc.1": "Born in San Francisco; raised in Hong Kong from infancy.",
  "bruce-lee.life_arc.2": "Trained in Wing Chun under Ip Man; won the Hong Kong Crown Colony Cha-Cha Championship in 1958.",
  "bruce-lee.life_arc.3": "Moved to Seattle and began teaching martial arts.",
  "bruce-lee.life_arc.4": "Played Kato in the television series The Green Hornet, his introduction to American audiences.",
  "bruce-lee.life_arc.5": "Returned to Hong Kong and starred in The Big Boss, Fist of Fury, and Way of the Dragon, then Enter the Dragon, the first US-Hong Kong co-production.",
  "bruce-lee.life_arc.6": "Died in Kowloon, Hong Kong, at age 32; officially attributed to cerebral edema, though the wider circumstances remain debated.",
  "bruce-lee.legacy":
    "Lee's emphasis on practicality, adaptability, and cross-style synthesis anticipated mixed martial arts by decades and continues to influence how combat sports and martial-arts training are approached. His fight choreography reshaped action cinema toward grounded, realistic movement, and his international stardom — as the first globally successful Chinese film star — opened space in Western popular culture for Asian leading roles that Hollywood had denied him directly during his own career.",

  "toni-morrison.achievement.1":
    "Published a body of novels spanning five decades that centered Black American life, memory, and historical trauma — including The Bluest Eye (1970), Song of Solomon (1977), Beloved (1987, drawing on the true story of Margaret Garner), Jazz (1992), and Paradise (1997) — establishing a body of work rather than any single title as her central claim on American letters.",
  "toni-morrison.achievement.2":
    "As Random House's first Black female senior fiction editor (1967–1983), acquired and championed writers the mainstream industry wasn't prioritizing, including Toni Cade Bambara, Angela Davis, and Gayl Jones, and edited the anthology Contemporary African Literature (1972) and The Black Book (1974), a visual history of Black American life from slavery through the 1920s.",
  "toni-morrison.moment.1":
    "Morrison wrote her debut novel, The Bluest Eye, while working full-time and raising two children alone, rising at 4am to write before the day's other demands began — the novel was published in 1970, when she was 39.",
  "toni-morrison.moment.2":
    "At Random House, beyond her scored acquisitions, Morrison brought Muhammad Ali's 1975 autobiography The Greatest: My Own Story to publication and posthumously championed the poet Henry Dumas, who had been shot dead by New York City transit police in 1968 — using her editorial position to bring attention to work the industry had otherwise let go unnoticed.",
  "toni-morrison.interpretation.moment.2":
    "This matches the profile's proactive_agency score: acquisitions and advocacy that went beyond her formally assigned editorial duties, self-directed rather than requested.",
  "toni-morrison.moment.3":
    "When her son Slade died of pancreatic cancer in 2010, Morrison halted work on the novel Home, then resumed it, reasoning: \"He would be really put out if he thought that he had caused me to stop.\"",
  "toni-morrison.life_arc.1": "Born Chloe Ardelia Wofford in Lorain, Ohio.",
  "toni-morrison.life_arc.2": "Graduated Howard University, then earned a master's degree from Cornell.",
  "toni-morrison.life_arc.3": "Worked at Random House, becoming its first Black female senior fiction editor.",
  "toni-morrison.life_arc.4": "Published her debut novel, The Bluest Eye, at 39 while raising two children alone.",
  "toni-morrison.life_arc.5": "Published Beloved (Pulitzer Prize, 1988) and won the 1993 Nobel Prize in Literature, the first Black woman of any nationality to do so.",
  "toni-morrison.life_arc.6": "Died in New York, age 88.",
  "toni-morrison.legacy":
    "Morrison centered Black women's inner lives and America's history of slavery and its aftermath on their own terms, without organizing the work around a white readership's expectations. Her reception was not uniformly smooth even at its height: Beloved's exclusion from the 1987 National Book Award prompted a public protest from 48 Black writers and critics, including Maya Angelou, before the novel won the Pulitzer Prize the following year; in 2006 the New York Times named it the best American work of fiction of the previous 25 years. Oprah Winfrey's book club, which selected four of her novels beginning in 1996, introduced her work to a far larger readership than her literary prizes alone had reached.",

  "zheng-he.achievement.1":
    "Commanded seven major maritime expeditions (1405–1433) for the Ming court; the first fleet alone, which departed in July 1405, comprised 317 ships and nearly 28,000 crew, reaching Southeast Asia, South Asia, the Arabian Peninsula, and the East African coast — among the largest state naval operations of the pre-modern world.",
  "zheng-he.achievement.2":
    "Established and maintained extensive diplomatic and tribute relationships across the Indian Ocean world on the Ming court's behalf, exchanging Chinese goods such as silk, porcelain, gold, and silver for regional goods, and suppressed piracy disrupting regional shipping, including defeating the pirate captain Chen Zuyi near Palembang and returning him to China for execution.",
  "zheng-he.moment.1":
    "During one of the voyages, local officials on Ceylon threatened the fleet, and Zheng He's forces waged a land engagement against the Kingdom of Kotte in response — a reminder that the expeditions carried real military capacity behind their trade and diplomacy.",
  "zheng-he.moment.2":
    "On one voyage the fleet brought back a giraffe from Malindi, on the East African coast, which was presented at the Ming court as a qilin — a mythical auspicious creature — and read there as confirming the dynasty's legitimacy, illustrating the symbolic as well as commercial purpose the voyages served for the court.",
  "zheng-he.turning_point.1":
    "Captured as a boy, around 1381, during the Ming conquest of Yunnan, he was castrated between the ages of 10 and 14 and placed in the household of the Prince of Yan, later the Yongle Emperor — an externally imposed, violent shift in circumstance, not a path he is documented to have chosen, that set the entire course of his subsequent life as a court eunuch-official. He aided the prince's household militarily, notably defending Beiping's Zhenglunba reservoir during the 1399 rebellion, and after the prince's 1402 victory made him emperor, was granted the surname Zheng in 1404 in recognition of that service — the household he had been placed in as a captive became, two decades later, the seat of the authority that made him admiral.",
  "zheng-he.life_arc.1": "Born Ma He in Kunming, Yunnan.",
  "zheng-he.life_arc.2": "Captured during the Ming conquest of Yunnan and castrated; placed in the household of the Prince of Yan.",
  "zheng-he.life_arc.3": "The prince's Jingnan campaign victory made him the Yongle Emperor; Zheng He was granted his surname in 1404 in recognition of his service.",
  "zheng-he.life_arc.4": "Departed on the first of seven treasure-fleet voyages.",
  "zheng-he.life_arc.5": "The voyages were suspended after the Yongle Emperor's death; one further expedition later took place under the Xuande Emperor before the program ended for good.",
  "zheng-he.life_arc.6": "Died during or shortly after the seventh voyage, probably near Calicut; formally buried at sea.",
  "zheng-he.legacy":
    "After his death, official Ming annals recorded the voyages incompletely and, per later scholarship, erroneously, and later official publications omitted them entirely as the dynasty turned toward the more inward-looking policy the founder's edicts had originally prescribed; the voyages remained largely forgotten until historian Liang Qichao's 1904 biography revived interest in them. Today, July 11 — the anniversary of his first voyage's departure — is observed in China as National Maritime Day, and Zheng He is commemorated across Southeast Asia through temples and monuments built by communities along the routes his fleets once traveled.",

  "rumi.achievement.1":
    "Wrote the Masnavi, a six-volume spiritual epic of roughly 27,000 lines often called \"a Qur'an in Persian,\" alongside the Diwan-e Shams-e Tabrizi, roughly 35,000 Persian couplets — a body of work that ranks him today among the most widely read poets in the world.",
  "rumi.achievement.2":
    "After his death, his followers founded the Mevlevi Sufi order, which developed the whirling-dervish sema ceremony — a devotional practice combining music, movement, and recitation that remains central to Mevlevi Sufism and is still performed today.",
  "rumi.moment.1":
    "As Mongol invasions swept Central Asia in the 1210s and 1220s, Rumi's father led the family west through Iran, Baghdad, and Damascus, eventually settling in Konya, Anatolia, around 1228. There Rumi inherited his father's position as an Islamic jurist and teacher, issuing legal opinions and preaching in mosques — a conventional scholarly role, well before he became known as a mystic poet.",
  "rumi.turning_point.1":
    "On November 15, 1244, Rumi met the wandering mystic Shams-e Tabrizi in Konya, an encounter that transformed him from a respected jurist and teacher into a devotee of intense mystical practice. Their relationship was close but brief: on December 5, 1248, Shams disappeared, with several competing explanations circulating, including murder, none established with certainty. Rumi's grief and search for Shams afterward became the wellspring of the lyric poetry later collected as the Diwan-e Shams-e Tabrizi.",
  "rumi.interpretation.turning_point.1":
    "This matches the profile's belief_updating score, the strongest such case in this cohort: a documented, repeatedly attested reorientation from formal legal and scholarly religious authority toward direct mystical experience, reflected extensively in his own later poetry rather than inferred from silence.",
  "rumi.life_arc.1": "Born in Wakhsh, in Persian-speaking Greater Khorasan (present-day Tajikistan).",
  "rumi.life_arc.2": "As Mongol invasions swept Central Asia, his father led the family west through Iran, Baghdad, and Damascus.",
  "rumi.life_arc.3": "The family settled in Konya, Anatolia, where Rumi inherited his father's position as a jurist and teacher.",
  "rumi.life_arc.4": "Met the mystic Shams-e Tabrizi, an encounter that transformed him from scholar to mystic poet.",
  "rumi.life_arc.5": "Died in Konya.",
  "rumi.legacy":
    "The Mevlevi order his followers founded, and its sema ceremony, carried his teaching forward as a living devotional practice rather than only a text. His global popularity today, however, rests heavily on English versions — most famously Coleman Barks's — that are loose interpretive paraphrases rather than literal translations, distinct from the more rigorous scholarly translations by Arberry, Nicholson, and Lewis; much of what circulates in Western popular culture as a \"Rumi quote\" should be read with that distinction in mind rather than taken as his own exact words.",
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
  "leonardo-da-vinci.life_arc.1": "피렌체 인근 빈치에서 태어났다.",
  "leonardo-da-vinci.life_arc.2": "피렌체에서 화가 안드레아 델 베로키오 밑에서 도제 생활을 했다.",
  "leonardo-da-vinci.life_arc.3": "루도비코 스포르차 밑에서 일하기 위해 밀라노로 이주했으며, 해부학·공학·비행 연구를 담은 노트를 남겼다.",
  "leonardo-da-vinci.life_arc.4": "모나리자를 그리기 시작했으며, 이후 십여 년간 계속 손질했다.",
  "leonardo-da-vinci.life_arc.5": "프랑스 국왕 프랑수아 1세를 섬기게 되었다.",
  "leonardo-da-vinci.life_arc.6": "앙부아즈 인근 클로 뤼세에서 사망했다.",

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
  "marie-curie.life_arc.1": "태어났다.",
  "marie-curie.life_arc.2": "피에르 퀴리와 함께 폴로늄과 라듐 원소를 발견했다.",
  "marie-curie.life_arc.3": "노벨 물리학상을 수상했다 — 서로 다른 두 과학 분야에서 노벨상을 받은 첫 사례였다.",
  "marie-curie.life_arc.4": "피에르가 사고로 사망한 뒤 그의 소르본 대학 교수직을 이어받아, 최초의 여성 교수가 되었다.",
  "marie-curie.life_arc.5": "두 번째 노벨상인 화학상을 수상했다.",
  "marie-curie.life_arc.6": "사망했다.",

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
  "ada-lovelace.life_arc.1": "태어났다.",
  "ada-lovelace.life_arc.2": "어머니의 권유로 십 대 시절부터 수학과 과학을 공부했다.",
  "ada-lovelace.life_arc.3": "십 대 시절 찰스 배비지를 만나 그의 시제품 차분기관을 보았다.",
  "ada-lovelace.life_arc.4": "배비지의 해석기관에 관한 '주석'을 발표했으며, 베르누이 수를 계산하는 알고리즘을 포함했다.",
  "ada-lovelace.life_arc.5": "같은 글에서 이 기계가 숫자를 넘어 음악 작곡 등에도 쓰일 수 있다고 제안했다.",
  "ada-lovelace.life_arc.6": "사망했다.",

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
  "yi-sun-sin.life_arc.1": "태어났다.",
  "yi-sun-sin.life_arc.2": "일본의 침략에 앞서 거북선 건조와 해안 방어 태세 강화를 추진했다.",
  "yi-sun-sin.life_arc.3": "임진왜란 내내 조선 수군을 지휘하며 단 한 번도 해전에서 패하지 않았다.",
  "yi-sun-sin.life_arc.4": "함정이라 판단한 조정의 명령을 거부한 뒤 파직·투옥되어 고문을 당했다.",
  "yi-sun-sin.life_arc.5": "얼마 남지 않은 함대로 복직해, 압도적인 열세 속에서 명량 해전을 승리로 이끌었다.",
  "yi-sun-sin.life_arc.6": "전쟁 막바지 전투에서 전사했다.",

  /* ------------------------------------------------------------ F. Kahlo */
  "frida-kahlo.achievement.1":
    "멕시코 민속 예술의 전통과 고통·정체성·신체를 탐구하는 상징적이고 거침없는 자화상을 결합한 독자적인 화풍을 만들어냈다 — 국제적으로 폭넓게 인정받은 것은 사후 한참이 지난 뒤였다.",
  "frida-kahlo.moment.1":
    "1925년 거의 목숨을 잃을 뻔한 버스 사고로 몇 달간 몸져누운 뒤, 어머니가 침대 위에 마련해준 특수 거울과 이젤을 이용해 누운 채로 그림을 그리기 시작했다.",
  "frida-kahlo.moment.2":
    "전기적 기록에 따르면, 무명 화가였던 시절 이미 유명했던 벽화가 디에고 리베라를 직접 찾아가 자신의 그림에 대한 솔직한 평가를 청했다고 한다.",
  "frida-kahlo.turning_point.1":
    "1925년의 사고와 이후 평생에 걸쳐 이어진 수많은 수술과 긴 요양 기간은, 원래 의학을 꿈꾸던 그를 그림을 본업으로 삼는 방향으로 이끌었다.",
  "frida-kahlo.legacy":
    "칼로의 국제적 명성은 대부분 사후에 형성되었다. 그의 작품이 멕시코를 넘어 폭넓은 대중에게 알려진 것은 1982년 런던 화이트채플 갤러리에서 열린 회고전 — 멕시코 밖에서 열린 첫 전시 — 과, 그의 삶과 작품을 영어권 독자에게 널리 소개하고 훗날 살마 헤이엑 주연의 2002년 영화 《프리다》로 각색된 헤이든 헤레라의 1983년 전기 『프리다』가 나온 뒤였다. 오늘날 그는 멕시코 민족 정체성의 상징이자, 대부분 그의 사후에 형성된 여성주의 미술 운동의 상징으로 널리 읽히는데, 이는 고통·정체성·몸을 다룬 그 자신의 회화가 내세운 주제와는 구별되는, 나중에 덧붙여진 해석이다. 2025년 11월, 그의 1940년작 《꿈(침대)》(El Sueño (La Cama))은 경매에서 5470만 달러에 낙찰되어 여성 작가의 작품으로는 역대 최고가를 기록했다.",
  "frida-kahlo.interpretation.moment.1":
    "프로필의 높은 자원 활용 성향(resourcefulness) 점수를 뚜렷이 보여주는 사례다 — 제약이 사라지길 기다리는 대신, 창작을 가능하게 할 도구를 즉석에서 만들어내며 심각한 신체적 제약 속에서도 작업을 이어간 것이다.",
  "frida-kahlo.life_arc.1": "태어났다.",
  "frida-kahlo.life_arc.2": "치명적일 뻔한 버스 사고로 의학 공부의 꿈을 접었으며, 회복 기간 중 그림을 그리기 시작했다.",
  "frida-kahlo.life_arc.3": "자청해서 벽화가 디에고 리베라를 찾아가 자신의 그림에 대한 평가를 구했다.",
  "frida-kahlo.life_arc.4": "멕시코 민속 미술과 상징적인 자화상을 결합한 독자적인 화풍을 발전시켰다.",
  "frida-kahlo.life_arc.5": "사망했다.",

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
  "nelson-mandela.life_arc.1": "태어났다.",
  "nelson-mandela.life_arc.2": "체포되어 27년에 걸친 수감 생활을 시작했으며, 대부분을 로벤 섬에서 보냈다.",
  "nelson-mandela.life_arc.3": "비공식 재소자 교육을 조직했으며, 다른 수감자들은 이를 '대학'이라 불렀다.",
  "nelson-mandela.life_arc.4": "석방된 뒤 무장 투쟁을 이어가는 대신 협상을 선택했다.",
  "nelson-mandela.life_arc.5": "남아프리카공화국 최초의 흑인 대통령이 되었으며, 진실화해위원회를 설립했다.",
  "nelson-mandela.life_arc.6": "사망했다.",

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
  "mustafa-kemal-ataturk.achievement.2":
    "제1차 세계대전 이후 터키 민족운동을 이끌었고 1923년 터키 공화국을 건국했으며, 이후 몇 년에 걸쳐 광범위한 법적·세속화 개혁을 단행했다.",
  "mustafa-kemal-ataturk.achievement.3":
    "1926년부터 1934년까지 그는 광범위한 법적·사회적 근대화 프로그램을 추진했다. 스위스 민법을 본떠 만든 새 민법이 이슬람 샤리아 기반의 가족법을 대체해 일부다처제를 폐지하고 남녀 동등한 상속권을 확립했으며, 이탈리아 형법을 본뜬 새 형법도 함께 도입되었다. 1928년에는 오스만 페르시아·아랍 문자를 대체할 새 라틴 문자 도입을 두고 자신이 설치한 알파벳 개혁 위원회가 제안한 신중한 수년 단위 이행 계획을 직접 뒤엎었고, 이후 몇 달간 전국을 직접 순회하며 '수석 교사'라는 자칭 직함 아래 마을 광장과 학교에서 새 문자를 몸소 가르쳤다. 여성은 1930년 지방선거에서, 1934년에는 전국 선거에서 각각 투표권과 피선거권을 얻었는데, 이는 같은 시기 여러 서유럽 민주주의 국가보다 앞선 것이었다.",
  "mustafa-kemal-ataturk.moment.1":
    "1915년 추누크 바이르에서, 포탄 파편이 회중시계 바로 위 가슴을 강타해 시계는 산산조각 났지만 그는 큰 부상을 면했다. 곁에 있던 부관이 그가 다친 줄 알고 놀라 소리치자, 그는 손으로 부관의 입을 막고 이렇게만 말했다. \"아무 일도 아니다.\"",
  "mustafa-kemal-ataturk.moment.2":
    "1919년, 아나톨리아 잔여 병력을 무장 해제하고 해산시키라는 오스만 정부의 공식 임무를 오히려 민족 저항을 조직하는 발판으로 삼았다 — 임무의 본래 목적과는 정반대의 행동이었다.",
  "mustafa-kemal-ataturk.turning_point.1":
    "공화국을 세운 뒤, 1925년 유일하게 조직된 야당을 해산시켰다. 같은 해 설치된 독립법정은 셰이흐 사이드 봉기의 지도자를 포함해 수십 명에게 판결 며칠 만에 사형을 집행했다.",
  "mustafa-kemal-ataturk.turning_point.2":
    "1915년 4월 25일 갈리폴리에서 오스만 제19사단장이었던 그는, 상륙한 안작(ANZAC) 부대가 향하던 전략적 고지를 직접 파악하고, 자신의 연대 전체가 도착하기도 전에 현장에 있던 병력 — 심하게 열세였던 제57연대 — 에게 즉각 교전하라고 명령했다: \"나는 너희에게 공격하라 명령하지 않는다, 죽으라 명령한다.\" 그 전투에서 연대 대부분이 전사했지만, 그 능선은 지켜졌다.",
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
  "julius-caesar.turning_point.2":
    "기원전 49년, 그는 자신의 군단을 이끌고 루비콘강을 건너 이탈리아 본토로 진입했다 — 로마 장군이 무장한 채 국경을 넘는 것은 불법이었고, 한번 건너면 되돌릴 수 없는 행위였다. 그는 이때 \"주사위는 던져졌다\"고 말했다고 전해지며, 이는 공화정의 기존 정치 질서를 끝낸 내전의 시작이 되었다.",
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

  /* -------------------------------------------------- Batch 2: Darwin */
  "charles-darwin.achievement.1":
    "다윈은 사육 품종, 종의 지리적 분포, 화석 기록 등 여러 독립적인 증거 계열을 축적하며 약 20년에 걸쳐 근거를 모은 끝에 1859년 『종의 기원』을 출간했다 — 하나의 논증이 아니라 여러 갈래의 증거가 쌓여 만들어진 논리였다. 이후에도 그는 세인트 조지 마이바트 등 구체적인 비판자들의 반론에 직접 대응하며 이 책을 여섯 판에 걸쳐 계속 수정했다.",
  "charles-darwin.achievement.2":
    "1846년부터 1854년까지 8년에 걸쳐, 그는 당시 알려진 모든 따개비 종을 다룬 여러 권 분량의 방대한 분류학 저작을 완성했다 — 화려할 것 없는 좁은 주제였지만, 이후 『종의 기원』이 된 이론적 작업으로 돌아가기 전에 끝까지 철저하게 완수한 작업이었다.",
  "charles-darwin.achievement.3":
    "그의 출판된 연구는 지질학(산호초 형성 이론), 동물학(따개비 분류 연구), 식물학(난초 수분과 덩굴 식물 연구), 심리학(『인간과 동물의 감정 표현』)에 이르기까지 폭넓게 걸쳐 있었다 — 어느 하나도 스쳐 지나가는 관심이 아니라 완결된 저작으로 남았다.",
  "charles-darwin.moment.1":
    "1860년 그의 이론을 둘러싸고 널리 알려진 옥스퍼드 논쟁이 벌어졌을 때, 다윈은 그 자리에 참석하지도 직접 나서서 이론을 변호하지도 않았다 — 대신 토머스 헉슬리가 공개적으로 그를 대변했다.",
  "charles-darwin.moment.2":
    "그는 대학 실험실이 아니라 다운 하우스의 자택에서, 씨앗을 몇 주간 바닷물에 담가 두어 어떤 것이 발아하는지 확인하며 종자 확산에 관한 자신의 가설을 검증했고, 평범한 정원 도구만으로 난초의 통제된 수분 실험을 진행했다.",
  "charles-darwin.moment.3":
    "박물학자 알프레드 러셀 월리스가 1858년 독자적으로 매우 유사한 이론에 도달하자, 다윈의 동료들은 그가 단독 우선권을 주장하도록 두는 대신 린네 학회에서 두 사람 모두를 인정하는 공동 발표를 마련했다.",
  "charles-darwin.turning_point.1":
    "다윈은 자연선택 이론을 약 20년 동안 개인적으로만 간직했는데, 스스로 밝힌 바에 따르면 그 반응에 대한 불안 때문이었다 — 한 편지에서는 이론을 발표하는 일을 '살인을 자백하는 것 같다'고 표현하기도 했다. 그는 월리스가 동등한 이론을 설명한 편지를 보내와 더 이상 미룰 수 없게 된 1858년에야 비로소 발표에 나섰다.",
  "charles-darwin.interpretation.moment.1":
    "그의 서신과 전기 작가들이 기록한 더 넓은 패턴 — 이론에 대한 반박을 직접 맞서기보다 동료를 통해 처리하는 방식 — 과 나란히 놓고 보면, 이는 한 번의 예외적인 회피라기보다 그가 일반적으로 취한 대응 방식 중 하나로 읽힌다.",
  /* Profile V2 pilot (2026-08), control case: see the EN block's comment for
     what changed and why -- only Life Arc and Legacy added. */
  "charles-darwin.life_arc.1": "잉글랜드 슈루즈베리에서 태어났다.",
  "charles-darwin.life_arc.2": "비글호의 박물학자로 항해하며, 훗날 이론의 토대가 된 관찰 자료를 수집했다.",
  "charles-darwin.life_arc.3": "사촌 엠마 웨지우드와 결혼했으며, 가족은 이후 켄트주의 다운 하우스에 정착했다.",
  "charles-darwin.life_arc.4":
    "앨프리드 러셀 월리스가 동일한 이론을 설명한 편지를 보내오면서 린네학회에서의 공동 발표가 성사되었다.",
  "charles-darwin.life_arc.5": "「종의 기원」을 출간했다.",
  "charles-darwin.life_arc.6": "다운 하우스에서 사망했으며, 웨스트민스터 사원에 안장되었다.",
  "charles-darwin.legacy":
    "다윈의 자연선택에 의한 진화론은 현대 생물학을 하나로 묶는 틀이 되었으며, 「종의 기원」은 과학사에서 가장 중대한 저작 가운데 하나로 남아 있다. 그의 방대한 노트와 서신은 사후 한 세기가 넘도록 보존되고 연구되며, 오늘날까지도 과학사가들이 그의 사상이 발전한 과정을 이해하는 데 계속 활용되고 있다.",
  "charles-darwin.interpretation.turning_point.1":
    "프로필의 낮은 위험 감수(risk_tolerance) 점수는 그 20년의 유예를 설명하는 하나의 타당한 해석이다 — 직업적 신중함이나 순전한 철저함으로도 그 지연의 일부는 설명될 수 있겠지만, 다윈 스스로 그 결정을 묘사한 방식은 성향적 해석을 완전히 배제하기 어렵게 만든다.",

  /* --------------------------------------------- Batch 2: Douglass */
  "frederick-douglass.achievement.1":
    "더글러스는 노예로 지내던 어린 시절, 이웃의 가난한 백인 아이들에게 빵을 주고 글 읽기를 배우거나 우연히 손에 넣은 헌 신문을 보며 독학으로 글을 익혔다 — 노예에게 글을 가르치는 것 자체가 불법이던 시절, 이를 정면으로 어긴 행동이었다. 이후에는 조선소의 목재에 새겨진 표시나 한 소년이 쓰던 낡은 습자책을 베껴 쓰며 글쓰기를 연습했다.",
  "frederick-douglass.achievement.2":
    "1845년 발표한 자서전 『미국인 노예, 프레더릭 더글러스의 삶에 관한 이야기』는 곧바로 베스트셀러가 되었고, 그는 이후 대서양 양쪽에서 가장 인기 있는 대중 연설가 중 한 명이 되었다 — 한 번의 유명한 연설이 아니라 수십 년에 걸쳐 이어진 화술의 경력이었다.",
  "frederick-douglass.achievement.3":
    "그는 노예제 폐지 신문 『노스 스타』를 창간해 편집을 맡았고, 이후 워싱턴 D.C. 증서 등기관과 아이티 주재 공사라는 두 개의 연방 공직을 잇달아 역임했다 — 서로 성격이 전혀 다른 역할들에 걸쳐 지속된 조직적 리더십이었다.",
  "frederick-douglass.moment.1":
    "더글러스는 흑인 연방군 병사들의 동등한 급여와 처우를 요구하며 링컨 대통령을 두 차례 직접 만났다 — 그 전에 이미 자신의 아들들을 포함해 연방군에 흑인 병사를 직접 모집한 뒤였다.",
  "frederick-douglass.moment.2":
    "1838년 노예 신분에서 벗어난 그의 탈출은 충동적인 도주가 아니라 치밀하게 준비된 것이었다 — 그는 미리 빌린 선원 신분증명서를 확보하고 구체적인 기차와 배편 일정에 맞춰 여정을 계획했으며, 붙잡힐 경우 법적으로나 신체적으로나 심각한 위험을 감수해야 했다.",
  "frederick-douglass.turning_point.1":
    "저항하는 노예를 '길들이는' 것으로 지역에 알려져 있던 에드워드 코비 밑에서 일하게 된 더글러스는 결국 매질에 굴복하는 대신 물리적으로 저항하기로 결심했고, 그 대결에서 이겼다. 그는 세 편의 자서전 모두에서 이 순간을, 이후로도 여러 해 동안 실제 노예 신분은 그대로였지만 스스로를 더 이상 정신적으로 노예라고 느끼지 않게 된 분기점으로 묘사했다.",
  "frederick-douglass.turning_point.2":
    "더글러스는 원래 미국 헌법이 본질적으로 노예제를 옹호하는 문서라는 윌리엄 로이드 개리슨의 입장을 따르고 있었다. 그러나 라이샌더 스푸너의 법률적 논증에 영향을 받아 이후 공개적으로 입장을 뒤집어, 헌법을 반노예제 문서로 읽고 정치적 도구로 활용할 수 있다고 주장했다 — 오랜 동맹이었던 개리슨 진영과의 결별이라는 대가를 치른, 근거를 갖춘 입장 변화였다.",
  "frederick-douglass.interpretation.moment.1":
    "프로필의 선제적 행동력(proactive_agency) 점수에 비추어 보면, 이는 다른 무대에서 나타난 같은 패턴이다 — 흑인 병사들의 처우가 어떻게 결정될지 지켜보는 대신, 나라에서 가장 강력한 자리를 직접 찾아간 것이다.",
  "frederick-douglass.interpretation.turning_point.1":
    "프로필의 높은 자율성 욕구(autonomy_need) 점수는 이 서술과 가깝게 맞닿아 있다 — 더글러스는 이 변화를, 그날 바뀌지 않은 법적 신분의 변화가 아니라 자신을 실제로 통제하는 존재가 누구인가에 대한 스스로의 인식 변화로 그리고 있다.",
  "frederick-douglass.interpretation.turning_point.2":
    "프로필의 입장 수정 성향(belief_updating) 점수를 실제 역사적 기록에 비추어 검증하기 유난히 쉬운 사례다 — 이 입장 변화는 시점이 분명하고 근거가 제시되어 있으며, 나중에 와서야 재구성된 것이 아니라 당시에 공개적으로 인정된 변화였다.",

  /* -------------------------------------------------- Batch 2: Ibn Sina */
  "ibn-sina.achievement.1":
    "그의 『의학정전』(Canon of Medicine)은 당시까지 알려진 의학 지식 — 질병과 그 원인, 치료법 — 을 단편적인 임상 기록 모음이 아니라 하나의 체계적인 분류 구조로 정리했으며, 이 저작은 이슬람 세계와 유럽 모두에서 여러 세기 동안 표준 의학 참고서로 쓰였다.",
  "ibn-sina.achievement.2":
    "의학과 별개로 그는 논리학, 자연학, 수학, 형이상학을 다루는 철학 백과사전 『치유의 서』(Kitab al-Shifa)를 독자적인 권·장 구조로 저술했다 — 의학 저술의 부산물이 아니라 그 자체로 독립적으로 구성된 별개의 저작이었다.",
  "ibn-sina.achievement.3":
    "현존하는 저작 목록에 따르면 그는 의학, 철학, 논리학, 천문학, 시에 걸쳐 240편이 넘는 저작을 남긴 것으로 알려져 있다 — 궁정 의사로, 후에는 재상으로 일하는 별도의 고된 직무를 병행하면서도 이어간 지속적인 저술 활동이었다.",
  "ibn-sina.moment.1":
    "그의 자서전에 따르면, 그는 아직 십 대이던 젊은 의사 시절 사만 왕조의 군주 누흐 이븐 만수르를 치료하는 데 성공했고, 그 호의를 발판 삼아 군주의 방대한 왕실 서고에 접근할 수 있게 되었다 — 막연한 야망에 대한 일반적 서술이 아니라, 인물과 시점이 특정된 일화다.",
  "ibn-sina.moment.2":
    "역사 기록에 따르면 그는 생애 중 한 차례의 정치적 격변기에 변장을 하고 투옥에서 벗어났다고 한다 — 여러 차례 반복된 탈출의 일부라기보다, 하나의 생생한 개별 일화다.",
  "ibn-sina.moment.3":
    "그는 오랜 기간 제자이자 서기였던 알 주즈자니와 긴밀하게 협력했는데, 알 주즈자니는 그의 후기 저술을 도왔을 뿐 아니라 이븐 시나가 구술한 자서전을 직접 기록해 남겼다 — 그의 초년기에 관해 알려진 사실 대부분이 바로 이 한 관계를 통해 오늘날까지 전해진다.",
  "ibn-sina.turning_point.1":
    "그의 자서전에 따르면, 그는 젊은 시절 아리스토텔레스의 『형이상학』을 완전히 이해하지 못한 채로 무려 마흔 번 가까이 다시 읽었는데, 우연히 접한 알 파라비의 짧은 주석서가 마침내 그 이해의 열쇠가 되어 주었다. 그 돌파구를 얻고 나서야 그는 남의 텍스트에 계속 머무르는 대신 자신만의 독창적인 철학 저작을 써 나가기 시작했다.",
  "ibn-sina.interpretation.moment.1":
    "프로필의 기회 감지(opportunity_sensing) 점수와 관련해 흥미로운 대목은 순서다 — 치료의 성공이 먼저였고, 그의 자서전에 따르면 서고 접근은 그로 인해 생긴 호의를 이용해 그가 의도적으로 추구한 것이지, 뛰어난 젊은 의사라는 지위에 그저 뒤따라온 부수적 혜택이 아니었다.",
  "ibn-sina.interpretation.turning_point.1":
    "단순한 끈기의 일화 이상으로 읽을 가치가 있다 — 마흔 번의 반복은 실제로 버텨낸 지속력을 보여주지만, 실제로 난관을 뚫어낸 것은 자신의 방식을 더 반복하는 것이 아니라 타인의 짧은 주석서였다 — 높은 끈기(persistence) 점수는 쏟아부은 노력을 설명할 뿐, 결국 통한 방법까지 설명해 주지는 않는다는 점을 보여준다.",

  /* -------------------------------------------- Batch 2: MLK */
  "martin-luther-king-jr.achievement.1":
    "킹은 1955~56년 몽고메리 버스 보이콧을 이끌었고, 남부기독교지도자회의(SCLC)를 공동 창립해 이끌었으며, 버밍햄과 셀마 캠페인을 조직했다 — 한 번의 화제성 있는 순간이 아니라 10년 넘게 지속된 조직적 시민권 운동 지도력이었다.",
  "martin-luther-king-jr.achievement.2":
    "그의 연설, 특히 1963년 워싱턴 행진에서의 '나에게는 꿈이 있습니다' 연설은 20세기의 연설 중 가장 폭넓게 기록되고 연구된 축에 속하며, 13년에 걸쳐 이어진 공개 연설 활동의 일부였다.",
  "martin-luther-king-jr.achievement.3":
    "그의 캠페인들은 단순한 저항 자체가 아니라 구체적인 입법 성과를 확보하는 데 맞춰져 있었다 — 당시 공개적으로 1964년 민권법과 1965년 투표권법을 직접적인 목표로 내세웠고, 두 법안 모두 그 캠페인 기간 안에 통과되었다.",
  "martin-luther-king-jr.moment.1":
    "1963년 버밍햄 캠페인은 조직 내부에서 '대립'을 뜻하는 '프로젝트 C'로 기록되었을 만큼 단계적으로 고조되는 행동들로 치밀하게 설계되었고, 그 도시가 선택된 것은 경찰의 시위 대응이 전국적 언론의 주목을 끌 만큼 가혹하고 눈에 띌 것으로 예상되었기 때문이었다.",
  "martin-luther-king-jr.moment.2":
    "1963년 버밍햄 수감 중에 쓰인 '버밍햄 감옥에서 온 편지'는 캠페인의 시기가 너무 이르다고 주장한 일부 성직자 동료들의 구체적인 비판을 조목조목 체계적으로 반박한다 — 단순한 수사적 호소가 아니라 짜임새를 갖춘 반론이었다.",
  "martin-luther-king-jr.moment.3":
    "미국 시민권 운동에 사용할 전략 틀을 세우기 전, 그는 정식으로 신학 박사 과정을 밟았고 간디식 비폭력 방법을 깊이 연구했으며, 이를 그대로 가져다 쓰기보다 직접 변형해 적용했다.",
  "martin-luther-king-jr.turning_point.1":
    "말년에 킹은 자신의 공개적 초점을 인종 분리 문제에서 경제 정의(빈민 캠페인 조직)로, 그리고 1967년 리버사이드 교회 연설에서는 베트남 전쟁에 대한 공개적 반대로 넓혀 갔다. 두 움직임 모두 상당한 비판을 불러왔고, 오랜 동맹 중 일부는 이를 시민권 메시지를 희석시키는 값비싼 선택으로 여겼다.",
  "martin-luther-king-jr.interpretation.moment.1":
    "이 선택은 우연히 발생한 갈등을 감내한 것이라기보다, 어디서 대립이 벌어져야 가장 전략적인 효과를 낼지 미리 찾아낸 것에 더 가깝게 읽힌다 — 프로필의 기회 감지(opportunity_sensing) 점수도 같은 패턴을 짚어낸다.",
  "martin-luther-king-jr.interpretation.moment.3":
    "타고난 재능을 발휘했다기보다 기존 방법을 연구하고 변형했다는 점이, 여기서 프로필의 숙련 지향(mastery_orientation) 점수가 짚어내는 바에 더 가깝다 — 그가 훗날 대표하게 된 접근법은 즉흥이 아니라 의도적으로 다듬어진 것이었다.",
  "martin-luther-king-jr.interpretation.turning_point.1":
    "프로필의 입장 수정 성향(belief_updating) 점수는 이 구체적인 기록에 비추어 검증하기 쉬운 편이다 — 이것은 편안한 방향 전환이 아니라, 대가를 치르고 공개적으로 비판받은 입장 확장이었으며, 이는 아무런 실제 압박 없이 이뤄진 변화보다 더 무게 있게 다뤄야 할 증거다.",

  /* -------------------------------------------- Batch 2: Rachel Carson */
  "rachel-carson.achievement.1":
    "『침묵의 봄』(1962)은 살충제의 영향에 관한 방대한 기존 과학 연구를 종합하고 교차 검증하여 하나의 치밀한 근거 위에 선 논증으로 엮어냈으며, 50쪽이 넘는 출처 주석이 이를 뒷받침한다 — 단순히 설득하기 위해서가 아니라 어떤 반박에도 흔들리지 않도록 쓰인 책이었다.",
  "rachel-carson.achievement.2":
    "이 책은 현대 환경 운동을 촉발한 계기로, 그리고 훗날 미국의 DDT 국내 사용 금지를 포함해 미국 살충제 정책에 직접 영향을 준 계기로 널리 인정받는다 — 막연한 문화적 영향력 주장이 아니라 추적 가능한 정책적 파급 효과다.",
  "rachel-carson.achievement.3":
    "그의 경력은 해양생물학 연구, 미국 어업국에서의 정부 과학 저술, 그리고 대중 과학 저술(『우리를 둘러싼 바다』, 『침묵의 봄』)에 걸쳐 있었다 — 말년에 갑자기 옹호 활동으로 전환한 것이 아니라, 각 영역에서 꾸준하고 진지한 성과를 낸 것이다.",
  "rachel-carson.moment.1":
    "『침묵의 봄』 출간 이후에도 그는 미국 상원 소위원회 증언을 포함해 계속해서 공개적으로 그 내용을 옹호했으며, 자신을 겨냥한 자금력 있는 업계 캠페인 속에서도 책이 나온 지 얼마 되지 않아 세상을 떠날 때까지 그 공개적 옹호를 이어 갔다.",
  "rachel-carson.moment.2":
    "그는 『침묵의 봄』의 마지막 작업 단계와 그 이후의 공개적 옹호 활동을, 당시에는 공개하지 않기로 한 말기 암 진단을 개인적으로 관리하면서 병행해 나갔다.",
  "rachel-carson.moment.3":
    "책 인세로 생계가 가능해지자, 그는 어업국이라는 안정된 정부 직책을 떠나 전업으로 독립적인 글쓰기를 시작했다 — 안정을 이어가는 대신 그것에서 의도적으로 벗어난, 기록으로 남은 선택이었다.",
  "rachel-carson.turning_point.1":
    "카슨은 『침묵의 봄』을 출간하면 화학 업계로부터 자신의 과학적 주장뿐 아니라 개인적 신뢰까지 겨냥한 직접적이고 지속적인 공격이 뒤따르리라는 것을 미리 예상하고도 책을 냈고, 실제로 그런 일이 벌어졌다. 그 압박 속에서 입장을 철회하거나 누그러뜨리는 대신, 그는 남은 생애 동안 계속해서 책의 주장을 공개적으로 옹호했다.",
  "rachel-carson.interpretation.moment.2":
    "여기서는 프로필의 위험 감수(risk_tolerance) 점수를 더 넓은 맥락과 함께 읽을 필요가 있다 — 이는 공개적으로 알리지 않기로 한 심각한 개인적 건강 문제를 관리하면서 동시에 겪어낸, 업계의 공개적 공격 캠페인에 대한 지속적 노출이었다 — 서로 다른 종류의 두 가지 부담이 동시에 있었던 것이지, 하나가 다른 하나를 설명해 주는 것은 아니다.",
  "rachel-carson.interpretation.turning_point.1":
    "프로필의 높은 갈등 감내(conflict_tolerance) 점수를 확인할 수 있는 가장 분명한 대목이다 — 예상 밖의 비판이 닥친 뒤에야 물러서지 않은 것이 아니라, 무슨 일이 뒤따를지 미리 알면서도 출간을 선택했다는 점에서 더 강한 근거가 된다.",

  /* -------------------------------------------- Batch 2: Hildegard of Bingen */
  "hildegard-of-bingen.achievement.1":
    "힐데가르트는 식물과 동물, 광물, 그리고 그 약용법을 체계적으로 정리한 저작 『피지카』와 『원인과 치료』를 남겼다 — 인체 해부와 생식에 관한 서술은 12세기 수도원 저자로서는 이례적으로 직접적이고 상세하다고 현대 중세학자들이 평가한다.",
  "hildegard-of-bingen.achievement.2":
    "그는 당대로서는 형식이 이례적인 독창적 전례 음악극 『오르도 비르투툼』을 작곡했고, 종교적 체험을 우주론과 구원사, 윤리학을 아우르는 하나의 체계로 정리한 환시 신학 저작 『스키비아스』를 썼다 — 두 작품 모두 후대에 전해 들은 것이 아니라 그 자신의 직접적인 저작으로 현존한다.",
  "hildegard-of-bingen.achievement.3":
    "그는 평생 동안 루퍼츠베르크와 이후 아이빙엔, 두 곳의 수도 공동체를 세우고 이끌었다 — 당대의 수도원 기록에 남아 있는, 오랜 시간 지속된 조직적 지도력이었다.",
  "hildegard-of-bingen.moment.1":
    "현존하는 서신들은 그가 교황 에우제니오 3세와 신성로마제국 황제 프리드리히 바르바로사에게 직접 요청받지 않은 도덕적 훈계의 편지를 보냈음을 보여준다 — 그는 또한 12세기의 여성으로서 공개적으로 설교할 수 있는, 교회가 허락한 드문 예외를 받은 인물이기도 했다.",
  "hildegard-of-bingen.moment.2":
    "독립된 루퍼츠베르크 수도원을 세우려면 먼저 기존 공동체를 이전해야 했는데, 이는 그의 수도원장이 처음에 반대했던 일이었다 — 기록에 남은 이 갈등에서 그는 결국 뜻을 굽히지 않고 이전을 관철시켰다.",
  "hildegard-of-bingen.moment.3":
    "그의 현존하는 음악 작품들은 당대로서는 이례적으로 넓은 음역과 독특한 선율 양식으로 음악학자들의 주목을 받는다 — 정형화된 전례 작곡이 아니라 의도적인 미적 접근의 증거다.",
  "hildegard-of-bingen.turning_point.1":
    "말년에 힐데가르트의 수도원은 교회 성무 금지령이라는 중대한 징계를 받았는데, 이는 그가 공동체의 묘지에 묻힌 한 남성 — 교회 당국이 파문된 것으로 간주한 인물 — 의 유해를 파내어 옮기라는 요구를 거부했기 때문이었다. 그는 요구에 응하지 않고 교회 당국에 직접 청원을 이어 갔고, 공동체의 삶에서 핵심이었던 전례와 음악 활동을 금지했던 그 금지령은 그가 세상을 떠나기 얼마 전에야 비로소 풀렸다.",
  "hildegard-of-bingen.interpretation.moment.1":
    "여기서 프로필의 독립적 사고(independent_thinking) 점수와 잘 들어맞는 것은 막연한 자신감이 아니라 더 구체적인 사실이다 — 이 편지들은 요청받아 응답한 것이 아니라, 그 자신이 먼저 나서서 당대 가장 강력한 두 자리에 보낸 것이었다.",
  "hildegard-of-bingen.interpretation.moment.2":
    "이는 프로필의 자율성 욕구(autonomy_need) 점수와 잘 맞아떨어진다 — 여기서 부딪힌 상대는 멀리 있는 정치 권력이 아니라 자신의 수도원 상급자였다는 점에서, 교황과 황제에게 보낸 편지보다 오히려 이 특성을 더 직접적으로 시험한 사례라고 볼 수 있다.",
  "hildegard-of-bingen.interpretation.turning_point.1":
    "프로필의 갈등 감내(conflict_tolerance)와 위험 감수(risk_tolerance) 점수 모두 이 한 사건 안에서 확인되는데, 둘을 구분해 볼 필요가 있다 — 물러서지 않고 갈등을 이어간 것과, 발효 중인 금지령에 맞서는 실제 제도적 위험을 감수한 것은 서로 연관되지만 별개의 문제다.",

  /* -------------------------------------------- Batch 2: Florence Nightingale */
  "florence-nightingale.achievement.1":
    "크림 전쟁 중 나이팅게일은 훗날 '콕스콤(수탉 볏)' 차트로 알려지게 되는 극좌표 다이어그램을 고안해, 병사 사망의 주된 원인이 전투 부상이 아니라 열악한 위생 상태였음을 통계적으로 입증했다 — 막연한 관찰이 아니라 구체적이고 방법론적으로 독창적인 통계 분석이었다.",
  "florence-nightingale.achievement.2":
    "1860년 그는 나이팅게일 간호학교를 설립했고, 이후 수십 년에 걸쳐 영국 군과 민간 의료 체계의 지속적인 제도 개혁을 이끌었다.",
  "florence-nightingale.achievement.3":
    "그의 통계 자료 제시는 영국 군과 정부 관료들을 직접 설득해 행동에 나서게 했으며, 그의 보고서에 따라 왕립위원회 구성과 일련의 위생 개혁으로 이어졌다.",
  "florence-nightingale.moment.1":
    "1854년, 그는 공식 파견을 기다리는 대신 자신이 직접 간호사 무리를 조직해 함께 크림 전쟁 전선으로 향해 야전병원 상황을 직접 관리했으며, 전쟁터의 질병으로 인한 실제 개인적 위험을 감수했다.",
  "florence-nightingale.moment.2":
    "그는 당시 자신의 사회 계급 여성에게 평판이 나쁜 직업으로 여겨지던 간호 일을 하기 위해, 관습적인 상류층 결혼을 기대하던 가족의 뜻을 거부했다.",
  "florence-nightingale.turning_point.1":
    "크림 전쟁이 끝난 뒤 나이팅게일의 건강은 만성 질환으로 악화되어, 남은 생애 50여 년의 대부분을 침상에 매인 채 지내야 했다. 그러나 그는 개혁 활동에서 물러나는 대신, 영국 육군 의료 개혁에서 인도의 공중보건에 이르기까지 그 활동을 전적으로 통계 저술과 서신을 통해 — 거의 전부 병상에서 — 이어 나갔다.",
  "florence-nightingale.interpretation.moment.1":
    "이는 프로필의 선제적 행동력(proactive_agency) 점수가 비교적 문자 그대로 드러난 사례다 — 그 간호사 무리가 존재했던 것은 누군가 마련해 준 자리를 받아들여서가 아니라, 그 자신이 직접 조직했기 때문이다.",
  "florence-nightingale.interpretation.moment.2":
    "여기서 프로필의 독립적 사고(independent_thinking) 점수는 단지 남모르게 관습에서 벗어난 생각을 품었다는 데 그치지 않는다 — 그는 기대되던 구체적인 삶의 경로를 실제로 포기하고 그 생각에 따라 행동했다는 점에서, 같은 증거의 더 강한 형태를 보여준다.",
  "florence-nightingale.interpretation.turning_point.1":
    "프로필의 높은 끈기(persistence) 점수는 단순히 지속된 노력만이 아니라 여기서 실제로 방법이 바뀌었다는 점까지 설명해야 한다 — 활동은 이어졌지만, 1854년의 활동적인 야전 간호사와 그 이후 수십 년간의 서신 중심 개혁가는 전혀 다른 제약 조건 속에서 일하고 있었다.",

  /* -------------------------------------------- Batch 2: Umm Kulthum */
  "umm-kulthum.achievement.1":
    "수십 년 동안 움 쿨숨은 매달 첫째 목요일 라디오로 생중계되는 콘서트라는 월례 공연 전통을 이어갔으며, 이집트를 비롯한 아랍권 여러 나라에서 저녁 일과의 일부를 이 방송에 맞춰 짤 정도로 꾸준히 지속되었다.",
  "umm-kulthum.achievement.2":
    "그의 공연은 음악학자들에 의해 고전 아랍 성악 장식음 전통인 '타랍'의 대가로 평가받는데, 이는 단 한 번의 명연이 아니라 수십 년에 걸쳐 남아 있는 녹음 기록을 통해 분석된 결과다.",
  "umm-kulthum.achievement.3":
    "그는 당대의 주요 작곡가들, 특히 리야드 알순바티와 수십 년에 걸친 창작 협업을 이어갔고, 당시 공연자로서는 이례적일 만큼 자신의 오케스트라와 레퍼토리 선정에 대한 창작 주도권을 행사했다.",
  "umm-kulthum.moment.1":
    "어린 시절 그는 엄격한 성악 훈련을 받았는데, 여러 전기 기록에 따르면 처음에는 남자아이로 변장한 채 종교 낭송을 공개적으로 공연했다고 한다 — 이 훈련은 이후 약 50년에 이르는 공연 경력 내내 계속 이어지고 깊어졌다.",
  "umm-kulthum.moment.2":
    "공연 중 그는 한 소절을 여러 차례 반복해 부르면서 매번 다른 장식음을 얹었고, 청중에게 원하는 감정적 효과가 전해졌다고 판단할 때까지 이를 이어갔다 — 이는 이따금의 즉흥이 아니라 기록으로 남은 의도적인 기법이었다.",
  "umm-kulthum.turning_point.1":
    "1967년 제3차 중동전쟁에서 이집트가 패배한 뒤, 움 쿨숨은 정부의 요청이 아니라 스스로의 판단으로 대규모 모금 콘서트 순회공연을 조직해, 자신의 대중적 영향력을 활용해 나라를 위한 실질적인 재정 지원을 이끌어냈다.",
  "umm-kulthum.interpretation.moment.2":
    "이는 단순한 반복보다는 프로필의 실험 성향(experimentation) 점수에 더 가까운 대목이다 — 한 소절을 거듭 반복할 때마다 그것은 같은 구절을 효과를 위해 되풀이한 것이 아니라, 청중의 반응에 비추어 시험된 하나의 변주였다.",
  "umm-kulthum.interpretation.turning_point.1":
    "프로필의 영향 창출 동기(impact_motivation) 점수는 여기서 시점과 함께 읽어볼 필요가 있다 — 이는 기존의 자선 활동을 관행적으로 확장한 것이 아니라, 실제 국가적 위기의 순간에 스스로 자신의 공적 역할을 국가적 차원으로 넓힌 자발적 선택이었다.",

  /* -------------------------------------------- Batch 2: Sor Juana */
  "sor-juana-ines-de-la-cruz.achievement.1":
    "그 자신의 기록에 따르면, 그는 어린 시절 스스로 글을 깨쳤고 몇 차례의 수업만으로 라틴어를 익혔으며, 이후 식민지 시대 스페인령 아메리카에서 손꼽히게 큰 개인 장서 — 약 4천 권 — 를 모았다.",
  "sor-juana-ines-de-la-cruz.achievement.2":
    "그는 방대한 분량의 시와 희곡을 남겼는데, 문학 연구자들은 이를 스페인 황금세기 문학 가운데 가장 독창적인 작품군의 하나로 평가한다.",
  "sor-juana-ines-de-la-cruz.achievement.3":
    "자신을 공개적으로 비판한 한 주교에게 직접 보낸 『소르 필로테아에게 보내는 답신』에서, 그는 여성의 지적 삶에 대한 권리를 자신 한 사람의 경우에 그치지 않고 하나의 일반 원칙으로 옹호하는, 조목조목 짜인 신학적·철학적 논증을 펼쳤다.",
  "sor-juana-ines-de-la-cruz.moment.1":
    "십 대 시절 그는 부왕청 궁정에서 학자들로 구성된 심사단 앞에서 시험을 치렀는데, 당대와 후대의 기록에 따르면 그 지식의 폭으로 심사단을 감탄시켰다고 한다 — 수녀원에 들어가기 전, 공개적인 지적 역량을 직접 드러낸 구체적이고 기록으로 남은 사례다.",
  "sor-juana-ines-de-la-cruz.moment.2":
    "그가 수녀원에 들어간 것은 순전히 종교적 소명이라기보다 신중하고 전략적인 선택이었다 — 그 자신의 기록에 따르면, 이는 당시 여성에게 결혼으로는 허락되지 않았을 학문에 몰두할 시간과 개인적 자율성을 확보하기 위한 것이었다.",
  "sor-juana-ines-de-la-cruz.turning_point.1":
    "말년에, 지적 활동을 둘러싸고 교회 권위와 오랜 세월 이어온 갈등 끝에 소르 후아나는 결국 자신의 장서와 저술 활동을 모두 포기하도록 압박받았다. 수십 년간 이어졌던 학문적·문학적 성과는 사실상 그 지점에서 끝났고, 그리 오래지 않아 그는 세상을 떠났다.",
  "sor-juana-ines-de-la-cruz.interpretation.moment.1":
    "이 일화는 이후 더 개인적이었던 수녀원 학문 활동과 구분해 볼 가치가 있다 — 여기서는 같은 지적 폭이 스스로 통제할 수 없는 자리에서, 사적으로 자신의 방식대로 길러진 것이 아니라 공개적으로 직접 드러난 것이다.",
  "sor-juana-ines-de-la-cruz.interpretation.moment.2":
    "이는 상황에 대한 체념이라기보다 프로필의 자원 활용 성향(resourcefulness) 점수가 구체적이고 잘 기록된 형태로 드러난 사례에 더 가깝게 읽힌다 — 직접 열려 있지 않았던 목표, 곧 지속적인 학문적 삶에 이르는 우회로를 스스로 찾아낸 것이다.",
  "sor-juana-ines-de-la-cruz.interpretation.turning_point.1":
    "이 부분은 얼버무리기보다 있는 그대로 말할 가치가 있다 — 프로필의 높은 끈기(persistence)와 갈등 감내(conflict_tolerance) 점수는 그가 자신의 입장을 얼마나 오래 지켜냈는지를 보여줄 뿐, 결국 뜻을 관철했다는 것을 보여주지는 않는다 — 이 기록에는 오랜 저항뿐 아니라 실제 패배도 함께 담겨 있다.",

  /* -------------------------------------------- Batch 2: Emmy Noether */
  "emmy-noether.achievement.1":
    "1915년에 증명된 뇌터의 정리는 물리계의 모든 미분 가능한 대칭이 하나의 보존 법칙에 대응한다는 사실을 밝혔다 — 오늘날까지도 이론물리학과 수학 전반에서 표준적으로 쓰이는 근본적인 결과다.",
  "emmy-noether.achievement.2":
    "그는 오늘날 '뇌터 환'이라 불리는 추상대수학의 기초 개념을 발전시켜, 개별 사례별 계산이 아니라 일반적인 구조적 성질을 중심으로 그 분야가 다뤄지는 방식 자체를 재구성했다.",
  "emmy-noether.achievement.3":
    "그는 괴팅겐에서 약 30년에 걸쳐 왕성한 수학 연구를 이어갔는데, 그 경력의 상당 기간 동안 정식 교수직도, 남성 동료들과 대등한 급여도 받지 못한 채로였다.",
  "emmy-noether.moment.1":
    "여성이라는 이유로 괴팅겐에서 정식 강의 직위를 맡는 것이 오랫동안 금지되어 있었기에, 그는 대신 대학의 공식 강의 목록에 다비트 힐베르트의 이름으로 강의를 개설했다 — 그저 가로막힌 것이 아니라, 기록으로 남은 구체적인 제도적 우회 방법이었다.",
  "emmy-noether.moment.2":
    "괴팅겐에서 그는 이후 '뇌터의 아이들'로 알려지게 되는 활기찬 학생 모임을 비공식적으로 이끌었으며, 형식적인 강의만이 아니라 개방적이고 활발한 토론을 통해 수학을 함께 풀어나갔다.",
  "emmy-noether.turning_point.1":
    "1933년, 나치의 새로운 인종법에 따라 자리에서 해임된 뇌터는 독일을 떠나 미국의 브린모어 대학에서 경력을 다시 세웠고, 그곳에서 2년 뒤 세상을 떠날 때까지 강의와 연구를 이어갔다.",
  "emmy-noether.interpretation.moment.1":
    "장벽 자체는 끝내 사라지지 않았다 — 달라진 것은 그가 그것을 정면으로 뚫는 대신 우회해 가르치고 연구하는 길을 스스로 찾아냈다는 점이며, 이는 프로필의 자원 활용 성향(resourcefulness) 점수를 상당히 직접적으로 보여주는 대목이다.",
  "emmy-noether.interpretation.turning_point.1":
    "프로필의 선제적 행동력(proactive_agency) 점수는 여기서 신중하게 읽을 필요가 있다 — 그 실제 상황에서 떠나는 것 자체는 선택의 문제가 아니었지만, 이후 어디서 어떻게 그토록 빠르게 다시 연구자로서의 경력을 세웠는가는 그 자신의 선택이었다.",

  /* -------------------------------------------------- Batch 3: F. Kafka */
  "franz-kafka.achievement.1":
    "그는 정교한 관료적 절차와 초현실적인 위협감을 결합한, 당대 문학에서 직접적인 선례를 찾기 힘든 독자적인 서사 양식을 만들어냈다. 이 문체는 이후 그의 이름을 딴 '카프카적(Kafkaesque)'이라는 용어로 불리게 되었으며, 이는 그 문체가 오늘날까지 이어지는 비평적 인정과 용어로서의 유산을 남겼다는 사실로 뒷받침된다.",
  "franz-kafka.achievement.2":
    "보헤미아 왕국 노동자 재해보험공사에서 보낸 14년(1908–1922)의 재직 기간 동안, 그는 말단 사무원에서 선임 법률 서기로 승진했다 — 1913년 기준 263명 중 유대인 직원이 단 둘뿐이었던 이 기관에서 맡은 힘겨운 자리였다 — 그러면서도 같은 기간 내내 밤마다 이어간 집중적인 개인 글쓰기를 병행했다.",
  "franz-kafka.achievement.3":
    "이 공사에서 그는 기업들을 산업재해 위험 수준에 따라 분류하는 위험등급 체계를 설계하고 산업안전 규정을 입안했다 — 문학적 명성과는 완전히 별개의 이 직무는 유럽에서 가장 산업화가 진전된 지역 중 한 곳에서 산업재해를 실질적으로 줄인 것으로 기록되어 있다.",
  "franz-kafka.moment.1":
    "카프카는 친구 막스 브로트에게 자신이 세상을 떠난 뒤 미완성으로 남긴 원고들 — 소설 『소송』, 『성』, 『아메리카』를 포함해 — 을 태워달라고 부탁했다. 브로트는 이를 따르지 않았고, 세 작품 모두 사후에 출간되었다.",
  "franz-kafka.moment.2":
    "펠리체 바우어에게 보낸 편지들은 평범한 가정생활에 대한 바람과 홀로 글을 쓸 시간에 대한 필요 사이의 지속적이고 명시적인 갈등을 담고 있다 — 이 갈등은 결국 그녀와의 두 차례 약혼을 모두 파혼으로 이끌었다.",
  "franz-kafka.moment.3":
    "그 자신의 편지와 일기, 그리고 막스 브로트를 비롯한 동시대인들의 증언은 한결같이 그를 사적인 관계에서 사회적으로 불안하고 자신에 대한 확신이 부족한 인물로 그린다 — 이는 그의 문학적 명성에서 유추한 것이 아니라 이 같은 기록된 패턴에서 직접 도출한, 있는 그대로의 낮은 점수다.",
  "franz-kafka.interpretation.moment.1":
    "단순한 통상적 퇴고로는 이 상황을 다 설명하지 못한다 — 거의 모든 것을 없애고 싶어 했다는 사실은 프로필의 양면적인 완벽주의(perfectionism) 점수가 가리키는 바에 더 가깝다.",
  "franz-kafka.interpretation.moment.2":
    "프로필의 자율성 욕구(autonomy_need) 점수에 비추어 보면, 이는 결혼 자체에 대한 막연한 망설임이 아니다 — 그 자신의 편지는 결혼이 앗아갈 구체적인 대가를 스스로 명시하고 있다.",

  /* -------------------------------------------------- Batch 3: V. van Gogh */
  "vincent-van-gogh.achievement.1":
    "그는 주로 동생 테오에게 보낸 거의 900통에 이르는 편지를 남겼는데, 이는 색채 관계와 구도에 대한 그의 치밀한 사고를 직접 보여주며, 여기에 2,000점이 넘는 남아 있는 작품이 더해진다 — 두터운 임파스토와 과감한 색채 선택에 기반한 이 독자적인 화풍은 당대의 아카데미적 관습이나 인상주의 관습과는 뚜렷이 다른 것이었다.",
  "vincent-van-gogh.achievement.2":
    "아를과 생레미에서 보낸 생애 마지막 약 15개월 동안만 그는 약 200점의 그림을 그렸으며, 그 가운데 일부는 단 한 번의 작업 시간이나 하루 만에 완성된 것으로 기록되어 있다.",
  "vincent-van-gogh.achievement.3":
    "생전에 그림을 한두 점밖에 팔지 못했다고 기록될 만큼 상업적 성공을 거의 전혀 거두지 못했음에도, 그는 약 10년에 걸쳐 높은 생산성을 유지했다 — 이는 성공이나 보상에 이끌린 작업이라는 해석에 반하는 근거다.",
  "vincent-van-gogh.moment.1":
    "아를에서 화가 폴 고갱과 함께 작업실을 공유하려 한 시도 — 공동 예술가 마을의 씨앗으로 삼고자 그가 직접 고갱을 초대해 시작한 이른바 '노란 집' 시기 — 는 약 두 달 만에 잘 알려진 파국으로 끝났다.",
  "vincent-van-gogh.moment.2":
    "그는 일본 우키요에 판화를 폭넓게 수집하고 연구했으며, 그 평면적인 원근법과 대담한 윤곽선을 자신의 구도에 직접 반영했다 — 이는 그의 그림 작업을 넘어서는, 기록으로 남은 관심사였다.",
  "vincent-van-gogh.moment.3":
    "그는 자신만의 독립된 작업 공간을 확보하기 위해 특별히 아를로 이주했으며, 그의 편지는 이를 상황에 떠밀린 것이 아니라 창작의 독립을 위한 의도적인 선택으로 묘사한다.",
  "vincent-van-gogh.turning_point.1":
    "27세에, 미술상, 교사, 평신도 설교자 등 그 이전의 여러 관습적인 길을 떠난 뒤 — 화가로서 검증된 재능이 전혀 없는 상태에서 — 그는 전업 화가의 길을 택했으며, 동생 테오의 재정적 지원에 힘입어 이 전환을 감행할 수 있었다.",
  "vincent-van-gogh.interpretation.moment.1":
    "프로필의 협업 성향(collaboration) 점수는 이 한 차례 작업실 공유 시도의 기록된 결과만을 좁게 반영한 것이지, 그가 사람들과 전반적으로 어떻게 지냈는지에 대한 폭넓은 판단은 아니다.",
  "vincent-van-gogh.interpretation.moment.3":
    "프로필의 자율성 욕구(autonomy_need) 점수와 관련해 주목할 점은, 그 작업실이 우연히 머물게 된 곳이 아니라 그의 편지가 직접 밝히듯 스스로 찾아 나선 공간이었다는 사실이다.",
  "vincent-van-gogh.interpretation.turning_point.1":
    "프로필의 위험 감수(risk_tolerance) 점수는 이 한 차례의, 비교적 늦은 나이에 내린 결정에 근거를 둔 것이지, 그의 삶 전체를 관통하는 위험 성향에 대한 일반적인 주장은 아니다.",
  "vincent-van-gogh.legacy":
    "반 고흐는 1890년 7월 29일, 오베르쉬르우아즈 근교 밀밭에서 가슴에 총상을 입은 지 이틀 만에 세상을 떠났다. 경찰의 심문에 그는 \"내 몸은 내 것이니 내가 원하는 대로 할 자유가 있다. 아무도 탓하지 마라, 자살하고 싶었던 것은 나 자신이다\"라고만 답했으며, 반 고흐 미술관 자체의 공식 설명 역시 지금도 이를 자해로 서술한다. 이 프로필의 다른 곳에서도 인용된 스티븐 네이페와 그레고리 화이트 스미스의 2011년 전기는 이와 달리 그가 인근의 십대 청소년 둘에게 우발적으로 총을 맞고 그들을 감싸주었다고 주장했다 — 반 고흐 미술관 연구진이 2013년 이 주장을 정식으로 반박했고 대다수 학자도 받아들이지 않고 있지만, 이는 이 프로필이 참고하는 모든 자료가 사망 경위에 대해 완전히 합의하지는 않는다는 뜻이기도 하다. 그의 사후 명성은 생전의 무명과는 뚜렷이 대조되었다 — 살아 있을 때는 거의 팔리지 않았던 그림들이 지금은 서양 미술사에서 가장 값비싸고 인기 있는 작품으로 손꼽힌다.",

  /* -------------------------------------------------- Batch 3: T. Aquinas */
  "thomas-aquinas.achievement.1":
    "『신학대전』은 그리스도교 신학과 아리스토텔레스 철학 전체를 하나의 정합적인 구조적 틀 안에 조직했으며, 수천 개에 이르는 개별 항목 전반에 걸쳐 질문-반론-답변이라는 일관된 방법을 적용했다 — 이는 현존하는 텍스트 자체의 구성에서 직접 확인할 수 있는 사실이다.",
  "thomas-aquinas.achievement.2":
    "그는 가르치고 여행하는 와중에도 약 20년의 재직 기간 안에 이 방대한 분량의 저작을 완성했는데, 여러 명의 필경사에게 서로 다른 저작을 동시에 구술하는 방법을 사용했다는 기록이 남아 있다.",
  "thomas-aquinas.achievement.3":
    "일부 교회 당국의 반대에도 새로 번역되어 논쟁적이었던 '이교도' 아리스토텔레스 철학을 그리스도교 신학에 통합했다. 그의 사후 몇 년 뒤인 1277년, 토마스주의의 여러 명제가 파리 주교에 의해 공식적으로 단죄되었다.",
  "thomas-aquinas.moment.1":
    "널리 반복되어 전해지는 이야기에 따르면, 그는 한 왕실 만찬 자리에서 사색에 깊이 몰입한 나머지 신학적 문제 하나를 막 풀어낸 순간 좌중을 의식하지 못한 채 식탁을 내려쳤다고 한다 — 이는 여러 독립적으로 확인된 일화 중 하나라기보다, 자주 인용되는 하나의 구체적인 일화다.",
  "thomas-aquinas.moment.2":
    "그는 조용하고 내성적인 태도 때문에 동료 학생들 사이에서 '벙어리 소'라는 별명으로 널리 알려져 있었다 — 당시 그의 스승 알베르투스 마그누스가 그를 두둔하며 훗날 그의 명성을 예견했다고 전해진다.",
  "thomas-aquinas.turning_point.1":
    "널리 전해지는 이야기에 따르면, 1273년 12월 6일 미사 중 신비 체험을 한 뒤 그는 집필을 멈추었고, 자신이 그동안 써온 모든 것이 자신이 목격한 것에 비하면 지푸라기처럼 여겨진다고 비서에게 말했다고 한다. 그는 이후 『신학대전』으로 다시 돌아가지 않았고, 그 저작은 약 석 달 뒤 그가 세상을 떠날 때까지 미완성으로 남았다.",
  "thomas-aquinas.interpretation.achievement.3":
    "프로필의 독립적 사고(independent_thinking) 점수는 이 입장이 그에게 치른 대가 — 결코 밖으로 드러내지 않은 사적인 이견 정도가 아니라 공식적인 사후 단죄 — 를 통해 읽어볼 가치가 있다.",
  "thomas-aquinas.interpretation.turning_point.1":
    "이는 프로필의 높은 숙련 지향(mastery_orientation) 점수를 단순히 확인해 주기보다 오히려 복잡하게 만든다 — 그 자신의 전언에 따르면, 그 작업이 멈춘 것은 완성되었기 때문이 아니라 그 일 전체가 더 이상 중요하지 않게 여겨졌기 때문이었다.",

  /* -------------------------------------------------- Batch 3: Maimonides */
  "maimonides.achievement.1":
    "『미슈네 토라』는 유대 종교법 전체를 열네 권에 걸쳐 하나의 정합적이고 주제별로 체계화된 법전으로 조직했다 — 이는 전례 없는 조직화 작업으로, 현존하는 텍스트에서 직접 확인할 수 있다.",
  "maimonides.achievement.2":
    "그는 종교법(『미슈네 토라』), 철학(아리스토텔레스적 합리주의와 유대 신학을 조화시킨 『방황하는 자들을 위한 안내서』), 그리고 궁정 의사로 활동하며 여러 의학 논고를 남긴 의학이라는 세 개의 서로 다른 영역에서 실질적인 성취를 지속했다.",
  "maimonides.achievement.3":
    "그는 살라딘의 재상 알카디 알파딜의 주치의이자 푸스타트 유대인 공동체의 지도자(나기드)로 활동하며, 자신의 학문을 공적인 의료와 공동체 봉사에 직접 적용했다.",
  "maimonides.moment.1":
    "그 자신이 남긴, 자신의 일과를 묘사한 편지에 따르면, 그는 궁정에서 벅찬 일상 진료를 계속하는 동시에 주요 학문 저술도 이어갔다.",
  "maimonides.moment.2":
    "그는 왕실이나 공동체의 위촉 없이 『미슈네 토라』 편찬을 스스로 시작했다 — 『스탠퍼드 철학 백과사전』이 전하는 이 저작의 유래에 따르면, 이는 온전히 그 자신의 독자적인 기획이었다.",
  "maimonides.turning_point.1":
    "그는 알모하드 왕조의 종교 박해를 피해 코르도바를 떠났고, 페스와 팔레스타인을 거치는 몇 년간의 유랑 끝에 결국 이집트 푸스타트에 정착해 그곳에서 의학과 학문 양쪽의 경력을 다시 일으켜 세웠다.",
  "maimonides.interpretation.moment.2":
    "누구도 이 일을 위촉하지 않았다 — 이는 프로필의 선제적 행동력(proactive_agency) 점수가 가리키는 바에 거의 정확히 들어맞는다.",
  "maimonides.interpretation.turning_point.1":
    "프로필의 자원 활용 성향(resourcefulness) 점수는 이 사연에 대체로 잘 들어맞지만, 남아 있는 기록은 그가 정확히 어떻게 다시 일어섰는지보다 결국 어디에 이르렀는지를 더 온전히 전하고 있다.",

  /* -------------------------------------------------- Batch 3: Sequoyah */
  "sequoyah.achievement.1":
    "그는 영어를 포함해 기존의 어떤 문자도 읽을 줄 몰랐음에도 체로키어를 위한 완전한 85자 문자 체계, 즉 체로키 음절문자를 홀로 만들어냈다 — 이는 한 개인이 독자적으로 기능하는 문자 체계를 고안해 낸, 역사적으로 매우 드문 사례 가운데 하나로 기록되어 있다.",
  "sequoyah.achievement.2":
    "그는 자신이 속한 공동체 내부에서 회의와 심지어 주술 혐의까지 제기되는 가운데서도 이를 견뎌내며, 이 음절문자를 개발하는 데 약 12년을 들였다.",
  "sequoyah.achievement.3":
    "그는 체로키 부족이 자신들만의 문자 소통 수단을 가지고 언어를 보존할 수 있도록 하려는 명확한 목적을 가지고 이 음절문자를 추진했다. 완성된 체계는 이후 체로키 네이션의 공식 문자로 채택되었다.",
  "sequoyah.moment.1":
    "그는 음절문자를 개발하는 동안 자신이 속한 공동체 내부에서 주술을 부린다는 혐의를 받은 것으로 기록되어 있다 — 실제적인 사회적 위험이었음에도 그는 이 작업을 포기하지 않고 계속해 나갔다.",
  "sequoyah.moment.2":
    "그는 처음에 완전한 표어문자 체계를 시도했다가 실패한 뒤, 최종적으로 성공을 거둔 음절 방식으로 방향을 바꾸는 등 반복적인 시행착오를 거쳐 음절문자의 방법론을 완성해 나갔다.",
  "sequoyah.turning_point.1":
    "전해지는 바에 따르면 유럽인 정착민들이 문자를 사용하는 모습을 지켜본 뒤, 그는 체로키어를 위한 그 어떤 공식적인 제도적 노력도 존재하지 않던 시기에 문자 언어가 체로키 부족에게 가져다줄 수 있는 변혁적 가능성을 알아차렸다.",
  "sequoyah.interpretation.moment.2":
    "이는 그의 전체 생애에서 짐작할 수 있는 것보다 더 좁은 의미에서의 프로필의 적응력(adaptability) 점수를 보여준다 — 일반적인 유연함이 아니라, 실패로 드러난 특정 방법 하나를 스스로 수정한 사례다.",
  "sequoyah.interpretation.turning_point.1":
    "프로필의 기회 감지(opportunity_sensing) 점수는 바로 이 한 번의 관찰에서 비롯되며, 이는 체로키어를 위한 그 어떤 제도적 노력도 존재하기 전에 이루어진 것이다.",

  /* -------------------------------------------------- Batch 3: Sojourner Truth */
  "sojourner-truth.achievement.1":
    "1828년, 그는 불법으로 팔려간 아들을 되찾기 위해 백인 남성을 상대로 소송을 제기해 승소했다 — 당시 흑인 여성으로서는 극히 이례적인, 법정 기록으로 남은 구체적인 사건이다.",
  "sojourner-truth.achievement.2":
    "그는 수십 년에 걸쳐 노예제 폐지 운동과 여성 참정권 운동 진영에서 즉흥 연설을 요청받는 전국적인 연설가가 되었다. 여러 독립적인 목격담이 그의 뛰어난 웅변을 뒷받침하지만, 그의 가장 유명한 연설의 정확한 문구는 역사학자들 사이에서 별도로 논쟁의 대상이 되고 있다 — 여기서 기록으로 확인되는 것은 어느 한 편 논쟁적인 필사본이 아니라 그 지속적인 연설 활동 자체다.",
  "sojourner-truth.achievement.3":
    "그는 노예 해방이 이미 이루어지고도 수십 년이 지난 뒤, 80대에 이르러서도 순회 강연과 연설을 계속했다.",
  "sojourner-truth.moment.1":
    "1843년, 그는 이사벨라 바움프리라는 이름을 버리고 소저너 트루스로 스스로 개명했으며, 이 새 이름을 물려받은 정체성이 아니라 자신이 직접 선택한 영적·정치적 사명으로 명시적으로 규정했다.",
  "sojourner-truth.moment.2":
    "그는 자신의 초상 사진 명함을 '나는 실체를 지탱하기 위해 그림자를 판다'는 문구와 함께 판매했는데, 이는 자신의 활동 자금을 마련하기 위해 스스로 고안한, 기록으로 남은 방법이었다.",
  "sojourner-truth.turning_point.1":
    "1826년, 그는 뉴욕주의 점진적 노예해방법이 이듬해 발효되기를 기다리지 않고, 갓난 딸을 데리고 노예주를 떠나 자유를 찾아 나서기로 한 결정을 기록으로 남겼다.",
  "sojourner-truth.interpretation.moment.1":
    "새 이름을 선택하는 것과, 그것을 물려받은 것이 아니라 스스로 선택한 사명으로 명시적으로 규정한 것은 별개의 일이다 — 프로필의 독립적 사고(independent_thinking) 점수는 후자를 포착하고 있다.",
  "sojourner-truth.interpretation.turning_point.1":
    "프로필의 결단력(decisiveness) 점수는 이후 더 잘 알려진 공적 활동과는 별개로, 법이 따라잡기를 기다리지 않기로 한 이 하나의, 날짜가 분명한 선택에 근거를 두고 있다.",

  /* -------------------------------------------------- Batch 3: B. R. Ambedkar */
  "br-ambedkar.achievement.1":
    "그는 기초적인 교육 접근조차 심각하게 제한받던 카스트 출신이었음에도 컬럼비아 대학교와 런던 정치경제대학교에서 복수의 박사 학위를 취득했고, 이후 인도 헌법 초안을 작성한 위원회의 의장을 맡았다.",
  "br-ambedkar.achievement.2":
    "헌법 기초위원회 의장으로서 그는 기본권, 연방 구조, 사회 개혁 조항을 통합한 포괄적인 틀을 구축했으며, 이와 별개로 독립노동당과 지정카스트연맹을 비롯한 여러 정치·사회 조직을 창설했다.",
  "br-ambedkar.achievement.3":
    "그는 경제학(『루피 문제』를 비롯한 박사 논문), 법학(헌법 기초 작업), 그리고 사회·종교 개혁(불교 개종과 카스트에 관한 저술)에 걸쳐 실질적인 저작을 남겼다.",
  "br-ambedkar.moment.1":
    "그는 1927년 공공 용수 접근권을 요구하는 마하드 사티아그라하를 조직했고, 이후 항의의 뜻으로 마누법전을 공개적으로 불태웠다 — 그의 경력 전반에 걸쳐 카스트 제도의 제도적 옹호자들과 지속적으로 직접 맞선 사례들이다.",
  "br-ambedkar.moment.2":
    "그는 기초 교육에조차 심각한 제도적 장벽이 있던 카스트 출신이었음에도 컬럼비아 대학교와 런던 정치경제대학교라는 최고 수준의 국제 교육에 필요한 자금과 접근권을 확보했다.",
  "br-ambedkar.turning_point.1":
    "1932년 공동체별 선거구 배정을 둘러싼 논쟁에서, 암베드카르는 불가촉천민을 위한 별도 선거구 문제로 간디와 공개적으로 결정적인 결별을 했고, 결국 간디의 입장을 그대로 받아들이는 대신 푸나 협약을 이끌어냈다 — 이는 당대의 지배적인 민족주의 지도부와의 기록된 균열이었으며, 이후 그가 불가촉천민 권리를 대변하는 독자적인 정치 세력으로 자리매김하는 계기가 되었다.",
  "br-ambedkar.interpretation.moment.1":
    "프로필의 갈등 감내(conflict_tolerance) 점수는 여기서 단발적인 저항 행위 하나가 아니라, 구체적으로 특정할 수 있는 여러 사건에 걸쳐 반복된 전략을 나타낸다.",
  "br-ambedkar.interpretation.turning_point.1":
    "간디만큼의 위상을 지닌 인물과 대립하는 것은 그보다 낮은 위험 부담의 이견보다 프로필의 독립적 사고(independent_thinking) 점수에 더 무거운 증거가 된다.",

  /* -------------------------------------------------- Batch 3: K. Johnson */
  "katherine-johnson.achievement.1":
    "그는 앨런 셰퍼드의 1961년 비행 궤도를 수작업으로 계산했고, 존 글렌이 1962년 궤도 비행에 나서기 전 글렌 본인의 요청으로 그 궤도 계산을 직접 검증했다 — 실제 임무 결과와 직결된, 구체적으로 기록된 계산이다.",
  "katherine-johnson.achievement.2":
    "그는 미국항공자문위원회(NACA)와 NASA에서 1953년부터 1986년까지 33년에 걸친 경력을 이어가며, 인종 분리가 이루어지다가 점차 통합되어 간 직장 환경 속에서 머큐리, 아폴로, 스페이스 셔틀 계획을 모두 거쳤다.",
  "katherine-johnson.achievement.3":
    "그는 궤도 궤적을 계산하기 위한 새로운 해석 기하학 기법을 개척하여, 기존의 수학적 방법을 완전히 새로운 우주비행이라는 맥락에 맞게 응용했다.",
  "katherine-johnson.moment.1":
    "그는 초대받기를 기다리는 대신, 그동안 남성으로만 구성되었던 비행연구부의 편집 회의에 자신을 포함시켜 달라고 먼저 요청했다.",
  "katherine-johnson.moment.2":
    "그는 웨스트버지니아주의 인종 분리 학교 제도 속에서도 어릴 때부터 이어진 수학에 대한 관심을 바탕으로 빠르게 나아가, 14세에 고등학교를, 18세에 대학을 마쳤다.",
  "katherine-johnson.moment.3":
    "그는 NASA 경력 전반에 걸쳐 공식적인 팀 지도자 역할보다는 개인 기술 기여자로서의 활동이 주로 기록되어 있다 — 이는 그의 폭넓은 대중적 명성에서 짐작한 것이 아니라, 있는 그대로 구체적으로 낮게 매겨진 정직한 결과다.",
  "katherine-johnson.interpretation.moment.1":
    "프로필의 선제적 행동력(proactive_agency) 점수는 이 사례에서 거의 문자 그대로 들어맞는다 — 그는 그 자리에 초대받은 것이 아니라, 스스로 요청해 들어간 것이다.",

  /* -------------------------------------------------- Batch 3: Muhammad Ali */
  "muhammad-ali.achievement.1":
    "그는 조 프레이저와 조지 포먼을 포함한 최상위 라이벌들에게 어려운 상대를 피하지 않고 거듭 재대결을 청했던 3회 헤비급 챔피언이었으며, 3년 반의 출전 정지 이후에도 복싱계에 복귀해 타이틀을 두 차례 더 되찾았다.",
  "muhammad-ali.achievement.2":
    "그는 수십 년에 걸친 인터뷰와 기자회견 기록을 통해, 직접적이고 공개적이며 때로는 의도적으로 도발적인 자기 홍보와 경기 전 상대를 향한 심리전 전술로 폭넓게 기록되어 있다.",
  "muhammad-ali.achievement.3":
    "그는 경력 전반에 걸쳐 링 안에서의 스타일을 크게 바꾸었다 — 초기의 스피드 위주 복싱에서, 나이가 든 뒤 포먼을 상대할 때 사용한 '로프 어 도프' 전략으로의 변화는 복싱 역사 분석을 통해 기록되어 있다.",
  "muhammad-ali.moment.1":
    "그는 1964년 이슬람으로 개종하며 이름을 캐시어스 클레이에서 바꾸었고, 이후 병역 징집을 거부하는 입장을 취했다 — 두 가지 모두 당시 거의 만장일치에 가까웠던 여론과 언론의 비난에 정면으로 맞선 것이었다.",
  "muhammad-ali.moment.2":
    "그는 후반기 경력의 활동과 공개 발언들을 개인적인 복싱 유산이 아니라 더 폭넓은 시민권과 종교적 정체성의 문제로 명시적으로 규정했다.",
  "muhammad-ali.turning_point.1":
    "1967년, 그는 종교적 신념을 이유로 미군 징집을 공개적으로 거부했고, 그 결과 복싱 자격과 헤비급 타이틀을 박탈당했으며 훗날 뒤집힌 중범죄 유죄판결까지 받았다 — 이는 그의 운동 경력이 절정에 달했던 시점의 일이었다. 그는 입장을 번복하는 대신 여러 해에 걸친 법정 다툼과 전체 출전 정지 기간을 그대로 견뎌냈다.",
  "muhammad-ali.interpretation.moment.1":
    "당대의 지배적인 여론에 맞선, 시기가 분명한 두 차례의 공개적인 입장은 그중 하나만 있을 때보다 프로필의 독립적 사고(independent_thinking) 점수에 더 무거운 근거가 된다.",
  "muhammad-ali.interpretation.turning_point.1":
    "이는 편안한 태도가 아니라 실제로 치른, 시기가 분명한 대가다 — 전성기에 타이틀과 생계 수단을 잃은 것이야말로 프로필의 위험 감수(risk_tolerance) 점수가 실제로 반영하고 있는 대가다.",

  /* -------------------------------------------------- Batch 3: M. Wollstonecraft */
  "mary-wollstonecraft.achievement.1":
    "1792년 『여성의 권리 옹호』는 루소를 포함해 여성의 교육과 이성적 능력에 관한 당대 계몽주의의 지배적 통념에 정면으로 맞섰으며, 막연한 반론이 아니라 체계적이고 지속적인 철학적 반박을 구축했다.",
  "mary-wollstonecraft.achievement.2":
    "그는 자신의 학교를 세웠고, 이후에는 당시 여성에게는 통상적으로 열려 있지 않았던 길인 전업 작가 활동만으로 스스로 생계를 꾸렸다.",
  "mary-wollstonecraft.achievement.3":
    "그는 정치철학(『여성의 권리 옹호』), 기행문(『스웨덴에서 보낸 편지』), 소설, 교육 이론에 걸쳐 실질적인 저작을 남겼다.",
  "mary-wollstonecraft.moment.1":
    "그는 1792년 당시 여성에게는 과격하고 평판을 해칠 만한 것으로 널리 여겨지던 주장을 자신의 이름으로 공개적으로 출간했고, 그 시대 여성으로서는 이례적이고 낙인이 따르던 방식으로 결혼하지 않은 채 독립적으로, 스스로 생계를 꾸리며 살았다.",
  "mary-wollstonecraft.moment.2":
    "윌리엄 고드윈의 기록에 따르면, 『여성의 권리 옹호』는 집중적인 집필이 이어진 약 6주라는 짧고 강도 높은 기간 동안 쓰였다.",
  "mary-wollstonecraft.moment.3":
    "그의 공개적인 지적 입장은 당대에 상당한 비판을 불러일으켰고, 이 비판은 그의 사후 남편 윌리엄 고드윈이 펴낸 회고록이 그의 사생활에 관한 세부 사실을 공개하면서 오히려 더 거세졌으며, 이는 당대 많은 독자에게 충격을 안겼다.",
  "mary-wollstonecraft.interpretation.achievement.1":
    "프로필의 독립적 사고(independent_thinking) 점수가 여기서 포착하는 것은 막연한 불만이 아니라, 특정한 계몽주의 권위자들을 명시적으로 겨냥한 체계적인 반박이다.",
  "mary-wollstonecraft.interpretation.moment.3":
    "프로필의 갈등 감내(conflict_tolerance) 점수는 그가 살아서 맞설 수 있었던 압박뿐 아니라, 사후에 오히려 더 깊어진 비판까지도 함께 설명해야 한다.",

  /* -------------------------------------------------- Batch 4: F. Dostoevsky */
  "fyodor-dostoevsky.achievement.1":
    "그는 자신의 재정 위기와 해외에서의 도박 중독이 가장 심각했던 시기와 겹치는 동안, 어느 한쪽도 해결되기 전에 『죄와 벌』, 『백치』, 『악령』 등 자신의 가장 오래 남을 소설들을 집필했다.",
  "fyodor-dostoevsky.achievement.2":
    "그는 사십 년에 걸쳐 실제로 목격하거나 접한 사건들을 거듭 소설로 옮겼다 — 십대 시절 길에서 목격한 마부의 잔인한 행동은 훗날 두 편의 소설에 다시 등장했고, 재봉사의 자살을 다룬 신문 기사는 같은 발행 주기 안에 『온순한 여인』으로 완성되었으며, 1869년 급진 정치 집단 내부의 살인 사건은 『악령』이 되었다.",
  "fyodor-dostoevsky.moment.1":
    "출판 계약에 따라 약 한 달 안에 완전히 새로운 소설을 넘기지 못하면 향후 9년간 기존작과 신작 전체에 대한 권리를 잃게 될 위기에 처하자, 그는 속기사를 고용해 마감까지 『노름꾼』을 구술했고, 출판사 사무실이 문을 닫기 약 두 시간 전에 완성된 원고를 공증인에게 제출했다.",
  "fyodor-dostoevsky.moment.2":
    "그의 두 번째 아내 안나가 남긴 1867년 당시의 일기에는 신혼 초기의 반복되는 패턴이 기록되어 있다 — 식당의 형편없는 접대처럼 사소한 일에도 그는 '격렬하게 화를 냈'지만, 같은 날 안에 곧 화해가 이어졌다는, 그 모습을 매일 곁에서 지켜본 사람이 남긴 1인칭 기록이다.",
  "fyodor-dostoevsky.turning_point.1":
    "1849년 12월, 그는 눈가리개를 하고 기둥에 묶인 채 총살형 집행조 앞에 세워지는 모의 처형을 겪었다 — 마지막 순간의 사면은, 죄수들은 몰랐지만 이미 전날 의도적인 심리적 공포 조치로 결정되어 있던 것이었다. 몇 시간 뒤 형에게 쓴 편지에서 그는 절망이 아니라 오히려 더 강해진 삶에 대한 의지를 묘사했다 — '삶은 선물이다, 삶은 행복이다... 나는 다시 살고 있다!'",
  "fyodor-dostoevsky.turning_point.2":
    "1870년대 초부터 그는 계약 협상, 가격 책정, 출판 업무 등 실질적인 재정·사업 권한을 점차 안나에게 넘겼고, 1876년에는 그에게 '모든 것이 오직 당신 손에 달려 있다... 나는 당신의 판단을 매우 높이 평가하고 신뢰한다'고 편지에 썼다. 이는 그가 파산에 이르게 만들었던, 이전 십 년간 전적으로 혼자 재정을 결정하던 패턴을 뒤집는 변화였다.",
  "fyodor-dostoevsky.interpretation.achievement.1":
    "위기를 지나고 나서가 아니라 위기 한가운데서도 이어진 이 작업 패턴은 프로필의 높은 끈기(persistence) 점수와 부합한다.",
  "fyodor-dostoevsky.interpretation.moment.1":
    "이 하나의 구체적인 일화는 프로필의 높은 실행 속도(execution_speed) 점수를 뒷받침하는 가장 명확한 기록된 사례다.",
  "fyodor-dostoevsky.interpretation.turning_point.1":
    "훗날 조작된 공포극이었음이 밝혀지는 죽음 직전의 사건에 대한 이러한 반응은 프로필의 높은 입장 수정 성향(belief_updating) 및 적응력(adaptability) 점수와 부합한다 — 극단적이고 스스로 선택하지 않은 상황 앞에서 얼어붙는 대신 그것을 다시 해석해낸 것이다.",
  "fyodor-dostoevsky.interpretation.turning_point.2":
    "십 년간의 단독 결정이 파산으로 이어진 뒤 재정 통제권을 넘긴 이 사례는 프로필의 협업 성향(collaboration) 점수를 뒷받침하는 구체적인 기록 하나다.",

  /* ------------------------------------------------------ Batch 4: L. Pasteur */
  "louis-pasteur.achievement.1":
    "그는 현미경 아래에서 타르타르산염 결정의 거울상 형태를 미세한 비대칭 면을 근거로 하나하나 손으로 분리해내며 입체화학이라는 분야를 창시했다 — 한순간의 통찰이 아니라 유별나게 세심하고 반복적인 손작업 관찰에서 나온 발견이었다.",
  "louis-pasteur.achievement.2":
    "1857년부터 파스퇴르는 발효가 순수한 화학 작용이 아니라 살아있는 미생물에 의해 일어난다는 것을 입증했다 — 당시의 지배적 견해에 맞서 내세운 소수 의견이었다. 그는 이 발견을 확장해 자연발생설을 정면으로 반박했으며, 1864년 과학아카데미에서 펠릭스 푸셰와 벌인 논쟁에서 결정적으로 승리하여 미생물은 오직 다른 미생물로부터만 생겨난다는 것을 확립하는 데 기여했다 — 이는 근대 세균설과 미생물학의 토대가 된 원리다.",
  "louis-pasteur.achievement.3":
    "1881년 푸이유르포르에서 열린 널리 알려진 공개 현장 실험에서, 파스퇴르는 백신 접종이 가축을 탄저병으로부터 보호할 수 있음을 입증하여, 회의적이던 과학자들과 농업계 전반에 백신이 세균성 질병 일반에 효과가 있다는 확신을 심어주었다. 4년 뒤인 1885년 7월에는 아홉 살 소년 조제프 마이스터에게 실험적인 광견병 치료를 시행했는데 — 인간을 대상으로 한 최초의 성공적인 광견병 백신 접종이었다 — 이로 인해 치료를 요청하는 사람이 급증하면서 1887~88년 파스퇴르 연구소 설립으로 곧장 이어졌고, 이 연구소는 2014년까지 열 명의 노벨상 수상자를 배출했다.",
  "louis-pasteur.moment.1":
    "1881년 푸이유르포르에서 열린 탄저병 백신의 공개 현장 시험에서, 그는 세균설 자체를 거부하던 자신의 가장 강경한 비판자인 수의사를 시험의 감독 구조 자체에 의도적으로 끌어들여, 동물을 고르고 노출 과정을 감독하게 한 뒤, 모여든 정치인·언론인·농부들에게 평이하고 친근한 어조로 연설해 청중을 사로잡았다고 전해진다.",
  "louis-pasteur.turning_point.1":
    "그의 다섯 자녀 중 셋이 그의 생전에 장티푸스로 세상을 떠났으며, 여러 전기 작가들은 이 시기에 쌓인 슬픔과 과로를 1868년 그의 왼팔과 왼다리 일부를 영구히 마비시킨 뇌졸중과 연결 짓는다. 그 이후 그는 주로 신뢰하는 조수들을 통해 일했으며, 직접 실험을 수행하기보다 물리적인 실험실 작업을 지시하는 쪽으로 바뀌었다.",
  "louis-pasteur.turning_point.2":
    "개입하지 않으면 거의 확실히 광견병으로 죽을 것으로 여겨지던 한 소년 앞에서, 그는 — 의사 면허가 없어 실질적인 법적 위험을 안고 있었음에도 — 그전까지 동물에게만 실험되었던 치료법을 투여하기로 직접 결정했다. 그 자신의 표현에 따르면 이는 '격렬하고 고통스러운 불안이 없지 않았던' 결정이었다. 그가 가장 신뢰하던 협력자는 시기상조이며 부당하다고 여겨 처음에는 참여를 거부했고, 결국 면허를 가진 다른 의사가 실제로 주사를 놓았다.",
  "louis-pasteur.interpretation.turning_point.1":
    "직접 손을 쓰는 실험은 다른 이들에게 맡기면서도 연구 방향을 계속 이끌어간 것은 프로필의 적응력(adaptability) 점수와 부합한다 — 야망의 변화가 아니라 실질적인 작업 방식의 변화다.",
  "louis-pasteur.interpretation.turning_point.2":
    "자신의 협력자조차 처음에는 거부했고 그 자신도 불안을 인정했을 만큼 불확실성이 큰 상황에서 밀어붙인 이 결정은 프로필의 위험 감수(risk_tolerance) 점수를 뒷받침하는 가장 충분히 기록된 사례 중 하나다 — 단순한 자신감의 발로가 아니다.",
  "louis-pasteur.turning_point.3":
    "프랑스 정부의 요청으로 그는 사전 지식이 거의 없던 분야인 누에병 연구에 5년을 쏟았다 — 역사가들은 이 시기를 그를 화학자에서 생물학자로 바꾸어 놓은 '인식론적 단절'이라고 표현한다.",
  "louis-pasteur.complexities.1":
    "그 공개 시험에서 실제로 투여된 백신은 그가 공개적으로 암시했던, 안정적으로 작동하지 않던 방법이 아니라 그가 공개적으로 무시했던 경쟁자가 개발하고 자신의 조수가 개량한 화학적으로 비활성화한 제제였다. 그는 이 대체 사실을 함구하라고 지시했고, 이는 거의 한 세기가 지나 그의 개인 실험 노트가 공개되면서야 알려졌다.",

  /* ----------------------------------------------------- Batch 4: L. Armstrong */
  "louis-armstrong.achievement.1":
    "시카고로 돌아온 그는 자신의 이름을 내건 핫 파이브, 이후 핫 세븐을 결성했다 — 옛 스승의 악단에서 여러 연주자를 직접 데려왔고, 이 시기의 녹음들은 그를 독자적인 밴드리더로 자리매김하게 했다.",
  "louis-armstrong.achievement.2":
    "1920년대 중후반, 자신의 이름으로 발표한 음반 — 핫 파이브와 핫 세븐 세션 — 에서 선보인 즉흥 솔로 연주는 재즈를 앙상블 중심 음악에서 즉흥 연주자 개인을 중심에 두는 장르로 바꾸어 놓았다는 평가를 받는다. 전기 작가 테리 티치아웃은 그가 '재즈맨은 곧 솔로이스트라는 발상을 사실상 만들어냈다'고 썼다. 같은 시기에 그는 스캣 창법 — 가사 없이 목소리로 즉흥 연주를 하는 기법 — 을 발전시키고 널리 알리는 데에도 기여했으며, 이는 이후 재즈 보컬의 지속적인 기법으로 자리 잡았다.",
  "louis-armstrong.moment.1":
    "1912년 새해 전야에 공중에 권총을 발사한 혐의로 체포된 열한 살의 암스트롱은 흑인 고아 소년의 집으로 보내졌고, 그곳 교관에게서 제대로 된 코넷 연주법을 배워 1914년 석방되기 전까지 그 시설의 브라스 밴드를 이끄는 자리까지 올랐다.",
  "louis-armstrong.moment.2":
    "평소 정치적 발언을 극도로 자제하던 태도에서 크게 벗어나, 그는 1957년 리틀록 흑백통합 위기에 대한 연방 정부의 대응을 기자에게 직접 신랄하게 비판하며 대통령을 '이중적'이고 '배짱이 없다'고 표현했다 — 이후 그의 매니저가 공개적으로 그가 그 발언을 '후회한다'는 취지로 말하자, 암스트롱은 즉시 그 표현을 부인하며 자신의 입장을 재차 확인했다.",
  "louis-armstrong.moment.3":
    "그는 오십 년에 걸쳐 출판사나 대필 작가 없이 스스로 자신의 삶을 기록하는 작업을 이어갔다 — 약 650개의 릴테이프, 5,000장의 사진, 1926년부터 모아 온 86권의 스크랩북, 그리고 자신이 직접 그린 콜라주 작품이 담긴 손수 주석을 단 믹스테이프들이다.",
  "louis-armstrong.turning_point.1":
    "1924년 그는 훈련받은 음악가였던 피아니스트 릴 하딘과 결혼했고, 그는 언제까지나 조연으로 남기보다 스승 조 올리버의 그늘에서 벗어나라고 그를 독려했다. 이듬해 그는 플레처 헨더슨의 뉴욕 오케스트라에 합류했지만 만족스럽지 못했던 한 해를 보내고 시카고로 돌아왔다 — 이때부터 그는 남의 이름이 아닌 자기 이름으로 경력을 쌓기 시작했다.",
  "louis-armstrong.interpretation.moment.2":
    "평소 신중하게 지켜오던 이미지에서 벗어난 이 드문 공개 발언을, 이후 철회하지 않고 오히려 재확인한 것은 프로필의 위험 감수(risk_tolerance) 점수와 부합한다.",
  "louis-armstrong.interpretation.turning_point.1":
    "안정적이고 자리 잡힌 위치를 떠나 자신의 이름으로 쌓아가는 경력을 선택한 것은 프로필의 자율성 욕구(autonomy_need)와 선제적 행동력(proactive_agency) 점수를 뒷받침하는 구체적인 기록 하나다.",

  /* -------------------------------------------------------- Batch 4: A. Morita */
  "akio-morita.achievement.1":
    "1953년 그는 여전히 작은 규모였던 회사를 걸고 웨스턴 일렉트릭으로부터 트랜지스터 기술의 크고 사실상 회수 불가능한 라이선스 비용을 지불하기로 결정했다 — 당시 업계 전반은 트랜지스터가 그가 만들고자 했던 소비자 가전보다는 주로 보청기에나 어울린다고 여기던 시기였다.",
  "akio-morita.achievement.2":
    "1979년 그는 사내 거의 만장일치의 반대를 무릅쓰고 워크맨 프로젝트를 밀어붙였다 — 시장 조사는 실패를 예측했고, 영업 부서는 달성 불가능한 판매 목표를 제시했으며, 마케팅 부서는 제품명이 민망하다고 했다 — 그리고 그는 소니 이사회에 이 제품이 실패하면 사임하겠다고 직접 말했다.",
  "akio-morita.moment.1":
    "새로 나온 포켓형 트랜지스터 라디오(1957년)가 일반 셔츠 주머니에 넣기에는 조금 컸을 때, 그는 영업 직원들에게 시연 시 주머니를 크게 만든 특별 맞춤 셔츠를 입게 했다 — 그렇게 하면 구매자들 눈에 제품이 실제로 주머니에 들어가는 크기로 보이도록 하기 위해서였다.",
  "akio-morita.moment.2":
    "젊은 음악가 오가 노리오가 회사 녹음기의 형편없는 음질을 정확한 거울이 필요한 무용수에 빗대어 신랄하게 비판하는 편지를 보내오자, 모리타는 그 비판을 무시하는 대신 오가를 유급 컨설턴트로 영입했다 — 오가는 훗날 소니의 CEO이자 회장이 되었다.",
  "akio-morita.moment.3":
    "일본 통상산업성이 트랜지스터 라이선스 비용 지불에 필요한 외화 반출 승인을 약 6개월간 지연시키자, 그는 훗날 이 일에서 분명한 교훈을 끌어냈다 — '정부는 과도한 개입으로 혁신적인 변화와 발전을 가로막는 경우가 많다.'",
  "akio-morita.turning_point.1":
    "1960년부터 그는 기존의 미국 브랜드 이름으로 제품을 유통하자는 제안을 거절하고 해외에서 독자적인 정체성을 구축하겠다고 고집했으며, 시장을 직접 파악하기 위해 아내와 자녀들과 함께 미국으로 이주했다 — 미국 사업이 주요한 수익원이 되기까지 약 십 년간의 적자를 감내한 끝의 결정이었다.",
  "akio-morita.interpretation.achievement.2":
    "주변 거의 모두가 의심하던 제품을 두고 이사회에 사임까지 걸겠다고 말한 것은 프로필의 높은 결단력(decisiveness) 및 위험 감수(risk_tolerance) 점수와 부합한다.",
  "akio-morita.interpretation.turning_point.1":
    "검증된 기존 브랜드 대신 검증되지 않은 독자적인 정체성을 선택하고, 이를 남에게 맡기지 않고 직접 이주해 시장을 익힌 것은 프로필의 위험 감수(risk_tolerance)와 적응력(adaptability) 점수를 뒷받침하는 비교적 뚜렷한 기록 중 하나다.",

  /* ------------------------------------------------------ Batch 4: O. Niemeyer */
  "oscar-niemeyer.achievement.1":
    "그는 대통령궁, 국회의사당, 대성당, 대법원을 포함한 브라질리아의 정부·행정 중심부 전체를 4년 만에 설계하고 완성했다 — 쿠비체크 대통령이 니에마이어의 자택으로 직접 찾아와 부탁한 뒤, 그의 옛 스승 루시우 코스타와 함께 작업한 결과였다.",
  "oscar-niemeyer.achievement.2":
    "브라질에서 망명해 지낸 20년 동안, 그는 프랑스·알제리·이탈리아·포르투갈·레바논에 걸쳐 국제적으로 분산된 설계 실무를 이어갔다 — 현장을 한 번도 방문하지 않고 우편만으로 완성한 미국 내 두 건의 의뢰를 포함해서였다 — 동시에 딸 안나 마리아와 함께 가구 디자인 작업도 함께했다.",
  "oscar-niemeyer.moment.1":
    "91세에 그는 영국 왕립건축가협회의 로열 골드 메달을 수상했지만 직접 런던을 방문해 상을 받지는 않았다 — 실제 비행 공포증 때문이었다고 전해지며, 원격·국제 의뢰 위주로 쌓아온 경력과는 대조되는 구체적인 개인적 한계였다.",
  "oscar-niemeyer.moment.2":
    "101세에, 그의 특유의 곡선이 여성의 몸을 형상화한 것이 아니냐는 — 그의 가구 디자인 보도에서도 되풀이되었고 자연에서 곡선의 언어를 끌어온다는 그 자신의 회고록과도 맞닿아 있던 — 질문을 직접 받자, 그는 딱 잘라 부인했다 — '형태는 아무것도 아닌 데서 나온다.'",
  "oscar-niemeyer.moment.3":
    "100세를 눈앞에 두고도 그는 자신의 계속되는 작업을 과장 없이 담담하게 표현했다 — '나는 그저 내 일을 했을 뿐이다... 내가 좋아하는 일들을 하려고 했을 뿐이다' — 여전히 매일 아침 계단을 올라 자신의 펜트하우스 사무실에서 하루 종일 일했고, 101세에도 은퇴를 실제 선택지로 여기지 않은 채 언론 미팅과 설계 작업이라는 고정된 일과를 지켰다.",
  "oscar-niemeyer.turning_point.1":
    "1964년 군사 쿠데타 이후 그의 사무실은 급습당했고 의뢰인들은 자취를 감췄다. 이듬해 그는 브라질리아 대학교 교수 약 200명과 함께 대학에 대한 정부의 처우에 항의하며 집단으로 사직했다. 한 정부 각료가 '공산주의 건축가가 있을 곳은 모스크바'라고 말했다고 전해질 만큼 직접적인 직업적 박해에 직면하자, 그는 자신의 정치적 입장을 누그러뜨려 브라질에 남는 대신 1965년 프랑스로 망명을 택했다.",
  "oscar-niemeyer.interpretation.turning_point.1":
    "경력을 지키기 위해 정치적 신념을 저버리는 대신 망명과 의뢰 상실을 감수한 것은 프로필의 독립적 사고(independent_thinking)와 위험 감수(risk_tolerance) 점수와 부합한다.",

  /* --------------------------------------------------- Batch 4: A.S. Suu Kyi */
  /* Profile V2 pilot (2026-08), Complexities pilot: see the EN block's comment
     for what changed and why -- old turning_point.2 moved to complexities.1
     (facts unchanged), its forced-symmetry interpretation dropped rather than
     kept, achievement.2 (2015 election / State Counsellor role) new. */
  "aung-san-suu-kyi.achievement.1":
    "1990년, 그가 공동 창당하고 이끌던 민족민주동맹은 그가 가택연금 상태로 선거운동을 할 수 없었음에도 압도적인 선거 승리를 거두었지만, 집권 군사정권은 그 결과를 인정하거나 권력을 이양하기를 거부했다. 이듬해 그는 1991년 노벨평화상을 수상했으나 여전히 직접 시상식에 참석할 수 없었고, 약 130만 달러에 이르는 상금 전액을 자신이 갖는 대신 버마 국민을 위한 보건·교육 신탁기금에 넣었다.",
  "aung-san-suu-kyi.achievement.2":
    "2015년 11월, 그는 민족민주동맹을 압도적인 선거 승리로 이끌며 군부 지배가 이어진 지 50여 년 만에 처음으로 자신의 정당이 이끄는 정부를 미얀마에 세웠다. 아들들이 외국 국적을 가지고 있다는 이유로 그를 겨냥해 만들어진 헌법 조항 때문에 대통령직에 오를 수 없었던 그는, 새로 만들어진 국가고문직을 맡아 실질적으로 정부를 이끌었다.",
  "aung-san-suu-kyi.moment.1":
    "그의 아버지이자 독립운동 지도자였던 아웅 산은 그가 두 살 때 정적들에게 암살당했고, 그는 아버지의 사후 명성 속에서 성장했으며 그의 어머니 역시 인도·네팔 주재 버마 대사를 지내며 독자적으로 저명한 공적 인물이 되었다. 그는 자신의 에세이 「두려움으로부터의 자유」에서 아버지가 지녔던 자세 — '진실을 말하고, 자신의 말에 책임을 지고, 비판을 받아들이고, 자신의 잘못을 인정하고, 실수를 바로잡고, 반대편을 존중하는' 태도 — 를 훗날 두려움에 맞서는 자신의 본보기로 꼽았다.",
  "aung-san-suu-kyi.moment.2":
    "1989년부터 2010년까지 가택연금 상태로 보낸 21년 가운데 약 15년 동안, 그는 새벽 명상과 폭넓은 독서 — 간디·네루·만델라의 전기를 포함해서 — 그리고 집안일로 이루어진 규칙적인 생활을 유지했으며, 대부분의 기간 동안 전화도 컴퓨터도 인터넷도 없이 BBC 라디오 방송으로만 바깥소식을 접했다. 연금 초기에는 정기적으로 피아노를 연주했다고 — 주로 모차르트를 — 전해지지만, 버마의 습도가 악기를 영구히 뒤틀리게 하면서 이를 그만두었다.",
  "aung-san-suu-kyi.turning_point.1":
    "그는 1988년 3월, 뇌졸중을 앓은 어머니를 간병하려는 목적만으로 버마에 돌아왔으며 당시에는 어떤 정치적 의도도 밝히지 않았다. 그러나 여섯 달 만에 그는 슈웨다곤 파고다에서 약 50만 명이 모인 집회에서 민주정부를 촉구하는 연설을 했고, 훗날 이 변화를 자신의 말로 이렇게 설명했다 — '아버지의 딸로서 나는 벌어지고 있는 그 모든 일에 무관심할 수 없었다.'",
  "aung-san-suu-kyi.interpretation.turning_point.1":
    "수년 뒤 그 자신의 말로 전해진 이 설명은 프로필의 선제적 행동력(proactive_agency) 점수와 부합한다 — 오랜 사전 계획이 아니라 상황에 떠밀려, 사적이고 문학적인 삶에서 국가적 정치 지도자로 몇 달 만에 바뀌었다고 스스로 말한 변화다.",
  "aung-san-suu-kyi.complexities.1":
    "2016년부터 국가고문으로서 그는 미얀마의 민간정부를 이끌었으며, 이 재임 기간인 2017년 라카인주에서 로힝야 공동체를 겨냥한 군사 작전이 벌어졌다. 유엔 독립 국제 진상조사단은 훗날 미얀마 군 최고 지휘부를 집단학살 혐의로 기소할 만한 '집단학살 의도'의 증거가 충분하다고 결론지었으며, 대규모 살해와 집단 강간, 수백 개 마을의 방화를 문서화했다. 그의 정부는 이 시기 군의 행위를 공개적으로 비판하지 않았다. 2019년 12월 그는 국제사법재판소에서 미얀마를 직접 대표해, 자국이 '내부 무력 충돌'을 겪고 있었고 군은 이에 '대응'한 것이라며, 이를 민간인을 겨냥한 작전이 아니라고 자신의 말로 주장했다. 2021년 2월, 바로 그 군부는 그의 정당의 재선을 무효로 하는 쿠데타를 일으켜 그를 체포했으며, 이 글을 쓰는 현재까지도 그는 군의 구금 상태에 있다.",
  "aung-san-suu-kyi.life_arc.1": "영국령 버마 랑군에서 태어났다. 독립운동 지도자였던 아버지 아웅 산은 그가 두 살 때 암살당했다.",
  "aung-san-suu-kyi.life_arc.2": "어머니를 간병하러 버마로 돌아왔다가, 몇 달 만에 민주화 운동의 구심점이 되었다.",
  "aung-san-suu-kyi.life_arc.3": "군사정부에 의해 21년 중 대부분을 가택연금 상태로 보냈다.",
  "aung-san-suu-kyi.life_arc.4": "노벨평화상을 수상했으나 직접 시상식에 참석하지는 못했다.",
  "aung-san-suu-kyi.life_arc.5": "정당을 압도적 승리로 이끌며 미얀마의 사실상 민간정부 수반인 국가고문이 되었다.",
  "aung-san-suu-kyi.life_arc.6": "정당의 재선을 무효로 한 군사 쿠데타로 체포되어, 이 글을 쓰는 현재까지 구금 상태에 있다.",
  "aung-san-suu-kyi.legacy":
    "아웅산 수치는 20세기 후반 군사 통치에 대한 비폭력 저항의 가장 널리 알려진 상징 가운데 한 명이 되었으며, 그가 가택연금 상태로 보낸 수십 년은 미얀마 민주화 운동에 국제사회의 지속적인 관심을 불러일으켰다. 이후 미얀마 민간정부 수반으로서의 행적, 특히 2017년 로힝야 위기에 대한 정부의 대응은 훨씬 더 비판적으로 평가받고 있으며, 그는 2021년 쿠데타 이후 이 글을 쓰는 현재까지도 군의 구금 상태에 있다.",

  /* --------------------------------------------------- Batch 4: L. Wittgenstein */
  "ludwig-wittgenstein.achievement.1":
    "그는 1921년 『논리철학논고』를 출간한 뒤 철학의 근본 문제들이 '해결되었다'고 선언하고 약 10년간 학계 철학을 떠났다 — 오스트리아 시골에서 초등학교 교사로, 이후에는 건축가로 일했다 — 그리고 자신의 이전 결론에 만족하지 못하게 되어서야 돌아왔다.",
  "ludwig-wittgenstein.achievement.2":
    "사후에 출간된 『철학적 탐구』의 서문에서 그는 이 후기 저작을 『논리철학논고』와 함께 읽어야 한다고 밝혔는데, 그 이유는 이 저작이 자신의 이전 사고에 있던 '중대한 오류'를 바로잡았기 때문이라고 명시했다 — 한 철학자가 자신의 이전 주요 저작을 공개적으로 실질적으로 뒤엎은 사례다.",
  "ludwig-wittgenstein.moment.1":
    "그는 오스트리아에서 손꼽히는 부유한 가문 출신이었음에도 자신의 상속 재산 전부를 포기하고 사실상 아무런 경제적 안전망 없이 금욕적인 삶을 살았다 — 이는 검소함에 대한 막연한 평판이 아니라 구체적으로 기록된 행위다.",
  "ludwig-wittgenstein.moment.2":
    "버트런드 러셀을 포함한 학생과 동료들은 그가 철학적 작업을 할 때 강렬하고 지속적으로 집중했다고 기록했으며, 하나의 문제를 풀어내는 동안 몇 시간이고 서성거렸다고 전해진다.",
  "ludwig-wittgenstein.turning_point.1":
    "제1차 세계대전 직후 그는 오스트리아 시골 초등학교 교사로서 6년간의 고된 근무를 이어갔다 — 이전의 학문적 지위와 가문의 부와는 거리가 먼 역할이자 사회적 위치였다 — 그의 전기는 이를 군인, 초등학교 교사, 건축가, 전시 병원 잡역부, 그리고 다시 돌아온 철학자에 이르기까지 그가 스스로 '온전한 자기 표현의 의무'라 부른 것을 여러 힘든 역할을 통해 꾸준히 추구한 과정의 일부로 설명한다.",
  "ludwig-wittgenstein.interpretation.achievement.2":
    "이는 이 데이터셋 전체에서도 손꼽히게 직접적이고 스스로 기록한 입장 수정 성향(belief_updating)의 사례다 — 사적인 재고가 아니라, 자신의 이전 저작의 오류를 공개적으로 명시한 선언이었다.",
  "ludwig-wittgenstein.interpretation.turning_point.1":
    "각 역할을 온전히 헌신해 완수하고 중도에 그만두지 않았다는 이 흐름은 그의 전기가 다루는 핵심 논지이며, 프로필의 끈기(persistence) 점수와 부합한다.",

  /* -------------------------------------------------------- Batch 4: T. Edison */
  "thomas-edison.achievement.1":
    "그는 실용적인 백열전구뿐 아니라 이를 실제로 사용 가능하게 만드는 데 필요한 발전·송전 체계 전체 — 펄 스트리트 발전소 — 까지 구축했다 — 단일 장치를 넘어선, 진정한 의미의 시스템적 성취로 기록되어 있다.",
  "thomas-edison.achievement.2":
    "그는 멘로파크를 최초의 조직화된 산업 연구소 중 하나로 세우고, 개인의 즉흥적인 땜질이 아니라 체계적이고 자원이 뒷받침되는 팀 작업으로 발명을 구조화했다 — 이 연구소는 대략 열흘에 하나꼴로 소소한 발명을, 몇 달마다 하나씩 큰 발명을 내놓는다는 목표를 스스로 세웠다고 전해진다.",
  "thomas-edison.moment.1":
    "그의 실험 노트는 수천 페이지 분량으로 남아 있으며, 상업적으로 쓸 만한 설계에 도달하기까지 이례적으로 많은 필라멘트 재료를 체계적으로 시험한 과정을 기록하고 있다 — 하나의 일화가 아니라 여러 독립적인 전기 자료를 통해 뒷받침되는 기록이다.",
  "thomas-edison.moment.2":
    "그는 웨스팅하우스와 니콜라 테슬라의 경쟁 교류 전력 체계를 겨냥해 '전류 전쟁'이라 불리는 지속적인 공개 캠페인을 벌였는데, 여기에는 교류의 안전성을 깎아내리기 위해 동물을 대상으로 한 공개 감전사 시연에 자금을 댄 일도 포함되어 있다 — 상업적 동기가 얽힌 분쟁 속에서도 대부분의 역사적 평가가 윤리적으로 문제 삼는, 잘 기록된 전술이다.",
  "thomas-edison.moment.3":
    "그는 훗날 실패로 끝난 사업, 특히 상당한 개인적 손실을 남긴 철광석 채굴 사업에 개인적으로 큰돈을 투자했다. 여러 역사가는 또한 그의 이름으로만 등록된 여러 특허가 루이스 라티머와 프랜시스 젤 등 직원들의 상당한, 그러나 제대로 인정받지 못한 기여를 포함하고 있다고 기록한다 — 그가 직접 공들여 구축한 언론 관계와 대중적 이미지인 '멘로파크의 마법사'라는 단일한 상과는 다른, 더 복잡한 그림이다.",
  "thomas-edison.interpretation.achievement.2":
    "발명을 목표를 갖춘 관리된 과정으로 다룬 이 조직적 선택은 프로필의 높은 계획 지향(planning_orientation) 및 시스템적 사고(systems_abstraction) 점수와 부합하며, 흔히 떠올리는 '홀로 땜질하는 발명가'라는 이미지와는 구별된다.",

  /* ---------------------------------------------------- Batch 4: Michelangelo */
  "michelangelo.achievement.1":
    "거의 70년에 이르는 작업 인생 동안 그는 조각(다비드, 피에타), 회화(시스티나 성당 천장화와 최후의 심판), 건축(성 베드로 대성당의 돔, 라우렌치아나 도서관), 그리고 시에 이르기까지 폭넓은 분야에서 뛰어난 성과를 지속적으로 남겼다 — 단순히 여러 분야를 조금씩 건드린 것이 아니라, 서로 확연히 다른 분야에 걸친 범위임을 이례적으로 잘 뒷받침하는 사례다.",
  "michelangelo.achievement.2":
    "화가이자 조각가로서의 명성이 확고히 자리 잡은 지 수십 년이 지난 70대에, 그는 성 베드로 대성당의 수석 건축가 역할을 맡아 돔을 포함한 구조 설계를 근본적으로 다시 그렸다 — 이미 숙달한 분야에 머무르지 않고 만년에 상당히 다른 분야로 옮겨 간 사례다.",
  "michelangelo.moment.1":
    "미켈란젤로가 살아 있을 때 그의 직접적인 검토를 거쳐 집필되고 개정된 조르조 바사리의 전기에 따르면, 시스티나 천장화 작업을 포함한 집중적인 작업 기간 동안 그는 작업을 중단하지 않으려고 옷과 장화를 신은 채로 오랫동안 잠들곤 했다.",
  "michelangelo.moment.2":
    "바사리의 전기는 또한 미켈란젤로가 주요 의뢰작 — 두 점 이상의 피에타와 무덤 조각을 포함해 — 을 거듭 중단하고 다시 시작하며, 자신이 판단하기에 미흡하다고 여긴 결과물을 내놓기보다 오직 스스로 납득할 수 있는 수준에 이를 때까지 다시 손보았다는 사실을 기록하고 있다.",
  "michelangelo.turning_point.1":
    "1506년, 교황 율리우스 2세의 무덤 조성 의뢰에 대한 대금 지급을 둘러싼 분쟁 끝에 미켈란젤로는 허락 없이 로마를 떠났다 — 그 시대 최고 권력자를 상대로 한 극도로 위험한 행동이었다 — 그리고 직접적인 협상을 거친 뒤에야 관계를 회복하고 돌아왔다.",
  "michelangelo.interpretation.moment.2":
    "이는 프로필의 완벽주의(perfectionism) 점수를 뒷받침하는, 사후에 추정된 일반적 평판이 아니라 구체적으로 이름 붙여진 기록된 패턴이다.",
  "michelangelo.interpretation.turning_point.1":
    "분쟁을 조용히 받아들이는 대신 그 시대 최고 권력자와 직접 맞선 것은 프로필의 위험 감수(risk_tolerance) 및 자율성 욕구(autonomy_need) 점수와 부합한다.",

  /* ------------------------------------------------------- Batch 4: Malcolm X */
  "malcolm-x.achievement.1":
    "출소한 지 약 십 년 만에 그는 미국 민권운동 시대의 가장 저명하고 널리 방송된 대중 연설가 중 한 명이 되었으며, 이는 지금까지 남아 있는 방대한 영상 자료·연설 기록·언론 보도를 통해 확인된다.",
  "malcolm-x.achievement.2":
    "생애 마지막 해에 네이션 오브 이슬람과 공개적으로 결별한 뒤, 그는 무슬림 모스크 주식회사와 아프리카계 미국인 통합 기구라는 두 새로운 조직을 설립했다 — 공적 활동에서 물러나는 대신 자신의 조직 활동을 사실상 처음부터 다시 쌓아 올린 것이다.",
  "malcolm-x.moment.1":
    "그의 자서전은 강도 높고 스스로 이끈 옥중 학습 프로그램을 기록하고 있다 — 그는 오랜 기간에 걸쳐 사전을 손으로 체계적으로 베껴 썼으며, 이 노력이 이후 자신의 지적 성장에 직접적인 밑거름이 되었다고 밝혔다.",
  "malcolm-x.moment.2":
    "그는 1965년 2월 암살당하기 몇 주 전, 자신의 집이 폭탄 공격을 받고 신빙성 있는 살해 위협을 받은 뒤에도 대중 연설과 조직 활동을 계속했다 — 알려진 극심한 신변 위협 속에서도 공적 활동에서 물러나지 않고 이어간, 기록으로 확인되는 패턴이다.",
  "malcolm-x.turning_point.1":
    "1964년 메카 순례 이후 그는 자신의 세계관을 공개적으로 실질적으로 수정했으며, 네이션 오브 이슬람의 분리주의 신학에서 벗어나 더 폭넓은 정통 이슬람 및 범아프리카주의 틀로 나아갔다 — 이는 다른 사람이 전한 이야기가 아니라, 자신의 이전 가정과 어긋난 직접적인 경험에 대한 반응으로 그 자신이 자서전에서 상세히 서술한 변화였다.",
  "malcolm-x.interpretation.moment.1":
    "이 지속적이고 스스로 부과한 학습 프로그램은 프로필의 몰입(deep_focus) 및 자기 규율(discipline) 점수를 뒷받침하는, 본인이 직접 서술한 구체적인 증거다.",
  "malcolm-x.interpretation.turning_point.1":
    "이는 이 데이터셋 안에서도 손꼽히게 폭넓게 스스로 기록된 입장 수정 성향(belief_updating)의 사례다 — 타인이 규정한 특징이 아니라, 직접적인 경험 이후 깊이 지녔던 공적 입장을 수정한 과정을 1인칭으로 서술한 기록이다.",

  /* --------------------------------------------------- Batch 5: Wilbur Wright */
  "wilbur-wright.achievement.1":
    "1900년부터 1903년까지 윌버와 동생 오빌은 키티호크에서 단계적이고 체계적인 연구 프로그램을 진행했다 — 기존에 발표된 양력 데이터가 신뢰할 수 없다는 것을 발견한 뒤 직접 풍동을 만들었고, 동력 비행을 시도하기 전 여러 시즌에 걸쳐 무동력 글라이더를 시험했으며, 1903년 12월 최초의 지속적이고 조종 가능한 동력 비행으로 이어졌다.",
  "wilbur-wright.achievement.2":
    "피치, 롤, 요를 아우르는 삼축 조종 시스템 — 롤을 위한 날개 뒤틀림과 요를 위한 가동식 방향타를 결합한 방식 — 은 당대 다른 항공 발명가들이 풀지 못했던 비행 제어 문제에 대한 진정으로 독창적인 공학적 해법이었으며, 특허 기록과 이후 항공사 연구를 통해 뒷받침된다.",
  "wilbur-wright.moment.1":
    "자신들의 글라이더 시험 결과가 오토 릴리엔탈이 이전에 발표한 공기역학 양력 표와 맞지 않자, 라이트 형제는 자신들의 시험이 잘못되었다고 가정하는 대신 발표된 데이터 자체가 틀렸다고 결론지었고, 더 신뢰할 수 있는 수치를 얻기 위해 직접 풍동을 제작했다.",
  "wilbur-wright.moment.2":
    "첫 성공적인 비행 이후 몇 년 동안 윌버와 오빌은 의도적으로 공개 시연이나 언론 노출을 피했으며, 아직 특허를 받지 못한 발명품의 보호를 대중적 인정보다 우선시했다 — 짧은 기간의 조심스러움이 아니라, 기록으로 확인되는 지속적인 선택이었다.",
  "wilbur-wright.moment.3":
    "발명품이 공개된 이후 몇 년 동안 라이트 형제는 글렌 커티스를 포함한 경쟁 항공 개발자들을 상대로 수년간의 공격적인 특허 소송을 벌였다 — 자신들의 발명을 보호한 기록된 패턴이지만, 일부 항공사 연구자들은 이후 수십 년간 미국 항공 산업 전반의 발전을 늦추는 데도 일조했다고 평가한다.",
  "wilbur-wright.turning_point.1":
    "발명품을 대중의 시야로부터 여러 해 동안 지켜온 뒤, 윌버는 1908년 프랑스에서 공개 시연 비행을 조직해 그동안 비행 주장을 의심해 온 회의적인 언론과 정부 관찰자들을 직접적이고 성공적으로 설득했다 — 오랜 비밀 유지에서 공개적 증명으로의 의도적인 전환이었지, 외부 압력에 의해 강요된 변화가 아니었다.",
  "wilbur-wright.interpretation.moment.1":
    "확립된 권위자가 발표한 수치보다 직접 얻은 시험 결과를 신뢰하고, 이를 확인할 도구를 직접 만든 것은 프로필의 독립적 사고(independent_thinking) 및 자원 활용 성향(resourcefulness) 점수와 부합한다.",
  "wilbur-wright.interpretation.turning_point.1":
    "여러 해에 걸친 자발적인 비밀 유지를 언제 끝낼지 스스로 선택한 것은, 외부에 의해 공개로 떠밀린 것이 아니라는 점에서 프로필의 설득력(persuasiveness) 점수와 부합한다 — 성격의 변화가 아니라 전략적 결정이다.",

  /* ---------------------------------------------- Batch 5: Nicolaus Copernicus */
  "nicolaus-copernicus.achievement.1":
    "코페르니쿠스는 『천구의 회전에 관하여』에서 천 년 넘게 이어져 온 지구 중심 모델을 대체할, 완전하고 내적으로 일관된 태양 중심 모델을 구축했으며, 태양을 중심으로 한 태양계에 대한 상세한 수학적·기하학적 논증을 텍스트 안에 직접 전개했다.",
  "nicolaus-copernicus.achievement.2":
    "천문학 연구와 더불어 코페르니쿠스는 화폐 가치 하락에 관한 논고를 저술했고, 1522년 그라우덴츠 의회에 직접 통화 개혁안을 제출했다 — 부수적인 여가 활동이 아니라, 기록으로 확인되는 진정한 두 번째 분야에서의 기여였다.",
  "nicolaus-copernicus.moment.1":
    "1520~1521년 폴란드-튜튼 기사단 전쟁 중, 코페르니쿠스는 알렌슈타인 성의 방어를 직접 조직했다 — 성직자이자 천문학자가 자신의 학문적·성직 업무와는 전혀 다른 군사 방어를 직접 맡은 사례로, 매쿠터 수학사 아카이브를 통해 기록되어 있다.",
  "nicolaus-copernicus.moment.2":
    "코페르니쿠스는 1514년 무렵 태양 중심 모델의 핵심 수학을 완성했지만 거의 삼십 년 가까이 출판을 허락하지 않았다. 훗날 출판을 성사시키는 데 도움을 준 수학자 게오르크 요아힘 레티쿠스는 자신의 서신에서 코페르니쿠스의 태도를 '자신의 저작 출판을 미루려는 오랜 망설임'이라고 묘사했다(깅거리치).",
  "nicolaus-copernicus.turning_point.1":
    "결국 레티쿠스의 설득으로, 코페르니쿠스는 생의 마지막 몇 주 동안 『천구의 회전에 관하여』의 출판을 허락했다 — 수십 년간 사적으로 다듬어져 온 모델이 거의 하룻밤 사이에, 저자 본인이 이를 옹호하거나 더 발전시킬 기회도 없이 다음 세기 천문학을 뒤바꿀 텍스트가 되었다.",
  "nicolaus-copernicus.interpretation.moment.1":
    "이 기록된 일화는 그의 후대 천문학적 명성이 아니라, 프로필의 선제적 행동력(proactive_agency) 점수를 뒷받침하는 구체적인 근거다.",
  "nicolaus-copernicus.interpretation.turning_point.1":
    "수학을 완성한 시점과 그것을 세상에 내놓은 시점 사이의 수십 년에 이르는 간극은 프로필의 양면적인 완벽주의(perfectionism) 점수와 부합한다 — 이례적으로 발전된 모델을 만들어낸 바로 그 기준이, 그 영향력을 한 세대만큼 늦추기도 했다.",

  /* ------------------------------------------------- Batch 5: Susan B. Anthony */
  "susan-b-anthony.achievement.1":
    "앤서니는 1866년 미국평등권협회를, 1869년 전국여성참정권협회를 공동 설립했고, 두 단체 모두에서 수십 년간 지도적 역할을 맡았다 — 명예직이 아니라 기록으로 확인되는 지속적인 조직 리더십이었다.",
  "susan-b-anthony.achievement.2":
    "그는 엘리자베스 케이디 스탠턴과 50년 넘게 여러 단체에 걸쳐 협력 관계를 이어갔으며, 여기에는 여러 권으로 이루어진 『여성 참정권의 역사』의 공동 저술도 포함된다 — 폭넓게 뒷받침되는, 장기간에 걸친 협업 기록이다.",
  "susan-b-anthony.moment.1":
    "1872년 대통령 선거에서 앤서니는 수정헌법 14조와 15조가 새로 비준된 것을 이용해 법적 시험 사례를 만들기 위해 가족을 포함한 소수의 인원과 함께 의도적으로 유권자 등록을 하고 투표했다 — 우발적인 행동이 아니라 계산된 행동이었으며, 이는 곧바로 그의 체포와 기소로 이어졌다.",
  "susan-b-anthony.moment.2":
    "1873년 재판에서 담당 판사는 배심원단에게 심의 없이 유죄 평결을 내리도록 지시했다 — 널리 지적된 절차상의 이례적 사건이다 — 그리고 앤서니는 '재판부가 허락한다면...'으로 시작하는 긴 법정 연설을 통해, 결과를 조용히 받아들이는 대신 자신에 대한 법원의 권한 자체를 인정하지 않겠다고 밝혔다.",
  "susan-b-anthony.turning_point.1":
    "1852년, 여성이라는 이유로 금주 집회에서 발언할 기회를 거부당한 뒤, 앤서니는 다른 발언 무대를 찾는 대신 직접 뉴욕주 여성금주협회를 조직했다. 배제에 대응해 기존 조직에 들어가려 하기보다 새로운 조직을 세우는 이 같은 방식은, 훗날 미국평등권협회와 전국여성참정권협회를 공동 설립할 때도 그대로 반복되었다.",
  "susan-b-anthony.interpretation.moment.2":
    "자신에게 유죄를 선고한 법원에 정당성을 인정하지 않은 것은, 그가 놓일 수 있었던 가장 위험 부담이 큰 상황 중 하나에서 이루어졌다는 점에서 프로필의 독립적 사고(independent_thinking) 및 사회적 적극성(social_assertiveness) 점수와 부합한다.",
  "susan-b-anthony.interpretation.turning_point.1":
    "이 패턴이 이 한 번의 초기 일화에 그치지 않고 수십 년에 걸친 경력 전반에서 반복된다는 점은 프로필의 선제적 행동력(proactive_agency) 및 자율성 욕구(autonomy_need) 점수와 부합한다.",

  /* --------------------------------------------------- Batch 5: Galileo Galilei */
  "galileo-galilei.achievement.1":
    "1609년 네덜란드제 망원경에 대한 소문을 전해 듣자, 갈릴레오는 몇 달 만에 자신만의 망원경을 만들고 빠르게 개선했으며, 이를 판매 당시 강조되던 지상·군사적 용도가 아니라 하늘로 향하게 했다 — 첫 관측 이후 약 1년 만에 『별들의 소식』에서 목성의 위성 등의 발견을 발표했다.",
  "galileo-galilei.achievement.2":
    "그의 경사면 및 진자 실험은 낙하 운동에 대한 정량적이고 반복 가능한 측정 결과를 만들어냈다 — 당대를 지배하던 정성적 물리학과는 뚜렷이 구별되는 정량적 방법론으로, 역사학자 스틸먼 드레이크가 그의 노트를 바탕으로 상세히 재구성했다.",
  "galileo-galilei.moment.1":
    "그는 1632년 『두 우주 체계에 관한 대화』를 학술 라틴어가 아닌 이탈리아어로 저술해 더 폭넓은 일반 독자층에 의도적으로 다가갔으며, 당대 사람들이 교회 측 입장을 조롱한다고 널리 받아들인 등장인물을 포함시켜 날카로운 대화체로 구성했다.",
  "galileo-galilei.moment.2":
    "요하네스 케플러가 타원 궤도에 대한 증거를 발표했음에도, 갈릴레오는 여생 동안 원 궤도를 계속 선호했다 — 새로운 증거가 나온 뒤에도 특정한 기술적 입장을 수정하지 않은, 구체적으로 기록된 사례다.",
  "galileo-galilei.turning_point.1":
    "1616년 가톨릭교회는 갈릴레오가 태양 중심설을 가르치거나 옹호하는 것을 공식적으로 금지했다. 그럼에도 그는 1632년 『대화』를 포함해 계속해서 이를 주장했고, 이는 사전에 명시적인 경고를 받은 뒤 출판된 것이었다. 1633년 그는 로마 종교재판소에서 재판을 받았고, 철회를 강요받았으며, 남은 생애를 가택 연금 상태로 보냈다.",
  "galileo-galilei.interpretation.moment.2":
    "이는 이 지점에서 프로필의 상대적으로 낮은 입장 수정 성향(belief_updating) 점수를 뒷받침하는 구체적이고 사료에 근거한 대목이다 — 그의 경력 전반에 걸친 개방성에 대한 일반적 주장이 아니며, 오히려 망원경 관측 자체는 정반대의 패턴을 보여준다.",
  "galileo-galilei.interpretation.turning_point.1":
    "조용히 순응하는 대신 금지된 입장을 계속 주장한 것은 프로필의 독립적 사고(independent_thinking) 및 위험 감수(risk_tolerance) 점수와 부합한다 — 다만 그 결과, 즉 9년 뒤 세상을 떠날 때까지 이어진 가택 연금은 이를 대가 없는 선택으로 읽어서는 안 될 만큼 가혹했다.",

  /* ------------------------------------------------------- Batch 5: Niels Bohr */
  "niels-bohr.achievement.1":
    "원자의 보어 모형과 이후의 코펜하겐 해석은 고전 물리학과 양자 현상을 조화시키는 일관된 개념적 틀을 구축했다 — 당시 고전 물리학으로부터의 진정으로 새로운 이탈로, 1922년 노벨상 수상 이유와 에이브러햄 파이스의 상세한 지적 전기를 통해 기록되어 있다.",
  "niels-bohr.achievement.2":
    "그는 코펜하겐에 이론물리학연구소(현재의 닐스 보어 연구소)를 설립하고 이끌었으며, 이 연구소는 베르너 하이젠베르크, 볼프강 파울리, 폴 디랙 등의 물리학자들을 오래 머물며 실질적으로 협업하도록 이끈 국제적 허브가 되었다 — 연구소 자체의 잘 기록된 역사를 통해 확인된다.",
  "niels-bohr.moment.1":
    "파이스의 전기와 물리학자들 자신의 회고는 독특한 멘토링 방식을 전한다 — 직접적인 가르침이 아니라 긴 일대일 대화를 통해, 하이젠베르크와 파울리, 레프 란다우를 비롯한 한 세대의 방문자들이 스스로 통찰에 이르도록 이끄는 방식이었다.",
  "niels-bohr.moment.2":
    "1943년 나치 점령 당국이 덴마크 유대인들을 상대로 조치를 취하기 시작하자 — 그의 어머니가 유대인이었다 — 곧 체포될 것이라는 경고를 받은 보어는 덴마크를 떠나 스웨덴으로, 이어서 영국과 미국으로 망명했으며, 이후 맨해튼 프로젝트에 참여했다.",
  "niels-bohr.turning_point.1":
    "맨해튼 프로젝트에서의 전시 활동 이후, 보어는 공적 활동의 방향을 자제 쪽으로 전환했다 — 1944년 그는 윈스턴 처칠과 프랭클린 루스벨트 양쪽에 직접 각서를 보내 억제되지 않은 전후 핵무기 경쟁의 위험을 경고하고 핵과학에 대한 국제적 개방을 주장했으며, 이러한 활동을 여생 동안 이어갔다.",
  "niels-bohr.interpretation.moment.1":
    "이는 프로필에서 독특한 형태의 설득력이다 — 직접적인 지시나 공개적인 수사가 아니라, 상대가 스스로 결론에 이르도록 이끄는 방식으로, 프로필의 설득력(persuasiveness) 점수와 부합한다.",
  "niels-bohr.interpretation.turning_point.1":
    "전시의 참여자에서 전후 개방을 주장하는 옹호자로의 이러한 전환은 프로필의 영향 창출 동기(impact_motivation) 점수와 부합하며, 아인슈타인과 수십 년간 이어간 양자론에 관한 공개 논쟁에서 이미 드러난, 권력을 향해 인기 없는 입장을 직접 주장하는 동일한 태도를 반영한다.",

  /* -------------------------------------------------- Batch 5: Immanuel Kant */
  "immanuel-kant.achievement.1":
    "『순수이성비판』(1781), 『실천이성비판』, 『판단력비판』에 걸쳐 칸트는 인식론, 윤리학, 미학을 하나의 일관된 틀 아래 아우르는 통합된 철학 체계를 구축했다 — 스탠퍼드 철학 백과사전이 서양 철학사에서 가장 엄밀한 저작 중 하나로 평가하는 작업이다.",
  "immanuel-kant.achievement.2":
    "정언명령을 중심으로 한 그의 도덕철학은 『윤리형이상학 정초』에서 특정한 지역이나 전통, 상황에 국한되지 않고 모든 이성적 존재에게 적용되는 보편적 윤리적 의무의 기준으로 명시적으로 규정되었다.",
  "immanuel-kant.moment.1":
    "칸트는 오후 산책을 포함해 어찌나 정확하고 변함없는 일과를 유지했던지, 쾨니히스베르크 주민들이 그것을 보고 시계를 맞췄다고 전해질 정도였다 — 이는 하나의 일화가 아니라 여러 당대 및 전기적 기록(쿠엔)에 걸쳐 뒷받침되는 패턴이다.",
  "immanuel-kant.moment.2":
    "젊은 시절의 학문적 촉망을 받은 뒤, 칸트는 40대와 50대 초반 동안 상대적으로 적은 저작만을 발표하며 자신의 원숙한 철학 체계를 사적으로 발전시켰고, 57세가 되어서야 『순수이성비판』을 출간했다 — 쿠엔의 전기에 따르면 이는 활동의 부재가 아니라 의도적이고 장기간에 걸친 사적 수정의 시기였다.",
  "immanuel-kant.turning_point.1":
    "칸트의 후기 종교 저작인 『이성의 한계 안에서의 종교』는 프로이센 왕실 검열관들의 공식적인 견책을 받았고, 이후 종교 주제로 더는 저술하지 말라는 지시를 받았다 — 발표된 입장이 불러온 실제 제도적 결과였으며, 쿠엔의 전기가 그 외에는 대체로 제도적으로 신중하고 이례적으로 조심스러운 일과 중심의 공적 삶으로 묘사하는 경력 안에서 벌어진 일이다.",
  "immanuel-kant.interpretation.moment.2":
    "이 사적 수정 기간이 존재했다는 사실 자체보다 그 길이가 프로필의 양면적인 완벽주의(perfectionism) 점수를 뒷받침한다 — 유명할 만큼 엄밀한 체계를 만들어낸 바로 그 기준이 그것을 십 년 넘게 지연시키기도 했다.",
  "immanuel-kant.interpretation.turning_point.1":
    "이 일화가 두드러지는 것은 바로 프로필의 나머지 부분이 묘사하는 대체로 신중한 패턴에서 벗어나기 때문이다 — 폭넓은 대립 성향의 증거가 아니라, 조심스러운 삶 안에서 감수한 하나의 신중한 위험이다.",

  /* ------------------------------------------------------ Batch 5: Octavia Butler */
  "octavia-butler.achievement.1":
    "그의 소설 『킨드레드』와 『제노제네시스』, 『패러블』 연작은 유전공학, 권력과 동의, 노예제 시대 역사와 시간여행을 결합한 아프리카미래주의적 서사 등 그가 집필하던 당시 SF에서 거의 다뤄지지 않았던 독특한 주제 영역을 구축했으며, 그를 1970~80년대 SF 장르에서 극히 드문 흑인 여성 작가 중 한 명으로 자리매김하게 했다.",
  "octavia-butler.achievement.2":
    "1990년대 중반에 이르러 그의 작품 세계는 이 장르에서 가장 많은 상을 받은 작가 중 한 명이라는 평가를 확립했다. 중편소설 『블러드차일드』는 1984~85년 휴고상과 네뷸러상을 모두 수상했고, 『은총을 받은 사람의 우화』는 1999년 네뷸러상 장편 부문을 수상했다. 1995년에는 SF 작가로서는 최초로 맥아더 펠로십을 받았다. 재단은 선정 사유에서 그의 소설을 \"미래뿐 아니라 현재와 과거에도 깊이 관련된 초월적 우화\"라고 평가하며, 시간여행을 통해 노예제 서사를 SF에 도입한 『킨드레드』와 편견·계급 갈등·폭력을 다룬 『제노제네시스』 3부작을 구체적으로 언급했다.",
  "octavia-butler.legacy":
    "버틀러의 영향력은 2006년 세상을 떠난 뒤에도 계속 커졌다. 『킨드레드』는 2017년 베스트셀러 그래픽노블로, 2022년에는 FX 텔레비전 시리즈로 각색되었고, 『씨앗을 뿌리는 사람의 우화』는 2015년 무대 오페라로 만들어졌으며, 그는 오늘날 아프로퓨처리즘 — 그의 주요 작품 대부분이 이미 발표된 뒤인 1993년에야 이름이 붙은 사조 — 의 선구자 대열에 놓인다. 2021년 나사(NASA)는 화성 탐사선 퍼서비어런스의 착륙 지점을 그를 기려 '옥타비아 E. 버틀러 착륙지'로 명명했으며, 그가 세상을 떠난 해에 설립된 칼 브랜던 소사이어티의 '옥타비아 E. 버틀러 기념 장학금'은 그 자신이 학생으로 참여했던 클라리온 워크숍에 유색인종 작가들이 참가할 수 있도록 지금도 지원을 이어가고 있다.",
  "octavia-butler.moment.1":
    "헌팅턴 도서관에 소장된 그의 개인 노트에는 베스트셀러 작가가 되겠다는, 그 결과가 이루어지기 여러 해 전에 작성된 날짜 있는 자기 다짐이 담겨 있다 — 성공을 뒤늦게 재구성한 주장이 아니라, 그 성공에 앞서 존재했던 목표 지향적 의지에 대한 기록이다.",
  "octavia-butler.moment.2":
    "본인의 인터뷰에 따르면, 그는 첫 소설 판매 이전 여러 해 동안 거절이 이어지는 가운데서도 작품 투고를 계속하면서, 동시에 글쓰기와 무관한 여러 직업을 전전하며 집필 활동을 이어갔다.",
  "octavia-butler.moment.3":
    "경력 초기에 그는 클라리온 SF 작가 워크숍에 참여했는데, 이는 기록으로 남아 있는 형성기 협업 경험이다 — 본인과 전기 작가들이 대체로 공적·집단적 자리보다 혼자 글을 쓰는 것을 더 편안해했다고 묘사하는 경력 안에서 특히 눈에 띄는 사례다.",
  "octavia-butler.interpretation.moment.1":
    "이런 종류의, 스스로 작성하고 날짜까지 남긴 증거는 특성 점수의 근거로서 이례적으로 직접적이다 — 이 프로필의 대다수 항목은 간접적인 전기적 서술에 의존하지만, 이 항목은 그 자신의 손으로 남긴 기록에 근거한다.",

  /* --------------------------------------------- Batch 5: Rabindranath Tagore */
  "rabindranath-tagore.achievement.1":
    "타고르가 『기탄잘리』로 받은 1913년 노벨 문학상은 특정한 작품 세계에 대한 국제적이고 독립적인 인정이었다 — 그는 이미 수천 편의 시와 노래, 소설과 희곡을 발표한 상태였고, 노벨상 선정 이유와 이 시집이 얻은 지속적인 국제적 비평적 반응은 단순히 작품의 양이 아니라 그의 미적 기교 자체에 대한 인정을 구체적으로 보여준다.",
  "rabindranath-tagore.achievement.2":
    "그는 식민지 시대 교육과는 구별되는 대안적이고 인문주의적인 교육 모델로서 산티니케탄에 비스바바라티 대학교를 설립했다 — 문학 작업을 넘어선, 스스로 시작하고 지속시킨 제도 구축의 노력으로, 대학 자체의 설립 역사를 통해 기록되어 있다.",
  "rabindranath-tagore.moment.1":
    "타고르는 인도와 방글라데시 양국의 국가를 모두 작곡했다 — 문학을 넘어선 그의 창작 활동의 범위를 보여주는, 훗날 두 나라의 시민적 정체성의 일부가 된 이례적이고 기록된 사실이다.",
  "rabindranath-tagore.moment.2":
    "그는 문학적 명성이 이미 국제적으로 확고히 자리 잡은 지 수십 년이 지난 예순 무렵에야 진지하게 그림을 시작했으며, 외부적 필요가 아니라 순전히 지속된 창작적 관심에서 비롯된 일이었다.",
  "rabindranath-tagore.turning_point.1":
    "1919년 타고르는 암리차르에서 벌어진 잘리안왈라 바그 학살에 항의해 자신이 받은 영국 기사 작위를 공개적으로 반납했다 — 그를 그 작위로 서훈했던 바로 그 식민지 체제에 맞선 고위층 차원의 저항 행위였으며, 그 체제 안에서 실질적인 사회적·정치적 위험을 안고 있었다. 이 결정을 설명하며 총독에게 보낸 편지에서 그는 '모든 특별한 지위를 벗어던지고 동포들 곁에 서고자 한다'고 썼다.",
  "rabindranath-tagore.interpretation.moment.2":
    "이미 다른 분야에서 숙련이 확고히 자리 잡은 뒤에도, 더는 증명할 것이 남아 있지 않은 상태에서 처음부터 새로운 분야를 시작한 것은 프로필의 숙련 지향(mastery_orientation) 점수와 부합한다.",
  "rabindranath-tagore.interpretation.turning_point.1":
    "이미 받은 공식적인 서훈을 유지한 채 사적으로만 불만을 표하는 대신 그것을 반납한 것은 프로필의 독립적 사고(independent_thinking) 및 위험 감수(risk_tolerance) 점수와 부합한다.",

  /* ------------------------------------------------------------ Batch 6: Aristotle */
  "aristotle.achievement.1":
    "아리스토텔레스가 남긴 저작은 논리학, 자연학, 형이상학, 윤리학, 정치학, 수사학, 시학, 생물학에까지 이른다 — 스탠퍼드 철학 백과사전이 고대에 알려진 거의 모든 탐구 분야를 아우른다고 평가하는, 독창적이며 상호 참조된 방대한 저술이다.",
  "aristotle.achievement.2":
    "『분석론 전서』에서 아리스토텔레스는 최초의 형식적 연역 추론 체계인 삼단논법을 제시했다 — 타당한 추론에 대한 이 체계적인 설명은 이후 약 2천 년 동안 서양과 이슬람 철학 전통에서 논리학의 표준 틀로 자리 잡았다.",
  "aristotle.moment.1":
    "특히 『동물지』를 비롯한 그의 생물학 저작들은 해양 동물에 대한 상세한 해부학적 관찰을 기록하고 있으며, 본인의 서술에 따르면 직접 해부까지 수행했다 — 이는 전해 들은 이야기가 아니라 레스보스 섬 주변에서 직접 행한 현장 조사에 근거한다.",
  "aristotle.moment.2":
    "고대 전기 전통 — 아리스토텔레스가 세상을 떠난 지 수백 년 뒤에 쓰였지만 서로를 뒷받침하는 디오게네스 라에르티오스와 플루타르코스의 기록에 가장 온전히 남아 있다 — 에 따르면, 마케도니아의 필리포스 2세는 기원전 343년 무렵 아리스토텔레스를 미에자의 왕궁으로 초빙해 자신의 아들, 훗날의 알렉산드로스 대왕을 가르치게 했다.",
  "aristotle.turning_point.1":
    "기원전 323년 알렉산드로스가 사망한 뒤, 아테네에서는 그가 이전에 마케도니아 궁정과 맺었던 관계를 문제 삼아 반(反)마케도니아 정서가 아리스토텔레스에게로 향했고, 기원전 322년 그는 불경죄로 고발당했다. 널리 반복되어 전해지는 고대의 일화에 따르면, 그는 재판을 받는 대신 어머니 쪽 가문의 소유지가 있던 칼키스로 아테네를 떠났으며, \"아테네가 철학에 대해 두 번 죄를 짓게 하지 않겠다\"고 — 소크라테스의 이전 재판과 처형을 가리키는 말로 — 말했다고 전해진다. 그는 바로 그해에 칼키스에서 세상을 떠났다.",
  "aristotle.interpretation.moment.1":
    "이런 종류의 현장 조사는 순전히 이론적인 탐구와는 다른 형태의 호기심이다 — 첫 원리로부터의 추론만이 아니라, 직접 가서 관찰함으로써 얻은 증거다.",
  "aristotle.interpretation.turning_point.1":
    "정치적으로 민감한 고발에 맞서 다투는 대신 이미 확립된 지위를 떠나는 것은, 이 프로필의 다른 곳에서 더 흔히 나타나는 직접적인 대립과는 다른 종류의 위험 계산이다 — 동일한 위험 감수 성향이 저항이 아니라 전략적 물러남으로 나타난 경우다.",

  /* ------------------------------------------------------- Batch 6: Simón Bolívar */
  "simon-bolivar.achievement.1":
    "1813년부터 1825년 사이, 볼리바르는 군사 원정을 이끌어 오늘날의 베네수엘라, 콜롬비아, 에콰도르, 파나마, 페루, 그리고 그의 이름을 딴 볼리비아에 이르는 지역에서 에스파냐 식민 지배를 종식시켰으며, 단명한 연합체인 그란콜롬비아의 대통령을 지냈다.",
  "simon-bolivar.achievement.2":
    "연이은 초기 군사적 패배 이후 1815년 자메이카 망명 중에 쓴 「자메이카 서한」은 에스파냐령 아메리카 사회에 대한 상세한 정치적 분석을 담고, 독립적이고 통합된 통치에 대한 구체적인 구상을 주장했다 — 린치의 전기에 따르면 이는 단순한 결집 호소가 아니라 체계적인 정치 이론서였다.",
  "simon-bolivar.moment.1":
    "1819년, 볼리바르는 2,000명이 넘는 병력을 이끌고 우기에는 통과할 수 없다고 에스파냐 왕당파 군이 판단했던, 물에 잠긴 안데스 고원과 얼어붙은 산길을 넘어 누에바그라나다로 진격했다. 이 기습적인 도착으로 그의 군대는 1819년 8월 7일 보야카 전투에서 결정적인 승리를 거두었고, 보고타로 가는 길이 열렸다.",
  "simon-bolivar.moment.2":
    "1822년 7월, 볼리바르는 과야킬에서 동료 독립운동 지도자 호세 데 산마르틴과 비공개로 만나 새로 해방된 영토들의 정치적 미래를 논의했다. 그 자리에서 무슨 말이 오갔는지에 대한 기록은 남아 있지 않지만, 산마르틴은 얼마 지나지 않아 공직과 군무에서 물러났고, 볼리바르는 대륙 독립운동에서 남은 가장 두드러진 인물이 되었다.",
  "simon-bolivar.turning_point.1":
    "1828년 무렵 그란콜롬비아는 보고타 중심의 중앙집권 통치에 대한 지역적 저항으로 분열하고 있었고, 볼리바르는 연합을 유지하려는 시도로 독재적 권한을 장악했으며 그해 9월 암살 시도에서 살아남았다. 분열을 되돌리지 못한 채, 그는 베네수엘라가 분리를 향해 움직이던 1830년 4월 대통령직에서 물러났고, 그해 12월 산타마르타에서 결핵으로 세상을 떠났다 — 그가 거의 20년에 걸쳐 세운 연합이 그가 죽은 바로 그해에 무너져 내렸다.",
  "simon-bolivar.interpretation.moment.2":
    "남아 있는 기록은 그 결과만을 보여줄 뿐 불화 자체를 보여주지는 않으므로, 이 해석은 확정된 사실이라기보다 여전히 해석적인 읽기로 남는다 — 다만 이는 이 프로필 전반에서 나타나는, 실질적인 마찰을 동반하면서도 실제로 작동했던 연대라는 더 넓은 패턴과 맞아떨어진다. 단순하고 매끄러운 협력이 아니라는 점에서다.",
  "simon-bolivar.interpretation.turning_point.1":
    "이 후기의 볼리바르를 어떻게 읽어야 할지는 실제로 논쟁의 여지가 있는 영역이다 — 한때 자기 자신의 통치를 넘어선 연합을 제안했던 바로 그 인물이, 그 구상이 흔들리자 스스로의 손에 권력을 집중시키기도 했다 — 이 프로필이 그의 영향 창출 동기 점수를 극단이 아니라 중간 쪽에 두는 이유가 여기에 있다.",

  /* --------------------------------------------------------- Batch 6: Grace Hopper */
  "grace-hopper.achievement.1":
    "1950년대 초, 호퍼는 레밍턴 랜드 사에서 최초의 컴파일러로 널리 인정받는 A-0 시스템을 개발한 팀을 이끌었다 — 기호적이고 영어에 가까운 명령어를 기계어로 번역하는 프로그램으로, 훗날 코볼(COBOL) 같은 언어를 가능하게 한 핵심 개념을 확립했다 — 그녀의 경력을 다룬 바이어의 저작에 따른 것이다.",
  "grace-hopper.achievement.2":
    "바이어의 기록은 여러 해에 걸쳐 자신이 속한 조직 안팎의 동료들과 군·기업 지도부를 설득하려 애쓴 지속적인 노력을 보여준다 — 컴퓨터가 영어에 가까운 형태로 작성된 명령을 안정적으로 실행할 수 있다는 주장은 1950년대 초 많은 동시대인들이 기술적으로 불가능하다고 여겼던 것이었으며, 컴파일러 기반의 표준화된 프로그래밍이 업계 관행으로 자리 잡기까지 이런 설득이 이어졌다.",
  "grace-hopper.moment.1":
    "1947년, 호퍼가 하버드 마크 II 컴퓨터 팀에 있던 무렵, 동료들이 기계의 릴레이 중 하나에 나방이 끼어 있어 오작동을 일으킨 것을 발견했다. 그 나방은 운용 기록부에 테이프로 붙여졌고 \"버그(bug)가 발견된 최초의 실제 사례\"라는 메모가 남겨졌다. 기술적 결함을 뜻하는 \"버그\"라는 용어는 이 사건 이전부터 공학 분야에 이미 존재했으며 — 호퍼가 만든 말이 아니다 — 다만 그녀는 이 용어를 널리 알린 인물로 평가받으며, 그 기록부 페이지는 오늘날에도 스미소니언 국립미국사박물관에 보존되어 있다.",
  "grace-hopper.turning_point.1":
    "호퍼는 1966년 말 만 60세 정년으로 해군 예비역에서 퇴역했지만, 1967년 8월 해군 전역에 걸쳐 코볼을 표준화하는 작업을 돕기 위해 현역으로 다시 소집되었다. 1971년에 다시 퇴역했다가 이듬해 또다시 소집되었고, 이후로는 계속 복무하며 1986년 79세의 나이로 해군 준장으로 최종 퇴역했는데, 당시 미 해군에서 현역으로 복무 중인 최고령 장교였다.",
  "grace-hopper.interpretation.turning_point.1":
    "정년퇴임 이후 한 번이 아니라 두 번이나 현역으로 복귀했고, 결국 80세를 눈앞에 두고도 복무를 이어간 것은, 이 프로필이 단일한 성취보다 훨씬 위에 두는 숙련 지향(mastery_orientation)과 맞아떨어진다.",

  /* -------------------------------------------------------------- Batch 6: C. V. Raman */
  "cv-raman.achievement.1":
    "1928년, 라만은 여러 역사적 기록에 따르면 실제 실험 작업의 상당 부분을 수행한 연구원이었던 K. S. 크리슈난과 함께, 처음에는 햇빛과 단순한 프리즘으로 관찰을 시작해 이후 라만 자신이 설계한 분광기로 정밀한 측정이 가능해진 방식을 통해, 빛이 투명한 물질에 의해 산란될 때 파장이 변한다는 사실을 입증했다 — 이 현상은 훗날 라만 효과로 불리게 되었다. 노벨위원회는 1930년 물리학상 후보로 라만의 이름만을 추천했고 크리슈난은 후보에도 오르지 못했는데, 일부 인도 과학사 연구자들은 이 결정이 발견 과정에서 그가 맡았던 역할을 온전히 반영하지 못했다고 평가해 왔다.",
  "cv-raman.achievement.2":
    "발견 자체를 넘어, 라만은 방갈로르에 라만 연구소를 설립해 이끌었고 인도과학원(IISc) 원장을 지내며 수십 년에 걸쳐 인도 과학 기관을 세우고 인도 물리학자 세대를 길러내는 작업을 이어갔다.",
  "cv-raman.moment.1":
    "라만은 인도 재무부에서 전임으로 근무하는 동안, 인도 전통 악기의 물리학 연구를 시작으로 십여 년 넘게 부업 삼아 진지한 물리학 연구를 이어갔으며, 1917년에는 안정적이고 보수가 좋은 그 공직을 떠나 상당히 낮은 급여를 받으며 캘커타 대학교의 물리학 교수직을 맡았다.",
  "cv-raman.turning_point.1":
    "1921년 9월, 영국에서 인도로 돌아오는 S.S. 나르쿤다호 항해 중, 라만은 휴대용 분광경으로 지중해의 짙은 푸른빛을 살펴보았고, 그해 11월 『네이처』에 그 관찰 결과를 발표해 바다의 색이 단순히 하늘을 반사하는 것이라는 로드 레일리의 1910년 통설에 정면으로 이의를 제기했다. 투명한 매질에서의 빛 산란에 대한 이 연구의 흐름은 7년 뒤 그의 이름을 딴 효과의 발견으로 이어졌다.",
  "cv-raman.interpretation.turning_point.1":
    "기존 설명이 미처 짚어내지 못한 무언가를 알아차리고, 귀국 후 불과 몇 주 만에 그것을 학술지에 발표해 정면으로 이의를 제기한 것은, 이 프로필의 호기심 점수가 근거로 삼는 종류의 증거다.",

  /* --------------------------------------------------- Batch 6: Benjamin Banneker */
  "benjamin-banneker.achievement.1":
    "1792년부터 배네커는 태양과 달, 행성의 예상 위치를 담아 조수 예측 등 실용적 목적에 쓰이는 천체력을, 독자적으로 계산해 매년 역서로 출간했다 — 베디니의 전기에 따르면 천문학이나 고등 수학에 대한 정규 교육을 전혀 받지 않은 채 전적으로 독학으로 이룬 성과였다.",
  "benjamin-banneker.achievement.2":
    "1753년 무렵, 빌린 회중시계의 작동 원리를 연구한 뒤 배네커는 거의 전부를 나무로 깎아 작동하는 타종 시계를 만들었다 — 베디니에 따르면 시계 제작에 대한 사전 훈련이나 정규 교육의 기회 없이 이루어진, 기록으로 남은 기술적 성취다.",
  "benjamin-banneker.moment.1":
    "1791년 8월, 배네커는 당시 국무장관이던 토머스 제퍼슨에게 편지를 보내, 제퍼슨이 표방한 계몽주의 이상과 그가 사람들을 노예로 소유하고 있다는 사실 사이의 모순을 직접 지적하며, 흑인의 지적 능력을 보여주는 증거로 곧 출간될 자신의 역서 필사본을 동봉했다. 배네커의 편지와 함께 남아 있는 제퍼슨의 답장은 감사의 뜻을 전하며 그 역서를 프랑스의 콩도르세 후작에게 전달했다고 밝혔지만 — 이는 정중한 인정이었을 뿐, 제퍼슨 자신이 사람들을 노예로 소유하는 관행을 바꾸는 데까지 이어지지는 않았다.",
  "benjamin-banneker.interpretation.moment.1":
    "현직 각료에게 노예제에 대해 직접적이고 개인적으로 문제를 제기한 것은 1791년 메릴랜드의 자유 흑인에게는 실제적인 위험이었다 — 이 프로필의 위험 감수 점수가 여기서 실제로 근거하는 부분이며, 그 서신 교환이 어떻게 받아들여졌는지에 대한 어떤 주장은 아니다.",

  /* ----------------------------------------------------------- Batch 6: Fela Kuti */
  "fela-kuti.achievement.1":
    "1960년대 후반부터 펠라 쿠티는 요루바 음악과 재즈, 하이라이프, 펑크를 결합해 아프로비트라는 새로운 장르를 만들어냈다 — 그의 녹음 작품에 대한 음악학적 분석(비얼)을 통해 확인되는 독자적인 음악적 종합이다.",
  "fela-kuti.achievement.2":
    "군인을 명령에 따르는 생각 없는 자동인형에 빗대어 나이지리아 군부를 직접 비판한 1976년 앨범 『좀비』는 아프리카 음악 역사상 가장 널리 알려진 저항 음반 중 하나가 되었으며, 비얼이 그 음반의 반향을 서술한 바에 따르면 나이지리아와 범아프리카 정치의식에 지속적인 영향을 미쳤다.",
  "fela-kuti.moment.1":
    "1970년, 쿠티는 자신의 밴드와 녹음 스튜디오, 그리고 확장된 공동체가 자리한 라고스의 자택을 독립된 '칼라쿠타 공화국'으로 선포하고, 나이지리아 경찰의 진입을 거부하며 그 구역이 나이지리아 국가의 권한 밖에서 운영된다고 주장했다 — 구체적이고 상세히 기록된 공개적 저항 행위였다.",
  "fela-kuti.turning_point.1":
    "1977년 2월, 약 1,000명의 나이지리아 군인이 칼라쿠타 공화국을 습격해 불을 질렀다. 이 습격에서 쿠티의 어머니이자 활동가였던 펀밀레이오 랜섬쿠티는 창밖으로 내던져졌고, 이듬해 그 부상으로 세상을 떠났다. 쿠티는 어머니의 관을 라고스에 있는 군사정부 본부 정문까지 운구하는 것으로 대응했고, 이후 몇 해에 걸쳐 이 사건을 다룬 곡 「국가원수를 위한 관」을 발표했다 — 음악과 언사를 통한 정권 비판에서, 정권에 대한 직접적이고 개인적인 대결로 나아간 전환이었다.",
  "fela-kuti.interpretation.turning_point.1":
    "이는 국가 권력에 맞서는 방식이 실질적으로 격화되었음을 보여준다 — 음반과 가사에서 정부를 직접 겨냥한 물리적 행동으로 나아간 것으로, 이는 이 프로필의 갈등 감내 점수를 뒷받침하는 구체적인 증거이지, 그 근저의 정치적 갈등 자체에 대한 판단은 아니다.",

  /* ------------------------------------------------- Batch 6: Toussaint Louverture */
  "toussaint-louverture.achievement.1":
    "노예 신분의 마부이자 가축 몰이꾼에서 생도맹그의 총사령관 겸 총독으로 올라선 투생 루베르튀르는, 뒤부아의 혁명사 저술에 따르면 제한된 자원으로 옛 노예들로 이루어진 규율 있는 군대를 조직하고 훈련시켰으며, 약 10년에 걸쳐 에스파냐와 프랑스, 영국 군대를 상대로 차례로 전술을 조정해 나갔다.",
  "toussaint-louverture.achievement.2":
    "1801년, 루베르튀르는 생도맹그에서 노예제를 영구히 폐지하는 헌법을 공포했다 — 동시에 스스로를 종신 총독으로 임명하고, 황폐해진 농업 경제를 재건하기 위해 옛 농장 노동자들에게 엄격한 노동 체제 아래 토지에 계속 머물도록 요구했으며, 이 정책은 당대에도 훗날의 역사가들 사이에서도 비판을 받았다.",
  "toussaint-louverture.moment.1":
    "1794년, 프랑스 국민공회가 프랑스령 전역에서 노예제 폐지를 선포하자, 루베르튀르는 애초에 함께 싸웠던 에스파냐 쪽에서 프랑스 쪽으로 자신의 군대의 충성을 바꾸었다 — 뒤부아에 따르면, 어느 쪽이 노예제 폐지를 더 확실하게 지켜낼지에 대한 그 자신의 판단에 근거한, 날짜가 특정된 구체적인 전략적 전환이었다.",
  "toussaint-louverture.turning_point.1":
    "1802년 6월, 나폴레옹 보나파르트가 식민지에 대한 프랑스의 지배를 회복하기 위해 파견한 원정군 사령관 샤를 르클레르의 명령에 따라, 프랑스 장군 장바티스트 브뤼네는 거짓 구실로 루베르튀르를 회담으로 유인해 체포했다. 그는 프랑스로 압송되어 쥐라산맥의 주 드 조 요새에 수감되었고, 1803년 4월 그곳에서 세상을 떠났다 — 그의 옛 부관들이 1804년 1월 아이티의 독립을 선언하기 아홉 달 전이었다.",
  "toussaint-louverture.interpretation.moment.1":
    "처음 함께했던 쪽에 대한 충성이 아니라, 어느 쪽이 실제 목표를 더 잘 지켜낼지에 대한 자신의 판단에 근거해 기존 동맹을 뒤집은 것은, 이 프로필의 독립적 사고 점수가 근거로 삼는 종류의 증거다.",

  /* ----------------------------------------------------------- Batch 6: Chinua Achebe */
  "chinua-achebe.achievement.1":
    "1958년 출간된 『모든 것이 산산이 부서지다』는 이그보족의 구전 서사 구조와 속담을 영어 소설 형식 안에 직접 엮어 넣었다 — 관습적인 서구식 서술이 아닌 의도적인 기법적 선택이었으며, 에젠와오하에토의 전기에 따르면 현대 아프리카 문학의 기초를 놓은 작품으로 널리 인정받는다.",
  "chinua-achebe.achievement.2":
    "1975년 강연에서, 훗날 「아프리카의 이미지」라는 에세이로 출간된 발언을 통해, 아체베는 당시 영문학의 확고한 정전이었던 조지프 콘래드의 『암흑의 핵심』이 아프리카와 아프리카인들을 유럽인의 심리극을 위한 배경으로 축소시켰다고 주장했다 — 당대의 지배적인 문학 비평 흐름에 의도적으로 맞선 입장이었으며, 이후 수십 년간 문학 연구에서 인용되고 논쟁의 대상이 되어 왔다.",
  "chinua-achebe.moment.1":
    "나이지리아 내전(1967~1970) 동안 아체베는 분리독립을 선언한 비아프라의 외교 특사로서 국제적인 인정과 지원을 구하러 다녔다 — 자신의 문학 경력과는 별개로, 동시에 이루어진 직접적인 정치적 참여의 시기였다.",
  "chinua-achebe.turning_point.1":
    "1990년 3월, 나이지리아에서 일어난 교통사고로 아체베는 하반신이 마비되었다. 그는 치료를 위해 영국으로 이송되었고 이후 미국으로 거처를 옮겨 바드 칼리지 교수진에 합류했으며, 2013년 세상을 떠날 때까지 20년 넘게 에세이 집필과 강의, 공개 강연을 이어갔다.",
  "chinua-achebe.interpretation.turning_point.1":
    "사고 이후 다른 대륙에서, 영구적으로 달라진 신체적 조건 속에서 온전한 학문적·문학적 경력을 다시 쌓아 올린 것은, 이 프로필의 적응력 점수가 근거로 삼는 구체적인 종류의 증거다.",

  /* ------------------------------------------- Batch 7 (exposure-priority): Alan Turing */
  /* CLOSURE PASS: achievements 1-2 deleted (unsupported by this person's roster rationale). moment.1 corrected to match the rationale's own quoted phrase and dropped an invented colleague count. Profile V2 pilot (2026-08): see the EN block's comment for what changed and why. */
  "alan-turing.achievement.1":
    "1936년 논문 「계산 가능한 수에 관하여, 결정문제에의 응용과 함께」에서 튜링은 알고리즘으로 표현 가능한 모든 계산을 수행할 수 있는 '보편 계산 기계'라는 개념을 제시했다 — 훗날 수학사에서 가장 영향력 있는 논문 가운데 하나로 평가받는 이 이론적 토대는, 그런 기계가 실제로 만들어지기 수년 전에 나온 현대 컴퓨터 개념의 근간이다.",
  "alan-turing.achievement.2":
    "1939년부터 블레츨리 파크에서 튜링은 독일군의 에니그마 암호 설정을 자동으로 찾아내는 전기기계식 장치 '봄브'의 중심 개발자였다 — 결정적인 개선을 더한 '대각판'을 고안한 수학자 고든 웰치먼, 그리고 엔지니어 해럴드 킨과 설계 공로를 나누었다. 전쟁사 공식 역사가 해리 힌슬리는 이 작업이 가능하게 한 암호 해독이 유럽 전선의 전쟁을 2년 이상 단축시켰다고 추산했다.",
  "alan-turing.achievement.3":
    "1950년 논문 「계산 기계와 지능」에서 튜링은 훗날 '튜링 테스트'로 알려지게 될 개념을 제안했다 — 기계와의 대화가 인간과 구별되지 않는지를 기준으로 그 기계가 '생각한다'고 볼 수 있는지를 판단하는 방법이며, 이 틀은 70여 년이 지난 지금도 인공지능 논쟁의 기본 구도로 쓰인다.",
  "alan-turing.moment.1":
    "1941년, 공식 채널이 시급하게 움직이지 않는 가운데 블레츨리 파크의 암호 해독 작업이 인력과 장비 부족에 놓이자, 튜링은 동료들과 함께 자신들의 지휘 계통을 건너뛰어 윈스턴 처칠에게 직접 편지를 보냈다. 필요한 것을 지원하라는 처칠의 \"오늘 안에 조치할 것\" 답신은 기록으로 남아 있다.",
  "alan-turing.interpretation.moment.1":
    "프로필의 높은 선제적 행동력(proactive_agency) 점수와 일치하는 대목이다 — 자원 부족 문제를 정해진 통상적 절차를 통해 제기하는 대신, 즉시 조치를 취할 수 있는 바로 그 사람에게 직접 편지를 보낸 것이다.",
  "alan-turing.moment.2":
    "튜링의 전시 암호 해독 작업은 공식비밀법의 적용을 받아 수십 년간 기밀로 남아 있었다 — 그는 생전에 이 공로를 온전히 인정받지 못했으며, 그의 생전 평판은 블레츨리 파크에서의 활동이 아니라 거의 전적으로 수학과 컴퓨팅 분야의 업적에 근거했다.",
  "alan-turing.turning_point.1":
    "1952년 1월, 튜링의 자택에 든 절도 사건을 수사하던 중 그가 다른 남성과의 관계를 밝히면서 경찰 수사가 이어졌고, 그는 당시 영국에서 범죄였던 동성애 행위 혐의로 기소되었다. 그는 수감 대신 호르몬 치료 — 이른바 화학적 거세 — 를 받아들였고, 이로 인해 정부 암호 해독 작업을 계속할 수 있게 해주던 보안 등급을 잃었으며, 1954년 6월 청산가리 중독으로 사망했다. 당시 검시에서는 자살로 판정되었지만, 이후 이 증거가 사고사 가능성과도 부합한다는 지적이 있었다. 엘리자베스 2세 여왕은 2013년 그에게 사후 특별사면을 내렸다.",
  "alan-turing.life_arc.1": "런던에서 태어났다.",
  "alan-turing.life_arc.2": "「계산 가능한 수에 관하여」를 발표해 보편 계산 기계라는 이론적 개념을 제시했다.",
  "alan-turing.life_arc.3": "블레츨리 파크에서 고든 웰치먼, 해럴드 킨과 함께 봄브를 설계해 독일군의 에니그마 암호 통신을 해독했다.",
  "alan-turing.life_arc.4": "「계산 기계와 지능」을 발표해 튜링 테스트를 제안했다.",
  "alan-turing.life_arc.5": "동성애 혐의로 기소되어 보안 등급을 박탈당했다.",
  "alan-turing.life_arc.6": "잉글랜드 윌름슬로에서 41세로 사망했다.",
  "alan-turing.legacy":
    "튜링은 오늘날 이론 컴퓨터 과학과 인공지능 두 분야 모두의 창시자로 널리 평가받으며, 종전 후 수십 년간 비밀로 유지되었던 블레츨리 파크의 암호 해독 작업은 연합군 승리에 크게 기여한 것으로 이해되고 있다. 2013년의 왕실 사면은 그에 대한 기소가 부당했음을 공식적으로 인정한 것이었고, 그의 이름은 오늘날 컴퓨팅 분야 최고 권위의 상인 ACM 튜링상에 남아 있다.",

  /* ------------------------------------------ Batch 7 (exposure-priority): Warren Buffett */
  /* CLOSURE PASS (round 2 — re-verified against the roster file directly rather than from memory): achievement.1 also had an unsourced 1963 date and "reputation as a value investor" framing; narrowed further to the rationale's own "central to his identity" phrase. achievement.2 also had an unsourced "struggling textile manufacturer" characterization; removed. Profile V2 pilot (2026-08): see the EN block's comment for what changed and why. */
  "warren-buffett.achievement.1":
    "1965년부터 버핏은 주당 14.86달러에 인수한, 쇠퇴해가던 방직회사 버크셔 해서웨이를 다각화된 지주회사로 탈바꿈시켰고 1985년에는 남아 있던 방직 공장들을 모두 정리했다. 버크셔가 1998년 주주서한에서 직접 밝힌 바에 따르면, 그가 경영권을 확보한 뒤 34년 동안 버크셔의 주당 순자산가치는 19달러에서 37,801달러로 늘었다 — 연평균 24.7%의 복리 수익률로, 기록상 가장 오래 지속된 투자 실적 가운데 하나로 꼽힌다.",
  "warren-buffett.achievement.2":
    "버핏은 개별 주식을 사고파는 대신, 기업 전체나 지분을 인수해 수십 년간 보유하는 방식으로 버크셔의 규모 대부분을 키웠다 — 1988년 약 10억 2천만 달러를 들여 매입한 코카콜라 지분 약 7%는 지금도 보유 중이며, 2009년 340억 달러에 인수한 벌링턴 노던 산타페는 그의 경력에서 가장 큰 거래 가운데 하나로 꼽힌다.",
  "warren-buffett.moment.1":
    "'샐러드유 스캔들' 당시, 아메리칸 익스프레스의 기회가 시장에서 잘못 평가되고 있음을 자신의 분석 틀 안에서 남들보다 먼저 알아보고 투자했다 — 가이코 투자와 함께, 투자자로서 그의 정체성에 핵심이 되며 폭넓게 기록된 능력이다.",
  "warren-buffett.moment.2":
    "1951년, 스무 살의 대학원생이었던 버핏은 토요일에 워싱턴 D.C.에 있는 가이코 본사를 찾아가 당시 현장에 남아 있던 몇 안 되는 임원 중 한 명이었던 로리머 데이비드슨을 만나 보험업에 관한 대화를 나눴다 — 이 대화는 그의 초기 투자관에 영향을 주었다. 45년 뒤인 1996년 1월 2일, 버크셔는 그때까지 보유하지 않았던 가이코 지분 49%를 23억 달러에 인수해 완전자회사로 만들었다.",
  "warren-buffett.turning_point.1":
    "1965년, 기존 경영진과의 분쟁 끝에 지분을 더 사들여 버크셔 해서웨이의 경영권을 직접 확보했다 — 이사회에 초대받기를 기다리는 대신 택한 길이었다.",
  "warren-buffett.turning_point.2":
    "찰리 멍거의 영향을 받아, 그리고 씨즈 캔디를 구체적인 근거로 삼아, 통계적으로 저렴하지만 평범한 기업을 사들이는 벤저민 그레이엄의 '담배꽁초' 방식에서 벗어나 '훌륭한 기업'에 정당한 값을 치르는 쪽으로 옮겨갔다 — 그의 투자 경력에서 가장 명확하게 스스로 밝힌 입장 전환 가운데 하나다.",
  "warren-buffett.interpretation.turning_point.2":
    "버핏 본인이 주주서한과 인터뷰에서 이 전환을 자신의 투자 방식 중 가장 뚜렷한 전환 사례로 직접 설명해왔다 — 프로필의 높은 입장 수정 성향(belief_updating) 점수와 일치하는 대목이다.",
  "warren-buffett.turning_point.3":
    "수십 년 동안, 자신의 '능력범위' 원칙에 따라 장기적인 경제성을 신뢰성 있게 예측할 수 없다는 이유로 기술 기업 투자를 피해왔다. 이후 주주서한에서 이 신중함이 실제로 대가를 치렀다고 인정했는데, 2016년에야 투자한 애플처럼 결국 투자하게 된 기업들에서 여러 해의 수익 기회를 놓친 것이 그 예다.",
  "warren-buffett.interpretation.turning_point.3":
    "이 프로필은 이 대목을 양면적인 것으로 평가하며, 이는 애초의 평가 근거와도 일치한다 — 기술 투자를 놓치게 만든 바로 그 좁은 범위의 원칙이 동시에 버크셔를 닷컴 붕괴로부터 지켜주었다.",
  "warren-buffett.life_arc.1": "네브래스카주 오마하에서 태어났다.",
  "warren-buffett.life_arc.2": "컬럼비아 대학교에서 벤저민 그레이엄에게 배우며 경제학 석사 학위를 받았다.",
  "warren-buffett.life_arc.3": "뉴욕에서 그레이엄의 회사인 그레이엄-뉴먼에서 증권분석가로 일했다.",
  "warren-buffett.life_arc.4": "오마하로 돌아와 투자조합들을 운용하기 시작했고, 이는 훗날 단일 조직인 버핏 파트너십으로 합쳐졌다.",
  "warren-buffett.life_arc.5": "당시 쇠퇴해가던 방직회사였던 버크셔 해서웨이의 경영권을 확보했다.",
  "warren-buffett.life_arc.6":
    "90대 중반에 이른 지금도 버크셔 해서웨이의 회장 겸 CEO로 재직 중이며, 상장기업 최고경영자 중 가장 오랜 재임 기록 가운데 하나다.",
  "warren-buffett.legacy":
    "버크셔 해서웨이에서 버핏이 남긴 수십 년의 실적은 투자 역사상 가장 면밀히 연구된 사례로 꼽히며, 그의 연례 주주서한은 여러 세대의 투자자들이 가치·인내·자본배분을 사고하는 방식에 영향을 끼쳤다. 그의 경영 아래 버크셔는 쇠퇴해가던 방직회사에서 세계 최대 기업 중 하나로 성장했으며, 그는 '오마하의 현인'이라는 별명으로 대표되는, 당대 가장 일관되게 성공적인 투자자라는 대중적 평판을 얻었다.",

  /* --------------------------------------- Batch 7 (exposure-priority): Rosalind Franklin */
  /* CLOSURE PASS: achievement.1 (Photograph 51) and turning_point.1 (Watson-Crick credit dispute) deleted — neither is in this person's own roster rationale. moment.1 narrowed to drop an invented "King's College / DNA fibers" return detail not in that rationale either. Profile V2 pilot (2026-08): see the EN block's comment for what changed and why. */
  "rosalind-franklin.achievement.1":
    "1951년부터 1953년까지 킹스칼리지 런던에서 프랭클린은 X선 회절을 이용해 그때까지 나온 것 중 가장 선명한 DNA 섬유 이미지 — 훗날 '사진 51번'으로 알려지는 이미지를 포함해 — 를 촬영했고, DNA가 습도에 따라 두 가지 뚜렷한 구조 형태로 존재한다는 것과 인산기 골격이 분자 바깥쪽에 위치한다는 것을 처음으로 규명했다. 동료 모리스 윌킨스는 프랭클린의 동의 없이 사진 51번을 제임스 왓슨에게 보여주었고, 왓슨과 크릭이 1953년 4월 네이처에 발표해 이중나선 모델을 공개한 논문은 '프랭클린과 윌킨스의 미발표 기여에 대한 전반적인 인지에서 자극받았다'는 짧은 각주 하나로만 그 점을 밝혔다. 프랭클린 자신의 논문은 독자적으로 도출한 근거자료를 담아 같은 호에 나란히 게재되었다.",
  "rosalind-franklin.achievement.2":
    "영국석탄이용연구협회(1942~1945)에서 진행한 석탄의 물리화학에 관한 박사 연구에서 그는 석탄의 미세구조와 다공성·투과성 사이의 관계를 규명했으며, 이는 이후 석탄·탄소 연구의 표준적인 지식이 되었다. 이어 파리에서 자크 메링 아래 진행한 박사후 연구(1947~1950)를 통해 뛰어난 X선 결정학자로 성장했고, 오늘날에도 이 분야에서 쓰이는 '흑연화 탄소'와 '비흑연화 탄소'라는 용어를 만들어냈다.",
  "rosalind-franklin.achievement.3":
    "1953년부터 1958년 사망할 때까지 버크벡 칼리지에서 프랭클린은 바이러스 구조에 관한 X선 연구를 이끌었다. 1955년에는 당시 바이러스학자들의 통념과 달리 담배모자이크바이러스 입자가 모두 균일한 길이를 갖는다는 것을 밝혀냈고, 버크벡이 그때까지 받은 것 중 가장 큰 규모의 연구비를 확보해 폴리오바이러스 구조 연구에 나섰으나 이 연구는 그의 사망으로 마무리되지 못했다.",
  "rosalind-franklin.moment.1":
    "제2차 세계대전 이후, 당시 영국에서는 쉽게 접할 수 없었던 X선 회절 결정학 기법을 배우기 위해 몇 년간 파리로 건너갔다 — 전적으로 스스로 결정한 기술 습득이었다.",
  "rosalind-franklin.moment.2":
    "킹스칼리지에서 프랭클린은 X선 촬영 중 DNA 시료의 습도를 정밀하게 조절할 수 있는 전용 카메라를 직접 제작하고 개선했다 — 습도에 따라 섬유의 구조가 측정 가능한 수준으로 달라진다는 판단에서였다. 이는 한 번의 우연한 촬영이 아니라 몇 달에 걸친 기술적 개선의 결과였으며, 바로 이 작업 덕분에 유난히 선명한 사진 51번을 얻을 수 있었다.",
  "rosalind-franklin.turning_point.1":
    "1953년 초, 킹스칼리지의 동료 모리스 윌킨스와 몇 달째 이어진 껄끄러운 관계 끝에 — 두 사람은 그의 역할을 서로 다르게 이해하고 있었는데, 윌킨스는 그를 자신을 보조하는 협력자로 여겼고 그는 스스로를 자신의 프로젝트를 이끄는 독립 연구자로 여겼다 — 프랭클린은 DNA 연구를 완전히 떠나 버크벡 칼리지로 옮겨 이전에 다뤄본 적 없는 바이러스 구조 연구를 새로 이끌게 되었다.",
  "rosalind-franklin.life_arc.1": "런던에서 태어났다.",
  "rosalind-franklin.life_arc.2": "케임브리지에서 석탄의 다공성을 연구해 물리화학 박사 학위를 받았다.",
  "rosalind-franklin.life_arc.3": "파리에서 자크 메링 아래 연구하며 뛰어난 X선 결정학자로 성장했다.",
  "rosalind-franklin.life_arc.4": "킹스칼리지 런던에서 DNA 구조를 연구하며 사진 51번을 촬영했다.",
  "rosalind-franklin.life_arc.5":
    "버크벡 칼리지에서 담배모자이크바이러스와 폴리오바이러스를 포함한 바이러스 구조 연구를 이끌었다.",
  "rosalind-franklin.life_arc.6": "런던에서 37세에 난소암으로 사망했으며, 폴리오바이러스 연구는 마무리되지 못했다.",
  "rosalind-franklin.legacy":
    "프랭클린의 X선 자료는 DNA 구조를 규명하는 데 결정적인 근거였으며, 이후 그의 바이러스 구조 연구는 구조바이러스학의 토대로 평가받는다. 그는 왓슨·크릭·윌킨스가 DNA 발견으로 노벨상을 받은 1962년보다 4년 앞서 사망했는데, 노벨상은 통상 사후에 수여되지 않는다. 그의 기여는 이후 폭넓게 재조명되고 인정받았다 — 2003년 제정된 왕립학회의 로절린드 프랭클린상은 여성의 과학기술 공헌을 기리며, 유럽우주국의 화성 탐사 로버 역시 그의 이름을 따 명명되었다.",
  "rosalind-franklin.interpretation.moment.1":
    "프로필의 선제적 행동력(proactive_agency) 점수에 비추어 보면, 이는 가까이 있는 도구만으로 버티는 대신 특정 기술을 직접 배우러 외국으로 떠난 사례다.",

  /* -------------------------------------------- Batch 7 (exposure-priority): Jane Goodall */
  /* CLOSURE PASS: moment.1 narrowed to drop an invented "no university degree" claim and an invented "most established researchers... unconventional" characterization not in this person's own roster rationale. turning_point.1 narrowed to drop an invented 1986/conference detail. */
  "jane-goodall.achievement.1":
    "1960년 곰비에서, 침팬지가 나뭇가지의 잎을 훑어내고 그것을 흰개미집에 넣어 흰개미를 낚아 올리는 모습을 관찰했다 — 인간이 아닌 동물의 도구 사용과 도구 제작을 보여주는 직접적인 증거였다. 이 소식을 접한 스승 루이스 리키는 \"이제 우리는 인간을 다시 정의하거나, 도구를 다시 정의하거나, 아니면 침팬지를 인간으로 받아들여야 한다\"고 썼다 — 그때까지 도구 제작은 인간과 다른 동물을 가르는 결정적 경계로 여겨져 왔다.",
  "jane-goodall.achievement.2":
    "1960년부터 60년이 넘는 기간 동안 곰비에서 이어간 현장 연구를 통해, 침팬지가 저마다 뚜렷한 개성과 복잡한 감정을 지니며 50년 넘게 이어지는 가족·사회적 유대를 맺는다는 사실과 더불어, 다른 영장류를 사냥하는 등 조직적인 폭력성을 지니고 있다는 사실을 함께 기록했다 — 침팬지의 행동, 나아가 인간과 다른 동물을 가르는 경계에 대한 과학적 이해 자체를 근본적으로 바꾸어 놓은 연구 성과다.",
  "jane-goodall.moment.1":
    "곰비에 도착했을 때 그녀에게는 변변한 장비도, 정식 과학 훈련도 없었다. 이 연구는 루이스 리키가 후원자를 구하려 애쓴 노력에 크게 의존해 재정을 마련했으며, 기초적인 현장 여건 속에서 자원 부족 상태였다고 널리 기록되어 있다.",
  "jane-goodall.interpretation.moment.1":
    "프로필의 자원 활용 성향(resourcefulness) 점수와 나란히 놓고 볼 대목이다 — 사실상 아무것도 없는 출발점에서 학계의 판도를 바꾼 발견을 만들어낸 것이다.",
  "jane-goodall.turning_point.1":
    "수십 년간 곰비에서의 연구에 집중해온 뒤, 자신의 활동 중심을 연구에서 보전과 옹호 활동으로 옮겼다 — 제인구달연구소를, 이후에는 청소년 프로그램인 뿌리와새싹을 세웠으며, 어떤 고용주의 지시도 없이 이루어진 일이었다.",
  "jane-goodall.interpretation.turning_point.1":
    "프로필의 선제적 행동력(proactive_agency) 점수가 실제로 드러나는 대목이다 — 어떤 고용주의 지시도 없이, 스스로 자기 경력의 방향을 바꾼 것이다.",
  "jane-goodall.life_arc.1": "태어났다.",
  "jane-goodall.life_arc.2": "정식 훈련 없이 곰비에 도착했으며, 침팬지가 도구를 만들어 사용하는 모습을 관찰했다.",
  "jane-goodall.life_arc.3": "수십 년에 걸친 현장 연구로 침팬지 행동에 대한 과학적 이해를 새롭게 바꾸어 놓았다.",
  "jane-goodall.life_arc.4": "제인구달연구소를 설립하며 연구에서 보전 활동으로 초점을 옮겼다.",
  "jane-goodall.life_arc.5": "청소년 프로그램 '뿌리와새싹'을 설립했다.",
  "jane-goodall.life_arc.6": "대통령 자유훈장을 받았다.",

  /* ---------------------------------------- Batch 7 (exposure-priority): Benjamin Franklin */
  /* CLOSURE PASS: achievement.1 narrowed to drop an invented "single council" mechanism (round 2: also dropped an invented "more than twenty years" figure — the rationale says only "decades"). achievement.2 narrowed to use this person's own rationale's exact institution name rather than an added "first in the colonies" superlative. moment.1 narrowed to drop an invented age/indenture detail. turning_point.1 narrowed to drop invented "Privy Council" / "Hutchinson letters" specifics not in the rationale (the Cockpit-hearing claim itself is retained — it is directly named there). */
  "benjamin-franklin.achievement.1":
    "1754년, 독립이 현실적인 정치적 쟁점이 되기 수십 년 전에, 당시 다른 사람들은 아직 시급하다고 여기지 않았던 구조적 필요를 읽어낸 올버니 연합안 — 식민지들의 통합된 통치를 위한 틀 — 을 내놓았다. 당시에는 거부되었지만, 이후 역사적으로 선견지명이 있었다고 평가받아 왔다.",
  "benjamin-franklin.achievement.2":
    "어떤 공식 임명도 없이 순전히 자신의 발의로 토론 모임인 준토, 필라델피아 도서관 조합, 자원 소방대, 미국철학회를 세웠다 — 그의 자서전이 거듭 되짚는, 스스로 시민 제도를 조직해내는 패턴이다.",
  "benjamin-franklin.achievement.3":
    "1752년 6월, 프랭클린은 연 실험을 통해 번개와 전기가 동일한 현상임을 보여주는 증거를 얻었다 — 연과 금속 열쇠, 라이덴병을 이용해, 벼락이 직접 내리친 것이 아니라 근처 폭풍우 구름에 의해 유도된 전하를 끌어낸 것이었다. 이 연구는 곧바로 피뢰침의 발명으로 이어졌고, 피뢰침은 유럽과 아메리카 전역의 건물에 실용적인 안전장치로 도입되었다. 이 업적으로 그는 미국 계몽주의와 물리학사의 주요 인물로 자리매김했다.",
  "benjamin-franklin.achievement.4":
    "1776년부터 프랭클린은 프랑스 주재 미국 대표로 활동했으며, 그의 외교적 노력은 1778년 2월 프랑스-미국 동맹 조약 체결에 결정적으로 기여했다 — 프랑스가 미국의 독립을 인정하고 프랑스군과 함대, 자금 지원을 전쟁에 끌어들인 공식적인 군사 동맹이었다. 이후 그는 주프랑스 미국 공사(1779~1785)를 지냈고, 전쟁을 끝맺은 1783년 파리 조약의 미국 측 협상 대표 중 한 명이었다 — 그는 독립선언서와 파리 조약, 헌법 모두에 서명한 유일한 인물로 남아 있다.",
  "benjamin-franklin.moment.1":
    "보스턴에서의 도제 생활을 떠나, 거의 무일푼으로 필라델피아에 도착했다. 그는 그 처지에서부터 자신의 인쇄업을 일으켰는데, 이는 그가 직접 자서전에서 들려주는 이야기다.",
  "benjamin-franklin.interpretation.moment.1":
    "프로필의 자원 활용 성향(resourcefulness) 점수를 보여주는 한 사례다 — 거의 아무것도 없는 상태에서 실제로 돌아가는 사업을 일으켰다는, 본인의 말로 남은 기록이다.",
  "benjamin-franklin.turning_point.1":
    "오랫동안 국왕에게 충성하는 신민으로서 식민지와 영국 사이의 화해를 모색했지만, 1774년의 '콕핏' 청문회에서 공개적으로 굴욕을 당한 이후 독립 지지 쪽으로 확실히 돌아섰다. 이는 그 전에 거듭 실패한 여러 화해 시도 가운데 하나였다.",
  "benjamin-franklin.interpretation.turning_point.1":
    "프로필의 입장 수정 성향(belief_updating) 점수를 이해하는 데 도움이 되는 대목이다 — 이는 한순간의 극적인 전향이 아니라, 영국의 완강한 태도가 쌓여가는 증거에 맞춰 시간을 두고 추적할 수 있는 정치적 입장 변화로 기록되어 있다.",
  "benjamin-franklin.life_arc.1": "태어났다.",
  "benjamin-franklin.life_arc.2": "연 실험을 통해 번개가 전기 현상임을 보였고, 이는 피뢰침 발명으로 이어졌다.",
  "benjamin-franklin.life_arc.3": "독립이 현실적 쟁점이 되기 수십 년 전, 올버니 연합안을 제안했다.",
  "benjamin-franklin.life_arc.4": "굴욕적인 '코크핏' 청문회 이후, 영국과의 화해 모색에서 독립 지지로 입장을 바꾸었다.",
  "benjamin-franklin.life_arc.5": "프랑스에서 미국을 대표했으며, 동맹 조약과 파리 조약 체결을 이끄는 데 기여했다.",
  "benjamin-franklin.life_arc.6": "사망했다.",

  /* ------------------------------------- Batch 7 (exposure-priority): Srinivasa Ramanujan */
  /* CLOSURE PASS: moment.1 narrowed to drop an invented 1913 date and an invented Hardy-reaction/Cambridge-invitation outcome not in this person's own roster rationale. moment.2 (the taxicab-1729 anecdote) deleted outright — it is not in that rationale either. */
  "srinivasa-ramanujan.achievement.1":
    "식민지 시대 인도에서 고급 수학 문헌을 접할 길이 거의 없던 그는, 낡은 교재 한 권 — G. S. 카의 「시놉시스」 — 에 거의 전적으로 의지해 수학의 광범위한 영역을 재구성하고 확장해냈다 — 가진 것이 거의 없는 상태에서 독자적으로 재구성해낸, 심각한 자원 제약의 사례다.",
  "srinivasa-ramanujan.achievement.2":
    "라마누잔은 1914년부터 1919년까지 케임브리지에서 G. H. 하디와 함께 연구하며 정수론 전반에 걸친 성과를 냈다 — 하디와 공동으로 분할함수에 대한 점근 공식을 도출했고, 생애 마지막 해에는 '가짜 세타 함수(mock theta functions)'라 이름 붙인 완전히 새로운 종류의 대상을 발견했다. 1918년 5월에는 왕립학회 회원으로 선출되었는데, 학회 역사상 가장 젊은 회원 중 한 명이었을 뿐 아니라 인도인으로서는 두 번째로 선출된 회원이었으며, 같은 해 10월에는 인도인 최초로 케임브리지 트리니티 칼리지 펠로로 선출되었다. 그의 연구 결과가 담긴 노트 한 권은 수십 년간 잊혀 있다가 1976년 수학자 조지 앤드루스에 의해 재발견되어 학계에 큰 흥분을 불러일으켰다고 전해지며, 2012년까지도 수학자들은 그가 무심코 적어 놓은 언급들 속에서 이전에는 증명되지 않았던 진짜 정리들을 계속 확인해 냈다.",
  "srinivasa-ramanujan.moment.1":
    "아무런 공식 학력도, 소개도 없이, 케임브리지의 수학자 G. H. 하디에게 자신이 직접 도출한 결과들을 담은 편지를 보냈다 — 그전에 편지를 보낸 여러 수학자 중 대부분이 답장을 하지 않았다.",
  "srinivasa-ramanujan.interpretation.moment.1":
    "프로필의 선제적 행동력(proactive_agency) 점수와 일치하는 대목이다 — 자신에게 대부분 닫혀 있던 제도적 경로를 통해 발견되기를 기다리는 대신, 자신의 결과를 알아볼 수 있는 수학자들에게 직접 전달한 것이다.",
  "srinivasa-ramanujan.life_arc.1": "태어났다.",
  "srinivasa-ramanujan.life_arc.2": "고급 문헌을 접할 수 없는 상황에서, 낡은 교재 한 권만으로 수학의 여러 영역을 독자적으로 재구성했다.",
  "srinivasa-ramanujan.life_arc.3": "케임브리지의 수학자 G. H. 하디에게 직접 편지를 보내 자신이 도출한 결과를 동봉했다.",
  "srinivasa-ramanujan.life_arc.4": "케임브리지에서 하디와 함께 연구하며 정수론과 모크 세타 함수에 걸친 성과를 냈다.",
  "srinivasa-ramanujan.life_arc.5": "왕립학회 회원 및 케임브리지 트리니티 칼리지 펠로로 선출되었다.",
  "srinivasa-ramanujan.life_arc.6": "사망했다.",

  /* ----------------------------------------- Batch 7 (exposure-priority): Oprah Winfrey */
  "oprah-winfrey.achievement.1":
    "1986년, 방송사나 배급사에 고용된 진행자로 남는 대신 자신의 프로그램을 직접 소유하고 통제하기 위해 하포 프로덕션을 설립했다 — 당시로서는 이례적으로 이른, 제작자가 스스로 소유하는 미디어를 향한 행보였고, 이후 수십 년간 자신의 경력을 스스로 이끌어가는 수단이 되었다.",
  "oprah-winfrey.achievement.2":
    "오프라 윈프리 쇼는 1986년부터 2011년까지 25년간 전국 신디케이션 방송으로 이어졌으며, 그 기간 대부분 미국에서 시청률이 가장 높은 낮 시간대 토크쇼로 자리 잡았다. 1993년 마이클 잭슨과의 인터뷰는 약 3,650만 명의 시청자를 끌어모아, 미국 텔레비전 역사상 가장 많이 시청된 인터뷰 중 하나로 남았다. 1996년부터는 그녀가 방송에서 추천한 도서들이 저자에게 통상 100만 부 가량의 추가 판매로 이어지는 것이 확인되었으며, 이는 출판업계에 '오프라 효과'로 알려진 뚜렷한 영향을 남겼다.",
  "oprah-winfrey.turning_point.1":
    "1980년대에 경쟁 데이타임 토크쇼들이 선정적이고 타블로이드적인 형식으로 옮겨가는 동안, 자신의 프로그램을 개인적이고 공감을 이끌어내는 이슈 중심의 대화로 방향을 틀었다 — 당시 같은 장르의 다른 프로그램들이 향하던 방향과는 다른 쪽에 건 승부수였다.",
  "oprah-winfrey.interpretation.turning_point.1":
    "프로필의 기회 감지(opportunity_sensing) 점수가 실제로 드러나는 대목이다 — 경쟁 프로그램들이 다른 곳에 승부를 걸고 있을 때, 시청자들이 실제로 원하는 것이 달라지고 있음을 읽어낸 것이다.",
  "oprah-winfrey.life_arc.1": "태어났다.",
  "oprah-winfrey.life_arc.2": "자신의 텔레비전 프로그램을 온전히 소유하고 통제하기 위해 하포 프로덕션을 설립했다.",
  "oprah-winfrey.life_arc.3": "선정적인 경향이 강하던 장르 흐름과 달리, 자신의 프로그램을 개인적이고 공감적인 대화 중심으로 바꾸었다.",
  "oprah-winfrey.life_arc.4": "마이클 잭슨과의 인터뷰가 약 3,650만 명의 시청자를 끌어모은 것으로 추산되었다.",
  "oprah-winfrey.life_arc.5": "25년간 최고 시청률을 기록한 '오프라 윈프리 쇼'의 신디케이션 방영을 마쳤다.",

  /* --------------------------------------- Batch 7 (exposure-priority): Wangari Maathai */
  /* CLOSURE PASS: moment.1 narrowed to drop an invented "tens of millions of trees" outcome. turning_point.1 narrowed to drop the 2004/Nobel Peace Prize claim entirely — this person's own roster rationale documents the government opposition/arrests but never mentions the Nobel Prize by name, date, or specific award rationale (only a bare `nobel_laureate` tag, which is not prose content this pipeline may narrate from). */
  "wangari-maathai.achievement.1":
    "1977년, 케냐에서 목격한 삼림 파괴와 토양 침식을 농촌 여성들이 물과 땔감을 구하러 다니며 짊어지는 일상적 부담과 직접 연결지어 그린벨트 운동을 창설했다 — 당시 환경운동의 통상적인 틀과는 다르게, 환경 복원과 풀뿌리 차원의 생활 개선을 하나로 엮은 접근이었다.",
  "wangari-maathai.achievement.2":
    "2004년 마타이는 '지속가능한 발전과 민주주의, 평화에 기여한 공로'로 노벨 평화상을 수상했다 — 아프리카 여성으로서는 최초, 환경운동가로서도 최초의 수상이었다. 2006년에는 그린벨트 운동을 통해 구축한 조림과 시민 교육 모델을 전 지구적 차원으로 확장한 유엔의 '10억 그루 나무 심기 캠페인'을 주도했다.",
  "wangari-maathai.moment.1":
    "운동 초기에는 별다른 제도적 자금 지원 없이, 간단하고 비용이 적게 드는 지역 방식으로 농촌 여성들을 조직해 묘목을 심게 했다.",
  "wangari-maathai.interpretation.moment.1":
    "프로필의 자원 활용 성향(resourcefulness) 점수를 보여주는 한 사례다 — 의도적으로 최소한의 물적 수단만으로 크고 지속적인 프로그램을 일구어낸 것이다.",
  "wangari-maathai.turning_point.1":
    "그린벨트 운동의 활동은 그녀를 당시 케냐 정부와 거듭 정면으로 충돌하게 만들었고, 여러 차례의 체포와 그녀를 향한 폭력이 기록으로 남아 있다. 그럼에도 그녀는 그 개인적 대가와 무관하게 이 반대 속에서도 조직 활동을 이어갔다.",
  "wangari-maathai.interpretation.turning_point.1":
    "프로필의 선제적 행동력(proactive_agency) 점수와 일치하는 대목이며, 이 프로필에서는 양면적인 것으로 표시되어 있다 — 운동을 일구어낸 바로 그 자발적 조직 활동이 동시에 직접적인 개인적·법적 위험도 불러온 것이다.",
  "wangari-maathai.life_arc.1": "태어났다.",
  "wangari-maathai.life_arc.2": "그린벨트 운동을 설립해 재조림을 농촌 여성들의 일상적 삶과 연결지었다.",
  "wangari-maathai.life_arc.3": "운동 초기, 농촌 여성들을 조직해 간단하고 저비용인 현지 방식으로 묘목을 심게 했다.",
  "wangari-maathai.life_arc.4": "당시 케냐 정부 아래에서 조직 활동으로 인해 여러 차례 체포되고 폭력을 겪었다.",
  "wangari-maathai.life_arc.5": "노벨 평화상을 받았다 — 아프리카 여성 최초, 환경운동가 최초의 수상이었다.",
  "wangari-maathai.life_arc.6": "사망했다.",

  /* CLOSURE PASS: achievement.1 (child-prodigy touring) deleted — not in this person's own roster rationale. turning_point.1 narrowed to drop an invented Archbishop's name and the invented "literal kick from a steward" anecdote; Vienna and the freelance-vs-fixed-position framing are retained since both are directly in that rationale. Profile V2 pilot (2026-08): see the EN block's comment for what changed and why. */
  "wolfgang-amadeus-mozart.achievement.1":
    "약 30년에 걸친 작곡 활동 동안 모차르트는 쾨헬 번호로 정리된 800곡이 넘는 작품을 남겼다 — 어린 시절에 쓴 초기 미뉴에트인 K.1부터 미완성으로 남은 레퀴엠 K.626까지다. 그의 작품은 교향곡(41곡), 협주곡(피아노협주곡만 27곡), 오페라, 실내악, 종교음악에 이르기까지 각 장르를 일회성이 아닌 지속적인 작업으로 다뤘다.",
  "wolfgang-amadeus-mozart.achievement.2":
    "대본가 로렌초 다 폰테와 함께 작업한 원숙기 오페라 「피가로의 결혼」(1786)과 「돈 조반니」(1787)은 당대 오페라 부파의 관습에서 벗어나 희극적 요소와 진지한 요소를 결합했으며, 마지막 오페라 「마술피리」(1791)와 함께 오늘날에도 오페라 극장의 핵심 레퍼토리로 남아 있다.",
  "wolfgang-amadeus-mozart.moment.1":
    "1762년 빈 궁정을 방문해 누나와 함께 마리아 테레지아 여제 앞에서 연주한 것을 시작으로, 모차르트의 아버지는 1763년부터 1766년까지 두 남매를 데리고 유럽 궁정들을 도는 순회공연에 나섰다 — 1763년 12월에는 베르사유에서 2주간 머물렀고, 1764년 4월에는 런던에서 조지 3세와 샬럿 왕비 앞에서 연주했다. 이는 그의 전문 작곡가 경력이 본격적으로 시작되기 훨씬 전, 대중 앞에서 연주로 다져진 시간이었다.",
  "wolfgang-amadeus-mozart.moment.2":
    "1788년 여름, 모차르트는 마지막 세 교향곡 — 39번(6월 26일), 40번(7월 25일), 41번('주피터', 8월 10일) — 을 약 6주 만에 완성했다. 그의 작품 활동 전체에서 가장 집중적인 생산성을 보인 시기 중 하나로 기록되지만, 이 세 곡을 촉발한 특정 계기가 있었는지는 확인되지 않는다.",
  "wolfgang-amadeus-mozart.turning_point.1":
    "1781년, 잘츠부르크 대주교 밑에서 궁정 음악가로 일하던 자리를 그만두고, 고정된 궁정 자리 대신 빈에서 프리랜서 작곡가 겸 연주자로서 독립적인 경력을 적극적으로 추구했다 — 당대 작곡가로서는 이례적인 방식이었다.",
  "wolfgang-amadeus-mozart.interpretation.turning_point.1":
    "프로필의 양면적인 선제적 행동력(proactive_agency) 점수에 비추어 보면, 이 선택은 당대 작곡가로서는 드문 창작과 직업적 독립을 그에게 안겨주었지만, 동시에 안정적인 봉급 대신 위촉과 연주, 교습에 기대야 했던 만큼 남은 생애 내내 재정적으로 불안정한 처지에 놓이게도 했다.",
  "wolfgang-amadeus-mozart.life_arc.1": "잘츠부르크에서 태어났다.",
  "wolfgang-amadeus-mozart.life_arc.2": "아버지·누나와 함께 유럽 궁정을 순회하며 신동 연주자로 활동했다.",
  "wolfgang-amadeus-mozart.life_arc.3": "잘츠부르크 대주교의 궁정악사로 일했다.",
  "wolfgang-amadeus-mozart.life_arc.4": "궁정 고용에서 벗어나 빈에 정착해 독립 작곡가로 활동하기 시작했다.",
  "wolfgang-amadeus-mozart.life_arc.5":
    "「피가로의 결혼」, 「돈 조반니」, 「마술피리」 등 가장 오래 사랑받는 오페라와 후기 교향곡들을 작곡했다.",
  "wolfgang-amadeus-mozart.life_arc.6": "35세에 빈에서 사망했으며, 레퀴엠은 미완성으로 남았다.",
  "wolfgang-amadeus-mozart.legacy":
    "모차르트의 오페라·교향곡·실내악 작품들은 그의 사후에도 끊임없이 연주되어 왔으며, 그는 서양 고전음악 전통에서 가장 중요한 작곡가 가운데 한 명으로 평가받는다. 그의 화성적·구조적 혁신, 그리고 당대 거의 모든 음악 형식을 아우른 방대한 작품 세계는 이후 여러 세대의 작곡가들에게 영향을 끼쳤다.",

  /* -------------------------------------- Batch 7 (exposure-priority): Mahatma Gandhi */
  /* CLOSURE PASS: achievement.1 narrowed to drop an invented "early 1900s" date and an invented "discriminatory laws targeting the Indian community" characterization — this person's own roster rationale describes only "local grievances in South Africa." CLOSURE PASS round 2: turning_point.1 also had an invented "Dandi" destination, "salt tax and monopoly" legal mechanism, and a "chosen specifically because..." motivation — none in the rationale, which names only "the Salt March... in deliberate defiance of British law"; narrowed to that. */
  "mahatma-gandhi.achievement.1":
    "부당한 법에 맞선 조직적이고 규율 있는 시민 불복종인 사티아그라하를, 남아프리카에서의 여러 지역적 불만에 대응해 처음으로 만들고 시험했다 — 훗날 같은 방법을 훨씬 더 큰 규모로 인도 독립운동에 적용하기 여러 해 전의 일이었다.",
  "mahatma-gandhi.achievement.2":
    "간디는 1920년부터 1942년까지 비협조 운동, (1930년 소금 행진을 포함한) 소금 사티아그라하, 인도 철수 운동이라는 세 차례의 전국적 시민 불복종 운동을 이끌었다 — 무력 투쟁이 아니라 지속적이고 조직적인 비폭력 저항에 기반한 운동들이었으며, 그때마다 대규모 체포가 뒤따랐고 그 자신도 거듭 투옥되었다. 그는 이 운동들을 인도국민회의와 더 넓은 독립운동 안에서 여러 지도자 가운데 한 사람으로서 이끌었으며, 그가 관여하기 전부터 이미 진행 중이던 다른 지역 운동들도 있었다. 영국은 인도 철수 운동으로 그가 마지막으로 투옥된 지 몇 달 뒤인 1947년 8월 인도의 독립을 승인했고, 이때 인도는 인도와 파키스탄으로 분할되었다.",
  "mahatma-gandhi.turning_point.1":
    "1930년, 영국법에 대한 의도적인 저항으로서 소금 행진을 스스로 조직하고 이끌었다 — 24일간 240마일을 행진한, 구체적이고 스스로 시작한 시민 불복종 행위였다.",
  "mahatma-gandhi.interpretation.turning_point.1":
    "프로필의 높은 선제적 행동력(proactive_agency) 점수와 맞닿아 있으며, 기록으로 직접 확인되는 대목이다 — 누군가의 발의에 대응한 것이 아니라, 스스로 구상하고 이끈 구체적이고 계획된 시민 불복종 행위였다.",
  "mahatma-gandhi.life_arc.1": "태어났다.",
  "mahatma-gandhi.life_arc.2": "남아프리카에서 지역 현안에 맞서 조직적 시민 불복종인 사티아그라하를 처음 시도하고 발전시켰다.",
  "mahatma-gandhi.life_arc.3": "영국 지배에 맞서 전국적인 시민 불복종 운동을 세 차례 이끌었다.",
  "mahatma-gandhi.life_arc.4": "영국 법에 맞서 240마일에 이르는 소금 행진을 직접 조직하고 이끌었다.",
  "mahatma-gandhi.life_arc.5": "그의 마지막 투옥 이후 몇 달 만에 인도가 독립했으며, 국가는 분할되었다.",
  "mahatma-gandhi.life_arc.6": "사망했다.",

  /* -------------------------------- Remaining-19 Completion Batch 1 (2026-08) */
  "simone-biles.achievement.1":
    "2016·2020·2024년 세 차례의 올림픽과 여섯 차례의 세계선수권을 거치며 남녀를 통틀어 역대 가장 많은 메달을 딴 체조 선수가 되었다 — 올림픽 메달 11개, 세계선수권 메달 30개(그중 금메달 23개). 2018년 도하 세계선수권에서는 미국인 최초로, 또한 국적을 불문하고 역대 열 번째로 단일 세계선수권 대회 전 종목에서 메달을 딴 선수가 되었다.",
  "simone-biles.achievement.2":
    "도마·마루·평균대 세 종목에 걸쳐 그의 이름을 딴 \"바일스\"라는 기술이 네 개나 존재한다 — 모두 체조 최고 난도로 인정받는 기술로, 처음 선보인 뒤 여러 해가 지나도록 다른 선수들이 거의 시도조차 하지 못하고 있다.",
  "simone-biles.moment.1":
    "2018년 1월 18일, 바일스는 전 미국체조협회 팀 주치의 래리 나사르가 자신을 성폭행했으며 협회가 이를 은폐하는 데 관여했다고 공개적으로 밝혔다. 그해 그는 다른 피해자들과 함께 아서 애시 용기상을 받았고, 2018년 미국 내셔널 챔피언십에서는 나사르의 다른 피해자들과 연대하는 뜻으로 청록색 레오타드를 입고 경기에 나섰다.",
  "simone-biles.moment.2":
    "2018년 도하 세계선수권 예선 전날 밤, 바일스는 신장결석으로 응급실을 찾았다. 그런데도 도마와 평균대에서 실수가 있었음에도 개인종합 결선에서 1.7점 차로 우승했고, 이후 자신의 이름이 붙게 되는 새로운 기술로 도마 종목 세계선수권 첫 금메달을 따냈다.",
  "simone-biles.turning_point.1":
    "2020 도쿄 올림픽에서 바일스는 공중에서 방향감각을 잃는 이른바 \"트위스티스\" 증상을 겪어 회전 기술을 안전하게 수행할 수 없게 되자, 자신의 정신건강을 이유로 단체전과 개인전 대부분의 결선에서 기권했다. 이 결정은 당시 \"어떤 상황에서도 팀을 위해 출전을 지켜야 한다\"는 논조의 거센 비판을 받았지만, 이후 몇 년 사이 엘리트 스포츠 안팎에서 선수 정신건강을 더 공개적으로 논의하게 되면서 평가가 크게 달라졌다. 그는 2023년 복귀했고, 2024년에는 올림픽 개인종합과 도마에서 다시 금메달을 땄다.",
  "simone-biles.interpretation.turning_point.1":
    "프로필의 양면적인 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 강한 제도적·대중적 압박에 맞서 스스로 내린 결정이었고, 그에 대한 평가는 2021년과 2024년 복귀 사이에 크게 달라졌다.",
  "simone-biles.life_arc.1": "오하이오주 콜럼버스에서 태어났으며, 위탁 가정에서 지내던 시기를 거쳐 여동생과 함께 외조부와 그 배우자에게 입양되었다.",
  "simone-biles.life_arc.2": "16세에 첫 세계선수권 개인종합 우승을 차지하며, 이 타이틀을 딴 최초의 흑인 여성이 되었다.",
  "simone-biles.life_arc.3": "2016년 리우 올림픽에서 당시 미국 신기록인 금메달 4개를 땄다.",
  "simone-biles.life_arc.4": "미국체조협회 팀 주치의 래리 나사르에게 성폭행당했다는 사실을 공개적으로 밝혔다.",
  "simone-biles.life_arc.5": "정신건강을 이유로 도쿄 올림픽 대부분의 종목에서 기권했다.",
  "simone-biles.life_arc.6": "경기에 복귀해 2024년 파리 올림픽 개인종합과 도마에서 금메달을 땄다.",
  "simone-biles.legacy":
    "바일스는 기술 난도의 기준 자체를 다시 썼다 — 그의 이름이 붙은 기술들은 처음 등장한 지 여러 해가 지나도록 여전히 실전에서 가장 어려운 축에 속한다. 동시에 2021년 도쿄에서의 기권은, 부상이나 심리적 고통 속에서도 경기를 지속해야 한다는 제도적·대중적 기대와 선수의 정신건강 사이의 균형을 둘러싼 논의에서 널리 인용되는 사례가 되었다.",

  "serena-williams.achievement.1":
    "1995년부터 2022년까지 이어진 프로 선수 생활 동안 그랜드슬램 단식 타이틀 23회를 차지해 오픈 시대 최다 기록을 세웠고, 단식과 복식 모두에서 커리어 골든 슬램을 달성했다.",
  "serena-williams.achievement.2":
    "두 차례(2002~2003년, 2014~2015년)에 걸쳐 4대 메이저 단식 타이틀을 동시에 보유했다 — 흔히 \"세리나 슬램\"이라 불리는 이 기록은 테니스 역사에서 손에 꼽을 만큼 드문 성취다.",
  "serena-williams.moment.1":
    "아버지 리처드 윌리엄스는 가족을 캘리포니아주 콤프턴으로 이주시킨 뒤 세리나와 언니 비너스를 어린 시절부터 직접 지도했는데, 이는 두 딸이 태어나기도 전부터 계획해 둔 훈련 경로였다.",
  "serena-williams.moment.2":
    "2017년 호주오픈에서, 임신 약 8주차의 몸으로 언니 비너스를 결승에서 꺾고 자신의 23번째 메이저 단식 타이틀을 차지했다.",
  "serena-williams.turning_point.1":
    "2017년 9월 출산 이후 윌리엄스는 폐색전증과 그에 따른 합병증을 겪었다. 그는 이전에 혈전증을 앓았던 자신의 병력에 근거해 증상을 알렸지만, 의료진이 곧바로 필요한 검사를 진행하지 않았고 결국 자신이 직접 특정 검사를 요구하고 나서야 대응이 이루어졌다고 말한 바 있다. 이후 몇 년 사이 그는 흑인 여성의 출산 건강을 위한 대표적인 공적 옹호자로 활동하게 되었다.",
  "serena-williams.interpretation.turning_point.1":
    "프로필의 독립적 사고(independent_thinking)와 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 의료진의 초기 회의적 반응에 맞서 자신의 진단을 스스로 관철해야 했던 경험이, 이전에는 하지 않았던 옹호 활동으로 직접 이어진 것으로 보인다.",
  "serena-williams.life_arc.1": "미시간주 새기노에서 태어났으며, 이후 가족이 캘리포니아주 콤프턴으로 이주해 아버지에게 테니스를 배우기 시작했다.",
  "serena-williams.life_arc.2": "14세에 프로로 전향했다.",
  "serena-williams.life_arc.3": "1999년 US오픈에서 첫 그랜드슬램 단식 타이틀을 차지했다.",
  "serena-williams.life_arc.4": "\"세리나 슬램\"이라 불리는, 4대 메이저 타이틀 동시 보유를 처음으로 달성했다.",
  "serena-williams.life_arc.5": "2017년 임신한 몸으로 호주오픈에서 23번째 메이저 타이틀을 땄고, 그해 말 출산 후 심각한 합병증을 겪었다.",
  "serena-williams.life_arc.6": "2022년 프로 테니스 은퇴를 발표했다.",
  "serena-williams.legacy":
    "23회의 그랜드슬램 단식 우승과 거의 20년에 이르는 꾸준한 지배력은 여자 테니스에서 선수 생명과 파워에 대한 기대치 자체를 바꿔 놓았고, 자신의 출산 합병증 경험을 공개적으로 알린 일은 흑인 여성의 출산 건강 문제를 스포츠를 넘어 주류 옹호 의제로 끌어올리는 데 기여했다.",

  "richard-feynman.achievement.1":
    "줄리언 슈윙거, 도모나가 신이치로와 함께 양자전기역학의 현대적 정식화를 이루어냈다 — 오늘날 파인먼 다이어그램이라 불리는 도식화 기법과 양자역학의 경로적분 접근법이 그것이다. 세 사람은 이 업적으로 1965년 노벨 물리학상을 공동 수상했다.",
  "richard-feynman.achievement.2":
    "1961년부터 1964년까지 캘리포니아 공과대학에서 진행한 학부 강의는 이후 《파인먼의 물리학 강의》로 출간되어, 60년이 넘도록 물리학 교육 자료로 널리 활용되고 있다.",
  "richard-feynman.moment.1":
    "로스앨러모스에서 맨해튼 프로젝트에 참여하던 시절, 파인먼은 여가 시간에 동료들의 서류함 자물쇠 다이얼을 풀어보곤 했는데, 상당수가 공장 초기 설정 그대로 방치되어 있음을 발견하고는 서류함 안에 장난 쪽지를 남기곤 했다 — 훗날 회고록 《파인먼 씨, 농담도 잘하시네!》에 실린 여러 일화 중 하나다.",
  "richard-feynman.moment.2":
    "1949년부터 1952년까지 브라질에서 방문교수로 지내는 동안, 파인먼은 타악기인 프리지데이라 연주법을 익혔고 아마추어 봉고·콩가 연주자로서 뮤지컬 오케스트라 피트에 앉아 연주할 정도로 열정을 쏟았다 — 이후 평생 물리학과 나란히 이어간 취미였다.",
  "richard-feynman.turning_point.1":
    "1986년 우주왕복선 챌린저호 참사를 조사한 로저스 위원회의 공개 청문회에서, 파인먼은 셔틀의 오링 소재 조각을 클램프에 고정해 얼음물에 담그는 실험을 생방송 중에 직접 시연했다 — 저온에서 소재의 탄력이 사라진다는 사실을 보여준 것으로, 훗날 조사단이 참사의 원인 중 하나로 지목한 바로 그 기계적 결함이었다. 이는 위원회의 예정된 절차 밖에서 그가 스스로 벌인 일이었다.",
  "richard-feynman.interpretation.turning_point.1":
    "프로필의 높은 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 그가 너무 느리다고 판단한 공식 절차를 우회한, 승인받지 않은 구체적 행동이었으며, 이를 계기로 그의 대중적 위상도 자기 분야 안에서만 알려진 물리학자에서 전국적으로 알려진 인물로 바뀌었다.",
  "richard-feynman.life_arc.1": "뉴욕주 퀸스에서 태어났다.",
  "richard-feynman.life_arc.2": "로스앨러모스에서 한스 베테가 이끄는 이론분과 소속으로 맨해튼 프로젝트에 참여했고, 1945년 7월 트리니티 핵실험 현장에 있었다.",
  "richard-feynman.life_arc.3": "캘리포니아 공과대학에 합류해 양자전기역학에 대한 도식적 접근법을 발전시켰고, 훗날 《파인먼의 물리학 강의》로 출간되는 강의를 진행했다.",
  "richard-feynman.life_arc.4": "줄리언 슈윙거, 도모나가 신이치로와 함께 1965년 노벨 물리학상을 공동 수상했다.",
  "richard-feynman.life_arc.5": "1986년 챌린저호 참사를 조사한 로저스 위원회에 참여했다.",
  "richard-feynman.life_arc.6": "로스앤젤레스에서 세상을 떠났다.",
  "richard-feynman.complexities.1":
    "파인먼 자신이 직접 쓴 글, 특히 회고록 《파인먼 씨, 농담도 잘하시네!》에는 훗날 독자와 평론가들 사이에서 점점 더 비판적으로 재조명되고 있는, 여성을 대하는 그의 행동에 관한 일화들이 담겨 있다 — 데이트하고 싶었던 어린 여성들을 속이기 위해 학부생 행세를 했다거나, 업무 관련 회의 중 일부를 스트립클럽에서 가졌다는 내용 등이다. 이는 타인의 주장이 아니라 그 자신이 직접 밝힌 자기 행동에 대한 기록이며, 주로 과학적 업적과 교육자로서의 유산으로 기억되는 이 인물에 대한 단순히 호의적이기만 한 현대적 평가를 한층 복잡하게 만든다.",
  "richard-feynman.legacy":
    "파인먼 다이어그램과 경로적분 정식화는 오늘날까지도 이론물리학 전반의 표준 도구로 쓰이며, 《파인먼의 물리학 강의》는 강의가 녹음된 지 수십 년이 지난 지금도 물리학도들 사이에서 참고서로 남아 있다. 챌린저호 참사의 원인을 밝혀낸 그의 공개적 역할은 오늘날까지도 회자되는 하나의 모범을 남겼다 — 현직 과학자가 기술적 발견을 일반 대중에게 직접, 눈에 보이는 방식으로 전달한 사례다.",

  /* --- 이븐 할둔: 고대·중세 인물에 대한 엄격한 사료 구분 원칙을 적용 --- */
  "ibn-khaldun.achievement.1":
    "1377년 저술한 《무깟디마》는 그가 계획한 보편사(普遍史)의 방법론적 서론으로, 왕조의 흥망을 이끄는 원동력으로서 아사비야(집단적 결속력) 개념을 발전시켰다. 이 저작은 역사학·사회학·경제사상의 시조 격 문헌으로 널리 평가받는다.",
  "ibn-khaldun.achievement.2":
    "카이로에서 법학자로서 쌓은 또 다른 경력에서, 1384년부터 1406년 사망할 때까지 말리키 법학파의 대카디(수석 판관)에 여섯 차례나 임명되었다 — 거듭 해임되고도 거듭 재임명되었다는 사실은, 그의 사법 개혁 시도가 번번이 조정과 마찰을 빚었음에도 맘루크 조정이 그를 법률 권위자로 계속 필요로 했음을 보여준다.",
  "ibn-khaldun.moment.1":
    "1401년, 몽골 정복자 티무르가 다마스쿠스를 포위했을 때, 이븐 할둔은 밧줄에 매달려 성벽을 내려가 그와 직접 협상했다. 그 자신의 자서전에 따르면 티무르는 마그레브 지역의 지리와 정세에 대해 그에게 상세히 캐물었고, 이븐 할둔은 이후 이 만남에 대한 상세한 기록을 남겼을 뿐 아니라 페스의 마린 왕조 통치자들을 위해 티무르에 관한 별도의 보고서를 작성했다.",
  "ibn-khaldun.moment.2":
    "1357년, 페스에서 마린 왕조 술탄을 섬기던 중 정치적 갈등으로 22개월간 투옥되었다 — 튀니스·페스·그라나다·베자이아의 여러 경쟁 왕조를 오가며 보낸 경력에서 겪은 여러 차례의 투옥과 갑작스러운 해임 가운데 하나였다.",
  "ibn-khaldun.turning_point.1":
    "1375년, 북아프리카와 안달루시아의 여러 경쟁 왕조를 오가며 약 20년을 보낸 끝에, 이븐 할둔은 가족과 함께 외딴 요새 칼라트 이븐 살라마로 물러나 약 3년간 머물며 제대로 된 서고도 없이 대부분 기억에 의존해 글을 썼다. 그곳에서 완성한 《무깟디마》가, 그 이전의 행정 경력이 아니라, 그의 오랜 명성의 토대가 되었다.",
  "ibn-khaldun.interpretation.turning_point.1":
    "이 프로필은 그의 자기주도적 이직 패턴 자체를 양면적으로 평가하는데, 이 일화가 바로 그 이유를 보여준다 — 자신의 경력을 지배해 온 후원과 정치적 불안정의 순환에서 스스로 벗어나기로 한 결정이, 결과적으로 그의 가장 오래 남을 저작을 낳았다.",
  "ibn-khaldun.life_arc.1": "튀니스에서 학자·관료 가문 출신의 안달루시아계 가정에서 태어났다.",
  "ibn-khaldun.life_arc.2": "17세에 흑사병으로 부모를 모두 잃었다.",
  "ibn-khaldun.life_arc.3": "튀니스·페스·그라나다·베자이아의 여러 통치자 아래에서 행정·외교 관직을 두루 지냈으며, 그중 페스에서는 22개월간 투옥되기도 했다.",
  "ibn-khaldun.life_arc.4": "칼라트 이븐 살라마 요새로 물러나 《무깟디마》를 저술했다.",
  "ibn-khaldun.life_arc.5": "카이로에 정착해 대카디에 거듭 임명되고 해임되기를 반복했다.",
  "ibn-khaldun.life_arc.6": "1401년 포위된 다마스쿠스 밖에서 티무르와 직접 협상했고, 1406년 여섯 번째 카디 임명 한 달 만에 카이로에서 세상을 떠났다.",
  "ibn-khaldun.legacy":
    "《무깟디마》의 이론적 틀 — 집단적 결속력을 왕조 흥망의 원동력으로 보고, 정복 집단이 기존 문명을 흡수했다가 다시 새로운 세력에 밀려나는 순환을 설명하는 관점 — 은 오늘날 사회학·역사학·경제사상의 시조적 기여로 인정받으며, 그가 평생 대부분을 전업 학자가 아니라 현직 법학자·관료로 지냈음에도 불구하고 수 세기가 지난 지금까지도 사상사 연구자들 사이에서 연구되고 있다.",

  /* --- 공자: 고대 인물에 대한 엄격한 사료 구분 원칙을 적용 --- */
  "confucius.achievement.1":
    "육예(六藝)를 중심으로 한 사학(私學)을 열어, 세습 신분에 관계없이 배움의 문을 열었다 — 전통에 따르면 수천 명에 이르는 제자를 두었다고 하며, 이는 그가 살아있던 당대에 이미 귀족만이 정규 교육을 받을 수 있던 통념에서 벗어난, 기록으로 뒷받침되는 행보였다.",
  "confucius.moment.1":
    "노나라를 떠나 여러 나라를 떠돌던 10여 년 사이, 진(陳)과 채(蔡) 사이에서 그와 제자들이 식량이 끊겨 곤경에 처했다는 이야기가 전해진다. 후대의 기록들은 이때 공자가 이를 가르침을 포기할 이유가 아니라 제자의 지조를 시험하는 계기로 삼았다고 전하지만, 이 일화는 그의 사후 한참 뒤에 정리된 전승을 통해 주로 알려진 것이며 동시대의 기록은 아니다.",
  "confucius.moment.2":
    "그의 사후 제자들이 정리한 《논어》에 따르면, 공자는 스스로를 \"짓는 자가 아니라 전하는 자(述而不作)\"라 표현했다고 한다 — 새로운 학설을 만들어내기보다 이어받은 지혜를 전하는 사람으로 자신을 자리매김한 것이다.",
  "confucius.life_arc.1": "기원전 551년 무렵 노나라(오늘날의 산둥성 취푸)에서 태어났다. 세 살 때 아버지를 여의고 어머니 밑에서 넉넉지 않게 자랐다.",
  "confucius.life_arc.2": "노나라에서 여러 관직을 지냈고, 전하는 바로는 사구(司寇, 형벌을 담당하는 대신) 자리까지 올랐다.",
  "confucius.life_arc.3": "자신의 정치적 구상이 받아들여지지 않자 기원전 497년 무렵 노나라를 떠나, 10년 넘게 여러 나라를 떠돌았다.",
  "confucius.life_arc.4": "말년에 노나라로 돌아와 세상을 떠날 때까지(기원전 479년 무렵) 가르치는 일에 전념했다.",
  "confucius.life_arc.5": "사후 제자들이 그의 말을 모아 《논어》로 엮었고, 기원전 140년 무렵부터는 그의 이름 아래 발전된 사상이 한나라의 공식 통치 이념이 되었다.",
  "confucius.legacy":
    "한나라 때부터, 중간의 단절을 거치면서도 20세기 초까지, 공자의 이름으로 정리되고 발전한 사상 — 상당 부분 한나라 시대 편찬자들과 훗날의 주희 같은 해석자들이 그의 사후 한참 뒤에 정리된 문헌을 바탕으로 만들어낸 것이다 — 은 제국 중국의 공식 통치 이념이자 과거 시험 제도의 근간이 되어 동아시아 전역의 사회·정치적 삶을 이천 년 가까이 규정했다. 그 후대의 전통이 공자 자신의 기록된 가르침을 얼마나 반영하는지, 아니면 후대의 정치적·철학적 재해석의 산물인지는 역사학자들 사이에서 여전히 논쟁거리이며, 바로 그 제도화된 전통은 훗날 — 특히 20세기 중국의 문화대혁명 시기에 — 경직된 신분 질서를 고착시켰다는 비판을 받기도 했다. 다만 이는 그의 이름으로 세워진 후대 제국 체제를 겨냥한 비판이지, 그 자신의 기록된 가르침을 직접 겨냥한 것은 아니다. 그런 거리에도 불구하고, 공자는 세계 사상사에서 가장 오래 지속된 윤리·정치 사상의 흐름 가운데 하나를 세운 인물로 평가받는다.",

  /* --- 쿠사마 야요이: 생존 여부를 단정하지 않는 시제로 서술 --- */
  "yayoi-kusama.achievement.1":
    "1960년대 초부터 몰입형·참여형 설치미술 작업을 발전시켰다 — 1965년부터 시작한 거울로 이루어진 \"무한 거울방\" 연작과 반복되는 물방울무늬·호박 모티프가 대표적이다. 이 작업은 무한히 확장되는 참여형 시각 공간을 중심으로 한 설치미술의 한 양식을 정립하는 데 기여했다. 2017년 허시혼 미술관에서 열린, 무한 거울방 여섯 점을 모은 회고전은 기록적인 관람객 수를 기록했고 이후 북미 다섯 개 미술관을 순회했다.",
  "yayoi-kusama.achievement.2":
    "1993년 베네치아 비엔날레 일본관 대표로 참여했으며, 1973년 일본으로 돌아온 이후 약 20년간 국제적으로 상대적인 무명 시기를 겪은 뒤 세계에서 작품이 가장 높은 가격에 거래되는 작가 중 한 명으로 떠올라, 2023년 소더비 시장 조사에서 상위 50대 작가에 이름을 올렸다.",
  "yayoi-kusama.moment.1":
    "1957년 미국 화가 조지아 오키프에게 편지로 조언을 구한 뒤, 얼마 되지 않는 자금을 들고 먼저 시애틀로, 이어 1958년 뉴욕으로 이주했다. 아무런 기반도 없던 나라와 미술계에서 자리 잡기 위해 애쓰는 동안 온갖 허드렛일과 직접 옷을 지어 파는 일로 생계를 이어갔다.",
  "yayoi-kusama.moment.2":
    "1963년 6월 쿠사마가 뉴욕 그린 갤러리에서 돌기 형태로 뒤덮인 소프트 스컬프처를 선보인 지 얼마 지나지 않은 그해 9월, 동료 작가 클래스 올든버그가 시각적으로 매우 흡사한 봉제 소프트 스컬프처를 전시하기 시작했다. 이 시기를 연구한 한 미술사학자는 훗날 올든버그가 쿠사마의 작업에서 영향을 받았을 가능성이 크다고 결론지었고, 쿠사마 본인은 당시 이 일로 크게 낙담했다고 말한 바 있다. 비슷한 패턴 — 쿠사마가 자신의 설치작품에서 갤러리 벽을 사진으로 뒤덮은 지 얼마 지나지 않아 앤디 워홀이 전시 공간을 반복되는 사진 이미지로 뒤덮은 일 — 도, 훗날 더 널리 공로를 인정받은 다른 작가들에게 정작 그가 먼저 시도한 아이디어의 영향력이 충분히 인정받지 못했다는 사례로 거론되어 왔다.",
  "yayoi-kusama.turning_point.1":
    "1973년 일본으로 돌아온 뒤 냉담한 반응에 부딪히고 건강도 나빠지던 시기를 지나, 1977년 쿠사마는 스스로 선택해 도쿄의 한 정신병원에 입주했고, 이후 평생 그 병원 근처의 작업실에서 매일 작업을 이어갔다. 그는 예술을 만드는 일이 그 시기를 버텨낼 수 있게 해 준 힘이었다고 말한 바 있다.",
  "yayoi-kusama.interpretation.turning_point.1":
    "프로필의 높은 자율성 욕구(autonomy_need) 점수와 맞닿아 있다 — 작업을 멈추는 대신, 자신만의 방식으로 창작을 이어갈 수 있도록 생활 방식 자체를 재구성한 것이다.",
  "yayoi-kusama.complexities.1":
    "2023년 10월, 미국의 한 주요 미술관 회고전을 앞두고, 2003년 자서전을 포함한 쿠사마의 과거 저술 속에 흑인을 비하하고 인종적으로 본질화하는 표현이 담겨 있다는 사실이 다시 알려지며 거센 비판이 일었다. 쿠사마는 성명을 통해 그런 표현을 사용한 것을 깊이 후회하며, 자신의 작업이 전하고자 한 메시지는 언제나 모든 이를 향한 사랑과 존중이었다고 밝혔다. 이 일은 이제 그의 예술적 영향력과 함께 그의 작업을 논할 때 함께 다뤄지는 부분이 되었다.",
  "yayoi-kusama.life_arc.1": "일본 마쓰모토에서, 묘목과 종자를 취급하는 집안에서 태어났다.",
  "yayoi-kusama.life_arc.2": "조지아 오키프와 편지를 주고받은 뒤 1957~1958년 미국으로 건너가 뉴욕에 정착했다.",
  "yayoi-kusama.life_arc.3": "뉴욕의 아방가르드 미술계에 합류해 인피니티 넷 회화, 소프트 스컬프처, 무한 거울방 연작을 발전시켰다.",
  "yayoi-kusama.life_arc.4": "1973년 일본으로 돌아왔다.",
  "yayoi-kusama.life_arc.5": "1977년 스스로 선택해 도쿄의 한 정신병원에 입주했고, 이후에도 인근 작업실에서 작업을 이어갔다.",
  "yayoi-kusama.life_arc.6": "1993년 베네치아 비엔날레 일본관 대표를 맡았으며, 2026년 8월 도쿄에서 97세로 세상을 떠났다.",
  "yayoi-kusama.legacy":
    "쿠사마의 무한 거울방과 물방울무늬 모티프는 현대미술에서 가장 널리 알려지고 가장 자주 복제되는 이미지 가운데 하나가 되었으며, 2010년대에 이르러 그는 세계에서 가장 많이 전시되고 가장 높은 가격에 거래되는 작가 중 한 명으로 꾸준히 꼽혔다 — 1970년대 뉴욕을 떠난 뒤 약 20년간 겪었던 국제적 무명 시기를 생각하면 극적인 반전이다.",

  "nikola-tesla.achievement.1":
    "1888년, 기존 모터의 스파크를 일으키는 정류자 구조를 피한 교류 유도전동기를 특허로 등록한 뒤 조지 웨스팅하우스에게 그 권리를 넘겼다. 이렇게 탄생한 웨스팅하우스의 교류 시스템은 1893년 시카고 만국박람회에 전력을 공급하고 나이아가라 폭포 발전 사업의 계약을 따냈으며, 이를 계기로 토머스 에디슨의 경쟁 상대였던 직류 방식을 제치고 교류가 오늘날까지 쓰이는 장거리 송전의 기술적 기반으로 자리 잡았다.",
  "nikola-tesla.achievement.2":
    "송전 기술은 물론, 1891년 그가 선보인 이래 오늘날까지도 \"테슬라 코일\"이라 불리는 고전압·고주파 공진 변압기를 포함한 여러 특허를 보유했으며, 이 작업들은 20세기 초 라디오와 전기공학 발전에 직접적인 밑거름이 되었다.",
  "nikola-tesla.moment.1":
    "1884~1885년 뉴욕의 토머스 에디슨 제작사에서 일하던 시절, 테슬라는 훗날 회사의 발전기 설계 개선 작업을 마치면 5만 달러의 보너스를 받기로 약속받았다고 말했다. 그러나 작업을 마친 뒤 지급을 요청하자, 본인 말에 따르면 그것이 농담이었다는 답을 들었다고 한다. 그는 얼마 지나지 않아 회사를 떠났다.",
  "nikola-tesla.moment.2":
    "1891년, 1890년 공황 이후 웨스팅하우스가 재정적 어려움에 처하자 테슬라는 자신에게 지급되던 로열티 계약 — 판매되는 교류 장비 1마력당 2.5달러 — 을 스스로 포기해 회사가 위기를 넘기도록 도왔다. 이는 그를 당대 최고의 부호 중 한 명으로 만들었을 수도 있었던 수입을 스스로 내려놓은 결정이었다.",
  "nikola-tesla.turning_point.1":
    "보너스 분쟁 끝에 1885년 에디슨의 회사를 떠난 뒤, 조지 웨스팅하우스와 손잡고 교류 전력을 개발·상용화하는 길에 나섰다 — 옛 고용주의 경쟁 방식이던 직류 시스템에 기술적으로도 상업적으로도 정면으로 맞서는 선택이었다.",
  "nikola-tesla.interpretation.turning_point.1":
    "프로필의 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 고용주의 계획을 실행하던 직원에서, 바로 그 고용주가 내세운 경쟁 표준에 맞서 자신의 기술적 확신을 밀어붙이는 독립적 발명가로 전환한 순간이다.",
  "nikola-tesla.life_arc.1": "오스트리아 제국(오늘날의 크로아티아) 스밀랸에서 태어났다.",
  "nikola-tesla.life_arc.2": "1884년 미국으로 이주해 잠시 토머스 에디슨의 제작사에서 일했다.",
  "nikola-tesla.life_arc.3": "교류 유도전동기를 특허로 등록하고 조지 웨스팅하우스와 손잡았다.",
  "nikola-tesla.life_arc.4": "테슬라의 특허를 바탕으로 한 웨스팅하우스의 교류 시스템이 1893년 시카고 만국박람회와 나이아가라 폭포 발전 사업에 전력을 공급했다.",
  "nikola-tesla.life_arc.5": "롱아일랜드에 무선 송신소인 워든클리프 타워를 건설했으나, 후원자 J. P. 모건이 지원을 철회하며 사업이 무산되었다.",
  "nikola-tesla.life_arc.6": "1943년 뉴욕에서 빚에 시달리다 세상을 떠났으며, 그 무렵 대부분의 특허는 이미 만료된 상태였다.",
  "nikola-tesla.legacy":
    "테슬라의 교류 시스템은 오늘날에도 전 세계 장거리 송전의 기술적 근간으로 남아 있다. 말년의 재정적 몰락과 워든클리프 사업의 실패는 그를 대중의 기억 속에서 '사업적 불운에 발목 잡힌 비전 있는 발명가'의 상징으로 만들었는데, 이는 전설이 아니라 실제 기록으로도 뒷받침되는 평가다.",

  "akira-kurosawa.achievement.1":
    "《라쇼몽》이 1951년 베니스 영화제에서 황금사자상을 받고 이어 미국에서도 흥행에 성공하면서, 전후 일본 영화가 처음으로 대규모로 서구 관객에게 소개되었고 이후 10년간 서구의 일본 영화에 대한 관심이 이어지는 계기가 되었다.",
  "akira-kurosawa.achievement.2":
    "45일간의 시나리오 합숙과 148일간의 촬영을 포함해 거의 1년에 걸쳐 제작된 《7인의 사무라이》(1954)는 영화사에서 가장 영향력 있는 작품 중 하나가 되었다 — 1999년 평론가 설문에서 일본 영화 사상 최고작으로 뽑혔고, 2022년 영국영화협회(BFI) 「사이트 앤 사운드」 평론가 투표에서는 전 세계 영화를 통틀어 20위에 올랐다. 이 작품의 이야기 구조는 훗날 《스타워즈》(1977)에도 직접적인 영향을 끼쳤다.",
  "akira-kurosawa.moment.1":
    "《가장 아름답게》(1944)를 찍을 때, 구로사와는 배우들을 실제 공장에서 지내게 하고 공장 음식을 먹게 하며 서로를 배역 이름으로만 부르게 했다 — 이후에도 여러 형태로 그의 작품 활동 내내 이어간 몰입형 연출 방식이었다.",
  "akira-kurosawa.moment.2":
    "1968년, 미국과의 합작영화 《도라! 도라! 도라!》 연출을 맡은 지 3주 만에 구로사와는 공식적으로는 \"피로\"를 이유로 해임되었다 — 이후 몇 년간 이어질 더 깊은 경력의 위기에 앞서 닥친 구체적인 좌절이었다.",
  "akira-kurosawa.turning_point.1":
    "《도라! 도라! 도라!》(1968)에서 해임된 데 이어 다음 작품 《도데스카덴》(1970)마저 흥행에 실패하자, 구로사와는 1971년 12월 스스로 목숨을 끊으려 했다. 그는 살아남았고 건강은 몇 달 만에 회복되었다. 이후에도 그는 계속 연출을 이어갔다 — 다음 작품 《데르수 우잘라》(1975)는 일본 영화사가 아니라 소련의 모스필름이 제작비를 댔으며 아카데미 외국어영화상을 받았고, 뒤이어 미국 감독 조지 루카스와 프랜시스 포드 코폴라의 도움을 일부 받은 《카게무샤》(1980)와 《란》(1985) 역시 일본 영화사가 아닌 국제 자본으로 제작되었다.",
  "akira-kurosawa.life_arc.1": "도쿄에서 태어났다.",
  "akira-kurosawa.life_arc.2": "1936년 영화사 P.C.L.(훗날의 도호)에 조감독으로 입사했다.",
  "akira-kurosawa.life_arc.3": "1943년 첫 장편 연출작 《스가타 산시로》를 선보였다.",
  "akira-kurosawa.life_arc.4": "《라쇼몽》(1950)이 1951년 베니스에서 황금사자상을 받았고, 뒤이어 1954년 《7인의 사무라이》를 발표했다.",
  "akira-kurosawa.life_arc.5": "1968년 《도라! 도라! 도라!》에서 해임되었고, 1970년 《도데스카덴》의 흥행 실패 뒤인 1971년 자살을 시도했다가 회복한 뒤 소련의 지원을 받은 《데르수 우잘라》(1975)로 경력을 재건했다.",
  "akira-kurosawa.life_arc.6": "《카게무샤》(1980)와 《란》(1985)으로 다시 국제적 찬사를 받았고, 1990년 아카데미 명예상을 받았으며 1998년 도쿄에서 세상을 떠났다.",
  "akira-kurosawa.legacy":
    "구로사와는 오늘날 영화사에서 가장 영향력 있는 감독 중 한 명으로 널리 평가받으며, 그의 후반기 작품을 지원했던 조지 루카스와 프랜시스 포드 코폴라를 비롯한 여러 감독이 그에게서 받은 영향을 공개적으로 밝혀 왔다. 전후의 화려한 데뷔, 1970년대 초의 극심한 국내 활동 위기, 그리고 국제 자본에 의지한 후반기의 부활로 이어지는 그의 경력 자체가, 1960~70년대 일본 영화 산업이 위축되는 가운데 스튜디오 시대의 거장 감독들이 겪어야 했던 어려움을 보여주는 상징적인 사례로 자주 인용된다.",

  "ludwig-van-beethoven.achievement.1":
    "대략 세 시기에 걸쳐 교향곡 9곡, 피아노 소나타 32곡, 그리고 수많은 실내악·합창 작품을 작곡했다 — 제3번(《에로이카》)과 제5번 교향곡, 그리고 청력을 거의 완전히 잃은 뒤 완성하고 초연한 후기의 제9번 교향곡(1824)이 대표적이다. 이 작품 세계는 서양음악사에서 고전주의에서 낭만주의로 넘어가는 중심축으로 평가받는다.",
  "ludwig-van-beethoven.achievement.2":
    "제3번 교향곡(1803~04년), 제5번 교향곡(1808년), 오페라 《피델리오》(1805년 초연) 등 중기 \"영웅적\" 시기의 작품들은 하이든과 모차르트에게서 물려받은 관습을 넘어 기악음악의 감정적 폭과 형식적 야심을 확장시켰고, 이후 낭만주의 시대 관현악 작곡가들이 출발점으로 삼는 전범이 되었다.",
  "ludwig-van-beethoven.moment.1":
    "의사의 권고에 따라 1802년 4월부터 10월까지 빈 외곽의 하일리겐슈타트에 은거하던 시기, 베토벤은 형제들에게 보내는 편지 한 통을 썼다 — 끝내 부치지 않은 채 그의 사후에야 발견된 이 편지에는 심해지는 청력 상실에 대한 절망과 자살 충동, 그리고 그럼에도 작곡을 계속하겠다는 다짐이 함께 담겨 있었다.",
  "ludwig-van-beethoven.moment.2":
    "1809년, 나폴레옹의 동생 제롬 보나파르트로부터 빈을 떠나게 될 궁정 자리를 제안받자, 베토벤은 루돌프 대공, 킨스키 공, 로프코비츠 공 세 귀족 후원자로부터 연간 4천 플로린의 연금을 받는 조건으로 직접 협상해 빈에 남았다. 그러나 이 약속은 실제로는 순탄치 않아서, 킨스키는 1812년 사망했고 로프코비츠는 1811년 파산했으며, 베토벤은 자신이 받아야 할 몫의 일부를 되찾기 위해 소송까지 벌여야 했다.",
  "ludwig-van-beethoven.turning_point.1":
    "베토벤이 1815년 한 지인에게 밝힌 바로는 1798년부터 시작되었다는 청력 상실은 이후 약 20년에 걸쳐 진행되어, 본인의 말에 따르면 말년에는 낮은 음과 갑작스러운 큰 소리 정도만 구별할 수 있는 상태가 되었다. 그럼에도 그는 연주를 직접 듣고 확인하는 방식이 아니라 청력 상실에 맞춰 조정한 작곡 방식으로 주요 작품들을 계속 써 나갔고, 1824년에는 제9번 교향곡을 완성해 직접 초연을 지휘했다.",
  "ludwig-van-beethoven.interpretation.turning_point.1":
    "프로필의 높은 자원 활용력(resourcefulness) 점수와 맞닿아 있다 — 단순히 역경 속에서도 버텨냈다는 차원을 넘어, 실질적인 제약에 맞서 작곡 방식 자체를 대체 수단으로 바꾼 구체적인 사례다.",
  "ludwig-van-beethoven.life_arc.1": "본에서 태어났다.",
  "ludwig-van-beethoven.life_arc.2": "1792년 11월 빈으로 완전히 거처를 옮겼고, 그 직후 아버지의 부고를 접했다.",
  "ludwig-van-beethoven.life_arc.3": "1802년 하일리겐슈타트에 은거하며 훗날 '하일리겐슈타트 유서'로 알려지는 편지를 썼다.",
  "ludwig-van-beethoven.life_arc.4": "제3번·제5번 교향곡을 비롯한 중기 \"영웅적\" 시기의 작품들을 작곡했다.",
  "ludwig-van-beethoven.life_arc.5": "1809년 세 귀족 후원자로부터 연금을 확보해 빈에 남았다.",
  "ludwig-van-beethoven.life_arc.6": "청력을 거의 완전히 잃은 뒤인 1824년 제9번 교향곡을 완성·초연했고, 1827년 빈에서 세상을 떠났다.",
  "ludwig-van-beethoven.legacy":
    "자신의 직업에서 가장 핵심적인 감각을 잃고도 이를 견뎌내며 교향곡과 실내악의 형식을 확장해 나간 베토벤의 행보는, 서양 예술사에서 작품이 개인의 처지를 넘어서는 가장 인상적인 사례 가운데 하나로 흔히 꼽힌다. 그의 교향곡·소나타·현악사중주는 이백 년이 지난 지금도 관현악과 실내악의 핵심 레퍼토리로 남아 있다.",

  "hayao-miyazaki.achievement.1":
    "자신의 만화를 원작으로 한 《바람계곡의 나우시카》(1984)의 성공에 힘입어, 1985년 오랜 동료 다카하타 이사오와 함께 스튜디오 지브리를 설립했다. 이 스튜디오는 세계적으로 가장 높은 평가를 받는 애니메이션 제작사 중 하나가 되었고, 미야자키는 이후 40년 가까이 스튜디오의 대표작 대부분을 연출하거나 각본에 참여했다.",
  "hayao-miyazaki.achievement.2":
    "《센과 치히로의 행방불명》(2001)을 연출해 개봉 당시 일본 역대 흥행 1위에 오르고 아카데미 장편 애니메이션상을 받았으며, 20여 년이 지난 뒤 《그대들은 어떻게 살 것인가》(2023)로 같은 상을 다시 받았다 — 같은 감독이 아카데미상을 두 번 받기까지 이례적으로 긴 간격이었다.",
  "hayao-miyazaki.achievement.3":
    "《모노노케 히메》(1997)는 일본 아카데미상 최우수작품상을 받은 최초의 애니메이션 영화가 되었고, 23억 5천만 엔의 제작비로 당시 일본 애니메이션 사상 최고 제작비 기록을 세웠으며, 개봉 이후 여러 달 동안 일본 국내 흥행 1위 자리를 지켰다.",
  "hayao-miyazaki.moment.1":
    "1964년, 도에이 동화의 젊은 애니메이터였던 시절 노동조합 서기장을 맡았고, 이를 계기로 당시 부위원장이던 다카하타 이사오와 평생에 걸친 우정과 창작 동반자 관계를 맺었다 — 훗날 두 사람은 함께 스튜디오 지브리를 세우게 된다.",
  "hayao-miyazaki.moment.2":
    "1998년 1월, 장편 연출에서 은퇴하겠다고 발표했지만, 후계자로 지목되었던 감독 곤도 요시후미가 같은 해 1월 21일 갑작스레 세상을 떠나자 며칠 만에 복귀해 《센과 치히로의 행방불명》을 연출했다 — 그의 경력에서 여러 차례 있었던 '은퇴 선언 후 번복' 가운데 하나였으며, 마지막 번복은 2016년으로, 이후 《그대들은 어떻게 살 것인가》(2023)를 만들었다.",
  "hayao-miyazaki.life_arc.1": "1941년 도쿄에서 네 형제 중 둘째로 태어났다. 아버지는 제2차 세계대전 당시 항공기 부품을 제조하는 회사를 경영했다.",
  "hayao-miyazaki.life_arc.2": "전쟁 중 소개(疏開)를 겪었으며, 그의 가장 오래된 기억 중 일부는 폭격으로 폐허가 된 도시의 모습이다.",
  "hayao-miyazaki.life_arc.3": "1963년 애니메이션 제작사 도에이 동화에 입사했다.",
  "hayao-miyazaki.life_arc.4": "《바람계곡의 나우시카》(1984)를 연출한 뒤, 1985년 다카하타 이사오와 함께 스튜디오 지브리를 설립했다.",
  "hayao-miyazaki.life_arc.5": "《모노노케 히메》(1997)와 《센과 치히로의 행방불명》(2001)을 연출했으며, 후자로 아카데미 장편 애니메이션상을 받았다.",
  "hayao-miyazaki.life_arc.6": "2013년 장편영화 연출에서 은퇴를 선언했으나 이후 복귀해 《그대들은 어떻게 살 것인가》(2023)를 연출, 두 번째 아카데미 장편 애니메이션상을 받았다.",
  "hayao-miyazaki.legacy":
    "손으로 그린 작화에 대한 엄격한 원칙, 반복적으로 등장하는 자연·반전(反戰) 주제의식, 그리고 주체적인 여성 주인공들의 결합은 스튜디오 지브리의 작품들을 그 시대 가장 국제적으로 인정받는 애니메이션 작품의 반열에 올려놓는 데 기여했다. 20여 년의 간격을 두고 각각 아카데미상을 받은 《센과 치히로의 행방불명》과 《그대들은 어떻게 살 것인가》는, 애니메이션을 주로 다루는 감독으로서는 보기 드문 꾸준한 국제적 평가를 보여준다.",

  // Remaining-19 Editorial Completion Batch 2 (2026-08).
  "steve-jobs.achievement.1":
    "스티브 워즈니악(그리고 로널드 웨인)과 함께 1976년 애플을 공동 창업했다. 애플 II(1977)는 최초로 대량 생산된 마이크로컴퓨터 중 하나였으며, 1984년 매킨토시는 그래픽 사용자 인터페이스를 갖춘 최초의 대량 생산 컴퓨터로 애플 레이저라이터와 함께 데스크톱 퍼블리싱 산업을 열었다.",
  "steve-jobs.achievement.2":
    "1997년 애플에 복귀한 뒤, 아이맥, 아이튠즈와 아이팟, 아이폰(2007), 앱 스토어, 아이패드에 이르는 디자인·엔지니어링 작업을 이끌었다 — 기기와 소프트웨어, 서비스를 하나로 통합한 이 모델은 이후 소비자 기술 산업 상당 부분이 뒤따르는 하나의 표준이 되었다.",
  "steve-jobs.achievement.3":
    "루카스필름의 그래픽스 그룹을 1,000만 달러에 인수한 뒤 1986년부터 2006년까지 픽사의 대주주이자 회장으로서, 최초의 장편 컴퓨터 애니메이션 영화 《토이 스토리》(1995)를 낸 스튜디오를 뒷받침했다. 2006년 디즈니가 픽사를 74억 달러에 인수하면서 그는 디즈니의 최대 개인 주주가 되었다.",
  "steve-jobs.moment.1":
    "1979년 제록스 PARC를 방문한 잡스는, 제록스 연구원들이 만들어 놓고도 제품화하지 않았던 그래픽 사용자 인터페이스와 마우스의 혁신적 잠재력을 즉각 알아보았고, 애플 엔지니어들에게 이 아이디어를 리사, 이어 매킨토시에 구현하도록 했다.",
  "steve-jobs.interpretation.moment.1":
    "프로필의 높은 기회 포착(opportunity_sensing) 점수와 맞닿아 있다 — 다른 조직이 이미 만들어 놓았지만 그 중요성을 알아차리지 못한 무언가의 의미를 포착해낸 사례다.",
  "steve-jobs.moment.2":
    "넥스트에서 잡스는 사업에 부담이 되는 상황에서도 미학적 완성을 추구했다 — 가장 두드러진 예가 고가의 마그네슘 소재 넥스트큐브 케이스였다 — 결국 약 5만 대 판매에 그친 1993년, 회사는 하드웨어를 포기하고 소프트웨어로 전환했다.",
  "steve-jobs.turning_point.1":
    "1985년 9월, 매킨토시를 폐쇄형 시스템으로 유지할지 애플 II처럼 개방형으로 바꿀지를 둘러싸고 최고경영자 존 스컬리와 이사회 내 권력 다툼을 벌인 끝에, 잡스는 매킨토시 그룹에서 배제되었고 자신이 공동 창업한 회사를 떠났다 — 애플 고위 임원 다섯 명이 그와 함께 회사를 떠나 넥스트를 설립했으며, 그가 새로 인수한 픽사는 이후 수년간 적자를 이어갔다.",
  "steve-jobs.turning_point.2":
    "1997년 2월 애플이 넥스트를 4억 달러에 인수했고, 그해 7월 최고경영자 길 아멜리오가 물러나자 잡스는 사실상 애플을 이끄는 인물이 되었다 — 9월에는 임시 최고경영자로 임명되었고, 2000년 3월에는 '임시'라는 꼬리표를 뗐다. 그는 뉴턴을 비롯한 부진한 프로젝트를 정리하고 매킨토시 호환기종 라이선스를 종료했으며, 애플의 실질적인 제품 반등이었던 1998년 아이맥은 그 이듬해에야 등장했다.",
  "steve-jobs.interpretation.turning_point.2":
    "프로필의 높은 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 그저 복직되기를 기다린 것이 아니라, 인수 과정과 그 이후 상황을 스스로 헤쳐나가 12년 전 자신을 몰아냈던 회사를 직접 장악하는 데까지 이르렀다.",
  "steve-jobs.life_arc.1": "샌프란시스코에서 태어났다.",
  "steve-jobs.life_arc.2": "스티브 워즈니악과 함께 애플을 공동 창업했다. 애플 II는 1977년에 뒤이어 나왔다.",
  "steve-jobs.life_arc.3": "그래픽 사용자 인터페이스를 갖춘 최초의 대량 생산 컴퓨터인 매킨토시 출시를 이끌었다.",
  "steve-jobs.life_arc.4": "이사회 내 권력 다툼 끝에 애플에서 밀려났다. 넥스트를 설립했고, 훗날 픽사가 되는 회사를 인수했다.",
  "steve-jobs.life_arc.5": "넥스트 인수를 계기로 애플에 복귀해 2000년까지 최고경영자가 되었고, 이후 2007년 아이폰을 출시했다.",
  "steve-jobs.life_arc.6": "2003년 처음 진단받은 췌장 신경내분비 종양의 합병증으로 세상을 떠났다.",
  "steve-jobs.complexities.1":
    "잡스 자신의 행적을 보여주는 몇몇 기록은 온전히 미화된 서사에 균열을 낸다. 1975년 아타리 건에서, 그는 실제 회로 설계를 맡았던 스티브 워즈니악에게 보너스가 750달러라고 말했지만 실제로는 5,000달러였고, 자신은 더 적은 금액만을 나눠주었다 — 워즈니악은 수년 뒤에야 실제 액수를 알게 되었다. 1978년 태어난 딸 리사의 친자 관계를, 법원이 명령한 검사에서 부성 확률 94.1%가 나올 때까지 부인했으며, 애플 상장으로 부를 쌓기 전까지는 최소한의 양육비만 지급했다 — 이후 부인을 계속하기 어려워지자 애플 리사 컴퓨터에 딸의 이름을 붙였다. 전기 작가 월터 아이작슨은 또한 1997년 복귀 이후 직원들 사이에서 '즉결 처형'이라 불렸던 그의 경영 방식을 기록했다 — 실제로는 드물었지만 실재했으며, 일부 직원은 엘리베이터에서 그와 마주칠까 봐 불안해했을 정도였다.",
  "steve-jobs.legacy":
    "잡스가 애플에서 이끈, 기기와 운영체제, 그 위의 스토어나 서비스를 하나로 설계된 전체로 묶는 통합 하드웨어-소프트웨어-서비스 모델은 이후 소비자 기술 산업 상당 부분이 뒤따르는 하나의 표준이 되었다 — 다만 이는 매번 그의 지휘 아래 일한 대규모 디자인·엔지니어링 팀들이 만들어낸 것이지, 그 혼자만의 발명은 아니었다. 그가 지분을 쥐고 있던 시기 픽사가 내놓은 초기 작품들은 컴퓨터 애니메이션을 주류 매체로 자리 잡게 하는 데 기여했다. 2007년 그가 선보인 아이폰은 그의 사후 십 년이 넘도록 해당 제품군을 정의하는 위치를 지키고 있다.",

  "socrates.achievement.1":
    "자신이 전문가라고 주장하는 상대의 발언 속 내적 모순을 시험하는 지속적 질문법, 즉 엘렝코스(elenchus)를 실천했다 — 강의료를 받았던 당대의 소피스트들과 달리, 엘리트 대화 상대부터 평범한 장인에 이르기까지 아테네 사회 전반을 대상으로 대가 없이 공개적으로 이를 행했다.",
  "socrates.achievement.2":
    "그의 방법과 태도는 무엇보다 제자 플라톤에 의해 보존되고 발전되어, 철학적 대화 형식과 이후 서양 철학 방법론 대부분의 토대가 되었다 — 다만 플라톤이 쓴 내용 가운데 얼마만큼이 역사적 소크라테스를 반영하는지, 얼마만큼이 플라톤 자신의 후기 사상인지는 이른바 '소크라테스 문제'로 여전히 학계에서 진지하게 논쟁 중이다.",
  "socrates.moment.1":
    "플라톤에 따르면 소크라테스는 펠로폰네소스 전쟁의 세 차례 아테네 원정 — 포테이다이아, 델리온, 암피폴리스 — 에 참전해 개인적 용맹함으로 이름을 알렸다. 후대 전승에서는 포테이다이아 전투에서 젊은 알키비아데스의 목숨을 구했다는 이야기도 덧붙지만, 원 자료 자체는 이 구체적인 일화를 그의 참전 사실 자체보다 확실성이 낮은 것으로 다룬다.",
  "socrates.moment.2":
    "기원전 404년, 과두정 '30인 참주' 체제 아래에서 소크라테스는 다른 이들과 함께 동료 시민 레온 폰 살라미스를 처형하기 위해 체포하라는 명령을 받았다. 플라톤의 《변명》에 따르면 소크라테스만이 유일하게 이를 거부하며, 자신이 범죄라고 판단한 일에 가담하느니 정권의 보복을 감수하는 쪽을 택했다.",
  "socrates.interpretation.moment.2":
    "프로필의 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 누구의 지시도 아닌 자발적 거부였으며, 실제 신변의 위험을 감수했다는 점에서 타인의 신념을 캐묻는 그의 일반적인 활동과는 구별된다.",
  "socrates.turning_point.1":
    "기원전 399년, 수백 명의 아테네 시민으로 구성된 배심원단이 불경죄와 청년 타락죄로 소크라테스를 재판에 회부했다. 플라톤의 《변명》은 그가 의도적으로 관행을 벗어난 변론을 펼쳤다고 전한다 — 유죄 판결 후 스스로 형량을 제안하라는 요구를 받자, 추방이나 침묵 대신 평생 국가의 비용으로 식사를 제공받겠다고 제안했을 정도다. 배심원단은 대신 사형을 선고했고, 그는 다음 날 아침 독미나리즙을 마시고 처형되었다 — 플라톤의 《파이돈》이 이 장면을 자세히 묘사하지만, 현대 학계는 이를 엄밀한 사실 기록이라기보다는 문학적 각색이 더해진 것으로 본다. 이 재판으로 그 자신의 공개적 질문 활동은 막을 내렸지만, 이후 제자들의 기록을 통해 전해지는 인물로서 그가 지니는 훨씬 더 큰 영향력이 시작되었다.",
  "socrates.life_arc.1":
    "석공인 아버지와 산파인 어머니 사이에서 아테네의 구역 알로페케에서 태어났다 — 훗날 청빈한 삶으로 알려졌지만, 실제로는 집안 재산의 일부를 물려받아 심각한 경제적 어려움 없이 지낼 수 있었다.",
  "socrates.life_arc.2": "플라톤의 기록에 따르면 펠로폰네소스 전쟁 중 포테이다이아, 델리온, 암피폴리스 전투에 참전했다. 크산티페와 결혼해 세 아들을 두었다.",
  "socrates.life_arc.3": "정치인, 시인, 그리고 스스로 전문성을 주장하는 장인들을 공개적으로 캐묻는 것으로 아테네에서 잘 알려진, 그러면서도 호불호가 크게 갈리는 인물이 되어 있었다.",
  "socrates.life_arc.4": "집권 세력이던 '30인 참주'의 명령을 거부하고, 동료 시민 레온 폰 살라미스를 처형을 위해 체포하는 데 가담하지 않았다.",
  "socrates.life_arc.5": "복권된 아테네 민주정 아래 불경죄와 청년 타락죄로 재판에 회부되어 유죄를 선고받았다.",
  "socrates.life_arc.6": "플라톤의 《파이돈》에 묘사된 대로, 독미나리즙을 마시고 처형되었다.",
  "socrates.legacy":
    "그의 사후 수 세기 동안 활동한 주요 철학 유파 대부분 — 플라톤의 아카데메이아, 아리스토텔레스의 리케이온, 견유학파, 스토아학파 — 이 어떤 형태로든 그를 뿌리로 삼았으며, '엘렝코스'라는 말은 오늘날에도 체계적인 변증법적 질문을 가리키는 용어로 쓰인다. 소크라테스 자신이 남긴 글이 전혀 없기에, 이 유산은 거의 전적으로 플라톤의 대화편을 통해 전해지며, 여기에 더 담담한 어조의 크세노폰의 초상과 아리스토파네스의 《구름》 속 풍자적 초상이 더해진다 — 이는 정리된 전기라기보다는 진짜로 풀리지 않은 사료 문제다. 주장된 권위에 의문을 제기하기를 고집했던 태도, 그리고 그 실천을 포기하느니 죽음을 택한 결단은 그를 자신의 시대에서 한참 떨어진 후대 철학자들 — 키르케고르와 니체를 포함해 — 에게까지 반복적으로 소환되는 준거점으로 만들었다.",

  "coco-chanel.achievement.1":
    "1910년 파리에서 모자 전문점을 열며 패션 하우스를 창업했고, 이를 오트 쿠튀르와 주얼리, 핸드백, 향수 사업으로 확장해 1935년에는 4,000명을 고용하는 규모로 키웠다. 1921년 출시한 향수 샤넬 No.5는 세계에서 가장 잘 알려진 향수 중 하나가 되었다.",
  "coco-chanel.achievement.2":
    "저지 원단을 오트 쿠튀르 소재로 끌어올린 것, 1926년의 '리틀 블랙 드레스', 과시보다는 활동의 자유를 위해 설계된 1923년의 샤넬 수트, 1955년의 퀼팅 백 2.55 등, 그가 소개하거나 널리 퍼뜨린 디자인 요소들은 여성복의 주류 흐름 자체를 바꾸어 놓았다.",
  "coco-chanel.moment.1":
    "어머니가 세상을 떠난 뒤, 샤넬은 11살에 오바진 고아원에 들어가 바느질을 배웠다 — 훗날 그의 경력을 열어준 바로 그 기술이었다. 이후 물랭에서 재봉사이자 카바레 가수로 일했고, 그곳에서 '코코'라는 애칭을 얻었다.",
  "coco-chanel.moment.2":
    "1913년, 연인이었던 아서 '보이' 카펠의 재정적 후원을 받아 도빌에 저지와 트리코 원단으로 만든 캐주얼 의류를 파는 부티크를 열었다 — 그때까지 이 원단들은 주로 속옷이나 작업복에 쓰이던 소재였다. 사업은 빠르게 성공해, 1916년에는 카펠의 투자금을 모두 갚을 수 있었다.",
  "coco-chanel.interpretation.moment.2":
    "프로필의 기회 포착(opportunity_sensing) 점수와 맞닿아 있다 — 당시 주류 패션 하우스들보다 앞서, 여성복이 실용적이고 편안한 방향으로 옮겨가는 흐름과 그에 걸맞은 값싼 소재를 알아본 사례다.",
  "coco-chanel.turning_point.1":
    "샤넬은 1939년 제2차 세계대전 발발과 함께 패션 하우스를 닫아 약 4,000명의 직원이 일자리를 잃었고, 이후 15년간 디자인 일선으로 돌아오지 않았다. 1954년, 70세의 나이에 피에르 베르트하이머의 재정 지원을 다시 받아 하우스를 재개장했지만, 미국과 영국 언론의 반응은 처음엔 회의적이었다 — 그의 새 수트를 다룬 1954년 3월 《보그》 기사가 이 분위기를 뒤집었고, 미국에서 주문이 쏟아지며 하우스의 위상이 되살아났다.",
  "coco-chanel.complexities.1":
    "독일 점령기 파리에서 샤넬은 독일군 사령부이기도 했던 리츠 호텔에 머물렀으며, 정보기관과 관련된 독일 외교관 한스 귄터 폰 딩클라게 남작과 관계를 맺었다. 이와 별개로 그는 아리아인 재산법을 근거로 삼아, 자신의 유대인 사업 파트너인 베르트하이머 가문으로부터 파르팡 샤넬의 단독 지배권을 얻어내고자 독일 당국에 청원했다 — 베르트하이머 가문은 이를 예상하고 미리 명목상 소유권을 유대인이 아닌 인물에게 넘겨둔 상태였다. 역사학자 할 본이 기밀 해제된 프랑스 정보기관 문서를 조사한 결과, 그는 요원 번호로 등재되어 있었고, 훗날 '오퍼레이션 모델후트'로 알려진 임무 — 독일 측의 평화 타진안을 윈스턴 처칠에게 전달하는 임무 — 를 맡았던 것으로 기록되어 있는데, 이 임무는 그의 중개인이 영국 정보기관에 그를 밀고하면서 무산되었다. 확실히 기록된 사실은 리츠 거주, 딩클라게와의 관계, 베르트하이머 가문의 소유권을 노린 시도다. 역사학자들 사이에서 여전히 논쟁이 되는 지점은 그가 독일 정보 활동에 얼마나 적극적으로 관여했는지, 아니면 전시의 편의적 관계였는지다 — 나치 사냥꾼이자 역사학자인 세르주 클라르스펠드는 '요원 번호가 있다고 해서 반드시 본인이 직접 관여했다는 뜻은 아니다'라고 경계한 바 있다. 그는 1944년 파리 해방 이후 조사를 받았지만 기소되지는 않았고, 이후 몇 년간 스위스에서 지내다 1954년 파리로 돌아왔다.",
  "coco-chanel.life_arc.1": "프랑스 소뮈르에서 태어났다. 어머니가 세상을 떠난 뒤 11살에 오바진 고아원에 들어가 바느질을 배웠다.",
  "coco-chanel.life_arc.2": "1910년 파리에 모자 전문점을 열었고, 1913년에는 당시 연인이었던 아서 '보이' 카펠의 재정 지원으로 도빌에 부티크를 열었다.",
  "coco-chanel.life_arc.3": "샤넬 No.5를 출시했다.",
  "coco-chanel.life_arc.4": "제2차 세계대전 발발과 함께 패션 하우스를 닫았다.",
  "coco-chanel.life_arc.5": "70세에 피에르 베르트하이머의 재정 지원을 다시 받아 패션계로 복귀했다.",
  "coco-chanel.life_arc.6": "파리에서 세상을 떠났다.",
  "coco-chanel.legacy":
    "코르셋에서 벗어나 편안하고 실용적인 옷으로 나아간 샤넬의 행보는 서구 주류 패션이 여성에게 무엇을 우아함으로 여기는지 그 기준 자체를 바꾸어 놓았고, 그가 소개하거나 널리 퍼뜨린 요소들 — 오트 쿠튀르 소재로서의 저지, 테일러드 수트, 코스튬 주얼리, 퀼팅 숄더백 — 은 오늘날에도 패션 디자인에서 널리 쓰이고 있다. 《타임》은 훗날 20세기 가장 영향력 있는 인물 100인 가운데 유일한 패션 디자이너로 그를 선정했으며, 그가 세운 회사는 오늘날에도 세계에서 가장 가치 있는 럭셔리 하우스 가운데 하나로 남아 있다. 앞서 기록한 그의 전시 행적은, 이 유산을 순전히 디자인의 이야기로만 다루려는 어떤 서술도 복잡하게 만든다.",

  "genghis-khan.achievement.1":
    "분열되어 있던 몽골 부족들을 통일하고 1206년 쿠릴타이에서 칭기즈 칸으로 추대되어 몽골 제국을 세웠다. 부족에 대한 충성을 대신해 십호·백호·천호 단위로 조직되는 군사·행정 체계로 몽골 사회를 재편했는데, 이 체계는 그의 사후에도 제국이 옛 부족 경계를 따라 분열되지 않도록 지탱해 주었다고 평가받는다.",
  "genghis-khan.achievement.2":
    "중앙아시아를 넘어 화북까지 이어진 그의 정복은 역사상 가장 넓은 육상 단일 제국을 만들어냈고, 실크로드를 비롯한 유라시아 교역로를 따라 전례 없는 규모의 교역·이동·문화 교류를 가능케 했다 — 동시에 그를 따르던 기독교, 이슬람교, 불교, 샤머니즘 신앙을 명시적으로 관용하는 정책을 폈다.",
  "genghis-khan.moment.1":
    "부족장이던 아버지 예수게이가 테무진이 여덟 살 무렵 라이벌 타타르족에게 독살당한 뒤, 그의 씨족은 경쟁 씨족 편에 서서 가족을 버렸고, 어머니와 형제들은 뿌리와 열매를 캐고 작은 짐승을 사냥하고 물고기를 잡아 연명해야 했다.",
  "genghis-khan.moment.2":
    "어린 시절 테무진은 동료 자무카와 안다(의형제) 서약을 맺었지만, 두 사람은 훗날 초원 패권을 두고 라이벌이 되었다. 자무카가 가담했던 나이만 부족을 테무진이 1204년에 무찌른 뒤, 자무카는 남은 자신의 부하들에게 배신당해 테무진에게 넘겨졌고 처형되었다 — 다만 그 최후의 구체적인 방식에 대해서는 기록마다 차이가 있다.",
  "genghis-khan.turning_point.1":
    "1206년 쿠릴타이(집회)에서 테무진은 칭기즈 칸으로 추대되어, 몽골 부족들을 하나의 통치자 아래 공식적으로 통일하고, 한때 자신의 가족을 버렸던 부족적 충성 체계를 대신할 새로운 군사·행정 구조를 세웠다. 이는 경쟁하는 부족과 씨족들이 흩어져 있던 초원이 이후의 원정을 가능케 한 중앙집권 국가로 넘어가는 전환점이었다.",
  "genghis-khan.interpretation.turning_point.1":
    "프로필의 높은 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 이 통일은 물려받거나 부여받은 지위가 아니라, 자신의 씨족이 가족을 버렸던 상황에서 동맹을 하나하나 스스로의 힘으로 쌓아 올린 결과였다.",
  "genghis-khan.turning_point.2":
    "1219년, 오트라르의 호라즘 총독이 몽골 대상단을 처형하고 샤 무함마드 2세가 칭기즈 칸이 해명을 요구하며 보낸 사절단을 처형하거나 훼손하자, 칭기즈 칸은 호라즘 제국을 무너뜨리고 트란스옥시아나와 호라산 일대 — 오트라르, 부하라, 사마르칸트, 우르겐치를 비롯한 도시들 — 를 초토화한 원정을 감행했다. 이는 인접 국가들과의 교역 관계를 중심에 두었던 그의 원정 기조가, 저항하면 파괴하고 항복하면 상대적으로 자비를 베푼다는 원칙을 전례 없는 규모로 적용하는 쪽으로 바뀐 전환점이었다.",
  "genghis-khan.life_arc.1": "테무진이라는 이름으로 태어났다. 부족장이던 아버지 예수게이가 여덟 살 무렵 라이벌 타타르족에게 독살당한 뒤, 그의 씨족은 가족을 버렸다.",
  "genghis-khan.life_arc.2": "부르테와 결혼했고, 씨족이 가족을 버렸던 과거에도 불구하고 분열되어 있던 몽골·튀르크계 부족들 사이에서 동맹을 다시 쌓아 나갔다.",
  "genghis-khan.life_arc.3": "나이만 부족과, 한때 의형제였던 자무카의 남은 연합 세력을 무찔러 초원의 마지막 주요 라이벌을 제거했다.",
  "genghis-khan.life_arc.4": "쿠릴타이에서 칭기즈 칸으로 추대되어 몽골 부족의 통일을 공식화했다.",
  "genghis-khan.life_arc.5": "오트라르에서 몽골 사절단이 살해된 뒤 호라즘 제국을 침공해 무너뜨렸다.",
  "genghis-khan.life_arc.6": "서하 원정 중 세상을 떠났다. 그의 매장지는 지금까지 알려지지 않았다.",
  "genghis-khan.complexities.1":
    "적어도 1219년 호라즘 원정 이후로, 칭기즈 칸의 군대는 일관되고 명시적인 원칙을 적용했다 — 저항하는 도시와 주민은 추가 저항을 억제하기 위한 본보기로 파괴 대상이 되었고, 항복한 쪽은 대체로 그에 준하는 폭력을 면했다. 오트라르, 부하라, 사마르칸트, 우르겐치를 비롯한 호라즘 도시들에 적용된 이 원칙은 막대하고 역사적으로 중대한 인명 손실과 파괴를 낳았다. 신뢰할 만한 사상자 수를 확정하기는 어렵다 — 가장 상세하게 남아 있는 기록은 훗날, 종종 적대적인 정치적 상황 속에서 쓰인 페르시아 연대기이며, 현대 학계는 대규모의 의도적 파괴라는 큰 흐름은 충분히 입증된 것으로 보면서도 그 구체적인 수치는 신뢰하기 어렵다고 본다 — 이런 이유로 이 프로필에서는 특정 사상자 수를 제시하지 않는다. 그의 집안 자체의 기록인 《몽골비사》는 그가 승계를 확실히 하기 위해 이복형제 벡테르를 죽였다는 사실도 전하는데, 이는 훗날의 공식 연대기에서는 빠진 대목이다. 그에 대한 평가는 전통에 따라 뚜렷하게 갈린다 — 몽골에서는 건국 시조로 추앙받는 반면, 일부 러시아와 아랍권의 역사적 기억 속에서는 주로 파괴적인 정복자로 남아 있으며, 최근 서구 학계는 이 양극단 사이에서 좀 더 사료에 근거한 재평가를 시도하고 있다.",
  "genghis-khan.legacy":
    "그의 정복은 역사상 가장 넓은 육상 단일 제국을 만들어냈고, 그 안에서의 상대적 안정 — 흔히 '팍스 몽골리카'라 불리는 상태 — 은 실크로드를 비롯한 유라시아 교역로를 따라 전례 없는 규모의 교역·이동·문화적·기술적 교류를 가능하게 했다. 다만 그 안정은 대규모 폭력을 통해 확립된 것이었다. 부족적 충성을 통일된 군사·행정 구조로 대체한 그의 행정 개혁은 그의 사후에도 제국이 옛 부족 경계를 따라 분열되지 않도록 지탱해 주었다. 그에 대한 평가는 오늘날까지도 지역과 전통에 따라 앞서 서술한 대로 뚜렷하게 갈린다.",

  "malala-yousafzai.achievement.1":
    "2013년 시자 샤히드와 함께 말랄라 기금(Malala Fund)을 공동 설립했다 — 여학생 교육에 대한 지원과 옹호 활동을 펼치는 이 비영리 단체는, 그에 대한 공격 이후 처음 쏟아졌던 관심이 잦아든 뒤로도 오랫동안 활동을 이어가며 규모를 키워 왔다.",
  "malala-yousafzai.achievement.2":
    "2013년 국제적 베스트셀러 《나는 말랄라》를 공동 집필했고, 2014년에는 인도의 아동 인권 운동가 카일라시 사티아르티와 함께 노벨 평화상을 공동 수상하며 역대 최연소 수상자가 되었다. 2020년에는 옥스퍼드 대학교 레이디 마거릿 홀에서 철학·정치학·경제학 학위를 받고 졸업했으며, 이 위치에서 계속해서 옹호 활동을 이어갔다.",
  "malala-yousafzai.moment.1":
    "2009년 1월, 11살이던 유사프자이는 '굴 마카이'라는 필명으로 BBC 우르두어 서비스에 익명 블로그를 쓰기 시작해 파키스탄 스와트 계곡에서 탈레반 치하의 일상을 기록했다 — 교육운동가였던 아버지의 격려는 있었지만 지시받은 것이 아닌 자발적인 행동이었고, 이후 이어진 어떤 주목보다도 앞선 일이었다.",
  "malala-yousafzai.interpretation.moment.1":
    "프로필의 양면적인 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 실제 위험을 무릅쓴 자발적 행동이었으며, 이 프로필의 전환점 항목이 보여주듯 그 위험은 이후 곧바로, 그리고 심각하게 현실화되었다.",
  "malala-yousafzai.moment.2":
    "2008년 9월 무렵, 아직 익명 블로그를 쓰기 몇 달 전인 이때 11살의 유사프자이는 이미 본명으로, 그리고 공개적으로 교육권에 관한 연설을 하고 있었다 — \"탈레반이 나의 기본적 교육받을 권리를 빼앗아 갈 수 있는가\"라고 공공연히 묻기도 했다 — 익명이었던 블로그보다 더 노출된, 실명의 행동이었다.",
  "malala-yousafzai.turning_point.1":
    "2012년 10월 9일, 시험을 마치고 스쿨버스로 귀가하던 유사프자이는 스와트 계곡에서 탈레반 총격범의 총에 맞았다. 총알은 왼쪽 눈 근처로 들어가 어깨에 박혔고, 급우 두 명도 함께 부상을 입었다. 그는 페샤와르의 군 병원으로 후송되어 응급 수술을 받은 뒤, 이후 영국 버밍엄의 퀸 엘리자베스 병원으로 옮겨져 안면 신경 재건과 인공와우 이식 등 추가 치료를 받았다. 이 공격은 그를 스와트 계곡의 지역 활동가이자 블로거에서, 이후 회복과 삶의 대부분을 영국에서 보내게 된 세계적 인물로 바꾸어 놓았다 — 2013년 7월 12일, 그의 열여섯 번째 생일에 그는 유엔에서 훗날 '말랄라의 날'로 불리게 될 연설을 했다.",
  "malala-yousafzai.life_arc.1": "파키스탄 스와트 계곡의 밍고라에서 태어났다. 아버지 지아우딘은 학교를 운영했고 그 자신이 교육운동가였다.",
  "malala-yousafzai.life_arc.2": "'굴 마카이'라는 필명으로 BBC 우르두어 서비스에 익명 블로그를 써 스와트에서의 탈레반 치하 생활을 기록했다.",
  "malala-yousafzai.life_arc.3": "10월 9일 스쿨버스에서 탈레반 총격범의 총에 맞았다. 치료를 위해 후송되어 결국 영국 버밍엄으로 옮겨졌다.",
  "malala-yousafzai.life_arc.4": "말랄라 기금을 공동 설립했다. 7월 12일 유엔에서 연설했다.",
  "malala-yousafzai.life_arc.5": "카일라시 사티아르티와 함께 노벨 평화상을 공동 수상하며 역대 최연소 수상자가 되었다.",
  "malala-yousafzai.life_arc.6": "옥스퍼드 대학교 레이디 마거릿 홀에서 철학·정치학·경제학 학위를 받고 졸업했다.",
  "malala-yousafzai.legacy":
    "말랄라 기금과, 2012년 공격 및 그 여파가 그에게 안겨준 국제적 위상은 그를 전 세계에서 가장 널리 알려진 여학생 교육 옹호자 중 한 사람으로 만들었으며, 초기의 전 세계적 관심이 잦아든 뒤로도 이 의제를 국제 정책 논의의 테이블 위에 계속 올려놓는 데 기여했다는 평가를 받는다. 파키스탄 국내에서의 반응은 더 엇갈린다 — 폭넓은 존경을 받는 한편, 그의 활동과 옥스퍼드 유학, 영국에서의 삶을 외세에 편승한 증거로 보는 보수·민족주의 진영의 비판도 받아 왔다 — 파키스탄 사립학교연맹은 2015년 그의 자서전을 금지하기도 했다. 이후 그의 활동은 아프가니스탄 여학생 교육과 로힝야 난민 문제로도 확장되었다.",

  "bruce-lee.achievement.1":
    "위칭춘, 복싱, 펜싱의 요소에 선불교와 도교 사상을 결합한 혼합 무술 철학, 절권도(截拳道)를 창시했다 — 전통 유파의 고정된 형(型)보다 실용성과 직접성, 유연한 적응력을 중심에 두었다.",
  "bruce-lee.achievement.2":
    "《당산대형》(1971), 《정무문》(1972), 《맹룡과강》(1972), 《용쟁호투》(1973)에 출연하며 이 작품들의 색깔을 함께 빚어냈고, 이를 통해 최초의 세계적 중국인 영화 스타로 자리 잡는 동시에, 무술 영화의 액션 연출을 환상적인 무협 연출에서 사실적이고 직접적인 움직임으로 옮겨 놓았다.",
  "bruce-lee.moment.1":
    "홍콩에서 어릴 적부터 자란 리는 십 대 시절 거리 싸움에 나섰고, 1958년에는 홍콩 왕실령 차차차 챔피언십에서 우승했다. 이에 앞서 1953년부터 1957년까지는 엽문(葉問) 문하에서 위칭춘을 익혔는데, 기록에 따르면 이 시기는 혼혈이거나 중국인이 아닌 제자를 가르치는 것을 금기시하던 전통적 관행을 둘러싼 갈등으로 얼룩진 때였다.",
  "bruce-lee.moment.2":
    "1964년, 리는 동료 무술가 웡잭만과 비공개 대련을 벌였다. 양측의 증언은 서로 엇갈린다 — 리 쪽 지지자들은 그가 약 3분 만에 확실하게 승리했다고 말하는 반면, 웡은 20~25분간 이어진 승부가 리가 지치면서 흐지부지 끝났다고 전한다. 정확한 경위가 무엇이었든, 이 경험은 리가 경직된 고전적 기법에서 멀어지게 만든 계기가 된 것으로 전해진다.",
  "bruce-lee.interpretation.moment.2":
    "프로필의 기회 포착(opportunity_sensing) 점수와 맞닿아 있다 — 만족스럽지 못했던 실전 대련 한 번을, 일회성 결과가 아니라 고전적 형식 전반에 대한 반증으로 받아들인 것으로, 당대 대다수 동료들보다 앞선 판단이었다.",
  "bruce-lee.turning_point.1":
    "리는 자신이 직접 1971년에 기획안을 낸 TV 시리즈 《쿵후》의 주연 자리에서, 할리우드 캐스팅 관행 속 인종·억양에 대한 우려 때문이었던 것으로 전해지는 이유로 배제되었다. 대신 자신만의 대표작을 먼저 만들라는 제작자 프레드 와인트라웁의 조언에 따라 홍콩으로 돌아와 《당산대형》, 《정무문》, 《맹룡과강》에 출연했다. 이 흥행 연타는 그에게 최초의 미국-홍콩 합작영화인 《용쟁호투》를 만들 수 있는 발판을 마련해 주었고, 그의 경력은 할리우드 스튜디오 체제 안에서 배역을 구하던 방식에서 자신의 영화로 직접 세계적 관객을 만들어가는 방식으로 옮겨갔다.",
  "bruce-lee.life_arc.1": "샌프란시스코에서 태어났다. 아주 어릴 때부터 홍콩에서 자랐다.",
  "bruce-lee.life_arc.2": "엽문 문하에서 위칭춘을 익혔다. 1958년 홍콩 왕실령 차차차 챔피언십에서 우승했다.",
  "bruce-lee.life_arc.3": "시애틀로 이주해 무술을 가르치기 시작했다.",
  "bruce-lee.life_arc.4": "TV 시리즈 《그린 호넷》에서 가토 역을 맡아 미국 관객에게 처음 이름을 알렸다.",
  "bruce-lee.life_arc.5": "홍콩으로 돌아와 《당산대형》, 《정무문》, 《맹룡과강》에 출연했고, 이어 최초의 미국-홍콩 합작영화인 《용쟁호투》를 찍었다.",
  "bruce-lee.life_arc.6": "홍콩 카오룽에서 32세의 나이로 세상을 떠났다. 공식적으로는 뇌부종이 원인으로 알려졌지만, 그 배경을 둘러싼 논란은 여전히 남아 있다.",
  "bruce-lee.legacy":
    "실용성과 적응력, 여러 유파를 가로지르는 종합을 강조한 리의 접근은 수십 년 앞서 종합격투기(MMA)의 흐름을 예고했으며, 오늘날에도 격투 스포츠와 무술 훈련이 다뤄지는 방식에 영향을 미치고 있다. 그의 액션 연출은 무술 영화를 더 사실적이고 절제된 움직임 쪽으로 옮겨 놓았고, 최초로 세계적 성공을 거둔 중국인 영화 스타로서 그의 명성은, 정작 자신의 경력 중에는 할리우드가 직접적으로 허락하지 않았던 아시아인 주연 배역의 자리를 서구 대중문화 안에 열어주었다.",

  "toni-morrison.achievement.1":
    "《가장 파란 눈》(1970), 《솔로몬의 노래》(1977), 《빌러비드》(1987, 마거릿 가너의 실화에 바탕을 둠), 《재즈》(1992), 《낙원》(1997)을 비롯해, 다섯 개 시대에 걸쳐 흑인 미국인의 삶과 기억, 역사적 트라우마를 중심에 둔 소설들을 펴냈다 — 단일한 대표작이 아니라 이 작품군 전체가 미국 문학사에서 그가 지니는 위치의 핵심이다.",
  "toni-morrison.achievement.2":
    "랜덤하우스 최초의 흑인 여성 수석 소설 편집자(1967~1983)로 일하며 토니 케이드 밤바라, 안젤라 데이비스, 게일 존스 등 당시 주류 출판계가 크게 주목하지 않던 작가들을 발굴하고 지원했으며, 선집 《현대 아프리카 문학》(1972)과 노예제 시대부터 1920년대까지 흑인 미국인의 삶을 담은 시각 자료집 《더 블랙 북》(1974)을 편집했다.",
  "toni-morrison.moment.1":
    "모리슨은 데뷔작 《가장 파란 눈》을, 정규직으로 일하며 홀로 두 아이를 키우던 시절에 하루 일과가 시작되기 전인 새벽 4시에 일어나 써 내려갔다 — 이 소설은 그가 서른아홉 살이던 1970년에 출간되었다.",
  "toni-morrison.moment.2":
    "랜덤하우스에서, 이미 점수에 반영된 저자 발굴 외에도 모리슨은 무하마드 알리의 1975년 자서전 《가장 위대한 자: 나만의 이야기》를 출간으로 이끌었고, 1968년 뉴욕시 지하철 경찰에 의해 사살된 시인 헨리 듀마스의 작품을 사후에 알리는 데 힘을 쏟았다 — 업계가 그냥 지나쳤을 작품에 편집자로서의 자신의 위치를 활용해 관심을 불러일으킨 것이다.",
  "toni-morrison.interpretation.moment.2":
    "프로필의 선제적 행동력(proactive_agency) 점수와 맞닿아 있다 — 공식적으로 주어진 편집 업무를 넘어선 발굴과 지원 활동으로, 요청받은 것이 아니라 스스로 나선 일이었다.",
  "toni-morrison.moment.3":
    "2010년 아들 슬레이드가 췌장암으로 세상을 떠나자, 모리슨은 집필 중이던 소설 《홈》 작업을 중단했다가 다시 이어갔다 — 그는 이렇게 말했다. \"내가 (작업을) 멈췄다고 생각하면, 그 애가 정말 속상해할 거예요.\"",
  "toni-morrison.life_arc.1": "오하이오주 로레인에서 클로이 아델리아 워포드라는 이름으로 태어났다.",
  "toni-morrison.life_arc.2": "하워드 대학교를 졸업한 뒤 코넬 대학교에서 석사 학위를 받았다.",
  "toni-morrison.life_arc.3": "랜덤하우스에서 일하며 이 회사 최초의 흑인 여성 수석 소설 편집자가 되었다.",
  "toni-morrison.life_arc.4": "홀로 두 아이를 키우며 서른아홉 살에 데뷔작 《가장 파란 눈》을 출간했다.",
  "toni-morrison.life_arc.5": "《빌러비드》를 출간해 1988년 퓰리처상을 받았고, 1993년에는 흑인 여성으로서는 최초로 노벨 문학상을 받았다.",
  "toni-morrison.life_arc.6": "뉴욕에서 88세로 세상을 떠났다.",
  "toni-morrison.legacy":
    "모리슨은 흑인 여성들의 내면과 미국의 노예제 및 그 이후의 역사를, 백인 독자층의 기대에 맞춰 조율하지 않고 그 자체의 방식으로 중심에 놓았다. 그의 평가가 전성기에도 늘 순탄했던 것은 아니다 — 《빌러비드》가 1987년 전미도서상 후보에서 제외되자 마야 안젤루를 포함한 흑인 작가·평론가 48명이 공개적으로 항의했고, 이듬해 이 작품은 퓰리처상을 받았다. 2006년 《뉴욕타임스》는 이 작품을 지난 25년간 나온 최고의 미국 소설로 꼽았다. 1996년부터 그의 소설 네 편을 선정한 오프라 윈프리의 북클럽은, 문학상만으로는 닿지 못했을 훨씬 더 넓은 독자층에게 그의 작품을 소개했다.",

  "zheng-he.achievement.1":
    "명 조정을 위해 1405년부터 1433년까지 일곱 차례의 대규모 해상 원정을 지휘했다. 1405년 7월 출항한 첫 함대만 해도 배 317척과 승선 인원 약 2만 8천 명 규모로, 동남아시아, 남아시아, 아라비아반도, 동아프리카 해안까지 이르렀다 — 전근대 세계에서 가장 큰 규모의 국가 해군 작전 가운데 하나였다.",
  "zheng-he.achievement.2":
    "명 조정을 대신해 인도양 세계 전역에 걸쳐 폭넓은 외교·조공 관계를 수립하고 유지했으며, 비단·도자기·금·은 등 중국 물품을 각지의 물산과 교환했다. 또한 지역 해상 교역을 방해하던 해적을 소탕해, 팔렘방 인근에서 해적 두목 진조의를 붙잡아 중국으로 압송해 처형시켰다.",
  "zheng-he.moment.1":
    "한 원정 도중, 실론(스리랑카)의 현지 관리들이 함대를 위협하자 정화의 병력은 이에 대응해 코테 왕국을 상대로 지상전을 벌였다 — 이 원정대가 교역과 외교 이면에 실제 군사력을 갖추고 있었음을 보여주는 사례다.",
  "zheng-he.moment.2":
    "한 원정에서 함대는 동아프리카 해안의 말린디에서 기린 한 마리를 가지고 돌아왔는데, 이는 명 조정에서 상서로운 전설의 동물인 '기린(麒麟)'으로 소개되어 왕조의 정통성을 확인해 주는 것으로 받아들여졌다 — 이 원정이 조정에 대해 지녔던 상업적 목적뿐 아니라 상징적 목적까지 보여주는 일화다.",
  "zheng-he.turning_point.1":
    "1381년 무렵, 소년이었던 그는 명나라의 윈난 정복 과정에서 붙잡혀 10세에서 14세 사이의 나이에 거세당한 뒤 훗날 영락제가 되는 연왕(燕王)의 가문에 소속되었다 — 이는 그가 선택했다고 볼 근거가 없는, 외부에서 강제된 폭력적인 처지의 전환이었으며, 이후 궁정 환관 관료로서 그의 삶 전체의 방향을 결정지었다. 그는 1399년 반란 당시 베이핑의 정룬바 저수지 방어에 힘을 보태는 등 연왕 가문을 군사적으로 도왔고, 1402년 연왕이 정난의 변에서 승리해 황제가 된 뒤에는 그 공로를 인정받아 1404년 '정(鄭)'이라는 성을 하사받았다 — 포로로서 편입되었던 그 가문이, 20여 년 뒤에는 그를 제독으로 만든 권력의 근원이 된 셈이다.",
  "zheng-he.life_arc.1": "윈난 쿤밍에서 마화(馬和)라는 이름으로 태어났다.",
  "zheng-he.life_arc.2": "명나라의 윈난 정복 과정에서 붙잡혀 거세당했다. 연왕의 가문에 소속되었다.",
  "zheng-he.life_arc.3": "연왕이 정난의 변에서 승리해 영락제가 되었다. 정화는 그 공로를 인정받아 1404년 성을 하사받았다.",
  "zheng-he.life_arc.4": "일곱 차례의 보선(寶船) 함대 원정 가운데 첫 번째 원정을 떠났다.",
  "zheng-he.life_arc.5": "영락제가 세상을 떠난 뒤 원정이 중단되었다. 이후 선덕제 치세에 한 차례 더 원정이 이루어졌으나, 그것을 끝으로 이 사업은 완전히 막을 내렸다.",
  "zheng-he.life_arc.6": "일곱 번째 원정 도중 또는 그 직후, 아마도 캘리컷 부근에서 세상을 떠났다. 공식적으로는 수장(水葬)되었다.",
  "zheng-he.legacy":
    "그의 사후, 명나라의 공식 연대기는 이 원정들을 불완전하게, 그리고 훗날의 학계 평가에 따르면 부정확하게 기록했으며, 이후의 공식 간행물들은 이를 아예 빠뜨렸다 — 왕조가 창건자의 칙령이 애초에 정해 둔, 더 내향적인 정책 쪽으로 돌아섰기 때문이다. 이 원정들은 역사가 량치차오가 1904년 그의 전기를 펴내면서 다시 주목받기 전까지 오랫동안 잊혀 있었다. 오늘날 그의 첫 원정 출항일인 7월 11일은 중국에서 '항해일'로 기념되며, 정화는 한때 그의 함대가 지났던 항로를 따라 자리한 동남아시아 각지의 공동체가 세운 사원과 기념물을 통해 지금도 기려지고 있다.",

  "rumi.achievement.1":
    "약 2만 7천 행에 이르는 6권짜리 영적 서사시 《마스나비》를 남겼는데, 흔히 '페르시아어로 된 코란'이라 불린다. 여기에 약 3만 5천 연으로 이루어진 페르시아어 시집 《샴스 에 타브리지 시집》이 더해져, 오늘날 그를 세계에서 가장 널리 읽히는 시인 중 한 사람으로 자리매김하게 한 작품군을 이룬다.",
  "rumi.achievement.2":
    "그의 사후, 제자들이 메블레비 수피 교단을 세웠고, 이 교단은 음악과 움직임, 낭송이 어우러진 예배 의식인 세마(빙글빙글 도는 춤) 의식을 발전시켰다 — 오늘날에도 메블레비 수피즘의 핵심 의식으로 남아 계속 행해지고 있다.",
  "rumi.moment.1":
    "1210년대와 1220년대에 걸쳐 몽골이 중앙아시아를 침공해 오자, 루미의 아버지는 가족을 이끌고 이란, 바그다드, 다마스쿠스를 거쳐 서쪽으로 이주했고, 결국 1228년 무렵 아나톨리아의 코니아에 정착했다. 그곳에서 루미는 아버지의 지위 — 이슬람 법학자이자 교사 — 를 물려받아 법적 견해(파트와)를 내리고 모스크에서 설교를 했다 — 훗날 신비주의 시인으로 알려지기 훨씬 이전의, 정통 학자로서의 모습이었다.",
  "rumi.turning_point.1":
    "1244년 11월 15일, 루미는 코니아에서 방랑하는 신비주의자 샴스 에 타브리지를 만났다 — 이 만남은 그를 존경받는 법학자이자 교사에서 강렬한 신비주의적 수행에 몰두하는 인물로 바꾸어 놓았다. 두 사람의 관계는 가까웠지만 짧았다 — 1248년 12월 5일, 샴스는 자취를 감추었고, 살해설을 포함해 여러 설명이 엇갈려 전해지지만 확실히 밝혀진 것은 없다. 이후 샴스를 향한 그리움과 그를 찾아 헤맨 경험은, 훗날 《샴스 에 타브리지 시집》으로 묶이는 서정시의 원천이 되었다.",
  "rumi.interpretation.turning_point.1":
    "프로필의 신념 개정(belief_updating) 점수와 맞닿아 있다 — 이 배치 안에서 가장 강력한 사례로, 침묵으로부터 추론한 것이 아니라 그의 후기 시 전반에 걸쳐 폭넓게 반영된, 공식적인 법학·종교적 권위에서 직접적인 신비 체험으로의 방향 전환이 거듭 입증되어 있다.",
  "rumi.life_arc.1": "페르시아어권 대(大)호라산 지역의 바흐시(현재의 타지키스탄)에서 태어났다.",
  "rumi.life_arc.2": "몽골이 중앙아시아를 침공해 오자, 아버지가 가족을 이끌고 이란, 바그다드, 다마스쿠스를 거쳐 서쪽으로 이주했다.",
  "rumi.life_arc.3": "가족은 아나톨리아의 코니아에 정착했고, 루미는 그곳에서 아버지의 지위인 법학자이자 교사의 자리를 물려받았다.",
  "rumi.life_arc.4": "신비주의자 샴스 에 타브리지를 만났고, 이 만남은 그를 학자에서 신비주의 시인으로 바꾸어 놓았다.",
  "rumi.life_arc.5": "코니아에서 세상을 떠났다.",
  "rumi.legacy":
    "제자들이 세운 메블레비 교단과 그 세마 의식은 그의 가르침을 단순한 텍스트가 아니라 살아 있는 예배 전통으로 이어 왔다. 다만 오늘날 그의 세계적 인기는 상당 부분 영어 번역본 — 그중에서도 가장 유명한 콜먼 바크스의 번역 — 에 기대고 있는데, 이는 직역이라기보다는 느슨한 해석적 의역에 가까우며, 아버리, 니컬슨, 루이스 등의 좀 더 엄밀한 학술적 번역과는 구별된다. 서구 대중문화 속에서 '루미의 명언'으로 떠도는 문구 상당수는, 그의 실제 언어 그대로라기보다는 이러한 구분을 염두에 두고 받아들여야 한다.",
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
