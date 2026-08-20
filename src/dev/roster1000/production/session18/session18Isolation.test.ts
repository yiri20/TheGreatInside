/**
 * Session 18 production-pilot isolation guard.
 *
 * This directory (`src/dev/roster1000/production/session18/`) holds the
 * prospective research pipeline's preserved intermediate artifacts
 * (sources.md, rawNotes.md, evidenceLedger.json, EVIDENCE_LOCK.md per
 * candidate, plus SCORING_LOCK.md) for the 5-person Session 18 cohort —
 * NOT real candidate files. It must never be discoverable by the real
 * candidate-pipeline tools, and its evidence-ledger files must carry a
 * schema version real candidate tooling would reject if ever mistakenly
 * pointed at them. Same pattern as `session16Isolation.test.ts` /
 * `session17Isolation.test.ts`, adapted for a production (not audit)
 * pilot where some of the researched candidates DID get promoted into
 * the real roster.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Candidate } from "../../candidateSchema.js";

const REPO_ROOT = join(process.cwd());
const CANDIDATES_DIR = join(REPO_ROOT, "data-pipeline/candidates");
const PRODUCTION_DIR = join(REPO_ROOT, "src/dev/roster1000/production/session18");
const PRODUCTION_TOOL_FILES = [
  "src/dev/roster1000/validateCandidates.ts",
  "src/dev/roster1000/checkScoringLockIntegrity.ts",
  "src/dev/roster1000/identityPreflight.ts",
  "src/dev/roster1000/generateRoster3.ts",
  "src/dev/roster1000/generateRoster4.ts",
  "src/dev/roster1000/generateRoster5.ts",
  "src/dev/roster1000/generateRoster6.ts",
  "src/dev/roster1000/generateRoster7.ts",
  "src/dev/roster1000/generateRoster8.ts",
  "src/dev/roster1000/generateRoster9.ts",
];

const SESSION18_SLUGS = [
  "louis-pasteur",
  "fyodor-dostoevsky",
  "indira-gandhi",
  "louis-armstrong",
  "william-wilberforce",
] as const;

interface EvidenceLedger {
  schemaVersion: string;
  candidate: string;
  stage: string;
  episodes: Array<{ id: string }>;
}

function loadLedger(slug: string): EvidenceLedger {
  return JSON.parse(readFileSync(join(PRODUCTION_DIR, slug, "evidenceLedger.json"), "utf8")) as EvidenceLedger;
}

function loadCandidate(slug: string): Candidate {
  return JSON.parse(readFileSync(join(CANDIDATES_DIR, `${slug}.json`), "utf8")) as Candidate;
}

describe("session 18 production pilot: real pipeline cannot discover the research directory", () => {
  it("every production candidate-pipeline tool scans only data-pipeline/candidates, non-recursively", () => {
    for (const relPath of PRODUCTION_TOOL_FILES) {
      const src = readFileSync(join(REPO_ROOT, relPath), "utf8");
      expect(src, `${relPath} must hardcode the real candidates dir`).toContain(
        `join(process.cwd(), "data-pipeline/candidates")`,
      );
      expect(src, `${relPath} must not opt into a recursive directory scan`).not.toMatch(
        /readdirSync\([^)]*recursive/,
      );
    }
  });

  it("the real candidates directory contains no session18 research-stage files", () => {
    const files = readdirSync(CANDIDATES_DIR);
    for (const f of files) {
      expect(f.toLowerCase()).not.toContain("evidenceledger");
      expect(f.toLowerCase()).not.toContain("rawnotes");
      expect(f.toLowerCase()).not.toContain("evidence_lock");
      expect(f.toLowerCase()).not.toContain("scoring_lock");
    }
  });

  it("evidence-ledger files use a schemaVersion real candidate tooling would reject", () => {
    for (const slug of SESSION18_SLUGS) {
      const ledger = loadLedger(slug);
      expect(ledger.schemaVersion).toBe("session18_evidence_ledger_v1");
      expect(ledger.schemaVersion).not.toBe("candidate_v1");
    }
  });
});

describe("session 18 production pilot: locked scoring matches what was actually promoted or held", () => {
  it("louis-pasteur.json: qa_passed, 26 rows, eligible", () => {
    const c = loadCandidate("louis-pasteur");
    expect(c.status).toBe("qa_passed");
    expect(Object.keys(c.rows)).toHaveLength(26);
    expect(c.computedEligibility?.eligible).toBe(true);
  });

  it("fyodor-dostoevsky.json: qa_passed, 24 rows, eligible", () => {
    const c = loadCandidate("fyodor-dostoevsky");
    expect(c.status).toBe("qa_passed");
    expect(Object.keys(c.rows)).toHaveLength(24);
    expect(c.computedEligibility?.eligible).toBe(true);
  });

  it("louis-armstrong.json: qa_passed, 21 rows, eligible", () => {
    const c = loadCandidate("louis-armstrong");
    expect(c.status).toBe("qa_passed");
    expect(Object.keys(c.rows)).toHaveLength(21);
    expect(c.computedEligibility?.eligible).toBe(true);
  });

  it("indira-gandhi.json: held, 20 rows, ineligible on coverage only", () => {
    const c = loadCandidate("indira-gandhi");
    expect(c.status).toBe("held");
    expect(Object.keys(c.rows)).toHaveLength(20);
    expect(c.computedEligibility?.eligible).toBe(false);
    expect(c.holdReason).toContain("coverage");
  });

  it("william-wilberforce.json: held, 18 rows, ineligible on coverage only", () => {
    const c = loadCandidate("william-wilberforce");
    expect(c.status).toBe("held");
    expect(Object.keys(c.rows)).toHaveLength(18);
    expect(c.computedEligibility?.eligible).toBe(false);
    expect(c.holdReason).toContain("coverage");
  });

  it("roster9.ts contains exactly the 3 promoted slugs, no more, no less", () => {
    const src = readFileSync(join(REPO_ROOT, "src/data/people/roster9.ts"), "utf8");
    expect(src).toContain('slug: "louis-pasteur"');
    expect(src).toContain('slug: "fyodor-dostoevsky"');
    expect(src).toContain('slug: "louis-armstrong"');
    expect(src).not.toContain('slug: "indira-gandhi"');
    expect(src).not.toContain('slug: "william-wilberforce"');
  });
});
