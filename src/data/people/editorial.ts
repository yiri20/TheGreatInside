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
      { id: "ada-lovelace-achievement-2", textKey: "ada-lovelace.achievement.2", sourceIds: ["src_lovelace_biography"] },
    ],
    moments: [
      {
        id: "ada-lovelace-moment-1",
        textKey: "ada-lovelace.moment.1",
        interpretationKey: "ada-lovelace.interpretation.moment.1",
        attributeId: "opportunity_sensing",
        sourceIds: ["src_lovelace_wikipedia"],
      },
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
};
