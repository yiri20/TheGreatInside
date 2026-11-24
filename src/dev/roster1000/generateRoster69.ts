/**
 * ROSTER 69 generator (created by wireRoster.ts). Rendering and the fail-closed promotion checks live in
 * `rosterGeneratorCore.ts`; this file supplies only the literal shipped-slug allowlist (held candidates are
 * deliberately absent) and the header text.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster69.ts
 */
import { generateRosterModule } from "./rosterGeneratorCore.js";

const ROSTER_69_SLUGS = [
  "anagarika-dharmapala",
  "andrea-palladio",
  "angelica-kauffman",
  "berthe-morisot",
  "charles-sturt",
  "ethel-smyth",
  "evangelista-torricelli",
  "gian-lorenzo-bernini",
  "harriet-chalmers-adams",
  "henri-becquerel",
  "hermann-weyl",
  "jean-francois-de-la-perouse",
  "kate-sheppard",
  "langston-hughes",
  "maria-gaetana-agnesi",
  "marie-anne-paulze-lavoisier",
  "mary-church-terrell",
  "matteo-ricci",
  "menelik-ii",
  "mirza-taqi-khan-amir-kabir",
  "nellie-melba",
  "ole-r-mer",
  "qiu-jin",
  "sofonisba-anguissola",
  "sophia-jex-blake",
  "zitkala-sa",
];

generateRosterModule({
  roster: 69,
  slugs: ROSTER_69_SLUGS,
  intro: "second fresh new-candidate cycle on the checked-in wiring workflow (backlog-first pool, holder-terms-verified Stage B)",
});
