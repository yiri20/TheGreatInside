"use client";

/**
 * Invisible client island: mirrors the current, successfully-decoded result
 * token to localStorage so a LATER visit to any person page (not just one
 * reached by clicking through from this results page) can offer "Compare
 * yourself with this person" without needing the token to travel via URL.
 * Same mechanism family as the Phase 6 quiz draft (`tgi_quiz_draft_v1`) —
 * see `CompareCta.tsx` for the reader side.
 */
import { useEffect } from "react";

export const LAST_RESULT_KEY = "tgi_last_result_v1";

export function SaveLastResult({ token }: { token: string }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(LAST_RESULT_KEY, token);
    } catch {
      // Private browsing / quota failures are non-fatal — the "compare"
      // entry point just won't be offered on other pages this session.
    }
  }, [token]);
  return null;
}
