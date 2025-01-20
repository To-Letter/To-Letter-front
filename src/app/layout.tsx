import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/api/reistry";
import { memo } from "react";
import ClientProviders from "@/components/ClientProviders";
import "@/style/globals.css";

export const metadata: Metadata = {
  title: "TO. Letter",
  description: `[온라인을 통해 만나는 아날로그한 편지, TO. Letter]
  가상의 나의 방에서 편지를 주고 받을 수 있어요(내가 설정해둔 우편함 위치를 기준으로 편지가 도착하는 시간이 정해져요!).
  나의 편지 주소를 SNS에 공유하여 주변 사람들과 편지를 주고 받아보세요.`,
  keywords: ["편지", "온라인 편지", "TO. Letter", "편지쓰기", "레트로 우편"],
  openGraph: {
    type: "website",
    title: "TO. Letter",
    description: "온라인을 통해 만나는 아날로그한 편지",
    images: [
      {
        url: "/images/openGraph/og-image.png",
        width: 1200,
        height: 630,
        alt: "TO. Letter - 온라인 편지 서비스",
      },
    ],
    siteName: "TO. Letter",
  },
  /* 트위터 전용 */
  twitter: {
    card: "summary_large_image",
    title: "TO. Letter",
    description: "온라인을 통해 만나는 아날로그한 편지",
    images: ["/images/openGraph/og-image.png"],
  },
  /* 카카오톡 전용 */
  other: {
    "kakao:title": "TO. Letter",
    "kakao:description": "온라인을 통해 만나는 아날로그한 편지",
    "kakao:image": "/images/openGraph/kakao_card.png",
    "kakao:type": "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const RootLayout = memo(
  ({
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) => {
    return (
      <html lang="ko">
        <head>
          <link rel="icon" href="/icon/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/icon/favicon-16x16.png" sizes="16x16" />
          <link rel="apple-touch-icon" href="/icon/apple-touch-icon.png" />
        </head>
        <body>
          <StyledComponentsRegistry>
            <ClientProviders modal={modal}>{children}</ClientProviders>
          </StyledComponentsRegistry>
        </body>
      </html>
    );
  },
  /**
   * modal 및 children에 뱐경사항이 있을 경우 리랜더링
   */
  (prevProps, nextProps) => {
    return (
      prevProps.modal === nextProps.modal &&
      prevProps.children === nextProps.children
    );
  }
);
RootLayout.displayName = "RootLayout";

export default RootLayout;
