import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface props {
  children?: React.ReactNode;
  isExitBtn?: boolean;
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
}

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
}

export default function ModalBox({
  children,
  isExitBtn = false,
  $direction = "row",
  $justifyContent = "center",
  $alignItems = "center",
  $width = "auto",
  $height = "auto",
  $padding = "0",
  $margin = "0",
}: props) {
  const router = useRouter();
  return (
    <BackgroundOverlay>
      <BoxWrap
        $direction={$direction}
        $justifyContent={$justifyContent}
        $alignItems={$alignItems}
        $width={$width}
        $height={$height}
        $margin={$margin}
        $padding={$padding}
      >
        {isExitBtn && <Exit onClick={() => router.back()}>X</Exit>}
        {children}
      </BoxWrap>
    </BackgroundOverlay>
  );
}

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxWrap = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  position: relative;
  background: #000000a6;
  box-shadow: 1px 1px 1px #0000005c;
`;

const Exit = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 4px 12px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;
