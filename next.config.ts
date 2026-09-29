import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    localPatterns: [
      { pathname: "/**", search: "" },
      {
        pathname: "/images/hero-telas/**",
        search: "?v=20260929-1048",
      },
    ],
  },
};

export default nextConfig;
