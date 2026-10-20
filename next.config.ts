import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["127.0.0.1"],
  agentRules: false,
  trailingSlash: true,
  images: { unoptimized: true },
  // 👇 IMPORTANTE: con dominio custom, NO uses basePath/assetPrefix
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
