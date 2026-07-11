import { describe, expect, it } from "vitest";
import { gadgets } from "./gadgets";
import { projects } from "./projects";
import { socialLinks } from "./social";

function expectValidHref(href: string) {
  expect(() => new URL(href)).not.toThrow();
}

describe("site data", () => {
  it("has valid social and contact links", () => {
    expect(socialLinks.length).toBeGreaterThan(0);

    const groups = new Set(socialLinks.map((link) => link.group));
    expect(groups).toEqual(new Set(["social", "contact"]));

    for (const link of socialLinks) {
      expect(link.name.trim()).not.toHaveLength(0);
      expect(link.icon).toBeDefined();
      expect(["social", "contact"]).toContain(link.group);
      expectValidHref(link.href);
    }
  });

  it("has valid projects", () => {
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.name.trim()).not.toHaveLength(0);
      expect(project.description.trim()).not.toHaveLength(0);
      expect(project.stack.length).toBeGreaterThan(0);
      expectValidHref(project.url);
    }
  });

  it("has valid gadget categories and items", () => {
    expect(gadgets.length).toBeGreaterThan(0);

    for (const category of gadgets) {
      expect(category.title.trim()).not.toHaveLength(0);
      expect(category.items.length).toBeGreaterThan(0);

      for (const item of category.items) {
        expect(item.name.trim()).not.toHaveLength(0);
        expect(item.description.trim()).not.toHaveLength(0);

        if (item.link) {
          expectValidHref(item.link);
        }
      }
    }
  });
});
