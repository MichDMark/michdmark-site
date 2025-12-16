import type { NextConfig } from "next";

const repoName = "michdmark-site";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",          // genera sitio estático en /out
  trailingSlash: true,       // /blog/ -> out/blog/index.html (mejor para Pages)
  images: {
    unoptimized: true,       // requerido en static export (sin optimizer)
  },
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
};

export default nextConfig;