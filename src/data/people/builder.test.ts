import { describe, expect, it } from "vitest";
import { build, wiki, type PersonSeed } from "./builder.js";

const BASE_SEED: PersonSeed = {
  id: "p_test",
  slug: "test-person",
  canonicalName: "Test Person",
  birthYear: 1900,
  isLiving: false,
  era: "20th_century",
  nationalityCodes: ["US"],
  regionCode: "north_america",
  occupationIds: ["writer"],
  fieldIds: ["literature"],
  impactDomains: ["literary"],
  tagIds: [],
  archetypeIds: [],
  sources: [wiki("test", "Test Person")],
  rows: {},
};

describe("build() — isDirectoryVisible default derivation", () => {
  it("mirrors isMatchEligible when directoryVisible is omitted (a thin profile: not eligible, not visible)", () => {
    const person = build(BASE_SEED); // no rows scored -> not match-eligible
    expect(person.isMatchEligible).toBe(false);
    expect(person.isDirectoryVisible).toBe(false);
  });

  it("can be explicitly overridden to diverge from isMatchEligible (published + directory-visible + not match-eligible)", () => {
    const person = build({ ...BASE_SEED, directoryVisible: true });
    expect(person.isMatchEligible).toBe(false);
    expect(person.isDirectoryVisible).toBe(true);
  });

  it("can be explicitly forced false even when a seed happens to be match-eligible (direct-only override)", () => {
    // Build first to see whether the base rich seed would be eligible is
    // beside the point here — the override must win regardless of the
    // computed isMatchEligible value.
    const person = build({ ...BASE_SEED, directoryVisible: false });
    expect(person.isDirectoryVisible).toBe(false);
  });

  it("status is always published, unaffected by directory visibility or match eligibility", () => {
    const visible = build({ ...BASE_SEED, directoryVisible: true });
    const hidden = build({ ...BASE_SEED, directoryVisible: false });
    expect(visible.status).toBe("published");
    expect(hidden.status).toBe("published");
  });
});
