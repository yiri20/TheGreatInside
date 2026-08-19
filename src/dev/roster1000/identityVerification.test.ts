import { describe, expect, it } from "vitest";
import { checkIdentity, namesLikelyMatch, type WikidataEntitySummary } from "./identityVerification.js";

describe("namesLikelyMatch", () => {
  it("matches an exact label", () => {
    const entity: WikidataEntitySummary = { qid: "Q909", label: "Jorge Luis Borges", description: "Argentine writer", aliases: [] };
    expect(namesLikelyMatch("Jorge Luis Borges", entity)).toBe(true);
  });

  it("matches via an alias when the label differs", () => {
    const entity: WikidataEntitySummary = {
      qid: "Q5676",
      label: "松尾芭蕉",
      description: "Japanese poet (1644-1694)",
      aliases: ["Matsuo Basho", "Matsuo Bashō"],
    };
    expect(namesLikelyMatch("Matsuo Basho", entity)).toBe(true);
  });

  // The exact failure mode from roster-1000 session 12: a fabricated QID
  // resolving to a completely unrelated entity.
  it("rejects a QID pointing at an unrelated town", () => {
    const entity: WikidataEntitySummary = { qid: "Q6837", label: "Lutherstadt Wittenberg", description: "town in Germany", aliases: [] };
    expect(namesLikelyMatch("Herodotus", entity)).toBe(false);
  });

  it("rejects a QID pointing at an unrelated disambiguation page", () => {
    const entity: WikidataEntitySummary = { qid: "Q179936", label: "Briza", description: "Wikimedia disambiguation page", aliases: [] };
    expect(namesLikelyMatch("Chanakya", entity)).toBe(false);
  });

  it("rejects a QID pointing at an unrelated living politician", () => {
    const entity: WikidataEntitySummary = { qid: "Q41563", label: "Julia Gillard", description: "Prime Minister of Australia", aliases: [] };
    expect(namesLikelyMatch("Al-Farabi", entity)).toBe(false);
  });

  it("rejects a QID pointing at an unrelated calendar year", () => {
    const entity: WikidataEntitySummary = { qid: "Q7644", label: "1847", description: "calendar year", aliases: [] };
    expect(namesLikelyMatch("Sofia Kovalevskaya", entity)).toBe(false);
  });

  it("does not false-positive on a single shared common word", () => {
    // "de" is shared, but that alone should not count as a match.
    const entity: WikidataEntitySummary = { qid: "Q999999", label: "Ana de Armas", description: "Cuban-Spanish actress", aliases: [] };
    expect(namesLikelyMatch("Simone de Beauvoir", entity)).toBe(false);
  });

  it("handles diacritics without requiring an exact byte match", () => {
    const entity: WikidataEntitySummary = { qid: "Q328765", label: "Ṭāhā Ḥusayn", description: "Egyptian writer and literary critic", aliases: ["Taha Hussein"] };
    expect(namesLikelyMatch("Taha Hussein", entity)).toBe(true);
  });
});

describe("checkIdentity", () => {
  it("reports fetch_failed when no entity data is available", () => {
    const result = checkIdentity("some-slug", "Some Person", "Q1", undefined);
    expect(result.verdict).toBe("fetch_failed");
  });

  it("reports mismatch for the session-12 Herodotus/Wittenberg incident, reproduced as a fixture", () => {
    const entity: WikidataEntitySummary = { qid: "Q6837", label: "Lutherstadt Wittenberg", description: "town in Germany", aliases: [] };
    const result = checkIdentity("herodotus", "Herodotus", "Q6837", entity);
    expect(result.verdict).toBe("mismatch");
    expect(result.reason).toContain("does NOT plausibly match");
  });

  it("reports match for a correct QID", () => {
    const entity: WikidataEntitySummary = { qid: "Q26825", label: "Herodotus", description: "Greek historian and geographer", aliases: [] };
    const result = checkIdentity("herodotus", "Herodotus", "Q26825", entity);
    expect(result.verdict).toBe("match");
  });
});
