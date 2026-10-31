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

export type ReviewDisposition = "same_person" | "different_person" | "uncertain";

export interface GateSummary {
  slug: string;
  hardMatches: IdentityMatch[];
  reviewMatches: IdentityMatch[];
  /** duplicate: hard match; needs_adjudication: review match with no recorded disposition;
   *  rejected_same_person / retained / blocked_uncertain follow a recorded review disposition;
   *  clean: no match at all. */
  disposition: "clean" | "duplicate" | "needs_adjudication" | "rejected_same_person" | "retained" | "blocked_uncertain";
  reason?: string;
}

export function summarize(
  production: readonly ProductionLike[],
  probe: IdentityProbe,
  dispositions: Record<string, { decision: ReviewDisposition; reason: string }> = {},
): GateSummary {
  const all = findProductionMatches(production, probe);
  const hardMatches = all.filter((m) => m.tier !== "review");
  const reviewMatches = all.filter((m) => m.tier === "review");
  if (hardMatches.length) return { slug: probe.slug, hardMatches, reviewMatches, disposition: "duplicate" };
  if (!reviewMatches.length) return { slug: probe.slug, hardMatches, reviewMatches, disposition: "clean" };
  const d = dispositions[probe.slug];
  if (!d) return { slug: probe.slug, hardMatches, reviewMatches, disposition: "needs_adjudication" };
  const disposition = d.decision === "same_person" ? "rejected_same_person" : d.decision === "different_person" ? "retained" : "blocked_uncertain";
  return { slug: probe.slug, hardMatches, reviewMatches, disposition, reason: d.reason };
}

// Usage: tsx identityGate.ts <proposed.json> [--json] [--dispositions <file.json>]
if (process.argv[1] && /identityGate\.(ts|js)$/.test(process.argv[1]) && process.argv[2]) {
  const probes = JSON.parse(readFileSync(process.argv[2], "utf8")) as IdentityProbe[];
  const dIdx = process.argv.indexOf("--dispositions");
  const dispositions = dIdx > 0 ? (JSON.parse(readFileSync(process.argv[dIdx + 1]!, "utf8")) as Record<string, { decision: ReviewDisposition; reason: string }>) : {};
  const prod = SEED_PEOPLE as unknown as ProductionLike[];
  const summaries = probes.map((probe) => summarize(prod, probe, dispositions));
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(summaries, null, 1));
  } else {
    for (const s of summaries) {
      const m = [...s.hardMatches, ...s.reviewMatches];
      console.log(`${s.disposition.padEnd(20)} ${s.slug}${m.length ? " :: " + m.map((x) => `${x.tier}->${x.productionSlug} (${x.evidence})`).join("; ") : ""}${s.reason ? " | " + s.reason : ""}`);
    }
    const count = (d: GateSummary["disposition"]) => summaries.filter((s) => s.disposition === d).length;
    console.log(`probes ${summaries.length}, hard duplicates ${count("duplicate")}, needing adjudication ${count("needs_adjudication")}, rejected same-person ${count("rejected_same_person")}, blocked uncertain ${count("blocked_uncertain")}`);
  }
}
