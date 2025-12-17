import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // 👇 IMPORTANTE: con dominio custom, NO uses basePath/assetPrefix
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;