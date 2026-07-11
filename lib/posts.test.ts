import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug } from "./posts";

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

describe("posts", () => {
  it("loads markdown posts with required frontmatter", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.slug).toMatch(/^[^/]+$/);
      expect(post.slug).toBe(post.slug.toLowerCase());
      expect(post.slug).not.toContain(" ");
      expect(post.title.trim()).not.toHaveLength(0);
      expect(post.description.trim()).not.toHaveLength(0);
      expect(isIsoDate(post.date)).toBe(true);
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.content.trim()).not.toHaveLength(0);
    }
  });

  it("sorts posts by date from newest to oldest", () => {
    const posts = getAllPosts();
    const dates = posts.map((post) => post.date);
    const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));

    expect(dates).toEqual(sortedDates);
  });

  it("gets a post by slug", () => {
    const [post] = getAllPosts();

    expect(post).toBeDefined();
    expect(getPostBySlug(post.slug)).toMatchObject({
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
    });
  });

  it("returns null for a missing post", () => {
    expect(getPostBySlug("post-inexistente")).toBeNull();
  });
});
