import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2c3kthzw0ta10.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
