import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  basePath: '/nobu-match',
  assetPrefix: '/nobu-match',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
