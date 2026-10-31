/**
 * Fresh-roster identity gate (introduced in Roster59 after Roster58 found five
 * "fresh" candidates already in production as legacy entries with empty
 * Wikidata IDs). QID-only duplicate detection is insufficient, so a proposed
 * person is compared against EVERY production person by:
 *   1. exact slug
 *   2. normalized canonical name / alias equality (diacritics, case, punctuation
 *      and honorifics ignored)
 *   3. order-insensitive token-set equality (name-order and transliteration-order
 *      variants)
 *   4. Wikidata QID, when the production person has one
 *   5. a "review" tier: same surname token and a shared given-name prefix
 * Tiers 1-4 are hard matches (the candidate is NOT fresh); tier 5 needs a human
 * look (father/son, namesakes such as Ratan Tata vs J. R. D. Tata).
 *
 * Usage: tsx src/dev/roster1000/identityGate.ts <proposed.json>
 * where the file is [{ "slug": "...", "names": ["Name", "Alias"], "qid": "Q..." }].
 */
import { readFileSync } from "node:fs";
import { SEED_PEOPLE } from "../../data/people/seed.js";

export interface IdentityProbe {
  slug: string;
  names: string[];
  qid?: string | undefined;
}

export interface IdentityMatch {
  tier: "slug" | "name" | "token-set" | "qid" | "review";
  productionId: string;
  productionSlug: string;
  evidence: string;
}

interface ProductionLike {
  id: string;
  slug: string;
  canonicalName: string;
  aliases?: readonly string[];
  externalIdentity?: { wikidataId?: string };
}

const HONORIFICS = new Set(["saint", "st", "sir", "dr", "prof", "professor", "sri", "shri", "lord", "lady", "the", "al", "el", "de", "van", "von", "bin", "ibn", "of"]);

export function normalizeName(raw: string): string {
  return raw
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t && !HONORIFICS.has(t))
    .join(" ");
}

function tokenKey(raw: string): string {
  return normalizeName(raw).split(" ").sort().join(" ");
}

export function findProductionMatches(production: readonly ProductionLike[], probe: IdentityProbe): IdentityMatch[] {
  const out: IdentityMatch[] = [];
  const probeNames = probe.names.filter(Boolean);
  const probeNorm = new Set(probeNames.map(normalizeName));
  const probeTokens = new Set(probeNames.map(tokenKey));
  for (const p of production) {
    const prodNames = [p.canonicalName, ...(p.aliases ?? [])];
    if (p.slug === probe.slug) out.push({ tier: "slug", productionId: p.id, productionSlug: p.slug, evidence: `slug ${p.slug}` });
    if (probe.qid && p.externalIdentity?.wikidataId === probe.qid) out.push({ tier: "qid", productionId: p.id, productionSlug: p.slug, evidence: probe.qid });
    let hard = false;
    for (const n of prodNames) {
      if (probeNorm.has(normalizeName(n))) {
        out.push({ tier: "name", productionId: p.id, productionSlug: p.slug, evidence: `"${n}"` });
        hard = true;
        break;
      }
    }
    if (hard) continue;
    for (const n of prodNames) {
      if (probeTokens.has(tokenKey(n))) {
        out.push({ tier: "token-set", productionId: p.id, productionSlug: p.slug, evidence: `"${n}"` });
        hard = true;
        break;
      }
    }
    if (hard) continue;
    const prodSurnames = new Set(prodNames.map((n) => normalizeName(n).split(" ").pop() ?? ""));
    for (const n of probeNames) {
      const toks = normalizeName(n).split(" ");
      const sur = toks[toks.length - 1] ?? "";
      const given = toks[0] ?? "";
      if (sur.length >= 3 && prodSurnames.has(sur)) {
        const prodGiven = prodNames.map((x) => normalizeName(x).split(" ")[0] ?? "");
        if (prodGiven.some((g) => g.slice(0, 3) === given.slice(0, 3) || g[0] === given[0])) {
          out.push({ tier: "review", productionId: p.id, productionSlug: p.slug, evidence: `surname "${sur}" with similar given name vs "${p.canonicalName}"` });
          break;
        }
      }
    }
  }
  return out;
}

if (process.argv[1] && /identityGate\.(ts|js)$/.test(process.argv[1]) && process.argv[2]) {
  const probes = JSON.parse(readFileSync(process.argv[2], "utf8")) as IdentityProbe[];
  const prod = SEED_PEOPLE as unknown as ProductionLike[];
  let hard = 0;
  for (const probe of probes) {
    const m = findProductionMatches(prod, probe);
    const h = m.filter((x) => x.tier !== "review");
    if (h.length) hard++;
    console.log(`${h.length ? "DUPLICATE" : m.length ? "review   " : "clean    "} ${probe.slug}${m.length ? " :: " + m.map((x) => `${x.tier}->${x.productionSlug} (${x.evidence})`).join("; ") : ""}`);
  }
  console.log(`probes ${probes.length}, hard duplicates ${hard}`);
}
