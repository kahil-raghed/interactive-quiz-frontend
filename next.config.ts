import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ This will completely disable ESLint checks during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
