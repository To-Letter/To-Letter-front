"use client";

import StyledComponentsRegistry from "@/lib/reistry";
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
          <StyledComponentsRegistry>
            <LoadingSpinner />
            {children}
          </StyledComponentsRegistry>
        </RecoilRoot>
      </body>
    </html>
  );
}
