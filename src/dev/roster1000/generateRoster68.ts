/**
 * ROSTER 68 generator (created by wireRoster.ts). Rendering and the fail-closed promotion checks live in
 * `rosterGeneratorCore.ts`; this file supplies only the literal shipped-slug allowlist (held candidates are
 * deliberately absent) and the header text.
 *
 * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster68.ts
 */
import { generateRosterModule } from "./rosterGeneratorCore.js";

const ROSTER_68_SLUGS = [
  "abai-kunanbayev",
  "auguste-piccard",
  "bai-juyi",
  "balkrishna-doshi",
  "fanny-bullock-workman",
  "hormuzd-rassam",
  "john-a-roebling",
  "joseph-paxton",
  "josephine-butler",
  "kikunae-ikeda",
  "komitas",
  "konstantin-tsiolkovsky",
  "lazzaro-spallanzani",
  "mansa-musa",
  "marianne-north",
  "niccolo-paganini",
  "nikos-kazantzakis",
  "octave-chanute",
  "robert-owen",
  "rudolf-virchow",
  "sarojini-naidu",
  "simone-veil",
  "sol-plaatje",
  "sugita-genpaku",
  "vikram-sarabhai",
  "williamina-fleming",
  "wis-awa-szymborska",
  "yosa-buson",
];

generateRosterModule({
  roster: 68,
  slugs: ROSTER_68_SLUGS,
  intro: "first fresh new-candidate cycle on the checked-in wiring workflow (two-stage portrait preflight)",
});
