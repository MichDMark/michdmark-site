export const siteConfig = {
  name: "Mich DMark",
  shortName: "Mich",
  description:
    "Blog personal de Mich sobre desarrollo web, tecnología, gadgets, proyectos personales y creación de contenido.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://michdmark.github.io/michdmark-site",
  author: "Mich DMark",
  locale: "es_MX",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
