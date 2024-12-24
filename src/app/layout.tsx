"use client";
import StyledComponentsRegistry from "@/lib/api/reistry";
import { RecoilRoot } from "recoil";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
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
