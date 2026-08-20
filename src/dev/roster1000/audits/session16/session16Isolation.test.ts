/**
 * Session 16 audit isolation guard.
 *
 * This directory (`src/dev/roster1000/audits/session16/`) holds
 * diagnostic-only output from a one-time scoring-reproducibility
 * experiment (see README.md, comparison.md). It must never be able to
 * affect the real roster/candidate pipeline. This test proves that
 * structurally, not just by convention:
 *
 * 1. Every production candidate-pipeline tool hardcodes
 *    `data-pipeline/candidates` as its scan directory and does a
 *    non-recursive `readdirSync` of exactly that path -- confirmed here
 *    by reading each tool's own source rather than trusting the doc
 *    comment, so this test breaks if a future edit ever widens the scan.
 * 2. The shadow-profile JSON files in this directory use a distinct
 *    `schemaVersion` ("session16_shadow_audit_v1") that does NOT match
 *    `CANDIDATE_SCHEMA_VERSION` ("candidate_v1") -- so even if one were
 *    ever copied into `data-pipeline/candidates/` by mistake,
 *    `validateCandidates.ts`'s own schema-version check would reject it
 *    immediately.
 * 3. Session 13's own production candidate files
 *    (`jorge-luis-borges.json`, `thomas-sankara.json`) are unchanged from
 *    this audit's own frozen-evidence source -- the row set this audit
 *    compared against is the exact row set still committed, not a stale
 *    or drifted copy.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CANDIDATE_SCHEMA_VERSION, type Candidate } from "../../candidateSchema.js";

const REPO_ROOT = join(process.cwd());
const CANDIDATES_DIR = join(REPO_ROOT, "data-pipeline/candidates");
const AUDIT_DIR = join(REPO_ROOT, "src/dev/roster1000/audits/session16");
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
];

describe("session 16 audit: production pipeline cannot discover this directory", () => {
  it("every production candidate-pipeline tool scans only data-pipeline/candidates, non-recursively", () => {
    for (const relPath of PRODUCTION_TOOL_FILES) {
      const src = readFileSync(join(REPO_ROOT, relPath), "utf8");
      expect(src, `${relPath} must hardcode the real candidates dir`).toContain(
        `join(process.cwd(), "data-pipeline/candidates")`,
      );
      // readdirSync with no {recursive: true} option never descends into
      // subdirectories, so a nested audits/ folder inside a different tree
      // entirely is doubly unreachable -- this asserts the call site never
      // opted into recursion.
      expect(src, `${relPath} must not opt into a recursive directory scan`).not.toMatch(
        /readdirSync\([^)]*recursive/,
      );
    }
  });

  it("the real candidates directory contains no session16 audit files", () => {
    const files = readdirSync(CANDIDATES_DIR);
    for (const f of files) {
      expect(f.toLowerCase()).not.toContain("session16");
      expect(f.toLowerCase()).not.toContain("shadow");
    }
  });

  it("shadow profile files use a schemaVersion that real candidate tooling would reject", () => {
    const borges = JSON.parse(readFileSync(join(AUDIT_DIR, "shadowProfile.borges.json"), "utf8"));
    const sankara = JSON.parse(readFileSync(join(AUDIT_DIR, "shadowProfile.sankara.json"), "utf8"));
    for (const shadow of [borges, sankara]) {
      expect(shadow.schemaVersion).not.toBe(CANDIDATE_SCHEMA_VERSION);
      expect(shadow.schemaVersion).toBe("session16_shadow_audit_v1");
      expect(shadow.AUDIT_ONLY).toBe(true);
      expect(shadow.NOT_A_ROSTER_CANDIDATE).toBe(true);
      expect(shadow.NOT_ELIGIBLE_FOR_PROMOTION).toBe(true);
      expect(shadow.lockStatus).toBe("SHADOW LOCKED");
    }
  });
});

describe("session 16 audit: frozen production evidence is exactly what this audit compared against", () => {
  it("jorge-luis-borges.json still has exactly the 16 Session 13 rows this audit's comparison.md reports", () => {
    const borges = JSON.parse(
      readFileSync(join(CANDIDATES_DIR, "jorge-luis-borges.json"), "utf8"),
    ) as Candidate;
    expect(borges.status).toBe("held");
    expect(Object.keys(borges.rows)).toHaveLength(16);
    expect(borges.rows.decisiveness?.score).toBe(66);
    expect(borges.rows.decisiveness?.confidence).toBe(0.42);
    expect(borges.rows.belief_updating?.score).toBe(85);
  });

  it("thomas-sankara.json still has exactly the 16 Session 13 rows this audit's comparison.md reports", () => {
    const sankara = JSON.parse(
      readFileSync(join(CANDIDATES_DIR, "thomas-sankara.json"), "utf8"),
    ) as Candidate;
    expect(sankara.status).toBe("held");
    expect(Object.keys(sankara.rows)).toHaveLength(16);
    expect(sankara.rows.leadership_drive?.score).toBe(88);
    expect(sankara.rows.adaptability?.confidence).toBe(0.38);
  });
});
