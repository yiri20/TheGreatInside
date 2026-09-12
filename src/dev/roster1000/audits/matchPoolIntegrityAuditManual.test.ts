import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import {
  ALL_CLASSIFICATIONS,
  FROZEN_16_ELIGIBLE,
  FROZEN_8_CONTROLS,
  MANUAL_ROW_LEDGER,
  countClassifications,
  findMissingLedgerRows,
  findOrphanLedgerRows,
  ledgerFor,
  ratesFromCounts,
} from "./matchPoolIntegrityAuditManual.js";

describe("manual row-classification ledger: coverage", () => {
  it("every frozen eligible sample person has at least one ledger row", () => {
    for (const slug of FROZEN_16_ELIGIBLE) {
      expect(ledgerFor([slug]).length, `${slug} missing from ledger`).toBeGreaterThan(0);
    }
  });

  it("every frozen control person has at least one ledger row", () => {
    for (const slug of FROZEN_8_CONTROLS) {
      expect(ledgerFor([slug]).length, `${slug} missing from ledger`).toBeGreaterThan(0);
    }
  });

  it("ledger row count equals the actual live scored-row count for all 24 people", () => {
    for (const slug of [...FROZEN_16_ELIGIBLE, ...FROZEN_8_CONTROLS]) {
      const person = SEED_PEOPLE.find((p) => p.slug === slug);
      expect(person, `${slug} not found in SEED_PEOPLE`).toBeDefined();
      expect(ledgerFor([slug]).length, `${slug} row-count mismatch`).toBe(person!.attributes.length);
    }
  });

  it("every ledger row maps to a real, currently-scored attribute on that person", () => {
    expect(findOrphanLedgerRows(MANUAL_ROW_LEDGER)).toEqual([]);
  });

  it("every scored attribute on the 24 people has exactly one ledger row (no missing, no duplicates)", () => {
    const targets = [...FROZEN_16_ELIGIBLE, ...FROZEN_8_CONTROLS];
    expect(findMissingLedgerRows(targets)).toEqual([]);

    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const e of MANUAL_ROW_LEDGER) {
      const key = `${e.slug}::${e.attributeId}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    }
    expect(dupes).toEqual([]);
  });

  it("the ledger contains no other people beyond the frozen 16 + frozen 8", () => {
    const allowed = new Set([...FROZEN_16_ELIGIBLE, ...FROZEN_8_CONTROLS]);
    const stray = MANUAL_ROW_LEDGER.filter((e) => !allowed.has(e.slug));
    expect(stray).toEqual([]);
  });

  it("total ledger size equals eligible-sample + control-sample sizes with no overlap", () => {
    expect(MANUAL_ROW_LEDGER.length).toBe(ledgerFor(FROZEN_16_ELIGIBLE).length + ledgerFor(FROZEN_8_CONTROLS).length);
  });
});

describe("manual row-classification ledger: classification validity", () => {
  it("every row has exactly one primary classification from the fixed enum", () => {
    for (const e of MANUAL_ROW_LEDGER) {
      expect(ALL_CLASSIFICATIONS).toContain(e.classification);
    }
  });
});

describe("manual row-classification ledger: aggregation", () => {
  it("count + rate aggregation is deterministic and sums to the denominator", () => {
    const eligible = ledgerFor(FROZEN_16_ELIGIBLE);
    const counts1 = countClassifications(eligible);
    const counts2 = countClassifications(eligible);
    expect(counts2).toEqual(counts1);

    const sum = ALL_CLASSIFICATIONS.reduce((s, c) => s + counts1[c], 0);
    expect(sum).toBe(counts1.total);
    expect(counts1.total).toBe(eligible.length);

    const rates = ratesFromCounts(counts1);
    const rateSum = ALL_CLASSIFICATIONS.reduce((s, c) => s + rates[c], 0);
    expect(rateSum).toBeCloseTo(1, 5);
  });

  it("matches the exact known denominators for this audit cycle (akira-kurosawa's row count dropped 30->10 after the legacy remediation cycle, docs/checkpoints/legacy-integrity-kurosawa-remediation.md)", () => {
    expect(ledgerFor(FROZEN_16_ELIGIBLE)).toHaveLength(376);
    expect(ledgerFor(FROZEN_8_CONTROLS)).toHaveLength(88);
    expect(MANUAL_ROW_LEDGER).toHaveLength(464);
  });
});

describe("manual row-classification ledger: no mutation", () => {
  it("reading/aggregating the ledger never mutates SEED_PEOPLE", () => {
    const before = JSON.stringify(SEED_PEOPLE);
    countClassifications(MANUAL_ROW_LEDGER);
    findOrphanLedgerRows(MANUAL_ROW_LEDGER);
    findMissingLedgerRows([...FROZEN_16_ELIGIBLE, ...FROZEN_8_CONTROLS]);
    expect(JSON.stringify(SEED_PEOPLE)).toBe(before);
  });
});
