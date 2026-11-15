/**
 * wireRoster.ts -- the checked-in, reviewable roster WIRING tool (replaces the out-of-repository shell/sed/Python
 * helper scripts earlier roster cycles used).
 *
 * It automates ONLY deterministic wiring after the humans/agents have already decided what ships:
 *   - registers `ROSTER_N` in `src/data/people/seed.ts` and in the lineage registry (`matchPoolIntegrityAudit.ts`);
 *   - moves `currentRosterManifest.ts` to the new cumulative counts (and verifies the arithmetic);
 *   - creates the thin `generateRosterN.ts` wrapper and the `audits/rosterN.test.ts` skeleton when absent;
 *   - optionally inserts EN/KO editorial text, `PERSON_EDITORIAL` blocks and Korean display names from structured
 *     draft JSON files (validated against each candidate's own sources/rows; never fabricates a Korean name).
 *
 * It NEVER: decides ship/hold, scores, chooses portrait rights, determines eligibility, edits a candidate file,
 * rewrites a historical checkpoint, or changes fieldIds / regions / taxonomy / editorial prose. If a new roster trips
 * the live ">=2 people per curated Directory field" taxonomy guard, the failing test is left visible for an explicit
 * taxonomy review; this tool must not delete, broaden or rewrite candidate classification to make it pass.
 *
 * Interface (explicit arguments, no text search-and-replace on the command line):
 *   tsx src/dev/roster1000/wireRoster.ts --roster 68 --shipped a,b,c --held d,e \
 *       [--drafts-dir <dir with <slug>.json editorial drafts>] [--after-eligible N] [--candidates-added N] \
 *       [--intro "<generator header text>"] [--write]
 *
 * DEFAULT IS A DRY RUN (`--check` semantics): it prints the intended operations, the count transition and every
 * problem (missing/ambiguous anchors, duplicate registration, missing files) and writes nothing. `--write` applies
 * the plan only when it has zero errors, so a partial edit cannot happen. Re-running a completed wiring changes
 * nothing. After `--write`, run the commands it prints (generator, people index, calibration, tests).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { CURRENT_ROSTER_MANIFEST } from "./currentRosterManifest.js";
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
  type TransformResult,
} from "./wireRosterCore.js";

export interface WireOptions {
  roster: number;
  shipped: readonly string[];
  held: readonly string[];
  afterEligible?: number | undefined;
  candidatesAdded?: number | undefined;
  draftsDir?: string | undefined;
  intro?: string | undefined;
  root: string;
  /** The manifest the roster is being wired FROM (the live `CURRENT_ROSTER_MANIFEST` in normal use). */
  manifest: ManifestValues;
}

export interface PlanOperation {
  file: string;
  description: string;
  /** null when the file does not exist yet. */
  before: string | null;
  after: string;
  changed: boolean;
}

export interface WirePlan {
  operations: PlanOperation[];
  errors: string[];
  notes: string[];
  transition: { before: ManifestValues; after: ManifestValues; shipped: number; held: number; alreadyWired: boolean };
}

const SEED = "src/data/people/seed.ts";
const REGISTRY = "src/dev/roster1000/audits/matchPoolIntegrityAudit.ts";
const MANIFEST = "src/dev/roster1000/currentRosterManifest.ts";
const EN_EDITORIAL = "src/core/i18n/editorial.ts";
const PERSON_EDITORIAL = "src/data/people/editorial.ts";
const KO = "src/core/i18n/ko.ts";
const TEMPLATE = "src/dev/roster1000/templates/rosterAudit.template.txt";

function read(root: string, rel: string): string {
  return readFileSync(join(root, rel), "utf8");
}

function tryRead(root: string, rel: string): string | null {
  const path = join(root, rel);
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

function slugsInRosterModule(src: string): string[] {
  const out: string[] = [];
  for (const line of src.split("\n")) {
    const l = line.endsWith("\r") ? line.slice(0, -1) : line;
    if (l.startsWith('    slug: "') && l.endsWith('",')) out.push(l.slice('    slug: "'.length, l.length - 2));
  }
  return out;
}

interface CandidateJson {
  slug: string;
  status: string;
  sources?: Array<{ id: string }>;
  rows?: Record<string, unknown>;
  localization?: { displayNames?: Record<string, string> };
  portrait?: { status?: string };
}

export function planWiring(opts: WireOptions): WirePlan {
  const errors: string[] = [];
  const notes: string[] = [];
  const operations: PlanOperation[] = [];
  const { roster, root, manifest } = opts;
  const shipped = [...opts.shipped];
  const held = [...opts.held];
  const alreadyWired = manifest.latestRoster >= roster;
  const after: ManifestValues = {
    latestRoster: roster,
    production: manifest.production + shipped.length,
    directoryVisible: manifest.directoryVisible + shipped.length,
    matchEligible: opts.afterEligible ?? manifest.matchEligible,
    candidateJson: manifest.candidateJson + (opts.candidatesAdded ?? shipped.length + held.length),
  };
  const transition = { before: manifest, after: alreadyWired ? manifest : after, shipped: shipped.length, held: held.length, alreadyWired };

  const add = (file: string, description: string, before: string | null, result: TransformResult | { source: string; changed: boolean }) => {
    operations.push({ file, description, before, after: result.source, changed: result.changed });
  };
  const guarded = (description: string, fn: () => void) => {
    try {
      fn();
    } catch (e) {
      errors.push(`${description}: ${e instanceof WiringError ? e.message : String(e)}`);
    }
  };

  if (!Number.isInteger(roster) || roster < 1) errors.push(`invalid roster number ${roster}`);
  if (shipped.length === 0) errors.push("no shipped slugs given");
  if (new Set(shipped).size !== shipped.length) errors.push("duplicate slugs in --shipped");
  if (new Set(held).size !== held.length) errors.push("duplicate slugs in --held");
  for (const s of shipped) if (held.includes(s)) errors.push(`${s} is listed as both shipped and held`);
  if (alreadyWired) notes.push(`manifest latestRoster ${manifest.latestRoster} >= ${roster}: treating roster ${roster} as already wired (rerun; every edit must be a no-op)`);

  // ---- the generated roster module must exist and list exactly the shipped slugs
  const rosterModule = tryRead(root, `src/data/people/roster${roster}.ts`);
  if (rosterModule === null) {
    errors.push(`src/data/people/roster${roster}.ts does not exist: run generateRoster${roster}.ts first`);
  } else {
    const inModule = new Set(slugsInRosterModule(rosterModule));
    for (const s of shipped) if (!inModule.has(s)) errors.push(`shipped slug ${s} is not in roster${roster}.ts`);
    for (const s of inModule) if (!shipped.includes(s)) errors.push(`roster${roster}.ts contains ${s}, which is not in --shipped`);
    for (const s of held) if (inModule.has(s)) errors.push(`held slug ${s} is in roster${roster}.ts (a hold must never be promoted)`);
  }

  // ---- candidate files: read-only checks (this tool never writes under data-pipeline/)
  const facts = new Map<string, CandidateFacts>();
  for (const slug of [...shipped, ...held]) {
    const raw = tryRead(root, `data-pipeline/candidates/${slug}.json`);
    if (raw === null) {
      errors.push(`candidate file for ${slug} is missing`);
      continue;
    }
    const c = JSON.parse(raw) as CandidateJson;
    if (shipped.includes(slug)) {
      if (c.status !== "evidence_approved" && c.status !== "qa_passed") errors.push(`${slug}: shipped candidate status is ${c.status}`);
      if (c.portrait?.status !== "found") errors.push(`${slug}: shipped candidate portrait.status is ${c.portrait?.status}`);
      facts.set(slug, {
        slug,
        sourceIds: (c.sources ?? []).map((s) => s.id),
        rowAttributeIds: Object.keys(c.rows ?? {}),
        koreanName: c.localization?.displayNames?.["ko-KR"],
      });
    }
  }

  // ---- seed.ts, lineage registry
  const previous = alreadyWired ? manifest.latestRoster : manifest.latestRoster;
  guarded("seed.ts", () => {
    const src = read(root, SEED);
    add(SEED, `register ROSTER_${roster} (import + spread)`, src, registerInSeed(src, roster, previous));
  });
  guarded("lineage registry", () => {
    const src = read(root, REGISTRY);
    add(REGISTRY, `register roster${roster} in NAMED_ROSTERS`, src, registerInLineageRegistry(src, roster, previous));
  });

  // ---- manifest
  guarded("manifest", () => {
    const src = read(root, MANIFEST);
    if (alreadyWired) {
      add(MANIFEST, "manifest already at or beyond this roster (no change)", src, { source: src, changed: false });
    } else {
      add(MANIFEST, `counts ${manifest.production}/${manifest.directoryVisible}/${manifest.matchEligible}/${manifest.candidateJson} -> ${after.production}/${after.directoryVisible}/${after.matchEligible}/${after.candidateJson}`, src, updateManifest(src, manifest, after));
    }
  });

  // ---- generator wrapper and audit skeleton (created only when absent)
  guarded("generator wrapper", () => {
    const rel = `src/dev/roster1000/generateRoster${roster}.ts`;
    const existing = tryRead(root, rel);
    const intro = opts.intro ?? "fresh new-candidate cycle";
    if (existing !== null) add(rel, "generator wrapper already exists (left untouched)", existing, { source: existing, changed: false });
    else add(rel, "create thin generator wrapper", null, { source: renderGeneratorWrapper(roster, shipped, intro), changed: true });
  });
  guarded("audit skeleton", () => {
    const rel = `src/dev/roster1000/audits/roster${roster}.test.ts`;
    const existing = tryRead(root, rel);
    if (existing !== null) {
      add(rel, "audit already exists (left untouched)", existing, { source: existing, changed: false });
    } else {
      const template = read(root, TEMPLATE);
      add(rel, "create audit skeleton (review the hold assertions)", null, { source: renderRosterAudit(template, { roster, shipped, held }), changed: true });
      notes.push(`review audits/roster${roster}.test.ts: make each hold assertion reflect its ACTUAL blocker type`);
    }
  });

  // ---- optional editorial / Korean-name insertion
  if (opts.draftsDir) {
    guarded("editorial drafts", () => {
      const drafts: EditorialDraft[] = [];
      for (const slug of [...shipped].sort()) {
        const path = join(opts.draftsDir!, `${slug}.json`);
        if (!existsSync(path)) {
          errors.push(`editorial draft missing for ${slug}: ${path}`);
          continue;
        }
        drafts.push(JSON.parse(readFileSync(path, "utf8")) as EditorialDraft);
      }
      if (errors.length > 0 && drafts.length !== shipped.length) return;
      const art = buildEditorialArtifacts(drafts, facts);
      const en = read(root, EN_EDITORIAL);
      add(EN_EDITORIAL, `insert ${art.en.length} EN and ${art.ko.length} KO editorial entries`, en, insertEditorialText(en, art));
      const person = read(root, PERSON_EDITORIAL);
      add(PERSON_EDITORIAL, `insert ${art.personBlocks.length} PERSON_EDITORIAL blocks`, person, insertPersonEditorial(person, art.personBlocks));
      const ko = read(root, KO);
      add(KO, `insert ${art.koreanNames.length} Korean display names (from the candidates, never invented)`, ko, insertKoreanNames(ko, art.koreanNames));
    });
  } else {
    notes.push("no --drafts-dir given: editorial text, PERSON_EDITORIAL and Korean names are NOT wired by this run");
  }

  return { operations, errors, notes, transition };
}

/** Writes every changed operation. Throws (writing NOTHING) when the plan has errors. */
export function applyPlan(root: string, plan: WirePlan): string[] {
  if (plan.errors.length > 0) throw new WiringError(`refusing to write: ${plan.errors.length} error(s) in the plan`);
  const written: string[] = [];
  for (const op of plan.operations) {
    if (!op.changed) continue;
    const path = join(root, op.file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, op.after, "utf8");
    written.push(op.file);
  }
  return written;
}

function parseArgs(argv: readonly string[]): { opts: Partial<WireOptions>; write: boolean } {
  const get = (flag: string): string | undefined => {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const list = (v: string | undefined) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);
  const num = (v: string | undefined) => (v === undefined ? undefined : Number(v));
  return {
    opts: {
      roster: Number(get("--roster")),
      shipped: list(get("--shipped")),
      held: list(get("--held")),
      afterEligible: num(get("--after-eligible")),
      candidatesAdded: num(get("--candidates-added")),
      draftsDir: get("--drafts-dir"),
      intro: get("--intro"),
    },
    write: argv.includes("--write"),
  };
}

export function formatPlan(plan: WirePlan, write: boolean): string {
  const t = plan.transition;
  const out: string[] = [];
  out.push(write ? "WIRING PLAN (applying)" : "WIRING PLAN (dry run; nothing is written; pass --write to apply)");
  out.push(`roster transition: ${t.before.latestRoster} -> ${t.after.latestRoster}${t.alreadyWired ? " (already wired)" : ""}`);
  out.push(`production ${t.before.production} -> ${t.after.production}; directory-visible ${t.before.directoryVisible} -> ${t.after.directoryVisible}; match-eligible ${t.before.matchEligible} -> ${t.after.matchEligible}; candidate JSON ${t.before.candidateJson} -> ${t.after.candidateJson}`);
  out.push(`shipped ${t.shipped}, held ${t.held}`);
  out.push("operations:");
  for (const op of plan.operations) out.push(`  [${op.changed ? "CHANGE" : "no-op "}] ${op.file}: ${op.description}`);
  for (const n of plan.notes) out.push(`note: ${n}`);
  for (const e of plan.errors) out.push(`ERROR: ${e}`);
  return out.join("\n");
}

function main(argv: readonly string[]): number {
  const { opts, write } = parseArgs(argv);
  const root = process.cwd();
  const plan = planWiring({ ...(opts as WireOptions), root, manifest: CURRENT_ROSTER_MANIFEST });
  console.log(formatPlan(plan, write));
  if (plan.errors.length > 0) return 1;
  if (write) {
    const written = applyPlan(root, plan);
    console.log(`wrote ${written.length} file(s)`);
    console.log("next: tsx src/dev/roster1000/generateRoster" + opts.roster + ".ts; tsx src/dev/generatePeopleIndex.ts; tsx src/dev/calibrate.ts quiz (twice); full Vitest; build.");
    console.log("then: update docs/checkpoints and docs/context/CURRENT_STATE.md by hand (the tool never edits historical docs).");
  }
  return 0;
}

if (process.argv[1] && process.argv[1].endsWith("wireRoster.ts") && process.argv[2]) {
  process.exitCode = main(process.argv.slice(2));
}
