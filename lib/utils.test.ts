import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("flex", false && "hidden", "items-center")).toBe("flex items-center");
  });

  it("merges conflicting Tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });
});
