/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizeCss: true, // CSS 최적화
    optimizePackageImports: ["@components"], // 패키지 임포트 최적화
  },
  webpack: (config) => {
    config.externals = config.externals || {};
    Object.assign(config.externals, {
      three: "THREE",
    });
    return config;
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
