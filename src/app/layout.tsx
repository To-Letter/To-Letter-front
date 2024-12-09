"use client";

import { RecoilRoot } from "recoil";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <RecoilRoot>
          <LoadingSpinner />
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
