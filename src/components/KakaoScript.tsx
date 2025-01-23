"use client";

import Script from "next/script";

export default function KakaoScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="beforeInteractive"
      onLoad={() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
        }
      }}
    />
  );
}
