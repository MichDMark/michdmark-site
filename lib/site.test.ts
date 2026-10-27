import { describe, expect, it } from "vitest";
import { absoluteUrl, buildLlmsTxt, createPageMetadata, defaultSiteUrl, resolveSiteUrl, siteConfig } from "./site";

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
    ["Projects", "/projects/"],
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

describe("buildLlmsTxt", () => {
  it("lists absolute section URLs and marks empty collections as coming soon", () => {
    const llmsTxt = buildLlmsTxt();

    expect(llmsTxt).toContain("# Mich DMark");
    expect(llmsTxt).toContain("> Sitio personal estático sobre tecnología accesible y el uso de agentes en software y hardware.");
    expect(llmsTxt).toContain("## Secciones principales");
    expect(llmsTxt).toContain(`- [Inicio](${absoluteUrl("/")})`);
    expect(llmsTxt).toContain(`- [Blog](${absoluteUrl("/blog/")})`);
    expect(llmsTxt).toContain(`- [Projects](${absoluteUrl("/projects/")})`);
    expect(llmsTxt).toContain(`- [Gadgets](${absoluteUrl("/setup/")})`);
    expect(llmsTxt).toContain(`- [About me](${absoluteUrl("/about/")})`);

    expect(llmsTxt).toContain("## Blog\n- Próximamente.");
    expect(llmsTxt).toContain("## Projects\n- Próximamente.");
    expect(llmsTxt).toContain("## Gadgets\n- Próximamente.");
  });
});
