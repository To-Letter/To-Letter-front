/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@components"],
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
            key: "Permissions-Policy",
            value: "browsing-topics=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
