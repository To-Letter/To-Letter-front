"use client";

import React from "react";
import ModalBox from "@/components/atoms/ModalBox";
import { HeaderBox } from "@/components/atoms/Box";
import MenuTab from "@/components/molecules/MenuTab";
import { usePathname } from "next/navigation";

export default function ModalLayout({
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
      isAuth={true}
      $width="320px"
      $padding="24px 40px 20px 40px"
      $direction="column"
      $alignItems="flex-start;"
    >
      <HeaderBox>
        <MenuTab />
      </HeaderBox>
      {children}
    </ModalBox>
  );
}
