import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug } from "./posts";

const fixtureRoots: string[] = [];

function createFixture() {
  const root = mkdtempSync(path.join(tmpdir(), "mich-posts-test-"));
  fixtureRoots.push(root);
  const directory = path.join(root, "posts");
  mkdirSync(directory);
  return { root, directory };
}

function writePost(directory: string, slug: string, source: string) {
  writeFileSync(path.join(directory, `${slug}.md`), source);
}

function postSource({
  title = 'title: "A title"',
  description = 'description: "A description"',
  date = "date: 2024-02-29",
  tags = 'tags: ["Software"]',
  body = "Post body.\n",
}: { title?: string; description?: string; date?: string; tags?: string; body?: string } = {}) {
  return `---\n${title}\n${description}\n${date}\n${tags}\n---\n${body}`;
}

afterEach(() => {
  for (const root of fixtureRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("posts", () => {
  it("validates YAML dates as ISO strings and sorts by date then slug", () => {
    const { directory } = createFixture();
    writePost(directory, "zeta", postSource({ date: "date: 2024-03-01", tags: "" }));
    writePost(directory, "beta", postSource({ date: 'date: "2024-03-01"' }));
    writePost(directory, "alpha", postSource({ date: "date: 2024-03-01" }));
    writePost(directory, "older", postSource({ date: 'date: "2024-02-29"' }));

    const posts = getAllPosts(directory);

    expect(posts.map((post) => post.slug)).toEqual(["alpha", "beta", "zeta", "older"]);
    expect(posts[0]).toMatchObject({ date: "2024-03-01", tags: ["Software"] });
    expect(posts[2]).toMatchObject({ date: "2024-03-01", tags: [] });
    expect(getPostBySlug("older", directory)).toMatchObject({ date: "2024-02-29" });
  });

  it("preserves Markdown body line endings and parses multiline YAML fields", () => {
    const { directory } = createFixture();
    writePost(
      directory,
      "multiline",
      "---\r\ntitle: Multiline\r\ndescription: >-\r\n  first line\r\n  second line\r\ndate: 2024-01-02\r\ntags:\r\n  - IA\r\n---\r\n\r\n# Heading\r\nBody.\r\n",
    );

    expect(getPostBySlug("multiline", directory)).toMatchObject({
      description: "first line second line",
      date: "2024-01-02",
      tags: ["IA"],
      content: "\r\n# Heading\r\nBody.\r\n",
    });
  });

  it.each([
    ["missing opening delimiter", "title: T\ndate: 2024-01-01\n"],
    ["missing closing delimiter", "---\ntitle: T\n"],
    ["malformed YAML", "---\ntitle: [broken\n---\nBody\n"],
    ["empty title", postSource({ title: 'title: "  "' })],
    ["non-string title", postSource({ title: "title: 42" })],
    ["non-string description", postSource({ description: "description: false" })],
    ["impossible date", postSource({ date: "date: 2026-02-30" })],
    ["invalid date format", postSource({ date: 'date: "2026-2-03"' })],
    ["scalar tags", postSource({ tags: "tags: Blog" })],
    ["non-string tag", postSource({ tags: "tags: [Blog, 42]" })],
  ])("rejects %s consistently through both post APIs", (_label, source) => {
    const { directory } = createFixture();
    writePost(directory, "invalid-post", source);

    expect(() => getAllPosts(directory)).toThrow(/invalid-post\.md/);
    expect(() => getPostBySlug("invalid-post", directory)).toThrow(/invalid-post\.md/);
  });

  it("rejects invalid dates with the field name and file", () => {
    const { directory } = createFixture();
    writePost(directory, "bad-date", postSource({ date: "date: 2026-13-45" }));

    expect(() => getAllPosts(directory)).toThrow(/bad-date\.md.*date/);
  });

  it("returns no posts for an absent directory and ignores non-Markdown files", () => {
    const { directory } = createFixture();
    writeFileSync(path.join(directory, "notes.txt"), postSource());
    mkdirSync(path.join(directory, "archive.md"));

    expect(getAllPosts(path.join(directory, "missing"))).toEqual([]);
    expect(getAllPosts(directory)).toEqual([]);
  });

  it("returns null for traversal, absolute paths, separators, and missing slugs", () => {
    const { root, directory } = createFixture();
    writePost(root, "secret", postSource());

    for (const slug of ["../secret", "/secret", "nested/post", "nested\\post", ".", "..", "missing"]) {
      expect(getPostBySlug(slug, directory)).toBeNull();
    }
  });
});
