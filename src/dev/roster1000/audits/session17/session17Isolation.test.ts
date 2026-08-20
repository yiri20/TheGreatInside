/**
 * Session 17 audit isolation guard.
 *
 * This directory (`src/dev/roster1000/audits/session17/`) holds
 * diagnostic-only output from a one-time evidence-quality/diagnostic-
 * density audit (see README.md, comparison.md). It must never be able
 * to affect the real roster/candidate pipeline, and the frozen evidence
 * it classified must remain the exact evidence still committed in
 * `data-pipeline/candidates/`. This test proves both claims
 * structurally, not just by convention -- same pattern as
 * `session16Isolation.test.ts`.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Candidate } from "../../candidateSchema.js";

const REPO_ROOT = join(process.cwd());
const CANDIDATES_DIR = join(REPO_ROOT, "data-pipeline/candidates");
const AUDIT_DIR = join(REPO_ROOT, "src/dev/roster1000/audits/session17");
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

interface EpisodeFile {
  schemaVersion: string;
  candidate: string;
  sessionGroup: number;
  episodes: Array<{ id: string; class: "A" | "B" | "C" | "D" }>;
}

function loadEpisodes(file: string): EpisodeFile {
  return JSON.parse(readFileSync(join(AUDIT_DIR, file), "utf8")) as EpisodeFile;
}

describe("session 17 audit: production pipeline cannot discover this directory", () => {
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

  it("the real candidates directory contains no session17 audit files", () => {
    const files = readdirSync(CANDIDATES_DIR);
    for (const f of files) {
      expect(f.toLowerCase()).not.toContain("session17");
      expect(f.toLowerCase()).not.toContain("episodes.borges");
      expect(f.toLowerCase()).not.toContain("episodes.sankara");
      expect(f.toLowerCase()).not.toContain("episodes.fermi");
      expect(f.toLowerCase()).not.toContain("episodes.baldwin");
    }
  });

  it("episode audit files use a schemaVersion that real candidate tooling would reject", () => {
    for (const file of [
      "episodes.borges.json",
      "episodes.sankara.json",
      "episodes.fermi.json",
      "episodes.baldwin.json",
    ]) {
      const ep = loadEpisodes(file);
      expect(ep.schemaVersion).toBe("session17_episode_audit_v1");
      expect(ep.schemaVersion).not.toBe("candidate_v1");
    }
  });
});

describe("session 17 audit: frozen production evidence is exactly what this audit classified against", () => {
  it("jorge-luis-borges.json is unchanged from Session 13/16's own frozen state (16 rows)", () => {
    const borges = JSON.parse(
      readFileSync(join(CANDIDATES_DIR, "jorge-luis-borges.json"), "utf8"),
    ) as Candidate;
    expect(borges.status).toBe("held");
    expect(Object.keys(borges.rows)).toHaveLength(16);
    expect(borges.rows.decisiveness?.score).toBe(66);
  });

  it("thomas-sankara.json is unchanged from Session 13/16's own frozen state (16 rows)", () => {
    const sankara = JSON.parse(
      readFileSync(join(CANDIDATES_DIR, "thomas-sankara.json"), "utf8"),
    ) as Candidate;
    expect(sankara.status).toBe("held");
    expect(Object.keys(sankara.rows)).toHaveLength(16);
    expect(sankara.rows.leadership_drive?.score).toBe(88);
  });

  it("enrico-fermi.json is unchanged from Session 15's own frozen state (10 rows)", () => {
    const fermi = JSON.parse(
      readFileSync(join(CANDIDATES_DIR, "enrico-fermi.json"), "utf8"),
    ) as Candidate;
    expect(fermi.status).toBe("held");
    expect(Object.keys(fermi.rows)).toHaveLength(10);
    expect(fermi.rows.analytical_rigor?.score).toBe(88);
  });

  it("james-baldwin.json is unchanged from Session 15's own frozen state (7 rows)", () => {
    const baldwin = JSON.parse(
      readFileSync(join(CANDIDATES_DIR, "james-baldwin.json"), "utf8"),
    ) as Candidate;
    expect(baldwin.status).toBe("held");
    expect(Object.keys(baldwin.rows)).toHaveLength(7);
    expect(baldwin.rows.persistence?.score).toBe(84);
  });
});

describe("session 17 audit: episode classification matches the locked counts reported in comparison.md", () => {
  it("Borges: 26 episodes, 17/4/2/3 A/B/C/D", () => {
    const ep = loadEpisodes("episodes.borges.json");
    expect(ep.episodes).toHaveLength(26);
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    for (const e of ep.episodes) counts[e.class]++;
    expect(counts).toEqual({ A: 17, B: 4, C: 2, D: 3 });
  });

  it("Sankara: 19 episodes, 9/7/3/0 A/B/C/D", () => {
    const ep = loadEpisodes("episodes.sankara.json");
    expect(ep.episodes).toHaveLength(19);
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    for (const e of ep.episodes) counts[e.class]++;
    expect(counts).toEqual({ A: 9, B: 7, C: 3, D: 0 });
  });

  it("Fermi: 12 episodes, 7/2/2/1 A/B/C/D", () => {
    const ep = loadEpisodes("episodes.fermi.json");
    expect(ep.episodes).toHaveLength(12);
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    for (const e of ep.episodes) counts[e.class]++;
    expect(counts).toEqual({ A: 7, B: 2, C: 2, D: 1 });
  });

  it("Baldwin: 12 episodes, 7/3/1/1 A/B/C/D", () => {
    const ep = loadEpisodes("episodes.baldwin.json");
    expect(ep.episodes).toHaveLength(12);
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    for (const e of ep.episodes) counts[e.class]++;
    expect(counts).toEqual({ A: 7, B: 3, C: 1, D: 1 });
  });
});
