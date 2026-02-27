import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't set outputFileTracingRoot - let Next.js handle it automatically
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['@msaber/shared'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    return config;
  },
};

export default nextConfig;
