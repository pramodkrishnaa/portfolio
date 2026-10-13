import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Experimental Cache Components / Partial Prefetching left off: they force
     params access into Suspense boundaries and add surprise for no gain here. */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
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
