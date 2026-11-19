import { describe, expect, it } from "vitest";
import { askQuestion, hasExternalApi } from "@/lib/ask-client";

describe("ask-client", () => {
  it("answers through local retrieval when no external API is configured", async () => {
    expect(hasExternalApi()).toBe(false);

    const response = await askQuestion("沙坡头怎么玩？门票多少？");

    expect(response.mode).toBe("retrieval");
    expect(response.answer).toContain("沙坡头");
    expect(response.citations.length).toBeGreaterThan(0);
  });
});
