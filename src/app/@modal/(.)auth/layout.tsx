import React from "react";
import ModalBox from "@/components/atoms/ModalBox";
import { HeaderBox } from "@/components/atoms/Box";
import AuthMenuTab from "@/components/molecules/AuthMenuTab";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ModalBox
      $width="400px"
      $padding="24px 40px 20px 40px"
      $direction="column"
      $alignItems="flex-start;"
    >
      <HeaderBox>
        <AuthMenuTab />
      </HeaderBox>
      {children}
    </ModalBox>
  );
}
