"use client";

import MenuTab from "@/components/molecules/MenuTab";
import ModalBox from "@/components/atoms/ModalBox";
import { HeaderBox } from "@/components/atoms/Box";
import { usePathname } from "next/navigation";

export default function LetterBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return;
  }

  return (
    <ModalBox
      $width="430px"
      $height="600px"
      $padding="20px"
      $direction="column"
      $alignItems="flex-start"
    >
      <HeaderBox $width="100%" $height="60px" $padding="8px 0">
        <MenuTab />
      </HeaderBox>
      {children}
    </ModalBox>
  );
}
