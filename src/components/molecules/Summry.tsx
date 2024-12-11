
import React from "react";
import styled from "styled-components";

interface defaultStyleProps {
  $margin?: string;
  $bottom?: string;
  $left?: string;
}

interface props {
  tipText: string;
  $margin?: string;
  $bottom?: string;
  $left?: string;
}


/**
 * @param children (?)에 마우스를 올렸을 경우 뜨는 TipBox 안 문구(string)
 * @param $margin?: margin style(string), 기본 값 "auto"
 * @param $bottom?: tipBox bottom 위치 조정 style(string), 기본 값 "-88px"
 * @param $left?: tipBox left 위치 조정 style(string), 기본 값 "50%"
 * @returns tipBox UI
 */
export default function Summry({
  tipText = "",
  $margin = "auto",
  $bottom = "-88px",
  $left = "50%",
}: props) {
  return (
    <SummryWrap $margin={$margin}>
      ?
      <TipBox $bottom={$bottom} $left={$left}>
        {tipText}
      </TipBox>
    </SummryWrap>
  );
}


export const SummryWrap = styled.div<defaultStyleProps>`
  margin: ${({ $margin }) => $margin};
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font-size: 14px;
  font-weight: bold;
  color: #e9e9e9;
  position: relative;

  &:hover > div {
    display: block;
  }
`;

export const TipBox = styled.div<defaultStyleProps>`
  display: none;
  position: absolute;
  bottom: ${({ $bottom }) => $bottom};
  left: ${({ $left }) => $left};
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  white-space: break-spaces;
  z-index: 10;
  width: 200px;
  text-align: center;
  word-break: keep-all;
`;
