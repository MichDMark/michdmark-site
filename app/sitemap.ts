import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/blog/"), lastModified: now, priority: 0.8 },
    { url: absoluteUrl("/projects/"), lastModified: now, priority: 0.7 },
    { url: absoluteUrl("/setup/"), lastModified: now, priority: 0.7 },
    { url: absoluteUrl("/about/"), lastModified: now, priority: 0.6 },
  ];

  const postRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}/`),
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
