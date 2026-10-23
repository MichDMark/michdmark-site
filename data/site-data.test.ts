import { describe, expect, it } from "vitest";
import { gadgets, gadgetWorkflows } from "./gadgets";
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

  it("has valid projects with workbench blocks and milestones", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);

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
    }
  });

  it("has valid gadget categories, datasheets, and workflows", () => {
    expect(Array.isArray(gadgets)).toBe(true);
    expect(gadgets.length).toBeGreaterThan(0);

    const gadgetIds = new Set<string>();

    for (const category of gadgets) {
      expect(category.id.trim()).not.toHaveLength(0);
      expect(category.title.trim()).not.toHaveLength(0);
      expect(category.items.length).toBeGreaterThan(0);

      for (const item of category.items) {
        gadgetIds.add(item.id);
        expect(item.id.trim()).not.toHaveLength(0);
        expect(item.name.trim()).not.toHaveLength(0);
        expect(item.role.trim()).not.toHaveLength(0);
        expect(item.description.trim()).not.toHaveLength(0);
        expect(item.specs.length).toBeGreaterThan(0);
        expect(item.pros.length).toBeGreaterThan(0);
        expect(item.limit.trim()).not.toHaveLength(0);

        if (item.link) {
          expectValidHref(item.link);
        }
      }
    }

    for (const workflow of gadgetWorkflows) {
      expect(workflow.id.trim()).not.toHaveLength(0);
      expect(workflow.title.trim()).not.toHaveLength(0);
      expect(workflow.steps.length).toBeGreaterThan(0);
      for (const id of workflow.gadgetIds) {
        expect(gadgetIds.has(id)).toBe(true);
      }
    }
  });
});
