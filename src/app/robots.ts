import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://to-letter-front.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/_next/*", // Next.js 내부 파일 제외
        "/static/*", // 정적 파일 경로 제외
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`, // 실제 배포 URL로 변경 필요
  };
}
