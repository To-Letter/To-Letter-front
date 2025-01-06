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
