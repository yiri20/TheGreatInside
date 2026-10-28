/**
 * Canonical profession-category totals for roster checkpoints (introduced in
 * Roster58 to stop the Roster57 accounting drift, see
 * docs/checkpoints/roster58.md). Category membership is the live
 * `PROFESSION_CATEGORIES` logic: a person counts once in every category that
 * contains any of their `fieldIds`.
 *
 * Two totals are always printed side by side because they differ by exactly the
 * production-but-not-directory-visible people (today only Zheng He):
 *   - production: every SEED_PEOPLE entry (what earlier checkpoints reported)
 *   - visible: entries with `isDirectoryVisible !== false` (what the Directory shows)
 *
 * Usage: tsx src/dev/roster1000/categoryCounts.ts [newestRosterNumber]
 * With a roster number N, "before" is the tree without roster N's people and
 * "after" is the full tree; without it only the current tree is printed.
 */
import { SEED_PEOPLE } from "../../data/people/seed.js";
import { PROFESSION_CATEGORIES } from "../../core/people/directoryTaxonomy.js";

interface Row {
  id: string;
  fieldIds: readonly string[];
  isDirectoryVisible?: boolean;
}

const people = SEED_PEOPLE as unknown as Row[];

function totals(rows: Row[]) {
  const line = (pred: (p: Row) => boolean) =>
    Object.fromEntries(
      PROFESSION_CATEGORIES.map((c) => [c.id, rows.filter((p) => pred(p) && p.fieldIds.some((f) => c.fieldIds.includes(f))).length]),
    );
  return {
    production: rows.length,
    visible: rows.filter((p) => p.isDirectoryVisible !== false).length,
    categoriesProduction: line(() => true),
    categoriesVisible: line((p) => p.isDirectoryVisible !== false),
  };
}

const arg = process.argv[2];
if (arg) {
  const mod = (await import(`../../data/people/roster${arg}.js`)) as Record<string, Row[]>;
  const newest = new Set((mod[`ROSTER_${arg}`] ?? []).map((p) => p.id));
  console.log(`before roster${arg}:`, JSON.stringify(totals(people.filter((p) => !newest.has(p.id)))));
  console.log(`after roster${arg}: `, JSON.stringify(totals(people)));
} else {
  console.log("current:", JSON.stringify(totals(people)));
}
