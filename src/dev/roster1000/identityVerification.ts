/**
 * Pure identity-matching logic for the roster-1000 candidate pipeline,
 * separated from any network call so it can be unit-tested deterministically
 * (see identityVerification.test.ts) without making the production test
 * suite depend on live internet access.
 *
 * Built after a real incident (roster-1000 session 12,
 * docs/roster-1000-checkpoint.md §78): 14 of 16 candidate Wikidata QIDs
 * were written from memory/pattern-generation and were completely wrong,
 * some resolving to entirely unrelated entities (a town, a plant species,
 * a sitting politician, a record label, a calendar year). A duplicate-QID
 * check alone would not have caught most of these, since the wrong QIDs
 * were not duplicates of each other -- they needed to be checked against
 * the actual entity the QID points to.
 */

export interface WikidataEntitySummary {
  qid: string;
  label: string | undefined;
  description: string | undefined;
  aliases: string[];
}

export interface IdentityCheckResult {
  slug: string;
  qid: string;
  candidateName: string;
  entityLabel: string | undefined;
  entityDescription: string | undefined;
  verdict: "match" | "mismatch" | "fetch_failed";
  reason: string;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string): Set<string> {
  return new Set(normalize(s).split(" ").filter((t) => t.length > 1));
}

/**
 * Conservative, deliberately simple overlap heuristic: the candidate's
 * name and the Wikidata label/aliases must share enough distinctive
 * tokens to plausibly be the same person. This is intentionally NOT a
 * fuzzy-match ML model -- a coarse, explainable check is enough to catch
 * the session-12 failure mode (completely unrelated entities), and a
 * human still makes the final call on any FLAGGED result.
 */
export function namesLikelyMatch(candidateName: string, entity: WikidataEntitySummary): boolean {
  const candidateTokens = tokens(candidateName);
  if (candidateTokens.size === 0) return false;

  const candidates = [entity.label, ...entity.aliases].filter((s): s is string => Boolean(s));
  for (const name of candidates) {
    const entityTokens = tokens(name);
    if (entityTokens.size === 0) continue;
    const overlap = [...candidateTokens].filter((t) => entityTokens.has(t));
    // require at least one shared distinctive token, and require it to
    // cover a meaningful share of the SHORTER name's tokens (guards
    // against a single common word like "al" or "de" counting as a match)
    const shorterSize = Math.min(candidateTokens.size, entityTokens.size);
    if (overlap.length > 0 && overlap.length / shorterSize >= 0.5) return true;
  }
  return false;
}

export function checkIdentity(
  slug: string,
  candidateName: string,
  qid: string,
  entity: WikidataEntitySummary | undefined,
): IdentityCheckResult {
  if (!entity) {
    return {
      slug,
      qid,
      candidateName,
      entityLabel: undefined,
      entityDescription: undefined,
      verdict: "fetch_failed",
      reason: `Could not fetch or parse Wikidata entity ${qid}.`,
    };
  }
  const match = namesLikelyMatch(candidateName, entity);
  return {
    slug,
    qid,
    candidateName,
    entityLabel: entity.label,
    entityDescription: entity.description,
    verdict: match ? "match" : "mismatch",
    reason: match
      ? `"${candidateName}" plausibly matches Wikidata label "${entity.label}".`
      : `"${candidateName}" does NOT plausibly match Wikidata label "${entity.label}" (${entity.description ?? "no description"}) -- likely a wrong/fabricated QID.`,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Live network call -- kept separate from the pure logic above so tests
 * never need internet. Retries a small, bounded number of times with a
 * delay: Wikidata's public endpoint throttles rapid sequential requests,
 * and a bare single-attempt fetch produced a large number of spurious
 * "fetch failed" results when checking the full ~138-file corpus in one
 * run (confirmed by re-checking several of those slugs individually,
 * where they succeeded on retry).
 */
export async function fetchWikidataEntity(
  qid: string,
  options: { retries?: number; delayMs?: number } = {},
): Promise<WikidataEntitySummary | undefined> {
  const retries = options.retries ?? 2;
  const delayMs = options.delayMs ?? 400;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(delayMs * attempt);
    try {
      const res = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`, {
        headers: { "User-Agent": "TheGreatInside-roster1000-identity-preflight/1.0" },
      });
      if (!res.ok) continue;
      const data = (await res.json()) as {
        entities?: Record<
          string,
          {
            labels?: Record<string, { value: string }>;
            descriptions?: Record<string, { value: string }>;
            aliases?: Record<string, { value: string }[]>;
            sitelinks?: Record<string, { title: string }>;
          }
        >;
      };
      const entity = data.entities?.[qid];
      if (!entity) continue;
      // some real, live entities (confirmed: Q1035 Charles Darwin, Q5878
      // Gabriel García Márquez) have no "en" label set directly despite
      // being well-established, unambiguous entries -- fall back to the
      // English Wikipedia sitelink title, which is reliably present for
      // any subject with an English Wikipedia article.
      const label = entity.labels?.en?.value ?? entity.sitelinks?.enwiki?.title;
      const description = entity.descriptions?.en?.value;
      const aliases = (entity.aliases?.en ?? []).map((a) => a.value);
      return { qid, label, description, aliases };
    } catch {
      continue;
    }
  }
  return undefined;
}
