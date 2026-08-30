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
  },

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
  // project later meanings backward onto her own intentions. Targeted
  // research this session (existing preserved evidence -- Wikipedia +
  // Herrera's biography -- had nothing about the posthumous reception
  // itself): the 1982 Whitechapel Gallery retrospective, corroborated by
  // co-curator Peter Wollen's own account in New Left Review (direct
  // fetch); the 2025 auction record, corroborated by Smithsonian Magazine
  // (direct fetch) -- stated here as the highest price reported, without
  // the inflation-adjusted O'Keeffe comparison the same source itself
  // raises, since that nuance doesn't change the plain claim being made
  // (posthumous market value, not a precise historical ranking). Two new
  // dedicated sources added to this person's own `sources` array
  // (src_kahlo_nlr, src_kahlo_auction2025) per the provenance rule; the
  // 1983 biography's own role in the revival, and the 2002 film it
  // inspired, reuse the two sources already on this person's record.
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
    legacy: {
      textKey: "frida-kahlo.legacy",
      sourceIds: ["src_kahlo_wikipedia", "src_kahlo_biography", "src_kahlo_nlr", "src_kahlo_auction2025"],
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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

  // Profile Quality Normalization Batch B (2026-08): added legacy for
  // minimal biographical closure -- this profile previously had no
  // mention of his death at all. Handled carefully per this task's
  // explicit instructions: no diagnosis, no presenting either the
  // traditional self-inflicted account or the Naifeh/Smith alternative as
  // certain, no turning this into a personality explanation, and no
  // Turning Point (there's no subsequent trajectory). The
  // already-preserved src_vangogh_naifeh source is exactly the disputing
  // account the audit finding referred to -- Naifeh and Smith's 2011
  // biography argued he was shot accidentally by two local teenagers, not
  // self-inflicted. Targeted research this session confirmed the current
  // weight of evidence precisely, so as not to overstate the dispute in
  // either direction: the Van Gogh Museum's own official account (direct
  // fetch) still describes his death as self-inflicted and quotes his own
  // words to police; museum researchers published a formal rebuttal of
  // the Naifeh/Smith theory in the Burlington Magazine (2013); and most
  // mainstream scholarship has not accepted the alternative theory. The
  // text below reflects that asymmetry -- it does not present the two
  // accounts as equally weighted, only notes that not every source this
  // profile draws on agrees. Two new dedicated sources added to this
  // person's own `sources` array (src_vangogh_museum_death,
  // src_vangogh_death_wiki) per the provenance rule.
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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

  // Profile Quality Normalization Batch B (2026-08): added achievement.2 and
  // legacy. The audit flagged the MacArthur Fellowship as a possible gap;
  // per this batch's explicit instruction, the award is used only as
  // evidence for a larger claim (her body of work's standing in the
  // genre), never as the achievement itself -- achievement.2 leads with
  // her Hugo/Nebula wins for specific named works and the MacArthur
  // Foundation's own citation language about her body of work, not "she
  // won an award." Targeted research this session (existing preserved
  // evidence had nothing on the MacArthur Fellowship, NASA naming, or her
  // posthumous reception at all): MacArthur Foundation's own class-of-1995
  // citation page (direct fetch), Smithsonian Magazine's retrospective
  // profile (direct fetch, corrects an initial over-claim -- it explicitly
  // does NOT call her "Mother of Afrofuturism," only "situated in the
  // vanguard of Afrofuturism," so that's the wording used here), NASA's
  // own Octavia E. Butler Landing page, and her own Wikipedia page
  // (direct fetch, cross-checked against the Smithsonian piece for the
  // Hugo/Nebula count -- both independently agree on two Hugos/two
  // Nebulas). Three new dedicated sources added to this person's own
  // `sources` array (src_butler_macfound, src_butler_nasa,
  // src_butler_smithsonian) per the provenance rule -- a generic existing
  // URL was not enough for these specific new claims.
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
  },

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
};
