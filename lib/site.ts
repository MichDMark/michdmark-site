export const siteConfig = {
  name: "Mich DMark",
  shortName: "Mich",
  description:
    "Mich DMark explora tecnología accesible e inteligencia artificial aplicada a software y hardware, y comparte ideas, proyectos y gadgets.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://michdmark.github.io/michdmark-site",
  author: "Mich DMark",
  locale: "es_MX",
};

export function absoluteUrl(path = "/", baseUrl = siteConfig.url) {
  const base = new URL(baseUrl);
  base.pathname = `${base.pathname.replace(/\/+$/, "")}/`;
  base.search = "";
  base.hash = "";

  return new URL(path.replace(/^\/+/, ""), base).toString();
}
