"use client";

import StyledComponentsRegistry from "@/lib/api/reistry";
import { RecoilRoot } from "recoil";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { usePathname } from "next/navigation";
import { memo } from "react";

const RootLayout = memo(
  ({
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) => {
    const pathname = usePathname();

    return (
      <html lang="ko">
        <body>
          <RecoilRoot>
            <StyledComponentsRegistry>
              <LoadingSpinner />
              {children}
              {pathname === "/" ? <></> : modal}
            </StyledComponentsRegistry>
          </RecoilRoot>
        </body>
      </html>
    );
  }
);

RootLayout.displayName = "RootLayout";

export default RootLayout;
