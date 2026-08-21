/**
 * Editorial coverage audit — mechanical inventory of how much reusable
 * biographical evidence already exists per person, BEFORE any editorial
 * content is authored. Read-only: never writes to any data file.
 *
 * Three evidence tiers, richest to thinnest:
 *   A — full evidence ledger (src/dev/roster1000/production/{session}/
 *       {slug}/evidenceLedger.json): discrete, source-cited, narrative
 *       episodes.
 *   B — committed candidate JSON (data-pipeline/candidates/<slug>.json,
 *       status qa_passed): per-trait `rationale` prose citing concrete
 *       episodes, plus a real `sources` array with URLs.
 *   C — inline `//` rationale comments in the roster TS file the person is
 *       authored in (seed.ts/roster2.ts have no separate JSON at all;
 *       roster3-10 also have this AND a tier-B JSON, so C is a floor, not
 *       an alternative, for those).
 *
 * Run: corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { SEED_PEOPLE } from "../data/people/seed.js";

const ROOT = process.cwd();
const CANDIDATES_DIR = join(ROOT, "data-pipeline/candidates");
const PRODUCTION_DIR = join(ROOT, "src/dev/roster1000/production");
const ROSTER_FILES = [
  "seed.ts",
  "roster2.ts",
  "roster3.ts",
  "roster4.ts",
  "roster5.ts",
  "roster6.ts",
  "roster7.ts",
  "roster8.ts",
  "roster9.ts",
  "roster10.ts",
].map((f) => join(ROOT, "src/data/people", f));

// slug -> evidenceLedger.json path, if any (scan every session dir once)
const ledgerBySlug = new Map<string, string>();
if (existsSync(PRODUCTION_DIR)) {
  for (const session of readdirSync(PRODUCTION_DIR)) {
    const sessionDir = join(PRODUCTION_DIR, session);
    if (!existsSync(join(sessionDir))) continue;
    let entries: string[] = [];
    try {
      entries = readdirSync(sessionDir);
    } catch {
      continue;
    }
    for (const slug of entries) {
      const p = join(sessionDir, slug, "evidenceLedger.json");
      if (existsSync(p)) ledgerBySlug.set(slug, p);
    }
  }
}

// Parse each roster file into per-person text blocks (from one `id: "p_...` to the next).
interface RosterBlock {
  file: string;
  id: string;
  slug: string;
  text: string;
}
const blocksById = new Map<string, RosterBlock>();
for (const file of ROSTER_FILES) {
  const src = readFileSync(file, "utf8");
  // Find every top-level person record start.
  const idRe = /^\s{2,4}id:\s*"([^"]+)",/gm;
  const starts: { idx: number; id: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = idRe.exec(src))) starts.push({ idx: m.index, id: m[1] ?? "" });
  for (let i = 0; i < starts.length; i++) {
    const cur = starts[i];
    if (!cur) continue;
    const end = i + 1 < starts.length ? (starts[i + 1]?.idx ?? src.length) : src.length;
    const text = src.slice(cur.idx, end);
    const slugMatch = text.match(/slug:\s*"([^"]+)"/);
    if (!slugMatch || !slugMatch[1]) continue;
    blocksById.set(cur.id, { file, id: cur.id, slug: slugMatch[1], text });
  }
}

function countWords(s: string): number {
  return s.trim().length === 0 ? 0 : s.trim().split(/\s+/).length;
}

function commentWordsAndCount(block: string): { words: number; comments: number } {
  const lines = block.split("\n").filter((l) => /^\s*\/\//.test(l));
  const words = lines.reduce((sum, l) => sum + countWords(l.replace(/^\s*\/\/\s?/, "")), 0);
  // Approximate distinct comment "blocks" (an episode/rationale unit) by
  // counting maximal runs of consecutive comment lines.
  let blocks = 0;
  let inRun = false;
  for (const line of block.split("\n")) {
    const isComment = /^\s*\/\//.test(line);
    if (isComment && !inRun) {
      blocks++;
      inRun = true;
    } else if (!isComment) {
      inRun = false;
    }
  }
  return { words, comments: blocks };
}

interface CandidateJson {
  status?: string;
  rows?: Record<string, { rationale?: string }>;
  sources?: { url?: string }[];
}

interface PersonReport {
  slug: string;
  id: string;
  name: string;
  rosterFile: string;
  tier: "A" | "B" | "C";
  episodeCount: number; // proxy for distinct achievement/anecdote/turning-point candidates
  wordCount: number;
  sourcesWithUrls: number;
  sourcesTotal: number;
  bucket: "Rich" | "Adequate" | "Thin";
}

const reports: PersonReport[] = [];

for (const person of SEED_PEOPLE) {
  const block = blocksById.get(person.id);
  const rosterFile = block ? block.file.split(/[\\/]/).pop()! : "unknown";

  let tier: "A" | "B" | "C" = "C";
  let episodeCount = 0;
  let wordCount = 0;
  let sourcesWithUrls = 0;
  let sourcesTotal = person.sources.length;

  const ledgerPath = ledgerBySlug.get(person.slug);
  const candidatePath = join(CANDIDATES_DIR, `${person.slug}.json`);
  const hasCandidate = existsSync(candidatePath);

  if (ledgerPath) {
    tier = "A";
    const ledger = JSON.parse(readFileSync(ledgerPath, "utf8")) as { episodes?: { text: string }[] };
    episodeCount = ledger.episodes?.length ?? 0;
    wordCount = (ledger.episodes ?? []).reduce((s, e) => s + countWords(e.text), 0);
  }

  if (hasCandidate) {
    const cand = JSON.parse(readFileSync(candidatePath, "utf8")) as CandidateJson;
    if (cand.status === "qa_passed" || cand.status === "committed") {
      if (tier !== "A") tier = "B";
      const rows = Object.values(cand.rows ?? {});
      const rationaleWords = rows.reduce((s, r) => s + countWords(r.rationale ?? ""), 0);
      if (tier === "B") {
        episodeCount = Math.max(episodeCount, rows.filter((r) => (r.rationale ?? "").length > 0).length);
        wordCount = Math.max(wordCount, rationaleWords);
      }
      sourcesWithUrls = (cand.sources ?? []).filter((s) => !!s.url).length;
      sourcesTotal = Math.max(sourcesTotal, (cand.sources ?? []).length);
    }
  }

  if (tier === "C" && block) {
    const { words, comments } = commentWordsAndCount(block.text);
    episodeCount = comments;
    wordCount = words;
  }

  if (tier !== "C" && sourcesWithUrls === 0) {
    sourcesWithUrls = person.sources.filter((s) => !!s.url).length;
  }
  if (tier === "C") {
    sourcesWithUrls = person.sources.filter((s) => !!s.url).length;
  }

  // Bucketing thresholds, chosen from the observed distribution shape
  // (tier A/B people cluster far above these; tier C people cluster
  // around a much lower baseline) — see the printed histogram below to
  // sanity-check these before trusting the bucket counts.
  let bucket: PersonReport["bucket"];
  if (wordCount >= 500 && episodeCount >= 10) bucket = "Rich";
  else if (wordCount >= 150 && episodeCount >= 5) bucket = "Adequate";
  else bucket = "Thin";

  reports.push({
    slug: person.slug,
    id: person.id,
    name: person.canonicalName,
    rosterFile,
    tier,
    episodeCount,
    wordCount,
    sourcesWithUrls,
    sourcesTotal,
    bucket,
  });
}

// ---- Aggregate report ----
const total = reports.length;
const byTier = { A: 0, B: 0, C: 0 };
const byBucket = { Rich: 0, Adequate: 0, Thin: 0 };
for (const r of reports) {
  byTier[r.tier]++;
  byBucket[r.bucket]++;
}

console.log(`\n=== Editorial Coverage Audit — ${total} people ===\n`);
console.log("Evidence tier (source richness):");
console.log(`  A (full evidence ledger, session18/19):     ${byTier.A}`);
console.log(`  B (qa_passed candidate JSON, roster3-10):    ${byTier.B}`);
console.log(`  C (inline TS comments only, seed/roster2):   ${byTier.C}`);

console.log("\nClassification (word count + episode-count thresholds):");
console.log(`  Rich:     ${byBucket.Rich}/${total}`);
console.log(`  Adequate: ${byBucket.Adequate}/${total}`);
console.log(`  Thin:     ${byBucket.Thin}/${total}`);

const ge2 = reports.filter((r) => r.episodeCount >= 2).length;
const ge5 = reports.filter((r) => r.episodeCount >= 5).length;
const ge10 = reports.filter((r) => r.episodeCount >= 10).length;
console.log("\nEpisode-candidate counts (proxy for achievements/anecdotes/turning points):");
console.log(`  >=2 episode-like records:  ${ge2}/${total}`);
console.log(`  >=5 episode-like records:  ${ge5}/${total}`);
console.log(`  >=10 episode-like records: ${ge10}/${total}`);

const sourcedGe2 = reports.filter((r) => r.sourcesWithUrls >= 2).length;
console.log(`\n  Sources with real URLs >=2: ${sourcedGe2}/${total}`);

console.log("\n--- Thin profiles (candidates to leave editorial-empty this session) ---");
for (const r of reports.filter((r) => r.bucket === "Thin").sort((a, b) => a.wordCount - b.wordCount)) {
  console.log(`  ${r.slug.padEnd(28)} tier=${r.tier} words=${r.wordCount} episodes=${r.episodeCount} (${r.rosterFile})`);
}

console.log("\n--- Rich profiles (best pilot/backfill candidates) ---");
for (const r of reports.filter((r) => r.bucket === "Rich").sort((a, b) => b.wordCount - a.wordCount).slice(0, 20)) {
  console.log(`  ${r.slug.padEnd(28)} tier=${r.tier} words=${r.wordCount} episodes=${r.episodeCount} (${r.rosterFile})`);
}

console.log("\n--- Full per-person table (CSV) ---");
console.log("slug,tier,bucket,episodeCount,wordCount,sourcesWithUrls,sourcesTotal,rosterFile");
for (const r of reports) {
  console.log(
    `${r.slug},${r.tier},${r.bucket},${r.episodeCount},${r.wordCount},${r.sourcesWithUrls},${r.sourcesTotal},${r.rosterFile}`,
  );
}
