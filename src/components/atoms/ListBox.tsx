import styled from "styled-components";


interface defaultStyleProps {
  $direction?: "row" | "column";
  $justifyContent?: string;
  $alignItems?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $border?: string;
}

/**
 * @param $direction?: "row" | "column";
 * @param $justifyContent?: string;
 * @param $alignItems?: string;
 * @param $width?: string;
 * @param $height?: string;
 * @param $padding?: string;
 * @param $margin?: string;
 * @param $border?: string;
 * @returns 구조 잡을 때 사용하는 Box
 */
export const ListBox = styled.div<defaultStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  margin: ${({ $margin }) => $margin};
  border: ${({ $border }) => $border};
`;
