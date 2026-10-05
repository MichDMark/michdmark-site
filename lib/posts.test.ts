import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug } from "./posts";

const fixtureDirectories: string[] = [];

function createPostsFixture() {
  const directory = mkdtempSync(path.join(tmpdir(), "mich-posts-test-"));
  fixtureDirectories.push(directory);

  writeFileSync(
    path.join(directory, "post-anterior.md"),
    `---
title: "Post anterior"
description: "Descripción anterior"
date: "2024-01-10"
tags: ["Software"]
---
Contenido del post anterior.
`,
  );
  writeFileSync(
    path.join(directory, "post-reciente.md"),
    `---
title: "Post reciente"
description: "Descripción reciente"
date: "2024-02-15"
tags: ["IA", "Hardware"]
---
Contenido del post reciente.
`,
  );

  return directory;
}

afterEach(() => {
  for (const directory of fixtureDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe("posts", () => {
  it("loads fixture markdown, sorts by date, and gets a post by slug", () => {
    const directory = createPostsFixture();
    const posts = getAllPosts(directory);

    expect(posts.map((post) => post.slug)).toEqual(["post-reciente", "post-anterior"]);
    expect(posts[0]).toMatchObject({
      title: "Post reciente",
      date: "2024-02-15",
      description: "Descripción reciente",
      tags: ["IA", "Hardware"],
      content: "Contenido del post reciente.\n",
    });
    expect(getPostBySlug("post-anterior", directory)).toMatchObject({
      slug: "post-anterior",
      title: "Post anterior",
      date: "2024-01-10",
    });
    expect(getPostBySlug("post-inexistente", directory)).toBeNull();
  });
});
