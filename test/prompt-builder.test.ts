import { buildPrompt } from "../src/prompt/builder";
import { expect, test } from "bun:test";

test("diff truncates when over token limit", () => {
  const longDiff = "a".repeat(5000);
  const prompt = buildPrompt({
    title: "Test PR",
    body: "Body",
    diff: longDiff,
    tokenLimit: 100, // ~400 chars allowed
  });
  expect(prompt.includes("(truncated)")).toBe(true);
}); 