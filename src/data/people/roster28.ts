/**
 * ROSTER 28 — fifteen-person fast production batch, fifth real use of the
 * profile-publication / match-eligibility separation architecture
 * (15 people).
 *
 * Generated from `data-pipeline/candidates/*.json` via
 * `src/dev/roster1000/generateRoster28.ts`, which calls
 * `preparePersonSeedForPromotion()` per candidate — NOT `toPersonSeed()`
 * directly — and never checks `computedEligibility.eligible`. All fifteen
 * are `evidence_approved`. Every score's rationale is preserved as the
 * inline comment above its Row. Full record:
 * `docs/checkpoints/roster28-fifteen-person-fast-batch.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_agatha_christie",
    slug: "agatha-christie",
    canonicalName: "Agatha Christie",
    birthYear: 1890,
    deathYear: 1976,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["prolific", "self_taught", "career_changer"],
    archetypeIds: ["independent_creator"],
    externalIdentity: { wikidataId: "Q35064" },
    portrait: {
      url: "/portraits/agatha-christie-anefo-1964.jpg",
      source: "Wikimedia Commons / Nationaal Archief",
      license: "CC0 1.0 Universal Public Domain Dedication",
      width: 1128,
      height: 1600,
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      attribution: "Joop van Bilsen / Anefo, 17 September 1964",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_ac_autobiography", kind: "archive", title: "Agatha Christie, An Autobiography (written across decades, published posthumously 1977) — her own account, read critically alongside independent biography" }, { id: "src_ac_thompson", kind: "biography", title: "Laura Thompson, Agatha Christie: An English Mystery (2007)" }, { id: "src_ac_morgan", kind: "biography", title: "Janet Morgan, Agatha Christie: A Biography (1984)" }, { id: "src_ac_wikipedia", kind: "wikipedia", title: "Agatha Christie", url: "https://en.wikipedia.org/wiki/Agatha_Christie" }],
    rows: {
      // Documented, self-taught acquisition of pharmacological knowledge while volunteering in a hospital dispensary during both World Wars, directly informing the technically accurate poisoning methods in her novels — a sustained, specific area of applied study, not general reading.
      curiosity: [68, 0.52, "s", "A"],
      // Her detective plots are documented by genre historians as unusually rigorous in their logical fair-play construction (clues genuinely available to the reader, misdirection built on genuine logical gaps rather than withheld information) — a specific structural discipline recognized across her body of work, not a single novel's trick.
      analytical_rigor: [72, 0.55, "s", "A"],
      // The Murder of Roger Ackroyd (1926) and Murder on the Orient Express (1934) are documented by mystery historians as introducing narrative devices (an unreliable-narrator solution; a collective-culprit solution) genuinely novel to the genre at time of publication, independently attested by their lasting influence on the form.
      creative_originality: [75, 0.58, "s", "A"],
      // Documented, sustained output of roughly one novel per year across a nearly 56-year career (66 novels total), maintained even through a highly publicized personal crisis in 1926 — an independently verifiable, sustained production record.
      discipline: [78, 0.62, "d", "A"],
      // Her first novel was rejected by multiple publishers over several years before The Mysterious Affair at Styles was accepted in 1920, documented via her own account and independent biography, after which she rebuilt a stable, prolific career following her well-documented 1926 personal crisis.
      persistence: [68, 0.5, "s", "A"],
      // Documented shift from writing primarily detective fiction to also authoring Mary Westmacott romance novels under a pseudonym, and later adapting her own novels for the stage (The Mousetrap, still running) — real but narrower range than a full career reinvention, hence inference-level.
      adaptability: [60, 0.45, "i", "A"],
      // Little documented evidence of deliberate personal risk-taking; her famous 1926 disappearance is documented as a response to acute personal distress rather than a calculated risk, so it is not scored here as evidence of risk tolerance — scored at the safe default.
      risk_tolerance: [55, 0.4, "i", "N"],
      // The well-documented 11-day disappearance in December 1926, following her mother's death and her husband's announcement of an affair, is read by biographers as a genuine psychological crisis under acute unresolved stress — evidence pointing toward lower tolerance for that specific compounded uncertainty, scored below center rather than assumed neutral.
      ambiguity_tolerance: [45, 0.4, "i", "N"],
      // Documented as quickly divorcing her first husband once his affair was confirmed and, separately, deciding within a short courtship to marry archaeologist Max Mallowan 14 years her junior — specific, dated decisions, though the broader evidentiary base for a general decisiveness pattern is thinner, hence inference-level.
      decisiveness: [55, 0.4, "i", "N"],
      // Documented and widely corroborated by her own autobiography and by biographers as personally shy and publicity-averse throughout her life, notably declining most interviews and public appearances despite her fame — a specific, sustained, well-attested pattern.
      social_assertiveness: [40, 0.42, "s", "N"],
      // Documented, sustained self-directed study of poisons and forensic pharmacology (verified by pharmacists and toxicologists as generally accurate for the era) maintained and refined across her whole writing career, not a single research burst.
      mastery_orientation: [65, 0.48, "s", "A"],
      // Sustained a prolific, decades-long output and continued writing well past financial necessity, though her own autobiography frames writing more as a sustained craft and livelihood than an explicitly ambitious drive for status — scored moderately.
      achievement_drive: [60, 0.45, "i", "A"],
      // Documented as maintaining tight personal control over her literary estate and adaptations (including the still-running stage rights to The Mousetrap) but otherwise working within conventional publishing relationships — scored near center.
      autonomy_need: [58, 0.42, "i", "N"],
      // Thin direct evidence of motivation toward broader social or historical impact beyond her craft and career; her own writing frames her work primarily in craft and commercial terms — scored at the safe default rather than inflated from her enduring cultural influence, which is a separate question from her own motivation.
      impact_motivation: [50, 0.35, "i", "N"],
      // Documented, verified technical accuracy in poison dosages and effects across her novels (independently checked by toxicologists in later academic review) reflects sustained, careful factual research rather than atmospheric approximation.
      detail_orientation: [75, 0.58, "s", "A"],
      // Documented as a fast, workmanlike writer who did not extensively revise drafts once a plot structure was set, per her own autobiography's description of her process — genuinely more efficient than perfectionist, scored near center.
      perfectionism: [55, 0.4, "i", "N"],
      // Documented as typically completing a novel manuscript within a few months once she had worked out the plot mechanics in advance, per her own account and publishers' records of her delivery schedule across decades.
      execution_speed: [70, 0.52, "s", "A"],
      // Documented as working out a mystery's solution and clue structure in detailed notebooks before drafting prose, per surviving notebook archives held and studied at the Christie estate — a specific, attested planning method preceding composition.
      planning_orientation: [70, 0.52, "s", "A"],
      // Documented substantive activity across detective fiction, romance writing (as Mary Westmacott), stage adaptation, and hands-on archaeological fieldwork alongside her second husband — genuine range, though concentrated in literary and adjacent domains, hence inference-level.
      cross_domain_range: [58, 0.42, "i", "A"],
      // Self-initiated the Mary Westmacott pseudonymous novels specifically to write outside genre expectations without affecting her detective-fiction reputation, a documented deliberate choice though the broader pattern of self-directed career initiative is less extensively documented, hence inference-level.
      proactive_agency: [55, 0.4, "i", "A"],
      // Documented, sustained decades-long collaboration accompanying her second husband, archaeologist Max Mallowan, on excavations in Syria and Iraq, contributing photography and object-cataloguing to his expeditions per his own published acknowledgments.
      collaboration: [62, 0.45, "i", "A"],
      // Documented as rebuilding her finances and public standing after her costly 1926 divorce by continuing steady novel production rather than any single dramatic recovery, and later using her hospital-dispensary access itself as a practical, self-taught source of technical material for her books.
      resourcefulness: [58, 0.42, "i", "A"],
    },
  },
  {
    id: "p_amartya_sen",
    slug: "amartya-sen",
    canonicalName: "Amartya Sen",
    birthYear: 1933,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["economist"],
    fieldIds: ["economics"],
    impactDomains: ["scientific", "social", "educational"],
    tagIds: ["nobel_laureate", "cross_disciplinary", "systematic_thinker"],
    archetypeIds: ["scholarly_specialist"],
    externalIdentity: { wikidataId: "Q132489" },
    portrait: {
      url: "/portraits/amartya-sen-cologne-2007.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 3.0",
      width: 499,
      height: 599,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      attribution: "Elke Wetzig, 28 November 2007, lecture at the University of Cologne",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sen_wikipedia", kind: "wikipedia", title: "Amartya Sen", url: "https://en.wikipedia.org/wiki/Amartya_Sen" }, { id: "src_sen_nobel", kind: "award_body", title: "The Nobel Prize — Amartya Sen, Economic Sciences 1998" }],
    rows: {
      // Developed social choice theory and the capability approach, integrating welfare economics, ethics, and political philosophy into one coherent analytical framework, documented via the 1998 Nobel Prize citation's own description of his contribution's scope.
      systems_abstraction: [84, 0.65, "d", "A"],
      // Produced substantive original work across welfare economics, famine studies, social choice theory, and philosophy (justice and capability theory), documented via his extensive bibliography spanning these genuinely distinct fields.
      cross_domain_range: [86, 0.65, "d", "A"],
      // His famine research (Poverty and Famines) explicitly reframed famine as a problem of entitlement and political accountability rather than mere food-supply shortage, directly influencing famine-prevention policy, documented via the work's own stated analytical purpose and its cited real-world influence.
      impact_motivation: [82, 0.65, "d", "A"],
      // His social choice theory work provides formal mathematical proofs extending and qualifying Arrow's Impossibility Theorem, documented via the Nobel citation's specific technical description of this contribution.
      analytical_rigor: [82, 0.65, "d", "A"],
      // His capability approach directly challenged the dominant GDP/income-based measure of welfare in economics, a documented departure from prevailing disciplinary convention that has since reshaped how development is measured (the UN Human Development Index).
      independent_thinking: [74, 0.65, "d", "A"],
      // The capability approach's reframing of wellbeing around substantive freedoms rather than resources or utility was a genuinely original conceptual contribution, documented via its lasting adoption in international development policy.
      creative_originality: [72, 0.65, "d", "A"],
      // Sustained detailed empirical famine research (including the 1943 Bengal famine, which he witnessed as a child) requiring extensive historical and statistical investigation, documented via the depth of Poverty and Famines' own analysis.
      deep_focus: [68, 0.5, "s", "A"],
      // Sustained a prolific academic output across economics and philosophy over a career spanning more than six decades.
      discipline: [66, 0.48, "s", "A"],
      // Engaged across economics, philosophy, and social policy over his career, evidencing real intellectual range beyond a single narrow specialty.
      curiosity: [70, 0.5, "s", "A"],
      // Sustained a prolific research and public-policy-engagement career for over six decades, well past his 1998 Nobel Prize, evidencing long-term ambition beyond a single achievement.
      achievement_drive: [66, 0.48, "s", "A"],
      // Continued extending and refining his capability-approach framework across subsequent decades of published work, documented via the sustained development visible in his bibliography.
      mastery_orientation: [64, 0.46, "s", "A"],
      // His early famine research directly challenged prevailing economic orthodoxy about famine causation, carrying real disciplinary risk at the time, documented via the work's own departure from the dominant food-availability-decline framework.
      risk_tolerance: [58, 0.42, "i", "N"],
      // His famine research required exhaustive historical and statistical data analysis across multiple documented famine case studies, evidenced in Poverty and Famines' own empirical depth.
      detail_orientation: [62, 0.44, "s", "A"],
      // The systematic, theory-building structure of his social choice and capability work evidences real advance conceptual organization.
      planning_orientation: [58, 0.42, "i", "N"],
      // Co-developed the UN Human Development Index with Mahbub ul Haq, a documented, sustained collaborative project applying his capability framework to real policy measurement.
      collaboration: [62, 0.44, "s", "N"],
      // Sustained a prominent public intellectual role, including extensive public writing and lecturing on economics and social policy across his career.
      social_assertiveness: [60, 0.42, "i", "N"],
      // His capability-approach framework directly and durably reshaped international development policy measurement (the UN Human Development Index's continued use), documented via its sustained real-world institutional adoption.
      persuasiveness: [64, 0.46, "s", "A"],
      // Moved between formal mathematical social-choice theory and applied, policy-facing famine/development work across his career, suggesting real flexibility in working mode.
      adaptability: [56, 0.4, "i", "N"],
      // Sustained a research and public-advocacy program on famine and welfare economics across more than six decades, documented via the extended timeline of his publication record.
      persistence: [62, 0.48, "s", "A"],
      // Chaired academic economics departments at multiple institutions and directed research shaping the UN Human Development Index across his career, documented via the well-established institutional record of these roles.
      leadership_drive: [62, 0.65, "d", "A"],
      // Sustained an independent theoretical program (the capability approach) that directly challenged mainstream welfare-economics convention for decades before achieving broad acceptance.
      autonomy_need: [58, 0.44, "s", "A"],
    },
  },
  {
    id: "p_diego_rivera",
    slug: "diego-rivera",
    canonicalName: "Diego Rivera",
    birthYear: 1886,
    deathYear: 1957,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["MX"],
    regionCode: "latin_america",
    occupationIds: ["painter"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["founder", "prolific"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q171128" },
    portrait: {
      url: "/portraits/diego-rivera-blue-house-1957.jpg",
      source: "Wikimedia Commons / Museo Frida Kahlo",
      license: "Public domain (anonymous work under Mexican copyright law -- photographer unidentified; also public domain in the US)",
      width: 1150,
      height: 1600,
      attribution: "Unknown photographer, by 1957 -- Museo Frida Kahlo (the Blue House), Coyoacan",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_rivera_wikipedia", kind: "wikipedia", title: "Diego Rivera", url: "https://en.wikipedia.org/wiki/Diego_Rivera" }, { id: "src_rivera_moma", kind: "institution", title: "Museum of Modern Art — Diego Rivera" }],
    rows: {
      // Founded the Mexican Muralism movement, developing large-scale public fresco painting as a distinctive art form integrating pre-Columbian, folk, and modernist European technique, documented via the movement's own lasting art-historical recognition and influence.
      creative_originality: [84, 0.65, "d", "A"],
      // Explicitly conceived his murals as public, accessible art depicting Mexican history and workers' struggles rather than private gallery work, documented via his own stated artistic philosophy and the murals' deliberate placement in public government and civic buildings.
      impact_motivation: [82, 0.65, "d", "A"],
      // His 1933 Rockefeller Center mural (Man at the Crossroads) was destroyed after he refused to remove a portrait of Lenin at the patron's request, a specific, well-documented instance of sustaining an artistic/political position at direct, realized professional cost.
      conflict_tolerance: [78, 0.65, "d", "R"],
      // Knowingly included overtly Communist political imagery in a major commissioned American corporate mural, resulting in the work's destruction, documented via the well-established Rockefeller Center controversy.
      risk_tolerance: [74, 0.65, "d", "R"],
      // Produced an unusually large body of major public mural work across Mexico and the United States over his career, documented via the well-established scale of his output including the Detroit Industry murals and the National Palace murals in Mexico City.
      achievement_drive: [76, 0.65, "d", "A"],
      // Large-scale fresco painting requires sustained, physically demanding daily work over months per commission, documented via the well-established scale and timeline of his major mural projects.
      discipline: [66, 0.48, "s", "A"],
      // His major murals (e.g. the National Palace history mural) integrate complex historical and social narratives into single unified compositional structures, documented via the well-analyzed structure of those specific works.
      systems_abstraction: [66, 0.65, "d", "A"],
      // Chose to sacrifice a major commission rather than alter his own artistic and political content, documented via the well-established Rockefeller Center episode.
      autonomy_need: [62, 0.46, "s", "A"],
      // Successfully secured major public and government mural commissions across Mexico and internationally throughout his career, documented via the well-established institutional record of his commissioned works.
      persuasiveness: [62, 0.46, "s", "A"],
      // His large-scale murals contain dense, historically specific figurative detail across dozens of individual figures per composition, documented via the well-analyzed content of works like the National Palace mural.
      detail_orientation: [64, 0.46, "s", "A"],
      // Worked across mural painting, easel painting, and stage/set design over his career, suggesting some range within the visual arts broadly construed.
      cross_domain_range: [56, 0.4, "i", "N"],
      // Founded the Mexican Muralism movement alongside contemporaries (including José Clemente Orozco and David Alfaro Siqueiros), suggesting real capacity to build and sustain a shared artistic movement despite his own strong individual convictions.
      collaboration: [58, 0.42, "i", "N"],
      // Widely credited as a principal founder and leading figure of the Mexican Muralism movement, documented via the movement's own well-established historical association with him as one of its central figures.
      leadership_drive: [62, 0.44, "s", "A"],
      // Continued developing his fresco technique and compositional approach across a career spanning decades and multiple major mural cycles.
      mastery_orientation: [58, 0.42, "i", "N"],
      // Worked productively across markedly different commissioning contexts (Mexican government buildings, American corporate/industrial patrons), suggesting some real capacity to adjust to different institutional settings, tempered by the Rockefeller episode showing real limits to that flexibility.
      adaptability: [55, 0.4, "i", "N"],
      // Large multi-wall fresco cycles required extensive advance compositional and narrative planning before painting began, documented via the well-established preparatory-study process behind his major murals.
      planning_orientation: [60, 0.44, "s", "A"],
      // Sustained a prominent public artistic and political persona throughout his career, including extensive public commentary on his own political and artistic views.
      social_assertiveness: [64, 0.46, "s", "A"],
      // Sustained fresco painting requires working in fixed daily sessions on wet plaster over extended periods, evidencing real sustained concentrated physical and artistic effort per project.
      deep_focus: [60, 0.42, "i", "N"],
      // His murals' engagement with Mexican pre-Columbian history, contemporary industry, and political theory suggests real intellectual range beyond technique alone.
      curiosity: [58, 0.42, "i", "N"],
      // Founded Mexican Muralism as a genuinely distinct public-art movement departing from prevailing gallery-based fine-art convention, documented via the movement's own well-established historical departure from that norm.
      independent_thinking: [68, 0.65, "d", "A"],
      // Sustained a demanding public mural career across decades and multiple countries despite the real professional setback of the destroyed Rockefeller Center commission.
      persistence: [62, 0.44, "s", "A"],
    },
  },
  {
    id: "p_eleanor_roosevelt",
    slug: "eleanor-roosevelt",
    canonicalName: "Eleanor Roosevelt",
    birthYear: 1884,
    deathYear: 1962,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["activist", "diplomat"],
    fieldIds: ["civil_rights", "diplomacy"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "founder"],
    archetypeIds: ["social_influencer", "organizational_leader"],
    externalIdentity: { wikidataId: "Q83396" },
    portrait: {
      url: "/portraits/eleanor-roosevelt-un-1946.jpg",
      source: "Wikimedia Commons / FDR Presidential Library & Museum",
      license: "CC BY 2.0",
      width: 1201,
      height: 1600,
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      attribution: "FDR Presidential Library & Museum, circa 1946-1947, at the United Nations",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_eroosevelt_wikipedia", kind: "wikipedia", title: "Eleanor Roosevelt", url: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt" }, { id: "src_eroosevelt_gwu", kind: "institution", title: "George Washington University -- Eleanor Roosevelt Papers Project, My Day", url: "https://erpapers.columbian.gwu.edu/my-day" }, { id: "src_eroosevelt_autobiography", kind: "biography", title: "Eleanor Roosevelt, The Autobiography of Eleanor Roosevelt (1961, combining This Is My Story 1937, This I Remember 1949, On My Own 1958)" }, { id: "src_eroosevelt_internment", kind: "press", title: "HISTORY -- How Eleanor Roosevelt Opposed Japanese Internment", url: "https://www.history.com/articles/eleanor-roosevelts-work-to-oppose-japanese-internment" }],
    rows: {
      // Wrote her syndicated 'My Day' newspaper column six days a week for nearly 27 years (1935-1962), a specific, precisely dated, extensively documented record of sustained daily output.
      persistence: [92, 0.7, "d", "A"],
      // The Gila River visit and subsequent report are documented as directly contributing to FDR exploring a policy of releasing some internees with work permits -- a specific, dated instance of self-initiated advocacy producing a measurable policy effect, distinct from and in addition to the already-scored DAR/Marian Anderson episode.
      proactive_agency: [88, 0.7, "d", "A"],
      // The DAR resignation and Anderson concert episode was a specific, public, politically risky act for a sitting First Lady in 1939, extensively documented and widely reported at the time.
      risk_tolerance: [82, 0.6, "d", "A"],
      // Chaired the UN Commission on Human Rights (1946-1952) and led the drafting of the Universal Declaration of Human Rights (adopted 1948), a specific, dated, internationally documented leadership role held after FDR's death, independent of any inherited political position.
      leadership_drive: [86, 0.62, "d", "A"],
      // Successfully steering the UDHR to adoption required sustained negotiation across ideologically opposed UN delegations over multiple years, inferred from the documented, contentious drafting process and its eventual successful outcome.
      collaboration: [78, 0.55, "s", "A"],
      // Documented pattern of independent travel to visit coal mines, military bases, and segregated schools during FDR's presidency, often without the customary security/social conventions of a First Lady, suggests real self-directed engagement, inferred from the documented pattern of these visits.
      autonomy_need: [76, 0.55, "s", "N"],
      // A documented multi-decade shift from a more conventional First Lady role toward sustained human-rights and civil-rights advocacy, continuing actively after leaving the White House, suggests strong impact-oriented motivation, inferred from the documented career arc.
      impact_motivation: [84, 0.55, "s", "A"],
      // Sustained escalating public responsibility (First Lady, UN delegate, Commission chair) across decades after already achieving the country's highest ceremonial position implies strong achievement drive, inferred from the documented career trajectory.
      achievement_drive: [80, 0.5, "s", "A"],
      // Personally visited the Gila River internment camp in Arizona in spring 1943 specifically to counter public claims that internees were being 'coddled,' publicly praising their improvements to the camp conditions -- a specific, dated, politically sensitive public act during wartime that ran directly against the administration's official framing.
      conflict_tolerance: [74, 0.65, "d", "N"],
      // Nearly three decades of daily, specific, self-observed column writing implies sustained close attention to daily detail, inferred from the nature and duration of the documented column.
      detail_orientation: [68, 0.46, "i", "N"],
      // Sustained public communication via daily column, radio broadcasts, and international diplomacy implies strong social assertiveness, inferred from the documented range of her public communication roles.
      social_assertiveness: [76, 0.44, "i", "N"],
      // The documented breadth of topics in 'My Day' (domestic policy, international affairs, personal reflection) over 27 years suggests broad sustained curiosity, inferred from the documented range of the column's content.
      curiosity: [74, 0.44, "i", "N"],
      // Sustaining a strict, self-imposed six-day-a-week deadline for a syndicated newspaper column across nearly 27 years, without interruption through a world war and a change in her own formal public role, is itself a specific, precisely dated, directly on-point documented instance of sustained behavioral discipline, not merely inferred from other activity.
      discipline: [82, 0.65, "d", "A"],
      // The DAR resignation followed the Constitution Hall refusal within a short, documented timeframe, suggesting a real, rapid decision rather than a prolonged deliberation, inferred from the compressed documented timeline of that specific episode.
      decisiveness: [76, 0.52, "s", "A"],
      // Privately opposed FDR's Executive Order 9066 (Japanese American internment) and, unable to reverse the policy publicly without undermining her official role, used her 'My Day' column within two weeks of Pearl Harbor to urge Americans not to turn against Japanese Americans -- a specific, dated, documented instance of maintaining and acting on an independent position that diverged from her own husband's administration's policy.
      independent_thinking: [72, 0.65, "d", "N"],
      // Successfully transitioning from ceremonial First Lady to an internationally influential independent diplomat after leaving the White House suggests real adaptability, inferred from the documented career transition.
      adaptability: [68, 0.4, "i", "N"],
      // Nearly three decades of sustained professional writing suggests developing craft mastery over time, inferred from the documented career length.
      mastery_orientation: [66, 0.4, "i", "N"],
      // Successfully steering the multi-year, multi-party UDHR drafting process to completion implies real methodical planning, inferred from the documented complexity and eventual success of the process.
      planning_orientation: [62, 0.4, "i", "N"],
      // Successfully building consensus across ideologically opposed delegations for the UDHR's adoption suggests real persuasive capability, inferred from the documented outcome of that process.
      persuasiveness: [70, 0.4, "i", "N"],
      // Recognizing the post-WWII moment as an opening to establish an international human-rights framework, and pursuing the UN role specifically to do so, suggests real opportunity recognition, inferred from the documented timing of her UN appointment and the drafting effort.
      opportunity_sensing: [64, 0.4, "i", "N"],
    },
  },
  {
    id: "p_henry_ford",
    slug: "henry-ford",
    canonicalName: "Henry Ford",
    birthYear: 1863,
    deathYear: 1947,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur", "engineer"],
    fieldIds: ["business", "engineering", "technology"],
    impactDomains: ["industrial", "technological", "entrepreneurial"],
    tagIds: ["founder", "self_taught", "innovator"],
    archetypeIds: ["entrepreneurial_builder"],
    externalIdentity: { wikidataId: "Q8768" },
    portrait: {
      url: "/portraits/henry-ford-1915.jpg",
      source: "Wikimedia Commons / The Henry Ford Collections",
      license: "Public domain (published before 1 January 1931)",
      width: 1200,
      height: 1600,
      attribution: "Ford Motor Company Photographic Department, 25 May 1915 -- The Henry Ford Collections",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hf_watts", kind: "biography", title: "Steven Watts, The People's Tycoon: Henry Ford and the American Century (2005)" }, { id: "src_hf_baldwin", kind: "biography", title: "Neil Baldwin, Henry Ford and the Jews: The Mass Production of Hate (2001) — documents the Dearborn Independent/\"International Jew\" campaign in detail" }, { id: "src_hf_own_autobiography", kind: "archive", title: "Henry Ford with Samuel Crowther, My Life and Work (1922) — his own account, read critically alongside independent biography" }, { id: "src_hf_wikipedia", kind: "wikipedia", title: "Henry Ford", url: "https://en.wikipedia.org/wiki/Henry_Ford" }],
    rows: {
      // Documented as a self-taught mechanic from adolescence, disassembling and repairing watches and farm equipment before any formal engineering training, and personally building his own experimental Quadricycle automobile in 1896 — sustained, hands-on technical exploration attested by surviving early devices and contemporaries' accounts.
      curiosity: [65, 0.5, "s", "A"],
      // The moving assembly line's development (1913) is documented as the product of systematic time-and-motion study of his own factory floor, applying incremental measured changes rather than a single inspired leap — a specific, attested engineering method.
      analytical_rigor: [68, 0.5, "s", "A"],
      // The moving assembly line combined with a standardized, interchangeable-parts vehicle design is documented by industrial historians as a genuinely novel production-system synthesis at the time, independently corroborated by its near-universal subsequent adoption across manufacturing.
      creative_originality: [78, 0.62, "d", "A"],
      // Documented as personally spending years of nights and weekends building his first working automobile while still employed full-time as a chief engineer at Edison Illuminating Company, sustained until the 1896 Quadricycle was complete.
      discipline: [68, 0.52, "s", "A"],
      // Documented as failing with two earlier automobile ventures (the Detroit Automobile Company and the Henry Ford Company, both ending in his departure or the company's failure) before founding the Ford Motor Company successfully in 1903 at age 40.
      persistence: [78, 0.62, "d", "A"],
      // Documented as refusing for nearly two decades to substantially update the Model T's basic design even as competitors innovated and market share eroded, resisting internal pressure (including from his own son Edsel) for change until the 1927 Model A — a documented, costly rigidity rather than adaptability.
      adaptability: [45, 0.4, "i", "R"],
      // Documented as doubling factory wages to $5/day in 1914, an unprecedented, widely-criticized-at-the-time move by industry peers, made as a calculated bet to reduce turnover and enable his workers to afford the cars they built — a specific, dated, high-stakes business decision.
      risk_tolerance: [68, 0.52, "s", "R"],
      // The $5 day and the assembly line's implementation are documented as decisively executed once decided, though his multi-year resistance to updating the Model T shows the opposite pattern in a different domain — genuinely mixed, scored at inference level.
      decisiveness: [62, 0.45, "i", "N"],
      // Documented as maintaining direct personal control over Ford Motor Company's major decisions for decades, including forcing out professional managers and his own son's preferred initiatives when they conflicted with his own judgment, corroborated by company records of the period.
      leadership_drive: [72, 0.55, "s", "A"],
      // Documented as personally directing and funding the Dearborn Independent's sustained, multi-year antisemitic publishing campaign ("The International Jew") through the early 1920s despite public criticism and boycotts, only issuing a retraction and apology in 1927 under mounting legal and commercial pressure — a sustained, documented pattern of conflict pursued directly rather than avoided.
      conflict_tolerance: [68, 0.52, "d", "R"],
      // Documented as a largely self-taught engineer who developed genuine mechanical expertise through hands-on practice rather than formal schooling, though the evidentiary base for sustained deliberate study beyond his early mechanical apprenticeship is thinner, hence inference-level.
      mastery_orientation: [62, 0.45, "i", "A"],
      // Documented sustained ambition across two failed ventures before founding a third, successful company, and later pursuing large-scale, personally directed projects beyond automobiles (the Ford Trimotor aircraft, the Fordlandia rubber plantation) into his later career.
      achievement_drive: [72, 0.55, "s", "A"],
      // Documented as buying out virtually all outside shareholders in Ford Motor Company by 1919 specifically to eliminate outside influence over his decisions, a directly attributable, dated corporate action taken explicitly for that stated purpose.
      autonomy_need: [78, 0.62, "d", "A"],
      // His own writing (My Life and Work) frames the $5 day and affordable-car mission in terms of broad social benefit (workers as consumers), a documented stated motivation, though this sits alongside the antisemitic publishing campaign's clearly harmful and explicitly acknowledged impact — the trait is scored dual-edged to reflect both documented sides rather than only the self-flattering account.
      impact_motivation: [62, 0.45, "i", "D"],
      // Career substantively concentrated in automotive engineering and manufacturing, with later ventures (aviation, agriculture at Fordlandia) still within industrial production — scored at the safe default rather than inflated for range that stayed within a similar domain.
      cross_domain_range: [45, 0.38, "i", "N"],
      // Self-initiated the Quadricycle project and later Ford Motor Company's founding after two prior venture failures, documented as his own repeated, self-directed attempts rather than a single opportunity handed to him.
      proactive_agency: [72, 0.55, "s", "A"],
      // Documented as recognizing, ahead of most competitors, that a mass market existed for a low-cost, standardized automobile rather than the expensive, custom-built vehicles most manufacturers focused on — a specific, attested strategic insight underlying the Model T's design brief.
      opportunity_sensing: [65, 0.48, "s", "A"],
      // Documented as applying time-and-motion study techniques borrowed and adapted from meatpacking disassembly lines to automobile assembly, a specific, attested cross-industry adaptation of an existing method to a new problem.
      resourcefulness: [62, 0.45, "i", "A"],
      // The assembly line's development required granular measurement of individual task times documented in company records, though the broader evidentiary base for a general detail-oriented disposition beyond this specific project is thinner, hence inference-level.
      detail_orientation: [62, 0.45, "i", "A"],
      // The $5 day and mass-market pricing strategy both broke sharply from contemporary industrial norms and drew criticism from industry peers at the time — a documented instance of independent judgment, though his later refusal to update the Model T despite clear market evidence shows the same trait tipping into stubbornness, hence the moderate, dual-edged score.
      independent_thinking: [55, 0.4, "i", "D"],
      // Documented as sustaining the antisemitic Dearborn Independent campaign for years despite mounting public criticism, only retracting after a direct legal threat (a defamation suit from Aaron Sapiro) forced a formal apology in 1927 — a documented, sustained failure to revise a harmful position until externally compelled, scored low rather than omitted.
      belief_updating: [30, 0.45, "s", "R"],
      // Documented as an active public communicator later in his career (a nationally syndicated newspaper column, radio appearances, the widely-read My Life and Work), though earlier in life described by associates as more reserved and mechanically focused — genuinely mixed across his life stages, scored near center.
      social_assertiveness: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_ida_b_wells",
    slug: "ida-b-wells",
    canonicalName: "Ida B. Wells",
    birthYear: 1862,
    deathYear: 1931,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["activist", "writer"],
    fieldIds: ["civil_rights", "journalism"],
    impactDomains: ["historical", "social"],
    tagIds: ["founder", "endured_imprisonment"],
    archetypeIds: ["social_influencer", "scholarly_specialist"],
    externalIdentity: { wikidataId: "Q289428" },
    portrait: {
      url: "/portraits/ida-b-wells-garrity-1893.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (photograph circa 1893)",
      width: 1120,
      height: 1600,
      attribution: "Mary Garrity, c. 1893",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_wells_wikipedia", kind: "wikipedia", title: "Ida B. Wells", url: "https://en.wikipedia.org/wiki/Ida_B._Wells" }, { id: "src_wells_autobiography", kind: "biography", title: "Ida B. Wells, Crusade for Justice: The Autobiography of Ida B. Wells (published posthumously 1970, written from 1928)" }, { id: "src_wells_loc", kind: "institution", title: "Library of Congress -- Ida B. Wells and the Activism of Investigative Journalism", url: "https://blogs.loc.gov/headlinesandheroes/2020/02/ida-b-wells-and-the-activism-of-investigative-journalism/" }],
    rows: {
      // RUBRIC_CORRECTION (roster28 fast-batch audit, 2026-09; score-band correction only): Her Memphis newspaper office was destroyed by a mob in 1892 in direct retaliation for her anti-lynching editorials; she was forced to flee the city and continued anti-lynching journalism from Chicago and New York rather than stopping -- a specific, extensively documented, high-stakes episode. Originally scored 90/documented; corrected to 80 because this rests on one single dated episode (continuing her journalism afterward is not itself a second risk-taking instance), per scoring-rubric-v1 Section 4's 85+ requirement for multiple independent documented instances. Score-band correction only: evidenceType and confidence unchanged.
      risk_tolerance: [80, 0.65, "d", "A"],
      // RUBRIC_CORRECTION (roster28 fast-batch audit, 2026-09; score-band correction only): Sued a railroad company in 1884, at age 22, after being forcibly removed from a first-class train car -- initially winning before the verdict was overturned on appeal -- a specific, dated, extensively documented self-initiated legal challenge undertaken at a very young age. Originally scored 88/documented; corrected to 80 because this rests on one single dated episode, per scoring-rubric-v1 Section 4's 85+ requirement for multiple independent documented instances (this row's own rationale does not itself cite a second proactive instance; the suffrage-organization founding is separately scored under achievement_drive/leadership_drive). Score-band correction only: evidenceType and confidence unchanged.
      proactive_agency: [80, 0.62, "d", "A"],
      // Conducted detailed statistical investigations into the actual causes of lynchings, publishing Southern Horrors (1892) and The Red Record (1895), which used data to directly refute the era's dominant 'protecting white womanhood' justification -- a specific, documented, data-driven analytical methodology.
      analytical_rigor: [86, 0.6, "d", "A"],
      // Co-founded the NAACP but later documented as distancing herself over strategic disagreements with its direction, inferred as evidence of prioritizing her own judgment even within organizations she helped found.
      independent_thinking: [82, 0.55, "s", "A"],
      // At the 1913 Suffrage Parade in Washington DC, when organizers directed Black delegates to march at the rear, she refused and inserted herself into the Illinois delegation instead -- a specific, documented, immediate, high-stakes decision made in the moment.
      decisiveness: [80, 0.52, "s", "A"],
      // The 1913 parade episode and her sustained public investigative journalism career both imply strong social assertiveness, inferred from these documented episodes.
      social_assertiveness: [78, 0.5, "s", "N"],
      // Sustained anti-lynching journalism and advocacy across roughly four decades despite mob violence, professional retaliation, and being forced to relocate cities, inferred as real persistence from the documented duration and continuity of her work.
      persistence: [84, 0.48, "s", "A"],
      // Sustaining direct public conflict with both white supremacist violence and, later, disagreements within her own civil-rights organizations implies real tolerance for sustained conflict on multiple fronts, inferred from the documented pattern of these episodes.
      conflict_tolerance: [82, 0.46, "i", "N"],
      // Founding the first African American women's suffrage organization in Illinois in addition to her sustained journalism career implies strong achievement drive, inferred from the documented breadth of her founded initiatives.
      achievement_drive: [78, 0.42, "i", "N"],
      // Compiling detailed statistical data on lynching incidents for Southern Horrors and The Red Record implies real close attention to documentary detail, inferred from the documented data-driven nature of these publications.
      detail_orientation: [76, 0.4, "i", "N"],
      // Sustaining investigative journalism and organizing work across four decades implies real behavioral discipline, inferred from the documented duration of her career.
      discipline: [70, 0.4, "i", "N"],
      // The pattern of founding independent organizations and publications rather than working solely within existing ones suggests real self-direction, inferred from the documented founding pattern.
      autonomy_need: [72, 0.4, "i", "N"],
      // Sustained investigative journalism requiring original research into individual lynching cases implies real underlying investigative curiosity, inferred from the documented data-gathering nature of her work.
      curiosity: [62, 0.4, "i", "N"],
      // Compiling and structuring statistical data across Southern Horrors and The Red Record implies real methodical planning of her research and publication strategy, inferred from the documented structured nature of these works.
      planning_orientation: [58, 0.4, "i", "N"],
      // Co-founding the NAACP alongside other prominent civil-rights figures, despite her later documented distancing from it, implies real initial collaborative capacity, inferred from the documented co-founding role.
      collaboration: [58, 0.4, "i", "N"],
      // Founding the first African American women's suffrage organization in Illinois and leading sustained anti-lynching campaigns implies real leadership drive, inferred from the documented founding and leadership roles.
      leadership_drive: [74, 0.4, "i", "N"],
      // Recognizing that data-driven statistical argument, rather than moral appeal alone, could more effectively counter the era's lynching justifications suggests real strategic insight, inferred from the documented methodology of her publications.
      opportunity_sensing: [62, 0.4, "i", "N"],
      // Sustained, increasingly sophisticated investigative methodology across her journalism career suggests developing mastery, inferred from the documented progression from her first newspaper editorials to her later statistically grounded publications.
      mastery_orientation: [66, 0.4, "i", "N"],
    },
  },
  {
    id: "p_junko_tabei",
    slug: "junko-tabei",
    canonicalName: "Junko Tabei",
    birthYear: 1939,
    deathYear: 2016,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    occupationIds: ["explorer"],
    fieldIds: ["exploration"],
    impactDomains: ["athletic", "historical", "social"],
    tagIds: ["founder", "independent"],
    archetypeIds: ["visionary_pioneer"],
    externalIdentity: { wikidataId: "Q234491" },
    portrait: {
      url: "/portraits/junko-tabei-kunnap-1985.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0",
      width: 577,
      height: 769,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      attribution: "Jaan Kunnap, 1985",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_tabei_wikipedia", kind: "wikipedia", title: "Junko Tabei", url: "https://en.wikipedia.org/wiki/Junko_Tabei" }, { id: "src_tabei_womeninexploration", kind: "institution", title: "Women in Exploration — Junko Tabei" }, { id: "src_tabei_memoir", kind: "archive", title: "Junko Tabei with Helen Y. Rolfe (trans. Yumiko Hiraki and Rieko Holtved), Honouring High Places: The Mountain Life of Junko Tabei (Rocky Mountain Books, 2017) — compiled directly from Tabei's own Japanese-language memoirs, verified as a real, English-translated primary source, not a general biography" }, { id: "src_tabei_aac_review", kind: "institution", title: "American Alpine Club Publications — review of Honouring High Places, summarizing its coverage of her childhood and later-career content" }],
    rows: {
      // Became the first woman to summit Mount Everest (1975) and later the first woman to complete the Seven Summits (climbing the highest peak on every continent), documented via the well-established, multiply-corroborated record of both achievements.
      achievement_drive: [80, 0.65, "d", "A"],
      // Continued the 1975 Everest expedition after being buried and knocked unconscious by an avalanche that struck the team's camp six days before the summit push, documented via the well-established account of that specific incident and her subsequent recovery and continuation.
      risk_tolerance: [78, 0.65, "d", "R"],
      // Founded the Ladies Climbing Club in Japan in 1969 specifically because existing climbing organizations largely excluded or marginalized women, documented via the well-established founding history of that organization and its role in organizing her Everest expedition.
      leadership_drive: [74, 0.65, "d", "A"],
      // Secured funding for the 1975 all-women Everest expedition despite documented sponsor skepticism about an all-women team's viability, including corporate sponsors who reportedly suggested the team should instead focus on childcare, a specific documented obstacle she worked around.
      resourcefulness: [68, 0.65, "d", "A"],
      // [NEW_EVIDENCE, this session] A second, temporally-distinct documented instance now corroborates the existing 1975-onward Seven Summits record: her own memoir-derived account (Honouring High Places) documents that she was, in her own words, "a frail girl with no talent for sport" in a rural childhood where family/cultural expectations actively ignored her interest in mountains — she pursued it anyway, decades before Everest, and continued climbing, teaching, and raising a family well into her late 70s. Two independent documented instances spanning different life periods (childhood defiance of expectation, and a multi-decade adult career) meets this rubric's top confidence band.
      persistence: [78, 0.78, "d", "A"],
      // Self-initiated the Ladies Climbing Club's founding and the 1975 Everest expedition without institutional backing from Japan's existing, male-dominated mountaineering establishment, documented via the well-established independent origin of both efforts.
      proactive_agency: [70, 0.65, "d", "A"],
      // Later in her career, focused increasingly on environmental conservation of mountain regions and on encouraging youth climbing programs, documented via the well-established later-career shift in her public activities beyond personal summiting.
      impact_motivation: [62, 0.46, "s", "A"],
      // Founded her own women-only climbing organization rather than working solely within existing male-dominated mountaineering institutions, documented via the well-established founding rationale of the Ladies Climbing Club.
      autonomy_need: [62, 0.46, "s", "A"],
      // Sustained a demanding, decades-long high-altitude mountaineering career requiring rigorous ongoing physical training, evidenced by the sheer number and difficulty of the peaks documented across her climbing record.
      discipline: [64, 0.46, "s", "A"],
      // Organizing an all-women Everest expedition in 1975, including logistics, funding, and permits under real institutional skepticism, evidences substantial advance organizational planning, documented via the well-established account of the expedition's preparation.
      planning_orientation: [62, 0.46, "s", "A"],
      // Continued the Everest summit attempt after the avalanche disrupted the original expedition plan, adjusting the team's approach under real changed circumstances, documented via the well-established account of the expedition's revised timeline after the incident.
      adaptability: [60, 0.44, "s", "A"],
      // Sustained her mountaineering ambitions despite documented institutional skepticism and outright dismissal from parts of Japan's climbing establishment and sponsors, suggesting real willingness to persist against direct social resistance.
      conflict_tolerance: [58, 0.42, "i", "N"],
      // Her later-career shift toward environmental science study (she pursued graduate research on mountain environmental degradation) suggests real intellectual range beyond athletic achievement alone.
      curiosity: [56, 0.4, "i", "N"],
      // High-altitude expedition logistics and route-planning require real careful attention to equipment, timing, and safety detail, though direct documentation of her personal working method specifically is limited.
      detail_orientation: [55, 0.4, "i", "N"],
      // Continued developing her mountaineering capability across increasingly difficult peaks over a multi-decade career, culminating in the Seven Summits challenge well after her initial Everest achievement.
      mastery_orientation: [60, 0.44, "s", "A"],
      // Sustained a public role advocating for women's inclusion in mountaineering and later environmental causes throughout her later career, suggesting real comfort with public advocacy.
      social_assertiveness: [58, 0.42, "i", "N"],
      // Led and organized an all-women expedition team requiring sustained close collaboration under extreme conditions, documented via the well-established team structure of the 1975 Everest climb.
      collaboration: [58, 0.42, "i", "N"],
      // [NEW_EVIDENCE, this session] The 1969 Ladies Climbing Club founding (already scored) is now corroborated by an earlier, independent instance of the same underlying pattern: her own account describes childhood family/cultural expectations that actively ignored or discouraged her interest in mountains as a physically frail girl, which she pursued regardless — a second, temporally-distinct documented departure from surrounding social expectation, not a single isolated adult-career decision.
      independent_thinking: [66, 0.58, "s", "A"],
      // High-altitude summit attempts require sustained, focused physical and mental effort over many hours in extreme conditions, particularly evident in the continued summit push after the avalanche incident.
      deep_focus: [62, 0.44, "s", "A"],
      // Founding an entirely new women-only mountaineering organization structure to enable her expedition suggests a real original institutional solution to an access problem, not merely athletic achievement.
      creative_originality: [60, 0.42, "i", "N"],
      // Later pursuing formal graduate research on mountain environmental degradation suggests real capacity for systematic analytical work beyond athletics.
      analytical_rigor: [55, 0.4, "i", "N"],
      // [NEW ROW, NEW_EVIDENCE, this session] Her own memoir-derived account documents sustained, concurrent engagement across family life, teaching, and international high-altitude mountaineering into her late 70s — genuine range across distinct life domains (not just athletic achievement), though scored at strong_inference rather than documented since this rests on a reviewer's summary characterization of the memoir's content rather than a specific named episode in each domain.
      cross_domain_range: [62, 0.5, "s", "N"],
    },
  },
  {
    id: "p_katharine_hepburn",
    slug: "katharine-hepburn",
    canonicalName: "Katharine Hepburn",
    birthYear: 1907,
    deathYear: 2003,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["actor"],
    fieldIds: ["film"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["nonconformist", "sustained_excellence", "independent"],
    archetypeIds: ["competitive_performer"],
    externalIdentity: { wikidataId: "Q56016" },
    portrait: {
      url: "/portraits/katharine-hepburn-mgm-1941.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (US work published 1931-1963; copyright not renewed, per a documented search of 1968-1970 copyright renewal records)",
      width: 1207,
      height: 1600,
      attribution: "Metro-Goldwyn-Mayer Studios, 1941 -- studio publicity photograph, restored by Adam Cuerden",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_kh_own_memoir", kind: "archive", title: "Katharine Hepburn, Me: Stories of My Life (1991) — her own memoir, read critically alongside independent biography" }, { id: "src_kh_berg", kind: "biography", title: "A. Scott Berg, Kate Remembered (2003) — a close friend's account, written after her death per an agreement made with Hepburn during her life" }, { id: "src_kh_tracy_family", kind: "archive", title: "Accounts from Spencer Tracy's own family and biographers (independent of Hepburn's own account) documenting the 26-year Hepburn-Tracy relationship from the other side" }, { id: "src_kh_wikipedia", kind: "wikipedia", title: "Katharine Hepburn", url: "https://en.wikipedia.org/wiki/Katharine_Hepburn" }],
    rows: {
      // Documented, sustained daily athletic regimen (swimming, tennis) maintained into her eighties, independently corroborated by multiple co-stars' and crew members' accounts across different decades of her career describing the same consistent practice, not a single interview claim.
      discipline: [78, 0.62, "d", "A"],
      // Documented as being publicly labeled "box office poison" by theater owners in 1938 after a string of commercial failures, then personally purchasing the film rights to The Philadelphia Story specifically to engineer her own career comeback — a specific, self-financed, independently corroborated recovery strategy.
      persistence: [78, 0.65, "d", "A"],
      // Documented career reinvention from 1930s dramatic ingenue to 1940s-50s screwball and dramatic leading roles to later-career character work, sustained across roughly 60 years of continuously relevant film and stage work, an unusually long adaptive career independently attested by film historians.
      adaptability: [68, 0.5, "s", "A"],
      // Documented as maintaining a decades-long relationship with the married (and Catholic, non-divorcing) Spencer Tracy despite the studio-era risk this posed to her public image, corroborated independently by Tracy family biographers as a sustained, publicly known arrangement both parties chose to maintain.
      risk_tolerance: [70, 0.52, "s", "R"],
      // Documented, independently corroborated across multiple co-stars' and directors' separate accounts as outspoken and unusually direct for a female star of her studio era, including publicly wearing trousers and refusing standard studio publicity conventions.
      social_assertiveness: [72, 0.55, "s", "D"],
      // Documented as taking direct personal control of her own career decisions (buying her own film rights, negotiating her own contracts unusually independently for the era) but not building or leading a formal organization — influence through personal career control rather than institutional leadership, scored near center.
      leadership_drive: [55, 0.42, "i", "N"],
      // Documented, independently corroborated by Berg's biography as repeatedly negotiating unusually favorable, independent contract terms with multiple studios (RKO, then MGM) across different points in her career for a woman of her era, a repeated pattern rather than a single outcome.
      persuasiveness: [62, 0.5, "s", "A"],
      // Documented as publicly and repeatedly defying studio conventions (refusing interviews, wearing trousers when studios objected, walking away from RKO when dissatisfied with roles offered) across multiple separate documented instances rather than one act of defiance.
      conflict_tolerance: [68, 0.5, "s", "D"],
      // Documented as personally learning golf, tennis, and other sports to professional-adjacent competence specifically to bring authenticity to roles requiring them (Pat and Mike), inferred deliberate skill-building from this documented preparation pattern.
      mastery_orientation: [62, 0.45, "i", "A"],
      // Documented as continuing to actively pursue challenging film and stage roles into her seventies (winning her fourth competitive Academy Award at 74 for On Golden Pond), corroborated by the dated record of sustained late-career achievement rather than a coasting reputation.
      achievement_drive: [68, 0.5, "s", "A"],
      // Documented as purchasing her own film rights and controlling her own casting decisions unusually independently for a female star under the studio system, and maintaining her own separate residence throughout her relationship with Tracy rather than a conventional domestic arrangement — a sustained pattern across career and personal life.
      autonomy_need: [78, 0.62, "d", "A"],
      // Thin direct evidence of motivation toward broader social impact beyond her craft and career; scored at the safe default rather than inflated from her cultural influence as a symbol of female independence, which is a separate question from her own stated motivation.
      impact_motivation: [50, 0.38, "i", "N"],
      // Career substantively concentrated in film and stage acting; scored at the safe default rather than extended without evidence.
      cross_domain_range: [48, 0.35, "i", "N"],
      // Self-initiated the purchase of The Philadelphia Story's film rights specifically to control the terms of her own comeback rather than wait for studios to offer her a path back, a documented, self-directed career rescue rather than a role offered to her.
      proactive_agency: [75, 0.58, "s", "A"],
      // Sustained a documented, mutually corroborated 26-year personal and professional partnership with Spencer Tracy across nine films, attested independently from Tracy's own family and biographers as a genuine, stable collaboration rather than a one-sided account from Hepburn alone.
      collaboration: [70, 0.52, "s", "A"],
      // Documented occasional direct competition for roles with contemporaries, though no sustained, well-corroborated personal rivalry pattern with one specific named peer — scored at the safe default.
      competitiveness: [60, 0.42, "i", "N"],
      // Documented as moderating some of her more combative early-career public persona (softening the outspoken "box office poison" era image) after the commercial failure of the mid-1930s, inferred from the documented shift in her later public presentation.
      belief_updating: [55, 0.4, "i", "N"],
      // Thin direct evidence either way beyond her documented sports-skill preparation for specific roles; scored at the safe default.
      detail_orientation: [55, 0.4, "i", "N"],
      // Documented, independently corroborated by Berg's biography, as recognizing The Philadelphia Story's specific potential as a comeback vehicle before any studio did, securing the stage and film rights herself first and controlling the casting -- a specific, verified sequence, not inferred from outcome alone.
      opportunity_sensing: [65, 0.5, "s", "A"],
      // Documented, independently corroborated by Berg's account, as using her own capital and prior stage success to engineer a film comeback when studios had effectively blacklisted her as "box office poison" -- a specific, verified instance of resourceful, self-financed career recovery, not her own claim alone.
      resourcefulness: [65, 0.5, "s", "A"],
      // Thin direct evidence of aesthetic sensitivity beyond her performing craft itself; scored at the safe default.
      aesthetic_sensitivity: [55, 0.4, "i", "N"],
      // The Philadelphia Story comeback was documented as a deliberately sequenced plan -- securing stage rights first to rebuild critical standing, then selling the film rights on her own terms with cast approval -- rather than an opportunistic single decision, independently corroborated by Berg's account of the multi-step strategy.
      planning_orientation: [68, 0.5, "s", "A"],
    },
  },
  {
    id: "p_naguib_mahfouz",
    slug: "naguib-mahfouz",
    canonicalName: "Naguib Mahfouz",
    birthYear: 1911,
    deathYear: 2006,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["EG"],
    regionCode: "north_africa",
    occupationIds: ["writer"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["nobel_laureate", "prolific", "systematic_thinker"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q7176" },
    portrait: {
      url: "/portraits/naguib-mahfouz-statue-cairo-2008.jpg",
      source: "Wikimedia Commons",
      license: "CC BY 3.0",
      width: 1001,
      height: 1558,
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      attribution: "Photograph by Bertramz, December 2008 -- memorial statue, Midan Sphinx, Cairo",
      kind: "editorial_nonlikeness",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_mahfouz_wikipedia", kind: "wikipedia", title: "Naguib Mahfouz", url: "https://en.wikipedia.org/wiki/Naguib_Mahfouz" }, { id: "src_mahfouz_nobel", kind: "award_body", title: "The Nobel Prize — Naguib Mahfouz, Literature 1988" }, { id: "src_mahfouz_elenany", kind: "biography", title: "Rasheed El-Enany, Naguib Mahfouz: The Pursuit of Meaning (Routledge, 2004)" }, { id: "src_mahfouz_press", kind: "press", title: "Contemporary press/literary-history accounts of his nightly café-gathering routine (resumed after the 1994 attack) and his own 1951 admission to Al-Arabi magazine about using acquaintances as character models" }],
    rows: {
      // Sustained a documented, unusually strict daily writing routine across roughly seven decades while also working a full-time civil-service career for most of his life, producing over 30 novels, documented via the well-established biographical record of his working habits.
      discipline: [86, 0.65, "d", "A"],
      // Produced substantive work spanning historical allegory, social realism, and modernist/experimental narrative technique across his career, documented via his bibliography's own genuinely varied output (from the Cairo Trilogy's realism to Children of Gebelawi's allegorical structure).
      cross_domain_range: [68, 0.65, "d", "A"],
      // Survived a 1994 stabbing attack by extremists who objected to Children of Gebelawi's religious allegory, and continued writing (with resulting physical limitations) afterward, documented via the well-established account of the attack and his subsequent continued work.
      risk_tolerance: [72, 0.65, "d", "R"],
      // [NEW_EVIDENCE, this session] A second, independent-domain documented instance now corroborates the literary-output persistence: press/literary-history accounts document that after the 1994 attack, he insisted on resuming his regular nightly gatherings with friends and literary figures across different locations each night of the week -- sustained social-life persistence through physical impairment, not only professional output. Two independent documented instances, different domains, meets this rubric's top confidence band.
      persistence: [80, 0.78, "d", "A"],
      // Widely credited (per the Nobel citation) with pioneering the modern Arabic novel form, synthesizing European narrative technique with Egyptian social material, documented via the Nobel committee's own explicit framing of his contribution.
      creative_originality: [74, 0.65, "d", "A"],
      // Sustained a highly productive literary career for decades while also working full-time in the Egyptian civil service until retirement, evidencing real long-term ambition across two simultaneous demanding tracks.
      achievement_drive: [68, 0.5, "s", "A"],
      // Continued publishing socially and religiously provocative material (Children of Gebelawi was banned in Egypt for its religious allegory) despite the real, eventually realized personal danger this attracted.
      conflict_tolerance: [64, 0.48, "s", "R"],
      // The Cairo Trilogy's dense, closely observed depiction of multi-generational Cairene family and social life evidences sustained careful attention to social and narrative detail, documented via the work's own well-noted density.
      detail_orientation: [66, 0.48, "s", "A"],
      // His social-realist novels consistently engaged with Egyptian political and social conditions across the 20th century, documented via his sustained thematic focus across his major works.
      impact_motivation: [62, 0.46, "s", "A"],
      // Continued developing his craft across markedly different narrative styles (realist, allegorical, stream-of-consciousness) over his career rather than repeating one successful formula.
      mastery_orientation: [62, 0.44, "s", "A"],
      // Continued publishing religiously and politically provocative material despite official censorship and public controversy, documented via the well-established reception and banning history of Children of Gebelawi.
      independent_thinking: [64, 0.46, "s", "A"],
      // Adapted his writing method to dictation after the 1994 attack permanently damaged his writing hand, a specific, well-documented instance of continuing productive work under a real new physical constraint.
      resourcefulness: [64, 0.65, "d", "A"],
      // Sustained a disciplined daily writing schedule maintained around his full-time civil-service job for decades, evidencing real sustained concentrated effort.
      deep_focus: [66, 0.46, "s", "A"],
      // [NEW_EVIDENCE, this session] A specific, first-person-quoted instance now replaces the generic career-breadth inference: he directly admitted to Al-Arabi magazine in 1951 that he habitually turned real acquaintances into fictional characters, and is separately documented (1971, Orabi Cafe) actively inquiring about a stranger's identity purely out of interest -- a habitual, self-acknowledged pattern of curious observation of people, not just of ideas.
      curiosity: [62, 0.55, "s", "A"],
      // The Cairo Trilogy's multi-generational, structurally interconnected narrative evidences real advance compositional planning across a very large-scale work.
      planning_orientation: [58, 0.42, "i", "N"],
      // Widely described as personally reserved and more comfortable in his regular café gatherings with a small circle of friends than broad public prominence, documented via multiple biographical accounts of his private, routine-centered daily life.
      social_assertiveness: [52, 0.4, "i", "N"],
      // Continued pursuing his own literary and thematic direction despite censorship pressure and public controversy over decades, suggesting real preference for creative independence.
      autonomy_need: [58, 0.42, "i", "N"],
      // Shifted narrative style substantially across his career, from realist family saga to allegory to experimental stream-of-consciousness, documented via the well-noted stylistic evolution across his bibliography.
      adaptability: [60, 0.44, "s", "A"],
      // Widely documented as personally reserved, preferring a small circle of regular café companions over broad public prominence or formal institutional leadership, an honestly moderate score.
      leadership_drive: [50, 0.4, "i", "N"],
      // The Cairo Trilogy's multi-generational, structurally interconnected narrative evidences real capacity for large-scale compositional architecture.
      systems_abstraction: [58, 0.42, "i", "N"],
    },
  },
  {
    id: "p_ravi_shankar",
    slug: "ravi-shankar",
    canonicalName: "Ravi Shankar",
    aliases: ["Robindro Shaunkor Chowdhury", "Pandit Ravi Shankar"],
    birthYear: 1920,
    deathYear: 2012,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["musician", "composer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural", "historical"],
    tagIds: ["innovator", "prolific"],
    archetypeIds: ["creative_creator"],
    externalIdentity: { wikidataId: "Q103774" },
    portrait: {
      url: "/portraits/ravi-shankar-woodstock-1969.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0 (VRT-verified permission from the copyright holder, ticket #2015112710019131)",
      width: 1142,
      height: 1600,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      attribution: "Markgoff2972, August 1969, at Woodstock",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_shankar_wikipedia", kind: "wikipedia", title: "Ravi Shankar", url: "https://en.wikipedia.org/wiki/Ravi_Shankar" }, { id: "src_shankar_autobiography", kind: "archive", title: "Ravi Shankar, Raga Mala: The Autobiography of Ravi Shankar (1997, ed. George Harrison) and My Music, My Life (1968) -- his own memoirs" }, { id: "src_shankar_press", kind: "press", title: "Contemporary press/historical accounts of the 1967 Monterey Pop Festival and the 1971 Concert for Bangladesh" }],
    rows: {
      // At age 18 abandoned his established career as a touring dancer in his brother Uday Shankar's internationally successful dance company to undertake a documented seven-year traditional guru-shishya apprenticeship under Allauddin Khan, living an ascetic, isolated student life focused solely on sitar technique -- a specific, dated, well-corroborated career pivot and sustained discipline.
      discipline: [90, 0.65, "d", "A"],
      // Sustained active concert performance and technical development across roughly 70 years (1930s-2012), documented via the continuous record of his performing career from childhood dance touring through his final recorded concerts in his 90s.
      mastery_orientation: [88, 0.6, "d", "A"],
      // Personally proposed and organized the 1971 Concert for Bangladesh with George Harrison in direct response to the Bangladesh Liberation War refugee crisis, a specific, self-initiated humanitarian act documented via both his own and Harrison's accounts of the concert's origin.
      proactive_agency: [82, 0.55, "d", "A"],
      // Sustained substantive activity as a concert soloist, film composer (scoring Satyajit Ray's Apu Trilogy), and cross-cultural music educator across his career, documented via the range of his credited work.
      cross_domain_range: [75, 0.52, "s", "A"],
      // Is widely credited with building sustained Western audience interest in Indian classical music from the 1960s onward, including his documented influence on George Harrison and the Beatles, inferred as requiring real persuasive/communicative capacity from this sustained cross-cultural impact.
      persuasiveness: [72, 0.48, "s", "A"],
      // [CORRECTED on provenance review, this session] Earlier drafting misattributed this to Monterey Pop (1967); verified this session that the documented anecdote is from the 1971 Concert for Bangladesh, where he and Ustad Ali Akbar Khan were applauded for tuning their instruments, and Shankar responded directly to the crowd: 'If you like our tuning so much, I hope you will enjoy the playing more' -- a specific, quoted instance of direct public communication under an awkward cross-cultural circumstance; kept moderate per this rubric's single-anecdote ceiling.
      social_assertiveness: [60, 0.44, "s", "N"],
      // Continued expanding into new domains (Western orchestral composition, film scoring, cross-genre collaboration) throughout a career already secure in classical concert success, evidencing sustained ambition beyond an established niche.
      achievement_drive: [70, 0.46, "s", "N"],
      // Performed and composed across radically different musical contexts over his career -- traditional Indian classical concert settings, Western rock festivals (Monterey, Woodstock), film scoring, and orchestral collaboration -- documented via the range of his credited performances and compositions.
      adaptability: [68, 0.44, "s", "N"],
      // Sustained cross-genre musical exploration and collaboration across six decades, inferred from the documented breadth of his creative output beyond classical concert performance alone.
      curiosity: [65, 0.42, "i", "N"],
      // Organized the Concert for Bangladesh specifically to direct humanitarian aid toward refugees of the Bangladesh Liberation War rather than for personal career benefit, documented via the concert's own stated charitable purpose and proceeds.
      impact_motivation: [68, 0.44, "s", "A"],
      // Sustained the demanding seven-year apprenticeship under Allauddin Khan to full completion despite its documented rigor and isolation, and continued performing at a high technical level into his 90s.
      persistence: [70, 0.44, "s", "A"],
      // Left an already-successful career in his brother's dance company to pursue an entirely different, initially uncertain musical training path, suggesting real self-directed career independence.
      autonomy_need: [60, 0.4, "i", "N"],
      // Indian classical sitar performance at his documented level of mastery requires exceptionally precise technical control, inferred from the well-established technical demands of his instrument and tradition rather than occupational stereotype alone -- scored conservatively given the risk of that exact anti-pattern.
      detail_orientation: [62, 0.4, "i", "N"],
      // Sustained substantive collaborative relationships across genre and culture (George Harrison, Yehudi Menuhin, Philip Glass), documented via the credited output of these collaborations.
      collaboration: [62, 0.42, "i", "N"],
      // Founded music schools (the Kinnara School of Music) to formally teach Indian classical music, suggesting some real institutional leadership beyond individual performance, documented via the schools' own founding record.
      leadership_drive: [55, 0.38, "i", "N"],
      // Organizing a large benefit concert (Concert for Bangladesh) on short notice with a defined charitable structure suggests real organizational planning capacity.
      planning_orientation: [55, 0.38, "i", "N"],
      // Introduced traditional Indian classical forms to skeptical or unfamiliar Western concert and festival audiences repeatedly across his career, a real if modest documented reputational risk.
      risk_tolerance: [58, 0.4, "i", "N"],
      // Is credited with original cross-genre compositional work (film scores, orchestral concertos for sitar, collaborations spanning multiple traditions) beyond traditional classical repertoire alone, documented via the range of his credited original compositions.
      creative_originality: [72, 0.46, "s", "A"],
    },
  },
  {
    id: "p_stephen_hawking",
    slug: "stephen-hawking",
    canonicalName: "Stephen Hawking",
    aliases: ["Stephen William Hawking"],
    birthYear: 1942,
    deathYear: 2018,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["physicist", "writer"],
    fieldIds: ["physics"],
    impactDomains: ["scientific", "educational", "cultural"],
    tagIds: ["overcame_adversity", "communicator", "prolific"],
    archetypeIds: ["scientific_explorer"],
    externalIdentity: { wikidataId: "Q17714" },
    portrait: {
      url: "/portraits/stephen-hawking-nasa-2008.jpg",
      source: "Wikimedia Commons / NASA",
      license: "Public domain (NASA work; NASA material is not protected by copyright unless noted)",
      width: 1600,
      height: 1600,
      attribution: "NASA / Paul Alers, 21 April 2008 -- NASA 50th anniversary lecture",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_hawking_wikipedia", kind: "wikipedia", title: "Stephen Hawking", url: "https://en.wikipedia.org/wiki/Stephen_Hawking" }, { id: "src_hawking_memoir", kind: "archive", title: "Stephen Hawking, My Brief History (2013) -- his own memoir" }, { id: "src_hawking_janehawking", kind: "biography", title: "Jane Hawking, Travelling to Infinity: My Life with Stephen (2007) -- an independent account by his first wife" }],
    rows: {
      // Continued active theoretical physics research, public lecturing, and writing across roughly five decades following a 1963 ALS diagnosis that doctors initially expected would be fatal within two years, and specifically continued this work after losing his natural speech entirely in 1985, adapting to a speech-synthesizer device -- an extensively, independently documented (Jane Hawking's own memoir, decades of press coverage, his own account) sustained pattern, not a single moment of resilience.
      persistence: [95, 0.7, "d", "A"],
      // Adopted and sustained use of a computer-based speech-synthesizer system after losing natural speech in 1985, and progressively adapted his research and communication methods across decades of advancing paralysis, documented via the well-established medical and biographical record of this progression.
      adaptability: [90, 0.65, "d", "A"],
      // Sustained a demanding schedule of original theoretical research, public lecturing, and writing (including the bestselling A Brief History of Time, 1988) across decades in which composing even a single sentence required significant physical effort via his speech device, documented via the well-established account of his working method in this period.
      discipline: [82, 0.58, "d", "A"],
      // Continued pursuing increasingly ambitious theoretical projects and public-communication work throughout his life rather than settling for early academic achievement alone, documented via the sustained scope and escalating public reach of his work across five decades.
      achievement_drive: [78, 0.54, "s", "A"],
      // A Brief History of Time is documented to have become one of the best-selling science books in publishing history, credited with making advanced cosmology broadly accessible to a lay public, inferred as requiring real communicative/persuasive capacity from this sustained, exceptional reception.
      persuasiveness: [80, 0.55, "s", "A"],
      // Sustained original theoretical contributions across multiple distinct areas of cosmology and gravitational physics (singularity theorems, black hole radiation) over a decades-long career, documented via the sustained range of his credited scientific contributions.
      curiosity: [75, 0.5, "s", "A"],
      // Continued directing his own research agenda and public communication choices despite requiring extensive personal care assistance for most of his adult life, documented via the well-established continuity of his independent professional direction across this period.
      autonomy_need: [68, 0.46, "s", "N"],
      // Sustained an extensive direct public lecturing and media presence across decades communicated entirely through a speech-synthesizer device, documented via the well-established volume and continuity of his public appearances.
      social_assertiveness: [65, 0.44, "s", "N"],
      // Documented, via Jane Hawking's own memoir, to have specifically chosen to complete his PhD and pursue his most ambitious research program after his diagnosis rather than withdrawing from academic work -- a self-directed response to the diagnosis rather than a passive one.
      proactive_agency: [62, 0.42, "i", "N"],
      // Continued advancing genuinely novel, sometimes contested theoretical positions throughout his career, inferred as requiring some real intellectual risk tolerance from the documented pattern of publicly revising major positions.
      risk_tolerance: [58, 0.4, "i", "N"],
      // Consistently directed significant personal effort toward public science communication and advocacy for disability rights and access, alongside his primary research career, documented via the sustained public record of both strands of his work.
      impact_motivation: [68, 0.44, "s", "A"],
      // Sustained substantive research collaborations with other physicists (notably Roger Penrose and Kip Thorne) across his career despite the communication burden his condition imposed, documented via the credited joint scientific work.
      collaboration: [55, 0.4, "i", "N"],
      // Continued developing and revising his theoretical positions across a five-decade research career rather than resting on his early singularity-theorem work, inferred from the documented evolution of his scientific positions over time.
      mastery_orientation: [62, 0.42, "i", "N"],
      // Sustained research and communication requiring extensive advance preparation given the physical effort each communicated sentence required via his speech device, inferred from the documented nature of this working method.
      planning_orientation: [55, 0.38, "i", "N"],
      // Limited direct evidence of personal working-method detail beyond the documented physical constraints of his communication method was identified in the sources reviewed this pass; scored conservatively.
      detail_orientation: [55, 0.36, "i", "N"],
      // Documented to have publicly reversed a major prior scientific position (the black hole information paradox) in response to sustained peer challenge, suggesting some real capacity to engage rather than avoid scientific disagreement.
      conflict_tolerance: [55, 0.38, "i", "N"],
      // Held a senior academic chair (the Lucasian Professorship of Mathematics at Cambridge) for three decades, suggesting some institutional stature, though direct evidence of active administrative leadership beyond the role's prestige is limited in the sources reviewed.
      leadership_drive: [50, 0.36, "i", "N"],
      // Sustained substantive activity as both a research physicist and a bestselling popular-science author/public communicator concurrently across his career, inferred from the documented range of his credited output.
      cross_domain_range: [60, 0.4, "i", "N"],
    },
  },
  {
    id: "p_sun_yat_sen",
    slug: "sun-yat-sen",
    canonicalName: "Sun Yat-sen",
    birthYear: 1866,
    deathYear: 1925,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["CN"],
    regionCode: "east_asia",
    occupationIds: ["political_leader", "physician"],
    fieldIds: ["politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["founder", "leader"],
    archetypeIds: ["organizational_leader", "social_influencer"],
    externalIdentity: { wikidataId: "Q8573" },
    portrait: {
      url: "/portraits/sun-yat-sen-standard-portrait-1922.jpg",
      source: "Wikimedia Commons",
      license: "Public domain (photography work; copyright expired under both PRC and ROC/Taiwan law)",
      width: 1219,
      height: 1600,
      attribution: "Bo'er Photo Studio, Shanghai, 15 November 1922 -- the widely-used 'standard portrait'",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_sunyatsen_wikipedia", kind: "wikipedia", title: "Sun Yat-sen", url: "https://en.wikipedia.org/wiki/Sun_Yat-sen" }, { id: "src_sunyatsen_sharman", kind: "biography", title: "Lyon Sharman, Sun Yat-sen: His Life and Its Meaning (1934); Harold Z. Schiffrin, Sun Yat-sen and the Origins of the Chinese Revolution" }, { id: "src_sunyatsen_asiasociety", kind: "institution", title: "Asia Society -- Sun Yat-sen", url: "https://sites.asiasociety.org/chinawealthpower/chapters/sun-yat-sen/" }, { id: "src_sunyatsen_kidnapped", kind: "archive", title: "Sun Yat-sen (with James Cantlie and Edwin Collins), Kidnapped in London (1897) -- his own English-language, first-person account of the 1896 legation captivity, written and published within weeks of his release" }, { id: "src_sunyatsen_jmch", kind: "institution", title: "\"Sun Yat-sen's English writing and revolutionary image after his kidnapping and imprisonment in London\", Journal of Modern Chinese History 15(2), 2021 -- scholarly analysis of how he used the published account strategically" }],
    rows: {
      // RUBRIC_CORRECTION (roster28 fast-batch audit, 2026-09; score-band correction only): In October 1896 he was lured into the Chinese Legation in London by Qing officials who planned to smuggle him back to China for execution over a failed 1895 uprising; released only through the intervention of a former professor -- a specific, precisely dated, extensively documented episode. Originally scored 88/documented; corrected to 80 because this rests on one single dated episode (continuing to organize afterward is not itself a second risk-taking instance), per scoring-rubric-v1 Section 4's 85+ requirement for multiple independent documented instances. Score-band correction only: evidenceType and confidence unchanged.
      risk_tolerance: [80, 0.65, "d", "A"],
      // Sustained a nearly 20-year revolutionary career in exile (1895-1911) before the Qing dynasty's fall, documented as traveling to Japan 12 times, Southeast Asia 43 times, the US 4 times, and Europe 4+ times specifically to organize and fundraise -- a specific, quantified, extensively documented sustained effort.
      persistence: [90, 0.65, "d", "A"],
      // Founded the Revive China Society in Honolulu in 1894, a specific, dated, self-initiated organizing act with no institutional backing at the time.
      proactive_agency: [84, 0.6, "d", "A"],
      // Sustaining fundraising and organizing across dozens of overseas Chinese communities on essentially no formal institutional support for two decades implies real resourcefulness, inferred from the documented scale and duration of this fundraising effort.
      resourcefulness: [82, 0.55, "s", "A"],
      // Sustained direct persuasion of overseas Chinese communities across dozens of separate trips implies strong social assertiveness, inferred from the documented travel/organizing pattern.
      social_assertiveness: [82, 0.5, "s", "N"],
      // Founding and sustaining leadership of successive revolutionary organizations (Revive China Society, later the Tongmenghui) over two decades implies strong leadership drive, inferred from the documented organizational pattern.
      leadership_drive: [84, 0.5, "s", "A"],
      // After the 1911 Revolution succeeded, he voluntarily ceded the provisional presidency to Yuan Shikai to preserve national unity -- a specific, documented, genuinely collaborative/conciliatory act, though historians differ on whether it was strategically wise.
      collaboration: [68, 0.48, "s", "N"],
      // [NEW_EVIDENCE, this session] Beyond the fundraising-outcome evidence, a second, more specific instance now corroborates it from a different domain: Kidnapped in London (1897), his own written account, is documented to have made him globally famous within weeks and built substantial Western sympathy for the Chinese revolutionary cause -- a concrete instance of persuasive written communication achieving a specific, traceable public-opinion effect, not just a general fundraising result.
      persuasiveness: [78, 0.52, "s", "A"],
      // Sustaining a single overarching goal (ending imperial rule, establishing a republic) across two decades of exile and personal risk implies strong achievement drive, inferred from the documented career arc.
      achievement_drive: [78, 0.42, "i", "N"],
      // His Three Principles of the People framework suggests real structural political thinking, inferred from the documented content and later influence of that framework.
      systems_abstraction: [74, 0.42, "i", "N"],
      // Sustaining a two-decade organizing effort across dramatically different political and geographic contexts (Hawaii, Japan, Europe, mainland China) implies real adaptability, inferred from the documented breadth of these operating contexts.
      adaptability: [70, 0.4, "i", "N"],
      // Sustaining organizing and fundraising activity across two decades of exile implies real behavioral discipline, inferred from the documented duration of the effort.
      discipline: [72, 0.4, "i", "N"],
      // [NEW_EVIDENCE, this session] A second, independent, temporally-earlier instance of the same underlying pattern now corroborates the 1911 Wuchang-timing evidence: in 1896, rather than simply recovering privately from his London captivity, he and collaborators wrote and published his own first-person account within weeks, in English, aimed at foreign audiences -- a documented, scholarly-analyzed (Journal of Modern Chinese History, 2021) instance of converting a personal crisis into international sympathy and revolutionary publicity, 15 years before the 1911 example. Two independent instances, in different domains (media/propaganda vs. military-political timing), meets this rubric's strong_inference standard.
      opportunity_sensing: [74, 0.55, "s", "A"],
      // Pursuing a republican, rather than reformist-monarchist, vision for China against the era's more moderate reform movements suggests independent political judgment, inferred from the documented distinctiveness of his revolutionary (vs. reformist) position.
      independent_thinking: [68, 0.4, "i", "N"],
      // Trained as a physician before turning to revolutionary politics, and sustained engagement with Western political philosophy while organizing abroad, suggests broad intellectual curiosity, inferred from the documented breadth of his education and influences.
      curiosity: [68, 0.4, "i", "N"],
      // Sustaining logistically complex fundraising and organizing operations across dozens of overseas Chinese communities over two decades implies real attention to organizational detail, inferred from the documented scale of the effort.
      detail_orientation: [58, 0.4, "i", "N"],
      // Founding and sustaining successive revolutionary organizations with defined structures and goals over two decades implies real methodical planning, inferred from the documented organizational continuity.
      planning_orientation: [66, 0.4, "i", "N"],
      // Sustaining direct opposition to the Qing dynasty for two decades, including surviving a kidnapping/assassination attempt, implies real tolerance for sustained high-stakes conflict, inferred from the documented pattern of his revolutionary career.
      conflict_tolerance: [74, 0.4, "i", "N"],
      // Sustained, increasingly sophisticated organizational and diplomatic capability across two decades of revolutionary organizing suggests developing mastery, inferred from the documented career arc.
      mastery_orientation: [62, 0.4, "i", "N"],
    },
  },
  {
    id: "p_thomas_jefferson",
    slug: "thomas-jefferson",
    canonicalName: "Thomas Jefferson",
    birthYear: 1743,
    deathYear: 1826,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["political_leader", "lawyer", "architect"],
    fieldIds: ["politics", "law", "philosophy"],
    impactDomains: ["historical", "social"],
    tagIds: ["founder", "polymath", "poor_business_sense"],
    archetypeIds: ["cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q11812" },
    portrait: {
      url: "/portraits/thomas-jefferson-peale-1800.jpg",
      source: "Wikimedia Commons / White House Collection",
      license: "Public domain (1800 oil painting; artist Rembrandt Peale died 1860)",
      width: 1342,
      height: 1600,
      attribution: "Rembrandt Peale, 1800 -- Official Presidential Portrait, White House Collection",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_tj_papers", kind: "archive", title: "The Papers of Thomas Jefferson (Princeton University Press, ongoing) — his own correspondence, drafts, and public documents" }, { id: "src_tj_ellis", kind: "biography", title: "Joseph J. Ellis, American Sphinx: The Character of Thomas Jefferson (1996)" }, { id: "src_tj_gordon_reed", kind: "biography", title: "Annette Gordon-Reed, The Hemingses of Monticello (2008) — independently peer-reviewed scholarship on Jefferson's documented relationship with Sally Hemings, confirmed by DNA and documentary evidence" }, { id: "src_tj_wikipedia", kind: "wikipedia", title: "Thomas Jefferson", url: "https://en.wikipedia.org/wiki/Thomas_Jefferson" }],
    rows: {
      // Documented, sustained personal engagement across architecture (his own designs for Monticello and the University of Virginia), paleontology, botany, and linguistics (compiling comparative Native American vocabulary lists), corroborated by his own extensive correspondence and surviving design drawings, not secondhand reputation.
      curiosity: [85, 0.72, "d", "A"],
      // His own Notes on the State of Virginia (1785) is documented as a systematically organized empirical survey of the state's geography, natural history, and society, structured around specific queries — a sustained analytical method, though the work's scientific racism sections are a documented, serious flaw in that same reasoning.
      analytical_rigor: [70, 0.55, "s", "A"],
      // Designed Monticello's architecture himself, including specific innovative features (a dumbwaiter, a weather vane readable from inside), documented via surviving drawings and later architectural-historical analysis as genuinely original applications of the Palladian style he studied, not direct copying.
      creative_originality: [68, 0.52, "s", "A"],
      // Documented, sustained daily habit of detailed weather and farm-production record-keeping at Monticello across decades, and drafting the Declaration of Independence within roughly two weeks under real time pressure — a specific, attested pattern of sustained record-keeping and productive output.
      discipline: [65, 0.48, "s", "A"],
      // Sustained a decades-long political and intellectual career, but the documented record of chronic personal debt (he died deeply insolvent despite continuous effort to manage Monticello's finances across 50 years) suggests persistence in some domains did not translate to sustained follow-through in others — scored moderately rather than uniformly high.
      persistence: [60, 0.45, "i", "N"],
      // Documented as maintaining largely consistent political and philosophical positions (agrarian republicanism, strict construction) across a long career rather than substantially revising his views — scored near center rather than assumed high or low.
      adaptability: [58, 0.42, "i", "N"],
      // Documented as personally drafting the Declaration of Independence, an act of treason under British law with severe personal risk if the revolution failed, though he is also documented by contemporaries as generally conflict-averse in direct political confrontation — genuinely mixed, scored at inference level.
      risk_tolerance: [62, 0.45, "i", "N"],
      // Thin direct evidence either way; his sustained scientific and architectural projects across decades suggest some comfort with long, uncertain timelines, balanced against documented anxiety in his letters during the more acute crises of his presidency — scored near center.
      ambiguity_tolerance: [55, 0.4, "i", "N"],
      // Widely documented by contemporaries (including close allies like Madison) and by later historians as an indirect, conflict-avoidant decision-maker who often let events or subordinates force resolutions rather than acting unilaterally — scored below center rather than assumed neutral.
      decisiveness: [45, 0.4, "i", "N"],
      // Documented and widely corroborated across contemporary accounts (including his own famously poor record as a public speaker, by his own and others' acknowledgment) as reserved and more effective in writing than in direct verbal confrontation or persuasion.
      social_assertiveness: [40, 0.42, "s", "N"],
      // The Declaration of Independence's rhetorical structure is documented by historians as directly effective in framing the revolutionary case for a broad audience, an attributable written persuasive achievement distinct from his documented weakness in oral persuasion.
      persuasiveness: [65, 0.5, "s", "A"],
      // Documented as preferring to work through intermediaries and written channels rather than direct confrontation even with political rivals (his conflict with Hamilton was conducted substantially through proxies and anonymous newspaper essays) — scored below center.
      conflict_tolerance: [40, 0.4, "i", "N"],
      // Documented, sustained self-directed study of architecture (extensive personal library on Palladio and classical design) and agricultural science (systematic crop-rotation experiments at Monticello, recorded in his farm books), both pursued as genuine expertise-building, not superficial interest.
      mastery_orientation: [70, 0.55, "s", "A"],
      // Documented sustained public career and intellectual output, though his own writing (his chosen epitaph lists only three achievements, explicitly excluding the presidency) suggests his sense of achievement was self-defined and specific rather than status-seeking generally — scored moderately.
      achievement_drive: [62, 0.45, "i", "N"],
      // Documented as retreating to Monticello for extended periods even during active political life to pursue his own architectural and scientific projects independent of public office, and resigning as Secretary of State in 1793 rather than continue serving under policies he opposed.
      autonomy_need: [65, 0.48, "s", "A"],
      // His own chosen epitaph — author of the Declaration of Independence and the Virginia Statute for Religious Freedom, founder of the University of Virginia — explicitly frames his own desired legacy in terms of durable institutional and philosophical impact rather than personal power, a specific self-authored statement of motivation.
      impact_motivation: [70, 0.55, "s", "A"],
      // Documented, sustained personal design work on Monticello and the University of Virginia's "Academical Village," both attested by surviving drawings and independently studied by architectural historians as deliberate, informed aesthetic choices, not delegated design.
      aesthetic_sensitivity: [72, 0.55, "s", "A"],
      // Sustained substantive, non-dabbling activity across law, architecture, agricultural science, paleontology, linguistics, and statecraft, each with real documented output (buildings, scientific correspondence, legal writing) — an unusually wide, independently verifiable range.
      cross_domain_range: [82, 0.65, "d", "A"],
      // Self-initiated the Monticello design and rebuilding project and the founding of the University of Virginia as personal, self-directed undertakings outside his official duties, documented across decades of his own correspondence about both projects.
      proactive_agency: [62, 0.45, "i", "A"],
      // Documented as maintaining, across his entire adult life, an explicit written condemnation of slavery as morally wrong (Notes on Virginia, private correspondence) while continuing to enslave over 600 people at Monticello and never freeing the great majority of them even in his will — a well-documented, sustained failure to revise conduct despite acknowledged contrary belief, scored low rather than omitted.
      belief_updating: [35, 0.45, "s", "R"],
      // Documented, sustained meticulous record-keeping across his farm books, weather journals, and correspondence logs (he kept copies of nearly every letter he wrote via a polygraph copying machine he championed), corroborated by the surviving volume of these records.
      detail_orientation: [68, 0.52, "s", "A"],
      // Documented as repeatedly restructuring debt and mortgaging enslaved people and land to fund Monticello's continual rebuilding, a documented but ethically fraught financial pattern that ultimately failed to resolve his insolvency — scored moderately rather than as a positive resourcefulness case.
      resourcefulness: [55, 0.4, "i", "N"],
    },
  },
  {
    id: "p_winnie_madikizela_mandela",
    slug: "winnie-madikizela-mandela",
    canonicalName: "Winnie Madikizela-Mandela",
    birthYear: 1936,
    deathYear: 2018,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["ZA"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["political_activist", "activist"],
    fieldIds: ["politics", "civil_rights"],
    impactDomains: ["social", "historical"],
    tagIds: ["endured_imprisonment", "overcame_adversity"],
    archetypeIds: ["social_influencer"],
    externalIdentity: { wikidataId: "Q239062" },
    portrait: {
      url: "/portraits/winnie-madikizela-mandela-1996.jpg",
      source: "Wikimedia Commons",
      license: "CC BY-SA 2.0",
      width: 512,
      height: 768,
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      attribution: "John Mathew Smith / www.celebrity-photos.com, 15 April 1996, Washington D.C.",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_wmm_491days", kind: "archive", title: "Winnie Madikizela-Mandela, 491 Days: Prisoner Number 1323/69 (2013) — her own account of 491 days in solitary confinement, 1969-1970" }, { id: "src_wmm_trc", kind: "institution", title: "South Africa Truth and Reconciliation Commission (TRC) findings, 1997, including hearings on the Mandela United Football Club and the killing of Stompie Moeketsi" }, { id: "src_wmm_press", kind: "press", title: "Decades of South African and international press coverage, 1960s anti-apartheid activism through her 2018 death as a sitting Member of Parliament" }, { id: "src_wmm_wikipedia", kind: "wikipedia", title: "Winnie Madikizela-Mandela", url: "https://en.wikipedia.org/wiki/Winnie_Madikizela-Mandela" }],
    rows: {
      // Sustained anti-apartheid activism across nearly three decades of banning orders, repeated detention, and her husband's 27-year imprisonment, without withdrawing from the movement.
      persistence: [78, 0.65, "d", "A"],
      // Sustained direct, high-risk confrontation with the apartheid state across decades, repeatedly accepting detention and banning orders as a known consequence rather than moderating her activism to avoid them.
      conflict_tolerance: [76, 0.62, "d", "R"],
      // Continued high-profile public activism despite documented banning orders, solitary confinement, and sustained state surveillance and harassment across decades, evidenced across multiple separate periods of detention.
      risk_tolerance: [74, 0.6, "d", "R"],
      // Continued operating as an independent political force during Mandela's imprisonment, repeatedly violating banning orders specifically intended to silence her rather than complying to avoid further consequence.
      autonomy_need: [68, 0.55, "d", "A"],
      // Became a globally recognized leader and symbol of the anti-apartheid movement during Mandela's imprisonment and later held elected office for two decades; the 1997 Truth and Reconciliation Commission also formally found her "politically and morally accountable" for violence committed by the Mandela United Football Club, a group operating under her patronage, including the killing of fourteen-year-old activist Stompie Moeketsi — a specific, institutional finding of real harm connected to that same leadership role, not omitted from the profile.
      leadership_drive: [68, 0.58, "d", "D"],
      // Sustained highly public, confrontational activist rhetoric across decades, including a specific, widely reported and controversial 1986 public statement about "necklacing" that drew criticism even from within the movement — assertive with real, documented reputational cost.
      social_assertiveness: [72, 0.6, "d", "D"],
      // Built and expanded her own independent activist network and public profile during Mandela's imprisonment rather than remaining a passive figure awaiting his release.
      proactive_agency: [65, 0.55, "d", "A"],
      // Her own memoir, 491 Days, documents sustained psychological endurance through prolonged solitary confinement — a rare, direct first-person account of enduring severe, extended uncertainty and isolation.
      ambiguity_tolerance: [74, 0.62, "d", "A"],
      // Sustained pursuit of political relevance and leadership across decades, remaining an elected Member of Parliament until her death despite sustained controversy, inferred from that consistency.
      achievement_drive: [62, 0.48, "s", "A"],
      // Her own account of the Stompie Moeketsi case never fully aligned with the Truth and Reconciliation Commission's institutional findings — a documented, sustained divergence from the official record that is honestly ambiguous between principled disagreement and unresolved denial, scored as dual_edged rather than resolved in either direction.
      independent_thinking: [55, 0.5, "d", "D"],
      // Sustaining decades of political engagement and organizing despite repeated state suppression implies real personal discipline, but no single cited working-discipline episode survives independent of the broader activism record, hence inference-level.
      discipline: [58, 0.35, "i", "N"],
      // Moved through documented, distinct roles — young activist and imprisoned dissident's wife, independent movement symbol during his imprisonment, and post-apartheid elected politician — across dramatically different eras.
      adaptability: [62, 0.48, "s", "A"],
      // Sustained lifelong commitment to the anti-apartheid cause and, later, documented continued local popularity and re-election specifically in Soweto despite national controversy, suggesting sustained motivation tied to a specific constituency.
      impact_motivation: [65, 0.5, "s", "A"],
      // Retained a documented, sustained political base and popularity in Soweto across decades despite significant national controversy — real evidence of an enduring persuasive connection with a specific constituency, not inferred from general fame.
      persuasiveness: [65, 0.52, "d", "A"],
      // Returned immediately to high-profile public activism after her release from 491 days of solitary confinement rather than withdrawing from public life — a specific, documented choice at a clear decision point.
      decisiveness: [62, 0.5, "d", "A"],
      // Trained and worked as South Africa's first Black medical social worker before her activism career, a documented credential, though the deeper evidence for sustained mastery-seeking beyond that credential is thinner, hence inference-level.
      mastery_orientation: [55, 0.35, "i", "N"],
      // Sustained, coordinated activist network-building during Mandela's imprisonment implies real organizational planning, but no single cited planning episode survives independent of the outcome, hence inference-level.
      planning_orientation: [58, 0.35, "i", "N"],
      // Functioned as a trained social worker, a movement activist/organizer, and later a parliamentarian — a documented range of roles, though the depth of evidence in each beyond the activism itself is thinner, hence inference-level.
      cross_domain_range: [55, 0.35, "i", "N"],
    },
  },
  {
    id: "p_winston_churchill",
    slug: "winston-churchill",
    canonicalName: "Winston Churchill",
    birthYear: 1874,
    deathYear: 1965,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["political_leader", "writer"],
    fieldIds: ["politics", "diplomacy"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "generalist"],
    archetypeIds: ["organizational_leader", "cross_disciplinary_generalist"],
    externalIdentity: { wikidataId: "Q8016" },
    portrait: {
      url: "/portraits/winston-churchill-yalta-1945.jpg",
      source: "Wikimedia Commons / UK National Archives",
      license: "Public domain (UK Crown Copyright expired -- photograph taken prior to 1 June 1957; HMSO has confirmed the expiry of Crown Copyright applies worldwide)",
      width: 620,
      height: 824,
      attribution: "UK National Archives (Kew), 9 February 1945, Yalta Conference",
      
    },
    directoryVisible: true,
    sources: [{ id: "src_churchill_wikipedia", kind: "wikipedia", title: "Winston Churchill", url: "https://en.wikipedia.org/wiki/Winston_Churchill" }, { id: "src_churchill_gilbert", kind: "biography", title: "Martin Gilbert, Winston S. Churchill (official biography, begun by Randolph Churchill, 8 volumes)" }, { id: "src_churchill_royalsociety", kind: "institution", title: "Biographical Memoirs of Fellows of the Royal Society -- Winston Leonard Spencer Churchill, 1874-1965", url: "https://royalsocietypublishing.org/doi/10.1098/rsbm.1966.0003" }, { id: "src_churchill_gallipoli", kind: "institution", title: "International Churchill Society -- Gallipoli", url: "https://winstonchurchill.org/churchill-central/storyelement/gallipoli/" }],
    rows: {
      // After the Gallipoli resignation, personally volunteered for and served in frontline trench combat in France in 1916 -- a documented instance of accepting direct physical risk following a major public political failure, in addition to the already-scored 1940 war-cabinet decision.
      risk_tolerance: [90, 0.72, "d", "A"],
      // Crossed the floor of the House of Commons twice in his career (Conservative to Liberal in 1904, back to Conservative in 1924), a specific, well-documented pattern of prioritizing his own political judgment over party loyalty in both directions.
      independent_thinking: [88, 0.68, "d", "A"],
      // Spent his 'wilderness years' (roughly 1929-1939) marginalized from government, documented as repeatedly and publicly warning about Nazi German rearmament while largely disbelieved by the political mainstream, sustained for a full decade before events proved him correct.
      persistence: [85, 0.65, "d", "A"],
      // Wrote a six-volume history of the Second World War after leaving office, for which he was awarded the Nobel Prize in Literature in 1953 -- a specific, documented sustained achievement distinct from his political career.
      achievement_drive: [84, 0.65, "d", "A"],
      // Documented sustained output across soldiering (Sudan, South Africa), journalism (war correspondent), multi-decade high-office politics, and published history/memoir writing across a 60+ year public career, inferred from the documented breadth of his career record.
      cross_domain_range: [86, 0.6, "s", "A"],
      // After the 1915 Gallipoli campaign failure, was forced to resign as First Lord of the Admiralty and became the campaign's principal public scapegoat despite documented shared responsibility across the war cabinet; publicly defended his own decisions in the House of Commons on 15 November 1915 rather than quietly stepping aside -- a specific, dated instance of sustaining a public, high-stakes defense of a contested decision.
      conflict_tolerance: [82, 0.65, "d", "N"],
      // Resigned his government position entirely in November 1915 rather than accept a token consolation post (Chancellor of the Duchy of Lancaster) he judged inadequate, then volunteered for active frontline military service in France -- a specific, documented, immediate consequential decision following the Gallipoli failure.
      decisiveness: [84, 0.65, "d", "A"],
      // Sustained engagement across soldiering, journalism, painting (the subject of his own book 'Painting as a Pastime'), bricklaying, and history writing suggests broad underlying curiosity, inferred from the documented range of pursuits.
      curiosity: [76, 0.5, "s", "N"],
      // Took up oil painting as an adult hobby, documented well enough to be the subject of his own published essay, suggesting some real aesthetic engagement, though the depth of his personal aesthetic judgment beyond the hobby itself is less directly documented.
      aesthetic_sensitivity: [68, 0.46, "i", "N"],
      // Sustained public political leadership through wartime broadcasts and parliamentary speeches implies strong social assertiveness, inferred from the documented centrality of his public communication role.
      social_assertiveness: [80, 0.46, "i", "N"],
      // A 60-year career consistently oriented toward the highest offices of government implies strong underlying leadership drive, inferred from the documented career trajectory rather than a single stated ambition.
      leadership_drive: [82, 0.46, "i", "N"],
      // Successfully returning to high office in 1951 (as Prime Minister a second time) after his 1945 electoral defeat suggests real political adaptability, inferred from the documented career recovery.
      adaptability: [70, 0.44, "i", "N"],
      // Sustained wartime working hours documented in multiple biographies (chairing late-night meetings, extensive dictation of memoranda) suggest real behavioral discipline under sustained pressure, inferred rather than measured directly.
      discipline: [74, 0.42, "i", "N"],
      // Documented practice of personally reviewing and annotating extensive military and intelligence reports during WWII suggests real attention to detail, inferred from the documented volume of his own wartime paperwork.
      detail_orientation: [66, 0.42, "i", "N"],
      // His WWII memoir's synthesis of personal narrative with historical analysis was distinctive for its genre, suggesting real creative approach to the writing itself, inferred rather than critically assessed here in depth.
      creative_originality: [72, 0.42, "i", "N"],
      // Sustained, increasingly sophisticated political and literary output across six decades suggests developing mastery, inferred from the documented career arc.
      mastery_orientation: [74, 0.4, "i", "N"],
      // Sustained wartime alliance management (with Roosevelt, Stalin, and the war cabinet) implies real collaborative capacity at the highest level, inferred from the documented functioning of the wartime alliance.
      collaboration: [64, 0.4, "i", "N"],
      // Repeatedly initiating and sustaining unpopular political positions (rearmament warnings, wartime resolve) beyond what his formal role required at the time suggests real self-initiated agency, inferred from the documented pattern.
      proactive_agency: [72, 0.4, "i", "N"],
      // The repeated pattern of breaking with his own party over matters of principle suggests real independence orientation, inferred from the documented floor-crossing pattern already noted above under independent_thinking.
      autonomy_need: [66, 0.4, "i", "N"],
      // His early, specific, and ultimately accurate warnings about German rearmament (contrasted with the prevailing political consensus) suggest real analytical capability, inferred from the documented accuracy of his assessment relative to consensus.
      analytical_rigor: [70, 0.4, "i", "N"],
    },
  },
];

export const ROSTER_28: readonly Person[] = seeds.map(build);
