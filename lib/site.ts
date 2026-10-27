import type { Metadata } from "next";
import { gadgets } from "../data/gadgets";
import { projects } from "../data/projects";
import { getAllPosts } from "./posts";

export const defaultSiteUrl = "https://michdmark.com";

export function resolveSiteUrl(override?: string) {
  return override ?? defaultSiteUrl;
}

export const siteConfig = {
  name: "Mich DMark",
  shortName: "Mich",
  description:
    "Mich DMark explora tecnología accesible y el uso de agentes en software y hardware, y comparte ideas, proyectos y gadgets.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  author: "Mich DMark",
  locale: "es_MX",
};

export function createPageMetadata(title: string, description: string, canonical: string): Metadata {
  const url = absoluteUrl(canonical);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export function absoluteUrl(path = "/", baseUrl = siteConfig.url) {
  const base = new URL(baseUrl);
  base.pathname = `${base.pathname.replace(/\/+$/, "")}/`;
  base.search = "";
  base.hash = "";

  return new URL(path.replace(/^\/+/, ""), base).toString();
}

export function buildLlmsTxt() {
  const posts = getAllPosts();
  const gadgetItems = gadgets.flatMap((category) => category.items);
  const sections = [
    "# Mich DMark",
    "> Sitio personal estático sobre tecnología accesible y el uso de agentes en software y hardware.",
    "",
    "## Secciones principales",
    `- [Inicio](${absoluteUrl("/")})`,
    `- [Blog](${absoluteUrl("/blog/")})`,
    `- [Projects](${absoluteUrl("/projects/")})`,
    `- [Gadgets](${absoluteUrl("/setup/")})`,
    `- [About me](${absoluteUrl("/about/")})`,
    "",
    "## Blog",
    ...(posts.length
      ? posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}/`)}) — ${post.description}`)
      : ["- Próximamente."]),
    "",
    "## Projects",
    ...(projects.length
      ? projects.map((project) => `- [${project.name}](${absoluteUrl(`/projects/#${project.id}`)}) — ${project.description}`)
      : ["- Próximamente."]),
    "",
    "## Gadgets",
    ...(gadgetItems.length
      ? gadgetItems.map((gadget) => `- [${gadget.name}](${absoluteUrl(`/setup/#${gadget.id}`)}) — ${gadget.role}`)
      : ["- Próximamente."]),
  ];

  return `${sections.join("\n")}\n`;
}
