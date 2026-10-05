import { describe, expect, it } from "vitest";
import { absoluteUrl } from "./site";

describe("absoluteUrl", () => {
  it("preserves a configured path prefix for root and nested routes", () => {
    const baseUrl = "https://michdmark.github.io/michdmark-site";

    expect(absoluteUrl("/", baseUrl)).toBe("https://michdmark.github.io/michdmark-site/");
    expect(absoluteUrl("/blog/", baseUrl)).toBe("https://michdmark.github.io/michdmark-site/blog/");
  });

  it("supports a custom domain without a path prefix", () => {
    const baseUrl = "https://michdmark.dev";

    expect(absoluteUrl("/", baseUrl)).toBe("https://michdmark.dev/");
    expect(absoluteUrl("/blog/", baseUrl)).toBe("https://michdmark.dev/blog/");
  });
});
