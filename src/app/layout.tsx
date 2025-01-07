import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/api/reistry";
import { memo } from "react";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "TO. Letter",
  description: `[온라인을 통해 만나는 아날로그한 편지, TO. Letter]
  가상의 나의 방에서 편지를 주고 받을 수 있어요(내가 설정해둔 우편함 위치를 기준으로 편지가 도착하는 시간이 정해져요!).
  나의 편지 주소를 SNS에 공유하여 주변 사람들과 편지를 주고 받아보세요.`,
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
        <body>
          <StyledComponentsRegistry>
            <ClientProviders>
              {children}
              {modal}
            </ClientProviders>
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
