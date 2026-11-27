/**
 * ROSTER 70 generator (created by wireRoster.ts). Rendering and the fail-closed promotion checks live in
 * `rosterGeneratorCore.ts`; this file supplies only the literal shipped-slug allowlist (held candidates are
 * deliberately absent) and the header text.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster70.ts
 */
import { generateRosterModule } from "./rosterGeneratorCore.js";

const ROSTER_70_SLUGS = [
  "abraham-ortelius",
  "amerigo-vespucci",
  "annie-besant",
  "austen-henry-layard",
  "cesar-pelli",
  "claudio-monteverdi",
  "david-unaipon",
  "florence-r-sabin",
  "ignacy-lukasiewicz",
  "juan-luna",
  "kang-youwei",
  "kazi-nazrul-islam",
  "kim-jeong-hui",
  "laura-bassi",
  "luis-de-camoes",
  "mary-slessor",
  "max-theiler",
  "nazim-hikmet",
  "niijima-jo",
  "pedro-alvares-cabral",
  "phan-chau-trinh",
  "qian-xuesen",
  "roberto-burle-marx",
  "rong-hong",
  "satoshi-omura",
  "uchimura-kanzo",
  "yoichiro-nambu",
  "yoshida-shoin",
];

generateRosterModule({
  roster: 70,
  slugs: ROSTER_70_SLUGS,
  intro: "fresh new-candidate cycle",
});
