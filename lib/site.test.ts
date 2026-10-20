import { describe, expect, it } from "vitest";
import { absoluteUrl, createPageMetadata, defaultSiteUrl, resolveSiteUrl, siteConfig } from "./site";

describe("resolveSiteUrl", () => {
  it("uses the verified custom domain by default and preserves an explicit override", () => {
    expect(resolveSiteUrl()).toBe("https://michdmark.com");
    expect(defaultSiteUrl).toBe("https://michdmark.com");
    expect(resolveSiteUrl("https://preview.example.test")).toBe("https://preview.example.test");
  });
});

describe("absoluteUrl", () => {
  it("preserves a configured path prefix for root and nested routes", () => {
    const baseUrl = "https://michdmark.github.io/michdmark-site";

    expect(absoluteUrl("/", baseUrl)).toBe("https://michdmark.github.io/michdmark-site/");
    expect(absoluteUrl("/blog/", baseUrl)).toBe("https://michdmark.github.io/michdmark-site/blog/");
  });

  it("supports a custom domain without a path prefix", () => {
    const baseUrl = "https://michdmark.com";

    expect(absoluteUrl("/", baseUrl)).toBe("https://michdmark.com/");
    expect(absoluteUrl("/blog/", baseUrl)).toBe("https://michdmark.com/blog/");
  });
});

describe("createPageMetadata", () => {
  it.each([
    ["About me", "/about/"],
    ["Blog", "/blog/"],
    ["Proyectos", "/projects/"],
    ["Gadgets", "/setup/"],
  ])("sets route-specific social metadata for %s", (title, canonical) => {
    const description = `Descripción de ${title}`;
    const metadata = createPageMetadata(title, description, canonical);

    expect(metadata).toMatchObject({
      title,
      description,
      alternates: { canonical },
      openGraph: {
        type: "website",
        locale: siteConfig.locale,
        siteName: siteConfig.name,
        url: absoluteUrl(canonical),
        title,
        description,
      },
      twitter: { card: "summary", title, description },
    });
  });
});
