/**
 * ROSTER 67 -- thirty-second fresh new-candidate cycle after the recent-cohort
 * publication-vs-matching architecture diagnostic (CONTINUE_EXPANSION_AS_IS
 * classification). Continues the roster24-46 new-candidate lane and is the
 * twenty-sixth cycle run under the Major Achievement Selection Standard.
 *
 * People promoted here were all freshly researched this cycle and are all
 * evidence_approved (27 of the 30 frozen; held: see docs/checkpoints/roster67.md); zero
 * backlog reuse -- see docs/checkpoints/roster67.md.
 *
 * Same architecture as `generateRoster42.ts`:
 * - explicit literal slug allowlist (below), never a blanket filter;
 * - loads candidates regardless of whether status is `evidence_approved`
 *   or `qa_passed`;
 * - calls `preparePersonSeedForPromotion(candidate)`, NOT `toPersonSeed()`
 *   directly, and never checks `computedEligibility.eligible`;
 * - lets `build()` compute `isMatchEligible` untouched.
 *
 * Rendering and the fail-closed promotion checks live in `rosterGeneratorCore.ts` (shared by every roster);
 * this file supplies only the literal shipped-slug allowlist and the header text.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster67.ts
 */
import { generateRosterModule } from "./rosterGeneratorCore.js";

// Explicit literal allowlist -- the Roster67 promotions, all freshly
// researched this cycle (held candidates are deliberately absent).
const ROSTER_67_SLUGS = [
  "abanindranath-tagore",
  "akutagawa-ryunosuke",
  "aurel-stein",
  "carlos-gardel",
  "dayananda-saraswati",
  "ellen-key",
  "ernst-mach",
  "hantaro-nagaoka",
  "hubert-wilkins",
  "isaac-singer",
  "katherine-mansfield",
  "lesya-ukrainka",
  "maria-orosa",
  "mary-cassatt",
  "max-weber",
  "nishi-amane",
  "otto-sverdrup",
  "ronald-ross",
  "rosalia-de-castro",
  "shirase-nobu",
  "shokan-walikhanov",
  "tan-kah-kee",
  "tiyo-soga",
  "truong-vinh-ky",
  "waldemar-haffkine",
  "walter-reed",
  "wilhelm-steinitz",
];

generateRosterModule({
  roster: 67,
  slugs: ROSTER_67_SLUGS,
  intro: "thirty-second fresh new-candidate cycle after the recent-cohort\n * publication-vs-matching architecture diagnostic",
});
