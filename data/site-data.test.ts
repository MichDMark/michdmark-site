import { describe, expect, it } from "vitest";
import { gadgets } from "./gadgets";
import { projects } from "./projects";
import { socialLinks } from "./social";
import { getPostBySlug } from "../lib/posts";

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

  it("has valid projects with visible architecture, scenarios, and milestones", () => {
    expect(Array.isArray(projects)).toBe(true);

    for (const project of projects) {
      expect(project.id.trim()).not.toHaveLength(0);
      expect(project.name.trim()).not.toHaveLength(0);
      expect(project.tagline.trim()).not.toHaveLength(0);
      expect(project.description.trim()).not.toHaveLength(0);
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.blocks.length).toBeGreaterThan(0);
      expect(project.milestones.length).toBeGreaterThan(0);
      expectValidHref(project.url);
      if (project.relatedPostSlug) {
        expect(getPostBySlug(project.relatedPostSlug)).not.toBeNull();
      }
      for (const gadgetId of project.gadgetIds ?? []) {
        expect(gadgets.flatMap((category) => category.items).some((item) => item.id === gadgetId)).toBe(true);
      }
    }
  });

  it("has valid gadget categories and datasheets connected to projects and Bitácora", () => {
    expect(Array.isArray(gadgets)).toBe(true);

    for (const category of gadgets) {
      expect(category.id.trim()).not.toHaveLength(0);
      expect(category.title.trim()).not.toHaveLength(0);
      expect(category.items.length).toBeGreaterThan(0);

      for (const item of category.items) {
        expect(item.id.trim()).not.toHaveLength(0);
        expect(item.name.trim()).not.toHaveLength(0);
        expect(item.role.trim()).not.toHaveLength(0);
        expect(item.description.trim()).not.toHaveLength(0);
        expect(item.specs.length).toBeGreaterThan(0);
        expect(item.pros.length).toBeGreaterThan(0);
        expect(item.limit.trim()).not.toHaveLength(0);
        expect(item.configSnippet).toBeDefined();
        expect(item.configSnippet?.code.trim()).not.toBe("");
        if (item.relatedPostSlug) {
          expect(getPostBySlug(item.relatedPostSlug)).not.toBeNull();
        }
        for (const projectId of item.projectIds ?? []) {
          expect(projects.some((project) => project.id === projectId)).toBe(true);
        }

        if (item.link) {
          expectValidHref(item.link);
        }
      }
    }

  });
});
