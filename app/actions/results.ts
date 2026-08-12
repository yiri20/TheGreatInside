"use server";

/**
 * The real Server Action both Stage 9D trigger points call — a thin
 * pass-through to the already-built, already-tested
 * `saveCompletedResultServer` (Phase 9 Stage 9C). No logic lives here.
 */
import { saveCompletedResultServer } from "@lib/results/saveCompletedResultServer";
import type { SaveCompletedResultInput, SaveCompletedResultOutcome } from "@lib/results/saveCompletedResult";

export async function saveCompletedResultAction(input: SaveCompletedResultInput): Promise<SaveCompletedResultOutcome> {
  return saveCompletedResultServer(input);
}
