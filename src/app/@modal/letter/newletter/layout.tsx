// src/app/@modal/letter/letterbox/layout.tsx
"use client";
import MenuTab from "@/components/molecules/MenuTab";
import ModalBox from "@/components/atoms/ModalBox";
import { HeaderBox } from "@/components/atoms/Box";
import { styled } from "styled-components";

export default function NewLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalBox
      $width="430px"
      $height="600px"
      $padding="20px"
      $direction="column"
      $alignItems="flex-start"
    >
      <Header $width="100%" $padding="8px 0">
        <MenuTab />
      </Header>
      {children}
    </ModalBox>
  );
}

const Header = styled(HeaderBox)`
  border-bottom: 1px solid #ddd;
`;
