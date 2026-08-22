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

  "mustafa-kemal-ataturk": {
    achievements: [
      { id: "mustafa-kemal-ataturk-achievement-1", textKey: "mustafa-kemal-ataturk.achievement.1", sourceIds: ["src_ataturk_kinross", "src_ataturk_belleten_libya"] },
      { id: "mustafa-kemal-ataturk-achievement-2", textKey: "mustafa-kemal-ataturk.achievement.2", sourceIds: ["src_ataturk_mango", "src_ataturk_nutuk"] },
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

  "julius-caesar": {
    achievements: [
      { id: "julius-caesar-achievement-1", textKey: "julius-caesar.achievement.1", sourceIds: ["src_caesar_suetonius", "src_caesar_plutarch"] },
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
};
