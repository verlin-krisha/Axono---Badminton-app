import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a plain static site into /out (used for hosting the
 * site as static files). Normal `npm run build` keeps full Next.js features.
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStatic
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
      },
      async headers() {
        return [
          {
            // Long-lived caching for media. Rename files when replacing footage.
            source: "/media/:path*",
            headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
          },
        ];
      },
    };

export default nextConfig;
