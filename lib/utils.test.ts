import { describe, expect, it } from "vitest";
import { countWords, estimateReadingTime, toSlug } from "@/lib/utils";

describe("utils", () => {
  it("counts markdown words without punctuation noise", () => {
    expect(countWords("# Hello\n\n- one\n- two\n\n`code`")).toBe(4);
  });

  it("returns a minimum reading time of one minute", () => {
    expect(estimateReadingTime("short note")).toBe(1);
  });

  it("creates stable slugs", () => {
    expect(toSlug(" VaultNote Security Model ")).toBe("vaultnote-security-model");
  });
});
