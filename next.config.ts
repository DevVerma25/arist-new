import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d45jl3w9libvn.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
