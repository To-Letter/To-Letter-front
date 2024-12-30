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
};

module.exports = nextConfig;
