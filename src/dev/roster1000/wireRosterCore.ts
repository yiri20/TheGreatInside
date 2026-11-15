/**
 * Pure, deterministic transformations behind `wireRoster.ts` (the checked-in roster wiring tool).
 *
 * Why this exists: the roster cycles used out-of-repository helper scripts (shell heredocs, sed, ad hoc Python) to
 * wire a new roster, and those repeatedly failed on apostrophe quoting, escaped backslashes (a `\b` collapsing into
 * a literal backspace, a `\n` becoming a real newline), sed matching and string insertion mode. Everything here is
 * a function from source text to source text with EXPLICIT anchors:
 *
 * - no regular expressions, no shell fragments, no blind global replacement;
 * - an anchor that is absent or ambiguous throws `WiringError` (never a silent partial edit);
 * - reruns are idempotent: a fully applied edit returns the input unchanged, a PARTIALLY applied one throws;
 * - line endings (LF/CRLF) of the target file are preserved;
 * - strings are emitted with `JSON.stringify` (valid TypeScript string literals), never hand-quoted.
 *
 * What it deliberately NEVER does (semantic decisions stay with humans/agents): decide ship/hold, score, choose
 * portraits, determine eligibility, rewrite historical checkpoints, fabricate Korean names, or touch candidate
 * data. TAXONOMY RULE: if a new roster trips the live ">=2 people per curated Directory field" taxonomy guard,
 * this tooling must NOT delete, broaden or rewrite any candidate `fieldIds`; the failing test is left visible for
 * an explicit taxonomy review (curate the field in `directoryTaxonomy.ts` + EN/KO labels, as Roster67 did).
 */
import { ATTRIBUTE_IDS } from "../../core/attributes/attributes.js";
import { findRawAttributeIds } from "../../core/people/editorialRawIds.js";

export class WiringError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WiringError";
  }
}

export interface TransformResult {
  source: string;
  changed: boolean;
}

/* ------------------------------------------------------------------ line-ending helpers */

function split(src: string): { text: string; newline: string } {
  const newline = src.includes("\r\n") ? "\r\n" : "\n";
  return { text: newline === "\r\n" ? src.split("\r\n").join("\n") : src, newline };
}

function join(text: string, newline: string): string {
  return newline === "\r\n" ? text.split("\n").join("\r\n") : text;
}

function countOf(text: string, needle: string): number {
  if (needle.length === 0) return 0;
  let n = 0;
  let from = 0;
  for (;;) {
    const at = text.indexOf(needle, from);
    if (at < 0) return n;
    n += 1;
    from = at + needle.length;
  }
}

/** The exact line (without its terminator) must occur exactly once as a whole line. */
function singleLineIndex(text: string, line: string, what: string): number {
  const lines = text.split("\n");
  const hits: number[] = [];
  lines.forEach((l, i) => {
    if (l === line) hits.push(i);
  });
  if (hits.length === 0) throw new WiringError(`anchor not found (${what}): ${JSON.stringify(line)}`);
  if (hits.length > 1) throw new WiringError(`anchor is ambiguous (${what}): ${JSON.stringify(line)} occurs ${hits.length} times`);
  return hits[0]!;
}

function hasLine(text: string, line: string): boolean {
  return text.split("\n").includes(line);
}

/**
 * Insert a line after another whole-line anchor, idempotently.
 * Throws when only one of {already present} states is inconsistent (callers pass both lines of a pair).
 */
function insertAfterLine(text: string, anchor: string, newLine: string, what: string): string {
  const lines = text.split("\n");
  const at = singleLineIndex(text, anchor, what);
  lines.splice(at + 1, 0, newLine);
  return lines.join("\n");
}

/* ------------------------------------------------------------------ seed.ts and registry wiring */

function wirePair(
  src: string,
  roster: number,
  previousRoster: number,
  importFor: (n: number) => string,
  lineFor: (n: number) => string,
  fileLabel: string,
): TransformResult {
  const { text, newline } = split(src);
  const hasImport = hasLine(text, importFor(roster));
  const hasLineEntry = hasLine(text, lineFor(roster));
  if (hasImport && hasLineEntry) return { source: src, changed: false };
  if (hasImport !== hasLineEntry) {
    throw new WiringError(`${fileLabel}: roster ${roster} is PARTIALLY registered (import present: ${hasImport}, entry present: ${hasLineEntry}); fix by hand`);
  }
  if (!Number.isInteger(roster) || !Number.isInteger(previousRoster) || roster <= previousRoster) {
    throw new WiringError(`roster ${roster} must be greater than the previous registered roster ${previousRoster}`);
  }
  let next = insertAfterLine(text, importFor(previousRoster), importFor(roster), `${fileLabel} import of roster ${previousRoster}`);
  next = insertAfterLine(next, lineFor(previousRoster), lineFor(roster), `${fileLabel} entry of roster ${previousRoster}`);
  return { source: join(next, newline), changed: true };
}

/** `src/data/people/seed.ts`: import the roster module and spread it into SEED_PEOPLE after the previous roster. */
export function registerInSeed(src: string, roster: number, previousRoster: number): TransformResult {
  return wirePair(
    src,
    roster,
    previousRoster,
    (n) => `import { ROSTER_${n} } from "./roster${n}.js";`,
    (n) => `  ...ROSTER_${n},`,
    "seed.ts",
  );
}

/** `audits/matchPoolIntegrityAudit.ts`: the lineage registry (NAMED_ROSTERS). */
export function registerInLineageRegistry(src: string, roster: number, previousRoster: number): TransformResult {
  return wirePair(
    src,
    roster,
    previousRoster,
    (n) => `import { ROSTER_${n} } from "../../../data/people/roster${n}.js";`,
    (n) => `  ["roster${n}", ROSTER_${n}],`,
    "matchPoolIntegrityAudit.ts",
  );
}

/* ------------------------------------------------------------------ manifest */

export interface ManifestValues {
  latestRoster: number;
  production: number;
  directoryVisible: number;
  matchEligible: number;
  candidateJson: number;
}

const MANIFEST_KEYS: readonly (keyof ManifestValues)[] = ["latestRoster", "production", "directoryVisible", "matchEligible", "candidateJson"];

function manifestLineIndex(lines: readonly string[], key: string): number {
  const prefix = `  ${key}: `;
  const hits: number[] = [];
  lines.forEach((l, i) => {
    if (l.startsWith(prefix) && l.endsWith(",")) hits.push(i);
  });
  if (hits.length !== 1) throw new WiringError(`manifest anchor for "${key}" found ${hits.length} times (expected exactly 1)`);
  return hits[0]!;
}

function readManifestNumber(line: string, key: string): number {
  const value = Number(line.slice(`  ${key}: `.length, line.length - 1));
  if (!Number.isInteger(value)) throw new WiringError(`manifest "${key}" is not an integer in line ${JSON.stringify(line)}`);
  return value;
}

/** Move `currentRosterManifest.ts` from `before` to `after`. Idempotent; a half-updated manifest throws. */
export function updateManifest(src: string, before: ManifestValues, after: ManifestValues): TransformResult {
  const { text, newline } = split(src);
  const lines = text.split("\n");
  let atBefore = 0;
  let atAfter = 0;
  const idx: Partial<Record<keyof ManifestValues, number>> = {};
  for (const key of MANIFEST_KEYS) {
    const i = manifestLineIndex(lines, key);
    idx[key] = i;
    const current = readManifestNumber(lines[i]!, key);
    if (current === before[key]) atBefore += 1;
    if (current === after[key]) atAfter += 1;
    if (current !== before[key] && current !== after[key]) {
      throw new WiringError(`manifest "${key}" is ${current}, expected the previous value ${before[key]} (or the new value ${after[key]})`);
    }
  }
  if (atAfter === MANIFEST_KEYS.length) return { source: src, changed: false };
  // Keys whose before === after are consistent with both states; require every key to match "before".
  if (atBefore !== MANIFEST_KEYS.length) throw new WiringError("manifest is partially updated; fix by hand");
  for (const key of MANIFEST_KEYS) lines[idx[key]!] = `  ${key}: ${after[key]},`;
  return { source: join(lines.join("\n"), newline), changed: true };
}

/* ------------------------------------------------------------------ editorial / Korean-name insertion */

export interface DraftItem {
  en: string;
  ko: string;
  sourceIds: string[];
  interpretationEn?: string;
  interpretationKo?: string;
  attributeId?: string;
}

export interface EditorialDraft {
  slug: string;
  achievements: DraftItem[];
  moments?: DraftItem[];
  turningPoints?: DraftItem[];
}

export interface CandidateFacts {
  slug: string;
  sourceIds: readonly string[];
  rowAttributeIds: readonly string[];
  koreanName: string | undefined;
}

export interface EditorialArtifacts {
  en: Array<{ key: string; text: string }>;
  ko: Array<{ key: string; text: string }>;
  /** One TypeScript block per person for `PERSON_EDITORIAL`. */
  personBlocks: Array<{ slug: string; block: string }>;
  koreanNames: Array<{ slug: string; key: string; name: string }>;
}

function hasControlCharacter(text: string): boolean {
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) return true;
  }
  return false;
}

function checkText(label: string, text: string | undefined, required: boolean): void {
  if (text === undefined || text.trim().length === 0) {
    if (required) throw new WiringError(`${label}: empty text`);
    return;
  }
  if (hasControlCharacter(text)) throw new WiringError(`${label}: contains a control character (escape corruption?)`);
  const leaks = findRawAttributeIds(text);
  if (leaks.length > 0) throw new WiringError(`${label}: contains raw attribute id(s) ${leaks.join(", ")}; write readable trait names`);
}

const CATEGORY_SPECS = [
  { field: "achievements", keyLabel: "achievement", idLabel: "achievement" },
  { field: "moments", keyLabel: "moment", idLabel: "moment" },
  { field: "turningPoints", keyLabel: "turning_point", idLabel: "turning-point" },
] as const;

/** Validate drafts against their candidates and build the exact keys/blocks to insert. No semantic edits. */
export function buildEditorialArtifacts(drafts: readonly EditorialDraft[], facts: ReadonlyMap<string, CandidateFacts>): EditorialArtifacts {
  const attributeSet = new Set<string>(ATTRIBUTE_IDS);
  const out: EditorialArtifacts = { en: [], ko: [], personBlocks: [], koreanNames: [] };
  for (const draft of drafts) {
    const candidate = facts.get(draft.slug);
    if (!candidate) throw new WiringError(`${draft.slug}: no candidate facts supplied`);
    if (!candidate.koreanName || candidate.koreanName.trim().length === 0) {
      throw new WiringError(`${draft.slug}: candidate has no Korean display name (the tool never fabricates one)`);
    }
    if (hasControlCharacter(candidate.koreanName)) throw new WiringError(`${draft.slug}: Korean display name contains a control character`);
    out.koreanNames.push({ slug: draft.slug, key: `person.name.${draft.slug}`, name: candidate.koreanName });
    if (!draft.achievements || draft.achievements.length === 0) throw new WiringError(`${draft.slug}: needs at least one achievement`);
    const sourceSet = new Set(candidate.sourceIds);
    const rowSet = new Set(candidate.rowAttributeIds);
    const sections: string[] = [];
    for (const spec of CATEGORY_SPECS) {
      const items = (draft[spec.field] ?? []) as DraftItem[];
      if (items.length === 0) continue;
      const lines: string[] = [];
      items.forEach((item, i) => {
        const n = i + 1;
        const key = `${draft.slug}.${spec.keyLabel}.${n}`;
        checkText(`${key} (en)`, item.en, true);
        checkText(`${key} (ko)`, item.ko, true);
        out.en.push({ key, text: item.en });
        out.ko.push({ key, text: item.ko });
        for (const id of item.sourceIds) {
          if (!sourceSet.has(id)) throw new WiringError(`${key}: source id ${id} is not one of ${draft.slug}'s own sources`);
        }
        const parts = [`id: ${JSON.stringify(`${draft.slug}-${spec.idLabel}-${n}`)}`, `textKey: ${JSON.stringify(key)}`];
        if (item.interpretationEn !== undefined) {
          const ikey = `${draft.slug}.interpretation.${spec.keyLabel}.${n}`;
          checkText(`${ikey} (en)`, item.interpretationEn, true);
          checkText(`${ikey} (ko)`, item.interpretationKo, true);
          if (!item.attributeId || !attributeSet.has(item.attributeId)) throw new WiringError(`${ikey}: attributeId ${item.attributeId} is not a real attribute id`);
          if (!rowSet.has(item.attributeId)) throw new WiringError(`${ikey}: attributeId ${item.attributeId} is not a scored row of ${draft.slug}`);
          out.en.push({ key: ikey, text: item.interpretationEn });
          out.ko.push({ key: ikey, text: item.interpretationKo! });
          parts.push(`interpretationKey: ${JSON.stringify(ikey)}`, `attributeId: ${JSON.stringify(item.attributeId)}`);
        }
        parts.push(`sourceIds: [${item.sourceIds.map((s) => JSON.stringify(s)).join(", ")}]`);
        lines.push(`      { ${parts.join(", ")} },`);
      });
      sections.push(`    ${spec.field}: [\n${lines.join("\n")}\n    ],`);
    }
    out.personBlocks.push({ slug: draft.slug, block: `  ${JSON.stringify(draft.slug)}: {\n${sections.join("\n")}\n  },` });
  }
  return out;
}

function entriesText(entries: ReadonlyArray<{ key: string; text: string }>): string {
  return entries.map((e) => `  ${JSON.stringify(e.key)}:\n    ${JSON.stringify(e.text)},`).join("\n");
}

function presentKeys(text: string, keys: readonly string[], keyLineFor: (key: string) => string): number {
  const lines = new Set(text.split("\n"));
  return keys.filter((k) => lines.has(keyLineFor(k))).length;
}

/**
 * Insert entries before the `};` that closes an object literal. `closingAnchor` is a whole line that starts the
 * NEXT statement; the closing `};` must be the last non-blank statement line before it.
 */
function insertBeforeClosing(text: string, closingAnchor: string, block: string, what: string): string {
  const lines = text.split("\n");
  const anchorAt = singleLineIndex(text, closingAnchor, what);
  let i = anchorAt - 1;
  while (i >= 0 && lines[i]!.trim() === "") i -= 1;
  if (i < 0 || lines[i] !== "};") throw new WiringError(`${what}: expected "};" immediately before ${JSON.stringify(closingAnchor)}, found ${JSON.stringify(lines[i] ?? "")}`);
  lines.splice(i, 0, ...block.split("\n"));
  return lines.join("\n");
}

const EN_CLOSING_ANCHOR = "export const EDITORIAL_KO: Record<string, string> = {";
const KO_CLOSING_ANCHOR = "const BUNDLES: Partial<Record<Locale, Record<string, string>>> = {";

/** `src/core/i18n/editorial.ts`: append EN and KO entries. Idempotent; partially present keys throw. */
export function insertEditorialText(src: string, art: Pick<EditorialArtifacts, "en" | "ko">): TransformResult {
  const { text, newline } = split(src);
  const keys = art.en.map((e) => e.key);
  const present = presentKeys(text, keys, (k) => `  ${JSON.stringify(k)}:`);
  if (present === keys.length && keys.length > 0) return { source: src, changed: false };
  if (present !== 0) throw new WiringError(`editorial.ts: ${present} of ${keys.length} keys already exist; refusing a partial insert`);
  let next = insertBeforeClosing(text, KO_CLOSING_ANCHOR, entriesText(art.ko), "editorial.ts EDITORIAL_KO");
  next = insertBeforeClosing(next, EN_CLOSING_ANCHOR, entriesText(art.en), "editorial.ts EDITORIAL_EN");
  return { source: join(next, newline), changed: true };
}

const PERSON_EDITORIAL_ANCHOR = "export const PERSON_EDITORIAL: Record<string, PersonEditorial> = {";

/** `src/data/people/editorial.ts`: append one block per person to PERSON_EDITORIAL. */
export function insertPersonEditorial(src: string, blocks: ReadonlyArray<{ slug: string; block: string }>): TransformResult {
  const { text, newline } = split(src);
  const present = blocks.filter((b) => hasLine(text, `  ${JSON.stringify(b.slug)}: {`)).length;
  if (present === blocks.length && blocks.length > 0) return { source: src, changed: false };
  if (present !== 0) throw new WiringError(`data/people/editorial.ts: ${present} of ${blocks.length} people already exist; refusing a partial insert`);
  const lines = text.split("\n");
  const startAt = singleLineIndex(text, PERSON_EDITORIAL_ANCHOR, "PERSON_EDITORIAL start");
  let closeAt = -1;
  for (let i = startAt + 1; i < lines.length; i += 1) {
    if (lines[i] === "};") {
      closeAt = i;
      break;
    }
  }
  if (closeAt < 0) throw new WiringError("PERSON_EDITORIAL closing \"};\" not found");
  lines.splice(closeAt, 0, ...blocks.flatMap((b) => b.block.split("\n")));
  return { source: join(lines.join("\n"), newline), changed: true };
}

/** `src/core/i18n/ko.ts`: append `person.name.<slug>` entries after the last existing one. */
export function insertKoreanNames(src: string, names: ReadonlyArray<{ slug: string; key: string; name: string }>): TransformResult {
  const { text, newline } = split(src);
  const present = names.filter((n) => text.includes(`  ${JSON.stringify(n.key)}:`)).length;
  if (present === names.length && names.length > 0) return { source: src, changed: false };
  if (present !== 0) throw new WiringError(`ko.ts: ${present} of ${names.length} person names already exist; refusing a partial insert`);
  const lines = text.split("\n");
  let last = -1;
  lines.forEach((l, i) => {
    if (l.startsWith('  "person.name.') && l.endsWith(",")) last = i;
  });
  if (last < 0) throw new WiringError('ko.ts: no existing "person.name." line to anchor after');
  lines.splice(last + 1, 0, ...names.map((n) => `  ${JSON.stringify(n.key)}: ${JSON.stringify(n.name)},`));
  return { source: join(lines.join("\n"), newline), changed: true };
}

/* ------------------------------------------------------------------ audit skeleton and generator wrapper */

export interface AuditSkeletonOptions {
  roster: number;
  shipped: readonly string[];
  held: readonly string[];
}

function lines(items: readonly string[], indent: string): string {
  return items.map((s) => `${indent}${JSON.stringify(s)},`).join("\n");
}

/** Fill the checked-in audit template by plain placeholder substitution (no regex). */
export function renderRosterAudit(template: string, opts: AuditSkeletonOptions): string {
  const placeholders: Array<[string, string]> = [
    ["__ROSTER__", String(opts.roster)],
    ["__SHIPPED_COUNT__", String(opts.shipped.length)],
    ["__HELD_COUNT__", String(opts.held.length)],
    ["__TARGETS__", lines([...opts.shipped].sort(), "  ")],
    ["__HELD__", lines([...opts.held].sort(), "  ")],
  ];
  let out = template;
  for (const [token, value] of placeholders) {
    if (!out.includes(token)) throw new WiringError(`audit template is missing the placeholder ${token}`);
    out = out.split(token).join(value);
  }
  if (out.includes("__")) {
    const at = out.indexOf("__");
    throw new WiringError(`audit template still has an unfilled placeholder near ${JSON.stringify(out.slice(at, at + 24))}`);
  }
  return out;
}

/** The thin per-roster generator: only the literal shipped-slug allowlist and an intro line are roster-specific. */
export function renderGeneratorWrapper(roster: number, shipped: readonly string[], intro: string): string {
  const out = [
    "/**",
    ` * ROSTER ${roster} generator (created by wireRoster.ts). Rendering and the fail-closed promotion checks live in`,
    " * `rosterGeneratorCore.ts`; this file supplies only the literal shipped-slug allowlist (held candidates are",
    " * deliberately absent) and the header text.",
    " *",
    ` * Usage: corepack pnpm@10 exec tsx src/dev/roster1000/generateRoster${roster}.ts`,
    " */",
    'import { generateRosterModule } from "./rosterGeneratorCore.js";',
    "",
    `const ROSTER_${roster}_SLUGS = [`,
    ...[...shipped].sort().map((s) => `  ${JSON.stringify(s)},`),
    "];",
    "",
    "generateRosterModule({",
    `  roster: ${roster},`,
    `  slugs: ROSTER_${roster}_SLUGS,`,
    `  intro: ${JSON.stringify(intro)},`,
    "});",
    "",
  ];
  return out.join("\n");
}

export { countOf as _countOf };
