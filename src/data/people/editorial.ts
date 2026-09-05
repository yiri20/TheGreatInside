/**
 * Editorial narrative content — achievements, revealing moments, turning
 * points — for a representative pilot set of the 95-person roster.
 *
 * Kept as a SEPARATE map, merged onto `SEED_PEOPLE` by slug in `seed.ts`,
 * rather than inlined into `seed.ts`/`roster2.ts`/... directly: this is a
 * new, cross-cutting concern touching a small subset of people, and a
 * side-table merge means zero risk to the 11 existing roster files (which
 * `matching_v2`/scoring/eligibility all depend on) while this is authored
 * and reviewed. `PersonSeed`/`build()` are completely untouched.
 *
 * Every `textKey`/`interpretationKey` here MUST have a real entry in
 * `EDITORIAL_EN` (`src/core/i18n/editorial.ts`) — checked by
 * `editorialValidation.ts`. A Korean translation is a strong goal, not a
 * hard requirement: an item with no `EDITORIAL_KO` entry is simply omitted
 * on `/ko-KR`, per `editorialText()`'s locale-strict, no-fallback design.
 *
 * `sourceIds` on every item are a real subset of that person's own
 * `Person.sources` ids (see each roster file's `sources: [...]`) — no new,
 * dangling source reference is introduced here.
 */
import type { PersonEditorial } from "../../core/types.js";

export const PERSON_EDITORIAL: Record<string, PersonEditorial> = {
  // Life Arc Backfill Batch 1 (2026-08): 6 beats. Birthplace (Vinci, near
  // Florence), the Verrocchio apprenticeship start (~1466, derived from "age
  // 14" + birth year 1452), the Milan move year (1482), the Mona Lisa start
  // year (1503), the move to France (1516), and the death location (Clos
  // Lucé, near Amboise) were not preserved anywhere in this profile before
  // now (P2) -- verified directly against src_davinci_wikipedia (live
  // fetch, not memory) per this batch's provenance rule, since the
  // person-specific instruction for this profile was to use factual
  // career/location/work milestones rather than bare birth/death beats.
  // The dissection/notebook and Mona Lisa-adjustment facts were already
  // preserved (achievement.1/3, turning_point.1, moment.2) and are reused
  // as-is (P1), not re-researched.
  "leonardo-da-vinci": {
    achievements: [
      { id: "leonardo-da-vinci-achievement-1", textKey: "leonardo-da-vinci.achievement.1", sourceIds: ["src_davinci_biography"] },
      { id: "leonardo-da-vinci-achievement-2", textKey: "leonardo-da-vinci.achievement.2", sourceIds: ["src_davinci_wikipedia"] },
      { id: "leonardo-da-vinci-achievement-3", textKey: "leonardo-da-vinci.achievement.3", sourceIds: ["src_davinci_biography"] },
    ],
    moments: [
      {
        id: "leonardo-da-vinci-moment-1",
        textKey: "leonardo-da-vinci.moment.1",
        interpretationKey: "leonardo-da-vinci.interpretation.moment.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_davinci_biography"],
      },
      { id: "leonardo-da-vinci-moment-2", textKey: "leonardo-da-vinci.moment.2", sourceIds: ["src_davinci_biography", "src_davinci_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "leonardo-da-vinci-turning-point-1",
        textKey: "leonardo-da-vinci.turning_point.1",
        interpretationKey: "leonardo-da-vinci.interpretation.turning_point.1",
        attributeId: "belief_updating",
        sourceIds: ["src_davinci_biography"],
      },
    ],
    lifeArc: [
      { year: "1452", textKey: "leonardo-da-vinci.life_arc.1", sourceIds: ["src_davinci_wikipedia"] },
      { year: "c. 1466", textKey: "leonardo-da-vinci.life_arc.2", sourceIds: ["src_davinci_wikipedia"] },
      { year: "1482", textKey: "leonardo-da-vinci.life_arc.3", sourceIds: ["src_davinci_wikipedia", "src_davinci_biography"] },
      { year: "1503", textKey: "leonardo-da-vinci.life_arc.4", sourceIds: ["src_davinci_wikipedia"] },
      { year: "1516", textKey: "leonardo-da-vinci.life_arc.5", sourceIds: ["src_davinci_wikipedia"] },
      { year: "1519", textKey: "leonardo-da-vinci.life_arc.6", sourceIds: ["src_davinci_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 1 (2026-08): 6 beats. The 1898 discovery year
  // for polonium and radium was not preserved anywhere in this profile (the
  // existing moment.1/achievement.2 describe the pitchblende-processing
  // labor and the discovery itself but give no year) -- P2, verified
  // directly against src_curie_wikipedia (live fetch: "In July 1898...
  // announcing...'polonium'"; "On 26 December 1898...a second element...
  // 'radium'"). Birth/death beats left bare per the minimal-evidence
  // principle -- birthplace was not worth a separate verification pass for
  // this profile's orientation value.
  "marie-curie": {
    achievements: [
      { id: "marie-curie-achievement-1", textKey: "marie-curie.achievement.1", sourceIds: ["src_curie_wikipedia"] },
      { id: "marie-curie-achievement-2", textKey: "marie-curie.achievement.2", sourceIds: ["src_curie_wikipedia"] },
      { id: "marie-curie-achievement-3", textKey: "marie-curie.achievement.3", sourceIds: ["src_curie_biography"] },
    ],
    moments: [
      {
        id: "marie-curie-moment-1",
        textKey: "marie-curie.moment.1",
        interpretationKey: "marie-curie.interpretation.moment.1",
        attributeId: "discipline",
        sourceIds: ["src_curie_biography"],
      },
      { id: "marie-curie-moment-2", textKey: "marie-curie.moment.2", sourceIds: ["src_curie_biography", "src_curie_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "marie-curie-turning-point-1",
        textKey: "marie-curie.turning_point.1",
        interpretationKey: "marie-curie.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_curie_biography"],
      },
    ],
    lifeArc: [
      { year: "1867", textKey: "marie-curie.life_arc.1", sourceIds: ["src_curie_wikipedia"] },
      { year: "1898", textKey: "marie-curie.life_arc.2", sourceIds: ["src_curie_wikipedia"] },
      { year: "1903", textKey: "marie-curie.life_arc.3", sourceIds: ["src_curie_wikipedia"] },
      { year: "1906", textKey: "marie-curie.life_arc.4", sourceIds: ["src_curie_biography"] },
      { year: "1911", textKey: "marie-curie.life_arc.5", sourceIds: ["src_curie_wikipedia"] },
      { year: "1934", textKey: "marie-curie.life_arc.6", sourceIds: ["src_curie_wikipedia"] },
    ],
  },

  "ada-lovelace": {
    achievements: [
      { id: "ada-lovelace-achievement-1", textKey: "ada-lovelace.achievement.1", sourceIds: ["src_lovelace_wikipedia"] },
      {
        id: "ada-lovelace-achievement-2",
        textKey: "ada-lovelace.achievement.2",
        interpretationKey: "ada-lovelace.interpretation.achievement.2",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_lovelace_biography"],
      },
    ],
    moments: [
      { id: "ada-lovelace-moment-1", textKey: "ada-lovelace.moment.1", sourceIds: ["src_lovelace_wikipedia"] },
      { id: "ada-lovelace-moment-2", textKey: "ada-lovelace.moment.2", sourceIds: ["src_lovelace_biography"] },
    ],
    turningPoints: [
      { id: "ada-lovelace-turning-point-1", textKey: "ada-lovelace.turning_point.1", sourceIds: ["src_lovelace_biography"] },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact already preserved in achievements/moments/turning
    // points above (the ~1832 Babbage-meeting age is arithmetic on the
    // already-preserved "seventeen-year-old" + birthYear 1815, not new
    // research). No new verification performed for this profile.
    lifeArc: [
      { year: "1815", textKey: "ada-lovelace.life_arc.1", sourceIds: ["src_lovelace_wikipedia"] },
      { year: "Teens", textKey: "ada-lovelace.life_arc.2", sourceIds: ["src_lovelace_biography"] },
      { year: "c. 1832", textKey: "ada-lovelace.life_arc.3", sourceIds: ["src_lovelace_biography"] },
      { year: "1843", textKey: "ada-lovelace.life_arc.4", sourceIds: ["src_lovelace_wikipedia"] },
      { year: "1843", textKey: "ada-lovelace.life_arc.5", sourceIds: ["src_lovelace_biography"] },
      { year: "1852", textKey: "ada-lovelace.life_arc.6", sourceIds: ["src_lovelace_wikipedia"] },
    ],
  },

  "yi-sun-sin": {
    achievements: [
      { id: "yi-sun-sin-achievement-1", textKey: "yi-sun-sin.achievement.1", sourceIds: ["src_yisunsin_wikipedia"] },
      { id: "yi-sun-sin-achievement-2", textKey: "yi-sun-sin.achievement.2", sourceIds: ["src_yisunsin_wikipedia"] },
      {
        id: "yi-sun-sin-achievement-3",
        textKey: "yi-sun-sin.achievement.3",
        interpretationKey: "yi-sun-sin.interpretation.achievement.3",
        attributeId: "resourcefulness",
        sourceIds: ["src_yisunsin_wikipedia"],
      },
    ],
    moments: [
      { id: "yi-sun-sin-moment-1", textKey: "yi-sun-sin.moment.1", sourceIds: ["src_yisunsin_biography"] },
    ],
    turningPoints: [
      {
        id: "yi-sun-sin-turning-point-1",
        textKey: "yi-sun-sin.turning_point.1",
        interpretationKey: "yi-sun-sin.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_yisunsin_wikipedia", "src_yisunsin_biography"],
      },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats, entirely P1 -- the
    // demotion (life_arc.4) and Myeongnyang (life_arc.5) years are both
    // anchored to 1597, already stated in achievement.3 ("At the 1597
    // Battle of Myeongnyang") and directly implied by turning_point.1's
    // "His replacement lost most of the fleet soon after" sequencing. No
    // new research; per the person-specific instruction, battles are
    // described no more dramatically than the existing text already
    // supports.
    lifeArc: [
      { year: "1545", textKey: "yi-sun-sin.life_arc.1", sourceIds: ["src_yisunsin_wikipedia"] },
      { year: "Before 1592", textKey: "yi-sun-sin.life_arc.2", sourceIds: ["src_yisunsin_wikipedia"] },
      { year: "1592–1598", textKey: "yi-sun-sin.life_arc.3", sourceIds: ["src_yisunsin_wikipedia"] },
      { year: "1597", textKey: "yi-sun-sin.life_arc.4", sourceIds: ["src_yisunsin_wikipedia"] },
      { year: "1597", textKey: "yi-sun-sin.life_arc.5", sourceIds: ["src_yisunsin_wikipedia"] },
      { year: "1598", textKey: "yi-sun-sin.life_arc.6", sourceIds: ["src_yisunsin_wikipedia"] },
    ],
  },

  // Profile Quality Normalization Batch B (2026-08): added legacy. Her
  // achievement.1 already notes recognition came "well after her death" --
  // this profile otherwise never says what that posthumous reception
  // actually was, and without it a reader has no way to understand why a
  // painter with one Achievement, two Moments, and no exhibitions/awards
  // recorded in this profile during her own lifetime belongs in the
  // roster at all. Deliberately distinguishes her own work (already
  // covered in achievement.1 -- pain, identity, the body) from LATER
  // reception/iconization, per this task's explicit instruction not to
  // project later meanings backward onto her own intentions.
  //
  // Provenance-closure remediation (2026-08, same batch): the original
  // comment named sources fetched but didn't tie each published claim to
  // the specific source that verified it -- itemized below, per claim.
  // - "reached a wide audience...after" the 1982 Whitechapel retrospective
  //   AND Herrera's 1983 biography: Peter Wollen, "Fridamania," New Left
  //   Review 22 (src_kahlo_nlr, fetched 2026-08, PDF). Wollen -- the
  //   exhibition's own co-curator -- writes it was "the conjunction of
  //   these two events, the exhibition and the book, that sparked off"
  //   her international rise. This is the actual support for BOTH halves
  //   of that clause; src_kahlo_biography (the book itself) cannot
  //   evidence its own reception, so it is not the operative source here
  //   even though it remains attached (it does support that the book
  //   exists, is hers, and is dated 1983).
  // - The 2002 film Frida (Salma Hayek), adapted from Herrera's biography:
  //   Wikipedia's dedicated article on the biography itself (fetched
  //   2026-08) -- a different page from her main src_kahlo_wikipedia
  //   article, which a direct fetch this session did not confirm contains
  //   this fact (it has a "Posthumous recognition and 'Fridamania'"
  //   section, but repeated fetch attempts truncated before reaching it).
  //   Added as a new dedicated source, src_kahlo_herrera_film, since
  //   that's where this specific fact was actually verified.
  // - "Symbol of Mexican national identity and...feminist art movements":
  //   her main Wikipedia article (src_kahlo_wikipedia, re-fetched 2026-08)
  //   states plainly, "By the early 1990s...she was...regarded as an icon
  //   for Chicanos, the feminism movement, and the LGBTQ+ community." This
  //   profile's wording is narrower than that (omits the LGBTQ+ clause,
  //   not otherwise evidenced in this person's preserved record) rather
  //   than broader than what was verified.
  // - The November 2025 auction record ($54.7M, El Sueño (La Cama)):
  //   Smithsonian Magazine (src_kahlo_auction2025, fetched 2026-08) --
  //   stated as the highest price reported, without the inflation-
  //   adjusted O'Keeffe comparison the same source itself raises, since
  //   that nuance doesn't change the plain claim being made (posthumous
  //   market value, not a precise historical ranking).
  "frida-kahlo": {
    achievements: [
      { id: "frida-kahlo-achievement-1", textKey: "frida-kahlo.achievement.1", sourceIds: ["src_kahlo_wikipedia"] },
    ],
    moments: [
      {
        id: "frida-kahlo-moment-1",
        textKey: "frida-kahlo.moment.1",
        interpretationKey: "frida-kahlo.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_kahlo_biography"],
      },
      { id: "frida-kahlo-moment-2", textKey: "frida-kahlo.moment.2", sourceIds: ["src_kahlo_biography"] },
    ],
    turningPoints: [
      { id: "frida-kahlo-turning-point-1", textKey: "frida-kahlo.turning_point.1", sourceIds: ["src_kahlo_biography", "src_kahlo_wikipedia"] },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 5 beats (not forced to 6), all
    // P1 -- reuses moment.1/2 and turning_point.1 as-is. "Soon after" and
    // "Mature work" are relative labels, not invented years: no exact date
    // for the Rivera approach or her stylistic maturity is preserved
    // anywhere in this profile, and per the minimal-evidence principle this
    // batch does not perform new research to manufacture one. The
    // posthumous-recognition timeline (1982 retrospective, 1983 biography,
    // 2025 auction) already lives in `legacy` and is deliberately not
    // duplicated into lifeArc, which ends on her own death per house style.
    lifeArc: [
      { year: "1907", textKey: "frida-kahlo.life_arc.1", sourceIds: ["src_kahlo_wikipedia"] },
      { year: "1925", textKey: "frida-kahlo.life_arc.2", sourceIds: ["src_kahlo_biography", "src_kahlo_wikipedia"] },
      { year: "Soon after", textKey: "frida-kahlo.life_arc.3", sourceIds: ["src_kahlo_biography"] },
      { year: "Mature work", textKey: "frida-kahlo.life_arc.4", sourceIds: ["src_kahlo_wikipedia"] },
      { year: "1954", textKey: "frida-kahlo.life_arc.5", sourceIds: ["src_kahlo_wikipedia"] },
    ],
    legacy: {
      textKey: "frida-kahlo.legacy",
      sourceIds: ["src_kahlo_wikipedia", "src_kahlo_biography", "src_kahlo_nlr", "src_kahlo_auction2025", "src_kahlo_herrera_film"],
    },
  },

  "nelson-mandela": {
    achievements: [
      { id: "nelson-mandela-achievement-1", textKey: "nelson-mandela.achievement.1", sourceIds: ["src_mandela_wikipedia"] },
      { id: "nelson-mandela-achievement-2", textKey: "nelson-mandela.achievement.2", sourceIds: ["src_mandela_wikipedia"] },
    ],
    moments: [
      {
        id: "nelson-mandela-moment-1",
        textKey: "nelson-mandela.moment.1",
        interpretationKey: "nelson-mandela.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_mandela_biography"],
      },
      {
        id: "nelson-mandela-moment-2",
        textKey: "nelson-mandela.moment.2",
        interpretationKey: "nelson-mandela.interpretation.moment.2",
        attributeId: "proactive_agency",
        sourceIds: ["src_mandela_biography"],
      },
    ],
    turningPoints: [
      { id: "nelson-mandela-turning-point-1", textKey: "nelson-mandela.turning_point.1", sourceIds: ["src_mandela_biography", "src_mandela_wikipedia"] },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats. The 1962 arrest year
    // (the start of his "27 years" already stated in achievement.1) was not
    // preserved anywhere in this profile -- P2, verified directly against
    // src_mandela_wikipedia (live fetch: "In 1962, he was arrested for
    // conspiring to overthrow the state and sentenced to life imprisonment
    // in the Rivonia Trial... released him in 1990... 27 years (1962-1990)").
    // All other beats reuse already-preserved facts (moment.1,
    // turning_point.1, achievement.1/2) as-is.
    lifeArc: [
      { year: "1918", textKey: "nelson-mandela.life_arc.1", sourceIds: ["src_mandela_wikipedia"] },
      { year: "1962", textKey: "nelson-mandela.life_arc.2", sourceIds: ["src_mandela_wikipedia"] },
      { year: "Robben Island", textKey: "nelson-mandela.life_arc.3", sourceIds: ["src_mandela_biography"] },
      { year: "1990", textKey: "nelson-mandela.life_arc.4", sourceIds: ["src_mandela_biography", "src_mandela_wikipedia"] },
      { year: "1994", textKey: "nelson-mandela.life_arc.5", sourceIds: ["src_mandela_wikipedia"] },
      { year: "2013", textKey: "nelson-mandela.life_arc.6", sourceIds: ["src_mandela_wikipedia"] },
    ],
  },

  "albert-einstein": {
    achievements: [
      { id: "albert-einstein-achievement-1", textKey: "albert-einstein.achievement.1", sourceIds: ["src_einstein_isaacson"] },
      { id: "albert-einstein-achievement-2", textKey: "albert-einstein.achievement.2", sourceIds: ["src_einstein_isaacson"] },
      { id: "albert-einstein-achievement-3", textKey: "albert-einstein.achievement.3", sourceIds: ["src_einstein_wikipedia"] },
    ],
    moments: [
      { id: "albert-einstein-moment-1", textKey: "albert-einstein.moment.1", sourceIds: ["src_einstein_isaacson"] },
    ],
    turningPoints: [
      {
        id: "albert-einstein-turning-point-1",
        textKey: "albert-einstein.turning_point.1",
        interpretationKey: "albert-einstein.interpretation.turning_point.1",
        attributeId: "belief_updating",
        sourceIds: ["src_einstein_isaacson", "src_einstein_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats. His 1933 emigration year
    // was not preserved anywhere in this profile -- P2, verified directly
    // against src_einstein_wikipedia (live fetch: "while Einstein was
    // visiting the United States, Adolf Hitler came to power," and he
    // emigrated in 1933, "horrified by the Nazi persecution of his fellow
    // Jews"). Per this batch's person-specific instruction, the arc balances
    // two science beats (1905, 1915) against two major life/historical
    // beats (1933 emigration, 1939 Szilard letter) rather than listing
    // physics achievements; the Nobel Prize and the late-life quantum-
    // mechanics/unified-field-theory turning point were deliberately left
    // out as less orientation-critical within a 6-beat budget.
    lifeArc: [
      { year: "1879", textKey: "albert-einstein.life_arc.1", sourceIds: ["src_einstein_wikipedia"] },
      { year: "1905", textKey: "albert-einstein.life_arc.2", sourceIds: ["src_einstein_isaacson"] },
      { year: "1915", textKey: "albert-einstein.life_arc.3", sourceIds: ["src_einstein_isaacson"] },
      { year: "1933", textKey: "albert-einstein.life_arc.4", sourceIds: ["src_einstein_wikipedia"] },
      { year: "1939", textKey: "albert-einstein.life_arc.5", sourceIds: ["src_einstein_wikipedia"] },
      { year: "1955", textKey: "albert-einstein.life_arc.6", sourceIds: ["src_einstein_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): D-CAUTION profile,
  // dedicated attribution review performed. Birth year/place (c. 1412,
  // Domrémy) and the campaign chronology (Orléans, Reims coronation,
  // capture, trial, execution -- all 1429-1431) are P2, verified directly
  // against src_joanofarc_wikipedia (live fetch), which itself attributes
  // the visions to her own testimony rather than narrating them as
  // established fact ("Joan later testified that...", "she stated that
  // she had these visions..."). life_arc.2 mirrors that exact discipline
  // ("Testified that visions had directed her...") rather than stating
  // she experienced visions as settled biographical fact. No beat
  // narrates a canonization-era framing -- the arc ends at her 1431
  // execution, not at any later (1456 nullification, 1920 canonization)
  // event, per the person-specific instruction not to fold canonization
  // into her own life chronology. life_arc.5's account of the male-clothing
  // charge already matches this profile's own preserved turning_point.1 --
  // P1, not restated verbatim, only referenced for chronological
  // orientation. Attribution review caught one internal inconsistency: the
  // fresh Wikipedia fetch described the Orléans wounding as an "arrow,"
  // but this profile's own already-published moment.2 (P1, sourced to
  // src_joanofarc_nullification) says "crossbow bolt" -- life_arc.3
  // corrected to match the existing P1 claim rather than the new P2
  // source, per "prefer P1 where equally useful," sourceIds updated to
  // cite the nullification-trial source accordingly.
  "joan-of-arc": {
    achievements: [
      { id: "joan-of-arc-achievement-1", textKey: "joan-of-arc.achievement.1", sourceIds: ["src_joanofarc_wikipedia", "src_joanofarc_nullification"] },
      { id: "joan-of-arc-achievement-2", textKey: "joan-of-arc.achievement.2", sourceIds: ["src_joanofarc_wikipedia"] },
    ],
    moments: [
      { id: "joan-of-arc-moment-1", textKey: "joan-of-arc.moment.1", sourceIds: ["src_joanofarc_nullification"] },
      { id: "joan-of-arc-moment-2", textKey: "joan-of-arc.moment.2", sourceIds: ["src_joanofarc_nullification"] },
      { id: "joan-of-arc-moment-3", textKey: "joan-of-arc.moment.3", sourceIds: ["src_joanofarc_trial"] },
    ],
    turningPoints: [
      {
        id: "joan-of-arc-turning-point-1",
        textKey: "joan-of-arc.turning_point.1",
        interpretationKey: "joan-of-arc.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_joanofarc_trial"],
      },
    ],
    lifeArc: [
      { year: "c. 1412", textKey: "joan-of-arc.life_arc.1", sourceIds: ["src_joanofarc_wikipedia"] },
      { year: "1429", textKey: "joan-of-arc.life_arc.2", sourceIds: ["src_joanofarc_wikipedia", "src_joanofarc_trial"] },
      { year: "1429", textKey: "joan-of-arc.life_arc.3", sourceIds: ["src_joanofarc_nullification", "src_joanofarc_wikipedia"] },
      { year: "1429", textKey: "joan-of-arc.life_arc.4", sourceIds: ["src_joanofarc_wikipedia"] },
      { year: "1430–1431", textKey: "joan-of-arc.life_arc.5", sourceIds: ["src_joanofarc_wikipedia", "src_joanofarc_trial"] },
      { year: "1431", textKey: "joan-of-arc.life_arc.6", sourceIds: ["src_joanofarc_wikipedia"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.1 (Gallipoli)
  // moved to turning_point.2 -- a single battlefield episode/quote, not a
  // career-level body of work; it marks the point his career pivoted from
  // relative obscurity toward national prominence, which is what Turning
  // Point exists for. This leaves the profile with a single achievement
  // (the Republic/reforms), which is acceptable for a concentrated case per
  // the Achievement standard, but this batch's brief for this person was
  // limited to the move only -- a richer replacement achievement describing
  // his specific reforms (this person's own evidence ledger,
  // src/dev/roster1000/production/session19/mustafa-kemal-ataturk/, has
  // ample material for one: alphabet reform, legal code, women's suffrage)
  // was out of scope here and is left for a future pass. achievement.2 is
  // unrelated and left untouched.
  //
  // Release-blocker fix (2026-08, same batch): turning_point.2's move had
  // carried over its achievement-era sourceIds verbatim, one of which --
  // src_ataturk_belleten_libya, "Beginnings of Leadership: Mustafa Kemal's
  // First Visit to Libya, 1908" -- does not support a claim about the 1915
  // Gallipoli campaign at all; it's about an unrelated 1908 episode.
  // Re-verified directly against this person's own session19 research file
  // (src/dev/roster1000/production/session19/mustafa-kemal-ataturk/
  // rawNotes.md, episode-cited [SEARCH-AGG, MANGO]): every clause in the
  // rewritten text below traces to that file. Two corrections beyond the
  // sourceId itself: (1) "a relatively junior officer" was dropped -- that
  // phrase belongs to a DIFFERENT episode in this person's own evidence
  // (co-founding a secret society in 1905, per the candidate JSON's
  // independent_thinking/proactive_agency rationale), not to Gallipoli,
  // where he in fact commanded the Ottoman 19th Division; (2) "Most of the
  // regiment were killed in the resulting engagement" was added back --
  // the source states this directly, and omitting it understated the cost
  // of the order the quote describes. src_ataturk_kinross was dropped from
  // sourceIds: this person's own research file cites Kinross for a
  // different characterization (Gallipoli performance attributed to
  // "anticipatory reasoning," a separate bullet) than the specific facts
  // asserted here, which the file itself attributes only to Mango.
  // Profile Quality Normalization Batch B (2026-08): added achievement.3 --
  // the reform program (civil/penal code, alphabet reform, women's
  // suffrage), previously flagged in the comment above as "out of scope"
  // and "left for a future pass." This is genuinely distinct from
  // achievement.2 (founding the Republic/leading the national movement,
  // a political-military achievement) -- a decade-long legal/social
  // modernization program is a separate durable contribution, not a
  // restatement of the founding. Checked against turning_point.1 and
  // moment.1/moment.2 for duplication: turning_point.1 covers closing the
  // opposition party and the Sheikh Said Rebellion executions (political
  // suppression), not the reform program's own specific content, so no
  // overlap. Every claim traces to this person's own preserved evidence
  // file (src/dev/roster1000/production/session19/mustafa-kemal-ataturk/
  // rawNotes.md, Life Period 6 and the file's own "Key achievements" #3),
  // using existing sourceIds already on this person's record -- no new
  // research, no new source added.
  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats. Does NOT
  // reopen the Key Achievements Correction Batch 1 or Profile Quality
  // Normalization Batch B decisions above (nothing in those comments or
  // the achievements/moments/turningPoints arrays touched). Gallipoli
  // (life_arc.3) is stated as one beat among six, not the arc's climax --
  // consistent with the person-specific instruction that it not stand in
  // for the whole achievement. The 1925 opposition-party closure
  // (turning_point.1, P1) is referenced briefly in life_arc.5 for
  // chronological orientation, per the instruction that this material not
  // be silently erased where relevant -- kept to one clause, not expanded
  // into a Complexity-style treatment. Military education years (1899
  // enrollment, 1905 graduation) and the exact death date/location were
  // P2, verified directly against a live Wikipedia fetch; this person's
  // own `sources` array has no plain Wikipedia entry, so these beats cite
  // src_ataturk_mango (Andrew Mango's full-life biography, already used
  // elsewhere on this profile) as the general-chronology source rather
  // than inventing an id not in this person's own source list.
  "mustafa-kemal-ataturk": {
    achievements: [
      { id: "mustafa-kemal-ataturk-achievement-2", textKey: "mustafa-kemal-ataturk.achievement.2", sourceIds: ["src_ataturk_mango", "src_ataturk_nutuk"] },
      { id: "mustafa-kemal-ataturk-achievement-3", textKey: "mustafa-kemal-ataturk.achievement.3", sourceIds: ["src_ataturk_mango", "src_ataturk_newlines"] },
    ],
    moments: [
      { id: "mustafa-kemal-ataturk-moment-1", textKey: "mustafa-kemal-ataturk.moment.1", sourceIds: ["src_ataturk_kinross"] },
      { id: "mustafa-kemal-ataturk-moment-2", textKey: "mustafa-kemal-ataturk.moment.2", sourceIds: ["src_ataturk_mango"] },
    ],
    turningPoints: [
      {
        id: "mustafa-kemal-ataturk-turning-point-1",
        textKey: "mustafa-kemal-ataturk.turning_point.1",
        interpretationKey: "mustafa-kemal-ataturk.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_ataturk_executed", "src_ataturk_mango"],
      },
      { id: "mustafa-kemal-ataturk-turning-point-2", textKey: "mustafa-kemal-ataturk.turning_point.2", sourceIds: ["src_ataturk_mango"] },
    ],
    lifeArc: [
      { year: "1881", textKey: "mustafa-kemal-ataturk.life_arc.1", sourceIds: ["src_ataturk_mango"] },
      { year: "1899–1905", textKey: "mustafa-kemal-ataturk.life_arc.2", sourceIds: ["src_ataturk_mango"] },
      { year: "1915", textKey: "mustafa-kemal-ataturk.life_arc.3", sourceIds: ["src_ataturk_mango", "src_ataturk_kinross"] },
      { year: "1919–1923", textKey: "mustafa-kemal-ataturk.life_arc.4", sourceIds: ["src_ataturk_mango", "src_ataturk_nutuk"] },
      { year: "1925–1934", textKey: "mustafa-kemal-ataturk.life_arc.5", sourceIds: ["src_ataturk_mango", "src_ataturk_executed", "src_ataturk_newlines"] },
      { year: "1938", textKey: "mustafa-kemal-ataturk.life_arc.6", sourceIds: ["src_ataturk_mango"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 5 beats -- a 6th
  // would have required inventing precision the record doesn't clearly
  // support for a distinct "later career" phase beyond the touring
  // company already covered. Per the person-specific instruction, The
  // Dying Swan (life_arc.3) is one beat, not a stand-in for her whole
  // career, and the final beat states her death plainly (pleurisy, The
  // Hague) without the "died for dance" framing her own preserved
  // turning_point.1 quote could invite -- that quote is not restated
  // here. A live Wikipedia fetch for the Imperial Ballet School admission
  // year (1891) and first Dying Swan performance (1905, choreographed by
  // Fokine) explicitly states no surgery-refusal is documented in that
  // source, unlike this profile's own turning_point.1 (P1, sourced
  // separately to src_pavlova_hh/src_pavlova_nwe) -- life_arc deliberately
  // does not restate that claim, consistent with the minimal-evidence
  // principle. This person's `sources` array has no plain Wikipedia
  // entry, so P2 beats cite src_pavlova_enc1 (an encyclopedia biography
  // already used for her other achievement items) as the
  // general-chronology source.
  "anna-pavlova": {
    achievements: [
      { id: "anna-pavlova-achievement-1", textKey: "anna-pavlova.achievement.1", sourceIds: ["src_pavlova_enc1"] },
      { id: "anna-pavlova-achievement-2", textKey: "anna-pavlova.achievement.2", sourceIds: ["src_pavlova_enc2", "src_pavlova_ebsco"] },
      { id: "anna-pavlova-achievement-3", textKey: "anna-pavlova.achievement.3", sourceIds: ["src_pavlova_enc1"] },
    ],
    moments: [
      { id: "anna-pavlova-moment-1", textKey: "anna-pavlova.moment.1", sourceIds: ["src_pavlova_enc1"] },
      {
        id: "anna-pavlova-moment-2",
        textKey: "anna-pavlova.moment.2",
        interpretationKey: "anna-pavlova.interpretation.moment.2",
        attributeId: "competitiveness",
        sourceIds: ["src_pavlova_enc1", "src_pavlova_hh"],
      },
    ],
    turningPoints: [
      {
        id: "anna-pavlova-turning-point-1",
        textKey: "anna-pavlova.turning_point.1",
        interpretationKey: "anna-pavlova.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_pavlova_hh", "src_pavlova_nwe"],
      },
    ],
    lifeArc: [
      { year: "1881", textKey: "anna-pavlova.life_arc.1", sourceIds: ["src_pavlova_enc1"] },
      { year: "1891", textKey: "anna-pavlova.life_arc.2", sourceIds: ["src_pavlova_enc1"] },
      { year: "1905", textKey: "anna-pavlova.life_arc.3", sourceIds: ["src_pavlova_enc1"] },
      { year: "1913", textKey: "anna-pavlova.life_arc.4", sourceIds: ["src_pavlova_enc2", "src_pavlova_ebsco"] },
      { year: "1931", textKey: "anna-pavlova.life_arc.5", sourceIds: ["src_pavlova_enc1"] },
    ],
  },

  // --- Tier-B backfill batch 1 (2026-08) ---

  "isaac-newton": {
    achievements: [
      { id: "isaac-newton-achievement-1", textKey: "isaac-newton.achievement.1", sourceIds: ["src_newton_westfall"] },
      { id: "isaac-newton-achievement-2", textKey: "isaac-newton.achievement.2", sourceIds: ["src_newton_wikipedia", "src_newton_westfall"] },
      { id: "isaac-newton-achievement-3", textKey: "isaac-newton.achievement.3", sourceIds: ["src_newton_royalsociety"] },
    ],
    moments: [
      {
        id: "isaac-newton-moment-1",
        textKey: "isaac-newton.moment.1",
        interpretationKey: "isaac-newton.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_newton_westfall"],
      },
      {
        id: "isaac-newton-moment-2",
        textKey: "isaac-newton.moment.2",
        interpretationKey: "isaac-newton.interpretation.moment.2",
        attributeId: "collaboration",
        sourceIds: ["src_newton_westfall", "src_newton_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "isaac-newton-turning-point-1",
        textKey: "isaac-newton.turning_point.1",
        interpretationKey: "isaac-newton.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_newton_westfall"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact and year already stated in achievements/turning
    // points above; life_arc.4's "mid-1690s" is arithmetic on
    // turning_point.1's already-preserved "in his mid-fifties" + birthYear
    // 1643, not new research. Per the person-specific instruction, the
    // apple anecdote is deliberately excluded as not well-grounded for a
    // Life Arc beat.
    lifeArc: [
      { year: "1643", textKey: "isaac-newton.life_arc.1", sourceIds: ["src_newton_wikipedia"] },
      { year: "1665–1667", textKey: "isaac-newton.life_arc.2", sourceIds: ["src_newton_westfall"] },
      { year: "1687", textKey: "isaac-newton.life_arc.3", sourceIds: ["src_newton_wikipedia", "src_newton_westfall"] },
      { year: "Mid-1690s", textKey: "isaac-newton.life_arc.4", sourceIds: ["src_newton_westfall"] },
      { year: "1703–1727", textKey: "isaac-newton.life_arc.5", sourceIds: ["src_newton_royalsociety"] },
      { year: "1727", textKey: "isaac-newton.life_arc.6", sourceIds: ["src_newton_wikipedia"] },
    ],
  },

  "harriet-tubman": {
    achievements: [
      { id: "harriet-tubman-achievement-1", textKey: "harriet-tubman.achievement.1", sourceIds: ["src_tubman_bradford", "src_tubman_wikipedia"] },
      { id: "harriet-tubman-achievement-2", textKey: "harriet-tubman.achievement.2", sourceIds: ["src_tubman_wikipedia"] },
    ],
    moments: [
      {
        id: "harriet-tubman-moment-1",
        textKey: "harriet-tubman.moment.1",
        interpretationKey: "harriet-tubman.interpretation.moment.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_tubman_bradford"],
      },
      {
        id: "harriet-tubman-moment-2",
        textKey: "harriet-tubman.moment.2",
        interpretationKey: "harriet-tubman.interpretation.moment.2",
        attributeId: "proactive_agency",
        sourceIds: ["src_tubman_wikipedia"],
      },
    ],
    turningPoints: [
      { id: "harriet-tubman-turning-point-1", textKey: "harriet-tubman.turning_point.1", sourceIds: ["src_tubman_bradford", "src_tubman_wikipedia"] },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. Birth year is genuinely
    // uncertain -- verified directly against src_tubman_wikipedia (live
    // fetch): "neither the exact year nor place of Tubman's birth is
    // known," with sources variously giving 1815/1820/1822/1825; the
    // roster's existing birthYear (1822) already matches the modern
    // scholarly consensus (Kate Larson, 2004), so NOT changed -- only
    // hedged with "c." in the beat itself, per the person-specific
    // instruction not to "correct" an already-defensible approximate year.
    // Her later women's-suffrage activity (life_arc.5) was not preserved
    // anywhere in this profile -- P2, verified against the same source
    // ("active in the women's suffrage movement until illness overtook
    // her"), but that source gives no specific years, so a relative label
    // is used rather than invented precision. life_arc.1 deliberately omits
    // a birthplace ("Maryland") since it was not verified this session and
    // the minimal-evidence principle doesn't require it for orientation.
    // achievement.1's own "roughly"/"approximately" hedges on trip/rescue
    // counts are preserved exactly in life_arc.3, not tightened into exact
    // statistics.
    lifeArc: [
      { year: "c. 1822", textKey: "harriet-tubman.life_arc.1", sourceIds: ["src_tubman_wikipedia"] },
      { year: "1849", textKey: "harriet-tubman.life_arc.2", sourceIds: ["src_tubman_bradford", "src_tubman_wikipedia"] },
      { year: "1850–1860", textKey: "harriet-tubman.life_arc.3", sourceIds: ["src_tubman_bradford", "src_tubman_wikipedia"] },
      { year: "1863", textKey: "harriet-tubman.life_arc.4", sourceIds: ["src_tubman_wikipedia"] },
      { year: "Later years", textKey: "harriet-tubman.life_arc.5", sourceIds: ["src_tubman_wikipedia"] },
      { year: "1913", textKey: "harriet-tubman.life_arc.6", sourceIds: ["src_tubman_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): D-CAUTION profile, dedicated
  // chronology/attribution review performed (see that review's own record
  // for the full pass). Birth year (624) and every regnal-transition date
  // below are P2, verified via a direct fetch of src_wuzetian_wikipedia --
  // not previously preserved anywhere in this profile's existing items,
  // which give the 690-705 reign span (achievement.1) but no earlier
  // chronology. The fetch explicitly flags the infanticide allegation
  // against her as a later (c. 400-years-post-mortem) hostile-chronicle
  // claim, not verified historical fact -- life_arc deliberately omits it
  // entirely, per the person-specific instruction. No purge/terror claims
  // are included, consistent with the same instruction. life_arc.2's
  // "Buddhist convent" interval and life_arc.4's Gaozong co-rule/regency
  // sequencing both come from the same fetch, not from the pre-existing
  // achievement/moment/turning-point items. No Complexity section added.
  "wu-zetian": {
    achievements: [
      { id: "wu-zetian-achievement-1", textKey: "wu-zetian.achievement.1", sourceIds: ["src_wuzetian_wikipedia", "src_wuzetian_history"] },
      { id: "wu-zetian-achievement-2", textKey: "wu-zetian.achievement.2", sourceIds: ["src_wuzetian_history"] },
      { id: "wu-zetian-achievement-3", textKey: "wu-zetian.achievement.3", sourceIds: ["src_wuzetian_origins"] },
    ],
    moments: [
      {
        id: "wu-zetian-moment-1",
        textKey: "wu-zetian.moment.1",
        interpretationKey: "wu-zetian.interpretation.moment.1",
        attributeId: "adaptability",
        sourceIds: ["src_wuzetian_history"],
      },
      { id: "wu-zetian-moment-2", textKey: "wu-zetian.moment.2", sourceIds: ["src_wuzetian_history", "src_wuzetian_origins"] },
    ],
    turningPoints: [
      {
        id: "wu-zetian-turning-point-1",
        textKey: "wu-zetian.turning_point.1",
        interpretationKey: "wu-zetian.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_wuzetian_wikipedia", "src_wuzetian_origins"],
      },
    ],
    lifeArc: [
      { year: "624", textKey: "wu-zetian.life_arc.1", sourceIds: ["src_wuzetian_wikipedia"] },
      { year: "c. 650", textKey: "wu-zetian.life_arc.2", sourceIds: ["src_wuzetian_wikipedia"] },
      { year: "655", textKey: "wu-zetian.life_arc.3", sourceIds: ["src_wuzetian_wikipedia"] },
      { year: "660s–683", textKey: "wu-zetian.life_arc.4", sourceIds: ["src_wuzetian_wikipedia"] },
      { year: "690", textKey: "wu-zetian.life_arc.5", sourceIds: ["src_wuzetian_wikipedia", "src_wuzetian_history", "src_wuzetian_origins"] },
      { year: "705", textKey: "wu-zetian.life_arc.6", sourceIds: ["src_wuzetian_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): D-CAUTION profile, dedicated
  // chronology/attribution review performed. Birth year (1126) and death
  // year (1198) were already implicit in this profile's own achievement/
  // turning-point text but not given as a beat-worthy timeline; verified
  // P2 via a direct fetch of src_averroes_sep (Stanford Encyclopedia of
  // Philosophy). That source is explicit that his judicial-appointment
  // dates (Seville, then chief qadi of Córdoba) and his exile date are NOT
  // documented -- life_arc.2/3 deliberately use relative labels ("Early
  // career", "Under Caliph Abu Yaqub Yusuf (r. 1163-1184)") rather than
  // inventing exact years, and life_arc.3 explicitly notes his judicial
  // roles spanned "multiple Almohad rulers" rather than implying they
  // fell within this one caliph's reign just because that reign anchors
  // the beat's year label. life_arc.6 preserves the source's own hedge
  // ("According to one account...") on his 1198 death in Marrakesh; an
  // earlier draft of this beat added an unverified "recalled from exile
  // before death" claim not actually present in the fetched source --
  // caught on review and removed rather than left as smuggled-in general
  // knowledge. No later "Latin Averroism" reading is projected onto his
  // own intentions anywhere in this arc.
  averroes: {
    achievements: [
      { id: "averroes-achievement-1", textKey: "averroes.achievement.1", sourceIds: ["src_averroes_sep"] },
      { id: "averroes-achievement-2", textKey: "averroes.achievement.2", sourceIds: ["src_averroes_sep"] },
      { id: "averroes-achievement-3", textKey: "averroes.achievement.3", sourceIds: ["src_averroes_wikipedia", "src_averroes_sep"] },
    ],
    moments: [
      { id: "averroes-moment-1", textKey: "averroes.moment.1", sourceIds: ["src_averroes_sep"] },
    ],
    turningPoints: [
      {
        id: "averroes-turning-point-1",
        textKey: "averroes.turning_point.1",
        interpretationKey: "averroes.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_averroes_wikipedia", "src_averroes_sep"],
      },
    ],
    lifeArc: [
      { year: "1126", textKey: "averroes.life_arc.1", sourceIds: ["src_averroes_sep"] },
      { year: "Early career", textKey: "averroes.life_arc.2", sourceIds: ["src_averroes_sep"] },
      { year: "Under Caliph Abu Yaqub Yusuf (r. 1163–1184)", textKey: "averroes.life_arc.3", sourceIds: ["src_averroes_sep"] },
      { year: "Over the following decades", textKey: "averroes.life_arc.4", sourceIds: ["src_averroes_sep"] },
      { year: "Late in his life", textKey: "averroes.life_arc.5", sourceIds: ["src_averroes_sep"] },
      { year: "1198", textKey: "averroes.life_arc.6", sourceIds: ["src_averroes_sep"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.1 (the
  // Rubicon) moved to turning_point.2 -- a single dated, irreversible act
  // with a clear before/after (Roman general under Senate authority ->
  // civil war, end of the Republic), not a body of work. Text and
  // sourceIds unchanged; this person's own data-pipeline candidate
  // (data-pipeline/candidates/julius-caesar.json, decisiveness/
  // risk_tolerance rows) already frames it as exactly this kind of single
  // decisive act, so no new claim was introduced. achievement.2 and
  // achievement.3 (the calendar reform, the Gallic campaign) are unrelated
  // and left untouched, per this task's scope.
  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): D-CAUTION profile,
  // dedicated chronology review performed. Magistracy/governorship years,
  // the Gallic Wars span, the dictator/dictator-perpetuo dates, and the
  // exact assassination date/location are P2, verified directly against
  // src_caesar_wikipedia (live fetch). No beat uses embellished
  // Shakespearean phrasing ("et tu, Brute" and similar do not appear
  // anywhere in this arc) -- life_arc.6 states the assassination plainly
  // ("Assassinated by a group of senators on the Ides of March") without
  // dramatization, and no casualty figures are stated or implied anywhere
  // in the arc, consistent with the instruction not to manufacture
  // casualty precision. No beat asserts a specific psychological motive
  // for the Rubicon crossing or the dictatorship.
  "julius-caesar": {
    achievements: [
      { id: "julius-caesar-achievement-2", textKey: "julius-caesar.achievement.2", sourceIds: ["src_caesar_wikipedia"] },
      { id: "julius-caesar-achievement-3", textKey: "julius-caesar.achievement.3", sourceIds: ["src_caesar_commentaries"] },
    ],
    moments: [
      { id: "julius-caesar-moment-1", textKey: "julius-caesar.moment.1", sourceIds: ["src_caesar_suetonius"] },
      { id: "julius-caesar-moment-2", textKey: "julius-caesar.moment.2", sourceIds: ["src_caesar_suetonius"] },
    ],
    turningPoints: [
      {
        id: "julius-caesar-turning-point-1",
        textKey: "julius-caesar.turning_point.1",
        interpretationKey: "julius-caesar.interpretation.turning_point.1",
        attributeId: "collaboration",
        sourceIds: ["src_caesar_wikipedia", "src_caesar_plutarch"],
      },
      { id: "julius-caesar-turning-point-2", textKey: "julius-caesar.turning_point.2", sourceIds: ["src_caesar_suetonius", "src_caesar_plutarch"] },
    ],
    lifeArc: [
      { year: "100 BCE", textKey: "julius-caesar.life_arc.1", sourceIds: ["src_caesar_wikipedia"] },
      { year: "69–58 BCE", textKey: "julius-caesar.life_arc.2", sourceIds: ["src_caesar_wikipedia"] },
      { year: "58–51 BCE", textKey: "julius-caesar.life_arc.3", sourceIds: ["src_caesar_commentaries", "src_caesar_wikipedia"] },
      { year: "49 BCE", textKey: "julius-caesar.life_arc.4", sourceIds: ["src_caesar_wikipedia", "src_caesar_suetonius"] },
      { year: "49–44 BCE", textKey: "julius-caesar.life_arc.5", sourceIds: ["src_caesar_wikipedia"] },
      { year: "44 BCE", textKey: "julius-caesar.life_arc.6", sourceIds: ["src_caesar_wikipedia", "src_caesar_suetonius", "src_caesar_plutarch"] },
    ],
  },

  "jane-austen": {
    achievements: [
      { id: "jane-austen-achievement-1", textKey: "jane-austen.achievement.1", sourceIds: ["src_austen_tomalin"] },
      { id: "jane-austen-achievement-2", textKey: "jane-austen.achievement.2", sourceIds: ["src_austen_tomalin"] },
    ],
    moments: [
      {
        id: "jane-austen-moment-1",
        textKey: "jane-austen.moment.1",
        interpretationKey: "jane-austen.interpretation.moment.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_austen_tomalin"],
      },
      { id: "jane-austen-moment-2", textKey: "jane-austen.moment.2", sourceIds: ["src_austen_letters"] },
    ],
    turningPoints: [
      { id: "jane-austen-turning-point-1", textKey: "jane-austen.turning_point.1", sourceIds: ["src_austen_tomalin", "src_austen_wikipedia"] },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats. Her first novel's
    // publication year (1811, Sense and Sensibility) was not preserved
    // anywhere in this profile -- P2, verified directly against
    // src_austen_wikipedia (live fetch: "Sense and Sensibility appeared in
    // October 1811," published anonymously as "By a Lady"). life_arc.5's
    // 1813 date for Pride and Prejudice is arithmetic on turning_point.1's
    // already-preserved "1797" rejection + "revising it... over the next
    // sixteen years," not new research (also confirmed by the same fetch).
    // Per the person-specific instruction, publication chronology is kept
    // factual and anonymous publication is framed as publishing context,
    // not personality.
    lifeArc: [
      { year: "1775", textKey: "jane-austen.life_arc.1", sourceIds: ["src_austen_wikipedia"] },
      { year: "1797", textKey: "jane-austen.life_arc.2", sourceIds: ["src_austen_tomalin", "src_austen_wikipedia"] },
      { year: "1802", textKey: "jane-austen.life_arc.3", sourceIds: ["src_austen_tomalin"] },
      { year: "1811", textKey: "jane-austen.life_arc.4", sourceIds: ["src_austen_wikipedia", "src_austen_tomalin"] },
      { year: "1813", textKey: "jane-austen.life_arc.5", sourceIds: ["src_austen_tomalin", "src_austen_wikipedia"] },
      { year: "1817", textKey: "jane-austen.life_arc.6", sourceIds: ["src_austen_wikipedia", "src_austen_tomalin"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats. The
  // Zapotec-origins/orphaned-childhood fact (achievement.1), the French
  // intervention span (achievement.2), and the Maximilian trial/execution
  // (moment.1/turning_point.1) were already preserved -- P1. Governorship
  // years, the 1858 presidency start, and the exact death date/cause were
  // P2, verified directly against src_juarez_wikipedia (live fetch). No
  // beat treats Maximilian's execution as the arc's defining purpose --
  // it is one clause within life_arc.5, not its own beat, per the
  // person-specific instruction. Note on the task brief's reference to "a
  // prior normalization audit" flagging a Turning Point as borderline/P3/
  // minor: an exhaustive repo-wide search (this file, i18n/editorial.ts,
  // roster8.ts, the candidate JSON, docs/checkpoints/, docs/archive/)
  // found no such comment anywhere in the repository for this person --
  // repo state is authoritative over that claim (CLAUDE.md invariant 8),
  // and since this batch does not touch turningPoints for this person in
  // any case, the discrepancy doesn't block this beat set, but it's
  // flagged here rather than silently assumed correct.
  "benito-juarez": {
    achievements: [
      { id: "benito-juarez-achievement-1", textKey: "benito-juarez.achievement.1", sourceIds: ["src_juarez_wikipedia"] },
      { id: "benito-juarez-achievement-2", textKey: "benito-juarez.achievement.2", sourceIds: ["src_juarez_biography"] },
      { id: "benito-juarez-achievement-3", textKey: "benito-juarez.achievement.3", sourceIds: ["src_juarez_biography"] },
    ],
    moments: [
      {
        id: "benito-juarez-moment-1",
        textKey: "benito-juarez.moment.1",
        interpretationKey: "benito-juarez.interpretation.moment.1",
        attributeId: "discipline",
        sourceIds: ["src_juarez_biography"],
      },
    ],
    turningPoints: [
      { id: "benito-juarez-turning-point-1", textKey: "benito-juarez.turning_point.1", sourceIds: ["src_juarez_biography", "src_juarez_wikipedia"] },
    ],
    lifeArc: [
      { year: "1806", textKey: "benito-juarez.life_arc.1", sourceIds: ["src_juarez_wikipedia"] },
      { year: "1834–1847", textKey: "benito-juarez.life_arc.2", sourceIds: ["src_juarez_wikipedia"] },
      { year: "1858", textKey: "benito-juarez.life_arc.3", sourceIds: ["src_juarez_wikipedia"] },
      { year: "1862–1867", textKey: "benito-juarez.life_arc.4", sourceIds: ["src_juarez_biography", "src_juarez_wikipedia"] },
      { year: "1867", textKey: "benito-juarez.life_arc.5", sourceIds: ["src_juarez_biography", "src_juarez_wikipedia"] },
      { year: "1872", textKey: "benito-juarez.life_arc.6", sourceIds: ["src_juarez_wikipedia"] },
    ],
  },

  "ernest-shackleton": {
    achievements: [
      { id: "ernest-shackleton-achievement-1", textKey: "ernest-shackleton.achievement.1", sourceIds: ["src_shackleton_lansing"] },
      { id: "ernest-shackleton-achievement-2", textKey: "ernest-shackleton.achievement.2", sourceIds: ["src_shackleton_lansing"] },
    ],
    moments: [
      {
        id: "ernest-shackleton-moment-1",
        textKey: "ernest-shackleton.moment.1",
        interpretationKey: "ernest-shackleton.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_shackleton_wikipedia"],
      },
      { id: "ernest-shackleton-moment-2", textKey: "ernest-shackleton.moment.2", sourceIds: ["src_shackleton_lansing"] },
    ],
    turningPoints: [
      {
        id: "ernest-shackleton-turning-point-1",
        textKey: "ernest-shackleton.turning_point.1",
        interpretationKey: "ernest-shackleton.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_shackleton_lansing"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats. His first expedition
    // (Discovery, 1901-1904, under Scott) and his final expedition and
    // death (Quest, 1921-1922; heart attack at South Georgia, 5 January
    // 1922) were not preserved anywhere in this profile -- P2, verified
    // directly against src_shackleton_wikipedia (live fetch). Per the
    // person-specific instruction, the arc deliberately orients his wider
    // exploratory career rather than retelling Endurance alone:
    // achievement.1 and achievement.2 (Endurance survival + the open-boat
    // rescue journey) are combined into one beat so the arc has room for
    // his career's start and end, and survival language is kept plain
    // ("kept all 28 crew alive"), not dramatized.
    lifeArc: [
      { year: "1874", textKey: "ernest-shackleton.life_arc.1", sourceIds: ["src_shackleton_wikipedia"] },
      { year: "1901–1904", textKey: "ernest-shackleton.life_arc.2", sourceIds: ["src_shackleton_wikipedia"] },
      { year: "1909", textKey: "ernest-shackleton.life_arc.3", sourceIds: ["src_shackleton_wikipedia"] },
      { year: "1914–1917", textKey: "ernest-shackleton.life_arc.4", sourceIds: ["src_shackleton_lansing"] },
      { year: "1921", textKey: "ernest-shackleton.life_arc.5", sourceIds: ["src_shackleton_wikipedia"] },
      { year: "1922", textKey: "ernest-shackleton.life_arc.6", sourceIds: ["src_shackleton_wikipedia"] },
    ],
  },

  "wole-soyinka": {
    achievements: [
      { id: "wole-soyinka-achievement-1", textKey: "wole-soyinka.achievement.1", sourceIds: ["src_soyinka_nobel"] },
      { id: "wole-soyinka-achievement-2", textKey: "wole-soyinka.achievement.2", sourceIds: ["src_soyinka_memoir"] },
    ],
    moments: [
      {
        id: "wole-soyinka-moment-1",
        textKey: "wole-soyinka.moment.1",
        interpretationKey: "wole-soyinka.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_soyinka_memoir"],
      },
    ],
    turningPoints: [
      {
        id: "wole-soyinka-turning-point-1",
        textKey: "wole-soyinka.turning_point.1",
        interpretationKey: "wole-soyinka.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_soyinka_memoir", "src_soyinka_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. His early-career start
    // (1957, writing plays while studying at Leeds) and his most recent
    // well-documented milestone were not preserved -- P2, verified
    // directly against src_soyinka_wikipedia (live fetch): began "writing
    // plays in earnest around 1957" at Leeds ("The Swamp Dwellers," "The
    // Lion and the Jewel"); most recently, published "Chronicles from the
    // Land of the Happiest People on Earth" in September 2021, his first
    // novel in nearly 50 years. Per the person-specific instruction (living
    // subject, final beat must be a concrete recent milestone, not
    // "Present"), life_arc.6 uses that 2021 novel rather than a placeholder
    // -- a 2024 institutional honor (a theatre renamed for him) was also
    // found and considered, but the novel was preferred as his own
    // documented output rather than an honor bestowed on him. Nobel
    // recognition (life_arc.5) is placed as one milestone among six, not
    // the profile's opening or closing beat.
    lifeArc: [
      { year: "1934", textKey: "wole-soyinka.life_arc.1", sourceIds: ["src_soyinka_wikipedia"] },
      { year: "1957", textKey: "wole-soyinka.life_arc.2", sourceIds: ["src_soyinka_wikipedia"] },
      { year: "1967", textKey: "wole-soyinka.life_arc.3", sourceIds: ["src_soyinka_memoir", "src_soyinka_wikipedia"] },
      { year: "1967–1969", textKey: "wole-soyinka.life_arc.4", sourceIds: ["src_soyinka_memoir"] },
      { year: "1986", textKey: "wole-soyinka.life_arc.5", sourceIds: ["src_soyinka_nobel"] },
      { year: "2021", textKey: "wole-soyinka.life_arc.6", sourceIds: ["src_soyinka_wikipedia"] },
    ],
  },

  "elizabeth-blackwell": {
    achievements: [
      { id: "elizabeth-blackwell-achievement-1", textKey: "elizabeth-blackwell.achievement.1", sourceIds: ["src_blackwell_nlm"] },
      { id: "elizabeth-blackwell-achievement-2", textKey: "elizabeth-blackwell.achievement.2", sourceIds: ["src_blackwell_nps"] },
    ],
    moments: [
      { id: "elizabeth-blackwell-moment-1", textKey: "elizabeth-blackwell.moment.1", sourceIds: ["src_blackwell_autobiography"] },
      {
        id: "elizabeth-blackwell-moment-2",
        textKey: "elizabeth-blackwell.moment.2",
        interpretationKey: "elizabeth-blackwell.interpretation.moment.2",
        attributeId: "autonomy_need",
        sourceIds: ["src_blackwell_nps"],
      },
    ],
    turningPoints: [
      {
        id: "elizabeth-blackwell-turning-point-1",
        textKey: "elizabeth-blackwell.turning_point.1",
        interpretationKey: "elizabeth-blackwell.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_blackwell_nlm"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact already stated in achievements/moments/
    // turning_point.1 above. achievement.1 already correctly scopes the
    // "first woman doctor" claim to "the first woman to earn a medical
    // degree in the United States," per the person-specific instruction;
    // life_arc.2 reuses that exact scoping rather than a broader claim.
    lifeArc: [
      { year: "1821", textKey: "elizabeth-blackwell.life_arc.1", sourceIds: ["src_blackwell_nlm"] },
      { year: "1849", textKey: "elizabeth-blackwell.life_arc.2", sourceIds: ["src_blackwell_nlm"] },
      { year: "Following her degree", textKey: "elizabeth-blackwell.life_arc.3", sourceIds: ["src_blackwell_nlm"] },
      { year: "1853–1857", textKey: "elizabeth-blackwell.life_arc.4", sourceIds: ["src_blackwell_nps"] },
      { year: "Later career", textKey: "elizabeth-blackwell.life_arc.5", sourceIds: ["src_blackwell_nps"] },
      { year: "1910", textKey: "elizabeth-blackwell.life_arc.6", sourceIds: ["src_blackwell_nlm"] },
    ],
  },

  /* ------------------------------------------- Batch 2 (Tier-B, 10 people) */

  "charles-darwin": {
    achievements: [
      { id: "charles-darwin-achievement-1", textKey: "charles-darwin.achievement.1", sourceIds: ["src_darwin_browne", "src_darwin_wikipedia"] },
      { id: "charles-darwin-achievement-2", textKey: "charles-darwin.achievement.2", sourceIds: ["src_darwin_browne"] },
      { id: "charles-darwin-achievement-3", textKey: "charles-darwin.achievement.3", sourceIds: ["src_darwin_wikipedia", "src_darwin_browne"] },
    ],
    moments: [
      {
        id: "charles-darwin-moment-1",
        textKey: "charles-darwin.moment.1",
        interpretationKey: "charles-darwin.interpretation.moment.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_darwin_browne"],
      },
      { id: "charles-darwin-moment-2", textKey: "charles-darwin.moment.2", sourceIds: ["src_darwin_browne"] },
      { id: "charles-darwin-moment-3", textKey: "charles-darwin.moment.3", sourceIds: ["src_darwin_wikipedia", "src_darwin_browne"] },
    ],
    turningPoints: [
      {
        id: "charles-darwin-turning-point-1",
        textKey: "charles-darwin.turning_point.1",
        interpretationKey: "charles-darwin.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_darwin_browne", "src_darwin_correspondence"],
      },
    ],
    // Profile V2 pilot (2026-08), control case: achievements/moments/turning
    // point deliberately left untouched above -- only Life Arc and Legacy
    // added, both basic uncontested chronology already within this person's
    // existing sources.
    //
    // Profile V2 evidence-closure pass (2026-08): re-verified all six Life
    // Arc beats against a fresh direct fetch of src_darwin_wikipedia (not
    // memory, despite how well-established these facts are). One precision
    // fix: life_arc.3's year was "1839" for both the marriage AND the move
    // to Down House, but the article dates the move to September 1842, not
    // 1839 -- the beat's "later settled" wording already avoided a false
    // precise claim, but the year label itself was tightened to
    // "1839-1842" and src_darwin_wikipedia added alongside src_darwin_browne
    // for this beat. All other beats and the Legacy paragraph confirmed
    // accurate as written; achievements/moments/turningPoints untouched, as
    // this profile is the control case.
    lifeArc: [
      { year: "1809", textKey: "charles-darwin.life_arc.1", sourceIds: ["src_darwin_browne"] },
      { year: "1831–1836", textKey: "charles-darwin.life_arc.2", sourceIds: ["src_darwin_browne"] },
      { year: "1839–1842", textKey: "charles-darwin.life_arc.3", sourceIds: ["src_darwin_browne", "src_darwin_wikipedia"] },
      { year: "1858", textKey: "charles-darwin.life_arc.4", sourceIds: ["src_darwin_correspondence"] },
      { year: "1859", textKey: "charles-darwin.life_arc.5", sourceIds: ["src_darwin_wikipedia", "src_darwin_browne"] },
      { year: "1882", textKey: "charles-darwin.life_arc.6", sourceIds: ["src_darwin_browne"] },
    ],
    legacy: { textKey: "charles-darwin.legacy", sourceIds: ["src_darwin_browne", "src_darwin_wikipedia"] },
  },

  "frederick-douglass": {
    achievements: [
      { id: "frederick-douglass-achievement-1", textKey: "frederick-douglass.achievement.1", sourceIds: ["src_douglass_narrative"] },
      { id: "frederick-douglass-achievement-2", textKey: "frederick-douglass.achievement.2", sourceIds: ["src_douglass_narrative", "src_douglass_blight"] },
      { id: "frederick-douglass-achievement-3", textKey: "frederick-douglass.achievement.3", sourceIds: ["src_douglass_blight", "src_douglass_wikipedia"] },
    ],
    moments: [
      {
        id: "frederick-douglass-moment-1",
        textKey: "frederick-douglass.moment.1",
        interpretationKey: "frederick-douglass.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_douglass_blight"],
      },
      { id: "frederick-douglass-moment-2", textKey: "frederick-douglass.moment.2", sourceIds: ["src_douglass_narrative", "src_douglass_blight"] },
    ],
    turningPoints: [
      {
        id: "frederick-douglass-turning-point-1",
        textKey: "frederick-douglass.turning_point.1",
        interpretationKey: "frederick-douglass.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_douglass_narrative"],
      },
      {
        id: "frederick-douglass-turning-point-2",
        textKey: "frederick-douglass.turning_point.2",
        interpretationKey: "frederick-douglass.interpretation.turning_point.2",
        attributeId: "belief_updating",
        sourceIds: ["src_douglass_blight"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats. Per the person-specific
    // instruction on birth-year uncertainty: his birthplace and the fact
    // that his exact birth date was unknown even to him were not preserved
    // -- P2, verified directly against src_douglass_wikipedia (live fetch:
    // born Talbot County, Maryland; Douglass himself wrote "I have no
    // accurate knowledge of my age"; historian Dickson Preston's research
    // places it at February 1818, the modern consensus year already used
    // as this profile's `birthYear`). The Covey confrontation's year (1833,
    // turning_point.1 gives no year) and his Recorder of Deeds appointment
    // year (1881, achievement.3 gives no year) were likewise verified there.
    // Life Arc beat 1 uses "c. 1818" rather than a bare year, reflecting
    // that documented uncertainty rather than false precision.
    lifeArc: [
      { year: "c. 1818", textKey: "frederick-douglass.life_arc.1", sourceIds: ["src_douglass_wikipedia"] },
      { year: "1833", textKey: "frederick-douglass.life_arc.2", sourceIds: ["src_douglass_narrative", "src_douglass_wikipedia"] },
      { year: "1838", textKey: "frederick-douglass.life_arc.3", sourceIds: ["src_douglass_narrative", "src_douglass_blight"] },
      { year: "1845", textKey: "frederick-douglass.life_arc.4", sourceIds: ["src_douglass_narrative", "src_douglass_blight"] },
      { year: "1881", textKey: "frederick-douglass.life_arc.5", sourceIds: ["src_douglass_blight", "src_douglass_wikipedia"] },
      { year: "1895", textKey: "frederick-douglass.life_arc.6", sourceIds: ["src_douglass_wikipedia"] },
    ],
  },

  "ibn-sina": {
    achievements: [
      { id: "ibn-sina-achievement-1", textKey: "ibn-sina.achievement.1", sourceIds: ["src_ibnsina_sep", "src_ibnsina_wikipedia"] },
      { id: "ibn-sina-achievement-2", textKey: "ibn-sina.achievement.2", sourceIds: ["src_ibnsina_sep"] },
      { id: "ibn-sina-achievement-3", textKey: "ibn-sina.achievement.3", sourceIds: ["src_ibnsina_wikipedia", "src_ibnsina_autobiography"] },
    ],
    moments: [
      {
        id: "ibn-sina-moment-1",
        textKey: "ibn-sina.moment.1",
        interpretationKey: "ibn-sina.interpretation.moment.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_ibnsina_autobiography"],
      },
      { id: "ibn-sina-moment-2", textKey: "ibn-sina.moment.2", sourceIds: ["src_ibnsina_wikipedia"] },
      { id: "ibn-sina-moment-3", textKey: "ibn-sina.moment.3", sourceIds: ["src_ibnsina_autobiography"] },
    ],
    turningPoints: [
      {
        id: "ibn-sina-turning-point-1",
        textKey: "ibn-sina.turning_point.1",
        interpretationKey: "ibn-sina.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_ibnsina_autobiography"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 5 beats (not forced to 6) --
    // D-caution profile. His two major works' completion years were not
    // preserved anywhere in this profile -- P2, verified directly against
    // src_ibnsina_wikipedia (live fetch): the Canon of Medicine was largely
    // finished in Ray/Hamadan "around 1014-1015 and the years following,"
    // and the Shifa was begun in 1014 and "completed around 1020," published
    // 1027 -- both landing in roughly the same period, close enough that
    // this profile combines them into a single "c. 1020s" beat rather than
    // asserting two falsely precise, near-identical dates. Death location
    // (Hamadan) is likewise from that fetch.
    //
    // Final chronology/attribution review (per this batch's D-caution
    // requirement): moment.1 and turning_point.1 are both explicitly
    // "by his own account" in the already-preserved text, sourced to his
    // dictated autobiography rather than later biographical tradition --
    // this Life Arc reuses that framing verbatim (life_arc.2/.3) rather
    // than flattening it into unhedged narration. No claim in this Life
    // Arc treats his intellectual development as psychologically caused;
    // beats state what he reported and what he completed, not why.
    lifeArc: [
      { year: "980", textKey: "ibn-sina.life_arc.1", sourceIds: ["src_ibnsina_wikipedia"] },
      { year: "Teens", textKey: "ibn-sina.life_arc.2", sourceIds: ["src_ibnsina_autobiography"] },
      { year: "Young adulthood", textKey: "ibn-sina.life_arc.3", sourceIds: ["src_ibnsina_autobiography"] },
      { year: "c. 1020s", textKey: "ibn-sina.life_arc.4", sourceIds: ["src_ibnsina_wikipedia", "src_ibnsina_sep"] },
      { year: "1037", textKey: "ibn-sina.life_arc.5", sourceIds: ["src_ibnsina_wikipedia"] },
    ],
  },

  "martin-luther-king-jr": {
    achievements: [
      { id: "martin-luther-king-jr-achievement-1", textKey: "martin-luther-king-jr.achievement.1", sourceIds: ["src_mlk_branch", "src_mlk_institute"] },
      { id: "martin-luther-king-jr-achievement-2", textKey: "martin-luther-king-jr.achievement.2", sourceIds: ["src_mlk_institute", "src_mlk_wikipedia"] },
      { id: "martin-luther-king-jr-achievement-3", textKey: "martin-luther-king-jr.achievement.3", sourceIds: ["src_mlk_branch", "src_mlk_wikipedia"] },
    ],
    moments: [
      {
        id: "martin-luther-king-jr-moment-1",
        textKey: "martin-luther-king-jr.moment.1",
        interpretationKey: "martin-luther-king-jr.interpretation.moment.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_mlk_branch"],
      },
      { id: "martin-luther-king-jr-moment-2", textKey: "martin-luther-king-jr.moment.2", sourceIds: ["src_mlk_institute", "src_mlk_branch"] },
      {
        id: "martin-luther-king-jr-moment-3",
        textKey: "martin-luther-king-jr.moment.3",
        interpretationKey: "martin-luther-king-jr.interpretation.moment.3",
        attributeId: "mastery_orientation",
        sourceIds: ["src_mlk_branch"],
      },
    ],
    turningPoints: [
      {
        id: "martin-luther-king-jr-turning-point-1",
        textKey: "martin-luther-king-jr.turning_point.1",
        interpretationKey: "martin-luther-king-jr.interpretation.turning_point.1",
        attributeId: "belief_updating",
        sourceIds: ["src_mlk_branch", "src_mlk_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact and year already stated in achievements/moments/
    // turning_point.1 above. Per the person-specific instruction: early
    // ministry/pre-movement study (moment.3) and Montgomery (achievement.1)
    // are kept distinct from national leadership (Birmingham/March on
    // Washington, Civil Rights/Voting Rights Acts); the final beat combines
    // his 1967-68 broadening to economic justice and Vietnam opposition
    // with his assassination, matching this Life Arc system's own
    // established pattern for a deceased subject's final beat (a preceding
    // fact plus death in one beat, e.g. Yayoi Kusama's shipped Life Arc);
    // he is not reduced to an awards list, and Vietnam/the Poor People's
    // Campaign are named only as what turning_point.1 already documents,
    // not compressed into an unsupported "became more radical" framing.
    lifeArc: [
      { year: "1929", textKey: "martin-luther-king-jr.life_arc.1", sourceIds: ["src_mlk_wikipedia"] },
      { year: "Before 1955", textKey: "martin-luther-king-jr.life_arc.2", sourceIds: ["src_mlk_branch"] },
      { year: "1955–1956", textKey: "martin-luther-king-jr.life_arc.3", sourceIds: ["src_mlk_branch", "src_mlk_institute"] },
      { year: "1963", textKey: "martin-luther-king-jr.life_arc.4", sourceIds: ["src_mlk_branch", "src_mlk_institute", "src_mlk_wikipedia"] },
      { year: "1964–1965", textKey: "martin-luther-king-jr.life_arc.5", sourceIds: ["src_mlk_branch", "src_mlk_wikipedia"] },
      { year: "1967–1968", textKey: "martin-luther-king-jr.life_arc.6", sourceIds: ["src_mlk_branch", "src_mlk_wikipedia"] },
    ],
  },

  "rachel-carson": {
    achievements: [
      { id: "rachel-carson-achievement-1", textKey: "rachel-carson.achievement.1", sourceIds: ["src_carson_lear"] },
      { id: "rachel-carson-achievement-2", textKey: "rachel-carson.achievement.2", sourceIds: ["src_carson_wikipedia"] },
      { id: "rachel-carson-achievement-3", textKey: "rachel-carson.achievement.3", sourceIds: ["src_carson_lear", "src_carson_wikipedia"] },
    ],
    moments: [
      { id: "rachel-carson-moment-1", textKey: "rachel-carson.moment.1", sourceIds: ["src_carson_lear"] },
      {
        id: "rachel-carson-moment-2",
        textKey: "rachel-carson.moment.2",
        interpretationKey: "rachel-carson.interpretation.moment.2",
        attributeId: "risk_tolerance",
        sourceIds: ["src_carson_lear"],
      },
      { id: "rachel-carson-moment-3", textKey: "rachel-carson.moment.3", sourceIds: ["src_carson_lear"] },
    ],
    turningPoints: [
      {
        id: "rachel-carson-turning-point-1",
        textKey: "rachel-carson.turning_point.1",
        interpretationKey: "rachel-carson.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_carson_lear"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. Three dates that
    // achievement.3/moment.1 describe but don't give years for -- her 1936
    // Bureau of Fisheries hire, her 1951 The Sea Around Us, and her 1963
    // Senate testimony -- were not preserved -- P2, verified directly
    // against src_carson_wikipedia (live fetch: "became the second woman
    // hired by the Bureau of Fisheries... in 1936"; The Sea Around Us
    // "published by Oxford University Press" 2 July 1951; Senate testimony
    // in 1963 following the President's Science Advisory Committee's May
    // 1963 report). Per the person-specific instruction, life_arc is not
    // reduced to Silent Spring alone -- her earlier Bureau/Sea Around Us
    // career gets two beats of its own -- and achievement.2's own hedge
    // ("widely credited with catalyzing," not "created") is not
    // strengthened anywhere in this arc.
    lifeArc: [
      { year: "1907", textKey: "rachel-carson.life_arc.1", sourceIds: ["src_carson_wikipedia"] },
      { year: "1936", textKey: "rachel-carson.life_arc.2", sourceIds: ["src_carson_wikipedia"] },
      { year: "1951", textKey: "rachel-carson.life_arc.3", sourceIds: ["src_carson_wikipedia", "src_carson_lear"] },
      { year: "1962", textKey: "rachel-carson.life_arc.4", sourceIds: ["src_carson_lear"] },
      { year: "1963", textKey: "rachel-carson.life_arc.5", sourceIds: ["src_carson_lear", "src_carson_wikipedia"] },
      { year: "1964", textKey: "rachel-carson.life_arc.6", sourceIds: ["src_carson_lear"] },
    ],
  },

  "hildegard-of-bingen": {
    achievements: [
      { id: "hildegard-of-bingen-achievement-1", textKey: "hildegard-of-bingen.achievement.1", sourceIds: ["src_hildegard_worldhistory", "src_hildegard_wikipedia"] },
      { id: "hildegard-of-bingen-achievement-2", textKey: "hildegard-of-bingen.achievement.2", sourceIds: ["src_hildegard_worldhistory"] },
      { id: "hildegard-of-bingen-achievement-3", textKey: "hildegard-of-bingen.achievement.3", sourceIds: ["src_hildegard_wikipedia"] },
    ],
    moments: [
      {
        id: "hildegard-of-bingen-moment-1",
        textKey: "hildegard-of-bingen.moment.1",
        interpretationKey: "hildegard-of-bingen.interpretation.moment.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_hildegard_correspondence"],
      },
      {
        id: "hildegard-of-bingen-moment-2",
        textKey: "hildegard-of-bingen.moment.2",
        interpretationKey: "hildegard-of-bingen.interpretation.moment.2",
        attributeId: "autonomy_need",
        sourceIds: ["src_hildegard_wikipedia"],
      },
      { id: "hildegard-of-bingen-moment-3", textKey: "hildegard-of-bingen.moment.3", sourceIds: ["src_hildegard_worldhistory"] },
    ],
    turningPoints: [
      {
        id: "hildegard-of-bingen-turning-point-1",
        textKey: "hildegard-of-bingen.turning_point.1",
        interpretationKey: "hildegard-of-bingen.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_hildegard_wikipedia", "src_hildegard_worldhistory"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats -- D-caution profile,
    // near-entirely P2 since this profile's preserved text carries almost
    // no years at all. Verified directly against src_hildegard_wikipedia
    // (live fetch): her enclosure with the anchoress Jutta in 1112 (her
    // exact age is disputed among sources -- some place her oblation at 8,
    // Jutta's own enclosure record firmly dates to 1112, when Hildegard
    // "would have been 14" -- this Life Arc anchors to the firmer 1112 date
    // rather than asserting a disputed age); her reported call, c. 1141, to
    // record the visions later written down as Scivias over 1142-1151;
    // Rupertsberg founded 1150 (moment.2's already-preserved relocation
    // dispute); Eibingen founded 1165 (achievement.3's already-preserved
    // "later" second monastery).
    //
    // Final chronology/attribution review (per this batch's D-caution
    // requirement): life_arc.3 uses "Reported receiving a call..." per the
    // person-specific instruction's required framing for visionary
    // material -- it is never narrated as an externally verified event.
    // Her own surviving correspondence and monastic-founding records
    // (moment.1, achievement.3) are preferred throughout over later
    // hagiographic tradition, consistent with what was already preserved.
    lifeArc: [
      { year: "1098", textKey: "hildegard-of-bingen.life_arc.1", sourceIds: ["src_hildegard_wikipedia"] },
      { year: "1112", textKey: "hildegard-of-bingen.life_arc.2", sourceIds: ["src_hildegard_wikipedia"] },
      { year: "c. 1141", textKey: "hildegard-of-bingen.life_arc.3", sourceIds: ["src_hildegard_wikipedia"] },
      { year: "1150", textKey: "hildegard-of-bingen.life_arc.4", sourceIds: ["src_hildegard_wikipedia"] },
      { year: "1165", textKey: "hildegard-of-bingen.life_arc.5", sourceIds: ["src_hildegard_wikipedia"] },
      { year: "1179", textKey: "hildegard-of-bingen.life_arc.6", sourceIds: ["src_hildegard_wikipedia", "src_hildegard_worldhistory"] },
    ],
  },

  "florence-nightingale": {
    achievements: [
      { id: "florence-nightingale-achievement-1", textKey: "florence-nightingale.achievement.1", sourceIds: ["src_nightingale_mcdonald", "src_nightingale_wikipedia"] },
      { id: "florence-nightingale-achievement-2", textKey: "florence-nightingale.achievement.2", sourceIds: ["src_nightingale_wikipedia", "src_nightingale_smallbio"] },
      { id: "florence-nightingale-achievement-3", textKey: "florence-nightingale.achievement.3", sourceIds: ["src_nightingale_mcdonald"] },
    ],
    moments: [
      {
        id: "florence-nightingale-moment-1",
        textKey: "florence-nightingale.moment.1",
        interpretationKey: "florence-nightingale.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_nightingale_smallbio"],
      },
      {
        id: "florence-nightingale-moment-2",
        textKey: "florence-nightingale.moment.2",
        interpretationKey: "florence-nightingale.interpretation.moment.2",
        attributeId: "independent_thinking",
        sourceIds: ["src_nightingale_smallbio"],
      },
    ],
    turningPoints: [
      {
        id: "florence-nightingale-turning-point-1",
        textKey: "florence-nightingale.turning_point.1",
        interpretationKey: "florence-nightingale.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_nightingale_smallbio", "src_nightingale_mcdonald"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact already stated in achievements/moments/
    // turning_point.1 above. Per the person-specific instruction, the arc
    // foregrounds her statistical/institutional-reform work (the coxcomb
    // chart, the Training School, decades of reform reaching public health
    // in India) rather than battlefield-nursing imagery -- no "lamp"
    // reference anywhere, and the Crimean front beat (moment.1) is framed
    // as her organizing her own party, not a caretaking cliche.
    lifeArc: [
      { year: "1820", textKey: "florence-nightingale.life_arc.1", sourceIds: ["src_nightingale_wikipedia"] },
      { year: "Young adulthood", textKey: "florence-nightingale.life_arc.2", sourceIds: ["src_nightingale_smallbio"] },
      { year: "1854", textKey: "florence-nightingale.life_arc.3", sourceIds: ["src_nightingale_smallbio"] },
      { year: "Crimean War", textKey: "florence-nightingale.life_arc.4", sourceIds: ["src_nightingale_mcdonald", "src_nightingale_wikipedia"] },
      { year: "1860", textKey: "florence-nightingale.life_arc.5", sourceIds: ["src_nightingale_wikipedia", "src_nightingale_smallbio"] },
      { year: "1910", textKey: "florence-nightingale.life_arc.6", sourceIds: ["src_nightingale_smallbio", "src_nightingale_mcdonald"] },
    ],
  },

  "umm-kulthum": {
    achievements: [
      { id: "umm-kulthum-achievement-1", textKey: "umm-kulthum.achievement.1", sourceIds: ["src_ummkulthum_wikipedia"] },
      { id: "umm-kulthum-achievement-2", textKey: "umm-kulthum.achievement.2", sourceIds: ["src_ummkulthum_britannica", "src_ummkulthum_wikipedia"] },
      { id: "umm-kulthum-achievement-3", textKey: "umm-kulthum.achievement.3", sourceIds: ["src_ummkulthum_wikipedia", "src_ummkulthum_britannica"] },
    ],
    moments: [
      { id: "umm-kulthum-moment-1", textKey: "umm-kulthum.moment.1", sourceIds: ["src_ummkulthum_wikipedia", "src_ummkulthum_britannica"] },
      {
        id: "umm-kulthum-moment-2",
        textKey: "umm-kulthum.moment.2",
        interpretationKey: "umm-kulthum.interpretation.moment.2",
        attributeId: "experimentation",
        sourceIds: ["src_ummkulthum_britannica"],
      },
    ],
    turningPoints: [
      {
        id: "umm-kulthum-turning-point-1",
        textKey: "umm-kulthum.turning_point.1",
        interpretationKey: "umm-kulthum.interpretation.turning_point.1",
        attributeId: "impact_motivation",
        sourceIds: ["src_ummkulthum_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. Her 1923 move to Cairo
    // and 1934 radio-broadcast debut (the start of the already-preserved
    // "monthly performance tradition" in achievement.1, which itself gives
    // no year) were not preserved anywhere in this profile -- P2, verified
    // directly against src_ummkulthum_wikipedia (live fetch: "waited until
    // 1923 before permanently moving" to Cairo; "In 1934, Umm Kulthum sang
    // for the inaugural broadcast of the Egyptian Radio... From then
    // onwards, she performed in a concert on the first Thursday of every
    // month for forty years"). Per the person-specific instruction, no
    // claim about political intent or her relationship with the Egyptian
    // state is made beyond what turning_point.1 already documents (a
    // self-initiated fundraising response to the 1967 war), and no beat
    // asserts more than the plain chronology.
    lifeArc: [
      { year: "1904", textKey: "umm-kulthum.life_arc.1", sourceIds: ["src_ummkulthum_wikipedia"] },
      { year: "1923", textKey: "umm-kulthum.life_arc.2", sourceIds: ["src_ummkulthum_wikipedia"] },
      { year: "1934", textKey: "umm-kulthum.life_arc.3", sourceIds: ["src_ummkulthum_wikipedia"] },
      { year: "Across her career", textKey: "umm-kulthum.life_arc.4", sourceIds: ["src_ummkulthum_wikipedia", "src_ummkulthum_britannica"] },
      { year: "1967", textKey: "umm-kulthum.life_arc.5", sourceIds: ["src_ummkulthum_wikipedia"] },
      { year: "1975", textKey: "umm-kulthum.life_arc.6", sourceIds: ["src_ummkulthum_wikipedia"] },
    ],
  },

  "sor-juana-ines-de-la-cruz": {
    achievements: [
      { id: "sor-juana-ines-de-la-cruz-achievement-1", textKey: "sor-juana-ines-de-la-cruz.achievement.1", sourceIds: ["src_sorjuana_paz", "src_sorjuana_wikipedia"] },
      { id: "sor-juana-ines-de-la-cruz-achievement-2", textKey: "sor-juana-ines-de-la-cruz.achievement.2", sourceIds: ["src_sorjuana_paz"] },
      { id: "sor-juana-ines-de-la-cruz-achievement-3", textKey: "sor-juana-ines-de-la-cruz.achievement.3", sourceIds: ["src_sorjuana_respuesta", "src_sorjuana_paz"] },
    ],
    moments: [
      {
        id: "sor-juana-ines-de-la-cruz-moment-1",
        textKey: "sor-juana-ines-de-la-cruz.moment.1",
        interpretationKey: "sor-juana-ines-de-la-cruz.interpretation.moment.1",
        attributeId: "social_assertiveness",
        sourceIds: ["src_sorjuana_paz"],
      },
      {
        id: "sor-juana-ines-de-la-cruz-moment-2",
        textKey: "sor-juana-ines-de-la-cruz.moment.2",
        interpretationKey: "sor-juana-ines-de-la-cruz.interpretation.moment.2",
        attributeId: "resourcefulness",
        sourceIds: ["src_sorjuana_paz"],
      },
    ],
    turningPoints: [
      {
        id: "sor-juana-ines-de-la-cruz-turning-point-1",
        textKey: "sor-juana-ines-de-la-cruz.turning_point.1",
        interpretationKey: "sor-juana-ines-de-la-cruz.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_sorjuana_paz", "src_sorjuana_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. Her court arrival
    // (moment.1 gives no year) and permanent convent entry (moment.2 gives
    // no year) were not preserved -- P2, verified directly against
    // src_sorjuana_wikipedia (live fetch): joined the viceregal court in
    // Mexico City in 1664 at 16; after a brief unrelated stay with the
    // Discalced Carmelites, entered the Hieronymite convent permanently in
    // 1669, where she took the name used throughout this profile. The
    // final beat merges turning_point.1's already-preserved late-life
    // pressure with her death (1695, roster metadata), per house style and
    // to stay at 6 beats. Per the person-specific instruction, no beat
    // frames her as a "genius nun" -- each beat states a documented action
    // (examined by scholars, entered convent, wrote a specific defense),
    // not an innate-genius characterization.
    lifeArc: [
      { year: "1648", textKey: "sor-juana-ines-de-la-cruz.life_arc.1", sourceIds: ["src_sorjuana_paz"] },
      { year: "1664", textKey: "sor-juana-ines-de-la-cruz.life_arc.2", sourceIds: ["src_sorjuana_wikipedia", "src_sorjuana_paz"] },
      { year: "1669", textKey: "sor-juana-ines-de-la-cruz.life_arc.3", sourceIds: ["src_sorjuana_wikipedia", "src_sorjuana_paz"] },
      { year: "Following decades", textKey: "sor-juana-ines-de-la-cruz.life_arc.4", sourceIds: ["src_sorjuana_paz"] },
      { year: "1691", textKey: "sor-juana-ines-de-la-cruz.life_arc.5", sourceIds: ["src_sorjuana_respuesta", "src_sorjuana_paz"] },
      { year: "Late life", textKey: "sor-juana-ines-de-la-cruz.life_arc.6", sourceIds: ["src_sorjuana_paz", "src_sorjuana_wikipedia"] },
    ],
  },

  "emmy-noether": {
    achievements: [
      { id: "emmy-noether-achievement-1", textKey: "emmy-noether.achievement.1", sourceIds: ["src_noether_wikipedia"] },
      { id: "emmy-noether-achievement-2", textKey: "emmy-noether.achievement.2", sourceIds: ["src_noether_wikipedia"] },
      { id: "emmy-noether-achievement-3", textKey: "emmy-noether.achievement.3", sourceIds: ["src_noether_wikipedia"] },
    ],
    moments: [
      {
        id: "emmy-noether-moment-1",
        textKey: "emmy-noether.moment.1",
        interpretationKey: "emmy-noether.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_noether_wikipedia"],
      },
      { id: "emmy-noether-moment-2", textKey: "emmy-noether.moment.2", sourceIds: ["src_noether_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "emmy-noether-turning-point-1",
        textKey: "emmy-noether.turning_point.1",
        interpretationKey: "emmy-noether.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_noether_wikipedia", "src_noether_einstein"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. Her doctorate year
    // (1907, Erlangen) and the exact span of the already-preserved
    // unpaid Hilbert-name lecturing arrangement (moment.1) were not
    // preserved -- P2, verified directly against src_noether_wikipedia
    // (live fetch: doctorate "in 1907 from the University of Erlangen-
    // Nuremberg"; lectured under Hilbert's name "from approximately 1915
    // to 1919 ... During her first years teaching at Göttingen, she had
    // no official position and was not paid," until her habilitation was
    // approved in 1919). Per the person-specific instruction, life_arc.4
    // states plainly that the position was unpaid and unofficial rather
    // than glossing it as an ordinary appointment, and the arc is
    // chronological (education -> barrier -> theorem -> displacement ->
    // death), not a list of her mathematical results.
    lifeArc: [
      { year: "1882", textKey: "emmy-noether.life_arc.1", sourceIds: ["src_noether_wikipedia"] },
      { year: "1907", textKey: "emmy-noether.life_arc.2", sourceIds: ["src_noether_wikipedia"] },
      { year: "1915", textKey: "emmy-noether.life_arc.3", sourceIds: ["src_noether_wikipedia"] },
      { year: "1915–1919", textKey: "emmy-noether.life_arc.4", sourceIds: ["src_noether_wikipedia"] },
      { year: "1933", textKey: "emmy-noether.life_arc.5", sourceIds: ["src_noether_wikipedia", "src_noether_einstein"] },
      { year: "1935", textKey: "emmy-noether.life_arc.6", sourceIds: ["src_noether_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The insurance career
  // (achievement.2) and Brod manuscript episode (moment.1) were already
  // preserved -- P1. Law degree year (1906), the 1914 Felice Bauer
  // engagement's overlap with The Metamorphosis/The Trial, the 1917
  // tuberculosis diagnosis, and the exact death date/location were not
  // preserved anywhere in this profile -- P2, verified directly against
  // src_kafka_wikipedia (live fetch, not memory). Per the person-specific
  // instruction, illness gets exactly one beat (life_arc.5) and death
  // (life_arc.6) is stated plainly, without dwelling on the cause beyond
  // the source's own account, so illness/posthumous fame do not dominate
  // the arc; no diagnosis beyond the documented tuberculosis is stated or
  // implied anywhere.
  "franz-kafka": {
    achievements: [
      { id: "franz-kafka-achievement-1", textKey: "franz-kafka.achievement.1", sourceIds: ["src_kafka_wikipedia"] },
      { id: "franz-kafka-achievement-2", textKey: "franz-kafka.achievement.2", sourceIds: ["src_kafka_museum"] },
      { id: "franz-kafka-achievement-3", textKey: "franz-kafka.achievement.3", sourceIds: ["src_kafka_museum"] },
    ],
    moments: [
      {
        id: "franz-kafka-moment-1",
        textKey: "franz-kafka.moment.1",
        interpretationKey: "franz-kafka.interpretation.moment.1",
        attributeId: "perfectionism",
        sourceIds: ["src_kafka_letters", "src_kafka_wikipedia"],
      },
      {
        id: "franz-kafka-moment-2",
        textKey: "franz-kafka.moment.2",
        interpretationKey: "franz-kafka.interpretation.moment.2",
        attributeId: "autonomy_need",
        sourceIds: ["src_kafka_letters"],
      },
      { id: "franz-kafka-moment-3", textKey: "franz-kafka.moment.3", sourceIds: ["src_kafka_letters", "src_kafka_wikipedia"] },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "1883", textKey: "franz-kafka.life_arc.1", sourceIds: ["src_kafka_wikipedia"] },
      { year: "1906", textKey: "franz-kafka.life_arc.2", sourceIds: ["src_kafka_wikipedia"] },
      { year: "1908–1922", textKey: "franz-kafka.life_arc.3", sourceIds: ["src_kafka_museum", "src_kafka_wikipedia"] },
      { year: "1912–1915", textKey: "franz-kafka.life_arc.4", sourceIds: ["src_kafka_wikipedia"] },
      { year: "1917", textKey: "franz-kafka.life_arc.5", sourceIds: ["src_kafka_wikipedia"] },
      { year: "1924", textKey: "franz-kafka.life_arc.6", sourceIds: ["src_kafka_letters", "src_kafka_wikipedia"] },
    ],
  },

  // Profile Quality Normalization Batch B (2026-08): added legacy for
  // minimal biographical closure -- this profile previously had no
  // mention of his death at all. Handled carefully per this task's
  // explicit instructions: no diagnosis, no presenting either account as
  // certain, no personality explanation, no Turning Point (no subsequent
  // trajectory). The already-preserved src_vangogh_naifeh source is
  // exactly the disputing account the audit finding referred to. The
  // text below does not present the two accounts as equally weighted, only
  // notes that not every source this profile draws on agrees.
  //
  // Provenance-closure remediation (2026-08, same batch): itemized below,
  // per claim. This also corrects an inaccuracy in the original comment,
  // which described the Van Gogh Museum's own page as verified via
  // "direct fetch" -- re-checked this session and that was not accurate;
  // corrected below.
  // - Death date (29 July 1890, two days after the 27 July shooting) and
  //   the exact quote to police ("Do not accuse anybody, it is I that
  //   wished to commit suicide"): a direct, successful fetch of
  //   Wikipedia's dedicated "Death of Vincent van Gogh" article
  //   (src_vangogh_death_wiki, 2026-08). This is the actual source for
  //   the quote.
  // - "The Van Gogh Museum's own account...still describes it as
  //   self-inflicted": vangoghmuseum.nl is a JS-rendered page WebFetch
  //   cannot retrieve directly -- re-confirmed this session with two
  //   separate direct-fetch attempts against both src_vangogh_museum_
  //   death's URL and the museum's own FAQ page ("Why Did Vincent van
  //   Gogh Commit Suicide?"), both returning placeholder text only, no
  //   body content. The claim is grounded instead in WebSearch results
  //   that quoted indexed body content from those same museum pages
  //   directly ("On 27 July 1890...Vincent shot himself in the chest with
  //   a revolver. He died two days later..."), corroborated independently
  //   by the Wikipedia article above. This is a real but different kind
  //   of verification than a full page fetch, documented honestly here
  //   rather than left as the earlier comment's inaccurate "direct fetch"
  //   claim.
  // - Naifeh/Smith's 2011 theory (shot accidentally by two local
  //   teenagers, covered for them), the Van Gogh Museum researchers'
  //   formal 2013 Burlington Magazine rebuttal, and "not accepted by most
  //   scholars": all from the same Wikipedia "Death of..." fetch above,
  //   which names the rebuttal's authors (Louis van Tilborgh and Teio
  //   Meedendorp) and describes the theory as widely criticized (citing
  //   Martin Bailey) as unconvincing -- corroborated by a separate
  //   WebSearch pass returning the same Van Tilborgh/Meedendorp rebuttal
  //   and a Today.com piece headlined "Experts unconvinced by new Van
  //   Gogh death theory."
  // - Posthumous value/reception ("among the most sought-after and
  //   expensive...in Western art"): a general, low-specificity claim
  //   consistent with achievement.3's already-preserved "sold only one or
  //   two paintings while alive" and this person's own main
  //   src_vangogh_wikipedia article; not independently re-verified this
  //   session, since it makes no specific figure or ranking claim (unlike
  //   Kahlo's dated, numbered auction-record claim above, which was).
  // Two new dedicated sources added to this person's own `sources` array
  // (src_vangogh_museum_death, src_vangogh_death_wiki) per the provenance
  // rule.
  "vincent-van-gogh": {
    achievements: [
      { id: "vincent-van-gogh-achievement-1", textKey: "vincent-van-gogh.achievement.1", sourceIds: ["src_vangogh_letters"] },
      { id: "vincent-van-gogh-achievement-2", textKey: "vincent-van-gogh.achievement.2", sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"] },
      { id: "vincent-van-gogh-achievement-3", textKey: "vincent-van-gogh.achievement.3", sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"] },
    ],
    moments: [
      {
        id: "vincent-van-gogh-moment-1",
        textKey: "vincent-van-gogh.moment.1",
        interpretationKey: "vincent-van-gogh.interpretation.moment.1",
        attributeId: "collaboration",
        sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"],
      },
      { id: "vincent-van-gogh-moment-2", textKey: "vincent-van-gogh.moment.2", sourceIds: ["src_vangogh_wikipedia"] },
      {
        id: "vincent-van-gogh-moment-3",
        textKey: "vincent-van-gogh.moment.3",
        interpretationKey: "vincent-van-gogh.interpretation.moment.3",
        attributeId: "autonomy_need",
        sourceIds: ["src_vangogh_letters"],
      },
    ],
    turningPoints: [
      {
        id: "vincent-van-gogh-turning-point-1",
        textKey: "vincent-van-gogh.turning_point.1",
        interpretationKey: "vincent-van-gogh.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. His Arles move (moment.3
    // gives no year) and the Gauguin "Yellow House" period (moment.1 gives
    // no year) were not preserved -- P2, verified directly against
    // src_vangogh_wikipedia (live fetch: moved to Arles "in February 1888";
    // Gauguin joined him there the same year). life_arc.2's 1880 derives
    // from turning_point.1's already-preserved "At 27" + birthYear 1853,
    // not new research.
    //
    // Per the person-specific instruction: this batch does NOT reopen the
    // death controversy already resolved in `legacy` above. The final beat
    // is deliberately bare ("Died.") -- no cause, no theory, no mention of
    // Auvers-sur-Oise -- so Life Arc stays chronological orientation and
    // `legacy` remains the single place this profile discusses the manner
    // of his death. No diagnosis or mental-illness language appears in
    // either field.
    lifeArc: [
      { year: "1853", textKey: "vincent-van-gogh.life_arc.1", sourceIds: ["src_vangogh_wikipedia"] },
      { year: "1880", textKey: "vincent-van-gogh.life_arc.2", sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"] },
      { year: "1888", textKey: "vincent-van-gogh.life_arc.3", sourceIds: ["src_vangogh_letters", "src_vangogh_wikipedia"] },
      { year: "1888", textKey: "vincent-van-gogh.life_arc.4", sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"] },
      { year: "1889–1890", textKey: "vincent-van-gogh.life_arc.5", sourceIds: ["src_vangogh_naifeh", "src_vangogh_wikipedia"] },
      { year: "1890", textKey: "vincent-van-gogh.life_arc.6", sourceIds: ["src_vangogh_wikipedia"] },
    ],
    legacy: {
      textKey: "vincent-van-gogh.legacy",
      sourceIds: ["src_vangogh_museum_death", "src_vangogh_death_wiki", "src_vangogh_naifeh"],
    },
  },

  "thomas-aquinas": {
    achievements: [
      { id: "thomas-aquinas-achievement-1", textKey: "thomas-aquinas.achievement.1", sourceIds: ["src_aquinas_wikipedia"] },
      { id: "thomas-aquinas-achievement-2", textKey: "thomas-aquinas.achievement.2", sourceIds: ["src_aquinas_wikipedia"] },
      {
        id: "thomas-aquinas-achievement-3",
        textKey: "thomas-aquinas.achievement.3",
        interpretationKey: "thomas-aquinas.interpretation.achievement.3",
        attributeId: "independent_thinking",
        sourceIds: ["src_aquinas_sep", "src_aquinas_wikipedia"],
      },
    ],
    moments: [
      { id: "thomas-aquinas-moment-1", textKey: "thomas-aquinas.moment.1", sourceIds: ["src_aquinas_sep"] },
      { id: "thomas-aquinas-moment-2", textKey: "thomas-aquinas.moment.2", sourceIds: ["src_aquinas_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "thomas-aquinas-turning-point-1",
        textKey: "thomas-aquinas.turning_point.1",
        interpretationKey: "thomas-aquinas.interpretation.turning_point.1",
        attributeId: "mastery_orientation",
        sourceIds: ["src_aquinas_wikipedia", "src_aquinas_sep"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats -- D-caution profile.
    // His Dominican entry, his family's confinement of him, his study
    // under Albert the Great, and his exact death location were not
    // preserved anywhere in this profile -- P2, verified directly against
    // src_aquinas_wikipedia (live fetch, per this batch's explicit
    // instruction that the family-confinement episode "must remain factual
    // and carefully sourced"): at 19 he resolved to join the Dominican
    // Order; his mother had his brothers seize him en route to Rome, and he
    // "was held prisoner for almost one year in the family castles at Monte
    // San Giovanni and Roccasecca" specifically to pressure him into
    // renouncing his vocation; he then followed his teacher Albert the
    // Great to Cologne in 1248; he died 7 March 1274 at Fossanova Abbey, a
    // Cistercian monastery, after falling ill en route to the Second
    // Council of Lyon.
    //
    // Final chronology/attribution review (per this batch's D-caution
    // requirement): life_arc.1 uses "c. 1225" -- his birth year is not
    // settled among historians (sources vary 1224-1226) and roster
    // birthYear 1225 is a point-estimate convention, not a fixed fact.
    // life_arc.5 reuses turning_point.1's already-preserved, already-hedged
    // "reportedly stopped writing, telling his secretary..." framing
    // verbatim rather than asserting the mystical experience as fact; that
    // account, and moment.1's "widely repeated account" royal-dinner
    // anecdote, are both left out of or kept hedged in this Life Arc so
    // later saintly/hagiographic tradition is not presented as settled
    // history.
    lifeArc: [
      { year: "c. 1225", textKey: "thomas-aquinas.life_arc.1", sourceIds: ["src_aquinas_wikipedia"] },
      { year: "c. 1244", textKey: "thomas-aquinas.life_arc.2", sourceIds: ["src_aquinas_wikipedia"] },
      { year: "1248", textKey: "thomas-aquinas.life_arc.3", sourceIds: ["src_aquinas_wikipedia"] },
      { year: "1250s–1273", textKey: "thomas-aquinas.life_arc.4", sourceIds: ["src_aquinas_wikipedia"] },
      { year: "6 December 1273", textKey: "thomas-aquinas.life_arc.5", sourceIds: ["src_aquinas_wikipedia", "src_aquinas_sep"] },
      { year: "1274", textKey: "thomas-aquinas.life_arc.6", sourceIds: ["src_aquinas_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): D-CAUTION profile, ranges used
  // deliberately per the person-specific instruction. The Córdoba exile
  // (turning_point.1) and the Mishneh Torah/Guide achievements were
  // already preserved -- P1 -- but with no exact chronology attached. The
  // full migration timeline (Córdoba 1148 -> c. 1160 Fez -> 1165 Acre/
  // Jerusalem/Hebron -> Fustat 1166-1171), the Guide's 1190 completion,
  // and the burial-tradition caveat are P2, verified via two direct
  // fetches: src_maimonides_sep (Stanford Encyclopedia of Philosophy,
  // which gives the Mishneh Torah's "1170-1180" range as its own
  // information-box estimate, not a documented date) and a follow-up
  // src_maimonides_wikipedia fetch specifically for the Fustat arrival-
  // year dispute (1166 vs. 1168 vs. 1171, sources disagree) and the
  // Tiberias burial tradition, which Wikipedia itself flags as having "no
  // contemporary evidence." life_arc.3 and life_arc.6 both preserve these
  // hedges explicitly rather than presenting either as settled fact, per
  // the instruction not to flatten later tradition into exact biography.
  maimonides: {
    achievements: [
      { id: "maimonides-achievement-1", textKey: "maimonides.achievement.1", sourceIds: ["src_maimonides_wikipedia"] },
      { id: "maimonides-achievement-2", textKey: "maimonides.achievement.2", sourceIds: ["src_maimonides_wikipedia", "src_maimonides_sep"] },
      { id: "maimonides-achievement-3", textKey: "maimonides.achievement.3", sourceIds: ["src_maimonides_wikipedia"] },
    ],
    moments: [
      { id: "maimonides-moment-1", textKey: "maimonides.moment.1", sourceIds: ["src_maimonides_wikipedia"] },
      {
        id: "maimonides-moment-2",
        textKey: "maimonides.moment.2",
        interpretationKey: "maimonides.interpretation.moment.2",
        attributeId: "proactive_agency",
        sourceIds: ["src_maimonides_sep"],
      },
    ],
    turningPoints: [
      {
        id: "maimonides-turning-point-1",
        textKey: "maimonides.turning_point.1",
        interpretationKey: "maimonides.interpretation.turning_point.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_maimonides_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1138", textKey: "maimonides.life_arc.1", sourceIds: ["src_maimonides_wikipedia", "src_maimonides_sep"] },
      { year: "1148–c. 1160", textKey: "maimonides.life_arc.2", sourceIds: ["src_maimonides_wikipedia", "src_maimonides_sep"] },
      { year: "1165", textKey: "maimonides.life_arc.3", sourceIds: ["src_maimonides_wikipedia"] },
      { year: "c. 1170–1180", textKey: "maimonides.life_arc.4", sourceIds: ["src_maimonides_sep", "src_maimonides_wikipedia"] },
      { year: "1190", textKey: "maimonides.life_arc.5", sourceIds: ["src_maimonides_sep"] },
      { year: "1204", textKey: "maimonides.life_arc.6", sourceIds: ["src_maimonides_wikipedia"] },
    ],
  },

  sequoyah: {
    achievements: [
      { id: "sequoyah-achievement-1", textKey: "sequoyah.achievement.1", sourceIds: ["src_sequoyah_wikipedia"] },
      { id: "sequoyah-achievement-2", textKey: "sequoyah.achievement.2", sourceIds: ["src_sequoyah_cherokee_nation", "src_sequoyah_wikipedia"] },
      { id: "sequoyah-achievement-3", textKey: "sequoyah.achievement.3", sourceIds: ["src_sequoyah_cherokee_nation"] },
    ],
    moments: [
      { id: "sequoyah-moment-1", textKey: "sequoyah.moment.1", sourceIds: ["src_sequoyah_wikipedia"] },
      {
        id: "sequoyah-moment-2",
        textKey: "sequoyah.moment.2",
        interpretationKey: "sequoyah.interpretation.moment.2",
        attributeId: "adaptability",
        sourceIds: ["src_sequoyah_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "sequoyah-turning-point-1",
        textKey: "sequoyah.turning_point.1",
        interpretationKey: "sequoyah.interpretation.turning_point.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_sequoyah_cherokee_nation", "src_sequoyah_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats, with real chronology
    // caution. Verified directly against src_sequoyah_wikipedia (live
    // fetch): (1) birth year is disputed between "c. 1770" (the article's
    // own infobox figure, matching this roster's birthYear) and "around
    // 1778" elsewhere in the same article -- kept at the roster's existing
    // 1770 with a "c." hedge, not changed, since historiography itself is
    // split, not merely approximate (matches the person-specific
    // instruction not to "correct" one convention over another under live
    // uncertainty). (2) Syllabary timeline: began "around 1809," finished
    // in 1821 (matching achievement.2's already-preserved "approximately
    // 12 years"), Cherokee Nation officially adopted it in 1825 -- none of
    // these three years were preserved before now (P2). (3) Death is
    // NOT given a clean final beat, per the person-specific instruction:
    // he traveled to Mexico in spring 1842 searching for relocated
    // Cherokee communities and was last reliably documented there; the
    // source's own account states "the exact location and date lack
    // conclusive verification," and a 1939 expedition could not even
    // confirm a grave site. life_arc.6 states that uncertainty directly
    // rather than asserting a settled death. Roster's existing deathYear
    // (1843) matches one contemporaneous letter's account and was left
    // unchanged, consistent with not "correcting" a defensible convention.
    lifeArc: [
      { year: "c. 1770", textKey: "sequoyah.life_arc.1", sourceIds: ["src_sequoyah_wikipedia"] },
      { year: "c. 1809", textKey: "sequoyah.life_arc.2", sourceIds: ["src_sequoyah_wikipedia"] },
      { year: "1821", textKey: "sequoyah.life_arc.3", sourceIds: ["src_sequoyah_wikipedia", "src_sequoyah_cherokee_nation"] },
      { year: "1825", textKey: "sequoyah.life_arc.4", sourceIds: ["src_sequoyah_wikipedia", "src_sequoyah_cherokee_nation"] },
      { year: "1842", textKey: "sequoyah.life_arc.5", sourceIds: ["src_sequoyah_wikipedia"] },
      { year: "1843", textKey: "sequoyah.life_arc.6", sourceIds: ["src_sequoyah_wikipedia"] },
    ],
  },

  "sojourner-truth": {
    achievements: [
      { id: "sojourner-truth-achievement-1", textKey: "sojourner-truth.achievement.1", sourceIds: ["src_truth_wikipedia"] },
      { id: "sojourner-truth-achievement-2", textKey: "sojourner-truth.achievement.2", sourceIds: ["src_truth_painter"] },
      { id: "sojourner-truth-achievement-3", textKey: "sojourner-truth.achievement.3", sourceIds: ["src_truth_wikipedia"] },
    ],
    moments: [
      {
        id: "sojourner-truth-moment-1",
        textKey: "sojourner-truth.moment.1",
        interpretationKey: "sojourner-truth.interpretation.moment.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_truth_narrative", "src_truth_wikipedia"],
      },
      { id: "sojourner-truth-moment-2", textKey: "sojourner-truth.moment.2", sourceIds: ["src_truth_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "sojourner-truth-turning-point-1",
        textKey: "sojourner-truth.turning_point.1",
        interpretationKey: "sojourner-truth.interpretation.turning_point.1",
        attributeId: "decisiveness",
        sourceIds: ["src_truth_narrative", "src_truth_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. Birthplace (New York)
    // was not preserved anywhere in this profile -- P2, verified directly
    // against src_truth_wikipedia (live fetch: "born into slavery in
    // Swartekill, New York"). Birth year itself is confirmed genuinely
    // uncertain by the same source ("she once estimated... between 1797
    // and 1800"; "c. 1797" is the article's own convention) -- the
    // roster's existing birthYear (1797) already matches that convention,
    // so left unchanged, only hedged with "c." in the beat. Per the
    // person-specific instruction, the disputed "Ain't I a Woman?"
    // wording is not reproduced anywhere in this arc -- life_arc.5 reuses
    // only achievement.2's own already-hedged framing (a sustained
    // speaking career, not any specific transcript).
    lifeArc: [
      { year: "c. 1797", textKey: "sojourner-truth.life_arc.1", sourceIds: ["src_truth_wikipedia"] },
      { year: "1826", textKey: "sojourner-truth.life_arc.2", sourceIds: ["src_truth_narrative", "src_truth_wikipedia"] },
      { year: "1828", textKey: "sojourner-truth.life_arc.3", sourceIds: ["src_truth_wikipedia"] },
      { year: "1843", textKey: "sojourner-truth.life_arc.4", sourceIds: ["src_truth_narrative", "src_truth_wikipedia"] },
      { year: "Following decades", textKey: "sojourner-truth.life_arc.5", sourceIds: ["src_truth_painter"] },
      { year: "1883", textKey: "sojourner-truth.life_arc.6", sourceIds: ["src_truth_wikipedia"] },
    ],
  },

  "br-ambedkar": {
    achievements: [
      { id: "br-ambedkar-achievement-1", textKey: "br-ambedkar.achievement.1", sourceIds: ["src_ambedkar_wikipedia"] },
      { id: "br-ambedkar-achievement-2", textKey: "br-ambedkar.achievement.2", sourceIds: ["src_ambedkar_wikipedia", "src_ambedkar_keer"] },
      { id: "br-ambedkar-achievement-3", textKey: "br-ambedkar.achievement.3", sourceIds: ["src_ambedkar_wikipedia"] },
    ],
    moments: [
      {
        id: "br-ambedkar-moment-1",
        textKey: "br-ambedkar.moment.1",
        interpretationKey: "br-ambedkar.interpretation.moment.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_ambedkar_wikipedia", "src_ambedkar_keer"],
      },
      { id: "br-ambedkar-moment-2", textKey: "br-ambedkar.moment.2", sourceIds: ["src_ambedkar_keer"] },
    ],
    turningPoints: [
      {
        id: "br-ambedkar-turning-point-1",
        textKey: "br-ambedkar.turning_point.1",
        interpretationKey: "br-ambedkar.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_ambedkar_wikipedia", "src_ambedkar_keer"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. His Columbia/LSE
    // doctoral years, the Constitution Drafting Committee's exact span,
    // and his Buddhism conversion date's relation to his death were not
    // preserved -- P2, verified directly against src_ambedkar_wikipedia
    // (live fetch): Columbia 1913-1916 (M.A. 1915, Ph.D. 1927), LSE from
    // October 1916 (M.Sc. 1921, D.Sc. 1923); chaired the Drafting
    // Committee 29 August 1947 to 24 January 1950, Constitution adopted
    // 26 November 1949; converted to Buddhism 14 October 1956 and died 6
    // December 1956, 53 days later. Per the person-specific instruction,
    // life_arc.5 credits "the committee" he chaired, not him alone, for
    // building the constitutional framework, matching achievement.2's own
    // team/institutional framing, and his significance is not reduced to
    // the Constitution beat alone -- five other beats orient his legal
    // training, anti-caste leadership, and 1932 break with Gandhi.
    lifeArc: [
      { year: "1891", textKey: "br-ambedkar.life_arc.1", sourceIds: ["src_ambedkar_wikipedia"] },
      { year: "1913–1923", textKey: "br-ambedkar.life_arc.2", sourceIds: ["src_ambedkar_wikipedia"] },
      { year: "1927", textKey: "br-ambedkar.life_arc.3", sourceIds: ["src_ambedkar_wikipedia", "src_ambedkar_keer"] },
      { year: "1932", textKey: "br-ambedkar.life_arc.4", sourceIds: ["src_ambedkar_wikipedia", "src_ambedkar_keer"] },
      { year: "1947–1950", textKey: "br-ambedkar.life_arc.5", sourceIds: ["src_ambedkar_wikipedia"] },
      { year: "1956", textKey: "br-ambedkar.life_arc.6", sourceIds: ["src_ambedkar_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The Shepard/Glenn
  // calculations (achievement.1) and the 1953-1986 career span
  // (achievement.2) were already preserved -- P1. Her college graduation
  // year (1937), the exact NACA entry year (1953) and its West Area
  // Computers section context, the Apollo 11/13 contributions, and her
  // 2015 Presidential Medal of Freedom were not previously dated in this
  // profile -- P2, verified directly against src_johnson_wikipedia (live
  // fetch). Per the person-specific instruction, every beat keeps NASA/
  // institutional framing (NACA, Langley, the segregated West Area
  // Computers section, "at John Glenn's own request") rather than
  // lone-hero language, and the 2015 award in the closing beat is framed
  // as recognition of the career, not as the substance of it.
  "katherine-johnson": {
    achievements: [
      { id: "katherine-johnson-achievement-1", textKey: "katherine-johnson.achievement.1", sourceIds: ["src_johnson_nasa", "src_johnson_shetterly"] },
      { id: "katherine-johnson-achievement-2", textKey: "katherine-johnson.achievement.2", sourceIds: ["src_johnson_wikipedia"] },
      { id: "katherine-johnson-achievement-3", textKey: "katherine-johnson.achievement.3", sourceIds: ["src_johnson_nasa"] },
    ],
    moments: [
      {
        id: "katherine-johnson-moment-1",
        textKey: "katherine-johnson.moment.1",
        interpretationKey: "katherine-johnson.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_johnson_nasa", "src_johnson_shetterly"],
      },
      { id: "katherine-johnson-moment-2", textKey: "katherine-johnson.moment.2", sourceIds: ["src_johnson_nasa"] },
      { id: "katherine-johnson-moment-3", textKey: "katherine-johnson.moment.3", sourceIds: ["src_johnson_wikipedia"] },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "1918", textKey: "katherine-johnson.life_arc.1", sourceIds: ["src_johnson_wikipedia"] },
      { year: "1937", textKey: "katherine-johnson.life_arc.2", sourceIds: ["src_johnson_wikipedia"] },
      { year: "1953", textKey: "katherine-johnson.life_arc.3", sourceIds: ["src_johnson_nasa", "src_johnson_wikipedia"] },
      { year: "1961–1962", textKey: "katherine-johnson.life_arc.4", sourceIds: ["src_johnson_nasa", "src_johnson_shetterly"] },
      { year: "1969–1970", textKey: "katherine-johnson.life_arc.5", sourceIds: ["src_johnson_wikipedia"] },
      { year: "2020", textKey: "katherine-johnson.life_arc.6", sourceIds: ["src_johnson_wikipedia"] },
    ],
  },

  "muhammad-ali": {
    achievements: [
      { id: "muhammad-ali-achievement-1", textKey: "muhammad-ali.achievement.1", sourceIds: ["src_ali_wikipedia"] },
      { id: "muhammad-ali-achievement-2", textKey: "muhammad-ali.achievement.2", sourceIds: ["src_ali_center", "src_ali_autobiography"] },
      { id: "muhammad-ali-achievement-3", textKey: "muhammad-ali.achievement.3", sourceIds: ["src_ali_wikipedia"] },
    ],
    moments: [
      {
        id: "muhammad-ali-moment-1",
        textKey: "muhammad-ali.moment.1",
        interpretationKey: "muhammad-ali.interpretation.moment.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_ali_wikipedia", "src_ali_autobiography"],
      },
      { id: "muhammad-ali-moment-2", textKey: "muhammad-ali.moment.2", sourceIds: ["src_ali_autobiography"] },
    ],
    turningPoints: [
      {
        id: "muhammad-ali-turning-point-1",
        textKey: "muhammad-ali.turning_point.1",
        interpretationKey: "muhammad-ali.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_ali_wikipedia", "src_ali_center"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. Three dates that
    // achievement.1/3 describe but don't give years for -- the 1960
    // Olympic gold, the 1964 Liston fight that first won him the
    // heavyweight title, and the 1974 Foreman "Rumble in the Jungle" that
    // reclaimed it -- were not preserved -- P2, verified directly against
    // src_ali_wikipedia (live fetch: 1960 Rome Olympics light-heavyweight
    // gold; 25 February 1964 defeat of Sonny Liston; 30 October 1974
    // defeat of Foreman in Kinshasa via rope-a-dope, "winning by knockout
    // and reclaiming the heavyweight title"). Per the person-specific
    // instruction, the arc orients boxing rise / title / conversion / draft
    // refusal / return / death and does not list records, and death
    // (life_arc.6) is left bare with no mention of his later health.
    lifeArc: [
      { year: "1942", textKey: "muhammad-ali.life_arc.1", sourceIds: ["src_ali_wikipedia"] },
      { year: "1960", textKey: "muhammad-ali.life_arc.2", sourceIds: ["src_ali_wikipedia"] },
      { year: "1964", textKey: "muhammad-ali.life_arc.3", sourceIds: ["src_ali_wikipedia", "src_ali_autobiography"] },
      { year: "1967", textKey: "muhammad-ali.life_arc.4", sourceIds: ["src_ali_wikipedia", "src_ali_center"] },
      { year: "1974", textKey: "muhammad-ali.life_arc.5", sourceIds: ["src_ali_wikipedia"] },
      { year: "2016", textKey: "muhammad-ali.life_arc.6", sourceIds: ["src_ali_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The Vindication
  // (achievement.1) and the fact of her death shortly after her second
  // daughter's birth (implied but never dated in moment.3) were already
  // preserved -- P1. Every exact date below -- the Newington Green school,
  // her move to London to write for Joseph Johnson, the France period's
  // internal chronology (Imlay, Fanny's birth, Letters Written in Sweden),
  // the March 1797 Godwin marriage, and the exact childbirth-death
  // sequence (married 29 March, second daughter born 30 August, died of
  // septicaemia 10 September) -- is P2, verified directly against
  // src_wollstonecraft_wikipedia (live fetch). Per the person-specific
  // instruction, the arc stays biographical rather than reducing her to
  // later feminist canonization: no beat frames her as a movement founder
  // or icon, only what she did and when.
  "mary-wollstonecraft": {
    achievements: [
      {
        id: "mary-wollstonecraft-achievement-1",
        textKey: "mary-wollstonecraft.achievement.1",
        interpretationKey: "mary-wollstonecraft.interpretation.achievement.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_wollstonecraft_sep", "src_wollstonecraft_wikipedia"],
      },
      { id: "mary-wollstonecraft-achievement-2", textKey: "mary-wollstonecraft.achievement.2", sourceIds: ["src_wollstonecraft_todd"] },
      { id: "mary-wollstonecraft-achievement-3", textKey: "mary-wollstonecraft.achievement.3", sourceIds: ["src_wollstonecraft_wikipedia"] },
    ],
    moments: [
      { id: "mary-wollstonecraft-moment-1", textKey: "mary-wollstonecraft.moment.1", sourceIds: ["src_wollstonecraft_todd"] },
      { id: "mary-wollstonecraft-moment-2", textKey: "mary-wollstonecraft.moment.2", sourceIds: ["src_wollstonecraft_todd"] },
      {
        id: "mary-wollstonecraft-moment-3",
        textKey: "mary-wollstonecraft.moment.3",
        interpretationKey: "mary-wollstonecraft.interpretation.moment.3",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_wollstonecraft_todd"],
      },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "1759", textKey: "mary-wollstonecraft.life_arc.1", sourceIds: ["src_wollstonecraft_wikipedia"] },
      { year: "1784–1787", textKey: "mary-wollstonecraft.life_arc.2", sourceIds: ["src_wollstonecraft_wikipedia"] },
      { year: "1787", textKey: "mary-wollstonecraft.life_arc.3", sourceIds: ["src_wollstonecraft_wikipedia"] },
      { year: "1792", textKey: "mary-wollstonecraft.life_arc.4", sourceIds: ["src_wollstonecraft_wikipedia"] },
      { year: "March 1797", textKey: "mary-wollstonecraft.life_arc.5", sourceIds: ["src_wollstonecraft_wikipedia"] },
      { year: "September 1797", textKey: "mary-wollstonecraft.life_arc.6", sourceIds: ["src_wollstonecraft_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats. The mock
  // execution (turning_point.1) and the ceding-authority-to-Anna turning
  // point were already preserved -- P1, and life_arc.3 references the mock
  // execution only for chronological placement, not restating its
  // already-published detail. First-novel year (1846), the Siberian
  // imprisonment/exile span (1849-1854), the 1859 return to St.
  // Petersburg, and the mature-novel publication years were P2, verified
  // directly against a live Wikipedia fetch; this person's `sources`
  // array has no plain Wikipedia entry, so these beats cite
  // src_dostoevsky_encyc (Encyclopedia.com's biography, already this
  // profile's general-chronology source for achievement.1/2) as the
  // citation. Per the person-specific instruction, no beat mentions
  // epilepsy, and the mock execution is not dramatized beyond what
  // turning_point.1 already establishes.
  "fyodor-dostoevsky": {
    achievements: [
      {
        id: "fyodor-dostoevsky-achievement-1",
        textKey: "fyodor-dostoevsky.achievement.1",
        interpretationKey: "fyodor-dostoevsky.interpretation.achievement.1",
        attributeId: "persistence",
        sourceIds: ["src_dostoevsky_encyc"],
      },
      { id: "fyodor-dostoevsky-achievement-2", textKey: "fyodor-dostoevsky.achievement.2", sourceIds: ["src_dostoevsky_encyc", "src_dostoevsky_yale"] },
    ],
    moments: [
      {
        id: "fyodor-dostoevsky-moment-1",
        textKey: "fyodor-dostoevsky.moment.1",
        interpretationKey: "fyodor-dostoevsky.interpretation.moment.1",
        attributeId: "execution_speed",
        sourceIds: ["src_dostoevsky_encyc"],
      },
      { id: "fyodor-dostoevsky-moment-2", textKey: "fyodor-dostoevsky.moment.2", sourceIds: ["src_dostoevsky_annadiary"] },
    ],
    turningPoints: [
      {
        id: "fyodor-dostoevsky-turning-point-1",
        textKey: "fyodor-dostoevsky.turning_point.1",
        interpretationKey: "fyodor-dostoevsky.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_dostoevsky_ubcwiki", "src_dostoevsky_encyc", "src_dostoevsky_frank"],
      },
      {
        id: "fyodor-dostoevsky-turning-point-2",
        textKey: "fyodor-dostoevsky.turning_point.2",
        interpretationKey: "fyodor-dostoevsky.interpretation.turning_point.2",
        attributeId: "collaboration",
        sourceIds: ["src_dostoevsky_russianlife"],
      },
    ],
    lifeArc: [
      { year: "1821", textKey: "fyodor-dostoevsky.life_arc.1", sourceIds: ["src_dostoevsky_encyc"] },
      { year: "1846", textKey: "fyodor-dostoevsky.life_arc.2", sourceIds: ["src_dostoevsky_encyc"] },
      { year: "1849–1854", textKey: "fyodor-dostoevsky.life_arc.3", sourceIds: ["src_dostoevsky_ubcwiki", "src_dostoevsky_encyc"] },
      { year: "1859", textKey: "fyodor-dostoevsky.life_arc.4", sourceIds: ["src_dostoevsky_encyc"] },
      { year: "1866–1872", textKey: "fyodor-dostoevsky.life_arc.5", sourceIds: ["src_dostoevsky_encyc", "src_dostoevsky_yale"] },
      { year: "1881", textKey: "fyodor-dostoevsky.life_arc.6", sourceIds: ["src_dostoevsky_encyc"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): the prior profile's only
  // two achievements were stereochemistry and a career-pivot framing of the
  // silkworm-disease period -- germ theory, the anthrax/rabies vaccines, and
  // founding the Institut Pasteur (arguably his single most famous
  // contributions) were entirely absent. Fix: achievement.2's silkworm text
  // is a genuine before/after career-domain shift (chemist -> biologist),
  // moved verbatim to turning_point.3 rather than deleted; achievement.2 and
  // achievement.3 are newly written to state germ theory and the vaccine/
  // Institut Pasteur work directly, per this task's "add 2-3 strongest
  // distinct achievements, do not turn this into a laundry list" guidance.
  // Every claim traces to this person's own repository research notes
  // (src/dev/roster1000/production/session18/louis-pasteur/rawNotes.md,
  // "Key achievements" #2 and #4) and existing sourceIds already in this
  // person's own `sources` array -- no new source added, no external
  // knowledge relied on beyond what that file documents.
  // Profile Quality Normalization Batch A (2026-08): moment.2 (the Pouilly-le-Fort
  // vaccine substitution, kept quiet and revealed only when his private notebooks
  // were published nearly a century later) reclassified Moment -> Complexity. This
  // is his own documented decision, directly bearing on how the same trial
  // described in achievement.3 as his defining public triumph should be
  // understood -- not merely a revealing anecdote about working style, the shape
  // Moments exist for. Moved verbatim (facts and sourceIds unchanged, no wording
  // strengthened) per this task's evidence-gate review; renumbered
  // louis-pasteur.moment.2 -> louis-pasteur.complexities.1 following the
  // aung-san-suu-kyi.complexities.1 precedent (a rename of the same verbatim text,
  // not new content).
  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats. Does NOT
  // reopen or rewrite the Profile Quality Normalization Batch A Moment ->
  // Complexity reclassification above -- complexities.1 (the Pouilly-le-
  // Fort vaccine substitution) is untouched, and life_arc.5 states only
  // that the anthrax vaccine was "publicly demonstrated," never engaging
  // the substitution question the Complexity section exists to handle,
  // per the person-specific instruction. Chirality discovery (achievement.1),
  // the 1864 Pouchet debate (achievement.2), the 1868 stroke and its
  // grief context (turning_point.1), and the Meister rabies treatment
  // (turning_point.2) were already preserved -- P1. Education years,
  // exact founding year of the Institut Pasteur (1887, conception and
  // opening the same year per the fetch, not the two-part 1887-88 range
  // achievement.3 uses elsewhere), and the exact death date were P2,
  // verified directly against a live Wikipedia fetch; this person's
  // `sources` array has no plain Wikipedia entry, so these beats cite
  // src_pasteur_shi (this profile's existing general-history source,
  // already used across achievement.1/2 and turning_point.1/3).
  "louis-pasteur": {
    achievements: [
      { id: "louis-pasteur-achievement-1", textKey: "louis-pasteur.achievement.1", sourceIds: ["src_pasteur_shi"] },
      { id: "louis-pasteur-achievement-2", textKey: "louis-pasteur.achievement.2", sourceIds: ["src_pasteur_shi", "src_pasteur_pouchet"] },
      { id: "louis-pasteur-achievement-3", textKey: "louis-pasteur.achievement.3", sourceIds: ["src_pasteur_gavi", "src_pasteur_iprabies", "src_pasteur_iphist"] },
    ],
    moments: [
      { id: "louis-pasteur-moment-1", textKey: "louis-pasteur.moment.1", sourceIds: ["src_pasteur_gavi"] },
    ],
    turningPoints: [
      {
        id: "louis-pasteur-turning-point-1",
        textKey: "louis-pasteur.turning_point.1",
        interpretationKey: "louis-pasteur.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_pasteur_shi"],
      },
      {
        id: "louis-pasteur-turning-point-2",
        textKey: "louis-pasteur.turning_point.2",
        interpretationKey: "louis-pasteur.interpretation.turning_point.2",
        attributeId: "risk_tolerance",
        sourceIds: ["src_pasteur_iphist", "src_pasteur_iprabies", "src_pasteur_hov"],
      },
      { id: "louis-pasteur-turning-point-3", textKey: "louis-pasteur.turning_point.3", sourceIds: ["src_pasteur_acadsilk", "src_pasteur_shi"] },
    ],
    complexities: [
      {
        id: "louis-pasteur-complexities-1",
        textKey: "louis-pasteur.complexities.1",
        sourceIds: ["src_pasteur_geison", "src_pasteur_gavi", "src_pasteur_hov"],
      },
    ],
    lifeArc: [
      { year: "1822", textKey: "louis-pasteur.life_arc.1", sourceIds: ["src_pasteur_shi"] },
      { year: "1843–1848", textKey: "louis-pasteur.life_arc.2", sourceIds: ["src_pasteur_shi"] },
      { year: "1857–1864", textKey: "louis-pasteur.life_arc.3", sourceIds: ["src_pasteur_shi", "src_pasteur_pouchet"] },
      { year: "1868", textKey: "louis-pasteur.life_arc.4", sourceIds: ["src_pasteur_shi"] },
      { year: "1881–1885", textKey: "louis-pasteur.life_arc.5", sourceIds: ["src_pasteur_gavi", "src_pasteur_iprabies", "src_pasteur_iphist"] },
      { year: "1887–1895", textKey: "louis-pasteur.life_arc.6", sourceIds: ["src_pasteur_shi"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.2 rewritten
  // -- the personal-archiving habit it previously described is real and
  // interesting but is a Life Scene (moved to moment.3, unchanged), not a
  // career-level achievement; the profile had no achievement at all
  // describing his actual musical innovation. Replaced with the
  // soloist/scat-singing achievement, sourced to this person's own
  // src_armstrong_hmbio and src_armstrong_teachout (both already in
  // roster9.ts's sources array), directly matching evidence episode #15 in
  // src/dev/roster1000/production/session18/louis-armstrong/rawNotes.md.
  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats,
  // team-credit review performed. The Waif's Home cornet training
  // (moment.1) and the Henderson/Hardin turning point (turning_point.1)
  // were already preserved -- P1. Birth year, Chicago move (King Oliver's
  // invitation -- his mentor, named explicitly in life_arc.3 rather than
  // omitted), the Hot Five/Seven formation years, and the international
  // touring/"Ambassador Satch" period were P2, verified directly against
  // a live Wikipedia fetch; this person's `sources` array has no plain
  // Wikipedia entry, so these beats cite src_armstrong_hmbio (this
  // profile's existing general-biography source, already used for
  // achievement.1/moment.1/turning_point.1). Per the person-specific
  // instruction, no beat reduces him to a single recording or an
  // entertainer stereotype, and life_arc.4 attributes the soloist-jazz
  // shift to "the improvised solo playing on these recordings," not to
  // Armstrong as jazz's sole originator.
  "louis-armstrong": {
    achievements: [
      { id: "louis-armstrong-achievement-1", textKey: "louis-armstrong.achievement.1", sourceIds: ["src_armstrong_hmbio"] },
      { id: "louis-armstrong-achievement-2", textKey: "louis-armstrong.achievement.2", sourceIds: ["src_armstrong_hmbio", "src_armstrong_teachout"] },
    ],
    moments: [
      { id: "louis-armstrong-moment-1", textKey: "louis-armstrong.moment.1", sourceIds: ["src_armstrong_hmbio"] },
      {
        id: "louis-armstrong-moment-2",
        textKey: "louis-armstrong.moment.2",
        interpretationKey: "louis-armstrong.interpretation.moment.2",
        attributeId: "risk_tolerance",
        sourceIds: ["src_armstrong_hmcivil"],
      },
      { id: "louis-armstrong-moment-3", textKey: "louis-armstrong.moment.3", sourceIds: ["src_armstrong_nation"] },
    ],
    turningPoints: [
      {
        id: "louis-armstrong-turning-point-1",
        textKey: "louis-armstrong.turning_point.1",
        interpretationKey: "louis-armstrong.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_armstrong_hmbio"],
      },
    ],
    lifeArc: [
      { year: "1901", textKey: "louis-armstrong.life_arc.1", sourceIds: ["src_armstrong_hmbio"] },
      { year: "1912–1914", textKey: "louis-armstrong.life_arc.2", sourceIds: ["src_armstrong_hmbio"] },
      { year: "1922–1925", textKey: "louis-armstrong.life_arc.3", sourceIds: ["src_armstrong_hmbio"] },
      { year: "1925–1928", textKey: "louis-armstrong.life_arc.4", sourceIds: ["src_armstrong_hmbio", "src_armstrong_teachout"] },
      { year: "1950s–1965", textKey: "louis-armstrong.life_arc.5", sourceIds: ["src_armstrong_hmbio"] },
      { year: "1971", textKey: "louis-armstrong.life_arc.6", sourceIds: ["src_armstrong_hmbio"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats,
  // team-credit review performed. The 1953 transistor-licensing decision
  // (achievement.1) and the 1979 Walkman push (achievement.2) were
  // already preserved -- P1. The Ibuka co-founding partnership (1946,
  // Tokyo Tsushin Kogyo), the 1958 Sony rename, the 1960 US relocation,
  // and the 1993 stroke/1994 retirement/1999 death sequence were P2,
  // verified directly against a live Wikipedia fetch; this person's
  // `sources` array has no plain Wikipedia entry, so these beats cite
  // src_morita_encyc (an encyclopedia biography already used for
  // achievement.1/moment.3/turning_point.1). Per the person-specific
  // instruction, life_arc.2 names Masaru Ibuka explicitly as co-founder
  // rather than crediting the company's founding to Morita alone --
  // avoiding the lone-founder framing the instruction warns against.
  "akio-morita": {
    achievements: [
      { id: "akio-morita-achievement-1", textKey: "akio-morita.achievement.1", sourceIds: ["src_morita_memoir", "src_morita_ebsco", "src_morita_encyc"] },
      {
        id: "akio-morita-achievement-2",
        textKey: "akio-morita.achievement.2",
        interpretationKey: "akio-morita.interpretation.achievement.2",
        attributeId: "decisiveness",
        sourceIds: ["src_morita_commoncog"],
      },
    ],
    moments: [
      { id: "akio-morita-moment-1", textKey: "akio-morita.moment.1", sourceIds: ["src_morita_memoir"] },
      { id: "akio-morita-moment-2", textKey: "akio-morita.moment.2", sourceIds: ["src_morita_nathan"] },
      { id: "akio-morita-moment-3", textKey: "akio-morita.moment.3", sourceIds: ["src_morita_encyc"] },
    ],
    turningPoints: [
      {
        id: "akio-morita-turning-point-1",
        textKey: "akio-morita.turning_point.1",
        interpretationKey: "akio-morita.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_morita_ebsco", "src_morita_encyc"],
      },
    ],
    lifeArc: [
      { year: "1921", textKey: "akio-morita.life_arc.1", sourceIds: ["src_morita_encyc"] },
      { year: "1946", textKey: "akio-morita.life_arc.2", sourceIds: ["src_morita_encyc"] },
      { year: "1953", textKey: "akio-morita.life_arc.3", sourceIds: ["src_morita_memoir", "src_morita_ebsco", "src_morita_encyc"] },
      { year: "1960", textKey: "akio-morita.life_arc.4", sourceIds: ["src_morita_encyc"] },
      { year: "1979", textKey: "akio-morita.life_arc.5", sourceIds: ["src_morita_commoncog"] },
      { year: "1993–1999", textKey: "akio-morita.life_arc.6", sourceIds: ["src_morita_encyc"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats,
  // team-credit review performed. The Brasília construction/Kubitschek
  // invitation (achievement.1) and the exile-era international practice
  // (achievement.2) were already preserved -- P1, and life_arc.3/5 draw on
  // that same P1 text rather than restating it verbatim. Education year
  // (1934 graduation), the pre-Brasília early-modernist period (joining
  // Lúcio Costa's team from 1936), and the exact death date were P2,
  // verified directly against a live Wikipedia fetch; this person's
  // `sources` array has no plain Wikipedia entry, so these beats cite
  // src_niemeyer_wr (this profile's existing general source, already used
  // for achievement.1/2 and turning_point.1). life_arc.4's exile-departure
  // year is kept at 1965 to match this profile's own already-published
  // turning_point.1 (P1) rather than the fresh fetch's 1966 for the Paris
  // move -- preferring the already-established P1 claim over a new,
  // slightly conflicting P2 one, per the provenance model's "prefer P1
  // where equally useful" rule. Per the person-specific instruction,
  // life_arc.2/3 keep Costa's and Kubitschek's roles visible rather than
  // reducing the career to Brasília alone or to solo authorship.
  "oscar-niemeyer": {
    achievements: [
      { id: "oscar-niemeyer-achievement-1", textKey: "oscar-niemeyer.achievement.1", sourceIds: ["src_niemeyer_wr"] },
      { id: "oscar-niemeyer-achievement-2", textKey: "oscar-niemeyer.achievement.2", sourceIds: ["src_niemeyer_parisupdate", "src_niemeyer_wr"] },
    ],
    moments: [
      { id: "oscar-niemeyer-moment-1", textKey: "oscar-niemeyer.moment.1", sourceIds: ["src_niemeyer_riba"] },
      { id: "oscar-niemeyer-moment-2", textKey: "oscar-niemeyer.moment.2", sourceIds: ["src_niemeyer_vice"] },
      { id: "oscar-niemeyer-moment-3", textKey: "oscar-niemeyer.moment.3", sourceIds: ["src_niemeyer_vice"] },
    ],
    turningPoints: [
      {
        id: "oscar-niemeyer-turning-point-1",
        textKey: "oscar-niemeyer.turning_point.1",
        interpretationKey: "oscar-niemeyer.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_niemeyer_wr", "src_niemeyer_parisupdate"],
      },
    ],
    lifeArc: [
      { year: "1907", textKey: "oscar-niemeyer.life_arc.1", sourceIds: ["src_niemeyer_wr"] },
      { year: "1934–1943", textKey: "oscar-niemeyer.life_arc.2", sourceIds: ["src_niemeyer_wr"] },
      { year: "1956–1960", textKey: "oscar-niemeyer.life_arc.3", sourceIds: ["src_niemeyer_wr", "src_niemeyer_parisupdate"] },
      { year: "1964–1965", textKey: "oscar-niemeyer.life_arc.4", sourceIds: ["src_niemeyer_wr", "src_niemeyer_parisupdate"] },
      { year: "1965–1985", textKey: "oscar-niemeyer.life_arc.5", sourceIds: ["src_niemeyer_parisupdate", "src_niemeyer_wr"] },
      { year: "2012", textKey: "oscar-niemeyer.life_arc.6", sourceIds: ["src_niemeyer_wr"] },
    ],
  },

  // Profile V2 pilot (2026-08), Complexities pilot -- see docs/editorial-content.md
  // and the i18n comment above this person's EN block for the full rationale.
  // turning_point.2 (Rohingya-era conduct) moved to `complexities`, its old
  // forced-symmetry interpretation dropped rather than carried over.
  // achievement.2 is new: the 2015 election / State Counsellor role, sourced
  // from citations already on this person's own record.
  "aung-san-suu-kyi": {
    achievements: [
      { id: "aung-san-suu-kyi-achievement-1", textKey: "aung-san-suu-kyi.achievement.1", sourceIds: ["src_assk_hrw"] },
      { id: "aung-san-suu-kyi-achievement-2", textKey: "aung-san-suu-kyi.achievement.2", sourceIds: ["src_assk_jod", "src_assk_time"] },
    ],
    moments: [
      { id: "aung-san-suu-kyi-moment-1", textKey: "aung-san-suu-kyi.moment.1", sourceIds: ["src_assk_time", "src_assk_own_writing"] },
      { id: "aung-san-suu-kyi-moment-2", textKey: "aung-san-suu-kyi.moment.2", sourceIds: ["src_assk_time"] },
    ],
    turningPoints: [
      {
        id: "aung-san-suu-kyi-turning-point-1",
        textKey: "aung-san-suu-kyi.turning_point.1",
        interpretationKey: "aung-san-suu-kyi.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_assk_own_writing", "src_assk_popham"],
      },
    ],
    // Evidence-gated, deliberately the only person in this pilot with one:
    // the historical record itself (not just a trait trade-off) is genuinely
    // contested here. No interpretationKey -- see the i18n comment for why
    // an interpretation was judged riskier than none at all for this item.
    //
    // Profile V2 evidence-closure pass (2026-08): re-verified this item
    // directly against src_assk_aj_icj (her actual ICJ speech transcript)
    // and against the underlying UN investigation itself, not just
    // secondary press summarizing it. Her ICJ argument was previously
    // paraphrased ("domestic counter-insurgency response") -- replaced
    // with her own quoted words ("dealing with an internal armed
    // conflict" / the military "responded"), directly confirmed in the
    // transcript. The prior "mass killing, rape, and arson" characterization
    // understated what the UN Independent International Fact-Finding
    // Mission itself concluded (a specific "genocidal intent" finding,
    // recommending prosecution for genocide) -- strengthened to name that
    // finding accurately, attributed to the Mission, not asserted as this
    // profile's own verdict. New source src_assk_un_ffm added (the
    // OHCHR press release on the Mission's report), directly fetched and
    // inspected.
    complexities: [
      {
        id: "aung-san-suu-kyi-complexities-1",
        textKey: "aung-san-suu-kyi.complexities.1",
        sourceIds: ["src_assk_aj_trouble", "src_assk_jod", "src_assk_aj_icj", "src_assk_asiatimes", "src_assk_un_ffm"],
      },
    ],
    lifeArc: [
      { year: "1945", textKey: "aung-san-suu-kyi.life_arc.1", sourceIds: ["src_assk_popham"] },
      { year: "1988", textKey: "aung-san-suu-kyi.life_arc.2", sourceIds: ["src_assk_own_writing"] },
      { year: "1989–2010", textKey: "aung-san-suu-kyi.life_arc.3", sourceIds: ["src_assk_hrw"] },
      { year: "1991", textKey: "aung-san-suu-kyi.life_arc.4", sourceIds: ["src_assk_hrw"] },
      { year: "2015", textKey: "aung-san-suu-kyi.life_arc.5", sourceIds: ["src_assk_jod", "src_assk_time"] },
      { year: "2021", textKey: "aung-san-suu-kyi.life_arc.6", sourceIds: ["src_assk_asiatimes"] },
    ],
    legacy: { textKey: "aung-san-suu-kyi.legacy", sourceIds: ["src_assk_popham", "src_assk_hrw"] },
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The Tractatus/decade-
  // away-from-philosophy arc (achievement.1) and the inheritance
  // renunciation (moment.1) were already preserved -- P1. The engineering
  // years (Berlin 1906, Manchester aeronautics research from 1908), the
  // exact 1911 arrival at Cambridge under Russell, the 1914-1918 WWI
  // service and Italian POW camp, and the 1929 return to Cambridge were
  // not previously dated in this profile -- P2, verified directly against
  // src_wittgenstein_wikipedia (live fetch). This profile's own e2e
  // fixture role (the "graceful absence of optional fields" test) is
  // migrated off this person in the same batch -- see e2e/editorial.spec.ts.
  // Per the person-specific instruction, no beat infers a psychological
  // motive for the engineering-to-philosophy shift or the inheritance
  // renunciation; each is stated as a documented act only.
  "ludwig-wittgenstein": {
    achievements: [
      { id: "ludwig-wittgenstein-achievement-1", textKey: "ludwig-wittgenstein.achievement.1", sourceIds: ["src_wittgenstein_monk", "src_wittgenstein_wikipedia"] },
      {
        id: "ludwig-wittgenstein-achievement-2",
        textKey: "ludwig-wittgenstein.achievement.2",
        interpretationKey: "ludwig-wittgenstein.interpretation.achievement.2",
        attributeId: "belief_updating",
        sourceIds: ["src_wittgenstein_wikipedia", "src_wittgenstein_sep"],
      },
    ],
    moments: [
      { id: "ludwig-wittgenstein-moment-1", textKey: "ludwig-wittgenstein.moment.1", sourceIds: ["src_wittgenstein_monk"] },
      { id: "ludwig-wittgenstein-moment-2", textKey: "ludwig-wittgenstein.moment.2", sourceIds: ["src_wittgenstein_monk", "src_wittgenstein_sep"] },
    ],
    turningPoints: [
      {
        id: "ludwig-wittgenstein-turning-point-1",
        textKey: "ludwig-wittgenstein.turning_point.1",
        interpretationKey: "ludwig-wittgenstein.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_wittgenstein_monk"],
      },
    ],
    lifeArc: [
      { year: "1889", textKey: "ludwig-wittgenstein.life_arc.1", sourceIds: ["src_wittgenstein_wikipedia"] },
      { year: "1906–1911", textKey: "ludwig-wittgenstein.life_arc.2", sourceIds: ["src_wittgenstein_wikipedia"] },
      { year: "1914–1918", textKey: "ludwig-wittgenstein.life_arc.3", sourceIds: ["src_wittgenstein_wikipedia"] },
      { year: "1921", textKey: "ludwig-wittgenstein.life_arc.4", sourceIds: ["src_wittgenstein_wikipedia", "src_wittgenstein_monk"] },
      { year: "1929", textKey: "ludwig-wittgenstein.life_arc.5", sourceIds: ["src_wittgenstein_wikipedia", "src_wittgenstein_sep"] },
      { year: "1951", textKey: "ludwig-wittgenstein.life_arc.6", sourceIds: ["src_wittgenstein_wikipedia"] },
    ],
  },

  "thomas-edison": {
    achievements: [
      { id: "thomas-edison-achievement-1", textKey: "thomas-edison.achievement.1", sourceIds: ["src_edison_israel", "src_edison_wikipedia"] },
      {
        id: "thomas-edison-achievement-2",
        textKey: "thomas-edison.achievement.2",
        interpretationKey: "thomas-edison.interpretation.achievement.2",
        attributeId: "planning_orientation",
        sourceIds: ["src_edison_israel"],
      },
    ],
    moments: [
      { id: "thomas-edison-moment-1", textKey: "thomas-edison.moment.1", sourceIds: ["src_edison_israel"] },
      { id: "thomas-edison-moment-2", textKey: "thomas-edison.moment.2", sourceIds: ["src_edison_wikipedia", "src_edison_israel"] },
      { id: "thomas-edison-moment-3", textKey: "thomas-edison.moment.3", sourceIds: ["src_edison_israel"] },
    ],
    turningPoints: [],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats, chronology only, per
    // the person-specific instruction not to reopen the completed Batch-A
    // Complexity/Moment classification decision (nothing above this
    // comment was touched). None of this profile's existing items carry a
    // year at all, so every beat below required P2 verification, directly
    // against src_edison_wikipedia (live fetch, not memory): telegraph-
    // operator years (1863-1869, "a succession of night-shift telegraphy
    // positions across Ontario, Michigan, Kentucky, Ohio, and
    // Massachusetts" -- not previously mentioned anywhere in this profile
    // at all); Menlo Park founded 1876; Pearl Street Station opened
    // 4 September 1882; the "War of Currents" (moment.2) ran roughly
    // 1886-1892 (Westinghouse's first AC systems in 1886 through the 1892
    // Edison General Electric/Thomson-Houston merger). Per the person-
    // specific instruction, the arc is a neutral career skeleton, not
    // lone-inventor mythology: it includes moment.3's uncredited-employee-
    // contributions and failed iron-ore venture in the closing beat rather
    // than omitting the more mixed later picture.
    lifeArc: [
      { year: "1847", textKey: "thomas-edison.life_arc.1", sourceIds: ["src_edison_wikipedia"] },
      { year: "1863–1869", textKey: "thomas-edison.life_arc.2", sourceIds: ["src_edison_wikipedia"] },
      { year: "1876", textKey: "thomas-edison.life_arc.3", sourceIds: ["src_edison_israel", "src_edison_wikipedia"] },
      { year: "1882", textKey: "thomas-edison.life_arc.4", sourceIds: ["src_edison_wikipedia", "src_edison_israel"] },
      { year: "1886–1892", textKey: "thomas-edison.life_arc.5", sourceIds: ["src_edison_wikipedia", "src_edison_israel"] },
      { year: "1931", textKey: "thomas-edison.life_arc.6", sourceIds: ["src_edison_wikipedia", "src_edison_israel"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The Sistine ceiling and
  // late-career architectural shift (achievement.1/2) were already
  // preserved -- P1. The Ghirlandaio apprenticeship year (1488), the
  // Medici sculpture-garden training, the Pietà (1498-1499) and David
  // (1501-1504) dates, and the 1546 St. Peter's appointment were not
  // previously dated in this profile -- P2, verified directly against
  // src_michelangelo_wikipedia (live fetch). Per the person-specific
  // instruction, the arc keeps workshop/patron context rather than
  // lone-genius framing throughout: life_arc.2 names Ghirlandaio and the
  // Medici household, life_arc.3 states the Pietà was completed "under a
  // cardinal's commission," and life_arc.4 names Pope Julius II as the
  // Sistine ceiling's patron. This profile's own 1506 Rome-flight Turning
  // Point (already covered elsewhere on the page) is deliberately not
  // re-listed here, since the arc's six phase-level beats already give
  // complete chronological orientation without it.
  michelangelo: {
    achievements: [
      { id: "michelangelo-achievement-1", textKey: "michelangelo.achievement.1", sourceIds: ["src_michelangelo_wikipedia", "src_michelangelo_vasari"] },
      { id: "michelangelo-achievement-2", textKey: "michelangelo.achievement.2", sourceIds: ["src_michelangelo_wikipedia"] },
    ],
    moments: [
      { id: "michelangelo-moment-1", textKey: "michelangelo.moment.1", sourceIds: ["src_michelangelo_vasari"] },
      {
        id: "michelangelo-moment-2",
        textKey: "michelangelo.moment.2",
        interpretationKey: "michelangelo.interpretation.moment.2",
        attributeId: "perfectionism",
        sourceIds: ["src_michelangelo_vasari"],
      },
    ],
    turningPoints: [
      {
        id: "michelangelo-turning-point-1",
        textKey: "michelangelo.turning_point.1",
        interpretationKey: "michelangelo.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_michelangelo_vasari"],
      },
    ],
    lifeArc: [
      { year: "1475", textKey: "michelangelo.life_arc.1", sourceIds: ["src_michelangelo_wikipedia"] },
      { year: "1488", textKey: "michelangelo.life_arc.2", sourceIds: ["src_michelangelo_wikipedia"] },
      { year: "1498–1504", textKey: "michelangelo.life_arc.3", sourceIds: ["src_michelangelo_wikipedia"] },
      { year: "1508–1512", textKey: "michelangelo.life_arc.4", sourceIds: ["src_michelangelo_wikipedia"] },
      { year: "1546", textKey: "michelangelo.life_arc.5", sourceIds: ["src_michelangelo_wikipedia"] },
      { year: "1564", textKey: "michelangelo.life_arc.6", sourceIds: ["src_michelangelo_wikipedia"] },
    ],
  },

  "malcolm-x": {
    achievements: [
      { id: "malcolm-x-achievement-1", textKey: "malcolm-x.achievement.1", sourceIds: ["src_malcolmx_wikipedia"] },
      { id: "malcolm-x-achievement-2", textKey: "malcolm-x.achievement.2", sourceIds: ["src_malcolmx_wikipedia", "src_malcolmx_autobiography"] },
    ],
    moments: [
      {
        id: "malcolm-x-moment-1",
        textKey: "malcolm-x.moment.1",
        interpretationKey: "malcolm-x.interpretation.moment.1",
        attributeId: "deep_focus",
        sourceIds: ["src_malcolmx_autobiography"],
      },
      { id: "malcolm-x-moment-2", textKey: "malcolm-x.moment.2", sourceIds: ["src_malcolmx_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "malcolm-x-turning-point-1",
        textKey: "malcolm-x.turning_point.1",
        interpretationKey: "malcolm-x.interpretation.turning_point.1",
        attributeId: "belief_updating",
        sourceIds: ["src_malcolmx_autobiography", "src_malcolmx_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. His incarceration and
    // release years (moment.1 describes the prison education program but
    // gives no dates) were not preserved -- P2, verified directly against
    // src_malcolmx_wikipedia (live fetch: "sentenced in February 1946 and
    // released on parole in August 1952"; conversion to the Nation of Islam
    // confirmed as happening during that sentence). Per the person-specific
    // instruction, the arc keeps early life/incarceration-conversion/NOI
    // rise/1964 break-pilgrimage/later evolution/assassination distinct
    // rather than compressing his post-1964 change into a single
    // redemption beat -- life_arc.4 and life_arc.5 separate the pilgrimage-
    // driven worldview revision from the concrete organizational rebuilding
    // that followed it, both already dated 1964 in achievement.2/
    // turning_point.1.
    lifeArc: [
      { year: "1925", textKey: "malcolm-x.life_arc.1", sourceIds: ["src_malcolmx_wikipedia"] },
      { year: "1946–1952", textKey: "malcolm-x.life_arc.2", sourceIds: ["src_malcolmx_autobiography", "src_malcolmx_wikipedia"] },
      { year: "Early 1960s", textKey: "malcolm-x.life_arc.3", sourceIds: ["src_malcolmx_wikipedia"] },
      { year: "1964", textKey: "malcolm-x.life_arc.4", sourceIds: ["src_malcolmx_autobiography", "src_malcolmx_wikipedia"] },
      { year: "1964", textKey: "malcolm-x.life_arc.5", sourceIds: ["src_malcolmx_wikipedia", "src_malcolmx_autobiography"] },
      { year: "1965", textKey: "malcolm-x.life_arc.6", sourceIds: ["src_malcolmx_wikipedia"] },
    ],
  },

  "wilbur-wright": {
    achievements: [
      { id: "wilbur-wright-achievement-1", textKey: "wilbur-wright.achievement.1", sourceIds: ["src_wright_mccullough", "src_wright_wikipedia"] },
      { id: "wilbur-wright-achievement-2", textKey: "wilbur-wright.achievement.2", sourceIds: ["src_wright_wikipedia"] },
    ],
    moments: [
      {
        id: "wilbur-wright-moment-1",
        textKey: "wilbur-wright.moment.1",
        interpretationKey: "wilbur-wright.interpretation.moment.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_wright_mccullough"],
      },
      { id: "wilbur-wright-moment-2", textKey: "wilbur-wright.moment.2", sourceIds: ["src_wright_mccullough"] },
      { id: "wilbur-wright-moment-3", textKey: "wilbur-wright.moment.3", sourceIds: ["src_wright_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "wilbur-wright-turning-point-1",
        textKey: "wilbur-wright.turning_point.1",
        interpretationKey: "wilbur-wright.interpretation.turning_point.1",
        attributeId: "persuasiveness",
        sourceIds: ["src_wright_mccullough", "src_wright_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats, entirely P1 -- every
    // beat and year reuses a fact already stated in achievements/moments/
    // turning_point.1 above. Per the person-specific instruction, every
    // beat covering jointly-developed aviation work explicitly credits
    // Orville too ("with his brother Orville" / "with Orville") rather
    // than attributing it to Wilbur alone -- the source material already
    // frames these as joint work (achievement.1: "Wilbur and his brother
    // Orville ran..."), and this Life Arc preserves that framing.
    lifeArc: [
      { year: "1867", textKey: "wilbur-wright.life_arc.1", sourceIds: ["src_wright_wikipedia"] },
      { year: "1900–1903", textKey: "wilbur-wright.life_arc.2", sourceIds: ["src_wright_mccullough", "src_wright_wikipedia"] },
      { year: "December 1903", textKey: "wilbur-wright.life_arc.3", sourceIds: ["src_wright_mccullough", "src_wright_wikipedia"] },
      { year: "1903–1908", textKey: "wilbur-wright.life_arc.4", sourceIds: ["src_wright_mccullough"] },
      { year: "1908", textKey: "wilbur-wright.life_arc.5", sourceIds: ["src_wright_mccullough", "src_wright_wikipedia"] },
      { year: "1912", textKey: "wilbur-wright.life_arc.6", sourceIds: ["src_wright_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The Allenstein Castle
  // defense (moment.1) and the decades-long publication delay
  // (moment.2/turning_point.1) were already preserved -- P1. His
  // education years (Kraków 1491-1495, then Bologna/Padua/Ferrara through
  // his 1503 canon-law doctorate), the c.1510 Frombork settlement, and the
  // exact 1543 death date were not previously dated in this profile -- P2,
  // verified directly against src_copernicus_wikipedia (live fetch). Per
  // the person-specific instruction, life_arc.4/6 do not claim he "proved"
  // heliocentrism -- life_arc.4 says he "completed the core mathematics,"
  // life_arc.6 explicitly states the wider astronomical influence
  // "unfolded mostly after his death," preserving the same
  // limited-immediate-impact framing this profile's own turning_point.1
  // already established.
  "nicolaus-copernicus": {
    achievements: [
      { id: "nicolaus-copernicus-achievement-1", textKey: "nicolaus-copernicus.achievement.1", sourceIds: ["src_copernicus_revolutionibus", "src_copernicus_wikipedia"] },
      { id: "nicolaus-copernicus-achievement-2", textKey: "nicolaus-copernicus.achievement.2", sourceIds: ["src_copernicus_wikipedia", "src_copernicus_mactutor"] },
    ],
    moments: [
      {
        id: "nicolaus-copernicus-moment-1",
        textKey: "nicolaus-copernicus.moment.1",
        interpretationKey: "nicolaus-copernicus.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_copernicus_mactutor"],
      },
      { id: "nicolaus-copernicus-moment-2", textKey: "nicolaus-copernicus.moment.2", sourceIds: ["src_copernicus_gingerich"] },
    ],
    turningPoints: [
      {
        id: "nicolaus-copernicus-turning-point-1",
        textKey: "nicolaus-copernicus.turning_point.1",
        interpretationKey: "nicolaus-copernicus.interpretation.turning_point.1",
        attributeId: "perfectionism",
        sourceIds: ["src_copernicus_gingerich", "src_copernicus_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1473", textKey: "nicolaus-copernicus.life_arc.1", sourceIds: ["src_copernicus_wikipedia"] },
      { year: "1491–1503", textKey: "nicolaus-copernicus.life_arc.2", sourceIds: ["src_copernicus_wikipedia"] },
      { year: "1503–c. 1510", textKey: "nicolaus-copernicus.life_arc.3", sourceIds: ["src_copernicus_wikipedia"] },
      { year: "c. 1514", textKey: "nicolaus-copernicus.life_arc.4", sourceIds: ["src_copernicus_gingerich", "src_copernicus_wikipedia"] },
      { year: "1520–1521", textKey: "nicolaus-copernicus.life_arc.5", sourceIds: ["src_copernicus_mactutor"] },
      { year: "1543", textKey: "nicolaus-copernicus.life_arc.6", sourceIds: ["src_copernicus_revolutionibus", "src_copernicus_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 6 -- FINAL batch (2026-08): 6 beats. The 1852
  // temperance-society founding (turning_point.1), the 1866/1869
  // organization co-foundings (achievement.1), and the 1872/1873
  // vote-and-trial episode (moment.1/2) were already preserved -- P1.
  // Exact birth/death dates and confirmation that she led NAWSA after
  // 1890 were P2, verified directly against src_anthony_wikipedia (live
  // fetch); life_arc.6 deliberately does not name NAWSA specifically,
  // since the fetch could not confirm an end date for her presidency
  // before her death, so the beat states only that she "continued
  // organizing," per the minimal-evidence principle (don't add detail
  // merely because available when it isn't fully pinned down). Per the
  // person-specific instruction, life_arc.6 explicitly separates her 1906
  // death from the 19th Amendment's 1920 ratification -- fourteen years
  // later -- rather than implying she witnessed national suffrage, and no
  // beat frames her as having single-handedly created the movement.
  "susan-b-anthony": {
    achievements: [
      { id: "susan-b-anthony-achievement-1", textKey: "susan-b-anthony.achievement.1", sourceIds: ["src_anthony_wikipedia", "src_anthony_nps"] },
      { id: "susan-b-anthony-achievement-2", textKey: "susan-b-anthony.achievement.2", sourceIds: ["src_anthony_wikipedia"] },
    ],
    moments: [
      { id: "susan-b-anthony-moment-1", textKey: "susan-b-anthony.moment.1", sourceIds: ["src_anthony_nps", "src_anthony_wikipedia"] },
      {
        id: "susan-b-anthony-moment-2",
        textKey: "susan-b-anthony.moment.2",
        interpretationKey: "susan-b-anthony.interpretation.moment.2",
        attributeId: "independent_thinking",
        sourceIds: ["src_anthony_wikipedia", "src_anthony_nps"],
      },
    ],
    turningPoints: [
      {
        id: "susan-b-anthony-turning-point-1",
        textKey: "susan-b-anthony.turning_point.1",
        interpretationKey: "susan-b-anthony.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_anthony_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1820", textKey: "susan-b-anthony.life_arc.1", sourceIds: ["src_anthony_wikipedia"] },
      { year: "1852", textKey: "susan-b-anthony.life_arc.2", sourceIds: ["src_anthony_wikipedia"] },
      { year: "1866–1869", textKey: "susan-b-anthony.life_arc.3", sourceIds: ["src_anthony_wikipedia"] },
      { year: "1872", textKey: "susan-b-anthony.life_arc.4", sourceIds: ["src_anthony_wikipedia", "src_anthony_nps"] },
      { year: "1873", textKey: "susan-b-anthony.life_arc.5", sourceIds: ["src_anthony_wikipedia", "src_anthony_nps"] },
      { year: "1906", textKey: "susan-b-anthony.life_arc.6", sourceIds: ["src_anthony_wikipedia"] },
    ],
  },

  "galileo-galilei": {
    achievements: [
      { id: "galileo-galilei-achievement-1", textKey: "galileo-galilei.achievement.1", sourceIds: ["src_galileo_wikipedia"] },
      { id: "galileo-galilei-achievement-2", textKey: "galileo-galilei.achievement.2", sourceIds: ["src_galileo_drake"] },
    ],
    moments: [
      { id: "galileo-galilei-moment-1", textKey: "galileo-galilei.moment.1", sourceIds: ["src_galileo_wikipedia"] },
      {
        id: "galileo-galilei-moment-2",
        textKey: "galileo-galilei.moment.2",
        interpretationKey: "galileo-galilei.interpretation.moment.2",
        attributeId: "belief_updating",
        sourceIds: ["src_galileo_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "galileo-galilei-turning-point-1",
        textKey: "galileo-galilei.turning_point.1",
        interpretationKey: "galileo-galilei.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_galileo_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats, entirely P1 -- every
    // beat and year reuses a fact already stated in achievement.1 and
    // turning_point.1 above (1642 death derives from turning_point.1's
    // already-preserved "spent the remainder of his life under house
    // arrest" + roster deathYear). Per the person-specific instruction,
    // the trial/condemnation beats are kept to the plain documented
    // sequence -- prohibited, published anyway, tried, recanted, house
    // arrest -- with no "proved the Church wrong" framing or other
    // science-vs-religion slogan, and the falling-body experiments
    // (achievement.2, undated in this profile) were left out rather than
    // given an invented year.
    lifeArc: [
      { year: "1564", textKey: "galileo-galilei.life_arc.1", sourceIds: ["src_galileo_wikipedia"] },
      { year: "1609", textKey: "galileo-galilei.life_arc.2", sourceIds: ["src_galileo_wikipedia"] },
      { year: "1616", textKey: "galileo-galilei.life_arc.3", sourceIds: ["src_galileo_wikipedia"] },
      { year: "1632", textKey: "galileo-galilei.life_arc.4", sourceIds: ["src_galileo_wikipedia"] },
      { year: "1633", textKey: "galileo-galilei.life_arc.5", sourceIds: ["src_galileo_wikipedia"] },
      { year: "1642", textKey: "galileo-galilei.life_arc.6", sourceIds: ["src_galileo_wikipedia"] },
    ],
  },

  "niels-bohr": {
    achievements: [
      { id: "niels-bohr-achievement-1", textKey: "niels-bohr.achievement.1", sourceIds: ["src_bohr_nobel", "src_bohr_pais"] },
      { id: "niels-bohr-achievement-2", textKey: "niels-bohr.achievement.2", sourceIds: ["src_bohr_wikipedia", "src_bohr_pais"] },
    ],
    moments: [
      {
        id: "niels-bohr-moment-1",
        textKey: "niels-bohr.moment.1",
        interpretationKey: "niels-bohr.interpretation.moment.1",
        attributeId: "persuasiveness",
        sourceIds: ["src_bohr_pais"],
      },
      { id: "niels-bohr-moment-2", textKey: "niels-bohr.moment.2", sourceIds: ["src_bohr_pais", "src_bohr_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "niels-bohr-turning-point-1",
        textKey: "niels-bohr.turning_point.1",
        interpretationKey: "niels-bohr.interpretation.turning_point.1",
        attributeId: "impact_motivation",
        sourceIds: ["src_bohr_pais"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. The Bohr-model year
    // (1913) and the Institute's founding year (1921) were not preserved
    // -- achievement.1/2 describe both but give no dates -- P2, verified
    // directly against src_bohr_wikipedia (live fetch: the atomic-model
    // "trilogy" published in Philosophical Magazine in 1913; Institute
    // "officially opened on March 3, 1921"). Per the person-specific
    // instruction, this arc is not a physics-discovery list: life_arc.2
    // covers the model+Nobel together in one beat specifically so wartime
    // displacement and postwar advocacy (life_arc.4/5) get their own
    // beats rather than being crowded out, and life_arc.4/5 are precise
    // that he worked ON the Manhattan Project and then advocated AGAINST
    // an unrestrained arms race -- not that he was a sole or central bomb
    // designer, which the preserved evidence does not support.
    lifeArc: [
      { year: "1885", textKey: "niels-bohr.life_arc.1", sourceIds: ["src_bohr_wikipedia"] },
      { year: "1913", textKey: "niels-bohr.life_arc.2", sourceIds: ["src_bohr_wikipedia", "src_bohr_nobel"] },
      { year: "1921", textKey: "niels-bohr.life_arc.3", sourceIds: ["src_bohr_wikipedia", "src_bohr_pais"] },
      { year: "1943", textKey: "niels-bohr.life_arc.4", sourceIds: ["src_bohr_pais", "src_bohr_wikipedia"] },
      { year: "1944", textKey: "niels-bohr.life_arc.5", sourceIds: ["src_bohr_pais"] },
      { year: "1962", textKey: "niels-bohr.life_arc.6", sourceIds: ["src_bohr_wikipedia"] },
    ],
  },

  "immanuel-kant": {
    achievements: [
      { id: "immanuel-kant-achievement-1", textKey: "immanuel-kant.achievement.1", sourceIds: ["src_kant_sep", "src_kant_wikipedia"] },
      { id: "immanuel-kant-achievement-2", textKey: "immanuel-kant.achievement.2", sourceIds: ["src_kant_wikipedia", "src_kant_sep"] },
    ],
    moments: [
      { id: "immanuel-kant-moment-1", textKey: "immanuel-kant.moment.1", sourceIds: ["src_kant_kuehn"] },
      {
        id: "immanuel-kant-moment-2",
        textKey: "immanuel-kant.moment.2",
        interpretationKey: "immanuel-kant.interpretation.moment.2",
        attributeId: "perfectionism",
        sourceIds: ["src_kant_kuehn"],
      },
    ],
    turningPoints: [
      {
        id: "immanuel-kant-turning-point-1",
        textKey: "immanuel-kant.turning_point.1",
        interpretationKey: "immanuel-kant.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_kant_kuehn", "src_kant_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. His professorship year
    // and birth/death city were not preserved (moment.2's "published...
    // only at 57" is age-relative, not a stated year) -- P2, verified
    // directly against src_kant_wikipedia (live fetch: "In 1770, Kant was
    // appointed Full Professor of Logic and Metaphysics at the University
    // of Königsberg"; born and died in Königsberg, spending his entire
    // professional life there). life_arc.3's 1781 is arithmetic on
    // moment.2's already-preserved "at 57" + birthYear 1724, not new
    // research. Per the person-specific instruction, no dramatic turning
    // point is manufactured and no trait is inferred from his routine --
    // moment.1 (the clockwork-precise daily walk) is deliberately left out
    // of the arc, and life_arc.4/.5 use relative labels ("Following years,"
    // "Later years") rather than invented exact dates for his later works
    // and the censorship episode, since neither is dated in the preserved
    // text.
    lifeArc: [
      { year: "1724", textKey: "immanuel-kant.life_arc.1", sourceIds: ["src_kant_wikipedia"] },
      { year: "1770", textKey: "immanuel-kant.life_arc.2", sourceIds: ["src_kant_wikipedia"] },
      { year: "1781", textKey: "immanuel-kant.life_arc.3", sourceIds: ["src_kant_kuehn", "src_kant_wikipedia"] },
      { year: "Following years", textKey: "immanuel-kant.life_arc.4", sourceIds: ["src_kant_sep", "src_kant_wikipedia"] },
      { year: "Later years", textKey: "immanuel-kant.life_arc.5", sourceIds: ["src_kant_kuehn", "src_kant_wikipedia"] },
      { year: "1804", textKey: "immanuel-kant.life_arc.6", sourceIds: ["src_kant_wikipedia"] },
    ],
  },

  // Profile Quality Normalization Batch B (2026-08): added achievement.2 and
  // legacy. The audit flagged the MacArthur Fellowship as a possible gap;
  // per this batch's explicit instruction, the award is used only as
  // evidence for a larger claim (her body of work's standing in the
  // genre), never as the achievement itself. Existing preserved evidence
  // (Wikipedia + Huntington archive) had nothing on any of the following.
  //
  // Provenance-closure remediation (2026-08, same batch): itemized below,
  // per claim, tying each published fact to the specific source that
  // verified it (the original comment named sources fetched but didn't
  // do this per-claim).
  // - Hugo/Nebula wins ("Bloodchild" Hugo+Nebula 1984-85; Parable of the
  //   Talents, 1999 Nebula Best Novel): en.wikipedia.org/wiki/
  //   Octavia_E._Butler (src_butler_wikipedia, direct fetch, 2026-08)
  //   lists Hugo 1984 Best Short Story ("Speech Sounds"), Hugo 1985 Best
  //   Novelette ("Bloodchild"), Nebula 1984 Best Novelette ("Bloodchild"),
  //   Nebula 1999 Best Novel (Parable of the Talents) -- achievement.2's
  //   "1984-85" phrasing spans Bloodchild's two separate award years.
  // - MacArthur Fellowship (1995) + the Foundation's own "transcendent
  //   fables" citation language: macfound.org/fellows/class-of-1995/
  //   octavia-butler (src_butler_macfound, direct fetch, 2026-08), quoted
  //   directly, not paraphrased. "First science-fiction writer" to
  //   receive one: Smithsonian Magazine (src_butler_smithsonian, direct
  //   fetch, 2026-08) states this explicitly; the Foundation's own page
  //   doesn't rank/compare fellows, so that specific superlative is
  //   attributed to Smithsonian, not macfound.org.
  // - "Vanguard of Afrofuturism" (not "Mother of Afrofuturism," an
  //   earlier draft's over-claim caught and corrected this session):
  //   Smithsonian Magazine (src_butler_smithsonian, same fetch), which
  //   also independently confirms "two Nebula Awards, two Hugo Awards" --
  //   cross-checked against the Wikipedia count above; both agree.
  // - Kindred graphic novel (2017, NYT bestseller) and FX series (Dec
  //   2022), Parable of the Sower opera (2015), the Carl Brandon
  //   Society's Octavia E. Butler Memorial Scholarship (established 2006,
  //   the year she died, funding writers of color attending Clarion):
  //   the same en.wikipedia.org/wiki/Octavia_E._Butler fetch above
  //   ("Adaptations" and "Memorial Programs" sections).
  // - NASA naming the Perseverance rover's landing site "Octavia E.
  //   Butler Landing" (2021): science.nasa.gov/resource/welcome-to-
  //   octavia-e-butler-landing (src_butler_nasa, direct fetch, 2026-08;
  //   that page itself gives no rationale for the naming beyond the fact
  //   of it, so this profile's legacy text states only the fact, not a
  //   claimed motivation), cross-checked against the Wikipedia fetch
  //   above for the year.
  // Three new dedicated sources added to this person's own `sources`
  // array (src_butler_macfound, src_butler_nasa, src_butler_smithsonian)
  // per the provenance rule -- a generic existing URL was not enough for
  // these specific new claims.
  // Life Arc Backfill Batch 5 (2026-08): 6 beats. Does not reopen the
  // Profile Quality Normalization Batch B achievement/legacy decisions
  // (nothing above this comment touched). The Clarion workshop (moment.3)
  // and MacArthur Fellowship (achievement.2/legacy) were already
  // preserved -- P1. Patternmaster's 1976 publication year, the Kindred
  // (1979) / Xenogenesis (1987-1989) dates, Parable of the Sower's 1993
  // publication, and Fledgling (2005) as her last published novel were
  // not previously dated in this profile -- P2, verified directly against
  // src_butler_wikipedia (live fetch). Per the person-specific
  // instruction, the MacArthur Fellowship appears inside life_arc.5
  // alongside Parable of the Sower's publication -- one milestone among
  // several, not the beat's sole content. life_arc.6 states her death
  // plainly (near Seattle, 2006) without asserting a specific medical
  // cause: the Wikipedia fetch itself flags contemporary news accounts of
  // the cause as inconsistent, so no cause is stated here.
  "octavia-butler": {
    achievements: [
      { id: "octavia-butler-achievement-1", textKey: "octavia-butler.achievement.1", sourceIds: ["src_butler_wikipedia"] },
      {
        id: "octavia-butler-achievement-2",
        textKey: "octavia-butler.achievement.2",
        sourceIds: ["src_butler_wikipedia", "src_butler_macfound"],
      },
    ],
    moments: [
      {
        id: "octavia-butler-moment-1",
        textKey: "octavia-butler.moment.1",
        interpretationKey: "octavia-butler.interpretation.moment.1",
        attributeId: "achievement_drive",
        sourceIds: ["src_butler_huntington"],
      },
      { id: "octavia-butler-moment-2", textKey: "octavia-butler.moment.2", sourceIds: ["src_butler_wikipedia"] },
      { id: "octavia-butler-moment-3", textKey: "octavia-butler.moment.3", sourceIds: ["src_butler_wikipedia"] },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "1947", textKey: "octavia-butler.life_arc.1", sourceIds: ["src_butler_wikipedia"] },
      { year: "1968–1971", textKey: "octavia-butler.life_arc.2", sourceIds: ["src_butler_wikipedia"] },
      { year: "1976", textKey: "octavia-butler.life_arc.3", sourceIds: ["src_butler_wikipedia"] },
      { year: "1979–1989", textKey: "octavia-butler.life_arc.4", sourceIds: ["src_butler_wikipedia"] },
      { year: "1993–1995", textKey: "octavia-butler.life_arc.5", sourceIds: ["src_butler_wikipedia", "src_butler_macfound"] },
      { year: "2006", textKey: "octavia-butler.life_arc.6", sourceIds: ["src_butler_wikipedia"] },
    ],
    legacy: {
      textKey: "octavia-butler.legacy",
      sourceIds: ["src_butler_wikipedia", "src_butler_nasa", "src_butler_smithsonian"],
    },
  },

  "rabindranath-tagore": {
    achievements: [
      { id: "rabindranath-tagore-achievement-1", textKey: "rabindranath-tagore.achievement.1", sourceIds: ["src_tagore_nobel", "src_tagore_wikipedia"] },
      { id: "rabindranath-tagore-achievement-2", textKey: "rabindranath-tagore.achievement.2", sourceIds: ["src_tagore_wikipedia"] },
    ],
    moments: [
      { id: "rabindranath-tagore-moment-1", textKey: "rabindranath-tagore.moment.1", sourceIds: ["src_tagore_wikipedia"] },
      {
        id: "rabindranath-tagore-moment-2",
        textKey: "rabindranath-tagore.moment.2",
        interpretationKey: "rabindranath-tagore.interpretation.moment.2",
        attributeId: "mastery_orientation",
        sourceIds: ["src_tagore_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "rabindranath-tagore-turning-point-1",
        textKey: "rabindranath-tagore.turning_point.1",
        interpretationKey: "rabindranath-tagore.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_tagore_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 2 (2026-08): 6 beats. Achievement.2 states he
    // "founded Visva-Bharati University at Santiniketan" but gives no year
    // -- P2, verified directly against src_tagore_wikipedia (live fetch:
    // "in 1901 Tagore moved to Santiniketan to found an ashram... an
    // experimental school"). The fetch did not surface a separate, more
    // specific year for the school's formal university charter, so
    // life_arc.2 anchors to the 1901 founding itself and describes it as
    // growing into the university, rather than asserting an unverified
    // later charter date. Per the person-specific instruction, the Nobel
    // Prize (life_arc.3) is one of four beats, not the whole arc: literary
    // work (life_arc.3), institutional work (life_arc.2), and his
    // international/civic role (life_arc.4's knighthood renunciation) are
    // all represented, and the anthem-composing fact (moment.1) was left
    // out as unanchored to any year and secondary to orientation.
    lifeArc: [
      { year: "1861", textKey: "rabindranath-tagore.life_arc.1", sourceIds: ["src_tagore_wikipedia"] },
      { year: "1901", textKey: "rabindranath-tagore.life_arc.2", sourceIds: ["src_tagore_wikipedia"] },
      { year: "1913", textKey: "rabindranath-tagore.life_arc.3", sourceIds: ["src_tagore_nobel", "src_tagore_wikipedia"] },
      { year: "1919", textKey: "rabindranath-tagore.life_arc.4", sourceIds: ["src_tagore_wikipedia"] },
      { year: "In his sixties", textKey: "rabindranath-tagore.life_arc.5", sourceIds: ["src_tagore_wikipedia"] },
      { year: "1941", textKey: "rabindranath-tagore.life_arc.6", sourceIds: ["src_tagore_wikipedia"] },
    ],
  },

  "aristotle": {
    achievements: [
      { id: "aristotle-achievement-1", textKey: "aristotle.achievement.1", sourceIds: ["src_aristotle_corpus", "src_aristotle_sep"] },
      { id: "aristotle-achievement-2", textKey: "aristotle.achievement.2", sourceIds: ["src_aristotle_corpus", "src_aristotle_sep"] },
    ],
    moments: [
      {
        id: "aristotle-moment-1",
        textKey: "aristotle.moment.1",
        interpretationKey: "aristotle.interpretation.moment.1",
        attributeId: "curiosity",
        sourceIds: ["src_aristotle_corpus"],
      },
      { id: "aristotle-moment-2", textKey: "aristotle.moment.2", sourceIds: ["src_aristotle_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "aristotle-turning-point-1",
        textKey: "aristotle.turning_point.1",
        interpretationKey: "aristotle.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_aristotle_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): D-CAUTION profile, 5 beats (not
    // forced to 6 -- a sixth would require fake precision this evidence
    // doesn't support). The two gaps the earlier feasibility audit
    // flagged -- the Academy period and the Lyceum founding -- were
    // verified directly against src_aristotle_wikipedia (live fetch): he
    // joined Plato's Academy "at the age of seventeen or eighteen," c. 367
    // BCE, remaining "nearly twenty years" until Plato's death in 348/347
    // BCE; he founded the Lyceum shortly after returning to Athens "a year
    // after Philip II's assassination" in 336 BCE, i.e. c. 335 BCE, and
    // taught there for the next twelve years. Both P2, both given "c."
    // rather than a bare year. life_arc.3 (the Alexander tutoring) and
    // life_arc.5 (the death) reuse moment.2 and turning_point.1 exactly as
    // already hedged in this profile ("ancient biographical tradition...
    // written several centuries after," "a widely repeated ancient
    // anecdote") -- neither is presented as settled fact, and no anecdotal
    // saying is treated as a chronological fact on its own.
    lifeArc: [
      { year: "c. 384 BCE", textKey: "aristotle.life_arc.1", sourceIds: ["src_aristotle_wikipedia"] },
      { year: "c. 367 BCE", textKey: "aristotle.life_arc.2", sourceIds: ["src_aristotle_wikipedia"] },
      { year: "c. 343 BCE", textKey: "aristotle.life_arc.3", sourceIds: ["src_aristotle_wikipedia"] },
      { year: "c. 335 BCE", textKey: "aristotle.life_arc.4", sourceIds: ["src_aristotle_wikipedia"] },
      { year: "322 BCE", textKey: "aristotle.life_arc.5", sourceIds: ["src_aristotle_wikipedia"] },
    ],
  },

  "simon-bolivar": {
    achievements: [
      { id: "simon-bolivar-achievement-1", textKey: "simon-bolivar.achievement.1", sourceIds: ["src_bolivar_wikipedia", "src_bolivar_lynch"] },
      { id: "simon-bolivar-achievement-2", textKey: "simon-bolivar.achievement.2", sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"] },
    ],
    moments: [
      { id: "simon-bolivar-moment-1", textKey: "simon-bolivar.moment.1", sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"] },
      {
        id: "simon-bolivar-moment-2",
        textKey: "simon-bolivar.moment.2",
        interpretationKey: "simon-bolivar.interpretation.moment.2",
        attributeId: "collaboration",
        sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "simon-bolivar-turning-point-1",
        textKey: "simon-bolivar.turning_point.1",
        interpretationKey: "simon-bolivar.interpretation.turning_point.1",
        attributeId: "impact_motivation",
        sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats, entirely P1 -- every
    // beat and year reuses a fact already stated in achievements/moment.1/
    // turning_point.1 above. Per the person-specific instruction, this
    // batch does NOT reopen the Batch B audit's decision to keep
    // turning_point.1's existing classification of the 1828-1830
    // dictatorial/crisis period -- life_arc.5/.6 reuse that item's exact
    // wording and framing, unmodified, rather than re-deriving a new
    // characterization. Contested motives are kept out of this arc: no
    // beat asserts why he assumed dictatorial powers, only what happened
    // and when.
    lifeArc: [
      { year: "1783", textKey: "simon-bolivar.life_arc.1", sourceIds: ["src_bolivar_wikipedia"] },
      { year: "1813–1825", textKey: "simon-bolivar.life_arc.2", sourceIds: ["src_bolivar_wikipedia", "src_bolivar_lynch"] },
      { year: "1815", textKey: "simon-bolivar.life_arc.3", sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"] },
      { year: "1819", textKey: "simon-bolivar.life_arc.4", sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"] },
      { year: "1828", textKey: "simon-bolivar.life_arc.5", sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"] },
      { year: "1830", textKey: "simon-bolivar.life_arc.6", sourceIds: ["src_bolivar_lynch", "src_bolivar_wikipedia"] },
    ],
  },

  "grace-hopper": {
    achievements: [
      { id: "grace-hopper-achievement-1", textKey: "grace-hopper.achievement.1", sourceIds: ["src_hopper_beyer", "src_hopper_wikipedia"] },
      { id: "grace-hopper-achievement-2", textKey: "grace-hopper.achievement.2", sourceIds: ["src_hopper_beyer"] },
    ],
    moments: [{ id: "grace-hopper-moment-1", textKey: "grace-hopper.moment.1", sourceIds: ["src_hopper_wikipedia"] }],
    turningPoints: [
      {
        id: "grace-hopper-turning-point-1",
        textKey: "grace-hopper.turning_point.1",
        interpretationKey: "grace-hopper.interpretation.turning_point.1",
        attributeId: "mastery_orientation",
        sourceIds: ["src_hopper_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats, entirely P1 -- every
    // beat and year reuses a fact already stated in achievements/moment.1/
    // turning_point.1 above (life_arc.4/.5 split turning_point.1's own
    // retire-recall-retire narrative into a summary range and its final,
    // most specific milestone, the same nesting pattern already used
    // elsewhere in this Life Arc system, e.g. Aung San Suu Kyi's shipped
    // arc). Per the person-specific instruction, achievement.1 already
    // credits "the team at Remington Rand" she led, not her alone, and this
    // Life Arc reuses that framing rather than a lone-inventor account; her
    // final rank (rear admiral) appears only as the endpoint of a decades-
    // long documented service arc, not as a standalone achievement.
    lifeArc: [
      { year: "1906", textKey: "grace-hopper.life_arc.1", sourceIds: ["src_hopper_wikipedia"] },
      { year: "1947", textKey: "grace-hopper.life_arc.2", sourceIds: ["src_hopper_wikipedia"] },
      { year: "Early 1950s", textKey: "grace-hopper.life_arc.3", sourceIds: ["src_hopper_beyer", "src_hopper_wikipedia"] },
      { year: "1966–1986", textKey: "grace-hopper.life_arc.4", sourceIds: ["src_hopper_wikipedia"] },
      { year: "1986", textKey: "grace-hopper.life_arc.5", sourceIds: ["src_hopper_wikipedia"] },
      { year: "1992", textKey: "grace-hopper.life_arc.6", sourceIds: ["src_hopper_wikipedia"] },
    ],
  },

  // Life Arc Backfill Batch 5 (2026-08): 6 beats. The Krishnan
  // collaboration and calibrated Nobel-attribution framing (achievement.1)
  // and the 1921 sea-voyage turning point (turning_point.1) were already
  // preserved -- P1, and life_arc.4's Krishnan/Nobel wording is drawn
  // directly from achievement.1's own already-calibrated language rather
  // than restated independently. His Presidency College education years,
  // the 1907 Finance Department entry, the 1933 IISc directorship, and
  // the 1948-1949 Raman Research Institute founding were not previously
  // dated in this profile -- P2, verified directly against
  // src_raman_wikipedia (live fetch). Per the person-specific instruction,
  // life_arc.4 states the 1928 discovery as the achievement and the 1930
  // Nobel Prize as recognition of it, not as the accomplishment itself.
  "cv-raman": {
    achievements: [
      { id: "cv-raman-achievement-1", textKey: "cv-raman.achievement.1", sourceIds: ["src_raman_wikipedia", "src_raman_nobel"] },
      { id: "cv-raman-achievement-2", textKey: "cv-raman.achievement.2", sourceIds: ["src_raman_wikipedia"] },
    ],
    moments: [{ id: "cv-raman-moment-1", textKey: "cv-raman.moment.1", sourceIds: ["src_raman_wikipedia"] }],
    turningPoints: [
      {
        id: "cv-raman-turning-point-1",
        textKey: "cv-raman.turning_point.1",
        interpretationKey: "cv-raman.interpretation.turning_point.1",
        attributeId: "curiosity",
        sourceIds: ["src_raman_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1888", textKey: "cv-raman.life_arc.1", sourceIds: ["src_raman_wikipedia"] },
      { year: "1907–1917", textKey: "cv-raman.life_arc.2", sourceIds: ["src_raman_wikipedia"] },
      { year: "1921", textKey: "cv-raman.life_arc.3", sourceIds: ["src_raman_wikipedia"] },
      { year: "1928", textKey: "cv-raman.life_arc.4", sourceIds: ["src_raman_wikipedia", "src_raman_nobel"] },
      { year: "1933–1948", textKey: "cv-raman.life_arc.5", sourceIds: ["src_raman_wikipedia"] },
      { year: "1970", textKey: "cv-raman.life_arc.6", sourceIds: ["src_raman_wikipedia"] },
    ],
  },

  "benjamin-banneker": {
    achievements: [
      { id: "benjamin-banneker-achievement-1", textKey: "benjamin-banneker.achievement.1", sourceIds: ["src_banneker_bedini", "src_banneker_wikipedia"] },
      { id: "benjamin-banneker-achievement-2", textKey: "benjamin-banneker.achievement.2", sourceIds: ["src_banneker_bedini"] },
    ],
    moments: [
      {
        id: "benjamin-banneker-moment-1",
        textKey: "benjamin-banneker.moment.1",
        interpretationKey: "benjamin-banneker.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_banneker_jefferson", "src_banneker_wikipedia"],
      },
    ],
    turningPoints: [],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats. His role assisting the
    // 1791 District of Columbia boundary survey was not preserved anywhere
    // in this profile -- P2, verified directly against
    // src_banneker_wikipedia (live fetch): hired by Andrew Ellicott in
    // February 1791, left in April 1791 "due to other commitments,
    // particularly the calculation of an ephemeris for the year of 1792"
    // -- about three months. Per the person-specific instruction against
    // claims amplified by later popular retelling, this Life Arc states
    // only that he assisted the survey, not that he planned or designed
    // the city: the same source is explicit that "there is little
    // documentation to confirm Banneker's role" beyond the hiring itself,
    // and a contemporary report crediting the first boundary stone's
    // location "did not mention Banneker." life_arc.3's wording reflects
    // that documented uncertainty rather than overstating his contribution.
    lifeArc: [
      { year: "1731", textKey: "benjamin-banneker.life_arc.1", sourceIds: ["src_banneker_wikipedia"] },
      { year: "c. 1753", textKey: "benjamin-banneker.life_arc.2", sourceIds: ["src_banneker_bedini"] },
      { year: "Feb–Apr 1791", textKey: "benjamin-banneker.life_arc.3", sourceIds: ["src_banneker_wikipedia"] },
      { year: "August 1791", textKey: "benjamin-banneker.life_arc.4", sourceIds: ["src_banneker_jefferson", "src_banneker_wikipedia"] },
      { year: "1792", textKey: "benjamin-banneker.life_arc.5", sourceIds: ["src_banneker_bedini", "src_banneker_wikipedia"] },
      { year: "1806", textKey: "benjamin-banneker.life_arc.6", sourceIds: ["src_banneker_wikipedia"] },
    ],
  },

  "fela-kuti": {
    achievements: [
      { id: "fela-kuti-achievement-1", textKey: "fela-kuti.achievement.1", sourceIds: ["src_fela_veal", "src_fela_wikipedia"] },
      { id: "fela-kuti-achievement-2", textKey: "fela-kuti.achievement.2", sourceIds: ["src_fela_veal"] },
    ],
    moments: [{ id: "fela-kuti-moment-1", textKey: "fela-kuti.moment.1", sourceIds: ["src_fela_wikipedia", "src_fela_veal"] }],
    turningPoints: [
      {
        id: "fela-kuti-turning-point-1",
        textKey: "fela-kuti.turning_point.1",
        interpretationKey: "fela-kuti.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_fela_wikipedia", "src_fela_veal"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats, entirely P1 -- every
    // beat and year reuses a fact already stated in achievements/moment.1/
    // turning_point.1 above; death year is bare roster metadata, no cause
    // given (not preserved, and not required by house style). Per the
    // person-specific instruction, the 1977 raid beat states only the
    // documented facts already in turning_point.1 (soldiers raided and
    // burned the compound; his mother died of injuries from the raid) with
    // no added violence-glamorizing language, and no motive is inferred
    // beyond what that item already states.
    lifeArc: [
      { year: "1938", textKey: "fela-kuti.life_arc.1", sourceIds: ["src_fela_wikipedia"] },
      { year: "Late 1960s", textKey: "fela-kuti.life_arc.2", sourceIds: ["src_fela_veal", "src_fela_wikipedia"] },
      { year: "1970", textKey: "fela-kuti.life_arc.3", sourceIds: ["src_fela_wikipedia", "src_fela_veal"] },
      { year: "1976", textKey: "fela-kuti.life_arc.4", sourceIds: ["src_fela_veal"] },
      { year: "1977", textKey: "fela-kuti.life_arc.5", sourceIds: ["src_fela_wikipedia", "src_fela_veal"] },
      { year: "1997", textKey: "fela-kuti.life_arc.6", sourceIds: ["src_fela_wikipedia"] },
    ],
  },

  "toussaint-louverture": {
    achievements: [
      { id: "toussaint-louverture-achievement-1", textKey: "toussaint-louverture.achievement.1", sourceIds: ["src_toussaint_dubois", "src_toussaint_wikipedia"] },
      { id: "toussaint-louverture-achievement-2", textKey: "toussaint-louverture.achievement.2", sourceIds: ["src_toussaint_dubois", "src_toussaint_wikipedia"] },
    ],
    moments: [
      {
        id: "toussaint-louverture-moment-1",
        textKey: "toussaint-louverture.moment.1",
        interpretationKey: "toussaint-louverture.interpretation.moment.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_toussaint_dubois", "src_toussaint_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "toussaint-louverture-turning-point-1",
        textKey: "toussaint-louverture.turning_point.1",
        sourceIds: ["src_toussaint_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 4 (2026-08): 6 beats. The year he joined the
    // uprising that became the Haitian Revolution was not preserved --
    // achievement.1 describes "roughly a decade" of rise but doesn't
    // anchor its start -- P2, verified directly against
    // src_toussaint_wikipedia (live fetch): joined the August 1791
    // uprising, initially as "a secretary and lieutenant" under Georges
    // Biassou, not as its leader from the outset. Per the person-specific
    // instruction, life_arc.2 reflects that he joined an existing
    // collective uprising rather than single-handedly starting the
    // revolution, and life_arc.4's "rose to" phrasing (from achievement.1
    // itself) keeps the decade-long rise as a process, not an instant
    // achievement. No motive is inferred beyond what turning_point.1
    // already documents for the 1802 arrest and 1803 death.
    lifeArc: [
      { year: "1743", textKey: "toussaint-louverture.life_arc.1", sourceIds: ["src_toussaint_wikipedia"] },
      { year: "1791", textKey: "toussaint-louverture.life_arc.2", sourceIds: ["src_toussaint_wikipedia"] },
      { year: "1794", textKey: "toussaint-louverture.life_arc.3", sourceIds: ["src_toussaint_dubois", "src_toussaint_wikipedia"] },
      { year: "Over the following decade", textKey: "toussaint-louverture.life_arc.4", sourceIds: ["src_toussaint_dubois", "src_toussaint_wikipedia"] },
      { year: "1801", textKey: "toussaint-louverture.life_arc.5", sourceIds: ["src_toussaint_dubois", "src_toussaint_wikipedia"] },
      { year: "1802–1803", textKey: "toussaint-louverture.life_arc.6", sourceIds: ["src_toussaint_wikipedia"] },
    ],
  },

  "chinua-achebe": {
    achievements: [
      { id: "chinua-achebe-achievement-1", textKey: "chinua-achebe.achievement.1", sourceIds: ["src_achebe_ezenwa", "src_achebe_wikipedia"] },
      { id: "chinua-achebe-achievement-2", textKey: "chinua-achebe.achievement.2", sourceIds: ["src_achebe_conrad", "src_achebe_wikipedia"] },
    ],
    moments: [{ id: "chinua-achebe-moment-1", textKey: "chinua-achebe.moment.1", sourceIds: ["src_achebe_wikipedia", "src_achebe_ezenwa"] }],
    turningPoints: [
      {
        id: "chinua-achebe-turning-point-1",
        textKey: "chinua-achebe.turning_point.1",
        interpretationKey: "chinua-achebe.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_achebe_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 3 (2026-08): 6 beats, entirely P1 -- every
    // beat and year reuses a fact already stated in achievements/moment.1/
    // turning_point.1 above (turning_point.1 itself already spans the 1990
    // accident through "his death in 2013," giving life_arc.5/.6 both
    // years directly). Per the person-specific instruction, the arc is not
    // reduced to Things Fall Apart alone: it also orients his Biafra
    // envoy period, his literary-critical Conrad essay, and his later
    // academic/public role at Bard College.
    lifeArc: [
      { year: "1930", textKey: "chinua-achebe.life_arc.1", sourceIds: ["src_achebe_wikipedia"] },
      { year: "1958", textKey: "chinua-achebe.life_arc.2", sourceIds: ["src_achebe_ezenwa", "src_achebe_wikipedia"] },
      { year: "1967–1970", textKey: "chinua-achebe.life_arc.3", sourceIds: ["src_achebe_wikipedia", "src_achebe_ezenwa"] },
      { year: "1975", textKey: "chinua-achebe.life_arc.4", sourceIds: ["src_achebe_conrad", "src_achebe_wikipedia"] },
      { year: "1990", textKey: "chinua-achebe.life_arc.5", sourceIds: ["src_achebe_wikipedia"] },
      { year: "2013", textKey: "chinua-achebe.life_arc.6", sourceIds: ["src_achebe_wikipedia"] },
    ],
  },

  /**
   * Batch 7 (2026-08, EXPOSURE-PRIORITY SELECTIVE BACKFILL): 10 Tier-C
   * entries selected NOT by roster-file order but by measured user-facing
   * exposure (quiz-simulation #1/top-3 match frequency + Similar-People
   * in-degree across the live 94-person eligible roster), per the product
   * audit that found non-editorial profiles account for ~49% of #1-match
   * outcomes. See docs/checkpoints/editorial.md.
   *
   * CLOSURE PASS (2026-08): the original batch leaned on a "uncontested
   * general knowledge consistent with cited sources" provenance exception
   * that was subsequently found too loose and revoked. Every item below
   * was re-verified against ONLY this person's own roster-file `//`
   * rationale comment (the sole repository-preserved evidence tier-C
   * people have) — nothing else counts as evidence, including this
   * person's own `sources` array, which is a citation for attribution,
   * not a store of preserved content this pipeline is authorized to mine.
   * Facts unsupported by that rationale were deleted outright (never
   * replaced with other outside material); facts partially supported were
   * narrowed to what the rationale actually says. See the per-person
   * comments below for what was cut and why.
   */
  // Profile V2 pilot (2026-08): the closure pass below correctly refused to
  // back claims from outside knowledge, but left this profile without a
  // single Achievement for one of the most consequential figures in
  // computer science. Repaired by researching and verifying, directly
  // against src_turing_wikipedia (live fetch, not memory), his 1936
  // computability paper, Bletchley Park work, and 1950 AI paper -- exactly
  // the "general knowledge consistent with cited sources" exception
  // docs/editorial-content.md already describes, applied against a source
  // already on this person's own record.
  //
  // Profile V2 evidence-closure pass (2026-08): re-verified every claim
  // above against a fresh direct fetch of src_turing_wikipedia, not memory.
  // Found and fixed: (1) achievement.2/life_arc.3's "led the design of the
  // Bombe" overstated sole credit -- the article and Alexander's own
  // assessment give shared credit to Gordon Welchman (diagonal-board
  // enhancement) and Harold Keen; corrected to shared framing, avoiding the
  // "single-handedly broke Enigma" overclaim; (2) moment.2's 1974
  // Winterbotham/"Ultra Secret" declassification detail dropped -- not
  // stated in src_turing_wikipedia's own text (it was surfaced by an
  // earlier, less rigorous WebSearch pass, not a direct fetch of a cited
  // source); kept only the Official Secrets Act framing the article does
  // state; (3) turning_point.1's burglary detail was NOT in
  // src_turing_wikipedia either -- confirmed via a new, directly-fetched
  // source (src_turing_aps_burglary) and re-sourced accordingly; also
  // added the article's own nuance that the suicide ruling is "also
  // consistent with accidental poisoning," which the original draft had
  // omitted, presenting the inquest verdict as more settled than the
  // source itself does.
  "alan-turing": {
    achievements: [
      { id: "alan-turing-achievement-1", textKey: "alan-turing.achievement.1", sourceIds: ["src_turing_wikipedia"] },
      { id: "alan-turing-achievement-2", textKey: "alan-turing.achievement.2", sourceIds: ["src_turing_wikipedia"] },
      { id: "alan-turing-achievement-3", textKey: "alan-turing.achievement.3", sourceIds: ["src_turing_wikipedia"] },
    ],
    moments: [
      {
        id: "alan-turing-moment-1",
        textKey: "alan-turing.moment.1",
        interpretationKey: "alan-turing.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_turing_biography"],
      },
      { id: "alan-turing-moment-2", textKey: "alan-turing.moment.2", sourceIds: ["src_turing_wikipedia"] },
    ],
    // No interpretationKey, deliberately -- see Editorial Writing Standard v1:
    // adding a trait-interpretive gloss to a account of his prosecution risked
    // reading as "explaining" it via a personality trait. Facts stand alone.
    turningPoints: [
      {
        id: "alan-turing-turning-point-1",
        textKey: "alan-turing.turning_point.1",
        sourceIds: ["src_turing_wikipedia", "src_turing_aps_burglary"],
      },
    ],
    lifeArc: [
      { year: "1912", textKey: "alan-turing.life_arc.1", sourceIds: ["src_turing_wikipedia"] },
      { year: "1936", textKey: "alan-turing.life_arc.2", sourceIds: ["src_turing_wikipedia"] },
      { year: "1939–1945", textKey: "alan-turing.life_arc.3", sourceIds: ["src_turing_wikipedia"] },
      { year: "1950", textKey: "alan-turing.life_arc.4", sourceIds: ["src_turing_wikipedia"] },
      { year: "1952", textKey: "alan-turing.life_arc.5", sourceIds: ["src_turing_wikipedia"] },
      { year: "1954", textKey: "alan-turing.life_arc.6", sourceIds: ["src_turing_wikipedia"] },
    ],
    legacy: { textKey: "alan-turing.legacy", sourceIds: ["src_turing_wikipedia"] },
  },

  // Profile V2 pilot (2026-08): the AmEx episode (was achievement.1) is a
  // single dated stock pick -- moved to Life Scenes. The 1965 Berkshire
  // acquisition (was achievement.2) is a genuine trajectory shift -- moved
  // to Turning Points, now first chronologically; the two original turning
  // points renumber after it. Two new Achievements researched and verified
  // directly against src_buffett_wikipedia (live fetch, not memory).
  //
  // Profile V2 evidence-closure pass (2026-08): re-verified every claim
  // above against a fresh direct fetch of src_buffett_wikipedia, not
  // memory. Found and fixed: (1) achievement.1's "19-20% compounded...
  // over five decades" figure was NOT stated anywhere in
  // src_buffett_wikipedia -- it had been carried over from an earlier,
  // less rigorous WebSearch pass. Replaced with a precise, primary-source
  // figure (24.7% compounded annually, $19->$37,801 per share over 34
  // years) directly quoted from Berkshire's own 1998 shareholder letter
  // (new source src_buffett_1998_letter, fetched and inspected); (2)
  // achievement.2's "See's Candies" clause was also unsupported by
  // src_buffett_wikipedia (the article never mentions See's Candies at
  // all) -- removed from this item; the fact remains correctly sourced to
  // src_buffett_biography in turning_point.2 below, where it was already
  // properly cited; (3) moment.2's "Berkshire acquired GEICO outright"
  // was too vague to verify against any cited source -- closed with a
  // precise date/figure ($2.3B, January 2 1996, the remaining 49%) from
  // a new, directly-fetched primary source (src_buffett_1996_annual_report,
  // Berkshire's own 1996 annual report); (4) life_arc.4 stated "Founded
  // Buffett Partnership Ltd." in 1956 -- src_buffett_wikipedia actually
  // states the single entity "Buffett Partnership, Ltd." was formed by
  // merging earlier partnerships in 1962, not 1956; corrected to describe
  // 1956 accurately (beginning to manage partnerships that later merged).
  "warren-buffett": {
    achievements: [
      {
        id: "warren-buffett-achievement-1",
        textKey: "warren-buffett.achievement.1",
        sourceIds: ["src_buffett_wikipedia", "src_buffett_1998_letter"],
      },
      { id: "warren-buffett-achievement-2", textKey: "warren-buffett.achievement.2", sourceIds: ["src_buffett_wikipedia"] },
    ],
    moments: [
      { id: "warren-buffett-moment-1", textKey: "warren-buffett.moment.1", sourceIds: ["src_buffett_biography"] },
      {
        id: "warren-buffett-moment-2",
        textKey: "warren-buffett.moment.2",
        sourceIds: ["src_buffett_wikipedia", "src_buffett_1996_annual_report"],
      },
    ],
    turningPoints: [
      {
        id: "warren-buffett-turning-point-1",
        textKey: "warren-buffett.turning_point.1",
        sourceIds: ["src_buffett_biography", "src_buffett_wikipedia"],
      },
      {
        id: "warren-buffett-turning-point-2",
        textKey: "warren-buffett.turning_point.2",
        interpretationKey: "warren-buffett.interpretation.turning_point.2",
        attributeId: "belief_updating",
        sourceIds: ["src_buffett_biography"],
      },
      {
        id: "warren-buffett-turning-point-3",
        textKey: "warren-buffett.turning_point.3",
        interpretationKey: "warren-buffett.interpretation.turning_point.3",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_buffett_wikipedia", "src_buffett_biography"],
      },
    ],
    lifeArc: [
      { year: "1930", textKey: "warren-buffett.life_arc.1", sourceIds: ["src_buffett_wikipedia"] },
      { year: "1951", textKey: "warren-buffett.life_arc.2", sourceIds: ["src_buffett_wikipedia"] },
      { year: "1954–1956", textKey: "warren-buffett.life_arc.3", sourceIds: ["src_buffett_wikipedia"] },
      { year: "1956", textKey: "warren-buffett.life_arc.4", sourceIds: ["src_buffett_wikipedia"] },
      { year: "1965", textKey: "warren-buffett.life_arc.5", sourceIds: ["src_buffett_biography", "src_buffett_wikipedia"] },
      { year: "Present", textKey: "warren-buffett.life_arc.6", sourceIds: ["src_buffett_wikipedia"] },
    ],
    legacy: { textKey: "warren-buffett.legacy", sourceIds: ["src_buffett_wikipedia", "src_buffett_biography"] },
  },

  // Profile V2 pilot (2026-08): the closure pass below left this profile
  // with a single item and no sense of what Franklin actually did as a
  // scientist. Repaired by researching and verifying, directly against
  // src_rfranklin_wikipedia (live fetch, not memory), her coal research,
  // DNA/X-ray crystallography work, and later virus-structure research --
  // the "general knowledge consistent with cited sources" exception
  // docs/editorial-content.md already describes, applied against a source
  // already on this person's own record. achievement.1 states what she
  // demonstrably did without asserting a resolution to the Watson/Crick
  // credit question either way.
  //
  // Profile V2 evidence-closure pass (2026-08): re-verified every claim
  // above against a fresh direct fetch of src_rfranklin_wikipedia, not
  // memory. Found and fixed: achievement.1 originally stated Watson and
  // Crick "drew on her unpublished data and measurements, without her
  // knowledge at the time" -- broader than what the article actually
  // supports. The article specifically documents Wilkins showing
  // Photograph 51 to Watson without Franklin's permission, and Crick and
  // Watson's published paper crediting being "stimulated by a general
  // knowledge of Franklin and Wilkins' unpublished contribution" in one
  // footnote -- it does not state that all of her unpublished data and
  // measurements were used without her knowledge. Narrowed to the
  // specific, directly-quoted facts rather than the broader
  // characterization, per this task's explicit instruction not to
  // overstate the credit question. All other claims (coal research,
  // Paris/Mering, the Wilkins role-conflict turning point, Birkbeck virus
  // work, cause and age at death) were re-verified and confirmed accurate
  // as written; no other changes made.
  "rosalind-franklin": {
    achievements: [
      { id: "rosalind-franklin-achievement-1", textKey: "rosalind-franklin.achievement.1", sourceIds: ["src_rfranklin_wikipedia"] },
      { id: "rosalind-franklin-achievement-2", textKey: "rosalind-franklin.achievement.2", sourceIds: ["src_rfranklin_wikipedia"] },
      { id: "rosalind-franklin-achievement-3", textKey: "rosalind-franklin.achievement.3", sourceIds: ["src_rfranklin_wikipedia"] },
    ],
    moments: [
      {
        id: "rosalind-franklin-moment-1",
        textKey: "rosalind-franklin.moment.1",
        interpretationKey: "rosalind-franklin.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_rfranklin_biography"],
      },
      { id: "rosalind-franklin-moment-2", textKey: "rosalind-franklin.moment.2", sourceIds: ["src_rfranklin_wikipedia"] },
    ],
    turningPoints: [
      { id: "rosalind-franklin-turning-point-1", textKey: "rosalind-franklin.turning_point.1", sourceIds: ["src_rfranklin_wikipedia"] },
    ],
    lifeArc: [
      { year: "1920", textKey: "rosalind-franklin.life_arc.1", sourceIds: ["src_rfranklin_wikipedia"] },
      { year: "1941–1945", textKey: "rosalind-franklin.life_arc.2", sourceIds: ["src_rfranklin_wikipedia"] },
      { year: "1947–1950", textKey: "rosalind-franklin.life_arc.3", sourceIds: ["src_rfranklin_wikipedia"] },
      { year: "1951–1953", textKey: "rosalind-franklin.life_arc.4", sourceIds: ["src_rfranklin_wikipedia"] },
      { year: "1953–1958", textKey: "rosalind-franklin.life_arc.5", sourceIds: ["src_rfranklin_wikipedia"] },
      { year: "1958", textKey: "rosalind-franklin.life_arc.6", sourceIds: ["src_rfranklin_wikipedia"] },
    ],
    legacy: { textKey: "rosalind-franklin.legacy", sourceIds: ["src_rfranklin_wikipedia"] },
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.1 rewritten
  // (restored the 1960 date and added the Leakey quote, both re-verified via
  // a fresh direct fetch of src_goodall_wikipedia, not memory -- the
  // Batch-7 closure pass had dropped the date for lacking roster-rationale
  // support, but this person's own cited source directly confirms it).
  // achievement.2 added: the prior profile's only achievement was a single
  // field observation: this restores the actual career-level finding
  // (60+ years of Gombe research reshaping the scientific understanding of
  // chimpanzee behavior) that the observation itself only exemplifies.
  "jane-goodall": {
    achievements: [
      { id: "jane-goodall-achievement-1", textKey: "jane-goodall.achievement.1", sourceIds: ["src_goodall_wikipedia"] },
      { id: "jane-goodall-achievement-2", textKey: "jane-goodall.achievement.2", sourceIds: ["src_goodall_wikipedia"] },
    ],
    moments: [
      {
        id: "jane-goodall-moment-1",
        textKey: "jane-goodall.moment.1",
        interpretationKey: "jane-goodall.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_goodall_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "jane-goodall-turning-point-1",
        textKey: "jane-goodall.turning_point.1",
        interpretationKey: "jane-goodall.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_goodall_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats. Two facts were not
    // preserved anywhere in this profile before then (P2, verified directly
    // against src_goodall_wikipedia, live fetch, not memory): the Jane
    // Goodall Institute founding year (1977) and Roots & Shoots founding
    // year (1991) -- turning_point.1 above states the founding as fact but
    // gives no year for either. That batch's fetch also surfaced that Jane
    // Goodall had died (October 1, 2025), which the roster record
    // (src/data/people/roster2.ts) did not yet reflect; rather than act on
    // that outside the batch's scope, the final beat was left as her
    // January 2025 Presidential Medal of Freedom -- a fact true regardless
    // of living/deceased status -- and the discrepancy was flagged for a
    // dedicated follow-up.
    //
    // Jane Goodall factual-closure fix (2026-08, follow-up): independently
    // re-verified she died 1 October 2025 at 91, of natural causes, via a
    // direct fetch of the Jane Goodall Institute's own memorial page
    // (src_goodall_jgi_memorial, janegoodall.org/remembering-jane/: "died
    // of natural causes on October 1, 2025, at the age of 91"),
    // cross-checked against src_goodall_wikipedia's own "Death" section
    // (same date; Beverly Hills, California; cardiac arrest in her sleep).
    // `roster2.ts` now carries `deathYear: 2025, isLiving: false`. Per
    // house style (deceased subject -> final beat is death) and this
    // task's instruction not to pad past 6 beats, life_arc.6 is replaced:
    // the January 2025 Medal of Freedom is dropped in favor of her death,
    // the more life-orienting of the two for a 5-6 beat arc. Cause of
    // death omitted from the beat text itself -- "natural causes" is
    // accurate but not a specific, orienting detail the way e.g. Rosalind
    // Franklin's "ovarian cancer" is.
    lifeArc: [
      { year: "1934", textKey: "jane-goodall.life_arc.1", sourceIds: ["src_goodall_wikipedia"] },
      { year: "1960", textKey: "jane-goodall.life_arc.2", sourceIds: ["src_goodall_wikipedia"] },
      { year: "1960–2020s", textKey: "jane-goodall.life_arc.3", sourceIds: ["src_goodall_wikipedia"] },
      { year: "1977", textKey: "jane-goodall.life_arc.4", sourceIds: ["src_goodall_wikipedia"] },
      { year: "1991", textKey: "jane-goodall.life_arc.5", sourceIds: ["src_goodall_wikipedia"] },
      { year: "2025", textKey: "jane-goodall.life_arc.6", sourceIds: ["src_goodall_wikipedia", "src_goodall_jgi_memorial"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.3 (electricity/
  // kite experiment) and achievement.4 (French Alliance diplomacy) added --
  // the prior profile covered only his civic/political-foresight side and
  // was missing the two facts most people would name first. Sourced to two
  // new, directly fetched and inspected Wikipedia sub-articles (Kite
  // experiment; Treaty of Alliance (1778)) added to this person's own
  // `sources` array in roster2.ts, not general knowledge.
  "benjamin-franklin": {
    achievements: [
      { id: "benjamin-franklin-achievement-1", textKey: "benjamin-franklin.achievement.1", sourceIds: ["src_bfranklin_wikipedia"] },
      { id: "benjamin-franklin-achievement-2", textKey: "benjamin-franklin.achievement.2", sourceIds: ["src_bfranklin_biography"] },
      { id: "benjamin-franklin-achievement-3", textKey: "benjamin-franklin.achievement.3", sourceIds: ["src_bfranklin_kite_wikipedia", "src_bfranklin_wikipedia"] },
      { id: "benjamin-franklin-achievement-4", textKey: "benjamin-franklin.achievement.4", sourceIds: ["src_bfranklin_treaty_wikipedia", "src_bfranklin_wikipedia"] },
    ],
    moments: [
      {
        id: "benjamin-franklin-moment-1",
        textKey: "benjamin-franklin.moment.1",
        interpretationKey: "benjamin-franklin.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_bfranklin_biography"],
      },
    ],
    turningPoints: [
      {
        id: "benjamin-franklin-turning-point-1",
        textKey: "benjamin-franklin.turning_point.1",
        interpretationKey: "benjamin-franklin.interpretation.turning_point.1",
        attributeId: "belief_updating",
        sourceIds: ["src_bfranklin_biography", "src_bfranklin_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact and year already stated in achievements/turning
    // points above. No new verification performed. Note: prior
    // docs/context/CURRENT_STATE.md text listed Benjamin Franklin among the
    // 6 Profile V2 pilot people as already having a Life Arc; this was
    // stale documentation, not content evidence -- he had none before this
    // batch (confirmed mechanically before starting).
    lifeArc: [
      { year: "1706", textKey: "benjamin-franklin.life_arc.1", sourceIds: ["src_bfranklin_wikipedia"] },
      { year: "1752", textKey: "benjamin-franklin.life_arc.2", sourceIds: ["src_bfranklin_kite_wikipedia", "src_bfranklin_wikipedia"] },
      { year: "1754", textKey: "benjamin-franklin.life_arc.3", sourceIds: ["src_bfranklin_wikipedia"] },
      { year: "1774", textKey: "benjamin-franklin.life_arc.4", sourceIds: ["src_bfranklin_biography", "src_bfranklin_wikipedia"] },
      { year: "1776–1785", textKey: "benjamin-franklin.life_arc.5", sourceIds: ["src_bfranklin_treaty_wikipedia", "src_bfranklin_wikipedia"] },
      { year: "1790", textKey: "benjamin-franklin.life_arc.6", sourceIds: ["src_bfranklin_wikipedia"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.2 added --
  // the prior profile stopped at his pre-Cambridge, self-taught origin
  // story and never stated what he actually produced or why his work
  // still matters, re-verified via a fresh direct fetch of
  // src_ramanujan_wikipedia (not memory).
  "srinivasa-ramanujan": {
    achievements: [
      { id: "srinivasa-ramanujan-achievement-1", textKey: "srinivasa-ramanujan.achievement.1", sourceIds: ["src_ramanujan_wikipedia"] },
      { id: "srinivasa-ramanujan-achievement-2", textKey: "srinivasa-ramanujan.achievement.2", sourceIds: ["src_ramanujan_wikipedia"] },
    ],
    moments: [
      {
        id: "srinivasa-ramanujan-moment-1",
        textKey: "srinivasa-ramanujan.moment.1",
        interpretationKey: "srinivasa-ramanujan.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_ramanujan_wikipedia"],
      },
      // Batch-7-closure provenance pass (2026-08): moment-2 (the taxicab-1729
      // anecdote) removed — it does not appear in this person's own
      // roster-file rationale, which covers only the Hardy letter above.
    ],
    turningPoints: [],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats. The exact year of the
    // Hardy letter (moment.1 states the fact but gives no year) was not
    // preserved -- P2, verified directly against src_ramanujan_wikipedia
    // (live fetch: "On 16 January 1913, Ramanujan wrote to G. H. Hardy").
    // All other beats reuse already-preserved facts (achievement.1/2) as-is.
    lifeArc: [
      { year: "1887", textKey: "srinivasa-ramanujan.life_arc.1", sourceIds: ["src_ramanujan_wikipedia"] },
      { year: "Colonial India", textKey: "srinivasa-ramanujan.life_arc.2", sourceIds: ["src_ramanujan_wikipedia"] },
      { year: "1913", textKey: "srinivasa-ramanujan.life_arc.3", sourceIds: ["src_ramanujan_wikipedia"] },
      { year: "1914–1919", textKey: "srinivasa-ramanujan.life_arc.4", sourceIds: ["src_ramanujan_wikipedia"] },
      { year: "1918", textKey: "srinivasa-ramanujan.life_arc.5", sourceIds: ["src_ramanujan_wikipedia"] },
      { year: "1920", textKey: "srinivasa-ramanujan.life_arc.6", sourceIds: ["src_ramanujan_wikipedia"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.2 added --
  // the prior profile stated only the Harpo Productions corporate
  // structure, never the actual scale/impact of the show itself. Uses
  // concrete, checkable figures (syndication years, viewership, book-sales
  // effect) rather than prestige adjectives, per a fresh direct fetch of
  // src_oprah_wikipedia (not memory).
  "oprah-winfrey": {
    achievements: [
      { id: "oprah-winfrey-achievement-1", textKey: "oprah-winfrey.achievement.1", sourceIds: ["src_oprah_wikipedia"] },
      { id: "oprah-winfrey-achievement-2", textKey: "oprah-winfrey.achievement.2", sourceIds: ["src_oprah_wikipedia"] },
    ],
    moments: [],
    turningPoints: [
      {
        id: "oprah-winfrey-turning-point-1",
        textKey: "oprah-winfrey.turning_point.1",
        interpretationKey: "oprah-winfrey.interpretation.turning_point.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_oprah_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 5 beats (not forced to 6),
    // entirely P1 -- every beat reuses a fact and year already stated in
    // achievement.1/2 and turning_point.1 above. Living subject: per the
    // person-specific instruction, the final beat is the 2011 syndication
    // finale (already dated in achievement.2), a concrete documented
    // milestone -- not "Present"/"Still active". No beat was added for the
    // 1954-1986 early-career period or anything after 2011: neither is
    // preserved anywhere in this profile, and per the minimal-evidence
    // principle this batch does not perform new research to fill either gap.
    lifeArc: [
      { year: "1954", textKey: "oprah-winfrey.life_arc.1", sourceIds: ["src_oprah_wikipedia"] },
      { year: "1986", textKey: "oprah-winfrey.life_arc.2", sourceIds: ["src_oprah_wikipedia"] },
      { year: "1980s", textKey: "oprah-winfrey.life_arc.3", sourceIds: ["src_oprah_wikipedia"] },
      { year: "1993", textKey: "oprah-winfrey.life_arc.4", sourceIds: ["src_oprah_wikipedia"] },
      { year: "2011", textKey: "oprah-winfrey.life_arc.5", sourceIds: ["src_oprah_wikipedia"] },
    ],
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.2 added
  // after a fresh direct fetch of src_maathai_wikipedia (not memory,
  // and not the bare "nobel_laureate" tag the earlier closure pass declined
  // to narrate from). The Nobel Peace Prize citation, and her being the
  // first African woman and first environmentalist to win it, are both
  // directly stated on that page and restored here. A specific
  // Green-Belt-Movement tree-count figure was deliberately NOT restored:
  // this fetch found no cumulative count on the page at all (not merely an
  // unconfirmed one), so no such figure was written.
  "wangari-maathai": {
    achievements: [
      { id: "wangari-maathai-achievement-1", textKey: "wangari-maathai.achievement.1", sourceIds: ["src_maathai_wikipedia"] },
      { id: "wangari-maathai-achievement-2", textKey: "wangari-maathai.achievement.2", sourceIds: ["src_maathai_wikipedia"] },
    ],
    moments: [
      {
        id: "wangari-maathai-moment-1",
        textKey: "wangari-maathai.moment.1",
        interpretationKey: "wangari-maathai.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_maathai_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "wangari-maathai-turning-point-1",
        textKey: "wangari-maathai.turning_point.1",
        interpretationKey: "wangari-maathai.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_maathai_wikipedia"],
      },
    ],
    // Life Arc Backfill Batch 1 (2026-08): 6 beats, entirely P1 -- every
    // beat reuses a fact already stated in achievement.1/2, moment.1, and
    // turning_point.1 above. "Movement's early years" and "Amid government
    // opposition" are relative labels, not invented years -- neither the
    // early organizing nor the arrests/violence has an exact year anywhere
    // in this profile, and per the minimal-evidence principle this batch
    // does not perform new research to manufacture one.
    lifeArc: [
      { year: "1940", textKey: "wangari-maathai.life_arc.1", sourceIds: ["src_maathai_wikipedia"] },
      { year: "1977", textKey: "wangari-maathai.life_arc.2", sourceIds: ["src_maathai_wikipedia"] },
      { year: "Movement's early years", textKey: "wangari-maathai.life_arc.3", sourceIds: ["src_maathai_wikipedia"] },
      { year: "Amid government opposition", textKey: "wangari-maathai.life_arc.4", sourceIds: ["src_maathai_wikipedia"] },
      { year: "2004", textKey: "wangari-maathai.life_arc.5", sourceIds: ["src_maathai_wikipedia"] },
      { year: "2011", textKey: "wangari-maathai.life_arc.6", sourceIds: ["src_maathai_wikipedia"] },
    ],
  },

  // Profile V2 pilot (2026-08): the closure pass below left this profile
  // with a single turning point and nothing describing his actual musical
  // output. Repaired with 2 Achievements and 2 Life Scenes (including the
  // child-prodigy touring the closure pass had removed, restored here with
  // real dates/venues), Life Arc, and Legacy -- all researched and verified
  // directly against src_mozart_wikipedia (live fetch, not memory).
  //
  // Profile V2 evidence-closure pass (2026-08): re-verified every claim
  // above against a fresh direct fetch of src_mozart_wikipedia, not memory.
  // Found and fixed: (1) achievement.1's "written around age six" for K.1
  // dropped -- genuine, documented scholarly dating debate over K.1, not
  // settled fact; (2) moment.1's "October" and "Schönbrunn Palace" detail
  // dropped and the 1762 Vienna visit separated from the 1763-1766 grand
  // tour proper (the two were conflated into one date range before, which
  // was itself internally inconsistent -- "1763-1766" containing an
  // "October 1762" event) -- re-sourced to the more specific
  // src_mozart_grand_tour_wikipedia, fetched and inspected directly; (3)
  // moment.2's "without a specific commission" claim removed -- the
  // dedicated Symphony No. 41 article states this is NOT established,
  // one musicologist's speculative alternative theory noted instead --
  // re-sourced to src_mozart_symphony41_wikipedia with exact composition
  // dates (26 June / 25 July / 10 August 1788) confirmed there.
  "wolfgang-amadeus-mozart": {
    achievements: [
      { id: "wolfgang-amadeus-mozart-achievement-1", textKey: "wolfgang-amadeus-mozart.achievement.1", sourceIds: ["src_mozart_wikipedia"] },
      { id: "wolfgang-amadeus-mozart-achievement-2", textKey: "wolfgang-amadeus-mozart.achievement.2", sourceIds: ["src_mozart_wikipedia"] },
    ],
    moments: [
      {
        id: "wolfgang-amadeus-mozart-moment-1",
        textKey: "wolfgang-amadeus-mozart.moment.1",
        sourceIds: ["src_mozart_wikipedia", "src_mozart_grand_tour_wikipedia"],
      },
      {
        id: "wolfgang-amadeus-mozart-moment-2",
        textKey: "wolfgang-amadeus-mozart.moment.2",
        sourceIds: ["src_mozart_wikipedia", "src_mozart_symphony41_wikipedia"],
      },
    ],
    turningPoints: [
      {
        id: "wolfgang-amadeus-mozart-turning-point-1",
        textKey: "wolfgang-amadeus-mozart.turning_point.1",
        interpretationKey: "wolfgang-amadeus-mozart.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_mozart_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1756", textKey: "wolfgang-amadeus-mozart.life_arc.1", sourceIds: ["src_mozart_wikipedia"] },
      { year: "1762–1766", textKey: "wolfgang-amadeus-mozart.life_arc.2", sourceIds: ["src_mozart_wikipedia"] },
      { year: "1770s", textKey: "wolfgang-amadeus-mozart.life_arc.3", sourceIds: ["src_mozart_wikipedia"] },
      { year: "1781", textKey: "wolfgang-amadeus-mozart.life_arc.4", sourceIds: ["src_mozart_wikipedia"] },
      { year: "1786–1791", textKey: "wolfgang-amadeus-mozart.life_arc.5", sourceIds: ["src_mozart_wikipedia"] },
      { year: "1791", textKey: "wolfgang-amadeus-mozart.life_arc.6", sourceIds: ["src_mozart_wikipedia"] },
    ],
    legacy: { textKey: "wolfgang-amadeus-mozart.legacy", sourceIds: ["src_mozart_wikipedia"] },
  },

  // Key Achievements Correction Batch 1 (2026-08): achievement.2 added --
  // the prior profile stated only the South African origin of satyagraha,
  // never the actual independence-movement campaigns it enabled. Worded
  // deliberately to avoid implying Gandhi alone caused or "led India to"
  // independence -- states his role as one senior leader within a broader
  // Congress/independence movement that included other leaders and
  // regional campaigns already under way before his involvement, per a
  // fresh direct fetch of src_gandhi_wikipedia (not memory).
  // Life Arc Backfill Batch 1 (2026-08): chronology only, per this batch's
  // explicit person-specific instruction not to begin the separately
  // deferred Gandhi Complexity research. 6 beats, entirely P1 -- every beat
  // reuses a fact already stated in achievement.1/2 and turning_point.1
  // above. "South Africa" is a relative label, not an invented year -- no
  // exact year for the satyagraha origin is preserved anywhere in this
  // profile.
  "mahatma-gandhi": {
    achievements: [
      { id: "mahatma-gandhi-achievement-1", textKey: "mahatma-gandhi.achievement.1", sourceIds: ["src_gandhi_biography", "src_gandhi_wikipedia"] },
      { id: "mahatma-gandhi-achievement-2", textKey: "mahatma-gandhi.achievement.2", sourceIds: ["src_gandhi_wikipedia"] },
    ],
    moments: [],
    turningPoints: [
      {
        id: "mahatma-gandhi-turning-point-1",
        textKey: "mahatma-gandhi.turning_point.1",
        interpretationKey: "mahatma-gandhi.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_gandhi_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1869", textKey: "mahatma-gandhi.life_arc.1", sourceIds: ["src_gandhi_wikipedia"] },
      { year: "South Africa", textKey: "mahatma-gandhi.life_arc.2", sourceIds: ["src_gandhi_wikipedia", "src_gandhi_biography"] },
      { year: "1920–1942", textKey: "mahatma-gandhi.life_arc.3", sourceIds: ["src_gandhi_wikipedia"] },
      { year: "1930", textKey: "mahatma-gandhi.life_arc.4", sourceIds: ["src_gandhi_wikipedia"] },
      { year: "1947", textKey: "mahatma-gandhi.life_arc.5", sourceIds: ["src_gandhi_wikipedia"] },
      { year: "1948", textKey: "mahatma-gandhi.life_arc.6", sourceIds: ["src_gandhi_wikipedia"] },
    ],
  },

  // Remaining-19 Editorial Completion Batch 1 (2026-08): the 10 highest-
  // exposure of the 19 Tier-C people with zero editorial content, selected
  // by a fresh composite of top-1/top-3 quiz-simulation match frequency
  // (N=10,000) and Similar-People-rail in-degree, exposure weighted to
  // dominate per this batch's brief. Every item's sourceIds trace to each
  // person's own pre-existing src_*_wikipedia entry, directly re-fetched
  // and inspected this session (not memory). See docs/checkpoints/
  // editorial.md for the full ranking and selection record.
  "simone-biles": {
    achievements: [
      { id: "simone-biles-achievement-1", textKey: "simone-biles.achievement.1", sourceIds: ["src_biles_wikipedia"] },
      { id: "simone-biles-achievement-2", textKey: "simone-biles.achievement.2", sourceIds: ["src_biles_wikipedia"] },
    ],
    moments: [
      { id: "simone-biles-moment-1", textKey: "simone-biles.moment.1", sourceIds: ["src_biles_wikipedia"] },
      { id: "simone-biles-moment-2", textKey: "simone-biles.moment.2", sourceIds: ["src_biles_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "simone-biles-turning-point-1",
        textKey: "simone-biles.turning_point.1",
        interpretationKey: "simone-biles.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_biles_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1997", textKey: "simone-biles.life_arc.1", sourceIds: ["src_biles_wikipedia"] },
      { year: "2013", textKey: "simone-biles.life_arc.2", sourceIds: ["src_biles_wikipedia"] },
      { year: "2016", textKey: "simone-biles.life_arc.3", sourceIds: ["src_biles_wikipedia"] },
      { year: "2018", textKey: "simone-biles.life_arc.4", sourceIds: ["src_biles_wikipedia"] },
      { year: "2021", textKey: "simone-biles.life_arc.5", sourceIds: ["src_biles_wikipedia"] },
      { year: "2024", textKey: "simone-biles.life_arc.6", sourceIds: ["src_biles_wikipedia"] },
    ],
    legacy: { textKey: "simone-biles.legacy", sourceIds: ["src_biles_wikipedia"] },
  },

  "serena-williams": {
    achievements: [
      { id: "serena-williams-achievement-1", textKey: "serena-williams.achievement.1", sourceIds: ["src_serena_wikipedia"] },
      { id: "serena-williams-achievement-2", textKey: "serena-williams.achievement.2", sourceIds: ["src_serena_wikipedia"] },
    ],
    moments: [
      { id: "serena-williams-moment-1", textKey: "serena-williams.moment.1", sourceIds: ["src_serena_wikipedia"] },
      { id: "serena-williams-moment-2", textKey: "serena-williams.moment.2", sourceIds: ["src_serena_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "serena-williams-turning-point-1",
        textKey: "serena-williams.turning_point.1",
        interpretationKey: "serena-williams.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_serena_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1981", textKey: "serena-williams.life_arc.1", sourceIds: ["src_serena_wikipedia"] },
      { year: "1995", textKey: "serena-williams.life_arc.2", sourceIds: ["src_serena_wikipedia"] },
      { year: "1999", textKey: "serena-williams.life_arc.3", sourceIds: ["src_serena_wikipedia"] },
      { year: "2002–2003", textKey: "serena-williams.life_arc.4", sourceIds: ["src_serena_wikipedia"] },
      { year: "2017", textKey: "serena-williams.life_arc.5", sourceIds: ["src_serena_wikipedia"] },
      { year: "2022", textKey: "serena-williams.life_arc.6", sourceIds: ["src_serena_wikipedia"] },
    ],
    legacy: { textKey: "serena-williams.legacy", sourceIds: ["src_serena_wikipedia"] },
  },

  // Evidence-remediation correction (2026-08, same batch): re-evaluated the
  // earlier decision to omit a Complexity for Feynman's own documented
  // conduct toward women. The prior justification ("not part of his
  // primary domain of physics/teaching") was not the correct standard.
  // Re-applying the actual Complexity test -- does well-supported evidence
  // about his own conduct materially complicate a responsible modern
  // profile? -- the answer is yes: it is described in his own memoir
  // (Surely You're Joking, Mr. Feynman!), not an allegation, and it is
  // exactly the kind of documented personal conduct increasingly
  // discussed in modern reassessments of his legacy. Included below.
  "richard-feynman": {
    achievements: [
      { id: "richard-feynman-achievement-1", textKey: "richard-feynman.achievement.1", sourceIds: ["src_feynman_wikipedia"] },
      { id: "richard-feynman-achievement-2", textKey: "richard-feynman.achievement.2", sourceIds: ["src_feynman_wikipedia"] },
    ],
    moments: [
      { id: "richard-feynman-moment-1", textKey: "richard-feynman.moment.1", sourceIds: ["src_feynman_wikipedia"] },
      { id: "richard-feynman-moment-2", textKey: "richard-feynman.moment.2", sourceIds: ["src_feynman_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "richard-feynman-turning-point-1",
        textKey: "richard-feynman.turning_point.1",
        interpretationKey: "richard-feynman.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_feynman_wikipedia"],
      },
    ],
    complexities: [
      { id: "richard-feynman-complexities-1", textKey: "richard-feynman.complexities.1", sourceIds: ["src_feynman_wikipedia"] },
    ],
    lifeArc: [
      { year: "1918", textKey: "richard-feynman.life_arc.1", sourceIds: ["src_feynman_wikipedia"] },
      { year: "1943–1945", textKey: "richard-feynman.life_arc.2", sourceIds: ["src_feynman_wikipedia"] },
      { year: "1950s–1960s", textKey: "richard-feynman.life_arc.3", sourceIds: ["src_feynman_wikipedia"] },
      { year: "1965", textKey: "richard-feynman.life_arc.4", sourceIds: ["src_feynman_wikipedia"] },
      { year: "1986", textKey: "richard-feynman.life_arc.5", sourceIds: ["src_feynman_wikipedia"] },
      { year: "1988", textKey: "richard-feynman.life_arc.6", sourceIds: ["src_feynman_wikipedia"] },
    ],
    legacy: { textKey: "richard-feynman.legacy", sourceIds: ["src_feynman_wikipedia"] },
  },

  "ibn-khaldun": {
    achievements: [
      { id: "ibn-khaldun-achievement-1", textKey: "ibn-khaldun.achievement.1", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { id: "ibn-khaldun-achievement-2", textKey: "ibn-khaldun.achievement.2", sourceIds: ["src_ibnkhaldun_wikipedia"] },
    ],
    moments: [
      { id: "ibn-khaldun-moment-1", textKey: "ibn-khaldun.moment.1", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { id: "ibn-khaldun-moment-2", textKey: "ibn-khaldun.moment.2", sourceIds: ["src_ibnkhaldun_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "ibn-khaldun-turning-point-1",
        textKey: "ibn-khaldun.turning_point.1",
        interpretationKey: "ibn-khaldun.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_ibnkhaldun_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1332", textKey: "ibn-khaldun.life_arc.1", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { year: "1348–1349", textKey: "ibn-khaldun.life_arc.2", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { year: "1352–1374", textKey: "ibn-khaldun.life_arc.3", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { year: "1375–1378", textKey: "ibn-khaldun.life_arc.4", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { year: "1384–1406", textKey: "ibn-khaldun.life_arc.5", sourceIds: ["src_ibnkhaldun_wikipedia"] },
      { year: "1401–1406", textKey: "ibn-khaldun.life_arc.6", sourceIds: ["src_ibnkhaldun_wikipedia"] },
    ],
    legacy: { textKey: "ibn-khaldun.legacy", sourceIds: ["src_ibnkhaldun_wikipedia"] },
  },

  // Ancient-figure discipline (2026-08): Confucius's evidence is thin and
  // his own political program went unadopted in his lifetime, so this
  // profile deliberately runs 1 achievement / 2 moments / 0 turning points
  // rather than padding for symmetry.
  //
  // Evidence-remediation correction (2026-08, same batch): an earlier
  // draft carried a "complexities" item about later Han-dynasty
  // Confucianism diverging from Confucius's own teaching. On review
  // against the Complexity standard ("the person's OWN actions/legacy are
  // historically contested"), that material is about later reception and
  // institutional transformation of his name, not a contested fact about
  // Confucius himself -- it has been moved into Legacy below, where "what
  // endured or changed because of the person" is the correct place for it,
  // and the complexities field removed rather than kept for structural
  // richness.
  "confucius": {
    achievements: [{ id: "confucius-achievement-1", textKey: "confucius.achievement.1", sourceIds: ["src_confucius_wikipedia"] }],
    moments: [
      { id: "confucius-moment-1", textKey: "confucius.moment.1", sourceIds: ["src_confucius_wikipedia"] },
      { id: "confucius-moment-2", textKey: "confucius.moment.2", sourceIds: ["src_confucius_wikipedia"] },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "c. 551 BCE", textKey: "confucius.life_arc.1", sourceIds: ["src_confucius_wikipedia"] },
      { year: "c. 501 BCE", textKey: "confucius.life_arc.2", sourceIds: ["src_confucius_wikipedia"] },
      { year: "c. 497 BCE", textKey: "confucius.life_arc.3", sourceIds: ["src_confucius_wikipedia"] },
      { year: "c. 484–479 BCE", textKey: "confucius.life_arc.4", sourceIds: ["src_confucius_wikipedia"] },
      { year: "After 479 BCE", textKey: "confucius.life_arc.5", sourceIds: ["src_confucius_wikipedia"] },
    ],
    legacy: { textKey: "confucius.legacy", sourceIds: ["src_confucius_wikipedia"] },
  },

  // Tense-neutral by design (2026-08): Kusama died 2026-08-14, confirmed
  // independently (CNN/NPR/Washington Post/ABC/her official site) but the
  // roster record (isLiving/deathYear in roster2.ts) has not been updated
  // yet -- that is an out-of-scope roster-data fix, flagged separately, not
  // this editorial task's to make. life_arc.6 and legacy below state the
  // death date as fact (it is one) without the rest of the profile
  // asserting she is currently alive or dead either way.
  //
  // Complexities provenance (2026-08, evidence-remediation pass): the
  // racism-apology item is backed by both this person's existing
  // src_kusama_wikipedia entry (which already states the 2023 apology
  // briefly) AND a newly-added src_kusama_nbc_apology press source (NBC
  // News, Oct 2023) carrying the specific detail (her 2003 memoir, the
  // SFMOMA context, her direct quote) -- not just the bare fact that a
  // Wikipedia URL exists in this person's sources array.
  "yayoi-kusama": {
    achievements: [
      { id: "yayoi-kusama-achievement-1", textKey: "yayoi-kusama.achievement.1", sourceIds: ["src_kusama_wikipedia"] },
      { id: "yayoi-kusama-achievement-2", textKey: "yayoi-kusama.achievement.2", sourceIds: ["src_kusama_wikipedia"] },
    ],
    moments: [
      { id: "yayoi-kusama-moment-1", textKey: "yayoi-kusama.moment.1", sourceIds: ["src_kusama_wikipedia"] },
      { id: "yayoi-kusama-moment-2", textKey: "yayoi-kusama.moment.2", sourceIds: ["src_kusama_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "yayoi-kusama-turning-point-1",
        textKey: "yayoi-kusama.turning_point.1",
        interpretationKey: "yayoi-kusama.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_kusama_wikipedia"],
      },
    ],
    complexities: [
      {
        id: "yayoi-kusama-complexities-1",
        textKey: "yayoi-kusama.complexities.1",
        sourceIds: ["src_kusama_wikipedia", "src_kusama_nbc_apology"],
      },
    ],
    lifeArc: [
      { year: "1929", textKey: "yayoi-kusama.life_arc.1", sourceIds: ["src_kusama_wikipedia"] },
      { year: "1957–1958", textKey: "yayoi-kusama.life_arc.2", sourceIds: ["src_kusama_wikipedia"] },
      { year: "1960s", textKey: "yayoi-kusama.life_arc.3", sourceIds: ["src_kusama_wikipedia"] },
      { year: "1973", textKey: "yayoi-kusama.life_arc.4", sourceIds: ["src_kusama_wikipedia"] },
      { year: "1977", textKey: "yayoi-kusama.life_arc.5", sourceIds: ["src_kusama_wikipedia"] },
      { year: "1993–2026", textKey: "yayoi-kusama.life_arc.6", sourceIds: ["src_kusama_wikipedia"] },
    ],
    legacy: { textKey: "yayoi-kusama.legacy", sourceIds: ["src_kusama_wikipedia"] },
  },

  "nikola-tesla": {
    achievements: [
      { id: "nikola-tesla-achievement-1", textKey: "nikola-tesla.achievement.1", sourceIds: ["src_tesla_wikipedia"] },
      { id: "nikola-tesla-achievement-2", textKey: "nikola-tesla.achievement.2", sourceIds: ["src_tesla_wikipedia"] },
    ],
    moments: [
      { id: "nikola-tesla-moment-1", textKey: "nikola-tesla.moment.1", sourceIds: ["src_tesla_wikipedia"] },
      { id: "nikola-tesla-moment-2", textKey: "nikola-tesla.moment.2", sourceIds: ["src_tesla_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "nikola-tesla-turning-point-1",
        textKey: "nikola-tesla.turning_point.1",
        interpretationKey: "nikola-tesla.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_tesla_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1856", textKey: "nikola-tesla.life_arc.1", sourceIds: ["src_tesla_wikipedia"] },
      { year: "1884", textKey: "nikola-tesla.life_arc.2", sourceIds: ["src_tesla_wikipedia"] },
      { year: "1888", textKey: "nikola-tesla.life_arc.3", sourceIds: ["src_tesla_wikipedia"] },
      { year: "1893", textKey: "nikola-tesla.life_arc.4", sourceIds: ["src_tesla_wikipedia"] },
      { year: "1901–1905", textKey: "nikola-tesla.life_arc.5", sourceIds: ["src_tesla_wikipedia"] },
      { year: "1943", textKey: "nikola-tesla.life_arc.6", sourceIds: ["src_tesla_wikipedia"] },
    ],
    legacy: { textKey: "nikola-tesla.legacy", sourceIds: ["src_tesla_wikipedia"] },
  },

  // Kurosawa's 1971 suicide attempt (turning_point.1) is reported here only
  // as the well-documented historical event this person's own Wikipedia
  // article states plainly -- no diagnosis, no speculation about cause
  // beyond the two professional setbacks (the Tora! Tora! Tora! firing,
  // Dodesukaden's commercial failure) the article itself sequences
  // immediately beforehand.
  //
  // Evidence-remediation re-review (2026-08, same batch): re-checked
  // against the sensitive-content standard -- directly sourced (yes, the
  // article states it plainly), genuinely marks a documented career
  // before/after (yes), written neutrally (the wording was tightened this
  // pass to remove "the start of an internationally financed final act"
  // framing, which read as implying the attempt itself produced his later
  // international funding rather than merely preceding it), no diagnostic
  // speculation (none added), no sensational wording ("attempted suicide,"
  // not the article's more graphic phrasing), no causal claim that the
  // attempt produced his later success (Dersu Uzala's Soviet funding is
  // stated as a separate, already-documented fact that followed, not one
  // the attempt caused). Retained as a Turning Point on this basis.
  "akira-kurosawa": {
    achievements: [
      { id: "akira-kurosawa-achievement-1", textKey: "akira-kurosawa.achievement.1", sourceIds: ["src_kurosawa_wikipedia"] },
      { id: "akira-kurosawa-achievement-2", textKey: "akira-kurosawa.achievement.2", sourceIds: ["src_kurosawa_wikipedia"] },
    ],
    moments: [
      { id: "akira-kurosawa-moment-1", textKey: "akira-kurosawa.moment.1", sourceIds: ["src_kurosawa_wikipedia"] },
      { id: "akira-kurosawa-moment-2", textKey: "akira-kurosawa.moment.2", sourceIds: ["src_kurosawa_wikipedia"] },
    ],
    turningPoints: [
      { id: "akira-kurosawa-turning-point-1", textKey: "akira-kurosawa.turning_point.1", sourceIds: ["src_kurosawa_wikipedia"] },
    ],
    lifeArc: [
      { year: "1910", textKey: "akira-kurosawa.life_arc.1", sourceIds: ["src_kurosawa_wikipedia"] },
      { year: "1936", textKey: "akira-kurosawa.life_arc.2", sourceIds: ["src_kurosawa_wikipedia"] },
      { year: "1943", textKey: "akira-kurosawa.life_arc.3", sourceIds: ["src_kurosawa_wikipedia"] },
      { year: "1950–1954", textKey: "akira-kurosawa.life_arc.4", sourceIds: ["src_kurosawa_wikipedia"] },
      { year: "1968–1975", textKey: "akira-kurosawa.life_arc.5", sourceIds: ["src_kurosawa_wikipedia"] },
      { year: "1980–1998", textKey: "akira-kurosawa.life_arc.6", sourceIds: ["src_kurosawa_wikipedia"] },
    ],
    legacy: { textKey: "akira-kurosawa.legacy", sourceIds: ["src_kurosawa_wikipedia"] },
  },

  "ludwig-van-beethoven": {
    achievements: [
      { id: "ludwig-van-beethoven-achievement-1", textKey: "ludwig-van-beethoven.achievement.1", sourceIds: ["src_beethoven_wikipedia"] },
      { id: "ludwig-van-beethoven-achievement-2", textKey: "ludwig-van-beethoven.achievement.2", sourceIds: ["src_beethoven_wikipedia"] },
    ],
    moments: [
      { id: "ludwig-van-beethoven-moment-1", textKey: "ludwig-van-beethoven.moment.1", sourceIds: ["src_beethoven_wikipedia"] },
      { id: "ludwig-van-beethoven-moment-2", textKey: "ludwig-van-beethoven.moment.2", sourceIds: ["src_beethoven_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "ludwig-van-beethoven-turning-point-1",
        textKey: "ludwig-van-beethoven.turning_point.1",
        interpretationKey: "ludwig-van-beethoven.interpretation.turning_point.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_beethoven_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1770", textKey: "ludwig-van-beethoven.life_arc.1", sourceIds: ["src_beethoven_wikipedia"] },
      { year: "1792", textKey: "ludwig-van-beethoven.life_arc.2", sourceIds: ["src_beethoven_wikipedia"] },
      { year: "1802", textKey: "ludwig-van-beethoven.life_arc.3", sourceIds: ["src_beethoven_wikipedia"] },
      { year: "1803–1808", textKey: "ludwig-van-beethoven.life_arc.4", sourceIds: ["src_beethoven_wikipedia"] },
      { year: "1809", textKey: "ludwig-van-beethoven.life_arc.5", sourceIds: ["src_beethoven_wikipedia"] },
      { year: "1824–1827", textKey: "ludwig-van-beethoven.life_arc.6", sourceIds: ["src_beethoven_wikipedia"] },
    ],
    legacy: { textKey: "ludwig-van-beethoven.legacy", sourceIds: ["src_beethoven_wikipedia"] },
  },

  // 3 achievements / 2 moments / 0 turning points, deliberately: his
  // repeatedly announced-then-reversed retirements are a documented pattern
  // but not a single before/after break (already the roster file's own
  // reasoning for leaving belief_updating unscored on this person) -- not
  // padded with a manufactured turning point to hit symmetry with the rest
  // of this batch.
  "hayao-miyazaki": {
    achievements: [
      { id: "hayao-miyazaki-achievement-1", textKey: "hayao-miyazaki.achievement.1", sourceIds: ["src_miyazaki_wikipedia"] },
      { id: "hayao-miyazaki-achievement-2", textKey: "hayao-miyazaki.achievement.2", sourceIds: ["src_miyazaki_wikipedia"] },
      { id: "hayao-miyazaki-achievement-3", textKey: "hayao-miyazaki.achievement.3", sourceIds: ["src_miyazaki_wikipedia"] },
    ],
    moments: [
      { id: "hayao-miyazaki-moment-1", textKey: "hayao-miyazaki.moment.1", sourceIds: ["src_miyazaki_wikipedia"] },
      { id: "hayao-miyazaki-moment-2", textKey: "hayao-miyazaki.moment.2", sourceIds: ["src_miyazaki_wikipedia"] },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "1941", textKey: "hayao-miyazaki.life_arc.1", sourceIds: ["src_miyazaki_wikipedia"] },
      { year: "1944–1945", textKey: "hayao-miyazaki.life_arc.2", sourceIds: ["src_miyazaki_wikipedia"] },
      { year: "1963", textKey: "hayao-miyazaki.life_arc.3", sourceIds: ["src_miyazaki_wikipedia"] },
      { year: "1984–1985", textKey: "hayao-miyazaki.life_arc.4", sourceIds: ["src_miyazaki_wikipedia"] },
      { year: "1997–2001", textKey: "hayao-miyazaki.life_arc.5", sourceIds: ["src_miyazaki_wikipedia"] },
      { year: "2013–2023", textKey: "hayao-miyazaki.life_arc.6", sourceIds: ["src_miyazaki_wikipedia"] },
    ],
    legacy: { textKey: "hayao-miyazaki.legacy", sourceIds: ["src_miyazaki_wikipedia"] },
  },

  // Remaining-19 Editorial Completion Batch 2 (2026-08): the final 9 people
  // with no editorial content, bringing coverage to 95/95. Same evidence
  // discipline as Batch 1 — every claim traces to a dated rationale comment
  // in roster2.ts/seed.ts, verified via a direct fetch of the person's own
  // Wikipedia article (and, where noted, a dedicated additional source).
  "steve-jobs": {
    achievements: [
      { id: "steve-jobs-achievement-1", textKey: "steve-jobs.achievement.1", sourceIds: ["src_jobs_wikipedia"] },
      { id: "steve-jobs-achievement-2", textKey: "steve-jobs.achievement.2", sourceIds: ["src_jobs_wikipedia"] },
      { id: "steve-jobs-achievement-3", textKey: "steve-jobs.achievement.3", sourceIds: ["src_jobs_wikipedia"] },
    ],
    moments: [
      {
        id: "steve-jobs-moment-1",
        textKey: "steve-jobs.moment.1",
        interpretationKey: "steve-jobs.interpretation.moment.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_jobs_wikipedia"],
      },
      { id: "steve-jobs-moment-2", textKey: "steve-jobs.moment.2", sourceIds: ["src_jobs_wikipedia"] },
    ],
    turningPoints: [
      { id: "steve-jobs-turning-point-1", textKey: "steve-jobs.turning_point.1", sourceIds: ["src_jobs_wikipedia"] },
      {
        id: "steve-jobs-turning-point-2",
        textKey: "steve-jobs.turning_point.2",
        interpretationKey: "steve-jobs.interpretation.turning_point.2",
        attributeId: "proactive_agency",
        sourceIds: ["src_jobs_wikipedia"],
      },
    ],
    complexities: [
      { id: "steve-jobs-complexities-1", textKey: "steve-jobs.complexities.1", sourceIds: ["src_jobs_wikipedia", "src_jobs_biography"] },
    ],
    lifeArc: [
      { year: "1955", textKey: "steve-jobs.life_arc.1", sourceIds: ["src_jobs_wikipedia"] },
      { year: "1976", textKey: "steve-jobs.life_arc.2", sourceIds: ["src_jobs_wikipedia"] },
      { year: "1984", textKey: "steve-jobs.life_arc.3", sourceIds: ["src_jobs_wikipedia"] },
      { year: "1985", textKey: "steve-jobs.life_arc.4", sourceIds: ["src_jobs_wikipedia"] },
      { year: "1997–2007", textKey: "steve-jobs.life_arc.5", sourceIds: ["src_jobs_wikipedia"] },
      { year: "2011", textKey: "steve-jobs.life_arc.6", sourceIds: ["src_jobs_wikipedia"] },
    ],
    legacy: { textKey: "steve-jobs.legacy", sourceIds: ["src_jobs_wikipedia"] },
  },

  "socrates": {
    achievements: [
      { id: "socrates-achievement-1", textKey: "socrates.achievement.1", sourceIds: ["src_socrates_wikipedia"] },
      { id: "socrates-achievement-2", textKey: "socrates.achievement.2", sourceIds: ["src_socrates_wikipedia"] },
    ],
    moments: [
      { id: "socrates-moment-1", textKey: "socrates.moment.1", sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"] },
      {
        id: "socrates-moment-2",
        textKey: "socrates.moment.2",
        interpretationKey: "socrates.interpretation.moment.2",
        attributeId: "proactive_agency",
        sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"],
      },
    ],
    turningPoints: [
      { id: "socrates-turning-point-1", textKey: "socrates.turning_point.1", sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"] },
    ],
    lifeArc: [
      { year: "c. 470 BC", textKey: "socrates.life_arc.1", sourceIds: ["src_socrates_wikipedia"] },
      { year: "5th c. BC", textKey: "socrates.life_arc.2", sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"] },
      { year: "By his mid-40s", textKey: "socrates.life_arc.3", sourceIds: ["src_socrates_wikipedia"] },
      { year: "404 BC", textKey: "socrates.life_arc.4", sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"] },
      { year: "399 BC", textKey: "socrates.life_arc.5", sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"] },
      { year: "399 BC", textKey: "socrates.life_arc.6", sourceIds: ["src_socrates_wikipedia", "src_socrates_biography"] },
    ],
    // Final closure audit (2026-08-30): src_socrates_xenophon_biography was
    // added to sources specifically so claims could cite Xenophon's account
    // separately from Plato's, per the rationale comment above -- but no
    // item actually referenced it, leaving it orphaned. Legacy is the one
    // item that makes a claim specifically about Xenophon's portrait
    // ("more matter-of-fact... lacking Plato's elenchus/ignorance themes"),
    // so it is the correct item to carry this sourceId. Wiring only --
    // no prose changed.
    legacy: { textKey: "socrates.legacy", sourceIds: ["src_socrates_wikipedia", "src_socrates_xenophon_biography"] },
  },

  "coco-chanel": {
    achievements: [
      { id: "coco-chanel-achievement-1", textKey: "coco-chanel.achievement.1", sourceIds: ["src_chanel_wikipedia"] },
      { id: "coco-chanel-achievement-2", textKey: "coco-chanel.achievement.2", sourceIds: ["src_chanel_wikipedia"] },
    ],
    moments: [
      { id: "coco-chanel-moment-1", textKey: "coco-chanel.moment.1", sourceIds: ["src_chanel_wikipedia"] },
      {
        id: "coco-chanel-moment-2",
        textKey: "coco-chanel.moment.2",
        interpretationKey: "coco-chanel.interpretation.moment.2",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_chanel_wikipedia"],
      },
    ],
    turningPoints: [
      { id: "coco-chanel-turning-point-1", textKey: "coco-chanel.turning_point.1", sourceIds: ["src_chanel_wikipedia"] },
    ],
    complexities: [
      {
        id: "coco-chanel-complexities-1",
        textKey: "coco-chanel.complexities.1",
        sourceIds: ["src_chanel_wikipedia", "src_chanel_vaughan_biography"],
      },
    ],
    lifeArc: [
      { year: "1883", textKey: "coco-chanel.life_arc.1", sourceIds: ["src_chanel_wikipedia"] },
      { year: "1910–1913", textKey: "coco-chanel.life_arc.2", sourceIds: ["src_chanel_wikipedia"] },
      { year: "1921", textKey: "coco-chanel.life_arc.3", sourceIds: ["src_chanel_wikipedia"] },
      { year: "1939", textKey: "coco-chanel.life_arc.4", sourceIds: ["src_chanel_wikipedia"] },
      { year: "1954", textKey: "coco-chanel.life_arc.5", sourceIds: ["src_chanel_wikipedia"] },
      { year: "1971", textKey: "coco-chanel.life_arc.6", sourceIds: ["src_chanel_wikipedia"] },
    ],
    legacy: { textKey: "coco-chanel.legacy", sourceIds: ["src_chanel_wikipedia"] },
  },

  "genghis-khan": {
    achievements: [
      { id: "genghis-khan-achievement-1", textKey: "genghis-khan.achievement.1", sourceIds: ["src_genghiskhan_wikipedia"] },
      { id: "genghis-khan-achievement-2", textKey: "genghis-khan.achievement.2", sourceIds: ["src_genghiskhan_wikipedia"] },
    ],
    moments: [
      { id: "genghis-khan-moment-1", textKey: "genghis-khan.moment.1", sourceIds: ["src_genghiskhan_wikipedia"] },
      { id: "genghis-khan-moment-2", textKey: "genghis-khan.moment.2", sourceIds: ["src_genghiskhan_wikipedia"] },
    ],
    turningPoints: [
      {
        id: "genghis-khan-turning-point-1",
        textKey: "genghis-khan.turning_point.1",
        interpretationKey: "genghis-khan.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_genghiskhan_wikipedia"],
      },
      { id: "genghis-khan-turning-point-2", textKey: "genghis-khan.turning_point.2", sourceIds: ["src_genghiskhan_wikipedia"] },
    ],
    complexities: [
      { id: "genghis-khan-complexities-1", textKey: "genghis-khan.complexities.1", sourceIds: ["src_genghiskhan_wikipedia"] },
    ],
    lifeArc: [
      { year: "c. 1162", textKey: "genghis-khan.life_arc.1", sourceIds: ["src_genghiskhan_wikipedia"] },
      { year: "Early adulthood", textKey: "genghis-khan.life_arc.2", sourceIds: ["src_genghiskhan_wikipedia"] },
      { year: "1204", textKey: "genghis-khan.life_arc.3", sourceIds: ["src_genghiskhan_wikipedia"] },
      { year: "1206", textKey: "genghis-khan.life_arc.4", sourceIds: ["src_genghiskhan_wikipedia"] },
      { year: "1219–1221", textKey: "genghis-khan.life_arc.5", sourceIds: ["src_genghiskhan_wikipedia"] },
      { year: "1227", textKey: "genghis-khan.life_arc.6", sourceIds: ["src_genghiskhan_wikipedia"] },
    ],
    legacy: { textKey: "genghis-khan.legacy", sourceIds: ["src_genghiskhan_wikipedia"] },
  },

  "malala-yousafzai": {
    achievements: [
      { id: "malala-yousafzai-achievement-1", textKey: "malala-yousafzai.achievement.1", sourceIds: ["src_malala_wikipedia"] },
      { id: "malala-yousafzai-achievement-2", textKey: "malala-yousafzai.achievement.2", sourceIds: ["src_malala_wikipedia"] },
    ],
    moments: [
      {
        id: "malala-yousafzai-moment-1",
        textKey: "malala-yousafzai.moment.1",
        interpretationKey: "malala-yousafzai.interpretation.moment.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_malala_wikipedia"],
      },
      { id: "malala-yousafzai-moment-2", textKey: "malala-yousafzai.moment.2", sourceIds: ["src_malala_wikipedia"] },
    ],
    turningPoints: [
      { id: "malala-yousafzai-turning-point-1", textKey: "malala-yousafzai.turning_point.1", sourceIds: ["src_malala_wikipedia"] },
    ],
    lifeArc: [
      { year: "1997", textKey: "malala-yousafzai.life_arc.1", sourceIds: ["src_malala_wikipedia"] },
      { year: "2009", textKey: "malala-yousafzai.life_arc.2", sourceIds: ["src_malala_wikipedia"] },
      { year: "2012", textKey: "malala-yousafzai.life_arc.3", sourceIds: ["src_malala_wikipedia"] },
      { year: "2013", textKey: "malala-yousafzai.life_arc.4", sourceIds: ["src_malala_wikipedia"] },
      { year: "2014", textKey: "malala-yousafzai.life_arc.5", sourceIds: ["src_malala_wikipedia"] },
      { year: "2020", textKey: "malala-yousafzai.life_arc.6", sourceIds: ["src_malala_wikipedia"] },
    ],
    legacy: { textKey: "malala-yousafzai.legacy", sourceIds: ["src_malala_wikipedia"] },
  },

  "bruce-lee": {
    achievements: [
      { id: "bruce-lee-achievement-1", textKey: "bruce-lee.achievement.1", sourceIds: ["src_brucelee_wikipedia"] },
      { id: "bruce-lee-achievement-2", textKey: "bruce-lee.achievement.2", sourceIds: ["src_brucelee_wikipedia"] },
    ],
    moments: [
      { id: "bruce-lee-moment-1", textKey: "bruce-lee.moment.1", sourceIds: ["src_brucelee_wikipedia"] },
      {
        id: "bruce-lee-moment-2",
        textKey: "bruce-lee.moment.2",
        interpretationKey: "bruce-lee.interpretation.moment.2",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_brucelee_wikipedia"],
      },
    ],
    turningPoints: [
      { id: "bruce-lee-turning-point-1", textKey: "bruce-lee.turning_point.1", sourceIds: ["src_brucelee_wikipedia"] },
    ],
    lifeArc: [
      { year: "1940", textKey: "bruce-lee.life_arc.1", sourceIds: ["src_brucelee_wikipedia"] },
      { year: "1953–1958", textKey: "bruce-lee.life_arc.2", sourceIds: ["src_brucelee_wikipedia"] },
      { year: "1959", textKey: "bruce-lee.life_arc.3", sourceIds: ["src_brucelee_wikipedia"] },
      { year: "1966–1967", textKey: "bruce-lee.life_arc.4", sourceIds: ["src_brucelee_wikipedia"] },
      { year: "1971–1973", textKey: "bruce-lee.life_arc.5", sourceIds: ["src_brucelee_wikipedia"] },
      { year: "1973", textKey: "bruce-lee.life_arc.6", sourceIds: ["src_brucelee_wikipedia"] },
    ],
    legacy: { textKey: "bruce-lee.legacy", sourceIds: ["src_brucelee_wikipedia"] },
  },

  "toni-morrison": {
    achievements: [
      { id: "toni-morrison-achievement-1", textKey: "toni-morrison.achievement.1", sourceIds: ["src_morrison_wikipedia"] },
      { id: "toni-morrison-achievement-2", textKey: "toni-morrison.achievement.2", sourceIds: ["src_morrison_wikipedia"] },
    ],
    moments: [
      { id: "toni-morrison-moment-1", textKey: "toni-morrison.moment.1", sourceIds: ["src_morrison_wikipedia"] },
      {
        id: "toni-morrison-moment-2",
        textKey: "toni-morrison.moment.2",
        interpretationKey: "toni-morrison.interpretation.moment.2",
        attributeId: "proactive_agency",
        sourceIds: ["src_morrison_wikipedia"],
      },
      { id: "toni-morrison-moment-3", textKey: "toni-morrison.moment.3", sourceIds: ["src_morrison_wikipedia"] },
    ],
    turningPoints: [],
    lifeArc: [
      { year: "1931", textKey: "toni-morrison.life_arc.1", sourceIds: ["src_morrison_wikipedia"] },
      { year: "1953–1955", textKey: "toni-morrison.life_arc.2", sourceIds: ["src_morrison_wikipedia"] },
      { year: "1965–1983", textKey: "toni-morrison.life_arc.3", sourceIds: ["src_morrison_wikipedia"] },
      { year: "1970", textKey: "toni-morrison.life_arc.4", sourceIds: ["src_morrison_wikipedia"] },
      { year: "1987–1993", textKey: "toni-morrison.life_arc.5", sourceIds: ["src_morrison_wikipedia"] },
      { year: "2019", textKey: "toni-morrison.life_arc.6", sourceIds: ["src_morrison_wikipedia"] },
    ],
    legacy: { textKey: "toni-morrison.legacy", sourceIds: ["src_morrison_wikipedia"] },
  },

  "zheng-he": {
    achievements: [
      { id: "zheng-he-achievement-1", textKey: "zheng-he.achievement.1", sourceIds: ["src_zhenghe_wikipedia"] },
      { id: "zheng-he-achievement-2", textKey: "zheng-he.achievement.2", sourceIds: ["src_zhenghe_wikipedia"] },
    ],
    moments: [
      { id: "zheng-he-moment-1", textKey: "zheng-he.moment.1", sourceIds: ["src_zhenghe_wikipedia"] },
      { id: "zheng-he-moment-2", textKey: "zheng-he.moment.2", sourceIds: ["src_zhenghe_wikipedia"] },
    ],
    turningPoints: [
      { id: "zheng-he-turning-point-1", textKey: "zheng-he.turning_point.1", sourceIds: ["src_zhenghe_wikipedia"] },
    ],
    lifeArc: [
      { year: "c. 1371", textKey: "zheng-he.life_arc.1", sourceIds: ["src_zhenghe_wikipedia"] },
      { year: "1381", textKey: "zheng-he.life_arc.2", sourceIds: ["src_zhenghe_wikipedia"] },
      { year: "1402–1404", textKey: "zheng-he.life_arc.3", sourceIds: ["src_zhenghe_wikipedia"] },
      { year: "1405", textKey: "zheng-he.life_arc.4", sourceIds: ["src_zhenghe_wikipedia"] },
      { year: "1424", textKey: "zheng-he.life_arc.5", sourceIds: ["src_zhenghe_wikipedia"] },
      { year: "1433", textKey: "zheng-he.life_arc.6", sourceIds: ["src_zhenghe_wikipedia"] },
    ],
    legacy: { textKey: "zheng-he.legacy", sourceIds: ["src_zhenghe_wikipedia"] },
  },

  "rumi": {
    achievements: [
      { id: "rumi-achievement-1", textKey: "rumi.achievement.1", sourceIds: ["src_rumi_wikipedia"] },
      { id: "rumi-achievement-2", textKey: "rumi.achievement.2", sourceIds: ["src_rumi_wikipedia"] },
    ],
    moments: [{ id: "rumi-moment-1", textKey: "rumi.moment.1", sourceIds: ["src_rumi_wikipedia"] }],
    turningPoints: [
      {
        id: "rumi-turning-point-1",
        textKey: "rumi.turning_point.1",
        interpretationKey: "rumi.interpretation.turning_point.1",
        attributeId: "belief_updating",
        sourceIds: ["src_rumi_wikipedia"],
      },
    ],
    lifeArc: [
      { year: "1207", textKey: "rumi.life_arc.1", sourceIds: ["src_rumi_wikipedia"] },
      { year: "c. 1215–1220", textKey: "rumi.life_arc.2", sourceIds: ["src_rumi_wikipedia"] },
      { year: "c. 1228", textKey: "rumi.life_arc.3", sourceIds: ["src_rumi_wikipedia"] },
      { year: "1244", textKey: "rumi.life_arc.4", sourceIds: ["src_rumi_wikipedia"] },
      { year: "1273", textKey: "rumi.life_arc.5", sourceIds: ["src_rumi_wikipedia"] },
    ],
    legacy: { textKey: "rumi.legacy", sourceIds: ["src_rumi_wikipedia"] },
  },

  // Roster 11 (roster-expansion-125 evidence program): Miriam Makeba.
  // Every fact below traces to her own candidate rationale
  // (data-pipeline/candidates/miriam-makeba.json, carried into
  // roster11.ts) and her existing sources — no new research performed.
  "miriam-makeba": {
    achievements: [
      {
        id: "miriam-makeba-achievement-1",
        textKey: "miriam-makeba.achievement.1",
        sourceIds: ["src_makeba_wikipedia", "src_makeba_britannica"],
      },
      {
        id: "miriam-makeba-achievement-2",
        textKey: "miriam-makeba.achievement.2",
        sourceIds: ["src_makeba_wikipedia", "src_makeba_britannica"],
      },
    ],
    moments: [
      {
        id: "miriam-makeba-moment-1",
        textKey: "miriam-makeba.moment.1",
        interpretationKey: "miriam-makeba.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_makeba_memoir", "src_makeba_safundi"],
      },
      {
        id: "miriam-makeba-moment-2",
        textKey: "miriam-makeba.moment.2",
        sourceIds: ["src_makeba_wikipedia", "src_makeba_britannica"],
      },
    ],
    turningPoints: [
      {
        id: "miriam-makeba-turning-point-1",
        textKey: "miriam-makeba.turning_point.1",
        interpretationKey: "miriam-makeba.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_makeba_safundi"],
      },
    ],
  },

  // Roster 12 (new-intake batch, 2026-09): Marcus Aurelius. Every fact below
  // traces to his own candidate rationale (data-pipeline/candidates/
  // marcus-aurelius.json, carried into roster12.ts) and his existing sources
  // (Meditations, Cassius Dio, Historia Augusta) — no new research performed.
  "marcus-aurelius": {
    achievements: [
      {
        id: "marcus-aurelius-achievement-1",
        textKey: "marcus-aurelius.achievement.1",
        sourceIds: ["src_ma_meditations"],
      },
      {
        id: "marcus-aurelius-achievement-2",
        textKey: "marcus-aurelius.achievement.2",
        sourceIds: ["src_ma_cassius_dio"],
      },
    ],
    moments: [
      {
        id: "marcus-aurelius-moment-1",
        textKey: "marcus-aurelius.moment.1",
        interpretationKey: "marcus-aurelius.interpretation.moment.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_ma_cassius_dio", "src_ma_historia_augusta"],
      },
      {
        id: "marcus-aurelius-moment-2",
        textKey: "marcus-aurelius.moment.2",
        sourceIds: ["src_ma_meditations"],
      },
    ],
    turningPoints: [
      {
        id: "marcus-aurelius-turning-point-1",
        textKey: "marcus-aurelius.turning_point.1",
        interpretationKey: "marcus-aurelius.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_ma_cassius_dio", "src_ma_wikipedia"],
      },
    ],
  },

  // Roster 14 (coverage-aware intake, 2026-09). Every fact below traces to
  // each person's own candidate rationale (data-pipeline/candidates/<slug>.json,
  // carried into roster14.ts) and their existing sources — no new research
  // performed for editorial content.
  "abraham-lincoln": {
    achievements: [
      { id: "abraham-lincoln-achievement-1", textKey: "abraham-lincoln.achievement.1", sourceIds: ["src_al_collected_works"] },
      { id: "abraham-lincoln-achievement-2", textKey: "abraham-lincoln.achievement.2", sourceIds: ["src_al_goodwin", "src_al_collected_works"] },
    ],
    moments: [
      {
        id: "abraham-lincoln-moment-1",
        textKey: "abraham-lincoln.moment.1",
        interpretationKey: "abraham-lincoln.interpretation.moment.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_al_goodwin"],
      },
      { id: "abraham-lincoln-moment-2", textKey: "abraham-lincoln.moment.2", sourceIds: ["src_al_goodwin"] },
    ],
    turningPoints: [
      {
        id: "abraham-lincoln-turning-point-1",
        textKey: "abraham-lincoln.turning_point.1",
        interpretationKey: "abraham-lincoln.interpretation.turning_point.1",
        attributeId: "adaptability",
        sourceIds: ["src_al_collected_works"],
      },
    ],
  },

  "theodore-roosevelt": {
    achievements: [
      { id: "theodore-roosevelt-achievement-1", textKey: "theodore-roosevelt.achievement.1", sourceIds: ["src_tr_autobiography", "src_tr_morris_tr"] },
      { id: "theodore-roosevelt-achievement-2", textKey: "theodore-roosevelt.achievement.2", sourceIds: ["src_tr_morris_rise"] },
    ],
    moments: [
      {
        id: "theodore-roosevelt-moment-1",
        textKey: "theodore-roosevelt.moment.1",
        interpretationKey: "theodore-roosevelt.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_tr_morris_rise"],
      },
      { id: "theodore-roosevelt-moment-2", textKey: "theodore-roosevelt.moment.2", sourceIds: ["src_tr_morris_tr"] },
    ],
    turningPoints: [
      {
        id: "theodore-roosevelt-turning-point-1",
        textKey: "theodore-roosevelt.turning_point.1",
        interpretationKey: "theodore-roosevelt.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_tr_morris_tr"],
      },
    ],
  },

  "alexander-hamilton": {
    achievements: [
      { id: "alexander-hamilton-achievement-1", textKey: "alexander-hamilton.achievement.1", sourceIds: ["src_ah_papers"] },
      { id: "alexander-hamilton-achievement-2", textKey: "alexander-hamilton.achievement.2", sourceIds: ["src_ah_federalist"] },
    ],
    moments: [
      {
        id: "alexander-hamilton-moment-1",
        textKey: "alexander-hamilton.moment.1",
        interpretationKey: "alexander-hamilton.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_ah_papers"],
      },
      { id: "alexander-hamilton-moment-2", textKey: "alexander-hamilton.moment.2", sourceIds: ["src_ah_chernow"] },
    ],
    turningPoints: [
      {
        id: "alexander-hamilton-turning-point-1",
        textKey: "alexander-hamilton.turning_point.1",
        interpretationKey: "alexander-hamilton.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_ah_chernow"],
      },
    ],
  },

  "mark-twain": {
    achievements: [
      { id: "mark-twain-achievement-1", textKey: "mark-twain.achievement.1", sourceIds: ["src_mt_powers"] },
      { id: "mark-twain-achievement-2", textKey: "mark-twain.achievement.2", sourceIds: ["src_mt_powers"] },
    ],
    moments: [
      {
        id: "mark-twain-moment-1",
        textKey: "mark-twain.moment.1",
        interpretationKey: "mark-twain.interpretation.moment.1",
        attributeId: "discipline",
        sourceIds: ["src_mt_powers"],
      },
      { id: "mark-twain-moment-2", textKey: "mark-twain.moment.2", sourceIds: ["src_mt_letters"] },
    ],
    turningPoints: [
      {
        id: "mark-twain-turning-point-1",
        textKey: "mark-twain.turning_point.1",
        interpretationKey: "mark-twain.interpretation.turning_point.1",
        attributeId: "ambiguity_tolerance",
        sourceIds: ["src_mt_autobiography"],
      },
    ],
  },

  "ernest-hemingway": {
    achievements: [
      { id: "ernest-hemingway-achievement-1", textKey: "ernest-hemingway.achievement.1", sourceIds: ["src_eh_reynolds"] },
      { id: "ernest-hemingway-achievement-2", textKey: "ernest-hemingway.achievement.2", sourceIds: ["src_eh_reynolds"] },
    ],
    moments: [
      {
        id: "ernest-hemingway-moment-1",
        textKey: "ernest-hemingway.moment.1",
        interpretationKey: "ernest-hemingway.interpretation.moment.1",
        attributeId: "perfectionism",
        sourceIds: ["src_eh_letters"],
      },
      { id: "ernest-hemingway-moment-2", textKey: "ernest-hemingway.moment.2", sourceIds: ["src_eh_movable_feast"] },
    ],
    turningPoints: [
      {
        id: "ernest-hemingway-turning-point-1",
        textKey: "ernest-hemingway.turning_point.1",
        interpretationKey: "ernest-hemingway.interpretation.turning_point.1",
        attributeId: "ambiguity_tolerance",
        sourceIds: ["src_eh_reynolds"],
      },
    ],
  },

  "elizabeth-i": {
    achievements: [
      { id: "elizabeth-i-achievement-1", textKey: "elizabeth-i.achievement.1", sourceIds: ["src_e1_collected_works"] },
      { id: "elizabeth-i-achievement-2", textKey: "elizabeth-i.achievement.2", sourceIds: ["src_e1_starkey"] },
    ],
    moments: [
      {
        id: "elizabeth-i-moment-1",
        textKey: "elizabeth-i.moment.1",
        interpretationKey: "elizabeth-i.interpretation.moment.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_e1_somerset"],
      },
      { id: "elizabeth-i-moment-2", textKey: "elizabeth-i.moment.2", sourceIds: ["src_e1_starkey"] },
    ],
    turningPoints: [
      {
        id: "elizabeth-i-turning-point-1",
        textKey: "elizabeth-i.turning_point.1",
        interpretationKey: "elizabeth-i.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_e1_starkey"],
      },
    ],
  },

  "otto-von-bismarck": {
    achievements: [
      { id: "otto-von-bismarck-achievement-1", textKey: "otto-von-bismarck.achievement.1", sourceIds: ["src_ob_taylor"] },
      { id: "otto-von-bismarck-achievement-2", textKey: "otto-von-bismarck.achievement.2", sourceIds: ["src_ob_memoirs"] },
    ],
    moments: [
      {
        id: "otto-von-bismarck-moment-1",
        textKey: "otto-von-bismarck.moment.1",
        interpretationKey: "otto-von-bismarck.interpretation.moment.1",
        attributeId: "decisiveness",
        sourceIds: ["src_ob_memoirs"],
      },
      { id: "otto-von-bismarck-moment-2", textKey: "otto-von-bismarck.moment.2", sourceIds: ["src_ob_steinberg"] },
    ],
    turningPoints: [
      {
        id: "otto-von-bismarck-turning-point-1",
        textKey: "otto-von-bismarck.turning_point.1",
        interpretationKey: "otto-von-bismarck.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_ob_steinberg"],
      },
    ],
  },

  "leo-tolstoy": {
    achievements: [
      { id: "leo-tolstoy-achievement-1", textKey: "leo-tolstoy.achievement.1", sourceIds: ["src_lt_wilson"] },
      { id: "leo-tolstoy-achievement-2", textKey: "leo-tolstoy.achievement.2", sourceIds: ["src_lt_troyat"] },
    ],
    moments: [
      {
        id: "leo-tolstoy-moment-1",
        textKey: "leo-tolstoy.moment.1",
        interpretationKey: "leo-tolstoy.interpretation.moment.1",
        attributeId: "belief_updating",
        sourceIds: ["src_lt_wilson"],
      },
      { id: "leo-tolstoy-moment-2", textKey: "leo-tolstoy.moment.2", sourceIds: ["src_lt_diaries"] },
    ],
    turningPoints: [
      {
        id: "leo-tolstoy-turning-point-1",
        textKey: "leo-tolstoy.turning_point.1",
        interpretationKey: "leo-tolstoy.interpretation.turning_point.1",
        attributeId: "decisiveness",
        sourceIds: ["src_lt_diaries"],
      },
    ],
  },

  "sigmund-freud": {
    achievements: [
      { id: "sigmund-freud-achievement-1", textKey: "sigmund-freud.achievement.1", sourceIds: ["src_sf_gay"] },
      { id: "sigmund-freud-achievement-2", textKey: "sigmund-freud.achievement.2", sourceIds: ["src_sf_fliess"] },
    ],
    moments: [
      {
        id: "sigmund-freud-moment-1",
        textKey: "sigmund-freud.moment.1",
        interpretationKey: "sigmund-freud.interpretation.moment.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_sf_jones"],
      },
      { id: "sigmund-freud-moment-2", textKey: "sigmund-freud.moment.2", sourceIds: ["src_sf_fliess"] },
    ],
    turningPoints: [
      {
        id: "sigmund-freud-turning-point-1",
        textKey: "sigmund-freud.turning_point.1",
        interpretationKey: "sigmund-freud.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_sf_gay"],
      },
    ],
  },

  "pablo-picasso": {
    achievements: [
      { id: "pablo-picasso-achievement-1", textKey: "pablo-picasso.achievement.1", sourceIds: ["src_pp_richardson"] },
      { id: "pablo-picasso-achievement-2", textKey: "pablo-picasso.achievement.2", sourceIds: ["src_pp_richardson"] },
    ],
    moments: [
      {
        id: "pablo-picasso-moment-1",
        textKey: "pablo-picasso.moment.1",
        interpretationKey: "pablo-picasso.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_pp_stein"],
      },
      { id: "pablo-picasso-moment-2", textKey: "pablo-picasso.moment.2", sourceIds: ["src_pp_richardson"] },
    ],
    turningPoints: [
      {
        id: "pablo-picasso-turning-point-1",
        textKey: "pablo-picasso.turning_point.1",
        interpretationKey: "pablo-picasso.interpretation.turning_point.1",
        attributeId: "competitiveness",
        sourceIds: ["src_pp_richardson"],
      },
    ],
  },

  "gertrude-bell": {
    achievements: [
      { id: "gertrude-bell-achievement-1", textKey: "gertrude-bell.achievement.1", sourceIds: ["src_gb_howell"] },
      { id: "gertrude-bell-achievement-2", textKey: "gertrude-bell.achievement.2", sourceIds: ["src_gb_wallach"] },
    ],
    moments: [
      {
        id: "gertrude-bell-moment-1",
        textKey: "gertrude-bell.moment.1",
        interpretationKey: "gertrude-bell.interpretation.moment.1",
        attributeId: "resourcefulness",
        sourceIds: ["src_gb_letters"],
      },
      { id: "gertrude-bell-moment-2", textKey: "gertrude-bell.moment.2", sourceIds: ["src_gb_wallach"] },
    ],
    turningPoints: [
      {
        id: "gertrude-bell-turning-point-1",
        textKey: "gertrude-bell.turning_point.1",
        interpretationKey: "gertrude-bell.interpretation.turning_point.1",
        attributeId: "proactive_agency",
        sourceIds: ["src_gb_letters"],
      },
    ],
  },

  // Roster 15 (coverage-aware intake, 2026-09). Every fact below traces to
  // each person's own candidate rationale (data-pipeline/candidates/<slug>.json,
  // carried into roster15.ts) and their existing sources — no new research
  // performed for editorial content.
  "catherine-the-great": {
    achievements: [
      { id: "catherine-the-great-achievement-1", textKey: "catherine-the-great.achievement.1", sourceIds: ["src_cg_montefiore"] },
      { id: "catherine-the-great-achievement-2", textKey: "catherine-the-great.achievement.2", sourceIds: ["src_cg_massie"] },
    ],
    moments: [
      {
        id: "catherine-the-great-moment-1",
        textKey: "catherine-the-great.moment.1",
        interpretationKey: "catherine-the-great.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_cg_montefiore"],
      },
      { id: "catherine-the-great-moment-2", textKey: "catherine-the-great.moment.2", sourceIds: ["src_cg_massie"] },
    ],
    turningPoints: [
      {
        id: "catherine-the-great-turning-point-1",
        textKey: "catherine-the-great.turning_point.1",
        interpretationKey: "catherine-the-great.interpretation.turning_point.1",
        attributeId: "persistence",
        sourceIds: ["src_cg_memoirs"],
      },
    ],
  },

  "frederick-the-great": {
    achievements: [
      { id: "frederick-the-great-achievement-1", textKey: "frederick-the-great.achievement.1", sourceIds: ["src_fg_voltaire"] },
      { id: "frederick-the-great-achievement-2", textKey: "frederick-the-great.achievement.2", sourceIds: ["src_fg_blanning"] },
    ],
    moments: [
      {
        id: "frederick-the-great-moment-1",
        textKey: "frederick-the-great.moment.1",
        interpretationKey: "frederick-the-great.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_fg_maccdonogh"],
      },
      { id: "frederick-the-great-moment-2", textKey: "frederick-the-great.moment.2", sourceIds: ["src_fg_blanning"] },
    ],
    turningPoints: [
      {
        id: "frederick-the-great-turning-point-1",
        textKey: "frederick-the-great.turning_point.1",
        interpretationKey: "frederick-the-great.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_fg_maccdonogh"],
      },
    ],
  },

  "james-joyce": {
    achievements: [
      { id: "james-joyce-achievement-1", textKey: "james-joyce.achievement.1", sourceIds: ["src_jj_ellmann"] },
      { id: "james-joyce-achievement-2", textKey: "james-joyce.achievement.2", sourceIds: ["src_jj_ellmann"] },
    ],
    moments: [
      {
        id: "james-joyce-moment-1",
        textKey: "james-joyce.moment.1",
        interpretationKey: "james-joyce.interpretation.moment.1",
        attributeId: "perfectionism",
        sourceIds: ["src_jj_ellmann"],
      },
      { id: "james-joyce-moment-2", textKey: "james-joyce.moment.2", sourceIds: ["src_jj_letters"] },
    ],
    turningPoints: [
      {
        id: "james-joyce-turning-point-1",
        textKey: "james-joyce.turning_point.1",
        interpretationKey: "james-joyce.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_jj_pound_weaver"],
      },
    ],
  },

  "marlene-dietrich": {
    achievements: [
      { id: "marlene-dietrich-achievement-1", textKey: "marlene-dietrich.achievement.1", sourceIds: ["src_md_bach"] },
      { id: "marlene-dietrich-achievement-2", textKey: "marlene-dietrich.achievement.2", sourceIds: ["src_md_bach"] },
    ],
    moments: [
      {
        id: "marlene-dietrich-moment-1",
        textKey: "marlene-dietrich.moment.1",
        interpretationKey: "marlene-dietrich.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_md_letters"],
      },
      { id: "marlene-dietrich-moment-2", textKey: "marlene-dietrich.moment.2", sourceIds: ["src_md_bach"] },
    ],
    turningPoints: [
      {
        id: "marlene-dietrich-turning-point-1",
        textKey: "marlene-dietrich.turning_point.1",
        interpretationKey: "marlene-dietrich.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_md_letters"],
      },
    ],
  },

  "maya-angelou": {
    achievements: [
      { id: "maya-angelou-achievement-1", textKey: "maya-angelou.achievement.1", sourceIds: ["src_ma2_lupton"] },
      { id: "maya-angelou-achievement-2", textKey: "maya-angelou.achievement.2", sourceIds: ["src_ma2_gillespie"] },
    ],
    moments: [
      {
        id: "maya-angelou-moment-1",
        textKey: "maya-angelou.moment.1",
        interpretationKey: "maya-angelou.interpretation.moment.1",
        attributeId: "persistence",
        sourceIds: ["src_ma2_caged_bird"],
      },
      { id: "maya-angelou-moment-2", textKey: "maya-angelou.moment.2", sourceIds: ["src_ma2_gillespie"] },
    ],
    turningPoints: [
      {
        id: "maya-angelou-turning-point-1",
        textKey: "maya-angelou.turning_point.1",
        interpretationKey: "maya-angelou.interpretation.turning_point.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_ma2_caged_bird"],
      },
    ],
  },

  "miles-davis": {
    achievements: [
      { id: "miles-davis-achievement-1", textKey: "miles-davis.achievement.1", sourceIds: ["src_md2_szwed"] },
      { id: "miles-davis-achievement-2", textKey: "miles-davis.achievement.2", sourceIds: ["src_md2_szwed"] },
    ],
    moments: [
      {
        id: "miles-davis-moment-1",
        textKey: "miles-davis.moment.1",
        interpretationKey: "miles-davis.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_md2_autobiography"],
      },
      { id: "miles-davis-moment-2", textKey: "miles-davis.moment.2", sourceIds: ["src_md2_szwed"] },
    ],
    turningPoints: [
      {
        id: "miles-davis-turning-point-1",
        textKey: "miles-davis.turning_point.1",
        interpretationKey: "miles-davis.interpretation.turning_point.1",
        attributeId: "collaboration",
        sourceIds: ["src_md2_davis_ex_wife", "src_md2_autobiography"],
      },
    ],
  },

  "nina-simone": {
    achievements: [
      { id: "nina-simone-achievement-1", textKey: "nina-simone.achievement.1", sourceIds: ["src_ns_cohodas"] },
      { id: "nina-simone-achievement-2", textKey: "nina-simone.achievement.2", sourceIds: ["src_ns_cohodas"] },
    ],
    moments: [
      {
        id: "nina-simone-moment-1",
        textKey: "nina-simone.moment.1",
        interpretationKey: "nina-simone.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_ns_memoir"],
      },
      { id: "nina-simone-moment-2", textKey: "nina-simone.moment.2", sourceIds: ["src_ns_cohodas"] },
    ],
    turningPoints: [
      {
        id: "nina-simone-turning-point-1",
        textKey: "nina-simone.turning_point.1",
        interpretationKey: "nina-simone.interpretation.turning_point.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_ns_cohodas"],
      },
    ],
  },

  "ruth-bader-ginsburg": {
    achievements: [
      { id: "ruth-bader-ginsburg-achievement-1", textKey: "ruth-bader-ginsburg.achievement.1", sourceIds: ["src_rbg_hirshman"] },
      { id: "ruth-bader-ginsburg-achievement-2", textKey: "ruth-bader-ginsburg.achievement.2", sourceIds: ["src_rbg_hirshman"] },
    ],
    moments: [
      {
        id: "ruth-bader-ginsburg-moment-1",
        textKey: "ruth-bader-ginsburg.moment.1",
        interpretationKey: "ruth-bader-ginsburg.interpretation.moment.1",
        attributeId: "persistence",
        sourceIds: ["src_rbg_denotorious"],
      },
      { id: "ruth-bader-ginsburg-moment-2", textKey: "ruth-bader-ginsburg.moment.2", sourceIds: ["src_rbg_denotorious"] },
    ],
    turningPoints: [
      {
        id: "ruth-bader-ginsburg-turning-point-1",
        textKey: "ruth-bader-ginsburg.turning_point.1",
        interpretationKey: "ruth-bader-ginsburg.interpretation.turning_point.1",
        attributeId: "analytical_rigor",
        sourceIds: ["src_rbg_hirshman"],
      },
    ],
  },

  "duke-ellington": {
    achievements: [
      { id: "duke-ellington-achievement-1", textKey: "duke-ellington.achievement.1", sourceIds: ["src_de_hasse"] },
      { id: "duke-ellington-achievement-2", textKey: "duke-ellington.achievement.2", sourceIds: ["src_de_hasse"] },
    ],
    moments: [
      { id: "duke-ellington-moment-1", textKey: "duke-ellington.moment.1", sourceIds: ["src_de_hasse"] },
      { id: "duke-ellington-moment-2", textKey: "duke-ellington.moment.2", sourceIds: ["src_de_own_book"] },
    ],
    turningPoints: [
      {
        id: "duke-ellington-turning-point-1",
        textKey: "duke-ellington.turning_point.1",
        interpretationKey: "duke-ellington.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_de_strayhorn_bandmembers"],
      },
    ],
  },

  "martha-graham": {
    achievements: [
      { id: "martha-graham-achievement-1", textKey: "martha-graham.achievement.1", sourceIds: ["src_mg_degooyer"] },
      { id: "martha-graham-achievement-2", textKey: "martha-graham.achievement.2", sourceIds: ["src_mg_degooyer"] },
    ],
    moments: [
      { id: "martha-graham-moment-1", textKey: "martha-graham.moment.1", sourceIds: ["src_mg_degooyer"] },
      { id: "martha-graham-moment-2", textKey: "martha-graham.moment.2", sourceIds: ["src_mg_degooyer"] },
    ],
    turningPoints: [
      {
        id: "martha-graham-turning-point-1",
        textKey: "martha-graham.turning_point.1",
        interpretationKey: "martha-graham.interpretation.turning_point.1",
        attributeId: "collaboration",
        sourceIds: ["src_mg_company_dancers"],
      },
    ],
  },

  "bertrand-russell": {
    achievements: [
      { id: "bertrand-russell-achievement-1", textKey: "bertrand-russell.achievement.1", sourceIds: ["src_br_monk"] },
      { id: "bertrand-russell-achievement-2", textKey: "bertrand-russell.achievement.2", sourceIds: ["src_br_monk"] },
    ],
    moments: [
      { id: "bertrand-russell-moment-1", textKey: "bertrand-russell.moment.1", sourceIds: ["src_br_autobiography", "src_br_monk"] },
      { id: "bertrand-russell-moment-2", textKey: "bertrand-russell.moment.2", sourceIds: ["src_br_monk"] },
    ],
    turningPoints: [
      {
        id: "bertrand-russell-turning-point-1",
        textKey: "bertrand-russell.turning_point.1",
        interpretationKey: "bertrand-russell.interpretation.turning_point.1",
        attributeId: "collaboration",
        sourceIds: ["src_br_wives"],
      },
    ],
  },

  "charles-dickens": {
    achievements: [
      { id: "charles-dickens-achievement-1", textKey: "charles-dickens.achievement.1", sourceIds: ["src_cd_tomalin"] },
      { id: "charles-dickens-achievement-2", textKey: "charles-dickens.achievement.2", sourceIds: ["src_cd_wife_and_staff"] },
    ],
    moments: [
      { id: "charles-dickens-moment-1", textKey: "charles-dickens.moment.1", sourceIds: ["src_cd_tomalin"] },
      { id: "charles-dickens-moment-2", textKey: "charles-dickens.moment.2", sourceIds: ["src_cd_letters"] },
    ],
    turningPoints: [
      {
        id: "charles-dickens-turning-point-1",
        textKey: "charles-dickens.turning_point.1",
        interpretationKey: "charles-dickens.interpretation.turning_point.1",
        attributeId: "collaboration",
        sourceIds: ["src_cd_wife_and_staff"],
      },
    ],
  },

  "george-orwell": {
    achievements: [
      { id: "george-orwell-achievement-1", textKey: "george-orwell.achievement.1", sourceIds: ["src_go_taylor"] },
      { id: "george-orwell-achievement-2", textKey: "george-orwell.achievement.2", sourceIds: ["src_go_orwell_diaries"] },
    ],
    moments: [
      {
        id: "george-orwell-moment-1",
        textKey: "george-orwell.moment.1",
        interpretationKey: "george-orwell.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_go_ilp_comrades"],
      },
      { id: "george-orwell-moment-2", textKey: "george-orwell.moment.2", sourceIds: ["src_go_taylor"] },
    ],
    turningPoints: [
      {
        id: "george-orwell-turning-point-1",
        textKey: "george-orwell.turning_point.1",
        interpretationKey: "george-orwell.interpretation.turning_point.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_go_taylor"],
      },
    ],
  },

  "t-e-lawrence": {
    achievements: [
      { id: "t-e-lawrence-achievement-1", textKey: "t-e-lawrence.achievement.1", sourceIds: ["src_tel_wilson"] },
      { id: "t-e-lawrence-achievement-2", textKey: "t-e-lawrence.achievement.2", sourceIds: ["src_tel_wilson"] },
    ],
    moments: [
      {
        id: "t-e-lawrence-moment-1",
        textKey: "t-e-lawrence.moment.1",
        interpretationKey: "t-e-lawrence.interpretation.moment.1",
        attributeId: "risk_tolerance",
        sourceIds: ["src_tel_seven_pillars"],
      },
      { id: "t-e-lawrence-moment-2", textKey: "t-e-lawrence.moment.2", sourceIds: ["src_tel_wilson"] },
    ],
    turningPoints: [
      {
        id: "t-e-lawrence-turning-point-1",
        textKey: "t-e-lawrence.turning_point.1",
        interpretationKey: "t-e-lawrence.interpretation.turning_point.1",
        attributeId: "achievement_drive",
        sourceIds: ["src_tel_wilson"],
      },
    ],
  },

  "elizabeth-cady-stanton": {
    achievements: [
      { id: "elizabeth-cady-stanton-achievement-1", textKey: "elizabeth-cady-stanton.achievement.1", sourceIds: ["src_ecs_griffith"] },
      { id: "elizabeth-cady-stanton-achievement-2", textKey: "elizabeth-cady-stanton.achievement.2", sourceIds: ["src_ecs_letters"] },
    ],
    moments: [
      {
        id: "elizabeth-cady-stanton-moment-1",
        textKey: "elizabeth-cady-stanton.moment.1",
        interpretationKey: "elizabeth-cady-stanton.interpretation.moment.1",
        attributeId: "independent_thinking",
        sourceIds: ["src_ecs_griffith"],
      },
      { id: "elizabeth-cady-stanton-moment-2", textKey: "elizabeth-cady-stanton.moment.2", sourceIds: ["src_ecs_griffith"] },
    ],
    turningPoints: [
      {
        id: "elizabeth-cady-stanton-turning-point-1",
        textKey: "elizabeth-cady-stanton.turning_point.1",
        interpretationKey: "elizabeth-cady-stanton.interpretation.turning_point.1",
        attributeId: "conflict_tolerance",
        sourceIds: ["src_ecs_griffith"],
      },
    ],
  },

  "john-d-rockefeller": {
    achievements: [
      { id: "john-d-rockefeller-achievement-1", textKey: "john-d-rockefeller.achievement.1", sourceIds: ["src_jdr_chernow"] },
      { id: "john-d-rockefeller-achievement-2", textKey: "john-d-rockefeller.achievement.2", sourceIds: ["src_jdr_chernow"] },
    ],
    moments: [
      {
        id: "john-d-rockefeller-moment-1",
        textKey: "john-d-rockefeller.moment.1",
        interpretationKey: "john-d-rockefeller.interpretation.moment.1",
        attributeId: "decisiveness",
        sourceIds: ["src_jdr_business_rivals", "src_jdr_chernow"],
      },
      { id: "john-d-rockefeller-moment-2", textKey: "john-d-rockefeller.moment.2", sourceIds: ["src_jdr_chernow"] },
    ],
    turningPoints: [
      {
        id: "john-d-rockefeller-turning-point-1",
        textKey: "john-d-rockefeller.turning_point.1",
        interpretationKey: "john-d-rockefeller.interpretation.turning_point.1",
        attributeId: "competitiveness",
        sourceIds: ["src_jdr_business_rivals"],
      },
    ],
  },

  "bette-davis": {
    achievements: [
      { id: "bette-davis-achievement-1", textKey: "bette-davis.achievement.1", sourceIds: ["src_bd_spada"] },
      { id: "bette-davis-achievement-2", textKey: "bette-davis.achievement.2", sourceIds: ["src_bd_spada"] },
    ],
    moments: [
      {
        id: "bette-davis-moment-1",
        textKey: "bette-davis.moment.1",
        interpretationKey: "bette-davis.interpretation.moment.1",
        attributeId: "autonomy_need",
        sourceIds: ["src_bd_spada"],
      },
      { id: "bette-davis-moment-2", textKey: "bette-davis.moment.2", sourceIds: ["src_bd_spada"] },
    ],
    turningPoints: [
      {
        id: "bette-davis-turning-point-1",
        textKey: "bette-davis.turning_point.1",
        interpretationKey: "bette-davis.interpretation.turning_point.1",
        attributeId: "collaboration",
        sourceIds: ["src_bd_crawford_side"],
      },
    ],
  },

  "john-von-neumann": {
    achievements: [
      { id: "john-von-neumann-achievement-1", textKey: "john-von-neumann.achievement.1", sourceIds: ["src_jvn_wikipedia"] },
      { id: "john-von-neumann-achievement-2", textKey: "john-von-neumann.achievement.2", sourceIds: ["src_jvn_wikipedia"] },
    ],
    moments: [
      {
        id: "john-von-neumann-moment-1",
        textKey: "john-von-neumann.moment.1",
        interpretationKey: "john-von-neumann.interpretation.moment.1",
        attributeId: "execution_speed",
        sourceIds: ["src_jvn_wikipedia"],
      },
      { id: "john-von-neumann-moment-2", textKey: "john-von-neumann.moment.2", sourceIds: ["src_jvn_ulam"] },
    ],
    turningPoints: [
      {
        id: "john-von-neumann-turning-point-1",
        textKey: "john-von-neumann.turning_point.1",
        interpretationKey: "john-von-neumann.interpretation.turning_point.1",
        attributeId: "ambiguity_tolerance",
        sourceIds: ["src_jvn_wikipedia"],
      },
    ],
  },
};
