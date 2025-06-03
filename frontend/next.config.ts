import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: "https://localhost:3013/api",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
