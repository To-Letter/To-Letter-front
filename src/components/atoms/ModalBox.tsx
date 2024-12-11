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
/**
 * @param children 모달 안에 들어갈 하위 노드(React.ReactNode)
 * @param isExitBtn 나가기 버튼 유무, 기본 값 false(boolean)
 * @param $direction?: "row" | "column"; 기본 값 "row"
 * @param $justifyContent?: string; 기본 값 "center"
 * @param $alignItems?: string; 기본 값 "center"
 * @param $width?: string; 기본 값 "auto"
 * @param $height?: string; 기본 값 "auto"
 * @param $padding?: string; 기본 값 "0"
 * @param $margin?: string; 기본 값 "0"
 * @returns 기본 모달Box(배경 오버레이 포함) 디자인 UI
 */
export default function ModalBox({
  children,
  isExitBtn = true,
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
  border-radius: 2px;
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
