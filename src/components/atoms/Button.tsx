import React from "react";
import styled from "styled-components";

interface props {
  title: string;
  onClick: () => void;
  $fontSize?: string;
  $padding?: string;
  $margin?: string;
}

interface defaultStyleProps {
  $fontSize?: string;
  $padding?: string;
  $margin?: string;
}

/**
 * @param title 버튼 TEXT(String)
 * @param onClick onClick event(()=>void)
 * @param $fontSize fontSize Style(String)
 * @param $margin margin Style(String)
 * @param $padding padding Style(String)
 * @returns 기본 버튼 디자인 UI
 */
export default function Button({
  title,
  onClick,
  $fontSize = "16px",
  $margin = "0",
  $padding = "0",
}: props) {
  return (
    <ButtonWrap
      onClick={onClick}
      $fontSize={$fontSize}
      $margin={$margin}
      $padding={$padding}
    >
      {title}
    </ButtonWrap>
  );
}

const ButtonWrap = styled.button<defaultStyleProps>`
  width: 100%;
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
`;
