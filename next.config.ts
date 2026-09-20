import type { NextConfig } from "next";

// Static export: `next build` writes the whole site to out/, which is what
// Cloudflare Pages serves. Trailing slashes give /ja/support/ → ja/support/index.html.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
