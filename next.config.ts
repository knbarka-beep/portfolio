import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is off on purpose: every page is plain static HTML built once, see docs/decisions.md.
  images: { formats: ["image/avif", "image/webp"] },
  experimental: { globalNotFound: true },
  // The dev fallback in app/api/cv/route.ts reads private/cv-<lang>.pdf. Never trace those files into the build.
  outputFileTracingExcludes: { "/*": ["./private/**/*"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
