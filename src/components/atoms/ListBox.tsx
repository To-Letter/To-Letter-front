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
