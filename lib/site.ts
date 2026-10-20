import type { Metadata } from "next";

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
