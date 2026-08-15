"use client";

/**
 * The production quiz flow (Phase 6; screen grouping added Phase 6.6 Stage
 * 10A). Answers are kept in React state and mirrored to localStorage so a
 * refresh or accidental navigation doesn't lose progress. Finishing encodes
 * the answers into a single URL token (`src/core/quiz/serialize.ts`) and
 * navigates to `/${locale}/results?r=...` — no account, no server
 * round-trip: the results page recomputes everything from that token alone.
 *
 * STRICT BOUNDARY: this file only collects a value per question and renders
 * it. `scoreQuiz` (called on the results page) is the only place answers are
 * interpreted into trait scores. The 64 questions, their order, wording, and
 * mappings are entirely unchanged by Stage 10A — `buildQuizScreens`
 * (`@ui/lib/quizScreens`) only decides how many of them appear on one
 * screen at a time; the flat answer list this page produces is identical
 * either way.
 *
 * POST-10D STAGE A: extracted from `page.tsx` unchanged (interactive quiz
 * state can't live in a Server Component) so `page.tsx` can become a thin
 * Server Component owning `generateMetadata` — see the matching comment on
 * `people/PeopleDirectoryClient.tsx`. `locale` is now a prop instead of
 * `useParams()`. No UI, behavior, or route-shape change.
 */
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@core/types";
import { t } from "@core/i18n/index";
import { orderedQuestions, QUIZ, QUIZ_VERSION } from "@core/quiz/bank";
import { encodeResultToken } from "@core/quiz/serialize";
import type { QuizQuestion, QuizResponse } from "@core/quiz/types";
import { buildQuizScreens } from "@ui/lib/quizScreens";
import { enqueuePendingOwnResult } from "@lib/results/pendingOwnResults";
import { processPendingResults } from "@lib/results/processPendingResults";
// Compact, client-safe projection — see src/core/people/personIndex.ts.
import { PEOPLE_INDEX } from "@data/people/peopleIndex.generated";
import { expandPeopleIndex } from "@core/people/personIndex";
import { saveCompletedResultAction } from "../../actions/results.js";
import {
  Button,
  ChoiceGroup,
  Cluster,
  Divider,
  Eyebrow,
  Heading,
  LikertScale,
  QuizProgress,
  Stack,
  Text,
} from "@ui/index";

/** Section-grouped display order — see `orderedQuestions`'s doc comment in
 *  bank.ts for why this must not be `QUIZ.questions` (raw authoring order). */
const ORDERED_QUESTIONS = orderedQuestions(QUIZ);
const QUESTIONS_BY_ID = new Map(ORDERED_QUESTIONS.map((q) => [q.id, q]));
/** 1-indexed flat position of each question, for the "Question N of 64" /
 *  "Questions N–M of 64" progress label — independent of screen grouping. */
const QUESTION_POSITION = new Map(ORDERED_QUESTIONS.map((q, i) => [q.id, i + 1]));
/** Presentation-only grouping (Stage 10A) — see quizScreens.ts. Computed
 *  once at module load, same as ORDERED_QUESTIONS above. */
const SCREENS = buildQuizScreens(QUIZ);
/** Expanded once at module load (not per quiz completion) — see
 *  src/core/people/personIndex.ts's doc comment for why PEOPLE_INDEX
 *  itself is tuple-encoded and needs this expansion before
 *  enqueuePendingOwnResult (via personDataFingerprint) can read it. */
const FINGERPRINTABLE_PEOPLE = expandPeopleIndex(PEOPLE_INDEX);

const DRAFT_KEY = "tgi_quiz_draft_v1";

interface Draft {
  quizVersion: string;
  responses: QuizResponse[];
}

function loadDraft(): Draft | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<Draft>;
    // Deliberately does not read/require a stored `index`/`screenIndex` —
    // resume position is derived from `responses` alone (see
    // `screenIndexForResume` below), so an old-format draft (which also had
    // an `index` field, from before Stage 10A) still loads correctly: the
    // extra field is simply ignored, not a compatibility break. A draft
    // saved under a DIFFERENT quizVersion (e.g. a stale quiz_v1 draft) is
    // rejected here exactly as before.
    if (parsed.quizVersion !== QUIZ_VERSION || !Array.isArray(parsed.responses)) return undefined;
    return { quizVersion: parsed.quizVersion, responses: parsed.responses };
  } catch {
    return undefined;
  }
}

function saveDraft(draft: Draft): void {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Private-browsing/quota failures are non-fatal: progress just won't
    // survive a refresh this session. Nothing else depends on this write.
  }
}

function clearDraft(): void {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // see saveDraft
  }
}

/** First screen (in authored order) with at least one unanswered question —
 *  derived purely from `responses`, never from a stored position pointer.
 *  This is what "resume remains answer-based" (Stage 10A rule 8) means
 *  concretely: immune to a future regrouping changing what a stored screen
 *  index would even mean. */
function screenIndexForResume(responses: readonly QuizResponse[]): number {
  const answeredIds = new Set(responses.map((r) => r.questionId));
  const idx = SCREENS.findIndex((s) => s.questionIds.some((id) => !answeredIds.has(id)));
  return idx === -1 ? Math.max(0, SCREENS.length - 1) : idx;
}

type Stage = "loading" | "resume" | "intro" | "question";

export function QuizClient({ locale }: { locale: Locale }) {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("loading");
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [screenIndex, setScreenIndex] = useState(0);
  const [pendingDraft, setPendingDraft] = useState<Draft | undefined>(undefined);

  // Resolve initial stage from any saved draft. Runs once, client-only —
  // localStorage does not exist during SSR/the first paint, so this cannot
  // run during render without a hydration mismatch.
  useEffect(() => {
    const draft = loadDraft();
    if (draft && draft.responses.length > 0) {
      setPendingDraft(draft);
      setStage("resume");
    } else {
      setStage("intro");
    }
  }, []);

  const total = ORDERED_QUESTIONS.length;
  const screen = SCREENS[screenIndex];
  const screenQuestions: QuizQuestion[] = screen
    ? screen.questionIds.map((id) => QUESTIONS_BY_ID.get(id)!).filter(Boolean)
    : [];
  const responseMap = useMemo(() => new Map(responses.map((r) => [r.questionId, r.value])), [responses]);
  const firstQuestion = screenQuestions[0];
  const section = firstQuestion ? QUIZ.sections.find((s) => s.id === firstQuestion.sectionId) : undefined;
  const sectionIndex = section ? QUIZ.sections.findIndex((s) => s.id === section.id) : -1;

  function persist(nextResponses: QuizResponse[]) {
    saveDraft({ quizVersion: QUIZ_VERSION, responses: nextResponses });
  }

  function setAnswer(questionId: string, value: string | number) {
    const next = [...responses.filter((r) => r.questionId !== questionId), { questionId, value }];
    setResponses(next);
    persist(next);
  }

  function goNext() {
    if (screenIndex + 1 >= SCREENS.length) {
      const token = encodeResultToken(responses, QUIZ);
      // The ONE place in the app where "this browser actually completed
      // the quiz" is true — see pendingOwnResults.ts's module doc for why
      // this must not be conflated with tgi_last_result_v1 (last result
      // VIEWED, which may belong to someone else via a shared link).
      enqueuePendingOwnResult(token, FINGERPRINTABLE_PEOPLE);
      // Covers "already signed in, just finished the quiz" — the OTHER
      // real trigger (post-sign-in migration) never reaches this file at
      // all; see PendingResultsSync.tsx. Fire-and-forget: this is
      // background housekeeping, never something the quiz-completion flow
      // waits on or surfaces an error for — but a thrown error must still
      // be caught, not left as a silent unhandled rejection (2026-08 fix).
      processPendingResults(saveCompletedResultAction).catch((err: unknown) => {
        console.error(
          "[quiz/goNext] processPendingResults threw before completing:",
          err instanceof Error ? err.message : String(err),
        );
      });
      clearDraft();
      router.push(`/${locale}/results?r=${encodeURIComponent(token)}`);
      return;
    }
    setScreenIndex(screenIndex + 1);
    window.scrollTo({ top: 0 });
  }

  function goBack() {
    if (screenIndex === 0) return;
    setScreenIndex(screenIndex - 1);
    window.scrollTo({ top: 0 });
  }

  if (stage === "loading") return null;

  if (stage === "resume" && pendingDraft) {
    return (
      <main className="tgi-container" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "site.name")}</Eyebrow>
          <Heading level={1}>{t(locale, "quiz.resume.title")}</Heading>
          <Text tone="secondary">
            {t(locale, "quiz.resume.body", { count: pendingDraft.responses.length, total })}
          </Text>
          <Cluster gap={3}>
            <Button
              size="lg"
              onClick={() => {
                setResponses(pendingDraft.responses);
                setScreenIndex(screenIndexForResume(pendingDraft.responses));
                setStage("question");
              }}
            >
              {t(locale, "quiz.resume.continue")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                clearDraft();
                setResponses([]);
                setScreenIndex(0);
                setStage("intro");
              }}
            >
              {t(locale, "quiz.resume.restart")}
            </Button>
          </Cluster>
        </Stack>
      </main>
    );
  }

  if (stage === "intro") {
    return (
      <main className="tgi-container" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <Stack gap={5} className="tgi-measure-stack">
          <Eyebrow>{t(locale, "quiz.intro.eyebrow")}</Eyebrow>
          <Heading level={1}>{t(locale, "quiz.intro.title")}</Heading>
          <Text tone="secondary">{t(locale, "quiz.intro.body")}</Text>
          <Text tone="muted">{t(locale, "quiz.intro.privacy")}</Text>
          <div>
            <Button size="lg" onClick={() => setStage("question")}>
              {t(locale, "quiz.intro.start")}
            </Button>
          </div>
        </Stack>
      </main>
    );
  }

  if (screenQuestions.length === 0) return null;

  const sectionLabel =
    section && sectionIndex >= 0
      ? t(locale, "quiz.progress.section", {
          index: sectionIndex + 1,
          sectionTotal: QUIZ.sections.length,
          name: t(locale, section.titleKey as never),
        })
      : "";

  const positions = screenQuestions.map((q) => QUESTION_POSITION.get(q.id) ?? 0);
  const from = Math.min(...positions);
  const to = Math.max(...positions);
  const allAnswered = screenQuestions.every((q) => responseMap.get(q.id) !== undefined);

  return (
    <main className="tgi-container" style={{ paddingTop: "2.5rem", paddingBottom: "6rem" }}>
      <Stack gap={6} className="tgi-measure-stack">
        <QuizProgress from={from} to={to} total={total} sectionLabel={sectionLabel} locale={locale} />

        <Stack gap={6}>
          {screenQuestions.map((question, i) => {
            const prompt = t(locale, question.promptKey as never);
            const currentValue = responseMap.get(question.id);
            return (
              <Stack gap={5} key={question.id}>
                {i > 0 ? <Divider /> : null}
                <Heading level={2}>{prompt}</Heading>
                {question.format === "likert7" ? (
                  <LikertScale
                    questionId={question.id}
                    prompt={prompt}
                    value={typeof currentValue === "number" ? currentValue : undefined}
                    onChange={(value) => setAnswer(question.id, value)}
                    locale={locale}
                    leftAnchor={question.leftAnchorKey ? t(locale, question.leftAnchorKey as never) : undefined}
                    rightAnchor={question.rightAnchorKey ? t(locale, question.rightAnchorKey as never) : undefined}
                  />
                ) : (
                  <ChoiceGroup
                    questionId={question.id}
                    prompt={prompt}
                    value={typeof currentValue === "string" ? currentValue : undefined}
                    onChange={(value) => setAnswer(question.id, value)}
                    options={(question.options ?? []).map((o) => ({
                      id: o.id,
                      label: t(locale, o.labelKey as never),
                    }))}
                  />
                )}
              </Stack>
            );
          })}
        </Stack>

        <Stack gap={2}>
          <Cluster gap={3} between>
            <Button variant="secondary" onClick={goBack} disabled={screenIndex === 0}>
              {t(locale, "quiz.nav.back")}
            </Button>
            <Button onClick={goNext} disabled={!allAnswered}>
              {screenIndex + 1 >= SCREENS.length ? t(locale, "quiz.nav.see_results") : t(locale, "quiz.nav.next")}
            </Button>
          </Cluster>
          {!allAnswered ? <Text tone="muted">{t(locale, "quiz.nav.required")}</Text> : null}
        </Stack>
      </Stack>
    </main>
  );
}
