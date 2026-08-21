import { describe, expect, it, vi } from "vitest";
import { logFunnelEvent, CLIENT_LOGGABLE_EVENT_TYPES } from "./funnelEvents";

describe("logFunnelEvent", () => {
  it("accepts every client-loggable event type", async () => {
    for (const eventType of CLIENT_LOGGABLE_EVENT_TYPES) {
      const insert = vi.fn(async () => ({ ok: true }));
      const result = await logFunnelEvent(
        { insertEvent: insert },
        { eventType, userId: "user-1", locale: "en-US", resultToken: "quiz_v2.abc" },
      );
      expect(result).toEqual({ ok: true });
      expect(insert).toHaveBeenCalledWith({ name: eventType, userId: "user-1", locale: "en-US", resultToken: "quiz_v2.abc" });
    }
  });

  it("rejects any event type outside the allowlist, including the purchase-completed event", async () => {
    const insert = vi.fn(async () => ({ ok: true }));
    const result = await logFunnelEvent(
      { insertEvent: insert },
      { eventType: "deep_report_purchase_completed", userId: "user-1", locale: "en-US", resultToken: undefined },
    );
    expect(result).toEqual({ ok: false, reason: "unknown_event_type" });
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects an arbitrary/forged event type", async () => {
    const insert = vi.fn(async () => ({ ok: true }));
    const result = await logFunnelEvent(
      { insertEvent: insert },
      { eventType: "totally_made_up_event", userId: undefined, locale: "en-US", resultToken: undefined },
    );
    expect(result).toEqual({ ok: false, reason: "unknown_event_type" });
    expect(insert).not.toHaveBeenCalled();
  });

  it("allows an anonymous (signed-out) event — userId undefined", async () => {
    const insert = vi.fn(async () => ({ ok: true }));
    const result = await logFunnelEvent(
      { insertEvent: insert },
      { eventType: "deep_report_result_viewed", userId: undefined, locale: "ko-KR", resultToken: "quiz_v2.abc" },
    );
    expect(result).toEqual({ ok: true });
  });

  it("surfaces a DB failure as a typed error", async () => {
    const result = await logFunnelEvent(
      { insertEvent: async () => ({ ok: false }) },
      { eventType: "deep_report_cta_clicked", userId: "user-1", locale: "en-US", resultToken: undefined },
    );
    expect(result).toEqual({ ok: false, reason: "db_error" });
  });
});
