import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { buildPeopleIndex, expandIndexEntry, expandPeopleIndex, toIndexEntry } from "./personIndex.js";

const here = dirname(fileURLToPath(import.meta.url));

describe("personIndex", () => {
  it("produces exactly one entry per SEED_PEOPLE person, in the same order", () => {
    const index = buildPeopleIndex(SEED_PEOPLE);
    expect(index.length).toBe(SEED_PEOPLE.length);
    expect(index.map((e) => e.id)).toEqual(SEED_PEOPLE.map((p) => p.id));
  });

  it("never includes full-detail-only fields (sources, doNotCopyKeys, explanation keys, externalIdentity, portrait license chain)", () => {
    const entry = toIndexEntry(SEED_PEOPLE[0]!);
    const keys = Object.keys(entry);
    for (const forbidden of [
      "sources",
      "doNotCopyKeys",
      "benefitExplanationKey",
      "costExplanationKey",
      "contextExplanationKey",
      "externalIdentity",
      "historicalPolityKey",
      "nationalityCodes",
      "status",
      "portrait",
    ]) {
      expect(keys, `PersonIndexEntry unexpectedly includes "${forbidden}"`).not.toContain(forbidden);
    }
  });

  it("attributes are tuple-encoded ([attributeId, score, confidence, impact]), not verbose objects — the measured reason is in IndexedAttribute's doc comment", () => {
    const entry = toIndexEntry(SEED_PEOPLE[0]!);
    expect(entry.attributes.length).toBeGreaterThan(0);
    for (const attr of entry.attributes) {
      expect(Array.isArray(attr)).toBe(true);
      expect(attr.length).toBe(4);
    }
  });

  it("only includes the portrait URL, never the license chain", () => {
    const daVinci = SEED_PEOPLE.find((p) => p.slug === "leonardo-da-vinci")!;
    expect(daVinci.portrait).toBeDefined(); // confirms this test actually exercises the populated-portrait branch
    const entry = toIndexEntry(daVinci);
    expect(entry.portraitUrl).toBe(daVinci.portrait!.url);
    expect(entry).not.toHaveProperty("portrait");
  });

  it("expandIndexEntry/expandPeopleIndex round-trips attributes back to the exact object shape explorer.ts/personDataFingerprint expect", () => {
    const person = SEED_PEOPLE[0]!;
    const entry = toIndexEntry(person);
    const expanded = expandIndexEntry(entry);
    expect(expanded.attributes).toEqual(
      person.attributes.map((a) => ({
        attributeId: a.attributeId,
        score: a.score,
        confidence: a.confidence,
        impact: a.impact,
      })),
    );
    expect(expandPeopleIndex([entry])).toEqual([expanded]);
  });

  /**
   * Structural guard, same "grep the real source" strategy
   * `resultLinkSideEffectBoundary.test.ts`/`noShareOnPrivateRoutes.test.ts`
   * already use for a different invariant this project locks the same way:
   * PeopleDirectoryClient.tsx and QuizClient.tsx (the two "use client"
   * components a full SEED_PEOPLE import would leak into the browser
   * bundle from) must import the PEOPLE_INDEX file, never the full
   * dataset directly. Fails loudly the moment a future edit reintroduces
   * the leak this stage fixed (measured: 54.6KB baseline -> a verbose-
   * object-encoded draft regressed to 93.5KB before this fix -> 56.5KB
   * final, on the same 35-person roster, with sources/doNotCopyKeys/
   * explanation keys/portrait-license-chain/externalIdentity all
   * excluded — see personIndex.ts's own doc comment for the full record).
   */
  const CLIENT_FILES = [
    resolve(here, "../../../app/[locale]/people/PeopleDirectoryClient.tsx"),
    resolve(here, "../../../app/[locale]/quiz/QuizClient.tsx"),
  ];

  for (const file of CLIENT_FILES) {
    it(`${file.split(/[\\/]/).slice(-2).join("/")} never imports the full SEED_PEOPLE dataset`, () => {
      const source = readFileSync(file, "utf8");
      expect(source).not.toMatch(/from ["']@data\/people\/seed["']/);
      expect(source).not.toMatch(/from ["'][^"']*data\/people\/seed(\.js)?["']/);
      expect(source).toMatch(/peopleIndex\.generated/);
    });
  }
});
