"use client";

import styled, { css } from "styled-components";

interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $border?: string;
  $backgroundColor?: string;
  $borderRadius?: string;
}

/**
 * 공통 스타일 mixin 정의
 */
const flexMixin = css<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  border: ${({ $border }) => $border};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $borderRadius }) => $borderRadius};
`;

/**
 * 공통 스타일 적용한 BaseBox 생성
 * */
const BaseBox = styled.div<defaultStyleProps>`
  ${flexMixin}
`;

/**
 * @param $direction?: "row" | "column";
 * @param $justifyContent?: string;
 * @param $alignItems?: string;
 * @param $width?: string;
 * @param $height?: string;
 * @param $padding?: string;
 * @param $margin?: string;
 * @param $border?: string;
 * @param $backgroundColor?: string;
 * @param $borderRadius?: string;
 * @returns header제외 전체 콘텐츠에 대한 main Box(main tag)
 */
export const MainBox = styled(BaseBox).attrs({ as: "main" })``;

/**
 * @param $direction?: "row" | "column";
 * @param $justifyContent?: string;
 * @param $alignItems?: string;
 * @param $width?: string;
 * @param $height?: string;
 * @param $padding?: string;
 * @param $margin?: string;
 * @param $border?: string;
 * @param $backgroundColor?: string;
 * @param $borderRadius?: string;
 * @returns header 콘텐츠에 대한 header Box(header tag)
 */
export const HeaderBox = styled(BaseBox).attrs({ as: "header" })``;

/**
 * @param $direction?: "row" | "column";
 * @param $justifyContent?: string;
 * @param $alignItems?: string;
 * @param $width?: string;
 * @param $height?: string;
 * @param $padding?: string;
 * @param $margin?: string;
 * @param $border?: string;
 * @param $backgroundColor?: string;
 * @param $borderRadius?: string;
 * @returns header 안의 nav 콘텐츠에 대한 nav Box(nav tag)
 */
export const NavBox = styled(BaseBox).attrs({ as: "nav" })``;
/**
 * @param $direction?: "row" | "column";
 * @param $justifyContent?: string;
 * @param $alignItems?: string;
 * @param $width?: string;
 * @param $height?: string;
 * @param $padding?: string;
 * @param $margin?: string;
 * @param $border?: string;
 * @param $backgroundColor?: string;
 * @param $borderRadius?: string;
 * @returns 각각의 내용 콘텐츠에 대한 Section용 Box(section tag)
 */
export const SectionBox = styled(BaseBox).attrs({ as: "section" })``;

/**
 * @param $direction?: "row" | "column";
 * @param $justifyContent?: string;
 * @param $alignItems?: string;
 * @param $width?: string;
 * @param $height?: string;
 * @param $padding?: string;
 * @param $margin?: string;
 * @param $border?: string;
 * @param $backgroundColor?: string;
 * @param $borderRadius?: string;
 * @returns 구역 나눌 때 사용하는 Box(div tag)
 */
export const ElementBox = styled(BaseBox)``;
