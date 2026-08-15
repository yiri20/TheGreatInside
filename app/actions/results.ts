"use server";

/**
 * The real Server Action both Stage 9D trigger points call — a thin
 * pass-through to the already-built, already-tested
 * `saveCompletedResultServer` (Phase 9 Stage 9C). No logic lives here.
 */
import { saveCompletedResultServer } from "@lib/results/saveCompletedResultServer";
import type { SaveCompletedResultInput, SaveCompletedResultOutcome } from "@lib/results/saveCompletedResult";
import { deleteSavedResultsServerAction } from "@lib/results/deleteSavedResultsServer";
import type { DeleteSavedResultsOutcome } from "@lib/results/deleteSavedResults";

export async function saveCompletedResultAction(input: SaveCompletedResultInput): Promise<SaveCompletedResultOutcome> {
  return saveCompletedResultServer(input);
}

/**
 * Broader Public Launch, Part 6: deletes every saved result belonging to
 * the CURRENTLY SIGNED-IN user (resolved server-side, never from a
 * client-supplied id — see deleteSavedResultsServer.ts). Takes no
 * arguments by design, so there is no id/user parameter a caller could
 * ever get wrong or tamper with.
 */
export async function deleteSavedResultsAction(): Promise<DeleteSavedResultsOutcome> {
  return deleteSavedResultsServerAction();
}
