import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../../data/people/seed.js";
import {
  ALL_CLASSIFICATIONS,
  FROZEN_16_ELIGIBLE,
  FROZEN_8_CONTROLS,
  MANUAL_ROW_LEDGER,
  SUPERSEDED_AUDIT_SLUGS,
  countClassifications,
  findMissingLedgerRows,
  findOrphanLedgerRows,
  ledgerFor,
  ratesFromCounts,
  type ManualLedgerEntry,
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

  it("ledger row count equals the actual live scored-row count for all non-superseded of the 24 people", () => {
    for (const slug of [...FROZEN_16_ELIGIBLE, ...FROZEN_8_CONTROLS]) {
      if (SUPERSEDED_AUDIT_SLUGS.has(slug)) continue;
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

  it("matches PR #35's original frozen denominators -- reproducible from this file alone, unaffected by Kurosawa's later live remediation (docs/checkpoints/legacy-integrity-kurosawa-remediation.md)", () => {
    expect(ledgerFor(FROZEN_16_ELIGIBLE)).toHaveLength(396);
    expect(ledgerFor(FROZEN_8_CONTROLS)).toHaveLength(88);
    expect(MANUAL_ROW_LEDGER).toHaveLength(484);
  });
});

describe("manual row-classification ledger: superseded-audit slugs (historical fidelity)", () => {
  it("akira-kurosawa is the only superseded slug", () => {
    expect([...SUPERSEDED_AUDIT_SLUGS]).toEqual(["akira-kurosawa"]);
  });

  it("akira-kurosawa's ledger entries are PR #35's original 30-row, all-unsupported finding, not his current 10-row profile", () => {
    const entries = ledgerFor(["akira-kurosawa"]);
    expect(entries).toHaveLength(30);
    expect(entries.every((e) => e.classification === "unsupported_from_available_provenance")).toBe(true);

    const person = SEED_PEOPLE.find((p) => p.slug === "akira-kurosawa")!;
    expect(person.attributes.length).toBe(10);
    expect(entries.length).not.toBe(person.attributes.length);
  });

  it("every one of Kurosawa's CURRENT 10 live attributes is still, incidentally, one of the 30 historical rows (they're the retained subset) -- not asserted in general for a superseded slug, just true for this one", () => {
    const historicalIds = new Set(ledgerFor(["akira-kurosawa"]).map((e) => e.attributeId));
    const person = SEED_PEOPLE.find((p) => p.slug === "akira-kurosawa")!;
    for (const a of person.attributes) {
      expect(historicalIds.has(a.attributeId), `${a.attributeId} missing from historical ledger`).toBe(true);
    }
  });

  it("findOrphanLedgerRows does not flag Kurosawa's 20 historical rows he no longer has live, because he is superseded", () => {
    const orphans = findOrphanLedgerRows(MANUAL_ROW_LEDGER);
    expect(orphans.filter((e) => e.slug === "akira-kurosawa")).toEqual([]);
    // full-ledger integrity guard is still clean overall
    expect(orphans).toEqual([]);
  });

  it("findMissingLedgerRows does not require Kurosawa's live attributes to independently justify his historical entries", () => {
    const missing = findMissingLedgerRows([...FROZEN_16_ELIGIBLE, ...FROZEN_8_CONTROLS]);
    expect(missing.filter((m) => m.slug === "akira-kurosawa")).toEqual([]);
    expect(missing).toEqual([]);
  });

  it("orphan/missing guards still catch real drift for a NON-superseded slug (synthetic case, real data never touched)", () => {
    const realPerson = SEED_PEOPLE.find((p) => p.slug === "bertrand-russell")!;
    const realAttributeIds = new Set(realPerson.attributes.map((a) => a.attributeId));
    const missingId = (["curiosity", "adaptability", "risk_tolerance"] as const).find(
      (id) => !realAttributeIds.has(id),
    )!;

    const orphanEntry: ManualLedgerEntry = {
      slug: "bertrand-russell",
      attributeId: missingId,
      classification: "supported_as_written",
    };
    expect(findOrphanLedgerRows([orphanEntry])).toEqual([orphanEntry]);

    // the real ledger's own entries for this real, non-superseded person must
    // NOT be flagged as missing -- proving the guard actually checks live
    // data for him rather than vacuously passing because he isn't superseded.
    expect(findMissingLedgerRows(["bertrand-russell"])).toEqual([]);
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
