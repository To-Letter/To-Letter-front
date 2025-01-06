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
    console.log("root layout");
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
  (prevProps, nextProps) => {
    // 이전과 새로운 props 비교 로직
    return (
      prevProps.modal === nextProps.modal &&
      prevProps.children === nextProps.children
    );
  }
);
RootLayout.displayName = "RootLayout";

export default RootLayout;
