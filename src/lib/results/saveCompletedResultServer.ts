import "server-only";

/**
 * The real, server-only entry point Stage 9D's Server Action / route caller
 * will invoke — constructs the cookie-bound Supabase server client (only
 * legal from a Server Component/Route Handler/Server Action, see
 * @lib/supabase/server) and delegates to the tested, dependency-injected
 * `saveCompletedResult`. No caller exists yet at Stage 9C; this file
 * establishes the server boundary concretely now rather than deferring it
 * to a comment for Stage 9D to write later. Not unit-tested directly (the
 * `server-only` import makes that impossible under Vitest's Node
 * environment by design) — it has no logic of its own beyond wiring the
 * real client into the already-tested primitive below.
 */
import { createClient } from "@lib/supabase/server";
import { SEED_PEOPLE } from "@data/people/seed";
import { saveCompletedResult, type SaveCompletedResultInput, type SaveCompletedResultOutcome } from "./saveCompletedResult.js";

export async function saveCompletedResultServer(input: SaveCompletedResultInput): Promise<SaveCompletedResultOutcome> {
  const supabase = await createClient();
  return saveCompletedResult(supabase, input, SEED_PEOPLE);
}
