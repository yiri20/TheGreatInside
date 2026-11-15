/**
 * Source-hygiene guard: tracked TypeScript/JavaScript sources must not contain stray control characters.
 *
 * Why: the per-roster audits of Roster42-66 each carry a duplicated `RAW_ID` guard whose `\b` word boundaries were
 * corrupted into literal 0x08 backspace characters by an authoring-tool escape collapse, so those guards silently
 * never matched (found in the Roster67 repair). The same collapse can also turn `\n` into a real newline inside a
 * string. This test makes that whole class of corruption visible the moment it is introduced.
 *
 * RATCHET: the 25 historical audits below are a frozen baseline (they remain as historical records; the
 * forward-looking raw-id rule is owned by the shared guard in `editorialValidation.test.ts` / `editorialRawIds.ts`,
 * which supersedes those duplicated, dead regexes). Any file NOT on this list that contains a control character
 * fails. The baseline may shrink (fix a file, remove its entry) but never grow, and a baseline file may contain
 * ONLY the 0x08 backspace character.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const BASELINE_BACKSPACE_ONLY = new Set<string>(
  Array.from({ length: 25 }, (_, i) => `src/dev/roster1000/audits/roster${42 + i}.test.ts`),
);

const SCANNED_EXTENSIONS = [".ts", ".tsx", ".mjs", ".js"];

/** Control characters other than tab, line feed and carriage return. */
export function controlCharacterCodes(text: string): number[] {
  const found = new Set<number>();
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) found.add(code);
  }
  return [...found].sort((a, b) => a - b);
}

function trackedSourceFiles(): string[] {
  const out = execFileSync("git", ["ls-files", "src", "e2e", "app"], { encoding: "utf8" });
  return out.split("\n").filter((f) => SCANNED_EXTENSIONS.some((ext) => f.endsWith(ext)));
}

describe("controlCharacterCodes (the detector itself)", () => {
  it("finds a backspace and ignores tab, newline and carriage return", () => {
    expect(controlCharacterCodes("a" + String.fromCharCode(8) + "b")).toEqual([8]);
    expect(controlCharacterCodes("tab\there\nline\r\nend")).toEqual([]);
    expect(controlCharacterCodes("plain text with an apostrophe's and unicode 한국어")).toEqual([]);
  });
});

describe("no stray control characters in tracked sources", () => {
  const files = trackedSourceFiles();

  it("scans a realistic number of tracked source files", () => {
    expect(files.length).toBeGreaterThan(300);
  });

  it("no file outside the frozen historical baseline contains a control character", () => {
    const offenders: string[] = [];
    for (const file of files) {
      if (BASELINE_BACKSPACE_ONLY.has(file)) continue;
      const codes = controlCharacterCodes(readFileSync(file, "utf8"));
      if (codes.length > 0) offenders.push(`${file}: ${codes.join(",")}`);
    }
    expect(offenders).toEqual([]);
  });

  it("baseline files contain only the known 0x08 corruption (nothing new hiding inside them)", () => {
    for (const file of BASELINE_BACKSPACE_ONLY) {
      if (!files.includes(file)) continue; // a removed/renamed file simply leaves the baseline
      const codes = controlCharacterCodes(readFileSync(file, "utf8"));
      expect(codes.filter((c) => c !== 8), file).toEqual([]);
    }
  });
});
