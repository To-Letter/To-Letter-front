"use client";

import StyledComponentsRegistry from "@/lib/api/reistry";
import { RecoilRoot } from "recoil";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <RecoilRoot>
          <StyledComponentsRegistry>
            <LoadingSpinner />
            {children}
            {modal}
          </StyledComponentsRegistry>
        </RecoilRoot>
      </body>
    </html>
  );
}
