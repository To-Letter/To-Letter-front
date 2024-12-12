import React from "react";
import styled from "styled-components";

interface defaultStyleProps {
  $active?: boolean;
  $fontSize?: string;
  $fontWeight?: string;
  $margin?: string;
  $padding?: string;
}

interface props {
  keyValue: string;
  TabTitle: string;
  tabOption: "underline" | "highlight";
  onClick: () => void;
  $active: boolean;
  $fontSize?: string;
  $fontWeight?: string;
  $margin?: string;
  $padding?: string;
}

/**
 * @param keyValue component key(string)
 * @param TabTitle 해당 tab menu title(string);
 * @param tabOption 밑줄 디자인(기본)의 메뉴인지, 박스 디자인의 메뉴인지 확인("underline" | "highlight")
 * @param onClick onClick event hdr, 각 탭에 따른 목적지 이동(() => void)
 * @param $active: 활성화된 메뉴인지, 기본 false(boolean)
 * @param $fontSize?: tabTitle fontSize, 기본 "18px"(string)
 * @param $fontWeight?: tabTitle fontWeight, 기본 "500"(string)
 * @param $margin?: margin style, 기본 "auto"(string)
 * @param $padding?: padding style, 기본 "auto"(string)
 * @returns
 */
export default function Tab({
  keyValue,
  TabTitle,
  tabOption = "underline",
  onClick = () => {},
  $active = false,
  $fontSize = "18px",
  $fontWeight = "500",
  $margin = "auto",
  $padding = "auto",
}: props) {
  if (tabOption === "underline") {
    return (
      <UnderlineTab
        key={keyValue}
        onClick={onClick}
        $active={$active}
        $fontSize={$fontSize}
        $fontWeight={$fontWeight}
        $margin={$margin}
        $padding={$padding}
      >
        {TabTitle}
      </UnderlineTab>
    );
  } else {
    return (
      <HighlightTab
        key={keyValue}
        onClick={onClick}
        $active={$active}
        $fontSize={$fontSize}
        $fontWeight={$fontWeight}
        $margin={$margin}
        $padding={$padding}
      >
        {TabTitle}
      </HighlightTab>
    );
  }
}

const UnderlineTab = styled.div<defaultStyleProps>`
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  color: white;
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  cursor: pointer;

  ${({ $active }) => $active && `border-bottom: 2px solid white;`};
`;

const HighlightTab = styled.button<defaultStyleProps>`
  text-align: center;
  border-radius: 4px;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  background-color: ${({ $active }) =>
    $active ? "rgba(75, 75, 75, 0.1);" : "transparent"};
  color: ${({ $active }) => ($active ? "#fff" : "#ccc")};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(75, 75, 75, 0.1);
    color: #fff;
  }
`;
