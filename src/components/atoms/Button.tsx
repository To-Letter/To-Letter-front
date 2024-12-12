import React from "react";
import styled from "styled-components";

interface props {
  title: string;
  onClick: () => void;
  $disable?: boolean;
  $width?: string;
  $fontSize?: string;
  $padding?: string;
  $margin?: string;
}

interface defaultStyleProps {
  $disable?: boolean;
  $width?: string;
  $fontSize?: string;
  $padding?: string;
  $margin?: string;
}

/**
 * @param title 버튼 TEXT(String)
 * @param onClick onClick event(()=>void)
 * @param $disable? disable 처리, 기본 값 false
 * @param $width? width Style(String), 기본 값 "100%"
 * @param $fontSize? fontSize Style(String), 기본 값 "16px"
 * @param $margin? margin Style(String), 기본 값 "0"
 * @param $padding? padding Style(String), 기본 값 "0"
 * @returns 기본 버튼 디자인 UI
 */
export default function Button({
  title,
  onClick,
  $disable = false,
  $width = "100%",
  $fontSize = "16px",
  $margin = "0",
  $padding = "0",
}: props) {
  return (
    <ButtonWrap
      onClick={onClick}
      disabled={$disable}
      $disable={$disable}
      $width={$width}
      $fontSize={$fontSize}
      $margin={$margin}
      $padding={$padding}
    >
      {title}
    </ButtonWrap>
  );
}

const ButtonWrap = styled.button<defaultStyleProps>`
  width: ${({ $width }) => $width};
  border: 1px solid #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ $fontSize }) => $fontSize};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  color: #e9e9e9;
  background-color: #262523;
  border-radius: 1px;
  cursor: pointer;
  ${({ $disable }) => $disable && `color: #818181; border: 1px solid #818181;`};
`;
