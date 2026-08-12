/**
 * I18N COVERAGE AUDIT — Phase 8.
 *
 * Buckets every MessageKey by product surface (quiz question, dev-guide,
 * dontcopy tradeoff/generic, results copy, etc.) and reports which are
 * missing from `ko` (falling back to English via `t()`'s BUNDLES lookup).
 * Run after adding any new locale content to confirm the fallback count
 * dropped to zero, or to see exactly which keys still need translation.
 *
 *   corepack pnpm@10 exec tsx src/dev/i18n-audit.ts
 */
import { en } from "../core/i18n/en.js";
import { ko } from "../core/i18n/ko.js";
import { missingKeys, translationCoverage } from "../core/i18n/index.js";

const allKeys = Object.keys(en);
const missing = missingKeys("ko-KR");
const missingSet = new Set(missing);

function bucket(key: string): string {
  if (key.startsWith("quiz.q")) return "quiz.question";
  if (key.startsWith("quiz.")) return "quiz.structural";
  if (key.startsWith("attribute.")) return "attribute.name";
  if (key.startsWith("facet.")) return "facet.name";
  if (key.startsWith("tpl.")) return "tpl.comparison_template";
  if (key.startsWith("dev.")) return "dev.guide";
  if (key.startsWith("dontcopy.tradeoff.")) return "dontcopy.tradeoff";
  if (key.startsWith("dontcopy.generic.")) return "dontcopy.generic";
  if (key.startsWith("dontcopy.")) return "dontcopy.editorial";
  if (key.startsWith("compare.")) return "compare.structural";
  if (key.startsWith("result.")) return "result.copy";
  if (key.startsWith("results.")) return "results.copy";
  if (key.startsWith("label.")) return "label";
  if (key.startsWith("person.")) return "person.structural";
  if (key.startsWith("people.")) return "people.explorer";
  if (key.startsWith("polity.")) return "polity";
  if (key.startsWith("archetype.")) return "archetype";
  if (key.startsWith("nav.")) return "nav";
  if (key.endsWith(".icon")) return "icon.glyph";
  return "other";
}

const buckets = new Map<string, { total: number; missing: number; missingKeys: string[] }>();
for (const k of allKeys) {
  const b = bucket(k);
  if (!buckets.has(b)) buckets.set(b, { total: 0, missing: 0, missingKeys: [] });
  const entry = buckets.get(b)!;
  entry.total++;
  if (missingSet.has(k as never)) {
    entry.missing++;
    entry.missingKeys.push(k);
  }
}

console.log(`Total EN keys: ${allKeys.length}`);
console.log(`Total KO explicit keys: ${Object.keys(ko).length}`);
console.log(`ko-KR missing (falls back to EN): ${missing.length}`);
console.log(`ko-KR coverage: ${(translationCoverage("ko-KR") * 100).toFixed(2)}%`);
console.log("");
console.log("By bucket (total / missing):");
const sorted = [...buckets.entries()].sort((a, b) => b[1].missing - a[1].missing);
for (const [name, info] of sorted) {
  console.log(`  ${name.padEnd(28)} total=${String(info.total).padEnd(5)} missing=${info.missing}`);
}
console.log("");
console.log("=== full missing key list by bucket ===");
for (const [name, info] of sorted) {
  if (info.missing === 0) continue;
  console.log(`\n--- ${name} (${info.missing}) ---`);
  console.log(info.missingKeys.join("\n"));
}
