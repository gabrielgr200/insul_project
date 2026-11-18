import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const development = process.env.NODE_ENV !== "production";
    // Inline scripts/styles are required by the existing static Next.js pages and animation libraries.
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' ${development ? "'unsafe-eval'" : ""} https://js.puter.com https://www.googletagmanager.com https://www.google-analytics.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.puter.com https://*.puter.site https://www.google-analytics.com https://www.googletagmanager.com",
      "media-src 'self' data: blob: https://*.puter.com https://*.puter.site",
      `connect-src 'self' https://puter.com https://*.puter.com https://*.puter.site https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com ${development ? "ws:" : ""}`,
      "frame-src https://puter.com https://*.puter.com https://*.puter.site https://www.googletagmanager.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      ...(development ? [] : ["upgrade-insecure-requests"]),
    ].join("; ");
    return [
      { source: "/:path*", headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(), payment=(), usb=()" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ...(development ? [] : [{ key: "Strict-Transport-Security", value: "max-age=15552000" }]),
      ] },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
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
