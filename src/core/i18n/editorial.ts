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
    "In an undated letter seeking work from Ludovico Sforza, Duke of Milan, he introduced himself primarily as a military and civil engineer — bridges, armored vehicles, catapults — and mentioned painting only near the end, reading the patron's actual priorities rather than leading with what he is remembered for today.",
  "leonardo-da-vinci.moment.2":
    "Carried the Mona Lisa with him for years after it was commissioned, continuing to adjust it rather than delivering a finished work — the same restlessness that fed his enormous range across fields also left much of his output unfinished.",
  "leonardo-da-vinci.turning_point.1":
    "Conducted dissections in secret, at hospitals at night, in an era when the practice was legally and religiously fraught — and revised his own earlier anatomical drawings more than once as later dissections contradicted what he had first assumed.",
  "leonardo-da-vinci.interpretation.moment.1":
    "This is consistent with the profile's high opportunity_sensing score — reading what a specific situation actually called for, rather than what he was already known for.",
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
    "Meeting Charles Babbage as a seventeen-year-old and seeing his prototype Difference Engine set the direction of the work she would return to a decade later.",
  "ada-lovelace.interpretation.moment.1":
    "This is consistent with the profile's high opportunity_sensing score: noticing an implication of someone else's machine that its own inventor had not emphasized.",

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
    "This is consistent with the profile's dual-edged proactive_agency score — the same willingness to act on his own judgment against orders carried a severe, direct personal cost before it produced one of the war's decisive victories.",
  "yi-sun-sin.interpretation.achievement.3":
    "This helps explain the profile's very high resourcefulness score: making decisive use of severely limited material means rather than waiting for reinforcement that was not coming.",

  /* ------------------------------------------------------------ F. Kahlo */
  "frida-kahlo.achievement.1":
    "Developed a distinctive painting style blending Mexican folk-art traditions with symbolic, often unflinching self-portraiture exploring pain, identity, and the body — work that only reached wide international recognition well after her death.",
  "frida-kahlo.moment.1":
    "After a near-fatal bus accident in 1925 left her bedridden for months, she began painting lying on her back using a specially mounted mirror and an easel her mother had arranged over the bed.",
  "frida-kahlo.moment.2":
    "As an unknown young artist, she approached the already-famous muralist Diego Rivera directly and unprompted to ask for his honest opinion of her paintings.",
  "frida-kahlo.turning_point.1":
    "The 1925 accident, and the many operations and long convalescences that followed for the rest of her life, redirected her from an earlier ambition toward medicine into painting as her primary occupation.",
  "frida-kahlo.interpretation.moment.1":
    "This is consistent with the profile's high resourcefulness score: continuing creative work under a severe physical constraint by improvising the equipment that made it possible, rather than waiting for the constraint to lift.",

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
    "This is consistent with the profile's dual-edged proactive_agency score: the same self-initiated act that later helped end apartheid carried real risk of being disowned by his own movement if it had gone differently.",
  "nelson-mandela.interpretation.moment.1":
    "This helps explain the profile's high resourcefulness score: building a functioning institution out of almost nothing, inside conditions designed to prevent exactly that.",

  /* ---------------------------------------------------------- Einstein */
  "albert-einstein.achievement.1":
    "In 1905 — his \"miracle year\" — published four separate groundbreaking papers (special relativity, the photoelectric effect, Brownian motion, and mass–energy equivalence) in his own time while working full-time as a Swiss patent clerk, outside any university position.",
  "albert-einstein.achievement.2":
    "Developed general relativity over roughly a decade of iterative work, including multiple approaches he tried and abandoned before reaching the final 1915 field equations.",
  "albert-einstein.achievement.3":
    "In 1939, without being asked by any government body, wrote to President Roosevelt warning of the military potential of nuclear fission — a letter historians credit with directly contributing to the decision to launch the Manhattan Project.",
  "albert-einstein.moment.1":
    "As a child, he was struck by the fact that a compass needle always pointed the same direction no matter how the compass was turned — an experience he himself repeatedly credited, later in life, as an early spark of his scientific curiosity.",
  "albert-einstein.turning_point.1":
    "He rejected quantum mechanics' probabilistic interpretation — summarized in his own words as \"God does not play dice\" — and spent his last several decades pursuing an unsuccessful unified field theory well after his reputation was already secure, as the rest of physics moved on without him.",
  "albert-einstein.interpretation.turning_point.1":
    "This is consistent with the profile's low belief_updating score: the same conviction that let him defend a genuinely new theory against early skeptics also kept him from productively engaging with quantum mechanics' mounting evidence for the rest of his career.",

  /* -------------------------------------------------------- Joan of Arc */
  "joan-of-arc.achievement.1":
    "As an unknown teenage peasant with no rank or family standing, convinced the Dauphin's court to grant her troops and equipment, and helped lift the English siege of Orléans in 1429.",
  "joan-of-arc.achievement.2":
    "Led French forces on the campaign that culminated in the Dauphin's coronation as Charles VII at Reims — the goal she had stated from the outset.",
  "joan-of-arc.moment.1":
    "When the Dauphin tried to test her by disguising himself among his courtiers and putting someone else on the throne, she identified him correctly and unprompted — an episode recorded across multiple independent contemporary chronicles.",
  "joan-of-arc.moment.2":
    "Wounded by a crossbow bolt during the assault on Orléans, she returned to the fighting after treatment rather than withdrawing from the field.",
  "joan-of-arc.moment.3":
    "At her trial, she sustained weeks of hostile theological interrogation by trained clergy without breaking — one of the few surviving cases of a medieval individual's own recorded first-person testimony, rather than a later reconstruction.",
  "joan-of-arc.turning_point.1":
    "She continued wearing male soldiers' clothing against direct clerical instruction to stop — a choice the trial record shows her defending as her own, repeated decision, and one of the central charges that led to her execution.",
  "joan-of-arc.interpretation.turning_point.1":
    "This is consistent with the profile's dual-edged independent_thinking score: the same refusal to yield a position under pressure that sustained her through interrogation also became the specific charge used to convict her.",

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
    "After founding the Republic, closed the country's only organized opposition party in 1925 and had an Independence Tribunal execute dozens of people within days of sentencing following an uprising — the same decisiveness that held the line at Gallipoli and founded the Republic also drove a rapid, forceful consolidation of one-party rule.",
  "mustafa-kemal-ataturk.interpretation.turning_point.1":
    "This helps explain the profile's high decisiveness and conflict_tolerance scores — the same trait that let him act fast under fire also shows up, later, as a willingness to move fast and forcefully against domestic political opposition.",

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
    "This is consistent with the profile's dual-edged competitiveness score: the same intensity that drove decades of exceptional performance also showed up as open jealousy toward a close collaborator.",
  "anna-pavlova.interpretation.turning_point.1":
    "This helps explain the profile's high risk_tolerance score, scored dual-edged for exactly this kind of moment — a willingness to accept the largest possible stakes rather than compromise on what mattered most to her.",
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
    "밀라노 공작 루도비코 스포르차에게 일자리를 구하며 보낸 편지에서, 그는 자신을 먼저 군사·토목 기술자 — 다리, 장갑 전차, 투석기 — 로 소개했고 그림 이야기는 맨 끝에서야 짧게 언급했다. 오늘날 기억되는 모습이 아니라 후원자가 실제로 필요로 하는 것을 먼저 읽은 것이다.",
  "leonardo-da-vinci.moment.2":
    "의뢰받은 모나리자를 몇 년이나 곁에 두고 계속 손을 보았을 뿐, 완성작으로 넘기지 않았다 — 그의 엄청난 다재다능함을 키운 바로 그 안절부절못하는 성향이 많은 작업을 미완성으로 남긴 원인이기도 했다.",
  "leonardo-da-vinci.turning_point.1":
    "해부가 법적·종교적으로 민감했던 시대에 병원에서 밤에 몰래 해부를 진행했고, 이후 관찰 결과가 처음의 가정과 어긋나자 자신이 이전에 그린 해부도를 여러 차례 수정했다.",
  "leonardo-da-vinci.interpretation.moment.1":
    "프로필의 높은 기회 포착(opportunity_sensing) 점수와 일치하는 대목이다 — 자신이 이미 유명했던 분야가 아니라, 그 상황이 실제로 필요로 하는 것을 읽어낸 것이다.",
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
    "열일곱 살에 찰스 배비지를 만나 그의 차분기관 시제품을 본 일이, 십 년 뒤 그가 다시 돌아오게 될 작업의 방향을 정했다.",
  "ada-lovelace.interpretation.moment.1":
    "프로필의 높은 기회 포착(opportunity_sensing) 점수와 일치하는 대목이다 — 다른 사람이 만든 기계에서, 그 발명가조차 강조하지 않았던 함의를 알아챈 것이다.",

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
    "프로필의 양면적인 주도적 행동력(proactive_agency) 점수와 일치하는 대목이다 — 명령을 거스르고 자신의 판단대로 행동하려는 바로 그 성향이 먼저 큰 개인적 대가를 치르게 했고, 이후 전쟁을 가른 결정적 승리로 이어졌다.",
  "yi-sun-sin.interpretation.achievement.3":
    "프로필의 매우 높은 자원 활용 성향(resourcefulness) 점수를 이해하는 데 도움이 된다 — 오지 않을 지원군을 기다리는 대신, 극도로 제한된 자원을 결정적으로 활용한 것이다.",

  /* ------------------------------------------------------------ F. Kahlo */
  "frida-kahlo.achievement.1":
    "멕시코 민속 예술의 전통과 고통·정체성·신체를 탐구하는 상징적이고 거침없는 자화상을 결합한 독자적인 화풍을 만들어냈다 — 국제적으로 폭넓게 인정받은 것은 사후 한참이 지난 뒤였다.",
  "frida-kahlo.moment.1":
    "1925년 거의 목숨을 잃을 뻔한 버스 사고로 몇 달간 몸져누운 뒤, 어머니가 침대 위에 마련해준 특수 거울과 이젤을 이용해 누운 채로 그림을 그리기 시작했다.",
  "frida-kahlo.moment.2":
    "무명 화가였던 시절, 이미 유명했던 벽화가 디에고 리베라를 직접 찾아가 자신의 그림에 대한 솔직한 평가를 청했다.",
  "frida-kahlo.turning_point.1":
    "1925년의 사고와 이후 평생에 걸쳐 이어진 수많은 수술과 긴 요양 기간은, 원래 의학을 꿈꾸던 그를 그림을 본업으로 삼는 방향으로 이끌었다.",
  "frida-kahlo.interpretation.moment.1":
    "프로필의 높은 자원 활용 성향(resourcefulness) 점수와 일치하는 대목이다 — 제약이 사라지길 기다리는 대신, 창작을 가능하게 할 도구를 즉석에서 만들어내며 심각한 신체적 제약 속에서도 작업을 이어간 것이다.",

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
    "프로필의 양면적인 주도적 행동력(proactive_agency) 점수와 일치하는 대목이다 — 훗날 아파르트헤이트 종식에 기여한 바로 그 자발적 행동은, 만약 상황이 달랐다면 자신이 속한 운동으로부터 부인당할 실제 위험을 안고 있었다.",
  "nelson-mandela.interpretation.moment.1":
    "프로필의 높은 자원 활용 성향(resourcefulness) 점수를 이해하는 데 도움이 된다 — 바로 그것을 막기 위해 설계된 환경 안에서, 거의 아무것도 없는 상태로부터 실제로 작동하는 하나의 제도를 만들어낸 것이다.",

  /* ---------------------------------------------------------- Einstein */
  "albert-einstein.achievement.1":
    "1905년 — 그의 '기적의 해' — 스위스 특허청에서 정규직으로 일하면서 남는 시간에 특수상대성이론, 광전효과, 브라운 운동, 질량-에너지 등가라는 네 편의 획기적인 논문을 대학 소속 없이 발표했다.",
  "albert-einstein.achievement.2":
    "일반상대성이론은 약 10년에 걸친 반복적인 연구 끝에 완성되었으며, 그 과정에는 시도했다가 포기한 여러 접근법이 있었고 마침내 1915년 최종 장방정식에 도달했다.",
  "albert-einstein.achievement.3":
    "1939년, 어느 정부 기관의 요청도 없이 스스로 루스벨트 대통령에게 핵분열의 군사적 잠재력을 경고하는 편지를 썼다 — 역사가들은 이 편지가 맨해튼 프로젝트 착수 결정에 직접적으로 기여했다고 본다.",
  "albert-einstein.moment.1":
    "어린 시절, 나침반을 아무리 돌려도 바늘이 항상 같은 방향을 가리킨다는 사실에 깊은 인상을 받았다 — 그는 훗날 이 경험을 자신의 과학적 호기심이 처음 싹튼 순간으로 여러 차례 언급했다.",
  "albert-einstein.turning_point.1":
    "그는 양자역학의 확률적 해석을 받아들이지 않았고 — 스스로 '신은 주사위 놀이를 하지 않는다'는 말로 요약했다 — 이미 명성이 확고해진 뒤에도 남은 생애의 수십 년을 성과 없는 통일장 이론 연구에 쏟았고, 그동안 물리학계는 그를 남겨둔 채 앞으로 나아갔다.",
  "albert-einstein.interpretation.turning_point.1":
    "프로필의 낮은 입장 수정(belief_updating) 점수와 일치하는 대목이다 — 새로운 이론을 초기 회의론자들로부터 지켜낼 수 있게 해준 바로 그 확신이, 이후 양자역학이 쌓아가던 증거들과 생산적으로 마주하는 것을 평생 가로막기도 했다.",

  /* -------------------------------------------------------- Joan of Arc */
  "joan-of-arc.achievement.1":
    "아무런 신분도 가문의 배경도 없는 무명의 십 대 농민 소녀였음에도 도팽의 궁정을 설득해 병력과 물자를 얻어냈고, 1429년 영국군의 오를레앙 포위를 푸는 데 기여했다.",
  "joan-of-arc.achievement.2":
    "처음부터 자신이 밝혔던 목표였던 랭스에서의 도팽 대관식 — 이를 샤를 7세로 즉위시키는 데까지 이어진 원정에서 프랑스군을 이끌었다.",
  "joan-of-arc.moment.1":
    "도팽이 신하들 사이에 자신을 숨기고 다른 사람을 왕좌에 앉혀 그를 시험하려 하자, 그는 정확히, 그리고 누구의 도움도 없이 도팽을 알아보았다 — 여러 독립적인 당대 연대기에 함께 기록된 일화다.",
  "joan-of-arc.moment.2":
    "오를레앙 공격 중 석궁 화살에 부상을 입었지만, 물러나는 대신 치료를 받은 뒤 곧바로 전장으로 돌아갔다.",
  "joan-of-arc.moment.3":
    "재판에서 훈련된 성직자들의 적대적인 신학적 심문을 몇 주에 걸쳐 견뎌내며 무너지지 않았다 — 후대의 재구성이 아니라 중세 개인의 1인칭 진술이 그대로 남아 있는 몇 안 되는 사례 중 하나다.",
  "joan-of-arc.turning_point.1":
    "성직자들의 직접적인 지시를 거스르고 계속 남성 병사의 복장을 착용했다 — 재판 기록은 이것이 스스로 반복해서 내린 선택이었음을 그 자신이 인정했다고 전하며, 이는 그를 처형으로 이끈 핵심 혐의 중 하나가 되었다.",
  "joan-of-arc.interpretation.turning_point.1":
    "프로필의 양면적인 독립적 사고(independent_thinking) 점수와 일치하는 대목이다 — 심문을 견뎌내게 해준 바로 그, 압박 속에서도 입장을 굽히지 않는 태도가 그를 유죄로 이끈 구체적인 혐의가 되기도 했다.",

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
    "공화국을 세운 뒤, 1925년 유일하게 조직된 야당을 해산시켰고, 한 봉기 이후 독립법정이 판결 며칠 만에 수십 명을 처형하도록 했다 — 갈리폴리에서 전선을 지켜내고 공화국을 세우게 한 바로 그 결단력이, 이후 국내 정치적 반대 세력을 향해서는 신속하고 강압적인 일당 체제 강화로 나타났다.",
  "mustafa-kemal-ataturk.interpretation.turning_point.1":
    "프로필의 높은 결단력(decisiveness)과 갈등 감내(conflict_tolerance) 점수를 이해하는 데 도움이 된다 — 포화 속에서 신속히 행동하게 해준 바로 그 성향이, 이후에는 국내 정치적 반대 세력을 향해 빠르고 강압적으로 움직이는 모습으로도 나타난다.",

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
    "프로필의 양면적인 경쟁심(competitiveness) 점수와 일치하는 대목이다 — 수십 년간 탁월한 무대를 만들어낸 바로 그 강렬함이, 가까운 동료를 향한 노골적인 질투로도 드러난 것이다.",
  "anna-pavlova.interpretation.turning_point.1":
    "프로필의 높은 위험 감수(risk_tolerance) 점수를 이해하는 데 도움이 된다 — 바로 이런 순간을 염두에 두고 양면적으로 평가된 점수다 — 자신에게 가장 중요한 것을 타협하느니 가장 큰 위험을 감수하려는 태도다.",
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
