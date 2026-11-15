/**
 * Tests for the checked-in roster wiring tool (`wireRosterCore.ts` pure transformations and `wireRoster.ts`
 * planning/apply on a temporary fixture tree). Nothing here depends on a future roster or on the live roster data.
 */
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CURRENT_ROSTER_MANIFEST } from "./currentRosterManifest.js";
import { applyPlan, formatPlan, planWiring } from "./wireRoster.js";
import {
  WiringError,
  buildEditorialArtifacts,
  insertEditorialText,
  insertKoreanNames,
  insertPersonEditorial,
  registerInLineageRegistry,
  registerInSeed,
  renderGeneratorWrapper,
  renderRosterAudit,
  updateManifest,
  type CandidateFacts,
  type EditorialDraft,
  type ManifestValues,
} from "./wireRosterCore.js";

const seedFixture = ['import { ROSTER_66 } from "./roster66.js";', 'import { ROSTER_67 } from "./roster67.js";', "", "export const SEED_PEOPLE = [", "  ...ROSTER_66,", "  ...ROSTER_67,", "];", ""].join("\n");
const registryFixture = [
  'import { ROSTER_66 } from "../../../data/people/roster66.js";',
  'import { ROSTER_67 } from "../../../data/people/roster67.js";',
  "const NAMED_ROSTERS = [",
  '  ["roster66", ROSTER_66],',
  '  ["roster67", ROSTER_67],',
  "];",
  "",
].join("\n");

describe("registerInSeed / registerInLineageRegistry", () => {
  it("registers a new roster after the previous one, exactly once", () => {
    const r = registerInSeed(seedFixture, 68, 67);
    expect(r.changed).toBe(true);
    expect(r.source).toContain('import { ROSTER_68 } from "./roster68.js";');
    expect(r.source.split("\n").indexOf("  ...ROSTER_68,")).toBe(r.source.split("\n").indexOf("  ...ROSTER_67,") + 1);
    const reg = registerInLineageRegistry(registryFixture, 68, 67);
    expect(reg.source).toContain('  ["roster68", ROSTER_68],');
  });

  it("is idempotent: wiring twice produces no further diff and no duplicate import or entry", () => {
    const once = registerInSeed(seedFixture, 68, 67);
    const twice = registerInSeed(once.source, 68, 67);
    expect(twice.changed).toBe(false);
    expect(twice.source).toBe(once.source);
    expect(once.source.split('import { ROSTER_68 }').length).toBe(2);
    expect(registerInLineageRegistry(registerInLineageRegistry(registryFixture, 68, 67).source, 68, 67).changed).toBe(false);
  });

  it("fails loudly when the previous-roster anchor is absent", () => {
    expect(() => registerInSeed(seedFixture, 70, 69)).toThrow(WiringError);
    expect(() => registerInSeed(seedFixture, 70, 69)).toThrow(/anchor not found/);
  });

  it("fails loudly when an anchor is ambiguous", () => {
    const duplicated = seedFixture + "\n  ...ROSTER_67,\n";
    expect(() => registerInSeed(duplicated, 68, 67)).toThrow(/ambiguous/);
  });

  it("fails loudly on a partially registered roster instead of completing it silently", () => {
    const partial = seedFixture.replace("  ...ROSTER_67,", "  ...ROSTER_67,\n  ...ROSTER_68,");
    expect(() => registerInSeed(partial, 68, 67)).toThrow(/PARTIALLY registered/);
  });

  it("rejects a roster number that is not greater than the previous one", () => {
    expect(() => registerInSeed(seedFixture, 67, 67)).not.toThrow(); // already registered => idempotent no-op
    expect(() => registerInSeed(seedFixture, 66, 67)).not.toThrow(); // already registered => no-op
    expect(() => registerInSeed(seedFixture.split("ROSTER_66").join("ROSTER_65"), 66, 67)).toThrow(/must be greater/);
  });

  it("preserves CRLF line endings", () => {
    const crlf = seedFixture.split("\n").join("\r\n");
    const r = registerInSeed(crlf, 68, 67);
    expect(r.source.includes("\r\n")).toBe(true);
    expect(r.source.split("\r\n").join("\n").includes("\r")).toBe(false);
    expect(r.source).toContain("  ...ROSTER_68,");
  });
});

const manifestSrc = readFileSync(join(process.cwd(), "src/dev/roster1000/currentRosterManifest.ts"), "utf8");
const before: ManifestValues = { ...CURRENT_ROSTER_MANIFEST };
const after: ManifestValues = { latestRoster: before.latestRoster + 1, production: before.production + 3, directoryVisible: before.directoryVisible + 3, matchEligible: before.matchEligible, candidateJson: before.candidateJson + 4 };

describe("updateManifest", () => {
  it("moves the pinned counts, leaving every other line untouched, and is idempotent", () => {
    const r = updateManifest(manifestSrc, before, after);
    expect(r.changed).toBe(true);
    expect(r.source).toContain(`  production: ${after.production},`);
    expect(r.source).toContain(`  latestRoster: ${after.latestRoster},`);
    expect(updateManifest(r.source, before, after).changed).toBe(false);
    const a = manifestSrc.split("\n");
    const b = r.source.split("\n");
    expect(b.length).toBe(a.length);
    expect(a.filter((line, i) => line !== b[i]).length).toBe(4); // matchEligible is unchanged
  });

  it("refuses when the manifest is not at the expected previous values", () => {
    expect(() => updateManifest(manifestSrc, { ...before, production: before.production - 1 }, after)).toThrow(/expected the previous value/);
  });

  it("refuses a partially updated manifest", () => {
    const partial = updateManifest(manifestSrc, before, after).source.replace(`  production: ${after.production},`, `  production: ${before.production},`);
    expect(() => updateManifest(partial, before, after)).toThrow(/partially updated/);
  });

  it("fails loudly when a manifest key anchor is missing", () => {
    expect(() => updateManifest(manifestSrc.replace("  candidateJson:", "  candidates:"), before, after)).toThrow(/anchor for "candidateJson"/);
  });
});

const enFixture = ['export const EDITORIAL_EN: Record<string, string> = {', '  "old.achievement.1":', '    "Old text.",', "};", "", "export const EDITORIAL_KO: Record<string, string> = {", '  "old.achievement.1":', '    "옛 텍스트.",', "};", "", "const BUNDLES: Partial<Record<Locale, Record<string, string>>> = {", "};", ""].join("\n");
const personFixture = ["export const PERSON_EDITORIAL: Record<string, PersonEditorial> = {", '  "old": {', "    achievements: [", '      { id: "old-achievement-1", textKey: "old.achievement.1", sourceIds: ["src_old"] },', "    ],", "  },", "};", "", "export const OTHER = {};", ""].join("\n");
const koFixture = ["export const ko = {", '  "person.name.old": "옛",', '  "other.key": "x",', "};", ""].join("\n");

const facts = new Map<string, CandidateFacts>([
  ["newbie", { slug: "newbie", sourceIds: ["src_a", "src_b"], rowAttributeIds: ["persistence", "conflict_tolerance"], koreanName: "뉴비" }],
]);
const draft = (over: Partial<EditorialDraft> = {}): EditorialDraft => ({
  slug: "newbie",
  achievements: [{ en: "A readable achievement.", ko: "읽기 쉬운 업적.", sourceIds: ["src_a"] }],
  moments: [{ en: "A moment.", ko: "순간.", interpretationEn: "Consistent with a conflict tolerance row.", interpretationKo: "갈등 감내 성향과 일치한다.", attributeId: "conflict_tolerance", sourceIds: ["src_b"] }],
  ...over,
});

describe("editorial and Korean-name insertion", () => {
  it("validates drafts against the candidate and inserts EN/KO text, the structural block and the Korean name", () => {
    const art = buildEditorialArtifacts([draft()], facts);
    const en = insertEditorialText(enFixture, art);
    expect(en.changed).toBe(true);
    const enLines = en.source.split("\n");
    expect(enLines.indexOf('  "newbie.achievement.1":')).toBeGreaterThan(-1);
    expect(en.source.indexOf('"newbie.interpretation.moment.1"')).toBeLessThan(en.source.indexOf("export const EDITORIAL_KO"));
    const koPart = en.source.slice(en.source.indexOf("export const EDITORIAL_KO"));
    expect(koPart).toContain('"newbie.interpretation.moment.1"');
    expect(koPart.indexOf('"newbie.achievement.1"')).toBeLessThan(koPart.indexOf("const BUNDLES"));
    const person = insertPersonEditorial(personFixture, art.personBlocks);
    expect(person.source).toContain('  "newbie": {');
    expect(person.source).toContain('interpretationKey: "newbie.interpretation.moment.1", attributeId: "conflict_tolerance"');
    expect(person.source.indexOf('"newbie": {')).toBeLessThan(person.source.indexOf("export const OTHER"));
    const ko = insertKoreanNames(koFixture, art.koreanNames);
    expect(ko.source).toContain('  "person.name.newbie": "뉴비",');
    expect(ko.source.indexOf("person.name.newbie")).toBeLessThan(ko.source.indexOf("other.key"));
  });

  it("is idempotent and refuses partial insertion", () => {
    const art = buildEditorialArtifacts([draft()], facts);
    const en = insertEditorialText(enFixture, art);
    expect(insertEditorialText(en.source, art).changed).toBe(false);
    const person = insertPersonEditorial(personFixture, art.personBlocks);
    expect(insertPersonEditorial(person.source, art.personBlocks).changed).toBe(false);
    const ko = insertKoreanNames(koFixture, art.koreanNames);
    expect(insertKoreanNames(ko.source, art.koreanNames).changed).toBe(false);
    const half = enFixture.replace('"old.achievement.1":\n    "Old text.",', '"old.achievement.1":\n    "Old text.",\n  "newbie.achievement.1":\n    "x",');
    expect(() => insertEditorialText(half, art)).toThrow(/refusing a partial insert/);
  });

  it("fails loudly when a structural anchor is absent", () => {
    const art = buildEditorialArtifacts([draft()], facts);
    expect(() => insertEditorialText(enFixture.replace("const BUNDLES", "const OTHER"), art)).toThrow(/anchor not found/);
    expect(() => insertPersonEditorial(personFixture.replace("PERSON_EDITORIAL", "PEOPLE"), art.personBlocks)).toThrow(/anchor not found/);
    expect(() => insertKoreanNames("export const ko = {};\n", art.koreanNames)).toThrow(/no existing "person.name."/);
  });

  it("rejects a source id that is not one of the candidate's own sources", () => {
    expect(() => buildEditorialArtifacts([draft({ achievements: [{ en: "x", ko: "y", sourceIds: ["src_missing"] }] })], facts)).toThrow(/not one of newbie's own sources/);
  });

  it("rejects an attributeId that is not a real, scored attribute", () => {
    const bad = draft({ moments: [{ en: "m", ko: "m", interpretationEn: "i", interpretationKo: "i", attributeId: "not_an_attribute", sourceIds: ["src_a"] }] });
    expect(() => buildEditorialArtifacts([bad], facts)).toThrow(/not a real attribute id/);
    const unscored = draft({ moments: [{ en: "m", ko: "m", interpretationEn: "i", interpretationKo: "i", attributeId: "curiosity", sourceIds: ["src_a"] }] });
    expect(() => buildEditorialArtifacts([unscored], facts)).toThrow(/not a scored row/);
  });

  it("rejects a raw attribute id in prose (readable trait names only) and a control character from escape corruption", () => {
    const raw = draft({ moments: [{ en: "m", ko: "m", interpretationEn: "consistent with the profile's conflict_tolerance row", interpretationKo: "ok", attributeId: "conflict_tolerance", sourceIds: ["src_a"] }] });
    expect(() => buildEditorialArtifacts([raw], facts)).toThrow(/raw attribute id/);
    const ctrl = draft({ achievements: [{ en: "bad" + String.fromCharCode(8) + "text", ko: "ok", sourceIds: ["src_a"] }] });
    expect(() => buildEditorialArtifacts([ctrl], facts)).toThrow(/control character/);
  });

  it("never fabricates a Korean name: a candidate without one is an error", () => {
    const noName = new Map(facts);
    noName.set("newbie", { ...facts.get("newbie")!, koreanName: undefined });
    expect(() => buildEditorialArtifacts([draft()], noName)).toThrow(/no Korean display name/);
  });
});

describe("audit skeleton and generator wrapper rendering", () => {
  const template = readFileSync(join(process.cwd(), "src/dev/roster1000/templates/rosterAudit.template.txt"), "utf8");

  it("fills every placeholder deterministically with sorted slug lists and no control characters", () => {
    const a = renderRosterAudit(template, { roster: 68, shipped: ["b-person", "a-person"], held: ["z-held"] });
    const b = renderRosterAudit(template, { roster: 68, shipped: ["a-person", "b-person"], held: ["z-held"] });
    expect(a).toBe(b);
    expect(a).toContain('  "a-person",\n  "b-person",');
    expect(a).toContain('describe.each(TARGETS)("Roster68: %s"');
    expect(a.includes("__")).toBe(false);
    for (const ch of a) {
      const code = ch.codePointAt(0)!;
      expect(code < 32 && code !== 10 && code !== 9 && code !== 13).toBe(false);
    }
  });

  it("fails loudly when the template lacks a placeholder", () => {
    expect(() => renderRosterAudit(template.split("__HELD__").join("HELD"), { roster: 68, shipped: ["a"], held: [] })).toThrow(/missing the placeholder/);
  });

  it("renders the thin generator wrapper with the literal allowlist", () => {
    const g = renderGeneratorWrapper(68, ["b", "a"], "fresh cycle");
    expect(g).toContain('const ROSTER_68_SLUGS = [\n  "a",\n  "b",\n];');
    expect(g).toContain('generateRosterModule({\n  roster: 68,');
  });
});

/* ------------------------------------------------------------------ planning / dry run / write on a fixture tree */

function makeFixtureRoot(): string {
  const root = mkdtempSync(join(tmpdir(), "wire-roster-"));
  const w = (rel: string, content: string) => {
    const path = join(root, rel);
    mkdirSync(join(path, ".."), { recursive: true });
    writeFileSync(path, content, "utf8");
  };
  w("src/data/people/seed.ts", seedFixture.split("ROSTER_66").join("ROSTER_66"));
  w("src/dev/roster1000/audits/matchPoolIntegrityAudit.ts", registryFixture);
  w("src/dev/roster1000/currentRosterManifest.ts", manifestSrc);
  w("src/dev/roster1000/templates/rosterAudit.template.txt", readFileSync(join(process.cwd(), "src/dev/roster1000/templates/rosterAudit.template.txt"), "utf8"));
  w("src/data/people/roster68.ts", ["export const ROSTER_68 = [", "  {", '    slug: "newbie",', "  },", "  {", '    slug: "second",', "  },", "];", ""].join("\n"));
  const cand = (slug: string, status = "evidence_approved", portrait = "found") =>
    JSON.stringify({ slug, status, sources: [{ id: "src_a" }, { id: "src_b" }], rows: { persistence: {}, conflict_tolerance: {} }, classification: { fieldIds: ["physics"] }, localization: { displayNames: { "ko-KR": slug + "-ko" } }, portrait: { status: portrait } }, null, 2) + "\n";
  w("data-pipeline/candidates/newbie.json", cand("newbie"));
  w("data-pipeline/candidates/second.json", cand("second"));
  w("data-pipeline/candidates/heldone.json", cand("heldone", "evidence_approved", "held"));
  w("src/core/i18n/editorial.ts", enFixture);
  w("src/data/people/editorial.ts", personFixture);
  w("src/core/i18n/ko.ts", koFixture);
  mkdirSync(join(root, "drafts"), { recursive: true });
  for (const slug of ["newbie", "second"]) w(`drafts/${slug}.json`, JSON.stringify(draft({ slug })));
  return root;
}

function snapshot(root: string): Record<string, string> {
  const out: Record<string, string> = {};
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else out[p.slice(root.length).split("\\").join("/")] = readFileSync(p, "utf8");
    }
  };
  walk(root);
  return out;
}

const baseOpts = (root: string) => ({ roster: 68, shipped: ["newbie", "second"], held: ["heldone"], root, manifest: before, draftsDir: join(root, "drafts"), afterEligible: before.matchEligible });

describe("planWiring / applyPlan on a fixture tree", () => {
  it("dry run reports the intended operations and the count transition without mutating anything", () => {
    const root = makeFixtureRoot();
    const snap = snapshot(root);
    const plan = planWiring(baseOpts(root));
    expect(plan.errors).toEqual([]);
    expect(plan.transition.after.production).toBe(before.production + 2);
    expect(plan.transition.after.directoryVisible).toBe(before.directoryVisible + 2);
    expect(plan.transition.after.candidateJson).toBe(before.candidateJson + 3);
    const changed = plan.operations.filter((o) => o.changed).map((o) => o.file);
    expect(changed).toEqual(expect.arrayContaining(["src/data/people/seed.ts", "src/dev/roster1000/currentRosterManifest.ts", "src/dev/roster1000/audits/roster68.test.ts", "src/dev/roster1000/generateRoster68.ts"]));
    expect(formatPlan(plan, false)).toContain("dry run");
    expect(snapshot(root)).toEqual(snap);
  });

  it("applies the plan, never touches candidate files, and a rerun is a no-op", () => {
    const root = makeFixtureRoot();
    const before1 = snapshot(root);
    const plan = planWiring(baseOpts(root));
    const written = applyPlan(root, plan);
    expect(written.length).toBeGreaterThan(5);
    expect(written.some((f) => f.startsWith("data-pipeline/"))).toBe(false);
    const after1 = snapshot(root);
    for (const [path, content] of Object.entries(before1)) if (path.includes("data-pipeline")) expect(after1[path]).toBe(content);
    expect(after1["/src/data/people/seed.ts"]).toContain("ROSTER_68");
    // Rerun against the post-wiring manifest: every operation is a no-op and nothing is written.
    const afterManifest = plan.transition.after;
    const rerun = planWiring({ ...baseOpts(root), manifest: afterManifest });
    expect(rerun.errors).toEqual([]);
    expect(rerun.operations.filter((o) => o.changed)).toEqual([]);
    expect(applyPlan(root, rerun)).toEqual([]);
    expect(snapshot(root)).toEqual(after1);
  });

  it("reports a missing anchor and refuses to write anything (no partial edit)", () => {
    const root = makeFixtureRoot();
    writeFileSync(join(root, "src/data/people/seed.ts"), seedFixture.split("  ...ROSTER_67,\n").join(""), "utf8");
    const snap = snapshot(root);
    const plan = planWiring(baseOpts(root));
    expect(plan.errors.join(" ")).toMatch(/seed\.ts: anchor not found/);
    expect(() => applyPlan(root, plan)).toThrow(/refusing to write/);
    expect(snapshot(root)).toEqual(snap);
  });

  it("rejects mismatches between --shipped, the generated roster module and the candidates", () => {
    const root = makeFixtureRoot();
    const wrongShipped = planWiring({ ...baseOpts(root), shipped: ["newbie"] });
    expect(wrongShipped.errors.join(" ")).toMatch(/roster68\.ts contains second/);
    const heldPromoted = planWiring({ ...baseOpts(root), shipped: ["newbie", "second"], held: ["second"] });
    expect(heldPromoted.errors.join(" ")).toMatch(/both shipped and held|a hold must never be promoted/);
    const missing = planWiring({ ...baseOpts(root), held: ["no-such-candidate"] });
    expect(missing.errors.join(" ")).toMatch(/candidate file for no-such-candidate is missing/);
  });

  it("requires the generated roster module to exist first", () => {
    const root = makeFixtureRoot();
    const plan = planWiring({ ...baseOpts(root), roster: 99 });
    expect(plan.errors.join(" ")).toMatch(/roster99\.ts does not exist/);
  });

  it("without drafts it says plainly that editorial and Korean names were not wired", () => {
    const root = makeFixtureRoot();
    const plan = planWiring({ ...baseOpts(root), draftsDir: undefined });
    expect(plan.notes.join(" ")).toMatch(/NOT wired/);
    expect(plan.operations.some((o) => o.file === "src/core/i18n/ko.ts")).toBe(false);
  });
});
