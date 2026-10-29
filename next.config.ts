import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Interactive commerce (cart, accounts, search, admin) is request-time.
  // Cache Components is left off so those routes can prerender without
  // wrapping every client hook in a Suspense boundary.
  images: {
    remotePatterns: [],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
